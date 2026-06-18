'use client';

import { motion } from 'framer-motion';
import { Code2, GitBranch, Zap, Shield, BarChart3 } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface RecommendationCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: string[];
  color: string;
  accentColor: string;
}

const recommendations: RecommendationCard[] = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'AI-Assisted Development',
    subtitle: 'Opencode & CodeRabbit Integration',
    items: [
      'Deploy Opencode as primary AI dev agent',
      'Enable CodeRabbit on all MRs',
      'OWASP Top 10 violation detection',
      'Zero-cost local execution',
    ],
    color: 'bg-blue-100',
    accentColor: 'border-blue-300',
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: 'Branching & Workflow',
    subtitle: 'Multi-Environment Git Strategy',
    items: [
      'Main → Staging → Production pipeline',
      'Protected branch rules for all releases',
      'Automated deploy on merge',
      'Rollback capabilities in place',
    ],
    color: 'bg-purple-100',
    accentColor: 'border-purple-300',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'CI/CD Pipeline',
    subtitle: 'Close GitLab CI Gaps',
    items: [
      'Expand to: test → security → deploy stages',
      'Automated dependency scanning',
      'Container image security scanning',
      'Deployment gates before production',
    ],
    color: 'bg-amber-100',
    accentColor: 'border-amber-300',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Code Quality & Security',
    subtitle: 'Shift-Left Security Practices',
    items: [
      'SonarQube for static analysis',
      'Dependency scanning with Snyk',
      'Enforce >80% test coverage',
      'SAST in every pipeline run',
    ],
    color: 'bg-green-100',
    accentColor: 'border-green-300',
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Infrastructure & Observability',
    subtitle: 'Production Readiness',
    items: [
      'Terraform for IaC & version control',
      'Prometheus + Grafana monitoring',
      'ELK stack for centralized logging',
      'OpenTelemetry for distributed tracing',
    ],
    color: 'bg-rose-100',
    accentColor: 'border-rose-300',
  },
];

export default function TopRecommendationsSlide() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-background to-muted flex flex-col justify-between p-12 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold text-foreground mb-3 text-balance">
          Top Recommendations
        </h1>
        <p className="text-xl text-muted-foreground">
          Five Strategic Initiatives for Enterprise Maturity
        </p>
      </motion.div>

      {/* Recommendations Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1"
      >
        {recommendations.map((rec, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className={`${rec.color} border-2 ${rec.accentColor} rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow`}
          >
            {/* Icon & Title */}
            <div>
              <div className="text-primary mb-3">{rec.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {rec.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {rec.subtitle}
              </p>
            </div>

            {/* Items List */}
            <ul className="space-y-2">
              {rec.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Emphasis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg"
      >
        <p className="text-sm text-foreground font-semibold">
          💡 All recommendations are immediately actionable and integrate into existing GitLab workflows. Implementation phase: 6 weeks with zero operational disruption.
        </p>
      </motion.div>
    </div>
  );
}
