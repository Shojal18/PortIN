import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Ship, Calendar, DollarSign, RefreshCw, Layers } from 'lucide-react';

interface InteractiveDemoSectionProps {
  onEnterApp: () => void;
}

export const InteractiveDemoSection: React.FC<InteractiveDemoSectionProps> = ({ onEnterApp }) => {
  // Demo State Inputs
  const [origin, setOrigin] = useState<string>('Australia');
  const [destination, setDestination] = useState<string>('Paradip');
  const [cargo, setCargo] = useState<string>('Thermal Coal');
  const [volumeMt, setVolumeMt] = useState<number>(120000);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('INR');

  // Rates exchange table
  const fxRates: Record<string, { rate: number; symbol: string }> = {
    INR: { rate: 83.0, symbol: '₹' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.79, symbol: '£' },
    AED: { rate: 3.67, symbol: 'AED ' },
    SGD: { rate: 1.34, symbol: 'S$' },
    AUD: { rate: 1.52, symbol: 'A$' }
  };

  // Dynamic simulation engine based on selection
  const computeDecision = () => {
    if (destination === 'Haldia') {
      return {
        forecastLow: 32.10,
        currentSpot: 34.50,
        vessel: 'HANDYSIZE',
        window: 'OCT 05–19',
        portFit: '✓ PASS (<8.5m Draft)',
        riskLevel: 'LOW',
        riskColor: 'text-[#20B26B]',
        riskBg: 'bg-[#20B26B]/15 border-[#20B26B]/40',
        savingsPct: 7.0
      };
    }
    if (destination === 'Dhamra') {
      return {
        forecastLow: 39.50,
        currentSpot: 41.70,
        vessel: 'CAPESIZE (DEEPWATER)',
        window: 'NOV 02–18',
        portFit: '✓ PASS (18.0m Depth)',
        riskLevel: 'LOW',
        riskColor: 'text-[#20B26B]',
        riskBg: 'bg-[#20B26B]/15 border-[#20B26B]/40',
        savingsPct: 5.3
      };
    }
    if (origin === 'Indonesia') {
      return {
        forecastLow: 10.45,
        currentSpot: 11.20,
        vessel: 'PANAMAX',
        window: 'SEP 20–OCT 05',
        portFit: '✓ PASS',
        riskLevel: 'LOW',
        riskColor: 'text-[#20B26B]',
        riskBg: 'bg-[#20B26B]/15 border-[#20B26B]/40',
        savingsPct: 6.7
      };
    }
    // Default Australia -> Paradip
    return {
      forecastLow: 18.40,
      currentSpot: 19.72,
      vessel: 'SUPRAMAX',
      window: 'OCT 12–26',
      portFit: '✓ PASS',
      riskLevel: 'MEDIUM',
      riskColor: 'text-[#D8891A]',
      riskBg: 'bg-[#D8891A]/15 border-[#D8891A]/40',
      savingsPct: 6.8
    };
  };

  const decision = computeDecision();
  const currentFx = fxRates[selectedCurrency] || fxRates.INR;
  const convertedForecastLow = (decision.forecastLow * currentFx.rate).toFixed(2);

  return (
    <section id="interactive-demo" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl text-left">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
            LIVE PROTOTYPE INTERACTIVE SIMULATOR
          </div>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
            TRY A PORTIN DECISION.
          </h2>
          <p className="mt-4 text-[16px] text-[#9BAFBE] leading-[1.65] font-sans">
            Configure origin, destination port, cargo type, and parcel volume to preview deterministic vessel feasibility and forward freight outlooks in real time.
          </p>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Inputs (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#20384C]">
              <span className="text-xs font-mono font-bold text-[#F2F6F8] uppercase">
                1. CONFIGURE VOYAGE PARAMETERS
              </span>
              <span className="text-[10px] font-mono text-[#12A6A6]">INPUTS</span>
            </div>

            {/* Origin */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9BAFBE] uppercase block">
                Origin Loading Port:
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#071522] border border-[#20384C] text-sm text-[#F2F6F8] font-mono focus:border-[#12A6A6] outline-hidden cursor-pointer"
              >
                <option value="Australia">Australia (Hay Point / Gladstone)</option>
                <option value="United States">United States (Hampton Roads / Gulf)</option>
                <option value="Indonesia">Indonesia (Taboneo / Samarinda)</option>
                <option value="Mozambique">Mozambique (Maputo / Beira)</option>
                <option value="Russia">Russia (Taman / Ust-Luga)</option>
              </select>
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9BAFBE] uppercase block">
                Destination East Coast Port:
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#071522] border border-[#20384C] text-sm text-[#F2F6F8] font-mono focus:border-[#12A6A6] outline-hidden cursor-pointer"
              >
                <option value="Paradip">Paradip Port (Odisha - Max 14.5m Draft)</option>
                <option value="Dhamra">Dhamra Port (Odisha - Max 18.0m Draft)</option>
                <option value="Vizag">Visakhapatnam Port (A.P. - Max 14.5m Draft)</option>
                <option value="Haldia">Haldia Dock (W.B. - Max 8.5m Draft Lock)</option>
                <option value="Gangavaram">Gangavaram Port (A.P. - Max 18.5m Draft)</option>
              </select>
            </div>

            {/* Cargo Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9BAFBE] uppercase block">
                Bulk Cargo Type:
              </label>
              <select
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#071522] border border-[#20384C] text-sm text-[#F2F6F8] font-mono focus:border-[#12A6A6] outline-hidden cursor-pointer"
              >
                <option value="Thermal Coal">Thermal Coal</option>
                <option value="Coking Coal">Coking / Metallurgical Coal</option>
                <option value="Iron Ore">Iron Ore Pellets / Fines</option>
                <option value="Limestone">Limestone / Dolomite Flux</option>
              </select>
            </div>

            {/* Parcel Volume */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-[#9BAFBE]">
                <span>Cargo Volume:</span>
                <strong className="text-[#12A6A6]">{volumeMt.toLocaleString()} MT</strong>
              </div>
              <input
                type="range"
                min={30000}
                max={180000}
                step={5000}
                value={volumeMt}
                onChange={(e) => setVolumeMt(Number(e.target.value))}
                className="w-full accent-[#12A6A6] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#9BAFBE]">
                <span>30k MT (Handy)</span>
                <span>75k MT (Panamax)</span>
                <span>180k MT (Capesize)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Decision Output Card (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-[8px] bg-[#0B1F33] border border-[#12A6A6] shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#20384C]">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#12A6A6]">
                    PORTIN DECISION ENGINE OUTPUT
                  </span>
                  <h3 className="text-xl font-bold text-[#F2F6F8] font-sans mt-0.5">
                    {origin} ➔ {destination} ({cargo})
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#20B26B]/15 text-[#20B26B] border border-[#20B26B]/40">
                  {decision.portFit}
                </span>
              </div>

              {/* Core 4 Result Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono mb-6">
                <div className="p-3.5 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Forecast Low</span>
                  <strong className="text-[17px] text-[#2E7D32] block mt-0.5">
                    ${decision.forecastLow.toFixed(2)}
                  </strong>
                  <span className="text-[10px] text-[#20B26B]">Save {decision.savingsPct}% vs Spot</span>
                </div>

                <div className="p-3.5 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Recommended Vessel</span>
                  <strong className="text-[14px] text-[#F2F6F8] block mt-1">
                    {decision.vessel}
                  </strong>
                  <span className="text-[10px] text-[#9BAFBE]">Optimal DWT</span>
                </div>

                <div className="p-3.5 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Charter Window</span>
                  <strong className="text-[14px] text-[#F2F6F8] block mt-1">
                    {decision.window}
                  </strong>
                  <span className="text-[10px] text-[#12A6A6]">14-Day Optimal Entry</span>
                </div>

                <div className="p-3.5 rounded bg-[#071522] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Operational Risk</span>
                  <strong className={`text-[14px] block mt-1 ${decision.riskColor}`}>
                    {decision.riskLevel} RISK
                  </strong>
                  <span className="text-[10px] text-[#9BAFBE]">Congestion / Vol</span>
                </div>
              </div>

              {/* Economic Summary Banner */}
              <div className="p-4 rounded-[6px] bg-[#071522] border border-[#20384C] mb-6 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[#9BAFBE] block text-[11px]">Total Estimated Voyage Savings:</span>
                  <strong className="text-[#2E7D32] text-[16px]">
                    ${((decision.currentSpot - decision.forecastLow) * volumeMt).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-gray-400 text-xs font-normal">USD</span>
                  </strong>
                </div>
                <div className="text-right sm:border-l sm:border-[#20384C] sm:pl-4">
                  <span className="text-[#9BAFBE] block text-[11px]">Physical Berth Compliance:</span>
                  <span className="text-[#20B26B] font-bold">100% Guaranteed Fit</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              id="btn-open-full-forecast"
              onClick={onEnterApp}
              className="w-full py-3.5 rounded-[6px] bg-[#087F8C] hover:bg-[#12A6A6] text-white text-[14px] font-bold tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>OPEN FULL FORECAST IN TERMINAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SECTION 29: MULTI-CURRENCY FREIGHT VIEW */}
        <div className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#12A6A6]">
                GLOBAL LOCALIZATION
              </span>
              <span className="text-[9.5px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#102337] text-[#9BAFBE] border border-[#20384C]">
                INDICATIVE / DEMO FX
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F2F6F8] font-sans">
              MULTI-CURRENCY FREIGHT VIEW
            </h3>
            <p className="text-xs text-[#9BAFBE] leading-relaxed font-sans">
              While primary maritime charter calculations operate in USD/MT, PortIN provides real-time converted landed values in INR (₹), EUR (€), GBP (£), AED, SGD, and AUD for regional procurement teams.
            </p>
          </div>

          {/* Interactive Currency Switcher Pill */}
          <div className="flex flex-col items-start sm:items-end gap-2 font-mono">
            <div className="flex flex-wrap gap-1 bg-[#071522] p-1 rounded-[6px] border border-[#20384C]">
              {Object.keys(fxRates).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-2.5 py-1 text-xs rounded-[4px] transition cursor-pointer ${
                    selectedCurrency === curr
                      ? 'bg-[#12A6A6] text-white font-bold'
                      : 'text-[#9BAFBE] hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#9BAFBE] block">
                <span className="text-[#2E7D32]">${decision.forecastLow.toFixed(2)}</span> USD/MT ≈
              </span>
              <strong className="text-[18px] text-[#2E7D32]">
                {currentFx.symbol}{convertedForecastLow} <span className="text-gray-400 font-normal text-xs">/ MT</span>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
