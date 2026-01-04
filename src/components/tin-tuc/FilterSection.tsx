'use client';

import React, { useState } from 'react';
import { Newspaper, Filter, ChevronDown } from 'lucide-react';
import { Category } from '@/lib/data/tin-tuc';

interface FilterSectionProps {
  categories: Category[];
  selectedCategory: string;
  totalCount: number;
  onCategoryChange: (categoryId: string) => void;
}

export default function FilterSection({
  categories,
  selectedCategory,
  totalCount,
  onCategoryChange,
}: FilterSectionProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Newspaper size={28} className="text-brand-accent" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Tất cả tin tức</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-semibold">
            {totalCount} bài viết
          </span>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-brand-accent transition-all duration-200"
        >
          <Filter size={18} className="text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Lọc</span>
          <ChevronDown size={18} className={`text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setShowFilters(false);
                }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-brand-accent text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-brand-accent text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            {category.name}
            <span className="ml-2 text-xs opacity-75">({category.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

