'use client';

import { motion } from 'framer-motion';
import { Code2, GitBranch, Shield, Globe, Zap, ClipboardCheck } from 'lucide-react';

const recs = [
  {
    icon: Code2,
    title: 'Opencode + CodeRabbit',
    highlight: 'Used end-to-end for this entire assessment and presentation — at zero cost',
    examples: [
      'Opencode autonomously fixed P0 (JWT bypass) by reading existing code, then orchestrated P3 dual-path fix across all three repos in one pass',
      'CodeRabbit catches P0-class bugs (JWT, XSS, CSP) automatically on every MR before human review — like having a senior security engineer on every PR',
      '100% local execution — no code leaves your machine, no per-seat fees, no cloud dependency',
    ],
    tag: 'Section 3 — AI-Assisted Development',
    color: 'text-blue-600 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: GitBranch,
    title: 'Dev → Staging → Prod',
    highlight: 'Branch model that prevents "it worked on my machine"',
    examples: [
      'Feature branches → development → staging → production with protected branch rules at every gate',
      'Merge requests require: tests pass + security scan clean + at least one reviewer',
      'One-click rollback on every release — revert to last known-good deploy in seconds',
    ],
    tag: 'Section 5 — Branching & Workflow',
    color: 'text-purple-600 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    icon: Shield,
    title: 'Frontend Hardening',
    highlight: 'Protects users from XSS, token theft, and credential leaks',
    examples: [
      'CSP headers block unauthorized scripts and data injection at the browser level — stops XSS before it starts',
      'In-memory tokens replace localStorage — immune to JS malware and browser extension attacks',
      'OIDC PKCE migration removes custom vulnerable SSO handoff (Section 12.3) — the single highest-impact frontend investment',
    ],
    tag: 'Section 12 — Frontend Security',
    color: 'text-red-600 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    bg: 'bg-red-50 dark:bg-red-950/30',
  },
  {
    icon: Globe,
    title: 'Cloudflare Zero Trust',
    highlight: 'Your origin server disappears from the internet',
    examples: [
      'Cloudflare Tunnel means origin connects outbound only — no public IP, no direct attack surface',
      'WAF blocks OWASP Top 10 at the edge before requests reach Spring Boot — free tier covers unlimited DDoS + CDN',
      'Free for up to 50 users with Cloudflare Access for auth at the edge',
    ],
    tag: 'Section 16.3 — Zero Trust Architecture',
    color: 'text-cyan-600 dark:text-cyan-300',
    border: 'border-cyan-200 dark:border-cyan-800',
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
  },
  {
    icon: Zap,
    title: 'CI Pipeline Security',
    highlight: 'Every MR runs a full security gauntlet before merge',
    examples: [
      'Pipeline stages: unit tests → SAST (GitLab built-in) → dependency scan (Trivy/Snyk) → security gate → deploy',
      'Container image scanning catches CVEs before they reach production — blocks merge on critical findings',
      'Secret detection (Gitleaks) prevents credentials from ever entering the repo — catches what git add missed',
    ],
    tag: 'Section 12.1 — CI/CD Pipeline',
    color: 'text-amber-600 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    icon: ClipboardCheck,
    title: 'Production Readiness',
    highlight: '60+ point checklist as a go/no-go gate before every deploy',
    examples: [
      'Covers auth, infrastructure, CI/CD, frontend, compliance, and monitoring — prevents regression of P0–P7 fixes',
      'Sign-off required from lead developer and security lead before production deploy',
      'Runbook documented for every phase: deploy, verify, rollback, escalate',
    ],
    tag: 'Section 27 — Production Readiness',
    color: 'text-emerald-600 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
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
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TopRecommendationsSlide() {
  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-8 py-6 pb-32">
      <motion.div className="max-w-6xl w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1 mb-3 flex-shrink-0"
        >
          <h1 className="text-4xl font-bold text-foreground">Top Recommendations</h1>
          <p className="text-base text-muted-foreground">
            Six strategic initiatives for enterprise maturity
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {recs.map((r, idx) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className={`${r.bg} ${r.border} border-2 rounded-xl p-3 flex flex-col hover:border-primary/50 transition-all`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-background shadow-sm flex items-center justify-center flex-shrink-0">
                    <Icon className={`${r.color} w-4 h-4`} />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{r.title}</h3>
                </div>

                <p className="text-[13px] font-medium text-foreground leading-snug mb-2">
                  {r.highlight}
                </p>

                <ul className="space-y-1.5 flex-1 mb-1.5">
                  {r.examples.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[13px] text-muted-foreground leading-snug">
                      <span className="text-primary mt-[4px] flex-shrink-0 text-[11px]">✦</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-xs font-mono text-muted-foreground/50 pt-1 border-t border-border/50">
                  {r.tag}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-3"
        >
          <div className="py-1.5 px-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              All recommendations are immediately actionable and integrate into existing GitLab workflows
            </p>
          </div>
          <p className="text-[10px] text-center text-muted-foreground/50 mt-0.5">
            <a href="https://svi-jira.atlassian.net/wiki/spaces/~71202071852762867849479b4d350bd48b7534/pages/245956628/Summary+Security+Assessment+Strategic+Improvements+for+RBAC+Beyond" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Summary: Security Assessment &amp; Strategic Improvements for RBAC &amp; Beyond</a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}