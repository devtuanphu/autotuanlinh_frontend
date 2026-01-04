'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ArticleListLayout from '@/components/shared/ArticleListLayout';
import SearchBarSection from './SearchBarSection';
import FilterSection from './FilterSection';
import ResultsGridSection from './ResultsGridSection';
import EmptyStateSection from './EmptyStateSection';
import PaginationSection from './PaginationSection';
import { SearchResult, ITEMS_PER_PAGE, sortOptions } from '@/lib/data/ket-qua-tim-kiem';

interface KetQuaTimKiemPageClientProps {
  searchResults: SearchResult[];
}

export default function KetQuaTimKiemPageClient({ searchResults: allResults }: KetQuaTimKiemPageClientProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Lấy từ khóa từ params hoặc searchParams
  const searchQuery = useMemo(() => {
    const queryFromParams = params?.result ? decodeURIComponent(params.result as string) : '';
    const queryFromSearch = searchParams?.get('q') || '';
    return queryFromSearch || queryFromParams || '';
  }, [params, searchParams]);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter và sort
  const filteredResults = useMemo(() => {
    let filtered = allResults;

    // Filter theo type
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
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
  }, [allResults, selectedType, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  // Reset về trang 1 khi filter/sort thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, sortBy, searchQuery]);

  // Scroll to top khi đổi trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        selectedType={selectedType}
        sortBy={sortBy}
        totalCount={filteredResults.length}
        onTypeChange={setSelectedType}
        onSortChange={setSortBy}
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

