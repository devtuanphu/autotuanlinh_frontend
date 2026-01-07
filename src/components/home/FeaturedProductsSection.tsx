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
  title?: string;
  subtitle?: string;
  products: Product[];
}

export default function FeaturedProductsSection({ title, subtitle, products }: FeaturedProductsSectionProps) {
  const defaultTitle = 'Sản phẩm nổi bật';
  const defaultSubtitle = 'Khám phá các sản phẩm được yêu thích nhất';
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title || defaultTitle}</h2>
          <p className="text-gray-600">{subtitle || defaultSubtitle}</p>
        </div>
        <ProductsSwiper products={products} />
      </div>
    </section>
  );
}

