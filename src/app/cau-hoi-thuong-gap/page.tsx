'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  Phone, 
  Mail, 
  HelpCircle, 
  ShieldCheck, 
  Package, 
  Wrench,
  Clock
} from 'lucide-react';
import Link from 'next/link';

// Mock FAQ Data
const FAQ_CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: HelpCircle },
  { id: 'order', name: 'Đơn hàng & Thanh toán', icon: Package },
  { id: 'service', name: 'Dịch vụ & Kỹ thuật', icon: Wrench },
  { id: 'warranty', name: 'Bảo hành & Đổi trả', icon: ShieldCheck },
  { id: 'general', name: 'Thông tin chung', icon: Clock },
];

const FAQS = [
  {
    id: 1,
    category: 'order',
    question: 'Làm thế nào để tôi đặt hàng phụ kiện tại Auto Tuấn Linh?',
    answer: 'Bạn có thể đặt hàng trực tiếp qua website autotuanlinh.vn bằng cách chọn sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán. Hoặc liên hệ hotline 09xx.xxx.xxx để đặt hàng nhanh qua Zalo/Điện thoại.'
  },
  {
    id: 2,
    category: 'order',
    question: 'Auto Tuấn Linh hỗ trợ các hình thức thanh toán nào?',
    answer: 'Chúng tôi hỗ trợ thanh toán chuyển khoản ngân hàng, thanh toán khi nhận hàng (COD), và thanh toán trực tiếp tại cửa hàng.'
  },
  {
    id: 3,
    category: 'service',
    question: 'Bọc ghế da ô tô mất bao lâu thời gian?',
    answer: 'Thời gian bọc ghế da thường mất từ 4 - 8 tiếng tùy thuộc vào dòng xe và mẫu mã bạn chọn. Để tiết kiệm thời gian, bạn có thể đặt lịch trước để chúng tôi chuẩn bị sẵn sàng.'
  },
  {
    id: 4,
    category: 'warranty',
    question: 'Chính sách bảo hành sản phẩm tại đây như thế nào?',
    answer: 'Tất cả sản phẩm và dịch vụ tại Auto Tuấn Linh đều được bảo hành từ 12 - 36 tháng tùy loại. Chúng tôi cam kết bảo hành điện tử nhanh chóng, không rườm rà.'
  },
  {
    id: 5,
    category: 'service',
    question: 'Tôi có thể lắp đặt đồ chơi xe hơi tại nhà không?',
    answer: 'Auto Tuấn Linh có đội ngũ kỹ thuật hỗ trợ lắp đặt tận nơi cho các khu vực nội thành. Đối với các hạng mục phức tạp cần cầu nâng hoặc máy móc chuyên dụng, chúng tôi khuyến khích khách hàng mang xe đến trung tâm.'
  },
  {
    id: 6,
    category: 'general',
    question: 'Địa chỉ của trung tâm Auto Tuấn Linh ở đâu?',
    answer: 'Chúng tôi tọa lạc tại [Địa chỉ của bạn], TP. HCM. Giờ làm việc: 8:00 - 18:00 tất cả các ngày trong tuần.'
  },
  {
    id: 7,
    category: 'warranty',
    question: 'Quy trình đổi trả sản phẩm lỗi diễn ra như thế nào?',
    answer: 'Nếu sản phẩm bị lỗi do nhà sản xuất, bạn có thể đổi mới hoàn toàn trong vòng 7 ngày đầu tiên. Vui lòng mang theo hóa đơn hoặc số điện thoại mua hàng để được hỗ trợ.'
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="relative bg-zinc-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/20 to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Câu Hỏi <span className="text-brand-accent">Thường Gặp</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Chúng tôi tổng hợp những thắc mắc phổ biến nhất của khách hàng để giúp bạn có trải nghiệm dịch vụ nhanh chóng và thuận tiện hơn.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi của bạn..."
              className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Categories */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-3xl p-4 shadow-xl shadow-gray-200/50 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 px-4 mb-4 border-b pb-4">Danh mục</h3>
              <div className="space-y-1">
                {FAQ_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                        activeCategory === cat.id 
                        ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/30' 
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-white' : 'text-gray-400 group-hover:text-brand-accent'}`} />
                      <span className="font-semibold text-sm tracking-wide">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* FAQ List */}
          <div className="lg:w-3/4">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div 
                    key={faq.id}
                    className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 border ${
                      openId === faq.id ? 'border-brand-accent shadow-xl shadow-brand-accent/5 ring-4 ring-brand-accent/5' : 'border-gray-100 shadow-lg shadow-gray-200/50'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
                    >
                      <span className={`text-lg font-bold pr-8 ${openId === faq.id ? 'text-brand-accent' : 'text-zinc-800'}`}>
                        {faq.question}
                      </span>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openId === faq.id ? 'bg-brand-accent text-white rotate-180' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <ChevronDown className="w-6 h-6" />
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-500 ease-in-out ${
                      openId === faq.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed text-lg border-t border-gray-50 pt-4 bg-gray-50/50">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HelpCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-800 mb-2">Không tìm thấy câu hỏi</h3>
                <p className="text-gray-500">Thử tìm kiếm với từ khóa khác hoặc liên hệ trực tiếp với chúng tôi.</p>
              </div>
            )}

            {/* Support Call to Action */}
            <div className="mt-12 bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-brand-accent/20 transition-all duration-500"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Bạn vẫn còn thắc mắc khác?</h3>
                  <p className="text-gray-400 text-lg">Đội ngũ kỹ thuật của Auto Tuấn Linh luôn sẵn sàng hỗ trợ bạn 24/7.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="tel:09xx" 
                    className="flex items-center gap-2 px-6 py-4 bg-brand-accent text-white rounded-2xl font-bold hover:bg-brand-accent/80 transition-all hover:scale-105 shadow-lg shadow-brand-accent/30"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Gọi chúng tôi ngay</span>
                  </a>
                  <Link 
                    href="/lien-he" 
                    className="flex items-center gap-2 px-6 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Gửi lời nhắn</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO/Footer Keywords - Subtle section */}
      <section className="container mx-auto px-4 mt-20 text-center">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs text-gray-400 uppercase tracking-widest font-semibold">
          <span>Bọc ghế da ô tô</span>
          <span>•</span>
          <span>Dán phim cách nhiệt</span>
          <span>•</span>
          <span>Màn hình Android ô tô</span>
          <span>•</span>
          <span>Độ đèn tăng sáng</span>
          <span>•</span>
          <span>Phụ kiện chính hãng</span>
        </div>
      </section>
    </div>
  );
}
