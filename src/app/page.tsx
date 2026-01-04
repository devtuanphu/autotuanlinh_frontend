import { generateMetadata as generateSEOMetadata, seoData, generateStructuredData } from '@/lib/seo';
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

export const metadata = generateSEOMetadata(seoData.home);

export default async function HomePageServer() {
  const structuredData = generateStructuredData();
  
  // TODO: Fetch data from API here
  // const features = await fetchFeatures();
  // const statistics = await fetchStatistics();
  // const services = await fetchServices();
  // const categories = await fetchCategories();
  // const reasons = await fetchReasons();
  // const products = await fetchProducts();
  // const articles = await fetchArticles();
  // const brands = await fetchBrands();
  // const processSteps = await fetchProcessSteps();
  // const testimonials = await fetchTestimonials();
  
  const features = homeFeatures;
  const statistics = homeStatistics;
  const services = homeServices;
  const categories = homeCategories;
  const reasons = homeReasons;
  const products = homeProducts;
  const articles = allArticles;
  const brands = homeBrands;
  const processSteps = homeProcessSteps;
  const galleryImages = homeGalleryImages;
  const faqs = homeFAQs;
  const promos = homePromos;
  const contactInfos = homeContactInfos;
  const testimonials = homeTestimonials;
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen">
        <HeroSlider />
        <FeaturesSection features={features} />
        <StatisticsSection statistics={statistics} />
        <ServicesSection services={services} />
        <CategoriesSection categories={categories} />
        <WhyChooseUsSection reasons={reasons} />
        <FeaturedProductsSection products={products} />
        <PromoSection promos={promos} />
        <LatestNewsSection articles={articles} />
        <GallerySection images={galleryImages} />
        <BrandsSection brands={brands} />
        <ProcessSection steps={processSteps} />
        <FAQSection faqs={faqs} />
        <TestimonialsSection testimonials={testimonials} />
        <ContactInfoSection contactInfos={contactInfos} />
        <NewsletterSection />
        <CTASection />
      </main>
    </>
  );
}
