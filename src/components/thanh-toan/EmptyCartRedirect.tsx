'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function EmptyCartRedirect() {
  const { getItemCount } = useCart();
  const router = useRouter();

  React.useEffect(() => {
    if (getItemCount() === 0) {
      router.push('/gio-hang');
    }
  }, [getItemCount, router]);

  return null;
}

