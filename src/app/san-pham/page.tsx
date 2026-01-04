import { Metadata } from 'next';
import { Suspense } from 'react';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import SanPhamPageClient from '@/components/san-pham/SanPhamPageClient';
import { productCategories } from '@/components/layout/constants/headerData';
import { convertProductCategoriesToData } from '@/lib/data/san-pham';
import { Car, Wrench, Settings, Film, Music, Sparkles } from 'lucide-react';

export const metadata: Metadata = generateSEOMetadata(seoData.sanPham);

function SanPhamPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-3">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="lg:col-span-9">
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  return (
    <Suspense fallback={<SanPhamPageLoading />}>
      <SanPhamPageClient categories={categories} />
    </Suspense>
  );
}

