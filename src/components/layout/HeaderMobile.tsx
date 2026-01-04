'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Search, 
  ChevronDown, 
  ChevronRight,
  MapPin,
  Package,
  Grid3x3,
} from 'lucide-react';
import { menuItems, productCategories, megaMenuData, trendingSearches } from './constants/headerData';
import { useCart } from '@/contexts/CartContext';

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(new Set());
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Không đóng nếu click vào button menu
        const target = event.target as HTMLElement;
        if (!target.closest('button[aria-label="Menu"]')) {
          setIsMenuOpen(false);
        }
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest('button[aria-label="Search"]')) {
          setIsSearchOpen(false);
        }
      }
    };

    if (isMenuOpen || isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isSearchOpen]);

  // Khóa scroll khi menu hoặc search mở
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      window.location.href = `/tim-kiem?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleTrendingClick = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    setIsSearchOpen(false);
    window.location.href = `/tim-kiem?q=${encodeURIComponent(searchTerm)}`;
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubCategory = (subCategoryId: string) => {
    const newExpanded = new Set(expandedSubCategories);
    if (newExpanded.has(subCategoryId)) {
      newExpanded.delete(subCategoryId);
    } else {
      newExpanded.add(subCategoryId);
    }
    setExpandedSubCategories(newExpanded);
  };

  return (
    <>
      {/* Top Bar - Scrolling Text */}
      <div className="w-full bg-brand-dark text-white m-0 py-2 lg:hidden">
        <div className="container mx-auto flex gap-4 overflow-hidden px-4 text-xs transition-all duration-200 ease-in-out py-1.5 opacity-100">
          <div className="scrollbar-none flex overflow-x-auto focus-visible:outline-none flex-1 min-w-0">
            <div className="flex gap-4 animate-scroll-left-infinite">
              {[
                { text: '', bold: 'Chính hãng - Xuất VAT', rest: 'đầy đủ' },
                { text: '', bold: 'Giao nhanh - Miễn phí', rest: 'cho đơn 300k' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1 text-white whitespace-nowrap relative before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:size-[5px] before:bg-white/30 before:rounded-full"
                >
                  <Package size={16} strokeWidth={1.5} />
                  {item.text && <span>{item.text}</span>}
                  {item.bold && <strong>{item.bold}</strong>}
                  {item.rest && <span>{item.rest}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-[1000] w-full bg-brand-dark text-white shadow-lg m-0 p-0 mb-0 lg:hidden">
        <div className="container mx-auto flex items-center gap-2 px-3 py-2">
          {/* Menu Button */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsSearchOpen(false);
            }}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>

          {/* Logo */}
          <Link 
            href="/" 
            title="Auto Tuan Linh" 
            className="flex-1 flex justify-center items-center h-20"
          >
            <Image
              src="/images/logo-auto.png"
              alt="Auto Tuan Linh"
              width={180}
              height={60}
              className="h-30 w-auto object-contain transition-all duration-200"
              priority
            />
          </Link>

          {/* Search Button */}
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsMenuOpen(false);
            }}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            aria-label="Search"
          >
            <Search size={24} className="text-white" />
          </button>

          {/* Cart Button */}
          <Link 
            href="/gio-hang" 
            className="relative p-2 hover:bg-white/20 rounded-lg transition"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] lg:hidden"
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div 
            ref={menuRef}
            className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-[1000] overflow-y-auto lg:hidden"
            style={{
              animation: 'slideInFromLeft 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Drawer Header */}
            <div className="sticky top-0 bg-brand-dark text-white p-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Categories Section */}
            <div className="border-b border-gray-200">
              <div className="px-4 py-3 bg-gray-50">
                <div className="flex items-center gap-2 text-brand-accent font-semibold">
                  <Grid3x3 size={20} />
                  <span>Danh mục sản phẩm</span>
                </div>
              </div>
              <div className="px-2 py-2">
                {productCategories.map((category) => {
                  const Icon = category.icon;
                  const isExpanded = expandedCategories.has(category.id);
                  return (
                    <div key={category.id} className="mb-1">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={18} className="text-brand-accent flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        </div>
                        {category.children && category.children.length > 0 && (
                          <ChevronDown 
                            size={16} 
                            className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </button>
                      
                      {/* Sub Categories */}
                      {isExpanded && category.children && (
                        <div className="pl-8 pr-2 py-1">
                          {category.children.map((subCategory) => {
                            const isSubExpanded = expandedSubCategories.has(subCategory.id);
                            return (
                              <div key={subCategory.id} className="mb-1">
                                <button
                                  onClick={() => toggleSubCategory(subCategory.id)}
                                  className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                                >
                                  <span className="text-sm text-gray-700">{subCategory.name}</span>
                                  {subCategory.children && subCategory.children.length > 0 && (
                                    <ChevronRight 
                                      size={14} 
                                      className={`text-gray-400 transition-transform ${isSubExpanded ? 'rotate-90' : ''}`} 
                                    />
                                  )}
                                </button>
                                
                                {/* Sub Sub Categories */}
                                {isSubExpanded && subCategory.children && (
                                  <div className="pl-4 pr-2 py-1">
                                    {subCategory.children.map((item, index) => (
                                      <Link
                                        key={index}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600"
                                      >
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => {
                if (item.hasMegaMenu && item.key) {
                  const menu = megaMenuData[item.key as keyof typeof megaMenuData];
                  return (
                    <div key={item.name} className="mb-1">
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 text-gray-900 hover:bg-gray-50 font-semibold transition-colors"
                      >
                        {item.name}
                      </Link>
                      {menu && (
                        <div className="pl-6 pr-4 py-2 space-y-1">
                          {menu.columns.map((column, colIndex) => (
                            <div key={colIndex} className="mb-3">
                              <div className="text-xs font-semibold text-brand-accent mb-2">{column.title}</div>
                              {column.items.map((subItem, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  href={subItem.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="block text-sm text-gray-600 hover:text-brand-accent py-1.5"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-gray-900 hover:bg-gray-50 font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  );
                }
              })}
            </div>

            {/* Quick Links */}
            <div className="border-t border-gray-200 px-4 py-3 space-y-2">
              <Link
                href="/dia-chi-cua-hang"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-accent"
              >
                <MapPin size={16} />
                <span>Cửa hàng gần bạn</span>
              </Link>
              <Link
                href="/tra-cuu-don-hang"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-accent"
              >
                <Package size={16} />
                <span>Tra cứu đơn hàng</span>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] lg:hidden"
            onClick={() => setIsSearchOpen(false)}
          />
          
          {/* Search Panel */}
          <div 
            ref={searchRef}
            className="fixed top-0 left-0 right-0 bg-white z-[1000] lg:hidden shadow-2xl max-h-[100vh] overflow-y-auto"
          >
            {/* Search Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-gray-300 focus-within:ring-0">
                  <Search size={20} className="text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Bạn muốn mua gì hôm nay?"
                    className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400 text-sm"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </form>
            </div>

            {/* Search Content */}
            <div className="p-4">
              {/* Trending Searches */}
              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  Xu hướng tìm kiếm <span className="text-lg">🔥</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {trendingSearches.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleTrendingClick(item.name)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left group border border-gray-200"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-brand-accent transition-colors font-medium flex-1 leading-tight">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Danh mục nổi bật</h3>
                <div className="space-y-1">
                  {productCategories.slice(0, 4).map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.id}
                        href={category.href}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Icon size={20} className="text-brand-accent" />
                        <span className="text-sm text-gray-700">{category.name}</span>
                        <ChevronRight size={16} className="text-gray-400 ml-auto" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HeaderMobile;
