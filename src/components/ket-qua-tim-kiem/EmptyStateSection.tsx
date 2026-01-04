'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface EmptyStateSectionProps {
  searchQuery: string;
}

export default function EmptyStateSection({ searchQuery }: EmptyStateSectionProps) {
  const suggestions = ['phim cách nhiệt', 'camera hành trình', 'bọc ghế da'];

  return (
    <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-200">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search size={40} className="text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Không tìm thấy kết quả</h3>
      <p className="text-gray-600 mb-6">
        {searchQuery 
          ? `Không có kết quả nào cho từ khóa "${searchQuery}". Hãy thử với từ khóa khác.`
          : 'Vui lòng nhập từ khóa để tìm kiếm.'
        }
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm text-gray-500">Gợi ý:</span>
        {suggestions.map((suggestion) => (
          <Link
            key={suggestion}
            href={`/ket-qua-tim-kiem/${encodeURIComponent(suggestion)}`}
            className="px-4 py-2 bg-gray-100 hover:bg-brand-accent hover:text-white text-gray-700 rounded-xl font-semibold text-sm transition-all duration-200"
          >
            {suggestion}
          </Link>
        ))}
      </div>
    </div>
  );
}

