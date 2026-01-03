'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import { UpcomingPayment } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';

interface UpcomingPaymentsTimelineProps {
  payments: UpcomingPayment[];
}

export default function UpcomingPaymentsTimeline({ payments }: UpcomingPaymentsTimelineProps) {
  const sortedPayments = [...payments].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return (
    <Card hover={false}>
      <div className="space-y-6">
        {sortedPayments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Line */}
            {index < sortedPayments.length - 1 && (
              <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
            )}

            {/* Payment Item */}
            <div className="flex items-start gap-4">
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className="w-4 h-4 rounded-full bg-primary mt-1 flex-shrink-0 ring-4 ring-surface"
              />

              {/* Payment Details */}
              <div className="flex-1 pb-6 last:pb-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold">{payment.serviceName}</h4>
                  <span className="font-mono text-sm font-medium">
                    {formatCurrency(payment.amount, payment.currency)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock size={12} />
                  <span>{formatDate(payment.dueDate)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
