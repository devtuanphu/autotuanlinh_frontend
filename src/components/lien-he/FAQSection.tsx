'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ } from '@/lib/data/lien-he';

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({ faqs, title, subtitle }: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const displayTitle = title || 'Bạn có thắc mắc?';
  const displaySubtitle = subtitle || 'Tìm câu trả lời cho những câu hỏi phổ biến nhất';

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 rounded-full mb-6">
              <HelpCircle size={16} className="text-brand-accent" />
              <span className="text-sm font-bold text-brand-accent uppercase tracking-wider">Câu hỏi thường gặp</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
              {displayTitle}
            </h2>
            <p className="text-xl text-gray-600">
              {displaySubtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-200 hover:border-brand-accent/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
                >
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-accent transition-colors flex-1">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={`text-gray-400 group-hover:text-brand-accent transition-all duration-300 flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-0">
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

