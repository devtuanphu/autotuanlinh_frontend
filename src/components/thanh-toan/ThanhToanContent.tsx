'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import CustomerInfoSection from './CustomerInfoSection';
import PaymentMethodSection from './PaymentMethodSection';
import OrderSummarySection from './OrderSummarySection';
import { CreditCard } from 'lucide-react';

export interface CustomerFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note?: string;
}

export type PaymentMethod = 'cod' | 'bank' | 'momo' | 'vnpay';

export default function ThanhToanContent() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  if (itemCount === 0) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-2xl flex items-center justify-center shadow-xl">
              <CreditCard size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Thanh toán
              </h1>
              <p className="text-gray-600 text-lg">
                Vui lòng điền thông tin để hoàn tất đơn hàng
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <CustomerInfoSection 
              formData={customerInfo}
              onFormDataChange={setCustomerInfo}
            />
            <PaymentMethodSection 
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummarySection 
              customerInfo={customerInfo}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

