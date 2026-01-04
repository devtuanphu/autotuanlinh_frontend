'use client';

import React from 'react';
import { Users, Award, ShoppingBag, Star, LucideIcon } from 'lucide-react';

export interface Statistic {
  icon: string;
  value: string;
  label: string;
}

interface StatisticsSectionProps {
  statistics: Statistic[];
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Users,
  Award,
  ShoppingBag,
  Star,
};

export default function StatisticsSection({ statistics }: StatisticsSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-dark to-brand-dark/95">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statistics.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            if (!Icon) return null;

            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-brand-accent/50 transition-all duration-500 hover:scale-105 text-center"
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-brand-accent/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <Icon size={24} className="lg:w-8 lg:h-8 text-brand-accent" />
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mb-1 lg:mb-2">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

