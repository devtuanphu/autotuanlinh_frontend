'use client';

import React from 'react';
import ArticleListLayout from '@/components/shared/ArticleListLayout';

export default function NotFoundSection() {
  return (
    <ArticleListLayout
      title="Không tìm thấy danh mục"
      description="Danh mục bạn đang tìm kiếm không tồn tại."
      showBreadcrumb={true}
      breadcrumbs={[
        { name: 'Danh mục bài viết', href: '/danh-muc-bai-viet-san-pham' },
      ]}
      bannerImage="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop"
    >
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg mb-4">Vui lòng quay lại trang danh mục.</p>
      </div>
    </ArticleListLayout>
  );
}

