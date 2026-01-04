import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import TinTucPageClient from '@/components/tin-tuc/TinTucPageClient';
import { allArticles } from '@/lib/data/articles';

export const metadata = generateSEOMetadata(seoData.tinTuc);

export default async function TinTucPageServer() {
  // TODO: Fetch data from API here
  // const articles = await fetchArticles();

  const articles = allArticles;

  return <TinTucPageClient articles={articles} />;
}
