import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import SanPhamPageClient from '@/components/san-pham/SanPhamPageClient';
import { productCategories } from '@/components/layout/constants/headerData';
import { convertProductCategoriesToData } from '@/lib/data/san-pham';
import { Car, Wrench, Settings, Film, Music, Sparkles } from 'lucide-react';

export const metadata: Metadata = generateSEOMetadata(seoData.sanPham);

export default async function Page() {
  // TODO: Fetch categories from API
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

  // Convert productCategories to ProductCategoryData format
  const categories = convertProductCategoriesToData(productCategories, iconMap);

  return <SanPhamPageClient categories={categories} />;
}

