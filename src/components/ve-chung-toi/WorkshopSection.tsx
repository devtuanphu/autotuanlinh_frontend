'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Wrench } from 'lucide-react';

export default function WorkshopSection() {
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

  const workshopImages = [
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=600&fit=crop',
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              <Wrench size={14} className="sm:w-4 sm:h-4" />
              <span>Xưởng sản xuất</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Xưởng <span className="text-brand-accent">chuyên nghiệp</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Xưởng được trang bị đầy đủ thiết bị hiện đại, đảm bảo chất lượng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div
              data-animate
              id="workshop-main"
              className={`relative h-96 sm:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible.has('workshop-main') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
                alt="Xưởng sản xuất"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Xưởng sản xuất hiện đại</h3>
                <p className="text-base sm:text-lg text-gray-200">Trang bị đầy đủ thiết bị chuyên nghiệp</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {workshopImages.map((imageUrl, index) => (
                <div
                  key={index}
                  data-animate
                  id={`workshop-${index}`}
                  className={`relative h-48 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group ${isVisible.has(`workshop-${index}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={imageUrl}
                    alt={`Xưởng ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

