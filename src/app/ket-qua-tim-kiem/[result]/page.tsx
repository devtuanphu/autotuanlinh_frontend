import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import KetQuaTimKiemPageClient from '@/components/ket-qua-tim-kiem/KetQuaTimKiemPageClient';
import { searchResults } from '@/lib/data/ket-qua-tim-kiem';

interface PageProps {
  params: {
    result: string;
  };
  searchParams: {
    q?: string;
  };
}

export const metadata: Metadata = generateSEOMetadata(seoData.ketQuaTimKiem);

export default async function Page({ params, searchParams }: PageProps) {
  // Lấy từ khóa từ params hoặc searchParams
  const queryFromParams = params?.result ? decodeURIComponent(params.result) : '';
  const queryFromSearch = searchParams?.q || '';
  const searchQuery = queryFromSearch || queryFromParams || '';

  // TODO: Fetch data from API here
  // const searchResults = await fetchSearchResults(searchQuery);

  const results = searchResults(searchQuery);

  return <KetQuaTimKiemPageClient searchResults={results} />;
}
