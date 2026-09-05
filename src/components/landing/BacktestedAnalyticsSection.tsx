import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface BacktestedAnalyticsSectionProps {
  onEnterApp: () => void;
  onOpenDemo: () => void;
}

export const BacktestedAnalyticsSection: React.FC<BacktestedAnalyticsSectionProps> = ({
  onEnterApp,
  onOpenDemo
}) => {
  const [selectedCommodity, setSelectedCommodity] = useState<string>('coking-coal');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const commodities = [
    { id: 'coking-coal', name: 'Coking / Met Coal', corridor: 'Australia ➔ Paradip', baseRate: 19.70, accuracy: '99.4%' },
    { id: 'thermal-coal', name: 'Thermal Steam Coal', corridor: 'Indonesia ➔ Vizag', baseRate: 11.20, accuracy: '98.8%' },
    { id: 'iron-ore', name: 'Iron Ore Fines / Pellets', corridor: 'Odisha ➔ China / Coastal', baseRate: 14.50, accuracy: '99.1%' },
    { id: 'fertilizer', name: 'Fertilizer & Phosphate', corridor: 'Black Sea ➔ Haldia', baseRate: 34.50, accuracy: '98.5%' },
    { id: 'limestone', name: 'Limestone & Dolomite', corridor: 'UAE (Fujairah) ➔ Dhamra', baseRate: 12.80, accuracy: '99.2%' }
  ];

  // Grade Pills
  const grades = [
    'Prime Hard Coking Coal',
    'Mid-Vol Coking Coal',
    'PCI Coal',
    'Thermal 5500 GAR',
    'Thermal 4200 GAR',
    '62% Fe Iron Ore Fines',
    'Iron Ore Pellets',
    'Rock Phosphate',
    'DAP / NPK Complex',
    'Metallurgical Limestone',
    'Dolomite Flux',
    'Manganese Ore',
    'Bauxite (Smelter Grade)',
    'Gypsum',
    'Cement Clinker'
  ];

  // Backtest series points (Actual vs PortIN Predicted)
  const backtestData = [
    { date: 'Jan 24', actual: 16.2, predicted: 16.0, error: '-1.2%' },
    { date: 'Apr 24', actual: 18.5, predicted: 18.3, error: '-1.0%' },
    { date: 'Jul 24', actual: 21.4, predicted: 21.1, error: '-1.4%' },
    { date: 'Oct 24', actual: 19.8, predicted: 19.9, error: '+0.5%' },
    { date: 'Jan 25', actual: 17.5, predicted: 17.6, error: '+0.5%' },
    { date: 'Apr 25', actual: 19.2, predicted: 19.0, error: '-1.0%' },
    { date: 'Jul 25', actual: 23.0, predicted: 22.7, error: '-1.3%' },
    { date: 'Oct 25', actual: 20.4, predicted: 20.2, error: '-0.9%' },
    { date: 'Jan 26', actual: 18.8, predicted: 18.9, error: '+0.5%' },
    { date: 'Current', actual: 19.7, predicted: 18.4, error: '-6.6% (Forward Target)' }
  ];

  const currentCommodityObj = commodities.find((c) => c.id === selectedCommodity) || commodities[0];

  return (
    <section id="backtest-analytics" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono uppercase tracking-widest text-[#20B26B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#20B26B]" />
              RIGOROUS MODEL VERIFICATION
            </div>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold text-[#F2F6F8] tracking-tight uppercase leading-tight font-sans">
              DATA YOU CAN TRUST —
              <br />
              <span className="text-[#E05252]">THOROUGHLY BACKTESTED.</span>
            </h2>
            <p className="text-[15px] text-[#9BAFBE] leading-relaxed font-sans">
              Our SARIMA time-series models are rigorously evaluated against over 7+ years of historical East Coast spot fixtures, weather disruption patterns, and bunker price swings.
            </p>
          </div>

          {/* Live Accuracy Badge */}
          <div className="p-4 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] flex items-center gap-4 shadow-lg min-w-[260px]">
            <div className="w-12 h-12 rounded-full bg-[#20B26B]/15 text-[#20B26B] border border-[#20B26B]/30 flex items-center justify-center">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#9BAFBE] uppercase block">
                Directional Accuracy
              </span>
              <div className="flex items-baseline gap-1.5">
                <strong className="text-2xl font-bold font-mono text-[#20B26B]">
                  {currentCommodityObj.accuracy}
                </strong>
                <span className="text-[10.5px] font-mono text-[#9BAFBE]">last 12 mos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Backtest Interactive Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Commodity / Route Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold text-[#9BAFBE] uppercase pb-2 flex items-center justify-between">
              <span>SELECT BULK CORRIDOR</span>
              <span>HISTORICAL ACCURACY</span>
            </div>

            {commodities.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCommodity(item.id)}
                className={`w-full text-left p-4 rounded-[8px] border transition-all flex items-center justify-between cursor-pointer ${
                  selectedCommodity === item.id
                    ? 'bg-[#0D1B2A] border-[#E05252] shadow-xl text-white'
                    : 'bg-[#071522] border-[#20384C] text-[#9BAFBE] hover:text-white hover:bg-[#0B1F33]'
                }`}
              >
                <div>
                  <strong className="block text-sm font-sans font-bold">{item.name}</strong>
                  <span className="text-xs text-[#9BAFBE] font-mono">{item.corridor}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#20B26B] block">
                    {item.accuracy}
                  </span>
                  <span className="text-[10px] font-mono text-[#9BAFBE]">
                    ~${item.baseRate}/MT
                  </span>
                </div>
              </button>
            ))}

            <div className="pt-4">
              <button
                onClick={onOpenDemo}
                className="w-full py-3.5 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>ENQUIRE FOR MORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Backtested Curve (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-[10px] bg-[#0D1B2A] border border-[#20384C] shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              {/* Header inside chart */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#20384C] gap-2">
                <div>
                  <span className="text-[11px] font-mono text-[#12A6A6] font-bold uppercase tracking-wider">
                    TIME-SERIES BACKTEST: {currentCommodityObj.name.toUpperCase()}
                  </span>
                  <h3 className="text-lg font-bold text-white font-sans">
                    Actual Spot Fixture vs. PortIN Predicted Model
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#9BAFBE]" />
                    <span className="text-[#9BAFBE]">Actual Spot ($/MT)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#E05252]" />
                    <span className="text-[#E05252] font-bold">PortIN Model</span>
                  </div>
                </div>
              </div>

              {/* Chart Visualizer */}
              <div className="my-6 relative">
                {/* SVG Line Chart */}
                <div className="h-64 sm:h-72 w-full relative flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 240" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="forecastGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E05252" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#E05252" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="700" y2="40" stroke="#20384C" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="700" y2="100" stroke="#20384C" strokeDasharray="3 3" />
                    <line x1="0" y1="160" x2="700" y2="160" stroke="#20384C" strokeDasharray="3 3" />
                    <line x1="0" y1="220" x2="700" y2="220" stroke="#20384C" />

                    {/* Area under curve */}
                    <polygon
                      points="0,170 77,135 155,90 233,115 311,150 388,125 466,70 544,110 622,130 700,140 700,240 0,240"
                      fill="url(#forecastGlow)"
                    />

                    {/* Actual Spot Line (Slate) */}
                    <polyline
                      fill="none"
                      stroke="#9BAFBE"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      points="0,168 77,132 155,88 233,116 311,152 388,122 466,68 544,108 622,132 700,120"
                    />

                    {/* PortIN Predicted Line (Red / Scarlet) */}
                    <polyline
                      fill="none"
                      stroke="#E05252"
                      strokeWidth="3.5"
                      points="0,170 77,135 155,90 233,115 311,150 388,125 466,70 544,110 622,130 700,140"
                    />

                    {/* Data Points */}
                    {backtestData.map((d, i) => {
                      const x = (i / (backtestData.length - 1)) * 700;
                      // mapped Y for predicted
                      const y = 240 - ((d.predicted - 14) / 12) * 200;
                      return (
                        <g key={d.date} className="cursor-pointer">
                          <circle
                            cx={x}
                            cy={y}
                            r={hoveredPointIndex === i ? 6 : 4}
                            className="fill-[#071522] stroke-[#E05252] stroke-2 transition-all hover:r-6 hover:fill-[#E05252]"
                            onMouseEnter={() => setHoveredPointIndex(i)}
                            onMouseLeave={() => setHoveredPointIndex(null)}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* X Axis Labels */}
                <div className="flex justify-between text-[11px] font-mono text-[#9BAFBE] pt-3 border-t border-[#20384C]">
                  {backtestData.map((d, i) => (
                    <span
                      key={d.date}
                      className={hoveredPointIndex === i ? 'text-[#E05252] font-bold' : ''}
                    >
                      {d.date}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hovered / Active Point Inspector */}
            <div className="p-3.5 rounded-[6px] bg-[#071522] border border-[#20384C] flex flex-wrap items-center justify-between text-xs font-mono gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E05252]" />
                <span className="text-[#9BAFBE]">Inspection Point:</span>
                <strong className="text-white">
                  {hoveredPointIndex !== null
                    ? `${backtestData[hoveredPointIndex].date} (${backtestData[hoveredPointIndex].error} error)`
                    : 'Current Spot vs. Optimal Target Window'}
                </strong>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span>
                  Predicted: <strong className="text-[#E05252]">${hoveredPointIndex !== null ? backtestData[hoveredPointIndex].predicted.toFixed(2) : '18.40'}/MT</strong>
                </span>
                <span>
                  Actual: <strong className="text-white">${hoveredPointIndex !== null ? backtestData[hoveredPointIndex].actual.toFixed(2) : '19.72'}/MT</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: MAJOR & MINOR BULK MARKETS — DETAILS DOWN TO THE GRADE */}
        <div className="p-8 rounded-[10px] bg-[#0D1B2A] border border-[#20384C] space-y-6 text-center">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E05252]">
              GRANULAR COMMODITY MODELING
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-sans uppercase text-white tracking-tight">
              MAJOR & MINOR DRY BULK MARKETS — DETAILS DOWN TO THE GRADE
            </h3>
            <p className="text-xs sm:text-sm text-[#9BAFBE] font-sans">
              Track 4,300+ dry bulk voyages across coal, ores, grains, and industrial fluxes, with granularity down to stowage factors and moisture limits.
            </p>
          </div>

          {/* Interactive Grade Chips Cloud */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {grades.map((grade) => (
              <span
                key={grade}
                className="px-3.5 py-1.5 rounded-[20px] bg-[#071522] hover:bg-[#102337] border border-[#20384C] hover:border-[#E05252] text-xs font-mono text-[#F2F6F8] transition-all cursor-pointer shadow-sm hover:scale-105"
              >
                {grade}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
