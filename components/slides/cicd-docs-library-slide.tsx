'use client';

import { motion } from 'framer-motion';
import MarkdownViewer, { type DocFile } from '../cicd/markdown-viewer';

const docs: DocFile[] = [
  { path: 'README.md', label: 'README', group: 'Overview' },
  { path: '01-executive-summary.md', label: '01 — Executive Summary', group: 'Guides' },
  { path: '02-assessment-and-target-design.md', label: '02 — Assessment & Design', group: 'Guides' },
  { path: '03-payara-war-deployment-guide.md', label: '03 — Payara WAR Guide', group: 'Guides' },
  { path: '04-ec2-runner-and-docker-guide.md', label: '04 — EC2 Runner & Docker', group: 'Guides' },
  { path: '05-jira-gitlab-standards.md', label: '05 — Jira & GitLab Standards', group: 'Guides' },
  { path: '06-implementation-roadmap.md', label: '06 — Implementation Roadmap', group: 'Guides' },
  { path: '07-template-usage.md', label: '07 — Template Usage', group: 'Guides' },
  { path: 'MR-TEMPLATE.md', label: 'MR Template', group: 'Templates' },
];

export default function CicdDocsLibrarySlide() {
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
            Part 2 — Documentation
          </span>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Read the Full Report In Here</h1>
              <p className="text-lg text-muted-foreground mt-1">
                All nine markdown documents, rendered in place
              </p>
            </div>
            <p className="text-[12px] text-muted-foreground flex-shrink-0 pb-1">
              docs/ · 9 files
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
          <MarkdownViewer
            files={docs}
            basePath="/ci-cd-reports"
            initialFile="README.md"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
