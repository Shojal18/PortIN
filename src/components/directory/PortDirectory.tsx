import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { REFERENCE_PORTS } from '../../data/referenceData';
import { PortSpecification } from '../../types';

export const PortDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'destination' | 'origin'>('all');
  const [selectedPort, setSelectedPort] = useState<PortSpecification | null>(null);

  const filteredPorts = REFERENCE_PORTS.filter(port => {
    const matchesSearch =
      port.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      port.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      port.region.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'destination') return matchesSearch && port.isDestination;
    if (filterType === 'origin') return matchesSearch && port.isOrigin;
    return matchesSearch;
  });

  return (
    <div id="port-directory-container" className="space-y-4 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-[16px] sm:text-[17px] font-semibold text-black uppercase tracking-wider">
            Bulk Port Specifications Directory
          </h2>
          <p className="text-[12.5px] text-gray-600 mt-0.5">
            Berthing constraints, draft limits, LOA thresholds, and discharge rates.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              id="port-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ports or regions..."
              className="w-full pl-8 pr-3 py-1.5 rounded-[4px] border border-[#D0D0D0] bg-white text-gray-900 text-[12.5px] focus:outline-hidden focus:border-black"
            />
          </div>

          <div className="flex gap-1 text-xs">
            <button
              id="filter-port-all"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-[4px] font-medium transition cursor-pointer ${
                filterType === 'all'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 border border-[#D0D0D0] hover:bg-gray-50'
              }`}
            >
              All ({REFERENCE_PORTS.length})
            </button>
            <button
              id="filter-port-dest"
              onClick={() => setFilterType('destination')}
              className={`px-3 py-1.5 rounded-[4px] font-medium transition cursor-pointer ${
                filterType === 'destination'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 border border-[#D0D0D0] hover:bg-gray-50'
              }`}
            >
              India East Coast
            </button>
            <button
              id="filter-port-origin"
              onClick={() => setFilterType('origin')}
              className={`px-3 py-1.5 rounded-[4px] font-medium transition cursor-pointer ${
                filterType === 'origin'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 border border-[#D0D0D0] hover:bg-gray-50'
              }`}
            >
              Load Hubs
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#D0D0D0] bg-[#F9FAFB] text-gray-600 font-medium uppercase tracking-wider text-[10.5px]">
                <th className="py-2.5 px-3">Port & UN/LOCODE</th>
                <th className="py-2.5 px-3">Country / Basin</th>
                <th className="py-2.5 px-3">Profile</th>
                <th className="py-2.5 px-3 text-right">Max Draft</th>
                <th className="py-2.5 px-3 text-right">Max LOA</th>
                <th className="py-2.5 px-3 text-right">Max Beam</th>
                <th className="py-2.5 px-3 text-right">Discharge Rate</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0D0D0]">
              {filteredPorts.map(port => (
                <tr
                  key={port.id}
                  id={`port-row-${port.id}`}
                  onClick={() => setSelectedPort(port)}
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-black text-[12.5px]">{port.name}</div>
                    <span className="text-[11px] text-gray-500 font-mono">{port.code}</span>
                  </td>

                  <td className="py-2.5 px-3 text-gray-800">
                    <span className="font-medium text-black">{port.country}</span>
                    <span className="text-[11px] text-gray-500 block">{port.region}</span>
                  </td>

                  <td className="py-2.5 px-3">
                    {port.isDestination ? (
                      <span className="px-1.5 py-0.2 rounded-[2px] font-mono text-[10.5px] font-medium bg-[#F3F4F6] text-gray-900 border border-[#D0D0D0]">
                        Discharge Port
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded-[2px] font-mono text-[10.5px] font-medium bg-white text-gray-700 border border-[#D0D0D0]">
                        Load Hub
                      </span>
                    )}
                  </td>

                  <td className="py-2.5 px-3 text-right font-bold text-black font-mono text-[12.5px]">
                    {port.maxDraftM.toFixed(1)}m
                  </td>

                  <td className="py-2.5 px-3 text-right text-gray-700 font-mono">
                    {port.maxLoaM}m
                  </td>

                  <td className="py-2.5 px-3 text-right text-gray-700 font-mono">
                    {port.maxBeamM}m
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono">
                    <span className="font-semibold text-black text-[12.5px]">
                      {port.handlingRateMtPerDay.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-500 block">MT/Day</span>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      id={`btn-view-port-${port.id}`}
                      className="px-2.5 py-1 rounded-[4px] bg-white hover:bg-gray-50 border border-[#D0D0D0] text-black text-[11px] font-medium transition cursor-pointer"
                    >
                      View Specs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Port Specification Detail Modal */}
      {selectedPort && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[6px] p-5 max-w-md w-full shadow-lg border border-[#D0D0D0] text-gray-900">
            <div className="flex items-center justify-between pb-3 border-b border-[#D0D0D0]">
              <div>
                <h3 className="font-semibold text-[15px] text-black uppercase tracking-wider">{selectedPort.name}</h3>
                <p className="text-[11.5px] text-gray-500 font-mono">{selectedPort.region}, {selectedPort.country} ({selectedPort.code})</p>
              </div>
              <button
                onClick={() => setSelectedPort(null)}
                className="text-gray-500 hover:text-black text-sm font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-3.5 space-y-3 text-xs font-mono">
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase">Max Draft</span>
                  <div className="font-bold text-black text-[14px] mt-0.5">{selectedPort.maxDraftM}m</div>
                </div>
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase">Max LOA</span>
                  <div className="font-bold text-black text-[14px] mt-0.5">{selectedPort.maxLoaM}m</div>
                </div>
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase">Max Beam</span>
                  <div className="font-bold text-black text-[14px] mt-0.5">{selectedPort.maxBeamM}m</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase">Handling Rate</span>
                  <div className="font-bold text-black text-[13px] mt-0.5">{selectedPort.handlingRateMtPerDay.toLocaleString()} MT/Day</div>
                </div>
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase">Berths Count</span>
                  <div className="font-bold text-black text-[13px] mt-0.5">{selectedPort.berthsCount} Deepwater Berths</div>
                </div>
              </div>

              <div className="p-3 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0] space-y-1">
                <span className="font-semibold text-black block text-[10.5px] uppercase tracking-wider">Berthing Notes & Restrictions</span>
                <p className="text-gray-700 leading-relaxed text-[11.5px] font-sans">{selectedPort.notes}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPort(null)}
                className="px-4 py-1.5 rounded-[4px] bg-black hover:bg-[#262626] text-white font-medium text-[12px] cursor-pointer"
              >
                Close Specs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
