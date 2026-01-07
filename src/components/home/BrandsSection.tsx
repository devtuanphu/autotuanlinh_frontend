'use client';

import React from 'react';
import Image from 'next/image';

export interface Brand {
  name: string;
  logo: string;
  href?: string;
}

interface BrandsSectionProps {
  title?: string;
  subtitle?: string;
  brands: Brand[];
}

export default function BrandsSection({ title, subtitle, brands }: BrandsSectionProps) {
  const defaultTitle = 'Thương hiệu đối tác';
  const defaultSubtitle = 'Chúng tôi hợp tác với các thương hiệu hàng đầu thế giới';
  
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
            {title || defaultTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {brands.map((brand, index) => {
            const content = (
              <div className="group bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 border-2 border-gray-100 hover:border-brand-accent transition-all duration-300 hover:shadow-lg flex items-center justify-center h-24 lg:h-32">
                <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            );

            if (brand.href) {
              return (
                <a
                  key={index}
                  href={brand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return <div key={index}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

