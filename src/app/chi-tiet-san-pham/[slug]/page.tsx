import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData, SEOData } from '@/lib/seo';
import ProductDetailLayout from '@/components/san-pham/ProductDetailLayout';
import ProductImageGallery from '@/components/san-pham/ProductImageGallery';
import ProductInfo from '@/components/san-pham/ProductInfo';
import ProductDescription from '@/components/san-pham/ProductDescription';
import ProductComments from '@/components/san-pham/ProductComments';
import RelatedProducts from '@/components/san-pham/RelatedProducts';
import ProductNotFoundSection from '@/components/san-pham/ProductNotFoundSection';
import { productCategories } from '@/components/layout/constants/headerData';
import { convertProductCategoriesToData, ProductDetail } from '@/lib/data/san-pham';
import { fetchStrapi, getStrapiImageUrl } from '@/lib/api/strapi';
import { Car, Wrench, Settings, Film, Music, Sparkles } from 'lucide-react';

interface PageProps {
  params: {
    slug: string; // Product slug
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  try {
    // Fetch product from API by slug
    const strapiData = await fetchStrapi<Array<{
      id: number | string;
      title: string;
      slug: string;
      moTaNgan?: string | null;
      seo?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        metaKeywords?: string | null;
      };
    }>>(`/san-phams?filters[slug][$eq]=${params.slug}`, {}, { revalidate: revalidateTime });
    
    if (Array.isArray(strapiData) && strapiData.length > 0) {
      const product = strapiData[0];
      const seo = product.seo;
      
      if (seo) {
        const seoDataFromApi: SEOData = {
          title: seo.metaTitle || `${product.title} - ${seoData.sanPham.title}`,
          description: seo.metaDescription || product.moTaNgan || seoData.sanPham.description,
          keywords: seo.metaKeywords ? seo.metaKeywords.split(',').map(k => k.trim()) : seoData.sanPham.keywords,
          canonical: `/chi-tiet-san-pham/${product.slug}`,
        };
        
        return generateSEOMetadata(seoDataFromApi);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[chi-tiet-san-pham/[slug]] Failed to fetch SEO data, using defaults:', error);
    }
  }
  
  return generateSEOMetadata(seoData.sanPham);
}

export default async function Page({ params }: PageProps) {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  // Fetch product from API
  let product: ProductDetail | null = null;
  let categoryInfo: {
    parentId: string;
    parentName: string;
    subCategoryId: string;
    subCategoryName: string;
  } | null = null;
  let mappedReviews: Array<{
    id: string;
    name: string;
    email: string;
    rating: number;
    content: string;
    date: string;
    helpful: number;
    verified: boolean;
  }> = [];
  
  try {
    const strapiData = await fetchStrapi<Array<{
      id: number | string;
      documentId?: string;
      title: string;
      slug: string;
      moTaNgan?: string | null;
      moTaChiTiet?: string | null;
      giaBan?: number | null;
      giaGoc?: number | null;
      rating?: number | null;
      reviewCount?: number | null;
      badges?: string | null;
      giamGia?: number | null;
      danhMucSanPham?: {
        id: number | string;
        slug: string;
        title: string;
        parentCategoryLevel1?: {
          slug: string;
          title: string;
        } | null;
      } | null;
      anhSanPham?: Array<{
        url?: string;
        formats?: {
          large?: { url?: string };
          medium?: { url?: string };
          small?: { url?: string };
          thumbnail?: { url?: string };
        };
      }> | null;
      thongSo?: Array<{
        id: number | string;
        label: string;
        value: string;
      }> | null;
      reviews?: Array<{
        id: number | string;
        customerName: string;
        email: string;
        rating: number;
        content: string;
        isApproved: boolean;
        createdAt?: string;
      }> | null;
    }>>(`/san-phams?filters[slug][$eq]=${params.slug}`, {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[chi-tiet-san-pham/[slug]] Fetched data:', strapiData);
    }
    
    if (Array.isArray(strapiData) && strapiData.length > 0) {
      const productData = strapiData[0];
      
      // Map images from anhSanPham
      const images: string[] = [];
      if (productData.anhSanPham && productData.anhSanPham.length > 0) {
        productData.anhSanPham.forEach((img) => {
          const imageUrl = getStrapiImageUrl(img as Parameters<typeof getStrapiImageUrl>[0]);
          if (imageUrl) {
            images.push(imageUrl);
          }
        });
      }
      
      // Map specifications from thongSo
      const specifications = (productData.thongSo || []).map((spec) => ({
        label: spec.label,
        value: spec.value,
      }));
      
      // Map reviews from API to Comment format
      const formatDate = (dateString?: string | null) => {
        if (!dateString) {
          // Use current date as fallback
          const now = new Date();
          const day = String(now.getDate()).padStart(2, '0');
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const year = now.getFullYear();
          return `${day}/${month}/${year}`;
        }
        try {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        } catch {
          return new Date().toLocaleDateString('vi-VN');
        }
      };
      
      mappedReviews = (productData.reviews || [])
        .filter(review => review.isApproved) // Only show approved reviews
        .map((review) => ({
          id: String(review.id),
          name: review.customerName,
          email: review.email,
          rating: review.rating,
          content: review.content,
          date: formatDate(review.createdAt),
          helpful: 0, // Default helpful count
          verified: true, // Reviews from API are considered verified
        }));
      
      // Normalize rating
      const rating = productData.rating !== null && productData.rating !== undefined
        ? Math.round(Number(productData.rating) * 10) / 10
        : 0;
      
      // Get category info from hardcoded data (fallback)
      const iconMap = new Map([
        [Car, 'Car'],
        [Wrench, 'Wrench'],
        [Settings, 'Settings'],
        [Film, 'Film'],
        [Music, 'Music'],
        [Sparkles, 'Sparkles'],
      ]);
      const categories = convertProductCategoriesToData(productCategories, iconMap);
      
      // Try to find category from first available category (similar to working page)
      let foundCategory: {
        parentId: string;
        parentName: string;
        subCategoryId: string;
        subCategoryName: string;
      } | null = null;
      for (const category of categories) {
        if (category.children && category.children.length > 0) {
          const firstSubCategory = category.children[0];
          foundCategory = {
            parentId: category.id,
            parentName: category.name,
            subCategoryId: firstSubCategory.id,
            subCategoryName: firstSubCategory.name,
          };
          break;
        }
      }
      
      categoryInfo = foundCategory || {
        parentId: 'category',
        parentName: 'Danh mục',
        subCategoryId: 'subcategory',
        subCategoryName: 'Chi tiết',
      };
      
      // Get Strapi ID as number
      const strapiId = typeof productData.id === 'number' ? productData.id : parseInt(String(productData.id), 10);
      
      product = {
        id: String(productData.id),
        name: productData.title,
        description: productData.moTaNgan || `Sản phẩm ${productData.title.toLowerCase()} chất lượng cao, chính hãng từ Auto Tuan Linh`,
        price: productData.giaBan || 0,
        originalPrice: productData.giaGoc && productData.giaGoc > (productData.giaBan || 0) ? productData.giaGoc : undefined,
        image: images[0] || `https://picsum.photos/800/500?random=${productData.id}`,
        rating,
        reviews: productData.reviewCount || 0,
        badge: productData.badges || undefined,
        href: `/chi-tiet-san-pham/${productData.slug}`,
        inStock: true,
        brand: 'Auto Tuan Linh',
        freeShipping: true,
        warranty: '12 tháng',
        popularity: (productData.reviewCount || 0) * 10 + rating * 10,
        createdAt: 0,
        images: images.length > 0 ? images : undefined,
        specifications: specifications.length > 0 ? specifications : undefined,
        longDescription: productData.moTaChiTiet || undefined,
        giamGia: productData.giamGia !== null && productData.giamGia !== undefined ? productData.giamGia : null, // Discount percentage from API
        category: categoryInfo,
        strapiId: !isNaN(strapiId) ? strapiId : undefined, // Store Strapi ID as number
      };
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[chi-tiet-san-pham/[slug]] Failed to fetch product detail, using defaults:', error);
    }
  }

  if (!product) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[chi-tiet-san-pham/[slug]] Product not found for slug:', params.slug);
    }
    return <ProductNotFoundSection />;
  }

  const { category } = product;
  const breadcrumbs = [
    { name: 'Sản phẩm', href: '/san-pham' },
    { name: category?.parentName || 'Danh mục', href: category ? `/san-pham/${category.parentId}` : '/san-pham' },
    { name: category?.subCategoryName || 'Chi tiết', href: category ? `/san-pham/${category.subCategoryId}` : '/san-pham' },
    { name: product.name, href: `/chi-tiet-san-pham/${params.slug}` },
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
        initialComments={mappedReviews}
      />
      
      <RelatedProducts 
        currentProductId={product.id}
        categoryId={category?.subCategoryId || ''}
        categories={convertProductCategoriesToData(productCategories, new Map([
          [Car, 'Car'],
          [Wrench, 'Wrench'],
          [Settings, 'Settings'],
          [Film, 'Film'],
          [Music, 'Music'],
          [Sparkles, 'Sparkles'],
        ]))}
      />
    </ProductDetailLayout>
  );
}
