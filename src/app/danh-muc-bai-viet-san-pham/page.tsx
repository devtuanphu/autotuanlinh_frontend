import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import HeroSection from '@/components/danh-muc-bai-viet-san-pham/HeroSection';
import CategoriesSection from '@/components/danh-muc-bai-viet-san-pham/CategoriesSection';
import BenefitsSection from '@/components/danh-muc-bai-viet-san-pham/BenefitsSection';
import TrustSection from '@/components/danh-muc-bai-viet-san-pham/TrustSection';
import { productCategories } from '@/components/layout/constants/headerData';
import {
  ProductCategoryData,
  danhMucBaiVietSanPhamBenefits,
  danhMucBaiVietSanPhamTrustStats,
  getTotalArticles,
} from '@/lib/data/danh-muc-bai-viet-san-pham';
import { Car, Wrench, Settings, Film, Music, Sparkles } from 'lucide-react';

export const metadata: Metadata = generateSEOMetadata(seoData.danhMucBaiVietSanPham);

export default async function Page() {
  // TODO: Fetch data from API here
  // const categories = await fetchProductCategories();

  // Create icon mapping
  const iconMap = new Map([
    [Car, 'Car'],
    [Wrench, 'Wrench'],
    [Settings, 'Settings'],
    [Film, 'Film'],
    [Music, 'Music'],
    [Sparkles, 'Sparkles'],
  ]);

  // Convert productCategories to match ProductCategoryData interface
  const categories: ProductCategoryData[] = productCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: iconMap.get(cat.icon) || 'Car', // Convert icon component to string name
    href: cat.href,
    children: cat.children,
  }));

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
