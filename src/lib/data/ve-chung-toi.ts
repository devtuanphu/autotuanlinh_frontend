export interface Stat {
  icon: string;
  value: string;
  label: string;
  color: string;
}

export interface Value {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Commitment {
  icon: string;
  title: string;
  description: string;
}

export interface Partner {
  name: string;
  logo: string;
  url?: string;
}

export interface Certification {
  icon: string;
  title: string;
  description: string;
}

export interface Location {
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  image: string;
}

export interface BeforeAfter {
  image: string;
  title: string;
  description: string;
}

export interface TeamMember {
  image: string;
  name: string;
  role: string;
}

export const veChungToiStats: Stat[] = [
  { icon: 'Users', value: '10,000+', label: 'Khách hàng tin tưởng', color: 'from-blue-500 to-blue-600' },
  { icon: 'Award', value: '15+', label: 'Năm kinh nghiệm', color: 'from-yellow-500 to-yellow-600' },
  { icon: 'ShoppingBag', value: '50,000+', label: 'Sản phẩm đã bán', color: 'from-green-500 to-green-600' },
  { icon: 'Star', value: '4.9/5', label: 'Đánh giá trung bình', color: 'from-purple-500 to-purple-600' },
];

export const veChungToiValues: Value[] = [
  {
    icon: 'Shield',
    title: 'Chất lượng đảm bảo',
    description: '100% sản phẩm chính hãng, có đầy đủ giấy tờ và bảo hành từ nhà sản xuất.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: 'Heart',
    title: 'Tận tâm phục vụ',
    description: 'Đội ngũ nhân viên chuyên nghiệp, luôn sẵn sàng hỗ trợ khách hàng 24/7.',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: 'Target',
    title: 'Giá cả hợp lý',
    description: 'Cam kết giá tốt nhất thị trường, nhiều chương trình khuyến mãi hấp dẫn.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: 'Zap',
    title: 'Giao hàng nhanh',
    description: 'Miễn phí vận chuyển cho đơn hàng từ 300k, giao hàng toàn quốc.',
    color: 'from-yellow-500 to-yellow-600',
  },
];

export const veChungToiTimeline: TimelineItem[] = [
  {
    year: '2010',
    title: 'Thành lập',
    description: 'Auto Tuan Linh được thành lập với sứ mệnh mang đến những sản phẩm phụ kiện ô tô chất lượng cao.',
  },
  {
    year: '2015',
    title: 'Mở rộng',
    description: 'Mở rộng dịch vụ với đội ngũ kỹ thuật viên chuyên nghiệp, phục vụ đa dạng nhu cầu khách hàng.',
  },
  {
    year: '2020',
    title: 'Phát triển',
    description: 'Trở thành đối tác chính thức của nhiều thương hiệu lớn, mở rộng hệ thống cửa hàng.',
  },
  {
    year: '2025',
    title: 'Hiện tại',
    description: 'Tiếp tục phát triển với công nghệ hiện đại, dịch vụ chuyên nghiệp và cam kết chất lượng.',
  },
];

export const veChungToiCommitments: Commitment[] = [
  {
    icon: 'CheckCircle',
    title: 'Sản phẩm chính hãng',
    description: '100% sản phẩm có nguồn gốc rõ ràng, đầy đủ giấy tờ chứng nhận.',
  },
  {
    icon: 'CheckCircle',
    title: 'Bảo hành uy tín',
    description: 'Chế độ bảo hành minh bạch, hỗ trợ khách hàng tận tâm.',
  },
  {
    icon: 'CheckCircle',
    title: 'Giá cả cạnh tranh',
    description: 'Cam kết giá tốt nhất, nhiều ưu đãi và khuyến mãi hấp dẫn.',
  },
  {
    icon: 'CheckCircle',
    title: 'Dịch vụ chuyên nghiệp',
    description: 'Đội ngũ tư vấn và kỹ thuật viên giàu kinh nghiệm, tận tâm.',
  },
];

export const veChungToiPartners: Partner[] = [
  { name: '3M', logo: 'https://logos-world.net/wp-content/uploads/2020/11/3M-Logo.png' },
  { name: 'Llumar', logo: 'https://www.llumar.com/globalassets/logos/llumar-logo.png' },
  { name: 'V-Kool', logo: 'https://www.v-kool.com/images/logo.png' },
  { name: 'Bosch', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Bosch-Logo.png' },
  { name: 'Pioneer', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Pioneer-Logo.png' },
  { name: 'JBL', logo: 'https://logos-world.net/wp-content/uploads/2020/04/JBL-Logo.png' },
];

export const veChungToiCertifications: Certification[] = [
  {
    icon: 'BadgeCheck',
    title: 'Chứng nhận ISO 9001',
    description: 'Hệ thống quản lý chất lượng quốc tế',
  },
  {
    icon: 'Shield',
    title: 'Đại lý chính thức',
    description: 'Đối tác chính thức của nhiều thương hiệu lớn',
  },
  {
    icon: 'Award',
    title: 'Giải thưởng uy tín',
    description: 'Nhiều giải thưởng trong ngành phụ kiện ô tô',
  },
  {
    icon: 'Star',
    title: 'Đánh giá 5 sao',
    description: 'Được khách hàng đánh giá cao về chất lượng dịch vụ',
  },
];

export const veChungToiLocations: Location[] = [
  {
    name: 'Cửa hàng Hà Nội',
    address: '123 Đường ABC, Phường XYZ, Quận 1, Hà Nội',
    phone: '024 1234 5678',
    hours: '8:00 - 20:00',
  },
  {
    name: 'Cửa hàng TP.HCM',
    address: '456 Đường DEF, Phường UVW, Quận 1, TP.HCM',
    phone: '028 9876 5432',
    hours: '8:00 - 20:00',
  },
  {
    name: 'Cửa hàng Đà Nẵng',
    address: '789 Đường GHI, Phường RST, Quận Hải Châu, Đà Nẵng',
    phone: '0236 5555 6666',
    hours: '8:00 - 20:00',
  },
];

export const veChungToiTestimonials: Testimonial[] = [
  {
    name: 'Anh Nguyễn Văn A',
    role: 'Chủ xe Toyota Camry',
    content: 'Dịch vụ dán phim cách nhiệt tại Auto Tuan Linh rất chuyên nghiệp. Nhân viên tư vấn nhiệt tình, sản phẩm chính hãng và giá cả hợp lý.',
    rating: 5,
  },
  {
    name: 'Chị Trần Thị B',
    role: 'Chủ xe Honda CR-V',
    content: 'Tôi rất hài lòng với dịch vụ bọc ghế da. Chất lượng tốt, thời gian hoàn thành nhanh và giá cả phải chăng. Sẽ quay lại lần sau.',
    rating: 5,
  },
  {
    name: 'Anh Lê Văn C',
    role: 'Chủ xe Mazda CX-5',
    content: 'Đội ngũ kỹ thuật viên rất chuyên nghiệp, lắp đặt camera hành trình rất cẩn thận. Sản phẩm chính hãng, bảo hành tốt.',
    rating: 5,
  },
];

export const veChungToiProcessSteps: ProcessStep[] = [
  { step: '1', title: 'Tư vấn', desc: 'Tư vấn chi tiết về sản phẩm và dịch vụ', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=600&fit=crop' },
  { step: '2', title: 'Lựa chọn', desc: 'Khách hàng lựa chọn sản phẩm phù hợp', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=600&fit=crop' },
  { step: '3', title: 'Thực hiện', desc: 'Đội ngũ chuyên nghiệp thực hiện dịch vụ', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=600&fit=crop' },
  { step: '4', title: 'Bàn giao', desc: 'Kiểm tra và bàn giao sản phẩm hoàn chỉnh', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop' },
];

export const veChungToiBeforeAfter: BeforeAfter[] = [
  { image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop', title: 'Dự án 1', description: 'Kết quả chuyên nghiệp, chất lượng cao' },
  { image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop', title: 'Dự án 2', description: 'Kết quả chuyên nghiệp, chất lượng cao' },
  { image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop', title: 'Dự án 3', description: 'Kết quả chuyên nghiệp, chất lượng cao' },
  { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', title: 'Dự án 4', description: 'Kết quả chuyên nghiệp, chất lượng cao' },
  { image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop', title: 'Dự án 5', description: 'Kết quả chuyên nghiệp, chất lượng cao' },
  { image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop', title: 'Dự án 6', description: 'Kết quả chuyên nghiệp, chất lượng cao' },
];

export const veChungToiTeamMembers: TeamMember[] = [
  { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', name: 'Nguyễn Văn A', role: 'Giám đốc điều hành' },
  { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', name: 'Trần Văn B', role: 'Trưởng phòng kỹ thuật' },
  { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', name: 'Lê Thị C', role: 'Trưởng phòng kinh doanh' },
  { image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', name: 'Phạm Văn D', role: 'Chuyên viên kỹ thuật' },
  { image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop', name: 'Hoàng Thị E', role: 'Chuyên viên tư vấn' },
  { image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop', name: 'Vũ Văn F', role: 'Kỹ thuật viên' },
  { image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', name: 'Đặng Thị G', role: 'Chuyên viên chăm sóc khách hàng' },
  { image: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805?w=400&h=400&fit=crop', name: 'Bùi Văn H', role: 'Kỹ thuật viên' },
];

