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
    <div id="vessel-directory-container" className="space-y-4 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-[16px] sm:text-[17px] font-semibold text-black uppercase tracking-wider">
            Dry Bulk Fleet Specifications
          </h2>
          <p className="text-[12.5px] text-gray-600 mt-0.5">
            Naval architecture parameters, deadweight ranges, draft thresholds, speed, and fuel consumption.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            id="vessel-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search vessels or cargo..."
            className="w-full pl-8 pr-3 py-1.5 rounded-[4px] border border-[#D0D0D0] bg-white text-gray-900 text-[12.5px] focus:outline-hidden focus:border-black"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#D0D0D0] bg-[#F9FAFB] text-gray-600 font-medium uppercase tracking-wider text-[10.5px]">
                <th className="py-2.5 px-3">Vessel Class</th>
                <th className="py-2.5 px-3">Typical DWT (MT)</th>
                <th className="py-2.5 px-3">Draft Range</th>
                <th className="py-2.5 px-3">LOA Range</th>
                <th className="py-2.5 px-3">Beam Range</th>
                <th className="py-2.5 px-3">Speed / Fuel</th>
                <th className="py-2.5 px-3">Typical Cargoes</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0D0D0]">
              {filteredVessels.map(vessel => (
                <tr
                  key={vessel.id}
                  id={`vessel-row-${vessel.name}`}
                  onClick={() => setSelectedVessel(vessel)}
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-black text-[12.5px]">{vessel.name}</div>
                    <span className="text-[11px] text-gray-500 font-mono">
                      ${vessel.dailyHireBaseUsd.toLocaleString()}/day hire
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-black font-semibold font-mono text-[12px]">
                    {(vessel.dwtMin / 1000).toFixed(0)}k – {(vessel.dwtMax / 1000).toFixed(0)}k MT
                  </td>

                  <td className="py-2.5 px-3 text-gray-700 font-mono">
                    {vessel.draftMinM}m – {vessel.draftMaxM}m
                  </td>

                  <td className="py-2.5 px-3 text-gray-700 font-mono">
                    {vessel.loaMinM}m – {vessel.loaMaxM}m
                  </td>

                  <td className="py-2.5 px-3 text-gray-700 font-mono">
                    {vessel.beamMinM}m – {vessel.beamMaxM}m
                  </td>

                  <td className="py-2.5 px-3 font-mono">
                    <span className="font-semibold text-black text-[12px]">{vessel.typicalSpeedKnots} kn</span>
                    <span className="text-[10px] text-gray-500 block">{vessel.fuelConsumptionTonnesDay} MT/day</span>
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {vessel.typicalCargo.map(cargo => (
                        <span
                          key={cargo}
                          className="px-1.5 py-0.2 rounded-[2px] text-[10px] font-mono bg-white text-gray-700 border border-[#D0D0D0]"
                        >
                          {cargo}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      id={`btn-view-vessel-${vessel.id}`}
                      className="px-2.5 py-1 rounded-[4px] bg-white hover:bg-gray-50 border border-[#D0D0D0] text-black text-[11px] font-medium transition cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[6px] p-5 max-w-md w-full shadow-lg border border-[#D0D0D0] text-gray-900">
            <div className="flex items-center justify-between pb-3 border-b border-[#D0D0D0]">
              <div>
                <h3 className="font-semibold text-[15px] text-black uppercase tracking-wider">{selectedVessel.name} Specifications</h3>
                <p className="text-[11.5px] text-gray-500 font-mono">Dry Bulk Ocean Carrier Profile</p>
              </div>
              <button
                onClick={() => setSelectedVessel(null)}
                className="text-gray-500 hover:text-black text-sm font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-3.5 space-y-3 text-xs font-mono">
              <p className="text-gray-700 leading-relaxed text-[12px] font-sans">
                {selectedVessel.description}
              </p>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase">Draft Range</span>
                  <div className="font-bold text-black text-[13px] mt-0.5">{selectedVessel.draftMinM}m – {selectedVessel.draftMaxM}m</div>
                </div>
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase">LOA Range</span>
                  <div className="font-bold text-black text-[13px] mt-0.5">{selectedVessel.loaMinM}m – {selectedVessel.loaMaxM}m</div>
                </div>
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase">Beam Range</span>
                  <div className="font-bold text-black text-[13px] mt-0.5">{selectedVessel.beamMinM}m – {selectedVessel.beamMaxM}m</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase">Fuel Consumption (VLSFO)</span>
                  <div className="font-bold text-black text-[13px] mt-0.5">{selectedVessel.fuelConsumptionTonnesDay} MT / Day</div>
                </div>
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10px] uppercase font-sans">Daily Hire Baseline</span>
                  <div className="font-bold text-[#2E7D32] text-[13px] mt-0.5">${selectedVessel.dailyHireBaseUsd.toLocaleString()} <span className="text-gray-500 font-normal font-sans text-xs">/ Day</span></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedVessel(null)}
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
