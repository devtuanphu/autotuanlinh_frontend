/**
 * Strapi API Client
 * 
 * Generic fetch function for Strapi CMS
 * Works with both Single Types and Collection Types
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

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
export async function fetchStrapi<T = any>(
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

  const url = `${STRAPI_URL}/api${endpoint}?${params.toString()}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      next: cacheConfig,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const json: StrapiResponse<StrapiItem<T> | StrapiItem<T>[]> = await response.json();
    
    // Handle Single Type (returns single object)
    if (!Array.isArray(json.data)) {
      return transformStrapiItem(json.data) as T;
    }
    
    // Handle Collection Type (returns array)
    return transformStrapiCollection(json.data) as T;
  } catch (error) {
    console.error(`[Strapi] Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Transform Strapi image object to URL string
 */
export function getStrapiImageUrl(image: any): string {
  if (!image?.data?.attributes?.url) return '';
  const url = image.data.attributes.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
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
 */
function transformStrapiCollection<T>(data: StrapiItem<T>[]): (T & { id: string })[] {
  return data.map(transformStrapiItem);
}

