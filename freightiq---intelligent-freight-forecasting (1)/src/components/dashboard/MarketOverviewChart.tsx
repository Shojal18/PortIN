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
import { TrendingDown, Calendar, ArrowRight } from 'lucide-react';
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
    trajectory: 'Seasonal trough · October',
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
    trajectory: 'Pre-monsoon low · September',
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
    trajectory: 'Autumn dip · October',
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
        <div
          className={`p-3 rounded-[6px] border shadow-xl text-[12.5px] font-sans ${
            isLight
              ? 'bg-[#FFFFFF] border-[#D7E0E7] text-[#12304A]'
              : 'bg-[#071522] border-[#20384C] text-white'
          }`}
        >
          <p
            className={`font-semibold border-b pb-1.5 mb-2 flex items-center gap-1.5 ${
              isLight
                ? 'border-[#D7E0E7] text-[#12304A]'
                : 'border-[#183A52] text-white'
            }`}
          >
            <Calendar
              className={`w-3.5 h-3.5 ${isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'}`}
            />
            <span>{label}, 2026</span>
          </p>
          <div className="space-y-1.5 font-mono">
            <div
              className={`flex justify-between gap-4 ${
                isLight ? 'text-[#12304A]' : 'text-slate-300'
              }`}
            >
              <span className={isLight ? 'text-[#526477] font-sans' : 'text-slate-400 font-sans'}>
                Forecast Rate:
              </span>
              <span className={`font-bold ${isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'}`}>
                ${p.forecast?.toFixed(2)} / MT
              </span>
            </div>
            <div
              className={`flex justify-between gap-4 ${
                isLight ? 'text-[#526477]' : 'text-slate-400'
              }`}
            >
              <span className="font-sans">95% Range:</span>
              <span className={isLight ? 'text-[#12304A]' : 'text-slate-200'}>
                ${p.lower?.toFixed(2)} – ${p.upper?.toFixed(2)}
              </span>
            </div>
            <div
              className={`flex justify-between gap-4 pt-1.5 border-t ${
                isLight ? 'border-[#D7E0E7] text-[#526477]' : 'border-[#183A52] text-slate-400'
              }`}
            >
              <span className="font-sans">Current Spot:</span>
              <span className={isLight ? 'text-[#12304A] font-medium' : 'text-slate-300 font-medium'}>
                ${p.spot?.toFixed(2)} / MT
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="dashboard-market-chart-card"
      className={`rounded-[8px] border p-5 sm:p-6 shadow-xs transition-colors duration-200 ${
        isLight
          ? 'bg-[#FFFFFF] border-[#D7E0E7]'
          : 'bg-[#0D1B2A] border-[#20384C]'
      }`}
    >
      {/* Header & Corridor Selector */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
          isLight ? 'border-[#D7E0E7]' : 'border-[#183A52]'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <h3
              className={`font-bold text-[15px] sm:text-[16px] uppercase tracking-wider font-sans ${
                isLight ? 'text-[#12304A]' : 'text-white'
              }`}
            >
              FREIGHT MARKET OVERVIEW
            </h3>
          </div>
          <p
            className={`text-[13px] mt-1 flex items-center gap-1.5 ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            <span className={`font-medium ${isLight ? 'text-[#12304A]' : 'text-slate-200'}`}>
              {activeCorridor.origin}
            </span>
            <ArrowRight
              className={`w-3.5 h-3.5 ${isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'}`}
            />
            <span className={`font-medium ${isLight ? 'text-[#12304A]' : 'text-slate-200'}`}>
              {activeCorridor.dest}
            </span>
          </p>
        </div>

        {/* Corridor Selector Buttons */}
        <div
          className={`flex items-center p-1 rounded-[6px] border gap-1 text-[13px] ${
            isLight
              ? 'bg-[#EEF3F7] border-[#D7E0E7]'
              : 'bg-[#071522] border-[#183A52]'
          }`}
        >
          <button
            id="tab-corridor-au-paradip"
            onClick={() => setSelectedCorridorKey('au-paradip')}
            className={`px-3 py-1.5 rounded-[4px] font-medium transition cursor-pointer ${
              selectedCorridorKey === 'au-paradip'
                ? isLight
                  ? 'bg-white text-[#12304A] font-semibold shadow-xs border border-[#BFD3E0]'
                  : 'bg-[#102A43] text-white font-semibold shadow-xs border border-[#183A52]'
                : isLight
                  ? 'text-[#526477] hover:text-[#12304A] hover:bg-white/60'
                  : 'text-slate-400 hover:text-white hover:bg-[#102A43]/50'
            }`}
          >
            AU → Paradip
          </button>
          <button
            id="tab-corridor-id-vizag"
            onClick={() => setSelectedCorridorKey('id-vizag')}
            className={`px-3 py-1.5 rounded-[4px] font-medium transition cursor-pointer ${
              selectedCorridorKey === 'id-vizag'
                ? isLight
                  ? 'bg-white text-[#12304A] font-semibold shadow-xs border border-[#BFD3E0]'
                  : 'bg-[#102A43] text-white font-semibold shadow-xs border border-[#183A52]'
                : isLight
                  ? 'text-[#526477] hover:text-[#12304A] hover:bg-white/60'
                  : 'text-slate-400 hover:text-white hover:bg-[#102A43]/50'
            }`}
          >
            ID → Vizag
          </button>
          <button
            id="tab-corridor-us-dhamra"
            onClick={() => setSelectedCorridorKey('us-dhamra')}
            className={`px-3 py-1.5 rounded-[4px] font-medium transition cursor-pointer ${
              selectedCorridorKey === 'us-dhamra'
                ? isLight
                  ? 'bg-white text-[#12304A] font-semibold shadow-xs border border-[#BFD3E0]'
                  : 'bg-[#102A43] text-white font-semibold shadow-xs border border-[#183A52]'
                : isLight
                  ? 'text-[#526477] hover:text-[#12304A] hover:bg-white/60'
                  : 'text-slate-400 hover:text-white hover:bg-[#102A43]/50'
            }`}
          >
            US → Dhamra
          </button>
        </div>
      </div>

      {/* Top Inline Market Statistics (Dense Terminal Typography) */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 my-4 py-3 px-4 rounded-[6px] border ${
          isLight
            ? 'bg-[#F6F8F5] border-[#D7E0E7]'
            : 'bg-[#102337]/70 border-[#183A52]'
        }`}
      >
        <div>
          <p
            className={`text-[11px] uppercase tracking-wider font-medium font-sans ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            CURRENT SPOT
          </p>
          <p
            className={`text-[18px] sm:text-[20px] font-bold font-mono mt-0.5 ${
              isLight ? 'text-[#12304A]' : 'text-white'
            }`}
          >
            ${activeCorridor.currentSpot.toFixed(2)}{' '}
            <span
              className={`text-[12px] font-normal font-sans ${
                isLight ? 'text-[#526477]' : 'text-slate-400'
              }`}
            >
              / MT
            </span>
          </p>
        </div>

        <div>
          <p
            className={`text-[11px] uppercase tracking-wider font-semibold font-sans ${
              isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'
            }`}
          >
            LOWEST FORECAST
          </p>
          <p
            className={`text-[18px] sm:text-[20px] font-bold font-mono mt-0.5 ${
              isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'
            }`}
          >
            ${activeCorridor.lowest.toFixed(2)}{' '}
            <span
              className={`text-[12px] font-normal font-sans ${
                isLight ? 'text-[#087F8C]/80' : 'text-[#12A6A6]/80'
              }`}
            >
              / MT
            </span>
          </p>
        </div>

        <div>
          <p
            className={`text-[11px] uppercase tracking-wider font-medium font-sans ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            90-DAY AVG
          </p>
          <p
            className={`text-[18px] sm:text-[20px] font-bold font-mono mt-0.5 ${
              isLight ? 'text-[#12304A]' : 'text-slate-200'
            }`}
          >
            ${activeCorridor.avgForecast.toFixed(2)}{' '}
            <span
              className={`text-[12px] font-normal font-sans ${
                isLight ? 'text-[#526477]' : 'text-slate-400'
              }`}
            >
              / MT
            </span>
          </p>
        </div>

        <div>
          <p
            className={`text-[11px] uppercase tracking-wider font-medium font-sans ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            MARKET TRAJECTORY
          </p>
          <p
            className={`text-[13px] font-medium flex items-center gap-1.5 mt-1.5 font-sans ${
              isLight ? 'text-[#16805C]' : 'text-[#20B26B]'
            }`}
          >
            <TrendingDown className="w-4 h-4 shrink-0" />
            <span>{activeCorridor.trajectory}</span>
          </p>
        </div>
      </div>

      {/* Large Recharts Forecast Curve with Confidence Band & Window */}
      <div className="h-[320px] sm:h-[350px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={activeCorridor.points} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isLight ? '#D7E0E7' : '#183A52'}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke={isLight ? '#7E91A4' : '#64748B'}
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: isLight ? '#D7E0E7' : '#20384C' }}
              tick={{ fill: isLight ? '#526477' : '#94A3B8' }}
            />
            <YAxis
              stroke={isLight ? '#7E91A4' : '#64748B'}
              fontSize={12}
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={{ stroke: isLight ? '#D7E0E7' : '#20384C' }}
              tick={{ fill: isLight ? '#526477' : '#94A3B8', fontFamily: 'IBM Plex Mono' }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{
                paddingBottom: '12px',
                fontSize: '12px',
                color: isLight ? '#12304A' : '#E8F0F5'
              }}
            />

            {/* Subtle Recommended Window Highlight */}
            {React.createElement(ReferenceArea as any, {
              x1: 'Oct 01',
              x2: 'Oct 15',
              fill: isLight ? '#087F8C' : '#12A6A6',
              fillOpacity: isLight ? 0.14 : 0.12,
              stroke: isLight ? '#087F8C' : '#12A6A6',
              strokeDasharray: '4 4',
              strokeOpacity: 0.8,
              label: {
                value: 'RECOMMENDED WINDOW · OCT 12–26 ($18.40/MT)',
                position: 'insideTop',
                fill: isLight ? '#087F8C' : '#12A6A6',
                fontSize: 11,
                fontWeight: 600,
                offset: 5
              }
            })}

            {/* 95% Confidence Interval Upper/Lower */}
            <Area
              type="monotone"
              dataKey="upper"
              name="95% Confidence Band"
              fill={isLight ? '#087F8C' : '#12A6A6'}
              fillOpacity={0.08}
              stroke="transparent"
            />

            {/* Forecast Rate Line */}
            <Line
              type="monotone"
              dataKey="forecast"
              name="Forecast Rate ($/MT)"
              stroke={isLight ? '#087F8C' : '#12A6A6'}
              strokeWidth={3}
              dot={{
                r: 3,
                fill: isLight ? '#087F8C' : '#12A6A6',
                stroke: isLight ? '#FFFFFF' : '#0D1B2A',
                strokeWidth: 1.5
              }}
              activeDot={{
                r: 6,
                fill: isLight ? '#087F8C' : '#12A6A6',
                stroke: '#FFFFFF',
                strokeWidth: 2
              }}
            />

            {/* Spot Benchmark Line */}
            <Line
              type="monotone"
              dataKey="spot"
              name="Current Spot Baseline"
              stroke={isLight ? '#7E91A4' : '#64748B'}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info & Action */}
      <div
        className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-[13px] ${
          isLight
            ? 'border-[#D7E0E7] text-[#526477]'
            : 'border-[#183A52] text-slate-400'
        }`}
      >
        <span className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${isLight ? 'bg-[#087F8C]' : 'bg-[#12A6A6]'}`}
          />
          Econometric dry bulk forward curve with SARIMA 95% uncertainty interval.
        </span>
        <div className="flex items-center gap-3">
          {onOpenTradingTerminal && (
            <button
              onClick={onOpenTradingTerminal}
              className={`font-medium hover:underline cursor-pointer ${
                isLight ? 'text-[#12304A] hover:text-[#087F8C]' : 'text-slate-300 hover:text-white'
              }`}
            >
              Open Trading Desk
            </button>
          )}
          <button
            id="market-chart-deep-dive-btn"
            onClick={onNewForecastClick}
            className={`font-semibold flex items-center gap-1 cursor-pointer ${
              isLight ? 'text-[#087F8C] hover:text-[#066670]' : 'text-[#12A6A6] hover:text-[#0aa2b2]'
            }`}
          >
            Create Custom Cargo Forecast →
          </button>
        </div>
      </div>
    </div>
  );
};
