'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ArticleListLayout from '@/components/shared/ArticleListLayout';
import FeaturedArticlesSection from './FeaturedArticlesSection';
import FilterSection from './FilterSection';
import ArticlesGridSection from './ArticlesGridSection';
import PaginationSection from './PaginationSection';
import { NewsArticle } from '@/lib/data/articles';
import { ITEMS_PER_PAGE, tinTucCategories } from '@/lib/data/tin-tuc';

interface TinTucPageClientProps {
  articles: NewsArticle[];
}

export default function TinTucPageClient({ articles: allArticles }: TinTucPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate categories with counts
  const categories = useMemo(() => {
    return tinTucCategories.map((cat) => {
      if (cat.id === 'all') {
        return { ...cat, count: allArticles.length };
      }
      return {
        ...cat,
        count: allArticles.filter((a) => a.category === cat.id).length,
      };
    });
  }, [allArticles]);

  // Filter articles by category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') {
      return allArticles;
    }
    return allArticles.filter((article) => article.category === selectedCategory);
  }, [allArticles, selectedCategory]);

  // Get featured articles
  const featuredArticles = useMemo(() => {
    return allArticles.filter((article) => article.featured);
  }, [allArticles]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const breadcrumbs = [{ name: 'Tin tức', href: '/tin-tuc' }];

  return (
    <ArticleListLayout
      title="Tin tức"
      description="Cập nhật tin tức mới nhất về phụ kiện ô tô, xu hướng, đánh giá sản phẩm và nhiều thông tin hữu ích khác"
      breadcrumbs={breadcrumbs}
      showBreadcrumb={true}
      bannerImage="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
    >
      <FeaturedArticlesSection articles={featuredArticles} />
      <FilterSection
        categories={categories}
        selectedCategory={selectedCategory}
        totalCount={filteredArticles.length}
        onCategoryChange={handleCategoryChange}
      />
      <ArticlesGridSection
        articles={paginatedArticles}
        onResetFilter={() => handleCategoryChange('all')}
      />
      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredArticles.length}
        onPageChange={handlePageChange}
      />
    </ArticleListLayout>
  );
}

