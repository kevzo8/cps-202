'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Lock, Zap, Globe, Shield, Smartphone, FileText } from 'lucide-react';

export default function ScopeSlide() {
  const scopeItems = [
    {
      icon: Code2,
      title: 'Backend (Spring Boot)',
      items: ['JWT/OAuth2 flows', 'Token refresh logic', 'Permission mapping', 'Rate limiting'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Database,
      title: 'Data & Storage',
      items: ['Secret management', 'Credential storage', 'Session handling', 'Access patterns'],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Lock,
      title: 'Security & Auth',
      items: ['SSO integration', 'RBAC implementation', 'Token validation', 'CORS policy'],
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Zap,
      title: 'DevOps & CI/CD',
      items: ['Pipeline security', 'Testing coverage', 'Dependency scanning', 'Secret detection'],
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const expandedSections = [
    { icon: Shield, label: 'Frontend Security', color: 'text-cyan-500', bg: 'border-cyan-500/30' },
    { icon: Globe, label: 'API Gateways', color: 'text-emerald-500', bg: 'border-emerald-500/30' },
    { icon: Smartphone, label: 'Mobile Security', color: 'text-violet-500', bg: 'border-violet-500/30' },
    { icon: Shield, label: 'Cloud Providers', color: 'text-sky-500', bg: 'border-sky-500/30' },
    { icon: Database, label: 'Database Platforms', color: 'text-pink-500', bg: 'border-pink-500/30' },
    { icon: Zap, label: 'Deployment Platforms', color: 'text-amber-500', bg: 'border-amber-500/30' },
    { icon: Lock, label: 'Auth Platforms', color: 'text-rose-500', bg: 'border-rose-500/30' },
    { icon: FileText, label: 'GDPR & Privacy', color: 'text-teal-500', bg: 'border-teal-500/30' },
    { icon: Shield, label: 'GraphQL Security', color: 'text-indigo-500', bg: 'border-indigo-500/30' },
    { icon: Globe, label: 'WebSocket Security', color: 'text-lime-500', bg: 'border-lime-500/30' },
    { icon: Code2, label: 'LLM/AI Security', color: 'text-fuchsia-500', bg: 'border-fuchsia-500/30' },
    { icon: Zap, label: 'Incident Response', color: 'text-orange-500', bg: 'border-orange-500/30' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-12 pb-20">
      <motion.div className="max-w-5xl w-full space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Assessment Scope</h1>
          <p className="text-lg text-muted-foreground">
            Three repositories assessed — backend, portal, and admin panel
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center -mt-2 mb-2"
        >
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            svi-authentication-springboot-kyc
          </span>
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
            svi-authenticationportal-react-kyc
          </span>
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            svi-sso-admin-panel-javascript-kyc
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {scopeItems.map((scope, idx) => {
            const IconComponent = scope.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${scope.bgColor}`}>
                    <IconComponent className={`${scope.color} w-5 h-5`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{scope.title}</h3>
                </div>
                <ul className="space-y-1">
                  {scope.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      {item}
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
          className="space-y-3"
        >
          <p className="text-sm font-semibold text-foreground text-center">
             Comprehensive coverage across the full tech stack —
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {expandedSections.map((s, i) => (
              <span
                key={i}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border ${s.bg} ${s.color} bg-card`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">8 Issues</span> identified across priority levels P0–P7 · <span className="font-semibold text-foreground">80+ tools</span> compared
          </p>
        </motion.div>

        <div className="text-[10px] text-center text-muted-foreground/50">
          <a href="https://svi-jira.atlassian.net/wiki/spaces/~71202071852762867849479b4d350bd48b7534/pages/237502679/Phase+1+Engineering+Process+and+Software+Delivery+Foundations+-+A+Preliminary+Assessment+for+Initial+RBAC+Release+and+SSO+Feasibility" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Phase 1: Engineering Process & Software Delivery Foundations</a>
        </div>
      </motion.div>
    </div>
  );
}
