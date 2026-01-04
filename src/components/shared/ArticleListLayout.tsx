'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, FileText } from 'lucide-react';

interface ArticleListLayoutProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ name: string; href: string }>;
  children: React.ReactNode;
  showBreadcrumb?: boolean;
  bannerImage?: string;
}

const ArticleListLayout: React.FC<ArticleListLayoutProps> = ({
  title,
  description,
  breadcrumbs = [],
  children,
  showBreadcrumb = true,
  bannerImage,
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner */}
      <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
        {/* Banner Image */}
        <div className="absolute inset-0">
          <Image
            src={bannerImage || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop'}
            alt={title}
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/40 text-brand-accent px-6 py-3 rounded-full mb-8 shadow-lg">
              <FileText size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Danh mục bài viết</span>
            </div>

            {/* Breadcrumb */}
            {showBreadcrumb && (
              <nav className="flex items-center gap-2 mb-8 text-sm">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                  <Home size={16} />
                  <span>Trang chủ</span>
                </Link>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    <ChevronRight size={16} className="text-gray-400" />
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-white font-medium">{crumb.name}</span>
                    ) : (
                      <Link href={crumb.href} className="text-gray-300 hover:text-white transition-colors">
                        {crumb.name}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}
            
            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] text-white drop-shadow-2xl">
              {title}
            </h1>
            
            {/* Description */}
            {description && (
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8 max-w-3xl drop-shadow-lg">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4 lg:px-6">
          {children}
        </div>
      </section>
    </div>
  );
};

export default ArticleListLayout;
