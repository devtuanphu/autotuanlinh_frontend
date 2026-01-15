import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import { Suspense } from 'react';
import KetQuaTimKiemPageClient from '@/components/ket-qua-tim-kiem/KetQuaTimKiemPageClient';
import { fetchStrapi, getStrapiImageUrl } from '@/lib/api/strapi';
import { SearchResult } from '@/lib/data/ket-qua-tim-kiem';

interface PageProps {
  params: {
    result: string;
  };
  searchParams: {
    q?: string;
    page?: string;
    type?: string;
    sort?: string;
  };
}

export const metadata: Metadata = generateSEOMetadata(seoData.ketQuaTimKiem);

export default async function Page({ params, searchParams }: PageProps) {
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  // Lấy từ khóa từ params hoặc searchParams
  const queryFromParams = params?.result ? decodeURIComponent(params.result) : '';
  const queryFromSearch = searchParams?.q || '';
  const searchQuery = queryFromSearch || queryFromParams || '';
  
  // Lấy các tham số pagination, filter, sort từ URL
  const currentPage = parseInt(searchParams.page || '1', 10);
  const selectedType = searchParams.type || 'all';
  const sortBy = searchParams.sort || 'relevance';

  // Fetch results from Strapi
  interface StrapiProduct {
    id: number | string;
    title: string;
    moTaNgan?: string;
    anhSanPham?: Array<{ url: string }>;
    slug?: string;
    publishedAt?: string;
    createdAt?: string;
    reviewCount?: number;
    giaBan?: number;
  }
  
  interface StrapiBlog {
    id: number | string;
    title: string;
    moTaNgan?: string;
    avatar?: { url: string };
    slug?: string;
    publishedAt?: string;
    createdAt?: string;
  }
  
  let results: SearchResult[] = [];
  
  try {
    if (searchQuery) {
      const encodedQuery = encodeURIComponent(searchQuery);
      
      // Fetch products and blogs in parallel with a larger limit to handle client-side sorting/filtering if needed,
      // or we can just fetch everything for the specific search to merge them.
      const [productData, blogData] = await Promise.all([
        fetchStrapi<StrapiProduct[]>(
          `/san-phams?filters[title][$containsi]=${encodedQuery}&populate=anhSanPham&pagination[pageSize]=100`,
          {},
          { revalidate: revalidateTime }
        ).catch(() => []),
        fetchStrapi<StrapiBlog[]>(
          `/blogs?filters[title][$containsi]=${encodedQuery}&populate=avatar&pagination[pageSize]=100`,
          {},
          { revalidate: revalidateTime }
        ).catch(() => [])
      ]);
      
      // Map products
      if (Array.isArray(productData)) {
        const productResults: SearchResult[] = productData.map((p) => ({
          id: String(p.id),
          type: 'product' as const,
          title: p.title,
          excerpt: p.moTaNgan || `Khám phá sản phẩm ${p.title} chất lượng cao tại Auto Tuấn Linh.`,
          image: p.anhSanPham && p.anhSanPham.length > 0 ? getStrapiImageUrl(p.anhSanPham[0]) : 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop',
          href: `/chi-tiet-san-pham/${p.slug}`,
          publishedAt: p.publishedAt || p.createdAt,
          relevance: 100,
          views: p.reviewCount || 0,
          price: p.giaBan || 0,
          createdAt: p.createdAt,
        }));
        results = [...results, ...productResults];
      }

      // Map blogs
      if (Array.isArray(blogData)) {
        const blogResults: SearchResult[] = blogData.map((b) => ({
          id: String(b.id),
          type: 'article' as const,
          title: b.title,
          excerpt: b.moTaNgan || `Đọc thêm về ${b.title} trên Auto Tuấn Linh.`,
          image: b.avatar ? getStrapiImageUrl(b.avatar) : 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop',
          href: `/tin-tuc/${b.slug}`,
          publishedAt: b.publishedAt || b.createdAt,
          relevance: 90,
          views: 0,
          price: 0,
          createdAt: b.createdAt,
        }));
        results = [...results, ...blogResults];
      }
    }
  } catch (error) {
    console.error('[ket-qua-tim-kiem] Failed to fetch search results:', error);
  }

  return (
    <Suspense fallback={<div className="container mx-auto py-20 px-4 text-center">Đang tải kết quả...</div>}>
      <KetQuaTimKiemPageClient 
        initialResults={results} 
        query={searchQuery}
        currentPage={currentPage}
        initialType={selectedType}
        initialSort={sortBy}
      />
    </Suspense>
  );
}
