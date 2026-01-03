'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#111827',
          color: '#E5E7EB',
          border: '1px solid rgba(75, 85, 99, 0.3)',
          borderRadius: '12px',
          padding: '16px',
        },
        success: {
          iconTheme: {
            primary: '#22C55E',
            secondary: '#111827',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#111827',
          },
        },
      }}
    />
  );
}
