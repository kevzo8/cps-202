'use client';

import { motion } from 'framer-motion';
import { Server, Boxes, Container, Globe, LockKeyhole, Rocket } from 'lucide-react';

const stats = [
  {
    value: '6',
    label: 'Legacy CI pipelines',
    detail: 'all build-only, zero deploy jobs',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    value: '0',
    label: 'Automated deploys',
    detail: 'every release is a manual procedure',
    color: 'text-red-600 dark:text-red-400',
  },
  {
    value: '51',
    label: 'Spring Boot tests skipped',
    detail: '-DskipTests still in the pipeline',
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    value: '2',
    label: 'CI files with AWS keys',
    detail: 'plus app secrets in tracked configs',
    color: 'text-red-600 dark:text-red-400',
  },
];

const scope = [
  { icon: Server, text: 'Legacy Java 8 WAR services on Payara' },
  { icon: Boxes, text: 'React / Angular frontends shipped as WARs' },
  { icon: Container, text: 'Spring Boot 4 / Java 25 services + Node DigiCash' },
  { icon: Globe, text: 'Next.js / Convex apps hosted on Vercel' },
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

export default function CicdOverviewSlide() {
  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-8 py-6 pb-32">
      <motion.div className="max-w-6xl w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1.5 mb-4 flex-shrink-0"
        >
          <span className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
            Part 2 — CI/CD Platform
          </span>
          <h1 className="text-4xl font-bold text-foreground">CI/CD Assessment</h1>
          <p className="text-lg text-muted-foreground">
            How KYC applications build, ship, and go live today
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1">
          <motion.div
            className="lg:col-span-3 grid grid-cols-2 gap-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="p-4 bg-card rounded-xl border border-border flex flex-col justify-center hover:border-primary/50 transition-all"
              >
                <p className={`text-5xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-base font-semibold text-foreground mt-1.5">{stat.label}</p>
                <p className="text-[13px] text-muted-foreground mt-1">{stat.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:col-span-2 bg-card rounded-xl border border-border p-4 flex flex-col"
          >
            <h3 className="text-base font-bold text-foreground mb-3">What we reviewed</h3>
            <ul className="space-y-3 flex-1">
              {scope.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90 leading-snug">
                    <span className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </span>
                    <span className="pt-1">{s.text}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
              <LockKeyhole className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Repo review, Oct 2026 · credential values never reproduced</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-3"
        >
          <div className="py-2.5 px-4 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center gap-2">
            <Rocket className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground/90 text-center">
              <span className="font-semibold text-foreground">Recommendation:</span> standardize on GitLab CI/CD with one self-hosted EC2 runner — auto-deploy dev, manual gate for production
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
