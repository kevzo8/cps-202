'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Server, Container, Rocket, BadgeCheck, MessageCircle } from 'lucide-react';

const phases = [
  {
    period: 'Week 1',
    title: 'Security first',
    icon: ShieldAlert,
    color: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    bg: 'bg-red-50 dark:bg-red-950/30',
    points: [
      'Rotate every exposed credential',
      'Purge secrets from git history',
      'Enable Secret Detection on all repos',
      'Create masked + protected CI variables',
    ],
  },
  {
    period: 'Weeks 1–2',
    title: 'Runner + Payara pilot',
    icon: Server,
    color: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    points: [
      'Provision the EC2 runner (ec2-docker / ec2-deploy)',
      'Install payara-deploy + sudoers rule',
      'Portal WAR auto-deploys to dev with a smoke test',
      'Break it on purpose; verify rollback',
    ],
  },
  {
    period: 'Weeks 2–3',
    title: 'Spring Boot pilot',
    icon: Container,
    color: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    points: [
      'Dockerfile + Compose on the app host',
      'Auth service runs its 51 tests in CI',
      'Health-checked deploy to dev',
      'Registry push + previous image for rollback',
    ],
  },
  {
    period: 'Weeks 3–6',
    title: 'Standardize',
    icon: Rocket,
    color: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    bg: 'bg-green-50 dark:bg-green-950/30',
    points: [
      'Roll out to the remaining repos',
      'Jira keys + MR conventions enforced',
      'Production tag gate and release notes',
      'Monitoring and deployment records',
    ],
  },
];

const decisions = [
  'Approve GitLab CI/CD + self-hosted runner',
  'Approve dev auto-deploy + prod gate',
  'Security cleanup window for rotation',
  'Name the Payara host owner',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CicdRoadmapSlide() {
  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-8 py-6 pb-32">
      <motion.div className="max-w-6xl w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1.5 mb-3 flex-shrink-0"
        >
          <span className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
            Part 2 — Rollout
          </span>
          <h1 className="text-4xl font-bold text-foreground">Six Weeks to a Repeatable Release</h1>
          <p className="text-lg text-muted-foreground">
            Pilot two applications, then standardize across the platform
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 flex-1 min-h-0"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className={`${phase.bg} ${phase.border} border-2 rounded-xl p-3.5 flex flex-col hover:border-primary/50 transition-all`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-background shadow-sm flex items-center justify-center flex-shrink-0">
                    <Icon className={`${phase.color} w-[18px] h-[18px]`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold font-mono text-muted-foreground uppercase">{phase.period}</p>
                    <h3 className="text-base font-bold text-foreground leading-tight">{phase.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2 flex-1">
                  {phase.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[13px] text-foreground/80 leading-snug">
                      <span className={`${phase.color} mt-[3px] flex-shrink-0 text-[10px]`}>✦</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-2.5 space-y-2.5"
        >
          <div className="p-3 bg-card border border-border rounded-lg">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Decisions needed from leadership
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {decisions.map((d, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[12.5px] text-foreground/85">
                  <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center px-3 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-[13px] text-foreground/90">
                <span className="font-bold text-foreground">Questions?</span> The full pack is ready to hand over: 9 docs · 6 pipeline templates · 5 deploy scripts — copy into repos as-is
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
