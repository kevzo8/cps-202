'use client';

import { motion } from 'framer-motion';
import { GitBranch, GitCommitHorizontal, Tag, ShieldCheck } from 'lucide-react';

const excerpts = [
  {
    icon: GitBranch,
    title: 'workflow — one pipeline, no duplicates',
    body: `workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH && $CI_OPEN_MERGE_REQUESTS'
      when: never
    - if: '$CI_COMMIT_BRANCH'
    - if: '$CI_COMMIT_TAG'`,
    note: 'An open MR suppresses the branch pipeline. Every push, MR, and tag produces exactly one pipeline.',
  },
  {
    icon: GitCommitHorizontal,
    title: 'default — runner, retries, cancellation',
    body: `default:
  tags:
    - ec2-docker
  interruptible: true
  retry:
    max: 1
    when:
      - runner_system_failure
      - stuck_or_timeout_failure`,
    note: 'Jobs land on the self-hosted EC2 runner. Network or runner failures retry once; failed builds do not.',
  },
  {
    icon: GitBranch,
    title: 'deploy:dev — automatic on development',
    body: `deploy:dev:
  extends: .payara_deploy
  stage: deploy:dev
  tags:
    - ec2-deploy
  environment:
    name: dev
    url: "\${DEV_BASE_URL}\${DEV_CONTEXT_ROOT}"
  rules:
    - if: '$CI_COMMIT_BRANCH == $DEV_BRANCH'`,
    note: 'A merge to development deploys immediately. There is no approval step, but a health check runs right after.',
  },
  {
    icon: Tag,
    title: 'deploy:prod — tag + human approval',
    body: `deploy:prod:
  extends: .payara_deploy
  stage: deploy:prod
  tags:
    - ec2-deploy
  environment:
    name: production
    url: "\${PROD_BASE_URL}\${PROD_CONTEXT_ROOT}"
  rules:
    - if: '$CI_COMMIT_TAG =~ /^v\\d+\\.\\d+\\.\\d+([-.][0-9A-Za-z.]+)?$/'
      when: manual
  allow_failure: false`,
    note: 'Only a valid vMAJOR.MINOR.PATCH tag can reach production — and a person must press the button.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function CicdYamlWalkthroughSlide() {
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
            Part 2 — Real YAML
          </span>
          <h1 className="text-4xl font-bold text-foreground">The Rules That Control Every Release</h1>
          <p className="text-lg text-muted-foreground">
            Verbatim excerpts from the delivered .gitlab-ci.yml templates
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {excerpts.map((ex, idx) => {
            const Icon = ex.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className="bg-card border border-border rounded-xl flex flex-col overflow-hidden min-h-0"
              >
                <div className="flex items-center gap-2 px-3 py-2 border-b border-border flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="text-[13px] font-bold text-foreground font-mono truncate">{ex.title}</h3>
                </div>
                <div className="bg-slate-950 px-3 py-2 overflow-auto flex-1 min-h-0">
                  <pre className="font-mono text-[11.5px] leading-[1.5] text-slate-100 whitespace-pre-wrap break-words">
                    <code>{ex.body}</code>
                  </pre>
                </div>
                <p className="px-3 py-2 text-[12.5px] text-foreground/85 leading-snug border-t border-border flex-shrink-0">
                  {ex.note}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-2.5"
        >
          <div className="py-2.5 px-4 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-700 dark:text-green-400 flex-shrink-0" />
            <p className="text-[13px] text-green-900 dark:text-green-100 text-center">
              <span className="font-semibold">Every template also runs Secret Detection.</span> Deploy jobs are non-interruptible, so a release cannot be cancelled halfway through.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
