'use client';

import React, { useMemo, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/shared/ProductCard';
import { ProductCategoryData, findProductCategoryDetail, generateProductFromItem } from '@/lib/data/san-pham';
import 'swiper/css';

interface RelatedProductsProps {
  currentProductId: string;
  categoryId: string;
  categories: ProductCategoryData[];
}

const RelatedProductsNavButtons = () => {
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

export default function RelatedProducts({ currentProductId, categoryId, categories }: RelatedProductsProps) {
  const relatedProducts = useMemo(() => {
    const categoryDetail = findProductCategoryDetail(categories, categoryId);
    if (!categoryDetail || !categoryDetail.products) return [];

    // Generate products and filter out current product
    const products = categoryDetail.products
      .map((item, index) => generateProductFromItem(item, index, categoryId))
      .filter((product) => product.id !== currentProductId)
      .slice(0, 8); // Show more products for carousel

    return products;
  }, [currentProductId, categoryId, categories]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-12 mt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
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
          loop={relatedProducts.length > 4}
          className="related-products-swiper pb-12"
        >
          <RelatedProductsNavButtons />
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}


