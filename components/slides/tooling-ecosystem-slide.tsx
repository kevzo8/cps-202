'use client';

import { motion } from 'framer-motion';
import { Code2, GitBranch, Shield, Zap, Box, Eye } from 'lucide-react';

export default function ToolingEcosystemSlide() {
  const categories = [
    {
      title: 'AI-Assisted Development',
      icon: Code2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      tools: ['Opencode', 'CodeRabbit', 'Claude Code', 'Cursor', 'GitHub Copilot'],
      description: 'Security-aware AI agents with local execution, multi-repo orchestration',
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
      tools: ['Cloudflare (WAF+DDoS)', 'AWS/GCP/Azure', 'Docker', 'Kubernetes', 'Terraform'],
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
      tools: ['OWASP ZAP', 'Trivy', 'Snyk', 'SonarQube', 'Burp Suite'],
      description: 'SAST, DAST, dependency scanning, container image security',
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
      title: 'GraphQL & WebSocket Security',
      icon: Code2,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-950',
      tools: ['DataLoader', 'Depth limiting', 'Origin validation', 'Per-message auth'],
      description: 'Query cost analysis, CSWSH prevention, connection rate limiting',
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
      description: 'Data mapping, consent management, breach notification plan',
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
            <span className="font-bold text-primary">28 sections</span> · 12 categories · 80+ tools evaluated across the full SDLC
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
            <span className="font-semibold">End-to-end coverage:</span> Every layer analyzed — from AI dev tools and auth platforms to cloud providers, API gateways, databases, deployment platforms, mobile security, LLM security, and GDPR compliance. All 28 sections documented with tool comparisons, security ratings, and cost analysis.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
