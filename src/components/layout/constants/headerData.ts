import { 
  Car, 
  Wrench, 
  Settings, 
  Film, 
  Music, 
  Sparkles,
} from 'lucide-react';

// Cấu trúc danh mục sản phẩm 3 cấp
export const productCategories = [
  {
    id: 'noi-that',
    name: 'Phụ kiện nội thất',
    icon: Car,
    href: '/san-pham/noi-that',
    children: [
      {
        id: 'ghe-va-tua',
        name: 'Ghế và tựa',
        children: [
          { name: 'Ghế da cao cấp', href: '/san-pham/ghe-da' },
          { name: 'Bọc ghế da', href: '/san-pham/boc-ghe-da' },
          { name: 'Gối tựa đầu', href: '/san-pham/goi-tua-dau' },
          { name: 'Tựa lưng', href: '/san-pham/tua-lung' },
          { name: 'Ghế thể thao', href: '/san-pham/ghe-the-thao' },
          { name: 'Bọc ghế nỉ', href: '/san-pham/boc-ghe-ni' },
          { name: 'Gối cổ', href: '/san-pham/goi-co' },
          { name: 'Đệm ghế', href: '/san-pham/dem-ghe' },
        ],
      },
      {
        id: 'vo-lang',
        name: 'Vô lăng',
        children: [
          { name: 'Vô lăng da', href: '/san-pham/vo-lang-da' },
          { name: 'Bọc vô lăng', href: '/san-pham/boc-vo-lang' },
          { name: 'Vô lăng thể thao', href: '/san-pham/vo-lang-the-thao' },
          { name: 'Vô lăng carbon', href: '/san-pham/vo-lang-carbon' },
          { name: 'Bọc vô lăng da lộn', href: '/san-pham/boc-vo-lang-da-lon' },
          { name: 'Vô lăng gỗ', href: '/san-pham/vo-lang-go' },
        ],
      },
      {
        id: 'tham-va-trang-tri',
        name: 'Thảm và trang trí',
        children: [
          { name: 'Thảm sàn cao cấp', href: '/san-pham/tham-san' },
          { name: 'Thảm lót sàn', href: '/san-pham/tham-lot-san' },
          { name: 'Túi đựng đồ', href: '/san-pham/tui-dung-do' },
          { name: 'Đồ trang trí nội thất', href: '/san-pham/trang-tri-noi-that' },
          { name: 'Thảm sàn 3D', href: '/san-pham/tham-san-3d' },
          { name: 'Thảm lót khoang hành lý', href: '/san-pham/tham-lot-khoang' },
          { name: 'Túi đựng đồ đa năng', href: '/san-pham/tui-dung-do-da-nang' },
          { name: 'Hộp đựng khăn giấy', href: '/san-pham/hop-dung-khan-giay' },
        ],
      },
    ],
  },
  {
    id: 'ngoai-that',
    name: 'Phụ kiện ngoại thất',
    icon: Sparkles,
    href: '/san-pham/ngoai-that',
    children: [
      {
        id: 'can-va-op',
        name: 'Cản và ốp',
        children: [
          { name: 'Cản trước', href: '/san-pham/can-truoc' },
          { name: 'Cản sau', href: '/san-pham/can-sau' },
          { name: 'Ốp viền', href: '/san-pham/op-vien' },
          { name: 'Chắn bùn', href: '/san-pham/chan-bun' },
        ],
      },
      {
        id: 'den-va-chieu-sang',
        name: 'Đèn và chiếu sáng',
        children: [
          { name: 'Đèn pha LED', href: '/san-pham/den-pha-led' },
          { name: 'Đèn gầm', href: '/san-pham/den-gam' },
          { name: 'Đèn hậu', href: '/san-pham/den-hau' },
        ],
      },
      {
        id: 'guong-va-phu-kien',
        name: 'Gương và phụ kiện',
        children: [
          { name: 'Gương chiếu hậu', href: '/san-pham/guong-chieu-hau' },
          { name: 'Logo nổi', href: '/san-pham/logo-noi' },
          { name: 'Viền gương', href: '/san-pham/vien-guong' },
        ],
      },
    ],
  },
  {
    id: 'do-choi-xe-hoi',
    name: 'Đồ chơi xe hơi',
    icon: Settings,
    href: '/san-pham/do-choi',
    children: [
      {
        id: 'camera-va-an-ninh',
        name: 'Camera và an ninh',
        children: [
          { name: 'Camera hành trình', href: '/san-pham/camera-hanh-trinh' },
          { name: 'Camera lùi', href: '/san-pham/camera-lui' },
          { name: 'Cảm biến lùi', href: '/san-pham/cam-bien-lui' },
          { name: 'Hệ thống báo động', href: '/san-pham/bao-dong' },
        ],
      },
      {
        id: 'am-thanh',
        name: 'Âm thanh',
        children: [
          { name: 'Đầu DVD Android', href: '/san-pham/dau-dvd' },
          { name: 'Loa & Amply', href: '/san-pham/loa-amply' },
          { name: 'Loa siêu trầm', href: '/san-pham/loa-sieu-tram' },
        ],
      },
      {
        id: 'tien-ich',
        name: 'Tiện ích',
        children: [
          { name: 'HUD hiển thị', href: '/san-pham/hud' },
          { name: 'Bộ sạc USB', href: '/san-pham/bo-sac-usb' },
          { name: 'Sạc không dây', href: '/san-pham/sac-khong-day' },
        ],
      },
    ],
  },
  {
    id: 'bao-duong',
    name: 'Bảo dưỡng',
    icon: Wrench,
    href: '/san-pham/bao-duong',
    children: [
      {
        id: 'dau-nhot',
        name: 'Dầu nhớt',
        children: [
          { name: 'Dầu nhớt động cơ', href: '/san-pham/dau-nhot-dong-co' },
          { name: 'Dầu hộp số', href: '/san-pham/dau-hop-so' },
          { name: 'Phụ gia', href: '/san-pham/phu-gia' },
        ],
      },
      {
        id: 'loc-va-phu-tung',
        name: 'Lọc và phụ tùng',
        children: [
          { name: 'Lọc gió', href: '/san-pham/loc-gio' },
          { name: 'Lọc nhớt', href: '/san-pham/loc-nhot' },
          { name: 'Phụ tùng thay thế', href: '/san-pham/phu-tung' },
        ],
      },
    ],
  },
];

// Cấu trúc danh mục dịch vụ 3 cấp
export const serviceCategories = [
  {
    id: 'dan-phim-cach-nhiet',
    name: 'Dán phim cách nhiệt',
    icon: Film,
    href: '/dich-vu/dan-phim-cach-nhiet',
    children: [
      {
        id: 'phim-cach-nhiet',
        name: 'Phim cách nhiệt',
        children: [
          { name: 'Phim cách nhiệt 3M', href: '/dich-vu/phim-3m' },
          { name: 'Phim cách nhiệt Llumar', href: '/dich-vu/phim-llumar' },
          { name: 'Phim cách nhiệt V-Kool', href: '/dich-vu/phim-vkool' },
          { name: 'Bảo hành phim', href: '/dich-vu/bao-hanh-phim' },
        ],
      },
    ],
  },
  {
    id: 'boc-ghe-da',
    name: 'Bọc ghế da',
    icon: Car,
    href: '/dich-vu/boc-ghe-da',
    children: [
      {
        id: 'boc-ghe',
        name: 'Bọc ghế',
        children: [
          { name: 'Bọc ghế da thật', href: '/dich-vu/boc-ghe-da-that' },
          { name: 'Bọc ghế da simili', href: '/dich-vu/boc-ghe-da-simili' },
          { name: 'Nâng cấp nội thất', href: '/dich-vu/nang-cap-noi-that' },
        ],
      },
    ],
  },
  {
    id: 'nang-cap-am-thanh',
    name: 'Nâng cấp âm thanh',
    icon: Music,
    href: '/dich-vu/nang-cap-am-thanh',
    children: [
      {
        id: 'am-thanh',
        name: 'Âm thanh',
        children: [
          { name: 'Lắp đặt loa', href: '/dich-vu/lap-dat-loa' },
          { name: 'Lắp đặt amply', href: '/dich-vu/lap-dat-amply' },
          { name: 'Nâng cấp đầu DVD', href: '/dich-vu/nang-cap-dau-dvd' },
        ],
      },
    ],
  },
];

// Mega menu data
export const megaMenuData = {
  'danh-muc-bai-viet-san-pham': {
    title: 'Sản phẩm',
    columns: [
      {
        title: 'Phụ kiện nội thất',
        icon: Car,
        items: [
          { name: 'Ghế da', href: '/danh-muc-bai-viet-san-pham/ghe-da' },
          { name: 'Vô lăng', href: '/danh-muc-bai-viet-san-pham/vo-lang' },
          { name: 'Thảm sàn', href: '/danh-muc-bai-viet-san-pham/tham-san' },
          { name: 'Túi đựng đồ', href: '/danh-muc-bai-viet-san-pham/tui-dung-do' },
          { name: 'Gối tựa đầu', href: '/danh-muc-bai-viet-san-pham/goi-tua-dau' },
          { name: 'Bọc vô lăng', href: '/danh-muc-bai-viet-san-pham/boc-vo-lang' },
        ],
      },
      {
        title: 'Phụ kiện ngoại thất',
        icon: Sparkles,
        items: [
          { name: 'Cản trước/sau', href: '/danh-muc-bai-viet-san-pham/can' },
          { name: 'Đèn pha', href: '/danh-muc-bai-viet-san-pham/den-pha' },
          { name: 'Gương chiếu hậu', href: '/danh-muc-bai-viet-san-pham/guong' },
          { name: 'Ốp viền', href: '/danh-muc-bai-viet-san-pham/op-vien' },
          { name: 'Logo nổi', href: '/danh-muc-bai-viet-san-pham/logo-noi' },
          { name: 'Chắn bùn', href: '/danh-muc-bai-viet-san-pham/chan-bun' },
        ],
      },
      {
        title: 'Đồ chơi xe hơi',
        icon: Settings,
        items: [
          { name: 'Camera hành trình', href: '/danh-muc-bai-viet-san-pham/camera' },
          { name: 'Cảm biến lùi', href: '/danh-muc-bai-viet-san-pham/cam-bien-lui' },
          { name: 'HUD hiển thị', href: '/danh-muc-bai-viet-san-pham/hud' },
          { name: 'Đầu DVD Android', href: '/danh-muc-bai-viet-san-pham/dau-dvd' },
          { name: 'Loa & Amply', href: '/danh-muc-bai-viet-san-pham/loa-amply' },
          { name: 'Bộ sạc USB', href: '/danh-muc-bai-viet-san-pham/bo-sac-usb' },
        ],
      },
    ],
  },
  'dich-vu': {
    title: 'Dịch vụ',
    columns: [
      {
        title: 'Dán phim cách nhiệt',
        icon: Film,
        items: [
          { name: 'Phim cách nhiệt 3M', href: '/dich-vu/phim-3m' },
          { name: 'Phim cách nhiệt Llumar', href: '/dich-vu/phim-llumar' },
          { name: 'Phim cách nhiệt V-Kool', href: '/dich-vu/phim-vkool' },
          { name: 'Bảo hành phim', href: '/dich-vu/bao-hanh-phim' },
        ],
      },
      {
        title: 'Bọc ghế da',
        icon: Car,
        items: [
          { name: 'Bọc ghế da thật', href: '/dich-vu/boc-ghe-da-that' },
          { name: 'Bọc ghế da simili', href: '/dich-vu/boc-ghe-da-simili' },
          { name: 'Nâng cấp nội thất', href: '/dich-vu/nang-cap-noi-that' },
        ],
      },
      {
        title: 'Nâng cấp âm thanh',
        icon: Music,
        items: [
          { name: 'Lắp đặt loa', href: '/dich-vu/lap-dat-loa' },
          { name: 'Lắp đặt amply', href: '/dich-vu/lap-dat-amply' },
          { name: 'Nâng cấp đầu DVD', href: '/dich-vu/nang-cap-dau-dvd' },
        ],
      },
    ],
  },
};

// Menu items
export const menuItems = [
  { name: 'Trang chủ', href: '/', hasMegaMenu: false },
  { name: 'Về chúng tôi', href: '/ve-chung-toi', hasMegaMenu: false },
  { name: 'Sản phẩm', href: '/danh-muc-bai-viet-san-pham', hasMegaMenu: true, key: 'danh-muc-bai-viet-san-pham' },
  { name: 'Dịch vụ', href: '/dich-vu', hasMegaMenu: true, key: 'dich-vu' },
  { name: 'Tin tức', href: '/tin-tuc', hasMegaMenu: false },
  { name: 'Liên hệ', href: '/lien-he', hasMegaMenu: false },
];

// Trending searches
export const trendingSearches = [
  {
    name: 'Phụ kiện nội thất ô tô',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop',
  },
  {
    name: 'Camera hành trình',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08e3?w=200&h=200&fit=crop',
  },
  {
    name: 'Dán phim cách nhiệt',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop',
  },
  {
    name: 'Bọc ghế da',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08e3?w=200&h=200&fit=crop',
  },
  {
    name: 'Đèn LED ô tô',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop',
  },
  {
    name: 'Loa xe hơi',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08e3?w=200&h=200&fit=crop',
  },
  {
    name: 'Vô lăng da',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop',
  },
  {
    name: 'Thảm sàn xe',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08e3?w=200&h=200&fit=crop',
  },
  {
    name: 'Cảm biến lùi',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop',
  },
  {
    name: 'Đầu DVD Android',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08e3?w=200&h=200&fit=crop',
  },
];

