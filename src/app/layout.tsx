import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import HeaderMobile from "@/components/layout/HeaderMobile";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
import FloatingHotline from "@/components/shared/FloatingHotline";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "../style/global.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "Auto Tuan Linh - Phụ kiện ô tô chính hãng & Dịch vụ chuyên nghiệp",
    template: "%s | Auto Tuan Linh",
  },
  description: "Chuyên cung cấp phụ kiện ô tô chính hãng, dịch vụ dán phim cách nhiệt, bọc ghế da, nâng cấp âm thanh. Cam kết chất lượng, giá tốt nhất thị trường. Giao hàng nhanh, miễn phí vận chuyển.",
  keywords: [
    "phụ kiện ô tô",
    "phụ kiện xe hơi",
    "dán phim cách nhiệt",
    "bọc ghế da",
    "nâng cấp âm thanh xe hơi",
    "sửa chữa ô tô",
    "bảo dưỡng xe",
    "đồ chơi xe hơi",
    "Auto Tuan Linh",
  ],
  authors: [{ name: "Auto Tuan Linh" }],
  creator: "Auto Tuan Linh",
  publisher: "Auto Tuan Linh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://autotuanlinh.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://autotuanlinh.com",
    title: "Auto Tuan Linh - Phụ kiện ô tô chính hãng & Dịch vụ chuyên nghiệp",
    description: "Chuyên cung cấp phụ kiện ô tô chính hãng, dịch vụ dán phim cách nhiệt, bọc ghế da, nâng cấp âm thanh. Cam kết chất lượng, giá tốt nhất thị trường.",
    siteName: "Auto Tuan Linh",
    images: [
      {
        url: "/images/logo-auto.png",
        width: 1200,
        height: 630,
        alt: "Auto Tuan Linh - Phụ kiện ô tô chính hãng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Tuan Linh - Phụ kiện ô tô chính hãng & Dịch vụ chuyên nghiệp",
    description: "Chuyên cung cấp phụ kiện ô tô chính hãng, dịch vụ chăm sóc xe chuyên nghiệp",
    images: ["/images/logo-auto.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Thêm Google Search Console verification code khi có
    // google: "your-google-verification-code",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${roboto.variable} antialiased bg-gray-100 font-sans m-0 p-0`}
      >
        <NextTopLoader
          color="#10b981"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #10b981,0 0 5px #10b981"
          zIndex={1600}
          showAtBottom={false}
        />
        <ToastProvider>
          <CartProvider>
            <Header />
            <HeaderMobile />
            {children}
            <Footer />
            <FloatingHotline />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
