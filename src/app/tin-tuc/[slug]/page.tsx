import React from 'react';
import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData, SEOData } from '@/lib/seo';
import { getStrapiImageUrl } from '@/lib/api/strapi';
import Link from 'next/link';
import { ChevronRight, Home, Clock, Calendar, Hash, FileText } from 'lucide-react';
import Image from 'next/image';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  const resolvedParams = await params;
  
  try {
    // Fetch blog from API
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337';
    const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_KEY || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;
    
    const url = `${STRAPI_URL}/api/blogs?pLevel&populate=*&filters[slug][$eq]=${resolvedParams.slug}`;
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
        seo?: {
          metaTitle?: string | null;
          metaDescription?: string | null;
          metaKeywords?: string | null;
        };
      }>;
    } = await response.json();
    
    if (json.data && Array.isArray(json.data) && json.data.length > 0) {
      const blog = json.data[0];
      if (blog.seo) {
        const seoDataFromApi: SEOData = {
          title: blog.seo.metaTitle || blog.title,
          description: blog.seo.metaDescription || blog.moTaNgan || seoData.tinTuc.description,
          keywords: blog.seo.metaKeywords ? blog.seo.metaKeywords.split(',').map(k => k.trim()) : seoData.tinTuc.keywords,
          canonical: `/tin-tuc/${blog.slug}`,
        };
        
        return generateSEOMetadata(seoDataFromApi);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[tin-tuc/[slug]] Failed to fetch SEO data, using defaults:', error);
    }
  }
  
  return generateSEOMetadata(seoData.tinTuc);
}

export default async function Page({ params }: PageProps) {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  const resolvedParams = await params;
  
  // Fetch blog from API
  let blogData: {
    id: string;
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
  } | null = null;
  
  try {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337';
    const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_KEY || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;
    
    const url = `${STRAPI_URL}/api/blogs?pLevel&populate=*&filters[slug][$eq]=${resolvedParams.slug}`;
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
        avatar?: {
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
        } | null;
      }>;
    } = await response.json();
    
    if (json.data && Array.isArray(json.data) && json.data.length > 0) {
      const blog = json.data[0];
      blogData = {
        id: String(blog.id),
        title: blog.title,
        slug: blog.slug,
        moTaNgan: blog.moTaNgan,
        noiDung: blog.noiDung,
        hashtag: blog.hashtag,
        createdAt: blog.createdAt,
        publishedAt: blog.publishedAt,
        avatar: blog.avatar,
      };
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[tin-tuc/[slug]] Fetched blog:', blogData);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[tin-tuc/[slug]] Failed to fetch blog, using defaults:', error);
    }
  }
  
  if (!blogData) {
    return (
      <div className="min-h-screen bg-white">
        <section className="bg-gray-50 border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-brand-accent transition-colors flex items-center gap-1">
                <Home size={16} />
                <span>Trang chủ</span>
              </Link>
              <ChevronRight size={16} className="text-gray-400" />
              <Link href="/tin-tuc" className="text-gray-600 hover:text-brand-accent transition-colors">
                Tin tức
              </Link>
            </nav>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={40} className="text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
            <p className="text-gray-600 text-lg mb-8">Bài viết bạn đang tìm kiếm không tồn tại.</p>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-xl font-semibold transition-all duration-200"
            >
              <ChevronRight size={20} className="rotate-180" />
              <span>Quay lại danh sách tin tức</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }
  
  // Calculate read time
  const calculateReadTime = (content?: string | null): number => {
    if (!content) return 5; // default
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };
  
  const readTime = calculateReadTime(blogData.noiDung || blogData.moTaNgan);
  
  // Parse hashtags
  const hashtags = blogData.hashtag
    ? blogData.hashtag.split(/\s+/).map(tag => tag.replace('#', '')).filter(Boolean)
    : [];
  
  // Format date
  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const publishedDate = formatDate(blogData.publishedAt || blogData.createdAt);
  
  // Get image URL
  const imageUrl = getStrapiImageUrl(blogData.avatar as Parameters<typeof getStrapiImageUrl>[0]) || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop';
  
  const breadcrumbs = [
    { name: 'Tin tức', href: '/tin-tuc' },
    { name: blogData.title, href: `/tin-tuc/${blogData.slug}` },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Section */}
      <section className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-brand-accent transition-colors flex items-center gap-1">
              <Home size={16} />
              <span>Trang chủ</span>
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <ChevronRight size={16} className="text-gray-400" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-brand-accent font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="text-gray-600 hover:text-brand-accent transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {blogData.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-brand-accent" />
                <span>{publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-brand-accent" />
                <span>{readTime} phút đọc</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Tác giả:</span>
                <span className="font-semibold">Auto Tuan Linh</span>
              </div>
            </div>
            
            {/* Hashtags */}
            {hashtags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Hash size={18} className="text-brand-accent" />
                {hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Featured Image */}
          {imageUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt={blogData.title}
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}
          
          {/* Excerpt */}
          {blogData.moTaNgan && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-brand-accent">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                {blogData.moTaNgan}
              </p>
            </div>
          )}
          
          {/* Article Content */}
          {blogData.noiDung && (
            <div 
              className="mb-12 text-gray-700 leading-relaxed"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
              }}
            >
              <div 
                className="[&_p]:mb-6 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-8 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-8 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-6 [&_li]:mb-2 [&_a]:text-brand-accent [&_a]:underline [&_a]:hover:text-brand-accent-dark [&_img]:rounded-xl [&_img]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6"
                dangerouslySetInnerHTML={{ __html: blogData.noiDung }}
              />
            </div>
          )}
          
          {/* Back to News Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-xl font-semibold transition-all duration-200"
            >
              <ChevronRight size={20} className="rotate-180" />
              <span>Quay lại danh sách tin tức</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

