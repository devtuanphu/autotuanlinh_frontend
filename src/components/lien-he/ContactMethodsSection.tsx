'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react';
import { ContactInfo } from '@/lib/data/lien-he';

interface ContactMethodsSectionProps {
  contactInfo: ContactInfo;
}

export default function ContactMethodsSection({ contactInfo }: ContactMethodsSectionProps) {
  return (
    <section className="py-24 bg-white relative -mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Phone Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Phone size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hotline</h3>
              <a href={`tel:${contactInfo.hotline.replace(/\s/g, '')}`} className="text-3xl font-black text-brand-accent hover:text-brand-accent-dark transition-colors block mb-3">
                {contactInfo.hotline}
              </a>
              <p className="text-gray-600 mb-4">Hỗ trợ 24/7</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>Luôn sẵn sàng</span>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Email</h3>
              <a href={`mailto:${contactInfo.email}`} className="text-lg font-bold text-brand-accent hover:text-brand-accent-dark transition-colors block mb-3 break-all">
                {contactInfo.email}
              </a>
              <p className="text-gray-600 mb-4">Phản hồi trong 24h</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>Phản hồi nhanh</span>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Địa chỉ</h3>
              <p className="text-gray-800 text-lg font-semibold mb-3 leading-relaxed">{contactInfo.address}</p>
              <p className="text-gray-600 mb-4">Mở cửa hàng ngày</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={14} />
                <span>Tất cả các ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

