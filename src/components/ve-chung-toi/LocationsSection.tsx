'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MapPin, Store, Phone, Calendar } from 'lucide-react';
import { Location } from '@/lib/data/ve-chung-toi';

interface LocationsSectionProps {
  locations: Location[];
}

export default function LocationsSection({ locations }: LocationsSectionProps) {
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

  const locationImages = [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop',
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              <MapPin size={14} className="sm:w-4 sm:h-4" />
              <span>Địa điểm</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Hệ thống <span className="text-brand-accent">cửa hàng</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Đến với chúng tôi tại các cửa hàng trên toàn quốc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {locations.map((location, index) => (
              <div
                key={index}
                data-animate
                id={`location-${index}`}
                className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:border-brand-accent/50 transition-all duration-300 hover:shadow-2xl ${isVisible.has(`location-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={locationImages[index] || locationImages[0]}
                    alt={location.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-accent/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                    <Store size={24} className="sm:w-7 sm:h-7 text-brand-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{location.name}</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-brand-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-600">{location.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-brand-accent flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-600">{location.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-brand-accent flex-shrink-0" />
                      <p className="text-sm sm:text-base text-gray-600">{location.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

