import React, { useState } from 'react';
import { Anchor, Navigation, ArrowRight, ShieldCheck, Waves, Info } from 'lucide-react';

export const PortIntelligenceSection: React.FC = () => {
  const [selectedPortId, setSelectedPortId] = useState<string>('paradip');

  const eastCoastPorts = [
    {
      id: 'paradip',
      name: 'PARADIP PORT',
      state: 'Odisha',
      type: 'Major Deepwater Bulk Hub',
      draft: '14.5 m',
      loa: '260 m',
      beam: '36.0 m',
      dischargeRate: '45,000 MT/Day',
      cargoes: 'Coking Coal, Thermal Coal, Iron Ore, Fluxes',
      berths: 'Mechanised Coal Berths, Central Quay, South Quay'
    },
    {
      id: 'vizag',
      name: 'VISAKHAPATNAM (VIZAG)',
      state: 'Andhra Pradesh',
      type: 'Natural Deepwater Harbour',
      draft: '14.5 m (Inner) / 18.1 m (Outer)',
      loa: '230 m / 300 m',
      beam: '32.5 m / 45.0 m',
      dischargeRate: '35,000 MT/Day',
      cargoes: 'Manganese, Coking Coal, Gypsum, Bauxite',
      berths: 'General Cargo Berth, Outer Harbour Deep Berths'
    },
    {
      id: 'gangavaram',
      name: 'GANGAVARAM PORT',
      state: 'Andhra Pradesh',
      type: 'Ultra Deepwater Private Terminal',
      draft: '18.5 m',
      loa: '300 m',
      beam: '45.0 m',
      dischargeRate: '50,000 MT/Day',
      cargoes: 'Steam Coal, Met Coal, Limestone',
      berths: 'Deepwater Bulk Multipurpose Berths'
    },
    {
      id: 'gopalpur',
      name: 'GOPALPUR PORT',
      state: 'Odisha',
      type: 'All-Weather Commercial Port',
      draft: '12.5 m',
      loa: '225 m',
      beam: '32.2 m',
      dischargeRate: '25,000 MT/Day',
      cargoes: 'Coal, Ilmenite Sand, Clinker, Fertilizer',
      berths: 'Berth 1 & Berth 2 Handymax/Supramax'
    },
    {
      id: 'dhamra',
      name: 'DHAMRA PORT',
      state: 'Odisha',
      type: 'Capesize Dedicated Bulk Terminal',
      draft: '18.0 m',
      loa: '310 m',
      beam: '48.0 m',
      dischargeRate: '60,000 MT/Day',
      cargoes: 'Heavy Coking Coal, Thermal Coal, Limestone',
      berths: 'Dedicated Capesize Berths with High-speed Shiploaders'
    },
    {
      id: 'sagar',
      name: 'SAGAR–SANDHEADS',
      state: 'West Bengal',
      type: 'Offshore Lighterage Anchorage',
      draft: '14.0 m (Open Roadstead)',
      loa: '250 m',
      beam: '35.0 m',
      dischargeRate: '20,000 MT/Day (Transshipment)',
      cargoes: 'Coal Lighterage for Haldia/Kolkata Feeder Barges',
      berths: 'Deepwater Anchorage Transshipment Points'
    },
    {
      id: 'haldia',
      name: 'HALDIA DOCK COMPLEX',
      state: 'West Bengal',
      type: 'Riverine Tidal Lock Port (Hooghly)',
      draft: '8.5 m (Tide Constrained)',
      loa: '210 m',
      beam: '30.5 m',
      dischargeRate: '18,000 MT/Day',
      cargoes: 'Thermal Coal, Petcoke, Rock Phosphate',
      berths: 'Lock Gate Entrance Berths (Handysize only)'
    }
  ];

  const incomingOrigins = [
    { name: 'Australia (Queensland / NSW)', cargo: 'Coking / Met Coal', distance: '4,850 NM', primaryPorts: 'Paradip, Dhamra, Vizag' },
    { name: 'United States (East / Gulf Coast)', cargo: 'Coking / Thermal Coal', distance: '8,420 NM', primaryPorts: 'Dhamra, Gangavaram' },
    { name: 'Indonesia (Kalimantan / Sumatra)', cargo: 'Low-ash Steam Coal', distance: '2,240 NM', primaryPorts: 'Vizag, Haldia, Gopalpur' },
    { name: 'Mozambique (Maputo / Beira)', cargo: 'Met Coal & Anthracite', distance: '4,120 NM', primaryPorts: 'Paradip, Vizag' },
    { name: 'Russia (Black Sea / Baltic)', cargo: 'Thermal Coal & Fertilizer', distance: '5,600 NM', primaryPorts: 'Haldia, Paradip' }
  ];

  const activePort = eastCoastPorts.find((p) => p.id === selectedPortId) || eastCoastPorts[0];

  return (
    <section id="port-intelligence" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
            EAST COAST MARITIME DIRECTORY
          </div>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
            KNOW THE PORT
            <br />
            <span className="text-[#12A6A6]">BEFORE YOU CHARTER THE VESSEL.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#9BAFBE] leading-[1.65] font-sans">
            Explore India's East Coast dry-bulk network. Verify draft ceilings, maximum vessel length overall (LOA), beam clearances, and guaranteed daily discharge rates.
          </p>
        </div>

        {/* Schematic Network Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (5 cols): 7 East Coast Ports Interactive List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono font-bold text-[#9BAFBE] uppercase pb-2 flex items-center justify-between">
              <span>7 EAST COAST PORTS</span>
              <span>STATE</span>
            </div>

            {eastCoastPorts.map((port) => (
              <button
                key={port.id}
                onClick={() => setSelectedPortId(port.id)}
                className={`w-full text-left p-3.5 rounded-[6px] border transition-all flex items-center justify-between cursor-pointer ${
                  selectedPortId === port.id
                    ? 'bg-[#0D1B2A] border-[#12A6A6] shadow-md text-white'
                    : 'bg-[#071522] border-[#20384C] text-[#9BAFBE] hover:text-white hover:bg-[#0B1F33]'
                }`}
              >
                <div>
                  <strong className="block text-sm font-mono font-bold">{port.name}</strong>
                  <span className="text-xs text-[#9BAFBE]">{port.type}</span>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-[#12A6A6] font-semibold block">{port.draft} draft</span>
                  <span className="text-[11px] text-[#9BAFBE]">{port.state}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column (7 cols): Selected Port Detailed Specifications + Major Inflow Corridors */}
          <div className="lg:col-span-7 space-y-6">
            {/* Selected Port Physical Limits Card */}
            <div className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#20384C]">
                <div>
                  <span className="text-[11px] font-mono text-[#12A6A6] uppercase font-bold">PORT SPECIFICATION</span>
                  <h3 className="text-[22px] font-bold text-[#F2F6F8] font-mono">{activePort.name}</h3>
                  <span className="text-xs text-[#9BAFBE]">{activePort.state}, India • {activePort.type}</span>
                </div>
                <div className="p-2.5 rounded bg-[#071522] border border-[#20384C] text-[#12A6A6]">
                  <Anchor className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs mb-5">
                <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Max Draft</span>
                  <strong className="text-[15px] text-[#12A6A6]">{activePort.draft}</strong>
                </div>
                <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Max LOA</span>
                  <strong className="text-[15px] text-[#F2F6F8]">{activePort.loa}</strong>
                </div>
                <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Max Beam</span>
                  <strong className="text-[15px] text-[#F2F6F8]">{activePort.beam}</strong>
                </div>
                <div className="p-3 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Discharge Rate</span>
                  <strong className="text-[13px] text-[#20B26B]">{activePort.dischargeRate}</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-[#9BAFBE]">
                <div>
                  <span className="text-[#F2F6F8] font-semibold">Berths & Infrastructure:</span> {activePort.berths}
                </div>
                <div>
                  <span className="text-[#F2F6F8] font-semibold">Primary Cargo Inflow:</span> {activePort.cargoes}
                </div>
              </div>
            </div>

            {/* Inflow Corridors Network */}
            <div className="p-5 rounded-[8px] bg-[#0D1B2A] border border-[#20384C]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#20384C]">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F2F6F8]">
                  INCOMING GLOBAL SUPPLY HUBS ➔ INDIA EAST COAST
                </span>
                <span className="text-[10px] font-mono text-[#9BAFBE]">SCHEMATIC NETWORK</span>
              </div>

              <div className="space-y-2.5">
                {incomingOrigins.map((orig) => (
                  <div
                    key={orig.name}
                    className="p-2.5 rounded bg-[#071522] border border-[#20384C] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono"
                  >
                    <div>
                      <strong className="text-[#F2F6F8]">{orig.name}</strong>
                      <span className="text-[11px] text-[#9BAFBE] block sm:inline sm:ml-2">({orig.cargo})</span>
                    </div>
                    <div className="text-right text-[#12A6A6]">
                      <span>{orig.distance}</span>
                      <span className="text-[10px] text-[#9BAFBE] block">➔ {orig.primaryPorts}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
