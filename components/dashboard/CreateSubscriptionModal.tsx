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
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: s <= step ? '#14F195' : '#374151',
                  scale: s === step ? 1.1 : 1,
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              >
                {s < step ? <CheckCircle size={16} /> : s}
              </motion.div>
              {s < 3 && (
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: s < step ? '#14F195' : '#374151',
                  }}
                  className="flex-1 h-1 mx-2"
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6">Select Service</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {mockServices.map((service) => (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedService?.id === service.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="text-4xl mb-2">{service.icon}</div>
                    <div className="text-sm font-medium">{service.name}</div>
                    <div className="text-xs text-text-secondary mt-1">{service.category}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Configure Plan */}
          {step === 2 && !isSuccess && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6">Configure Plan</h3>
              
              {selectedService && (
                <div className="bg-background rounded-lg p-4 mb-6 flex items-center gap-3">
                  <div className="text-3xl">{selectedService.icon}</div>
                  <div>
                    <div className="font-semibold">{selectedService.name}</div>
                    <div className="text-sm text-text-secondary">{selectedService.category}</div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (USDC)</label>
                  <div className="relative">
                    <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-background border border-gray-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Billing Interval</label>
                  <div className="grid grid-cols-4 gap-2">
                    {intervals.map((int) => (
                      <button
                        key={int.value}
                        onClick={() => setInterval(int.value as any)}
                        className={`py-3 rounded-lg border-2 transition-all ${
                          interval === int.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-800 hover:border-gray-700'
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6">Confirm & Sign</h3>
              
              <div className="bg-background rounded-lg p-6 space-y-4 mb-6">
                {selectedService && (
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                    <div className="text-3xl">{selectedService.icon}</div>
                    <div>
                      <div className="font-semibold text-lg">{selectedService.name}</div>
                      <div className="text-sm text-text-secondary">{selectedService.category}</div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Amount</span>
                    <span className="font-mono font-semibold">{amount} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Billing</span>
                    <span className="font-medium capitalize">{interval}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-800">
                    <span className="text-text-secondary">First Payment</span>
                    <span className="font-medium">Today</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-sm text-text-secondary">
                You'll be asked to sign a transaction in your wallet. This allows automatic recurring payments.
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle size={48} className="text-success" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">Subscription Created!</h3>
              <p className="text-text-secondary">Your subscription is now active</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {!isSuccess && (
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-800">
            {step > 1 && (
              <Button variant="ghost" onClick={handleBack} className="flex-1">
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="flex-1">
                Next
                <ArrowRight size={18} />
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
