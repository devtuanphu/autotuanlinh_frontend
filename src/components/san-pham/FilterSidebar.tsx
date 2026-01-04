'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import { Filter, X, ChevronDown, Star, DollarSign } from 'lucide-react';
import { CategoryFilter } from './CategoryFilterSection';

interface FilterSidebarProps {
  categories: CategoryFilter[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  priceRange: { min: number; max: number };
  selectedPriceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  onClearFilters: () => void;
}

const FilterSidebar = memo(function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedRating,
  onRatingChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const [localPriceRange, setLocalPriceRange] = useState(selectedPriceRange);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalPriceRange(selectedPriceRange);
  }, [selectedPriceRange]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Update price range - update UI immediately, debounce URL update
  const updatePriceRange = (range: { min: number; max: number }) => {
    // Ensure min < max with minimum gap
    const minGap = (priceRange.max - priceRange.min) * 0.01;
    const safeRange = {
      min: Math.max(priceRange.min, Math.min(range.min, range.max - minGap)),
      max: Math.min(priceRange.max, Math.max(range.max, range.min + minGap)),
    };
    
    setLocalPriceRange(safeRange);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Debounce the update
    timeoutRef.current = setTimeout(() => {
      onPriceRangeChange(safeRange);
    }, 100);
  };

  // Force immediate update on mouse/touch end
  const handleRangeEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Force immediate update with current local state
    onPriceRangeChange(localPriceRange);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const formatPrice = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)}M`;
    }
    return `${(amount / 1000).toFixed(0)}K`;
  };

  const hasActiveFilters = selectedCategory !== 'all' || 
    selectedPriceRange.min !== priceRange.min || 
    selectedPriceRange.max !== priceRange.max ||
    selectedRating !== null;

  return (
    <div className="filter-sidebar bg-white rounded-2xl shadow-lg border-t border-l border-b border-gray-200 border-r-0 p-6 sticky top-4" style={{ borderRight: 'none' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-brand-accent" />
          <h3 className="text-lg font-bold text-gray-900">Bộ lọc</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-brand-accent hover:text-brand-accent-dark font-semibold flex items-center gap-1 whitespace-nowrap"
          >
            <X size={16} />
            <span>Xóa tất cả</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h4 className="text-base font-bold text-gray-900">Danh mục</h4>
            <ChevronDown
              size={18}
              className={`text-gray-600 transition-transform ${
                expandedSections.category ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-brand-accent/10 text-brand-accent font-bold border-2 border-brand-accent'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span className="text-sm">{category.name}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-brand-accent text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-brand-accent" />
              <h4 className="text-base font-bold text-gray-900">Khoảng giá</h4>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-600 transition-transform ${
                expandedSections.price ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.price && (
            <div className="space-y-4">
              {/* Range Slider Container */}
              <div 
                ref={sliderRef}
                className="relative py-4"
                onMouseDown={(e) => {
                  if (!sliderRef.current) return;
                  const rect = sliderRef.current.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const width = rect.width;
                  const percent = (x / width) * 100;
                  
                  const minPercent = ((localPriceRange.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100;
                  const maxPercent = ((localPriceRange.max - priceRange.min) / (priceRange.max - priceRange.min)) * 100;
                  
                  // Determine which thumb is closer
                  const distToMin = Math.abs(percent - minPercent);
                  const distToMax = Math.abs(percent - maxPercent);
                  
                  if (distToMin < distToMax) {
                    setActiveThumb('min');
                  } else {
                    setActiveThumb('max');
                  }
                }}
                onMouseMove={(e) => {
                  if (!activeThumb || !sliderRef.current) return;
                  const rect = sliderRef.current.getBoundingClientRect();
                  const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                  const percent = x / rect.width;
                  const value = priceRange.min + (priceRange.max - priceRange.min) * percent;
                  
                  if (activeThumb === 'min') {
                    updatePriceRange({
                      min: Math.min(value, localPriceRange.max - 1000),
                      max: localPriceRange.max,
                    });
                  } else {
                    updatePriceRange({
                      min: localPriceRange.min,
                      max: Math.max(value, localPriceRange.min + 1000),
                    });
                  }
                }}
                onMouseUp={() => {
                  setActiveThumb(null);
                  handleRangeEnd();
                }}
                onMouseLeave={() => {
                  setActiveThumb(null);
                  handleRangeEnd();
                }}
              >
                {/* Track Background */}
                <div className="relative h-2 bg-gray-200 rounded-full">
                  {/* Active Range Track */}
                  <div
                    className="absolute h-2 bg-brand-accent rounded-full"
                    style={{
                      left: `${((localPriceRange.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                      width: `${((localPriceRange.max - localPriceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                    }}
                  ></div>
                </div>
                
                {/* Min Range Input */}
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  step={Math.max(1000, Math.floor((priceRange.max - priceRange.min) / 100))}
                  value={localPriceRange.min}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    updatePriceRange({
                      min: value,
                      max: localPriceRange.max,
                    });
                  }}
                  onMouseUp={handleRangeEnd}
                  onTouchEnd={handleRangeEnd}
                  className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer z-20"
                />
                
                {/* Max Range Input */}
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  step={Math.max(1000, Math.floor((priceRange.max - priceRange.min) / 100))}
                  value={localPriceRange.max}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    updatePriceRange({
                      min: localPriceRange.min,
                      max: value,
                    });
                  }}
                  onMouseUp={handleRangeEnd}
                  onTouchEnd={handleRangeEnd}
                  className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer z-20"
                />
                
                {/* Custom Thumb Indicators */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-brand-accent rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing z-30 transition-transform hover:scale-110 ${
                    activeThumb === 'min' ? 'scale-125' : ''
                  }`}
                  style={{
                    left: `calc(${((localPriceRange.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100}% - 10px)`,
                    pointerEvents: 'auto',
                  }}
                ></div>
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-brand-accent rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing z-30 transition-transform hover:scale-110 ${
                    activeThumb === 'max' ? 'scale-125' : ''
                  }`}
                  style={{
                    left: `calc(${((localPriceRange.max - priceRange.min) / (priceRange.max - priceRange.min)) * 100}% - 10px)`,
                    pointerEvents: 'auto',
                  }}
                ></div>
              </div>
              
              {/* Price Display */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 text-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Từ</div>
                  <div className="text-sm font-bold text-gray-900">{formatPrice(localPriceRange.min)}</div>
                </div>
                <span className="text-gray-400 font-bold">-</span>
                <div className="flex-1 text-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Đến</div>
                  <div className="text-sm font-bold text-gray-900">{formatPrice(localPriceRange.max)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div>
          <button
            onClick={() => toggleSection('rating')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <Star size={18} className="text-brand-accent fill-brand-accent" />
              <h4 className="text-base font-bold text-gray-900">Đánh giá</h4>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-600 transition-transform ${
                expandedSections.rating ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.rating && (
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onRatingChange(selectedRating === rating ? null : rating)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    selectedRating === rating
                      ? 'bg-brand-accent/10 text-brand-accent font-bold border-2 border-brand-accent'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star
                      size={16}
                      className={`${
                        selectedRating === rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 ml-auto">trở lên</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default FilterSidebar;

