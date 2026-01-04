'use client';

import React from 'react';
import ArticleCard from '@/components/shared/ArticleCard';
import { ArticleItem } from '@/lib/data/danh-muc-bai-viet-san-pham';

interface ArticlesGridSectionProps {
  articles: ArticleItem[];
  subCategoryName: string;
  subCategoryId: string;
}

export default function ArticlesGridSection({ articles, subCategoryName, subCategoryId }: ArticlesGridSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {articles.map((article, index) => {
        // Tạo date cố định dựa trên index và subCategory id để tránh hydration error
        const dateSeed = (subCategoryId.charCodeAt(0) || 0) + (index * 7);
        const daysAgo = (dateSeed % 30) + 1; // 1-30 ngày trước
        const publishedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
        
        // Tạo readTime cố định dựa trên index
        const readTime = ((dateSeed % 10) + 5); // 5-14 phút

        // Tạo hashtags dựa trên tên bài viết và category
        const generateHashtags = (articleName: string, categoryName: string) => {
          const tags: string[] = [];
          
          // Thêm tag từ category
          if (categoryName) {
            tags.push(categoryName.toLowerCase().replace(/\s+/g, ''));
          }
          
          // Thêm tag từ tên bài viết (lấy 2-3 từ đầu)
          const words = articleName.toLowerCase().split(/\s+/).slice(0, 2);
          words.forEach(word => {
            const cleanWord = word.replace(/[^a-z0-9]/g, '');
            if (cleanWord.length > 2 && !tags.includes(cleanWord)) {
              tags.push(cleanWord);
            }
          });
          
          // Thêm tag chung
          tags.push('phukienoto', 'autotuanlinh');
          
          return tags.slice(0, 4); // Giới hạn 4 tags
        };

        const hashtags = generateHashtags(article.name, subCategoryName);

        return (
          <ArticleCard
            key={index}
            id={`article-${index}`}
            title={article.name}
            excerpt={`Tìm hiểu chi tiết về ${article.name.toLowerCase()} - Thông tin đầy đủ, hướng dẫn sử dụng và đánh giá chuyên nghiệp từ các chuyên gia Auto Tuan Linh.`}
            image={`https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop&sig=${index + subCategoryId}`}
            href={article.href}
            publishedAt={publishedAt}
            readTime={readTime}
            category={subCategoryName}
            author="Auto Tuan Linh"
            hashtags={hashtags}
          />
        );
      })}
    </div>
  );
}

