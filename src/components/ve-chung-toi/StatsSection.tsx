'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, ShoppingBag, Star, LucideIcon } from 'lucide-react';
import { Stat } from '@/lib/data/ve-chung-toi';

interface StatsSectionProps {
  stats: Stat[];
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  Award,
  ShoppingBag,
  Star,
};

export default function StatsSection({ stats }: StatsSectionProps) {
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
    <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-brand-dark to-brand-dark/95 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">Thành tựu của chúng tôi</h2>
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Những con số nói lên sự tin tưởng và ủng hộ của khách hàng
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              if (!Icon) return null;

              return (
                <div
                  key={index}
                  data-animate
                  id={`stat-${index}`}
                  className={`bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-brand-accent/50 transition-all duration-500 hover:scale-105 ${isVisible.has(`stat-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}>
                    <Icon size={24} className="sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-300 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

