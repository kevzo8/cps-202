'use client';

import { motion } from 'framer-motion';
import { GitBranch, Tag, ShieldCheck, RefreshCw, UserCheck, Rocket, Activity } from 'lucide-react';

const devSteps = [
  { icon: GitBranch, text: 'Push to development' },
  { icon: ShieldCheck, text: 'Build · test · security scan' },
  { icon: Rocket, text: 'Deploy to dev — no approval' },
  { icon: Activity, text: 'Smoke test + environment record' },
];

const prodSteps = [
  { icon: Tag, text: 'Tag vX.Y.Z on master' },
  { icon: ShieldCheck, text: 'Build the immutable release artifact' },
  { icon: UserCheck, text: 'Manual approval gate' },
  { icon: Activity, text: 'Deploy prod → smoke test → record' },
];

const stages = ['validate', 'build', 'test', 'security', 'publish', 'deploy', 'verify', 'rollback'];

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

export default function CicdDeploymentSlide() {
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
            Part 2 — Delivery Model
          </span>
          <h1 className="text-4xl font-bold text-foreground">Dev Is Automatic. Prod Is Deliberate.</h1>
          <p className="text-base text-muted-foreground">
            Same pipeline stages — different gates
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-foreground">Development</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-green-600 text-white">
                AUTOMATIC
              </span>
            </div>
            <ul className="space-y-2 flex-1">
              {devSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.li key={idx} variants={item} className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-md bg-background shadow-sm flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-green-700 dark:text-green-400" />
                    </span>
                    <span className="text-[13px] text-muted-foreground">{step.text}</span>
                  </motion.li>
                );
              })}
            </ul>
            <p className="text-[11px] text-muted-foreground/80 pt-3 border-t border-green-200 dark:border-green-800 mt-3">
              Every merge to development lands on dev in under 15 minutes
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-foreground">Production</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-orange-600 text-white">
                MANUAL GATE
              </span>
            </div>
            <ul className="space-y-2 flex-1">
              {prodSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.li key={idx} variants={item} className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-md bg-background shadow-sm flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-orange-700 dark:text-orange-400" />
                    </span>
                    <span className="text-[13px] text-muted-foreground">{step.text}</span>
                  </motion.li>
                );
              })}
            </ul>
            <p className="text-[11px] text-muted-foreground/80 pt-3 border-t border-orange-200 dark:border-orange-800 mt-3">
              Protected tags v* · release artifacts never rebuilt from a different commit
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-3 space-y-3"
        >
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {stages.map((stage, idx) => (
              <span key={idx} className="px-2.5 py-1 text-[11px] font-semibold font-mono rounded-full bg-muted text-muted-foreground border border-border">
                {stage}
              </span>
            ))}
          </div>

          <div className="py-2.5 px-4 bg-card border border-border rounded-lg flex items-center justify-center gap-2.5">
            <RefreshCw className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-semibold text-foreground">Automatic rollback on failed health check</span> — previous WAR or image restored, last 10 backups retained, prod deploys serialized, target recovery under 5 minutes
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
