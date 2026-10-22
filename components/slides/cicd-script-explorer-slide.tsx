'use client';

import { motion } from 'framer-motion';
import CodeViewer, { type CodeFile } from '../cicd/code-viewer';

const files: CodeFile[] = [
  {
    path: 'deploy-payara.sh',
    label: 'deploy-payara.sh',
    note: 'Backup, hot deploy, health check, rollback',
  },
  {
    path: 'deploy-compose.sh',
    label: 'deploy-compose.sh',
    note: 'Pull image, recreate, health check, rollback',
  },
  {
    path: 'smoke-test.sh',
    label: 'smoke-test.sh',
    note: 'HTTP gate with retries and accepted codes',
  },
  {
    path: 'ec2-bootstrap-runner.sh',
    label: 'ec2-bootstrap-runner.sh',
    note: 'Docker + GitLab Runner on Ubuntu',
  },
  {
    path: 'jira-transition.sh',
    label: 'jira-transition.sh',
    note: 'Optional Jira status sync after deploy',
  },
];

export default function CicdScriptExplorerSlide() {
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
            Part 2 — Server Automation
          </span>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground">The Scripts That Do the Work</h1>
              <p className="text-lg text-muted-foreground mt-1">
                Deploy, verify, bootstrap, and roll back — straight from the pack
              </p>
            </div>
            <p className="text-[12px] text-muted-foreground flex-shrink-0 pb-1">
              scripts/ · 5 files
            </p>
          </div>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex-1 min-h-0"
        >
          <CodeViewer
            files={files}
            basePath="/ci-cd-reports/scripts"
            initialFile="deploy-payara.sh"
            title="Automation scripts"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
