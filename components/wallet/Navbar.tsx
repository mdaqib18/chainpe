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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
              <span className="text-xl font-heading font-bold">ChainPe</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              if (item.requiresWallet && !connected) return null;
              
              const isActive = pathname === item.path;
              
              return (
                <Link key={item.path} href={item.path}>
                  <motion.span
                    whileHover={{ y: -2 }}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
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
