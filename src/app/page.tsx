import { generateMetadata as generateSEOMetadata, seoData, generateStructuredData, type SEOData } from '@/lib/seo';
import type { Metadata } from 'next';
import HeroSlider from '@/components/home/HeroSlider';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatisticsSection from '@/components/home/StatisticsSection';
import ServicesSection from '@/components/home/ServicesSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import LatestNewsSection from '@/components/home/LatestNewsSection';
import BrandsSection from '@/components/home/BrandsSection';
import ProcessSection from '@/components/home/ProcessSection';
import GallerySection from '@/components/home/GallerySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PromoSection from '@/components/home/PromoSection';
import { 
  homeFeatures, 
  homeProducts, 
  homeTestimonials, 
  homeStatistics,
  homeServices,
  homeCategories,
  homeReasons,
  homeBrands,
  homeProcessSteps,
  homeGalleryImages,
  homePromos
} from '@/lib/data/home';
import { allArticles } from '@/lib/data/articles';
import { fetchStrapi, getStrapiImageUrl } from '@/lib/api/strapi';
import { STRAPI_ENDPOINTS } from '@/lib/api/endpoints';

// Generate metadata from Strapi API
export async function generateMetadata(): Promise<Metadata> {
  let seoDataFromApi: SEOData | null = null;
  
  try {
    // Fetch SEO data from Strapi
    const homeData = await fetchStrapi<{ seo?: SEOData }>(STRAPI_ENDPOINTS.home);
    
    // Map Strapi SEO data to SEOData format
    if (homeData?.seo) {
      const seo = homeData.seo as {
        metaTitle?: string;
        metaDescription?: string;
        metaKeywords?: string;
        canonicalUrl?: string;
        ogTitle?: string;
        ogDescription?: string;
        ogType?: string;
        ogUrl?: string;
        ogSiteName?: string;
        ogImage?: {
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
          };
        };
        twitterTitle?: string;
        twitterDescription?: string;
        twitterImage?: {
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
          };
        };
      };
      
      const getImageUrl = (image: typeof seo.ogImage): string | undefined => {
        if (!image) return undefined;
        return image.url || image.formats?.large?.url || image.formats?.medium?.url;
      };
      
      seoDataFromApi = {
        title: seo.metaTitle || seoData.home.title,
        description: seo.metaDescription || seoData.home.description,
        keywords: seo.metaKeywords 
          ? (typeof seo.metaKeywords === 'string' 
              ? seo.metaKeywords.split(',').map((k: string) => k.trim()).filter((k: string) => k.length > 0)
              : Array.isArray(seo.metaKeywords) 
                ? seo.metaKeywords 
                : seoData.home.keywords)
          : seoData.home.keywords,
        canonical: seo.canonicalUrl || seoData.home.canonical,
        openGraph: {
          title: seo.ogTitle,
          description: seo.ogDescription,
          url: seo.ogUrl,
          images: getImageUrl(seo.ogImage) ? [{ url: getImageUrl(seo.ogImage)! }] : undefined,
        },
        twitter: {
          title: seo.twitterTitle,
          description: seo.twitterDescription,
          images: getImageUrl(seo.twitterImage) ? [getImageUrl(seo.twitterImage)!] : undefined,
        },
      };
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Home] Failed to fetch SEO from Strapi, using fallback:', error);
    }
  }
  
  const finalSeoData: SEOData = seoDataFromApi || {
    ...seoData.home,
    openGraph: undefined,
    twitter: undefined,
  };
  
  return generateSEOMetadata(finalSeoData);
}

export default async function HomePageServer() {
  const structuredData = generateStructuredData();
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  let homeData = null;
  try {
    homeData = await fetchStrapi(STRAPI_ENDPOINTS.home, {}, { revalidate: revalidateTime });
  } catch (error) {
    console.warn('[Home] Failed to fetch from Strapi, using fallback data:', error);
  }
  
  const strapiData = homeData as {
    heroSlider?: Array<{
      id: number | string;
      title: string;
      specialTitle?: string;
      subtitle?: string;
      description: string;
      url?: string;
      image?: {
        url?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
        };
      };
    }>;
    featureCards?: Array<{ id: number; title: string; description: string; icon?: string | null }>;
    statsSection?: { statCards?: Array<{ id: number; number: string; text: string; icon?: string | null }> };
    whyChooseUs?: {
      title?: string;
      subtitle?: string;
      featureCards?: Array<{ id: number; title: string; description: string; icon?: string | null }>;
    };
    gallerySection?: {
      title?: string;
      subtitle?: string;
      images?: Array<{
        id: number | string;
        alt?: string;
        title?: string;
        description?: string;
        image?: {
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
          };
        };
      }>;
    };
    partnerBrandsSection?: {
      title?: string;
      subtitle?: string;
      partnerBrands?: Array<{
        id: number | string;
        name: string;
        url?: string;
        logo?: {
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
        };
      }>;
    };
    processSection?: {
      title?: string;
      subtitle?: string;
      steps?: Array<{
        id: number | string;
        stepNumber: number;
        title: string;
        description: string;
        icon?: string | null;
      }>;
    };
    testimonialsSection?: {
      title?: string;
      subtitle?: string;
      testimonials?: Array<{
        id: number | string;
        customerName: string;
        testimonial: string;
        rating: number;
        avatar?: {
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
        };
      }>;
    };
    professionalServicesSection?: {
      title?: string;
      subtitle?: string;
      serviceCards?: Array<{
        id: number | string;
        title: string;
        description: string;
        link?: string;
        icon?: string | null;
        image?: {
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
        };
        features?: Array<{
          id: number | string;
          text: string;
        }>;
      }>;
    };
    featuredProductsSection?: {
      title?: string;
      subtitle?: string;
      products?: Array<{
        id: number | string;
        title: string;
        giaBan: number;
        giaGoc?: number | null;
        anhSanPham?: Array<{
          id: number;
          url?: string;
        }> | null;
        rating?: number | null;
        reviewCount?: number | null;
        badges?: string | null;
        slug?: string;
      }>;
    };
    latestNewsSection?: {
      title?: string;
      subtitle?: string;
      viewAllButton?: {
        text: string;
        url?: string;
      };
      blogs?: Array<{
        id: number | string;
        title: string;
        slug: string;
        moTaNgan?: string;
        avatar?: {
          url?: string;
        } | null;
        publishedAt?: string;
        hashtag?: string | null;
        topicBlog?: {
          name?: string;
        } | null;
      }>;
    };
    productCategoriesSection?: {
      title?: string;
      subtitle?: string;
      danhMucSanPhams?: Array<{
        id: number | string;
        title: string;
        slug: string;
        moTa?: string;
        anhDanhMuc?: {
          url?: string;
        } | null;
      }>;
    };
    specialPromotionsSection?: {
      title?: string;
      subtitle?: string;
      promotionCards?: Array<{
        id: number | string;
        badge?: string | null;
        discount: string;
        endDate?: string;
        title: string;
        description: string;
        link?: string;
        image?: {
          url?: string;
        };
      }>;
    };
  } | null;
  
  const heroSlides = strapiData?.heroSlider && strapiData.heroSlider.length > 0
    ? strapiData.heroSlider.map((slide) => ({
        id: slide.id,
        image: getStrapiImageUrl(slide.image) || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80',
        title: slide.title,
        subtitle: slide.subtitle,
        specialTitle: slide.specialTitle,
        description: slide.description,
        cta: 'Xem thêm',
        href: slide.url || '/san-pham',
      }))
    : undefined;
  
  const features = (strapiData?.featureCards && strapiData.featureCards.length > 0)
    ? strapiData.featureCards.map((card) => ({
        icon: card.icon || 'Shield',
        title: card.title,
        description: card.description,
      }))
    : homeFeatures;
  
  const statistics = (strapiData?.statsSection?.statCards && strapiData.statsSection.statCards.length > 0)
    ? strapiData.statsSection.statCards.map((card) => ({
        icon: card.icon || 'Award',
        value: card.number,
        label: card.text,
      }))
    : homeStatistics;
  
  const whyChooseUsTitle = strapiData?.whyChooseUs?.title;
  const whyChooseUsSubtitle = strapiData?.whyChooseUs?.subtitle;
  const reasons = (strapiData?.whyChooseUs?.featureCards && strapiData.whyChooseUs.featureCards.length > 0)
    ? strapiData.whyChooseUs.featureCards.map((card) => ({
        icon: card.icon || 'Shield',
        title: card.title,
        description: card.description,
      }))
    : homeReasons;
  
  const galleryTitle = strapiData?.gallerySection?.title;
  const gallerySubtitle = strapiData?.gallerySection?.subtitle;
  const galleryImages = (strapiData?.gallerySection?.images && strapiData.gallerySection.images.length > 0)
    ? strapiData.gallerySection.images.map((img) => ({
        id: String(img.id),
        src: getStrapiImageUrl(img.image) || '',
        alt: img.alt || img.title || 'Gallery image',
        title: img.title,
        description: img.description,
      }))
    : homeGalleryImages;
  
  const brandsTitle = strapiData?.partnerBrandsSection?.title;
  const brandsSubtitle = strapiData?.partnerBrandsSection?.subtitle;
  const brands = (strapiData?.partnerBrandsSection?.partnerBrands && strapiData.partnerBrandsSection.partnerBrands.length > 0)
    ? strapiData.partnerBrandsSection.partnerBrands.map((brand) => ({
        name: brand.name,
        logo: getStrapiImageUrl(brand.logo) || '',
        href: brand.url,
      }))
    : homeBrands;
  
  const processTitle = strapiData?.processSection?.title;
  const processSubtitle = strapiData?.processSection?.subtitle;
  const processSteps = (strapiData?.processSection?.steps && strapiData.processSection.steps.length > 0)
    ? strapiData.processSection.steps.map((step) => ({
        icon: step.icon || 'Search',
        title: step.title,
        description: step.description,
        step: step.stepNumber,
      }))
    : homeProcessSteps;
  
  const testimonialsTitle = strapiData?.testimonialsSection?.title;
  const testimonialsSubtitle = strapiData?.testimonialsSection?.subtitle;
  const testimonials = (strapiData?.testimonialsSection?.testimonials && strapiData.testimonialsSection.testimonials.length > 0)
    ? strapiData.testimonialsSection.testimonials.map((testimonial) => ({
        name: testimonial.customerName,
        role: '',
        content: testimonial.testimonial,
        rating: testimonial.rating,
        image: getStrapiImageUrl(testimonial.avatar) || '',
      }))
    : homeTestimonials;
  
  const servicesTitle = strapiData?.professionalServicesSection?.title;
  const servicesSubtitle = strapiData?.professionalServicesSection?.subtitle;
  const services = (strapiData?.professionalServicesSection?.serviceCards && strapiData.professionalServicesSection.serviceCards.length > 0)
    ? strapiData.professionalServicesSection.serviceCards.map((card) => ({
        icon: card.icon || 'Settings',
        title: card.title,
        description: card.description,
        image: getStrapiImageUrl(card.image) || '',
        href: card.link || '#',
        features: card.features?.map((f) => f.text) || [],
      }))
    : homeServices;
  
  const categoriesTitle = strapiData?.productCategoriesSection?.title;
  const categoriesSubtitle = strapiData?.productCategoriesSection?.subtitle;
  
  const getCategoryIcon = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('bảo dưỡng') || titleLower.includes('bao duong')) return 'Wrench';
    if (titleLower.includes('ngoại thất') || titleLower.includes('ngoai that')) return 'Car';
    if (titleLower.includes('đồ chơi') || titleLower.includes('do choi')) return 'Settings';
    return 'Car';
  };
  
  const categories = (strapiData?.productCategoriesSection?.danhMucSanPhams && strapiData.productCategoriesSection.danhMucSanPhams.length > 0)
    ? strapiData.productCategoriesSection.danhMucSanPhams.map((danhMuc) => ({
        icon: getCategoryIcon(danhMuc.title),
        name: danhMuc.title,
        description: danhMuc.moTa || '',
        image: getStrapiImageUrl(danhMuc.anhDanhMuc) || 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=500&fit=crop',
        href: danhMuc.slug ? `/san-pham/${danhMuc.slug}` : '#',
        productCount: 0,
      }))
    : homeCategories;
  
  const productsTitle = strapiData?.featuredProductsSection?.title;
  const productsSubtitle = strapiData?.featuredProductsSection?.subtitle;
  const products = (strapiData?.featuredProductsSection?.products && strapiData.featuredProductsSection.products.length > 0)
    ? strapiData.featuredProductsSection.products.map((product) => {
        const firstImage = product.anhSanPham && product.anhSanPham.length > 0 
          ? product.anhSanPham[0] 
          : null;
        
        return {
          id: String(product.id),
          name: product.title,
          price: product.giaBan,
          originalPrice: product.giaGoc || product.giaBan,
          image: getStrapiImageUrl(firstImage) || '',
          rating: product.rating || 0,
          reviews: product.reviewCount || 0,
          badge: product.badges || undefined,
          href: product.slug ? `/chi-tiet-san-pham/${product.slug}` : '#',
          inStock: true,
        };
      })
    : homeProducts;
  
  const promosTitle = strapiData?.specialPromotionsSection?.title;
  const promosSubtitle = strapiData?.specialPromotionsSection?.subtitle;
  const promos = (strapiData?.specialPromotionsSection?.promotionCards && strapiData.specialPromotionsSection.promotionCards.length > 0)
    ? strapiData.specialPromotionsSection.promotionCards.map((card) => ({
        id: String(card.id),
        title: card.title,
        description: card.description,
        discount: card.discount,
        image: getStrapiImageUrl(card.image) || '',
        href: card.link || '#',
        badge: card.badge || undefined,
        endDate: card.endDate,
      }))
    : homePromos;
  
  const newsTitle = strapiData?.latestNewsSection?.title;
  const newsSubtitle = strapiData?.latestNewsSection?.subtitle;
  const newsViewAllButton = strapiData?.latestNewsSection?.viewAllButton
    ? {
        text: strapiData.latestNewsSection.viewAllButton.text,
        href: strapiData.latestNewsSection.viewAllButton.url || '/tin-tuc',
      }
    : undefined;
  
  const calculateReadTime = (content?: string): number => {
    if (!content) return 5;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };
  
  const articles = (strapiData?.latestNewsSection?.blogs && strapiData.latestNewsSection.blogs.length > 0)
    ? strapiData.latestNewsSection.blogs.map((blog) => {
        const hashtags = blog.hashtag
          ? blog.hashtag.split(/\s+/).map(tag => tag.replace('#', '')).filter(Boolean)
          : [];
        
        return {
          id: String(blog.id),
          title: blog.title,
          excerpt: blog.moTaNgan || '',
          image: getStrapiImageUrl(blog.avatar) || '/images/placeholder-article.jpg',
          href: blog.slug ? `/tin-tuc/${blog.slug}` : '#',
          publishedAt: blog.publishedAt || new Date().toISOString(),
          readTime: calculateReadTime(blog.moTaNgan),
          category: blog.topicBlog?.name || '',
          author: 'Auto Tuan Linh',
          hashtags,
          featured: false,
        };
      })
    : allArticles;
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen">
        <HeroSlider slides={heroSlides} />
        <FeaturesSection features={features} />
        <StatisticsSection statistics={statistics} />
        <ServicesSection title={servicesTitle} subtitle={servicesSubtitle} services={services} />
        <CategoriesSection 
          title={categoriesTitle}
          subtitle={categoriesSubtitle}
          categories={categories} 
        />
        <WhyChooseUsSection title={whyChooseUsTitle} subtitle={whyChooseUsSubtitle} reasons={reasons} />
        <FeaturedProductsSection title={productsTitle} subtitle={productsSubtitle} products={products} />
        <PromoSection title={promosTitle} subtitle={promosSubtitle} promos={promos} />
        <LatestNewsSection 
          title={newsTitle}
          subtitle={newsSubtitle}
          viewAllButton={newsViewAllButton}
          articles={articles} 
        />
        <GallerySection title={galleryTitle} subtitle={gallerySubtitle} images={galleryImages} />
        <BrandsSection title={brandsTitle} subtitle={brandsSubtitle} brands={brands} />
        <ProcessSection title={processTitle} subtitle={processSubtitle} steps={processSteps} />
        <TestimonialsSection title={testimonialsTitle} subtitle={testimonialsSubtitle} testimonials={testimonials} />
      </main>
    </>
  );
}
