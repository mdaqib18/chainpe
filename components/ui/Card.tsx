'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function Card({ children, className = '', hover = true, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`bg-surface rounded-xl p-6 border border-gray-800 ${
        hover ? 'hover:border-primary/30 hover:shadow-xl transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
