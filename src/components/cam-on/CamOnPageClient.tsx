'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, Home, Package, Phone, Mail } from 'lucide-react';

export default function CamOnContent() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 animate-fade-in">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-green-500/10 to-transparent rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                <CheckCircle2 size={64} className="text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Cảm ơn bạn đã đặt hàng!
            </h1>
            <p className="text-xl text-gray-600 mb-2 leading-relaxed">
              Đơn hàng của bạn đã được tiếp nhận thành công
            </p>
            <p className="text-lg text-gray-500">
              Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng
            </p>
          </div>

          {/* Order Info Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-xl flex items-center justify-center">
                  <Package size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Thông tin đơn hàng</h2>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Mã đơn hàng</span>
                  <span className="font-bold text-gray-900">#ATL-{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Thời gian đặt hàng</span>
                  <span className="font-semibold text-gray-900">
                    {new Date().toLocaleString('vi-VN')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Trạng thái</span>
                  <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
                    Đã tiếp nhận
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 rounded-2xl p-6 mb-8 border border-brand-accent/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cần hỗ trợ?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={20} className="text-brand-accent" />
                <span className="font-semibold">Hotline: 1900 1234</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={20} className="text-brand-accent" />
                <span className="font-semibold">Email: support@autotuanlinh.com</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-brand-accent/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Home size={20} />
              <span>Về trang chủ</span>
            </Link>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              <ShoppingBag size={20} />
              <span>Tiếp tục mua sắm</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

