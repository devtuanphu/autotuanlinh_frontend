export interface SearchResult {
  id: string;
  type: 'article' | 'product' | 'service';
  title: string;
  excerpt: string;
  image: string;
  href: string;
  publishedAt?: string;
  readTime?: number;
  category?: string;
  author?: string;
  hashtags?: string[];
  relevance?: number;
  views?: number;
}

export interface TypeFilter {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface SortOption {
  id: string;
  name: string;
  icon: string;
}

export const ITEMS_PER_PAGE = 24;

export const sortOptions: SortOption[] = [
  { id: 'relevance', name: 'Liên quan nhất', icon: 'TrendingUp' },
  { id: 'newest', name: 'Mới nhất', icon: 'Clock' },
  { id: 'popular', name: 'Phổ biến nhất', icon: 'Star' },
];

// Mock search function - trong thực tế sẽ gọi API
export function searchResults(query: string): SearchResult[] {
  if (!query) return [];

  const queryLower = query.toLowerCase();
  const results: SearchResult[] = [];

  // Mock data - trong thực tế sẽ fetch từ API
  const articles: SearchResult[] = [
    {
      id: '1',
      type: 'article',
      title: 'Xu hướng phụ kiện ô tô năm 2025: Những điều cần biết',
      excerpt: 'Khám phá các xu hướng phụ kiện ô tô mới nhất năm 2025, từ công nghệ thông minh đến thiết kế hiện đại.',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop',
      href: '/tin-tuc/xu-huong-phu-kien-oto-2025',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 8,
      category: 'Xu hướng',
      author: 'Auto Tuan Linh',
      hashtags: ['xuhuong', 'phukienoto', '2025'],
      relevance: 95,
      views: 1250,
    },
    {
      id: '2',
      type: 'article',
      title: 'Hướng dẫn chọn phim cách nhiệt phù hợp cho xe của bạn',
      excerpt: 'Bí quyết chọn phim cách nhiệt chất lượng, phù hợp với nhu cầu và ngân sách của bạn.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop',
      href: '/tin-tuc/huong-dan-chon-phim-cach-nhiet',
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 6,
      category: 'Hướng dẫn',
      author: 'Auto Tuan Linh',
      hashtags: ['phimcachnhiet', 'huongdan'],
      relevance: 88,
      views: 980,
    },
    {
      id: '3',
      type: 'article',
      title: 'Top 10 phụ kiện nội thất ô tô bán chạy nhất 2024',
      excerpt: 'Danh sách các phụ kiện nội thất được khách hàng yêu thích nhất trong năm 2024.',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=500&fit=crop',
      href: '/tin-tuc/top-10-phu-kien-noi-that-2024',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 10,
      category: 'Top list',
      author: 'Auto Tuan Linh',
      hashtags: ['noithat', 'top10', 'phukien'],
      relevance: 82,
      views: 2100,
    },
    {
      id: '4',
      type: 'article',
      title: 'Cách bảo dưỡng và vệ sinh nội thất ô tô đúng cách',
      excerpt: 'Hướng dẫn chi tiết cách bảo dưỡng và vệ sinh nội thất ô tô để giữ xe luôn như mới.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
      href: '/tin-tuc/bao-duong-ve-sinh-noi-that-oto',
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 7,
      category: 'Bảo dưỡng',
      author: 'Auto Tuan Linh',
      hashtags: ['baoduong', 'vesinh', 'noithat'],
      relevance: 75,
      views: 750,
    },
  ];

  const products: SearchResult[] = [
    {
      id: 'p1',
      type: 'product',
      title: 'Phim cách nhiệt 3M chính hãng',
      excerpt: 'Phim cách nhiệt 3M cao cấp, chống tia UV 99%, bảo hành 5 năm. Phù hợp cho mọi dòng xe.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop&sig=p1',
      href: '/san-pham/phim-cach-nhiet-3m',
      category: 'Phim cách nhiệt',
      relevance: 92,
      views: 3200,
    },
    {
      id: 'p2',
      type: 'product',
      title: 'Camera hành trình 4K Full HD',
      excerpt: 'Camera hành trình công nghệ mới, quay phim 4K, ghi âm, cảnh báo va chạm.',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop&sig=p2',
      href: '/san-pham/camera-hanh-trinh-4k',
      category: 'Camera',
      relevance: 85,
      views: 1850,
    },
  ];

  const services: SearchResult[] = [
    {
      id: 's1',
      type: 'service',
      title: 'Dán phim cách nhiệt chuyên nghiệp',
      excerpt: 'Dịch vụ dán phim cách nhiệt chuyên nghiệp, đội ngũ kỹ thuật viên giàu kinh nghiệm, bảo hành dài hạn.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08e3?w=800&h=500&fit=crop&sig=s1',
      href: '/dich-vu/dan-phim-cach-nhiet',
      category: 'Dán phim',
      relevance: 90,
      views: 1500,
    },
    {
      id: 's2',
      type: 'service',
      title: 'Bọc ghế da cao cấp',
      excerpt: 'Dịch vụ bọc ghế da thật và da simili, nâng cấp nội thất xe sang trọng và hiện đại.',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=500&fit=crop&sig=s2',
      href: '/dich-vu/boc-ghe-da',
      category: 'Bọc ghế',
      relevance: 80,
      views: 1100,
    },
  ];

  // Lọc kết quả dựa trên từ khóa
  [...articles, ...products, ...services].forEach(item => {
    const titleMatch = item.title.toLowerCase().includes(queryLower);
    const excerptMatch = item.excerpt.toLowerCase().includes(queryLower);
    const categoryMatch = item.category?.toLowerCase().includes(queryLower);
    
    if (titleMatch || excerptMatch || categoryMatch) {
      results.push(item);
    }
  });

  return results;
}

