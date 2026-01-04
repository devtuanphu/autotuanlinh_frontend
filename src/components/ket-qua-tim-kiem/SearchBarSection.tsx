'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarSectionProps {
  searchQuery: string;
}

export default function SearchBarSection({ searchQuery }: SearchBarSectionProps) {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-4 sm:p-6">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const query = (formData.get('search') as string) || '';
            if (query.trim()) {
              window.location.href = `/ket-qua-tim-kiem/${encodeURIComponent(query.trim())}`;
            }
          }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Tìm kiếm sản phẩm, bài viết, dịch vụ..."
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:outline-none text-gray-900 font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Tìm kiếm
          </button>
        </form>
      </div>
    </div>
  );
}

