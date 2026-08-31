import React from 'react';
import { Eye, Compass, Zap, ArrowRight, ShieldCheck, TrendingUp, Anchor, Ship } from 'lucide-react';

interface ThreePillarsSectionProps {
  onEnterApp: () => void;
  onOpenDemo: () => void;
}

export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = ({
  onEnterApp,
  onOpenDemo
}) => {
  const pillars = [
    {
      num: '01',
      action: 'MONITOR',
      title: 'Observe real-time seaborne trade flows',
      desc: 'Track global bulk vessels in real time, origin loading queues, offshore lighterage operations, and anchorage congestion across Indian terminals.',
      icon: Eye,
      tag: 'VISIBILITY',
      color: 'text-[#12A6A6]',
      borderColor: 'border-[#12A6A6]/40',
      bgGlow: 'from-[#12A6A6]/10 via-[#0D1B2A] to-[#071522]'
    },
    {
      num: '02',
      action: 'UNDERSTAND',
      title: 'Gain transparency into vessel & port dynamics',
      desc: 'Evaluate deterministic draft ceilings, LOA limits, bunker fuel price spreads, and monsoon seasonality patterns before committing to a fixture.',
      icon: Compass,
      tag: 'INTELLIGENCE',
      color: 'text-[#E05252]',
      borderColor: 'border-[#E05252]/40',
      bgGlow: 'from-[#E05252]/10 via-[#0D1B2A] to-[#071522]'
    },
    {
      num: '03',
      action: 'ACT',
      title: 'Maximise return and minimise risk',
      desc: 'Lock in optimal forward charter windows, eliminate costly berth rejections, and negotiate lower freight rates backed by rigorous mathematical models.',
      icon: Zap,
      tag: 'EXECUTION',
      color: 'text-[#20B26B]',
      borderColor: 'border-[#20B26B]/40',
      bgGlow: 'from-[#20B26B]/10 via-[#0D1B2A] to-[#071522]'
    }
  ];

  return (
    <section id="three-pillars" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono uppercase tracking-widest text-[#E05252]">
            DECISION ARCHITECTURE
          </div>

          <h2 className="text-[30px] sm:text-[42px] lg:text-[46px] font-bold text-[#F2F6F8] tracking-tight uppercase leading-tight font-sans">
            TRACK WITH CONFIDENCE
            <br />
            <span className="text-[#E05252]">THROUGH UNCERTAINTY.</span>
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#9BAFBE] leading-relaxed max-w-2xl mx-auto font-sans">
            PortIN's dry bulk intelligence platform guides your strategic decisions across commodity procurement, providing real-time insights based on verified maritime data.
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => {
            const IconComp = p.icon;
            return (
              <div
                key={p.num}
                onClick={onEnterApp}
                className={`p-8 rounded-[12px] bg-gradient-to-b ${p.bgGlow} border ${p.borderColor} hover:border-white/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xl hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#20384C]">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-mono font-bold text-white">{p.num}</span>
                      <span className={`text-xs font-mono font-bold tracking-wider uppercase ${p.color}`}>
                        {p.action}
                      </span>
                    </div>
                    <div className="p-2.5 rounded bg-[#071522] border border-[#20384C] text-white group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white font-sans mb-3 leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[#9BAFBE] leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#20384C]/80 flex items-center justify-between text-xs font-mono text-[#9BAFBE] group-hover:text-white">
                  <span>STAGE {p.num} OF 03</span>
                  <div className="flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
