'use client';

import React, { useMemo } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/shared/ProductCard';
import { productCategories } from '@/components/layout/constants/headerData';
import { convertProductCategoriesToData, generateProductFromItem } from '@/lib/data/san-pham';
import { useCart } from '@/contexts/CartContext';
import { Car, Wrench, Settings, Film, Music, Sparkles as SparklesIcon } from 'lucide-react';
import 'swiper/css';

const RecommendedProductsNavButtons = () => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

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
          className="absolute -left-12 w-12 h-12 bg-white border-2 border-gray-200 text-brand-accent rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-accent hover:text-white hover:border-brand-accent hover:scale-110 active:scale-95 group shadow-lg pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => swiper.slideNext()}
          disabled={isEnd && !swiper.params.loop}
          className="absolute -right-12 w-12 h-12 bg-white border-2 border-gray-200 text-brand-accent rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-accent hover:text-white hover:border-brand-accent hover:scale-110 active:scale-95 group shadow-lg pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default function RecommendedProductsSection() {
  const { items } = useCart();

  // Get recommended products from first category
  const recommendedProducts = useMemo(() => {
    const iconMap = new Map([
      [Car, 'Car'],
      [Wrench, 'Wrench'],
      [Settings, 'Settings'],
      [Film, 'Film'],
      [Music, 'Music'],
      [SparklesIcon, 'Sparkles'],
    ]);

    const categories = convertProductCategoriesToData(productCategories, iconMap);
    
    // Get products from first available category
    for (const category of categories) {
      if (category.children && category.children.length > 0) {
        const firstSubCategory = category.children[0];
        if (firstSubCategory.children && firstSubCategory.children.length > 0) {
          const cartProductIds = new Set(items.map(item => item.productId));
          
          return firstSubCategory.children
            .slice(0, 12)
            .map((item, index) => generateProductFromItem(item, index, firstSubCategory.id))
            .filter(product => !cartProductIds.has(product.id))
            .slice(0, 8);
        }
      }
    }
    
    return [];
  }, [items]);

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t-2 border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-xl flex items-center justify-center shadow-lg">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sản phẩm đề xuất</h2>
          <p className="text-gray-600 mt-1">Có thể bạn cũng quan tâm</p>
        </div>
      </div>
      
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
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={recommendedProducts.length > 4}
          className="recommended-products-swiper pb-12"
        >
          <RecommendedProductsNavButtons />
          {recommendedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

