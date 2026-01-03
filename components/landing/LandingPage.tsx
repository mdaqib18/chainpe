'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Zap, CheckCircle, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { connected } = useWallet();
  const router = useRouter();

  const handleGetStarted = () => {
    if (connected) {
      router.push('/dashboard');
    }
  };

  const features = [
    {
      icon: <Shield size={24} />,
      title: 'Non-custodial',
      description: 'Your keys, your crypto. We never hold your funds.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Transparent Timing',
      description: 'Know exactly when each payment will execute on-chain.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Cancel Anytime',
      description: 'Full control. Stop subscriptions instantly, no questions asked.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Connect Wallet',
      description: 'Use Phantom or Solflare to connect securely',
    },
    {
      number: '02',
      title: 'Create Subscription',
      description: 'Choose service, amount, and billing interval',
    },
    {
      number: '03',
      title: 'Approve Once',
      description: 'Sign the transaction—payments execute automatically',
    },
  ];

  const comparison = [
    { feature: 'No Credit Card Required', web2: false, chainpe: true },
    { feature: 'Cancel Anytime', web2: false, chainpe: true },
    { feature: 'Non-Custodial', web2: false, chainpe: true },
    { feature: 'Transparent Pricing', web2: false, chainpe: true },
    { feature: 'Global Access', web2: false, chainpe: true },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-4 py-2 bg-surface border border-primary/30 rounded-full"
          >
            <span className="text-sm text-primary font-medium">Built on Solana</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-7xl font-heading font-bold mb-6 leading-tight"
          >
            Subscriptions,
            <br />
            <span className="text-gradient">without banks.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto"
          >
            Crypto-native recurring payments that respect your autonomy. 
            No credit cards, no middlemen, no surprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" onClick={handleGetStarted}>
              {connected ? 'Go to Dashboard' : 'Connect Wallet'}
              <ArrowRight size={20} />
            </Button>
            <Button variant="outline" size="lg">
              See How It Works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold mb-4">
              Built for the Web3 era
            </h2>
            <p className="text-text-secondary text-lg">
              Everything you expect from subscriptions, minus the baggage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} delay={index * 0.1}>
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold mb-4">
              Three steps to recurring crypto
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-heading font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-primary">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold mb-4">
              Web2 vs ChainPe
            </h2>
            <p className="text-text-secondary text-lg">
              See the difference yourself
            </p>
          </motion.div>

          <Card hover={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-text-secondary">
                      Traditional Web2
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">
                      ChainPe
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border-b border-gray-800 last:border-0"
                    >
                      <td className="py-4 px-4">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.web2 ? (
                          <CheckCircle size={20} className="text-success inline" />
                        ) : (
                          <X size={20} className="text-error inline" />
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.chainpe ? (
                          <CheckCircle size={20} className="text-primary inline" />
                        ) : (
                          <X size={20} className="text-error inline" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-heading font-bold mb-6">
              Ready to take control?
            </h2>
            <p className="text-xl text-text-secondary mb-10">
              Connect your wallet and start your first subscription in minutes
            </p>
            <Button size="lg" onClick={handleGetStarted}>
              {connected ? 'Go to Dashboard' : 'Get Started'}
              <ArrowRight size={20} />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
