import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData, SEOData } from '@/lib/seo';
import HeroSection from '@/components/lien-he/HeroSection';
import ContactMethodsSection from '@/components/lien-he/ContactMethodsSection';
import FeaturesSection from '@/components/lien-he/FeaturesSection';
import ContactFormSection from '@/components/lien-he/ContactFormSection';
import FAQSection from '@/components/lien-he/FAQSection';
import { fetchStrapi } from '@/lib/api/strapi';
import {
  lienHeContactInfo,
  lienHeSocialLinks,
  lienHeFeatures,
  lienHeFAQs,
  ContactInfo,
  SocialLink,
  Feature,
  FAQ,
} from '@/lib/data/lien-he';

export async function generateMetadata(): Promise<Metadata> {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  try {
    const strapiData = await fetchStrapi<{
      id: number | string;
      seo?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        metaKeywords?: string | null;
      };
    }>('/lien-he', {}, { revalidate: revalidateTime });
    
    if (strapiData && typeof strapiData === 'object' && 'seo' in strapiData && strapiData.seo) {
      const seo = strapiData.seo;
      const seoDataFromApi: SEOData = {
        title: seo.metaTitle || seoData.lienHe.title,
        description: seo.metaDescription || seoData.lienHe.description,
        keywords: seo.metaKeywords ? seo.metaKeywords.split(',').map(k => k.trim()) : seoData.lienHe.keywords,
        canonical: seoData.lienHe.canonical,
      };
      
      return generateSEOMetadata(seoDataFromApi);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[lien-he] Failed to fetch SEO data, using defaults:', error);
    }
  }
  
  return generateSEOMetadata(seoData.lienHe);
}

export default async function LienHePageServer() {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  // Default values
  let contactInfo: ContactInfo = lienHeContactInfo;
  let socialLinks: SocialLink[] = lienHeSocialLinks;
  let features: Feature[] = lienHeFeatures;
  let faqs: FAQ[] = lienHeFAQs;
  
  // CTA Section props
  let ctaSection: {
    badge?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    primaryButton?: {
      text?: string;
      url?: string;
    };
    secondaryButton?: {
      text?: string;
      url?: string;
    };
  } | null = null;
  
  // Contact Form Section props
  let contactFormSection: {
    badge?: string;
    title?: string;
    subtitle?: string;
    mapEmbedUrl?: string;
    mapTitle?: string;
    mapLink?: string;
    workingHours?: {
      title?: string;
      subtitle?: string;
      timeSlots?: Array<{
        label?: string;
        days?: string;
        hours?: string;
      }>;
    };
    socialLinks?: Array<{
      url?: string;
      icon?: string | null;
    }>;
  } | null = null;
  
  // Store data for components
  let contactInfoCards: Array<{
    title?: string | null;
    value?: string | null;
    description?: string | null;
    url?: string | null;
    icon?: string | null;
    badge?: {
      text?: string | null;
      icon?: string | null;
    } | null;
  }> | null = null;
  
  let professionalServicesTitle: string | undefined;
  let professionalServicesSubtitle: string | undefined;
  let faqTitle: string | undefined;
  let faqSubtitle: string | undefined;
  
  try {
    const strapiData = await fetchStrapi<{
      id: number | string;
      contactCtaSection?: {
        badge?: string | null;
        title?: string | null;
        subtitle?: string | null;
        description?: string | null;
        primaryButton?: {
          text?: string | null;
          url?: string | null;
          icon?: string | null;
          style?: string | null;
        } | null;
        secondaryButton?: {
          text?: string | null;
          url?: string | null;
          icon?: string | null;
          style?: string | null;
        } | null;
      };
      contactInfoCardsSection?: {
        contactInfoCards?: Array<{
          title?: string | null;
          value?: string | null;
          description?: string | null;
          url?: string | null;
          icon?: string | null;
          badge?: {
            text?: string | null;
            icon?: string | null;
          } | null;
        }> | null;
      };
      professionalServicesSection?: {
        title?: string | null;
        subtitle?: string | null;
        serviceCards?: Array<{
          title?: string | null;
          description?: string | null;
          link?: string | null;
          icon?: string | null;
          image?: unknown;
          features?: Array<{
            text?: string | null;
          }> | null;
        }> | null;
      };
      contactFormSection?: {
        badge?: string | null;
        title?: string | null;
        subtitle?: string | null;
        mapEmbedUrl?: string | null;
        mapTitle?: string | null;
        mapLink?: string | null;
        workingHours?: {
          title?: string | null;
          subtitle?: string | null;
          timeSlots?: Array<{
            label?: string | null;
            days?: string | null;
            hours?: string | null;
            icon?: string | null;
          }> | null;
        } | null;
        socialLinks?: Array<{
          url?: string | null;
          icon?: string | null;
        }> | null;
      };
      faqSection?: {
        title?: string | null;
        subtitle?: string | null;
        faqItems?: Array<{
          question?: string | null;
          answer?: string | null;
        }> | null;
      };
    }>('/lien-he', {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[lien-he] Fetched data:', strapiData);
    }
    
    if (strapiData && typeof strapiData === 'object') {
      // Map contactCtaSection
      if (strapiData.contactCtaSection) {
        ctaSection = {
          badge: strapiData.contactCtaSection.badge || undefined,
          title: strapiData.contactCtaSection.title || undefined,
          subtitle: strapiData.contactCtaSection.subtitle || undefined,
          description: strapiData.contactCtaSection.description || undefined,
          primaryButton: strapiData.contactCtaSection.primaryButton ? {
            text: strapiData.contactCtaSection.primaryButton.text || undefined,
            url: strapiData.contactCtaSection.primaryButton.url || undefined,
          } : undefined,
          secondaryButton: strapiData.contactCtaSection.secondaryButton ? {
            text: strapiData.contactCtaSection.secondaryButton.text || undefined,
            url: strapiData.contactCtaSection.secondaryButton.url || undefined,
          } : undefined,
        };
      }
      
      // Map contactInfoCardsSection to ContactInfo
      if (strapiData.contactInfoCardsSection?.contactInfoCards) {
        contactInfoCards = strapiData.contactInfoCardsSection.contactInfoCards;
        const cards = strapiData.contactInfoCardsSection.contactInfoCards;
        // Find hotline, email, address from cards
        const hotlineCard = cards.find(card => card.title?.toLowerCase().includes('hotline') || card.title?.toLowerCase().includes('điện thoại'));
        const emailCard = cards.find(card => card.title?.toLowerCase().includes('email'));
        const addressCard = cards.find(card => card.title?.toLowerCase().includes('địa chỉ') || card.title?.toLowerCase().includes('address'));
        
        contactInfo = {
          hotline: hotlineCard?.value || contactInfo.hotline,
          email: emailCard?.value || contactInfo.email,
          address: addressCard?.value || contactInfo.address,
          workingHours: contactInfo.workingHours, // Keep default for now
        };
      }
      
      // Map professionalServicesSection to Features
      if (strapiData.professionalServicesSection) {
        professionalServicesTitle = strapiData.professionalServicesSection.title || undefined;
        professionalServicesSubtitle = strapiData.professionalServicesSection.subtitle || undefined;
        
        if (strapiData.professionalServicesSection.serviceCards) {
          features = strapiData.professionalServicesSection.serviceCards.map((service, index) => ({
            icon: service.icon || 'Settings',
            title: service.title || '',
            description: service.description || '',
            gradient: ['from-blue-500 to-cyan-500', 'from-yellow-500 to-orange-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500'][index % 4],
          }));
        }
      }
      
      // Map contactFormSection
      if (strapiData.contactFormSection) {
        contactFormSection = {
          badge: strapiData.contactFormSection.badge || undefined,
          title: strapiData.contactFormSection.title || undefined,
          subtitle: strapiData.contactFormSection.subtitle || undefined,
          mapEmbedUrl: strapiData.contactFormSection.mapEmbedUrl || undefined,
          mapTitle: strapiData.contactFormSection.mapTitle || undefined,
          mapLink: strapiData.contactFormSection.mapLink || undefined,
          workingHours: strapiData.contactFormSection.workingHours ? {
            title: strapiData.contactFormSection.workingHours.title || undefined,
            subtitle: strapiData.contactFormSection.workingHours.subtitle || undefined,
            timeSlots: strapiData.contactFormSection.workingHours.timeSlots?.map(slot => ({
              label: slot.label || undefined,
              days: slot.days || undefined,
              hours: slot.hours || undefined,
            })) || undefined,
          } : undefined,
          socialLinks: strapiData.contactFormSection.socialLinks?.map(link => ({
            url: link.url || undefined,
            icon: link.icon || undefined,
          })) || undefined,
        };
        
        // Map workingHours from contactFormSection
        if (strapiData.contactFormSection.workingHours?.timeSlots && strapiData.contactFormSection.workingHours.timeSlots.length >= 2) {
          contactInfo = {
            ...contactInfo,
            workingHours: {
              weekdays: strapiData.contactFormSection.workingHours.timeSlots[0]?.hours || contactInfo.workingHours.weekdays,
              weekends: strapiData.contactFormSection.workingHours.timeSlots[1]?.hours || contactInfo.workingHours.weekends,
            },
          };
        }
        
        // Map socialLinks from contactFormSection
        if (strapiData.contactFormSection.socialLinks) {
          socialLinks = strapiData.contactFormSection.socialLinks.map((link) => {
            const iconName = link.icon || 'Globe';
            return {
              name: iconName,
              icon: iconName,
              href: link.url || '#',
              color: 'bg-gray-500', // Default color
            };
          });
        }
      }
      
      // Map faqSection
      if (strapiData.faqSection) {
        faqTitle = strapiData.faqSection.title || undefined;
        faqSubtitle = strapiData.faqSection.subtitle || undefined;
        
        if (strapiData.faqSection.faqItems) {
          faqs = strapiData.faqSection.faqItems
            .filter(item => item.question && item.answer)
            .map((item) => ({
              question: item.question || '',
              answer: item.answer || '',
            }));
        }
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[lien-he] Failed to fetch data, using defaults:', error);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <HeroSection contactInfo={contactInfo} ctaSection={ctaSection} />
      <ContactMethodsSection contactInfo={contactInfo} contactInfoCards={contactInfoCards} />
      <FeaturesSection features={features} title={professionalServicesTitle} subtitle={professionalServicesSubtitle} />
      <ContactFormSection contactInfo={contactInfo} socialLinks={socialLinks} contactFormSection={contactFormSection} />
      <FAQSection faqs={faqs} title={faqTitle} subtitle={faqSubtitle} />
    </main>
  );
}
