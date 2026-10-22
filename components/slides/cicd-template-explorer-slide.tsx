'use client';

import { motion } from 'framer-motion';
import CodeViewer, { type CodeFile } from '../cicd/code-viewer';

const files: CodeFile[] = [
  {
    path: 'gitlab-ci-maven-war-payara.yml',
    label: 'maven-war-payara',
    note: 'Legacy Java 8 Maven WAR to Payara',
  },
  {
    path: 'gitlab-ci-vite-war-payara.yml',
    label: 'vite-war-payara',
    note: 'React/Vite frontend to Payara',
  },
  {
    path: 'gitlab-ci-angular-war-payara.yml',
    label: 'angular-war-payara',
    note: 'Angular frontend to Payara',
  },
  {
    path: 'gitlab-ci-springboot-docker.yml',
    label: 'springboot-docker',
    note: 'Spring Boot image to EC2 Compose',
  },
  {
    path: 'gitlab-ci-node-docker.yml',
    label: 'node-docker',
    note: 'Node/DigiCash image to EC2 Compose',
  },
  {
    path: 'gitlab-ci-nextjs-vercel.yml',
    label: 'nextjs-vercel',
    note: 'Next.js preview and prod on Vercel',
  },
  {
    path: 'Dockerfile.springboot',
    label: 'Dockerfile.springboot',
    note: 'Multi-stage, non-root runtime',
  },
  {
    path: 'docker-compose.app.yml',
    label: 'docker-compose.app.yml',
    note: 'Image pin, healthcheck, restart policy',
  },
];

export default function CicdTemplateExplorerSlide() {
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
            Part 2 — Pipeline Templates
          </span>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Every Template, Ready to Copy</h1>
              <p className="text-lg text-muted-foreground mt-1">
                Click a file to read the full pipeline in the deck
              </p>
            </div>
            <p className="text-[12px] text-muted-foreground flex-shrink-0 pb-1">
              templates/ · 8 files
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
            basePath="/ci-cd-reports/templates"
            initialFile="gitlab-ci-maven-war-payara.yml"
            title="Pipeline templates"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
