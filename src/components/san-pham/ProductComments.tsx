'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Star, Send, User, Calendar, ThumbsUp, MessageSquare } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  email: string;
  rating: number;
  content: string;
  date: string;
  helpful: number;
  verified?: boolean;
}

interface ProductCommentsProps {
  productId: string;
  productName: string;
  initialComments?: Comment[];
}

export default function ProductComments({ 
  productId, 
  productName,
  initialComments = [] 
}: ProductCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    content: '',
  });
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [helpfulComments, setHelpfulComments] = useState<Set<string>>(new Set());

  // Generate mock comments if none provided
  // Use deterministic values to avoid hydration issues
  const generateMockComments = useCallback((): Comment[] => {
    const mockNames = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'];
    const mockComments = [
      'Sản phẩm rất tốt, chất lượng cao, đúng như mô tả. Tôi rất hài lòng với sản phẩm này.',
      'Giao hàng nhanh, đóng gói cẩn thận. Sản phẩm đẹp và bền. Sẽ mua lại lần sau.',
      'Tuyệt vời! Sản phẩm vượt quá mong đợi. Giá cả hợp lý, chất lượng tốt.',
      'Rất hài lòng với dịch vụ và sản phẩm. Nhân viên tư vấn nhiệt tình.',
      'Sản phẩm tốt, nhưng cần cải thiện thêm về bao bì đóng gói.',
    ];

    // Use productId as seed for deterministic generation
    const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Format date consistently using a fixed base date to avoid timezone issues
    const formatDate = (daysAgo: number) => {
      // Use a fixed base date (2024-01-01) to ensure consistency
      const baseDate = new Date('2024-01-01T00:00:00Z');
      baseDate.setDate(baseDate.getDate() - daysAgo);
      // Use consistent format: DD/MM/YYYY
      const day = String(baseDate.getUTCDate()).padStart(2, '0');
      const month = String(baseDate.getUTCMonth() + 1).padStart(2, '0');
      const year = baseDate.getUTCFullYear();
      return `${day}/${month}/${year}`;
    };

    return Array.from({ length: 8 }, (_, i) => {
      // Deterministic rating: 4 or 5 based on index and seed
      const ratingSeed = (seed + i * 7) % 2;
      const rating = 4 + ratingSeed; // 4 or 5
      
      // Deterministic helpful count
      const helpfulSeed = (seed + i * 11) % 20;
      const helpful = 1 + helpfulSeed; // 1-20
      
      // Deterministic verified status
      const verifiedSeed = (seed + i * 13) % 2;
      const verified = verifiedSeed === 0;

      return {
        id: `comment-${productId}-${i + 1}`,
        name: mockNames[i % mockNames.length],
        email: `user${i + 1}@example.com`,
        rating,
        content: mockComments[i % mockComments.length],
        date: formatDate(i), // Days ago
        helpful,
        verified,
      };
    });
  }, [productId]);

  // Use useMemo to ensure consistent generation between server and client
  // generateMockComments already depends on productId via useCallback
  const allComments = useMemo(() => {
    return comments.length > 0 ? comments : generateMockComments();
  }, [comments, generateMockComments]);
  
  const filteredComments = useMemo(() => {
    return filterRating 
      ? allComments.filter(c => c.rating === filterRating)
      : allComments;
  }, [allComments, filterRating]);

  // Calculate average rating consistently to avoid floating point issues
  const averageRating = useMemo(() => {
    if (allComments.length === 0) return 0;
    const sum = allComments.reduce((acc, c) => acc + c.rating, 0);
    // Use integer arithmetic to avoid floating point precision issues
    const avg = Math.round((sum / allComments.length) * 10) / 10;
    return avg;
  }, [allComments]);

  // Calculate rating distribution consistently
  const ratingDistribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map(rating => {
      const count = allComments.filter(c => c.rating === rating).length;
      const percentage = allComments.length > 0
        ? Math.round((count / allComments.length) * 1000) / 10 // Round to 1 decimal
        : 0;
      return {
        rating,
        count,
        percentage,
      };
    });
  }, [allComments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      rating: formData.rating,
      content: formData.content,
      date: new Date().toLocaleDateString('vi-VN'),
      helpful: 0,
      verified: false,
    };
    setComments([newComment, ...comments]);
    setFormData({ name: '', email: '', rating: 5, content: '' });
    setShowForm(false);
  };

  const handleHelpful = (commentId: string) => {
    setHelpfulComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <div className="border-t border-gray-200 pt-12 mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Đánh giá sản phẩm</h2>
        <p className="text-gray-600">Chia sẻ trải nghiệm của bạn về {productName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-brand-accent mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : i === Math.floor(averageRating) && averageRating % 1 >= 0.5
                        ? 'text-yellow-400 fill-yellow-400/50'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Dựa trên {allComments.length} đánh giá
              </p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all ${
                    filterRating === rating
                      ? 'bg-brand-accent/10 border-2 border-brand-accent'
                      : 'bg-white border border-gray-200 hover:border-brand-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-1 min-w-[60px]">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 min-w-[40px] text-right">
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="lg:col-span-2">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full mb-6 bg-brand-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} />
              Viết đánh giá
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Viết đánh giá của bạn</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên của bạn *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      placeholder="Nhập tên của bạn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đánh giá *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating })}
                        className="focus:outline-none"
                      >
                        <Star
                          size={32}
                          className={
                            rating <= formData.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {formData.rating} sao
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung đánh giá *
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="bg-brand-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-accent/90 transition-colors flex items-center gap-2"
                  >
                    <Send size={18} />
                    Gửi đánh giá
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ name: '', email: '', rating: 5, content: '' });
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="space-y-6">
            {filteredComments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Chưa có đánh giá nào.</p>
              </div>
            ) : (
              filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center">
                        <User size={24} className="text-brand-accent" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                          {comment.verified && (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Đã xác thực
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < comment.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {comment.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">{comment.content}</p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleHelpful(comment.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        helpfulComments.has(comment.id)
                          ? 'bg-brand-accent/10 text-brand-accent'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <ThumbsUp size={16} />
                      <span className="text-sm font-medium">
                        Hữu ích ({comment.helpful + (helpfulComments.has(comment.id) ? 1 : 0)})
                      </span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


