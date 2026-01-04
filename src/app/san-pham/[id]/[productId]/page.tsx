import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import ProductDetailLayout from '@/components/san-pham/ProductDetailLayout';
import ProductImageGallery from '@/components/san-pham/ProductImageGallery';
import ProductInfo from '@/components/san-pham/ProductInfo';
import ProductDescription from '@/components/san-pham/ProductDescription';
import ProductComments from '@/components/san-pham/ProductComments';
import RelatedProducts from '@/components/san-pham/RelatedProducts';
import NotFoundSection from '@/components/san-pham/NotFoundSection';
import { productCategories } from '@/components/layout/constants/headerData';
import { findProductDetail, convertProductCategoriesToData } from '@/lib/data/san-pham';
import { Car, Wrench, Settings, Film, Music, Sparkles } from 'lucide-react';

interface PageProps {
  params: {
    id: string; // This is categoryId
    productId: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata(_props: PageProps): Promise<Metadata> {
  // TODO: Generate dynamic metadata based on product
  // const product = await findProductDetail(categories, params.id, params.productId);
  // if (product) {
  //   return generateSEOMetadata({
  //     ...seoData.sanPham,
  //     title: `${product.name} - ${seoData.sanPham.title}`,
  //     description: product.description,
  //   });
  // }
  return generateSEOMetadata(seoData.sanPham);
}

export default async function Page({ params }: PageProps) {
  // TODO: Fetch data from API here
  // const categories = await fetchProductCategories();
  // const product = await findProductDetail(categories, params.id, params.productId);

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

  // Find product detail by categoryId (params.id) and productId
  const product = findProductDetail(categories, params.id, params.productId);

  if (!product) {
    return <NotFoundSection />;
  }

  const { category } = product;
  const breadcrumbs = [
    { name: 'Sản phẩm', href: '/san-pham' },
    { name: category?.parentName || 'Danh mục', href: category ? `/san-pham/${category.parentId}` : '/san-pham' },
    { name: category?.subCategoryName || 'Chi tiết', href: category ? `/san-pham/${category.subCategoryId}` : '/san-pham' },
    { name: product.name, href: `/san-pham/${params.id}/${params.productId}` },
  ];

  return (
    <ProductDetailLayout breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <ProductImageGallery images={product.images || [product.image]} />
        <ProductInfo product={product} />
      </div>
      
      <ProductDescription 
        description={product.longDescription || product.description || ''}
        specifications={product.specifications || []}
      />
      
      <ProductComments 
        productId={product.id}
        productName={product.name}
      />
      
      <RelatedProducts 
        currentProductId={product.id}
        categoryId={category?.subCategoryId || ''}
        categories={categories}
      />
    </ProductDetailLayout>
  );
}

