import React from 'react';
import {
  Factory,
  Zap,
  Ship,
  Anchor,
  TrendingUp,
  Building2,
  Shield,
  Layers,
  ArrowRight,
  Globe2,
  Cpu
} from 'lucide-react';

interface IndustriesGridSectionProps {
  onEnterApp: () => void;
  onOpenDemo: () => void;
}

export const IndustriesGridSection: React.FC<IndustriesGridSectionProps> = ({
  onEnterApp,
  onOpenDemo
}) => {
  const industries = [
    {
      title: 'Energy & Power Utilities',
      sub: 'Thermal coal procurement, discharge queue monitoring, and demurrage mitigation for power generation plants.',
      icon: Zap,
      badge: 'THERMAL POWER'
    },
    {
      title: 'Steel Mills & Metallurgy',
      sub: 'High-grade coking coal and iron ore logistics, berth draft constraints, and forward laycan timing.',
      icon: Factory,
      badge: 'STEEL & SMELTING'
    },
    {
      title: 'Dry Bulk Chartering Desks',
      sub: 'Forward freight price forecasting, vessel-to-berth feasibility validation, and landed $/MT cost optimization.',
      icon: Ship,
      badge: 'CHARTERING'
    },
    {
      title: 'Port Authorities & Terminals',
      sub: 'Draught capacity modeling, vessel bunching telemetry, mechanised loader utilization, and queue prediction.',
      icon: Anchor,
      badge: 'PORT OPERATORS'
    },
    {
      title: 'Commodity Trading Houses',
      sub: 'Physical seaborne arbitrage, freight spread calculation, and vessel fixture execution across Indian corridors.',
      icon: TrendingUp,
      badge: 'TRADING & CTMS'
    },
    {
      title: 'Shipowners & Operators',
      sub: 'Voyage estimation, East Coast port turnaround optimization, and bunker fuel spread analysis.',
      icon: Layers,
      badge: 'SHIPOWNERS'
    },
    {
      title: 'Cement & Industrial Mills',
      sub: 'Petcoke, limestone flux, and gypsum parcel shipments with Handysize / Supramax vessel optimization.',
      icon: Building2,
      badge: 'CEMENT & FLUX'
    },
    {
      title: 'Fertilizer & Chemicals',
      sub: 'Rock phosphate and DAP parcel inflow tracking into riverine lock ports and deepwater berths.',
      icon: Cpu,
      badge: 'FERTILIZERS'
    },
    {
      title: 'Maritime Finance & FFA',
      sub: 'Forward freight agreement hedging, route volatility scoring, and counterparty operational risk audits.',
      icon: Shield,
      badge: 'FINANCE & RISK'
    },
    {
      title: 'Logistics & Forwarding',
      sub: 'Multimodal port-to-rail evacuation scheduling and Sandheads lighterage transshipment coordination.',
      icon: Globe2,
      badge: 'MULTIMODAL'
    }
  ];

  return (
    <section id="industries" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono uppercase tracking-widest text-[#E05252]">
            ECOSYSTEM VALUE
          </div>

          <h2 className="text-[30px] sm:text-[42px] lg:text-[46px] font-bold text-[#F2F6F8] tracking-tight uppercase leading-tight font-sans">
            INDUSTRIES & STAKEHOLDERS
            <br />
            <span className="text-[#E05252]">WE EMPOWER.</span>
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#9BAFBE] leading-relaxed max-w-2xl mx-auto font-sans">
            We empower procurement leaders, chartering desks, and maritime operators to reach heights in operational precision and freight cost efficiency.
          </p>
        </div>

        {/* 10-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((ind) => {
            const IconComp = ind.icon;
            return (
              <div
                key={ind.title}
                onClick={onEnterApp}
                className="p-5 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] hover:border-[#E05252] transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#20384C]">
                    <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#12A6A6] bg-[#071522] px-2 py-0.5 rounded border border-[#20384C]">
                      {ind.badge}
                    </span>
                    <div className="p-1.5 rounded bg-[#071522] text-[#9BAFBE] group-hover:text-[#E05252] transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold font-sans text-white group-hover:text-[#E05252] transition-colors mb-2 leading-tight">
                    {ind.title}
                  </h3>

                  <p className="text-[11.5px] text-[#9BAFBE] leading-relaxed font-sans">
                    {ind.sub}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#20384C]/60 flex items-center justify-end text-[11px] font-mono text-[#9BAFBE] group-hover:text-[#E05252]">
                  <span className="flex items-center gap-1 font-bold">
                    <span>VIEW</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
