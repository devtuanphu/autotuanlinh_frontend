'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Shield, Award, Heart, Handshake, LucideIcon } from 'lucide-react';
import { Commitment } from '@/lib/data/ve-chung-toi';

interface CommitmentsSectionProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  commitments: Commitment[];
}

const iconMap: Record<string, LucideIcon> = {
  CheckCircle,
  Shield,
  Award,
  Heart,
};

export default function CommitmentsSection({ 
  badge = 'Cam kết',
  title = 'Cam kết',
  titleHighlight = 'của chúng tôi',
  subtitle = 'Những cam kết chúng tôi dành cho khách hàng',
  commitments 
}: CommitmentsSectionProps) {
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/40 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              <Handshake size={14} className="sm:w-4 sm:h-4" />
              <span>Cam kết</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
              Cam kết của <span className="text-brand-accent">chúng tôi</span>
            </h2>
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Những cam kết không thay đổi trong mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {commitments.map((commitment, index) => {
              const Icon = iconMap[commitment.icon];
              if (!Icon) return null;

              return (
                <div
                  key={index}
                  data-animate
                  id={`commitment-${index}`}
                  className={`bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-brand-accent/50 transition-all duration-500 hover:scale-105 ${isVisible.has(`commitment-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-accent/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                    <Icon size={24} className="sm:w-8 sm:h-8 text-brand-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{commitment.title}</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{commitment.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

