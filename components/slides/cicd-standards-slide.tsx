'use client';

import { motion } from 'framer-motion';
import {
  GitBranch,
  Tag,
  GitPullRequest,
  Rocket,
  KeyRound,
  ShieldCheck,
  ScanLine,
  Server,
  BadgeCheck,
} from 'lucide-react';

const practices = [
  {
    icon: GitBranch,
    title: 'Branch model',
    text: 'Feature branch → merge request into development. Master is release-only and protected from direct pushes.',
  },
  {
    icon: Tag,
    title: 'Release tags',
    text: 'vMAJOR.MINOR.PATCH on master. Protected tags; a tag is the only path to production.',
  },
  {
    icon: GitPullRequest,
    title: 'Merge requests',
    text: 'Title format type(CPS-###): summary. The MR template asks for test evidence, risk, and rollback steps.',
  },
  {
    icon: Rocket,
    title: 'Release records',
    text: 'Every deploy writes the artifact version and environment URL; release notes come from the tag.',
  },
];

const controls = [
  {
    icon: KeyRound,
    title: 'Rotate, then purge',
    text: 'Replace the two exposed AWS key pairs first, then scrub git history — rotation alone is not enough.',
  },
  {
    icon: ShieldCheck,
    title: 'Masked + protected variables',
    text: 'Credentials live in GitLab CI/CD variables. The SSH key is a file variable available only to protected branches and tags.',
  },
  {
    icon: ScanLine,
    title: 'Secret Detection everywhere',
    text: 'The included template runs on every pipeline. Treat findings as blocking, not advisory.',
  },
  {
    icon: Server,
    title: 'Harden the runner',
    text: 'No privileged containers or docker.sock mounts. The deploy user gets a narrow sudoers rule for the deploy scripts only.',
  },
];

const nonNegotiables = [
  'No secrets in git',
  'Prod only from tags',
  'Every deploy health-checked',
  'Every change traceable to a commit',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function CicdStandardsSlide() {
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
            Part 2 — Standards & Security
          </span>
          <h1 className="text-4xl font-bold text-foreground">How We Work, How We Stay Safe</h1>
          <p className="text-lg text-muted-foreground">
            The conventions and guardrails shipped with the templates
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-card border border-border rounded-xl p-4 flex flex-col min-h-0"
          >
            <div className="flex items-center gap-2 mb-2 flex-shrink-0">
              <GitBranch className="w-4 h-4 text-primary" />
              <h2 className="text-base font-bold text-foreground">Ways of working</h2>
            </div>
            <ul className="space-y-2.5 flex-1">
              {practices.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <motion.li key={idx} variants={item} className="flex items-start gap-2.5">
                    <span className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-foreground leading-tight">{p.title}</p>
                      <p className="text-[12.5px] text-muted-foreground leading-snug mt-0.5">{p.text}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-card border-2 border-red-200 dark:border-red-900 rounded-xl p-4 flex flex-col min-h-0"
          >
            <div className="flex items-center gap-2 mb-2 flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-red-600 dark:text-red-400" />
              <h2 className="text-base font-bold text-foreground">Security guardrails</h2>
            </div>
            <ul className="space-y-2.5 flex-1">
              {controls.map((c, idx) => {
                const Icon = c.icon;
                return (
                  <motion.li key={idx} variants={item} className="flex items-start gap-2.5">
                    <span className="w-7 h-7 rounded-md bg-red-50 dark:bg-red-950/50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-foreground leading-tight">{c.title}</p>
                      <p className="text-[12.5px] text-muted-foreground leading-snug mt-0.5">{c.text}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-2.5"
        >
          <div className="py-2.5 px-4 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center gap-4 flex-wrap">
            {nonNegotiables.map((n, idx) => (
              <span key={idx} className="flex items-center gap-1.5 text-[12.5px] font-semibold text-foreground">
                <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
                {n}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
