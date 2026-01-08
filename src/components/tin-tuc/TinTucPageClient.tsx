'use client';

import React, { useMemo } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import ArticleListLayout from '@/components/shared/ArticleListLayout';
import FeaturedArticlesSection from './FeaturedArticlesSection';
import FilterSection from './FilterSection';
import ArticlesGridSection from './ArticlesGridSection';
import PaginationSection from './PaginationSection';
import { NewsArticle } from '@/lib/data/articles';
import { ITEMS_PER_PAGE, Category } from '@/lib/data/tin-tuc';

interface TinTucPageClientProps {
  articles: NewsArticle[];
  featuredArticles?: NewsArticle[];
  categories?: Category[];
  title?: string;
  description?: string;
  totalArticles?: number;
  totalPages?: number;
  currentPage?: number;
}

export default function TinTucPageClient({ 
  articles, 
  featuredArticles: featuredArticlesFromProps = [],
  categories: categoriesFromProps = [{ id: 'all', name: 'Tất cả', count: 0 }],
  title = 'Tin tức',
  description = 'Cập nhật tin tức mới nhất về phụ kiện ô tô, xu hướng, đánh giá sản phẩm và nhiều thông tin hữu ích khác',
  totalArticles: totalArticlesFromProps = 0,
  totalPages: totalPagesFromProps = 1,
  currentPage: currentPageFromProps = 1,
}: TinTucPageClientProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Get current page from URL params or props
  const currentPage = parseInt(searchParams.get('page') || String(currentPageFromProps), 10);

  // Use featured articles from props
  const featuredArticles = useMemo(() => {
    return featuredArticlesFromProps;
  }, [featuredArticlesFromProps]);

  // Calculate pagination from API data
  const totalPages = totalPagesFromProps;
  const totalArticles = totalArticlesFromProps;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + articles.length;
  const paginatedArticles = articles; // Articles are already paginated from API

  // Update URL when page changes and reload page
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    window.location.href = `${pathname}?${params.toString()}`;
  };

  const breadcrumbs = [{ name: 'Tin tức', href: '/tin-tuc' }];

  return (
    <ArticleListLayout
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      showBreadcrumb={true}
      bannerImage="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
    >
      <FeaturedArticlesSection articles={featuredArticles} />
      {/* Temporarily commented out filter section */}
      {/* <FilterSection
        categories={categories}
        selectedCategory={selectedCategory}
        totalCount={filteredArticles.length}
        onCategoryChange={handleCategoryChange}
      /> */}
      <ArticlesGridSection
        articles={paginatedArticles}
        // onResetFilter={() => handleCategoryChange('all')}
      />
      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalArticles}
        onPageChange={handlePageChange}
      />
    </ArticleListLayout>
  );
}

