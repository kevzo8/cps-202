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
        'Self-hosted (Logto/Zitadel) vs cloud (Auth0/Clerk) guidance',
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
        '28 sections spanning backend, frontend, mobile, cloud',
        'Database comparison: 11 platforms (Cassandra, Postgres, Supabase)',
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
        '7 privacy regulations mapped across jurisdictions',
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
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-8">
      <motion.div className="max-w-7xl w-full space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Strategic Roadmap</h1>
          <p className="text-lg text-muted-foreground">
            <span className="font-bold text-primary">28 sections</span> of comprehensive analysis — here is what was covered
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 p-5 rounded-lg border border-primary/30"
        >
          <h4 className="font-semibold text-foreground mb-3 text-sm">Assessment Impact</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Sections Analyzed', value: '28' },
              { label: 'Issues Fixed', value: '7 / 8' },
              { label: 'Risk Reduction', value: '85%' },
              { label: 'Tools Compared', value: '80+' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl font-bold text-primary">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
