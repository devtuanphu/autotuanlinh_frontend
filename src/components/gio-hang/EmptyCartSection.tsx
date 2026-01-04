'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function EmptyCartSection() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  if (itemCount > 0) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-12 animate-fade-in">
            {/* Icon với gradient background */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-brand-accent/10 to-transparent rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-brand-accent/10 to-brand-accent/5 rounded-full flex items-center justify-center border-2 border-brand-accent/20 shadow-lg">
                <ShoppingBag size={72} className="text-brand-accent" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2">
                  <Sparkles size={24} className="text-yellow-400 animate-bounce" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Giỏ hàng của bạn đang trống
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md mx-auto">
              Khám phá bộ sưu tập sản phẩm chất lượng cao của chúng tôi và tìm những món đồ hoàn hảo cho bạn
            </p>
          </div>
          
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white px-10 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-brand-accent/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span>Khám phá sản phẩm</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}

