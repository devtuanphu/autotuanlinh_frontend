export interface ContactInfo {
  hotline: string;
  email: string;
  address: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
}

export interface SocialLink {
  name: string;
  icon: string;
  href: string;
  color: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const lienHeContactInfo: ContactInfo = {
  hotline: '1900 123 456',
  email: 'info@autotuanlinh.com',
  address: '123 Đường ABC, Quận XYZ, TP.HCM',
  workingHours: {
    weekdays: '8:00 - 20:00',
    weekends: '8:00 - 18:00',
  },
};

export const lienHeSocialLinks: SocialLink[] = [
  { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com/autotuanlinh', color: 'bg-[#1877F2]' },
  { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com/autotuanlinh', color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]' },
  { name: 'Youtube', icon: 'Youtube', href: 'https://youtube.com/autotuanlinh', color: 'bg-[#FF0000]' },
  { name: 'Zalo', icon: 'MessageCircle', href: 'https://zalo.me/1900123456', color: 'bg-[#0068FF]' },
];

export const lienHeFeatures: Feature[] = [
  {
    icon: 'Headphones',
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'Zap',
    title: 'Phản hồi nhanh',
    description: 'Phản hồi trong vòng 2 giờ, giải đáp mọi thắc mắc của bạn',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: 'Shield',
    title: 'Chuyên nghiệp',
    description: '15+ năm kinh nghiệm, phục vụ hơn 10,000 khách hàng',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'Award',
    title: 'Uy tín hàng đầu',
    description: 'Cam kết chất lượng và dịch vụ tốt nhất thị trường',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export const lienHeFAQs: FAQ[] = [
  {
    question: 'Làm thế nào để liên hệ với Auto Tuan Linh?',
    answer: 'Bạn có thể liên hệ với chúng tôi qua hotline 1900 123 456 (24/7), email info@autotuanlinh.com, hoặc điền form liên hệ trên trang này. Chúng tôi sẽ phản hồi trong vòng 24 giờ.',
  },
  {
    question: 'Thời gian làm việc của Auto Tuan Linh?',
    answer: 'Chúng tôi làm việc từ Thứ 2 đến Thứ 6: 8:00 - 20:00, Thứ 7 và Chủ nhật: 8:00 - 18:00. Hotline hỗ trợ 24/7.',
  },
  {
    question: 'Tôi có thể đến xem sản phẩm trực tiếp không?',
    answer: 'Có, bạn có thể đến địa chỉ 123 Đường ABC, Quận XYZ, TP.HCM để xem và trải nghiệm sản phẩm trực tiếp. Vui lòng gọi trước để đặt lịch hẹn.',
  },
  {
    question: 'Chính sách bảo hành như thế nào?',
    answer: 'Tất cả sản phẩm chính hãng đều có bảo hành từ nhà sản xuất. Thời gian bảo hành tùy theo từng sản phẩm, thường từ 1-5 năm. Chúng tôi hỗ trợ xử lý bảo hành nhanh chóng.',
  },
  {
    question: 'Có hỗ trợ giao hàng và lắp đặt không?',
    answer: 'Có, chúng tôi hỗ trợ giao hàng toàn quốc và lắp đặt tại nhà/xưởng. Miễn phí vận chuyển cho đơn hàng từ 300k. Phí lắp đặt tùy theo dịch vụ.',
  },
];

