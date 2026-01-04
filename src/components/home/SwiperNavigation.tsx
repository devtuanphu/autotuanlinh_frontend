'use client';

import React from 'react';
import { useSwiper } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SwiperNavigationProps {
  className?: string;
  variant?: 'hero' | 'products' | 'testimonials';
}

export const SwiperNavButtons: React.FC<SwiperNavigationProps> = ({ 
  className = '', 
  variant = 'products' 
}) => {
  const swiper = useSwiper();

  const baseStyles = {
    hero: 'w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-brand-accent hover:border-brand-accent/50',
    products: 'w-12 h-12 bg-white border border-gray-200 text-brand-accent hover:bg-brand-accent hover:text-white hover:border-brand-accent shadow-lg',
    testimonials: 'w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-brand-accent hover:border-brand-accent/50',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={() => swiper.slidePrev()}
        className={`${baseStyles[variant]} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group disabled:opacity-30 disabled:cursor-not-allowed`}
        disabled={swiper.isBeginning && !swiper.params.loop}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className={`${baseStyles[variant]} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group disabled:opacity-30 disabled:cursor-not-allowed`}
        disabled={swiper.isEnd && !swiper.params.loop}
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
      </button>
    </div>
  );
};
