'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../shared/ProductCard';
import 'swiper/css';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  href: string;
  inStock?: boolean;
  description?: string;
  brand?: string;
}

interface ProductsSwiperProps {
  products: Product[];
}

const ProductsNavButtons = () => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  React.useEffect(() => {
    const updateButtons = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };
    
    swiper.on('slideChange', updateButtons);
    updateButtons();
    
    return () => {
      swiper.off('slideChange', updateButtons);
    };
  }, [swiper]);

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 pointer-events-none">
      <div className="container mx-auto px-4 relative">
        <button
          onClick={() => swiper.slidePrev()}
          disabled={isBeginning && !swiper.params.loop}
          className="absolute -left-12 w-12 h-12 bg-white border border-gray-200 text-brand-accent rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-accent hover:text-white hover:border-brand-accent hover:scale-110 active:scale-95 group shadow-lg pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => swiper.slideNext()}
          disabled={isEnd && !swiper.params.loop}
          className="absolute -right-12 w-12 h-12 bg-white border border-gray-200 text-brand-accent rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-accent hover:text-white hover:border-brand-accent hover:scale-110 active:scale-95 group shadow-lg pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

const ProductsSwiper: React.FC<ProductsSwiperProps> = ({ products }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="featured-products-swiper pb-12"
      >
        <ProductsNavButtons />
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSwiper;
