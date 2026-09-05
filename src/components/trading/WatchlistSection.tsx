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
  const [searchQuery] = useState<string>('');

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

  const renderSparkline = (points: number[]) => {
    if (!points || points.length === 0) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 20;

    const pathData = points
      .map((p, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 4) - 2;
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible inline-block">
        <path d={pathData} fill="none" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div
      id="freight-market-watchlist-container"
      className="bg-white border border-[#D0D0D0] rounded-[6px] p-4 sm:p-5 flex flex-col gap-3 font-sans"
    >
      {/* Header & Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D0D0D0] pb-3">
        <div>
          <h3 className="text-[14px] font-semibold text-black uppercase tracking-wider">
            Freight Route Corridors & Forward Curves
          </h3>
          <p className="text-[11.5px] text-gray-500 mt-0.5 font-mono">
            Active Indian bulk import corridors & draft compatibility screener
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1 text-xs">
          {[
            { id: 'all', label: 'All Corridors' },
            { id: 'dips', label: 'Top Savings' },
            { id: 'active', label: 'High Volume' },
            { id: 'feasible', label: 'Draft Verified' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`px-2.5 py-1 rounded-[4px] font-mono text-[11px] font-medium transition cursor-pointer ${
                filterTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-white border border-[#D0D0D0] text-gray-700 hover:bg-gray-50'
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
            <tr className="border-b border-[#D0D0D0] bg-[#F9FAFB] text-gray-600 font-medium uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-3">Route Corridor</th>
              <th className="py-2.5 px-3">Vessel Class & Cargo</th>
              <th className="py-2.5 px-3 text-right">Spot vs Forecast</th>
              <th className="py-2.5 px-3 text-center">Trend (7D)</th>
              <th className="py-2.5 px-3 text-center">Savings Signal</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D0D0D0] font-medium">
            {corridors.map(c => {
              const savingsPct = Math.abs(c.savingsPotentialPct);

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelectCorridor(c)}
                  className="hover:bg-[#F9FAFB] transition cursor-pointer"
                >
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-black text-[12.5px]">{c.route}</div>
                    <span className="text-[10.5px] text-gray-500 font-mono">{c.symbol}</span>
                  </td>

                  <td className="py-2.5 px-3 text-gray-700">
                    <span className="text-black font-medium">{c.primaryVessel}</span>
                    <span className="text-[11px] text-gray-500 block">{c.cargo}</span>
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono">
                    <div className="text-[#2E7D32] font-semibold text-[12.5px]">${c.spotRate.toFixed(2)}<span className="text-gray-500 font-normal font-sans text-[10px]">/MT</span></div>
                    <span className="text-[11px] text-gray-600 font-sans">Fcst: <span className="text-[#2E7D32] font-mono font-medium">${c.forecastRate.toFixed(2)}</span></span>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    {renderSparkline(c.sparkline)}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10.5px] font-mono font-medium text-black bg-[#F3F4F6] px-1.5 py-0.2 rounded-[2px] border border-[#D0D0D0]">
                      Save {savingsPct.toFixed(1)}%
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTradeModal(c);
                      }}
                      className="px-2.5 py-1 rounded-[4px] bg-white hover:bg-gray-50 border border-[#D0D0D0] text-black text-[11px] font-medium transition cursor-pointer font-mono"
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
