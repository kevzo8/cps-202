'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target, Shield, Zap } from 'lucide-react';

export default function RecommendationSlide() {
  const recommendations = [
    {
      icon: Shield,
      title: 'Strengthened Security Posture',
      points: [
        'Implement end-to-end encryption for sensitive data',
        'Add multi-factor authentication (MFA) for admin accounts',
        'Conduct quarterly penetration testing',
      ],
      priority: 'HIGH',
      priorityColor: 'text-red-600',
      priorityBg: 'bg-red-100',
    },
    {
      icon: Zap,
      title: 'Enhanced DevOps & Automation',
      points: [
        'Enable SAST (Static Application Security Testing) in CI/CD',
        'Add dependency scanning with automated updates',
        'Implement infrastructure-as-code (Terraform/K8s)',
      ],
      priority: 'HIGH',
      priorityColor: 'text-red-600',
      priorityBg: 'bg-red-100',
    },
    {
      icon: Target,
      title: 'Operational Excellence',
      points: [
        'Establish centralized logging & monitoring (ELK stack)',
        'Create runbooks for incident response',
        'Define SLAs and error budgets',
      ],
      priority: 'MEDIUM',
      priorityColor: 'text-orange-600',
      priorityBg: 'bg-orange-100',
    },
    {
      icon: Lightbulb,
      title: 'Knowledge & Culture',
      points: [
        'Security awareness training for engineering team',
        'Code review best practices documentation',
        'Regular architecture review sessions',
      ],
      priority: 'MEDIUM',
      priorityColor: 'text-orange-600',
      priorityBg: 'bg-orange-100',
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-12 overflow-auto">
      <motion.div className="max-w-5xl w-full space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Strategic Recommendations</h1>
          <p className="text-lg text-muted-foreground">
            Next steps to build a world-class security infrastructure
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recommendations.map((rec, idx) => {
            const IconComponent = rec.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className="text-primary w-6 h-6" />
                  <div>
                    <h3 className="font-semibold text-foreground">{rec.title}</h3>
                    <span className={`text-xs font-bold ${rec.priorityColor} ${rec.priorityBg} px-2 py-0.5 rounded inline-block mt-1`}>
                      {rec.priority}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {rec.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/30"
        >
          <h4 className="font-semibold text-foreground mb-3">Investment ROI</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Risk Reduction', value: '85%' },
              { label: 'Uptime Target', value: '99.99%' },
              { label: 'Mean Time to Detect', value: '< 5 min' },
              { label: 'Security Score', value: 'A+' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl font-bold text-primary">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
