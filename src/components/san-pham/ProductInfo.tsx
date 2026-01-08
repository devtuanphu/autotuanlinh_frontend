'use client';

import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductDetail } from '@/lib/data/san-pham';
import { useCart } from '@/contexts/CartContext';

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Format price consistently to avoid hydration issues
  // Use manual formatting to ensure server/client consistency
  const formatPrice = (amount: number) => {
    // Manual formatting to avoid Intl.NumberFormat locale differences
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} ₫`;
  };

  // Format number consistently
  const formatNumber = (num: number) => {
    // Manual formatting to avoid toLocaleString differences
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Use giamGia from API if available, otherwise calculate from originalPrice and price
  const discount = product.giamGia !== null && product.giamGia !== undefined
    ? product.giamGia
    : product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    addItem({
      id: product.id,
      productId: product.strapiId ? String(product.strapiId) : product.id, // Use Strapi ID if available
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity,
      href: product.href,
      inStock: product.inStock,
    });
    
    // Reset after a short delay to show feedback
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    
    // Add to cart first
    addItem({
      id: product.id,
      productId: product.strapiId ? String(product.strapiId) : product.id, // Use Strapi ID if available
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity,
      href: product.href,
      inStock: product.inStock,
    });
    
    // Navigate to cart
    router.push('/gio-hang');
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      {product.badge && (
        <div className="inline-block">
          <span className="bg-brand-accent text-white px-4 py-1.5 rounded-md text-sm font-semibold">
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Name */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => {
            // Normalize rating to avoid floating point precision issues
            const rating = Math.round(Number(product.rating) * 10) / 10;
            const filled = i < Math.floor(rating);
            const halfFilled = i === Math.floor(rating) && Math.round((rating % 1) * 10) >= 5;
            return (
              <Star
                key={i}
                size={20}
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
        <span className="text-sm text-gray-600">
          {(Math.round(Number(product.rating) * 10) / 10).toFixed(1)} ({formatNumber(product.reviews)} đánh giá)
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-brand-accent">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              {discount > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      )}

      {/* Features */}
      <div className="space-y-3 border-t border-b border-gray-200 py-6">
        {product.freeShipping && (
          <div className="flex items-center gap-3">
            <Truck size={20} className="text-brand-accent" />
            <span className="text-gray-700">Miễn phí vận chuyển</span>
          </div>
        )}
        {product.warranty && (
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-brand-accent" />
            <span className="text-gray-700">Bảo hành {product.warranty}</span>
          </div>
        )}
        {product.brand && (
          <div className="flex items-center gap-3">
            <Package size={20} className="text-brand-accent" />
            <span className="text-gray-700">Thương hiệu: {product.brand}</span>
          </div>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Số lượng:</span>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-white transition-all ${
              product.inStock && !isAddingToCart
                ? 'bg-brand-accent hover:bg-brand-accent-dark shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={20} />
            <span>{isAddingToCart ? 'Đã thêm!' : 'Thêm vào giỏ hàng'}</span>
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all ${
              product.inStock
                ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Mua ngay</span>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              isLiked
                ? 'border-red-500 text-red-500 bg-red-50'
                : 'border-gray-300 text-gray-700 hover:border-brand-accent hover:text-brand-accent'
            }`}
          >
            <Heart size={18} className={isLiked ? 'fill-red-500' : ''} />
            <span>Yêu thích</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-brand-accent hover:text-brand-accent transition-colors">
            <Share2 size={18} />
            <span>Chia sẻ</span>
          </button>
        </div>
      </div>

      {/* Stock Status */}
      {!product.inStock && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-medium">Sản phẩm hiện đang hết hàng</p>
        </div>
      )}
    </div>
  );
}


