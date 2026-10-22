'use client';

import { motion } from 'framer-motion';
import { GitBranch, GitPullRequest, Tag, Workflow, Timer, KeyRound } from 'lucide-react';

type Mode = 'auto' | 'manual' | 'mr';
type Cell = { job: string; mode: Mode } | null;

type Row = {
  stage: string;
  mr: Cell;
  dev: Cell;
  tag: Cell;
};

const auto = (job: string): Cell => ({ job, mode: 'auto' });
const manual = (job: string): Cell => ({ job, mode: 'manual' });
const mrOnly = (job: string): Cell => ({ job, mode: 'mr' });

const rows: Row[] = [
  { stage: 'validate', mr: mrOnly('validate:mr-title'), dev: null, tag: auto('validate:tag') },
  { stage: 'build', mr: auto('build'), dev: auto('build'), tag: auto('build') },
  { stage: 'test', mr: auto('test'), dev: auto('test'), tag: auto('test') },
  { stage: 'package', mr: auto('package'), dev: auto('package'), tag: auto('package') },
  { stage: 'security', mr: auto('secret_detection'), dev: auto('secret_detection'), tag: auto('secret_detection') },
  { stage: 'publish', mr: null, dev: auto('publish'), tag: auto('publish') },
  { stage: 'deploy:dev', mr: null, dev: auto('deploy:dev'), tag: null },
  { stage: 'verify:dev', mr: null, dev: auto('verify:dev'), tag: null },
  { stage: 'deploy:prod', mr: null, dev: null, tag: manual('deploy:prod') },
  { stage: 'verify:prod', mr: null, dev: null, tag: auto('verify:prod') },
  { stage: 'rollback', mr: null, dev: null, tag: manual('rollback:prod') },
  { stage: 'notify', mr: null, dev: auto('notify'), tag: auto('notify') },
];

const summary = [
  { icon: Workflow, value: '12', label: 'stages' },
  { icon: GitBranch, value: '13', label: 'jobs' },
  { icon: Timer, value: '<15 min', label: 'dev feedback' },
  { icon: KeyRound, value: '0', label: 'stored AWS keys' },
];

const cellStyles: Record<Mode, string> = {
  auto: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
  manual: 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800',
  mr: 'bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
};

const modeLabels: Record<Mode, string> = {
  auto: 'auto',
  manual: 'manual',
  mr: 'MR only',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function JobCell({ cell }: { cell: Cell }) {
  if (!cell) {
    return <span className="text-muted-foreground/50 text-sm">—</span>;
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border font-mono text-[11.5px] font-semibold ${cellStyles[cell.mode]}`}
    >
      {cell.job}
      <span className="text-[9px] font-sans font-bold uppercase tracking-wide opacity-70">
        {modeLabels[cell.mode]}
      </span>
    </span>
  );
}

export default function CicdPipelineMapSlide() {
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
            Part 2 — Actual Pipelines
          </span>
          <h1 className="text-4xl font-bold text-foreground">The Pipeline, Stage by Stage</h1>
          <p className="text-lg text-muted-foreground">
            Real job names from the delivered templates — one pipeline for merge requests, development, and releases
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-shrink-0 mb-3"
        >
          {summary.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-card border border-border rounded-lg px-3 py-2 flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg font-bold text-foreground leading-none">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border rounded-xl flex-1 min-h-0 flex flex-col overflow-hidden"
        >
          <div className="overflow-auto flex-1">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-muted z-10">
                <tr>
                  <th className="text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground w-[16%]">
                    Stage
                  </th>
                  <th className="text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground w-[26%]">
                    <span className="inline-flex items-center gap-1">
                      <GitPullRequest className="w-3.5 h-3.5" /> Merge request
                    </span>
                  </th>
                  <th className="text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground w-[28%]">
                    <span className="inline-flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5" /> Push to development
                    </span>
                  </th>
                  <th className="text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground w-[30%]">
                    <span className="inline-flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> Tag v* on master
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <motion.tr
                    key={row.stage}
                    variants={item}
                    className={`border-t border-border ${idx % 2 === 1 ? 'bg-muted/20' : ''}`}
                  >
                    <td className="px-3 py-1.5 font-mono text-[12px] font-semibold text-foreground whitespace-nowrap">
                      {row.stage}
                    </td>
                    <td className="px-3 py-1.5">
                      <JobCell cell={row.mr} />
                    </td>
                    <td className="px-3 py-1.5">
                      <JobCell cell={row.dev} />
                    </td>
                    <td className="px-3 py-1.5">
                      <JobCell cell={row.tag} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex items-center gap-5 flex-wrap px-3 py-2 border-t border-border flex-shrink-0 bg-muted/30"
          >
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className={`w-2.5 h-2.5 rounded-sm border ${cellStyles.auto}`} /> automatic
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className={`w-2.5 h-2.5 rounded-sm border ${cellStyles.manual}`} /> manual gate
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className={`w-2.5 h-2.5 rounded-sm border ${cellStyles.mr}`} /> MR pipeline only
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="text-muted-foreground/50">—</span> not created
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex-shrink-0 mt-2.5 grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          <div className="py-2 px-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-[12px] text-blue-900 dark:text-blue-100 leading-snug">
              <span className="font-semibold">Docker templates (Spring Boot, Node):</span> <span className="font-mono text-[11px]">build</span> produces the image; there is no WAR <span className="font-mono text-[11px]">package</span> stage
            </p>
          </div>
          <div className="py-2 px-3 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 rounded-lg">
            <p className="text-[12px] text-cyan-900 dark:text-cyan-100 leading-snug">
              <span className="font-semibold">Next.js template:</span> preview deploy per MR, production deploy on tag — Vercel handles the hosting
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
