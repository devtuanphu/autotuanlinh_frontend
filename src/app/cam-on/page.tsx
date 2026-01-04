import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoData } from '@/lib/seo';
import CamOnContent from '@/components/cam-on/CamOnContent';

export const metadata: Metadata = generateSEOMetadata({
  ...seoData.sanPham,
  title: 'Cảm ơn bạn - Auto Tuan Linh',
  description: 'Cảm ơn bạn đã đặt hàng tại Auto Tuan Linh',
});

export default function CamOnPage() {
  return <CamOnContent />;
}

