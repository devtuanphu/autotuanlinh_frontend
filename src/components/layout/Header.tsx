'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Phone, 
  Search, 
  ChevronDown, 
  ChevronUp,
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
import { menuItems, productCategories as defaultProductCategories, megaMenuData as defaultMegaMenuData } from './constants/headerData';
import { useCart } from '@/contexts/CartContext';
import { searchProducts, getStrapiImageUrl } from '@/lib/api/strapi';
import { Loader2 } from 'lucide-react';

interface SearchProductSuggestion {
  id: string | number;
  title: string;
  slug: string;
  giaBan?: number;
  giaGoc?: number;
  anhSanPham?: Array<{ url: string }>;
}

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

const Header = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [megaMenuData, setMegaMenuData] = useState(defaultMegaMenuData);
  const [productCategories, setProductCategories] = useState(defaultProductCategories);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchProductSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchBarPosition, setSearchBarPosition] = useState({ left: 0, width: 0 });
  const megaMenuRef = useRef<HTMLElement | null>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuPanelRef = useRef<HTMLDivElement>(null);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Kiểm tra mega menu
      if (megaMenuRef.current && !megaMenuRef.current.contains(target as Node)) {
        setActiveMegaMenu(null);
      }
      
      // Kiểm tra category menu - không đóng nếu click vào button hoặc Link
      if (isCategoryMenuOpen) {
        // Kiểm tra xem có phải click vào button "Danh mục sản phẩm" không
        const categoryButton = target.closest('button');
        if (categoryButton && categoryButton.textContent?.includes('Danh mục sản phẩm')) {
          return; // Không đóng nếu click vào button
        }
        
        // Kiểm tra xem có click vào menu container (cột trái) không
        if (categoryMenuRef.current?.contains(target as Node)) {
          return; // Không đóng nếu click vào menu container
        }
        
        // Kiểm tra xem có click vào panel bên phải không
        if (categoryMenuPanelRef.current?.contains(target as Node)) {
          return; // Không đóng nếu click vào panel bên phải
        }
        
        // Kiểm tra xem có click vào Link trong menu không (fallback)
        const link = target.closest('a');
        if (link && (categoryMenuRef.current?.contains(link) || categoryMenuPanelRef.current?.contains(link))) {
          return; // Không đóng nếu click vào Link trong menu
        }
        
        // Nếu không click vào bất kỳ phần nào của menu, đóng menu
        setIsCategoryMenuOpen(false);
        setHoveredCategory(null);
      }

      // Kiểm tra search dropdown
      if (isSearchDropdownOpen) {
        if (searchDropdownRef.current && !searchDropdownRef.current.contains(target as Node)) {
          if (searchInputRef.current && !searchInputRef.current.contains(target as Node)) {
            setIsSearchDropdownOpen(false);
            setIsSearchFocused(false);
          }
        }
      }
    };

    if (activeMegaMenu || isCategoryMenuOpen || isSearchDropdownOpen) {
      // Dùng setTimeout để tránh conflict với onClick của button
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMegaMenu, isCategoryMenuOpen, isSearchDropdownOpen]);

  // Handle ESC key để đóng search dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchDropdownOpen) {
        setIsSearchDropdownOpen(false);
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };

    if (isSearchDropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchDropdownOpen]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isCategoryMenuOpen]);

  // Theo dõi scroll để điều chỉnh khoảng cách dropdown
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Kiểm tra trạng thái ban đầu
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Tính toán vị trí search bar để căn dropdown
  useEffect(() => {
    const updateSearchBarPosition = () => {
      if (searchBarRef.current) {
        const rect = searchBarRef.current.getBoundingClientRect();
        setSearchBarPosition({
          left: rect.left,
          width: rect.width,
        });
      }
    };

    if (isSearchDropdownOpen) {
      updateSearchBarPosition();
      window.addEventListener('resize', updateSearchBarPosition);
      window.addEventListener('scroll', updateSearchBarPosition);
    }

    return () => {
      window.removeEventListener('resize', updateSearchBarPosition);
      window.removeEventListener('scroll', updateSearchBarPosition);
    };
  }, [isSearchDropdownOpen]);

  // Khóa scroll Y khi category menu hoặc search dropdown mở
  useEffect(() => {
    if (isCategoryMenuOpen || isSearchDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCategoryMenuOpen, isSearchDropdownOpen]);

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
            const categories = (data['danh-muc-san-pham'] as Array<{
              category?: string;
              slug?: string; // Add slug for level 1
              subcategory?: Array<{
                title: string;
                slug: string;
                subcategory?: Array<{
                  title: string;
                  slug: string;
                }>;
              }>;
              // Structure 2: tenDanhMuc/danhMucCapHai format
              tenDanhMuc?: string;
              title?: string;
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
          console.warn('[Header] Failed to fetch header data, using defaults:', error);
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
          const results = await searchProducts(searchQuery, 6);
          setSearchResults(results as unknown as SearchProductSuggestion[]);
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
      setIsSearchDropdownOpen(false);
      window.location.href = `/ket-qua-tim-kiem/${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setIsSearchDropdownOpen(true);
    // Đóng mega menu và category menu khi mở search dropdown
    setActiveMegaMenu(null);
    setIsCategoryMenuOpen(false);
  };

  const handleSearchBlur = () => {
    // Delay để cho phép click vào dropdown
    setTimeout(() => {
      if (!searchDropdownRef.current?.contains(document.activeElement)) {
        setIsSearchFocused(false);
        setIsSearchDropdownOpen(false);
      }
    }, 200);
  };


  const handleMegaMenuEnter = (key: string) => {
    // Không cho mở mega menu khi category menu hoặc search dropdown đang mở
    if (isCategoryMenuOpen || isSearchDropdownOpen) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMegaMenu(key);
  };

  const handleMegaMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  // Scrolling text data
  const scrollingTexts = [
    { icon: Package, text: '', bold: 'Chính hãng - Xuất VAT', rest: 'đầy đủ' },
    { icon: Package, text: '', bold: 'Giao nhanh - Miễn phí', rest: 'cho đơn 300k' },
  ];

  return (
    <>
      {/* Top Bar - Scrolling Text - Không sticky */}
      <div className="hidden lg:block w-full bg-brand-dark text-white m-0 py-2">
          <div className="container mx-auto flex gap-4 overflow-hidden px-4 text-xs transition-all duration-200 ease-in-out py-1.5 opacity-100">
            <div className="scrollbar-none flex overflow-x-auto focus-visible:outline-none flex-1 min-w-0">
              <div className="flex gap-4 animate-scroll-left-infinite">
                {[...scrollingTexts, ...scrollingTexts].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center gap-1 text-white whitespace-nowrap relative before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:size-[5px] before:bg-white/30 before:rounded-full"
                    >
                      <Icon size={16} strokeWidth={1.5} />
                      {item.text && <span>{item.text}</span>}
                      {item.bold && <strong>{item.bold}</strong>}
                      {item.rest && <span>{item.rest}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hidden items-center gap-6 md:flex flex-shrink-0 ml-6">
          <a 
            href="/dia-chi-cua-hang" 
            className="flex items-center gap-1.5 whitespace-nowrap cursor-pointer relative hover:scale-95 transition-all duration-300 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[18px] before:w-0.5 before:h-3 before:bg-white/30"
          >
            <MapPin size={16} strokeWidth={1.5} />
            <span>Cửa hàng gần bạn</span>
          </a>
          <a 
            href="/tra-cuu-don-hang" 
            className="flex items-center gap-1.5 whitespace-nowrap cursor-pointer relative hover:scale-95 transition-all duration-300 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[18px] before:w-0.5 before:h-3 before:bg-white/30"
          >
            <Package size={16} strokeWidth={1.5} />
            <span>Tra cứu đơn hàng</span>
          </a>
          <a 
            href="tel:1900123456" 
            className="flex items-center gap-1.5 whitespace-nowrap cursor-pointer relative hover:scale-95 transition-all duration-300 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[18px] before:w-0.5 before:h-3 before:bg-white/30"
          >
            <Phone size={16} strokeWidth={1.5} />
            <span>1900 123 456</span>
          </a>
            </div>
          </div>
        </div>

      {/* Sticky Header - Main Header + Navigation Bar */}
      <header 
        id="header" 
        className="hidden lg:block sticky top-0 z-[1000] w-full bg-brand-dark text-white shadow-lg m-0 p-0 mb-0"
        ref={(el) => {
          if (el) {
            (megaMenuRef as React.MutableRefObject<HTMLElement | null>).current = el;
            (headerRef as React.MutableRefObject<HTMLElement | null>).current = el;
          }
        }}
      >
        {/* Main Header */}
        <div className="container mx-auto flex items-center gap-3 px-4">
          {/* Logo */}
          <Link 
            href="/" 
            title="Auto Tuan Linh" 
            className="flex h-20 items-center transition-all duration-300 "
          >
            <Image
              src="/images/logo-auto.png"
              alt="Auto Tuan Linh"
              width={200}
              height={53}
              className="h-40 w-auto object-contain transition-all duration-200"
              priority
            />
          </Link>

          {/* Categories Button */}
          <button 
          ref={categoryButtonRef}
          className="flex items-center justify-center gap-2 cursor-pointer border border-none text-base px-4 py-2 min-h-[40px] rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
          onClick={(e) => {
            e.stopPropagation();
            // Đóng mega menu khác khi mở category menu
            setActiveMegaMenu(null);
            setIsCategoryMenuOpen(!isCategoryMenuOpen);
          }}
        >
            <Grid3x3 size={24} strokeWidth={1.5} />
            <span>Danh mục sản phẩm</span>
            {isCategoryMenuOpen ? (
              <ChevronUp size={24} />
            ) : (
              <ChevronDown size={24} />
            )}
          </button>

          {/* Search Bar */}
          <div ref={searchBarRef} className="relative h-fit flex-1">
            <form onSubmit={handleSearch}>
              <div className="w-full overflow-hidden rounded-lg text-gray-600">
                <div className={`flex items-center gap-2 min-w-0 border transition-colors cursor-text min-h-[40px] rounded-lg bg-white h-[40px] ${
                  isSearchFocused ? 'border-white/50' : 'border-transparent'
                }`}>
                  <div className="flex items-center justify-center aspect-square px-3">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    placeholder="Bạn muốn mua gì hôm nay?"
                    className="w-full bg-transparent border-none outline-none shadow-none ring-0 focus:outline-none focus:border-none focus:ring-0 focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 placeholder:text-gray-300 text-sm"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Cart Button */}
          <Link 
            href="/gio-hang"
            className="flex items-center justify-center gap-2 cursor-pointer border border-none text-base px-4 py-2 min-h-[40px] rounded-lg bg-transparent hover:bg-white/20 text-white transition-all relative"
          >
            <span className="hidden lg:inline-block">Giỏ hàng</span>
            <span className="relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
        </div>

        {/* Navigation Bar */}
        <div id="bottom-header" className="w-full hidden lg:block bg-brand-dark m-0 mb-0 pb-0">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-8 pb-2">
            {menuItems.map((item) => {
              if (item.hasMegaMenu && item.key) {
                return (
                  <button
                    key={item.name}
                    className=" py-2 hover:text-brand-accent text-white font-medium transition-colors text-sm rounded"
                    onMouseEnter={() => handleMegaMenuEnter(item.key!)}
                    onMouseLeave={handleMegaMenuLeave}
                    onClick={() => setActiveMegaMenu(activeMegaMenu === item.key ? null : item.key!)}
                  >
                    {item.name}
                    {activeMegaMenu === item.key ? (
                      <ChevronUp size={14} className="inline-block ml-1" />
                    ) : (
                      <ChevronDown size={14} className="inline-block ml-1" />
                    )}
                  </button>
                );
              } else {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="py-2 hover:text-brand-accent text-white font-medium transition-colors text-sm rounded"
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
          </nav>
        </div>
        </div>

        {/* Mega Menu - Single Container */}
      {activeMegaMenu && (
        <div 
          className="absolute top-full left-0 right-0 w-full bg-white shadow-2xl border-t-2 border-brand-accent z-[100]"
          style={{
            animation: 'slideDown 0.3s ease-out'
          }}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
          onMouseLeave={handleMegaMenuLeave}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-8 py-8">
              {(megaMenuData[activeMegaMenu as keyof typeof megaMenuData]?.columns || []).map((column, colIndex: number) => {
                const Icon = column.icon;
                return (
                  <div key={colIndex}>
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                      <div className="w-10 h-10 bg-brand-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="text-brand-accent" size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">{column.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {column.items.map((item: { name: string; href: string }, itemIndex: number) => (
                        <li key={itemIndex}>
                          <Link
                            href={item.href}
                            className="text-gray-700 hover:text-brand-accent transition-colors text-sm block py-1.5 hover:pl-2 rounded"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            
            <div className="  py-4 border-t border-gray-200">
              <Link
                href={`/${activeMegaMenu}`}
                className="inline-flex items-center gap-2 text-brand-accent font-semibold hover:gap-3 transition-all text-sm"
                onClick={() => {
                  setActiveMegaMenu(null);
                }}
              >
                Xem tất cả {(megaMenuData[activeMegaMenu as keyof typeof megaMenuData]?.title || '').toLowerCase()}
                <ChevronDown size={14} className="rotate-[-90deg]" />
              </Link>
            </div>
          </div>
        </div>
        )}

      </header>

      {/* Search Dropdown - Render outside header */}
      {isSearchDropdownOpen && (
        <>
          {/* Backdrop - Làm mờ content phía sau */}
          <div 
            className="fixed left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[998]"
            style={{ 
              top: `${isScrolled ? headerHeight : headerHeight}px`
            }}
            onClick={() => {
              setIsSearchDropdownOpen(false);
              setIsSearchFocused(false);
            }}
          />
          
          {/* Dropdown Container - Fixed position để căn với search bar */}
          <div 
            ref={searchDropdownRef}
            className="fixed z-[999] bg-white rounded-lg shadow-2xl max-h-[600px] overflow-y-auto search-dropdown"
            style={{
              top: `${isScrolled ? headerHeight : headerHeight + 50}px`,
              left: `${searchBarPosition.left}px`,
              width: `${Math.min(searchBarPosition.width || 600, 1280)}px`,
              maxWidth: '1280px',
            }}
          >
            <div className="relative px-4">
              {/* Mũi tên nhỏ hướng lên - Căn giữa với search bar */}
              <div 
                className="absolute -top-2 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200"
                style={{
                  left: `${(searchBarPosition.width || 600) / 2 - 8}px` // Căn giữa với search bar
                }}
              ></div>
              
              {/* Content */}
              <div className="py-3 px-2">
                {/* Kết quả tìm kiếm nhanh */}
                {searchQuery.trim().length >= 2 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 px-2 uppercase tracking-wider">
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
                            onClick={() => setIsSearchDropdownOpen(false)}
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
                      <div className="py-4 px-2 text-sm text-gray-500 italic">
                        Không tìm thấy sản phẩm nào phù hợp
                      </div>
                    )}
                  </div>
                )}

                {/* Tiêu đề cho Trending */}
                {!isSearching && searchQuery.trim().length === 0 && (
                  <div className="py-8 px-4 text-center text-gray-500 text-sm italic">
                    Nhập từ khóa để tìm kiếm sản phẩm...
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Category Menu Overlay - Ngoài header */}
      {isCategoryMenuOpen && (
        <>
          {/* Backdrop - Làm mờ và nhoè phần content, không che header */}
          <div 
            className="fixed left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[999]"
            style={{ 
              top: `${headerHeight}px`
            }}
            onClick={() => setIsCategoryMenuOpen(false)}
          />
          
          {/* Menu Container - Fixed tại vị trí, full width container */}
          <div 
            className="fixed z-[1001] w-full pointer-events-none"
            style={{ 
              top: `${isScrolled ? headerHeight : headerHeight + 50}px`,
              left: 0,
              right: 0,
            }}
          >
            <div 
              className="container mx-auto px-4 relative flex gap-2 pointer-events-auto"
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Cột trái - Danh mục cha */}
              <div 
                className="bg-white rounded-lg shadow-2xl border-t-2 border-brand-accent w-64 flex-shrink-0"
                ref={categoryMenuRef}
              >
                <div className="py-3 px-2">
                  <ul className="space-y-0.5">
                    {productCategories.map((category: typeof defaultProductCategories[0]) => {
                      const Icon = category.icon;
                      const isHovered = hoveredCategory === category.id;
                      return (
                        <li key={category.id}>
                          <button
                            onMouseEnter={() => setHoveredCategory(category.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-sm text-left ${
                              isHovered 
                                ? 'bg-brand-accent/10 text-brand-accent font-semibold' 
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon size={18} className="text-brand-accent flex-shrink-0" />
                            <span className="flex-1">{category.name}</span>
                            <ChevronDown size={14} className={`rotate-[-90deg] flex-shrink-0 transition-transform ${isHovered ? 'text-brand-accent' : 'text-gray-400'}`} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Panel bên phải - Danh mục con - Chỉ hiện khi hover */}
              {hoveredCategory && (
                <div 
                  ref={categoryMenuPanelRef}
                  className="flex-1 bg-white rounded-lg shadow-2xl border-t-2 border-brand-accent min-h-full"
                  onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                >
                  <div className="py-4 px-6">
                    {(() => {
                      const category = productCategories.find((c: typeof defaultProductCategories[0]) => c.id === hoveredCategory);
                      if (!category) {
                        return null;
                      }
                      if (!category.children || category.children.length === 0) {
                        return null;
                      }
                      
                      // TypeScript type guard - category is guaranteed to exist and have children here
                      const validCategory = category;
                      
                      return (
                        <div className="grid grid-cols-3 gap-6">
                          {validCategory.children.map((child1: typeof validCategory.children[0]) => (
                            <div key={child1.id}>
                              <h3 className="font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-200">
                                {child1.name}
                              </h3>
                              <ul className="space-y-2">
                                {child1.children.map((child2: typeof child1.children[0], index: number) => (
                                  <li key={index}>
                                    <Link
                                      href={child2.href}
                                      className="text-gray-700 hover:text-brand-accent transition-colors text-sm block py-1.5 hover:pl-2 rounded"
                                      onClick={() => {
                                        setIsCategoryMenuOpen(false);
                                        setHoveredCategory(null);
                                      }}
                                    >
                                      {child2.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
