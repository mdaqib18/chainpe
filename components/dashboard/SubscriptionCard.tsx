'use client';

import { motion } from 'framer-motion';
import { X, Calendar, DollarSign } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Subscription } from '@/lib/types';
import { formatDate, formatCurrency, getIntervalText } from '@/lib/utils';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import toast from 'react-hot-toast';

interface SubscriptionCardProps {
  subscription: Subscription;
  delay?: number;
  onCancel: (id: string) => void;
}

export default function SubscriptionCard({ subscription, delay = 0, onCancel }: SubscriptionCardProps) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    setIsCancelling(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onCancel(subscription.id);
    setIsCancelling(false);
    setIsCancelModalOpen(false);
    
    toast.success(`${subscription.serviceName} subscription cancelled`);
  };

  return (
    <>
      <Card delay={delay} hover={true}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            {/* Service Icon */}
            <div className="w-12 h-12 bg-surface-raised rounded-xl flex items-center justify-center text-xl">
              {subscription.serviceIcon}
            </div>

            {/* Service Info */}
            <div className="flex-1">
              <h3 className="text-base font-semibold mb-1 text-text-primary">{subscription.serviceName}</h3>
              <div className="flex items-center gap-3 text-xs text-text-secondary mb-2.5">
                <span className="flex items-center gap-1 text-data">
                  <DollarSign size={12} className="text-text-secondary/60" />
                  {formatCurrency(subscription.amount, subscription.currency)}
                </span>
                <span className="text-white/10">•</span>
                <span>{getIntervalText(subscription.interval)}</span>
              </div>
              
              {/* Next Payment */}
              <div className="flex items-center gap-1.5 text-xs">
                <Calendar size={12} className="text-primary/70" />
                <span className="text-text-secondary">Next:</span>
                <span className="font-medium text-text-primary">{formatDate(subscription.nextPayment)}</span>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsCancelModalOpen(true)}
          >
            <X size={14} />
            Cancel
          </Button>
        </div>
      </Card>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Cancel Subscription"
        size="sm"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 bg-error/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <X size={28} className="text-error" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-text-primary">
              Cancel {subscription.serviceName}?
            </h3>
            <p className="text-text-secondary text-sm">
              Your subscription will be cancelled immediately. No future charges will be made.
            </p>
          </div>

          <div className="bg-background/50 rounded-xl p-4 space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Service</span>
              <span className="font-medium text-text-primary">{subscription.serviceName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Amount</span>
              <span className="font-medium text-data text-text-primary">
                {formatCurrency(subscription.amount, subscription.currency)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Billing</span>
              <span className="font-medium text-text-primary">{getIntervalText(subscription.interval)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setIsCancelModalOpen(false)}
              disabled={isCancelling}
            >
              Keep Subscription
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={handleCancel}
              loading={isCancelling}
            >
              Yes, Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
