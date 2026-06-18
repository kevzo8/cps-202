'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';

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
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-8 py-6 pb-32">
      <motion.div className="max-w-5xl w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1 mb-4 flex-shrink-0"
        >
          <h1 className="text-4xl font-bold text-foreground">Next Steps & Q&A</h1>
          <p className="text-base text-muted-foreground">
            Immediate actions and timeline to production readiness
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-center">
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {nextSteps.map((step, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="flex items-start gap-4 p-3 rounded-lg border border-border hover:border-primary/30 transition-all">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/20 border-2 border-primary text-primary font-bold text-sm flex items-center justify-center">
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                      <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex-shrink-0">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-3">
            <div className="p-4 bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-800 rounded-lg">
              <CheckCircle2 className="text-green-700 dark:text-green-400 mb-2" size={20} />
              <h4 className="text-sm font-semibold text-foreground mb-1">Ready</h4>
              <p className="text-xs text-muted-foreground">Code is tested and production-ready</p>
            </div>

            <div className="p-4 bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 rounded-lg">
              <MessageCircle className="text-blue-700 dark:text-blue-400 mb-2" size={20} />
              <h4 className="text-sm font-semibold text-foreground mb-1">Support</h4>
              <p className="text-xs text-muted-foreground">Full technical support during deployment</p>
            </div>

            <div className="p-4 bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 rounded-lg">
              <ArrowRight className="text-purple-700 dark:text-purple-400 mb-2" size={20} />
              <h4 className="text-sm font-semibold text-foreground mb-1">Questions?</h4>
              <p className="text-xs text-muted-foreground">Open floor for discussion and clarification</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-4"
        >
          <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
            <h3 className="text-lg font-bold text-foreground mb-1">Thank You</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Ready to secure our systems and launch with confidence
            </p>
            <p className="text-xs text-muted-foreground/70 mb-3">
              Presented by <span className="font-semibold text-foreground">Kevin G. Vega</span>
            </p>
            <div className="flex gap-2 justify-center flex-wrap text-[11px] font-semibold">
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full">Security ✓</span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full">Performance ✓</span>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full">Ready ✓</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}