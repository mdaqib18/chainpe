# ChainPe - Crypto-native Subscriptions

A demo-ready Web3 subscription platform built on Solana. ChainPe enables users to manage recurring crypto payments with full transparency and control.

## Features

- 🔐 **Wallet Integration** - Connect with Phantom or Solflare
- 💳 **Subscription Management** - Create, view, and cancel subscriptions
- 📊 **Dashboard** - Track active subscriptions and upcoming payments
- ⚡ **Built on Solana** - Fast and cost-effective transactions
- 🎨 **Premium UI** - Web2-polished design with smooth animations
- 🌙 **Dark Theme** - Easy on the eyes, professional look

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Blockchain**: Solana (via @solana/wallet-adapter)
- **Wallets**: Phantom, Solflare
- **Notifications**: React Hot Toast

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
chainpe/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page
│   └── dashboard/         # Dashboard pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── wallet/           # Wallet-related components
│   ├── landing/          # Landing page sections
│   ├── dashboard/        # Dashboard components
│   └── providers/        # Context providers
├── lib/                  # Utilities and types
└── public/               # Static assets
```

## Key Components

### Landing Page
- Hero section with gradient background
- Features showcase
- How it works (3-step process)
- Web2 vs ChainPe comparison table
- Call-to-action sections

### Dashboard
- Summary cards (active subscriptions, monthly spend, next payment)
- Subscription cards with cancel functionality
- Upcoming payments timeline
- Create subscription wizard (3-step flow)

### Wallet Integration
- Sticky navigation with wallet button
- Auto-connect functionality
- Network status display
- Wallet address display (truncated)

## Design System

### Colors
- Background: `#0B0F14`
- Surface: `#111827`
- Primary (Solana Green): `#14F195`
- Secondary (Violet): `#8B5CF6`
- Success: `#22C55E`
- Error: `#EF4444`

### Typography
- Headings: Space Grotesk
- Body: Inter
- Monospace: JetBrains Mono

### Animations
- Fade in on page load
- Stagger animations for lists
- Hover elevations on cards
- Modal scale transitions
- Timeline draw animations

## Mock Data

The application uses mock data for demo purposes. In production, this would be replaced with actual on-chain data from Solana smart contracts.

## Future Enhancements

- Smart contract integration
- Real payment execution
- Transaction history
- Email notifications
- Multi-token support
- Subscription templates

## License

MIT

---

Built with ❤️ for the Web3 community
