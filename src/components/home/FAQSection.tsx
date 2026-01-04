'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent/10 rounded-2xl mb-6">
            <HelpCircle size={32} className="text-brand-accent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Câu hỏi <span className="text-brand-accent">thường gặp</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Giải đáp những thắc mắc phổ biến của khách hàng
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl lg:rounded-2xl border-2 border-gray-100 hover:border-brand-accent/50 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 lg:p-8 text-left flex items-center justify-between gap-4 group"
                >
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-brand-accent transition-colors flex-1">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={`text-gray-500 group-hover:text-brand-accent transition-all duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 lg:px-8 pb-6 lg:pb-8 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

