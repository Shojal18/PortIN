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
    <div id="trading-terminal-view" className="space-y-4 max-w-6xl mx-auto font-sans">
      {/* 1. Baltic & Bunker Indices Snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {MARKET_INDICES.map(idx => {
          const isPositive = idx.changePct >= 0;
          return (
            <div
              key={idx.symbol}
              className="bg-white border border-[#D0D0D0] p-3 rounded-[4px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-medium text-gray-600 font-mono truncate">{idx.symbol}</span>
                <span
                  className="text-[10px] font-mono px-1 py-0.2 rounded-[2px] bg-gray-100 text-gray-800 border border-gray-300"
                >
                  {isPositive ? '+' : ''}
                  {idx.changePct.toFixed(1)}%
                </span>
              </div>
              <div className="text-[16px] font-bold text-black font-mono mt-1">
                {idx.currentValue.toLocaleString(undefined, {
                  minimumFractionDigits: idx.category === 'bunker' ? 2 : idx.category === 'index' && idx.currentValue > 100 ? 0 : 2
                })}
                <span className="text-[10px] text-gray-500 font-normal ml-1 font-sans">{idx.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Primary Chartering Workstation: Chart (Left) + Available Tonnage & Quotes (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Rate Chart */}
        <div className="lg:col-span-2 space-y-4">
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
        <div className="lg:col-span-1 space-y-4">
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
