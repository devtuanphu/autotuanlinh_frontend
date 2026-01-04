'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';



const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80',
      title: 'Phụ kiện ô tô chính hãng',
      subtitle: 'Dịch vụ chuyên nghiệp',
      description: 'Nâng cấp xe của bạn với phụ kiện cao cấp và dịch vụ chăm sóc xe hàng đầu',
      cta: 'Xem sản phẩm',
      href: '/san-pham',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1920&q=80',
      title: 'Dán phim cách nhiệt cao cấp',
      subtitle: 'Bảo vệ xe của bạn',
      description: 'Phim cách nhiệt 3M, Llumar, V-Kool chính hãng với bảo hành lâu dài',
      cta: 'Xem dịch vụ',
      href: '/dich-vu',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=1920&q=80',
      title: 'Nâng cấp nội thất xe hơi',
      subtitle: 'Chất lượng hàng đầu',
      description: 'Bọc ghế da, nâng cấp âm thanh với đội ngũ kỹ thuật viên chuyên nghiệp',
      cta: 'Khám phá ngay',
      href: '/san-pham',
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      effect="fade"
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      loop={true}
      className="hero-swiper h-[650px] md:h-[750px] lg:h-[800px] relative -mt-0"
    >
     
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className="relative">
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={slide.id === 1}
            />
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/90 to-brand-dark/70"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-transparent"></div>
            <div className="absolute inset-0 bg-brand-accent/5"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-brand-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 h-full relative z-10 flex items-start pt-8">
            <div className="max-w-3xl animate-fade-in mt-8">
              <div className="inline-flex items-center gap-2 bg-brand-accent/20 backdrop-blur-sm border border-brand-accent/30 text-brand-accent px-4 py-2 rounded-full mb-6">
                <Sparkles size={16} />
                <span className="text-sm font-semibold">Chất lượng hàng đầu</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.1] text-white drop-shadow-2xl">
                {slide.title}
                <span className="block text-brand-accent mt-2 bg-gradient-to-r from-brand-accent to-brand-accent-light bg-clip-text text-transparent">
                  {slide.subtitle}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed drop-shadow-lg max-w-2xl">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={slide.href}
                  className="group inline-flex items-center justify-center gap-3 bg-brand-accent hover:bg-brand-accent-dark text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-brand-accent/50 hover:scale-105 hover:-translate-y-1"
                >
                  {slide.cta}
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                >
                  Liên hệ ngay
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    
    </Swiper>
  );
};

export default HeroSlider;
