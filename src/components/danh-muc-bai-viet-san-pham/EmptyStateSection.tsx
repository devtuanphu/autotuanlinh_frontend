'use client';

import React from 'react';
import { FileText } from 'lucide-react';

export default function EmptyStateSection() {
  return (
    <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-200">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileText size={40} className="text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Chưa có bài viết</h3>
      <p className="text-gray-600 mb-6">Danh mục này hiện chưa có bài viết nào.</p>
      <p className="text-gray-500 text-sm">Vui lòng quay lại sau.</p>
    </div>
  );
}

