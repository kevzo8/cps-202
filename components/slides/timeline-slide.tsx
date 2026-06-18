'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function TimelineSlide() {
  const timeline = [
    {
      phase: 'Phase 1: Immediate (0–2 weeks)',
      status: 'COMPLETED',
      items: [
        'Deploy P0–P2 fixes to development',
        'Run full regression test suite',
        'Security review gate cleared',
      ],
      icon: CheckCircle2,
      color: 'text-green-600',
    },
    {
      phase: 'Phase 2: Staging (2–4 weeks)',
      status: 'IN PROGRESS',
      items: [
        'Integration testing with SSO providers',
        'Performance benchmarking',
        'UAT with stakeholders',
      ],
      icon: Clock,
      color: 'text-blue-600',
    },
    {
      phase: 'Phase 3: Production (4–6 weeks)',
      status: 'PLANNED',
      items: [
        'Blue-green deployment (0 downtime)',
        'Monitor metrics & alert rules',
        'Post-deployment validation',
      ],
      icon: AlertCircle,
      color: 'text-orange-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
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
      <motion.div className="max-w-5xl w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Implementation Timeline</h1>
          <p className="text-lg text-muted-foreground">
            6-week deployment plan with validation gates
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="relative space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-orange-500" />

          {timeline.map((phase, idx) => {
            const IconComponent = phase.icon;
            return (
              <motion.div key={idx} variants={itemVariants} className="ml-20 pb-4">
                <div className="absolute -left-12 w-10 h-10 rounded-full border-4 border-background flex items-center justify-center">
                  <IconComponent className={`${phase.color} w-6 h-6`} />
                </div>

                <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{phase.phase}</h3>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      phase.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-700'
                        : phase.status === 'IN PROGRESS'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {phase.status}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center"
        >
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Target Launch:</span> July 2026 with zero downtime deployment
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
