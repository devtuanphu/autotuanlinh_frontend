'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface ProductDetailLayoutProps {
  breadcrumbs: Array<{ name: string; href: string }>;
  children: React.ReactNode;
}

export default function ProductDetailLayout({ breadcrumbs, children }: ProductDetailLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Section */}
      <section className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-brand-accent transition-colors flex items-center gap-1">
              <Home size={16} />
              <span>Trang chủ</span>
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <ChevronRight size={16} className="text-gray-400" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-brand-accent font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="text-gray-600 hover:text-brand-accent transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          {children}
        </div>
      </section>
    </div>
  );
}



