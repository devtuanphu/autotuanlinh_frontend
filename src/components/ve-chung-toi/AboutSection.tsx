'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface AboutSectionProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  paragraphs?: string;
  badgeIconUrl?: string;
  imageUrl?: string;
  imageOverlay?: {
    title?: string;
    subtitle?: string;
  };
}

export default function AboutSection({
  badge = 'Giới thiệu',
  title = 'Chúng tôi là ai?',
  titleHighlight = '',
  paragraphs = '',
  badgeIconUrl: _badgeIconUrl = '', // eslint-disable-line @typescript-eslint/no-unused-vars
  imageUrl = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
  imageOverlay,
}: AboutSectionProps) {
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

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16">
            <div
              data-animate
              id="about-text"
              className={`transition-all duration-1000 ${isVisible.has('about-text') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
                <Sparkles size={14} className="sm:w-4 sm:h-4" />
                <span>{badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
                {title}
                {titleHighlight && (
                  <span className="text-brand-accent"> {titleHighlight}</span>
                )}
              </h2>
              {paragraphs && (
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                  {paragraphs.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                    <p key={idx}>{paragraph.trim()}</p>
                  ))}
                </div>
              )}
            </div>

            <div
              data-animate
              id="about-image"
              className={`relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible.has('about-image') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <Image
                src={imageUrl}
                alt="Auto Tuan Linh"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
              {(imageOverlay?.title || imageOverlay?.subtitle) && (
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                    {imageOverlay.title && (
                      <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">{imageOverlay.title}</h3>
                    )}
                    {imageOverlay.subtitle && (
                      <p className="text-sm sm:text-base text-gray-100">{imageOverlay.subtitle}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          
         
        </div>
      </div>
    </section>
  );
}

