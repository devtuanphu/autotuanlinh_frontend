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

export interface ServiceItem {
  name: string;
  href: string;
}

export interface ServiceSubCategory {
  id: string;
  name: string;
  children?: ServiceItem[];
}

export interface ServiceCategoryData {
  id: string;
  name: string;
  href: string;
  children?: ServiceSubCategory[];
}

export interface ServiceCategoryDetail {
  parentCategory: {
    id: string;
    name: string;
    href: string;
  };
  subCategory: {
    id: string;
    name: string;
  };
  services: ServiceItem[];
}

export const dichVuBenefits: Benefit[] = [
  {
    icon: 'Shield',
    title: 'Chất lượng cao',
    description: 'Sử dụng vật liệu và thiết bị chính hãng, đảm bảo độ bền và hiệu quả',
  },
  {
    icon: 'Award',
    title: 'Chuyên nghiệp',
    description: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm, tay nghề cao',
  },
  {
    icon: 'CheckCircle',
    title: 'Bảo hành',
    description: 'Chế độ bảo hành rõ ràng, hỗ trợ khách hàng tận tâm',
  },
  {
    icon: 'TrendingUp',
    title: 'Giá tốt',
    description: 'Giá cả hợp lý, cạnh tranh nhất thị trường',
  },
];

export const dichVuTrustStats: TrustStat[] = [
  {
    icon: 'Users',
    value: '10,000+',
    label: 'Khách hàng tin tưởng',
  },
  {
    icon: 'Award',
    value: '100%',
    label: 'Chất lượng đảm bảo',
  },
  {
    icon: 'Zap',
    value: '24/7',
    label: 'Hỗ trợ khách hàng',
  },
];

// Helper function to find service category detail by id
export function findServiceCategoryDetail(
  categories: ServiceCategoryData[],
  id: string
): ServiceCategoryDetail | null {
  const currentPath = `/dich-vu/${id}`;

  // Tìm subCategory theo id
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
        services: found.children || [],
      };
    }
  }

  // Nếu không tìm thấy subCategory, tìm item theo href và lấy subCategory chứa item đó
  for (const category of categories) {
    for (const sub of category.children || []) {
      const foundItem = sub.children?.find(item => item.href === currentPath);
      if (foundItem) {
        return {
          parentCategory: {
            id: category.id,
            name: category.name,
            href: category.href,
          },
          subCategory: {
            id: sub.id,
            name: sub.name,
          },
          services: sub.children || [],
        };
      }
    }
  }

  return null;
}
