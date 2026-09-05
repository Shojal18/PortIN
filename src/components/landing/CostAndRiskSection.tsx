import React from 'react';
import { DollarSign, AlertTriangle, ShieldCheck, TrendingUp, Clock, Waves, Fuel } from 'lucide-react';

export const CostAndRiskSection: React.FC = () => {
  const costBreakdown = [
    {
      vessel: 'SUPRAMAX',
      dwt: '55,000 DWT',
      freight: 15.20,
      fuel: 2.80,
      portDues: 0.85,
      total: 18.00,
      rank: 'Rank 1 (Optimal Choice)',
      savingsVsBase: 'Lowest Voyage $/MT',
      recommended: true
    },
    {
      vessel: 'HANDYSIZE',
      dwt: '35,000 DWT',
      freight: 16.80,
      fuel: 3.10,
      portDues: 1.10,
      total: 19.90,
      rank: 'Rank 2 (Alternative)',
      savingsVsBase: '+$1.90 / MT Higher',
      recommended: false
    },
    {
      vessel: 'PANAMAX',
      dwt: '72,000 DWT',
      freight: 17.40,
      fuel: 3.10,
      portDues: 0.95,
      total: 20.50,
      rank: 'Rank 3 (High Freight)',
      savingsVsBase: '+$2.50 / MT Higher',
      recommended: false
    }
  ];

  const riskFactors = [
    {
      title: 'Idle-Time Exposure',
      level: 'LOW',
      colorBg: 'bg-[#16805C]/20',
      colorBorder: 'border-[#16805C]',
      colorText: 'text-[#20B26B]',
      description: 'Berthing wait times at destination currently average <1.2 days. Fast loading queue at origin terminal.',
      metric: 'Wait: 0.8 - 1.5 Days'
    },
    {
      title: 'Port Congestion',
      level: 'MEDIUM',
      colorBg: 'bg-[#D8891A]/20',
      colorBorder: 'border-[#D8891A]',
      colorText: 'text-[#D8891A]',
      description: 'Pre-monsoon vessel bunching at East Coast anchorages. 4 bulkers waiting in line for mechanised coal berths.',
      metric: 'Queue: 3 - 5 Vessels'
    },
    {
      title: 'Freight Volatility',
      level: 'HIGH',
      colorBg: 'bg-[#C94C4C]/20',
      colorBorder: 'border-[#C94C4C]',
      colorText: 'text-[#E05252]',
      description: 'Bunker fuel VLSFO spread widening + Chinese Pacific demand surge pushing spot charter rates upward by 8.4%.',
      metric: '30-Day Vol: ±18.2%'
    }
  ];

  return (
    <section id="risk-intelligence" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* SECTION 15: COST INTELLIGENCE */}
        <div>
          <div className="max-w-3xl mb-12 text-left">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
              LANDED VOYAGE COST DISCOVERY
            </div>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
              COMPARE THE ECONOMICS
              <br />
              <span className="text-[#12A6A6]">BEFORE YOU FIX.</span>
            </h2>
            <p className="mt-4 text-[16px] text-[#9BAFBE] leading-[1.65] font-sans">
              PortIN ranks feasible vessel classes using estimated base freight, bunker fuel consumption, and total landed cost per metric tonne.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {costBreakdown.map((item) => (
              <div
                key={item.vessel}
                className={`p-6 rounded-[8px] border transition-all ${
                  item.recommended
                    ? 'bg-[#0B1F33] border-[#12A6A6] shadow-xl relative'
                    : 'bg-[#0D1B2A] border-[#20384C]'
                }`}
              >
                {item.recommended && (
                  <span className="absolute -top-3 right-5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#12A6A6] text-white">
                    RECOMMENDED FIXTURE
                  </span>
                )}

                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#20384C]">
                  <div>
                    <h3 className="text-lg font-bold text-[#F2F6F8] font-mono">{item.vessel}</h3>
                    <span className="text-xs font-mono text-[#9BAFBE]">{item.dwt}</span>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    item.recommended ? 'bg-[#20B26B]/15 text-[#20B26B] border border-[#20B26B]/30' : 'bg-[#071522] text-[#9BAFBE] border border-[#20384C]'
                  }`}>
                    {item.rank}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs mb-6">
                  <div className="flex justify-between text-[#9BAFBE]">
                    <span>Base Freight:</span>
                    <strong className="text-[#F2F6F8]">${item.freight.toFixed(2)} / MT</strong>
                  </div>
                  <div className="flex justify-between text-[#9BAFBE]">
                    <span>Bunker Fuel (VLSFO):</span>
                    <strong className="text-[#F2F6F8]">${item.fuel.toFixed(2)} / MT</strong>
                  </div>
                  <div className="flex justify-between text-[#9BAFBE]">
                    <span>Port & Berth Dues:</span>
                    <strong className="text-[#F2F6F8]">${item.portDues.toFixed(2)} / MT</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#20384C] flex items-baseline justify-between font-mono">
                  <span className="text-xs uppercase text-[#9BAFBE]">Total Cost</span>
                  <div className="text-right">
                    <strong className={`text-[22px] font-bold ${item.recommended ? 'text-[#12A6A6]' : 'text-[#F2F6F8]'}`}>
                      ${item.total.toFixed(2)}
                    </strong>
                    <span className="text-xs text-[#9BAFBE]"> / MT</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 16: OPERATIONAL RISK */}
        <div>
          <div className="max-w-3xl mb-12 text-left">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
              EARLY WARNING MATRIX
            </div>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
              SEE THE RISK
              <br />
              <span className="text-[#D8891A]">BEFORE THE VOYAGE.</span>
            </h2>
            <p className="mt-4 text-[16px] text-[#9BAFBE] leading-[1.65] font-sans">
              PortIN identifies operational bottlenecks and freight volatility that could alter the economics of your charter before agreements are executed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riskFactors.map((rf) => (
              <div
                key={rf.title}
                className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#20384C]">
                    <h3 className="font-bold text-[16px] text-[#F2F6F8] font-sans">{rf.title}</h3>
                    {/* Explicit textual label + standardized risk color */}
                    <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold border ${rf.colorBg} ${rf.colorBorder} ${rf.colorText}`}>
                      {rf.level} RISK
                    </span>
                  </div>

                  <p className="text-[13.5px] text-[#9BAFBE] leading-relaxed mb-4">
                    {rf.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#20384C] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9BAFBE]">CURRENT TELEMETRY</span>
                  <strong className={rf.colorText}>{rf.metric}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
