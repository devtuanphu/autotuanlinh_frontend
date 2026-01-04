'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function PaginationSection({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}: PaginationSectionProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="mt-12 flex flex-col items-center gap-6">
      <div className="text-sm text-gray-600">
        Hiển thị <span className="font-bold text-brand-accent">{startIndex + 1}</span> -{' '}
        <span className="font-bold text-brand-accent">{Math.min(endIndex, totalItems)}</span> trong tổng số{' '}
        <span className="font-bold text-gray-900">{totalItems}</span> kết quả
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-brand-accent hover:text-white border-2 border-gray-200 hover:border-brand-accent shadow-sm hover:shadow-lg'
          }`}
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Trước</span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[40px] sm:min-w-[48px] h-10 sm:h-12 px-3 sm:px-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 ${
                  currentPage === pageNum
                    ? 'bg-brand-accent text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-brand-accent/50 shadow-sm hover:shadow-md'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-brand-accent hover:text-white border-2 border-gray-200 hover:border-brand-accent shadow-sm hover:shadow-lg'
          }`}
        >
          <span className="hidden sm:inline">Sau</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

