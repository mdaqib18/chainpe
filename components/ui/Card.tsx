'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className = '', 
  hover = true, 
  delay = 0,
  padding = 'md'
}: CardProps) {
  const paddingSizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={hover ? { 
        y: -2, 
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } 
      } : {}}
      className={`
        bg-surface/60 backdrop-blur-sm rounded-2xl ${paddingSizes[padding]}
        shadow-elevated
        ${hover ? 'transition-shadow duration-300 ease-out-expo hover:shadow-elevated-lg' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
