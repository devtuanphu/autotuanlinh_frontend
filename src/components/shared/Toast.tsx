'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export default function ToastComponent({ toast, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose(toast.id);
      }, 300); // Wait for fade out animation
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  const config = {
    success: {
      bg: 'bg-green-500',
      icon: CheckCircle,
      border: 'border-green-600',
    },
    error: {
      bg: 'bg-red-500',
      icon: AlertCircle,
      border: 'border-red-600',
    },
    info: {
      bg: 'bg-blue-500',
      icon: Info,
      border: 'border-blue-600',
    },
  }[toast.type || 'success'];

  const Icon = config.icon;

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
      style={{ zIndex: 10000 }}
    >
      <div
        className={`${config.bg} ${config.border} border-l-4 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[320px] max-w-md backdrop-blur-sm relative`}
        style={{ zIndex: 10000 }}
      >
        <Icon size={22} className="flex-shrink-0" />
        <p className="flex-1 font-medium text-sm leading-relaxed">{toast.message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(toast.id), 300);
          }}
          className="flex-shrink-0 hover:bg-white/20 rounded-full p-1.5 transition-colors"
          aria-label="Đóng"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

