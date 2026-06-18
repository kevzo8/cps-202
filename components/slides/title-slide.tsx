'use client';

import { motion } from 'framer-motion';

export default function TitleSlide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex flex-col items-center justify-center p-12">
      <motion.div
        className="max-w-3xl text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="text-primary font-bold text-lg tracking-[0.2em] uppercase bg-primary/10 px-4 py-1.5 rounded-full inline-block">
            Sprint 4 Demo & Review
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-foreground">CPS-202 </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SPIKE</span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />

        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Initial RBAC Release & SSO Feasibility
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive Security Assessment, Vulnerability Analysis, and Implementation Recommendations
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 pt-8"
        >
          <div className="text-sm uppercase tracking-wider text-muted-foreground">
            Presented to
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Software Ventures International
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            by <span className="font-semibold text-foreground">Kevin G. Vega</span>
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Sprint 4 Demo & Review • June 2026
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center text-[11px] text-muted-foreground mb-2">
            <a href="https://svi-jira.atlassian.net/wiki/spaces/~71202071852762867849479b4d350bd48b7534/pages/237502679/Phase+1+Engineering+Process+and+Software+Delivery+Foundations+-+A+Preliminary+Assessment+for+Initial+RBAC+Release+and+SSO+Feasibility" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline underline-offset-2 transition-colors">Phase 1: Process & Delivery</a>
            <a href="https://svi-jira.atlassian.net/wiki/spaces/~71202071852762867849479b4d350bd48b7534/pages/237437134/Phase+2+Initial+Findings+-+Security+Integration+Review+of+Initial+RBAC+Release+and+SSO+Feasibility" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline underline-offset-2 transition-colors">Phase 2: Initial Findings</a>
            <a href="https://svi-jira.atlassian.net/wiki/spaces/~71202071852762867849479b4d350bd48b7534/pages/239140937/Phase+3+Technical+Assessment+for+Security+Integration+Review+of+Initial+RBAC+Release+and+SSO+Feasibility" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline underline-offset-2 transition-colors">Phase 3: Technical Assessment</a>
            <a href="https://svi-jira.atlassian.net/wiki/spaces/~71202071852762867849479b4d350bd48b7534/pages/245956628/Summary+Security+Assessment+Strategic+Improvements+for+RBAC+Beyond" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline underline-offset-2 transition-colors">Summary: Strategic Improvements</a>
          </div>
          <a
            href="https://svi-jira.atlassian.net/browse/CPS-202"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
          >
            [CPS-202] SPIKE: Security & Integration Review of Initial RBAC Release and SSO Feasibility
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-28 left-0 right-0 flex justify-center pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-muted-foreground text-sm opacity-60">→ Press arrow key to continue</div>
      </motion.div>
    </div>
  );
}