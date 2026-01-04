import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'Phụ kiện nội thất', href: '/san-pham/noi-that' },
      { name: 'Phụ kiện ngoại thất', href: '/san-pham/ngoai-that' },
      { name: 'Đồ chơi xe hơi', href: '/san-pham/do-choi' },
      { name: 'Bảo dưỡng', href: '/san-pham/bao-duong' },
    ],
    services: [
      { name: 'Dán phim cách nhiệt', href: '/dich-vu/dan-phim' },
      { name: 'Bọc ghế da', href: '/dich-vu/boc-ghe' },
      { name: 'Nâng cấp âm thanh', href: '/dich-vu/am-thanh' },
      { name: 'Sửa chữa', href: '/dich-vu/sua-chua' },
    ],
    company: [
      { name: 'Về chúng tôi', href: '/ve-chung-toi' },
      { name: 'Tin tức', href: '/tin-tuc' },
      { name: 'Tuyển dụng', href: '/tuyen-dung' },
      { name: 'Chính sách bảo hành', href: '/chinh-sach/bao-hanh' },
    ],
    support: [
      { name: 'Hướng dẫn mua hàng', href: '/huong-dan' },
      { name: 'Câu hỏi thường gặp', href: '/faq' },
      { name: 'Chính sách đổi trả', href: '/chinh-sach/doi-tra' },
      { name: 'Bảo mật thông tin', href: '/chinh-sach/bao-mat' },
    ],
  };

  return (
    <footer className="bg-brand-dark text-white">
      {/* Top Section - Màu accent */}
      <div className="bg-brand-accent/10 border-b border-brand-accent/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Hotline 24/7</h4>
                <a href="tel:1900123456" className="text-gray-300 hover:text-brand-accent transition">
                  1900 123 456
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email hỗ trợ</h4>
                <a href="mailto:info@autotuanlinh.com" className="text-gray-300 hover:text-brand-accent transition">
                  info@autotuanlinh.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Địa chỉ</h4>
                <p className="text-gray-300">123 Đường ABC, Quận XYZ, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Không có logo */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-brand-accent">Auto Tuan Linh</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Chuyên cung cấp phụ kiện ô tô chính hãng và dịch vụ chăm sóc xe chuyên nghiệp. 
              Cam kết chất lượng, giá tốt nhất thị trường.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent transition"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Sản phẩm</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-accent transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Dịch vụ</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-accent transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-accent transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} Auto Tuan Linh. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-6">
              <Link href="/chinh-sach/bao-mat" className="hover:text-brand-accent transition">
                Chính sách bảo mật
              </Link>
              <Link href="/chinh-sach/dieu-khoan" className="hover:text-brand-accent transition">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
