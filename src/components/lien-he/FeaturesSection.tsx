'use client';

import React from 'react';
import { Headphones, Zap, Shield, Award, Sparkles, Settings, LucideIcon } from 'lucide-react';
import { Feature } from '@/lib/data/lien-he';

interface FeaturesSectionProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Headphones,
  Zap,
  Shield,
  Award,
  Settings,
};

export default function FeaturesSection({ features, title, subtitle }: FeaturesSectionProps) {
  const displayTitle = title || 'Dịch vụ chuyên nghiệp';
  const displaySubtitle = subtitle || 'Cam kết mang đến trải nghiệm tốt nhất cho khách hàng';
  
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 rounded-full mb-6">
            <Sparkles size={16} className="text-brand-accent" />
            <span className="text-sm font-bold text-brand-accent uppercase tracking-wider">Tại sao chọn chúng tôi</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            {displayTitle.includes('chuyên nghiệp') ? (
              <>
                Dịch vụ <span className="bg-gradient-to-r from-brand-accent to-blue-500 bg-clip-text text-transparent">chuyên nghiệp</span>
              </>
            ) : (
              displayTitle
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {displaySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            if (!Icon) return null;

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-brand-accent/50 transition-all duration-300 hover:shadow-2xl"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

