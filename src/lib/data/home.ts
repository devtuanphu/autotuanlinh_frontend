export interface Feature {
  icon: string; // Icon name as string
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  href: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export const homeFeatures: Feature[] = [
  {
    icon: 'Shield',
    title: 'Chính hãng 100%',
    description: 'Cam kết sản phẩm chính hãng, bảo hành đầy đủ',
  },
  {
    icon: 'Truck',
    title: 'Giao hàng nhanh',
    description: 'Miễn phí vận chuyển cho đơn hàng trên 500.000đ',
  },
  {
    icon: 'Headphones',
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ tư vấn chuyên nghiệp, nhiệt tình',
  },
  {
    icon: 'Award',
    title: 'Giá tốt nhất',
    description: 'Giá cả cạnh tranh, ưu đãi thường xuyên',
  },
];

export const homeProducts: Product[] = [
  {
    id: '1',
    name: 'Phim cách nhiệt 3M',
    price: 2500000,
    originalPrice: 3000000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop',
    rating: 4.8,
    reviews: 125,
    badge: 'Bán chạy',
    href: '/san-pham/phim-cach-nhiet-3m',
  },
  {
    id: '2',
    name: 'Camera hành trình 4K',
    price: 3500000,
    originalPrice: 4000000,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop',
    rating: 4.9,
    reviews: 89,
    badge: 'Mới',
    href: '/san-pham/camera-hanh-trinh-4k',
  },
  {
    id: '3',
    name: 'Ghế da cao cấp',
    price: 5000000,
    originalPrice: 6000000,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=500&fit=crop',
    rating: 4.7,
    reviews: 156,
    href: '/san-pham/ghe-da-cao-cap',
  },
  {
    id: '4',
    name: 'Hệ thống âm thanh',
    price: 8000000,
    originalPrice: 10000000,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop',
    rating: 5.0,
    reviews: 67,
    badge: 'Hot',
    href: '/san-pham/he-thong-am-thanh',
  },
];

export const homeTestimonials: Testimonial[] = [
  {
    name: 'Nguyễn Văn A',
    role: 'Khách hàng',
    content: 'Sản phẩm chất lượng, dịch vụ chuyên nghiệp. Rất hài lòng!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
  },
  {
    name: 'Trần Thị B',
    role: 'Khách hàng',
    content: 'Phim cách nhiệt dán rất đẹp, nhân viên tư vấn nhiệt tình.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
  },
  {
    name: 'Lê Văn C',
    role: 'Khách hàng',
    content: 'Giá cả hợp lý, sản phẩm chính hãng. Sẽ quay lại!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
  },
];

export interface Statistic {
  icon: string;
  value: string;
  label: string;
}

export const homeStatistics: Statistic[] = [
  {
    icon: 'Users',
    value: '10,000+',
    label: 'Khách hàng tin tưởng',
  },
  {
    icon: 'Award',
    value: '100%',
    label: 'Sản phẩm chính hãng',
  },
  {
    icon: 'ShoppingBag',
    value: '50,000+',
    label: 'Sản phẩm đã bán',
  },
  {
    icon: 'Star',
    value: '4.9/5',
    label: 'Đánh giá trung bình',
  },
];

export interface Service {
  icon: string;
  title: string;
  description: string;
  image: string;
  href: string;
  features: string[];
}

export const homeServices: Service[] = [
  {
    icon: 'Film',
    title: 'Dán phim cách nhiệt',
    description: 'Dịch vụ dán phim cách nhiệt chuyên nghiệp với các thương hiệu hàng đầu như 3M, Llumar, V-Kool',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop',
    href: '/dich-vu/dan-phim-cach-nhiet',
    features: ['Bảo hành 5-10 năm', 'Thương hiệu uy tín', 'Kỹ thuật viên chuyên nghiệp'],
  },
  {
    icon: 'Settings',
    title: 'Bọc ghế da',
    description: 'Nâng cấp nội thất xe với dịch vụ bọc ghế da cao cấp, đa dạng màu sắc và chất liệu',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=500&fit=crop',
    href: '/dich-vu/boc-ghe-da',
    features: ['Chất liệu cao cấp', 'Thiết kế tùy chỉnh', 'Bảo hành lâu dài'],
  },
  {
    icon: 'Music',
    title: 'Nâng cấp âm thanh',
    description: 'Hệ thống âm thanh chuyên nghiệp, mang đến trải nghiệm nghe nhạc tuyệt vời',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop',
    href: '/dich-vu/nang-cap-am-thanh',
    features: ['Thiết bị chính hãng', 'Lắp đặt chuyên nghiệp', 'Tư vấn miễn phí'],
  },
  {
    icon: 'Sparkles',
    title: 'Bảo dưỡng & Sửa chữa',
    description: 'Dịch vụ bảo dưỡng và sửa chữa xe chuyên nghiệp với đội ngũ kỹ thuật viên giàu kinh nghiệm',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=500&fit=crop',
    href: '/dich-vu/bao-duong',
    features: ['Kiểm tra miễn phí', 'Phụ tùng chính hãng', 'Bảo hành dịch vụ'],
  },
];

export interface Category {
  icon: string;
  name: string;
  description: string;
  image: string;
  href: string;
  productCount: number;
}

export const homeCategories: Category[] = [
  {
    icon: 'Car',
    name: 'Phụ kiện nội thất',
    description: 'Ghế da, vô lăng, thảm sàn và các phụ kiện nội thất cao cấp',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=500&fit=crop',
    href: '/san-pham/noi-that',
    productCount: 150,
  },
  {
    icon: 'Wrench',
    name: 'Phụ kiện ngoại thất',
    description: 'Cản trước sau, gương chiếu hậu, đèn và các phụ kiện ngoại thất',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop',
    href: '/san-pham/ngoai-that',
    productCount: 120,
  },
  {
    icon: 'Settings',
    name: 'Điện & Điện tử',
    description: 'Camera hành trình, cảm biến, hệ thống giải trí và thiết bị điện tử',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop',
    href: '/san-pham/dien-dien-tu',
    productCount: 200,
  },
];

export interface Reason {
  icon: string;
  title: string;
  description: string;
}

export const homeReasons: Reason[] = [
  {
    icon: 'Shield',
    title: 'Sản phẩm chính hãng 100%',
    description: 'Cam kết tất cả sản phẩm đều chính hãng, có đầy đủ giấy tờ và bảo hành từ nhà sản xuất',
  },
  {
    icon: 'Award',
    title: '15+ năm kinh nghiệm',
    description: 'Với hơn 15 năm hoạt động, chúng tôi tự hào là đơn vị uy tín hàng đầu trong lĩnh vực phụ kiện ô tô',
  },
  {
    icon: 'Clock',
    title: 'Giao hàng nhanh chóng',
    description: 'Miễn phí vận chuyển cho đơn hàng từ 300k, giao hàng toàn quốc trong 24-48 giờ',
  },
  {
    icon: 'Headphones',
    title: 'Hỗ trợ khách hàng 24/7',
    description: 'Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi',
  },
  {
    icon: 'CheckCircle',
    title: 'Giá cả cạnh tranh',
    description: 'Cam kết giá tốt nhất thị trường với nhiều chương trình khuyến mãi hấp dẫn',
  },
];

export interface Brand {
  name: string;
  logo: string;
  href?: string;
}

export const homeBrands: Brand[] = [
  {
    name: '3M',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/3M-Logo.png',
  },
  {
    name: 'Llumar',
    logo: 'https://www.llumar.com/globalassets/logos/llumar-logo.png',
  },
  {
    name: 'V-Kool',
    logo: 'https://www.v-kool.com/images/logo.png',
  },
  {
    name: 'JBL',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/JBL-Logo.png',
  },
  {
    name: 'Pioneer',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/Pioneer-Logo.png',
  },
  {
    name: 'Sony',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png',
  },
];

export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
  step: number;
}

export const homeProcessSteps: ProcessStep[] = [
  {
    icon: 'Search',
    title: 'Tìm kiếm sản phẩm',
    description: 'Khám phá hàng ngàn sản phẩm phụ kiện ô tô chính hãng trên website',
    step: 1,
  },
  {
    icon: 'MessageSquare',
    title: 'Tư vấn miễn phí',
    description: 'Liên hệ với đội ngũ tư vấn để được hỗ trợ chọn sản phẩm phù hợp nhất',
    step: 2,
  },
  {
    icon: 'CheckCircle',
    title: 'Đặt hàng & Thanh toán',
    description: 'Đặt hàng trực tuyến hoặc đến cửa hàng, thanh toán linh hoạt nhiều hình thức',
    step: 3,
  },
  {
    icon: 'Truck',
    title: 'Giao hàng & Lắp đặt',
    description: 'Nhận hàng và được hỗ trợ lắp đặt miễn phí tại cửa hàng hoặc tại nhà',
    step: 4,
  },
];

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export const homeGalleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=800&fit=crop',
    alt: 'Cửa hàng Auto Tuan Linh',
    title: 'Không gian cửa hàng hiện đại',
    description: 'Showroom rộng rãi với đầy đủ sản phẩm trưng bày',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=800&fit=crop',
    alt: 'Dán phim cách nhiệt',
    title: 'Dán phim cách nhiệt chuyên nghiệp',
    description: 'Quy trình dán phim với công nghệ hiện đại',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=800&fit=crop',
    alt: 'Bọc ghế da',
    title: 'Bọc ghế da cao cấp',
    description: 'Nâng cấp nội thất với chất liệu da cao cấp',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=800&fit=crop',
    alt: 'Lắp đặt camera',
    title: 'Lắp đặt camera hành trình',
    description: 'Thiết bị điện tử được lắp đặt chuyên nghiệp',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=800&fit=crop',
    alt: 'Bảo dưỡng xe',
    title: 'Dịch vụ bảo dưỡng',
    description: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&h=800&fit=crop',
    alt: 'Nội thất xe',
    title: 'Nâng cấp nội thất',
    description: 'Không gian nội thất sang trọng sau nâng cấp',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=800&fit=crop',
    alt: 'Sản phẩm phụ kiện',
    title: 'Kho hàng đầy đủ',
    description: 'Hàng ngàn sản phẩm chính hãng luôn có sẵn',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=800&fit=crop',
    alt: 'Xưởng sửa chữa',
    title: 'Xưởng sửa chữa chuyên nghiệp',
    description: 'Thiết bị và công cụ hiện đại',
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const homeFAQs: FAQ[] = [
  {
    question: 'Sản phẩm có đảm bảo chính hãng không?',
    answer: 'Chúng tôi cam kết 100% sản phẩm chính hãng, có đầy đủ giấy tờ chứng nhận và bảo hành từ nhà sản xuất. Nếu phát hiện hàng giả, chúng tôi sẽ đền bù gấp 10 lần giá trị sản phẩm.',
  },
  {
    question: 'Thời gian giao hàng là bao lâu?',
    answer: 'Đối với đơn hàng trong nội thành: 1-2 ngày. Đơn hàng tỉnh: 2-5 ngày. Miễn phí vận chuyển cho đơn hàng từ 300.000đ. Chúng tôi có dịch vụ giao hàng nhanh trong 24h với phí phụ thu.',
  },
  {
    question: 'Có hỗ trợ lắp đặt tại nhà không?',
    answer: 'Có, chúng tôi cung cấp dịch vụ lắp đặt tại nhà cho các sản phẩm phụ kiện. Phí lắp đặt tùy thuộc vào loại sản phẩm và khoảng cách. Vui lòng liên hệ hotline để được báo giá chi tiết.',
  },
  {
    question: 'Chính sách đổi trả như thế nào?',
    answer: 'Khách hàng được đổi trả trong vòng 7 ngày nếu sản phẩm còn nguyên vẹn, chưa sử dụng và còn đầy đủ hộp, phụ kiện. Chúng tôi sẽ hoàn tiền 100% hoặc đổi sản phẩm khác tùy theo yêu cầu.',
  },
  {
    question: 'Có chương trình bảo hành không?',
    answer: 'Tất cả sản phẩm đều có bảo hành chính hãng từ nhà sản xuất. Thời gian bảo hành từ 6 tháng đến 5 năm tùy loại sản phẩm. Dịch vụ lắp đặt được bảo hành 12 tháng.',
  },
  {
    question: 'Thanh toán có được trả góp không?',
    answer: 'Có, chúng tôi hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng của các ngân hàng đối tác. Bạn có thể trả góp từ 3-12 tháng tùy giá trị đơn hàng. Liên hệ để được tư vấn chi tiết.',
  },
];

export interface Promo {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  href: string;
  badge?: string;
  endDate?: string;
}

export const homePromos: Promo[] = [
  {
    id: '1',
    title: 'Giảm 30% phim cách nhiệt',
    description: 'Áp dụng cho tất cả các loại phim cách nhiệt 3M, Llumar, V-Kool. Bảo hành lên đến 10 năm.',
    discount: '30%',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop',
    href: '/dich-vu/dan-phim-cach-nhiet',
    badge: 'Hot',
    endDate: '31/12/2024',
  },
  {
    id: '2',
    title: 'Combo nội thất giảm 25%',
    description: 'Mua combo ghế da + vô lăng + thảm sàn được giảm 25%. Áp dụng cho đơn hàng từ 10 triệu.',
    discount: '25%',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=500&fit=crop',
    href: '/san-pham/noi-that',
    badge: 'Mới',
    endDate: '30/11/2024',
  },
  {
    id: '3',
    title: 'Miễn phí lắp đặt camera',
    description: 'Mua camera hành trình 4K được miễn phí lắp đặt và bảo hành 2 năm. Số lượng có hạn.',
    discount: 'FREE',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop',
    href: '/san-pham/camera-hanh-trinh',
    endDate: '15/12/2024',
  },
];

export interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link?: string;
  linkText?: string;
}

export const homeContactInfos: ContactInfo[] = [
  {
    icon: 'Phone',
    title: 'Hotline 24/7',
    content: '1900 123 456\nHoặc: 0912 345 678',
    link: 'tel:1900123456',
    linkText: 'Gọi ngay',
  },
  {
    icon: 'MapPin',
    title: 'Địa chỉ cửa hàng',
    content: '123 Đường ABC, Phường XYZ\nQuận 1, TP.HCM',
    link: '/lien-he',
    linkText: 'Xem bản đồ',
  },
  {
    icon: 'Mail',
    title: 'Email hỗ trợ',
    content: 'info@autotuanlinh.com\nsupport@autotuanlinh.com',
    link: 'mailto:info@autotuanlinh.com',
    linkText: 'Gửi email',
  },
  {
    icon: 'Clock',
    title: 'Giờ làm việc',
    content: 'Thứ 2 - Thứ 6: 8:00 - 20:00\nThứ 7 & CN: 8:00 - 18:00',
  },
  {
    icon: 'MessageSquare',
    title: 'Chat trực tuyến',
    content: 'Hỗ trợ tư vấn trực tuyến\nPhản hồi trong 5 phút',
    link: '/lien-he',
    linkText: 'Bắt đầu chat',
  },
];

