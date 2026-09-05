import React from 'react';
import { MARKET_INDICES } from '../../data/referenceData';
import { CorridorMarketTicker } from '../../types';

interface LiveTickerBarProps {
  onSelectCorridor?: (corridor: CorridorMarketTicker) => void;
}

export const LiveTickerBar: React.FC<LiveTickerBarProps> = ({ onSelectCorridor }) => {
  return (
    <div
      id="live-market-ticker-bar"
      className="h-[36px] bg-[#F9FAFB] border-b border-[#D0D0D0] px-4 flex items-center overflow-x-auto no-scrollbar select-none gap-5 shrink-0 text-gray-700 text-xs font-sans"
    >
      {/* Static Label */}
      <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-[#D0D0D0]">
        <span className="font-semibold text-[11px] text-gray-700 uppercase tracking-wider">
          Market Spot Rates
        </span>
      </div>

      {/* Indices Stream */}
      <div className="flex items-center gap-5 shrink-0">
        {MARKET_INDICES.map(index => {
          const isPositive = index.changePct >= 0;
          return (
            <div
              key={index.symbol}
              className="flex items-center gap-1.5 shrink-0 cursor-default"
              title={`${index.name}: High ${index.high24h} | Low ${index.low24h}`}
            >
              <span className="font-medium text-[11.5px] text-gray-500 uppercase">
                {index.symbol}:
              </span>
              <span className="font-mono font-semibold text-[12px] text-black">
                {index.currentValue.toLocaleString(undefined, {
                  minimumFractionDigits:
                    index.category === 'bunker'
                      ? 2
                      : index.category === 'index' && index.currentValue > 100
                      ? 0
                      : 2
                })}
                <span className="text-[10px] font-normal text-gray-500 ml-0.5">
                  {index.unit}
                </span>
              </span>
              {index.changePct !== 0 && (
                <span className="font-mono text-[11px] text-gray-600">
                  ({isPositive ? '+' : ''}{index.changePct.toFixed(1)}%)
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
