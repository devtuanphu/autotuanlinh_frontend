'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, LucideIcon, Car, Wrench, Settings } from 'lucide-react';

export interface Category {
  icon: string;
  name: string;
  description: string;
  image: string;
  href: string;
  productCount: number;
}

interface CategoriesSectionProps {
  categories: Category[];
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Car,
  Wrench,
  Settings,
};

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Danh mục <span className="text-brand-accent">sản phẩm</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá đầy đủ các danh mục phụ kiện ô tô chính hãng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon];
            if (!Icon) return null;

            return (
              <Link
                key={index}
                href={category.href}
                className="group relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-brand-accent transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/70 to-transparent"></div>
                  <div className="absolute top-6 left-6 w-16 h-16 bg-brand-accent/90 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon size={32} className="text-white" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-brand-accent/90 backdrop-blur-sm text-white text-sm font-bold rounded-full">
                        {category.productCount}+ sản phẩm
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-brand-accent font-bold group-hover:gap-3 transition-all">
                    Khám phá ngay
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

