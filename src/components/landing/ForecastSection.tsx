import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Calendar,
  ArrowUpRight,
  Info,
  CheckCircle2
} from 'lucide-react';

export const ForecastSection: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState<'30D' | '60D' | '90D'>('90D');

  return (
    <section id="forecast-section" className="py-20 lg:py-28 bg-white border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">
            Predictive Liquidity Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Know what&apos;s coming next.
          </h2>
          <p className="text-base text-gray-500 font-normal leading-relaxed">
            Eliminate cash-flow blind spots with probabilistic time-series forecasting across dry bulk freight cycles, bunker spreads, and port tariffs.
          </p>
        </div>

        {/* Forecasting Workspace Container */}
        <div className="mt-14 max-w-4xl mx-auto bg-[#FAFAFA] rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8 space-y-8 text-left">
          
          {/* 4 Financial Balances Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[11px] font-mono uppercase text-gray-500 block">
                Current Treasury Cash
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#2E7D32] mt-1">
                $18,420,000
              </div>
              <span className="text-[10.5px] text-gray-400 font-mono mt-0.5 block">
                Liquid across 4 vaults
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[11px] font-mono uppercase text-gray-500 block">
                Expected Inflows
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#2E7D32] mt-1">
                +$6,840,000
              </div>
              <span className="text-[10.5px] text-emerald-600 font-mono mt-0.5 block">
                14 confirmed BLs
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[11px] font-mono uppercase text-gray-500 block">
                Expected Outflows
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-gray-800 mt-1">
                -$4,210,000
              </div>
              <span className="text-[10.5px] text-gray-500 font-mono mt-0.5 block">
                Bunker + Port Dues
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs bg-emerald-50/30">
              <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold block">
                Projected Net Position
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#2E7D32] mt-1">
                $21,050,000
              </div>
              <span className="text-[10.5px] text-emerald-700 font-mono mt-0.5 font-medium block">
                +$2.63M Net Delta
              </span>
            </div>

          </div>

          {/* Time Series Chart with Confidence Area & Markers */}
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-gray-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  Probabilistic Forward Rate & Liquidity Projection
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 font-mono">
                    95% CI
                  </span>
                </h4>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  Historical Actuals (Q1-Q2) → Forward SARIMA Forecast (Q3-Q4)
                </p>
              </div>

              {/* Horizon Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-xs font-mono">
                {(['30D', '60D', '90D'] as const).map((h) => (
                  <button
                    key={h}
                    onClick={() => setSelectedHorizon(h)}
                    className={`px-2.5 py-1 rounded-md transition ${
                      selectedHorizon === h
                        ? 'bg-neutral-900 text-white font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual SVG Chart */}
            <div className="relative h-48 w-full bg-[#FAFAFA] rounded-xl border border-gray-100 p-3 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 700 160" preserveAspectRatio="none">
                <defs>
                  {/* Confidence Interval Gradient */}
                  <linearGradient id="ci-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="0" y1="40" x2="700" y2="40" stroke="#E5E7EB" strokeDasharray="3,3" />
                <line x1="0" y1="80" x2="700" y2="80" stroke="#E5E7EB" strokeDasharray="3,3" />
                <line x1="0" y1="120" x2="700" y2="120" stroke="#E5E7EB" strokeDasharray="3,3" />

                {/* Vertical Divider for Forecast Boundary */}
                <line x1="320" y1="0" x2="320" y2="160" stroke="#9CA3AF" strokeDasharray="4,4" strokeWidth="1.5" />

                {/* 95% Confidence Interval Area (from x=320 to 700) */}
                <path
                  d="M 320 70 Q 420 50 510 38 T 700 30 L 700 115 Q 510 110 420 95 T 320 70 Z"
                  fill="url(#ci-gradient)"
                />

                {/* Upper and Lower CI Bound dashed lines */}
                <path
                  d="M 320 70 Q 420 50 510 38 T 700 30"
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
                <path
                  d="M 320 70 Q 420 95 510 110 T 700 115"
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />

                {/* Historical Actual Line (x=0 to 320) */}
                <path
                  d="M 0 110 Q 80 130 160 90 T 320 70"
                  fill="none"
                  stroke="#111827"
                  strokeWidth="2.5"
                />

                {/* Projected Mean Forecast Line (x=320 to 700) */}
                <path
                  d="M 320 70 Q 420 72 510 68 T 700 62"
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                />

                {/* Data Points */}
                <circle cx="320" cy="70" r="4.5" fill="#111827" />
                <circle cx="510" cy="68" r="4.5" fill="#2E7D32" />
                <circle cx="700" cy="62" r="4.5" fill="#2E7D32" />
              </svg>

              {/* In-Chart Labels */}
              <div className="absolute top-3 left-4 text-[10px] font-mono text-gray-500">
                ● Historical Rate Actuals
              </div>
              <div className="absolute top-3 right-4 text-[10px] font-mono text-[#2E7D32] font-semibold">
                ● Mean Forecast Trajectory ($17.80/MT)
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10.5px] font-mono text-gray-400">
                Today (Forecast Horizon Marker)
              </div>
            </div>
          </div>

          {/* Smart Insight Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-gray-900 flex items-center gap-2">
                <span>Projected Cash Position Remains Healthy</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-600 text-white font-mono uppercase">
                  Optimal Laycan Identified
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Our SARIMA model recommends locking in forward dry bulk fixtures between <strong className="text-gray-900">Oct 12 – Nov 04</strong> before monsoon premiums rebound, generating an estimated <strong className="text-[#2E7D32]">+$411,900 USD</strong> in freight savings.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
