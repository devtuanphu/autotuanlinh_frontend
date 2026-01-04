'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { NewsArticle } from '@/lib/data/articles';

interface LatestNewsSectionProps {
  articles: NewsArticle[];
}

export default function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Tin tức <span className="text-brand-accent">mới nhất</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600">
              Cập nhật những thông tin hữu ích về phụ kiện ô tô
            </p>
          </div>
          <Link
            href="/tin-tuc"
            className="hidden lg:flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-xl font-bold hover:bg-brand-accent-dark transition-all"
          >
            Xem tất cả
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {latestArticles.map((article) => {
            const publishedDate = new Date(article.publishedAt);
            const formattedDate = publishedDate.toLocaleDateString('vi-VN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });

            return (
              <Link
                key={article.id}
                href={article.href}
                className="group bg-white rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-brand-accent transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {article.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-brand-accent text-white text-sm font-bold rounded-full">
                      Nổi bật
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {formattedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {article.readTime} phút
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-brand-accent font-bold group-hover:gap-3 transition-all">
                    Đọc thêm
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-xl font-bold hover:bg-brand-accent-dark transition-all"
          >
            Xem tất cả tin tức
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

