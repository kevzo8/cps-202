'use client';

import { motion } from 'framer-motion';
import { GitBranch, Workflow, Boxes, Server, Globe, ArrowRight, Layers, Container, ShieldCheck } from 'lucide-react';

const flow = [
  { icon: GitBranch, title: 'Source', detail: 'GitLab repos + merge requests' },
  { icon: Workflow, title: 'Pipeline', detail: 'validate → build → test → security' },
  { icon: Boxes, title: 'Artifacts', detail: 'Package + Container Registry' },
  { icon: Server, title: 'Runner', detail: 'EC2: ec2-docker / ec2-deploy' },
  { icon: Globe, title: 'Targets', detail: 'Payara · EC2 Docker · Vercel' },
];

const lanes = [
  {
    icon: Layers,
    title: 'Payara WAR',
    color: 'text-blue-600 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    points: [
      'SSH + asadmin on the Payara host',
      'Admin port never exposed to CI',
      'Context root and health path per environment',
      'Password file stays on the server',
    ],
  },
  {
    icon: Container,
    title: 'Spring Boot / Node',
    color: 'text-purple-600 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    points: [
      'Image built once, tagged with commit SHA',
      'Docker Compose pull + up on EC2',
      'Previous image kept on disk',
      'Automatic rollback on failed health check',
    ],
  },
  {
    icon: Globe,
    title: 'Next.js / Vercel',
    color: 'text-cyan-600 dark:text-cyan-300',
    border: 'border-cyan-200 dark:border-cyan-800',
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    points: [
      'Preview deployment per merge request',
      'Production promotion on release tag',
      'Optional Convex pre-deploy step',
      'No server to patch or maintain',
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CicdArchitectureSlide() {
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
            Part 2 — Target Design
          </span>
          <h1 className="text-4xl font-bold text-foreground">One Pipeline, Three Deployment Lanes</h1>
          <p className="text-lg text-muted-foreground">
            GitLab CI/CD plus a self-hosted EC2 runner — no new platform to operate
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="flex items-stretch gap-1.5 flex-shrink-0 mb-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {flow.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex items-center gap-1.5 flex-1 min-w-0">
                <motion.div
                  variants={item}
                  className="flex-1 min-w-0 bg-card border border-border rounded-lg px-3 py-2 flex items-center gap-2 hover:border-primary/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-foreground leading-tight">{step.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight truncate">{step.detail}</p>
                  </div>
                </motion.div>
                {idx < flow.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground/60 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {lanes.map((lane, idx) => {
            const Icon = lane.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className={`${lane.bg} ${lane.border} border-2 rounded-xl p-4 flex flex-col hover:border-primary/50 transition-all`}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-9 h-9 rounded-lg bg-background shadow-sm flex items-center justify-center flex-shrink-0">
                    <Icon className={`${lane.color} w-5 h-5`} />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{lane.title}</h3>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {lane.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-foreground/80 leading-snug">
                      <span className={`${lane.color} mt-[3px] flex-shrink-0 text-[10px]`}>✦</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex-shrink-0 mt-2.5"
        >
          <div className="py-2.5 px-4 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-700 dark:text-green-400 flex-shrink-0" />
            <p className="text-[13px] text-green-900 dark:text-green-100 text-center">
              No static AWS keys in CI · masked + protected variables · OIDC / Secrets Manager where AWS access is unavoidable
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
