'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function WalletButton() {
  const { connected, publicKey } = useWallet();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {connected ? (
        <motion.div
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 px-3.5 py-2 bg-surface/60 rounded-xl text-sm border border-white/[0.06]"
        >
          <CheckCircle size={14} className="text-primary" />
          <span className="font-mono text-xs text-text-secondary">
            {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
          </span>
        </motion.div>
      ) : (
        <motion.div 
          whileHover={{ y: -1 }} 
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <WalletMultiButton className="!bg-primary !text-background !rounded-xl !font-medium !text-sm !px-4 !py-2.5 !transition-all !duration-200 hover:!brightness-110 !shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]" />
        </motion.div>
      )}
    </motion.div>
  );
}
