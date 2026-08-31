import React, { useState } from 'react';
import { Ship, CheckCircle2, XCircle, AlertCircle, Info, ChevronRight, Check, X } from 'lucide-react';

export const VesselIntelligenceSection: React.FC = () => {
  const [selectedPortId, setSelectedPortId] = useState<string>('paradip');

  const vesselClasses = [
    {
      name: 'HANDYSIZE',
      dwt: '30,000 – 40,000 DWT',
      draft: 10.0,
      loa: 180,
      beam: 28.0,
      cranes: 'Geared (4x30T)',
      bestFor: 'Shallow draught river ports like Haldia or smaller berths.'
    },
    {
      name: 'SUPRAMAX',
      dwt: '50,000 – 60,000 DWT',
      draft: 12.8,
      loa: 199,
      beam: 32.2,
      cranes: 'Geared (4x35T)',
      bestFor: 'Versatile bulk workhorse across Paradip, Vizag, and Gopalpur.'
    },
    {
      name: 'PANAMAX',
      dwt: '60,000 – 80,000 DWT',
      draft: 14.2,
      loa: 225,
      beam: 32.5,
      cranes: 'Gearless',
      bestFor: 'High-volume coal & grain imports to standard deepwater berths.'
    },
    {
      name: 'CAPESIZE',
      dwt: '100,000 – 180,000 DWT',
      draft: 17.8,
      loa: 290,
      beam: 45.0,
      cranes: 'Gearless',
      bestFor: 'Ultra-deep berths exclusively (Dhamra, Gangavaram deep berths).'
    }
  ];

  const testPorts = [
    {
      id: 'paradip',
      name: 'Paradip Port (Odisha)',
      maxDraft: 14.5,
      maxLoa: 250,
      maxBeam: 40.0,
      type: 'Major Deepwater Bulk Hub'
    },
    {
      id: 'dhamra',
      name: 'Dhamra Port (Odisha)',
      maxDraft: 18.0,
      maxLoa: 310,
      maxBeam: 48.0,
      type: 'Capesize Dedicated Terminal'
    },
    {
      id: 'haldia',
      name: 'Haldia Dock (W.B.)',
      maxDraft: 8.5,
      maxLoa: 210,
      maxBeam: 30.5,
      type: 'Riverine Tidal Lock Port'
    },
    {
      id: 'vizag',
      name: 'Visakhapatnam (A.P.)',
      maxDraft: 14.5,
      maxLoa: 230,
      maxBeam: 32.5,
      type: 'Natural Deepwater Harbour'
    }
  ];

  const activePort = testPorts.find((p) => p.id === selectedPortId) || testPorts[0];

  const checkFeasibility = (vDraft: number, vLoa: number, vBeam: number) => {
    const draftPass = vDraft <= activePort.maxDraft;
    const loaPass = vLoa <= activePort.maxLoa;
    const beamPass = vBeam <= activePort.maxBeam;
    const isPass = draftPass && loaPass && beamPass;

    let failReason = '';
    if (!draftPass) failReason = `Draft (${vDraft}m > ${activePort.maxDraft}m limit)`;
    else if (!loaPass) failReason = `LOA (${vLoa}m > ${activePort.maxLoa}m limit)`;
    else if (!beamPass) failReason = `Beam (${vBeam}m > ${activePort.maxBeam}m limit)`;

    return { isPass, failReason, draftMargin: (activePort.maxDraft - vDraft).toFixed(1) };
  };

  return (
    <section id="vessel-intelligence" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
            NAUTICAL COMPATIBILITY ENGINE
          </div>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
            THE CHEAPEST VESSEL
            <br />
            <span className="text-[#12A6A6]">ISN'T ALWAYS THE RIGHT VESSEL.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#9BAFBE] leading-[1.65] font-sans">
            PortIN checks vessel dimensions against destination-port physical constraints before recommending a vessel. Never book a fixture that gets stranded at the anchorage.
          </p>
        </div>

        {/* 4 Vessel Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {vesselClasses.map((v) => (
            <div
              key={v.name}
              className="p-5 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] flex flex-col justify-between hover:border-[#12A6A6]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#20384C]">
                  <span className="text-[14px] font-bold text-[#F2F6F8] font-mono">{v.name}</span>
                  <span className="p-1.5 rounded bg-[#071522] text-[#12A6A6] border border-[#20384C]">
                    <Ship className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="text-[12px] font-mono text-[#12A6A6] font-semibold mb-3">
                  {v.dwt}
                </div>
                <div className="space-y-1 text-xs font-mono text-[#9BAFBE] mb-4">
                  <div className="flex justify-between">
                    <span>Draft (Fully Laden):</span>
                    <strong className="text-[#F2F6F8]">{v.draft} m</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Length (LOA):</span>
                    <strong className="text-[#F2F6F8]">{v.loa} m</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Beam:</span>
                    <strong className="text-[#F2F6F8]">{v.beam} m</strong>
                  </div>
                </div>
              </div>
              <p className="text-[11.5px] text-[#9BAFBE] leading-relaxed pt-3 border-t border-[#20384C]">
                {v.bestFor}
              </p>
            </div>
          ))}
        </div>

        {/* Vessel-Port Fit Live Demonstration */}
        <div className="p-6 sm:p-8 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#20384C]">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#12A6A6] block">
                INTERACTIVE CONSTRAINT DEMO
              </span>
              <h3 className="text-[20px] font-bold text-[#F2F6F8] font-sans mt-0.5">
                Vessel-to-Port Physical Berthing Feasibility
              </h3>
            </div>

            {/* Port Selection Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#9BAFBE]">Select Destination Port:</span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {testPorts.map((port) => (
                  <button
                    key={port.id}
                    onClick={() => setSelectedPortId(port.id)}
                    className={`px-3 py-1.5 rounded-[4px] border transition cursor-pointer ${
                      selectedPortId === port.id
                        ? 'bg-[#12A6A6] text-white border-[#12A6A6] font-bold'
                        : 'bg-[#071522] text-[#9BAFBE] border-[#20384C] hover:text-white'
                    }`}
                  >
                    {port.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Port Physical Constraints Header */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-4 my-2 font-mono text-xs bg-[#071522] p-4 rounded-[6px] border border-[#20384C]">
            <div>
              <span className="text-[10.5px] text-[#9BAFBE] uppercase block">Selected Destination</span>
              <strong className="text-[14px] text-[#F2F6F8]">{activePort.name}</strong>
            </div>
            <div>
              <span className="text-[10.5px] text-[#9BAFBE] uppercase block">Max Allowable Draft</span>
              <strong className="text-[14px] text-[#12A6A6]">{activePort.maxDraft} m</strong>
            </div>
            <div>
              <span className="text-[10.5px] text-[#9BAFBE] uppercase block">Max Vessel LOA</span>
              <strong className="text-[14px] text-[#F2F6F8]">{activePort.maxLoa} m</strong>
            </div>
            <div>
              <span className="text-[10.5px] text-[#9BAFBE] uppercase block">Max Beam</span>
              <strong className="text-[14px] text-[#F2F6F8]">{activePort.maxBeam} m</strong>
            </div>
          </div>

          {/* Feasibility Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {vesselClasses.map((vc) => {
              const res = checkFeasibility(vc.draft, vc.loa, vc.beam);
              return (
                <div
                  key={vc.name}
                  className={`p-4 rounded-[6px] border transition-all ${
                    res.isPass
                      ? 'bg-[#071522] border-[#20B26B]/50 shadow-sm shadow-[#20B26B]/10'
                      : 'bg-[#071522] border-[#E05252]/50 opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#20384C]">
                    <span className="font-mono font-bold text-sm text-[#F2F6F8]">{vc.name}</span>
                    {res.isPass ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#20B26B]/15 text-[#20B26B] border border-[#20B26B]/40 flex items-center gap-1">
                        <Check className="w-3 h-3" /> FEASIBLE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#E05252]/15 text-[#E05252] border border-[#E05252]/40 flex items-center gap-1">
                        <X className="w-3 h-3" /> NOT FEASIBLE
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[#9BAFBE]">
                      <span>Draft:</span>
                      <span className={vc.draft > activePort.maxDraft ? 'text-[#E05252] font-bold' : 'text-[#20B26B]'}>
                        {vc.draft}m {vc.draft > activePort.maxDraft ? `(>${activePort.maxDraft}m)` : `(Margin +${res.draftMargin}m)`}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#9BAFBE]">
                      <span>LOA / Beam:</span>
                      <span className="text-[#F2F6F8]">{vc.loa}m / {vc.beam}m</span>
                    </div>
                  </div>

                  {!res.isPass && (
                    <div className="mt-3 pt-2 border-t border-[#20384C] text-[11px] font-mono text-[#E05252] font-semibold">
                      REASON: EXCEEDS PORT CONSTRAINTS
                      <div className="text-[10px] text-[#9BAFBE] font-normal">{res.failReason}</div>
                    </div>
                  )}

                  {res.isPass && (
                    <div className="mt-3 pt-2 border-t border-[#20384C] text-[11px] font-mono text-[#20B26B]">
                      ✓ Fully compliant with berth draught limits
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
