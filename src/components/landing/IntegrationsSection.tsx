import React from 'react';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Building,
  CreditCard,
  FileSpreadsheet,
  Globe,
  Database
} from 'lucide-react';

interface IntegrationsSectionProps {
  onEnterApp?: () => void;
}

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ onEnterApp }) => {
  const integrations = [
    {
      name: 'SAP S/4HANA',
      category: 'Enterprise ERP',
      desc: 'Automatic 2-way journal synchronization with general ledger modules.',
      icon: Database,
      status: 'Certified Connector'
    },
    {
      name: 'Oracle NetSuite',
      category: 'Cloud Financials',
      desc: 'Real-time multi-subsidiary consolidation and voyage cost billing.',
      icon: Building,
      status: 'Live Sync'
    },
    {
      name: 'SWIFT Global Network',
      category: 'Interbank Settlement',
      desc: 'Direct MT103 and MT940 automated wire dispatch and confirmation.',
      icon: Globe,
      status: 'Direct Gateway'
    },
    {
      name: 'Bloomberg Terminal / LSEG',
      category: 'Market Feeds',
      desc: 'Sub-minute ingestion of Baltic Dry indices and VLSFO bunker benchmarks.',
      icon: Cpu,
      status: 'Real-Time Feed'
    },
    {
      name: 'QuickBooks Enterprise',
      category: 'Accounting',
      desc: 'Seamless import of vendor invoices, demurrage bills, and tax credits.',
      icon: FileSpreadsheet,
      status: '1-Click Connect'
    },
    {
      name: 'Xero Accounting',
      category: 'SME Treasury',
      desc: 'Automated bank feed reconciliation and multi-currency billing.',
      icon: CreditCard,
      status: 'Verified Partner'
    }
  ];

  return (
    <section id="integrations-section" className="py-20 lg:py-28 bg-white border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">
            Ecosystem Connectivity
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Works with the tools you already rely on.
          </h2>
          <p className="text-base text-gray-500 font-normal leading-relaxed">
            Plug PortIN directly into your existing corporate accounting software, bank accounts, and commodity market data feeds in minutes.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="p-6 rounded-2xl bg-[#FAFAFA] border border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-800 group-hover:text-emerald-700 transition">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[10.5px] font-mono font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-800 transition">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {item.status}
                  </span>
                  <span className="text-gray-400 group-hover:text-gray-600 transition flex items-center gap-0.5 font-sans">
                    View docs <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onEnterApp}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-gray-950 p-2 border-b border-gray-300 hover:border-gray-900 transition cursor-pointer"
          >
            Explore all 40+ supported banking & ERP integrations
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
