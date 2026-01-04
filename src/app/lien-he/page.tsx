import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import HeroSection from '@/components/lien-he/HeroSection';
import ContactMethodsSection from '@/components/lien-he/ContactMethodsSection';
import FeaturesSection from '@/components/lien-he/FeaturesSection';
import ContactFormSection from '@/components/lien-he/ContactFormSection';
import FAQSection from '@/components/lien-he/FAQSection';
import {
  lienHeContactInfo,
  lienHeSocialLinks,
  lienHeFeatures,
  lienHeFAQs,
} from '@/lib/data/lien-he';

export const metadata = generateSEOMetadata(seoData.lienHe);

export default async function LienHePageServer() {
  // TODO: Fetch data from API here
  // const contactInfo = await fetchContactInfo();
  // const socialLinks = await fetchSocialLinks();
  // const features = await fetchFeatures();
  // const faqs = await fetchFAQs();

  const contactInfo = lienHeContactInfo;
  const socialLinks = lienHeSocialLinks;
  const features = lienHeFeatures;
  const faqs = lienHeFAQs;

  return (
    <main className="min-h-screen bg-white">
      <HeroSection contactInfo={contactInfo} />
      <ContactMethodsSection contactInfo={contactInfo} />
      <FeaturesSection features={features} />
      <ContactFormSection contactInfo={contactInfo} socialLinks={socialLinks} />
      <FAQSection faqs={faqs} />
    </main>
  );
}
