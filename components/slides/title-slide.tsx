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
    <div className="w-full h-screen bg-gradient-to-br from-background via-secondary/5 to-background flex flex-col items-center justify-center p-12">
      <motion.div
        className="max-w-3xl text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="text-primary text-lg font-semibold tracking-wider uppercase">
            Sprint 4 Demo & Review
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            CPS-202 SPIKE
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="h-1 w-20 bg-accent mx-auto rounded-full" />

        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-2xl text-secondary font-semibold">
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
          <h2 className="text-3xl font-bold text-primary">
            Software Ventures International
          </h2>
          <p className="text-sm text-muted-foreground mt-4">
            Sprint 4 Demo & Review • June 2026
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-0 right-0 flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-muted-foreground text-sm">↓ Press arrow key to continue</div>
      </motion.div>
    </div>
  );
}
