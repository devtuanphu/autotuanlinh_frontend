'use client';

import React from 'react';
import ArticleCard from '@/components/shared/ArticleCard';
import { Sparkles } from 'lucide-react';
import { NewsArticle } from '@/lib/data/articles';

interface FeaturedArticlesSectionProps {
  articles: NewsArticle[];
}

export default function FeaturedArticlesSection({ articles }: FeaturedArticlesSectionProps) {
  if (articles.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-brand-accent rounded-full"></div>
        <div className="flex items-center gap-2">
          <Sparkles size={24} className="text-brand-accent" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Bài viết nổi bật</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
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
    </div>
  );
}

