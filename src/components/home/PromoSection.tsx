'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Percent } from 'lucide-react';

export interface Promo {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  href: string;
  badge?: string;
  endDate?: string;
}

interface PromoSectionProps {
  promos: Promo[];
}

export default function PromoSection({ promos }: PromoSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-accent via-brand-accent-dark to-brand-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles size={20} className="text-white" />
            <span className="text-white font-bold text-sm uppercase tracking-wider">Khuyến mãi đặc biệt</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Ưu đãi <span className="text-yellow-300">hấp dẫn</span>
          </h2>
          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
            Nhiều chương trình khuyến mãi đang chờ đón bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {promos.map((promo) => (
            <Link
              key={promo.id}
              href={promo.href}
              className="group relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-white/20 hover:border-white/50 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent"></div>
                {promo.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-brand-dark text-sm font-bold rounded-full">
                    {promo.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                  <Percent size={32} className="text-white" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-4xl lg:text-5xl font-extrabold text-white mb-1">
                    {promo.discount}
                  </div>
                  {promo.endDate && (
                    <div className="text-white/80 text-sm">Kết thúc: {promo.endDate}</div>
                  )}
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-accent transition-colors">
                  {promo.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {promo.description}
                </p>
                <div className="flex items-center gap-2 text-brand-accent font-bold group-hover:gap-3 transition-all">
                  Xem ngay
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

