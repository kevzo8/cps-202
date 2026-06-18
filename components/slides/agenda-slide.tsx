'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function AgendaSlide() {
  const agendaItems = [
    { title: 'Assessment Scope', desc: 'What we reviewed' },
    { title: 'Security Findings', desc: '8 critical & high-risk issues' },
    { title: 'Current Status', desc: 'Remediation progress' },
    { title: 'Business Impact', desc: 'Risk to operations' },
    { title: 'Implementation Timeline', desc: 'Path to production' },
    { title: 'Top Recommendations', desc: '5 strategic initiatives' },
    { title: 'Strategic Roadmap', desc: 'Enterprise maturity path' },
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
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-12">
      <motion.div className="max-w-4xl w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Agenda</h1>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {agendaItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex gap-4 p-5 bg-card rounded-lg border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex-shrink-0">
                <motion.div
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, delay: idx * 0.1, repeat: Infinity }}
                >
                  <CheckCircle2 className="text-primary" size={20} />
                </motion.div>
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
