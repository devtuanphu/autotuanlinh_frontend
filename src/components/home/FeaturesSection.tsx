'use client';

import React from 'react';
import { 
  Shield, 
  Truck, 
  Headphones, 
  Award,
  LucideIcon
} from 'lucide-react';

export interface Feature {
  icon: string | null; // Icon name as string or null
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Shield,
  Truck,
  Headphones,
  Award,
};

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            // Use default icon if icon is null/undefined, or fallback to first available icon
            const iconName = feature.icon || 'Shield';
            const Icon = iconMap[iconName] || Shield; // Fallback to Shield if icon not found
            
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-brand-accent transition-all duration-300 hover:shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-brand-accent" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

