'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Plus } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockSubscriptions, mockUpcomingPayments } from '@/lib/types';
import { formatCurrency, getIntervalText } from '@/lib/utils';
import SubscriptionCard from './SubscriptionCard';
import UpcomingPaymentsTimeline from './UpcomingPaymentsTimeline';
import { useState } from 'react';
import CreateSubscriptionModal from './CreateSubscriptionModal';

export default function DashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const totalMonthlySpend = activeSubscriptions.reduce((sum, sub) => {
    if (sub.interval === 'monthly') return sum + sub.amount;
    if (sub.interval === 'yearly') return sum + sub.amount / 12;
    if (sub.interval === 'weekly') return sum + sub.amount * 4;
    if (sub.interval === 'daily') return sum + sub.amount * 30;
    return sum;
  }, 0);

  const nextPayment = mockUpcomingPayments
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())[0];

  const handleCancelSubscription = (id: string) => {
    setSubscriptions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, status: 'cancelled' as const } : sub)
    );
  };

  return (
    <div className="min-h-screen py-12 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-3xl font-heading font-semibold mb-1.5 tracking-tight">Your Subscriptions</h1>
            <p className="text-text-secondary text-sm">Manage all your recurring payments in one place</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={18} />
            New Subscription
          </Button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <Card delay={0}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Active Subscriptions</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-2xl font-semibold text-data"
                >
                  {activeSubscriptions.length}
                </motion.p>
              </div>
            </div>
          </Card>

          <Card delay={0.08}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-surface-raised rounded-xl flex items-center justify-center">
                <DollarSign size={20} className="text-text-secondary" />
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Monthly Spend</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="text-2xl font-semibold text-data"
                >
                  {formatCurrency(totalMonthlySpend)}
                </motion.p>
              </div>
            </div>
          </Card>

          <Card delay={0.16}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-surface-raised rounded-xl flex items-center justify-center">
                <Calendar size={20} className="text-text-secondary" />
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Next Payment</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-2xl font-semibold text-data"
                >
                  {nextPayment ? formatCurrency(nextPayment.amount) : '-'}
                </motion.p>
                {nextPayment && (
                  <p className="text-text-secondary text-xs mt-0.5">
                    {nextPayment.serviceName}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscriptions List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-heading font-semibold mb-5 text-text-primary">Active Subscriptions</h2>
            {activeSubscriptions.length === 0 ? (
              <Card hover={false}>
                <div className="text-center py-14">
                  <p className="text-text-secondary text-sm mb-5">No active subscriptions yet</p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    Create Your First Subscription
                  </Button>
                </div>
              </Card>
            ) : (
              activeSubscriptions.map((subscription, index) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  delay={index * 0.06}
                  onCancel={handleCancelSubscription}
                />
              ))
            )}
          </div>

          {/* Upcoming Payments Timeline */}
          <div>
            <h2 className="text-lg font-heading font-semibold mb-5 text-text-primary">Upcoming Payments</h2>
            <UpcomingPaymentsTimeline payments={mockUpcomingPayments} />
          </div>
        </div>
      </div>

      <CreateSubscriptionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
