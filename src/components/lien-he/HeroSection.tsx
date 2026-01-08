'use client';

import React from 'react';
import { MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { ContactInfo } from '@/lib/data/lien-he';

interface HeroSectionProps {
  contactInfo: ContactInfo;
  ctaSection?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    primaryButton?: {
      text?: string;
      url?: string;
    };
    secondaryButton?: {
      text?: string;
      url?: string;
    };
  } | null;
}

export default function HeroSection({ contactInfo, ctaSection }: HeroSectionProps) {
  const badge = ctaSection?.badge || 'Liên hệ ngay';
  const title = ctaSection?.title || 'Chúng tôi sẵn sàng';
  const subtitle = ctaSection?.subtitle || 'hỗ trợ bạn';
  const description = ctaSection?.description || 'Liên hệ với chúng tôi để được tư vấn miễn phí và nhận những giải pháp tốt nhất cho nhu cầu của bạn';
  
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 backdrop-blur-sm border border-brand-accent/30 rounded-full mb-8">
            <MessageCircle size={16} className="text-brand-accent" />
            <span className="text-sm font-semibold text-brand-accent uppercase tracking-wider">{badge}</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight text-white">
            {title}
            {subtitle && (
              <>
                <br />
                <span className="bg-gradient-to-r from-brand-accent via-blue-400 to-brand-accent bg-clip-text text-transparent">
                  {subtitle}
                </span>
              </>
            )}
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-12 max-w-2xl">
            {description}
          </p>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {ctaSection?.primaryButton?.url ? (
              <a
                href={ctaSection.primaryButton.url}
                className="group flex items-center gap-3 px-6 py-4 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Phone size={22} />
                <span>{ctaSection.primaryButton.text || 'Gọi ngay'}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <a
                href={`tel:${contactInfo.hotline.replace(/\s/g, '')}`}
                className="group flex items-center gap-3 px-6 py-4 bg-brand-accent hover:bg-brand-accent-dark text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Phone size={22} />
                <span>Gọi ngay: {contactInfo.hotline}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            )}
            {ctaSection?.secondaryButton?.url ? (
              <a
                href={ctaSection.secondaryButton.url}
                className="group flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-lg transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <Mail size={22} />
                <span>{ctaSection.secondaryButton.text || 'Gửi email'}</span>
              </a>
            ) : (
              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-lg transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <Mail size={22} />
                <span>Gửi email</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

