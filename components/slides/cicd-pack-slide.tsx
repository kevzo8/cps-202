'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileCode, SquareTerminal, Layers } from 'lucide-react';

const tree = `ci-cd-reports/
├── README.md
├── 01-executive-summary.md
├── 02-assessment-and-target-design.md
├── 03-payara-war-deployment-guide.md
├── 04-ec2-runner-and-docker-guide.md
├── 05-jira-gitlab-standards.md
├── 06-implementation-roadmap.md
├── 07-template-usage.md
├── MR-TEMPLATE.md
├── templates/
│   ├── gitlab-ci-maven-war-payara.yml
│   ├── gitlab-ci-vite-war-payara.yml
│   ├── gitlab-ci-angular-war-payara.yml
│   ├── gitlab-ci-springboot-docker.yml
│   ├── gitlab-ci-node-docker.yml
│   ├── gitlab-ci-nextjs-vercel.yml
│   ├── Dockerfile.springboot
│   └── docker-compose.app.yml
└── scripts/
    ├── deploy-payara.sh
    ├── deploy-compose.sh
    ├── smoke-test.sh
    ├── ec2-bootstrap-runner.sh
    └── jira-transition.sh`;

const groups = [
  {
    icon: BookOpen,
    title: 'Documentation',
    count: '9 markdown files',
    color: 'text-blue-600 dark:text-blue-400',
    items: [
      'Executive summary + full assessment',
      'Payara and EC2/Docker deployment guides',
      'Jira/GitLab standards + 6-week roadmap',
      'Template usage, variables, troubleshooting',
      'Merge request template',
    ],
  },
  {
    icon: FileCode,
    title: 'Pipeline templates',
    count: '6 GitLab pipelines + 2 container files',
    color: 'text-purple-600 dark:text-purple-400',
    items: [
      'Maven, Vite, Angular -> WAR -> Payara',
      'Spring Boot, Node -> Docker image -> EC2',
      'Next.js -> Vercel (optional Convex step)',
      'Dockerfile.springboot + docker-compose.app.yml',
      'Secret Detection included in every pipeline',
    ],
  },
  {
    icon: SquareTerminal,
    title: 'Server automation',
    count: '5 shell scripts',
    color: 'text-emerald-600 dark:text-emerald-400',
    items: [
      'payara-deploy: backup, health check, rollback',
      'deploy-compose: pull, recreate, health, rollback',
      'ec2-bootstrap-runner: Docker + GitLab Runner',
      'smoke-test: HTTP status gate for any URL',
      'jira-transition: optional Jira status sync',
    ],
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

export default function CicdPackSlide() {
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
            Part 2 — Deliverables
          </span>
          <h1 className="text-4xl font-bold text-foreground">The Complete Report Pack</h1>
          <p className="text-lg text-muted-foreground">
            Documentation, pipelines, and server automation — all included
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1 min-h-0">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-card border border-border rounded-xl p-4 flex flex-col min-h-0"
          >
            <div className="flex items-center gap-2 mb-2 flex-shrink-0">
              <Layers className="w-4 h-4 text-primary" />
              <h3 className="text-base font-bold text-foreground">Repository layout</h3>
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
              <pre className="font-mono text-[12px] leading-[1.55] text-foreground/85 whitespace-pre">
                {tree}
              </pre>
            </div>
            <p className="text-[11px] text-muted-foreground pt-2 mt-2 border-t border-border flex-shrink-0">
              22 assets · copied into this deck at public/ci-cd-reports/
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-3 flex flex-col gap-3 min-h-0"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {groups.map((group, idx) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={idx}
                  variants={item}
                  className="bg-card border border-border rounded-xl p-4 flex-1 flex flex-col justify-center hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${group.color} flex-shrink-0`} />
                      <h3 className="text-base font-bold text-foreground">{group.title}</h3>
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {group.count}
                    </span>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {group.items.map((line, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[13px] text-foreground/80 leading-snug">
                        <span className="text-primary mt-[3px] flex-shrink-0 text-[10px]">✦</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-3"
        >
          <div className="py-2.5 px-4 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg text-center">
            <p className="text-sm text-foreground/90">
              <span className="font-semibold text-foreground">Everything on the next slides is the real file</span> — switch between templates, scripts, and the full documentation inside the deck
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
