'use client';

import React from 'react';
import ProductDetailLayout from '@/components/san-pham/ProductDetailLayout';

export default function ProductNotFoundSection() {
  return (
    <ProductDetailLayout
      breadcrumbs={[
        { name: 'Sản phẩm', href: '/san-pham' },
      ]}
    >
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h1>
        <p className="text-gray-600 text-lg mb-8">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
        <a
          href="/san-pham"
          className="inline-block bg-brand-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-accent-dark transition-colors"
        >
          Quay lại trang sản phẩm
        </a>
      </div>
    </ProductDetailLayout>
  );
}
