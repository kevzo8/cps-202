'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function FindingsDetailedSlide() {
  const findings = [
    {
      id: 'P0',
      title: 'Broken Security Key Conversion',
      severity: 'CRITICAL',
      severityBg: 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 border border-red-300 dark:border-red-700',
      plainLanguage: 'System couldn\'t properly read security keys needed to verify login tokens',
      whyItMatters: 'Attackers could bypass login and access any account without a real password',
      businessRisk: 'Total system compromise — anyone gains admin access',
      status: '✅ Fixed',
    },
    {
      id: 'P1',
      title: 'Missing Security Error Handler',
      severity: 'MEDIUM',
      severityBg: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 border border-yellow-300 dark:border-yellow-700',
      plainLanguage: 'When security problems happened, system didn\'t catch them properly',
      whyItMatters: 'Security failures were exposed in error messages, revealing system details to attackers',
      businessRisk: 'Information leak enables targeted attacks',
      status: '✅ Fixed',
    },
    {
      id: 'P2',
      title: 'Token Refresh Without Verification',
      severity: 'HIGH',
      severityBg: 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 border border-orange-300 dark:border-orange-700',
      plainLanguage: 'Users could refresh their login token without proving they should',
      whyItMatters: 'Expired sessions could be extended indefinitely by anyone, including attackers',
      businessRisk: 'Hijacked sessions remain active forever',
      status: '✅ Fixed',
    },
    {
      id: 'P3',
      title: 'Secrets Exposed in Browser Storage',
      severity: 'HIGH',
      severityBg: 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 border border-orange-300 dark:border-orange-700',
      plainLanguage: 'Sensitive passwords stored where JavaScript could read them',
      whyItMatters: 'Browser malware or XSS attacks could steal all user credentials',
      businessRisk: 'Mass account compromise via stolen secrets',
      status: '✅ Fixed',
    },
    {
      id: 'P4',
      title: 'SSO Login via URL Parameters',
      severity: 'HIGH',
      severityBg: 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 border border-orange-300 dark:border-orange-700',
      plainLanguage: 'Authentication details passed as visible URL parameters instead of secure method',
      whyItMatters: 'Login information exposed in browser history and server logs',
      businessRisk: 'Credentials leaked through logs and history',
      status: '✅ Fixed',
    },
    {
      id: 'P5',
      title: 'No Rate Limiting',
      severity: 'LOW',
      severityBg: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700',
      plainLanguage: 'System allowed unlimited login attempts from one location',
      whyItMatters: 'Attackers could run automated password guessing attacks',
      businessRisk: 'Brute force attacks on user accounts',
      status: '✅ Fixed',
    },
    {
      id: 'P6',
      title: 'Missing Test Coverage Check in CI',
      severity: 'LOW',
      severityBg: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700',
      plainLanguage: 'Code changes weren\'t tested for security issues before release',
      whyItMatters: 'Vulnerabilities would slip into production undetected',
      businessRisk: 'Production defects and security regressions',
      status: '✅ Fixed',
    },
    {
      id: 'P7',
      title: 'Limited Permission Patterns',
      severity: 'MEDIUM',
      severityBg: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 border border-yellow-300 dark:border-yellow-700',
      plainLanguage: 'Permission checks couldn\'t handle complex authorization rules',
      whyItMatters: 'Users might access resources they shouldn\'t have access to',
      businessRisk: 'Privilege escalation and unauthorized access',
      status: '✅ Fixed',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-8">
      <motion.div className="max-w-6xl w-full space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Security Findings Explained</h1>
          <p className="text-lg text-muted-foreground">
            Seven issues found and fixed — here's what they meant and why they mattered
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {findings.map((finding) => (
            <motion.div
              key={finding.id}
              variants={itemVariants}
              className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground bg-muted px-2 py-1 rounded">{finding.id}</span>
                  <h3 className="font-bold text-foreground text-sm leading-tight">{finding.title}</h3>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${finding.severityBg}`}>
                    {finding.severity}
                  </span>
                  <span className="text-xs font-semibold text-green-600">{finding.status}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <p className="font-semibold text-muted-foreground mb-0.5">What happened:</p>
                  <p className="text-foreground">{finding.plainLanguage}</p>
                </div>

                <div>
                  <p className="font-semibold text-muted-foreground mb-0.5">Why it matters:</p>
                  <p className="text-foreground">{finding.whyItMatters}</p>
                </div>

                <div>
                  <p className="font-semibold text-muted-foreground mb-0.5">Business impact:</p>
                  <p className="text-foreground">{finding.businessRisk}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3"
        >
          <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900 dark:text-green-100">All issues resolved</p>
            <p className="text-sm text-green-800 dark:text-green-200">Every finding has been fixed and verified. System is now secure for production.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
