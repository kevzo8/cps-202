'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Lock, Zap } from 'lucide-react';

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
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-12">
      <motion.div className="max-w-5xl w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Assessment Scope</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive review across infrastructure, security, and deployment
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${scope.bgColor}`}>
                    <IconComponent className={`${scope.color} w-6 h-6`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{scope.title}</h3>
                </div>
                <ul className="space-y-2">
                  {scope.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
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
          className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">8 Issues</span> identified across priority levels P0–P7
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
