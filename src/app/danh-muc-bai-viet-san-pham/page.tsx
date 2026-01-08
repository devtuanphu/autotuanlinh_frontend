import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData, SEOData } from '@/lib/seo';
import HeroSection from '@/components/danh-muc-bai-viet-san-pham/HeroSection';
import CategoriesSection from '@/components/danh-muc-bai-viet-san-pham/CategoriesSection';
import BenefitsSection from '@/components/danh-muc-bai-viet-san-pham/BenefitsSection';
import TrustSection from '@/components/danh-muc-bai-viet-san-pham/TrustSection';
import {
  ProductCategoryData,
  ProductSubCategory,
  danhMucBaiVietSanPhamBenefits,
  danhMucBaiVietSanPhamTrustStats,
  getTotalArticles,
} from '@/lib/data/danh-muc-bai-viet-san-pham';
import { fetchStrapi } from '@/lib/api/strapi';

// Helper function to map category name to icon
function getIconFromCategoryName(name: string): string {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('nội thất') || nameLower.includes('noi that')) {
    return 'Car';
  }
  if (nameLower.includes('ngoại thất') || nameLower.includes('ngoai that')) {
    return 'Wrench';
  }
  if (nameLower.includes('đồ chơi') || nameLower.includes('do choi') || nameLower.includes('điện tử') || nameLower.includes('dien tu')) {
    return 'Film';
  }
  if (nameLower.includes('âm thanh') || nameLower.includes('am thanh') || nameLower.includes('loa') || nameLower.includes('amply')) {
    return 'Music';
  }
  if (nameLower.includes('bảo dưỡng') || nameLower.includes('bao duong') || nameLower.includes('sửa chữa') || nameLower.includes('sua chua')) {
    return 'Settings';
  }
  return 'Sparkles'; // Default icon
}

// Generate metadata from API
export async function generateMetadata(): Promise<Metadata> {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  try {
    // Fetch from Strapi - Collection Type returns array directly when using pLevel
    const strapiData = await fetchStrapi<Array<{
      id: number | string;
      title: string;
      seo?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        metaKeywords?: string | null;
      };
    }>>('/danh-muc-bai-viets', {}, { revalidate: revalidateTime });
    
    // fetchStrapi returns array directly for Collection Type with pLevel
    if (Array.isArray(strapiData) && strapiData.length > 0) {
      const firstCategory = strapiData[0];
      const seo = firstCategory.seo;
      
      if (seo) {
        const seoDataFromApi: SEOData = {
          title: seo.metaTitle || seoData.danhMucBaiVietSanPham.title,
          description: seo.metaDescription || seoData.danhMucBaiVietSanPham.description,
          keywords: seo.metaKeywords ? seo.metaKeywords.split(',').map(k => k.trim()) : seoData.danhMucBaiVietSanPham.keywords,
          canonical: seoData.danhMucBaiVietSanPham.canonical,
        };
        
        return generateSEOMetadata(seoDataFromApi);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[danh-muc-bai-viet-san-pham] Failed to fetch SEO data, using defaults:', error);
    }
  }
  
  return generateSEOMetadata(seoData.danhMucBaiVietSanPham);
}

export default async function Page() {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  // Fetch categories from API (similar to home page pattern)
  let categories: ProductCategoryData[] = [];
  
  try {
    // Fetch from Strapi - Collection Type returns array directly when using pLevel
    const strapiData = await fetchStrapi<Array<{
      id: number | string;
      documentId?: string;
      slug: string;
      title: string;
      moTa?: string | null;
      seo?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        metaKeywords?: string | null;
      };
      anhDanhMuc?: unknown;
      danhMucCapHai?: Array<{
        id: number;
        title: string;
        slug: string;
        seo?: {
          metaTitle?: string | null;
          metaDescription?: string | null;
          metaKeywords?: string | null;
        };
      }>;
    }>>('/danh-muc-bai-viets', {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[danh-muc-bai-viet-san-pham] Fetched data:', strapiData);
    }
    
    // fetchStrapi returns array directly for Collection Type with pLevel
    if (Array.isArray(strapiData)) {
      categories = strapiData.map((category): ProductCategoryData => {
        // Map subcategories - use slug as id for routing
        const subCategories: ProductSubCategory[] = (category.danhMucCapHai || []).map((sub): ProductSubCategory => ({
          id: sub.slug, // Use slug as id for routing compatibility
          name: sub.title,
          children: [], // API doesn't provide articles, so empty for now
        }));
        
        return {
          id: String(category.id),
          name: category.title,
          icon: getIconFromCategoryName(category.title),
          href: `/danh-muc-bai-viet-san-pham/${category.slug}`,
          children: subCategories,
        };
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[danh-muc-bai-viet-san-pham] Mapped ${categories.length} categories`);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[danh-muc-bai-viet-san-pham] Failed to fetch categories, using defaults:', error);
    }
  }

  // Calculate stats
  const categoryCount = categories.length;
  const totalArticles = categories.reduce((sum, cat) => sum + getTotalArticles(cat), 0);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection categoryCount={categoryCount} totalArticles={totalArticles} />
      <CategoriesSection categories={categories} />
      <BenefitsSection benefits={danhMucBaiVietSanPhamBenefits} />
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <TrustSection stats={danhMucBaiVietSanPhamTrustStats} />
        </div>
      </div>
    </div>
  );
}
