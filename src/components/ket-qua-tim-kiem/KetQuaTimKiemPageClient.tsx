'use client';

import React, { useMemo } from 'react';
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation';
import ArticleListLayout from '@/components/shared/ArticleListLayout';
import SearchBarSection from './SearchBarSection';
import FilterSection from './FilterSection';
import ResultsGridSection from './ResultsGridSection';
import EmptyStateSection from './EmptyStateSection';
import PaginationSection from './PaginationSection';
import { SearchResult, ITEMS_PER_PAGE, sortOptions } from '@/lib/data/ket-qua-tim-kiem';

interface KetQuaTimKiemPageClientProps {
  initialResults: SearchResult[];
  query: string;
  currentPage: number;
  initialType: string;
  initialSort: string;
}

export default function KetQuaTimKiemPageClient({ 
  initialResults: allResults, 
  query: searchQuery,
  currentPage,
  initialType,
  initialSort
}: KetQuaTimKiemPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Highlight từ khóa trong text
  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-brand-accent/20 text-brand-accent font-semibold px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Filter và sort logic (moved to memo for performance, but source of truth is props/URL)
  const filteredResults = useMemo(() => {
    let filtered = allResults;

    // Filter theo type
    if (initialType !== 'all') {
      filtered = filtered.filter(item => item.type === initialType);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (initialSort) {
        case 'relevance':
          return (b.relevance || 0) - (a.relevance || 0);
        case 'newest':
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [allResults, initialType, initialSort]);

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  const updateURL = (params: { page?: number; type?: string; sort?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (params.page !== undefined) newParams.set('page', params.page.toString());
    if (params.type !== undefined) newParams.set('type', params.type);
    if (params.sort !== undefined) newParams.set('sort', params.sort);
    
    router.push(`${pathname}?${newParams.toString()}`, { scroll: true });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTypeChange = (type: string) => {
    updateURL({ type, page: 1 });
  };

  const handleSortChange = (sort: string) => {
    updateURL({ sort, page: 1 });
  };

  const typeFilters = useMemo(() => [
    { id: 'all', name: 'Tất cả', icon: 'Search', count: allResults.length },
    { id: 'article', name: 'Bài viết', icon: 'FileText', count: allResults.filter(r => r.type === 'article').length },
    { id: 'product', name: 'Sản phẩm', icon: 'Package', count: allResults.filter(r => r.type === 'product').length },
    { id: 'service', name: 'Dịch vụ', icon: 'Wrench', count: allResults.filter(r => r.type === 'service').length },
  ], [allResults]);

  const breadcrumbs = [
    { name: 'Kết quả tìm kiếm', href: `/ket-qua-tim-kiem/${encodeURIComponent(searchQuery)}` },
  ];

  return (
    <ArticleListLayout
      title={searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : 'Kết quả tìm kiếm'}
      description={searchQuery ? `Tìm thấy ${filteredResults.length} kết quả cho từ khóa "${searchQuery}"` : 'Nhập từ khóa để tìm kiếm'}
      breadcrumbs={breadcrumbs}
      showBreadcrumb={true}
      bannerImage="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
    >
      <SearchBarSection searchQuery={searchQuery} />
      <FilterSection
        searchQuery={searchQuery}
        typeFilters={typeFilters}
        sortOptions={sortOptions}
        selectedType={initialType}
        sortBy={initialSort}
        totalCount={filteredResults.length}
        onTypeChange={handleTypeChange}
        onSortChange={handleSortChange}
        highlightText={highlightText}
      />
      {filteredResults.length === 0 ? (
        <EmptyStateSection searchQuery={searchQuery} />
      ) : (
        <>
          <ResultsGridSection
            results={paginatedResults}
            searchQuery={searchQuery}
            highlightText={highlightText}
          />
          <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredResults.length}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </ArticleListLayout>
  );
}
