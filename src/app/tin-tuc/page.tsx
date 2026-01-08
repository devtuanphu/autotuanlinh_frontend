import { Metadata } from 'next';
import { Suspense } from 'react';
import { generateMetadata as generateSEOMetadata, seoData, SEOData } from '@/lib/seo';
import TinTucPageClient from '@/components/tin-tuc/TinTucPageClient';
import { NewsArticle } from '@/lib/data/articles';
import { fetchStrapi, getStrapiImageUrl } from '@/lib/api/strapi';
import { Category, ITEMS_PER_PAGE } from '@/lib/data/tin-tuc';

// Generate metadata from API
export async function generateMetadata(): Promise<Metadata> {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  try {
    // Fetch from Strapi - try to get SEO from first featured article or use default
    // Build URL manually for nested filters
    const strapiData = await fetchStrapi<Array<{
      id: number | string;
      seo?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        metaKeywords?: string | null;
      };
    }>>('/blogs?filters[isNoiBat][$eq]=true&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=1', {}, { revalidate: revalidateTime });
    
    if (Array.isArray(strapiData) && strapiData.length > 0) {
      const seo = strapiData[0].seo;
      if (seo) {
        const seoDataFromApi: SEOData = {
          title: seo.metaTitle || seoData.tinTuc.title,
          description: seo.metaDescription || seoData.tinTuc.description,
          keywords: seo.metaKeywords ? seo.metaKeywords.split(',').map(k => k.trim()) : seoData.tinTuc.keywords,
          canonical: seoData.tinTuc.canonical,
        };
        
        return generateSEOMetadata(seoDataFromApi);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[tin-tuc] Failed to fetch SEO data, using defaults:', error);
    }
  }
  
  return generateSEOMetadata(seoData.tinTuc);
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TinTucPageServer({ searchParams }: PageProps) {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  
  // Fetch SEO data for hero section
  let title = 'Tin tức';
  let description = 'Cập nhật tin tức mới nhất về phụ kiện ô tô, xu hướng, đánh giá sản phẩm và nhiều thông tin hữu ích khác';
  
  // Fetch topics (categories)
  let categories: Category[] = [
    { id: 'all', name: 'Tất cả', count: 0 }, // Will be calculated dynamically
  ];
  
  // Fetch featured articles
  let featuredArticles: NewsArticle[] = [];
  
  // Fetch all blogs with pagination
  let articles: NewsArticle[] = [];
  let totalArticles = 0;
  let totalPages = 1;
  
  try {
    // Calculate read time from content (rough estimate: 200 words per minute)
    const calculateReadTime = (content?: string | null): number => {
      if (!content) return 5; // default
      const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      return Math.max(1, Math.ceil(wordCount / 200));
    };
    
    // Build URL manually for nested filters and populate
    const strapiData = await fetchStrapi<Array<{
      id: number | string;
      title: string;
      slug: string;
      moTaNgan?: string | null;
      noiDung?: string | null;
      hashtag?: string | null;
      createdAt?: string;
      publishedAt?: string | null;
      avatar?: {
        url?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
          thumbnail?: { url?: string };
        };
      } | null;
      seo?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
      };
    }>>('/blogs?filters[isNoiBat][$eq]=true&sort=createdAt:desc&populate=*', {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[tin-tuc] Fetched featured articles:', strapiData);
    }
    
    if (Array.isArray(strapiData) && strapiData.length > 0) {
      // Get SEO from first article for hero section
      const firstArticle = strapiData[0];
      if (firstArticle.seo) {
        if (firstArticle.seo.metaTitle) {
          title = firstArticle.seo.metaTitle;
        }
        if (firstArticle.seo.metaDescription) {
          description = firstArticle.seo.metaDescription;
        }
      }
      
      // Map featured articles
      featuredArticles = strapiData.map((blog) => {
        // Parse hashtags from string (e.g., "#tag1 #tag2" -> ["tag1", "tag2"])
        const hashtags = blog.hashtag
          ? blog.hashtag.split(/\s+/).map(tag => tag.replace('#', '')).filter(Boolean)
          : [];
        
        return {
          id: String(blog.id),
          title: blog.title,
          excerpt: blog.moTaNgan || '',
          image: getStrapiImageUrl(blog.avatar as Parameters<typeof getStrapiImageUrl>[0]) || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop',
          href: `/tin-tuc/${blog.slug}`,
          publishedAt: blog.publishedAt || blog.createdAt || new Date().toISOString(),
          readTime: calculateReadTime(blog.noiDung || blog.moTaNgan),
          category: '', // Will be mapped later if needed
          author: 'Auto Tuan Linh',
          hashtags,
          featured: true,
        };
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[tin-tuc] Failed to fetch data, using defaults:', error);
    }
  }

  // Fetch all blogs with pagination
  try {
    const calculateReadTime = (content?: string | null): number => {
      if (!content) return 5; // default
      const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      return Math.max(1, Math.ceil(wordCount / 200));
    };
    
    // Fetch blogs with pagination - need to get raw response to access meta
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337';
    const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_KEY || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;
    
    const url = `${STRAPI_URL}/api/blogs?pLevel&pagination[page]=${currentPage}&pagination[pageSize]=${ITEMS_PER_PAGE}&sort=createdAt:desc`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    const response = await fetch(url, {
      headers,
      next: { revalidate: revalidateTime },
    });
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    const json: {
      data: Array<{
        id: number | string;
        title: string;
        slug: string;
        moTaNgan?: string | null;
        noiDung?: string | null;
        hashtag?: string | null;
        createdAt?: string;
        publishedAt?: string | null;
        isNoiBat?: boolean | null;
        avatar?: {
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
        } | null;
        seo?: {
          metaTitle?: string | null;
          metaDescription?: string | null;
        };
      }>;
      meta?: {
        pagination?: {
          page: number;
          pageSize: number;
          pageCount: number;
          total: number;
        };
      };
    } = await response.json();
    
    if (json.data && Array.isArray(json.data)) {
      // Map blogs to NewsArticle format
      articles = json.data.map((blog) => {
        // Parse hashtags from string (e.g., "#tag1 #tag2" -> ["tag1", "tag2"])
        const hashtags = blog.hashtag
          ? blog.hashtag.split(/\s+/).map(tag => tag.replace('#', '')).filter(Boolean)
          : [];
        
        return {
          id: String(blog.id),
          title: blog.title,
          excerpt: blog.moTaNgan || '',
          image: getStrapiImageUrl(blog.avatar as Parameters<typeof getStrapiImageUrl>[0]) || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop',
          href: `/tin-tuc/${blog.slug}`,
          publishedAt: blog.publishedAt || blog.createdAt || new Date().toISOString(),
          readTime: calculateReadTime(blog.noiDung || blog.moTaNgan),
          category: '', // Will be mapped later if needed
          author: 'Auto Tuan Linh',
          hashtags,
          featured: blog.isNoiBat === true,
        };
      });
      
      // Get pagination info
      if (json.meta?.pagination) {
        totalArticles = json.meta.pagination.total;
        totalPages = json.meta.pagination.pageCount;
      }
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[tin-tuc] Fetched blogs:', { articles: articles.length, totalArticles, totalPages, currentPage });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[tin-tuc] Failed to fetch blogs, using defaults:', error);
    }
  }

  // Fetch topics from API
  try {
    const topicsData = await fetchStrapi<Array<{
      id: number | string;
      name: string;
    }>>('/topic-blogs', {}, { revalidate: revalidateTime });
    
    if (Array.isArray(topicsData) && topicsData.length > 0) {
      // Map topics to Category format
      const topicsCategories: Category[] = topicsData.map((topic) => ({
        id: String(topic.id),
        name: topic.name,
        count: 0, // Will be calculated dynamically on client side
      }));
      
      // Add "Tất cả" at the beginning
      categories = [
        { id: 'all', name: 'Tất cả', count: 0 },
        ...topicsCategories,
      ];
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[tin-tuc] Fetched topics:', categories);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[tin-tuc] Failed to fetch topics, using defaults:', error);
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <TinTucPageClient 
        articles={articles} 
        featuredArticles={featuredArticles} 
        categories={categories} 
        title={title} 
        description={description}
        totalArticles={totalArticles}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </Suspense>
  );
}
