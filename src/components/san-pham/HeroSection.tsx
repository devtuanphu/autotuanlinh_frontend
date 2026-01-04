'use client';

import React from 'react';
import Image from 'next/image';
import { Package } from 'lucide-react';

interface HeroSectionProps {
  totalProducts: number;
}

export default function HeroSection({ totalProducts }: HeroSectionProps) {
  return (
    <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Banner Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
          alt="Tất cả sản phẩm"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/90 to-brand-dark/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-10 flex items-center">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/40 text-brand-accent rounded-full mb-6 sm:mb-8 shadow-lg">
            <Package size={20} className="sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">Sản phẩm</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight text-white drop-shadow-2xl">
            Tất cả sản phẩm
            <span className="block mt-2 sm:mt-4 text-brand-accent drop-shadow-lg">
              Phụ kiện ô tô chính hãng
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-gray-100 leading-relaxed mb-6 sm:mb-8 max-w-3xl drop-shadow-lg">
            Khám phá hơn <span className="font-bold text-brand-accent">{totalProducts}</span> sản phẩm phụ kiện ô tô chất lượng cao từ Auto Tuan Linh
          </p>
        </div>
      </div>
    </section>
  );
}

