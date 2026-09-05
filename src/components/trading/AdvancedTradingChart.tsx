import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
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
        <div className="bg-white p-3 rounded-[4px] border border-[#D0D0D0] shadow-sm text-xs space-y-1.5 min-w-[190px] font-sans">
          <p className="font-semibold text-black border-b border-gray-200 pb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span className="font-mono text-[11.5px]">{label}</span>
          </p>
          <div className="flex justify-between items-center text-gray-900 font-mono">
            <span className="font-sans text-gray-600">Forecast Rate:</span>
            <span className="font-bold text-[#2E7D32] text-[12.5px]">${pt.predictedRate?.toFixed(2)} <span className="text-gray-500 font-normal font-sans text-xs">/ MT</span></span>
          </div>
          {pt.lowerBound && (
            <div className="flex justify-between items-center text-gray-600 text-[11px] font-mono">
              <span className="font-sans text-gray-500">95% CI:</span>
              <span><span className="text-[#2E7D32]">${pt.lowerBound?.toFixed(2)}</span> – <span className="text-[#2E7D32]">${pt.upperBound?.toFixed(2)}</span></span>
            </div>
          )}
          <div className="flex justify-between items-center text-gray-600 text-[11px] pt-1 border-t border-gray-200 font-mono">
            <span className="font-sans text-gray-500">Spot Baseline:</span>
            <span><span className="text-[#2E7D32]">${currentSpotRate.toFixed(2)}</span> / MT</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="advanced-trading-chart-container"
      className="bg-white border border-[#D0D0D0] rounded-[6px] p-4 sm:p-5 flex flex-col gap-3 font-sans"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D0D0D0] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] font-semibold text-black uppercase tracking-wider">
              {corridor?.route || 'Hay Point (AU) → Paradip Port (IN)'}
            </h3>
            <span className="text-[10.5px] font-mono font-medium px-1.5 py-0.2 rounded-[2px] bg-[#F3F4F6] text-gray-800 border border-[#D0D0D0]">
              {corridor?.primaryVessel || 'Supramax'}
            </span>
          </div>
          <p className="text-[11.5px] text-gray-500 mt-0.5 font-mono">
            Forward freight curve projection • USD / Metric Ton
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1 text-[11.5px]">
            {(['1M', '3M', 'ALL'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-[4px] font-mono font-medium transition cursor-pointer ${
                  timeframe === tf
                    ? 'bg-black text-white'
                    : 'bg-white border border-[#D0D0D0] text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowConfidenceBands(!showConfidenceBands)}
            className={`px-2.5 py-1 rounded-[4px] border text-[11.5px] font-mono font-medium transition cursor-pointer ${
              showConfidenceBands ? 'bg-black text-white border-black' : 'border-[#D0D0D0] bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            95% CI
          </button>

          {onOpenTradeModal && (
            <button
              onClick={onOpenTradeModal}
              className="px-3 py-1 rounded-[4px] bg-black hover:bg-[#262626] text-white text-[12px] font-medium transition cursor-pointer"
            >
              Fix Charter Window
            </button>
          )}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[300px] w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#D0D0D0' }}
              tick={{ fill: '#4B5563' }}
              tickFormatter={(str) => {
                const d = new Date(str);
                return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={11}
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={{ stroke: '#D0D0D0' }}
              tick={{ fill: '#4B5563', fontFamily: 'IBM Plex Mono' }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomChartTooltip />} />

            {/* Optimal Window Highlight */}
            {optimalStartDate && optimalEndDate && (
              React.createElement(ReferenceArea as any, {
                x1: optimalStartDate,
                x2: optimalEndDate,
                fill: '#E5E7EB',
                fillOpacity: 0.6,
                stroke: '#9CA3AF',
                strokeDasharray: '3 3',
                label: {
                  value: 'Optimal Laycan Window',
                  position: 'insideTop',
                  fill: '#111827',
                  fontSize: 10,
                  fontWeight: 600
                }
              })
            )}

            {/* Spot Baseline */}
            <ReferenceLine
              y={currentSpotRate}
              stroke="#6B7280"
              strokeDasharray="4 4"
              label={{ value: `Spot: $${currentSpotRate.toFixed(2)}`, fill: '#4B5563', fontSize: 10.5, position: 'right' }}
            />

            {/* Confidence Interval Upper/Lower */}
            {showConfidenceBands && (
              <>
                <Line
                  type="monotone"
                  dataKey="upperBound"
                  stroke="#9CA3AF"
                  strokeDasharray="3 3"
                  dot={false}
                  strokeWidth={1}
                />
                <Line
                  type="monotone"
                  dataKey="lowerBound"
                  stroke="#9CA3AF"
                  strokeDasharray="3 3"
                  dot={false}
                  strokeWidth={1}
                />
              </>
            )}

            {/* Main Forecast Rate Line: Solid Black */}
            <Line
              type="monotone"
              dataKey="predictedRate"
              stroke="#000000"
              strokeWidth={2}
              dot={{ r: 2, fill: '#000000' }}
              activeDot={{ r: 4, fill: '#000000', stroke: '#FFFFFF', strokeWidth: 1.5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-[#D0D0D0] text-[12px] text-gray-600 font-mono">
        <div>
          <span className="font-sans">Live Spot Index: </span>
          <strong className="text-[#2E7D32]">${currentSpotRate.toFixed(2)}<span className="text-gray-500 font-normal font-sans">/MT</span></strong>
        </div>
        <div>
          <span className="font-sans">Optimal Strike: </span>
          <strong className="text-[#2E7D32] font-bold">${optimalRate.toFixed(2)}<span className="text-gray-500 font-normal font-sans">/MT</span></strong>
        </div>
        <div>
          <span className="font-sans">Target Laycan: </span>
          <strong className="text-black">{optimalStartDate} → {optimalEndDate}</strong>
        </div>
      </div>
    </div>
  );
};
