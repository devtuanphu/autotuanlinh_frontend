import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import ArticleListLayout from '@/components/shared/ArticleListLayout';
import ServicesGridSection from '@/components/dich-vu/ServicesGridSection';
import EmptyStateSection from '@/components/dich-vu/EmptyStateSection';
import NotFoundSection from '@/components/dich-vu/NotFoundSection';
import { serviceCategories } from '@/components/layout/constants/headerData';
import { findServiceCategoryDetail, ServiceCategoryData } from '@/lib/data/dich-vu';

interface PageProps {
  params: {
    id: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata(_props: PageProps): Promise<Metadata> {
  // TODO: Generate dynamic metadata based on category
  // const categoryDetail = findServiceCategoryDetail(categories, params.id);
  // if (categoryDetail) {
  //   return generateSEOMetadata({
  //     ...seoData.dichVu,
  //     title: `${categoryDetail.subCategory.name} - ${seoData.dichVu.title}`,
  //     description: `Khám phá các dịch vụ về ${categoryDetail.subCategory.name.toLowerCase()}...`,
  //   });
  // }
  return generateSEOMetadata(seoData.dichVu);
}

export default async function Page({ params }: PageProps) {
  // TODO: Fetch data from API here
  // const categories = await fetchServiceCategories();
  // const categoryDetail = await findServiceCategoryDetail(categories, params.id);

  // Convert serviceCategories to match ServiceCategoryData interface
  const categories: ServiceCategoryData[] = serviceCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    href: cat.href,
    children: cat.children,
  }));

  const categoryDetail = findServiceCategoryDetail(categories, params.id);

  if (!categoryDetail) {
    return <NotFoundSection />;
  }

  const { parentCategory, subCategory, services } = categoryDetail;
  const breadcrumbs = [
    { name: 'Danh mục dịch vụ', href: '/dich-vu' },
    { name: parentCategory.name, href: parentCategory.href },
    { name: subCategory.name, href: `/dich-vu/${subCategory.id}` },
  ];
  const bannerImage = `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&sig=${subCategory.id}`;

  return (
    <ArticleListLayout
      title={subCategory.name}
      description={`Khám phá các dịch vụ về ${subCategory.name.toLowerCase()} - Thông tin chi tiết, quy trình và đánh giá chuyên nghiệp từ Auto Tuan Linh`}
      breadcrumbs={breadcrumbs}
      showBreadcrumb={true}
      bannerImage={bannerImage}
    >
      {services.length === 0 ? (
        <EmptyStateSection />
      ) : (
        <ServicesGridSection
          services={services}
          subCategoryName={subCategory.name}
          subCategoryId={subCategory.id}
        />
      )}
    </ArticleListLayout>
  );
}
