'use client';

import React from 'react';
import Image from 'next/image';
import { FileText, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  categoryCount: number;
  totalArticles: number;
}

export default function HeroSection({ categoryCount, totalArticles }: HeroSectionProps) {
  return (
    <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
      {/* Banner Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
          alt="Danh mục bài viết sản phẩm"
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
          <div className="inline-flex items-center gap-2.5 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/40 text-brand-accent px-6 py-3 rounded-full mb-8 shadow-lg">
            <FileText size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Danh mục bài viết</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] text-white drop-shadow-2xl">
            Danh mục bài viết
            <span className="block mt-4 text-brand-accent drop-shadow-lg">
              Sản phẩm
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8 max-w-3xl drop-shadow-lg">
            Khám phá các bài viết, hướng dẫn sử dụng, đánh giá và thông tin chi tiết về phụ kiện ô tô chính hãng
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3">
              <BookOpen size={24} className="text-brand-accent" />
              <div>
                <div className="text-2xl font-extrabold text-white">{categoryCount}</div>
                <div className="text-xs text-gray-300 uppercase tracking-wide">Danh mục</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3">
              <FileText size={24} className="text-brand-accent" />
              <div>
                <div className="text-2xl font-extrabold text-white">{totalArticles}</div>
                <div className="text-xs text-gray-300 uppercase tracking-wide">Bài viết</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

