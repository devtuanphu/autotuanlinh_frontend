'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
}

export default function GallerySection({ title, subtitle, images }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const defaultTitle = 'Hình ảnh thực tế';
  const defaultSubtitle = 'Khám phá không gian cửa hàng và các dự án đã hoàn thành của chúng tôi';

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              {title || defaultTitle}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle || defaultSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl lg:rounded-2xl cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-sm lg:text-base">{image.title}</h3>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-brand-accent transition-colors z-10"
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-brand-accent transition-colors z-10"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-brand-accent transition-colors z-10"
          >
            <ChevronRight size={40} />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
            />
            {images[selectedImage].title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{images[selectedImage].title}</h3>
                {images[selectedImage].description && (
                  <p className="text-gray-300">{images[selectedImage].description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

