'use client';

import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

export interface CategoryFilter {
  id: string;
  name: string;
  count: number;
}

interface CategoryFilterSectionProps {
  categories: CategoryFilter[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilterSection({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterSectionProps) {
  const [showMenu, setShowMenu] = useState(false);

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || categories[0];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Lọc theo danh mục:</span>
        
        {/* Category Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-brand-accent transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span className="text-sm font-semibold text-gray-700">{selectedCategoryData.name}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {selectedCategoryData.count}
            </span>
            <ChevronDown size={18} className={`text-gray-600 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Category Menu */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 z-20 overflow-hidden">
                <div className="p-2 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryChange(category.id);
                        setShowMenu(false);
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-brand-accent/10 text-brand-accent font-bold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm">{category.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-brand-accent text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                      {selectedCategory === category.id && (
                        <div className="ml-auto w-2 h-2 bg-brand-accent rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Clear Filter Button */}
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onCategoryChange('all')}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <X size={16} />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>
    </div>
  );
}

