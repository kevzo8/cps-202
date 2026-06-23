'use client';

import { motion } from 'framer-motion';
import { Code2, GitBranch, Shield, Zap, Box, Eye, ClipboardList } from 'lucide-react';

export default function ToolingEcosystemSlide() {
  const categories = [
    {
      title: 'AI-Assisted Development',
      icon: Code2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      tools: ['Opencode', 'CodeRabbit', 'Claude Code', 'Cursor', 'GitHub Copilot', 'Continue.dev'],
      description: 'Security-aware AI agents with local execution, multi-repo orchestration',
      demo: (
        <div className="flex flex-wrap gap-1.5 mt-1.5 pt-1.5 border-t border-blue-200/50 dark:border-blue-800/50">
          <a href="https://screenrec.com/share/OmirAGM4gw" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline">▶ Opencode: Init</a>
          <a href="https://screenrec.com/share/MpN5GUY1zw" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline">▶ Opencode: Install &amp; Results</a>
        </div>
      ),
    },
    {
      title: 'Auth & Identity Platforms',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      tools: ['Keycloak', 'Auth0', 'Clerk', 'Zitadel', 'Logto'],
      description: 'OIDC/OAuth2 providers, SSO, MFA, RBAC — 12 platforms compared',
    },
    {
      title: 'API Gateways & Security',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
      tools: ['Kong', 'APISIX', 'Tyk', 'AWS API Gateway', 'Spring Cloud Gateway'],
      description: 'Centralized rate limiting, JWT validation, WAF before app layer',
    },
    {
      title: 'Cloud & Infrastructure',
      icon: Eye,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950',
      tools: ['Cloudflare (WAF+DDoS)', 'AWS/GCP/Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
      description: 'Zero Trust architecture, WAF, DDoS, IaC — 4 providers compared',
    },
    {
      title: 'Database & Storage',
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      tools: ['Cassandra', 'PostgreSQL', 'Supabase', 'MongoDB', 'Firebase'],
      description: '11 database platforms compared for auth, compliance, and scalability',
    },
    {
      title: 'Deployment Platforms',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      tools: ['Vercel', 'Netlify', 'Render', 'Railway', 'Cloudflare Pages'],
      description: 'Serverless, containers, and PaaS — backend + frontend comparisons',
    },
    {
      title: 'Security Testing',
      icon: Shield,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-950',
      tools: ['OWASP ZAP', 'Trivy', 'Snyk', 'SonarQube', 'Burp Suite', 'Playwright', 'Vitest', 'DataLoader', 'Depth limiting'],
      description: 'SAST, DAST, dependency scanning, container security, GraphQL/WebSocket testing',
    },
    {
      title: 'Observability & Monitoring',
      icon: Eye,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950',
      tools: ['Sentry', 'Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry'],
      description: 'Error tracking, metrics, logging, distributed tracing — MTTD < 5 min',
    },
    {
      title: 'Process & Collaboration',
      icon: ClipboardList,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950',
      tools: ['Miro', 'Excalidraw', 'Slack', 'Trello', 'Asana', 'Monday', 'Retroboard', 'n8n'],
      description: 'Project management, sprint retro, diagramming, automation, team communication',
    },
    {
      title: 'LLM & AI Security',
      icon: Code2,
      color: 'text-fuchsia-600',
      bgColor: 'bg-fuchsia-50 dark:bg-fuchsia-950',
      tools: ['Guardrails AI', 'Rebuff', 'NeMo Guardrails', 'LangFuse', 'Garak'],
      description: 'Prompt injection detection, RAG security, PII masking, red-teaming',
    },
    {
      title: 'Mobile Security',
      icon: Shield,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50 dark:bg-violet-950',
      tools: ['Certificate pinning', 'Keychain/Keystore', 'OIDC PKCE', 'Root detection'],
      description: 'Mobile-specific auth patterns, biometric SSO, app attestation',
    },
    {
      title: 'Privacy & Compliance',
      icon: Zap,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-950',
      tools: ['GDPR', 'CCPA', 'Data retention (TTL)', 'SBOM', 'DPA contracts'],
      description: 'Data mapping, consent management, breach notification — PH jurisdiction consideration for international GDPR applicability',
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
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-8 py-6 pb-32">
      <motion.div className="max-w-7xl w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-1 mb-3 flex-shrink-0"
        >
          <h1 className="text-4xl font-bold text-foreground">Complete Tooling Ecosystem</h1>
          <p className="text-base text-muted-foreground">
            12 categories · 85+ tools evaluated across the full SDLC
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 flex-1"
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
                className={`p-4 rounded-lg border border-border ${category.bgColor} hover:border-primary/50 transition-all flex flex-col`}
              >
                <div className="flex items-start gap-2.5 mb-2 flex-shrink-0">
                  <IconComponent size={20} className={`${category.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-base">{category.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{category.description}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {category.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs bg-card border border-border rounded text-foreground font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  {category.demo}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex-shrink-0 mt-4"
        >
          <div className="py-1.5 px-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">End-to-end coverage:</span> Every layer analyzed — AI dev, auth, cloud, API gateways, databases, deployment, mobile, LLM security, and compliance. All categories with tool comparisons, ratings, and cost analysis.
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
