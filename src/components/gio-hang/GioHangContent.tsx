'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import CartItemsSection from './CartItemsSection';
import CartSummarySection from './CartSummarySection';
import RecommendedProductsSection from './RecommendedProductsSection';
import { ShoppingBag } from 'lucide-react';

export default function GioHangContent() {
  const { getItemCount, getTotalItems } = useCart();
  const itemCount = getItemCount();
  const totalItems = getTotalItems();

  if (itemCount === 0) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <ShoppingBag size={20} className="sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                Giỏ hàng của bạn
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full flex-shrink-0"></span>
                <p className="text-xs sm:text-sm text-gray-600">
                  <span className="font-bold text-brand-accent">{itemCount}</span> sản phẩm 
                  {' '}(<span className="font-semibold">{totalItems}</span> món)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <CartItemsSection />
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummarySection />
          </div>
        </div>

        {/* Recommended Products */}
        <RecommendedProductsSection />
      </div>
    </main>
  );
}
