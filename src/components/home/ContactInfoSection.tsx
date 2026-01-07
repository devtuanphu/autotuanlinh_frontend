'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageSquare, LucideIcon } from 'lucide-react';

export interface ContactInfo {
  icon: string | null; // Icon name as string or null
  title: string;
  content: string;
  link?: string;
  linkText?: string;
}

interface ContactInfoSectionProps {
  title?: string;
  subtitle?: string;
  contactInfos: ContactInfo[];
}

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
};

export default function ContactInfoSection({ title, subtitle, contactInfos }: ContactInfoSectionProps) {
  const defaultTitle = 'Liên hệ với chúng tôi';
  const defaultSubtitle = 'Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn';
  
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {title || defaultTitle}
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {contactInfos.map((info, index) => {
            // Use default icon if icon is null/undefined, or fallback to first available icon
            const iconName = info.icon || 'MapPin';
            const Icon = iconMap[iconName] || MapPin; // Fallback to MapPin if icon not found

            const content = (
              <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border-2 border-gray-100 hover:border-brand-accent transition-all duration-300 hover:shadow-xl h-full">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-300">
                  <Icon size={32} className="text-brand-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-accent transition-colors">
                  {info.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {info.content}
                </p>
                {info.link && info.linkText && (
                  <Link
                    href={info.link}
                    className="inline-flex items-center gap-2 text-brand-accent font-bold hover:gap-3 transition-all"
                  >
                    {info.linkText}
                  </Link>
                )}
              </div>
            );

            return <div key={index}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

