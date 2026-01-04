import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
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

export const metadata = generateSEOMetadata(seoData.veChungToi);

export default async function VeChungToiPageServer() {
  // TODO: Fetch data from API here
  // const stats = await fetchStats();
  // const values = await fetchValues();
  // const timeline = await fetchTimeline();
  // const commitments = await fetchCommitments();
  // const partners = await fetchPartners();
  // const certifications = await fetchCertifications();
  // const locations = await fetchLocations();
  // const testimonials = await fetchTestimonials();
  // const processSteps = await fetchProcessSteps();
  // const beforeAfter = await fetchBeforeAfter();
  // const teamMembers = await fetchTeamMembers();

  const stats = veChungToiStats;
  const values = veChungToiValues;
  const timeline = veChungToiTimeline;
  const commitments = veChungToiCommitments;
  const partners = veChungToiPartners;
  const certifications = veChungToiCertifications;
  const locations = veChungToiLocations;
  const testimonials = veChungToiTestimonials;
  const processSteps = veChungToiProcessSteps;
  const beforeAfter = veChungToiBeforeAfter;
  const teamMembers = veChungToiTeamMembers;

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <AboutSection />
      <StatsSection stats={stats} />
      <ValuesSection values={values} />
      <TimelineSection timeline={timeline} />
      <CommitmentsSection commitments={commitments} />
      <PartnersSection partners={partners} />
      <CertificationsSection certifications={certifications} />
      <ShowroomSection />
      <WorkshopSection />
      <LocationsSection locations={locations} />
      <ProcessSection processSteps={processSteps} />
      <BeforeAfterSection beforeAfter={beforeAfter} />
      <TeamSection teamMembers={teamMembers} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </main>
  );
}
