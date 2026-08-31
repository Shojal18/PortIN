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
      className="bg-[#0D1B2A] border border-[#20384C] rounded-[8px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm font-sans"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#183A52] pb-3.5">
        <div>
          <h3 className="text-[13px] font-bold text-white uppercase tracking-wider">
            Available Tonnage & Indicative Quotes
          </h3>
          <p className="text-[11.5px] text-slate-400 mt-0.5 font-mono">Indicative bid/offer ladder</p>
        </div>
        <span className="text-[11.5px] text-slate-400 font-mono">
          Spread: <strong className="text-white">$0.10/MT</strong>
        </span>
      </div>

      {/* Depth Ladder: Bids & Asks */}
      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        {/* Bids Column (Charterer Demand) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase pb-1 border-b border-[#183A52]">
            <span>Bid ($/MT)</span>
            <span>Qty (MT)</span>
          </div>
          {SAMPLE_MARKET_DEPTH.bids.map((bid, idx) => {
            const fillPct = (bid.quantityMt / maxBidVol) * 100;
            return (
              <div
                key={idx}
                onClick={() => onQuickSelectRate && onQuickSelectRate(bid.priceUsd)}
                className="relative flex items-center justify-between px-2.5 py-1.5 rounded-[4px] bg-[#071522] hover:bg-[#102A43] border border-[#183A52] transition cursor-pointer group"
                title={`${bid.chartererOrOwner}: Total Vol ${bid.totalVolumeMt.toLocaleString()} MT`}
              >
                <div
                  className="absolute right-0 top-0 bottom-0 bg-[#20B26B]/15 rounded pointer-events-none"
                  style={{ width: `${fillPct}%` }}
                />
                <span className="text-[#20B26B] font-bold text-[12px] relative z-10">
                  ${bid.priceUsd.toFixed(2)}
                </span>
                <span className="text-slate-300 relative z-10 text-[11px]">
                  {bid.quantityMt.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        {/* Asks Column (Shipowner Tonnage Offers) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase pb-1 border-b border-[#183A52]">
            <span>Ask ($/MT)</span>
            <span>Qty (MT)</span>
          </div>
          {SAMPLE_MARKET_DEPTH.asks.map((ask, idx) => {
            const fillPct = (ask.quantityMt / maxAskVol) * 100;
            return (
              <div
                key={idx}
                onClick={() => onQuickSelectRate && onQuickSelectRate(ask.priceUsd)}
                className="relative flex items-center justify-between px-2.5 py-1.5 rounded-[4px] bg-[#071522] hover:bg-[#102A43] border border-[#183A52] transition cursor-pointer group"
                title={`${ask.chartererOrOwner}: Total Vol ${ask.totalVolumeMt.toLocaleString()} MT`}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#E05252]/15 rounded pointer-events-none"
                  style={{ width: `${fillPct}%` }}
                />
                <span className="text-[#E05252] font-bold text-[12px] relative z-10">
                  ${ask.priceUsd.toFixed(2)}
                </span>
                <span className="text-slate-300 relative z-10 text-[11px]">
                  {ask.quantityMt.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Fixtures Stream */}
      <div className="pt-3 border-t border-[#183A52] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-white font-bold text-[12.5px] uppercase tracking-wide">
            <Activity className="w-3.5 h-3.5 text-[#12A6A6]" />
            Live Fixtures Feed
          </span>
          <span className="text-[#20B26B] font-bold font-mono text-[10.5px] bg-[#0A3D2E] px-2 py-0.5 rounded border border-[#14533D]">
            STREAMING
          </span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {LIVE_STREAM_TRADES.map((trade, idx) => (
            <div
              key={idx}
              className="bg-[#071522] p-2.5 rounded-[4px] border border-[#183A52] flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#12A6A6] bg-[#102A43] px-1.5 py-0.5 rounded font-mono border border-[#183A52] shrink-0">
                  {trade.symbol}
                </span>
                <span className="text-slate-300 text-[11.5px] line-clamp-1">{trade.text}</span>
              </div>
              <span className="text-[10.5px] text-slate-400 shrink-0 font-mono">{trade.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
