'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletButton from './WalletButton';

export default function Navbar() {
  const { connected } = useWallet();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', requiresWallet: true },
  ];

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30 bg-background/70 backdrop-blur-xl border-b border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-heading font-semibold text-text-primary">ChainPe</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              if (item.requiresWallet && !connected) return null;
              
              const isActive = pathname === item.path;
              
              return (
                <Link key={item.path} href={item.path}>
                  <motion.span
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-text-primary' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              );
            })}
            
            <WalletButton />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
