import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData, SEOData } from '@/lib/seo';
import ArticleListLayout from '@/components/shared/ArticleListLayout';
import ServicesGridSection from '@/components/dich-vu/ServicesGridSection';
import EmptyStateSection from '@/components/dich-vu/EmptyStateSection';
import NotFoundSection from '@/components/dich-vu/NotFoundSection';
import { ArticleItem } from '@/lib/data/danh-muc-bai-viet-san-pham';
import { fetchStrapi } from '@/lib/api/strapi';

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
    }>(`/danh-muc-bai-viet-dich-vus/cap-hai/${params.id}`, {}, { revalidate: revalidateTime });
    
    if (strapiData && typeof strapiData === 'object' && 'seo' in strapiData && strapiData.seo) {
      const seo = strapiData.seo;
      const seoDataFromApi: SEOData = {
        title: seo.metaTitle || `${strapiData.title} - ${seoData.dichVu.title}`,
        description: seo.metaDescription || `Khám phá các dịch vụ về ${strapiData.title.toLowerCase()}...`,
        keywords: seo.metaKeywords ? seo.metaKeywords.split(',').map(k => k.trim()) : seoData.dichVu.keywords,
        canonical: `/dich-vu/${strapiData.slug}`,
      };
      
      return generateSEOMetadata(seoDataFromApi);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[dich-vu/[id]] Failed to fetch SEO data, using defaults:', error);
    }
  }
  
  return generateSEOMetadata(seoData.dichVu);
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
    }>(`/danh-muc-bai-viet-dich-vus/cap-hai/${params.id}`, {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[dich-vu/[id]] Fetched data:', strapiData);
    }
    
    if (strapiData && typeof strapiData === 'object' && 'title' in strapiData) {
      // Map articles from baiViets
      const articles: ArticleItem[] = (strapiData.baiViets || []).map((article) => ({
        name: article.title,
        href: `/tin-tuc/${article.slug}`,
      }));
      
      // Get description from seo.metaDescription or use fallback
      const description = strapiData.seo?.metaDescription || `Khám phá các dịch vụ về ${strapiData.title.toLowerCase()} - Thông tin chi tiết, quy trình và đánh giá chuyên nghiệp từ Auto Tuan Linh`;
      
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
      console.warn('[dich-vu/[id]] Failed to fetch subcategory detail, using defaults:', error);
    }
  }

  if (!subCategoryData) {
    return <NotFoundSection />;
  }

  const breadcrumbs = [
    { name: 'Dịch vụ', href: '/dich-vu' },
    { name: subCategoryData.parentCategory.title, href: `/dich-vu/${subCategoryData.parentCategory.slug}` },
    { name: subCategoryData.title, href: `/dich-vu/${subCategoryData.slug}` },
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
        <ServicesGridSection
          services={subCategoryData.articles.map(article => ({ name: article.name, href: article.href }))}
          subCategoryName={subCategoryData.title}
          subCategoryId={subCategoryData.id}
        />
      )}
    </ArticleListLayout>
  );
}
