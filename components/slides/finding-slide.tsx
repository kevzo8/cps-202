'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Zap } from 'lucide-react';

export default function FindingSlide() {
  const findings = [
    {
      priority: 'P0',
      title: 'JWK→PEM Conversion Broken',
      severity: 'CRITICAL',
      impact: 'Token validation fails, authentication broken',
      status: 'FIXED',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      priority: 'P1',
      title: 'No Global SecurityException Handler',
      severity: 'MEDIUM',
      impact: 'Unhandled exceptions leak stack traces to clients',
      status: 'FIXED',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      priority: 'P2',
      title: 'GET /token Refresh Without JWT Validation',
      severity: 'HIGH',
      impact: 'Attackers can refresh tokens without valid credentials',
      status: 'FIXED',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      priority: 'P3',
      title: 'Client Secrets in Browser Storage',
      severity: 'HIGH',
      impact: 'Secrets accessible via XSS attacks',
      status: 'CONDITIONAL',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const getSeverityIcon = (severity: string) => {
    return severity === 'CRITICAL' ? AlertTriangle : AlertCircle;
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-12">
      <motion.div className="max-w-5xl w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Key Findings</h1>
          <p className="text-lg text-muted-foreground">
            Priority P0 – P3 issues identified (8 total across all levels)
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {findings.map((finding, idx) => {
            const IconComponent = getSeverityIcon(finding.severity);
            return (
              <motion.div key={idx} variants={itemVariants} className="group">
                <div className={`p-5 rounded-lg border-2 border-transparent hover:border-primary/50 transition-all ${finding.bgColor}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white">
                        <IconComponent className={`${finding.color} w-6 h-6`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${finding.color} bg-white`}>
                          {finding.priority}
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${finding.severity === 'CRITICAL' ? 'text-red-700 bg-red-100' : 'text-orange-700 bg-orange-100'}`}>
                          {finding.severity}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-green-700 bg-green-100">
                          {finding.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {finding.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {finding.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <Zap className="text-green-600 flex-shrink-0" size={20} />
          <p className="text-sm text-green-800">
            <span className="font-semibold">Status:</span> 7 of 8 issues resolved. 1 conditional fix pending architecture review.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
