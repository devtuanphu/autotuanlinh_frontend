'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star } from 'lucide-react';
import { Testimonial } from '@/lib/data/ve-chung-toi';

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ 
  title = 'Phản hồi từ',
  subtitle = 'Những đánh giá chân thực từ khách hàng đã sử dụng dịch vụ',
  testimonials 
}: TestimonialsSectionProps) {
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
              <Quote size={14} className="sm:w-4 sm:h-4" />
              <span>Khách hàng nói gì</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-animate
                id={`testimonial-${index}`}
                className={`bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-brand-accent/50 transition-all duration-300 ${isVisible.has(`testimonial-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-1 mb-4 sm:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <Quote size={32} className="text-brand-accent/50 mb-4 sm:mb-6" />
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4 sm:mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="pt-4 sm:pt-6 border-t border-white/20">
                  <p className="font-bold text-white mb-1">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

