import React, { useState } from 'react';
import { AdvancedTradingChart } from './AdvancedTradingChart';
import { MarketDepthWidget } from './MarketDepthWidget';
import { WatchlistSection } from './WatchlistSection';
import { QuickCharterModal } from './QuickCharterModal';
import { MARKET_INDICES, CORRIDOR_MARKET_TICKERS } from '../../data/referenceData';
import { CorridorMarketTicker, ForecastResultData, TradeOrder } from '../../types';

interface TradingTerminalViewProps {
  forecast: ForecastResultData;
  onExecuteOrder: (order: TradeOrder) => void;
  onNavigateToForecast: () => void;
}

export const TradingTerminalView: React.FC<TradingTerminalViewProps> = ({
  forecast,
  onExecuteOrder
}) => {
  const [selectedCorridor, setSelectedCorridor] = useState<CorridorMarketTicker>(CORRIDOR_MARKET_TICKERS[0]);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState<boolean>(false);

  return (
    <div id="trading-terminal-view" className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* 1. Baltic & Bunker Indices Snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MARKET_INDICES.map(idx => {
          const isPositive = idx.changePct >= 0;
          return (
            <div
              key={idx.symbol}
              className="bg-[#0D1B2A] border border-[#20384C] p-3.5 rounded-[6px] flex flex-col justify-between shadow-xs"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11.5px] font-bold text-slate-300 font-mono truncate">{idx.symbol}</span>
                <span
                  className={`text-[10.5px] font-bold font-mono px-1.5 py-0.5 rounded ${
                    isPositive
                      ? 'text-[#20B26B] bg-[#0A3D2E] border border-[#14533D]'
                      : 'text-[#E05252] bg-[#3E1A24] border border-[#5C2332]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {idx.changePct.toFixed(1)}%
                </span>
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1.5">
                {idx.currentValue.toLocaleString(undefined, {
                  minimumFractionDigits: idx.category === 'bunker' ? 2 : idx.category === 'index' && idx.currentValue > 100 ? 0 : 2
                })}
                <span className="text-[10px] text-slate-400 font-normal ml-1">{idx.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Primary Chartering Workstation: Chart (Left) + Available Tonnage & Quotes (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Rate Chart */}
        <div className="lg:col-span-2 space-y-5">
          <AdvancedTradingChart
            data={forecast.forecastSeries}
            corridor={selectedCorridor}
            currentSpotRate={selectedCorridor.spotRate}
            optimalStartDate={forecast.optimalWindow.startDate}
            optimalEndDate={forecast.optimalWindow.endDate}
            optimalRate={forecast.optimalWindow.lowestPredictedRate}
            onOpenTradeModal={() => setIsTradeModalOpen(true)}
          />
        </div>

        {/* Right 1 Col: Market Depth & Indicative Quotes */}
        <div className="lg:col-span-1 space-y-5">
          <MarketDepthWidget
            onQuickSelectRate={() => {
              setIsTradeModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* 3. Corridor Market Screener */}
      <div>
        <WatchlistSection
          onSelectCorridor={c => setSelectedCorridor(c)}
          onOpenTradeModal={c => {
            setSelectedCorridor(c);
            setIsTradeModalOpen(true);
          }}
        />
      </div>

      {/* Quick Charter Execution Modal */}
      <QuickCharterModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        corridor={selectedCorridor}
        forecast={forecast}
        onExecuteOrder={order => {
          onExecuteOrder(order);
        }}
      />
    </div>
  );
};
