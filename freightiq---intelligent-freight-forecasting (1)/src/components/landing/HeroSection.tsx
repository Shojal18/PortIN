import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Ship,
  Calendar,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Layers,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Newspaper
} from 'lucide-react';

interface HeroSectionProps {
  onEnterApp: () => void;
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterApp,
  onOpenDemo
}) => {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [vesselOffset, setVesselOffset] = useState<number>(35);

  useEffect(() => {
    const interval = setInterval(() => {
      setVesselOffset((prev) => (prev >= 90 ? 10 : prev + 2));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const partners = [
    { name: 'TATA STEEL', role: 'Raw Materials Desk' },
    { name: 'SAIL', role: 'Inbound Logistics' },
    { name: 'NTPC', role: 'Thermal Fuel Supply' },
    { name: 'ADANI PORTS', role: 'Deepwater Terminal' },
    { name: 'JSW STEEL', role: 'Maritime Chartering' },
    { name: 'OLDENDORFF', role: 'Bulk Carriers' },
    { name: 'BERGE BULK', role: 'Capesize Operations' },
    { name: 'RIO TINTO', role: 'Iron Ore Shipping' },
    { name: 'BHP', role: 'Met Coal Logistics' },
    { name: 'ANGLO AMERICAN', role: 'Bulk Trading' }
  ];

  const recentMedia = [
    {
      source: 'LLOYD\'S LIST',
      sourceColor: 'text-[#E05252]',
      title: 'Indian East Coast coal berths see surge in Supramax arrivals ahead of monsoon laycan windows.',
      linkText: 'Read analysis'
    },
    {
      source: 'TRADEWINDS',
      sourceColor: 'text-[#12A6A6]',
      title: 'Capesize iron ore fixture rates surge as Pacific demand widens spot chartering spreads.',
      linkText: 'Read analysis'
    },
    {
      source: 'STEELMINT',
      sourceColor: 'text-[#20B26B]',
      title: 'Draft constraints at Haldia prompt steel mills to expand Sandheads lighterage operations.',
      linkText: 'Read analysis'
    }
  ];

  const schematicRoutes = [
    {
      id: 'au-paradip',
      origin: 'Australia (Hay Point)',
      originShort: 'AU',
      dest: 'Paradip Port (Odisha)',
      destShort: 'PRT',
      distance: '4,850 NM',
      transit: '14.5 Days',
      cargo: 'Coking / Met Coal',
      vesselClass: 'Supramax / Panamax',
      spotRate: 19.72,
      forecastLow: 18.40,
      savingsPct: 6.8,
      window: 'OCT 12–26'
    },
    {
      id: 'us-dhamra',
      origin: 'United States (New Orleans)',
      originShort: 'US',
      dest: 'Dhamra Port (Odisha)',
      destShort: 'DHM',
      distance: '8,420 NM',
      transit: '26.8 Days',
      cargo: 'Thermal Coal',
      vesselClass: 'Capesize Deepwater',
      spotRate: 41.70,
      forecastLow: 39.50,
      savingsPct: 5.3,
      window: 'NOV 02–18'
    },
    {
      id: 'id-vizag',
      origin: 'Indonesia (Taboneo)',
      originShort: 'ID',
      dest: 'Visakhapatnam Port (A.P.)',
      destShort: 'VIZ',
      distance: '2,240 NM',
      transit: '7.2 Days',
      cargo: 'Steam Coal',
      vesselClass: 'Panamax',
      spotRate: 11.20,
      forecastLow: 10.45,
      savingsPct: 6.7,
      window: 'SEP 20–OCT 05'
    },
    {
      id: 'mz-paradip',
      origin: 'Mozambique (Maputo)',
      originShort: 'MZ',
      dest: 'Paradip Port (Odisha)',
      destShort: 'PRT',
      distance: '4,120 NM',
      transit: '13.0 Days',
      cargo: 'Met Coal / Anthracite',
      vesselClass: 'Supramax',
      spotRate: 24.30,
      forecastLow: 22.80,
      savingsPct: 6.2,
      window: 'OCT 18–NOV 02'
    },
    {
      id: 'ru-haldia',
      origin: 'Russia (Taman / Black Sea)',
      originShort: 'RU',
      dest: 'Haldia Dock (W.B.)',
      destShort: 'HAL',
      distance: '5,600 NM',
      transit: '18.2 Days',
      cargo: 'Thermal / PCI Coal',
      vesselClass: 'Handysize (<8.5m Draft)',
      spotRate: 34.50,
      forecastLow: 32.10,
      savingsPct: 7.0,
      window: 'OCT 05–19'
    }
  ];

  const activeRoute = schematicRoutes[selectedRouteIndex];

  return (
    <div className="relative bg-[#071522] overflow-hidden">
      {/* 1. TOP HERO BANNER: KPLER STYLE ("Intelligence at your fingertips") */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 border-b border-[#20384C]/60 text-center relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono uppercase tracking-widest text-[#E05252]">
            <Sparkles className="w-3.5 h-3.5 text-[#E05252]" />
            MARITIME FREIGHT INTELLIGENCE FOR INDIA
          </div>

          <h1 className="text-[38px] sm:text-[56px] lg:text-[68px] font-extrabold text-[#F2F6F8] tracking-tight uppercase leading-[1.06] font-sans">
            INTELLIGENCE AT YOUR
            <br />
            <span className="text-[#E05252]">FINGERTIPS.</span>
          </h1>

          <p className="text-[17px] sm:text-[21px] text-[#9BAFBE] font-sans font-light max-w-2xl mx-auto">
            Take advantage of dry-bulk freight opportunities in real time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              id="hero-request-demo-top-btn"
              onClick={onOpenDemo}
              className="px-8 py-4 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#E05252]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>REQUEST A DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEnterApp}
              className="px-8 py-4 rounded-[6px] bg-[#0D1B2A] hover:bg-[#102337] border border-[#20384C] text-white font-bold text-sm uppercase tracking-wider transition cursor-pointer"
            >
              EXPLORE PLATFORM
            </button>
          </div>
        </div>

        {/* 2. PARTNER / STAKEHOLDER LOGOS MARQUEE TICKER */}
        <div className="mt-14 pt-8 border-t border-[#20384C]/40 overflow-hidden">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9BAFBE] mb-4">
            TRUSTED BY PROCUREMENT LEADERS & DRY-BULK CHARTERERS
          </div>
          <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap opacity-75 hover:opacity-100 transition-opacity">
            {partners.map((p) => (
              <div key={p.name} className="flex flex-col items-center">
                <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-widest">
                  {p.name}
                </span>
                <span className="text-[9px] text-[#9BAFBE] font-mono">{p.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HIGH-IMPACT SUB-HERO STATEMENT (Kpler Style) */}
      <section className="py-16 sm:py-20 border-b border-[#20384C]/60 bg-[#0B1F33]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-[28px] sm:text-[42px] lg:text-[48px] font-bold text-[#F2F6F8] leading-[1.2] font-sans tracking-tight">
            PortIN unlocks <span className="text-[#E05252]">real-time insights</span> across Indian East Coast bulk corridors, empowering you to make decisions with <span className="text-[#12A6A6]">precision & confidence.</span>
          </h2>
        </div>
      </section>

      {/* 4. BIG METRIC STRIP (Matching Kpler: 300K+ / 1B+ / 2M+) */}
      <section className="py-10 sm:py-12 border-b border-[#20384C]/60 bg-[#071522]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {/* Metric 1 */}
            <div className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] text-center sm:text-left">
              <strong className="text-3xl sm:text-4xl font-bold font-mono text-white block">
                4,300+
              </strong>
              <span className="text-xs font-mono text-[#9BAFBE] uppercase tracking-wider mt-1 block">
                Vessels tracked / month
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] text-center sm:text-left">
              <strong className="text-3xl sm:text-4xl font-bold font-mono text-[#12A6A6] block">
                1.4B+ MT
              </strong>
              <span className="text-xs font-mono text-[#9BAFBE] uppercase tracking-wider mt-1 block">
                Cargo flows modeled / yr
              </span>
            </div>

            {/* Metric 3 */}
            <div className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] text-center sm:text-left">
              <strong className="text-3xl sm:text-4xl font-bold font-mono text-[#20B26B] block">
                240+
              </strong>
              <span className="text-xs font-mono text-[#9BAFBE] uppercase tracking-wider mt-1 block">
                Berth & draft matrices
              </span>
            </div>

            {/* Metric 4 */}
            <div className="p-6 rounded-[8px] bg-[#0D1B2A] border border-[#E05252] text-center sm:text-left relative overflow-hidden">
              <strong className="text-3xl sm:text-4xl font-bold font-mono text-[#E05252] block">
                8.4%
              </strong>
              <span className="text-xs font-mono text-white uppercase tracking-wider mt-1 block">
                Average freight savings
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECENTLY FEATURED IN... / LIVE MARKET INTELLIGENCE DISPATCH */}
      <section className="py-12 sm:py-16 border-b border-[#20384C]/60 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E05252]">
                RECENTLY FEATURED IN...
              </span>
              <h3 className="text-xl font-bold font-sans uppercase text-white mt-0.5">
                MARITIME INTELLIGENCE & MARKET DISPATCH
              </h3>
            </div>

            <button
              onClick={onEnterApp}
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#12A6A6] hover:text-white font-bold transition"
            >
              <span>MEDIA ROOM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentMedia.map((item) => (
              <div
                key={item.title}
                onClick={onEnterApp}
                className="p-6 rounded-[8px] bg-[#071522] border border-[#20384C] hover:border-[#E05252] transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider block mb-3 ${item.sourceColor}`}>
                    {item.source}
                  </span>
                  <h4 className="text-sm font-sans font-bold text-[#F2F6F8] group-hover:text-white leading-relaxed mb-4">
                    {item.title}
                  </h4>
                </div>

                <div className="pt-3 border-t border-[#20384C]/60 flex items-center gap-1 text-xs font-mono text-[#E05252] group-hover:translate-x-1 transition-transform">
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE MARITIME CORRIDOR SCHEMATIC & REAL-TIME PREVIEW */}
      <section className="py-14 sm:py-20 border-b border-[#20384C]/60 bg-[#071522]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="text-left space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6]">
                LIVE LOGISTICS SCHEMATIC
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans uppercase text-white">
                5 CRITICAL INDIAN EAST COAST DRY-BULK CORRIDORS
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#20B26B] animate-pulse" />
              <span className="text-xs font-mono text-[#9BAFBE]">Real-Time Vessel Telemetry</span>
            </div>
          </div>

          {/* Interactive Route Box */}
          <div className="p-6 rounded-[10px] bg-[#0D1B2A] border border-[#20384C] shadow-2xl space-y-6">
            {/* Route Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              {schematicRoutes.map((r, idx) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRouteIndex(idx)}
                  className={`p-2.5 rounded-[6px] text-center transition cursor-pointer ${
                    selectedRouteIndex === idx
                      ? 'bg-[#E05252] text-white font-bold shadow-md'
                      : 'bg-[#071522] border border-[#20384C] text-[#9BAFBE] hover:text-white'
                  }`}
                >
                  <strong className="block text-xs">{r.originShort} ➔ {r.destShort}</strong>
                  <span className="text-[10px] opacity-80">{r.cargo.split('/')[0]}</span>
                </button>
              ))}
            </div>

            {/* Route Corridor Flow Visualizer */}
            <div className="p-5 rounded-[8px] bg-[#071522] border border-[#20384C] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">ORIGIN PORT</span>
                  <strong className="text-base text-white">{activeRoute.origin}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">DESTINATION BERTH</span>
                  <strong className="text-base text-[#12A6A6]">{activeRoute.dest}</strong>
                </div>
              </div>

              {/* Animated Progress Line */}
              <div className="relative py-4">
                <div className="h-1 w-full bg-[#20384C] relative rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E05252] via-[#12A6A6] to-[#20B26B]" />
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
                  style={{ left: `${vesselOffset}%` }}
                >
                  <div className="px-2.5 py-1 rounded bg-[#102337] border border-[#12A6A6] text-[11px] font-mono text-white flex items-center gap-1.5 shadow-xl">
                    <Ship className="w-3.5 h-3.5 text-[#12A6A6]" />
                    <span>{activeRoute.distance}</span>
                  </div>
                </div>
              </div>

              {/* Metrics strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2">
                <div className="p-3 rounded bg-[#0D1B2A] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Current Spot</span>
                  <strong className="text-sm text-white">${activeRoute.spotRate.toFixed(2)}/MT</strong>
                </div>
                <div className="p-3 rounded bg-[#0D1B2A] border border-[#12A6A6]/40">
                  <span className="text-[10px] text-[#12A6A6] uppercase block font-bold">Forecast Low</span>
                  <strong className="text-sm text-[#12A6A6]">${activeRoute.forecastLow.toFixed(2)}/MT</strong>
                </div>
                <div className="p-3 rounded bg-[#0D1B2A] border border-[#20B26B]/40">
                  <span className="text-[10px] text-[#20B26B] uppercase block font-bold">Estimated Savings</span>
                  <strong className="text-sm text-[#20B26B]">Save {activeRoute.savingsPct}%</strong>
                </div>
                <div className="p-3 rounded bg-[#0D1B2A] border border-[#20384C]">
                  <span className="text-[10px] text-[#9BAFBE] uppercase block">Optimal Window</span>
                  <strong className="text-sm text-white">{activeRoute.window}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
