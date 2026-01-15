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
import FAQSection from '@/components/home/FAQSection';
import PromoSection from '@/components/home/PromoSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import ContactInfoSection from '@/components/home/ContactInfoSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
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
  homeFAQs,
  homePromos,
  homeContactInfos
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
    // Strapi returns: seo.metaTitle, seo.metaDescription, seo.metaKeywords, etc.
    if (homeData?.seo) {
      const seo = homeData.seo as {
        metaTitle?: string;
        metaDescription?: string;
        metaKeywords?: string; // Note: metaKeywords (not metakeywords)
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
      
      // Helper to get image URL from Strapi image object
      const getImageUrl = (image: typeof seo.ogImage): string | undefined => {
        if (!image) return undefined;
        if (typeof image === 'string') return image;
        return image.url || image.formats?.large?.url || image.formats?.medium?.url;
      };
      
      seoDataFromApi = {
        title: seo.metaTitle || seoData.home.title,
        description: seo.metaDescription || seoData.home.description,
        keywords: seo.metaKeywords 
          ? (typeof seo.metaKeywords === 'string' 
              ? seo.metaKeywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
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
    // Silently fallback to hardcoded SEO data
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Home] Failed to fetch SEO from Strapi, using fallback:', error);
    }
  }
  
  // Use Strapi SEO data if available, otherwise use fallback
  const finalSeoData: SEOData = seoDataFromApi || {
    ...seoData.home,
    openGraph: undefined,
    twitter: undefined,
  };
  
  return generateSEOMetadata(finalSeoData);
}

export default async function HomePageServer() {
  const structuredData = generateStructuredData();
  
  // Fetch home data from Strapi API
  // Use shorter revalidate in development to see changes faster
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  let homeData = null;
  try {
    homeData = await fetchStrapi(STRAPI_ENDPOINTS.home, {}, { revalidate: revalidateTime });
    console.log('[Home] Fetched data:', homeData);
    if (homeData && typeof homeData === 'object' && 'heroSlider' in homeData) {
      const heroSlider = (homeData as { heroSlider?: unknown[] }).heroSlider;
      console.log(`[Home] heroSlider items: ${heroSlider?.length || 0}`);
    }
  } catch (error) {
    console.warn('[Home] Failed to fetch from Strapi, using fallback data:', error);
  }
  
  // Use Strapi data if available, otherwise use fallback
  // Map Strapi data structure to component props
  // Strapi structure: featureCards, statsSection.statCards, whyChooseUs.featureCards, etc.
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
    faqSection?: {
      title?: string;
      subtitle?: string;
      icon?: string | null;
      faqItems?: Array<{
        id: number | string;
        question: string;
        answer: string;
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
    contactSection?: {
      title?: string;
      subtitle?: string;
      contactInfoCards?: Array<{
        id: number | string;
        title: string;
        details: string;
        ctaText?: string;
        ctaUrl?: string;
        icon?: string | null;
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
        documentId?: string;
        title: string;
        giaBan: number;
        giaGoc?: number | null;
        anhSanPham?: Array<{
          id: number;
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
        }> | null;
        rating?: number | null;
        reviewCount?: number | null;
        badges?: string | null;
        slug?: string;
      }>;
    };
    ctaSection?: {
      title?: string;
      subtitle?: string;
      primaryButton?: {
        id?: number | string;
        text: string;
        url?: string;
        icon?: string;
        style?: string;
      };
      secondaryButton?: {
        id?: number | string;
        text: string;
        url?: string;
        icon?: string;
        style?: string;
      };
    };
    latestNewsSection?: {
      title?: string;
      subtitle?: string;
      viewAllButton?: {
        id?: number | string;
        text: string;
        url?: string;
        icon?: string;
        style?: string;
      };
      blogs?: Array<{
        id: number | string;
        title: string;
        slug: string;
        moTaNgan?: string;
        avatar?: {
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
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
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
        } | null;
        danhMucCapHai?: Array<{
          id: number | string;
          title: string;
          slug: string;
          danhMucCapBa?: Array<{
            id: number | string;
            title: string;
            slug: string;
          }>;
        }>;
      }>;
    };
    newsletterSection?: {
      title?: string;
      subtitle?: string;
      buttonText?: string;
      privacyText?: string;
      icon?: string | null;
    };
    categories?: Array<unknown>;
    specialPromotionsSection?: {
      title?: string;
      subtitle?: string;
      promotionCards?: Array<{
        id: number | string;
        badge?: string | null;
        discount: string;
        isFree?: boolean;
        endDate?: string;
        title: string;
        description: string;
        link?: string;
        buttonText?: string;
        image?: {
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
  } | null;
  
  // Map heroSlider data
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
  
  // Map Strapi fields to component props
  const features = (strapiData?.featureCards && strapiData.featureCards.length > 0)
    ? strapiData.featureCards.map((card) => ({
        icon: card.icon || 'Shield', // Default to 'Shield' if icon is null
        title: card.title,
        description: card.description,
      }))
    : homeFeatures;
  
  const statistics = (strapiData?.statsSection?.statCards && strapiData.statsSection.statCards.length > 0)
    ? strapiData.statsSection.statCards.map((card) => ({
        icon: card.icon || 'Award', // Default to 'Award' if icon is null
        value: card.number,
        label: card.text,
      }))
    : homeStatistics;
  
  const whyChooseUsTitle = strapiData?.whyChooseUs?.title;
  const whyChooseUsSubtitle = strapiData?.whyChooseUs?.subtitle;
  const reasons = (strapiData?.whyChooseUs?.featureCards && strapiData.whyChooseUs.featureCards.length > 0)
    ? strapiData.whyChooseUs.featureCards.map((card) => ({
        icon: card.icon || 'Shield', // Default to 'Shield' if icon is null
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
        icon: step.icon || 'Search', // Default to 'Search' if icon is null
        title: step.title,
        description: step.description,
        step: step.stepNumber,
      }))
    : homeProcessSteps;
  
  const faqTitle = strapiData?.faqSection?.title;
  const faqSubtitle = strapiData?.faqSection?.subtitle;
  const faqs = (strapiData?.faqSection?.faqItems && strapiData.faqSection.faqItems.length > 0)
    ? strapiData.faqSection.faqItems.map((item) => ({
        question: item.question,
        answer: item.answer,
      }))
    : homeFAQs;
  
  const testimonialsTitle = strapiData?.testimonialsSection?.title;
  const testimonialsSubtitle = strapiData?.testimonialsSection?.subtitle;
  const testimonials = (strapiData?.testimonialsSection?.testimonials && strapiData.testimonialsSection.testimonials.length > 0)
    ? strapiData.testimonialsSection.testimonials.map((testimonial) => ({
        name: testimonial.customerName,
        role: '', // Strapi không có role, để trống hoặc có thể thêm sau
        content: testimonial.testimonial,
        rating: testimonial.rating,
        image: getStrapiImageUrl(testimonial.avatar) || '',
      }))
    : homeTestimonials;
  
  const contactTitle = strapiData?.contactSection?.title;
  const contactSubtitle = strapiData?.contactSection?.subtitle;
  const contactInfos = (strapiData?.contactSection?.contactInfoCards && strapiData.contactSection.contactInfoCards.length > 0)
    ? strapiData.contactSection.contactInfoCards.map((card) => ({
        icon: card.icon || 'MapPin', // Default to 'MapPin' if icon is null
        title: card.title,
        content: card.details,
        link: card.ctaUrl,
        linkText: card.ctaText,
      }))
    : homeContactInfos;
  
  // Professional Services Section
  const servicesTitle = strapiData?.professionalServicesSection?.title;
  const servicesSubtitle = strapiData?.professionalServicesSection?.subtitle;
  const services = (strapiData?.professionalServicesSection?.serviceCards && strapiData.professionalServicesSection.serviceCards.length > 0)
    ? strapiData.professionalServicesSection.serviceCards.map((card) => ({
        icon: card.icon || 'Settings', // Default to 'Settings' if icon is null
        title: card.title,
        description: card.description,
        image: getStrapiImageUrl(card.image) || '',
        href: card.link || '#',
        features: card.features?.map((f) => f.text) || [],
      }))
    : homeServices;
  
  // Product Categories Section
  const categoriesTitle = strapiData?.productCategoriesSection?.title;
  const categoriesSubtitle = strapiData?.productCategoriesSection?.subtitle;
  
  // Map icon based on category title (simple mapping)
  const getCategoryIcon = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('bảo dưỡng') || titleLower.includes('bao duong')) return 'Wrench';
    if (titleLower.includes('ngoại thất') || titleLower.includes('ngoai that')) return 'Car';
    if (titleLower.includes('đồ chơi') || titleLower.includes('do choi')) return 'Settings';
    return 'Car'; // Default
  };
  
  const categories = (strapiData?.productCategoriesSection?.danhMucSanPhams && strapiData.productCategoriesSection.danhMucSanPhams.length > 0)
    ? strapiData.productCategoriesSection.danhMucSanPhams.map((danhMuc) => ({
        icon: getCategoryIcon(danhMuc.title),
        name: danhMuc.title,
        description: danhMuc.moTa || '',
        image: getStrapiImageUrl(danhMuc.anhDanhMuc) || 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=500&fit=crop',
        href: danhMuc.slug ? `/san-pham/${danhMuc.slug}` : '#',
        productCount: 0, // Not used, but kept for interface compatibility
      }))
    : homeCategories;
  
  // Featured Products Section
  const productsTitle = strapiData?.featuredProductsSection?.title;
  const productsSubtitle = strapiData?.featuredProductsSection?.subtitle;
  const products = (strapiData?.featuredProductsSection?.products && strapiData.featuredProductsSection.products.length > 0)
    ? strapiData.featuredProductsSection.products.map((product) => {
        // Get first image from anhSanPham array
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
          inStock: true, // Default to true, can be enhanced with API data later
        };
      })
    : homeProducts;
  
  // Special Promotions Section
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
  // CTA Section
  const ctaTitle = strapiData?.ctaSection?.title;
  const ctaSubtitle = strapiData?.ctaSection?.subtitle;
  const ctaPrimaryButton = strapiData?.ctaSection?.primaryButton
    ? {
        text: strapiData.ctaSection.primaryButton.text,
        href: strapiData.ctaSection.primaryButton.url || '#',
      }
    : undefined;
  const ctaSecondaryButton = strapiData?.ctaSection?.secondaryButton
    ? {
        text: strapiData.ctaSection.secondaryButton.text,
        href: strapiData.ctaSection.secondaryButton.url || '#',
      }
    : undefined;
  
  // Latest News Section
  const newsTitle = strapiData?.latestNewsSection?.title;
  const newsSubtitle = strapiData?.latestNewsSection?.subtitle;
  const newsViewAllButton = strapiData?.latestNewsSection?.viewAllButton
    ? {
        text: strapiData.latestNewsSection.viewAllButton.text,
        href: strapiData.latestNewsSection.viewAllButton.url || '/tin-tuc',
      }
    : undefined;
  
  // Calculate read time from content (rough estimate: 200 words per minute)
  const calculateReadTime = (content?: string): number => {
    if (!content) return 5; // default
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };
  
  const articles = (strapiData?.latestNewsSection?.blogs && strapiData.latestNewsSection.blogs.length > 0)
    ? strapiData.latestNewsSection.blogs.map((blog) => {
        // Parse hashtags from string (e.g., "#tag1 #tag2" -> ["tag1", "tag2"])
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
          author: 'Auto Tuan Linh', // Default author
          hashtags,
          featured: false, // Can be enhanced later
        };
      })
    : allArticles;
  
  // Newsletter Section
  const newsletterTitle = strapiData?.newsletterSection?.title;
  const newsletterSubtitle = strapiData?.newsletterSection?.subtitle;
  const newsletterButtonText = strapiData?.newsletterSection?.buttonText;
  const newsletterPrivacyText = strapiData?.newsletterSection?.privacyText;
  
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
