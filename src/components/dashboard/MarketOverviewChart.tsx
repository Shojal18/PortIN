import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceArea
} from 'recharts';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface MarketOverviewChartProps {
  onNewForecastClick: () => void;
  onOpenTradingTerminal?: () => void;
  onQuickTrade?: () => void;
}

const CORRIDOR_DATA: Record<
  string,
  {
    name: string;
    origin: string;
    dest: string;
    currentSpot: number;
    avgForecast: number;
    lowest: number;
    highest: number;
    savingsPct: number;
    trajectory: string;
    points: { date: string; spot: number; forecast: number; lower: number; upper: number; range: [number, number] }[];
  }
> = {
  'au-paradip': {
    name: 'Australia (Hay Point) → Paradip Port',
    origin: 'Australia (Hay Point)',
    dest: 'Paradip Port',
    currentSpot: 19.72,
    avgForecast: 21.35,
    lowest: 18.40,
    highest: 24.80,
    savingsPct: 6.8,
    trajectory: 'Seasonal trough (October)',
    points: [
      { date: 'Aug 05', spot: 19.72, forecast: 19.72, lower: 18.90, upper: 20.50, range: [18.90, 20.50] },
      { date: 'Aug 19', spot: 19.65, forecast: 19.45, lower: 18.50, upper: 20.40, range: [18.50, 20.40] },
      { date: 'Sep 02', spot: 19.50, forecast: 19.10, lower: 18.00, upper: 20.20, range: [18.00, 20.20] },
      { date: 'Sep 16', spot: 19.40, forecast: 18.75, lower: 17.50, upper: 20.00, range: [17.50, 20.00] },
      { date: 'Oct 01', spot: 19.30, forecast: 18.45, lower: 17.10, upper: 19.80, range: [17.10, 19.80] },
      { date: 'Oct 15', spot: 19.25, forecast: 18.40, lower: 16.90, upper: 19.90, range: [16.90, 19.90] },
      { date: 'Nov 01', spot: 19.35, forecast: 19.10, lower: 17.40, upper: 20.80, range: [17.40, 20.80] },
      { date: 'Nov 15', spot: 19.50, forecast: 20.25, lower: 18.30, upper: 22.20, range: [18.30, 22.20] },
      { date: 'Dec 01', spot: 19.70, forecast: 21.80, lower: 19.50, upper: 24.10, range: [19.50, 24.10] },
      { date: 'Dec 15', spot: 19.85, forecast: 23.40, lower: 20.80, upper: 26.00, range: [20.80, 26.00] }
    ]
  },
  'id-vizag': {
    name: 'Indonesia (Taboneo) → Visakhapatnam Port',
    origin: 'Indonesia (Taboneo)',
    dest: 'Visakhapatnam Port',
    currentSpot: 11.20,
    avgForecast: 12.10,
    lowest: 10.45,
    highest: 13.50,
    savingsPct: 6.7,
    trajectory: 'Pre-monsoon low (September)',
    points: [
      { date: 'Aug 05', spot: 11.20, forecast: 11.20, lower: 10.60, upper: 11.80, range: [10.60, 11.80] },
      { date: 'Aug 19', spot: 11.15, forecast: 11.00, lower: 10.30, upper: 11.70, range: [10.30, 11.70] },
      { date: 'Sep 02', spot: 11.05, forecast: 10.75, lower: 9.90, upper: 11.60, range: [9.90, 11.60] },
      { date: 'Sep 16', spot: 10.95, forecast: 10.50, lower: 9.60, upper: 11.40, range: [9.60, 11.40] },
      { date: 'Oct 01', spot: 10.90, forecast: 10.45, lower: 9.40, upper: 11.50, range: [9.40, 11.50] },
      { date: 'Oct 15', spot: 10.95, forecast: 10.60, lower: 9.50, upper: 11.70, range: [9.50, 11.70] },
      { date: 'Nov 01', spot: 11.10, forecast: 11.25, lower: 10.00, upper: 12.50, range: [10.00, 12.50] },
      { date: 'Nov 15', spot: 11.30, forecast: 11.90, lower: 10.50, upper: 13.30, range: [10.50, 13.30] },
      { date: 'Dec 01', spot: 11.50, forecast: 12.60, lower: 11.00, upper: 14.20, range: [11.00, 14.20] },
      { date: 'Dec 15', spot: 11.75, forecast: 13.10, lower: 11.40, upper: 14.80, range: [11.40, 14.80] }
    ]
  },
  'us-dhamra': {
    name: 'United States (New Orleans) → Dhamra Port',
    origin: 'United States (New Orleans)',
    dest: 'Dhamra Port',
    currentSpot: 41.70,
    avgForecast: 43.80,
    lowest: 39.50,
    highest: 47.20,
    savingsPct: 5.3,
    trajectory: 'Autumn dip (October)',
    points: [
      { date: 'Aug 05', spot: 41.70, forecast: 41.70, lower: 40.00, upper: 43.40, range: [40.00, 43.40] },
      { date: 'Aug 19', spot: 41.50, forecast: 41.10, lower: 39.20, upper: 43.00, range: [39.20, 43.00] },
      { date: 'Sep 02', spot: 41.20, forecast: 40.40, lower: 38.30, upper: 42.50, range: [38.30, 42.50] },
      { date: 'Sep 16', spot: 40.80, forecast: 39.80, lower: 37.50, upper: 42.10, range: [37.50, 42.10] },
      { date: 'Oct 01', spot: 40.50, forecast: 39.50, lower: 37.00, upper: 42.00, range: [37.00, 42.00] },
      { date: 'Oct 15', spot: 40.70, forecast: 40.20, lower: 37.60, upper: 42.80, range: [37.60, 42.80] },
      { date: 'Nov 01', spot: 41.20, forecast: 41.90, lower: 39.00, upper: 44.80, range: [39.00, 44.80] },
      { date: 'Nov 15', spot: 41.90, forecast: 43.60, lower: 40.40, upper: 46.80, range: [40.40, 46.80] },
      { date: 'Dec 01', spot: 42.50, forecast: 45.40, lower: 42.00, upper: 48.80, range: [42.00, 48.80] },
      { date: 'Dec 15', spot: 43.10, forecast: 46.80, lower: 43.20, upper: 50.40, range: [43.20, 50.40] }
    ]
  }
};

export const MarketOverviewChart: React.FC<MarketOverviewChartProps> = ({
  onNewForecastClick,
  onOpenTradingTerminal
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedCorridorKey, setSelectedCorridorKey] = useState<string>('au-paradip');
  const activeCorridor = CORRIDOR_DATA[selectedCorridorKey];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div className={`p-3 rounded-[5px] text-[12px] font-sans shadow-sm border ${
          isLight
            ? 'bg-white border-[#E4E4E7] text-[#18181B]'
            : 'bg-white border-[#D0D0D0] text-gray-900'
        }`}>
          <p className={`font-semibold pb-1.5 mb-2 flex items-center gap-1.5 border-b ${
            isLight ? 'text-[#18181B] border-[#E4E4E7]' : 'text-gray-900 border-gray-200'
          }`}>
            <Calendar className={`w-3.5 h-3.5 ${isLight ? 'text-[#71717A]' : 'text-gray-600'}`} />
            <span>{label}, 2026</span>
          </p>
          <div className="space-y-1.5 font-mono">
            <div className={`flex justify-between gap-4 ${isLight ? 'text-[#18181B]' : 'text-gray-900'}`}>
              <span className={`font-sans ${isLight ? 'text-[#71717A]' : 'text-gray-500'}`}>Forecast Rate:</span>
              <span className="font-bold text-[#2E7D32]">${p.forecast?.toFixed(2)} <span className="text-gray-500 font-normal font-sans text-[11px]">/ MT</span></span>
            </div>
            <div className={`flex justify-between gap-4 ${isLight ? 'text-[#3F3F46]' : 'text-gray-700'}`}>
              <span className={`font-sans ${isLight ? 'text-[#71717A]' : 'text-gray-500'}`}>95% Range:</span>
              <span><span className="text-[#2E7D32]">${p.lower?.toFixed(2)}</span> – <span className="text-[#2E7D32]">${p.upper?.toFixed(2)}</span></span>
            </div>
            <div className={`flex justify-between gap-4 pt-1.5 border-t ${
              isLight ? 'border-[#E4E4E7] text-[#3F3F46]' : 'border-gray-200 text-gray-700'
            }`}>
              <span className={`font-sans ${isLight ? 'text-[#71717A]' : 'text-gray-500'}`}>Current Spot:</span>
              <span className="font-medium text-[#2E7D32]">${p.spot?.toFixed(2)} <span className="text-gray-500 font-normal font-sans text-[11px]">/ MT</span></span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const cardBorder = isLight ? 'border-[#E4E4E7]' : 'border-[#D0D0D0]';
  const innerBg = isLight ? 'bg-[#F8F8F9]' : 'bg-[#F9FAFB]';
  const textTitle = isLight ? 'text-[#18181B]' : 'text-black';
  const textMuted = isLight ? 'text-[#71717A]' : 'text-gray-500';

  return (
    <div
      id="dashboard-market-chart-card"
      className={`bg-white border ${cardBorder} rounded-[6px] p-5 sm:p-6 font-sans transition-colors`}
    >
      {/* Header & Corridor Selector */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${cardBorder}`}>
        <div>
          <h3 className={`font-semibold text-[15px] uppercase tracking-wide ${isLight ? 'text-[#18181B]' : 'text-gray-900'}`}>
            Freight Market Overview
          </h3>
          <p className={`text-[13px] mt-0.5 flex items-center gap-1.5 ${isLight ? 'text-[#71717A]' : 'text-gray-600'}`}>
            <span className={`font-medium ${isLight ? 'text-[#18181B]' : 'text-gray-900'}`}>{activeCorridor.origin}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isLight ? 'text-[#A1A1AA]' : 'text-gray-500'}`} />
            <span className={`font-medium ${isLight ? 'text-[#18181B]' : 'text-gray-900'}`}>{activeCorridor.dest}</span>
          </p>
        </div>

        {/* Corridor Selector Buttons */}
        <div className="flex items-center gap-1.5 text-[12px]">
          {[
            { key: 'au-paradip', label: 'AU → Paradip' },
            { key: 'id-vizag', label: 'ID → Vizag' },
            { key: 'us-dhamra', label: 'US → Dhamra' },
          ].map(c => {
            const isSel = selectedCorridorKey === c.key;
            let btnClass = '';
            if (isLight) {
              btnClass = isSel
                ? 'bg-[#18181B] text-white font-medium shadow-2xs'
                : 'bg-white text-[#52525B] border border-[#E4E4E7] hover:bg-[#F4F4F5] hover:text-[#18181B]';
            } else {
              btnClass = isSel
                ? 'bg-black text-white font-medium'
                : 'bg-white text-gray-700 border border-[#D0D0D0] hover:bg-gray-50';
            }

            return (
              <button
                key={c.key}
                id={`tab-corridor-${c.key}`}
                onClick={() => setSelectedCorridorKey(c.key)}
                className={`px-3 py-1.5 rounded-[5px] transition cursor-pointer ${btnClass}`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
        <div className={`p-3 rounded-[5px] border ${cardBorder} ${innerBg}`}>
          <p className={`text-[11px] uppercase tracking-wider ${textMuted} font-medium`}>
            Current Spot
          </p>
          <p className="text-[18px] sm:text-[20px] font-semibold font-mono text-[#2E7D32] mt-0.5">
            ${activeCorridor.currentSpot.toFixed(2)}{' '}
            <span className={`text-[11.5px] font-normal ${textMuted} font-sans`}>
              / MT
            </span>
          </p>
        </div>

        <div className={`p-3 rounded-[5px] border ${cardBorder} ${innerBg}`}>
          <p className={`text-[11px] uppercase tracking-wider ${isLight ? 'text-[#52525B]' : 'text-gray-700'} font-medium`}>
            Lowest Forecast
          </p>
          <p className="text-[18px] sm:text-[20px] font-semibold font-mono text-[#2E7D32] mt-0.5">
            ${activeCorridor.lowest.toFixed(2)}{' '}
            <span className={`text-[11.5px] font-normal ${textMuted} font-sans`}>
              / MT
            </span>
          </p>
        </div>

        <div className={`p-3 rounded-[5px] border ${cardBorder} ${innerBg}`}>
          <p className={`text-[11px] uppercase tracking-wider ${textMuted} font-medium`}>
            90-Day Average
          </p>
          <p className="text-[18px] sm:text-[20px] font-semibold font-mono text-[#2E7D32] mt-0.5">
            ${activeCorridor.avgForecast.toFixed(2)}{' '}
            <span className={`text-[11.5px] font-normal ${textMuted} font-sans`}>
              / MT
            </span>
          </p>
        </div>

        <div className={`p-3 rounded-[5px] border ${cardBorder} ${innerBg}`}>
          <p className={`text-[11px] uppercase tracking-wider ${textMuted} font-medium`}>
            Market Trajectory
          </p>
          <p className={`text-[12.5px] font-medium ${isLight ? 'text-[#3F3F46]' : 'text-gray-800'} mt-1 font-sans`}>
            {activeCorridor.trajectory}
          </p>
        </div>
      </div>

      {/* Clean Black & White Recharts Forecast Curve */}
      <div className="h-[300px] sm:h-[330px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={activeCorridor.points} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isLight ? '#F0F0F2' : '#E5E7EB'}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#A1A1AA"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: isLight ? '#E4E4E7' : '#D0D0D0' }}
              tick={{ fill: isLight ? '#71717A' : '#4B5563' }}
            />
            <YAxis
              stroke="#A1A1AA"
              fontSize={11}
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={{ stroke: isLight ? '#E4E4E7' : '#D0D0D0' }}
              tick={{ fill: isLight ? '#71717A' : '#4B5563', fontFamily: 'IBM Plex Mono' }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{
                paddingBottom: '10px',
                fontSize: '11.5px',
                color: isLight ? '#18181B' : '#111827'
              }}
            />

            {/* Recommended Window Highlight: Soft Gray Box */}
            {React.createElement(ReferenceArea as any, {
              x1: 'Oct 01',
              x2: 'Oct 15',
              fill: isLight ? '#EAEAEB' : '#E5E7EB',
              fillOpacity: 0.6,
              stroke: isLight ? '#D4D4D8' : '#9CA3AF',
              strokeDasharray: '3 3',
              strokeOpacity: 0.8,
              label: {
                value: 'RECOMMENDED WINDOW · OCT 12–26 ($18.40/MT)',
                position: 'insideTop',
                fill: isLight ? '#18181B' : '#111827',
                fontSize: 10.5,
                fontWeight: 600,
                offset: 5
              }
            })}

            {/* 95% Confidence Interval Upper/Lower */}
            <Area
              type="monotone"
              dataKey="upper"
              name="95% Confidence Band"
              fill={isLight ? '#E4E4E7' : '#E5E7EB'}
              fillOpacity={isLight ? 0.4 : 0.3}
              stroke="transparent"
            />

            {/* Forecast Rate Line */}
            <Line
              type="monotone"
              dataKey="forecast"
              name="Forecast Rate ($/MT)"
              stroke={isLight ? '#18181B' : '#000000'}
              strokeWidth={2}
              dot={{
                r: 3,
                fill: isLight ? '#18181B' : '#000000',
                stroke: '#FFFFFF',
                strokeWidth: 1.5
              }}
              activeDot={{
                r: 5,
                fill: isLight ? '#18181B' : '#000000',
                stroke: '#FFFFFF',
                strokeWidth: 1.5
              }}
            />

            {/* Spot Benchmark Line */}
            <Line
              type="monotone"
              dataKey="spot"
              name="Current Spot Baseline"
              stroke={isLight ? '#71717A' : '#6B7280'}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info & Action */}
      <div className={`mt-4 pt-3 border-t ${cardBorder} flex flex-wrap items-center justify-between gap-3 text-[12.5px] ${isLight ? 'text-[#71717A]' : 'text-gray-600'}`}>
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#18181B]' : 'bg-black'}`} />
          Econometric dry bulk forward curve with SARIMA 95% uncertainty interval.
        </span>
        <div className="flex items-center gap-4">
          {onOpenTradingTerminal && (
            <button
              onClick={onOpenTradingTerminal}
              className={`font-medium hover:underline cursor-pointer ${
                isLight ? 'text-[#52525B] hover:text-[#18181B]' : 'text-gray-700 hover:text-black'
              }`}
            >
              Open Trading Desk
            </button>
          )}
          <button
            id="market-chart-deep-dive-btn"
            onClick={onNewForecastClick}
            className={`font-medium hover:underline flex items-center gap-1 cursor-pointer ${
              isLight ? 'text-[#18181B]' : 'text-black'
            }`}
          >
            Create Custom Cargo Forecast →
          </button>
        </div>
      </div>
    </div>
  );
};
