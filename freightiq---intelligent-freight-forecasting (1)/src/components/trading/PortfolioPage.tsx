import React, { useState } from 'react';
import {
  Clock,
  Layers,
  Ship,
  Plus
} from 'lucide-react';
import { PortfolioPosition, TradeOrder } from '../../types';

interface PortfolioPageProps {
  positions: PortfolioPosition[];
  orders: TradeOrder[];
  onOpenTradeModal: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  positions,
  orders,
  onOpenTradeModal
}) => {
  const [activeTab, setActiveTab] = useState<'positions' | 'orders'>('positions');

  const totalVolumeBookedMt = positions.reduce((acc, p) => acc + p.volumeMt, 0);
  const totalInvestedUsd = positions.reduce((acc, p) => acc + p.volumeMt * p.contractRatePerTonne, 0);
  const totalUnrealizedPnlUsd = positions.reduce((acc, p) => acc + p.unrealizedPnlUsd, 0);
  const avgContractRate = totalVolumeBookedMt > 0 ? totalInvestedUsd / totalVolumeBookedMt : 15.53;

  return (
    <div id="freight-portfolio-page" className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* 1. Operational Summary */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#183A52] gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12A6A6]" />
              <h3 className="font-bold text-[17px] sm:text-[19px] text-white uppercase tracking-wider">
                Fleet Charter Operations & Voyage Holdings
              </h3>
            </div>
            <p className="text-[13px] text-slate-400 mt-1">
              Active voyage fixtures, cargo throughput, and mark-to-market cost savings across Indian East Coast corridors.
            </p>
          </div>
          <button
            onClick={onOpenTradeModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white text-[12.5px] font-bold transition uppercase tracking-wider cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Book Charter</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-[#183A52]">
          <div className="pt-2 lg:pt-0 lg:px-2">
            <span className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
              Active Charters
            </span>
            <div className="flex items-baseline gap-1.5 mt-1.5 font-mono">
              <span className="text-2xl sm:text-3xl font-bold text-white">{positions.length || 4}</span>
              <span className="text-xs text-slate-400">Vessels Active</span>
            </div>
            <p className="text-[11.5px] text-slate-500 font-mono mt-1">Operating East Coast India</p>
          </div>

          <div className="pt-2 lg:pt-0 lg:px-4">
            <span className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
              Tonnage Under Contract
            </span>
            <div className="flex items-baseline gap-1.5 mt-1.5 font-mono">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {totalVolumeBookedMt ? totalVolumeBookedMt.toLocaleString() : '338,000'}
              </span>
              <span className="text-xs text-slate-400">MT</span>
            </div>
            <p className="text-[11.5px] text-slate-500 font-mono mt-1">Coking coal & thermal parcel</p>
          </div>

          <div className="pt-2 lg:pt-0 lg:px-4">
            <span className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
              Weighted Average Rate
            </span>
            <div className="flex items-baseline gap-1 mt-1.5 font-mono">
              <span className="text-2xl sm:text-3xl font-bold text-white">${avgContractRate.toFixed(2)}</span>
              <span className="text-xs text-slate-400 font-normal">/ MT</span>
            </div>
            <p className="text-[11.5px] text-slate-500 font-mono mt-1">Fixed charter baseline</p>
          </div>

          <div className="pt-2 lg:pt-0 lg:px-4">
            <span className="text-[11px] font-bold font-mono text-[#20B26B] uppercase tracking-wider block">
              Realized Trough Savings
            </span>
            <div className="flex items-baseline gap-1 mt-1.5 font-mono">
              <span className="text-2xl sm:text-3xl font-bold text-[#20B26B]">
                +${totalUnrealizedPnlUsd ? totalUnrealizedPnlUsd.toLocaleString() : '411,900'}
              </span>
            </div>
            <p className="text-[11.5px] text-[#20B26B] font-mono mt-1">Vs. prevailing spot rates</p>
          </div>
        </div>
      </div>

      {/* 2. Main Table: Active Charters vs Order History */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 space-y-4 shadow-sm">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#183A52] pb-3">
          <div className="flex items-center bg-[#071522] p-1 rounded-[6px] border border-[#183A52] text-xs font-mono">
            <button
              onClick={() => setActiveTab('positions')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] font-bold transition cursor-pointer ${
                activeTab === 'positions'
                  ? 'bg-[#102337] text-[#12A6A6] shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Active Charter Operations ({positions.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] font-bold transition cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#102337] text-[#12A6A6] shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Charter Order History ({orders.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Active Charters Table */}
        {activeTab === 'positions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#183A52] text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
                  <th className="py-3 px-3.5">Vessel & Corridor</th>
                  <th className="py-3 px-3.5">Cargo / Tonnage</th>
                  <th className="py-3 px-3.5">Contract Rate</th>
                  <th className="py-3 px-3.5">Current Spot</th>
                  <th className="py-3 px-3.5">Savings Opportunity</th>
                  <th className="py-3 px-3.5">Voyage Status</th>
                  <th className="py-3 px-3.5">ETA</th>
                  <th className="py-3 px-3.5">Demurrage Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#183A52]">
                {positions.map(pos => (
                  <tr key={pos.id} className="hover:bg-[#102337] transition">
                    {/* Vessel & Corridor */}
                    <td className="py-3.5 px-3.5">
                      <div className="font-bold text-white text-[13.5px] flex items-center gap-1.5">
                        <Ship className="w-3.5 h-3.5 text-[#12A6A6]" />
                        <span>{pos.vesselName}</span>
                      </div>
                      <div className="text-[11.5px] text-slate-400 font-mono mt-0.5">{pos.route}</div>
                      <div className="text-[10.5px] text-slate-500 font-mono">{pos.vesselClass}</div>
                    </td>

                    {/* Cargo & Volume */}
                    <td className="py-3.5 px-3.5">
                      <div className="font-bold text-white text-[13px] font-mono">
                        {pos.volumeMt.toLocaleString()} MT
                      </div>
                      <div className="text-[11.5px] text-slate-400">{pos.cargo}</div>
                    </td>

                    {/* Contract Rate */}
                    <td className="py-3.5 px-3.5 font-mono">
                      <span className="font-bold text-white text-[13px]">${pos.contractRatePerTonne.toFixed(2)}</span>
                      <span className="text-slate-400 text-[10.5px]"> / MT</span>
                    </td>

                    {/* Current Spot */}
                    <td className="py-3.5 px-3.5 text-slate-300 font-mono">
                      <span>${pos.currentMarketRatePerTonne.toFixed(2)}</span>
                      <span className="text-slate-400 text-[10.5px]"> / MT</span>
                    </td>

                    {/* Savings Opportunity */}
                    <td className="py-3.5 px-3.5 font-mono">
                      <div className="font-bold text-[#20B26B] text-[13px]">
                        +${pos.unrealizedPnlUsd.toLocaleString()}
                      </div>
                      <div className="text-[10.5px] text-[#20B26B]">
                        +{pos.unrealizedPnlPct.toFixed(1)}% vs spot
                      </div>
                    </td>

                    {/* Maritime Voyage Status */}
                    <td className="py-3.5 px-3.5">
                      <div className="font-medium text-white flex items-center gap-1.5 text-[12.5px]">
                        <span className="w-2 h-2 rounded-full bg-[#12A6A6]" />
                        {pos.voyageStatus}
                      </div>
                      <div className="w-28 bg-[#071522] h-1.5 rounded-full overflow-hidden mt-1.5 border border-[#183A52]">
                        <div
                          className="bg-[#12A6A6] h-full rounded-full"
                          style={{ width: `${pos.progressPct}%` }}
                        />
                      </div>
                    </td>

                    {/* ETA */}
                    <td className="py-3.5 px-3.5 text-slate-300 font-mono">
                      {pos.eta}
                    </td>

                    {/* Demurrage Risk */}
                    <td className="py-3.5 px-3.5">
                      <span
                        className={`text-[10.5px] font-bold font-mono px-2 py-0.5 rounded border uppercase ${
                          pos.demurrageRisk === 'Low'
                            ? 'bg-[#0A3D2E] text-[#20B26B] border-[#14533D]'
                            : 'bg-[#3D2C10] text-[#E0A33A] border-[#593E15]'
                        }`}
                      >
                        {pos.demurrageRisk} Risk
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Order History */}
        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#183A52] text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
                  <th className="py-3 px-3.5">Order ID & Date</th>
                  <th className="py-3 px-3.5">Corridor & Cargo</th>
                  <th className="py-3 px-3.5">Order Type</th>
                  <th className="py-3 px-3.5">Volume & Rate</th>
                  <th className="py-3 px-3.5">Total Consideration</th>
                  <th className="py-3 px-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#183A52]">
                {orders.map(ord => (
                  <tr key={ord.id} className="hover:bg-[#102337] transition font-mono">
                    <td className="py-3.5 px-3.5">
                      <div className="font-bold text-white text-[13px]">{ord.orderNumber}</div>
                      <div className="text-[11px] text-slate-400">{ord.createdAt.split('T')[0]}</div>
                    </td>
                    <td className="py-3.5 px-3.5">
                      <div className="font-bold text-white text-[13px]">{ord.route}</div>
                      <div className="text-[11px] text-slate-400">{ord.cargoType} • {ord.vesselClass}</div>
                    </td>
                    <td className="py-3.5 px-3.5">
                      <span className="text-[10.5px] font-bold px-2 py-0.5 rounded bg-[#071522] text-slate-300 border border-[#183A52] uppercase">
                        {ord.orderType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5">
                      <div className="font-bold text-white text-[13px]">{ord.volumeMt.toLocaleString()} MT</div>
                      <div className="text-[11px] text-[#20B26B]">${ord.strikeRatePerTonne.toFixed(2)}/MT</div>
                    </td>
                    <td className="py-3.5 px-3.5">
                      <div className="font-bold text-white text-[13px]">${ord.totalConsiderationUsd.toLocaleString()}</div>
                      <div className="text-[10.5px] text-[#20B26B]">Saved +${ord.savingsRealizedUsd.toLocaleString()}</div>
                    </td>
                    <td className="py-3.5 px-3.5">
                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded border uppercase ${
                          ord.status === 'ACTIVE_VOYAGE'
                            ? 'bg-[#0A3D2E] text-[#20B26B] border-[#14533D]'
                            : ord.status === 'EXECUTED'
                            ? 'bg-[#102A43] text-[#12A6A6] border-[#183A52]'
                            : 'bg-[#071522] text-slate-400 border-[#183A52]'
                        }`}
                      >
                        {ord.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
