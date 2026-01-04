'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BeforeAfter } from '@/lib/data/ve-chung-toi';

interface BeforeAfterSectionProps {
  beforeAfter: BeforeAfter[];
}

export default function BeforeAfterSection({ beforeAfter }: BeforeAfterSectionProps) {
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
    <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              <Sparkles size={14} className="sm:w-4 sm:h-4" />
              <span>Kết quả</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Trước & <span className="text-brand-accent">Sau</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Những dự án đã hoàn thành của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {beforeAfter.map((item, index) => (
              <div
                key={index}
                data-animate
                id={`beforeafter-${index}`}
                className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:border-brand-accent/50 transition-all duration-300 hover:shadow-2xl group ${isVisible.has(`beforeafter-${index}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">Trước</span>
                    <ArrowRight size={16} className="text-gray-400" />
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">Sau</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

