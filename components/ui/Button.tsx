'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative font-medium rounded-xl
    flex items-center justify-center gap-2
    transition-all duration-200 ease-out-expo
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background
  `;
  
  const variants = {
    primary: `
      bg-primary text-background font-semibold
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
      hover:brightness-110 hover:shadow-glow-sm
      active:brightness-95
    `,
    secondary: `
      bg-surface-raised text-text-primary
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_1px_2px_rgba(0,0,0,0.2)]
      hover:bg-surface-raised/80
      active:bg-surface-raised/60
    `,
    outline: `
      border border-white/[0.1] text-text-primary
      hover:bg-white/[0.03] hover:border-white/[0.15]
      active:bg-white/[0.05]
    `,
    ghost: `
      text-text-secondary
      hover:text-text-primary hover:bg-white/[0.04]
      active:bg-white/[0.06]
    `,
    danger: `
      bg-error/10 text-error border border-error/20
      hover:bg-error/15 hover:border-error/30
      active:bg-error/20
    `,
  };
  
  const sizes = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };
  
  return (
    <motion.button
      whileHover={{ y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
