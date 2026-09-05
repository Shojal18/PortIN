import React from 'react';
import {
  CreditCard,
  BarChart3,
  Zap,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  Lock,
  DollarSign
} from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  return (
    <section id="feature-grid" className="py-20 lg:py-28 bg-white border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">
            Modular Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Engineered for high-volume freight finance.
          </h2>
          <p className="text-base text-gray-500 font-normal leading-relaxed">
            Every feature is purposefully constructed to reduce operational friction, eliminate manual data entry, and secure margin predictability.
          </p>
        </div>

        {/* 6 High-Finish Feature Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 text-left">
          
          {/* Card 1: Payments & Settlement */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-900">
                  Move money effortlessly
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                  Execute multi-currency freight wires, bunker prepayments, and port dues instantly across global correspondent banks.
                </p>
              </div>
            </div>

            {/* Micro-UI Visualization */}
            <div className="mt-6 p-3.5 rounded-xl bg-gray-50/90 border border-gray-100 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-sans">Freight Dispatch:</span>
                <span className="font-bold text-[#2E7D32]">-$640,000.00</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>SWIFT MT103 Ref:</span>
                <span className="text-gray-800">#SW-994821</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-gray-200 text-[10.5px]">
                <span className="text-emerald-600 flex items-center gap-1 font-sans font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Settled in 2.4s
                </span>
                <span className="text-gray-400">SBI Treasury</span>
              </div>
            </div>
          </div>

          {/* Card 2: Analytics & P&L */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-900">
                  Understand every number
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                  Real-time net margin decomposition by commodity, vessel class, and discharge port with millisecond granularity.
                </p>
              </div>
            </div>

            {/* Micro-UI Visualization: Mini Chart & Growth */}
            <div className="mt-6 p-3.5 rounded-xl bg-gray-50/90 border border-gray-100 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-sans">Net Voyage Margin:</span>
                <span className="font-bold text-[#2E7D32] flex items-center gap-0.5">
                  +$3.42 / MT <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                </span>
              </div>
              {/* Mini visual progress bars */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] text-gray-500 font-sans">
                  <span>Gross Freight ($19.40)</span>
                  <span>Landed Net ($15.98)</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 w-[78%]" />
                  <div className="bg-amber-400 w-[22%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Automation Engine */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-900">
                  Automate financial work
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                  Rule-based charter matching, demurrage insurance triggering, and automated GL ledger entries without human latency.
                </p>
              </div>
            </div>

            {/* Micro-UI Visualization */}
            <div className="mt-6 p-3.5 rounded-xl bg-gray-50/90 border border-gray-100 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-sans">Laytime Recalculation:</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                  AUTO-MATCHED
                </span>
              </div>
              <div className="text-[11px] text-gray-800 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>Despatch Credit: </span>
                <strong className="text-[#2E7D32]">+$14,200.00</strong>
              </div>
            </div>
          </div>

          {/* Card 4: Invoicing & Landed Dues */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-900">
                  Automated billing & landed dues
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                  Auto-generate compliant commercial invoices with itemized port tariffs, pilotage fees, and bunker adjustment factors.
                </p>
              </div>
            </div>

            {/* Micro-UI Visualization: Invoice Preview */}
            <div className="mt-6 p-3.5 rounded-xl bg-gray-50/90 border border-gray-100 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-sans font-medium">Inv #INV-2026-88</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  PAID
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                <span className="text-gray-400 font-sans text-[11px]">Due Date: 12 Aug 2026</span>
                <span className="font-bold text-[#2E7D32] text-[12px]">$1,890,200</span>
              </div>
            </div>
          </div>

          {/* Card 5: Cash Flow / Liquidity Forecasting */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-900">
                  Predictable liquidity forecasting
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                  Project forward cash flow curves taking into account seasonal laycan windows, freight volatility, and payment milestones.
                </p>
              </div>
            </div>

            {/* Micro-UI Visualization */}
            <div className="mt-6 p-3.5 rounded-xl bg-gray-50/90 border border-gray-100 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-sans">Projected Q4 Buffer:</span>
                <span className="font-bold text-[#2E7D32]">+$4.18M USD</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span className="font-sans">Confidence Level:</span>
                <span className="text-emerald-700 font-semibold">95% CI Safe</span>
              </div>
            </div>
          </div>

          {/* Card 6: Bank-Grade Security */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-900">
                  Bank-grade treasury safeguards
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                  Dual-approval signatory quorums, AES-256 encrypted ledger records, and full SOC2 Type II compliance standards.
                </p>
              </div>
            </div>

            {/* Micro-UI Visualization */}
            <div className="mt-6 p-3.5 rounded-xl bg-gray-50/90 border border-gray-100 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-sans flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" /> Quorum Status:
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                  2 OF 2 SIGNED
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span className="font-sans">Audit Trail:</span>
                <span className="text-gray-700">SHA-256 Verified</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
