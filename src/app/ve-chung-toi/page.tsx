import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData, type SEOData } from '@/lib/seo';
import { fetchStrapi, getStrapiImageUrl } from '@/lib/api/strapi';
import { STRAPI_ENDPOINTS } from '@/lib/api/endpoints';
import HeroSection from '@/components/ve-chung-toi/HeroSection';
import AboutSection from '@/components/ve-chung-toi/AboutSection';
import StatsSection from '@/components/ve-chung-toi/StatsSection';
import ValuesSection from '@/components/ve-chung-toi/ValuesSection';
import TimelineSection from '@/components/ve-chung-toi/TimelineSection';
import CommitmentsSection from '@/components/ve-chung-toi/CommitmentsSection';
import PartnersSection from '@/components/ve-chung-toi/PartnersSection';
import CertificationsSection from '@/components/ve-chung-toi/CertificationsSection';
import ShowroomSection from '@/components/ve-chung-toi/ShowroomSection';
import WorkshopSection from '@/components/ve-chung-toi/WorkshopSection';
import LocationsSection from '@/components/ve-chung-toi/LocationsSection';
import ProcessSection from '@/components/ve-chung-toi/ProcessSection';
import BeforeAfterSection from '@/components/ve-chung-toi/BeforeAfterSection';
import TeamSection from '@/components/ve-chung-toi/TeamSection';
import TestimonialsSection from '@/components/ve-chung-toi/TestimonialsSection';
import CTASection from '@/components/ve-chung-toi/CTASection';
import {
  veChungToiStats,
  veChungToiValues,
  veChungToiTimeline,
  veChungToiCommitments,
  veChungToiPartners,
  veChungToiCertifications,
  veChungToiLocations,
  veChungToiTestimonials,
  veChungToiProcessSteps,
  veChungToiBeforeAfter,
  veChungToiTeamMembers,
} from '@/lib/data/ve-chung-toi';

export async function generateMetadata(): Promise<Metadata> {
  let seoDataFromApi: SEOData | null = null;
  
  try {
    const veChungToiData = await fetchStrapi<{ seo?: {
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
    } }>('/ve-chung-toi', {}, { revalidate: process.env.NODE_ENV === 'development' ? 0 : 60 });
    
    if (veChungToiData?.seo) {
      const seo = veChungToiData.seo;
      
      const getImageUrl = (image: typeof seo.ogImage): string | undefined => {
        if (!image) return undefined;
        if (typeof image === 'string') return image;
        return image.url || image.formats?.large?.url || image.formats?.medium?.url;
      };
      
      seoDataFromApi = {
        title: seo.metaTitle || seoData.veChungToi.title,
        description: seo.metaDescription || seoData.veChungToi.description,
        keywords: seo.metaKeywords 
          ? (typeof seo.metaKeywords === 'string' 
              ? seo.metaKeywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
              : Array.isArray(seo.metaKeywords) 
                ? seo.metaKeywords 
                : seoData.veChungToi.keywords)
          : seoData.veChungToi.keywords,
        canonical: seo.canonicalUrl || seoData.veChungToi.canonical,
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
      console.warn('[VeChungToi] Failed to fetch SEO from Strapi, using fallback:', error);
    }
  }
  
  const finalSeoData: SEOData = seoDataFromApi || {
    ...seoData.veChungToi,
    openGraph: undefined,
    twitter: undefined,
  };
  
  return generateSEOMetadata(finalSeoData);
}

export default async function VeChungToiPageServer() {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  // Fetch data from API
  let veChungToiData: Record<string, unknown> | null = null;
  
  try {
    veChungToiData = await fetchStrapi<Record<string, unknown>>('/ve-chung-toi', {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[VeChungToi] Fetched data:', veChungToiData);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[VeChungToi] Failed to fetch data from Strapi:', error);
    }
  }
  
  // Map hero section props - only if data exists from API
  const heroSection = veChungToiData?.heroSection as {
    title?: string;
    specialTitle?: string;
    subtitle?: string;
    description?: string;
    url?: string;
    image?: {
      url?: string;
      formats?: {
        large?: { url?: string };
        medium?: { url?: string };
        small?: { url?: string };
      };
    };
  } | undefined;
  
  const heroProps = heroSection ? {
    title: heroSection.title || 'Auto Tuan Linh',
    specialTitle: heroSection.specialTitle || 'Đồng hành cùng bạn',
    subtitle: heroSection.subtitle || '',
    description: heroSection.description || '',
    imageUrl: getStrapiImageUrl(heroSection.image) || '',
  } : undefined;
  
  // Map introduction section props - only if data exists from API
  const introductionSection = veChungToiData?.introductionSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    paragraphs?: string;
    badgeIcon?: {
      url?: string;
      formats?: {
        large?: { url?: string };
        medium?: { url?: string };
        small?: { url?: string };
      };
    };
    image?: {
      url?: string;
      formats?: {
        large?: { url?: string };
        medium?: { url?: string };
        small?: { url?: string };
      };
    };
    imageOverlay?: {
      title?: string;
      subtitle?: string;
    };
  } | undefined;
  
  const aboutProps = introductionSection ? {
    badge: introductionSection.badge || 'Giới thiệu',
    title: introductionSection.title || 'Chúng tôi là ai?',
    titleHighlight: introductionSection.titleHighlight || '',
    paragraphs: introductionSection.paragraphs || '',
    badgeIconUrl: getStrapiImageUrl(introductionSection.badgeIcon) || '',
    imageUrl: getStrapiImageUrl(introductionSection.image) || '',
    imageOverlay: introductionSection.imageOverlay || undefined,
  } : undefined;

  // Map achievements section (stats) - only if data exists from API
  const achievementsSection = veChungToiData?.achievementsSection as {
    statCards?: Array<{
      number?: string;
      text?: string;
      icon?: string | null;
    }>;
  } | undefined;
  
  // Helper to get icon name from string or use fallback
  const getIconName = (icon: string | null | undefined, fallback: string): string => {
    if (icon) {
      const iconMap: Record<string, string> = {
        'users': 'Users',
        'award': 'Award',
        'shopping-bag': 'ShoppingBag',
        'star': 'Star',
        'shield': 'Shield',
        'heart': 'Heart',
        'target': 'Target',
        'zap': 'Zap',
      };
      return iconMap[icon.toLowerCase()] || fallback;
    }
    return fallback;
  };
  
  const stats = achievementsSection?.statCards && achievementsSection.statCards.length > 0
    ? achievementsSection.statCards.map((stat, index) => {
        // Fallback icons based on index
        const fallbackIcons = ['Users', 'Award', 'ShoppingBag', 'Star'];
        const fallbackIcon = fallbackIcons[index % fallbackIcons.length];
        return {
          icon: getIconName(stat.icon, fallbackIcon),
          value: stat.number || '0',
          label: stat.text || '',
          color: index === 0 ? 'from-blue-500 to-blue-600' : index === 1 ? 'from-yellow-500 to-yellow-600' : index === 2 ? 'from-green-500 to-green-600' : 'from-purple-500 to-purple-600',
        };
      })
    : undefined;
  // Map core values section - only if data exists from API
  const coreValuesSection = veChungToiData?.coreValuesSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    badgeIcon?: {
      url?: string;
      formats?: {
        large?: { url?: string };
        medium?: { url?: string };
        small?: { url?: string };
      };
    };
    valueCards?: Array<{
      title?: string;
      description?: string;
      icon?: string | null;
    }>;
  } | undefined;
  
  const values = coreValuesSection?.valueCards && coreValuesSection.valueCards.length > 0
    ? coreValuesSection.valueCards.map((value, index) => ({
        icon: getIconName(value.icon, index === 0 ? 'Shield' : index === 1 ? 'Heart' : index === 2 ? 'Target' : 'Zap'),
        title: value.title || '',
        description: value.description || '',
        color: index === 0 ? 'from-blue-500 to-blue-600' : index === 1 ? 'from-red-500 to-red-600' : index === 2 ? 'from-green-500 to-green-600' : 'from-purple-500 to-purple-600',
      }))
    : undefined;
  // Map history timeline section - only if data exists from API
  const historyTimelineSection = veChungToiData?.historyTimelineSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    badgeIcon?: string | null;
    milestones?: Array<{
      year?: string;
      title?: string;
      description?: string;
      position?: 'left' | 'right';
    }>;
  } | undefined;
  
  const timeline: Array<{
    year: string;
    title: string;
    description: string;
    position?: 'left' | 'right';
  }> | undefined = historyTimelineSection?.milestones && historyTimelineSection.milestones.length > 0
    ? historyTimelineSection.milestones.map((milestone) => ({
        year: milestone.year || '',
        title: milestone.title || '',
        description: milestone.description || '',
        position: milestone.position || 'left',
      }))
    : undefined;
  // Map commitments section - only if data exists from API
  const commitmentsSection = veChungToiData?.commitmentsSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    badgeIcon?: string | null;
    commitmentCards?: Array<{
      title?: string;
      description?: string;
      icon?: string | null;
    }>;
  } | undefined;
  
  const commitments = commitmentsSection?.commitmentCards && commitmentsSection.commitmentCards.length > 0
    ? commitmentsSection.commitmentCards.map((commitment, index) => {
        // Fallback icons based on index
        const fallbackIcons = ['Shield', 'CheckCircle', 'Award', 'Heart'];
        const fallbackIcon = fallbackIcons[index % fallbackIcons.length];
        return {
          icon: getIconName(commitment.icon, fallbackIcon),
          title: commitment.title || '',
          description: commitment.description || '',
          color: index === 0 ? 'from-blue-500 to-blue-600' : index === 1 ? 'from-green-500 to-green-600' : index === 2 ? 'from-yellow-500 to-yellow-600' : 'from-purple-500 to-purple-600',
        };
      })
    : undefined;
  // Map partners section - only if data exists from API
  const partnersSection = veChungToiData?.partnersSection as {
    title?: string;
    subtitle?: string;
    partnerBrands?: Array<{
      name?: string;
      url?: string;
      logo?: {
        url?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
        };
      };
    }>;
  } | undefined;
  
  const partners = partnersSection?.partnerBrands && partnersSection.partnerBrands.length > 0
    ? partnersSection.partnerBrands.map((brand) => ({
        name: brand.name || '',
        logo: getStrapiImageUrl(brand.logo) || '',
        url: brand.url || '#',
      }))
    : undefined;
  // Map certifications section - only if data exists from API
  const certificationsSection = veChungToiData?.certificationsSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    badgeIcon?: string | null;
    certificationCards?: Array<{
      title?: string;
      subtitle?: string;
      icon?: string | null;
    }>;
  } | undefined;
  
  const certifications = certificationsSection?.certificationCards && certificationsSection.certificationCards.length > 0
    ? certificationsSection.certificationCards.map((cert, index) => {
        // Fallback icons based on index
        const fallbackIcons = ['BadgeCheck', 'Award', 'Shield', 'CheckCircle'];
        const fallbackIcon = fallbackIcons[index % fallbackIcons.length];
        return {
          icon: getIconName(cert.icon, fallbackIcon),
          title: cert.title || '',
          description: cert.subtitle || '',
        };
      })
    : undefined;
  // Map showroom section - only if data exists from API
  const showroomSection = veChungToiData?.showroomSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    badgeIcon?: string | null;
    showroomCards?: Array<{
      title?: string;
      subtitle?: string;
      image?: {
        url?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
        };
      };
    }>;
  } | undefined;
  
  const showroomCards = showroomSection?.showroomCards && showroomSection.showroomCards.length > 0
    ? showroomSection.showroomCards.map((card) => ({
        title: card.title || '',
        subtitle: card.subtitle || '',
        image: getStrapiImageUrl(card.image) || '',
      }))
    : undefined;
  
  // Map workshop section - only if data exists from API
  const workshopSection = veChungToiData?.workshopSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    badgeIcon?: string | null;
    featuredImage?: {
      alt?: string;
      image?: {
        url?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
        };
      };
    };
    galleryImages?: Array<{
      alt?: string;
      image?: {
        url?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
        };
      };
    }>;
  } | undefined;
  
  const workshopFeaturedImage = workshopSection?.featuredImage
    ? getStrapiImageUrl(workshopSection.featuredImage.image) || ''
    : undefined;
  
  const workshopGalleryImages = workshopSection?.galleryImages && workshopSection.galleryImages.length > 0
    ? workshopSection.galleryImages.map((item) => ({
        alt: item.alt || '',
        image: getStrapiImageUrl(item.image) || '',
      }))
    : undefined;
  
  // Map process section - only if data exists from API
  const processSection = veChungToiData?.processSection as {
    title?: string;
    subtitle?: string;
    steps?: Array<{
      stepNumber?: number;
      title?: string;
      description?: string;
      icon?: string | null;
    }>;
  } | undefined;
  
  const processSteps = processSection?.steps && processSection.steps.length > 0
    ? processSection.steps.map((step) => ({
        step: step.stepNumber?.toString() || '1',
        title: step.title || '',
        desc: step.description || '',
        image: '', // ProcessSection expects image, but API doesn't provide it
      }))
    : undefined;
  
  // Map before after section - only if data exists from API
  const beforeAfterSection = veChungToiData?.beforeAfterSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    badgeIcon?: string | null;
    projects?: Array<{
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
  } | undefined;
  
  const beforeAfter = beforeAfterSection?.projects && beforeAfterSection.projects.length > 0
    ? beforeAfterSection.projects.map((project) => ({
        image: getStrapiImageUrl(project.image) || '',
        title: project.title || '',
        description: project.description || '',
      }))
    : undefined;
  
  // Map team section - only if data exists from API
  const teamSection = veChungToiData?.teamSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    badgeIcon?: string | null;
    members?: Array<{
      name?: string;
      position?: string;
      avatar?: {
        url?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
        };
      };
    }>;
  } | undefined;
  
  const teamMembers = teamSection?.members && teamSection.members.length > 0
    ? teamSection.members.map((member) => ({
        name: member.name || '',
        role: member.position || '',
        image: getStrapiImageUrl(member.avatar) || '',
      }))
    : undefined;
  
  // Map testimonials section - only if data exists from API
  const testimonialsSection = veChungToiData?.testimonialsSection as {
    title?: string;
    subtitle?: string;
    testimonials?: Array<{
      rating?: number;
      testimonial?: string;
      customerName?: string;
      avatar?: {
        url?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
        };
      };
    }>;
  } | undefined;
  
  const testimonials = testimonialsSection?.testimonials && testimonialsSection.testimonials.length > 0
    ? testimonialsSection.testimonials.map((testimonial) => ({
        name: testimonial.customerName || '',
        role: '', // API doesn't provide role
        content: testimonial.testimonial || '',
        rating: testimonial.rating || 5,
      }))
    : undefined;
  
  // Map CTA section - only if data exists from API
  const ctaSection = veChungToiData?.ctaSection as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
    badgeIcon?: string | null;
    primaryButton?: {
      text?: string;
      url?: string;
      icon?: string | null;
    };
    secondaryButton?: {
      text?: string;
      url?: string;
      icon?: string | null;
    };
  } | undefined;
  
  const locations = veChungToiLocations;

  return (
    <main className="min-h-screen bg-white">
      {heroProps ? (
        <HeroSection 
          title={heroProps.title}
          specialTitle={heroProps.specialTitle}
          subtitle={heroProps.subtitle}
          description={heroProps.description}
          imageUrl={heroProps.imageUrl}
        />
      ) : null}
      {aboutProps ? (
        <AboutSection 
          badge={aboutProps.badge}
          title={aboutProps.title}
          titleHighlight={aboutProps.titleHighlight}
          paragraphs={aboutProps.paragraphs}
          badgeIconUrl={aboutProps.badgeIconUrl}
          imageUrl={aboutProps.imageUrl}
          imageOverlay={aboutProps.imageOverlay}
        />
      ) : null}
      {stats && stats.length > 0 && <StatsSection stats={stats} />}
      {values && values.length > 0 && (
        <ValuesSection 
          badge={coreValuesSection?.badge}
          title={coreValuesSection?.title}
          titleHighlight={coreValuesSection?.titleHighlight}
          subtitle={coreValuesSection?.subtitle}
          values={values} 
        />
      )}
      {timeline && timeline.length > 0 ? (
        <TimelineSection 
          badge={historyTimelineSection?.badge}
          title={historyTimelineSection?.title}
          titleHighlight={historyTimelineSection?.titleHighlight}
          subtitle={historyTimelineSection?.subtitle}
          timeline={timeline} 
        />
      ) : null}
      {commitments && commitments.length > 0 ? (
        <CommitmentsSection 
          badge={commitmentsSection?.badge}
          title={commitmentsSection?.title}
          titleHighlight={commitmentsSection?.titleHighlight}
          subtitle={commitmentsSection?.subtitle}
          commitments={commitments} 
        />
      ) : null}
      {partners && partners.length > 0 ? (
        <PartnersSection 
          title={partnersSection?.title}
          subtitle={partnersSection?.subtitle}
          partners={partners} 
        />
      ) : null}
      {certifications && certifications.length > 0 ? (
        <CertificationsSection 
          badge={certificationsSection?.badge}
          title={certificationsSection?.title}
          titleHighlight={certificationsSection?.titleHighlight}
          subtitle={certificationsSection?.subtitle}
          certifications={certifications} 
        />
      ) : null}
      {showroomCards && showroomCards.length > 0 ? (
        <ShowroomSection 
          badge={showroomSection?.badge}
          title={showroomSection?.title}
          titleHighlight={showroomSection?.titleHighlight}
          subtitle={showroomSection?.subtitle}
          showroomCards={showroomCards}
        />
      ) : null}
      {(workshopFeaturedImage || (workshopGalleryImages && workshopGalleryImages.length > 0)) ? (
        <WorkshopSection 
          badge={workshopSection?.badge}
          title={workshopSection?.title}
          titleHighlight={workshopSection?.titleHighlight}
          subtitle={workshopSection?.subtitle}
          featuredImage={workshopFeaturedImage}
          galleryImages={workshopGalleryImages}
        />
      ) : null}
      <LocationsSection locations={locations} />
      {processSteps && processSteps.length > 0 ? (
        <ProcessSection 
          title={processSection?.title}
          subtitle={processSection?.subtitle}
          processSteps={processSteps} 
        />
      ) : null}
      {beforeAfter && beforeAfter.length > 0 ? (
        <BeforeAfterSection 
          badge={beforeAfterSection?.badge}
          title={beforeAfterSection?.title}
          titleHighlight={beforeAfterSection?.titleHighlight}
          subtitle={beforeAfterSection?.subtitle}
          beforeAfter={beforeAfter} 
        />
      ) : null}
      {teamMembers && teamMembers.length > 0 ? (
        <TeamSection 
          badge={teamSection?.badge}
          title={teamSection?.title}
          titleHighlight={teamSection?.titleHighlight}
          subtitle={teamSection?.subtitle}
          teamMembers={teamMembers} 
        />
      ) : null}
      {testimonials && testimonials.length > 0 ? (
        <TestimonialsSection 
          title={testimonialsSection?.title}
          subtitle={testimonialsSection?.subtitle}
          testimonials={testimonials} 
        />
      ) : null}
      <CTASection 
        badge={ctaSection?.badge}
        title={ctaSection?.title}
        titleHighlight={ctaSection?.titleHighlight}
        description={ctaSection?.description}
        primaryButton={ctaSection?.primaryButton}
        secondaryButton={ctaSection?.secondaryButton}
      />
    </main>
  );
}
