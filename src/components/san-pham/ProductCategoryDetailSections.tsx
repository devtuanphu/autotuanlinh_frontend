'use client';

import React, { useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductsGridSection from './ProductsGridSection';
import EmptyStateSection from './EmptyStateSection';
import FilterSection from './FilterSection';
import PaginationSection from './PaginationSection';
import { ProductCategoryDetail, ITEMS_PER_PAGE, sortOptions, generateProductFromItem } from '@/lib/data/san-pham';

interface ProductCategoryDetailSectionsProps {
  categoryDetail: ProductCategoryDetail;
}

export default function ProductCategoryDetailSections({ categoryDetail }: ProductCategoryDetailSectionsProps) {
  const { subCategory, products } = categoryDetail;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get sort and page from URL params
  const sortBy = searchParams.get('sort') || 'default';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Generate product data with all properties
  const productDataList = useMemo(() => {
    return products.map((product, index) => 
      generateProductFromItem(product, index, subCategory.id)
    );
  }, [products, subCategory.id]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...productDataList];
    
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
  }, [productDataList, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Update URL when sort changes
  const handleSortChange = (sortId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortId);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (products.length === 0) {
    return <EmptyStateSection />;
  }

  return (
    <>
      <FilterSection
        totalCount={sortedProducts.length}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        sortOptions={sortOptions}
      />
      <ProductsGridSection
        products={paginatedProducts}
      />
      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={sortedProducts.length}
        onPageChange={handlePageChange}
      />
    </>
  );
}
