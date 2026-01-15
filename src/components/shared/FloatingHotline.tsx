'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchStrapi } from '@/lib/api/strapi';

interface ContactInfo {
  phone_chu_tich: string;
  phone_giam_doc: string;
  phone_zalo: string;
  link_messenger: string;
}

const FloatingHotline = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await fetchStrapi<ContactInfo>('/thong-tin-lien-he');
        
        if (data) {
          setContactInfo(data);
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error);
        // Fallback to default values
        setContactInfo({
          phone_chu_tich: '0901234567',
          phone_giam_doc: '0907654321',
          phone_zalo: '0901234567',
          link_messenger: 'https://m.me/autotuanlinh'
        });
      }
    };

    fetchContactInfo();
  }, []);

  if (!contactInfo) {
    return null; // or loading state
  }

  const contacts = [
    {
      id: 'ceo',
      name: 'Chủ tịch',
      phone: contactInfo.phone_chu_tich,
      icon: '/icons/phone.png',
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      type: 'phone'
    },
    {
      id: 'director',
      name: 'Giám đốc',
      phone: contactInfo.phone_giam_doc,
      icon: '/icons/phone.png',
      gradient: 'from-green-500 via-green-600 to-green-700',
      type: 'phone'
    },
    {
      id: 'messenger',
      name: 'Messenger',
      link: contactInfo.link_messenger,
      icon: '/icons/messenger.png',
      gradient: 'from-[#0084FF] via-[#0073E6] to-[#0062CC]',
      type: 'messenger'
    },
    {
      id: 'zalo',
      name: 'Zalo',
      phone: contactInfo.phone_zalo,
      link: `https://zalo.me/${contactInfo.phone_zalo}`,
      icon: '/icons/zalo.png',
      gradient: 'from-[#0068FF] via-[#0057E6] to-[#0046CC]',
      type: 'zalo'
    }
  ];

  const handleContact = (contact: typeof contacts[0]) => {
    if (contact.type === 'phone') {
      window.location.href = `tel:${contact.phone}`;
    } else if (contact.link) {
      window.open(contact.link, '_blank');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3 md:gap-4">
      {contacts.map((contact, index) => (
        <button
          key={contact.id}
          onClick={() => handleContact(contact)}
          className={`
            relative group
            bg-gradient-to-br ${contact.gradient}
            text-white
            opacity-100

            /* Mobile: Circle button only */
            w-14 h-14
            p-0

            /* Desktop: Full button with text */
            md:w-auto
            md:pl-6 md:pr-20 md:py-4

            rounded-full
            transition-all duration-500 ease-out
            flex items-center justify-center
            md:justify-start
            md:gap-4
            hover:scale-105
            md:hover:pr-24
            active:scale-95
            animate-fade-in
            isolate
          `}
          style={{
            animationDelay: `${index * 150}ms`,
            animationFillMode: 'both'
          }}
          title={contact.type === 'phone' ? `Gọi ${contact.name}: ${contact.phone}` : `Liên hệ qua ${contact.name}`}
        >
          {/* Text Label - Hidden on mobile */}
          <span className="hidden md:block font-bold text-base tracking-wide">
            {contact.name}
          </span>

          {/* Icon Container */}
          <div className={`
            /* Mobile: Centered in circle */
            relative
            w-7 h-7

            /* Desktop: Floating on the right */
            md:absolute md:right-3 md:top-1/2 md:-translate-y-1/2
            md:w-14 md:h-14
            md:bg-white/30
            md:rounded-full
            flex items-center justify-center
            md:border-2 md:border-white/40
            transition-all duration-500
            group-hover:scale-110 md:group-hover:rotate-12
            md:group-hover:bg-white/40
            group-active:scale-95
          `}>
            <div className="relative w-7 h-7">
              <Image
                src={contact.icon}
                alt={contact.name}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Shine Effect - Desktop only */}
          <div className="
            hidden md:block
            absolute inset-0
            rounded-full
           
            translate-x-[-200%]
            group-hover:translate-x-[200%]
            transition-transform duration-1000
            pointer-events-none
          " />
        </button>
      ))}
    </div>
  );
};

export default FloatingHotline;
