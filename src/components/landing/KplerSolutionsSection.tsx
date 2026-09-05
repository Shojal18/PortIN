import React, { useState } from 'react';
import {
  Ship,
  TrendingUp,
  Compass,
  Anchor,
  Layers,
  ArrowRight,
  ShieldCheck,
  Fuel,
  Cpu,
  Calculator,
  Sliders,
  Sparkles,
  BarChart3,
  Calendar,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';

interface KplerSolutionsSectionProps {
  onEnterApp: () => void;
  onOpenDemo: () => void;
}

export const KplerSolutionsSection: React.FC<KplerSolutionsSectionProps> = ({
  onEnterApp,
  onOpenDemo
}) => {
  const [activeTab, setActiveTab] = useState<'fundamental' | 'derived' | 'decision'>('fundamental');

  const fundamentalItems = [
    {
      id: 'metals-dry',
      title: 'Metals, Ores & Coal',
      tag: 'CARGO FLOWS',
      desc: 'Real-time seaborne volume, origin loading queues, and discharge tracking for Coking Coal, Thermal Coal, and Iron Ore across Indian ports.',
      gradient: 'from-[#E05252]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#E05252]/40',
      tagColor: 'text-[#E05252] bg-[#E05252]/10',
      icon: Layers,
      highlight: '140M+ MT / yr tracked'
    },
    {
      id: 'ship-tracking',
      title: 'Bulker Tracking & Drafts',
      tag: 'VESSEL TELEMETRY',
      desc: 'Real-time AIS position, laden draft calculation, and voyage ETA for Supramax, Panamax, and Capesize bulkers heading to East Coast India.',
      gradient: 'from-[#12A6A6]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#12A6A6]/40',
      tagColor: 'text-[#12A6A6] bg-[#12A6A6]/10',
      icon: Ship,
      highlight: 'Live Draught Telemetry'
    },
    {
      id: 'port-constraints',
      title: '7 East Coast Ports',
      tag: 'PORT INFRASTRUCTURE',
      desc: 'Deterministic draft ceilings, LOA limits, beam constraints, and mechanised berth discharge capabilities for Paradip, Vizag, Dhamra, Haldia & more.',
      gradient: 'from-[#20B26B]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#20B26B]/40',
      tagColor: 'text-[#20B26B] bg-[#20B26B]/10',
      icon: Anchor,
      highlight: '100% Port Fit Validation'
    },
    {
      id: 'bunkers-fuel',
      title: 'Bunker & VLSFO Index',
      tag: 'ENERGY ECONOMICS',
      desc: 'Real-time global bunker spreads (Singapore, Fujairah, Visakhapatnam) with per-tonne voyage fuel consumption impact.',
      gradient: 'from-[#D8891A]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#D8891A]/40',
      tagColor: 'text-[#D8891A] bg-[#D8891A]/10',
      icon: Fuel,
      highlight: 'Daily Bunker Spreads'
    },
    {
      id: 'lighterage-transship',
      title: 'Offshore Lighterage',
      tag: 'ANCHORAGE OPS',
      desc: 'Sandheads and Sagar deepwater transshipment operations for deep-draft vessels discharging cargo for riverine lock ports.',
      gradient: 'from-[#8A5CF6]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#8A5CF6]/40',
      tagColor: 'text-[#8A5CF6] bg-[#8A5CF6]/10',
      icon: Compass,
      highlight: 'Sandheads Capacity'
    },
    {
      id: 'corridor-flow',
      title: 'Global Supply Hubs',
      tag: 'TRADE CORRIDORS',
      desc: 'End-to-end voyage tracking from Australia, Indonesia, USA, Mozambique, and South Africa directly into Indian terminals.',
      gradient: 'from-[#087F8C]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#087F8C]/40',
      tagColor: 'text-[#087F8C] bg-[#087F8C]/10',
      icon: TrendingUp,
      highlight: '5 Global Supply Corridors'
    }
  ];

  const derivedItems = [
    {
      id: 'sarima-forecast',
      title: 'SARIMA Freight Outlooks',
      tag: 'TIME-SERIES ML',
      desc: '30, 60, and 90-day forward price curves modeled on historical route volatility, Pacific cycles, and East Coast monsoon seasonality.',
      gradient: 'from-[#12A6A6]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#12A6A6]/40',
      tagColor: 'text-[#12A6A6] bg-[#12A6A6]/10',
      icon: BarChart3,
      highlight: '95% Confidence Band'
    },
    {
      id: 'optimal-window',
      title: 'Optimal Charter Windows',
      tag: 'TIMING ARBITRAGE',
      desc: 'Algorithmic identification of market troughs to lock fixtures at estimated 5% to 12% savings vs. current spot freight.',
      gradient: 'from-[#20B26B]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#20B26B]/40',
      tagColor: 'text-[#20B26B] bg-[#20B26B]/10',
      icon: Calendar,
      highlight: 'Actionable 14-Day Windows'
    },
    {
      id: 'demurrage-risk',
      title: 'Demurrage & Congestion',
      tag: 'EARLY WARNING',
      desc: 'Pre-monsoon vessel bunching, wait-time projections, and port queue analytics to prevent costly idle time charges.',
      gradient: 'from-[#E05252]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#E05252]/40',
      tagColor: 'text-[#E05252] bg-[#E05252]/10',
      icon: AlertTriangle,
      highlight: 'Real-time Queue Telemetry'
    }
  ];

  const decisionItems = [
    {
      id: 'feasibility-engine',
      title: 'Vessel-Port Validator',
      tag: 'DETERMINISTIC VERDICT',
      desc: 'Instant PASS/FAIL check comparing ship deadweight, laden draft, length overall (LOA), and beam against target berth limits.',
      gradient: 'from-[#20B26B]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#20B26B]/40',
      tagColor: 'text-[#20B26B] bg-[#20B26B]/10',
      icon: ShieldCheck,
      highlight: 'Zero Rejection Risk'
    },
    {
      id: 'voyage-calculator',
      title: 'Landed Voyage Calculator',
      tag: 'COST BREAKDOWN',
      desc: 'Detailed $/MT comparison across vessel classes uniting base freight, bunker fuel consumption, port dues, and lighterage.',
      gradient: 'from-[#12A6A6]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#12A6A6]/40',
      tagColor: 'text-[#12A6A6] bg-[#12A6A6]/10',
      icon: Calculator,
      highlight: 'Per MT Landed Cost'
    },
    {
      id: 'charter-ticket',
      title: 'Execution Decision Ticket',
      tag: 'ACTIONABLE SPEC',
      desc: 'Generate executive summary sheets with optimal laycan dates, recommended vessel class, and cost benchmarks ready for chartering desks.',
      gradient: 'from-[#D8891A]/20 via-[#0D1B2A] to-[#071522]',
      border: 'border-[#D8891A]/40',
      tagColor: 'text-[#D8891A] bg-[#D8891A]/10',
      icon: FileSpreadsheet,
      highlight: 'Exportable PDF & Excel'
    }
  ];

  const currentItems =
    activeTab === 'fundamental'
      ? fundamentalItems
      : activeTab === 'derived'
      ? derivedItems
      : decisionItems;

  return (
    <section id="solutions" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono uppercase tracking-widest text-[#E05252]">
            <Sparkles className="w-3.5 h-3.5 text-[#E05252]" />
            MODULAR MARITIME PLATFORM
          </div>

          <h2 className="text-[30px] sm:text-[42px] lg:text-[46px] font-bold text-[#F2F6F8] tracking-tight uppercase leading-tight font-sans">
            UNLOCK PORTIN SOLUTIONS
            <br />
            <span className="text-[#E05252]">FOR PRECISE FORECASTS.</span>
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#9BAFBE] leading-relaxed max-w-2xl mx-auto font-sans">
            From raw vessel and port telemetry to forward freight rate forecasts and automated chartering tickets, explore our specialized decision modules.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] gap-1 shadow-xl">
            <button
              onClick={() => setActiveTab('fundamental')}
              className={`px-5 py-2.5 rounded-[6px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === 'fundamental'
                  ? 'bg-[#E05252] text-white shadow-md'
                  : 'text-[#9BAFBE] hover:text-white hover:bg-[#102337]'
              }`}
            >
              Fundamental Intelligence
            </button>

            <button
              onClick={() => setActiveTab('derived')}
              className={`px-5 py-2.5 rounded-[6px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === 'derived'
                  ? 'bg-[#E05252] text-white shadow-md'
                  : 'text-[#9BAFBE] hover:text-white hover:bg-[#102337]'
              }`}
            >
              Derived Insights
            </button>

            <button
              onClick={() => setActiveTab('decision')}
              className={`px-5 py-2.5 rounded-[6px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === 'decision'
                  ? 'bg-[#E05252] text-white shadow-md'
                  : 'text-[#9BAFBE] hover:text-white hover:bg-[#102337]'
              }`}
            >
              Decision Tools
            </button>
          </div>
        </div>

        {/* Dynamic Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {currentItems.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                onClick={onEnterApp}
                className={`group p-6 rounded-[10px] bg-gradient-to-b ${item.gradient} border ${item.border} hover:border-[#E05252] transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1`}
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#20384C]">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <div className="p-2 rounded bg-[#071522] border border-[#20384C] text-[#F2F6F8] group-hover:text-[#E05252] transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#F2F6F8] font-sans group-hover:text-white transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9BAFBE] leading-relaxed font-sans mb-4">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Pill & Arrow */}
                <div className="pt-4 border-t border-[#20384C]/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#F2F6F8] font-semibold">{item.highlight}</span>
                  <div className="flex items-center gap-1 text-[#E05252] group-hover:translate-x-1 transition-transform">
                    <span className="text-[11px] font-bold">EXPLORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner inside solutions */}
        <div className="p-6 rounded-[8px] bg-[#0B1F33] border border-[#20384C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold font-sans text-white uppercase">
              Need custom corridor coverage or enterprise API access?
            </h4>
            <p className="text-xs text-[#9BAFBE]">
              Connect your internal ERP or CTRM system directly to PortIN's high-frequency time-series pipelines.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDemo}
              className="px-5 py-2.5 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              REQUEST DEMO
            </button>
            <button
              onClick={onEnterApp}
              className="px-5 py-2.5 rounded-[6px] bg-[#071522] hover:bg-[#102337] border border-[#20384C] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              LAUNCH APP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
