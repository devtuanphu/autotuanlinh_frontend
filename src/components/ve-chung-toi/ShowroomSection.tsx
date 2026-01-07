'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Store } from 'lucide-react';

interface ShowroomCard {
  title: string;
  subtitle: string;
  image: string;
}

interface ShowroomSectionProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  showroomCards: ShowroomCard[];
}

export default function ShowroomSection({ 
  badge = 'Showroom',
  title = 'Không gian',
  titleHighlight = 'showroom',
  subtitle = 'Không gian trưng bày hiện đại, chuyên nghiệp',
  showroomCards 
}: ShowroomSectionProps) {
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
    <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              <Store size={14} className="sm:w-4 sm:h-4" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {showroomCards.map((card, index) => (
              <div
                key={index}
                data-animate
                id={`showroom-${index}`}
                className={`relative h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group ${isVisible.has(`showroom-${index}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{card.title}</h3>
                  {card.subtitle && (
                    <p className="text-sm sm:text-base text-gray-200">{card.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

