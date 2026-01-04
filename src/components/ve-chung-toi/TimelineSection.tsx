'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';
import { TimelineItem } from '@/lib/data/ve-chung-toi';

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

export default function TimelineSection({ timeline }: TimelineSectionProps) {
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
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              <Calendar size={14} className="sm:w-4 sm:h-4" />
              <span>Hành trình</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Lịch sử <span className="text-brand-accent">phát triển</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Những cột mốc quan trọng trong hành trình của chúng tôi
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-accent to-brand-accent-dark transform -translate-x-1/2"></div>

            <div className="space-y-8 sm:space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  data-animate
                  id={`timeline-${index}`}
                  className={`relative flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} ${isVisible.has(`timeline-${index}`) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex-1 md:w-1/2 w-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:border-brand-accent/50 transition-all duration-300">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
                        <Calendar size={14} className="sm:w-4 sm:h-4" />
                        <span>{item.year}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:block absolute left-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-brand-accent rounded-full shadow-xl border-4 border-white transform -translate-x-1/2 z-10"></div>
                  <div className="md:hidden w-4 h-4 bg-brand-accent rounded-full shadow-xl border-4 border-white z-10"></div>

                  <div className="flex-1 md:w-1/2 w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

