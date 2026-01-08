'use client';

import React from 'react';
import ArticleCard from '@/components/shared/ArticleCard';
import { Newspaper } from 'lucide-react';
import { NewsArticle } from '@/lib/data/articles';

interface ArticlesGridSectionProps {
  articles: NewsArticle[];
  onResetFilter?: () => void;
}

export default function ArticlesGridSection({ articles, onResetFilter }: ArticlesGridSectionProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-200">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Newspaper size={40} className="text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Không tìm thấy bài viết</h3>
        <p className="text-gray-600 mb-6">Không có bài viết nào trong danh mục này.</p>
        {onResetFilter && (
          <button
            onClick={onResetFilter}
            className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-xl font-semibold transition-all duration-200"
          >
            Xem tất cả
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          id={article.id}
          title={article.title}
          excerpt={article.excerpt}
          image={article.image}
          href={article.href}
          publishedAt={article.publishedAt}
          readTime={article.readTime}
          category={article.category}
          author={article.author}
          hashtags={article.hashtags}
        />
      ))}
    </div>
  );
}

