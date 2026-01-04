export interface Category {
  id: string;
  name: string;
  count: number;
}

export const tinTucCategories: Category[] = [
  { id: 'all', name: 'Tất cả', count: 0 }, // Will be calculated dynamically
  { id: 'Xu hướng', name: 'Xu hướng', count: 0 },
  { id: 'Hướng dẫn', name: 'Hướng dẫn', count: 0 },
  { id: 'Đánh giá', name: 'Đánh giá', count: 0 },
  { id: 'Bảo dưỡng', name: 'Bảo dưỡng', count: 0 },
  { id: 'Dịch vụ', name: 'Dịch vụ', count: 0 },
];

export const ITEMS_PER_PAGE = 8;

