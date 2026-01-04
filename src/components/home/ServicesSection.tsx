'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Film, Settings, Music, Sparkles, LucideIcon } from 'lucide-react';

export interface Service {
  icon: string;
  title: string;
  description: string;
  image: string;
  href: string;
  features: string[];
}

interface ServicesSectionProps {
  services: Service[];
}

const iconMap: Record<string, LucideIcon> = {
  Film,
  Settings,
  Music,
  Sparkles,
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Dịch vụ <span className="text-brand-accent">chuyên nghiệp</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ chăm sóc và nâng cấp xe chuyên nghiệp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            if (!Icon) return null;

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-brand-accent transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-brand-accent/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-brand-accent font-bold hover:gap-3 transition-all"
                  >
                    Xem chi tiết
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

