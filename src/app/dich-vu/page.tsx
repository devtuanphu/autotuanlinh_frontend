import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData, SEOData } from '@/lib/seo';
import HeroSection from '@/components/dich-vu/HeroSection';
import CategoriesSection, { ServiceCategory, ServiceSubCategory } from '@/components/dich-vu/CategoriesSection';
import BenefitsSection from '@/components/dich-vu/BenefitsSection';
import { dichVuBenefits, dichVuTrustStats } from '@/lib/data/dich-vu';
import { fetchStrapi } from '@/lib/api/strapi';

// Helper function to map category name to icon
function getIconFromCategoryName(name: string): string {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('phim') || nameLower.includes('cách nhiệt') || nameLower.includes('cach nhiet')) {
    return 'Film';
  }
  if (nameLower.includes('ghế') || nameLower.includes('ghe') || nameLower.includes('da')) {
    return 'Car';
  }
  if (nameLower.includes('âm thanh') || nameLower.includes('am thanh') || nameLower.includes('loa') || nameLower.includes('amply')) {
    return 'Music';
  }
  return 'Car'; // Default icon
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
    }>>('/danh-muc-bai-viet-dich-vus', {}, { revalidate: revalidateTime });
    
    // fetchStrapi returns array directly for Collection Type with pLevel
    if (Array.isArray(strapiData) && strapiData.length > 0) {
      const firstCategory = strapiData[0];
      const seo = firstCategory.seo;
      
      if (seo) {
        const seoDataFromApi: SEOData = {
          title: seo.metaTitle || seoData.dichVu.title,
          description: seo.metaDescription || seoData.dichVu.description,
          keywords: seo.metaKeywords ? seo.metaKeywords.split(',').map(k => k.trim()) : seoData.dichVu.keywords,
          canonical: seoData.dichVu.canonical,
        };
        
        return generateSEOMetadata(seoDataFromApi);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[dich-vu] Failed to fetch SEO data, using defaults:', error);
    }
  }
  
  return generateSEOMetadata(seoData.dichVu);
}

export default async function Page() {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  // Fetch categories from API (similar to danh-muc-bai-viet-san-pham pattern)
  let categories: ServiceCategory[] = [];
  
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
    }>>('/danh-muc-bai-viet-dich-vus', {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[dich-vu] Fetched data:', strapiData);
    }
    
    // fetchStrapi returns array directly for Collection Type with pLevel
    if (Array.isArray(strapiData)) {
      categories = strapiData.map((category): ServiceCategory => {
        // Map subcategories - use slug as id for routing
        const subCategories: ServiceSubCategory[] = (category.danhMucCapHai || []).map((sub): ServiceSubCategory => ({
          id: sub.slug, // Use slug as id for routing compatibility
          name: sub.title,
          children: [], // API doesn't provide articles, so empty for now
        }));
        
        return {
          id: String(category.id),
          name: category.title,
          icon: getIconFromCategoryName(category.title),
          href: `/dich-vu/${category.slug}`,
          children: subCategories,
        };
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[dich-vu] Mapped ${categories.length} categories`);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[dich-vu] Failed to fetch categories, using defaults:', error);
    }
  }

  // Calculate stats
  const getTotalServices = (category: ServiceCategory) => {
    let total = 0;
    category.children?.forEach(sub => {
      total += sub.children?.length || 0;
    });
    return total;
  };

  const categoryCount = categories.length;
  const totalServices = categories.reduce((sum, cat) => sum + getTotalServices(cat), 0);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection categoryCount={categoryCount} totalServices={totalServices} />
      <CategoriesSection categories={categories} />
      <BenefitsSection benefits={dichVuBenefits} trustStats={dichVuTrustStats} />
    </main>
  );
}
