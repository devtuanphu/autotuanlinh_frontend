'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, ArrowRight, CheckCircle2, CreditCard } from 'lucide-react';

export default function CartSummarySection() {
  const { getTotalPrice, getTotalItems } = useCart();

  const formatPrice = (amount: number) => {
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} ₫`;
  };

  const subtotal = getTotalPrice();
  const shipping = 0;
  const total = subtotal + shipping;
  const totalItems = getTotalItems();

  return (
    <div className="space-y-4">
      {/* Order Summary */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-200 overflow-hidden lg:sticky lg:top-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-accent to-brand-accent-dark px-4 sm:px-6 py-3.5 sm:py-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <ShoppingBag size={16} className="sm:w-5 sm:h-5 text-white" />
            </div>
            <span>Tóm tắt đơn hàng</span>
          </h2>
        </div>
        
        <div className="p-4 sm:p-5 lg:p-6">
          {/* Price Breakdown */}
          <div className="space-y-3 mb-5">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-700">
                Tạm tính
              </span>
              <span className="font-bold text-gray-900 text-sm sm:text-base">{formatPrice(subtotal)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg border border-green-100">
              <span className="text-sm sm:text-base text-gray-700 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <span>Phí vận chuyển</span>
              </span>
              <span className="font-bold text-green-600 text-sm sm:text-base">Miễn phí</span>
            </div>
            
            <div className="pt-3 border-t-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">Số lượng sản phẩm</span>
                <span className="text-xs font-semibold text-gray-700">{totalItems} món</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-base sm:text-lg font-bold text-gray-900">Tổng cộng</span>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-accent">
                    {formatPrice(total)}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Đã bao gồm VAT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <Link
              href="/thanh-toan"
              className="group w-full bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white px-4 sm:px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-brand-accent/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <CreditCard size={18} className="sm:w-5 sm:h-5" />
              <span>Tiến hành thanh toán</span>
              <ArrowRight size={16} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/san-pham"
              className="w-full border border-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>Tiếp tục mua sắm</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
