import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData, SEOData } from '@/lib/seo';
import ArticleListLayout from '@/components/shared/ArticleListLayout';
import ArticlesGridSection from '@/components/danh-muc-bai-viet-san-pham/ArticlesGridSection';
import EmptyStateSection from '@/components/danh-muc-bai-viet-san-pham/EmptyStateSection';
import NotFoundSection from '@/components/danh-muc-bai-viet-san-pham/NotFoundSection';
import { ArticleItem } from '@/lib/data/danh-muc-bai-viet-san-pham';
import { fetchStrapi, getStrapiImageUrl } from '@/lib/api/strapi';

interface PageProps {
  params: {
    id: string; // This can be either id or slug
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  try {
    // Fetch subcategory detail from API
    const strapiData = await fetchStrapi<{
      id: number | string;
      title: string;
      slug: string;
      seo?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        metaKeywords?: string | null;
      };
    }>(`/danh-muc-bai-viets/cap-hai/${params.id}`, {}, { revalidate: revalidateTime });
    
    if (strapiData && typeof strapiData === 'object' && 'seo' in strapiData && strapiData.seo) {
      const seo = strapiData.seo;
      const seoDataFromApi: SEOData = {
        title: seo.metaTitle || `${strapiData.title} - ${seoData.danhMucBaiVietSanPham.title}`,
        description: seo.metaDescription || `Khám phá các bài viết về ${strapiData.title.toLowerCase()}...`,
        keywords: seo.metaKeywords ? seo.metaKeywords.split(',').map(k => k.trim()) : seoData.danhMucBaiVietSanPham.keywords,
        canonical: `/danh-muc-bai-viet-san-pham/${strapiData.slug}`,
      };
      
      return generateSEOMetadata(seoDataFromApi);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[danh-muc-bai-viet-san-pham/[id]] Failed to fetch SEO data, using defaults:', error);
    }
  }
  
  return generateSEOMetadata(seoData.danhMucBaiVietSanPham);
}

export default async function Page({ params }: PageProps) {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  // Fetch subcategory detail from API
  let subCategoryData: {
    id: string;
    title: string;
    slug: string;
    description: string;
    articles: ArticleItem[];
    parentCategory: {
      title: string;
      slug: string;
    };
  } | null = null;
  
  try {
    const strapiData = await fetchStrapi<{
      id: number | string;
      title: string;
      slug: string;
      seo?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        metaKeywords?: string | null;
      };
      baiViets?: Array<{
        id: number | string;
        title: string;
        slug: string;
        moTaNgan?: string | null;
        hashtag?: string | null;
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
      parentCategory?: {
        title: string;
        slug: string;
      };
    }>(`/danh-muc-bai-viets/cap-hai/${params.id}`, {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[danh-muc-bai-viet-san-pham/[id]] Fetched data:', strapiData);
    }
    
    if (strapiData && typeof strapiData === 'object' && 'title' in strapiData) {
      // Map articles from baiViets
      const articles: ArticleItem[] = (strapiData.baiViets || []).map((article) => ({
        name: article.title,
        href: `/tin-tuc/${article.slug}`,
      }));
      
      // Get description from seo.metaDescription or use fallback
      const description = strapiData.seo?.metaDescription || `Khám phá các bài viết về ${strapiData.title.toLowerCase()} - Thông tin chi tiết, hướng dẫn và đánh giá chuyên nghiệp từ Auto Tuan Linh`;
      
      subCategoryData = {
        id: String(strapiData.id),
        title: strapiData.title,
        slug: strapiData.slug,
        description,
        articles,
        parentCategory: strapiData.parentCategory || {
          title: 'Danh mục',
          slug: '',
        },
      };
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[danh-muc-bai-viet-san-pham/[id]] Failed to fetch subcategory detail, using defaults:', error);
    }
  }

  if (!subCategoryData) {
    return <NotFoundSection />;
  }

  const breadcrumbs = [
    { name: 'Danh mục bài viết', href: '/danh-muc-bai-viet-san-pham' },
    { name: subCategoryData.parentCategory.title, href: `/danh-muc-bai-viet-san-pham/${subCategoryData.parentCategory.slug}` },
    { name: subCategoryData.title, href: `/danh-muc-bai-viet-san-pham/${subCategoryData.slug}` },
  ];
  const bannerImage = `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&sig=${subCategoryData.id}`;

  return (
    <ArticleListLayout
      title={subCategoryData.title}
      description={subCategoryData.description}
      breadcrumbs={breadcrumbs}
      showBreadcrumb={true}
      bannerImage={bannerImage}
    >
      {subCategoryData.articles.length === 0 ? (
        <EmptyStateSection />
      ) : (
        <ArticlesGridSection
          articles={subCategoryData.articles}
          subCategoryName={subCategoryData.title}
          subCategoryId={subCategoryData.id}
        />
      )}
    </ArticleListLayout>
  );
}
