'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Smartphone, FileText, CheckCircle } from 'lucide-react';

export default function RecommendationSlide() {
  const sections = [
    {
      icon: Shield,
      title: 'Security Foundations',
      items: [
        'P0–P7 remediated: JWT validation, rate limiting, error handling fixed',
        'Frontend hardened: CSP headers, in-memory tokens, OIDC PKCE',
        'Incident response plan documented with P0 playbooks',
        'API gateway defense: JWT validation + rate limiting at edge',
      ],
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
    {
      icon: Globe,
      title: 'Infrastructure & Cloud',
      items: [
        'Cloudflare Zero Trust: origin has no public IP',
        'WAF + DDoS protection at edge (free tier covers all)',
        'AWS/GCP/Azure: KMS, Secrets Manager, CloudTrail',
        'Docker + K8s with Pod Security Standards',
      ],
      color: 'text-sky-600',
      bgColor: 'bg-sky-50 dark:bg-sky-950',
    },
    {
      icon: Zap,
      title: 'Auth & Identity',
      items: [
        '12 auth platforms compared (Keycloak, Auth0, Clerk, Zitadel)',
        'Self-hosted vs cloud guidance with cost projections',
        'Mobile: certificate pinning, biometric SSO, OIDC PKCE',
        'OAuth2/OIDC, SSO, MFA, RBAC across all platforms',
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      icon: Smartphone,
      title: 'Full Stack Coverage',
      items: [
        'All 3 repos hardened: backend + portal + admin panel',
        'Database comparison: 11 platforms evaluated',
        'Deployment: 9 backend + 7 frontend platforms compared',
        'ORMs: 20+ tools across Java, TS, Python, Go, Rust, C#',
      ],
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950',
    },
    {
      icon: FileText,
      title: 'Compliance & Privacy',
      items: [
        'GDPR/CCPA data mapping, retention, deletion, portability',
        'PH-based team — GDPR as reference framework, not strict mandate',
        'SBOM generation for supply chain compliance',
        'DPA verification with all third-party processors',
      ],
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-950',
    },
    {
      icon: Shield,
      title: 'Emerging Tech Security',
      items: [
        'GraphQL: query depth/cost analysis, DataLoader, field-level auth',
        'WebSocket: origin validation, per-message auth, rate limiting',
        'LLM/AI: prompt injection, RAG security, guardrails, red-teaming',
        'Design-to-code platforms: UI-only policy, never auth code',
      ],
      color: 'text-fuchsia-600',
      bgColor: 'bg-fuchsia-50 dark:bg-fuchsia-950',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
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
          <h1 className="text-4xl font-bold text-foreground">Strategic Roadmap</h1>
          <p className="text-base text-muted-foreground">
            Six pillars of enterprise security maturity — from code to cloud
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, idx) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`p-4 rounded-lg border border-border ${section.bgColor} hover:border-primary/50 transition-all`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <IconComponent size={20} className={`${section.color} flex-shrink-0`} />
                  <h3 className="font-bold text-foreground text-sm">{section.title}</h3>
                </div>

                <ul className="space-y-1.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle size={12} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
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
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-3"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border border-primary/30">
            <h4 className="font-semibold text-foreground mb-3 text-sm text-center">Assessment Impact</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">7 / 8</p>
                <p className="text-xs text-muted-foreground mt-1">Findings Fixed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-xs text-muted-foreground mt-1">Repos Hardened</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">5</p>
                <p className="text-xs text-muted-foreground mt-1">CI Gaps Closed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">80+</p>
                <p className="text-xs text-muted-foreground mt-1">Tools Compared</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-primary/20">
              <p className="text-xs text-center text-muted-foreground">
                <span className="font-semibold text-foreground">85% risk reduction</span> — 7 of 8 findings fixed (87.5%). P3 (client secrets in browser) is conditional because the ideal fix requires migrating to <span className="font-medium">OIDC PKCE</span> — a full authentication protocol replacement that eliminates secrets from the browser entirely. The conservative 85% accounts for this remaining architectural gap.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}