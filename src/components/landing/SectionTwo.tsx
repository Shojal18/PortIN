import React, { useState } from 'react';
import {
  Ship,
  Navigation,
  Compass,
  Layers,
  MapPin,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Crosshair,
  FileSpreadsheet,
  Maximize2,
  Gauge
} from 'lucide-react';
import { NavTab } from '../../types';

export interface FleetShipData {
  id: string;
  name: string;
  vesselClass: 'Supramax' | 'Capesize' | 'Handysize' | 'Panamax';
  classDescription: string;
  imo: string;
  builtYear: number;
  dwtCapacityMt: number;
  teuEquivalent: number;
  occupiedMt: number;
  availableMt: number;
  utilizationPct: number;
  status: 'In Transit' | 'Loading at Berth' | 'Approaching Anchorage' | 'Docked & Discharging';
  statusColor: string;
  currentSpeedKnots: number;
  typicalSpeedKnots: number;
  fuelConsumptionMtDay: number;
  dailyHireUsd: number;
  loaM: number;
  beamM: number;
  draftM: number;
  holdsCount: number;
  cranesCount: number;
  craneSpec: string;
  originPort: {
    name: string;
    code: string;
    country: string;
    lat: number;
    lng: number;
    latStr: string;
    lngStr: string;
  };
  destinationPort: {
    name: string;
    code: string;
    country: string;
    lat: number;
    lng: number;
    latStr: string;
    lngStr: string;
  };
  currentPosition: {
    name: string;
    lat: number;
    lng: number;
    latStr: string;
    lngStr: string;
    progressPct: number;
    distanceCoveredNm: number;
    totalDistanceNm: number;
    eta: string;
  };
  routeWaypoints: Array<{ lat: number; lng: number }>;
  cargoBreakdown: Array<{
    category: string;
    tonnageMt: number;
    pct: number;
    color: string;
  }>;
}

export const PORTIN_FLEET_SHIPS: FleetShipData[] = [
  {
    id: 'ship-01',
    name: 'MV Odisha Pioneer',
    vesselClass: 'Supramax',
    classDescription: 'Geared Dry Bulk Carrier with 4x 30t Electro-Hydraulic Cranes',
    imo: 'IMO 9842109',
    builtYear: 2021,
    dwtCapacityMt: 64000,
    teuEquivalent: 3200,
    occupiedMt: 60000,
    availableMt: 4000,
    utilizationPct: 93.8,
    status: 'In Transit',
    statusColor: '#52796A',
    currentSpeedKnots: 13.4,
    typicalSpeedKnots: 13.5,
    fuelConsumptionMtDay: 24.0,
    dailyHireUsd: 14200,
    loaM: 200,
    beamM: 32.3,
    draftM: 13.0,
    holdsCount: 5,
    cranesCount: 4,
    craneSpec: '4x 30t Cranes + 12m³ Grabs',
    originPort: {
      name: 'Hay Point Terminal',
      code: 'AUHPT',
      country: 'Australia',
      lat: -21.28,
      lng: 149.30,
      latStr: '21.28° S',
      lngStr: '149.30° E',
    },
    destinationPort: {
      name: 'Paradip Deep Port',
      code: 'INPRT',
      country: 'India',
      lat: 20.26,
      lng: 86.67,
      latStr: '20.26° N',
      lngStr: '86.67° E',
    },
    currentPosition: {
      name: 'Bay of Bengal Shipping Corridor',
      lat: 12.50,
      lng: 85.20,
      latStr: '12.50° N',
      lngStr: '85.20° E',
      progressPct: 68,
      distanceCoveredNm: 3300,
      totalDistanceNm: 4850,
      eta: 'Oct 16, 2026',
    },
    routeWaypoints: [
      { lat: -21.28, lng: 149.30 }, // Hay Point
      { lat: -10.50, lng: 142.20 }, // Torres Strait
      { lat: -8.50, lng: 126.00 },  // Timor Sea
      { lat: -8.70, lng: 115.70 },  // Lombok Strait
      { lat: 5.80, lng: 95.30 },    // North Sumatra / Andaman
      { lat: 12.50, lng: 85.20 },   // Current Bay of Bengal
      { lat: 20.26, lng: 86.67 },   // Paradip
    ],
    cargoBreakdown: [
      { category: 'Coal – Thermal', tonnageMt: 60000, pct: 93.8, color: '#52796A' },
      { category: 'Hold Margin (Unallocated)', tonnageMt: 4000, pct: 6.2, color: '#BAC5AC' },
    ],
  },
  {
    id: 'ship-02',
    name: 'MV Dhamra Express',
    vesselClass: 'Capesize',
    classDescription: 'Ultra-Large Deepwater Bulk Carrier (Gearless Gantry Discharge)',
    imo: 'IMO 9791402',
    builtYear: 2020,
    dwtCapacityMt: 180000,
    teuEquivalent: 9000,
    occupiedMt: 180000,
    availableMt: 0,
    utilizationPct: 100.0,
    status: 'Loading at Berth',
    statusColor: '#212528',
    currentSpeedKnots: 0.0,
    typicalSpeedKnots: 14.5,
    fuelConsumptionMtDay: 42.0,
    dailyHireUsd: 22500,
    loaM: 292,
    beamM: 45.0,
    draftM: 18.5,
    holdsCount: 9,
    cranesCount: 0,
    craneSpec: 'Gearless (Port Gantry Dependent)',
    originPort: {
      name: 'Hay Point Terminal',
      code: 'AUHPT',
      country: 'Australia',
      lat: -21.28,
      lng: 149.30,
      latStr: '21.28° S',
      lngStr: '149.30° E',
    },
    destinationPort: {
      name: 'Dhamra Deep Port',
      code: 'INDHR',
      country: 'India',
      lat: 20.82,
      lng: 86.97,
      latStr: '20.82° N',
      lngStr: '86.97° E',
    },
    currentPosition: {
      name: 'Dalrymple Bay Berth #3',
      lat: -21.25,
      lng: 149.25,
      latStr: '21.25° S',
      lngStr: '149.25° E',
      progressPct: 24,
      distanceCoveredNm: 1170,
      totalDistanceNm: 4890,
      eta: 'Oct 21, 2026',
    },
    routeWaypoints: [
      { lat: -21.28, lng: 149.30 }, // Hay Point
      { lat: -10.50, lng: 142.20 }, // Torres Strait
      { lat: -8.50, lng: 126.00 },  // Timor Sea
      { lat: -8.70, lng: 115.70 },  // Lombok Strait
      { lat: 5.80, lng: 95.30 },    // North Sumatra
      { lat: 15.00, lng: 88.00 },   // East Bay of Bengal
      { lat: 20.82, lng: 86.97 },   // Dhamra
    ],
    cargoBreakdown: [
      { category: 'Coal – Thermal', tonnageMt: 140000, pct: 77.8, color: '#52796A' },
      { category: 'Iron Ore Fines', tonnageMt: 40000, pct: 22.2, color: '#BAC5AC' },
    ],
  },
  {
    id: 'ship-03',
    name: 'MV Bengal Trader',
    vesselClass: 'Handysize',
    classDescription: 'Versatile Geared Riverine Bulk Carrier (Draft Restricted Compliant)',
    imo: 'IMO 9651890',
    builtYear: 2019,
    dwtCapacityMt: 38000,
    teuEquivalent: 1900,
    occupiedMt: 34200,
    availableMt: 3800,
    utilizationPct: 90.0,
    status: 'Approaching Anchorage',
    statusColor: '#52796A',
    currentSpeedKnots: 11.8,
    typicalSpeedKnots: 13.0,
    fuelConsumptionMtDay: 19.5,
    dailyHireUsd: 11500,
    loaM: 180,
    beamM: 28.5,
    draftM: 10.5,
    holdsCount: 5,
    cranesCount: 4,
    craneSpec: '4x 25t Cranes + Grab Buckets',
    originPort: {
      name: 'Taboneo Anchorage',
      code: 'IDTBN',
      country: 'Indonesia',
      lat: -3.73,
      lng: 114.46,
      latStr: '3.73° S',
      lngStr: '114.46° E',
    },
    destinationPort: {
      name: 'Haldia Dock Complex',
      code: 'INHAL',
      country: 'India',
      lat: 22.02,
      lng: 88.06,
      latStr: '22.02° N',
      lngStr: '88.06° E',
    },
    currentPosition: {
      name: 'Sandheads Lighterage Zone',
      lat: 21.65,
      lng: 88.05,
      latStr: '21.65° N',
      lngStr: '88.05° E',
      progressPct: 92,
      distanceCoveredNm: 2150,
      totalDistanceNm: 2340,
      eta: 'Sep 02, 2026',
    },
    routeWaypoints: [
      { lat: -3.73, lng: 114.46 }, // Taboneo Kalimantan
      { lat: 1.25, lng: 104.20 },  // Singapore Strait
      { lat: 5.50, lng: 97.00 },   // Malacca Strait
      { lat: 10.00, lng: 92.50 },  // Andaman Corridor
      { lat: 21.65, lng: 88.05 },  // Sandheads
      { lat: 22.02, lng: 88.06 },  // Haldia Dock
    ],
    cargoBreakdown: [
      { category: 'Coal – Thermal', tonnageMt: 22000, pct: 64.3, color: '#52796A' },
      { category: 'Fertilizer (NPK)', tonnageMt: 12200, pct: 35.7, color: '#BAC5AC' },
    ],
  },
  {
    id: 'ship-04',
    name: 'MV East Coast Star',
    vesselClass: 'Panamax',
    classDescription: 'High-Volume Gearless Mineral & Coking Coal Carrier',
    imo: 'IMO 9811234',
    builtYear: 2022,
    dwtCapacityMt: 82000,
    teuEquivalent: 4100,
    occupiedMt: 76000,
    availableMt: 6000,
    utilizationPct: 92.7,
    status: 'Docked & Discharging',
    statusColor: '#212528',
    currentSpeedKnots: 0.0,
    typicalSpeedKnots: 14.0,
    fuelConsumptionMtDay: 28.5,
    dailyHireUsd: 16800,
    loaM: 229,
    beamM: 32.3,
    draftM: 14.8,
    holdsCount: 7,
    cranesCount: 0,
    craneSpec: 'Gearless (Side-Rolling Hatch Covers)',
    originPort: {
      name: 'Maputo Terminal',
      code: 'MZMPT',
      country: 'Mozambique',
      lat: -25.96,
      lng: 32.57,
      latStr: '25.96° S',
      lngStr: '32.57° E',
    },
    destinationPort: {
      name: 'Visakhapatnam Port',
      code: 'INVTZ',
      country: 'India',
      lat: 17.68,
      lng: 83.21,
      latStr: '17.68° N',
      lngStr: '83.21° E',
    },
    currentPosition: {
      name: 'Vizag Outer VGCB Berth',
      lat: 17.68,
      lng: 83.21,
      latStr: '17.68° N',
      lngStr: '83.21° E',
      progressPct: 100,
      distanceCoveredNm: 4260,
      totalDistanceNm: 4260,
      eta: 'Docked (Discharging)',
    },
    routeWaypoints: [
      { lat: -25.96, lng: 32.57 }, // Maputo Mozambique
      { lat: -15.00, lng: 42.00 }, // Mozambique Channel
      { lat: -5.00, lng: 55.00 },  // Seychelles / Central Indian Ocean
      { lat: 5.00, lng: 75.00 },   // South India Cape Corridor
      { lat: 17.68, lng: 83.21 },  // Visakhapatnam Port
    ],
    cargoBreakdown: [
      { category: 'Coal – Coking', tonnageMt: 52000, pct: 68.4, color: '#52796A' },
      { category: 'Bauxite Mineral Ore', tonnageMt: 24000, pct: 31.6, color: '#BAC5AC' },
    ],
  },
];

interface SectionTwoProps {
  onNavigate?: (tab: NavTab) => void;
  onOpenLogin?: () => void;
  isAuthenticated?: boolean;
}

/**
 * Coordinate Projection Function:
 * Maps (lat, lng) to SVG viewBox coordinates (1000 x 600)
 * Bounding Box: Longitude [20° E, 160° E] (Span 140°), Latitude [32° N, -36° S] (Span 68°)
 */
function projectToMap(lat: number, lng: number): { x: number; y: number } {
  const minLng = 20.0;
  const maxLng = 160.0;
  const maxLat = 32.0;
  const minLat = -36.0;

  const x = ((lng - minLng) / (maxLng - minLng)) * 1000;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 600;
  return {
    x: Math.max(10, Math.min(990, x)),
    y: Math.max(10, Math.min(590, y))
  };
}

export const SectionTwo: React.FC<SectionTwoProps> = ({
  onNavigate,
  onOpenLogin,
  isAuthenticated = false,
}) => {
  const [selectedShipIndex, setSelectedShipIndex] = useState<number>(0);
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [showExportFeedback, setShowExportFeedback] = useState<boolean>(false);

  const ship = PORTIN_FLEET_SHIPS[selectedShipIndex] || PORTIN_FLEET_SHIPS[0];

  const handleAction = (targetTab: NavTab) => {
    if (!isAuthenticated && onOpenLogin) {
      onOpenLogin();
    } else if (onNavigate) {
      onNavigate(targetTab);
    }
  };

  const handleExportSummary = () => {
    setShowExportFeedback(true);
    setTimeout(() => setShowExportFeedback(false), 2400);
  };

  // Projected positions for the map
  const originCoord = projectToMap(ship.originPort.lat, ship.originPort.lng);
  const destCoord = projectToMap(ship.destinationPort.lat, ship.destinationPort.lng);
  const currentCoord = projectToMap(ship.currentPosition.lat, ship.currentPosition.lng);

  // Generate SVG path string for the route waypoints
  const routePathD = ship.routeWaypoints
    .map((pt, i) => {
      const p = projectToMap(pt.lat, pt.lng);
      return `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <section
      id="section-two-operations"
      className="w-full min-h-screen py-10 lg:py-16 px-4 sm:px-6 lg:px-12 bg-[#F8F9F8] text-[#212528] font-sans border-t border-[#DFDFDF] flex flex-col justify-between"
      aria-label="Fleet Operations Showcase"
    >
      <div className="w-full max-w-[1440px] mx-auto space-y-6 flex-1 flex flex-col justify-between">
        
        {/* ================================================== */}
        {/* 1. TOP METRICS & CONTROLS HEADER                   */}
        {/* ================================================== */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DFDFDF]">
          {/* Top Operational Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-left">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium block">
                Active Fleet
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[26px] sm:text-[30px] font-bold text-[#212528] tracking-tight">
                  04
                </span>
                <span className="text-[12px] text-[#52796A] font-medium font-mono">
                  / 4 Active
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium block">
                Total Fleet Deadweight
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[26px] sm:text-[30px] font-bold text-[#212528] tracking-tight">
                  364k
                </span>
                <span className="text-[12px] text-gray-500 font-mono">
                  DWT MT
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium block">
                Avg. Fleet Utilization
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[26px] sm:text-[30px] font-bold text-[#212528] tracking-tight">
                  94.1%
                </span>
                <span className="text-[12px] text-[#52796A] font-medium font-mono">
                  Optimal
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium block">
                Fuel Standard
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[26px] sm:text-[30px] font-bold text-[#212528] tracking-tight">
                  VLSFO
                </span>
                <span className="text-[12px] text-gray-500 font-mono">
                  0.5% S
                </span>
              </div>
            </div>
          </div>

          {/* Top Right Controls with Compact Block Highlights */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            {/* Live Telemetry Pill with PortIN 4-Tone Gradient Accent */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white border border-[#DFDFDF] text-[11.5px] font-mono text-gray-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#52796A] animate-pulse" />
              <span>Telemetry: Live AIS Feed</span>
            </div>

            {/* Export Summary Button */}
            <button
              id="btn-export-fleet-report"
              onClick={handleExportSummary}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-white hover:bg-[#E5E5E5] border border-[#DFDFDF] text-[12px] font-medium text-[#212528] transition-colors cursor-pointer shadow-xs"
              title="Export Fleet Operations Summary"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#52796A]" />
              <span className="hidden sm:inline">
                {showExportFeedback ? 'Exported CSV ✓' : 'Export Fleet Data'}
              </span>
            </button>

            {/* Vessel Directory Route */}
            <button
              id="btn-view-fleet-directory"
              onClick={() => handleAction('vessels')}
              className="p-1.5 rounded-[4px] bg-[#212528] hover:bg-[#52796A] text-white transition-colors cursor-pointer"
              title="Open Vessel Specifications Directory"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ================================================== */}
        {/* 2. MAIN THREE-COLUMN OPERATIONS SHOWCASE           */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ------------------------------------------------ */}
          {/* LEFT PANEL (~25% / 3 cols): SELECTED SHIP SPECS  */}
          {/* ------------------------------------------------ */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-3 text-left">
            
            {/* Capacity & Deadweight Card */}
            <div className="bg-white rounded-[12px] border border-[#DFDFDF] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#52796A]" />
                  <span className="text-[11.5px] uppercase font-bold text-gray-500 tracking-wider">
                    Hold & Capacity
                  </span>
                </div>
                <span
                  className="px-2 py-0.5 rounded-[3px] text-[10.5px] font-semibold font-mono text-white"
                  style={{ backgroundColor: ship.statusColor }}
                >
                  {ship.status}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-600">Total Deadweight:</span>
                  <span className="text-sm font-bold text-[#212528] font-mono">
                    {ship.dwtCapacityMt.toLocaleString()} DWT MT
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-600">Occupied Parcel:</span>
                  <span className="text-sm font-bold text-[#52796A] font-mono">
                    {ship.occupiedMt.toLocaleString()} MT
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-600">Hold Margin:</span>
                  <span className="text-sm font-medium text-gray-500 font-mono">
                    {ship.availableMt.toLocaleString()} MT
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1 border-t border-[#F0F0F2]">
                  <span className="text-xs text-gray-600">Deck Cranes:</span>
                  <span className="text-xs font-mono font-semibold text-[#212528]">
                    {ship.craneSpec}
                  </span>
                </div>
              </div>

              {/* Segmented Capacity Bar with PortIN Brand Tones */}
              <div className="mt-3 pt-3 border-t border-[#E5E5E5]">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-600 mb-1">
                  <span>Capacity Utilization</span>
                  <strong className="text-[#212528]">{ship.utilizationPct}%</strong>
                </div>
                <div className="w-full h-2.5 rounded-[3px] bg-[#E5E5E5] overflow-hidden flex">
                  <div
                    className="h-full bg-[#52796A] transition-all duration-300"
                    style={{ width: `${ship.utilizationPct}%` }}
                    title={`Occupied: ${ship.occupiedMt.toLocaleString()} MT`}
                  />
                  {ship.availableMt > 0 && (
                    <div
                      className="h-full bg-[#BAC5AC] transition-all duration-300"
                      style={{ width: `${100 - ship.utilizationPct}%` }}
                      title={`Available: ${ship.availableMt.toLocaleString()} MT`}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mt-1">
                  <span>0 MT</span>
                  <span>{ship.dwtCapacityMt.toLocaleString()} MT</span>
                </div>
              </div>
            </div>

            {/* Ship Journey & Status Card */}
            <div className="bg-white rounded-[12px] border border-[#DFDFDF] p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-[#52796A]" />
                  <span className="text-[11.5px] uppercase font-bold text-gray-500 tracking-wider">
                    Voyage Route
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#52796A] font-semibold">
                  {ship.currentPosition.progressPct}% Complete
                </span>
              </div>

              {/* Route Path Flow */}
              <div className="mt-3 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#212528] mt-1 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Origin Port</span>
                    <strong className="text-[12.5px] text-[#212528]">
                      {ship.originPort.name} ({ship.originPort.code})
                    </strong>
                    <span className="text-[10.5px] font-mono text-gray-400 block">
                      {ship.originPort.latStr}, {ship.originPort.lngStr}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#52796A] ring-2 ring-[#BAC5AC]/50 mt-1 shrink-0 animate-pulse" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#52796A] font-semibold block">Live Sea Position</span>
                    <strong className="text-[12px] text-[#52796A]">
                      {ship.currentPosition.name}
                    </strong>
                    <span className="text-[10.5px] font-mono text-gray-400 block">
                      {ship.currentPosition.latStr}, {ship.currentPosition.lngStr}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#52796A] mt-1 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Destination Port</span>
                    <strong className="text-[12.5px] text-[#212528]">
                      {ship.destinationPort.name} ({ship.destinationPort.code})
                    </strong>
                    <span className="text-[10.5px] font-mono text-gray-400 block">
                      {ship.destinationPort.latStr}, {ship.destinationPort.lngStr}
                    </span>
                  </div>
                </div>
              </div>

              {/* ETA / Distance Footer */}
              <div className="mt-3 pt-2.5 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-gray-400 block">Distance Covered</span>
                  <span className="font-semibold text-gray-700">
                    {ship.currentPosition.distanceCoveredNm} / {ship.currentPosition.totalDistanceNm} NM
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">ETA Delivery</span>
                  <span className="font-bold text-[#212528]">{ship.currentPosition.eta}</span>
                </div>
              </div>
            </div>

            {/* Cargo Breakdown Card */}
            <div className="bg-white rounded-[12px] border border-[#DFDFDF] p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#52796A]" />
                  <span className="text-[11.5px] uppercase font-bold text-gray-500 tracking-wider">
                    Cargo Hold Allocation
                  </span>
                </div>
                <span className="text-[11px] font-mono text-gray-500">
                  {ship.occupiedMt.toLocaleString()} MT Total
                </span>
              </div>

              <div className="mt-2.5 space-y-1.5">
                {ship.cargoBreakdown.map((cargo, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-[4px] bg-[#F8F9F8] border border-[#E5E5E5] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-[2px]"
                        style={{ backgroundColor: cargo.color }}
                      />
                      <span className="font-medium text-[#212528]">{cargo.category}</span>
                    </div>
                    <div className="text-right font-mono">
                      <strong className="text-gray-900">{cargo.tonnageMt.toLocaleString()} MT</strong>
                      <span className="text-gray-400 text-[10.5px] ml-1">({cargo.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ------------------------------------------------ */}
          {/* CENTER PANEL (~50% / 6 cols): CENTRAL SHIP HERO  */}
          {/* ------------------------------------------------ */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-[14px] border border-[#DFDFDF] p-5 sm:p-6 shadow-xs relative overflow-hidden">
            
            {/* Top Vessel Metadata Line */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E5E5] text-left">
              <div>
                <span className="text-[10.5px] uppercase tracking-wider text-gray-400 font-mono block">
                  ACTIVE FLEET VESSEL SPECIFICATION
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#212528] tracking-tight">
                  {ship.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-[4px] bg-[#E5E5E5] text-[#212528] font-bold border border-[#DFDFDF]">
                  {ship.vesselClass}
                </span>
                <span className="px-2 py-1 rounded-[4px] bg-[#F8F9F8] text-gray-600 border border-[#DFDFDF]">
                  {ship.imo}
                </span>
              </div>
            </div>

            {/* Architecture Details Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 bg-[#F8F9F8] rounded-[6px] px-3 border border-[#E5E5E5] my-2 text-left text-xs font-mono">
              <div>
                <span className="text-[10px] text-gray-400 block">Length Overall (LOA)</span>
                <strong className="text-[#212528]">{ship.loaM}m</strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Beam (Width)</span>
                <strong className="text-[#212528]">{ship.beamM}m</strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Design Draft</span>
                <strong className="text-[#52796A]">{ship.draftM}m</strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Daily Fuel Burn</span>
                <strong className="text-[#212528]">{ship.fuelConsumptionMtDay} MT/d</strong>
              </div>
            </div>

            {/* DYNAMIC ARCHITECTURAL SHIP DRAWING SVG */}
            <div className="relative w-full flex-1 min-h-[230px] sm:min-h-[270px] flex items-center justify-center p-2 select-none">
              
              {/* Subtle Nautical Radar Rings in Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[340px] h-[340px] rounded-full border border-[#52796A]/30" />
                <div className="w-[220px] h-[220px] rounded-full border border-[#52796A]/20" />
                <div className="w-[100px] h-[100px] rounded-full border border-[#52796A]/20" />
              </div>

              {/* Dynamic Vessel Illustration SVG according to vessel class */}
              <div className="w-full max-w-[560px] py-4 transition-all duration-300 transform scale-100">
                <svg
                  viewBox="0 0 720 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto drop-shadow-sm"
                >
                  {/* Ocean Waterline Reference Line */}
                  <line x1="30" y1="210" x2="690" y2="210" stroke="#52796A" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6" />
                  <path d="M40 210 Q180 213 360 210 T680 210" stroke="#BAC5AC" strokeWidth="1.5" opacity="0.8" />

                  {/* Dynamic Hull Proportions based on class */}
                  {ship.vesselClass === 'Capesize' ? (
                    // Ultra-long Capesize Hull
                    <g>
                      <path d="M 50 160 L 120 210 L 630 210 L 685 150 L 665 138 L 120 138 Z" fill="#212528" />
                      <path d="M 120 210 L 150 228 L 600 228 L 630 210 Z" fill="#52796A" />
                      <path d="M 685 150 Q 710 175 690 210 L 630 210 Z" fill="#52796A" />
                      {/* 9 Large Cargo Holds */}
                      {[150, 205, 260, 315, 370, 425, 480, 535, 590].map((x, i) => (
                        <rect key={i} x={x} y="125" width="45" height="13" fill="#BAC5AC" rx="1.5" />
                      ))}
                    </g>
                  ) : ship.vesselClass === 'Panamax' ? (
                    // Panamax 7 Holds Gearless Hull
                    <g>
                      <path d="M 60 165 L 130 210 L 610 210 L 665 155 L 645 142 L 130 142 Z" fill="#212528" />
                      <path d="M 130 210 L 160 225 L 580 225 L 610 210 Z" fill="#52796A" />
                      <path d="M 665 155 Q 690 180 670 210 L 610 210 Z" fill="#52796A" />
                      {/* 7 Holds */}
                      {[160, 225, 290, 355, 420, 485, 550].map((x, i) => (
                        <rect key={i} x={x} y="128" width="55" height="14" fill="#BAC5AC" rx="1.5" />
                      ))}
                    </g>
                  ) : (
                    // Supramax & Handysize: 5 Holds + 4 Deck Cranes
                    <g>
                      <path d="M 60 170 L 140 210 L 600 210 L 660 160 L 640 145 L 140 145 Z" fill="#212528" />
                      <path d="M 140 210 L 170 225 L 570 225 L 600 210 Z" fill="#52796A" />
                      <path d="M 660 160 Q 690 180 670 210 L 600 210 Z" fill="#52796A" />
                      {/* 5 Holds */}
                      <rect x="180" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />
                      <rect x="260" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />
                      <rect x="340" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />
                      <rect x="420" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />
                      <rect x="500" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />
                      {/* 4 Cranes */}
                      <g stroke="#E5E5E5" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="250" y1="130" x2="250" y2="85" />
                        <line x1="250" y1="85" x2="215" y2="105" />
                        <circle cx="250" cy="85" r="3" fill="#52796A" />
                        <line x1="330" y1="130" x2="330" y2="85" />
                        <line x1="330" y1="85" x2="295" y2="105" />
                        <circle cx="330" cy="85" r="3" fill="#52796A" />
                        <line x1="410" y1="130" x2="410" y2="85" />
                        <line x1="410" y1="85" x2="375" y2="105" />
                        <circle cx="410" cy="85" r="3" fill="#52796A" />
                        <line x1="490" y1="130" x2="490" y2="85" />
                        <line x1="490" y1="85" x2="455" y2="105" />
                        <circle cx="490" cy="85" r="3" fill="#52796A" />
                      </g>
                    </g>
                  )}

                  {/* Bridge Superstructure (Aft Stern) */}
                  <rect x="95" y="85" width="55" height="60" fill="#E5E5E5" rx="3" stroke="#DFDFDF" strokeWidth="1" />
                  <rect x="105" y="65" width="40" height="20" fill="#E5E5E5" rx="2" stroke="#DFDFDF" strokeWidth="1" />
                  <rect x="108" y="70" width="34" height="6" fill="#212528" rx="1" />

                  {/* Funnel Exhaust Stack */}
                  <path d="M 120 45 L 133 45 L 130 65 L 118 65 Z" fill="#52796A" />
                  <line x1="118" y1="52" x2="132" y2="52" stroke="#BAC5AC" strokeWidth="2" />

                  {/* Navigation Radar Mast */}
                  <line x1="135" y1="65" x2="135" y2="30" stroke="#212528" strokeWidth="2" />
                  <line x1="128" y1="38" x2="142" y2="38" stroke="#212528" strokeWidth="1.5" />
                  <circle cx="135" cy="30" r="2.5" fill="#52796A" />

                  {/* Vessel Name on Hull */}
                  <text
                    x="200"
                    y="180"
                    fill="#E5E5E5"
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="2"
                    opacity="0.9"
                  >
                    {ship.name.toUpperCase()}
                  </text>

                  {/* Draft Waterline Scale */}
                  <text
                    x="150"
                    y="204"
                    fill="#BAC5AC"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {ship.draftM.toFixed(1)}m MAX DRAFT
                  </text>
                </svg>
              </div>
            </div>

            {/* ============================================== */}
            {/* FOUR-SHIP SELECTOR BAR (Bottom of Center)      */}
            {/* ============================================== */}
            <div className="pt-4 border-t border-[#DFDFDF]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-semibold">
                  SELECT FLEET VESSEL (4 SHIPS IN SERVICE)
                </span>
                <span className="text-[11px] font-mono text-[#52796A] font-bold">
                  Vessel 0{selectedShipIndex + 1} of 04
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PORTIN_FLEET_SHIPS.map((s, idx) => {
                  const isSelected = selectedShipIndex === idx;
                  return (
                    <button
                      key={s.id}
                      id={`btn-select-ship-${idx + 1}`}
                      onClick={() => setSelectedShipIndex(idx)}
                      className={`relative p-2.5 rounded-[6px] text-left transition-all duration-150 cursor-pointer border flex flex-col justify-between overflow-hidden ${
                        isSelected
                          ? 'bg-[#212528] text-white border-[#212528] shadow-xs'
                          : 'bg-[#F8F9F8] hover:bg-[#E5E5E5] text-[#212528] border-[#DFDFDF]'
                      }`}
                    >
                      {/* Compact 4-Tone Gradient Active Selection Top Accent */}
                      {isSelected && (
                        <div
                          className="absolute top-0 left-0 right-0 h-[3px]"
                          style={{
                            background: 'linear-gradient(90deg, #52796A 0%, #BAC5AC 35%, #212528 70%, #E5E5E5 100%)'
                          }}
                        />
                      )}

                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-mono uppercase font-bold ${
                          isSelected ? 'text-[#BAC5AC]' : 'text-gray-400'
                        }`}>
                          0{idx + 1}
                        </span>
                        {/* Compact Selection Accent Indicator */}
                        <span className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-[#52796A]' : 'bg-[#DFDFDF]'
                        }`} />
                      </div>

                      <div>
                        <strong className="text-[12px] font-bold block truncate">
                          {s.name}
                        </strong>
                        <span className={`text-[10.5px] font-mono block ${
                          isSelected ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {s.vesselClass} · {(s.dwtCapacityMt / 1000).toFixed(0)}k DWT
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ------------------------------------------------ */}
          {/* RIGHT PANEL (~25% / 3 cols): REALISTIC ROUTE MAP */}
          {/* ------------------------------------------------ */}
          <div className="lg:col-span-3 flex flex-col justify-between bg-white rounded-[12px] border border-[#DFDFDF] p-4 sm:p-5 shadow-xs text-left">
            
            {/* Map Header & Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#52796A]" />
                <span className="text-[11.5px] uppercase font-bold text-gray-500 tracking-wider">
                  Maritime Route Map
                </span>
              </div>

              {/* Map Zoom & Center Controls */}
              <div className="flex items-center gap-1">
                <button
                  id="btn-map-zoom-in"
                  onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 1.8))}
                  className="p-1 rounded-[3px] bg-[#F8F9F8] hover:bg-[#E5E5E5] border border-[#DFDFDF] text-gray-700 transition cursor-pointer"
                  title="Zoom In Map"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  id="btn-map-zoom-out"
                  onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.8))}
                  className="p-1 rounded-[3px] bg-[#F8F9F8] hover:bg-[#E5E5E5] border border-[#DFDFDF] text-gray-700 transition cursor-pointer"
                  title="Zoom Out Map"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  id="btn-map-locate-vessel"
                  onClick={() => setMapZoom(1)}
                  className="p-1 rounded-[3px] bg-[#F8F9F8] hover:bg-[#E5E5E5] border border-[#DFDFDF] text-[#52796A] transition cursor-pointer"
                  title="Center on Active Route"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* REALISTIC GEOGRAPHIC SHIPPING ROUTE MAP SVG */}
            <div className="relative w-full flex-1 min-h-[270px] my-3 rounded-[8px] bg-[#EEF2F6] border border-[#DFDFDF] overflow-hidden flex items-center justify-center select-none">
              
              <div
                className="w-full h-full transition-transform duration-300"
                style={{ transform: `scale(${mapZoom})` }}
              >
                <svg
                  viewBox="0 0 1000 600"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Maritime Graticule Grid Pattern */}
                    <pattern id="geo-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#DFE3E8" strokeWidth="0.75" strokeDasharray="3 3" />
                    </pattern>
                  </defs>

                  {/* Ocean Canvas Background */}
                  <rect width="1000" height="600" fill="#EEF2F6" />
                  <rect width="1000" height="600" fill="url(#geo-grid)" />

                  {/* Latitude / Longitude Graticules */}
                  <line x1="0" y1="282" x2="1000" y2="282" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 2" /> {/* Equator (0° Lat) */}
                  <text x="12" y="278" fill="#94A3B8" fontSize="11" fontFamily="monospace">EQUATOR 0°</text>

                  <line x1="0" y1="489" x2="1000" y2="489" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="2 2" /> {/* Tropic of Capricorn (23.5° S) */}
                  <text x="12" y="485" fill="#94A3B8" fontSize="10" fontFamily="monospace">TROPIC OF CAPRICORN 23.5°S</text>

                  {/* REALISTIC GEOGRAPHIC COASTLINES (Indian Ocean, Asia, Australia, Africa Basin) */}
                  
                  {/* 1. Indian Subcontinent & South Asia */}
                  <path
                    d="M 370 70 L 410 75 L 430 110 L 415 170 L 435 245 L 450 250 L 480 180 L 485 105 L 515 95 L 550 140 L 580 170 L 590 220 L 570 230 L 565 200 L 540 180 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.5"
                  />
                  {/* Sri Lanka */}
                  <path
                    d="M 445 260 C 455 260 455 275 445 278 C 438 275 438 260 445 260 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.2"
                  />

                  {/* 2. Southeast Asia, Malay Peninsula & Indonesia Archipelago */}
                  {/* Malay Peninsula */}
                  <path
                    d="M 580 170 L 600 240 L 610 270 L 595 280 L 585 240 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.2"
                  />
                  {/* Sumatra */}
                  <path
                    d="M 540 280 L 610 320 L 630 360 L 590 350 L 530 290 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.2"
                  />
                  {/* Java */}
                  <path
                    d="M 620 370 L 730 380 L 735 390 L 620 385 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.2"
                  />
                  {/* Borneo / Kalimantan (Taboneo Anchorage Area) */}
                  <path
                    d="M 640 280 L 720 290 L 740 350 L 660 360 L 635 310 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.2"
                  />
                  {/* Sulawesi */}
                  <path
                    d="M 760 300 L 790 310 L 770 360 L 750 330 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.2"
                  />

                  {/* 3. Australia Landmass */}
                  <path
                    d="M 740 450 L 800 400 L 860 410 L 880 370 L 910 420 L 960 450 L 990 530 L 940 590 L 820 580 L 730 520 L 720 460 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.5"
                  />

                  {/* 4. East Africa Coast & Madagascar */}
                  {/* East Africa Mainland */}
                  <path
                    d="M 30 180 L 110 200 L 140 280 L 120 380 L 80 480 L 90 560 L 30 580 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.5"
                  />
                  {/* Madagascar */}
                  <path
                    d="M 170 390 L 210 410 L 195 510 L 160 490 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.2"
                  />

                  {/* 5. Arabian Peninsula (Top Left) */}
                  <path
                    d="M 110 120 L 220 140 L 260 180 L 190 200 L 130 160 Z"
                    fill="#DDE3EA"
                    stroke="#BAC5AC"
                    strokeWidth="1.2"
                  />

                  {/* ========================================== */}
                  {/* SHIPPING ROUTE GEOMETRY & NAVIGATION LANE  */}
                  {/* ========================================== */}
                  
                  {/* Route Glow Underlay */}
                  <path
                    d={routePathD}
                    fill="none"
                    stroke="#52796A"
                    strokeWidth="5"
                    opacity="0.15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Main Nautical Shipping Track (Dashed Corridor) */}
                  <path
                    d={routePathD}
                    fill="none"
                    stroke="#52796A"
                    strokeWidth="2.2"
                    strokeDasharray="5 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* ORIGIN PORT PIN & LABEL */}
                  <g>
                    <circle cx={originCoord.x} cy={originCoord.y} r="5" fill="#212528" stroke="#FFFFFF" strokeWidth="1.5" />
                    <rect
                      x={originCoord.x - 24}
                      y={originCoord.y - 20}
                      width="48"
                      height="15"
                      rx="3"
                      fill="#212528"
                    />
                    <text
                      x={originCoord.x}
                      y={originCoord.y - 9}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {ship.originPort.code}
                    </text>
                  </g>

                  {/* DESTINATION PORT PIN & LABEL */}
                  <g>
                    <circle cx={destCoord.x} cy={destCoord.y} r="6" fill="#52796A" stroke="#FFFFFF" strokeWidth="2" />
                    <rect
                      x={destCoord.x - 24}
                      y={destCoord.y - 22}
                      width="48"
                      height="16"
                      rx="3"
                      fill="#52796A"
                    />
                    <text
                      x={destCoord.x}
                      y={destCoord.y - 10}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {ship.destinationPort.code}
                    </text>
                  </g>

                  {/* ACTIVE VESSEL REAL-TIME POSITION BEACON */}
                  <g>
                    {/* Radar Pulse Ripple Rings */}
                    <circle
                      cx={currentCoord.x}
                      cy={currentCoord.y}
                      r="14"
                      fill="#52796A"
                      opacity="0.2"
                      className="animate-ping"
                    />
                    <circle
                      cx={currentCoord.x}
                      cy={currentCoord.y}
                      r="7"
                      fill="#52796A"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <circle
                      cx={currentCoord.x}
                      cy={currentCoord.y}
                      r="3"
                      fill="#BAC5AC"
                    />

                    {/* Ship Position Callout Tag */}
                    <rect
                      x={Math.min(currentCoord.x + 10, 840)}
                      y={currentCoord.y - 14}
                      width="92"
                      height="22"
                      rx="3"
                      fill="#212528"
                      stroke="#52796A"
                      strokeWidth="1"
                    />
                    <text
                      x={Math.min(currentCoord.x + 16, 846)}
                      y={currentCoord.y - 4}
                      fill="#BAC5AC"
                      fontSize="8"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      LIVE VESSEL
                    </text>
                    <text
                      x={Math.min(currentCoord.x + 16, 846)}
                      y={currentCoord.y + 5}
                      fill="#FFFFFF"
                      fontSize="8.5"
                      fontFamily="monospace"
                    >
                      {ship.currentPosition.progressPct}% • {ship.currentSpeedKnots} kts
                    </text>
                  </g>
                </svg>
              </div>

              {/* Map Footer Overlay Badge */}
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-[4px] bg-white/95 backdrop-blur-xs border border-[#DFDFDF] text-[10.5px] font-mono flex items-center justify-between text-gray-800 shadow-xs">
                <span className="font-semibold">{ship.originPort.code} ➔ {ship.destinationPort.code}</span>
                <span className="text-[#52796A] font-bold">{ship.currentPosition.distanceCoveredNm} / {ship.currentPosition.totalDistanceNm} NM</span>
              </div>
            </div>

            {/* Destination Port Spec Summary */}
            <div className="space-y-2 pt-2 border-t border-[#E5E5E5] text-xs">
              <div className="flex items-center justify-between font-mono">
                <span className="text-gray-500">Destination Port:</span>
                <strong className="text-[#212528]">{ship.destinationPort.name}</strong>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-gray-500">Total Nautical Distance:</span>
                <strong className="text-[#212528]">{ship.currentPosition.totalDistanceNm} NM</strong>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-gray-500">Daily Charter Hire:</span>
                <strong className="text-[#52796A]">${ship.dailyHireUsd.toLocaleString()}/day</strong>
              </div>

              {/* Action: Track Active Voyage */}
              <button
                id="btn-track-active-voyage"
                onClick={() => handleAction('portfolio')}
                className="w-full mt-2 py-2 rounded-[4px] bg-[#212528] hover:bg-[#52796A] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Track Active Voyage in Terminal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
