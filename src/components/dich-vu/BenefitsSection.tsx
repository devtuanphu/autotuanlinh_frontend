'use client';

import React from 'react';
import { Shield, Award, CheckCircle, TrendingUp, Users, Zap, LucideIcon } from 'lucide-react';
import { Benefit, TrustStat } from '@/lib/data/dich-vu';

interface BenefitsSectionProps {
  benefits: Benefit[];
  trustStats: TrustStat[];
}

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Award,
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
};

export default function BenefitsSection({ benefits, trustStats }: BenefitsSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Lợi ích khi sử dụng <span className="text-brand-accent">dịch vụ chuyên nghiệp</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dịch vụ chất lượng cao giúp bạn bảo vệ và nâng cấp xe một cách hiệu quả
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

          {/* Trust Section */}
          <div className="mt-16 bg-gradient-to-br from-brand-dark to-brand-dark/95 rounded-2xl p-10 lg:p-12 border border-brand-accent/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trustStats.map((stat, index) => {
                const Icon = iconMap[stat.icon];
                if (!Icon) return null;

                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent/20 rounded-xl mb-4">
                      <Icon size={32} className="text-brand-accent" />
                    </div>
                    <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

