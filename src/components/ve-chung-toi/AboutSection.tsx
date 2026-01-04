'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function AboutSection() {
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

  const galleryImages = [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08e3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16">
            <div
              data-animate
              id="about-text"
              className={`transition-all duration-1000 ${isVisible.has('about-text') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
                <Sparkles size={14} className="sm:w-4 sm:h-4" />
                <span>Giới thiệu</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
                Chúng tôi là <span className="text-brand-accent">ai?</span>
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                <p>
                  Auto Tuan Linh được thành lập với sứ mệnh mang đến những sản phẩm phụ kiện ô tô chất lượng cao, 
                  dịch vụ chuyên nghiệp và giá cả hợp lý cho mọi khách hàng.
                </p>
                <p>
                  Với hơn 15 năm kinh nghiệm trong ngành, chúng tôi đã xây dựng được mạng lưới đối tác uy tín, 
                  đội ngũ nhân viên chuyên nghiệp và hệ thống cửa hàng rộng khắp.
                </p>
                <p>
                  Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất, sản phẩm chính hãng 100% và 
                  dịch vụ hỗ trợ khách hàng tận tâm 24/7.
                </p>
              </div>
            </div>

            <div
              data-animate
              id="about-image"
              className={`relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible.has('about-image') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <Image
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop"
                alt="Auto Tuan Linh"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">Chất lượng hàng đầu</h3>
                  <p className="text-sm sm:text-base text-gray-100">Cam kết 100% sản phẩm chính hãng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {galleryImages.map((imageUrl, index) => (
              <div
                key={index}
                data-animate
                id={`gallery-${index}`}
                className={`relative h-48 sm:h-64 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group ${isVisible.has(`gallery-${index}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Image
                  src={imageUrl}
                  alt={`Hình ảnh ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

