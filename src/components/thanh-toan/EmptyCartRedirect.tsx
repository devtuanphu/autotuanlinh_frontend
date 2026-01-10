'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function EmptyCartRedirect() {
  const { getItemCount } = useCart();
  const router = useRouter();

  React.useEffect(() => {
    // Skip redirect if we're in the process of placing an order
    // This flag is set when order is successful and we want to redirect to thank you page
    if (typeof window !== 'undefined') {
      const skipRedirect = localStorage.getItem('skipEmptyCartRedirect');
      if (skipRedirect === 'true') {
        // Clear the flag
        localStorage.removeItem('skipEmptyCartRedirect');
        return;
      }
    }
    
    if (getItemCount() === 0) {
      router.push('/gio-hang');
    }
  }, [getItemCount, router]);

  return null;
}

