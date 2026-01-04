'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface ProductDescriptionProps {
  description: string;
  specifications: Array<{ label: string; value: string }>;
}

export default function ProductDescription({ description, specifications }: ProductDescriptionProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      {description && (
        <div className="prose max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-gray-700 leading-relaxed"
          />
        </div>
      )}

      {/* Specifications */}
      {specifications.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông số kỹ thuật</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <Check size={18} className="text-brand-accent flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-gray-600 text-sm">{spec.label}:</span>
                  <span className="ml-2 font-medium text-gray-900">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



