import type { Metadata } from "next";

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    title?: string;
    description?: string;
    images?: string[];
  };
}

const defaultImage = {
  url: "/images/logo-auto.png",
  width: 1200,
  height: 630,
  alt: "Auto Tuan Linh - Phụ kiện ô tô chính hãng",
};

const baseUrl = "https://autotuanlinh.com";

export function generateMetadata(seoData: SEOData): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    openGraph,
    twitter,
  } = seoData;

  const fullTitle = title.includes("Auto Tuan Linh")
    ? title
    : `${title} | Auto Tuan Linh`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : undefined,
    },
    openGraph: {
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || description,
      url: openGraph?.url || (canonical ? `${baseUrl}${canonical}` : baseUrl),
      type: "website",
      locale: "vi_VN",
      siteName: "Auto Tuan Linh",
      images: openGraph?.images || [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: twitter?.title || fullTitle,
      description: twitter?.description || description,
      images: twitter?.images || [defaultImage.url],
    },
  };

  return metadata;
}

// SEO Data cho các page
export const seoData = {
  home: {
    title: "Trang chủ",
    description:
      "Auto Tuan Linh - Chuyên cung cấp phụ kiện ô tô chính hãng, dịch vụ dán phim cách nhiệt, bọc ghế da, nâng cấp âm thanh. Cam kết chất lượng, giá tốt nhất thị trường.",
    keywords: [
      "phụ kiện ô tô",
      "phụ kiện xe hơi",
      "dán phim cách nhiệt",
      "bọc ghế da",
      "nâng cấp âm thanh xe hơi",
      "Auto Tuan Linh",
    ],
    canonical: "/",
  },
  tinTuc: {
    title: "Tin tức - Cập nhật mới nhất về phụ kiện ô tô",
    description:
      "Cập nhật tin tức mới nhất về phụ kiện ô tô, xu hướng, đánh giá sản phẩm, hướng dẫn sử dụng và nhiều thông tin hữu ích khác từ Auto Tuan Linh.",
    keywords: [
      "tin tức phụ kiện ô tô",
      "bài viết về xe hơi",
      "xu hướng phụ kiện",
      "đánh giá sản phẩm ô tô",
      "hướng dẫn bảo dưỡng xe",
      "Auto Tuan Linh",
    ],
    canonical: "/tin-tuc",
  },
  lienHe: {
    title: "Liên hệ - Auto Tuan Linh",
    description:
      "Liên hệ với Auto Tuan Linh để được tư vấn về phụ kiện ô tô, dịch vụ dán phim cách nhiệt, bọc ghế da, nâng cấp âm thanh. Hotline: 1900 123 456",
    keywords: [
      "liên hệ Auto Tuan Linh",
      "tư vấn phụ kiện ô tô",
      "địa chỉ cửa hàng",
      "hotline phụ kiện ô tô",
      "Auto Tuan Linh",
    ],
    canonical: "/lien-he",
  },
  veChungToi: {
    title: "Về chúng tôi - Auto Tuan Linh",
    description:
      "Tìm hiểu về Auto Tuan Linh - Đơn vị chuyên cung cấp phụ kiện ô tô chính hãng và dịch vụ chăm sóc xe chuyên nghiệp. Hơn 10 năm kinh nghiệm phục vụ khách hàng.",
    keywords: [
      "về Auto Tuan Linh",
      "giới thiệu công ty",
      "lịch sử công ty",
      "đội ngũ Auto Tuan Linh",
      "Auto Tuan Linh",
    ],
    canonical: "/ve-chung-toi",
  },
  dichVu: {
    title: "Dịch vụ - Auto Tuan Linh",
    description:
      "Khám phá các dịch vụ chuyên nghiệp tại Auto Tuan Linh: dán phim cách nhiệt, bọc ghế da, nâng cấp âm thanh, bảo dưỡng xe và nhiều dịch vụ khác.",
    keywords: [
      "dịch vụ ô tô",
      "dán phim cách nhiệt",
      "bọc ghế da",
      "nâng cấp âm thanh xe hơi",
      "bảo dưỡng xe",
      "dịch vụ Auto Tuan Linh",
    ],
    canonical: "/dich-vu",
  },
  danhMucBaiVietSanPham: {
    title: "Danh mục bài viết sản phẩm - Auto Tuan Linh",
    description:
      "Khám phá các bài viết, hướng dẫn sử dụng, đánh giá và thông tin chi tiết về phụ kiện ô tô chính hãng từ Auto Tuan Linh.",
    keywords: [
      "bài viết phụ kiện ô tô",
      "hướng dẫn sử dụng phụ kiện",
      "đánh giá sản phẩm ô tô",
      "thông tin sản phẩm",
      "danh mục bài viết",
      "Auto Tuan Linh",
    ],
    canonical: "/danh-muc-bai-viet-san-pham",
  },
  ketQuaTimKiem: {
    title: "Kết quả tìm kiếm - Auto Tuan Linh",
    description:
      "Tìm kiếm sản phẩm, dịch vụ và bài viết về phụ kiện ô tô tại Auto Tuan Linh.",
    keywords: [
      "tìm kiếm phụ kiện ô tô",
      "tìm kiếm sản phẩm",
      "tìm kiếm dịch vụ",
      "Auto Tuan Linh",
    ],
    canonical: "/ket-qua-tim-kiem",
  },
  sanPham: {
    title: "Sản phẩm - Auto Tuan Linh",
    description:
      "Khám phá các sản phẩm phụ kiện ô tô chính hãng tại Auto Tuan Linh: phụ kiện nội thất, ngoại thất, đồ chơi xe hơi, bảo dưỡng và nhiều sản phẩm khác.",
    keywords: [
      "phụ kiện ô tô",
      "phụ kiện nội thất ô tô",
      "phụ kiện ngoại thất ô tô",
      "đồ chơi xe hơi",
      "sản phẩm ô tô",
      "Auto Tuan Linh",
    ],
    canonical: "/san-pham",
  },
};

// Structured Data (JSON-LD) cho SEO
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "name": "Auto Tuan Linh",
    "description": "Chuyên cung cấp phụ kiện ô tô chính hãng và dịch vụ chăm sóc xe chuyên nghiệp",
    "url": "https://autotuanlinh.com",
    "logo": "https://autotuanlinh.com/images/logo-auto.png",
    "image": "https://autotuanlinh.com/images/logo-auto.png",
    "telephone": "1900123456",
    "email": "info@autotuanlinh.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Đường ABC",
      "addressLocality": "Quận XYZ",
      "addressRegion": "TP.HCM",
      "addressCountry": "VN"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    },
    "sameAs": [
      "https://facebook.com/autotuanlinh",
      "https://instagram.com/autotuanlinh",
      "https://youtube.com/autotuanlinh"
    ]
  };
}

