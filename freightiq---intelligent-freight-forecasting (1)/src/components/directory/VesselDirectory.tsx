import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { REFERENCE_VESSELS } from '../../data/referenceData';
import { VesselClassSpecification } from '../../types';

export const VesselDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedVessel, setSelectedVessel] = useState<VesselClassSpecification | null>(null);

  const filteredVessels = REFERENCE_VESSELS.filter(vessel => {
    return (
      vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.typicalCargo.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
      vessel.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div id="vessel-directory-container" className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#12A6A6]" />
            <h2 className="text-[17px] sm:text-[19px] font-bold text-white uppercase tracking-wider">
              Dry Bulk Vessel Fleet Classification
            </h2>
          </div>
          <p className="text-[13px] text-slate-400 mt-1">
            Naval architecture parameters, deadweight ranges, draft thresholds, speed, and fuel consumption.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            id="vessel-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search vessels or cargo types..."
            className="w-full pl-9 pr-3 py-2 rounded-[6px] border border-[#183A52] bg-[#071522] text-white text-[13px] font-medium focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6]"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#183A52] text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
                <th className="py-3 px-3.5">Vessel Class</th>
                <th className="py-3 px-3.5">Typical DWT (MT)</th>
                <th className="py-3 px-3.5">Draft Range</th>
                <th className="py-3 px-3.5">LOA Range</th>
                <th className="py-3 px-3.5">Beam Range</th>
                <th className="py-3 px-3.5">Speed / Fuel</th>
                <th className="py-3 px-3.5">Typical Cargoes</th>
                <th className="py-3 px-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#183A52]">
              {filteredVessels.map(vessel => (
                <tr
                  key={vessel.id}
                  id={`vessel-row-${vessel.name}`}
                  onClick={() => setSelectedVessel(vessel)}
                  className="hover:bg-[#102337] transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-3.5">
                    <div className="font-bold text-white text-[13.5px]">{vessel.name}</div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      ${vessel.dailyHireBaseUsd.toLocaleString()}/day hire
                    </span>
                  </td>

                  <td className="py-3.5 px-3.5 text-white font-bold font-mono text-[13px]">
                    {(vessel.dwtMin / 1000).toFixed(0)}k – {(vessel.dwtMax / 1000).toFixed(0)}k MT
                  </td>

                  <td className="py-3.5 px-3.5 text-slate-300 font-mono">
                    {vessel.draftMinM}m – {vessel.draftMaxM}m
                  </td>

                  <td className="py-3.5 px-3.5 text-slate-300 font-mono">
                    {vessel.loaMinM}m – {vessel.loaMaxM}m
                  </td>

                  <td className="py-3.5 px-3.5 text-slate-300 font-mono">
                    {vessel.beamMinM}m – {vessel.beamMaxM}m
                  </td>

                  <td className="py-3.5 px-3.5 font-mono">
                    <span className="font-bold text-white text-[12.5px]">{vessel.typicalSpeedKnots} kn</span>
                    <span className="text-[10.5px] text-slate-400 block">{vessel.fuelConsumptionTonnesDay} MT/day VLSFO</span>
                  </td>

                  <td className="py-3.5 px-3.5">
                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                      {vessel.typicalCargo.map(cargo => (
                        <span
                          key={cargo}
                          className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-[#071522] text-slate-300 border border-[#183A52]"
                        >
                          {cargo}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-3.5 text-center">
                    <button
                      id={`btn-view-vessel-${vessel.id}`}
                      className="px-3 py-1 rounded-[4px] bg-[#102A43] hover:bg-[#153655] border border-[#183A52] text-[#12A6A6] text-[11.5px] font-bold transition font-mono uppercase"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vessel Profile Modal */}
      {selectedVessel && (
        <div className="fixed inset-0 z-50 bg-[#071522]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D1B2A] rounded-[8px] p-6 max-w-lg w-full shadow-2xl border border-[#20384C] text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#183A52]">
              <div>
                <h3 className="font-bold text-[16px] text-white uppercase tracking-wider">{selectedVessel.name} Specifications</h3>
                <p className="text-[12px] text-slate-400 font-mono">Dry Bulk Ocean Carrier Profile</p>
              </div>
              <button
                onClick={() => setSelectedVessel(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs font-mono">
              <p className="text-slate-300 leading-relaxed text-[12.5px] font-sans">
                {selectedVessel.description}
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">Draft Range</span>
                  <div className="font-bold text-white text-[14px] mt-1">{selectedVessel.draftMinM}m – {selectedVessel.draftMaxM}m</div>
                </div>
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">LOA Range</span>
                  <div className="font-bold text-white text-[14px] mt-1">{selectedVessel.loaMinM}m – {selectedVessel.loaMaxM}m</div>
                </div>
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">Beam Range</span>
                  <div className="font-bold text-white text-[14px] mt-1">{selectedVessel.beamMinM}m – {selectedVessel.beamMaxM}m</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">Fuel Consumption (VLSFO)</span>
                  <div className="font-bold text-white text-[14px] mt-1">{selectedVessel.fuelConsumptionTonnesDay} MT / Day</div>
                </div>
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase">Daily Hire Baseline</span>
                  <div className="font-bold text-white text-[14px] mt-1">${selectedVessel.dailyHireBaseUsd.toLocaleString()} / Day</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedVessel(null)}
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
