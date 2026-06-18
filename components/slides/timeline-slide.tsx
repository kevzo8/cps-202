'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function TimelineSlide() {
  const timeline = [
    {
      phase: 'Phase 1: Foundation (Week 1-2)',
      status: 'COMPLETED',
      items: [
        'P0–P2 fixes completed: JWK conversion, error handler, token refresh (Section 6-8)',
        'CI pipeline restored with test + security stages (Section 12.1)',
        'CSP headers + in-memory tokens implemented (Section 14.1)',
      ],
      ref: 'Sections 6, 7, 8, 12, 14',
      icon: CheckCircle2,
      color: 'text-green-600',
    },
    {
      phase: 'Phase 2: Staging (Week 3-4)',
      status: 'IN PROGRESS',
      items: [
        'Test Phase 1 fixes in staging: regression, integration, security scan',
        'OIDC PKCE migration for SSO handoff (Section 14.3)',
        'Rate limiting + Cloudflare WAF configuration (Section 16.2)',
        'UAT with stakeholders + dependency scanning in CI',
      ],
      ref: 'Sections 14.3, 16.2, 12.2',
      icon: Clock,
      color: 'text-blue-600',
    },
    {
      phase: 'Phase 3: Production (Week 5-6)',
      status: 'PLANNED',
      items: [
        'Blue-green deployment — zero downtime (Section 12.3)',
        'Sentry + Prometheus monitoring & alert rules (Section 18)',
        'Terraform IaC versioning + audit trail enabled (Section 16.4)',
      ],
      ref: 'Sections 12.3, 18, 16.4',
      icon: AlertCircle,
      color: 'text-orange-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-10 py-8 pb-20">
      <motion.div className="max-w-4xl w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1 mb-6 flex-shrink-0"
        >
          <h1 className="text-4xl font-bold text-foreground">Implementation Timeline</h1>
          <p className="text-base text-muted-foreground">
            6-week plan with validation gates — mapped to assessment sections
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="relative flex-1 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-orange-500" />

          {timeline.map((phase, idx) => {
            const IconComponent = phase.icon;
            return (
              <motion.div key={idx} variants={itemVariants} className="relative pl-16 pb-5 last:pb-0">
                <div className="absolute left-3 top-1 w-9 h-9 rounded-full border-[3px] border-background bg-card flex items-center justify-center shadow-sm">
                  <IconComponent className={`${phase.color} w-5 h-5`} />
                </div>

                <div className="p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-foreground">{phase.phase}</h3>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      phase.status === 'COMPLETED'
                        ? 'bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300'
                        : phase.status === 'IN PROGRESS'
                        ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                        : 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300'
                    }`}>
                      {phase.status}
                    </span>
                  </div>

                  <ul className="space-y-1">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-1.5 text-[10px] text-muted-foreground/60 font-mono">
                    {phase.ref}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex-shrink-0 mt-4"
        >
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <span className="font-semibold">Target Launch:</span> July 2026 · Zero downtime deployment (Section 12.3) · Maturity Level 3 (Section 16.4)
            </p>
          </div>
        </motion.div>

        <div className="text-[10px] text-center text-muted-foreground/50 mt-2">
          <a href="https://svi-jira.atlassian.net/wiki/spaces/~71202071852762867849479b4d350bd48b7534/pages/245956628/Summary+Security+Assessment+Strategic+Improvements+for+RBAC+Beyond" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Summary: Security Assessment & Strategic Improvements for RBAC & Beyond</a>
        </div>
      </motion.div>
    </div>
  );
}