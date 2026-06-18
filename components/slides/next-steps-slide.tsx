'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

export default function NextStepsSlide() {
  const nextSteps = [
    {
      number: 1,
      title: 'Stakeholder Alignment',
      description: 'Confirm deployment timeline and resource allocation with executive sponsors',
      timeline: 'This week',
    },
    {
      number: 2,
      title: 'Testing & Validation',
      description: 'Execute comprehensive UAT and load testing in staging environment',
      timeline: 'Weeks 2–3',
    },
    {
      number: 3,
      title: 'Production Deployment',
      description: 'Execute blue-green deployment with continuous monitoring',
      timeline: 'Week 4–6',
    },
    {
      number: 4,
      title: 'Post-Launch Monitoring',
      description: 'Track metrics, validate SSO integration, optimize performance',
      timeline: 'Ongoing',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
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
          <h1 className="text-5xl font-bold text-foreground">Next Steps & Q&A</h1>
          <p className="text-lg text-muted-foreground">
            Immediate actions and timeline to production readiness
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {nextSteps.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <motion.div
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border-2 border-primary text-primary font-bold text-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: idx * 0.2, repeat: Infinity }}
                  >
                    {step.number}
                  </motion.div>
                </div>

                <div className="flex-1 pt-2">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {idx < nextSteps.length - 1 && (
                  <motion.div
                    className="absolute left-12 top-full w-0.5 h-12 bg-primary/30 -ml-6"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8"
        >
          <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="text-green-600 mb-3" size={24} />
            <h4 className="font-semibold text-foreground mb-2">Ready</h4>
            <p className="text-sm text-muted-foreground">
              Code is tested and production-ready
            </p>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
            <MessageCircle className="text-blue-600 mb-3" size={24} />
            <h4 className="font-semibold text-foreground mb-2">Support</h4>
            <p className="text-sm text-muted-foreground">
              Full technical support during deployment
            </p>
          </div>

          <div className="p-5 bg-purple-50 border border-purple-200 rounded-lg">
            <ArrowRight className="text-purple-600 mb-3" size={24} />
            <h4 className="font-semibold text-foreground mb-2">Questions?</h4>
            <p className="text-sm text-muted-foreground">
              Open floor for discussion and clarification
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30"
        >
          <h3 className="text-2xl font-bold text-foreground mb-2">Thank You</h3>
          <p className="text-muted-foreground mb-6">
            Ready to secure our systems and launch with confidence
          </p>
          <div className="flex gap-2 justify-center flex-wrap text-xs font-semibold">
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full">
              Security ✓
            </span>
            <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full">
              Performance ✓
            </span>
            <span className="px-3 py-1 bg-green-600 text-white rounded-full">
              Ready ✓
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
