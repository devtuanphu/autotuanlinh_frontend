'use client';

import React from 'react';
import { User, Phone, Mail, MapPin, Building2 } from 'lucide-react';

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

interface CustomerInfoSectionProps {
  formData: CustomerFormData;
  onFormDataChange: (data: CustomerFormData) => void;
}

export default function CustomerInfoSection({ formData, onFormDataChange }: CustomerInfoSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFormDataChange({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <User size={22} className="text-white" />
          </div>
          Thông tin khách hàng
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
              placeholder="Nhập họ và tên"
            />
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
                placeholder="0901234567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin size={20} className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
              placeholder="Số nhà, tên đường"
            />
          </div>
        </div>

        {/* City, District, Ward */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tỉnh/Thành phố <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
                placeholder="TP. Hồ Chí Minh"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quận/Huyện <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
              placeholder="Quận 1"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phường/Xã <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
              placeholder="Phường 1"
            />
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ghi chú (tùy chọn)
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none resize-none"
            placeholder="Ghi chú thêm cho đơn hàng..."
          />
        </div>
      </div>
    </div>
  );
}

