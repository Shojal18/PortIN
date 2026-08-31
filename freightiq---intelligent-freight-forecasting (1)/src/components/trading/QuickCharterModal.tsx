import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { CorridorMarketTicker, ForecastResultData, TradeOrder, CargoType } from '../../types';

interface QuickCharterModalProps {
  isOpen: boolean;
  onClose: () => void;
  corridor?: CorridorMarketTicker;
  forecast?: ForecastResultData;
  onExecuteOrder: (order: TradeOrder) => void;
}

export const QuickCharterModal: React.FC<QuickCharterModalProps> = ({
  isOpen,
  onClose,
  corridor,
  forecast,
  onExecuteOrder
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'SPOT_MARKET' | 'LIMIT_STRIKE' | 'OPTIMAL_SEASONAL' | 'BAF_HEDGED'>('OPTIMAL_SEASONAL');
  const [volumeMt, setVolumeMt] = useState<number>(corridor?.symbol === 'AU-DHM' ? 180000 : 60000);
  const [targetRate, setTargetRate] = useState<number>(corridor?.forecastRate || 18.40);
  const [includeBunkerHedge, setIncludeBunkerHedge] = useState<boolean>(true);
  const [includeDemurrageInsurance, setIncludeDemurrageInsurance] = useState<boolean>(true);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<TradeOrder | null>(null);

  const spotRate = corridor?.spotRate || forecast?.currentSpotRate || 19.72;
  const rateToUse = orderType === 'SPOT_MARKET' ? spotRate : targetRate;

  const baseFreightUsd = volumeMt * rateToUse;
  const bunkerHedgeUsd = includeBunkerHedge ? volumeMt * 0.45 : 0;
  const demurrageInsuranceUsd = includeDemurrageInsurance ? 18000 : 0;
  const totalConsiderationUsd = baseFreightUsd + bunkerHedgeUsd + demurrageInsuranceUsd;

  const spotCostTotal = volumeMt * spotRate;
  const savingsRealizedUsd = Math.max(0, spotCostTotal - baseFreightUsd);
  const savingsPct = spotCostTotal > 0 ? ((savingsRealizedUsd / spotCostTotal) * 100) : 0;

  const vesselClass = volumeMt > 120000 ? 'Capesize' : volumeMt > 70000 ? 'Panamax' : volumeMt > 45000 ? 'Supramax' : 'Handysize';

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const newOrder: TradeOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: `FIQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        symbol: corridor?.symbol || 'AU-PDP',
        route: corridor?.route || 'Hay Point ➔ Paradip Port',
        originName: corridor?.route?.split('➔')[0]?.trim() || 'Hay Point, Australia',
        destinationName: corridor?.route?.split('➔')[1]?.trim() || 'Paradip Port',
        cargoType: (corridor?.cargo || 'Coal – Thermal') as CargoType,
        vesselClass,
        orderType,
        action: 'BUY_CHARTER',
        volumeMt,
        strikeRatePerTonne: rateToUse,
        totalConsiderationUsd,
        status: orderType === 'LIMIT_STRIKE' ? 'PENDING_TRIGGER' : 'ACTIVE_VOYAGE',
        savingsRealizedUsd,
        savingsPct,
        laytimeDays: vesselClass === 'Capesize' ? 2.5 : 3.5,
        createdAt: new Date().toISOString(),
        executionDate: orderType === 'OPTIMAL_SEASONAL' ? '2026-10-14' : new Date().toISOString().split('T')[0],
        vesselName: `MV ${corridor?.symbol?.replace('-', ' ')} Carrier (${vesselClass})`
      };

      onExecuteOrder(newOrder);
      setIsExecuting(false);
      setOrderSuccess(newOrder);
    }, 600);
  };

  return (
    <div
      id="quick-charter-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071522]/80 backdrop-blur-xs font-sans"
    >
      <div
        id="quick-charter-modal-content"
        className="bg-[#0D1B2A] border border-[#20384C] w-full max-w-2xl rounded-[8px] shadow-2xl text-white overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-[#102337] px-6 py-4 border-b border-[#183A52] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-[14px] font-bold text-white uppercase tracking-wider">
                Charter Fixture Execution Ticket
              </h3>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#102A43] text-[#12A6A6] border border-[#183A52]">
                {corridor?.symbol || 'AU-PDP'}
              </span>
            </div>
            <p className="text-[12px] text-slate-400 mt-0.5 font-mono">
              {corridor?.route || 'Hay Point (Australia) → Paradip Port (India)'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {orderSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#0A3D2E] text-[#20B26B] border border-[#14533D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-white uppercase tracking-wide">
                  Charter Fixture Confirmed
                </h4>
                <p className="text-[12.5px] text-slate-400 font-mono mt-1">
                  Order Ref: <span className="text-[#12A6A6]">{orderSuccess.orderNumber}</span>
                </p>
              </div>

              <div className="bg-[#071522] p-4 rounded-[6px] border border-[#183A52] max-w-md mx-auto space-y-2 text-xs text-left font-mono">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Route Corridor:</span>
                  <span className="font-bold text-white">{orderSuccess.route}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Contract Volume:</span>
                  <span className="font-bold text-white">{orderSuccess.volumeMt.toLocaleString()} MT</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Strike Rate:</span>
                  <span className="font-bold text-[#12A6A6]">${orderSuccess.strikeRatePerTonne.toFixed(2)} / MT</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#183A52] text-white">
                  <span className="font-semibold text-slate-400">Total Consideration:</span>
                  <span className="font-bold text-[#20B26B] text-[14px]">${orderSuccess.totalConsiderationUsd.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white font-bold text-[13px] uppercase tracking-wider cursor-pointer"
              >
                Close Ticket
              </button>
            </div>
          ) : (
            <>
              {/* Fixture Type */}
              <div>
                <label className="block text-[12px] font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  Charter Execution Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('OPTIMAL_SEASONAL')}
                    className={`p-3 rounded-[6px] border text-left cursor-pointer transition ${
                      orderType === 'OPTIMAL_SEASONAL'
                        ? 'border-[#12A6A6] bg-[#102A43] text-white shadow-xs'
                        : 'border-[#183A52] bg-[#071522] text-slate-400 hover:bg-[#102337]'
                    }`}
                  >
                    <div className="font-bold text-[13px] text-white">Optimal Window Fix</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">Target rate: ${corridor?.forecastRate.toFixed(2) || '18.40'}/MT</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('SPOT_MARKET')}
                    className={`p-3 rounded-[6px] border text-left cursor-pointer transition ${
                      orderType === 'SPOT_MARKET'
                        ? 'border-[#12A6A6] bg-[#102A43] text-white shadow-xs'
                        : 'border-[#183A52] bg-[#071522] text-slate-400 hover:bg-[#102337]'
                    }`}
                  >
                    <div className="font-bold text-[13px] text-white">Spot Market Fix</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">Immediate fixture at ${spotRate.toFixed(2)}/MT</div>
                  </button>
                </div>
              </div>

              {/* Volume & Rate Input */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Cargo Volume (MT)
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={volumeMt}
                    onChange={e => setVolumeMt(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-white font-mono text-[13px] focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6]"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Vessel class: <strong className="text-white">{vesselClass}</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Agreed Strike Rate ($/MT)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    disabled={orderType === 'SPOT_MARKET'}
                    value={rateToUse}
                    onChange={e => setTargetRate(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-white font-mono text-[13px] focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6] disabled:opacity-60"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block font-mono">
                    Benchmark spot: ${spotRate.toFixed(2)}/MT
                  </span>
                </div>
              </div>

              {/* Cost Summary Breakdown */}
              <div className="p-4 rounded-[6px] bg-[#071522] border border-[#183A52] space-y-2">
                <span className="font-bold text-white block uppercase text-[11px] tracking-wider border-b border-[#183A52] pb-1.5">
                  Voyage Consideration Breakdown
                </span>
                <div className="flex justify-between text-slate-300 font-mono text-[12px]">
                  <span>Base Ocean Freight:</span>
                  <span className="font-bold text-white">${baseFreightUsd.toLocaleString()}</span>
                </div>
                {includeBunkerHedge && (
                  <div className="flex justify-between text-slate-300 font-mono text-[12px]">
                    <span>Bunker Fuel Adjustment (BAF):</span>
                    <span className="font-bold text-white">${bunkerHedgeUsd.toLocaleString()}</span>
                  </div>
                )}
                {includeDemurrageInsurance && (
                  <div className="flex justify-between text-slate-300 font-mono text-[12px]">
                    <span>Demurrage Risk Allowance:</span>
                    <span className="font-bold text-white">${demurrageInsuranceUsd.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold pt-2 border-t border-[#183A52] font-mono text-[14px]">
                  <span>Total Calculated Consideration:</span>
                  <span className="text-[#12A6A6]">${totalConsiderationUsd.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-[6px] bg-[#102337] hover:bg-[#183A52] border border-[#183A52] text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="px-5 py-2 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white font-bold transition cursor-pointer disabled:opacity-50 uppercase tracking-wider"
                >
                  {isExecuting ? 'Confirming Fixture...' : 'Execute Fixture'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
