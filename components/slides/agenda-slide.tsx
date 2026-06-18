'use client';

import { motion } from 'framer-motion';
import { Search, AlertTriangle, TrendingDown, Calendar, Star, Wrench, Map, MessageCircle, ArrowRight } from 'lucide-react';

const agendaItems = [
  { title: 'Assessment Scope', desc: 'Comprehensive security review', icon: Search, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/60', border: 'border-blue-200 dark:border-blue-800' },
  { title: 'Key Findings', desc: 'P0–P7 security issues (7/8 fixed)', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/60', border: 'border-red-200 dark:border-red-800' },
  { title: 'Business Impact', desc: '85% risk reduction', icon: TrendingDown, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950/60', border: 'border-green-200 dark:border-green-800' },
  { title: 'Implementation Timeline', desc: '6-week path to production', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/60', border: 'border-purple-200 dark:border-purple-800' },
  { title: 'Top Recommendations', desc: '6 strategic initiatives', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/60', border: 'border-amber-200 dark:border-amber-800' },
  { title: 'Tooling Ecosystem', desc: '80+ tools compared', icon: Wrench, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/60', border: 'border-cyan-200 dark:border-cyan-800' },
  { title: 'Strategic Roadmap', desc: 'Enterprise maturity path', icon: Map, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/60', border: 'border-fuchsia-200 dark:border-fuchsia-800' },
  { title: 'Next Steps', desc: 'Action items & deployment plan', icon: ArrowRight, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/60', border: 'border-indigo-200 dark:border-indigo-800' },
  { title: 'Discussion & Q&A', desc: 'Open floor for questions', icon: MessageCircle, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-950/60', border: 'border-teal-200 dark:border-teal-800' },
];

export default function AgendaSlide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center px-8 py-6 pb-32">
      <motion.div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1 mb-5"
        >
          <h1 className="text-4xl font-bold text-foreground">Agenda</h1>
          <p className="text-base text-muted-foreground">Walkthrough of the security assessment, findings, and path forward</p>
          <div className="h-0.5 w-16 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {agendaItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`${item.bg} ${item.border} border rounded-xl p-4 flex items-center gap-3 hover:border-primary/50 transition-all`}
              >
                <div className={`w-10 h-10 rounded-lg bg-background shadow-sm flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`${item.color} w-4 h-4`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}