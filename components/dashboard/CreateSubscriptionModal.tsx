'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { ArrowRight, CheckCircle, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

interface CreateSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Service {
  id: string;
  name: string;
  icon: string;
  category: string;
}

const mockServices: Service[] = [
  { id: '1', name: 'Netflix', icon: '🎬', category: 'Entertainment' },
  { id: '2', name: 'Spotify', icon: '🎵', category: 'Music' },
  { id: '3', name: 'GitHub Pro', icon: '💻', category: 'Developer' },
  { id: '4', name: 'Notion', icon: '📝', category: 'Productivity' },
  { id: '5', name: 'Figma', icon: '🎨', category: 'Design' },
  { id: '6', name: 'ChatGPT Plus', icon: '🤖', category: 'AI' },
];

export default function CreateSubscriptionModal({ isOpen, onClose }: CreateSubscriptionModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [amount, setAmount] = useState('9.99');
  const [interval, setInterval] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const intervals = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const handleClose = () => {
    setStep(1);
    setSelectedService(null);
    setAmount('9.99');
    setInterval('monthly');
    setIsSuccess(false);
    onClose();
  };

  const handleNext = () => {
    if (step === 1 && !selectedService) {
      toast.error('Please select a service');
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreate = async () => {
    setIsCreating(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCreating(false);
    setIsSuccess(true);
    
    toast.success('Subscription created successfully!');
    
    // Close modal after success animation
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <div className="min-h-[400px]">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: s <= step ? '#14F195' : 'rgba(255, 255, 255, 0.04)',
                  color: s <= step ? '#0A0D12' : 'rgba(255, 255, 255, 0.4)',
                }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold"
              >
                {s < step ? <CheckCircle size={14} /> : s}
              </motion.div>
              {s < 3 && (
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: s < step ? 'rgba(20, 241, 149, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                  }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 h-0.5 mx-3 rounded-full"
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Service */}
          {step === 1 && !isSuccess && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-base font-semibold mb-5 text-text-primary">Select Service</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {mockServices.map((service) => (
                  <motion.button
                    key={service.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      selectedService?.id === service.id
                        ? 'bg-primary/10 ring-1 ring-primary/40'
                        : 'bg-surface-raised/50 hover:bg-surface-raised'
                    }`}
                  >
                    <div className="text-3xl mb-2">{service.icon}</div>
                    <div className="text-sm font-medium text-text-primary">{service.name}</div>
                    <div className="text-xs text-text-secondary mt-0.5">{service.category}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Configure Plan */}
          {step === 2 && !isSuccess && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-base font-semibold mb-5 text-text-primary">Configure Plan</h3>
              
              {selectedService && (
                <div className="bg-surface-raised/50 rounded-xl p-4 mb-6 flex items-center gap-3">
                  <div className="text-2xl">{selectedService.icon}</div>
                  <div>
                    <div className="font-medium text-sm text-text-primary">{selectedService.name}</div>
                    <div className="text-xs text-text-secondary">{selectedService.category}</div>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Amount (USDC)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50" />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="input-field pl-10"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Billing Interval</label>
                  <div className="grid grid-cols-4 gap-2">
                    {intervals.map((int) => (
                      <button
                        key={int.value}
                        onClick={() => setInterval(int.value as any)}
                        className={`py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          interval === int.value
                            ? 'bg-primary/10 text-primary ring-1 ring-primary/40'
                            : 'bg-surface-raised/50 text-text-secondary hover:bg-surface-raised hover:text-text-primary'
                        }`}
                      >
                        {int.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && !isSuccess && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-base font-semibold mb-5 text-text-primary">Confirm & Sign</h3>
              
              <div className="bg-surface-raised/50 rounded-xl p-5 space-y-4 mb-5">
                {selectedService && (
                  <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                    <div className="text-2xl">{selectedService.icon}</div>
                    <div>
                      <div className="font-medium text-text-primary">{selectedService.name}</div>
                      <div className="text-xs text-text-secondary">{selectedService.category}</div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Amount</span>
                    <span className="text-data text-text-primary">{amount} USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Billing</span>
                    <span className="font-medium capitalize text-text-primary">{interval}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-white/[0.06] text-sm">
                    <span className="text-text-secondary">First Payment</span>
                    <span className="font-medium text-text-primary">Today</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-4 text-sm text-text-secondary">
                You'll be asked to sign a transaction in your wallet. This allows automatic recurring payments.
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-14"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-5"
              >
                <CheckCircle size={36} className="text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-1.5 text-text-primary">Subscription Created!</h3>
              <p className="text-text-secondary text-sm">Your subscription is now active</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {!isSuccess && (
          <div className="flex gap-3 mt-8 pt-6 border-t border-white/[0.06]">
            {step > 1 && (
              <Button variant="ghost" onClick={handleBack} className="flex-1">
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="flex-1">
                Next
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleCreate} loading={isCreating} className="flex-1">
                {isCreating ? 'Creating...' : 'Sign & Create'}
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
