'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

export default function CTASection({
  title = 'Sẵn sàng nâng cấp xe của bạn?',
  description = 'Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí',
  primaryButton = {
    text: 'Liên hệ ngay',
    href: '/lien-he',
  },
  secondaryButton = {
    text: 'Xem sản phẩm',
    href: '/san-pham',
  },
}: CTASectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-brand-accent to-brand-accent-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 lg:mb-6">
            {title}
          </h2>
          <p className="text-lg lg:text-xl text-white/90 mb-8 lg:mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={primaryButton.href}
              className="flex items-center gap-2 px-8 py-4 bg-white text-brand-accent rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Phone size={20} />
              {primaryButton.text}
            </Link>
            <Link
              href={secondaryButton.href}
              className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
            >
              {secondaryButton.text}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

