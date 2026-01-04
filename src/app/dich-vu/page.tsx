import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import HeroSection from '@/components/dich-vu/HeroSection';
import CategoriesSection, { ServiceCategory } from '@/components/dich-vu/CategoriesSection';
import BenefitsSection from '@/components/dich-vu/BenefitsSection';
import { serviceCategories } from '@/components/layout/constants/headerData';
import { dichVuBenefits, dichVuTrustStats } from '@/lib/data/dich-vu';

export const metadata: Metadata = generateSEOMetadata(seoData.dichVu);

export default async function Page() {
  // TODO: Fetch data from API here
  // const categories = await fetchServiceCategories();

  // Convert serviceCategories to match ServiceCategory interface
  // Map icon components to string names
  const iconNameMap: Record<string, string> = {
    'dan-phim-cach-nhiet': 'Film',
    'boc-ghe-da': 'Car',
    'nang-cap-am-thanh': 'Music',
  };

  const categories: ServiceCategory[] = serviceCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: iconNameMap[cat.id] || 'Car', // Map category id to icon name
    href: cat.href,
    children: cat.children,
  }));

  // Tính tổng số dịch vụ
  const getTotalServices = (category: ServiceCategory) => {
    let total = 0;
    category.children?.forEach(sub => {
      total += sub.children?.length || 0;
    });
    return total;
  };

  const totalServices = categories.reduce((sum, cat) => sum + getTotalServices(cat), 0);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection categoryCount={categories.length} totalServices={totalServices} />
      <CategoriesSection categories={categories} />
      <BenefitsSection benefits={dichVuBenefits} trustStats={dichVuTrustStats} />
    </main>
  );
}
