'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';

interface CTASectionProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  primaryButton?: {
    text?: string;
    url?: string;
  };
  secondaryButton?: {
    text?: string;
    url?: string;
  };
}

export default function CTASection({ 
  badge = 'Liên hệ',
  title = 'Sẵn sàng phục vụ',
  titleHighlight = 'bạn',
  description = 'Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và nhận những ưu đãi tốt nhất',
  primaryButton,
  secondaryButton
}: CTASectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-gray-100">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              <Lightbulb size={14} className="sm:w-4 sm:h-4" />
              <span>{badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              {title}
              {titleHighlight && (
                <span className="text-brand-accent"> {titleHighlight}</span>
              )}
            </h2>
            {description && (
              <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed px-4">
                {description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryButton && primaryButton.url && (
                <Link
                  href={primaryButton.url}
                  className="group inline-flex items-center justify-center gap-3 bg-brand-accent hover:bg-brand-accent-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>{primaryButton.text || 'Liên hệ ngay'}</span>
                  <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              {secondaryButton && secondaryButton.url && (
                <Link
                  href={secondaryButton.url}
                  className="group inline-flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-brand-accent text-gray-900 hover:text-brand-accent px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
                >
                  <span>{secondaryButton.text || 'Xem sản phẩm'}</span>
                  <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

