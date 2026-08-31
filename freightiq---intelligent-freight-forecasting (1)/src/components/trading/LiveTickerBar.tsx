import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MARKET_INDICES, CORRIDOR_MARKET_TICKERS } from '../../data/referenceData';
import { CorridorMarketTicker } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface LiveTickerBarProps {
  onSelectCorridor?: (corridor: CorridorMarketTicker) => void;
}

export const LiveTickerBar: React.FC<LiveTickerBarProps> = ({ onSelectCorridor }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [pulse, setPulse] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="live-market-ticker-bar"
      className={`h-[48px] sm:h-[50px] border-b px-4 flex items-center overflow-x-auto no-scrollbar select-none gap-6 shrink-0 transition-colors duration-200 ${
        isLight
          ? 'bg-[#EEF3F7] border-[#D7E0E7] text-[#12304A]'
          : 'bg-[#071522] border-[#183A52] text-slate-200'
      }`}
    >
      {/* Live Market Label */}
      <div
        className={`flex items-center gap-2 shrink-0 pr-4 border-r ${
          isLight ? 'border-[#D7E0E7]' : 'border-[#183A52]'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20B26B] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#20B26B]"></span>
        </span>
        <span
          className={`font-bold text-[11px] uppercase tracking-wider font-sans ${
            isLight ? 'text-[#12304A]' : 'text-slate-300'
          }`}
        >
          LIVE FREIGHT SPOT
        </span>
      </div>

      {/* Baltic Indices Ticker Stream */}
      <div className="flex items-center gap-6 shrink-0 font-sans">
        {MARKET_INDICES.map(index => {
          const isPositive = index.changePct >= 0;
          return (
            <div
              key={index.symbol}
              className="flex items-center gap-2 shrink-0 group cursor-default"
              title={`${index.name}: High ${index.high24h} | Low ${index.low24h}`}
            >
              <span
                className={`font-semibold text-[11.5px] uppercase ${
                  isLight ? 'text-[#526477]' : 'text-slate-400'
                }`}
              >
                {index.symbol}
              </span>
              <span
                className={`font-mono font-bold text-[13px] ${
                  isLight ? 'text-[#12304A]' : 'text-white'
                }`}
              >
                {index.currentValue.toLocaleString(undefined, {
                  minimumFractionDigits:
                    index.category === 'bunker'
                      ? 2
                      : index.category === 'index' && index.currentValue > 100
                      ? 0
                      : 2
                })}
                <span
                  className={`text-[10.5px] font-normal font-sans ml-1 ${
                    isLight ? 'text-[#7E91A4]' : 'text-slate-400'
                  }`}
                >
                  {index.unit}
                </span>
              </span>
              {index.changePct !== 0 && (
                <span
                  className={`flex items-center text-[11.5px] font-mono font-medium ${
                    isPositive
                      ? isLight
                        ? 'text-[#16805C]'
                        : 'text-[#20B26B]'
                      : isLight
                      ? 'text-[#C94C4C]'
                      : 'text-[#E05252]'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline shrink-0" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline shrink-0" />
                  )}
                  {isPositive ? '+' : ''}
                  {index.changePct.toFixed(1)}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Corridor Key Calls Divider */}
      <div
        className={`h-4 w-px shrink-0 ${isLight ? 'bg-[#D7E0E7]' : 'bg-[#183A52]'}`}
      />

      {/* Key Corridors Stream */}
      <div className="flex items-center gap-4 shrink-0">
        {CORRIDOR_MARKET_TICKERS.map(c => {
          return (
            <button
              key={c.symbol}
              onClick={() => onSelectCorridor && onSelectCorridor(c)}
              className={`flex items-center gap-2 shrink-0 px-2 py-1 rounded transition cursor-pointer border ${
                isLight
                  ? 'hover:bg-white border-transparent hover:border-[#D7E0E7]'
                  : 'hover:bg-[#0D2235] border-transparent hover:border-[#183A52]'
              }`}
            >
              <span
                className={`font-semibold text-[11.5px] ${
                  isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'
                }`}
              >
                {c.symbol}
              </span>
              <span
                className={`font-mono font-bold text-[12.5px] ${
                  isLight ? 'text-[#12304A]' : 'text-white'
                }`}
              >
                ${c.forecastRate.toFixed(2)}/MT
              </span>
              <span
                className={`text-[10.5px] font-mono px-1.5 py-0.2 rounded border ${
                  isLight
                    ? 'bg-emerald-50 text-[#16805C] border-emerald-200'
                    : 'bg-[#20B26B]/10 text-[#20B26B] border-[#20B26B]/30'
                }`}
              >
                {c.savingsPotentialPct}% DIP
              </span>
            </button>
          );
        })}
      </div>

      {/* Bay of Bengal Liquidity Indicator */}
      <div
        className={`ml-auto hidden 2xl:flex items-center gap-2 shrink-0 pl-4 border-l text-[12px] ${
          isLight
            ? 'border-[#D7E0E7] text-[#526477]'
            : 'border-[#183A52] text-slate-400'
        }`}
      >
        <span>East Coast Tonnage:</span>
        <span
          className={`font-mono font-semibold ${
            isLight ? 'text-[#16805C]' : 'text-[#20B26B]'
          }`}
        >
          HIGH LIQUIDITY
        </span>
      </div>
    </div>
  );
};
