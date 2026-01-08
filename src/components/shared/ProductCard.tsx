'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Eye, 
  ArrowRight
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  href: string;
  inStock?: boolean;
  brand?: string;
  freeShipping?: boolean;
  warranty?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  badge,
  href,
  inStock = true,
  brand,
}) => {
  const { addItem } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent navigation when clicking add to cart button
    e.preventDefault();
    e.stopPropagation();
    
    // Also stop immediate propagation to prevent Link navigation
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
    
    if (!inStock) return;
    
    setIsAddingToCart(true);
    addItem({
      id,
      productId: id,
      name,
      price,
      originalPrice,
      image,
      quantity: 1,
      href,
      inStock,
    });
    
    // Reset after a short delay to show feedback
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };
  
  const handleAddToCartMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent Link navigation on mousedown (fires before onClick)
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND', 
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className="group block">
      <Link href={href} className="block">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-accent/40 h-full flex flex-col relative">
        {/* Image Container */}
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
          )}
          
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-105`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onLoad={() => setImageLoaded(true)}
            priority={false}
          />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {badge && (
              <span className="bg-brand-accent text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md">
                {badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 z-10 ${
              isLiked 
                ? 'text-red-500' 
                : 'text-gray-600 hover:text-red-500'
            }`}
            aria-label="Thêm vào yêu thích"
          >
            <Heart size={18} className={isLiked ? 'fill-red-500' : ''} strokeWidth={2} />
          </button>

          {/* Stock Status */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
              <span className="bg-white px-4 py-2 rounded-md text-sm font-semibold text-gray-900">
                Hết hàng
              </span>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Eye size={16} />
              <span>Xem nhanh</span>
            </button>
            <button
              onClick={handleAddToCart}
              onMouseDown={handleAddToCartMouseDown}
              disabled={!inStock || isAddingToCart}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                inStock && !isAddingToCart
                  ? 'bg-brand-accent text-white hover:bg-brand-accent-dark'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={16} />
              <span>{isAddingToCart ? 'Đã thêm!' : 'Thêm giỏ'}</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Brand */}
          {brand && (
            <div className="text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wide">
              {brand}
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-brand-accent transition-colors">
            {name}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
              {description}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => {
                const filled = i < Math.floor(rating);
                const halfFilled = i === Math.floor(rating) && rating % 1 >= 0.5;
                return (
                  <Star
                    key={i}
                    size={14}
                    className={
                      filled
                        ? 'text-yellow-400 fill-yellow-400'
                        : halfFilled
                        ? 'text-yellow-400 fill-yellow-400/50'
                        : 'text-gray-300'
                    }
                  />
                );
              })}
            </div>
            <span className="text-xs text-gray-500">({reviews.toLocaleString()})</span>
            {rating > 0 && (
              <span className="ml-auto text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                {rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="mb-4 mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-brand-accent">
                {formatPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            onMouseDown={handleAddToCartMouseDown}
            disabled={!inStock || isAddingToCart}
            className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 relative z-20 ${
              inStock && !isAddingToCart
                ? 'bg-brand-accent hover:bg-brand-accent-dark text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={18} strokeWidth={2} />
            <span>{isAddingToCart ? 'Đã thêm!' : inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}</span>
            {inStock && !isAddingToCart && (
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
