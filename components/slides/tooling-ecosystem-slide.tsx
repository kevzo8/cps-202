'use client';

import { motion } from 'framer-motion';
import { Code2, GitBranch, Shield, Zap, Box, Eye } from 'lucide-react';

export default function ToolingEcosystemSlide() {
  const categories = [
    {
      title: 'AI-Powered App Builders',
      icon: Code2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      tools: ['v0 (React/Next.js)', 'Lovable (React+Supabase)', 'Base44 (Full-stack)', 'Claude Code', 'Cursor IDE'],
      description: 'AI agents for rapid MVP and full-stack app development with security awareness',
    },
    {
      title: 'Design-to-Code Platforms',
      icon: Box,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      tools: ['Figma → Anima', 'Figma → Locofy', 'Webflow', 'Canva Code', 'FlutterFlow'],
      description: 'Design handoff to production code (UI only — auth handled separately)',
    },
    {
      title: 'Code Quality & Review',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      tools: ['SonarQube', 'CodeQL', 'Semgrep', 'Reviewdog', 'SonarLint'],
      description: 'Static analysis, OWASP Top 10 detection, bug prevention',
    },
    {
      title: 'Testing & Coverage',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      tools: ['JUnit 5', 'Vitest', 'Playwright', 'Cypress', 'REST Assured'],
      description: 'Unit, integration, E2E testing + coverage gating',
    },
    {
      title: 'Security Scanning',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
      tools: ['OWASP ZAP', 'Trivy', 'Snyk', 'Gitleaks', 'TruffleHog'],
      description: 'DAST, container scanning, secret detection, dependency CVEs',
    },
    {
      title: 'CI/CD & Automation',
      icon: GitBranch,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950',
      tools: ['GitLab CI', 'Dagger', 'Earthly', 'ArgoCD', 'Flux'],
      description: 'Pipeline automation, GitOps deployment, build optimization',
    },
    {
      title: 'Infrastructure & Observability',
      icon: Eye,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-950',
      tools: ['Terraform', 'Docker', 'Prometheus', 'Grafana', 'OpenTelemetry'],
      description: 'IaC, containerization, monitoring, distributed tracing',
    },
    {
      title: 'Deployment & Hosting',
      icon: Zap,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950',
      tools: ['Vercel', 'Netlify', 'Render', 'Railway', 'Heroku'],
      description: 'Serverless, containers, and platform-as-a-service deployments',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-8">
      <motion.div className="max-w-7xl w-full space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Complete Tooling Ecosystem</h1>
          <p className="text-lg text-muted-foreground">
            40+ tools across 6 critical categories — from development to production
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, idx) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`p-5 rounded-lg border border-border ${category.bgColor} hover:border-primary/50 transition-all`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <IconComponent size={24} className={`${category.color} flex-shrink-0`} />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-base">{category.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Tools:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-card border border-border rounded text-foreground font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="p-4 bg-primary/5 border border-primary/20 rounded-lg"
        >
          <p className="text-sm text-foreground">
            <span className="font-semibold">Integrated Workflow:</span> AI app builders (v0, Lovable) scaffold MVPs in minutes. Design platforms (Figma→Anima, Webflow) handle UI handoff. CodeRabbit auto-reviews code. SonarQube gates quality. Tests verify security. OWASP ZAP + Trivy scan threats. GitLab CI deploys. Prometheus + Grafana monitor. Complete end-to-end security and DevOps coverage.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
