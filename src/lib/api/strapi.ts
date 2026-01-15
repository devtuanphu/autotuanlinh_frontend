/**
 * Strapi API Client
 * 
 * Generic fetch function for Strapi CMS
 * Works with both Single Types and Collection Types
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_URL_STRAPI || process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_KEY || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;
console.log('STRAPI_URL', STRAPI_URL);
console.log('STRAPI_API_TOKEN', STRAPI_API_TOKEN);

/**
 * Strapi API Response Types
 */
interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiItem<T = Record<string, unknown>> {
  id: number;
  attributes: T;
}

/**
 * Fetch options for Strapi API
 */
interface FetchOptions {
  populate?: string | string[];
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  fields?: string[];
}

/**
 * Generic function to fetch from Strapi API
 * 
 * @param endpoint - Strapi endpoint path (e.g., '/home', '/products')
 * @param options - Fetch options (populate, filters, sort, pagination)
 * @param cacheConfig - Next.js cache configuration
 * @returns Transformed data from Strapi
 */
export async function fetchStrapi<T = Record<string, unknown>>(
  endpoint: string,
  options: FetchOptions = {},
  cacheConfig: { revalidate?: number } = { revalidate: 60 }
): Promise<T> {
  const { populate, filters = {}, sort, pagination, fields = [] } = options;

  const params = new URLSearchParams();
  
  // Populate - chỉ thêm nếu được truyền vào
  if (populate) {
    params.append('populate', Array.isArray(populate) ? populate.join(',') : populate);
  }
  
  // Filters
  Object.entries(filters).forEach(([key, value]) => {
    params.append(`filters[${key}]`, String(value));
  });

  // Sort
  if (sort) {
    params.append('sort', Array.isArray(sort) ? sort.join(',') : sort);
  }

  // Pagination
  if (pagination) {
    if (pagination.page) params.append('pagination[page]', String(pagination.page));
    if (pagination.pageSize) params.append('pagination[pageSize]', String(pagination.pageSize));
  }

  // Fields
  if (fields.length > 0) {
    params.append('fields', fields.join(','));
  }

  // Build URL with query params
  // Check if endpoint already contains query params (e.g., '/footer-contact?pLevel')
  const hasQueryParams = endpoint.includes('?');
  const baseEndpoint = hasQueryParams ? endpoint.split('?')[0] : endpoint;
  let url = `${STRAPI_URL}/api${endpoint}`;
  
  // Hardcode pLevel for specific endpoints
  // Note: /danh-muc-bai-viets/cap-hai/ and /danh-muc-bai-viet-dich-vus/cap-hai/ endpoints don't support pLevel
  const isCapHaiEndpoint = baseEndpoint.startsWith('/danh-muc-bai-viets/cap-hai/') || baseEndpoint.startsWith('/danh-muc-bai-viet-dich-vus/cap-hai/');
  
  if (!isCapHaiEndpoint && (baseEndpoint === '/home' || baseEndpoint === '/footer-contact' || baseEndpoint === '/footer' || baseEndpoint === '/ve-chung-toi' || baseEndpoint === '/lien-he' || baseEndpoint === '/danh-muc-bai-viets' || baseEndpoint.startsWith('/danh-muc-bai-viets/') || baseEndpoint === '/danh-muc-bai-viet-dich-vus' || baseEndpoint.startsWith('/danh-muc-bai-viet-dich-vus/') || baseEndpoint.startsWith('/danh-muc-san-phams/') || baseEndpoint === '/san-phams' || baseEndpoint === '/blogs' || baseEndpoint === '/topic-blogs')) {
    if (!hasQueryParams) {
      url += '?pLevel';
    } else if (!endpoint.includes('pLevel')) {
      url += '&pLevel';
    }
  }
  
  // Add other params
  const otherParams = params.toString();
  if (otherParams) {
    const separator = url.includes('?') ? '&' : '?';
    url += `${separator}${otherParams}`;
  }
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  console.log(`[Strapi] Fetching from: ${url}`); // Debug log
  
  try {
    const response = await fetch(url, {
      headers,
      next: cacheConfig,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const json: StrapiResponse<StrapiItem<T> | StrapiItem<T>[]> = await response.json();
    
    // Debug log for heroSlider
    if (endpoint === '/home' && json.data && typeof json.data === 'object' && 'heroSlider' in json.data) {
      const heroSlider = (json.data as { heroSlider?: unknown[] }).heroSlider;
      console.log(`[Strapi] heroSlider count: ${heroSlider?.length || 0}`);
    }
    
    // Debug log for footer-contact
    if (endpoint === '/footer-contact' && process.env.NODE_ENV === 'development') {
      console.log('[Strapi] Raw footer-contact response:', JSON.stringify(json, null, 2));
    }
    
    // When using pLevel, Strapi returns data directly (not wrapped in attributes)
    // Check if data has attributes (old format) or is already flat (pLevel format)
    if (!Array.isArray(json.data)) {
      const data = json.data as unknown;
      
      // If it has attributes, it's the old format - transform it
      if (data && typeof data === 'object' && 'attributes' in data && data.attributes) {
        return transformStrapiItem(data as StrapiItem<T>) as T;
      }
      
      // Otherwise, it's already flat (pLevel format) - just ensure id is string
      if (data && typeof data === 'object' && 'id' in data) {
        const transformed = { ...data, id: String((data as { id: unknown }).id) } as T;
        if (endpoint === '/footer-contact' && process.env.NODE_ENV === 'development') {
          console.log('[Strapi] Transformed footer-contact data:', transformed);
        }
        return transformed;
      }
      
      return data as T;
    }
    
    // Handle Collection Type (returns array)
    return transformStrapiCollection(json.data) as T;
  } catch (error) {
    console.error(`[Strapi] Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Strapi Image Type (can be nested in data.attributes or direct object)
 */
interface StrapiImage {
  data?: {
    attributes?: {
      url?: string;
    };
  };
  url?: string; // Direct URL (when populated)
  formats?: {
    large?: { url?: string };
    medium?: { url?: string };
    small?: { url?: string };
    thumbnail?: { url?: string };
  };
}

/**
 * Transform Strapi image object to URL string
 * Handles both nested (data.attributes.url) and direct (url) formats
 */
export function getStrapiImageUrl(image: StrapiImage | null | undefined): string {
  if (!image) return '';
  
  // Direct URL format (when populated with pLevel)
  if (image.url) {
    const url = image.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  
  // Nested format (data.attributes.url)
  if (image.data?.attributes?.url) {
    const url = image.data.attributes.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  
  // Try formats as fallback
  if (image.formats?.large?.url) {
    const url = image.formats.large.url;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  }
  
  return '';
}

/**
 * Transform Strapi item to flat object
 */
function transformStrapiItem<T>(item: StrapiItem<T>): T & { id: string } {
  return {
    id: String(item.id),
    ...item.attributes,
  } as T & { id: string };
}

/**
 * Transform Strapi collection
 * Handles both old format (with attributes) and pLevel format (flat)
 */
function transformStrapiCollection<T>(data: (StrapiItem<T> | T)[]): (T & { id: string })[] {
  return data.map((item) => {
    // If it has attributes, it's the old format - transform it
    if (item && typeof item === 'object' && 'attributes' in item && item.attributes) {
      return transformStrapiItem(item as StrapiItem<T>);
    }
    
    // Otherwise, it's already flat (pLevel format) - just ensure id is string
    if (item && typeof item === 'object' && 'id' in item) {
      return { ...(item as unknown as Record<string, unknown>), id: String((item as { id: unknown }).id) } as T & { id: string };
    }
    
    return { ...(item as unknown as Record<string, unknown>), id: String((item as { id?: unknown }).id || '') } as T & { id: string };
  });
}

/**
 * Subscribe to newsletter
 */
export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/newsletter-subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      },
      body: JSON.stringify({
        data: {
          email,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    await response.json();
    return { success: true, message: 'Đăng ký thành công!' };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.',
    };
  }
}

/**
 * Create order
 */
export interface CreateOrderData {
  thongTinKhachHang: {
    hoVaTen: string;
    soDienThoai: string;
    email: string;
    diaChi: string;
    tinhThanhPho: string;
    quanHuyen: string;
    phuongXa: string;
  };
  sanPhams: Array<{
    sanPham: number; // Must be number (ID of relation)
    soLuong: number;
    giaBan: number;
    thanhTien: number;
  }>;
  tamTinh: number;
  phiVanChuyen: number;
  tongCong: number;
  phuongThucThanhToan: {
    loai: string;
    ten: string;
  };
}

export async function createOrder(orderData: CreateOrderData): Promise<{ success: boolean; data?: unknown; message?: string }> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/don-hangs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      },
      body: JSON.stringify({
        data: orderData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data, message: 'Đặt hàng thành công!' };
  } catch (error) {
    console.error('Create order error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.',
    };
  }
}

/**
 * Post product review
 */
export interface ReviewData {
  customerName: string;
  email: string;
  rating: number;
  content: string;
}

export async function postProductReview(slug: string, reviewData: ReviewData): Promise<{ 
  success: boolean; 
  data?: { 
    newReview: {
      customerName: string;
      email: string;
      rating: number;
      content: string;
      isApproved: boolean;
      createdAt?: string;
    }; 
    rating: number; 
    reviewCount: number; 
  }; 
  message?: string 
}> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/san-phams/${slug}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      },
      body: JSON.stringify({
        data: reviewData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return { success: true, data: json.data, message: 'Gửi đánh giá thành công!' };
  } catch (error) {
    console.error('Post review error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.',
    };
  }
}

/**
 * Fetch related products for a given product slug
 */
export async function fetchRelatedProducts<T = Record<string, unknown>>(
  slug: string,
  cacheConfig: { revalidate?: number } = { revalidate: 60 }
): Promise<T[]> {
  try {
    const url = `${STRAPI_URL}/api/san-phams/${slug}/related`;
    console.log(`[Strapi] Fetching related products from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      },
      next: cacheConfig,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error(`[Strapi] Failed to fetch related products for ${slug}:`, error);
    return [];
  }
}

/**
 * Search products by title
 */
export async function searchProducts(query: string, limit: number = 5): Promise<any[]> {
  if (!query || query.trim().length === 0) return [];
  
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `${STRAPI_URL}/api/san-phams?filters[title][$containsi]=${encodedQuery}&populate=anhSanPham&pagination[pageSize]=${limit}`;
    
    // We don't use cache for searching to get real-time results
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error(`[Strapi] Search failed for query "${query}":`, error);
    return [];
  }
}
