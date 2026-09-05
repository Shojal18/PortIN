import React from 'react';

export const StatisticsSection: React.FC = () => {
  const stats = [
    {
      value: '$2.4B+',
      label: 'Freight Capital Settled',
      desc: 'Annualized cross-border wire volume'
    },
    {
      value: '10,000+',
      label: 'Charter Desks & Users',
      desc: 'Active finance and commercial operators'
    },
    {
      value: '99.99%',
      label: 'Platform Ledger Uptime',
      desc: 'Continuous enterprise SLA guarantee'
    },
    {
      value: '40%',
      label: 'Less Manual Operations',
      desc: 'Average reduction in reconciliation time'
    }
  ];

  return (
    <section id="statistics-section" className="py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1.5">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-[#2E7D32] tracking-tight">
                {s.value}
              </div>
              <div className="text-[14px] sm:text-[15px] font-bold text-gray-900 leading-tight">
                {s.label}
              </div>
              <div className="text-xs text-gray-500 leading-relaxed font-normal">
                {s.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
