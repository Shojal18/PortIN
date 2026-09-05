import React from 'react';
import { SAMPLE_MARKET_DEPTH, LIVE_STREAM_TRADES } from '../../data/referenceData';
import { Activity } from 'lucide-react';

interface MarketDepthWidgetProps {
  onQuickSelectRate?: (rate: number) => void;
}

export const MarketDepthWidget: React.FC<MarketDepthWidgetProps> = ({ onQuickSelectRate }) => {
  const maxBidVol = Math.max(...SAMPLE_MARKET_DEPTH.bids.map(b => b.quantityMt));
  const maxAskVol = Math.max(...SAMPLE_MARKET_DEPTH.asks.map(a => a.quantityMt));

  return (
    <div
      id="market-depth-orderbook-container"
      className="bg-white border border-[#D0D0D0] rounded-[6px] p-4 sm:p-5 flex flex-col gap-3.5 font-sans"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D0D0D0] pb-2.5">
        <div>
          <h3 className="text-[13px] font-semibold text-black uppercase tracking-wider">
            Available Tonnage & Indicative Quotes
          </h3>
          <p className="text-[11px] text-gray-500 mt-0.5 font-mono">Indicative bid/offer ladder</p>
        </div>
        <span className="text-[11px] text-gray-500 font-mono">
          Spread: <strong className="text-[#2E7D32] font-semibold">$0.10</strong>/MT
        </span>
      </div>

      {/* Depth Ladder: Bids & Asks */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        {/* Bids Column (Charterer Demand) */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-gray-500 font-medium uppercase pb-1 border-b border-[#D0D0D0]">
            <span>Bid ($/MT)</span>
            <span>Qty (MT)</span>
          </div>
          {SAMPLE_MARKET_DEPTH.bids.map((bid, idx) => {
            const fillPct = (bid.quantityMt / maxBidVol) * 100;
            return (
              <div
                key={idx}
                onClick={() => onQuickSelectRate && onQuickSelectRate(bid.priceUsd)}
                className="relative flex items-center justify-between px-2 py-1 rounded-[3px] bg-[#F9FAFB] hover:bg-gray-100 border border-[#E5E7EB] transition cursor-pointer group"
                title={`${bid.chartererOrOwner}: Total Vol ${bid.totalVolumeMt.toLocaleString()} MT`}
              >
                <div
                  className="absolute right-0 top-0 bottom-0 bg-gray-200/50 rounded pointer-events-none"
                  style={{ width: `${fillPct}%` }}
                />
                <span className="text-[#2E7D32] font-semibold text-[11.5px] relative z-10">
                  ${bid.priceUsd.toFixed(2)}
                </span>
                <span className="text-gray-600 relative z-10 text-[10.5px]">
                  {bid.quantityMt.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        {/* Asks Column (Shipowner Tonnage Offers) */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-gray-500 font-medium uppercase pb-1 border-b border-[#D0D0D0]">
            <span>Ask ($/MT)</span>
            <span>Qty (MT)</span>
          </div>
          {SAMPLE_MARKET_DEPTH.asks.map((ask, idx) => {
            const fillPct = (ask.quantityMt / maxAskVol) * 100;
            return (
              <div
                key={idx}
                onClick={() => onQuickSelectRate && onQuickSelectRate(ask.priceUsd)}
                className="relative flex items-center justify-between px-2 py-1 rounded-[3px] bg-[#F9FAFB] hover:bg-gray-100 border border-[#E5E7EB] transition cursor-pointer group"
                title={`${ask.chartererOrOwner}: Total Vol ${ask.totalVolumeMt.toLocaleString()} MT`}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gray-200/50 rounded pointer-events-none"
                  style={{ width: `${fillPct}%` }}
                />
                <span className="text-[#2E7D32] font-semibold text-[11.5px] relative z-10">
                  ${ask.priceUsd.toFixed(2)}
                </span>
                <span className="text-gray-600 relative z-10 text-[10.5px]">
                  {ask.quantityMt.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Fixtures Stream */}
      <div className="pt-2.5 border-t border-[#D0D0D0] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-black font-semibold text-[12px] uppercase tracking-wide">
            <Activity className="w-3.5 h-3.5 text-black" />
            Live Fixtures Stream
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[2px] bg-gray-100 text-gray-700 border border-gray-300">
            STREAMING
          </span>
        </div>

        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {LIVE_STREAM_TRADES.map((trade, idx) => (
            <div
              key={idx}
              className="bg-[#F9FAFB] p-2 rounded-[4px] border border-[#E5E7EB] flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-medium text-black bg-white px-1 py-0.2 rounded font-mono border border-gray-200 shrink-0">
                  {trade.symbol}
                </span>
                <span className="text-gray-700 text-[11px] line-clamp-1">{trade.text}</span>
              </div>
              <span className="text-[10px] text-gray-500 shrink-0 font-mono">{trade.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
