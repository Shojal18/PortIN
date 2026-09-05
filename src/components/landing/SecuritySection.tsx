import React from 'react';
import {
  Lock,
  Users2,
  AlertTriangle,
  Server,
  ShieldCheck,
  CheckCircle2,
  Activity
} from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Bank-Grade AES-256 Encryption',
      desc: 'All ledger data, bank account secrets, and commercial charter contracts are protected with AES-256-GCM at rest and TLS 1.3 in flight.'
    },
    {
      icon: Users2,
      title: 'Role-Based Dual Quorums',
      desc: 'Enforce dual-signatory approvals for large freight transfers ($100k+) and granular permissions across treasury, operations, and audit.'
    },
    {
      icon: AlertTriangle,
      title: 'Sanctions & Fraud Screening',
      desc: 'Real-time checks against OFAC, IMO vessel blacklists, and automated anomaly detection on correspondent banking routes.'
    },
    {
      icon: Server,
      title: 'Continuous SOC2 & ISO Compliance',
      desc: 'Certified cloud infrastructure with multi-region redundancy, automated hourly cryptographic backups, and strict air-gapped vaults.'
    }
  ];

  return (
    <section id="security-section" className="py-20 lg:py-28 bg-[#0B111E] text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enterprise Treasury Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Built for financial confidence.
          </h2>
          <p className="text-base text-gray-400 leading-relaxed font-normal">
            Rigorous security controls designed for global commodity desks moving millions of dollars in cross-border maritime settlements every week.
          </p>
        </div>

        {/* 4 Security Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {securityFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Enforced by Default</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Infrastructure Status Strip */}
        <div className="mt-12 p-4 rounded-2xl bg-white/[0.02] border border-white/10 max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-semibold">Infrastructure Status:</span>
            <span>All Systems Operational</span>
          </div>
          <div>
            Uptime SLA: <strong className="text-emerald-400">99.99%</strong>
          </div>
          <div>
            Last Audit: <span className="text-gray-300">August 2026 (Clean Opinion)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
