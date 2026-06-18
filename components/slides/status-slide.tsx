'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function StatusSlide() {
  const statusData = [
    { name: 'CRITICAL', value: 1, fixed: 1, percentage: 100 },
    { name: 'HIGH', value: 3, fixed: 3, percentage: 100 },
    { name: 'MEDIUM', value: 3, fixed: 2, percentage: 67 },
    { name: 'LOW', value: 1, fixed: 1, percentage: 100 },
  ];

  const issues = [
    { id: 'P0', name: 'JWK→PEM conversion', severity: 'CRITICAL', status: '✅ Fixed' },
    { id: 'P1', name: 'SecurityException handler', severity: 'MEDIUM', status: '✅ Fixed' },
    { id: 'P2', name: 'GET /token JWT validation', severity: 'HIGH', status: '✅ Fixed' },
    { id: 'P3', name: 'Browser secret storage', severity: 'HIGH', status: '⚠️ Conditional' },
    { id: 'P4', name: 'SSO query params', severity: 'HIGH', status: '✅ Fixed' },
    { id: 'P5', name: 'Rate limiting', severity: 'LOW', status: '✅ Fixed' },
    { id: 'P6', name: 'CI annotation coverage', severity: 'LOW', status: '✅ Fixed' },
    { id: 'P7', name: 'Permission mapper patterns', severity: 'MEDIUM', status: '✅ Fixed' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return '#dc2626';
      case 'HIGH':
        return '#f97316';
      case 'MEDIUM':
        return '#eab308';
      case 'LOW':
        return '#22c55e';
      default:
        return '#94a3b8';
    }
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center p-12 overflow-auto">
      <motion.div className="max-w-5xl w-full space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-foreground">Remediation Status</h1>
          <p className="text-lg text-muted-foreground">
            All issues identified and addressed
          </p>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card p-8 rounded-lg border border-border"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">Issues by Severity</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'var(--color-foreground)' }}
                formatter={(value) => [value, 'Issues']}
              />
              <Legend wrapperStyle={{ color: 'var(--color-foreground)' }} />
              <Bar dataKey="fixed" stackId="a" fill="var(--color-chart-1)" name="Fixed" />
              <Bar dataKey="value" stackId="a" fill="var(--color-border)" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Issues', value: '8', color: 'text-primary' },
            { label: 'Fixed', value: '7', color: 'text-green-600' },
            { label: 'Conditional', value: '1', color: 'text-orange-600' },
            { label: 'Success Rate', value: '88%', color: 'text-accent' },
          ].map((stat, idx) => (
            <div key={idx} className="p-4 bg-card rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
