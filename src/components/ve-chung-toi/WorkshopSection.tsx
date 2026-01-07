'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Wrench } from 'lucide-react';

interface WorkshopSectionProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  featuredImage?: string;
  galleryImages?: Array<{
    alt: string;
    image: string;
  }>;
}

export default function WorkshopSection({ 
  badge = 'Xưởng sản xuất',
  title = 'Xưởng sản xuất',
  titleHighlight = 'chuyên nghiệp',
  subtitle = 'Không gian làm việc hiện đại với trang thiết bị tiên tiến',
  featuredImage,
  galleryImages 
}: WorkshopSectionProps) {
  const [isVisible, setIsVisible] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
      observerRef.current?.disconnect();
    };
  }, []);

  // Use galleryImages from props, or fallback to empty array
  const displayGalleryImages = galleryImages && galleryImages.length > 0 ? galleryImages : [];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              <Wrench size={14} className="sm:w-4 sm:h-4" />
              <span>{badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              {title}
              {titleHighlight && (
                <span className="text-brand-accent"> {titleHighlight}</span>
              )}
            </h2>
            {subtitle && (
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                {subtitle}
              </p>
            )}
          </div>

          {featuredImage || displayGalleryImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {featuredImage && (
                <div
                  data-animate
                  id="workshop-main"
                  className={`relative h-96 sm:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible.has('workshop-main') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <Image
                    src={featuredImage}
                    alt="Xưởng sản xuất"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-transparent"></div>
                </div>
              )}

              {displayGalleryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {displayGalleryImages.map((item, index) => (
                    <div
                      key={index}
                      data-animate
                      id={`workshop-${index}`}
                      className={`relative h-48 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group ${isVisible.has(`workshop-${index}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt || `Xưởng ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

