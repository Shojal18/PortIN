import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  PieChart
} from 'lucide-react';

export const AnalyticsSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('90D');
  const [activeTooltip, setActiveTooltip] = useState<{ label: string; rev: string; exp: string; net: string } | null>(null);

  const seriesData = [
    { month: 'May', rev: 4.8, exp: 3.4, net: 1.4, revStr: '$4.8M', expStr: '$3.4M', netStr: '$1.4M' },
    { month: 'Jun', rev: 5.6, exp: 3.9, net: 1.7, revStr: '$5.6M', expStr: '$3.9M', netStr: '$1.7M' },
    { month: 'Jul', rev: 6.2, exp: 4.1, net: 2.1, revStr: '$6.2M', expStr: '$4.1M', netStr: '$2.1M' },
    { month: 'Aug', rev: 7.4, exp: 4.6, net: 2.8, revStr: '$7.4M', expStr: '$4.6M', netStr: '$2.8M' },
    { month: 'Sep', rev: 8.1, exp: 4.9, net: 3.2, revStr: '$8.1M', expStr: '$4.9M', netStr: '$3.2M' },
    { month: 'Oct', rev: 9.4, exp: 5.2, net: 4.2, revStr: '$9.4M', expStr: '$5.2M', netStr: '$4.2M' }
  ];

  const categories = [
    { name: 'Ocean Freight & Charter Hire', pct: 44, amount: '$4,136,000', color: 'bg-neutral-900' },
    { name: 'VLSFO & Marine Gas Oil Fuel', pct: 28, amount: '$2,632,000', color: 'bg-emerald-600' },
    { name: 'East Coast Port Dues & Pilotage', pct: 16, amount: '$1,504,000', color: 'bg-blue-600' },
    { name: 'Demurrage & Contingency Reserves', pct: 12, amount: '$1,128,000', color: 'bg-amber-500' }
  ];

  return (
    <section id="analytics-section" className="py-20 lg:py-28 bg-[#F4F5F7] border-b border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Feature Points */}
          <div className="lg:col-span-5 text-left space-y-7">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                Multivariate Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight leading-tight">
                See the full financial picture in real time.
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-normal">
                Drill down into net voyage realization, bunker volatility impact, and multi-entity P&L across all your active charter parties and port calls.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Automated Margin Decomposition
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Isolate operational voyage expenses against base freight revenue down to the dollar per metric tonne.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Live Multi-Currency Conversion
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Real-time FX translation across USD, INR, EUR, SGD, and AED with central bank reference fixing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Executive Board-Ready Reporting
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Export certified 1-click audit packs and GAAP/IFRS-compliant voyage realization statements.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Large Analytics Dashboard Component */}
          <div className="lg:col-span-7 text-left">
            <div className="w-full bg-white rounded-3xl border border-gray-200 shadow-xl p-5 sm:p-7 space-y-6">
              
              {/* Top KPI Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-100">
                <div>
                  <span className="text-[11px] uppercase font-mono text-gray-400 font-medium">
                    Consolidated Gross Inflow
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#2E7D32] tracking-tight mt-0.5">
                    $9,400,000.00
                  </div>
                </div>

                {/* Range Selector */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-xs font-medium text-gray-600">
                  {(['7D', '30D', '90D', '1Y'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setTimeRange(r)}
                      className={`px-2.5 py-1 rounded-md transition ${
                        timeRange === r
                          ? 'bg-white text-gray-900 font-bold shadow-2xs'
                          : 'hover:text-gray-900'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Mini Stat Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10.5px] uppercase font-mono text-gray-500 block">Net Realized</span>
                  <span className="text-[15px] font-bold font-mono text-[#2E7D32] mt-0.5 block">+$4.20M</span>
                  <span className="text-[10px] text-emerald-600 font-mono">+24.5% YoY</span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10.5px] uppercase font-mono text-gray-500 block">Total OpEx</span>
                  <span className="text-[15px] font-bold font-mono text-gray-900 mt-0.5 block">$5.20M</span>
                  <span className="text-[10px] text-gray-500 font-mono">Bunker + Dues</span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10.5px] uppercase font-mono text-gray-500 block">Net Margin</span>
                  <span className="text-[15px] font-bold font-mono text-[#2E7D32] mt-0.5 block">44.68%</span>
                  <span className="text-[10px] text-emerald-600 font-mono">Optimal laycan</span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10.5px] uppercase font-mono text-gray-500 block">Active Fixtures</span>
                  <span className="text-[15px] font-bold font-mono text-gray-900 mt-0.5 block">18</span>
                  <span className="text-[10px] text-gray-500 font-mono">100% tracked</span>
                </div>
              </div>

              {/* Interactive SVG Bar Chart Component */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                  <span>Revenue vs OpEx Breakdown ($ Millions)</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-neutral-900" /> Revenue
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" /> Net Profit
                    </span>
                  </div>
                </div>

                <div className="relative h-44 w-full bg-gray-50 rounded-xl border border-gray-200 p-3 flex items-end justify-between gap-2 sm:gap-4">
                  
                  {/* Horizontal Guideline */}
                  <div className="absolute top-1/3 left-0 right-0 border-t border-dashed border-gray-200 pointer-events-none" />
                  <div className="absolute top-2/3 left-0 right-0 border-t border-dashed border-gray-200 pointer-events-none" />

                  {seriesData.map((item, idx) => {
                    const revHeight = (item.rev / 10) * 100;
                    const netHeight = (item.net / 10) * 100;
                    const isHovered = activeTooltip?.label === item.month;

                    return (
                      <div
                        key={item.month}
                        onMouseEnter={() =>
                          setActiveTooltip({
                            label: item.month,
                            rev: item.revStr,
                            exp: item.expStr,
                            net: item.netStr
                          })
                        }
                        onMouseLeave={() => setActiveTooltip(null)}
                        className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                      >
                        {isHovered && (
                          <div className="absolute -top-12 z-30 bg-neutral-900 text-white rounded-lg p-2 text-[10.5px] font-mono shadow-md whitespace-nowrap">
                            <div>{item.month}: Rev {item.revStr}</div>
                            <div className="text-emerald-400">Net Profit: {item.netStr}</div>
                          </div>
                        )}

                        <div className="w-full flex items-end justify-center gap-1 h-full">
                          {/* Revenue Bar */}
                          <div
                            style={{ height: `${revHeight}%` }}
                            className="w-1/2 max-w-[20px] rounded-t-sm bg-neutral-900 group-hover:bg-neutral-800 transition-all"
                          />
                          {/* Net Profit Bar */}
                          <div
                            style={{ height: `${netHeight}%` }}
                            className="w-1/2 max-w-[20px] rounded-t-sm bg-emerald-500 group-hover:bg-emerald-600 transition-all"
                          />
                        </div>

                        <span className="text-[11px] font-mono text-gray-500 mt-2 font-medium">
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Expense Category Breakdown Progress Bars */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] uppercase font-mono font-semibold text-gray-500 block">
                  Category Cost Attribution
                </span>

                <div className="space-y-2 text-xs">
                  {categories.map((cat) => (
                    <div key={cat.name} className="space-y-1">
                      <div className="flex justify-between items-center text-gray-700">
                        <span className="font-medium text-[12px]">{cat.name}</span>
                        <div className="font-mono text-gray-600">
                          <span className="font-semibold text-gray-900">{cat.pct}%</span>
                          <span className="text-gray-400 ml-1.5">({cat.amount})</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${cat.pct}%` }}
                          className={`h-full rounded-full ${cat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
