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
      icon: <Shield size={22} />,
      title: 'Non-custodial',
      description: 'Your keys, your crypto. We never hold your funds.',
    },
    {
      icon: <Clock size={22} />,
      title: 'Transparent Timing',
      description: 'Know exactly when each payment will execute on-chain.',
    },
    {
      icon: <Zap size={22} />,
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
      <section className="relative pt-24 pb-40 px-6 overflow-hidden">
        {/* Gradient Background - more subtle */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-surface/40 backdrop-blur-sm rounded-full border border-white/[0.06]"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span className="text-sm text-text-secondary font-medium">Built on Solana</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-heading font-semibold mb-6 leading-[1.1] tracking-tight"
          >
            Subscriptions,
            <br />
            <span className="text-gradient">without banks.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-text-secondary mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Crypto-native recurring payments that respect your autonomy. 
            No credit cards, no middlemen, no surprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button size="lg" onClick={handleGetStarted}>
              {connected ? 'Go to Dashboard' : 'Connect Wallet'}
              <ArrowRight size={18} />
            </Button>
            <Button variant="outline" size="lg">
              See How It Works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding px-6 bg-surface/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 tracking-tight">
              Built for the Web3 era
            </h2>
            <p className="text-text-secondary text-base max-w-lg mx-auto">
              Everything you expect from subscriptions, minus the baggage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <Card key={index} delay={index * 0.08} padding="lg">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-text-primary">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight">
              Three steps to recurring crypto
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="text-5xl font-heading font-semibold text-white/[0.04] mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 -right-6 text-white/10">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding px-6 bg-surface/20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 tracking-tight">
              Web2 vs ChainPe
            </h2>
            <p className="text-text-secondary text-base">
              See the difference yourself
            </p>
          </motion.div>

          <Card hover={false} padding="sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-4 px-5 font-medium text-sm text-text-primary">Feature</th>
                    <th className="text-center py-4 px-5 font-medium text-sm text-text-secondary">
                      Traditional Web2
                    </th>
                    <th className="text-center py-4 px-5 font-medium text-sm text-primary">
                      ChainPe
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-white/[0.04] last:border-0"
                    >
                      <td className="py-4 px-5 text-sm text-text-secondary">{row.feature}</td>
                      <td className="py-4 px-5 text-center">
                        {row.web2 ? (
                          <CheckCircle size={18} className="text-primary inline" />
                        ) : (
                          <X size={18} className="text-text-secondary/40 inline" />
                        )}
                      </td>
                      <td className="py-4 px-5 text-center">
                        {row.chainpe ? (
                          <CheckCircle size={18} className="text-primary inline" />
                        ) : (
                          <X size={18} className="text-text-secondary/40 inline" />
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
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-6 tracking-tight">
              Ready to take control?
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
              Connect your wallet and start your first subscription in minutes
            </p>
            <Button size="lg" onClick={handleGetStarted}>
              {connected ? 'Go to Dashboard' : 'Get Started'}
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
