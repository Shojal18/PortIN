import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Filter,
  DollarSign,
  Activity,
  Sparkles
} from 'lucide-react';

interface ProductOverviewProps {
  onEnterApp?: () => void;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({ onEnterApp }) => {
  const [activeTab, setActiveTab] = useState<'treasury' | 'freight' | 'reconciliation'>('treasury');

  return (
    <section id="product-overview" className="py-20 lg:py-28 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Detailed Finance Workspace Mockup */}
          <div className="lg:col-span-7 text-left order-2 lg:order-1">
            <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              
              {/* Workspace Top Toolbar */}
              <div className="px-5 py-3.5 bg-gray-50/80 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  <span className="ml-2 text-xs font-mono text-gray-500 font-medium">
                    app.portin.io/treasury/operations
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-600">
                  <button
                    onClick={() => setActiveTab('treasury')}
                    className={`px-2.5 py-1 rounded-md transition ${activeTab === 'treasury' ? 'bg-neutral-900 text-white font-semibold' : 'hover:text-gray-900'}`}
                  >
                    Treasury
                  </button>
                  <button
                    onClick={() => setActiveTab('freight')}
                    className={`px-2.5 py-1 rounded-md transition ${activeTab === 'freight' ? 'bg-neutral-900 text-white font-semibold' : 'hover:text-gray-900'}`}
                  >
                    Freight P&L
                  </button>
                  <button
                    onClick={() => setActiveTab('reconciliation')}
                    className={`px-2.5 py-1 rounded-md transition ${activeTab === 'reconciliation' ? 'bg-neutral-900 text-white font-semibold' : 'hover:text-gray-900'}`}
                  >
                    Auto-Match
                  </button>
                </div>
              </div>

              {/* Workspace Content Area */}
              <div className="p-5 sm:p-6 space-y-6">
                
                {/* Metric Summary Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block">Total Liquidity</span>
                    <span className="text-[15px] font-bold font-mono text-[#2E7D32] mt-0.5 block">$18,420,000</span>
                    <span className="text-[10px] text-emerald-600 font-mono">+12.4% MoM</span>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block">Committed Freight</span>
                    <span className="text-[15px] font-bold font-mono text-[#2E7D32] mt-0.5 block">$6,840,500</span>
                    <span className="text-[10px] text-gray-500 font-mono">18 active fixtures</span>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block">Bunker Hedged</span>
                    <span className="text-[15px] font-bold font-mono text-[#2E7D32] mt-0.5 block">$3,210,000</span>
                    <span className="text-[10px] text-emerald-600 font-mono">-$18.20/MT vs spot</span>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block">Match Status</span>
                    <span className="text-[15px] font-bold font-mono text-emerald-700 mt-0.5 block">99.2%</span>
                    <span className="text-[10px] text-emerald-600 font-mono">Zero-touch SLA</span>
                  </div>
                </div>

                {/* Workspace Table / Ledger View */}
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-4 py-2.5 bg-gray-50/60 border-b border-gray-200 flex items-center justify-between text-xs text-gray-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Filter className="w-3.5 h-3.5 text-gray-400" />
                      <span>Active Charter & Voyage Contracts</span>
                    </div>
                    <span className="font-mono text-[11px] text-gray-400">Showing 4 of 38 records</span>
                  </div>

                  <div className="divide-y divide-gray-100 text-xs font-mono">
                    <div className="p-3 flex items-center justify-between hover:bg-gray-50 transition">
                      <div className="space-y-0.5 font-sans">
                        <div className="font-semibold text-gray-900 text-[12.5px]">MV Cape Reliance</div>
                        <div className="text-[11px] text-gray-400 font-mono">Port Hedland → Paradip | 170k MT Iron Ore</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#2E7D32]">$19.40 / MT</div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                          Settled ($3.30M)
                        </span>
                      </div>
                    </div>

                    <div className="p-3 flex items-center justify-between hover:bg-gray-50 transition">
                      <div className="space-y-0.5 font-sans">
                        <div className="font-semibold text-gray-900 text-[12.5px]">MV Star Pioneer</div>
                        <div className="text-[11px] text-gray-400 font-mono">Richards Bay → Visakhapatnam | 75k MT Coal</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#2E7D32]">$16.80 / MT</div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                          In Transit ($1.26M)
                        </span>
                      </div>
                    </div>

                    <div className="p-3 flex items-center justify-between hover:bg-gray-50 transition">
                      <div className="space-y-0.5 font-sans">
                        <div className="font-semibold text-gray-900 text-[12.5px]">MV Ocean Builder</div>
                        <div className="text-[11px] text-gray-400 font-mono">Newcastle → Haldia | 65k MT Coking Coal</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#2E7D32]">$21.15 / MT</div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                          Reconciling Port Dues
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-[11.5px] text-gray-500 font-mono pt-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Automated 3-Way Match Active (Charter Party + BL + Port Invoice)
                  </span>
                  <span className="text-gray-400">Latency: 14ms</span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Narrative, 3 Feature Rows & CTA */}
          <div className="lg:col-span-5 text-left space-y-7 order-1 lg:order-2">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                Total Financial Clarity
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight leading-tight">
                One workspace for your entire global capital flow.
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-normal">
                Eliminate fragmented spreadsheets and opaque broker emails. PortIN consolidates forward freight rates, multi-currency cash reserves, and landed dues into an audited, real-time command center.
              </p>
            </div>

            {/* 3 Feature Rows with Clean Dividers */}
            <div className="space-y-4 pt-2 divide-y divide-gray-200/80">
              
              <div className="flex items-start gap-4 pt-4 first:pt-0">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-900 shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Predictive Rate Benchmarking
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Forecast dry bulk spot movements up to 90 days out using validated SARIMA econometric models and seasonal monsoon indices.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-900 shrink-0">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Automated Landed Cost Settlement
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Instantly decompose total cost per metric tonne into base freight, VLSFO bunker surcharges, and port dues across 7 East Coast Indian hubs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-900 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Continuous Audit & Zero-Touch Matching
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Automatically reconcile charter parties against bills of lading and laytime calculations without manual intervention.
                  </p>
                </div>
              </div>

            </div>

            {/* Section CTA */}
            <div className="pt-2">
              <button
                onClick={onEnterApp}
                className="px-5 py-3 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition inline-flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                Launch Finance Workspace
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
