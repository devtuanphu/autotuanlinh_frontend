'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, LucideIcon, Film, Car, Music } from 'lucide-react';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string; // Icon name as string
  href: string;
  children?: ServiceSubCategory[];
}

const iconMap: Record<string, LucideIcon> = {
  Film,
  Car,
  Music,
};

export interface ServiceSubCategory {
  id: string;
  name: string;
  children?: Array<{ name: string; href: string }>;
}

interface CategoriesSectionProps {
  categories: ServiceCategory[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Tất cả <span className="text-brand-accent">danh mục</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Chọn danh mục để khám phá các dịch vụ chi tiết và thông tin hữu ích
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              if (!Icon) return null;

              return (
                <div
                  key={category.id}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                >
                  {/* Category Header with Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop&sig=${category.id}`}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-transparent to-transparent"></div>
                    
                    {/* Category Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-start gap-5">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border-2 border-white/30 group-hover:bg-brand-accent group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                          <Icon size={32} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-3xl font-extrabold text-white mb-3 drop-shadow-xl">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Content */}
                  <div className="p-8">
                    {/* Sub Categories - Always visible */}
                    {category.children && category.children.length > 0 && (
                      <div className="space-y-3">
                        {category.children.map((subCategory) => {
                          return (
                            <div
                              key={subCategory.id}
                              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-brand-accent/40 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                              {/* Sub Category Item */}
                              <div className="p-5">
                                <div className="flex items-center justify-between gap-4">
                                  <h4 className="text-lg font-bold text-gray-900">
                                    {subCategory.name}
                                  </h4>
                                  <Link
                                    href={`/dich-vu/${subCategory.id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:from-brand-accent-dark hover:to-brand-accent text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
                                  >
                                    <span>Xem chi tiết</span>
                                    <ArrowRight size={16} />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

