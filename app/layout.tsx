import type { Metadata } from "next";
import "./globals.css";
import { WalletContextProvider } from "@/components/providers/WalletProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import Navbar from "@/components/wallet/Navbar";

export const metadata: Metadata = {
  title: "ChainPe - Crypto-native Subscriptions",
  description: "Subscriptions, without banks. Built on Solana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          <Navbar />
          {children}
          <ToastProvider />
        </WalletContextProvider>
      </body>
    </html>
  );
}
