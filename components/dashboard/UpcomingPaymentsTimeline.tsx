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
      <div className="space-y-5">
        {sortedPayments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Timeline Line */}
            {index < sortedPayments.length - 1 && (
              <div className="absolute left-[7px] top-6 bottom-0 w-px bg-white/[0.06]" />
            )}

            {/* Payment Item */}
            <div className="flex items-start gap-3.5">
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.06 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="w-[15px] h-[15px] rounded-full bg-primary/20 mt-0.5 flex-shrink-0 flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
              </motion.div>

              {/* Payment Details */}
              <div className="flex-1 pb-5 last:pb-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium text-sm text-text-primary">{payment.serviceName}</h4>
                  <span className="text-data text-sm text-text-primary">
                    {formatCurrency(payment.amount, payment.currency)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <Clock size={11} />
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
