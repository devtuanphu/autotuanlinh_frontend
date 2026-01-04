import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import EmptyCartSection from '@/components/gio-hang/EmptyCartSection';
import GioHangContent from '@/components/gio-hang/GioHangContent';

export const metadata: Metadata = generateSEOMetadata({
  ...seoData.sanPham,
  title: 'Giỏ hàng - Auto Tuan Linh',
  description: 'Xem và quản lý sản phẩm trong giỏ hàng của bạn',
});

export default function GioHangPage() {
  return (
    <>
      <EmptyCartSection />
      <GioHangContent />
    </>
  );
}

