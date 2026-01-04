'use client';

import React from 'react';
import TestimonialsSwiper from '@/components/home/TestimonialsSwiper';

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-dark to-brand-dark/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Khách hàng nói gì về chúng tôi</h2>
          <p className="text-gray-300">Những đánh giá từ khách hàng đã sử dụng dịch vụ</p>
        </div>
        <TestimonialsSwiper testimonials={testimonials} />
      </div>
    </section>
  );
}

