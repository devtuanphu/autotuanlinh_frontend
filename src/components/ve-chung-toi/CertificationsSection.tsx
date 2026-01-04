'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BadgeCheck, Shield, Award, Star, LucideIcon } from 'lucide-react';
import { Certification } from '@/lib/data/ve-chung-toi';

interface CertificationsSectionProps {
  certifications: Certification[];
}

const iconMap: Record<string, LucideIcon> = {
  BadgeCheck,
  Shield,
  Award,
  Star,
};

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
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
              <Award size={14} className="sm:w-4 sm:h-4" />
              <span>Chứng nhận</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Chứng nhận & <span className="text-brand-accent">Giải thưởng</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Những chứng nhận và giải thưởng khẳng định chất lượng dịch vụ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {certifications.map((cert, index) => {
              const Icon = iconMap[cert.icon];
              if (!Icon) return null;

              return (
                <div
                  key={index}
                  data-animate
                  id={`cert-${index}`}
                  className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:border-brand-accent/50 transition-all duration-500 hover:-translate-y-2 text-center ${isVisible.has(`cert-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Icon size={32} className="sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{cert.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{cert.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

