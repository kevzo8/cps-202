'use client';

import { motion } from 'framer-motion';
import { KeyRound, Terminal, CircleSlash2, Tags, Gauge, RefreshCw } from 'lucide-react';

const issues = [
  {
    severity: 'CRITICAL',
    icon: KeyRound,
    title: 'Secrets committed',
    points: [
      'AWS access keys in 2 .gitlab-ci.yml files',
      'DB / Keycloak / DigiCash secrets in tracked configs',
    ],
    impact: 'Rotate credentials and scrub git history first',
  },
  {
    severity: 'HIGH',
    icon: Terminal,
    title: 'Manual deploys',
    points: [
      'Payara Admin Console uploads by hand',
      'SCP + docker compose run from laptops',
    ],
    impact: 'No audit trail, wrong-file mistakes',
  },
  {
    severity: 'HIGH',
    icon: CircleSlash2,
    title: 'Tests skipped',
    points: [
      '-DskipTests in the Spring Boot pipeline',
      '51 auth tests never run; frontends untested in CI',
    ],
    impact: 'Regressions reach dev and prod silently',
  },
  {
    severity: 'MEDIUM',
    icon: Tags,
    title: 'Version drift',
    points: [
      'POM versions, git tags, and build scripts disagree',
      'Hardcoded v1.0.0 / v3.0.0 in WAR scripts',
    ],
    impact: 'A deployed artifact cannot be traced to a commit',
  },
  {
    severity: 'HIGH',
    icon: Gauge,
    title: 'Environment confusion',
    points: [
      '“Prod” frontend configs point at kyc.dev.svi.cloud',
      'Dev and prod context roots mixed per repo',
    ],
    impact: 'Production could call the wrong backend',
  },
  {
    severity: 'HIGH',
    icon: RefreshCw,
    title: 'No rollback path',
    points: [
      'No health checks and no previous artifact on the host',
      'No deployment history or approval record',
    ],
    impact: 'Recovery takes as long as the original manual deploy',
  },
];

const severityStyles: Record<string, string> = {
  CRITICAL: 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300',
  HIGH: 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300',
  MEDIUM: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CicdCurrentStateSlide() {
  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-8 py-6 pb-32">
      <motion.div className="max-w-6xl w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1 mb-4 flex-shrink-0"
        >
          <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 mb-1">
            Part 2 — Current State
          </span>
          <h1 className="text-4xl font-bold text-foreground">Today: Manual, Inconsistent, Exposed</h1>
          <p className="text-base text-muted-foreground">
            Six issues that make every release a gamble
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {issues.map((issue, idx) => {
            const Icon = issue.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className="bg-card border border-border rounded-xl p-3.5 flex flex-col hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-background border border-border shadow-sm flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{issue.title}</h3>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full flex-shrink-0 ${severityStyles[issue.severity]}`}>
                    {issue.severity}
                  </span>
                </div>

                <ul className="space-y-1.5 flex-1 mb-2">
                  {issue.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground leading-snug">
                      <span className="text-primary mt-[3px] flex-shrink-0 text-[10px]">✦</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-[10px] font-medium text-muted-foreground/80 pt-1.5 border-t border-border/60">
                  Impact: {issue.impact}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex-shrink-0 mt-3"
        >
          <div className="py-2 px-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-center">
            <p className="text-xs text-red-800 dark:text-red-200">
              <span className="font-semibold">Every issue is fixable in weeks, not months</span> — the report includes copy-paste pipelines and deploy scripts for all app types
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
