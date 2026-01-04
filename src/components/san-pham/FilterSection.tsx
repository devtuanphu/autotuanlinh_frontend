'use client';

import React, { useState } from 'react';
import { Package, Filter, ChevronDown, Grid3x3, ArrowUp, ArrowDown, Star, TrendingUp, Clock, LucideIcon } from 'lucide-react';
import { SortOption } from '@/lib/data/san-pham';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Grid3x3,
  ArrowUp,
  ArrowDown,
  Star,
  TrendingUp,
  Clock,
};

interface FilterSectionProps {
  totalCount: number;
  sortBy: string;
  onSortChange: (sortId: string) => void;
  sortOptions: SortOption[];
}

export default function FilterSection({
  totalCount,
  sortBy,
  onSortChange,
  sortOptions,
}: FilterSectionProps) {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const selectedSort = sortOptions.find(s => s.id === sortBy) || sortOptions[0];

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Package size={28} className="text-brand-accent" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Tất cả sản phẩm</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-semibold">
            {totalCount} sản phẩm
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-brand-accent transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Sắp xếp:</span>
            <span className="text-sm font-bold text-brand-accent">{selectedSort.name}</span>
            <ChevronDown size={18} className={`text-gray-600 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Sort Menu */}
          {showSortMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowSortMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 z-20 overflow-hidden">
                <div className="p-2">
                  {sortOptions.map((option) => {
                    const Icon = iconMap[option.icon];
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          onSortChange(option.id);
                          setShowSortMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          sortBy === option.id
                            ? 'bg-brand-accent/10 text-brand-accent font-bold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {Icon && <Icon size={18} />}
                        <span className="text-sm">{option.name}</span>
                        {sortBy === option.id && (
                          <div className="ml-auto w-2 h-2 bg-brand-accent rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

