'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock, User, Hash } from 'lucide-react';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt?: string;
  image: string;
  href: string;
  publishedAt?: string;
  readTime?: number;
  category?: string;
  author?: string;
  hashtags?: string[];
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  image,
  href,
  publishedAt,
  readTime,
  category,
  author,
  hashtags = [],
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Link href={href} className="group block h-full">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-brand-accent/50 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
          )}
          
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            priority={false}
          />
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category Badge */}
          {category && (
            <div className="absolute top-5 left-5 z-10">
              <span className="bg-brand-accent/95 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl uppercase tracking-wide">
                {category}
              </span>
            </div>
          )}

          {/* Hover Read More Button */}
          <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white text-brand-accent px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-2xl hover:bg-brand-accent hover:text-white transition-colors">
              <span>Đọc ngay</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-accent transition-colors leading-tight">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm lg:text-base text-gray-600 line-clamp-3 mb-4 leading-relaxed flex-1">
              {excerpt}
            </p>
          )}

          {/* Hashtags */}
          {hashtags && hashtags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Hash size={14} className="text-brand-accent" />
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-xs font-semibold hover:bg-brand-accent hover:text-white transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta Information */}
          <div className="pt-5 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-4 text-xs lg:text-sm text-gray-500 mb-3">
              {publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-brand-accent" />
                  <span className="font-medium">{formatDate(publishedAt)}</span>
                </div>
              )}
              {readTime && (
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-brand-accent" />
                  <span className="font-medium">{readTime} phút đọc</span>
                </div>
              )}
            </div>
            {author && (
              <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600">
                <User size={16} className="text-brand-accent" />
                <span className="font-semibold">{author}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
