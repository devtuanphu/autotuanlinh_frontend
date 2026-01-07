'use client';

import React from 'react';
import Image from 'next/image';
import { Building2 } from 'lucide-react';

interface HeroSectionProps {
  title?: string;
  specialTitle?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
}

export default function HeroSection({ 
  title = 'Auto Tuan Linh',
  specialTitle = 'Đồng hành cùng bạn',
  subtitle = '',
  description = 'Hơn 15 năm kinh nghiệm trong lĩnh vực phụ kiện ô tô, chúng tôi tự hào là địa chỉ tin cậy của hàng nghìn khách hàng trên toàn quốc.',
  imageUrl = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop',
}: HeroSectionProps) {
  return (
    <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt="Về chúng tôi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/90 to-brand-dark/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
      </div>

      <div className="absolute top-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-brand-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-brand-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 h-full relative z-10 flex items-center">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/40 text-brand-accent rounded-full mb-6 sm:mb-8 shadow-lg">
            <Building2 size={16} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">Về chúng tôi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight text-white drop-shadow-2xl">
            {title}
            {specialTitle && (
              <span className="block mt-2 sm:mt-4 text-brand-accent drop-shadow-lg">
                {specialTitle}
              </span>
            )}
          </h1>

          {(subtitle || description) && (
            <p className="text-base sm:text-xl md:text-2xl text-gray-100 leading-relaxed mb-6 sm:mb-8 max-w-3xl drop-shadow-lg">
              {subtitle || description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

