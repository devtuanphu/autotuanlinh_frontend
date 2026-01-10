'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import HeroSection from './HeroSection';
import FilterSidebar from './FilterSidebar';
import { CategoryFilter } from './CategoryFilterSection';
import FilterSection from './FilterSection';
import ProductsGridSection from './ProductsGridSection';
import PaginationSection from './PaginationSection';
import EmptyStateSection from './EmptyStateSection';
import { 
  ProductCategoryData, 
  ITEMS_PER_PAGE, 
  sortOptions, 
  ProductDetail
} from '@/lib/data/san-pham';

interface SanPhamPageClientProps {
  categories: ProductCategoryData[];
  products?: ProductDetail[];
  totalPages?: number;
  totalProducts?: number;
  currentPage?: number;
}

export default function SanPhamPageClient({ 
  categories,
  products: productsFromProps = [],
  totalPages: totalPagesFromProps = 1,
  totalProducts: totalProductsFromProps = 0,
  currentPage: currentPageFromProps = 1,
}: SanPhamPageClientProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get current page from URL params or props
  const currentPage = parseInt(searchParams.get('page') || String(currentPageFromProps), 10);

  // Filters use local state (not URL params)
  const [sortBy, setSortBy] = useState<string>('default');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceRangeFilter, setPriceRangeFilter] = useState<{ min: number; max: number } | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Use products from API if available
  // Note: If products come from API, we use them directly
  // Categories are still used for filter sidebar
  const allProducts = useMemo(() => {
    return productsFromProps.length > 0 ? productsFromProps : [];
  }, [productsFromProps]);

  // Generate category filters with counts
  // If products come from API, use categories from hardcoded data for filters
  const categoryFilters = useMemo<CategoryFilter[]>(() => {
    const filters: CategoryFilter[] = [
      { id: 'all', name: 'Tất cả danh mục', count: productsFromProps.length > 0 ? totalProductsFromProps : allProducts.length }
    ];

    // Use categories from props for filter options
    // Note: Counts may not match exactly if products come from API
    categories.forEach((category) => {
      filters.push({
        id: category.id,
        name: category.name,
        count: 0, // Count not available from API pagination
      });
    });

    return filters;
  }, [allProducts, categories, productsFromProps.length, totalProductsFromProps]);

  // Calculate price range from all products
  const priceRange = useMemo(() => {
    if (allProducts.length === 0) return { min: 0, max: 0 };
    const prices = allProducts.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [allProducts]);

  // Get selected price range from local state or use full range
  const selectedPriceRange = useMemo(() => {
    if (priceRangeFilter) {
      return priceRangeFilter;
    }
    return priceRange;
  }, [priceRangeFilter, priceRange]);

  // Filter products by category, price, and rating
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category?.parentId === categoryFilter);
    }

    // Filter by price range
    if (priceRangeFilter) {
      filtered = filtered.filter(
        p => p.price >= priceRangeFilter.min && p.price <= priceRangeFilter.max
      );
    }

    // Filter by rating
    if (ratingFilter !== null) {
      filtered = filtered.filter(p => p.rating >= ratingFilter);
    }

    return filtered;
  }, [allProducts, categoryFilter, priceRangeFilter, ratingFilter]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case 'newest':
        return sorted.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Calculate pagination
  // If products come from API, they are already paginated, so use API pagination data
  // Otherwise, paginate client-side
  const pagination = useMemo(() => {
    if (productsFromProps.length > 0) {
      // Products from API are already paginated
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + sortedProducts.length;
      return { 
        totalPages: totalPagesFromProps, 
        startIndex, 
        endIndex, 
        paginatedProducts: sortedProducts 
      };
    } else {
      // Client-side pagination for fallback
      const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
      return { totalPages, startIndex, endIndex, paginatedProducts };
    }
  }, [sortedProducts, currentPage, productsFromProps.length, totalPagesFromProps]);

  // Update local state when filters change (no URL update, no page reset)
  const handleSortChange = useCallback((sortId: string) => {
    setSortBy(sortId);
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setCategoryFilter(categoryId);
  }, []);

  const handlePriceRangeChange = useCallback((range: { min: number; max: number }) => {
    // Check if range is at default (full range)
    const isDefaultRange = range.min <= priceRange.min && range.max >= priceRange.max;
    
    if (isDefaultRange) {
      setPriceRangeFilter(null);
    } else {
      setPriceRangeFilter(range);
    }
  }, [priceRange]);

  const handleRatingChange = useCallback((rating: number | null) => {
    setRatingFilter(rating);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSortBy('default');
    setCategoryFilter('all');
    setPriceRangeFilter(null);
    setRatingFilter(null);
  }, []);

  // Update URL when page changes and reload page (like tin-tuc page)
  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    window.location.href = `${pathname}?${params.toString()}`;
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection totalProducts={productsFromProps.length > 0 ? totalProductsFromProps : allProducts.length} />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Layout: 3/9 (Filter Sidebar / Products) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Filter Sidebar - 3 columns */}
          <aside className="lg:col-span-3">
            <FilterSidebar
              categories={categoryFilters}
              selectedCategory={categoryFilter}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={handlePriceRangeChange}
              selectedRating={ratingFilter}
              onRatingChange={handleRatingChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Products Section - 9 columns */}
          <div className="lg:col-span-9">
            {/* Filter and Sort Section */}
            <FilterSection
              totalCount={sortedProducts.length}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              sortOptions={sortOptions}
            />

            {/* Products Grid */}
            {pagination.paginatedProducts.length > 0 ? (
              <>
                <ProductsGridSection products={pagination.paginatedProducts} />
                
                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <PaginationSection
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    startIndex={pagination.startIndex}
                    endIndex={pagination.endIndex}
                    totalItems={productsFromProps.length > 0 ? totalProductsFromProps : sortedProducts.length}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <EmptyStateSection />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

