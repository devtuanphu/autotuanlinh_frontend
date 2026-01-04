import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import ArticleListLayout from '@/components/shared/ArticleListLayout';
import ArticlesGridSection from '@/components/danh-muc-bai-viet-san-pham/ArticlesGridSection';
import EmptyStateSection from '@/components/danh-muc-bai-viet-san-pham/EmptyStateSection';
import NotFoundSection from '@/components/danh-muc-bai-viet-san-pham/NotFoundSection';
import { productCategories } from '@/components/layout/constants/headerData';
import { findCategoryDetail, ProductCategoryData } from '@/lib/data/danh-muc-bai-viet-san-pham';
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
  // const categoryDetail = await findCategoryDetail(categories, params.id);
  // if (categoryDetail) {
  //   return generateSEOMetadata({
  //     ...seoData.danhMucBaiVietSanPham,
  //     title: `${categoryDetail.subCategory.name} - ${seoData.danhMucBaiVietSanPham.title}`,
  //     description: `Khám phá các bài viết về ${categoryDetail.subCategory.name.toLowerCase()}...`,
  //   });
  // }
  return generateSEOMetadata(seoData.danhMucBaiVietSanPham);
}

export default async function Page({ params }: PageProps) {
  // TODO: Fetch data from API here
  // const categories = await fetchProductCategories();
  // const categoryDetail = await findCategoryDetail(categories, params.id);

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
  // Note: We only need the structure for findCategoryDetail, icon is not used in detail page
  const categories: ProductCategoryData[] = productCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: iconMap.get(cat.icon) || 'Car', // Convert icon component to string name
    href: cat.href,
    children: cat.children,
  }));

  const categoryDetail = findCategoryDetail(categories, params.id);

  if (!categoryDetail) {
    return <NotFoundSection />;
  }

  const { parentCategory, subCategory, articles } = categoryDetail;
  const breadcrumbs = [
    { name: 'Danh mục bài viết', href: '/danh-muc-bai-viet-san-pham' },
    { name: parentCategory.name, href: parentCategory.href },
    { name: subCategory.name, href: `/danh-muc-bai-viet-san-pham/${subCategory.id}` },
  ];
  const bannerImage = `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&sig=${subCategory.id}`;

  return (
    <ArticleListLayout
      title={subCategory.name}
      description={`Khám phá các bài viết về ${subCategory.name.toLowerCase()} - Thông tin chi tiết, hướng dẫn và đánh giá chuyên nghiệp từ Auto Tuan Linh`}
      breadcrumbs={breadcrumbs}
      showBreadcrumb={true}
      bannerImage={bannerImage}
    >
      {articles.length === 0 ? (
        <EmptyStateSection />
      ) : (
        <ArticlesGridSection
          articles={articles}
          subCategoryName={subCategory.name}
          subCategoryId={subCategory.id}
        />
      )}
    </ArticleListLayout>
  );
}
