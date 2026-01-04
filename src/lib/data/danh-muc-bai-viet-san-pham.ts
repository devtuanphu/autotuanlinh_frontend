import React from 'react';

export interface ArticleItem {
  name: string;
  href: string;
}

export interface ProductSubCategory {
  id: string;
  name: string;
  children?: ArticleItem[];
}

export interface ProductCategoryData {
  id: string;
  name: string;
  icon: string; // Icon name as string
  href: string;
  children?: ProductSubCategory[];
}

// Helper function to get icon name from icon component
// This function maps icon component references to their string names
// We'll use a simple approach: create a mapping in the page.tsx file
// This is just a placeholder - the actual mapping will be done in page.tsx
export function getIconName(iconComponent: React.ComponentType | React.ElementType, iconMap?: Map<React.ComponentType | React.ElementType, string>): string {
  if (iconMap) {
    return iconMap.get(iconComponent) || 'Car';
  }
  
  // Fallback: try to extract from function name
  try {
    const component = iconComponent as { name?: string; displayName?: string };
    const funcName = component?.name || component?.displayName || '';
    if (funcName && typeof funcName === 'string') {
      const knownIcons = ['Car', 'Wrench', 'Settings', 'Film', 'Music', 'Sparkles'];
      if (knownIcons.includes(funcName)) {
        return funcName;
      }
    }
  } catch {
    // Ignore errors
  }
  
  return 'Car';
}

export interface CategoryDetail {
  parentCategory: {
    id: string;
    name: string;
    href: string;
  };
  subCategory: {
    id: string;
    name: string;
  };
  articles: ArticleItem[];
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface TrustStat {
  icon: string;
  value: string;
  label: string;
}

export const danhMucBaiVietSanPhamBenefits: Benefit[] = [
  {
    icon: 'FileText',
    title: 'Thông tin chi tiết',
    description: 'Thông tin kỹ thuật, tính năng và thông số đầy đủ của từng sản phẩm',
  },
  {
    icon: 'Shield',
    title: 'Đánh giá chuyên nghiệp',
    description: 'Đánh giá khách quan từ chuyên gia về chất lượng và hiệu quả',
  },
  {
    icon: 'BookOpen',
    title: 'Hướng dẫn sử dụng',
    description: 'Hướng dẫn lắp đặt, sử dụng và bảo quản sản phẩm đúng cách',
  },
  {
    icon: 'TrendingUp',
    title: 'So sánh sản phẩm',
    description: 'So sánh các sản phẩm tương tự để chọn sản phẩm phù hợp nhất',
  },
];

export const danhMucBaiVietSanPhamTrustStats: TrustStat[] = [
  {
    icon: 'Users',
    value: '10,000+',
    label: 'Khách hàng tin tưởng',
  },
  {
    icon: 'Award',
    value: '100%',
    label: 'Sản phẩm chính hãng',
  },
  {
    icon: 'Zap',
    value: '24/7',
    label: 'Hỗ trợ khách hàng',
  },
];

// Helper function to calculate total articles in a category
export function getTotalArticles(category: ProductCategoryData): number {
  let total = 0;
  category.children?.forEach(sub => {
    total += sub.children?.length || 0;
  });
  return total;
}

// Helper function to find category detail by id
export function findCategoryDetail(
  categories: ProductCategoryData[],
  id: string
): CategoryDetail | null {
  for (const category of categories) {
    const found = category.children?.find(sub => sub.id === id);
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
        articles: found.children || [],
      };
    }
  }
  return null;
}

