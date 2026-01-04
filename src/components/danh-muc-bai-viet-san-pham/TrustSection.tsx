'use client';

import React from 'react';
import { Users, Award, Zap, LucideIcon } from 'lucide-react';
import { TrustStat } from '@/lib/data/danh-muc-bai-viet-san-pham';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Users,
  Award,
  Zap,
};

interface TrustSectionProps {
  stats: TrustStat[];
}

export default function TrustSection({ stats }: TrustSectionProps) {
  return (
    <div className="mt-16 bg-gradient-to-br from-brand-dark to-brand-dark/95 rounded-2xl p-10 lg:p-12 border border-brand-accent/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon];
          if (!Icon) return null;

          return (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent/20 rounded-xl mb-4">
                <Icon size={32} className="text-brand-accent" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

