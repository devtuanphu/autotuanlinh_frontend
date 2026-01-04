'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

interface NewsletterSectionProps {
  title?: string;
  description?: string;
}

export default function NewsletterSection({
  title = 'Đăng ký nhận tin',
  description = 'Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và mẹo chăm sóc xe hữu ích',
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Integrate with API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');
    
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-dark to-brand-dark/95">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent/20 rounded-2xl mb-6">
            <Mail size={32} className="text-brand-accent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8">
            {description}
          </p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  required
                  className="w-full px-6 py-4 pr-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-brand-accent transition-all"
                />
                <Mail size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="px-8 py-4 bg-brand-accent text-white rounded-xl font-bold hover:bg-brand-accent-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isSuccess ? (
                  <>
                    <CheckCircle size={20} />
                    Đã đăng ký!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {isSubmitting ? 'Đang gửi...' : 'Đăng ký'}
                  </>
                )}
              </button>
            </div>
            {isSuccess && (
              <p className="mt-4 text-green-400 text-sm">
                Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi email cho bạn sớm nhất.
              </p>
            )}
          </form>

          <p className="mt-6 text-sm text-gray-400">
            Chúng tôi cam kết bảo vệ thông tin của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.
          </p>
        </div>
      </div>
    </section>
  );
}

