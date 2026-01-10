'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, CheckCircle2, Lock, Loader2 } from 'lucide-react';
import { createOrder, type CreateOrderData } from '@/lib/api/strapi';
import type { CustomerFormData } from './CustomerInfoSection';
import type { PaymentMethod } from './PaymentMethodSection';

interface OrderSummarySectionProps {
  customerInfo: CustomerFormData;
  paymentMethod: PaymentMethod;
}

export default function OrderSummarySection({ customerInfo, paymentMethod }: OrderSummarySectionProps) {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (amount: number) => {
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} ₫`;
  };

  const subtotal = getTotalPrice();
  const shipping: number = 50000; // Default shipping fee
  const total = subtotal + shipping;
  const totalItems = getTotalItems();

  // Map payment method to API format
  const getPaymentMethodName = (method: PaymentMethod): string => {
    const methodMap: Record<PaymentMethod, string> = {
      cod: 'Thanh toán khi nhận hàng',
      bank: 'Chuyển khoản ngân hàng',
      momo: 'Ví điện tử MoMo',
      vnpay: 'VNPay',
    };
    return methodMap[method];
  };

  // Extract product ID from cart item - must return a number for Strapi relation
  const extractProductId = (itemId: string, productId?: string): number => {
    // First try productId if available
    if (productId) {
      const numericProductId = parseInt(productId, 10);
      if (!isNaN(numericProductId) && numericProductId > 0) {
        return numericProductId;
      }
    }
    
    // Try to parse itemId as number
    const numericId = parseInt(itemId, 10);
    if (!isNaN(numericId) && numericId > 0) {
      return numericId;
    }
    
    // If itemId is a string, try to extract number from it (e.g., "product-123" -> 123)
    const match = itemId.match(/\d+/);
    if (match) {
      const extracted = parseInt(match[0], 10);
      if (!isNaN(extracted) && extracted > 0) {
        return extracted;
      }
    }
    
    // Fallback: generate a hash-based number (should not happen in production)
    // This is a workaround if productId is not properly set
    let hash = 0;
    for (let i = 0; i < itemId.length; i++) {
      const char = itemId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % 1000000 + 1; // Return a positive number > 0
  };

  const handlePlaceOrder = async () => {
    // Validate form data
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.email || 
        !customerInfo.address || !customerInfo.city || !customerInfo.district || !customerInfo.ward) {
      showToast('Vui lòng điền đầy đủ thông tin khách hàng', 'error');
      return;
    }

    if (items.length === 0) {
      showToast('Giỏ hàng của bạn đang trống', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData: CreateOrderData = {
        thongTinKhachHang: {
          hoVaTen: customerInfo.fullName,
          soDienThoai: customerInfo.phone,
          email: customerInfo.email,
          diaChi: customerInfo.address,
          tinhThanhPho: customerInfo.city,
          quanHuyen: customerInfo.district,
          phuongXa: customerInfo.ward,
        },
        sanPhams: items.map((item) => ({
          sanPham: extractProductId(item.id, item.productId),
          soLuong: item.quantity,
          giaBan: item.price,
          thanhTien: item.price * item.quantity,
        })),
        tamTinh: subtotal,
        phiVanChuyen: shipping,
        tongCong: total,
        phuongThucThanhToan: {
          loai: paymentMethod,
          ten: getPaymentMethodName(paymentMethod),
        },
      };

      // Call API to create order
      const result = await createOrder(orderData);

      if (result.success) {
        // Save order info to localStorage before clearing cart
        if (typeof window !== 'undefined') {
          // Type guard for Strapi response
          const strapiResponse = result.data as { data?: { id?: number | string } } | undefined;
          const orderId = strapiResponse?.data?.id 
            ? `ATL-${strapiResponse.data.id}`
            : `ATL-${Date.now().toString().slice(-8)}`;
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

        // Show success toast
        showToast('Đặt hàng thành công!', 'success');
        
        // Set a flag in localStorage to prevent EmptyCartRedirect from interfering
        // This flag will be checked by EmptyCartRedirect component
        if (typeof window !== 'undefined') {
          localStorage.setItem('skipEmptyCartRedirect', 'true');
        }
        
        // Clear cart first (EmptyCartRedirect won't interfere due to flag above)
        clearCart();
        
        // Use window.location.href to ensure redirect always works
        // Use setTimeout to ensure clearCart completes first
        setTimeout(() => {
          window.location.href = '/cam-on';
        }, 50);
      } else {
        // Show error toast
        showToast(result.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.', 'error');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      showToast('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
              <span className="font-bold text-green-600">
                {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
              </span>
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
            disabled={isSubmitting}
            className={`group w-full bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-brand-accent/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 mb-3 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <Lock size={20} />
                <span>Đặt hàng</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
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

