'use client';

import React from 'react';
import ProductCard from '@/components/shared/ProductCard';

interface ProductData {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  href: string;
  inStock?: boolean;
  brand?: string;
  freeShipping?: boolean;
  warranty?: string;
}

interface ProductsGridSectionProps {
  products: ProductData[];
}

export default function ProductsGridSection({ products }: ProductsGridSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}

