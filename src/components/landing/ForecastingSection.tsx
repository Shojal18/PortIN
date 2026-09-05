import React, { useState } from 'react';
import {
  TrendingDown,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ForecastingSectionProps {
  onEnterApp: () => void;
}

export const ForecastingSection: React.FC<ForecastingSectionProps> = ({ onEnterApp }) => {
  const [horizon, setHorizon] = useState<'30D' | '60D' | '90D'>('90D');

  // Chart data simulation across horizons
  const chartPoints30 = [
    { day: 'Day 1', spot: 19.72, forecast: 19.72, upper: 20.30, lower: 19.14, inWindow: false },
    { day: 'Day 5', spot: 19.72, forecast: 19.45, upper: 20.25, lower: 18.65, inWindow: false },
    { day: 'Day 10', spot: 19.72, forecast: 19.10, upper: 20.10, lower: 18.10, inWindow: false },
    { day: 'Day 15', spot: 19.72, forecast: 18.55, upper: 19.60, lower: 17.50, inWindow: true },
    { day: 'Day 20', spot: 19.72, forecast: 18.40, upper: 19.45, lower: 17.35, inWindow: true },
    { day: 'Day 25', spot: 19.72, forecast: 18.60, upper: 19.80, lower: 17.40, inWindow: true },
    { day: 'Day 30', spot: 19.72, forecast: 19.15, upper: 20.45, lower: 17.85, inWindow: false },
  ];

  const chartPoints60 = [
    ...chartPoints30,
    { day: 'Day 40', spot: 19.72, forecast: 20.40, upper: 22.10, lower: 18.70, inWindow: false },
    { day: 'Day 50', spot: 19.72, forecast: 21.80, upper: 23.90, lower: 19.70, inWindow: false },
    { day: 'Day 60', spot: 19.72, forecast: 23.20, upper: 25.60, lower: 20.80, inWindow: false },
  ];

  const chartPoints90 = [
    ...chartPoints60,
    { day: 'Day 75', spot: 19.72, forecast: 25.40, upper: 28.20, lower: 22.60, inWindow: false },
    { day: 'Day 90', spot: 19.72, forecast: 27.80, upper: 31.00, lower: 24.60, inWindow: false },
  ];

  const currentPoints =
    horizon === '30D'
      ? chartPoints30
      : horizon === '60D'
      ? chartPoints60
      : chartPoints90;

  return (
    <section id="forecasting" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 11: Freight Forecasting */}
        <div className="mb-12 text-left">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
            ECONOMETRIC TIME-SERIES MODELLING
          </div>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
            SEE WHERE THE FREIGHT MARKET
            <br />
            <span className="text-[#12A6A6]">COULD BE HEADING.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#9BAFBE] leading-[1.65] max-w-3xl font-sans">
            PortIN analyzes historical route and vessel-class data to generate a forward freight-rate outlook, incorporating fuel indices, monsoon seasonality, and deadweight supply trends.
          </p>
        </div>

        {/* Interactive Chart Container */}
        <div className="p-5 sm:p-7 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] shadow-xl">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#20384C]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase text-[#12A6A6] bg-[#12A6A6]/10 px-2 py-0.5 rounded border border-[#12A6A6]/30">
                  CORRIDOR BENCHMARK
                </span>
                <span className="text-[14px] font-bold text-[#F2F6F8] font-mono">
                  AUSTRALIA (HAY POINT) ➔ PARADIP PORT
                </span>
              </div>
              <p className="text-[12px] text-[#9BAFBE] font-mono mt-1">
                Dry Bulk • Panamax / Supramax • 120,000 MT Coking Coal
              </p>
            </div>

            {/* Time Horizon Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-[6px] bg-[#071522] border border-[#20384C]">
              {(['30D', '60D', '90D'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizon(h)}
                  className={`px-3 py-1 text-xs font-mono font-semibold rounded-[4px] transition cursor-pointer ${
                    horizon === h
                      ? 'bg-[#12A6A6] text-white'
                      : 'text-[#9BAFBE] hover:text-white'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-[#20384C] font-mono">
            <div>
              <span className="text-[10.5px] text-[#9BAFBE] uppercase block">Current Spot Rate</span>
              <strong className="text-[18px] text-[#F2F6F8] block mt-0.5">$19.72 <span className="text-xs font-normal text-[#9BAFBE]">/ MT</span></strong>
            </div>

            <div>
              <span className="text-[10.5px] text-[#12A6A6] uppercase block font-semibold">Forecast Range</span>
              <strong className="text-[18px] text-[#12A6A6] block mt-0.5">$18.40 – $27.80 <span className="text-xs font-normal text-[#9BAFBE]">/ MT</span></strong>
            </div>

            <div>
              <span className="text-[10.5px] text-[#9BAFBE] uppercase block">90-Day Average</span>
              <strong className="text-[18px] text-[#F2F6F8] block mt-0.5">$21.35 <span className="text-xs font-normal text-[#9BAFBE]">/ MT</span></strong>
            </div>

            <div>
              <span className="text-[10.5px] text-[#20B26B] uppercase block font-semibold">Model Confidence</span>
              <strong className="text-[18px] text-[#20B26B] block mt-0.5">95% Band <span className="text-xs font-normal text-[#9BAFBE]">SARIMA</span></strong>
            </div>
          </div>

          {/* SVG Chart Graphic */}
          <div className="pt-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#9BAFBE] mb-2">
              <span>Freight Rate ($/MT)</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#E05252] border-dashed" /> Current Spot Ref ($19.72)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#12A6A6]" /> Forward Forecast Line
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-2 bg-[#12A6A6]/20 rounded-xs" /> 95% Confidence Band
                </span>
              </div>
            </div>

            {/* Custom SVG Curve Visualization */}
            <div className="h-64 sm:h-72 w-full relative bg-[#071522] rounded-[6px] border border-[#20384C] p-4 flex flex-col justify-between">
              {/* Y-Axis Guidelines */}
              <div className="absolute inset-x-4 top-8 border-b border-[#20384C]/40 flex justify-between text-[10px] font-mono text-[#9BAFBE]">
                <span>$30.00</span>
              </div>
              <div className="absolute inset-x-4 top-24 border-b border-[#20384C]/40 flex justify-between text-[10px] font-mono text-[#9BAFBE]">
                <span>$24.00</span>
              </div>
              <div className="absolute inset-x-4 top-40 border-b border-[#20384C]/40 flex justify-between text-[10px] font-mono text-[#9BAFBE]">
                <span>$18.00</span>
              </div>

              {/* Spot Reference Line */}
              <div className="absolute inset-x-4 top-36 border-b border-dashed border-[#E05252]/80 z-0">
                <span className="absolute right-0 -top-4 text-[10px] font-mono text-[#E05252] bg-[#071522] px-1">
                  Spot: $19.72
                </span>
              </div>

              {/* Highlighted Window Area Box */}
              <div className="absolute top-8 bottom-6 left-[28%] w-[22%] bg-[#20B26B]/10 border-x border-[#20B26B]/40 z-0 flex items-start justify-center pt-2">
                <span className="text-[10px] font-mono font-bold text-[#20B26B] bg-[#071522] px-1.5 py-0.5 rounded border border-[#20B26B]/40">
                  OPTIMAL WINDOW: OCT 12–26
                </span>
              </div>

              {/* Responsive SVG Polyline */}
              <svg className="w-full h-full relative z-10 overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 200">
                {/* 95% Confidence Area Polygon */}
                <polygon
                  points="0,110 70,115 140,125 210,135 280,130 350,80 430,40 500,20 500,80 430,105 350,140 280,165 210,175 140,165 70,145 0,130"
                  fill="#12A6A6"
                  fillOpacity="0.12"
                />

                {/* Lower Band Line */}
                <path
                  d="M0,130 Q70,145 140,165 T280,165 T350,140 T430,105 T500,80"
                  fill="none"
                  stroke="#12A6A6"
                  strokeOpacity="0.3"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Upper Band Line */}
                <path
                  d="M0,110 Q70,115 140,125 T280,130 T350,80 T430,40 T500,20"
                  fill="none"
                  stroke="#12A6A6"
                  strokeOpacity="0.3"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Main Forecast Trajectory Curve */}
                <path
                  d="M0,120 Q70,130 140,150 T280,152 T350,105 T430,65 T500,45"
                  fill="none"
                  stroke="#12A6A6"
                  strokeWidth="3.5"
                />

                {/* Optimal Low Point Marker */}
                <circle cx="210" cy="155" r="5" fill="#20B26B" stroke="#071522" strokeWidth="2" />
              </svg>

              {/* X-Axis Labels */}
              <div className="flex justify-between text-[11px] font-mono text-[#9BAFBE] pt-2 border-t border-[#20384C]">
                <span>Day 0 (Now)</span>
                <span>Day 15 (Oct 12)</span>
                <span>Day 30 (Oct 26)</span>
                <span>Day 60 (Nov 25)</span>
                <span>Day 90 (Dec 25)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 12: Optimal Charter Window Focus Card */}
        <div className="mt-10 p-6 sm:p-8 rounded-[8px] bg-[#0B1F33] border border-[#12A6A6] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3 text-left">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6]">
                OPPORTUNITY IDENTIFIER
              </div>
              <h3 className="text-[24px] sm:text-[30px] font-bold text-[#F2F6F8] tracking-tight uppercase font-sans">
                DON'T JUST FORECAST THE RATE.
                <br />
                <span className="text-[#20B26B]">FIND THE WINDOW.</span>
              </h3>
              <p className="text-[14.5px] text-[#9BAFBE] leading-[1.6]">
                PortIN searches the forecast horizon for a favorable contiguous charter-entry window based on the requested contract duration and loading schedule.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Current Spot</span>
                  <strong className="text-[15px] text-[#F2F6F8]">$19.72 / MT</strong>
                </div>
                <div className="p-3 rounded bg-[#071522] border border-[#20B26B]/50">
                  <span className="text-[10px] text-[#20B26B] uppercase block">Lowest Forecast</span>
                  <strong className="text-[15px] text-[#20B26B]">$18.40 / MT</strong>
                </div>
                <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Recommended Window</span>
                  <strong className="text-[14px] text-[#F2F6F8]">OCT 12–26</strong>
                </div>
                <div className="p-3 rounded bg-[#071522] border border-[#12A6A6]/50">
                  <span className="text-[10px] text-[#12A6A6] uppercase block">Potential Savings</span>
                  <strong className="text-[15px] text-[#12A6A6]">6.8% ($158.4k)</strong>
                </div>
              </div>

              <button
                id="cta-forecast-window-btn"
                onClick={onEnterApp}
                className="w-full py-3 rounded-[6px] bg-[#087F8C] hover:bg-[#12A6A6] text-white text-[13.5px] font-bold tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>CREATE A FORECAST</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
