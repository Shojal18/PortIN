import React from 'react';
import { ShieldCheck, Activity, Building, Globe, Zap, Cpu } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const logos = [
    { name: 'APEX COMMODITIES', category: 'Dry Bulk Global' },
    { name: 'MERIDIAN CAPITAL', category: 'Trade Finance' },
    { name: 'VORTEX LOGISTICS', category: 'Ocean Freight' },
    { name: 'PACIFIC CHARTERING', category: 'Capesize Operator' },
    { name: 'NORDIC MARITIME', category: 'Treasury Desk' },
    { name: 'AURA COMMERCE', category: 'Supply Chain ERP' }
  ];

  const metrics = [
    { value: '$2.4B+', label: 'Annual Volume Processed' },
    { value: '14,200+', label: 'Voyages & Freight Contracts' },
    { value: '99.99%', label: 'Platform & Ledger Uptime SLA' }
  ];

  return (
    <section id="trust-bar" className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Label */}
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono">
          Trusted by modern commodity traders, chartering desks & finance teams
        </p>

        {/* 6 Clean Text-Based Logo Marks */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition w-full text-center group cursor-default"
            >
              <span className="font-extrabold text-[13px] tracking-wider text-gray-700 group-hover:text-gray-950 font-sans transition">
                {logo.name}
              </span>
              <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                {logo.category}
              </span>
            </div>
          ))}
        </div>

        {/* Credibility Key Metrics Strip */}
        <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {metrics.map((m) => (
            <div key={m.label} className="space-y-0.5">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#2E7D32] tracking-tight">
                {m.value}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {m.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
