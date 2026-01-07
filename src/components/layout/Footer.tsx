import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { fetchStrapi } from '@/lib/api/strapi';

const Footer = async () => {
  const currentYear = new Date().getFullYear();
  
  // Default values
  const defaultHotline = {
    title: 'Hotline 24/7',
    phone: '1900 123 456',
  };
  const defaultEmail = {
    title: 'Email hỗ trợ',
    email: 'info@autotuanlinh.com',
  };
  const defaultAddress = {
    title: 'Địa chỉ',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
  };
  
  // Fetch footer data from Strapi (same pattern as home page)
  // Use shorter revalidate in development to see changes faster
  const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 60;
  
  let hotline = defaultHotline;
  let email = defaultEmail;
  let address = defaultAddress;
  let companyName = 'Auto Tuan Linh';
  let companyDescription = 'Chuyên cung cấp phụ kiện ô tô chính hãng và dịch vụ chăm sóc xe chuyên nghiệp. Cam kết chất lượng, giá tốt nhất thị trường.';
  let copyright = `© ${currentYear} Auto Tuan Linh. Tất cả quyền được bảo lưu.`;
  let privacyPolicyUrl = '/chinh-sach/bao-mat';
  let termsOfUseUrl = '/chinh-sach/dieu-khoan';
  let socialMedias: Array<{ url: string; icon: string | null }> = [];
  let footerColumns: Array<{ heading: string; links: Array<{ text: string; url: string }> }> = [];
  
  // Fetch footer contact info
  try {
    const footerContactData = await fetchStrapi('/footer-contact', {}, { revalidate: revalidateTime });
    
    if (footerContactData && typeof footerContactData === 'object') {
      const data = footerContactData as Record<string, unknown>;
      const contactInfoItems = (data.contactInfoItems as Array<{
        id: number;
        title: string;
        value: string;
        url: string;
        icon: string | null;
      }>) || [];
      
      contactInfoItems.forEach((item) => {
        const titleLower = item.title.toLowerCase();
        if (titleLower.includes('hotline') || titleLower.includes('phone') || titleLower.includes('điện thoại')) {
          hotline = { title: item.title, phone: item.value };
        } else if (titleLower.includes('email') || titleLower.includes('mail')) {
          email = { title: item.title, email: item.value };
        } else if (titleLower.includes('địa chỉ') || titleLower.includes('address')) {
          address = { title: item.title, address: item.value };
        }
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Footer] Failed to fetch footer contact info, using defaults:', error);
    }
  }
  
  // Fetch footer main data
  try {
    const footerData = await fetchStrapi('/footer', {}, { revalidate: revalidateTime });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Footer] Fetched data:', footerData);
    }
    
    if (footerData && typeof footerData === 'object') {
      const data = footerData as Record<string, unknown>;
      
      companyName = (data.companyName as string) || companyName;
      companyDescription = (data.companyDescription as string) || companyDescription;
      copyright = (data.copyright as string) || copyright;
      privacyPolicyUrl = (data.privacyPolicyUrl as string) || privacyPolicyUrl;
      termsOfUseUrl = (data.termsOfUseUrl as string) || termsOfUseUrl;
      
      // Map socialMedias
      if (data.socialMedias && Array.isArray(data.socialMedias)) {
        socialMedias = (data.socialMedias as Array<{
          id: number;
          url: string;
          icon: string | null;
        }>).map(item => ({
          url: item.url,
          icon: item.icon,
        }));
      }
      
      // Map columns
      if (data.columns && Array.isArray(data.columns)) {
        footerColumns = (data.columns as Array<{
          id: number;
          heading: string;
          links: Array<{
            id: number;
            text: string;
            url: string;
          }>;
        }>).map(column => ({
          heading: column.heading,
          links: column.links.map(link => ({
            text: link.text,
            url: link.url,
          })),
        }));
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Footer] Failed to fetch footer data, using defaults:', error);
    }
  }
  
  // Fallback to default footerLinks if no columns from API
  const footerLinks = footerColumns.length > 0 ? {} : {
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
                <h4 className="font-bold text-lg mb-1">{hotline.title}</h4>
                {hotline.phone && (
                  <a href={`tel:${hotline.phone.replace(/\s+/g, '')}`} className="text-gray-300 hover:text-brand-accent transition">
                    {hotline.phone}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{email.title}</h4>
                {email.email && (
                  <a href={`mailto:${email.email}`} className="text-gray-300 hover:text-brand-accent transition">
                    {email.email}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{address.title}</h4>
                {address.address && (
                  <p className="text-gray-300">{address.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-brand-accent">{companyName}</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              {companyDescription}
            </p>
            <div className="flex gap-4">
              {socialMedias.length > 0 ? (
                socialMedias.map((social, index) => {
                  // Map icon based on URL or use default icons
                  let Icon = Facebook;
                  const urlLower = social.url.toLowerCase();
                  if (urlLower.includes('instagram') || urlLower.includes('ig')) {
                    Icon = Instagram;
                  } else if (urlLower.includes('youtube') || urlLower.includes('yt')) {
                    Icon = Youtube;
                  }
                  
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent transition"
                      aria-label={social.url}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })
              ) : (
                // Fallback to default social media icons
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Footer Columns from API */}
          {footerColumns.length > 0 ? (
            footerColumns.map((column) => (
              <div key={column.heading}>
                <h3 className="font-bold text-lg mb-4 text-white">{column.heading}</h3>
                <ul className="space-y-2 text-sm">
                  {column.links.map((link) => (
                    <li key={link.text}>
                      <Link
                        href={link.url}
                        className="text-gray-400 hover:text-brand-accent transition"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            // Fallback to default footerLinks
            <>
              {/* Products */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-white">Sản phẩm</h3>
                <ul className="space-y-2 text-sm">
                  {footerLinks.products?.map((link) => (
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
                  {footerLinks.services?.map((link) => (
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
                  {footerLinks.support?.map((link) => (
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
            </>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>{copyright}</p>
            <div className="flex gap-6">
              <Link href={privacyPolicyUrl} className="hover:text-brand-accent transition">
                Chính sách bảo mật
              </Link>
              <Link href={termsOfUseUrl} className="hover:text-brand-accent transition">
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
