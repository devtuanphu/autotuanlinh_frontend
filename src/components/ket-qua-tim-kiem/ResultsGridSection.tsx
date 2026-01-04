'use client';

import React from 'react';
import ArticleCard from '@/components/shared/ArticleCard';
import { SearchResult } from '@/lib/data/ket-qua-tim-kiem';

interface ResultsGridSectionProps {
  results: SearchResult[];
  searchQuery: string;
  highlightText: (text: string, query: string) => React.ReactNode;
}

export default function ResultsGridSection({ results }: ResultsGridSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {results.map((result) => (
        <div key={result.id} className="relative">
          <ArticleCard
            id={result.id}
            title={result.title}
            excerpt={result.excerpt}
            image={result.image}
            href={result.href}
            publishedAt={result.publishedAt}
            readTime={result.readTime}
            category={result.category}
            author={result.author}
            hashtags={result.hashtags}
          />
          {/* Type Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
              result.type === 'article' ? 'bg-blue-500' :
              result.type === 'product' ? 'bg-green-500' :
              'bg-purple-500'
            }`}>
              {result.type === 'article' ? 'Bài viết' :
               result.type === 'product' ? 'Sản phẩm' :
               'Dịch vụ'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

