import React from 'react';

export interface ProductItem {
  name: string;
  href: string;
  // Optional fields from API
  giaBan?: number | null;
  giaGoc?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
  badges?: string | null;
  giamGia?: number | null;
  anhSanPham?: Array<{
    url?: string;
    formats?: {
      large?: { url?: string };
      medium?: { url?: string };
      small?: { url?: string };
      thumbnail?: { url?: string };
    };
  }> | null;
  slug?: string;
}

export interface ProductSubCategory {
  id: string;
  name: string;
  children?: ProductItem[];
}

export interface ProductCategoryData {
  id: string;
  name: string;
  icon: string; // Icon name as string
  href: string;
  children?: ProductSubCategory[];
}

export interface ProductCategoryDetail {
  parentCategory: {
    id: string;
    name: string;
    href: string;
  };
  subCategory: {
    id: string;
    name: string;
  };
  products: ProductItem[];
}

export interface SortOption {
  id: string;
  name: string;
  icon: string;
}

export const ITEMS_PER_PAGE = 2; // Giảm xuống 2 để dễ thấy phân trang (mỗi subCategory có 3-4 products)

export const sortOptions: SortOption[] = [
  { id: 'default', name: 'Mặc định', icon: 'Grid3x3' },
  { id: 'price-asc', name: 'Giá: Thấp đến cao', icon: 'ArrowUp' },
  { id: 'price-desc', name: 'Giá: Cao đến thấp', icon: 'ArrowDown' },
  { id: 'rating', name: 'Đánh giá cao nhất', icon: 'Star' },
  { id: 'popular', name: 'Bán chạy nhất', icon: 'TrendingUp' },
  { id: 'newest', name: 'Mới nhất', icon: 'Clock' },
];

// Helper function to convert productCategories from headerData to ProductCategoryData
// This function handles the icon component to string conversion
export function convertProductCategoriesToData(
  productCategories: Array<{
    id: string;
    name: string;
    icon: React.ComponentType | React.ElementType;
    href: string;
    children?: Array<{
      id: string;
      name: string;
      children?: Array<{ name: string; href: string }>;
    }>;
  }>,
  iconMap: Map<React.ComponentType | React.ElementType, string>
): ProductCategoryData[] {
  return productCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: iconMap.get(cat.icon) || 'Car',
    href: cat.href,
    children: cat.children,
  }));
}

// Helper function to find product category detail by subCategory id
export function findProductCategoryDetail(
  categories: ProductCategoryData[],
  subCategoryId: string
): ProductCategoryDetail | null {
  for (const category of categories) {
    const found = category.children?.find(sub => sub.id === subCategoryId);
    if (found) {
      return {
        parentCategory: {
          id: category.id,
          name: category.name,
          href: category.href,
        },
        subCategory: {
          id: found.id,
          name: found.name,
        },
        products: found.children || [],
      };
    }
  }
  return null;
}

// Helper function to generate product data from ProductItem (with API data support)
export function generateProductFromItem(
  item: ProductItem,
  index: number,
  subCategoryId: string
) {
  // Use API data if available, otherwise generate mock data
  const price = item.giaBan ?? (() => {
    const priceSeed = (subCategoryId.charCodeAt(0) || 0) + (index * 13);
    return 1000000 + ((priceSeed % 50) * 100000); // 1M - 6M
  })();
  
  const originalPrice = item.giaGoc ?? (() => {
    const priceSeed = (subCategoryId.charCodeAt(0) || 0) + (index * 13);
    const basePrice = 1000000 + ((priceSeed % 50) * 100000);
    return basePrice + ((priceSeed % 30) * 100000);
  })();
  
  // Use API rating if available, otherwise generate mock
  const rating = item.rating !== null && item.rating !== undefined 
    ? Math.round(Number(item.rating) * 10) / 10 // Normalize to 1 decimal place
    : (() => {
        const ratingSeed = (subCategoryId.charCodeAt(0) || 0) + (index * 7);
        const ratingMod = ratingSeed % 20; // 0-19
        const ratingInt = 40 + ratingMod; // 40-59 (tương đương 4.0-5.9)
        return ratingInt / 10;
      })();
  
  // Use API review count if available, otherwise generate mock
  const reviews = item.reviewCount ?? (() => {
    const reviewsSeed = (subCategoryId.charCodeAt(0) || 0) + (index * 11);
    return 10 + ((reviewsSeed % 200)); // 10 - 210
  })();
  
  // Use API badge if available, otherwise generate mock
  const badge = item.badges ?? (() => {
    const badges = ['Bán chạy', 'Mới', 'Hot', undefined];
    return badges[index % badges.length];
  })();
  
  // Calculate popularity score (for sorting)
  const popularity = (reviews * 10) + (rating * 10);
  
  // Extract slug from href or use item.slug
  const slug = item.slug || item.href.split('/').pop() || `product-${index}`;
  // Create href with new structure: /san-pham/[categoryId]/[productId]
  const detailHref = `/san-pham/${subCategoryId}/${slug}`;
  
  // Use API image if available, otherwise use placeholder
  let image = `https://picsum.photos/800/500?random=${(subCategoryId.charCodeAt(0) || 0) + index}`;
  if (item.anhSanPham && item.anhSanPham.length > 0) {
    const firstImage = item.anhSanPham[0];
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337';
    // Try to get medium or large format, fallback to url
    if (firstImage.formats?.medium?.url) {
      image = `${STRAPI_URL}${firstImage.formats.medium.url}`;
    } else if (firstImage.formats?.large?.url) {
      image = `${STRAPI_URL}${firstImage.formats.large.url}`;
    } else if (firstImage.url) {
      image = `${STRAPI_URL}${firstImage.url}`;
    }
  }
  
  return {
    id: `product-${subCategoryId}-${index}`,
    name: item.name,
    description: `Sản phẩm ${item.name.toLowerCase()} chất lượng cao, chính hãng từ Auto Tuan Linh`,
    price,
    originalPrice: price < originalPrice ? originalPrice : undefined,
    image,
    rating, // Already normalized above
    reviews,
    badge,
    href: detailHref,
    inStock: true,
    brand: 'Auto Tuan Linh',
    freeShipping: true,
    warranty: '12 tháng',
    popularity, // For sorting
    createdAt: 0, // Fixed value to avoid hydration issues (not used in UI currently)
  };
}

// Product detail interface
export interface ProductDetail extends ReturnType<typeof generateProductFromItem> {
  images?: string[];
  specifications?: Array<{ label: string; value: string }>;
  longDescription?: string;
  giamGia?: number | null; // Discount percentage from API
  strapiId?: number; // Strapi ID (number) for API relations
  category?: {
    parentId: string;
    parentName: string;
    subCategoryId: string;
    subCategoryName: string;
  };
}

// Helper function to find product detail by categoryId and productId
export function findProductDetail(
  categories: ProductCategoryData[],
  categoryId: string,
  productId: string
): ProductDetail | null {
  // Find the category
  for (const category of categories) {
    if (!category.children) continue;
    
    // Find subCategory by categoryId
    const subCategory = category.children.find(sub => sub.id === categoryId);
    if (!subCategory || !subCategory.children) continue;
    
    // Find product by productId (slug from href)
    const productIndex = subCategory.children.findIndex(
      item => {
        // Extract slug from href (e.g., '/san-pham/ghe-da' -> 'ghe-da')
        const itemSlug = item.href.replace('/san-pham/', '');
        // Match exact slug or check if href contains productId
        return itemSlug === productId;
      }
    );
    
    if (productIndex !== -1) {
      const productItem = subCategory.children[productIndex];
      const productData = generateProductFromItem(productItem, productIndex, subCategory.id);
      
      // Generate additional images using placeholder service
      const imageId1 = (categoryId.charCodeAt(0) || 0) + (productIndex * 3) + 1;
      const imageId2 = (categoryId.charCodeAt(0) || 0) + (productIndex * 3) + 2;
      const imageId3 = (categoryId.charCodeAt(0) || 0) + (productIndex * 3) + 3;
      
      const images = [
        productData.image,
        `https://picsum.photos/800/500?random=${imageId1}`,
        `https://picsum.photos/800/500?random=${imageId2}`,
        `https://picsum.photos/800/500?random=${imageId3}`,
      ];
      
      // Generate specifications
      const specifications = [
        { label: 'Thương hiệu', value: productData.brand || 'Auto Tuan Linh' },
        { label: 'Bảo hành', value: productData.warranty || '12 tháng' },
        { label: 'Vận chuyển', value: productData.freeShipping ? 'Miễn phí' : 'Có phí' },
        { label: 'Tình trạng', value: productData.inStock ? 'Còn hàng' : 'Hết hàng' },
        { label: 'Xuất xứ', value: 'Việt Nam' },
        { label: 'Chất liệu', value: 'Cao cấp' },
      ];
      
      // Generate long description
      const longDescription = `
        <h3>Mô tả sản phẩm</h3>
        <p>${productData.name} là sản phẩm chất lượng cao, được sản xuất với công nghệ hiện đại và nguyên liệu tốt nhất. Sản phẩm được thiết kế để đáp ứng nhu cầu của khách hàng khó tính nhất.</p>
        
        <h3>Đặc điểm nổi bật</h3>
        <ul>
          <li>Chất lượng cao, bền bỉ theo thời gian</li>
          <li>Thiết kế hiện đại, sang trọng</li>
          <li>Dễ dàng lắp đặt và sử dụng</li>
          <li>Bảo hành chính hãng ${productData.warranty}</li>
          <li>Hỗ trợ giao hàng toàn quốc</li>
        </ul>
        
        <h3>Thông tin kỹ thuật</h3>
        <p>Sản phẩm được sản xuất theo tiêu chuẩn chất lượng quốc tế, đảm bảo an toàn và hiệu quả sử dụng tối đa.</p>
      `;
      
      // Update href to point to detail page
      const detailHref = `/san-pham/${categoryId}/${productId}`;
      
      return {
        ...productData,
        href: detailHref,
        images,
        specifications,
        longDescription,
        category: {
          parentId: category.id,
          parentName: category.name,
          subCategoryId: subCategory.id,
          subCategoryName: subCategory.name,
        },
      };
    }
  }
  
  return null;
}
