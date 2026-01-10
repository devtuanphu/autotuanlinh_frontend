import { Metadata } from 'next';
import { Suspense } from 'react';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import SanPhamPageClient from '@/components/san-pham/SanPhamPageClient';
import { productCategories } from '@/components/layout/constants/headerData';
import { convertProductCategoriesToData, ProductDetail, ITEMS_PER_PAGE } from '@/lib/data/san-pham';
import { Car, Wrench, Settings, Film, Music, Sparkles } from 'lucide-react';
import { getStrapiImageUrl } from '@/lib/api/strapi';

export const metadata: Metadata = generateSEOMetadata(seoData.sanPham);

interface PageProps {
  searchParams: {
    page?: string;
  };
}

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

export default async function Page({ searchParams }: PageProps) {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  // Get current page from searchParams
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Fetch products from API with pagination
  let products: ProductDetail[] = [];
  let totalPages = 1;
  let totalProducts = 0;

  try {
    // Fetch products with pagination - need to get raw response to access meta
    const STRAPI_URL = process.env.NEXT_PUBLIC_URL_STRAPI || process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337';
    const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_KEY || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;
    
    const url = `${STRAPI_URL}/api/san-phams?pLevel&pagination[page]=${currentPage}&pagination[pageSize]=${ITEMS_PER_PAGE}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    const response = await fetch(url, {
      headers,
      next: { revalidate: revalidateTime },
    });
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    const json: {
      data: Array<{
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
        anhSanPham?: Array<{
          url?: string;
          formats?: {
            large?: { url?: string };
            medium?: { url?: string };
            small?: { url?: string };
            thumbnail?: { url?: string };
          };
        }> | null;
      }>;
      meta?: {
        pagination?: {
          page: number;
          pageSize: number;
          pageCount: number;
          total: number;
        };
      };
    } = await response.json();
    
    if (json.data && Array.isArray(json.data)) {
      // Map products from API data
      products = json.data.map((product) => {
        // Get first image from anhSanPham array
        const firstImage = product.anhSanPham && product.anhSanPham.length > 0 
          ? product.anhSanPham[0] 
          : null;
        
        const image = getStrapiImageUrl(firstImage as Parameters<typeof getStrapiImageUrl>[0]) || `https://picsum.photos/800/500?random=${product.id}`;
        
        // Normalize rating
        const rating = product.rating !== null && product.rating !== undefined
          ? Math.round(Number(product.rating) * 10) / 10
          : 0;
        
        // Get Strapi ID as number
        const strapiId = typeof product.id === 'number' ? product.id : parseInt(String(product.id), 10);
        
        return {
          id: String(product.id),
          name: product.title,
          description: product.moTaNgan || `Sản phẩm ${product.title.toLowerCase()} chất lượng cao, chính hãng từ Auto Tuan Linh`,
          price: product.giaBan || 0,
          originalPrice: product.giaGoc && product.giaGoc > (product.giaBan || 0) ? product.giaGoc : undefined,
          image,
          rating,
          reviews: product.reviewCount || 0,
          badge: product.badges || undefined,
          href: `/chi-tiet-san-pham/${product.slug}`,
          inStock: true,
          brand: 'Auto Tuan Linh',
          freeShipping: true,
          warranty: '12 tháng',
          popularity: (product.reviewCount || 0) * 10 + rating * 10,
          createdAt: 0,
          images: firstImage ? [image] : undefined,
          specifications: undefined,
          longDescription: product.moTaChiTiet || undefined,
          giamGia: product.giamGia !== null && product.giamGia !== undefined ? product.giamGia : null,
          category: {
            parentId: 'category',
            parentName: 'Danh mục',
            subCategoryId: 'subcategory',
            subCategoryName: 'Chi tiết',
          },
          strapiId: !isNaN(strapiId) ? strapiId : undefined,
        } as ProductDetail;
      });
      
      // Get pagination info from meta
      if (json.meta?.pagination) {
        totalPages = json.meta.pagination.pageCount || 1;
        totalProducts = json.meta.pagination.total || 0;
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[san-pham] Failed to fetch products from API, using defaults:', error);
    }
  }

  // Create icon mapping for categories (for filters)
  const iconMap = new Map([
    [Car, 'Car'],
    [Wrench, 'Wrench'],
    [Settings, 'Settings'],
    [Film, 'Film'],
    [Music, 'Music'],
    [Sparkles, 'Sparkles'],
  ]);

  // Convert productCategories to ProductCategoryData format (for filters)
  const categories = convertProductCategoriesToData(productCategories, iconMap);

  return (
    <Suspense fallback={<SanPhamPageLoading />}>
      <SanPhamPageClient 
        categories={categories}
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        currentPage={currentPage}
      />
    </Suspense>
  );
}

