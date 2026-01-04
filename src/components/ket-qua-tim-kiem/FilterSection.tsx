'use client';

import React, { useState } from 'react';
import { Search, Filter, ChevronDown, FileText, Package, Wrench, TrendingUp, Clock, Star, LucideIcon } from 'lucide-react';
import { TypeFilter, SortOption } from '@/lib/data/ket-qua-tim-kiem';

interface FilterSectionProps {
  searchQuery: string;
  typeFilters: TypeFilter[];
  sortOptions: SortOption[];
  selectedType: string;
  sortBy: string;
  totalCount: number;
  onTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
  highlightText: (text: string, query: string) => React.ReactNode;
}

const iconMap: Record<string, LucideIcon> = {
  Search,
  FileText,
  Package,
  Wrench,
  TrendingUp,
  Clock,
  Star,
};

export default function FilterSection({
  searchQuery,
  typeFilters,
  sortOptions,
  selectedType,
  sortBy,
  totalCount,
  onTypeChange,
  onSortChange,
  highlightText,
}: FilterSectionProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Search size={24} className="text-brand-accent" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {searchQuery ? highlightText(`Kết quả cho "${searchQuery}"`, searchQuery) : 'Kết quả tìm kiếm'}
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-semibold">
            {totalCount} kết quả
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-brand-accent transition-all duration-200"
          >
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Lọc</span>
            <ChevronDown size={18} className={`text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6">
          {/* Type Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Loại kết quả</h3>
            <div className="flex flex-wrap items-center gap-3">
              {typeFilters.map((filter) => {
                const Icon = iconMap[filter.icon];
                if (!Icon) return null;

                return (
                  <button
                    key={filter.id}
                    onClick={() => {
                      onTypeChange(filter.id);
                      setShowFilters(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      selectedType === filter.id
                        ? 'bg-brand-accent text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={16} />
                    {filter.name}
                    <span className="text-xs opacity-75">({filter.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Sắp xếp theo</h3>
            <div className="flex flex-wrap items-center gap-3">
              {sortOptions.map((option) => {
                const Icon = iconMap[option.icon];
                if (!Icon) return null;

                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      onSortChange(option.id);
                      setShowFilters(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      sortBy === option.id
                        ? 'bg-brand-accent text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={16} />
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {typeFilters.map((filter) => {
          const Icon = iconMap[filter.icon];
          if (!Icon) return null;

          return (
            <button
              key={filter.id}
              onClick={() => onTypeChange(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                selectedType === filter.id
                  ? 'bg-brand-accent text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <Icon size={16} />
              {filter.name}
              <span className="text-xs opacity-75">({filter.count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

