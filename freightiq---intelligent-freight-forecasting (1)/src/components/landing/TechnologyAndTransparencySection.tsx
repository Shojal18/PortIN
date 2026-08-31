import React from 'react';
import { Database, Cpu, CheckCircle2, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';

export const TechnologyAndTransparencySection: React.FC = () => {
  const pipelineSteps = [
    { label: 'HISTORICAL FREIGHT DATA', desc: 'Route spot series & fuel indices' },
    { label: 'TIME-SERIES FORECAST', desc: 'SARIMA & additive Prophet models' },
    { label: 'CONFIDENCE RANGE', desc: '95% econometric prediction interval' },
    { label: 'VESSEL-PORT FEASIBILITY', desc: 'Deterministic draft/LOA constraints' },
    { label: 'COST RANKING', desc: 'Landed $/MT base + bunker breakdown' },
    { label: 'RISK ANALYSIS', desc: 'Congestion, weather & idle telemetry' },
    { label: 'CHARTER RECOMMENDATION', desc: 'Actionable optimal fixture window' }
  ];

  return (
    <section id="technology" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* SECTION 21: TECHNOLOGY & MODEL */}
        <div>
          <div className="max-w-3xl mb-12 text-left">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
              ANALYTICAL FOUNDATION
            </div>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
              TURN HISTORICAL DATA
              <br />
              <span className="text-[#12A6A6]">INTO FORWARD INTELLIGENCE.</span>
            </h2>
            <p className="mt-4 text-[16px] text-[#9BAFBE] leading-[1.65] font-sans">
              Forecasting uses statistical time-series algorithms (SARIMA and Prophet) tailored to dry-bulk freight seasonality, coupled with deterministic naval architectural validation rules.
            </p>
          </div>

          {/* Model Pipeline Horizontal Stream */}
          <div className="p-6 sm:p-8 rounded-[8px] bg-[#0D1B2A] border border-[#20384C]">
            <div className="text-xs font-mono font-bold text-[#9BAFBE] uppercase pb-4 mb-4 border-b border-[#20384C]">
              END-TO-END ANALYTICAL PIPELINE
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
              {pipelineSteps.map((step, idx) => (
                <div
                  key={step.label}
                  className="p-3.5 rounded bg-[#071522] border border-[#20384C] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#12A6A6] font-bold block mb-1">
                      STEP 0{idx + 1}
                    </span>
                    <strong className="text-[11.5px] font-mono font-bold text-[#F2F6F8] block leading-tight">
                      {step.label}
                    </strong>
                  </div>
                  <p className="text-[10.5px] text-[#9BAFBE] font-sans mt-2 leading-tight">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 22: DATA TRANSPARENCY */}
        <div>
          <div className="max-w-3xl mb-10 text-left">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
              GOVERNANCE & AUDITABILITY
            </div>
            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
              BUILT WITH TRANSPARENT DATA ASSUMPTIONS.
            </h2>
            <p className="mt-3 text-sm text-[#9BAFBE]">
              We clearly disclose data origins so chartering managers can assess algorithmic recommendations with complete clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category 1: Reference Data */}
            <div className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#20384C]">
                <strong className="text-sm font-mono text-[#F2F6F8]">REFERENCE DATA</strong>
                <span className="p-1.5 rounded bg-[#071522] text-[#12A6A6]">
                  <Database className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-[#9BAFBE] leading-relaxed">
                Port and vessel physical specifications (drafts, LOA, beam, and berth discharge rates) use publicly known reference maritime documentation.
              </p>
            </div>

            {/* Category 2: Synthetic Data */}
            <div className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#20384C]">
                <strong className="text-sm font-mono text-[#D8891A]">SYNTHETIC DATA</strong>
                <span className="p-1.5 rounded bg-[#071522] text-[#D8891A]">
                  <Cpu className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-[#9BAFBE] leading-relaxed">
                Freight-rate history and market benchmarks are realistic synthetic datasets generated for prototype demonstration and scenario testing.
              </p>
            </div>

            {/* Category 3: Model Output */}
            <div className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#20384C]">
                <strong className="text-sm font-mono text-[#20B26B]">MODEL OUTPUT</strong>
                <span className="p-1.5 rounded bg-[#071522] text-[#20B26B]">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-[#9BAFBE] leading-relaxed">
                Forward outlooks and recommended charter windows are computed directly by the PortIN algorithmic pipeline without black-box simulation.
              </p>
            </div>
          </div>

          {/* Prototype Badge Banner */}
          <div className="mt-6 p-3 rounded-[6px] bg-[#071522] border border-[#20384C] flex items-center justify-between text-xs font-mono text-[#9BAFBE]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#102337] text-[#12A6A6] border border-[#20384C] font-bold">
                SIH 2026 PROTOTYPE
              </span>
              <span>Intelligent Dry-Bulk Maritime Decision System</span>
            </div>
            <span className="text-[11px] text-[#9BAFBE] hidden sm:inline">
              East Coast India Logistics Initiative
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
