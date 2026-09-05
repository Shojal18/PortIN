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
    <div id="freight-portfolio-page" className="space-y-4 max-w-6xl mx-auto font-sans">
      {/* 1. Operational Summary */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#D0D0D0] gap-3 mb-4">
          <div>
            <h3 className="font-semibold text-[16px] text-black uppercase tracking-wider">
              Fleet Charter Operations & Voyage Holdings
            </h3>
            <p className="text-[12.5px] text-gray-600 mt-0.5">
              Active voyage fixtures, cargo throughput, and mark-to-market cost savings across Indian East Coast corridors.
            </p>
          </div>
          <button
            onClick={onOpenTradeModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-black hover:bg-[#262626] text-white text-[12px] font-medium transition cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book Charter</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          <div className="pt-2 lg:pt-0 lg:px-2">
            <span className="text-[10.5px] font-mono text-gray-500 uppercase tracking-wider block">
              Active Charters
            </span>
            <div className="flex items-baseline gap-1 mt-1 font-mono">
              <span className="text-xl sm:text-2xl font-bold text-black">{positions.length || 4}</span>
              <span className="text-xs text-gray-500 font-sans">Vessels Active</span>
            </div>
            <p className="text-[11px] text-gray-500 font-mono mt-0.5">Operating East Coast India</p>
          </div>

          <div className="pt-2 lg:pt-0 lg:px-3">
            <span className="text-[10.5px] font-mono text-gray-500 uppercase tracking-wider block">
              Contracted Tonnage
            </span>
            <div className="flex items-baseline gap-1 mt-1 font-mono">
              <span className="text-xl sm:text-2xl font-bold text-black">
                {totalVolumeBookedMt ? totalVolumeBookedMt.toLocaleString() : '338,000'}
              </span>
              <span className="text-xs text-gray-500 font-sans">MT</span>
            </div>
            <p className="text-[11px] text-gray-500 font-mono mt-0.5">Coking & thermal parcels</p>
          </div>

          <div className="pt-2 lg:pt-0 lg:px-3">
            <span className="text-[10.5px] font-mono text-gray-500 uppercase tracking-wider block">
              Weighted Avg Rate
            </span>
            <div className="flex items-baseline gap-0.5 mt-1 font-mono">
              <span className="text-xl sm:text-2xl font-bold text-[#2E7D32]">${avgContractRate.toFixed(2)}</span>
              <span className="text-xs text-gray-500 font-sans">/MT</span>
            </div>
            <p className="text-[11px] text-gray-500 font-mono mt-0.5">Fixed charter baseline</p>
          </div>

          <div className="pt-2 lg:pt-0 lg:px-3">
            <span className="text-[10.5px] font-mono text-gray-700 uppercase tracking-wider block">
              Estimated Savings
            </span>
            <div className="flex items-baseline gap-0.5 mt-1 font-mono">
              <span className="text-xl sm:text-2xl font-bold text-[#2E7D32]">
                +${totalUnrealizedPnlUsd ? totalUnrealizedPnlUsd.toLocaleString() : '411,900'}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-mono mt-0.5">Vs. spot market at charter</p>
          </div>
        </div>
      </div>

      {/* 2. Main Table: Active Charters vs Order History */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5 space-y-3.5">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D0D0D0] pb-2.5">
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('positions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] font-medium transition cursor-pointer ${
                activeTab === 'positions'
                  ? 'bg-black text-white'
                  : 'bg-white border border-[#D0D0D0] text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Active Operations ({positions.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] font-medium transition cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-black text-white'
                  : 'bg-white border border-[#D0D0D0] text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Charter History ({orders.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Active Charters Table */}
        {activeTab === 'positions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D0D0D0] bg-[#F9FAFB] text-gray-600 font-medium uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Vessel & Corridor</th>
                  <th className="py-2.5 px-3">Cargo / Tonnage</th>
                  <th className="py-2.5 px-3">Contract Rate</th>
                  <th className="py-2.5 px-3">Current Spot</th>
                  <th className="py-2.5 px-3">Savings</th>
                  <th className="py-2.5 px-3">Voyage Status</th>
                  <th className="py-2.5 px-3">ETA</th>
                  <th className="py-2.5 px-3">Demurrage Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0D0D0]">
                {positions.map(pos => (
                  <tr key={pos.id} className="hover:bg-[#F9FAFB] transition">
                    {/* Vessel & Corridor */}
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-black text-[12.5px] flex items-center gap-1.5">
                        <Ship className="w-3.5 h-3.5 text-gray-600" />
                        <span>{pos.vesselName}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono">{pos.route}</div>
                      <div className="text-[10.5px] text-gray-400 font-mono">{pos.vesselClass}</div>
                    </td>

                    {/* Cargo & Volume */}
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-black text-[12px] font-mono">
                        {pos.volumeMt.toLocaleString()} MT
                      </div>
                      <div className="text-[11px] text-gray-500">{pos.cargo}</div>
                    </td>

                    {/* Contract Rate */}
                    <td className="py-2.5 px-3 font-mono">
                      <span className="font-semibold text-[#2E7D32] text-[12px]">${pos.contractRatePerTonne.toFixed(2)}</span>
                      <span className="text-gray-500 text-[10px]">/MT</span>
                    </td>

                    {/* Current Spot */}
                    <td className="py-2.5 px-3 font-mono">
                      <span className="text-[#2E7D32]">${pos.currentMarketRatePerTonne.toFixed(2)}</span>
                      <span className="text-gray-500 text-[10px]">/MT</span>
                    </td>

                    {/* Savings Opportunity */}
                    <td className="py-2.5 px-3 font-mono">
                      <div className="font-semibold text-[#2E7D32] text-[12px]">
                        +${pos.unrealizedPnlUsd.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        +{pos.unrealizedPnlPct.toFixed(1)}% vs spot
                      </div>
                    </td>

                    {/* Maritime Voyage Status */}
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-black text-[11.5px]">
                        {pos.voyageStatus}
                      </div>
                      <div className="w-24 bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-black h-full rounded-full"
                          style={{ width: `${pos.progressPct}%` }}
                        />
                      </div>
                    </td>

                    {/* ETA */}
                    <td className="py-2.5 px-3 text-gray-700 font-mono text-[11.5px]">
                      {pos.eta}
                    </td>

                    {/* Demurrage Risk */}
                    <td className="py-2.5 px-3">
                      <span className="text-[10.5px] font-mono px-1.5 py-0.2 rounded-[2px] bg-[#F3F4F6] text-gray-800 border border-[#D0D0D0]">
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
                <tr className="border-b border-[#D0D0D0] bg-[#F9FAFB] text-gray-600 font-medium uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Order ID & Date</th>
                  <th className="py-2.5 px-3">Corridor & Cargo</th>
                  <th className="py-2.5 px-3">Order Type</th>
                  <th className="py-2.5 px-3">Volume & Rate</th>
                  <th className="py-2.5 px-3">Total Consideration</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0D0D0]">
                {orders.map(ord => (
                  <tr key={ord.id} className="hover:bg-[#F9FAFB] transition font-mono">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-black text-[12px]">{ord.orderNumber}</div>
                      <div className="text-[10.5px] text-gray-500">{ord.createdAt.split('T')[0]}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-black text-[12px]">{ord.route}</div>
                      <div className="text-[10.5px] text-gray-500">{ord.cargoType} • {ord.vesselClass}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] px-1.5 py-0.2 rounded-[2px] bg-white text-gray-800 border border-[#D0D0D0]">
                        {ord.orderType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-black text-[12px]">{ord.volumeMt.toLocaleString()} MT</div>
                      <div className="text-[10.5px] text-[#2E7D32]">${ord.strikeRatePerTonne.toFixed(2)}<span className="text-gray-500 font-sans">/MT</span></div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#2E7D32] text-[12px]">${ord.totalConsiderationUsd.toLocaleString()}</div>
                      <div className="text-[10px] text-[#2E7D32]">Saved +${ord.savingsRealizedUsd.toLocaleString()}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] px-1.5 py-0.2 rounded-[2px] bg-[#F3F4F6] text-gray-800 border border-[#D0D0D0]">
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
