'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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
  generateProductFromItem 
} from '@/lib/data/san-pham';

interface SanPhamPageClientProps {
  categories: ProductCategoryData[];
}

export default function SanPhamPageClient({ categories }: SanPhamPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get pagination from URL params only
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Filters use local state (not URL params)
  const [sortBy, setSortBy] = useState<string>('default');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceRangeFilter, setPriceRangeFilter] = useState<{ min: number; max: number } | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Generate all products from all categories
  const allProducts = useMemo(() => {
    const products: Array<ReturnType<typeof generateProductFromItem> & {
      category?: {
        parentId: string;
        parentName: string;
        subCategoryId: string;
        subCategoryName: string;
      };
    }> = [];
    
    categories.forEach((category) => {
      category.children?.forEach((subCategory) => {
        subCategory.children?.forEach((productItem, index) => {
          const productData = generateProductFromItem(productItem, index, subCategory.id);
          products.push({
            ...productData,
            category: {
              parentId: category.id,
              parentName: category.name,
              subCategoryId: subCategory.id,
              subCategoryName: subCategory.name,
            },
          });
        });
      });
    });

    return products;
  }, [categories]);

  // Generate category filters with counts
  const categoryFilters = useMemo<CategoryFilter[]>(() => {
    const filters: CategoryFilter[] = [
      { id: 'all', name: 'Tất cả danh mục', count: allProducts.length }
    ];

    categories.forEach((category) => {
      const categoryProducts = allProducts.filter(
        p => p.category?.parentId === category.id
      );
      if (categoryProducts.length > 0) {
        filters.push({
          id: category.id,
          name: category.name,
          count: categoryProducts.length,
        });
      }
    });

    return filters;
  }, [allProducts, categories]);

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
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
    return { totalPages, startIndex, endIndex, paginatedProducts };
  }, [sortedProducts, currentPage]);

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

  // Update URL when page changes only
  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router]);

  // Scroll to top only when page changes (not on filter changes)
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection totalProducts={allProducts.length} />

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
                    totalItems={sortedProducts.length}
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

