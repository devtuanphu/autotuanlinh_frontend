'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(images.length).fill(false));

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Image Swiper */}
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
        <Swiper
          modules={[Thumbs, Navigation]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          navigation={images.length > 1}
          spaceBetween={10}
          className="product-main-swiper h-full rounded-xl"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative">
              {!imageLoaded[index] && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse z-10"></div>
              )}
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
                onLoad={() => handleImageLoad(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Swiper */}
      {images.length > 1 && (
        <Swiper
          modules={[Thumbs, FreeMode]}
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          breakpoints={{
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
          }}
          className="product-thumbs-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-brand-accent/50 transition-all product-thumb-slide">
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12.5vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}


