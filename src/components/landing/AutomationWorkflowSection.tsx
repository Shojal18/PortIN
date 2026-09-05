import React from 'react';
import {
  CreditCard,
  Tag,
  FileCheck,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Zap,
  ShieldCheck
} from 'lucide-react';

export const AutomationWorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Payment Received',
      sub: 'Inbound charter wire or bunker drawdown triggers webhook',
      icon: CreditCard,
      status: 'Captured in 2.1s'
    },
    {
      num: '02',
      title: 'Transaction Categorized',
      sub: 'AI parser extracts vessel IMO, laycan dates & port tariffs',
      icon: Tag,
      status: 'Auto-Tagged'
    },
    {
      num: '03',
      title: 'Invoice & BL Matched',
      sub: '3-way automated crosscheck against master charter party',
      icon: FileCheck,
      status: '100% Matched'
    },
    {
      num: '04',
      title: 'Account Reconciled',
      sub: 'Automated GL journal entries pushed to your ERP ledger',
      icon: RefreshCw,
      status: 'Zero-Touch'
    },
    {
      num: '05',
      title: 'Voyage P&L Updated',
      sub: 'Real-time landed margin reports generated for treasury',
      icon: FileSpreadsheet,
      status: 'Audit Certified'
    }
  ];

  return (
    <section id="automation-section" className="py-20 lg:py-28 bg-white border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-semibold">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Autonomous Settlement Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Let your financial operations run themselves.
          </h2>
          <p className="text-base text-gray-500 font-normal leading-relaxed">
            Replace manual human data entry with end-to-end event-driven orchestration from bank wire capture to general ledger closing.
          </p>
        </div>

        {/* 5-Step Workflow Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative text-left">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-5 rounded-2xl bg-[#FAFAFA] border border-gray-200 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-4 group relative"
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gray-400">
                    STEP {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Step Titles */}
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-800 transition">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {step.sub}
                  </p>
                </div>

                {/* Status Indicator Tag */}
                <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {step.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Pipeline Live Status Banner */}
        <div className="mt-10 max-w-2xl mx-auto p-4 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-400 font-sans">
              Pipeline Status: Active
            </span>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="text-gray-300">
              98.4% Zero-Touch Reconciled This Month
            </span>
          </div>
          <div className="text-gray-400 text-[11px]">
            Avg cycle time: <strong className="text-white">1.8 seconds</strong>
          </div>
        </div>

      </div>
    </section>
  );
};
