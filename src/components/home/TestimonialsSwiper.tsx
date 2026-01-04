'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import 'swiper/css';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialsSwiperProps {
  testimonials: Testimonial[];
}

const TestimonialsNavButtons = () => {
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
          className="absolute -left-12 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-accent hover:border-brand-accent/50 hover:scale-110 active:scale-95 group shadow-2xl pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => swiper.slideNext()}
          disabled={isEnd && !swiper.params.loop}
          className="absolute -right-12 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-accent hover:border-brand-accent/50 hover:scale-110 active:scale-95 group shadow-2xl pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

const TestimonialsSwiper: React.FC<TestimonialsSwiperProps> = ({ testimonials }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="testimonials-swiper pb-12"
      >
        <TestimonialsNavButtons />
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all shadow-xl hover:shadow-2xl h-full">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-brand-accent fill-brand-accent" />
                ))}
              </div>
              <Quote className="text-brand-accent mb-4 opacity-80" size={32} />
              <p className="text-white mb-6 leading-relaxed text-base">{testimonial.content}</p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-300">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsSwiper;
