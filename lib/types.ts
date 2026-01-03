export interface Subscription {
  id: string;
  serviceName: string;
  serviceIcon: string;
  amount: number;
  currency: string;
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextPayment: Date;
  status: 'active' | 'cancelled' | 'paused';
  createdAt: Date;
  walletAddress: string;
}

export interface UpcomingPayment {
  id: string;
  subscriptionId: string;
  serviceName: string;
  amount: number;
  currency: string;
  dueDate: Date;
  status: 'pending' | 'completed' | 'failed';
}

// Mock data for demo
export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    serviceName: 'Netflix',
    serviceIcon: '🎬',
    amount: 15.99,
    currency: 'USDC',
    interval: 'monthly',
    nextPayment: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'active',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    walletAddress: '0x123...abc',
  },
  {
    id: '2',
    serviceName: 'Spotify',
    serviceIcon: '🎵',
    amount: 9.99,
    currency: 'USDC',
    interval: 'monthly',
    nextPayment: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    status: 'active',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    walletAddress: '0x123...abc',
  },
  {
    id: '3',
    serviceName: 'GitHub Pro',
    serviceIcon: '💻',
    amount: 4.00,
    currency: 'USDC',
    interval: 'monthly',
    nextPayment: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    status: 'active',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    walletAddress: '0x123...abc',
  },
];

export const mockUpcomingPayments: UpcomingPayment[] = [
  {
    id: '1',
    subscriptionId: '1',
    serviceName: 'Netflix',
    amount: 15.99,
    currency: 'USDC',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '2',
    subscriptionId: '2',
    serviceName: 'Spotify',
    amount: 9.99,
    currency: 'USDC',
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '3',
    subscriptionId: '3',
    serviceName: 'GitHub Pro',
    amount: 4.00,
    currency: 'USDC',
    dueDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    status: 'pending',
  },
];
