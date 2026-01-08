'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import Toast, { Toast as ToastType } from '@/components/shared/Toast';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const lastToastRef = useRef<{ message: string; timestamp: number } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
    const now = Date.now();
    
    // Prevent duplicate toasts with same message within 500ms
    if (
      lastToastRef.current &&
      lastToastRef.current.message === message &&
      now - lastToastRef.current.timestamp < 500
    ) {
      return; // Skip duplicate
    }
    
    lastToastRef.current = { message, timestamp: now };
    
    const id = `toast-${now}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>
      {/* Toast Container - Render outside provider to ensure highest z-index - High z-index to appear above header */}
      <div 
        className="fixed top-20 right-4 flex flex-col gap-3 pointer-events-none" 
        style={{ zIndex: 10000, position: 'fixed' }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onClose={removeToast} />
          </div>
        ))}
      </div>
    </>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

