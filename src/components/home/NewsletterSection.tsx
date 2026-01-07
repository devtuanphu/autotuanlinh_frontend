'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/api/strapi';

interface NewsletterSectionProps {
  title?: string;
  subtitle?: string;
  description?: string; // Keep for backward compatibility
  buttonText?: string;
  privacyText?: string;
  icon?: string | null;
}

export default function NewsletterSection({
  title = 'Đăng ký nhận tin',
  subtitle,
  description,
  buttonText = 'Đăng ký',
  privacyText,
  icon,
}: NewsletterSectionProps) {
  const defaultDescription = 'Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và mẹo chăm sóc xe hữu ích';
  const defaultPrivacyText = 'Chúng tôi cam kết bảo vệ thông tin của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.';
  
  const finalDescription = subtitle || description || defaultDescription;
  const finalPrivacyText = privacyText || defaultPrivacyText;
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const result = await subscribeNewsletter(email);
      
      if (result.success) {
        setIsSuccess(true);
        setEmail('');
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(result.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
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
            {finalDescription}
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
                    {isSubmitting ? 'Đang gửi...' : buttonText}
                  </>
                )}
              </button>
            </div>
            {isSuccess && (
              <p className="mt-4 text-green-400 text-sm flex items-center justify-center gap-2">
                <CheckCircle size={16} />
                Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi email cho bạn sớm nhất.
              </p>
            )}
            {error && (
              <p className="mt-4 text-red-400 text-sm flex items-center justify-center gap-2">
                <AlertCircle size={16} />
                {error}
              </p>
            )}
          </form>

          <p className="mt-6 text-sm text-gray-400 whitespace-pre-line">
            {finalPrivacyText}
          </p>
        </div>
      </div>
    </section>
  );
}

