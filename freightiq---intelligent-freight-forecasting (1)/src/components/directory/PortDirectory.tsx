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
    <div id="port-directory-container" className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#12A6A6]" />
            <h2 className="text-[17px] sm:text-[19px] font-bold text-white uppercase tracking-wider">
              Indian & Global Bulk Port Specifications
            </h2>
          </div>
          <p className="text-[13px] text-slate-400 mt-1">
            Berthing constraints, draft limits, LOA thresholds, and guaranteed discharge rates.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              id="port-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ports or coastal regions..."
              className="w-full pl-9 pr-3 py-2 rounded-[6px] border border-[#183A52] bg-[#071522] text-white text-[13px] font-medium focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6]"
            />
          </div>

          <div className="flex bg-[#071522] p-1 rounded-[6px] border border-[#183A52] gap-1 text-xs">
            <button
              id="filter-port-all"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-[4px] font-mono font-bold transition cursor-pointer ${
                filterType === 'all' ? 'bg-[#102337] text-[#12A6A6] shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({REFERENCE_PORTS.length})
            </button>
            <button
              id="filter-port-dest"
              onClick={() => setFilterType('destination')}
              className={`px-3 py-1 rounded-[4px] font-mono font-bold transition cursor-pointer ${
                filterType === 'destination' ? 'bg-[#102337] text-[#12A6A6] shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              India East Coast
            </button>
            <button
              id="filter-port-origin"
              onClick={() => setFilterType('origin')}
              className={`px-3 py-1 rounded-[4px] font-mono font-bold transition cursor-pointer ${
                filterType === 'origin' ? 'bg-[#102337] text-[#12A6A6] shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Global Load Hubs
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#183A52] text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
                <th className="py-3 px-3.5">Port & UN/LOCODE</th>
                <th className="py-3 px-3.5">Country / Basin</th>
                <th className="py-3 px-3.5">Operational Profile</th>
                <th className="py-3 px-3.5 text-right">Max Draft (m)</th>
                <th className="py-3 px-3.5 text-right">Max LOA (m)</th>
                <th className="py-3 px-3.5 text-right">Max Beam (m)</th>
                <th className="py-3 px-3.5 text-right">Discharge Rate</th>
                <th className="py-3 px-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#183A52]">
              {filteredPorts.map(port => (
                <tr
                  key={port.id}
                  id={`port-row-${port.id}`}
                  onClick={() => setSelectedPort(port)}
                  className="hover:bg-[#102337] transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-3.5">
                    <div className="font-bold text-white text-[13.5px]">{port.name}</div>
                    <span className="text-[11px] text-slate-400 font-mono">{port.code}</span>
                  </td>

                  <td className="py-3.5 px-3.5 text-slate-300">
                    <span className="font-medium text-white">{port.country}</span>
                    <span className="text-[11.5px] text-slate-400 block">{port.region}</span>
                  </td>

                  <td className="py-3.5 px-3.5">
                    {port.isDestination ? (
                      <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-[#102A43] text-[#12A6A6] border border-[#183A52]">
                        Discharge Port
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-[#071522] text-slate-300 border border-[#183A52]">
                        Load Hub
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-3.5 text-right font-bold text-white font-mono text-[13px]">
                    {port.maxDraftM.toFixed(1)}m
                  </td>

                  <td className="py-3.5 px-3.5 text-right text-slate-300 font-mono">
                    {port.maxLoaM}m
                  </td>

                  <td className="py-3.5 px-3.5 text-right text-slate-300 font-mono">
                    {port.maxBeamM}m
                  </td>

                  <td className="py-3.5 px-3.5 text-right font-mono">
                    <span className="font-bold text-white text-[13px]">
                      {port.handlingRateMtPerDay.toLocaleString()}
                    </span>
                    <span className="text-[10.5px] text-slate-400 block">MT/Day</span>
                  </td>

                  <td className="py-3.5 px-3.5 text-center">
                    <button
                      id={`btn-view-port-${port.id}`}
                      className="px-3 py-1 rounded-[4px] bg-[#102A43] hover:bg-[#153655] border border-[#183A52] text-[#12A6A6] text-[11.5px] font-bold transition font-mono uppercase"
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
        <div className="fixed inset-0 z-50 bg-[#071522]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D1B2A] rounded-[8px] p-6 max-w-lg w-full shadow-2xl border border-[#20384C] text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#183A52]">
              <div>
                <h3 className="font-bold text-[16px] text-white uppercase tracking-wider">{selectedPort.name}</h3>
                <p className="text-[12px] text-slate-400 font-mono">{selectedPort.region}, {selectedPort.country} ({selectedPort.code})</p>
              </div>
              <button
                onClick={() => setSelectedPort(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">Maximum Draft</span>
                  <div className="font-bold text-white text-[15px] mt-1">{selectedPort.maxDraftM}m</div>
                </div>
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">Maximum LOA</span>
                  <div className="font-bold text-white text-[15px] mt-1">{selectedPort.maxLoaM}m</div>
                </div>
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">Maximum Beam</span>
                  <div className="font-bold text-white text-[15px] mt-1">{selectedPort.maxBeamM}m</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">Handling Rate</span>
                  <div className="font-bold text-white text-[14px] mt-1">{selectedPort.handlingRateMtPerDay.toLocaleString()} MT / Day</div>
                </div>
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">Operational Berths</span>
                  <div className="font-bold text-white text-[14px] mt-1">{selectedPort.berthsCount} Deepwater Berths</div>
                </div>
              </div>

              <div className="p-3.5 rounded-[6px] bg-[#102337] border border-[#183A52] space-y-1.5">
                <span className="font-bold text-[#12A6A6] block text-[11px] uppercase tracking-wider">Nautical Guidance & Restrictions</span>
                <p className="text-slate-300 leading-relaxed text-[12px] font-sans">{selectedPort.notes}</p>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedPort(null)}
                className="px-5 py-2 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white font-bold text-[12.5px] uppercase tracking-wider cursor-pointer"
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
