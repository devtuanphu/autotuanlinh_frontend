'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function OrderSummarySection() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const router = useRouter();

  const formatPrice = (amount: number) => {
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} ₫`;
  };

  const subtotal = getTotalPrice();
  const shipping = 0;
  const total = subtotal + shipping;
  const totalItems = getTotalItems();

  const handlePlaceOrder = () => {
    // Save order info to localStorage before clearing cart
    if (typeof window !== 'undefined') {
      const orderId = `ATL-${Date.now().toString().slice(-8)}`;
      const orderDate = new Date().toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const orderInfo = { orderId, orderDate };
      localStorage.setItem('lastOrderInfo', JSON.stringify(orderInfo));
    }
    
    // Clear cart and redirect to thank you page
    clearCart();
    router.push('/cam-on');
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-accent via-brand-accent to-brand-accent-dark px-6 py-5">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <ShoppingBag size={22} className="text-white" />
            </div>
            Đơn hàng của bạn
          </h2>
        </div>

        <div className="p-6 bg-gradient-to-b from-white to-gray-50/30">
          {/* Products List */}
          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <Link href={item.href} className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={item.href}>
                    <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-brand-accent transition-colors">
                      {item.name}
                    </h4>
                  </Link>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">x{item.quantity}</span>
                    <span className="text-sm font-bold text-brand-accent">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6 pt-4 border-t-2 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Tạm tính</span>
              <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between items-center py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-4 border border-green-100">
              <span className="text-gray-700 font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Phí vận chuyển
              </span>
              <span className="font-bold text-green-600">Miễn phí</span>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Số lượng sản phẩm</span>
                <span className="text-sm font-semibold text-gray-700">{totalItems} món</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900">Tổng cộng</span>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-brand-accent to-brand-accent-dark bg-clip-text text-transparent">
                    {formatPrice(total)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Đã bao gồm VAT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="group w-full bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-brand-accent/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 mb-3"
          >
            <Lock size={20} />
            <span>Đặt hàng</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
            <Lock size={12} />
            <span>Thông tin của bạn được bảo mật</span>
          </div>
        </div>
      </div>
    </div>
  );
}

