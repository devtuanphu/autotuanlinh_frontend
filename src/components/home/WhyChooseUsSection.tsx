'use client';

import React from 'react';
import { Shield, Award, Clock, Headphones, CheckCircle, LucideIcon } from 'lucide-react';

export interface Reason {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsSectionProps {
  reasons: Reason[];
}

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Award,
  Clock,
  Headphones,
  CheckCircle,
};

export default function WhyChooseUsSection({ reasons }: WhyChooseUsSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-dark to-brand-dark/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Tại sao chọn <span className="text-brand-accent">Auto Tuan Linh?</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Những lý do khiến hàng ngàn khách hàng tin tưởng và lựa chọn chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => {
            const Icon = iconMap[reason.icon];
            if (!Icon) return null;

            return (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 hover:border-brand-accent/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-brand-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-300">
                  <Icon size={32} className="text-brand-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

