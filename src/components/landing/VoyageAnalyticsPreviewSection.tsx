import React, { useState } from 'react';
import {
  Calculator,
  Ship,
  Anchor,
  Compass,
  ArrowRight,
  TrendingDown,
  Fuel,
  CheckCircle2,
  DollarSign,
  Layers,
  Sparkles
} from 'lucide-react';

interface VoyageAnalyticsPreviewSectionProps {
  onEnterApp: () => void;
  onOpenDemo: () => void;
}

export const VoyageAnalyticsPreviewSection: React.FC<VoyageAnalyticsPreviewSectionProps> = ({
  onEnterApp,
  onOpenDemo
}) => {
  const [selectedVessel, setSelectedVessel] = useState<'supramax' | 'panamax' | 'capesize'>('supramax');

  const vesselData = {
    supramax: {
      name: 'SUPRAMAX 58K',
      dwt: '57,800 DWT',
      draft: '12.8 m (Laden)',
      speed: '13.5 Knots',
      seaDays: 14.5,
      portDays: 3.2,
      fuelVLSFO: '$154,200',
      portDues: '$48,500',
      baseFreight: '$18.40 / MT',
      totalLanded: '$21.85 / MT',
      berthStatus: 'PASS - Paradip Mech Berth'
    },
    panamax: {
      name: 'PANAMAX 76K',
      dwt: '76,500 DWT',
      draft: '14.2 m (Laden)',
      speed: '13.0 Knots',
      seaDays: 15.2,
      portDays: 4.1,
      fuelVLSFO: '$198,400',
      portDues: '$62,100',
      baseFreight: '$16.90 / MT',
      totalLanded: '$20.35 / MT',
      berthStatus: 'PASS - Vizag Outer Berth'
    },
    capesize: {
      name: 'CAPESIZE 180K',
      dwt: '181,200 DWT',
      draft: '18.1 m (Laden)',
      speed: '12.5 Knots',
      seaDays: 16.0,
      portDays: 4.8,
      fuelVLSFO: '$345,000',
      portDues: '$112,000',
      baseFreight: '$12.40 / MT',
      totalLanded: '$14.95 / MT',
      berthStatus: 'PASS - Dhamra Deep Berth'
    }
  };

  const current = vesselData[selectedVessel];

  return (
    <section id="voyage-analytics" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Narrative & Value Prop (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono uppercase tracking-widest text-[#E05252]">
              <Calculator className="w-3.5 h-3.5 text-[#E05252]" />
              VOYAGE ESTIMATION & FREIGHT ANALYTICS
            </div>

            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold text-[#F2F6F8] tracking-tight uppercase leading-tight font-sans">
              REAL-TIME CARGO FLOWS
              <br />
              <span className="text-[#E05252]">& FREIGHT ANALYTICS.</span>
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#9BAFBE] leading-relaxed font-sans">
              Navigate dry bulk freight markets with the data clarity to act before the market moves. PortIN's Freight Analytics reveals the real-time supply and demand signals that steel mills, power utilities, and bulk charterers need to time decisions, benchmark costs, and manage risk with confidence.
            </p>

            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#20B26B] shrink-0 mt-0.5" />
                <span className="text-[#F2F6F8]">
                  <strong>Granular Vessel Simulation:</strong> Compute exact bunker consumption (VLSFO + LSMGO), sea days, and port turnaround days.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#12A6A6] shrink-0 mt-0.5" />
                <span className="text-[#F2F6F8]">
                  <strong>Deterministic Berth Validation:</strong> Ensure zero draft violations and demurrage surprises at East Coast terminals.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#E05252] shrink-0 mt-0.5" />
                <span className="text-[#F2F6F8]">
                  <strong>Landed $/MT Pricing:</strong> Unify freight rate, bunker spread, port dues, and lighterage in one clean ledger.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={onEnterApp}
                className="px-6 py-3 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>TEST IN LIVE CALCULATOR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenDemo}
                className="px-5 py-3 rounded-[6px] bg-[#0D1B2A] hover:bg-[#102337] border border-[#20384C] text-[#9BAFBE] hover:text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
              >
                SCHEDULE DEMO
              </button>
            </div>
          </div>

          {/* Right Column: Live Voyage Calculator Simulation Card (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-[12px] bg-[#0D1B2A] border border-[#20384C] shadow-2xl space-y-6">
            {/* Header inside simulator */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#20384C] gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[6px] bg-[#071522] border border-[#E05252] text-[#E05252] flex items-center justify-center">
                  <Ship className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-mono font-bold text-white uppercase">
                    VOYAGE ESTIMATION TERMINAL
                  </h3>
                  <span className="text-[11px] text-[#9BAFBE] font-mono">
                    Corridor: Hay Point (AU) ➔ Paradip Port (IN) • 4,850 NM
                  </span>
                </div>
              </div>

              {/* Vessel Selector Pills */}
              <div className="flex p-1 rounded-[6px] bg-[#071522] border border-[#20384C] gap-1 text-[11px] font-mono">
                {(['supramax', 'panamax', 'capesize'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVessel(v)}
                    className={`px-2.5 py-1 rounded-[4px] font-bold uppercase transition cursor-pointer ${
                      selectedVessel === v
                        ? 'bg-[#E05252] text-white'
                        : 'text-[#9BAFBE] hover:text-white'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Vessel & Voyage Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                <span className="text-[10px] text-[#9BAFBE] uppercase block">DWT / Capacity</span>
                <strong className="text-[14px] text-white mt-0.5 block">{current.dwt}</strong>
              </div>
              <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                <span className="text-[10px] text-[#9BAFBE] uppercase block">Laden Draft</span>
                <strong className="text-[14px] text-[#12A6A6] mt-0.5 block">{current.draft}</strong>
              </div>
              <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                <span className="text-[10px] text-[#9BAFBE] uppercase block">Sea / Port Days</span>
                <strong className="text-[14px] text-white mt-0.5 block">{current.seaDays} / {current.portDays}d</strong>
              </div>
              <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                <span className="text-[10px] text-[#9BAFBE] uppercase block">Speed</span>
                <strong className="text-[14px] text-[#20B26B] mt-0.5 block">{current.speed}</strong>
              </div>
            </div>

            {/* Financial Ledger Breakdown */}
            <div className="p-4 rounded-[8px] bg-[#071522] border border-[#20384C] space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-[#9BAFBE] pb-2 border-b border-[#20384C]/60">
                <span>Estimated Bunker Cost (VLSFO):</span>
                <strong className="text-[#2E7D32]">{current.fuelVLSFO}</strong>
              </div>
              <div className="flex justify-between items-center text-[#9BAFBE] pb-2 border-b border-[#20384C]/60">
                <span>Port & Pilotage Dues:</span>
                <strong className="text-[#2E7D32]">{current.portDues}</strong>
              </div>
              <div className="flex justify-between items-center text-[#9BAFBE] pb-2 border-b border-[#20384C]/60">
                <span>Base Spot Freight Index:</span>
                <strong className="text-[#2E7D32]">{current.baseFreight}</strong>
              </div>
              <div className="flex justify-between items-center pt-1 text-sm">
                <span className="font-bold text-white uppercase">Total Landed Cost ($/MT):</span>
                <strong className="text-[18px] text-[#2E7D32] font-bold">{current.totalLanded}</strong>
              </div>
            </div>

            {/* Berth Feasibility Status Banner */}
            <div className="p-3 rounded-[6px] bg-[#102337] border border-[#20B26B]/50 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-[#20B26B]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-bold">{current.berthStatus}</span>
              </div>
              <span className="text-[10.5px] text-[#9BAFBE]">Draft Clearance: OK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
