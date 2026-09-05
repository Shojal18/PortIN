import React, { useState } from 'react';
import { X } from 'lucide-react';
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
  const [includeBunkerHedge] = useState<boolean>(true);
  const [includeDemurrageInsurance] = useState<boolean>(true);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 font-sans"
    >
      <div
        id="quick-charter-modal-content"
        className="bg-white border border-[#D0D0D0] w-full max-w-lg rounded-[6px] shadow-lg text-gray-900 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-[#F9FAFB] px-5 py-3.5 border-b border-[#D0D0D0] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-semibold text-black uppercase tracking-wider">
                Charter Execution Ticket
              </h3>
              <span className="text-[10.5px] font-mono px-1.5 py-0.2 rounded-[2px] bg-white text-gray-800 border border-[#D0D0D0]">
                {corridor?.symbol || 'AU-PDP'}
              </span>
            </div>
            <p className="text-[11.5px] text-gray-500 mt-0.5 font-mono">
              {corridor?.route || 'Hay Point (Australia) → Paradip Port (India)'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-black transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-3.5 text-xs">
          {orderSuccess ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mx-auto text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-black uppercase tracking-wide">
                  Charter Fixture Confirmed
                </h4>
                <p className="text-[11.5px] text-gray-500 font-mono mt-0.5">
                  Order Ref: <span className="text-black font-semibold">{orderSuccess.orderNumber}</span>
                </p>
              </div>

              <div className="bg-[#F9FAFB] p-3.5 rounded-[4px] border border-[#D0D0D0] max-w-sm mx-auto space-y-1.5 text-xs text-left font-mono">
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-500 font-sans">Route Corridor:</span>
                  <span className="font-medium text-black">{orderSuccess.route}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-500 font-sans">Contract Volume:</span>
                  <span className="font-medium text-black">{orderSuccess.volumeMt.toLocaleString()} MT</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-500 font-sans">Strike Rate:</span>
                  <span className="font-semibold text-[#2E7D32]">${orderSuccess.strikeRatePerTonne.toFixed(2)} <span className="text-gray-500 font-sans font-normal">/ MT</span></span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-gray-200 text-black">
                  <span className="font-medium text-gray-600 font-sans">Total Consideration:</span>
                  <span className="font-bold text-[#2E7D32] text-[13px]">${orderSuccess.totalConsiderationUsd.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-2 px-4 py-1.5 rounded-[4px] bg-black hover:bg-[#262626] text-white font-medium text-[12px] cursor-pointer"
              >
                Close Ticket
              </button>
            </div>
          ) : (
            <>
              {/* Fixture Type */}
              <div>
                <label className="block text-[11.5px] font-medium text-gray-700 mb-1.5 uppercase tracking-wide">
                  Charter Execution Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('OPTIMAL_SEASONAL')}
                    className={`p-2.5 rounded-[4px] border text-left cursor-pointer transition ${
                      orderType === 'OPTIMAL_SEASONAL'
                        ? 'border-black bg-black text-white'
                        : 'border-[#D0D0D0] bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold text-[12px]">Optimal Window Fix</div>
                    <div className={`text-[10.5px] font-mono mt-0.5 ${orderType === 'OPTIMAL_SEASONAL' ? 'text-gray-300' : 'text-gray-500'}`}>
                      Target: <span className={orderType === 'OPTIMAL_SEASONAL' ? 'text-white font-bold' : 'text-[#2E7D32] font-semibold'}>${corridor?.forecastRate.toFixed(2) || '18.40'}</span>/MT
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('SPOT_MARKET')}
                    className={`p-2.5 rounded-[4px] border text-left cursor-pointer transition ${
                      orderType === 'SPOT_MARKET'
                        ? 'border-black bg-black text-white'
                        : 'border-[#D0D0D0] bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold text-[12px]">Spot Market Fix</div>
                    <div className={`text-[10.5px] font-mono mt-0.5 ${orderType === 'SPOT_MARKET' ? 'text-gray-300' : 'text-gray-500'}`}>
                      Immediate: <span className={orderType === 'SPOT_MARKET' ? 'text-white font-bold' : 'text-[#2E7D32] font-semibold'}>${spotRate.toFixed(2)}</span>/MT
                    </div>
                  </button>
                </div>
              </div>

              {/* Volume & Rate Input */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-700 mb-1 uppercase tracking-wide">
                    Cargo Volume (MT)
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={volumeMt}
                    onChange={e => setVolumeMt(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-[4px] border border-[#D0D0D0] bg-white text-black font-mono text-[12px] focus:outline-hidden focus:border-black"
                  />
                  <span className="text-[10px] text-gray-500 mt-0.5 block">
                    Vessel class: <strong className="text-black">{vesselClass}</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-700 mb-1 uppercase tracking-wide">
                    Strike Rate ($/MT)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    disabled={orderType === 'SPOT_MARKET'}
                    value={rateToUse}
                    onChange={e => setTargetRate(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-[4px] border border-[#D0D0D0] bg-white text-black font-mono text-[12px] focus:outline-hidden focus:border-black disabled:bg-gray-100 disabled:text-gray-500"
                  />
                  <span className="text-[10px] text-gray-500 mt-0.5 block font-mono">
                    Benchmark spot: <span className="text-[#2E7D32]">${spotRate.toFixed(2)}</span>/MT
                  </span>
                </div>
              </div>

              {/* Cost Summary Breakdown */}
              <div className="p-3 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0] space-y-1.5">
                <span className="font-semibold text-black block uppercase text-[10.5px] tracking-wider border-b border-gray-200 pb-1">
                  Voyage Consideration Breakdown
                </span>
                <div className="flex justify-between text-gray-700 font-mono text-[11.5px]">
                  <span className="font-sans text-gray-600">Base Ocean Freight:</span>
                  <span className="font-semibold text-[#2E7D32]">${baseFreightUsd.toLocaleString()}</span>
                </div>
                {includeBunkerHedge && (
                  <div className="flex justify-between text-gray-700 font-mono text-[11.5px]">
                    <span className="font-sans text-gray-600">Bunker Fuel Adj (BAF):</span>
                    <span className="font-semibold text-[#2E7D32]">${bunkerHedgeUsd.toLocaleString()}</span>
                  </div>
                )}
                {includeDemurrageInsurance && (
                  <div className="flex justify-between text-gray-700 font-mono text-[11.5px]">
                    <span className="font-sans text-gray-600">Demurrage Risk Allowance:</span>
                    <span className="font-semibold text-[#2E7D32]">${demurrageInsuranceUsd.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-black font-bold pt-1.5 border-t border-gray-200 font-mono text-[13px]">
                  <span className="font-sans">Total Consideration:</span>
                  <span className="text-[#2E7D32]">${totalConsiderationUsd.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-[4px] bg-white hover:bg-gray-50 border border-[#D0D0D0] text-gray-700 text-[12px] font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="px-4 py-1.5 rounded-[4px] bg-black hover:bg-[#262626] text-white font-medium text-[12px] transition cursor-pointer disabled:opacity-50"
                >
                  {isExecuting ? 'Confirming...' : 'Execute Fixture'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
