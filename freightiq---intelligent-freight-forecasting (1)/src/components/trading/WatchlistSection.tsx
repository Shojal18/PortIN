import React, { useState } from 'react';
import { CORRIDOR_MARKET_TICKERS } from '../../data/referenceData';
import { CorridorMarketTicker } from '../../types';

interface WatchlistSectionProps {
  onSelectCorridor: (corridor: CorridorMarketTicker) => void;
  onOpenTradeModal: (corridor: CorridorMarketTicker) => void;
}

export const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  onSelectCorridor,
  onOpenTradeModal
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'dips' | 'active' | 'feasible'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getFilteredCorridors = () => {
    let list = [...CORRIDOR_MARKET_TICKERS];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        c =>
          c.symbol.toLowerCase().includes(q) ||
          c.route.toLowerCase().includes(q) ||
          c.cargo.toLowerCase().includes(q)
      );
    }

    switch (filterTab) {
      case 'dips':
        return list.sort((a, b) => b.savingsPotentialPct - a.savingsPotentialPct);
      case 'active':
        return list.sort((a, b) => b.volumeMt24h - a.volumeMt24h);
      case 'feasible':
        return list.filter(c => c.portFeasible);
      default:
        return list;
    }
  };

  const corridors = getFilteredCorridors();

  const renderSparkline = (points: number[], isGreen: boolean) => {
    if (!points || points.length === 0) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 90;
    const height = 24;

    const pathData = points
      .map((p, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 6) - 3;
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    const strokeColor = isGreen ? '#20B26B' : '#E05252';

    return (
      <svg width={width} height={height} className="overflow-visible inline-block">
        <path d={pathData} fill="none" stroke={strokeColor} strokeWidth={1.75} strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div
      id="freight-market-watchlist-container"
      className="bg-[#0D1B2A] border border-[#20384C] rounded-[8px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm font-sans"
    >
      {/* Header & Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#183A52] pb-4">
        <div>
          <h3 className="text-[14px] font-bold text-white uppercase tracking-wider">
            Freight Route Corridors & Forward Curves
          </h3>
          <p className="text-[12px] text-slate-400 mt-0.5 font-mono">
            Active Indian bulk import corridors & draft compatibility screener
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#071522] p-1 rounded-[6px] border border-[#183A52] text-xs">
          {[
            { id: 'all', label: 'All Corridors' },
            { id: 'dips', label: 'Top Savings' },
            { id: 'active', label: 'High Volume' },
            { id: 'feasible', label: 'Draft Verified' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`px-3 py-1 rounded-[4px] font-mono text-[11.5px] font-bold transition cursor-pointer ${
                filterTab === tab.id
                  ? 'bg-[#102337] text-[#12A6A6] shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Corridors Table List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#183A52] text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
              <th className="py-3 px-3.5">Route Corridor</th>
              <th className="py-3 px-3.5">Vessel Class & Cargo</th>
              <th className="py-3 px-3.5 text-right">Spot vs Forecast</th>
              <th className="py-3 px-3.5 text-center">Trend (7D)</th>
              <th className="py-3 px-3.5 text-center">Savings Signal</th>
              <th className="py-3 px-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#183A52] font-medium">
            {corridors.map(c => {
              const isDip = c.forecastRate < c.spotRate;
              const savingsPct = Math.abs(c.savingsPotentialPct);

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelectCorridor(c)}
                  className="hover:bg-[#102337] transition cursor-pointer"
                >
                  <td className="py-3 px-3.5">
                    <div className="font-bold text-white text-[13px]">{c.route}</div>
                    <span className="text-[11px] text-slate-400 font-mono">{c.symbol}</span>
                  </td>

                  <td className="py-3 px-3.5 text-slate-300">
                    <span className="text-white font-semibold">{c.primaryVessel}</span>
                    <span className="text-[11.5px] text-slate-400 block">{c.cargo}</span>
                  </td>

                  <td className="py-3 px-3.5 text-right font-mono">
                    <div className="text-white font-bold text-[13px]">${c.spotRate.toFixed(2)}/MT</div>
                    <span className="text-[11.5px] text-[#12A6A6]">Fcst: ${c.forecastRate.toFixed(2)}</span>
                  </td>

                  <td className="py-3 px-3.5 text-center">
                    {renderSparkline(c.sparkline, isDip)}
                  </td>

                  <td className="py-3 px-3.5 text-center">
                    <span className="text-[11px] font-mono font-bold text-[#20B26B] bg-[#0A3D2E] px-2.5 py-0.5 rounded border border-[#14533D]">
                      Save {savingsPct.toFixed(1)}%
                    </span>
                  </td>

                  <td className="py-3 px-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTradeModal(c);
                      }}
                      className="px-3 py-1.5 rounded-[4px] bg-[#102A43] hover:bg-[#153655] border border-[#183A52] text-[#12A6A6] text-[12px] font-bold transition cursor-pointer font-mono uppercase"
                    >
                      Fix Window
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
