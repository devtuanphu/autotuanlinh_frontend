'use client';

import React, { useState } from 'react';
import { FileText, User, Phone, Mail, Send, CheckCircle, AlertCircle, ArrowRight, ChevronDown, Clock, Calendar, Globe, Facebook, Instagram, Youtube, MessageCircle, LucideIcon } from 'lucide-react';
import { ContactInfo, SocialLink } from '@/lib/data/lien-he';

interface ContactFormSectionProps {
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
}

const socialIconMap: Record<string, LucideIcon> = {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
};

export default function ContactFormSection({ contactInfo, socialLinks }: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // TODO: Integrate with API
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div>
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 rounded-full mb-6">
                <FileText size={16} className="text-brand-accent" />
                <span className="text-sm font-bold text-brand-accent uppercase tracking-wider">Gửi tin nhắn</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                Liên hệ với chúng tôi
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <div className="relative">
                    <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                  Chủ đề *
                </label>
                <div className="relative">
                  <FileText size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:outline-none transition-all duration-200 text-gray-900 bg-white hover:border-gray-300 appearance-none"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="tu-van">Tư vấn sản phẩm</option>
                    <option value="dich-vu">Tư vấn dịch vụ</option>
                    <option value="bao-hanh">Bảo hành</option>
                    <option value="khac">Khác</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  Nội dung tin nhắn *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:outline-none transition-all duration-200 text-gray-900 resize-none placeholder-gray-400 hover:border-gray-300"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5 flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-bold text-lg mb-1">Gửi thành công!</p>
                    <p className="text-green-700">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-5 flex items-start gap-3">
                  <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-bold text-lg mb-1">Có lỗi xảy ra</p>
                    <p className="text-red-700">Vui lòng thử lại sau hoặc liên hệ trực tiếp qua hotline.</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:from-brand-accent-dark hover:to-brand-accent text-white rounded-xl font-black text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send size={22} className="group-hover:translate-x-1 transition-transform" />
                    <span>Gửi tin nhắn</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map & Info Sidebar */}
          <div className="space-y-8">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100">
              <div className="relative h-[450px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.319257590283!2d106.6296558!3d10.8230989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529439e9b9f9f%3A0x1b5c8e8e8e8e8e8e!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Giờ làm việc</h3>
                  <p className="text-gray-400 text-sm">Chúng tôi luôn sẵn sàng</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="flex items-center gap-4">
                    <Calendar size={20} className="text-brand-accent" />
                    <div>
                      <span className="font-bold block">Thứ 2 - Thứ 6</span>
                      <span className="text-sm text-gray-400">Ngày làm việc</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-brand-accent">{contactInfo.workingHours.weekdays}</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="flex items-center gap-4">
                    <Calendar size={20} className="text-brand-accent" />
                    <div>
                      <span className="font-bold block">Thứ 7 - Chủ nhật</span>
                      <span className="text-sm text-gray-400">Cuối tuần</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-brand-accent">{contactInfo.workingHours.weekends}</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <Globe size={24} className="text-brand-accent" />
                Kết nối với chúng tôi
              </h3>
              <p className="text-gray-600 mb-6">Theo dõi để cập nhật tin tức và ưu đãi mới nhất</p>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  if (!Icon) return null;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-5 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col items-center justify-center gap-2 group`}
                    >
                      <Icon size={28} className="group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-sm">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

