import React from 'react';
import {
  FileText,
  TrendingDown,
  Ship,
  DollarSign,
  AlertTriangle,
  CalendarCheck,
  ArrowDown,
  Plus,
  Equal
} from 'lucide-react';

export const WorkflowAndEquationSection: React.FC = () => {
  const workflowSteps = [
    {
      num: '01',
      title: 'ENTER CARGO',
      icon: FileText,
      bullets: ['Cargo type (Coking, Thermal, Ore)', 'Volume in Metric Tonnes', 'Origin loading terminal', 'Indian East Coast destination']
    },
    {
      num: '02',
      title: 'FORECAST FREIGHT',
      icon: TrendingDown,
      bullets: ['Historical corridor trend curve', 'Monsoon & Pacific seasonality', '30D–90D forward price range', '95% SARIMA confidence band']
    },
    {
      num: '03',
      title: 'CHECK VESSEL FIT',
      icon: Ship,
      bullets: ['Berth draft limits validator', 'Maximum LOA & beam clearance', 'DWT tonnage suitability', 'Pass / Fail deterministic verdict']
    },
    {
      num: '04',
      title: 'COMPARE COST',
      icon: DollarSign,
      bullets: ['Base freight rate calculation', 'Bunker fuel VLSFO index', 'Port & lighterage dues', 'Landed $/MT ranking matrix']
    },
    {
      num: '05',
      title: 'ASSESS RISK',
      icon: AlertTriangle,
      bullets: ['Destination queue & wait times', 'Demurrage financial exposure', 'Route price volatility index', 'Monsoonal draft restrictions']
    },
    {
      num: '06',
      title: 'CHOOSE THE WINDOW',
      icon: CalendarCheck,
      bullets: ['Optimal fixture entry date range', 'Calculated savings vs. current spot', 'Optimal vessel class recommendation', 'Actionable charter execution ticket']
    }
  ];

  const equationTerms = [
    { label: 'FREIGHT RATE', sub: 'Spot & Forward Price' },
    { label: 'VESSEL FIT', sub: 'Deadweight & Beam' },
    { label: 'PORT CONSTRAINTS', sub: 'Draft & LOA Limits' },
    { label: 'FUEL ECONOMICS', sub: 'VLSFO $/MT' },
    { label: 'CONGESTION', sub: 'Demurrage Buffer' },
    { label: 'FORECAST UNCERTAINTY', sub: '95% Confidence Band' }
  ];

  return (
    <section id="workflow" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* SECTION 18: THE PortIN WORKFLOW */}
        <div>
          <div className="max-w-3xl mb-14 text-left">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
              END-TO-END DECISION WORKFLOW
            </div>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
              FROM MARKET SIGNAL
              <br />
              <span className="text-[#12A6A6]">TO CHARTER DECISION.</span>
            </h2>
            <p className="mt-4 text-[16px] text-[#9BAFBE] leading-[1.65] font-sans">
              Experience a structured 6-stage evaluation engine that transforms disparate raw maritime signals into an actionable, de-risked vessel fixture.
            </p>
          </div>

          {/* 6-Step Visual Workflow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] relative hover:border-[#12A6A6]/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#20384C]">
                      <span className="text-[26px] font-mono font-bold text-[#12A6A6]">{step.num}</span>
                      <span className="p-2 rounded bg-[#071522] text-[#12A6A6] border border-[#20384C]">
                        <IconComp className="w-4 h-4" />
                      </span>
                    </div>

                    <h3 className="text-[16px] font-bold text-[#F2F6F8] font-sans uppercase mb-3">
                      {step.title}
                    </h3>

                    <ul className="space-y-1.5 text-xs text-[#9BAFBE] font-sans">
                      {step.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#12A6A6] font-bold mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#20384C]/60 flex items-center justify-between text-[11px] font-mono text-[#9BAFBE]">
                    <span>STAGE {step.num} OF 06</span>
                    <span className="text-[#12A6A6]">AUTOMATED</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 20: WHY PortIN — THE MATHEMATICAL EQUATION */}
        <div className="p-8 sm:p-12 rounded-[8px] bg-[#0B1F33] border border-[#12A6A6]/60 shadow-2xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2">
              SYNTHESIS OF MULTIPLE MARITIME SIGNALS
            </div>
            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#F2F6F8] tracking-tight uppercase font-sans">
              ONE DECISION. MULTIPLE SIGNALS.
            </h2>
            <p className="mt-3 text-sm text-[#9BAFBE]">
              Fixing dry bulk freight requires more than looking at a spot chart. PortIN unifies 6 vital physical and financial inputs into one clear recommendation.
            </p>
          </div>

          {/* Large Visual Equation Box */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-center">
            {equationTerms.map((term, index) => (
              <React.Fragment key={term.label}>
                <div className="p-3.5 sm:p-4 rounded-[6px] bg-[#071522] border border-[#20384C] min-w-[130px] sm:min-w-[150px] shadow-sm">
                  <strong className="block text-xs sm:text-[13px] text-[#F2F6F8] font-bold tracking-tight">
                    {term.label}
                  </strong>
                  <span className="text-[10.5px] text-[#9BAFBE] mt-1 block">
                    {term.sub}
                  </span>
                </div>

                {index < equationTerms.length - 1 && (
                  <span className="text-[#12A6A6] font-bold text-xl px-1">+</span>
                )}
              </React.Fragment>
            ))}

            <div className="w-full flex items-center justify-center my-3">
              <span className="text-[#20B26B] font-bold text-2xl px-2">=</span>
            </div>

            {/* Outcome Pill */}
            <div className="w-full max-w-md p-5 rounded-[6px] bg-[#102337] border-2 border-[#20B26B] text-center shadow-lg">
              <span className="text-[11px] font-mono text-[#20B26B] uppercase font-bold tracking-widest block">
                OPTIMAL OUTCOME
              </span>
              <strong className="text-[18px] sm:text-[20px] text-white font-sans uppercase block mt-1">
                BETTER CHARTER DECISION
              </strong>
              <p className="text-xs text-[#9BAFBE] mt-1 font-sans">
                Maximized freight savings + Guaranteed berth draft compliance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
