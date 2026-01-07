'use client';

import React from 'react';
import { Search, MessageSquare, CheckCircle, Truck, LucideIcon } from 'lucide-react';

export interface ProcessStep {
  icon: string | null; // Icon name as string or null
  title: string;
  description: string;
  step: number;
}

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
}

const iconMap: Record<string, LucideIcon> = {
  Search,
  MessageSquare,
  CheckCircle,
  Truck,
};

export default function ProcessSection({ title, subtitle, steps }: ProcessSectionProps) {
  const defaultTitle = 'Quy trình mua hàng';
  const defaultSubtitle = 'Chỉ với 4 bước đơn giản, bạn đã có thể sở hữu sản phẩm chất lượng';
  
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {title || defaultTitle}
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-accent via-brand-accent/50 to-brand-accent"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
            {steps.map((step, index) => {
              // Use default icon if icon is null/undefined, or fallback to first available icon
              const iconName = step.icon || 'Search';
              const Icon = iconMap[iconName] || Search; // Fallback to Search if icon not found

              return (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border-2 border-gray-100 hover:border-brand-accent transition-all duration-300 hover:shadow-xl text-center"
                >
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                    {step.step}
                  </div>

                  <div className="mt-6 mb-4">
                    <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-brand-accent" />
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
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

