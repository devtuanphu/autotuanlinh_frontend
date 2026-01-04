'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartItemsSection() {
  const { items, updateQuantity, removeItem } = useCart();

  const formatPrice = (amount: number) => {
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} ₫`;
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-lg flex items-center justify-center">
              <ShoppingBag size={16} className="sm:w-5 sm:h-5 text-white" />
            </div>
            <span>Sản phẩm trong giỏ hàng</span>
          </h2>
          <div className="text-white/80 text-xs sm:text-sm font-medium bg-white/10 px-2 py-1 rounded-md">
            {items.length}
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {items.map((item) => {
          const itemTotal = item.price * item.quantity;
          const discount = item.originalPrice 
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : 0;
          
          return (
            <div
              key={item.id}
              className="p-4 sm:p-5"
            >
              <div className="flex gap-3 sm:gap-4">
                {/* Product Image */}
                <Link href={item.href} className="flex-shrink-0 relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80px, 96px"
                    />
                    {discount > 0 && (
                      <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        -{discount}%
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  {/* Name & Remove */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={item.href} className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-snug">
                        {item.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      aria-label="Xóa sản phẩm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base sm:text-lg font-bold text-brand-accent">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Quantity & Total Row */}
                  <div className="pt-3 border-t border-gray-100 space-y-3">
                    {/* Quantity */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 font-medium">Số lượng:</span>
                      <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
                          aria-label="Giảm số lượng"
                        >
                          <Minus size={14} className="text-gray-700" />
                        </button>
                        <span className="w-9 text-center font-bold text-gray-900 text-sm border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={!item.inStock}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Tăng số lượng"
                        >
                          <Plus size={14} className="text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-sm font-semibold text-gray-700">Thành tiền:</span>
                      <div className="text-lg sm:text-xl font-bold text-gray-900">
                        {formatPrice(itemTotal)}
                      </div>
                    </div>
                  </div>

                  {!item.inStock && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded border border-red-100">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                      Hết hàng
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
