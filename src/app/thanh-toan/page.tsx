import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import ThanhToanContent from '@/components/thanh-toan/ThanhToanContent';
import EmptyCartRedirect from '@/components/thanh-toan/EmptyCartRedirect';

export const metadata: Metadata = generateSEOMetadata({
  ...seoData.sanPham,
  title: 'Thanh toán - Auto Tuan Linh',
  description: 'Hoàn tất đơn hàng của bạn',
});

export default function ThanhToanPage() {
  return (
    <>
      <EmptyCartRedirect />
      <ThanhToanContent />
    </>
  );
}

