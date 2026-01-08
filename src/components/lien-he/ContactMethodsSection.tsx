'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactInfo } from '@/lib/data/lien-he';

interface ContactMethodsSectionProps {
  contactInfo: ContactInfo;
  contactInfoCards?: Array<{
    title?: string | null;
    value?: string | null;
    description?: string | null;
    url?: string | null;
    icon?: string | null;
    badge?: {
      text?: string | null;
      icon?: string | null;
    } | null;
  }> | null;
}

const iconColors = [
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
  'from-yellow-500 to-amber-500',
];

export default function ContactMethodsSection({ contactInfo, contactInfoCards }: ContactMethodsSectionProps) {
  // Use contactInfoCards from API if available, otherwise use contactInfo
  const cards = contactInfoCards && contactInfoCards.length > 0
    ? contactInfoCards.map((card, index) => ({
        title: card.title || '',
        value: card.value || '',
        description: card.description || '',
        url: card.url || '#',
        iconColor: iconColors[index % iconColors.length],
      }))
    : [
        {
          title: 'Hotline',
          value: contactInfo.hotline,
          description: 'Hỗ trợ 24/7',
          url: `tel:${contactInfo.hotline.replace(/\s/g, '')}`,
          iconColor: 'from-blue-500 to-cyan-500',
        },
        {
          title: 'Email',
          value: contactInfo.email,
          description: 'Phản hồi trong 24h',
          url: `mailto:${contactInfo.email}`,
          iconColor: 'from-green-500 to-emerald-500',
        },
        {
          title: 'Địa chỉ',
          value: contactInfo.address,
          description: 'Mở cửa hàng ngày',
          url: '#',
          iconColor: 'from-purple-500 to-pink-500',
        },
      ];

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('hotline') || lowerTitle.includes('điện thoại') || lowerTitle.includes('phone')) return Phone;
    if (lowerTitle.includes('email') || lowerTitle.includes('mail')) return Mail;
    if (lowerTitle.includes('địa chỉ') || lowerTitle.includes('address') || lowerTitle.includes('map')) return MapPin;
    return Phone; // default
  };

  return (
    <section className="py-24 bg-white relative -mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`grid grid-cols-1 ${cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 max-w-7xl mx-auto`}>
          {cards.map((card, index) => {
            const Icon = getIcon(card.title);
            const isLink = card.url && card.url !== '#';
            
            return (
              <div key={index} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.iconColor} rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300`}></div>
                <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.iconColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  {isLink ? (
                    <a href={card.url} className={`${card.title === 'Email' ? 'text-lg' : 'text-3xl'} font-black text-brand-accent hover:text-brand-accent-dark transition-colors block mb-3 ${card.title === 'Email' ? 'break-all' : ''}`}>
                      {card.value}
                    </a>
                  ) : (
                    <p className={`${card.title === 'Email' ? 'text-lg' : 'text-3xl'} font-black text-gray-900 mb-3 ${card.title === 'Email' ? 'break-all' : ''}`}>
                      {card.value}
                    </p>
                  )}
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{card.title === 'Hotline' ? 'Luôn sẵn sàng' : card.title === 'Email' ? 'Phản hồi nhanh' : 'Tất cả các ngày'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

