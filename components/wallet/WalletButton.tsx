'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { Wallet, CheckCircle } from 'lucide-react';

export default function WalletButton() {
  const { connected, publicKey } = useWallet();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {connected ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2 px-4 py-2 bg-surface border border-primary/30 rounded-lg text-sm"
        >
          <CheckCircle size={16} className="text-primary" />
          <span className="font-mono text-xs">
            {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
          </span>
        </motion.div>
      ) : (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <WalletMultiButton className="!bg-primary !text-background hover:!bg-primary/90 !rounded-lg !font-medium !transition-all !duration-200" />
        </motion.div>
      )}
    </motion.div>
  );
}
