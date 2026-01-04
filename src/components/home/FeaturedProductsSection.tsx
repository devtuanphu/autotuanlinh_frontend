'use client';

import React from 'react';
import ProductsSwiper from '@/components/home/ProductsSwiper';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  href: string;
}

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sản phẩm nổi bật</h2>
          <p className="text-gray-600">Khám phá các sản phẩm được yêu thích nhất</p>
        </div>
        <ProductsSwiper products={products} />
      </div>
    </section>
  );
}

