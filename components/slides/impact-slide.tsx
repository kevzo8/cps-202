'use client';

import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Shield, AlertTriangle } from 'lucide-react';

export default function ImpactSlide() {
  const impacts = [
    {
      icon: AlertTriangle,
      title: 'Security Risk',
      before: 'CRITICAL — Token validation failures could allow unauthorized access',
      after: 'MITIGATED — All auth flows secured and validated',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Shield,
      title: 'Data Protection',
      before: 'Client secrets exposed to XSS attacks',
      after: 'Secrets managed server-side with httpOnly cookies',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: TrendingDown,
      title: 'Operational Risk',
      before: 'Unhandled exceptions causing service instability',
      after: 'Global error handling with consistent responses',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: TrendingUp,
      title: 'Compliance',
      before: 'Audit logs missing, rate limiting disabled',
      after: 'Full audit trail + DDoS protection implemented',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-12">
      <motion.div className="max-w-5xl w-full space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Business Impact</h1>
          <p className="text-lg text-muted-foreground">
            Before and after: Risk mitigation across key areas
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {impacts.map((impact, idx) => {
            const IconComponent = impact.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`p-6 rounded-lg border-2 border-transparent hover:border-primary/50 transition-all ${impact.bgColor}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className={`${impact.color} w-6 h-6`} />
                  <h3 className="text-lg font-semibold text-foreground">{impact.title}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                      BEFORE
                    </div>
                    <p className="text-sm text-muted-foreground flex-1">
                      {impact.before}
                    </p>
                  </div>
                  
                  <div className="w-full h-px bg-gray-300" />
                  
                  <div className="flex gap-3">
                    <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded whitespace-nowrap">
                      AFTER
                    </div>
                    <p className="text-sm text-muted-foreground flex-1">
                      {impact.after}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg"
        >
          <h4 className="font-semibold text-foreground mb-2">Overall Risk Reduction</h4>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-semibold text-green-700">85% risk reduction</span> — Ready for production deployment
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
