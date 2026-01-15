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
  Car,
  Wrench,
  Settings,
  Film,
  Music,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { menuItems, productCategories as defaultProductCategories, megaMenuData as defaultMegaMenuData, trendingSearches } from './constants/headerData';
import { useCart } from '@/contexts/CartContext';
import { searchProducts, getStrapiImageUrl } from '@/lib/api/strapi';
import { Loader2 } from 'lucide-react';

// Helper to get icon from category name
const getIconFromCategory = (category: string): LucideIcon => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('ngoại thất') || categoryLower.includes('ngoai that')) {
    return Sparkles;
  } else if (categoryLower.includes('đồ chơi') || categoryLower.includes('do choi')) {
    return Settings;
  } else if (categoryLower.includes('bảo dưỡng') || categoryLower.includes('bao duong')) {
    return Wrench;
  } else if (categoryLower.includes('phim') || categoryLower.includes('dán')) {
    return Film;
  } else if (categoryLower.includes('âm thanh') || categoryLower.includes('am thanh')) {
    return Music;
  }
  return Car;
};

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(new Set());
  const [productCategories, setProductCategories] = useState(defaultProductCategories);
  const [megaMenuData, setMegaMenuData] = useState(defaultMegaMenuData);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
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

  // Fetch header data from API
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_URL_STRAPI || 'http://localhost:1337';
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_KEY || '';
        
        const response = await fetch(`${apiUrl}/api/header?pLevel`, {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch header data');
        }

        const data = await response.json();
        
        if (data && typeof data === 'object') {
          // Map danh-muc-bai-san-pham to megaMenuData for "Sản phẩm" menu
          if (data['danh-muc-bai-san-pham'] && Array.isArray(data['danh-muc-bai-san-pham'])) {
            const columns = (data['danh-muc-bai-san-pham'] as Array<{
              category: string;
              subcategory: Array<{
                title: string;
                slug: string;
              }>;
            }>).map((cat) => {
              return {
                title: cat.category,
                icon: getIconFromCategory(cat.category),
                items: cat.subcategory.map((sub) => ({
                  name: sub.title,
                  href: `/danh-muc-bai-viet-san-pham/${sub.slug}`,
                })),
              };
            });
            
            setMegaMenuData(prev => ({
              ...prev,
              'danh-muc-bai-viet-san-pham': {
                title: 'Sản phẩm',
                columns,
              },
            }));
          }

          // Map danh-muc-bai-dich-vu to megaMenuData for "Dịch vụ" menu
          if (data['danh-muc-bai-dich-vu'] && Array.isArray(data['danh-muc-bai-dich-vu'])) {
            const columns = (data['danh-muc-bai-dich-vu'] as Array<{
              category: string;
              subcategory: Array<{
                title: string;
                slug: string;
              }>;
            }>).map((cat) => {
              return {
                title: cat.category,
                icon: getIconFromCategory(cat.category),
                items: cat.subcategory.map((sub) => ({
                  name: sub.title,
                  href: `/dich-vu/${sub.slug}`,
                })),
              };
            });
            
            setMegaMenuData(prev => ({
              ...prev,
              'dich-vu': {
                title: 'Dịch vụ',
                columns,
              },
            }));
          }

          // Map danh-muc-san-pham to productCategories for "Danh mục sản phẩm" menu
          if (data['danh-muc-san-pham'] && Array.isArray(data['danh-muc-san-pham'])) {
            // Try different API response structures
            const categories = (data['danh-muc-san-pham'] as Array<{
              // Structure 1: category/subcategory format (from header API)
              category?: string;
              subcategory?: Array<{
                title: string;
                slug: string;
                subcategory?: Array<{
                  title: string;
                  slug: string;
                }>;
              }>;
              // Structure 2: tenDanhMuc/danhMucCapHai format (from home API)
              tenDanhMuc?: string;
              title?: string;
              slug?: string;
              danhMucCapHai?: Array<{
                tenDanhMuc?: string;
                title?: string;
                slug: string;
                danhMucCapBa?: Array<{
                  tenDanhMuc?: string;
                  title?: string;
                  slug: string;
                }>;
              }>;
            }>).map((cat) => {
              // Handle Structure 1: category/subcategory
              if (cat.category && cat.subcategory) {
                const categorySlug = cat.slug || cat.category.toLowerCase().replace(/\s+/g, '-');
                return {
                  id: categorySlug,
                  name: cat.category,
                  icon: getIconFromCategory(cat.category),
                  href: `/san-pham/${categorySlug}`,
                  children: cat.subcategory.map((sub) => ({
                    id: sub.slug,
                    name: sub.title,
                    children: sub.subcategory ? sub.subcategory.map((subSub) => ({
                      name: subSub.title,
                      href: `/san-pham/${subSub.slug}`, // Level 3 uses its own slug
                    })) : [],
                  })),
                };
              }
              
              // Handle Structure 2: tenDanhMuc/danhMucCapHai/danhMucCapBa
              const categoryName = cat.tenDanhMuc || cat.title || '';
              const categorySlug = cat.slug || categoryName.toLowerCase().replace(/\s+/g, '-');
              
              return {
                id: categorySlug,
                name: categoryName,
                icon: getIconFromCategory(categoryName),
                href: `/san-pham/${categorySlug}`,
                children: (cat.danhMucCapHai || []).map((sub) => {
                  const subName = sub.tenDanhMuc || sub.title || '';
                  const subSlug = sub.slug;
                  return {
                    id: subSlug,
                    name: subName,
                    children: (sub.danhMucCapBa || []).map((subSub) => ({
                      name: subSub.tenDanhMuc || subSub.title || '',
                      href: `/san-pham/${subSub.slug}`, // Level 3 uses its own slug
                    })),
                  };
                }),
              };
            });
            
            setProductCategories(categories);
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[HeaderMobile] Failed to fetch header data, using defaults:', error);
        }
        // Use default data if fetch fails
      }
    };

    fetchHeaderData();
  }, []);

  // Live search with debouncing
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const results = await searchProducts(searchQuery, 4);
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      window.location.href = `/ket-qua-tim-kiem/${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleTrendingClick = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    setIsSearchOpen(false);
    window.location.href = `/ket-qua-tim-kiem/${encodeURIComponent(searchTerm)}`;
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
              {/* Kết quả tìm kiếm nhanh */}
              {searchQuery.trim().length >= 2 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    Sản phẩm gợi ý
                  </h3>
                  
                  {isSearching ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 text-brand-accent animate-spin" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/chi-tiet-san-pham/${product.slug}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all group"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={product.anhSanPham && product.anhSanPham.length > 0 
                                ? getStrapiImageUrl(product.anhSanPham[0]) 
                                : `https://picsum.photos/100/100?random=${product.id}`}
                              alt={product.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-brand-accent transition-colors">
                              {product.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-brand-accent font-bold text-sm">
                                {product.giaBan ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaBan) : 'Liên hệ'}
                              </span>
                              {product.giaGoc && product.giaGoc > (product.giaBan || 0) && (
                                <span className="text-gray-400 text-xs line-through">
                                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaGoc)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-sm text-gray-500 italic">
                      Không tìm thấy sản phẩm nào phù hợp
                    </div>
                  )}
                </div>
              )}

              {/* Trending Searches - Only show when no results/not searching */}
              {!isSearching && searchQuery.trim().length === 0 && (
                <div className="py-8 text-center text-gray-500 text-sm italic">
                  Nhập từ khóa để tìm kiếm sản phẩm...
                </div>
              )}

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
