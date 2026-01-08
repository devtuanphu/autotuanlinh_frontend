import { Metadata } from 'next';
import { Suspense } from 'react';
import { generateMetadata as generateSEOMetadata, seoData, SEOData } from '@/lib/seo';
import ProductListLayout from '@/components/shared/ProductListLayout';
import ProductCategoryDetailSections from '@/components/san-pham/ProductCategoryDetailSections';
import NotFoundSection from '@/components/san-pham/NotFoundSection';
import { ProductCategoryDetail, ProductItem } from '@/lib/data/san-pham';
import { fetchStrapi } from '@/lib/api/strapi';

interface PageProps {
  params: {
    id: string; // This can be either id or slug
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  try {
    // Fetch category detail from API
    const strapiData = await fetchStrapi<{
      id: number | string;
      title: string;
      slug: string;
      seo?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        metaKeywords?: string | null;
      };
    }>(`/danh-muc-san-phams/cap-ba/${params.id}`, {}, { revalidate: revalidateTime });
    
    if (strapiData && typeof strapiData === 'object' && 'seo' in strapiData && strapiData.seo) {
      const seo = strapiData.seo;
      const seoDataFromApi: SEOData = {
        title: seo.metaTitle || `${strapiData.title} - ${seoData.sanPham.title}`,
        description: seo.metaDescription || `Khám phá các sản phẩm về ${strapiData.title.toLowerCase()}...`,
        keywords: seo.metaKeywords ? seo.metaKeywords.split(',').map(k => k.trim()) : seoData.sanPham.keywords,
        canonical: `/san-pham/${strapiData.slug}`,
      };
      
      return generateSEOMetadata(seoDataFromApi);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[san-pham/[id]] Failed to fetch SEO data, using defaults:', error);
    }
  }
  
  return generateSEOMetadata(seoData.sanPham);
}

export default async function Page({ params }: PageProps) {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  // Fetch category detail from API
  let categoryDetail: ProductCategoryDetail | null = null;
  
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
      san_phams?: Array<{
        id: number | string;
        title: string;
        slug: string;
        giaBan?: number | null;
        giaGoc?: number | null;
        rating?: number | null;
        reviewCount?: number | null;
        badges?: string | null;
        giamGia?: number | null;
        anhSanPham?: Array<{
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
        }> | null;
      }>;
      parentCategoryLevel1?: {
        title: string;
        slug: string;
      };
      parentCategoryLevel2?: {
        title: string;
        slug: string;
      };
    }>(`/danh-muc-san-phams/cap-ba/${params.id}`, {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[san-pham/[id]] Fetched data:', strapiData);
    }
    
    if (strapiData && typeof strapiData === 'object' && 'title' in strapiData) {
      // Map products from san_phams with full API data
      const products: ProductItem[] = (strapiData.san_phams || []).map((product) => ({
        name: product.title,
        href: `/san-pham/${strapiData.parentCategoryLevel1?.slug || 'category'}/${strapiData.parentCategoryLevel2?.slug || 'subcategory'}/${product.slug}`,
        slug: product.slug,
        giaBan: product.giaBan,
        giaGoc: product.giaGoc,
        rating: product.rating,
        reviewCount: product.reviewCount,
        badges: product.badges,
        giamGia: product.giamGia,
        anhSanPham: product.anhSanPham,
      }));
      
      categoryDetail = {
        parentCategory: {
          id: strapiData.parentCategoryLevel1?.slug || 'category',
          name: strapiData.parentCategoryLevel1?.title || 'Danh mục',
          href: `/san-pham/${strapiData.parentCategoryLevel1?.slug || 'category'}`,
        },
        subCategory: {
          id: strapiData.slug,
          name: strapiData.title,
        },
        products,
      };
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[san-pham/[id]] Failed to fetch category detail, using defaults:', error);
    }
  }

  if (!categoryDetail) {
    return <NotFoundSection />;
  }

  const { parentCategory, subCategory } = categoryDetail;
  
  // Get description from API (re-fetch to get seo.metaDescription)
  let description = `Khám phá các sản phẩm về ${subCategory.name.toLowerCase()} - Chất lượng cao, chính hãng từ Auto Tuan Linh`;
  try {
    const strapiDataForDescription = await fetchStrapi<{
      seo?: {
        metaDescription?: string | null;
      };
    }>(`/danh-muc-san-phams/cap-ba/${params.id}`, {}, { revalidate: revalidateTime });
    
    if (strapiDataForDescription?.seo?.metaDescription) {
      description = strapiDataForDescription.seo.metaDescription;
    }
  } catch {
    // Use fallback description
  }
  
  const breadcrumbs = [
    { name: 'Sản phẩm', href: '/san-pham' },
    { name: parentCategory.name, href: parentCategory.href },
    { name: subCategory.name, href: `/san-pham/${subCategory.id}` },
  ];
  const bannerImage = `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&sig=${subCategory.id}`;

  return (
    <ProductListLayout
      title={subCategory.name}
      description={description}
      breadcrumbs={breadcrumbs}
      showBreadcrumb={true}
      bannerImage={bannerImage}
    >
      <Suspense
        fallback={
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        }
      >
        <ProductCategoryDetailSections categoryDetail={categoryDetail} />
      </Suspense>
    </ProductListLayout>
  );
}

