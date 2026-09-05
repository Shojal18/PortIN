import React, { useState } from 'react';
import {
  Ship,
  Navigation,
  Compass,
  Anchor,
  Layers,
  MapPin,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Crosshair,
  FileSpreadsheet,
  Activity,
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
  originPort: {
    name: string;
    code: string;
    country: string;
    coordinates: { x: number; y: number; lat: string; lng: string };
  };
  destinationPort: {
    name: string;
    code: string;
    country: string;
    coordinates: { x: number; y: number; lat: string; lng: string };
  };
  currentPosition: {
    name: string;
    coordinates: { x: number; y: number; lat: string; lng: string };
    progressPct: number;
    distanceCoveredNm: number;
    totalDistanceNm: number;
    eta: string;
  };
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
    classDescription: 'Geared Dry Bulk Carrier with 4x 30t Cranes',
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
    originPort: {
      name: 'Hay Point',
      code: 'AUHPT',
      country: 'Australia',
      coordinates: { x: 78, y: 72, lat: '21.28° S', lng: '149.30° E' },
    },
    destinationPort: {
      name: 'Paradip Port',
      code: 'INPRT',
      country: 'India',
      coordinates: { x: 34, y: 32, lat: '20.26° N', lng: '86.67° E' },
    },
    currentPosition: {
      name: 'Bay of Bengal Corridor',
      coordinates: { x: 48, y: 44, lat: '12.50° N', lng: '85.20° E' },
      progressPct: 68,
      distanceCoveredNm: 3300,
      totalDistanceNm: 4850,
      eta: 'Oct 16, 2026',
    },
    cargoBreakdown: [
      { category: 'Coal – Thermal', tonnageMt: 60000, pct: 93.8, color: '#52796A' },
      { category: 'Unallocated Hold', tonnageMt: 4000, pct: 6.2, color: '#BAC5AC' },
    ],
  },
  {
    id: 'ship-02',
    name: 'MV Dhamra Express',
    vesselClass: 'Capesize',
    classDescription: 'Ultra-Large Deepwater Bulk Carrier',
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
    originPort: {
      name: 'Hay Point Terminal',
      code: 'AUHPT',
      country: 'Australia',
      coordinates: { x: 78, y: 72, lat: '21.28° S', lng: '149.30° E' },
    },
    destinationPort: {
      name: 'Dhamra Deep Port',
      code: 'INDHR',
      country: 'India',
      coordinates: { x: 36, y: 30, lat: '20.82° N', lng: '86.97° E' },
    },
    currentPosition: {
      name: 'Dalrymple Bay Berth #3',
      coordinates: { x: 75, y: 69, lat: '21.25° S', lng: '149.25° E' },
      progressPct: 24,
      distanceCoveredNm: 1170,
      totalDistanceNm: 4890,
      eta: 'Oct 21, 2026',
    },
    cargoBreakdown: [
      { category: 'Coal – Thermal', tonnageMt: 140000, pct: 77.8, color: '#52796A' },
      { category: 'Iron Ore Fines', tonnageMt: 40000, pct: 22.2, color: '#BAC5AC' },
    ],
  },
  {
    id: 'ship-03',
    name: 'MV Bengal Trader',
    vesselClass: 'Handysize',
    classDescription: 'Versatile Geared Riverine Bulk Carrier',
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
    originPort: {
      name: 'Taboneo Anchorage',
      code: 'IDTBN',
      country: 'Indonesia',
      coordinates: { x: 62, y: 58, lat: '3.73° S', lng: '114.46° E' },
    },
    destinationPort: {
      name: 'Haldia Dock Complex',
      code: 'INHAL',
      country: 'India',
      coordinates: { x: 38, y: 26, lat: '22.02° N', lng: '88.06° E' },
    },
    currentPosition: {
      name: 'Sandheads Lighterage Zone',
      coordinates: { x: 40, y: 28, lat: '21.65° N', lng: '88.05° E' },
      progressPct: 92,
      distanceCoveredNm: 2150,
      totalDistanceNm: 2340,
      eta: 'Sep 02, 2026',
    },
    cargoBreakdown: [
      { category: 'Coal – Thermal', tonnageMt: 22000, pct: 64.3, color: '#52796A' },
      { category: 'Fertilizer (NPK)', tonnageMt: 12200, pct: 35.7, color: '#BAC5AC' },
    ],
  },
  {
    id: 'ship-04',
    name: 'MV East Coast Star',
    vesselClass: 'Panamax',
    classDescription: 'High-Volume Gearless Mineral Carrier',
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
    originPort: {
      name: 'Maputo Terminal',
      code: 'MZMPT',
      country: 'Mozambique',
      coordinates: { x: 18, y: 64, lat: '25.96° S', lng: '32.57° E' },
    },
    destinationPort: {
      name: 'Visakhapatnam Port',
      code: 'INVTZ',
      country: 'India',
      coordinates: { x: 32, y: 36, lat: '17.68° N', lng: '83.21° E' },
    },
    currentPosition: {
      name: 'Vizag Outer VGCB Berth',
      coordinates: { x: 32, y: 36, lat: '17.68° N', lng: '83.21° E' },
      progressPct: 100,
      distanceCoveredNm: 4260,
      totalDistanceNm: 4260,
      eta: 'Docked (Discharging)',
    },
    cargoBreakdown: [
      { category: 'Coal – Coking', tonnageMt: 52000, pct: 68.4, color: '#52796A' },
      { category: 'Bauxite Ore', tonnageMt: 24000, pct: 31.6, color: '#BAC5AC' },
    ],
  },
];

interface SectionTwoProps {
  onNavigate?: (tab: NavTab) => void;
  onOpenLogin?: () => void;
  isAuthenticated?: boolean;
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
                Fuel & Engine Standard
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

          {/* Top Right Functional Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            {/* Live Telemetry Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFDFDF] text-[11.5px] font-mono text-gray-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#52796A] animate-pulse" />
              <span>Telemetry: Real-Time</span>
            </div>

            {/* Export Summary Button */}
            <button
              id="btn-export-fleet-report"
              onClick={handleExportSummary}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E5E5E5] border border-[#DFDFDF] text-[12px] font-medium text-[#212528] transition-colors cursor-pointer shadow-xs"
              title="Export Fleet Operations Summary"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#52796A]" />
              <span className="hidden sm:inline">
                {showExportFeedback ? 'Exported CSV ✓' : 'Export Fleet Data'}
              </span>
            </button>

            {/* Vessel Directory Quick Route */}
            <button
              id="btn-view-fleet-directory"
              onClick={() => handleAction('vessels')}
              className="p-1.5 rounded-full bg-[#212528] hover:bg-[#52796A] text-white transition-colors cursor-pointer"
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
            
            {/* Capacity & Fuel Card */}
            <div className="bg-white rounded-[16px] border border-[#DFDFDF] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#52796A]" />
                  <span className="text-[11.5px] uppercase font-bold text-gray-500 tracking-wider">
                    Ship Capacity
                  </span>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-[10.5px] font-medium font-mono text-white"
                  style={{ backgroundColor: ship.statusColor }}
                >
                  {ship.status}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-600">Total Deadweight:</span>
                  <span className="text-sm font-bold text-[#212528] font-mono">
                    {ship.dwtCapacityMt.toLocaleString()} DWT
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-600">Occupied Parcel:</span>
                  <span className="text-sm font-bold text-[#52796A] font-mono">
                    {ship.occupiedMt.toLocaleString()} MT
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-600">Available Margin:</span>
                  <span className="text-sm font-medium text-gray-500 font-mono">
                    {ship.availableMt.toLocaleString()} MT
                  </span>
                </div>
              </div>

              {/* Visual Segmented Capacity Bar */}
              <div className="mt-3 pt-3 border-t border-[#E5E5E5]">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-600 mb-1">
                  <span>Capacity Utilization</span>
                  <strong className="text-[#212528]">{ship.utilizationPct}%</strong>
                </div>
                <div className="w-full h-3 rounded-full bg-[#E5E5E5] overflow-hidden flex">
                  <div
                    className="h-full bg-[#52796A] transition-all duration-300 rounded-l-full"
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
            <div className="bg-white rounded-[16px] border border-[#DFDFDF] p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-[#52796A]" />
                  <span className="text-[11.5px] uppercase font-bold text-gray-500 tracking-wider">
                    Voyage Route
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#52796A] font-semibold">
                  {ship.currentPosition.progressPct}% Completed
                </span>
              </div>

              {/* Route Path Flow */}
              <div className="mt-3 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Origin</span>
                    <strong className="text-[12.5px] text-[#212528]">
                      {ship.originPort.name} ({ship.originPort.code})
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#52796A] ring-3 ring-[#BAC5AC]/40 mt-1 shrink-0 animate-pulse" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#52796A] font-semibold block">Current Sea Position</span>
                    <strong className="text-[12px] text-[#52796A]">
                      {ship.currentPosition.name}
                    </strong>
                    <span className="text-[10.5px] font-mono text-gray-400 block">
                      {ship.currentPosition.coordinates.lat}, {ship.currentPosition.coordinates.lng}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#212528] mt-1 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">Destination</span>
                    <strong className="text-[12.5px] text-[#212528]">
                      {ship.destinationPort.name} ({ship.destinationPort.code})
                    </strong>
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
                  <span className="text-[10px] text-gray-400 block">Estimated Arrival</span>
                  <span className="font-bold text-[#212528]">{ship.currentPosition.eta}</span>
                </div>
              </div>
            </div>

            {/* Cargo Breakdown Card */}
            <div className="bg-white rounded-[16px] border border-[#DFDFDF] p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#52796A]" />
                  <span className="text-[11.5px] uppercase font-bold text-gray-500 tracking-wider">
                    Cargo Breakdown
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
                    className="p-2 rounded-[6px] bg-[#F8F9F8] border border-[#E5E5E5] flex items-center justify-between text-xs"
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
          <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-[20px] border border-[#DFDFDF] p-5 sm:p-6 shadow-xs relative overflow-hidden">
            
            {/* Top Vessel Metadata Line */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E5E5] text-left">
              <div>
                <span className="text-[10.5px] uppercase tracking-wider text-gray-400 font-mono block">
                  SELECTED FLEET VESSEL
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#212528] tracking-tight">
                  {ship.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-[4px] bg-[#E5E5E5] text-[#212528] font-semibold border border-[#DFDFDF]">
                  {ship.vesselClass}
                </span>
                <span className="px-2 py-1 rounded-[4px] bg-[#F8F9F8] text-gray-600 border border-[#DFDFDF]">
                  {ship.imo}
                </span>
              </div>
            </div>

            {/* Architecture Details Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 py-3 bg-[#F8F9F8] rounded-[10px] px-3 border border-[#E5E5E5] my-2 text-left text-xs font-mono">
              <div>
                <span className="text-[10px] text-gray-400 block">Length (LOA)</span>
                <strong className="text-[#212528]">{ship.loaM}m</strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Beam (Width)</span>
                <strong className="text-[#212528]">{ship.beamM}m</strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Max Draft</span>
                <strong className="text-[#52796A]">{ship.draftM}m</strong>
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] text-gray-400 block">Fuel Burn</span>
                <strong className="text-[#212528]">{ship.fuelConsumptionMtDay} MT/d</strong>
              </div>
            </div>

            {/* PRIMARY CENTRAL SHIP VISUAL (Crisp Architectural SVG Graphic) */}
            <div className="relative w-full flex-1 min-h-[220px] sm:min-h-[260px] flex items-center justify-center p-2 select-none">
              
              {/* Subtle Nautical Radar Rings in Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[340px] h-[340px] rounded-full border border-[#52796A]/30" />
                <div className="w-[220px] h-[220px] rounded-full border border-[#52796A]/20" />
                <div className="w-[100px] h-[100px] rounded-full border border-[#52796A]/20" />
              </div>

              {/* Dynamic Vessel Illustration SVG */}
              <div className="w-full max-w-[560px] py-4 transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95">
                <svg
                  viewBox="0 0 720 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto drop-shadow-md"
                >
                  {/* Ocean Waterline Glow */}
                  <line x1="30" y1="210" x2="690" y2="210" stroke="#52796A" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6" />
                  <path d="M40 210 Q180 214 360 210 T680 210" stroke="#BAC5AC" strokeWidth="1.5" opacity="0.8" />

                  {/* Main Hull Body (Dark Charcoal with Primary PortIN green waterline) */}
                  <path
                    d="M 60 170 L 140 210 L 600 210 L 660 160 L 640 145 L 140 145 Z"
                    fill="#212528"
                  />
                  {/* Antifouling Keel Section */}
                  <path
                    d="M 140 210 L 170 225 L 570 225 L 600 210 Z"
                    fill="#52796A"
                    opacity="0.9"
                  />

                  {/* Bulbous Bow (Front of vessel) */}
                  <path
                    d="M 660 160 Q 690 180 670 210 L 600 210 Z"
                    fill="#52796A"
                  />

                  {/* Cargo Holds / Container Hatches */}
                  <rect x="180" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />
                  <rect x="260" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />
                  <rect x="340" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />
                  <rect x="420" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />
                  <rect x="500" y="130" width="70" height="15" fill="#BAC5AC" rx="2" />

                  {/* Deck Cargo Hatches Texture */}
                  <rect x="182" y="118" width="66" height="12" fill="#52796A" rx="1" />
                  <rect x="262" y="118" width="66" height="12" fill="#52796A" rx="1" />
                  <rect x="342" y="118" width="66" height="12" fill="#52796A" rx="1" />
                  <rect x="422" y="118" width="66" height="12" fill="#52796A" rx="1" />
                  <rect x="502" y="118" width="66" height="12" fill="#52796A" rx="1" />

                  {/* Geared Electro-Hydraulic Deck Cranes (For Supramax & Handysize) */}
                  {(ship.vesselClass === 'Supramax' || ship.vesselClass === 'Handysize') && (
                    <g stroke="#E5E5E5" strokeWidth="2.5" strokeLinecap="round">
                      {/* Crane 1 */}
                      <line x1="250" y1="130" x2="250" y2="85" />
                      <line x1="250" y1="85" x2="215" y2="105" />
                      <circle cx="250" cy="85" r="3" fill="#52796A" />

                      {/* Crane 2 */}
                      <line x1="330" y1="130" x2="330" y2="85" />
                      <line x1="330" y1="85" x2="295" y2="105" />
                      <circle cx="330" cy="85" r="3" fill="#52796A" />

                      {/* Crane 3 */}
                      <line x1="410" y1="130" x2="410" y2="85" />
                      <line x1="410" y1="85" x2="375" y2="105" />
                      <circle cx="410" cy="85" r="3" fill="#52796A" />

                      {/* Crane 4 */}
                      <line x1="490" y1="130" x2="490" y2="85" />
                      <line x1="490" y1="85" x2="455" y2="105" />
                      <circle cx="490" cy="85" r="3" fill="#52796A" />
                    </g>
                  )}

                  {/* Aft Bridge Superstructure & Navigation Mast (Left/Stern side) */}
                  <rect x="100" y="90" width="55" height="55" fill="#E5E5E5" rx="3" stroke="#DFDFDF" strokeWidth="1" />
                  <rect x="110" y="70" width="40" height="20" fill="#E5E5E5" rx="2" stroke="#DFDFDF" strokeWidth="1" />
                  
                  {/* Wheelhouse Glass Windows */}
                  <rect x="112" y="74" width="36" height="6" fill="#212528" rx="1" />

                  {/* Funnel Exhaust Stack */}
                  <path d="M 125 50 L 138 50 L 135 70 L 123 70 Z" fill="#52796A" />
                  <line x1="123" y1="56" x2="137" y2="56" stroke="#BAC5AC" strokeWidth="2" />

                  {/* Radar & Comms Mast */}
                  <line x1="140" y1="70" x2="140" y2="35" stroke="#212528" strokeWidth="2" />
                  <line x1="132" y1="42" x2="148" y2="42" stroke="#212528" strokeWidth="1.5" />
                  <circle cx="140" cy="35" r="2.5" fill="#52796A" />

                  {/* Bow Mast */}
                  <line x1="630" y1="145" x2="630" y2="100" stroke="#212528" strokeWidth="2" />
                  <line x1="622" y1="110" x2="638" y2="110" stroke="#212528" strokeWidth="1.5" />

                  {/* Vessel Name on Hull */}
                  <text
                    x="210"
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
                    13.0m DRAFT
                  </text>
                </svg>
              </div>
            </div>

            {/* ============================================== */}
            {/* FOUR-SHIP SELECTOR BAR (Bottom of Center)      */}
            {/* ============================================== */}
            <div className="pt-4 border-t border-[#DFDFDF]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  Select Fleet Vessel (4 Ships in Active Service)
                </span>
                <span className="text-[11px] font-mono text-[#52796A] font-semibold">
                  Ship 0{selectedShipIndex + 1} of 04
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
                      className={`p-2.5 rounded-[10px] text-left transition-all duration-150 cursor-pointer border flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#52796A] text-white border-[#52796A] shadow-sm ring-2 ring-[#52796A]/30'
                          : 'bg-[#F8F9F8] hover:bg-[#E5E5E5] text-[#212528] border-[#DFDFDF]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-mono uppercase font-bold ${
                          isSelected ? 'text-[#BAC5AC]' : 'text-gray-400'
                        }`}>
                          0{idx + 1}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-white' : 'bg-[#52796A]'
                        }`} />
                      </div>

                      <div>
                        <strong className="text-[12px] font-bold block truncate">
                          {s.name}
                        </strong>
                        <span className={`text-[10.5px] font-mono block ${
                          isSelected ? 'text-white/80' : 'text-gray-500'
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
          {/* RIGHT PANEL (~25% / 3 cols): PORT & ROUTE MAP   */}
          {/* ------------------------------------------------ */}
          <div className="lg:col-span-3 flex flex-col justify-between bg-white rounded-[16px] border border-[#DFDFDF] p-4 sm:p-5 shadow-xs text-left">
            
            {/* Map Header & Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#52796A]" />
                <span className="text-[11.5px] uppercase font-bold text-gray-500 tracking-wider">
                  Port Route Map
                </span>
              </div>

              {/* Map Zoom & Center Controls */}
              <div className="flex items-center gap-1">
                <button
                  id="btn-map-zoom-in"
                  onClick={() => setMapZoom(prev => Math.min(prev + 0.25, 2.0))}
                  className="p-1 rounded bg-[#F8F9F8] hover:bg-[#E5E5E5] border border-[#DFDFDF] text-gray-700 transition cursor-pointer"
                  title="Zoom In Map"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  id="btn-map-zoom-out"
                  onClick={() => setMapZoom(prev => Math.max(prev - 0.25, 0.75))}
                  className="p-1 rounded bg-[#F8F9F8] hover:bg-[#E5E5E5] border border-[#DFDFDF] text-gray-700 transition cursor-pointer"
                  title="Zoom Out Map"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  id="btn-map-locate-vessel"
                  onClick={() => setMapZoom(1)}
                  className="p-1 rounded bg-[#F8F9F8] hover:bg-[#E5E5E5] border border-[#DFDFDF] text-[#52796A] transition cursor-pointer"
                  title="Center on Active Vessel"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* LIGHTWEIGHT NAUTICAL CORRIDOR MAP SVG */}
            <div className="relative w-full flex-1 min-h-[260px] my-3 rounded-[12px] bg-[#F4F6F4] border border-[#DFDFDF] overflow-hidden flex items-center justify-center">
              
              <div
                className="w-full h-full transition-transform duration-300"
                style={{ transform: `scale(${mapZoom})` }}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle Map Coordinate Grid Lines */}
                  <defs>
                    <pattern id="nautical-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#DFDFDF" strokeWidth="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#nautical-grid)" />

                  {/* Stylized Coastlines (Indian Ocean / Asia / Australia Basin) */}
                  {/* India East Coast outline */}
                  <path
                    d="M 28 10 Q 32 25 35 40 Q 30 55 24 60"
                    fill="none"
                    stroke="#BAC5AC"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* SE Asia / Indonesia Archipelago */}
                  <path
                    d="M 55 45 Q 65 52 75 60"
                    fill="none"
                    stroke="#BAC5AC"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Australia Northwest Coast */}
                  <path
                    d="M 70 65 Q 85 70 88 85"
                    fill="none"
                    stroke="#BAC5AC"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* Voyage Route Curving Line */}
                  <path
                    d={`M ${ship.originPort.coordinates.x} ${ship.originPort.coordinates.y} Q 50 55 ${ship.destinationPort.coordinates.x} ${ship.destinationPort.coordinates.y}`}
                    fill="none"
                    stroke="#52796A"
                    strokeWidth="1.2"
                    strokeDasharray="2.5 1.5"
                  />

                  {/* Origin Port Pin */}
                  <g>
                    <circle
                      cx={ship.originPort.coordinates.x}
                      cy={ship.originPort.coordinates.y}
                      r="2.5"
                      fill="#212528"
                    />
                    <text
                      x={ship.originPort.coordinates.x - 2}
                      y={ship.originPort.coordinates.y - 4}
                      fontSize="3.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                      fill="#212528"
                    >
                      {ship.originPort.code}
                    </text>
                  </g>

                  {/* Destination Port Pin */}
                  <g>
                    <circle
                      cx={ship.destinationPort.coordinates.x}
                      cy={ship.destinationPort.coordinates.y}
                      r="2.8"
                      fill="#52796A"
                    />
                    <text
                      x={ship.destinationPort.coordinates.x - 4}
                      y={ship.destinationPort.coordinates.y - 4}
                      fontSize="3.8"
                      fontFamily="monospace"
                      fontWeight="bold"
                      fill="#52796A"
                    >
                      {ship.destinationPort.code}
                    </text>
                  </g>

                  {/* Active Vessel Real-Time Position Marker */}
                  <g className="animate-pulse">
                    <circle
                      cx={ship.currentPosition.coordinates.x}
                      cy={ship.currentPosition.coordinates.y}
                      r="5"
                      fill="#52796A"
                      opacity="0.25"
                    />
                    <circle
                      cx={ship.currentPosition.coordinates.x}
                      cy={ship.currentPosition.coordinates.y}
                      r="2.2"
                      fill="#52796A"
                    />
                  </g>
                </svg>
              </div>

              {/* Float Map Overlay Badge */}
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-[8px] bg-white/90 backdrop-blur-xs border border-[#DFDFDF] text-[10.5px] font-mono flex items-center justify-between text-gray-700 shadow-xs">
                <span>{ship.originPort.code} ➔ {ship.destinationPort.code}</span>
                <span className="text-[#52796A] font-bold">{ship.currentPosition.distanceCoveredNm} NM</span>
              </div>
            </div>

            {/* Destination Port Spec Summary */}
            <div className="space-y-2 pt-2 border-t border-[#E5E5E5] text-xs">
              <div className="flex items-center justify-between font-mono">
                <span className="text-gray-500">Destination Port:</span>
                <strong className="text-[#212528]">{ship.destinationPort.name}</strong>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-gray-500">Voyage Distance:</span>
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
                className="w-full mt-2 py-2 rounded-[8px] bg-[#212528] hover:bg-[#52796A] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Track Active Voyage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
