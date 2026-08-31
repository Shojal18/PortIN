import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { Calendar } from 'lucide-react';
import { ForecastDataPoint, CorridorMarketTicker } from '../../types';

interface AdvancedTradingChartProps {
  data: ForecastDataPoint[];
  corridor?: CorridorMarketTicker;
  currentSpotRate?: number;
  optimalStartDate?: string;
  optimalEndDate?: string;
  optimalRate?: number;
  onOpenTradeModal?: () => void;
}

export const AdvancedTradingChart: React.FC<AdvancedTradingChartProps> = ({
  data,
  corridor,
  currentSpotRate = 19.72,
  optimalStartDate = '2026-10-12',
  optimalEndDate = '2026-10-26',
  optimalRate = 18.40,
  onOpenTradeModal
}) => {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | 'ALL'>('3M');
  const [showConfidenceBands, setShowConfidenceBands] = useState<boolean>(true);

  const getFilteredData = () => {
    if (!data || data.length === 0) return [];
    switch (timeframe) {
      case '1M':
        return data.slice(0, 30);
      case '3M':
        return data.slice(0, 90);
      case 'ALL':
      default:
        return data;
    }
  };

  const filteredData = getFilteredData();

  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pt = payload[0].payload;
      return (
        <div className="bg-[#071522] p-3 rounded-[6px] border border-[#20384C] shadow-xl text-xs space-y-1.5 min-w-[200px] font-sans">
          <p className="font-bold text-white border-b border-[#183A52] pb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#12A6A6]" />
            <span className="font-mono text-[12px]">{label}</span>
          </p>
          <div className="flex justify-between items-center text-slate-300">
            <span>Forecast Rate:</span>
            <span className="font-bold text-[#12A6A6] font-mono text-[13px]">${pt.predictedRate?.toFixed(2)} / MT</span>
          </div>
          {pt.lowerBound && (
            <div className="flex justify-between items-center text-slate-400 text-[11.5px] font-mono">
              <span>95% CI:</span>
              <span className="text-slate-300">${pt.lowerBound?.toFixed(2)} – ${pt.upperBound?.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-slate-400 text-[11.5px] pt-1.5 border-t border-[#183A52] font-mono">
            <span>Spot Baseline:</span>
            <span className="text-slate-300">${currentSpotRate.toFixed(2)} / MT</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="advanced-trading-chart-container"
      className="bg-[#0D1B2A] border border-[#20384C] rounded-[8px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm font-sans"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#183A52] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-[15px] font-bold text-white uppercase tracking-wider">
              {corridor?.route || 'Hay Point (AU) → Paradip Port (IN)'}
            </h3>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#102A43] text-[#12A6A6] border border-[#183A52]">
              {corridor?.primaryVessel || 'Supramax'}
            </span>
          </div>
          <p className="text-[12px] text-slate-400 mt-1 font-mono">
            Forward freight curve projection • USD / Metric Ton
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#071522] p-1 rounded-[6px] border border-[#183A52] gap-1 text-[12px]">
            {(['1M', '3M', 'ALL'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-[4px] font-mono font-bold transition cursor-pointer ${
                  timeframe === tf ? 'bg-[#102337] text-[#12A6A6] shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowConfidenceBands(!showConfidenceBands)}
            className={`px-3 py-1 rounded-[6px] border text-[12px] font-mono font-bold transition cursor-pointer ${
              showConfidenceBands ? 'bg-[#102A43] border-[#12A6A6] text-[#12A6A6]' : 'border-[#183A52] bg-[#071522] text-slate-400'
            }`}
          >
            95% CI
          </button>

          {onOpenTradeModal && (
            <button
              onClick={onOpenTradeModal}
              className="px-4 py-1.5 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white text-[12.5px] font-bold transition cursor-pointer uppercase tracking-wider"
            >
              Fix Charter Window
            </button>
          )}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[340px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#183A52" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#183A52' }}
              tickFormatter={(str) => {
                const d = new Date(str);
                return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={{ stroke: '#183A52' }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomChartTooltip />} />

            {/* Optimal Window Highlight */}
            {optimalStartDate && optimalEndDate && (
              React.createElement(ReferenceArea as any, {
                x1: optimalStartDate,
                x2: optimalEndDate,
                fill: '#12A6A6',
                fillOpacity: 0.12,
                stroke: '#12A6A6',
                strokeDasharray: '3 3',
                label: {
                  value: 'Optimal Laycan Window',
                  position: 'insideTop',
                  fill: '#12A6A6',
                  fontSize: 10,
                  fontWeight: 'bold'
                }
              })
            )}

            {/* Spot Baseline */}
            <ReferenceLine
              y={currentSpotRate}
              stroke="#E0A33A"
              strokeDasharray="4 4"
              label={{ value: `Spot: $${currentSpotRate.toFixed(2)}`, fill: '#E0A33A', fontSize: 11, position: 'right' }}
            />

            {/* Confidence Interval Upper/Lower */}
            {showConfidenceBands && (
              <>
                <Line
                  type="monotone"
                  dataKey="upperBound"
                  stroke="#334E68"
                  strokeDasharray="3 3"
                  dot={false}
                  strokeWidth={1}
                />
                <Line
                  type="monotone"
                  dataKey="lowerBound"
                  stroke="#334E68"
                  strokeDasharray="3 3"
                  dot={false}
                  strokeWidth={1}
                />
              </>
            )}

            {/* Main Forecast Rate Line */}
            <Area
              type="monotone"
              dataKey="predictedRate"
              stroke="#12A6A6"
              fill="#12A6A6"
              fillOpacity={0.08}
              strokeWidth={2.5}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#183A52] text-[12.5px] text-slate-400 font-mono">
        <div>
          <span>Live Spot Index: </span>
          <strong className="text-white">${currentSpotRate.toFixed(2)}/MT</strong>
        </div>
        <div>
          <span>Optimal Strike Rate: </span>
          <strong className="text-[#12A6A6]">${optimalRate.toFixed(2)}/MT</strong>
        </div>
        <div>
          <span>Target Laycan: </span>
          <strong className="text-white">{optimalStartDate} → {optimalEndDate}</strong>
        </div>
      </div>
    </div>
  );
};
