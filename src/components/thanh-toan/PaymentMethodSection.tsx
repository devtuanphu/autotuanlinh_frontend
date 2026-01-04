'use client';

import React, { useState } from 'react';
import { CreditCard, Wallet, QrCode, CheckCircle2 } from 'lucide-react';

type PaymentMethod = 'cod' | 'bank' | 'momo' | 'vnpay';

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const paymentMethods: PaymentOption[] = [
  {
    id: 'cod',
    name: 'Thanh toán khi nhận hàng',
    description: 'Thanh toán bằng tiền mặt khi nhận được hàng',
    icon: <Wallet size={24} className="text-white" />,
  },
  {
    id: 'bank',
    name: 'Chuyển khoản ngân hàng',
    description: 'Chuyển khoản qua tài khoản ngân hàng',
    icon: <CreditCard size={24} className="text-white" />,
  },
  {
    id: 'momo',
    name: 'Ví điện tử MoMo',
    description: 'Thanh toán qua ứng dụng MoMo',
    icon: <QrCode size={24} className="text-white" />,
  },
  {
    id: 'vnpay',
    name: 'VNPay',
    description: 'Thanh toán qua cổng VNPay',
    icon: <CreditCard size={24} className="text-white" />,
  },
];

export default function PaymentMethodSection() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cod');

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <CreditCard size={22} className="text-white" />
          </div>
          Phương thức thanh toán
        </h2>
      </div>

      <div className="p-6 space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedMethod === method.id
                ? 'border-brand-accent bg-brand-accent/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selectedMethod === method.id
                    ? 'bg-gradient-to-br from-brand-accent to-brand-accent-dark'
                    : 'bg-gray-100'
                }`}
              >
                {method.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{method.name}</h3>
                  {selectedMethod === method.id && (
                    <CheckCircle2 size={20} className="text-brand-accent" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

