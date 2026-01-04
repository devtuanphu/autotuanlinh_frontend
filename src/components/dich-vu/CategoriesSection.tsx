'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronDown, ArrowRight, LucideIcon, Film, Car, Music } from 'lucide-react';

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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubCategory = (subCategoryId: string) => {
    const newExpanded = new Set(expandedSubCategories);
    if (newExpanded.has(subCategoryId)) {
      newExpanded.delete(subCategoryId);
    } else {
      newExpanded.add(subCategoryId);
    }
    setExpandedSubCategories(newExpanded);
  };

  const getTotalArticles = (category: ServiceCategory) => {
    let total = 0;
    category.children?.forEach(sub => {
      total += sub.children?.length || 0;
    });
    return total;
  };

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
              
              const isExpanded = expandedCategories.has(category.id);
              const totalArticles = getTotalArticles(category);

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
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center px-4 py-1.5 bg-brand-accent/95 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-lg">
                              {totalArticles} dịch vụ
                            </span>
                            <span className="text-white/90 text-sm font-medium">
                              {category.children?.length || 0} chủ đề
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Content */}
                  <div className="p-8">
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="flex-1 flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-brand-accent/10 border-2 border-gray-200 hover:border-brand-accent/50 rounded-xl transition-all duration-200 group"
                      >
                        <span className="font-bold text-gray-900 group-hover:text-brand-accent transition-colors">
                          {isExpanded ? 'Ẩn' : 'Xem'} chi tiết
                        </span>
                        <ChevronDown 
                          size={20} 
                          className={`text-gray-600 group-hover:text-brand-accent transition-all duration-300 ${isExpanded ? 'rotate-180 text-brand-accent' : ''}`} 
                        />
                      </button>
                      <Link
                        href={category.href}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:from-brand-accent-dark hover:to-brand-accent text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <span>Xem tất cả</span>
                        <ArrowRight size={18} />
                      </Link>
                    </div>

                    {/* Sub Categories - Accordion */}
                    {isExpanded && category.children && category.children.length > 0 && (
                      <div className="space-y-3 pt-6 border-t-2 border-gray-100">
                        {category.children.map((subCategory) => {
                          const isSubExpanded = expandedSubCategories.has(subCategory.id);
                          const articleCount = subCategory.children?.length || 0;

                          return (
                            <div
                              key={subCategory.id}
                              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-brand-accent/40 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                              {/* Sub Category Header */}
                              <button
                                onClick={() => toggleSubCategory(subCategory.id)}
                                className="w-full p-5 hover:bg-white/50 transition-all duration-200 text-left group"
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-brand-accent transition-colors">
                                        {subCategory.name}
                                      </h4>
                                      {articleCount > 0 && (
                                        <span className="text-xs text-gray-700 bg-white group-hover:bg-brand-accent group-hover:text-white px-3 py-1.5 rounded-full font-bold border-2 border-gray-200 group-hover:border-brand-accent transition-all shadow-sm">
                                          {articleCount}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white group-hover:bg-brand-accent/10 transition-all">
                                    <ChevronDown 
                                      size={20} 
                                      className={`text-gray-500 group-hover:text-brand-accent transition-all duration-300 ${isSubExpanded ? 'rotate-180 text-brand-accent' : ''}`} 
                                    />
                                  </div>
                                </div>
                              </button>

                              {/* Articles List */}
                              {isSubExpanded && subCategory.children && subCategory.children.length > 0 && (
                                <div className="border-t-2 border-gray-200 bg-white p-5">
                                  <ul className="space-y-2">
                                    {subCategory.children.map((item, idx) => (
                                      <li key={idx}>
                                        <Link
                                          href={item.href}
                                          className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-brand-accent/50 transition-all duration-200 group shadow-sm hover:shadow-lg"
                                        >
                                          <div className="w-2.5 h-2.5 rounded-full bg-brand-accent/50 flex-shrink-0"></div>
                                          <span className="text-gray-900 font-semibold text-sm flex-1">
                                            {item.name}
                                          </span>
                                          <ChevronRight 
                                            size={16} 
                                            className="text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0" 
                                          />
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  {/* View All Link */}
                                  <Link
                                    href={`/dich-vu/${subCategory.id}`}
                                    className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:from-brand-accent-dark hover:to-brand-accent text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
                                  >
                                    <span>Xem tất cả dịch vụ</span>
                                    <ArrowRight size={16} />
                                  </Link>
                                </div>
                              )}
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

