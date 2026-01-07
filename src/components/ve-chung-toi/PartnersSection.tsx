'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Handshake } from 'lucide-react';
import { Partner } from '@/lib/data/ve-chung-toi';

interface PartnersSectionProps {
  title?: string;
  subtitle?: string;
  partners: Partner[];
}

export default function PartnersSection({ 
  title = 'Thương hiệu đối tác',
  subtitle = 'Những đối tác tin cậy đồng hành cùng chúng tôi',
  partners 
}: PartnersSectionProps) {
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
              <Handshake size={14} className="sm:w-4 sm:h-4" />
              <span>Đối tác</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {partners.map((partner, index) => {
              const PartnerWrapper = partner.url && partner.url !== '#' ? 'a' : 'div';
              const wrapperProps = partner.url && partner.url !== '#' 
                ? { href: partner.url, target: '_blank', rel: 'noopener noreferrer' }
                : {};
              
              return (
                <PartnerWrapper
                  key={index}
                  {...wrapperProps}
                  data-animate
                  id={`partner-${index}`}
                  className={`bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-brand-accent/50 transition-all duration-300 hover:shadow-lg flex items-center justify-center h-24 sm:h-32 ${isVisible.has(`partner-${index}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${partner.url && partner.url !== '#' ? 'cursor-pointer' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </PartnerWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

