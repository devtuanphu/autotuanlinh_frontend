'use client';

import React from 'react';
import { FileText, Shield, BookOpen, TrendingUp, LucideIcon } from 'lucide-react';
import { Benefit } from '@/lib/data/danh-muc-bai-viet-san-pham';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  FileText,
  Shield,
  BookOpen,
  TrendingUp,
};

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Lợi ích khi đọc <span className="text-brand-accent">bài viết sản phẩm</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thông tin chi tiết giúp bạn đưa ra quyết định mua hàng thông minh
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              if (!Icon) return null;

              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-accent/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-300">
                    <Icon size={24} className="text-brand-accent group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-accent transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

