'use client';

import { motion } from 'framer-motion';

export default function FindingSlide() {
  const findings = [
    {
      priority: 'P0',
      title: 'Broken Security Key Conversion',
      severity: 'CRITICAL',
      what: 'System couldn\'t properly read security keys needed to verify login tokens',
      why: 'Attackers could bypass login and access any account without a real password',
      impact: 'Total system compromise — anyone gains admin access',
      status: 'Fixed',
    },
    {
      priority: 'P1',
      title: 'Missing Security Error Handler',
      severity: 'MEDIUM',
      what: 'When security problems happened, system didn\'t catch them properly',
      why: 'Security failures were exposed in error messages, revealing system details to attackers',
      impact: 'Information leak enables targeted attacks',
      status: 'Fixed',
    },
    {
      priority: 'P2',
      title: 'Token Refresh Without Verification',
      severity: 'HIGH',
      what: 'Users could refresh their login token without proving they should',
      why: 'Expired sessions could be extended indefinitely by anyone, including attackers',
      impact: 'Hijacked sessions remain active forever',
      status: 'Fixed',
    },
    {
      priority: 'P3',
      title: 'Secrets Exposed in Browser Storage',
      severity: 'HIGH',
      what: 'Sensitive passwords stored where JavaScript could read them',
      why: 'Browser malware or XSS attacks could steal all user credentials',
      impact: 'Mass account compromise via stolen secrets',
      note: 'Needs OIDC PKCE migration — full auth protocol replacement eliminates secrets from browser entirely',
      status: 'Conditional',
    },
    {
      priority: 'P4',
      title: 'SSO Login via URL Parameters',
      severity: 'HIGH',
      what: 'Authentication details passed as visible URL parameters instead of secure method',
      why: 'Login information exposed in browser history and server logs',
      impact: 'Credentials leaked through logs and history',
      status: 'Fixed',
    },
    {
      priority: 'P5',
      title: 'No Rate Limiting',
      severity: 'LOW',
      what: 'System allowed unlimited login attempts from one location',
      why: 'Attackers could run automated password guessing attacks',
      impact: 'Brute force attacks on user accounts',
      status: 'Fixed',
    },
    {
      priority: 'P6',
      title: 'Missing Test Coverage Check in CI',
      severity: 'LOW',
      what: 'Code changes weren\'t tested for security issues before release',
      why: 'Vulnerabilities would slip into production undetected',
      impact: 'Production defects and security regressions',
      status: 'Fixed',
    },
    {
      priority: 'P7',
      title: 'Limited Permission Patterns',
      severity: 'MEDIUM',
      what: 'Permission checks couldn\'t handle complex authorization rules',
      why: 'Users might access resources they shouldn\'t have access to',
      impact: 'Privilege escalation and unauthorized access',
      status: 'Fixed',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const severityColor = (s: string) => {
    switch (s) {
      case 'CRITICAL': return { badge: 'bg-red-600', text: 'text-red-700 dark:text-red-300', border: 'border-red-300 dark:border-red-800', bg: 'bg-red-50 dark:bg-red-950/30' };
      case 'HIGH': return { badge: 'bg-orange-600', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-300 dark:border-orange-800', bg: 'bg-orange-50 dark:bg-orange-950/30' };
      case 'MEDIUM': return { badge: 'bg-yellow-500', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-300 dark:border-yellow-800', bg: 'bg-yellow-50 dark:bg-yellow-950/30' };
      default: return { badge: 'bg-blue-500', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-800', bg: 'bg-blue-50 dark:bg-blue-950/30' };
    }
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-10 py-8 pb-20">
      <motion.div className="max-w-6xl w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1 mb-3 flex-shrink-0"
        >
          <h1 className="text-4xl font-bold text-foreground">Key Findings</h1>
          <p className="text-base text-muted-foreground">
            P0–P7 across all severity levels — 7 fixed, 1 conditional
          </p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-1 overflow-y-auto pr-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {findings.map((f, idx) => {
            const c = severityColor(f.severity);
            return (
              <motion.div key={idx} variants={itemVariants}>
                <div className={`p-3 rounded-lg border ${c.border} ${c.bg} h-full flex flex-col`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${c.badge}`}>
                        {f.priority}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${c.badge}`}>
                        {f.severity}
                      </span>
                    </div>
                    <span className={`text-[11px] font-semibold ${f.status === 'Fixed' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {f.status === 'Fixed' ? '✅ Fixed' : '⏳ Conditional'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">
                    {f.title}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">What</p>
                      <p className="text-[11px] text-foreground leading-snug">{f.what}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Why</p>
                      <p className="text-[11px] text-foreground leading-snug">{f.why}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Impact</p>
                      <p className="text-[11px] font-medium text-foreground leading-snug">{f.impact}</p>
                    </div>
                  </div>
                  {f.note && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 leading-snug">
                        ⓘ {f.note}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 mt-2"
        >
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg">
            <span className="text-green-600 dark:text-green-400 text-lg">✅</span>
            <p className="text-xs text-green-800 dark:text-green-200">
              <span className="font-semibold">All clear for demo:</span> 7 of 8 issues resolved. P3 (browser secrets) needs <span className="font-medium">OIDC PKCE</span> migration — a full auth protocol replacement that eliminates secrets from the browser entirely.
            </p>
          </div>
          <div className="text-[10px] text-center text-muted-foreground/50">
            <a href="https://svi-jira.atlassian.net/wiki/spaces/~71202071852762867849479b4d350bd48b7534/pages/237437134/Phase+2+Initial+Findings+-+Security+Integration+Review+of+Initial+RBAC+Release+and+SSO+Feasibility" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Phase 2: Initial Findings</a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}