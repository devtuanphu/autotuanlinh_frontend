import { Metadata } from 'next';
import { Suspense } from 'react';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import ProductListLayout from '@/components/shared/ProductListLayout';
import ProductCategoryDetailSections from '@/components/san-pham/ProductCategoryDetailSections';
import NotFoundSection from '@/components/san-pham/NotFoundSection';
import { productCategories } from '@/components/layout/constants/headerData';
import { findProductCategoryDetail, convertProductCategoriesToData } from '@/lib/data/san-pham';
import { Car, Wrench, Settings, Film, Music, Sparkles } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata(_props: PageProps): Promise<Metadata> {
  // TODO: Generate dynamic metadata based on category
  // const categories = await fetchProductCategories();
  // const categoryDetail = await findProductCategoryDetail(categories, params.id);
  // if (categoryDetail) {
  //   return generateSEOMetadata({
  //     ...seoData.sanPham,
  //     title: `${categoryDetail.subCategory.name} - ${seoData.sanPham.title}`,
  //     description: `Khám phá các sản phẩm về ${categoryDetail.subCategory.name.toLowerCase()}...`,
  //   });
  // }
  return generateSEOMetadata(seoData.sanPham);
}

export default async function Page({ params }: PageProps) {
  // TODO: Fetch data from API here
  // const categories = await fetchProductCategories();
  // const categoryDetail = await findProductCategoryDetail(categories, params.id);

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

  // Find category detail by subCategory id
  const categoryDetail = findProductCategoryDetail(categories, params.id);

  if (!categoryDetail) {
    return <NotFoundSection />;
  }

  const { parentCategory, subCategory } = categoryDetail;
  const breadcrumbs = [
    { name: 'Sản phẩm', href: '/san-pham' },
    { name: parentCategory.name, href: parentCategory.href },
    { name: subCategory.name, href: `/san-pham/${subCategory.id}` },
  ];
  const bannerImage = `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&sig=${subCategory.id}`;

  return (
    <ProductListLayout
      title={subCategory.name}
      description={`Khám phá các sản phẩm về ${subCategory.name.toLowerCase()} - Chất lượng cao, chính hãng từ Auto Tuan Linh`}
      breadcrumbs={breadcrumbs}
      showBreadcrumb={true}
      bannerImage={bannerImage}
    >
      <Suspense
        fallback={
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        }
      >
        <ProductCategoryDetailSections categoryDetail={categoryDetail} />
      </Suspense>
    </ProductListLayout>
  );
}

