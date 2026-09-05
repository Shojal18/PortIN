import {
  PortSpecification,
  VesselClassSpecification,
  ForecastResultData,
  ComparisonScenario,
  RiskAlert,
  MarketIndexItem,
  CorridorMarketTicker,
  MarketDepthEntry,
  TradeOrder,
  PortfolioPosition
} from '../types';

export const REFERENCE_PORTS: PortSpecification[] = [
  // Indian East Coast Destination Ports (Real public reference specs)
  {
    id: 'in-paradip',
    name: 'Paradip Port',
    code: 'INPRT',
    country: 'India',
    region: 'Odisha, East Coast',
    isOrigin: false,
    isDestination: true,
    maxDraftM: 14.5, // Outer berths/mechanized coal berths max ~14.5m
    maxLoaM: 250,
    maxBeamM: 40,
    handlingRateMtPerDay: 45000,
    berthsCount: 20,
    tideRestriction: false,
    notes: 'Major multi-cargo deepwater port. Capesize requires offshore transshipment or lighterage due to 14.5m draft cap.',
    coordinates: { lat: 20.2644, lng: 86.6711 }
  },
  {
    id: 'in-vizag',
    name: 'Visakhapatnam Port',
    code: 'INVTZ',
    country: 'India',
    region: 'Andhra Pradesh, East Coast',
    isOrigin: false,
    isDestination: true,
    maxDraftM: 18.1, // Outer Harbor (VGCB terminal handles fully laden Capesize up to 18.1m draft)
    maxLoaM: 280,
    maxBeamM: 45,
    handlingRateMtPerDay: 55000,
    berthsCount: 24,
    tideRestriction: false,
    notes: 'Premier major port on East Coast. Outer harbor can accommodate Capesize vessels up to 200,000 DWT.',
    coordinates: { lat: 17.6868, lng: 83.2185 }
  },
  {
    id: 'in-gangavaram',
    name: 'Gangavaram Port',
    code: 'INGVP',
    country: 'India',
    region: 'Andhra Pradesh, East Coast',
    isOrigin: false,
    isDestination: true,
    maxDraftM: 18.5, // Ultra-deepwater private non-major port
    maxLoaM: 300,
    maxBeamM: 50,
    handlingRateMtPerDay: 60000,
    berthsCount: 9,
    tideRestriction: false,
    notes: 'One of the deepest ports in India. All-weather deep water multi-purpose port capable of handling Capesize vessels directly.',
    coordinates: { lat: 17.6167, lng: 83.2333 }
  },
  {
    id: 'in-gopalpur',
    name: 'Gopalpur Port',
    code: 'INGPR',
    country: 'India',
    region: 'Odisha, East Coast',
    isOrigin: false,
    isDestination: true,
    maxDraftM: 13.0,
    maxLoaM: 225,
    maxBeamM: 33,
    handlingRateMtPerDay: 30000,
    berthsCount: 6,
    tideRestriction: false,
    notes: 'All-weather port in Southern Odisha. Accommodates Handysize and Supramax, limited Panamax on draft restrictions.',
    coordinates: { lat: 19.3083, lng: 84.9667 }
  },
  {
    id: 'in-dhamra',
    name: 'Dhamra Port',
    code: 'INDHR',
    country: 'India',
    region: 'Odisha, East Coast',
    isOrigin: false,
    isDestination: true,
    maxDraftM: 18.0,
    maxLoaM: 300,
    maxBeamM: 48,
    handlingRateMtPerDay: 65000,
    berthsCount: 8,
    tideRestriction: false,
    notes: 'Deep draught bulk terminal operated by Adani Ports. Directly accommodates fully loaded Capesize bulk carriers.',
    coordinates: { lat: 20.8258, lng: 86.9742 }
  },
  {
    id: 'in-sagar',
    name: 'Sagar–Sandheads Anchorage',
    code: 'INSAG',
    country: 'India',
    region: 'West Bengal, Hooghly Estuary',
    isOrigin: false,
    isDestination: true,
    maxDraftM: 11.5, // River channel approach direct is ~11.5m; offshore transshipment allows lighterage
    maxLoaM: 210,
    maxBeamM: 32.5,
    handlingRateMtPerDay: 25000,
    berthsCount: 4,
    tideRestriction: true,
    notes: 'Anchorage lighterage point for Kolkata/Haldia complex. Tidal draft windows require strict tidal scheduling.',
    coordinates: { lat: 21.6500, lng: 88.0500 }
  },
  {
    id: 'in-haldia',
    name: 'Haldia Dock Complex',
    code: 'INHAL',
    country: 'India',
    region: 'West Bengal, Riverine Port',
    isOrigin: false,
    isDestination: true,
    maxDraftM: 8.5, // Heavily constrained by Hooghly river sandbars and tidal drafts
    maxLoaM: 190,
    maxBeamM: 31,
    handlingRateMtPerDay: 22000,
    berthsCount: 14,
    tideRestriction: true,
    notes: 'Strict riverine draft ceiling (8.0-8.5m). Requires Handysize or double-banking/lighterage at Sandheads for larger vessels.',
    coordinates: { lat: 22.0222, lng: 88.0644 }
  },

  // Major Global Export Hubs
  {
    id: 'au-haypoint',
    name: 'Australia (Hay Point / Dalrymple Bay)',
    code: 'AUHPT',
    country: 'Australia',
    region: 'Queensland, Coral Sea',
    isOrigin: true,
    isDestination: false,
    maxDraftM: 20.0,
    maxLoaM: 330,
    maxBeamM: 55,
    handlingRateMtPerDay: 120000,
    berthsCount: 7,
    tideRestriction: false,
    notes: 'One of the world’s largest metallurgical & thermal coal export terminals.',
    coordinates: { lat: -21.2833, lng: 149.3000 }
  },
  {
    id: 'us-neworleans',
    name: 'United States (New Orleans / Mississippi)',
    code: 'USMSX',
    country: 'United States',
    region: 'Gulf of Mexico / Mississippi River',
    isOrigin: true,
    isDestination: false,
    maxDraftM: 15.2,
    maxLoaM: 275,
    maxBeamM: 45,
    handlingRateMtPerDay: 75000,
    berthsCount: 12,
    tideRestriction: false,
    notes: 'Major global agricultural grain and high-grade metallurgical coal exporting corridor.',
    coordinates: { lat: 29.9511, lng: -90.0715 }
  },
  {
    id: 'mz-maputo',
    name: 'Mozambique (Maputo / Matola Coal Terminal)',
    code: 'MZMPT',
    country: 'Mozambique',
    region: 'Southern Africa, Indian Ocean',
    isOrigin: true,
    isDestination: false,
    maxDraftM: 14.5,
    maxLoaM: 260,
    maxBeamM: 42,
    handlingRateMtPerDay: 40000,
    berthsCount: 5,
    tideRestriction: false,
    notes: 'Key South/East African export gate for thermal coal and chrome ore to India.',
    coordinates: { lat: -25.9692, lng: 32.5732 }
  },
  {
    id: 'ru-novorossiysk',
    name: 'Russia (Novorossiysk / Black Sea)',
    code: 'RUNVS',
    country: 'Russia',
    region: 'Black Sea',
    isOrigin: true,
    isDestination: false,
    maxDraftM: 14.0,
    maxLoaM: 250,
    maxBeamM: 40,
    handlingRateMtPerDay: 50000,
    berthsCount: 10,
    tideRestriction: false,
    notes: 'Critical gateway for Russian fertilizer, wheat/grain, and steam coal bound for Asia.',
    coordinates: { lat: 44.7239, lng: 37.7686 }
  },
  {
    id: 'id-taboneo',
    name: 'Indonesia (Taboneo Anchorage / South Kalimantan)',
    code: 'IDTBN',
    country: 'Indonesia',
    region: 'Java Sea / Kalimantan',
    isOrigin: true,
    isDestination: false,
    maxDraftM: 18.0,
    maxLoaM: 300,
    maxBeamM: 48,
    handlingRateMtPerDay: 60000,
    berthsCount: 15,
    tideRestriction: false,
    notes: 'Prime anchorage hub for Indonesian sub-bituminous thermal coal via floating cranes.',
    coordinates: { lat: -3.7333, lng: 114.4667 }
  }
];

export const REFERENCE_VESSELS: VesselClassSpecification[] = [
  {
    id: 'vessel-handysize',
    name: 'Handysize',
    dwtMin: 30000,
    dwtMax: 40000,
    draftMinM: 10.0,
    draftMaxM: 10.8,
    loaMinM: 170,
    loaMaxM: 185,
    beamMinM: 27.0,
    beamMaxM: 28.5,
    typicalSpeedKnots: 13.0,
    fuelConsumptionTonnesDay: 19.5,
    dailyHireBaseUsd: 11500,
    typicalCargo: ['Fertilizer', 'Grain', 'Bauxite', 'Coal – Thermal', 'Other Bulk Cargo'],
    description: 'Highly versatile geared bulk carrier with onboard cranes. Capable of accessing shallow and draft-restricted riverine ports like Haldia.'
  },
  {
    id: 'vessel-supramax',
    name: 'Supramax',
    dwtMin: 50000,
    dwtMax: 64000,
    draftMinM: 12.2,
    draftMaxM: 13.0,
    loaMinM: 190,
    loaMaxM: 200,
    beamMinM: 32.2,
    beamMaxM: 32.3,
    typicalSpeedKnots: 13.5,
    fuelConsumptionTonnesDay: 24.0,
    dailyHireBaseUsd: 14200,
    typicalCargo: ['Coal – Thermal', 'Coal – Coking', 'Iron Ore', 'Grain', 'Fertilizer', 'Bauxite'],
    description: 'Workhorse of modern bulk shipping. Equipped with four 30t cranes + grabs. Highly flexible port access across all major Indian deepwater terminals.'
  },
  {
    id: 'vessel-panamax',
    name: 'Panamax',
    dwtMin: 65000,
    dwtMax: 82000,
    draftMinM: 13.8,
    draftMaxM: 14.8,
    loaMinM: 225,
    loaMaxM: 229,
    beamMinM: 32.26,
    beamMaxM: 32.3,
    typicalSpeedKnots: 14.0,
    fuelConsumptionTonnesDay: 28.5,
    dailyHireBaseUsd: 16800,
    typicalCargo: ['Coal – Thermal', 'Coal – Coking', 'Iron Ore', 'Grain', 'Bauxite'],
    description: 'Gearless or geared dry bulk carrier optimized for high-volume coal/mineral routes. High economies of scale when port draft exceeds 14.0m.'
  },
  {
    id: 'vessel-capesize',
    name: 'Capesize',
    dwtMin: 110000,
    dwtMax: 180000,
    draftMinM: 16.5,
    draftMaxM: 18.5,
    loaMinM: 280,
    loaMaxM: 300,
    beamMinM: 45.0,
    beamMaxM: 47.0,
    typicalSpeedKnots: 14.5,
    fuelConsumptionTonnesDay: 42.0,
    dailyHireBaseUsd: 22500,
    typicalCargo: ['Iron Ore', 'Coal – Thermal', 'Coal – Coking', 'Bauxite'],
    description: 'Ultra-large bulk carrier delivering maximum freight volume economics. Requires ultra-deepwater berths (Gangavaram, Dhamra, Vizag Outer) or offshore lighterage.'
  }
];

// Nautical Distances (Nautical Miles) between Global Origins and East Coast India
export const ROUTE_DISTANCES_NM: Record<string, Record<string, number>> = {
  'au-haypoint': {
    'in-paradip': 4850,
    'in-vizag': 4720,
    'in-gangavaram': 4710,
    'in-gopalpur': 4790,
    'in-dhamra': 4890,
    'in-sagar': 4960,
    'in-haldia': 5010
  },
  'us-neworleans': {
    'in-paradip': 9450,
    'in-vizag': 9350,
    'in-gangavaram': 9340,
    'in-gopalpur': 9410,
    'in-dhamra': 9490,
    'in-sagar': 9560,
    'in-haldia': 9610
  },
  'mz-maputo': {
    'in-paradip': 4380,
    'in-vizag': 4260,
    'in-gangavaram': 4250,
    'in-gopalpur': 4320,
    'in-dhamra': 4410,
    'in-sagar': 4490,
    'in-haldia': 4540
  },
  'ru-novorossiysk': {
    'in-paradip': 5650,
    'in-vizag': 5530,
    'in-gangavaram': 5520,
    'in-gopalpur': 5590,
    'in-dhamra': 5680,
    'in-sagar': 5760,
    'in-haldia': 5810
  },
  'id-taboneo': {
    'in-paradip': 2180,
    'in-vizag': 2060,
    'in-gangavaram': 2050,
    'in-gopalpur': 2120,
    'in-dhamra': 2210,
    'in-sagar': 2290,
    'in-haldia': 2340
  }
};

// 90-Day Synthetic Multi-Factor Forecast Series for Benchmark Corridor
const generateBenchmarkSeries = () => {
  const points = [];
  const baseRate = 19.72;
  const startDate = new Date('2026-09-01');

  let prevClose = baseRate;
  const rates: number[] = [];

  for (let i = 0; i < 90; i++) {
    const d = new Date(startDate.getTime() + i * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    
    // October dip: day 35 to 55 is ~Oct 05 to Oct 25
    const dip = i >= 35 && i <= 55 ? -1.35 * Math.sin(((i - 35) / 20) * Math.PI) : (i > 55 ? (i - 55) * 0.12 : 0);
    const noise = Math.sin(i * 0.4) * 0.35 + Math.cos(i * 0.2) * 0.2;
    const predicted = Math.max(14.0, Math.round((baseRate + dip + noise) * 100) / 100);
    const lowerBound = Math.round((predicted - 1.25 - (i * 0.015)) * 100) / 100;
    const upperBound = Math.round((predicted + 1.35 + (i * 0.02)) * 100) / 100;

    rates.push(predicted);
    
    // Candlestick simulated metrics
    const open = prevClose;
    const close = predicted;
    const high = Math.round((Math.max(open, close) + Math.abs(Math.sin(i * 0.7)) * 0.45) * 100) / 100;
    const low = Math.round((Math.min(open, close) - Math.abs(Math.cos(i * 0.5)) * 0.40) * 100) / 100;
    prevClose = close;

    // Daily simulated fixture volume in MT (e.g. 45k to 130k MT)
    const volumeMt = Math.round(55000 + Math.abs(Math.sin(i * 0.3)) * 65000 + (i >= 35 && i <= 55 ? 35000 : 0));

    // EMA 20 approximation
    const k = 2 / (20 + 1);
    let ema20 = predicted;
    if (i > 0 && points[i - 1]?.ema20 !== undefined) {
      ema20 = Math.round((predicted * k + (points[i - 1].ema20! * (1 - k))) * 100) / 100;
    }

    points.push({
      date: dateStr,
      predictedRate: predicted,
      lowerBound,
      upperBound,
      historicalSpot: i < 5 ? 19.72 : undefined,
      open,
      high,
      low,
      close,
      volumeMt,
      ema20
    });
  }
  return points;
};

export const INITIAL_BENCHMARK_FORECAST: ForecastResultData = {
  id: 'fc-sih2026-au-paradip-1',
  createdAt: '2026-08-27T08:00:00Z',
  request: {
    cargoType: 'Coal – Thermal',
    cargoVolumeMt: 120000,
    originId: 'au-haypoint',
    destinationId: 'in-paradip',
    durationType: 'short',
    startDate: '2026-09-01',
    endDate: '2026-11-30',
    forecastHorizonDays: 90
  },
  origin: REFERENCE_PORTS[7], // Australia Hay Point
  destination: REFERENCE_PORTS[0], // Paradip Port
  currentSpotRate: 19.72,
  lowestPredictedRate: 18.40,
  average90DayRate: 21.35,
  highestPredictedRate: 27.80,
  summaryDecisionKey: 'au-haypoint_in-paradip_Coal – Thermal_short',
  forecastSeries: generateBenchmarkSeries(),
  optimalWindow: {
    startDate: '2026-10-12',
    endDate: '2026-10-26',
    lowestPredictedRate: 18.40,
    savingsVsCurrentSpotPct: 6.8,
    recommendedVesselClass: 'Supramax',
    summaryText: 'Optimal seasonal entry window detected in mid-October before winter restocking peak drives Panamax & Supramax freight upward.'
  },
  vessels: [
    {
      vesselClass: 'Supramax',
      dwtCapacity: 64000,
      feasible: true,
      failureReasons: [],
      portChecks: {
        draft: { metric: 'Maximum Draft', vesselValue: 13.0, portLimit: 14.5, unit: 'm', passed: true, marginText: '1.5m safe draft clearance' },
        loa: { metric: 'Length Overall', vesselValue: 200, portLimit: 250, unit: 'm', passed: true, marginText: '50m safe berth margin' },
        beam: { metric: 'Vessel Beam', vesselValue: 32.3, portLimit: 40, unit: 'm', passed: true, marginText: '7.7m channel clearance' },
        dwt: { metric: 'Parcel Fit', vesselValue: 64000, portLimit: 120000, unit: 'MT', passed: true, marginText: 'Requires 2 shipments (60k MT parcel)' }
      },
      costs: {
        forecastFreightRatePerTonne: 18.40,
        bunkerFuelSurchargePerTonne: 4.82,
        portOperationalDuesPerTonne: 1.25,
        congestionDelaySurchargePerTonne: 0.95,
        totalCostPerTonne: 25.42,
        totalVoyageCostUsd: 3050400
      },
      recommended: true,
      rank: 1,
      recommendationReason: 'Optimal verified choice. 100% compliant with Paradip 14.5m draft cap. Lowest total voyage cost ($25.42/MT).'
    },
    {
      vesselClass: 'Handysize',
      dwtCapacity: 38000,
      feasible: true,
      failureReasons: [],
      portChecks: {
        draft: { metric: 'Maximum Draft', vesselValue: 10.5, portLimit: 14.5, unit: 'm', passed: true, marginText: '4.0m safe draft clearance' },
        loa: { metric: 'Length Overall', vesselValue: 180, portLimit: 250, unit: 'm', passed: true, marginText: '70m safe berth margin' },
        beam: { metric: 'Vessel Beam', vesselValue: 30.0, portLimit: 40, unit: 'm', passed: true, marginText: '10.0m channel clearance' },
        dwt: { metric: 'Parcel Fit', vesselValue: 38000, portLimit: 120000, unit: 'MT', passed: true, marginText: 'Requires ~3.2 shipments' }
      },
      costs: {
        forecastFreightRatePerTonne: 21.34,
        bunkerFuelSurchargePerTonne: 5.40,
        portOperationalDuesPerTonne: 1.25,
        congestionDelaySurchargePerTonne: 0.85,
        totalCostPerTonne: 28.84,
        totalVoyageCostUsd: 3460800
      },
      recommended: false,
      rank: 2,
      recommendationReason: 'Fully compliant with port constraints, but higher freight per tonne due to smaller parcel economies.'
    },
    {
      vesselClass: 'Panamax',
      dwtCapacity: 82000,
      feasible: false,
      failureReasons: ['Fully laden draft 14.8m exceeds Paradip Port safe draft cap of 14.5m by 0.3m.'],
      portChecks: {
        draft: { metric: 'Maximum Draft', vesselValue: 14.8, portLimit: 14.5, unit: 'm', passed: false, marginText: '0.3m draft violation (requires short-loading)' },
        loa: { metric: 'Length Overall', vesselValue: 229, portLimit: 250, unit: 'm', passed: true, marginText: '21m safe berth margin' },
        beam: { metric: 'Vessel Beam', vesselValue: 32.3, portLimit: 40, unit: 'm', passed: true, marginText: '7.7m channel clearance' },
        dwt: { metric: 'Parcel Fit', vesselValue: 82000, portLimit: 120000, unit: 'MT', passed: true, marginText: 'Requires 2 shipments' }
      },
      costs: {
        forecastFreightRatePerTonne: 16.93,
        bunkerFuelSurchargePerTonne: 4.30,
        portOperationalDuesPerTonne: 1.40,
        congestionDelaySurchargePerTonne: 1.10,
        totalCostPerTonne: 23.73,
        totalVoyageCostUsd: 2847600
      },
      recommended: false,
      rank: 99,
      recommendationReason: 'Infeasible at full deadweight. Requires short-loading to 14.2m draft to safely enter Paradip outer berth.'
    },
    {
      vesselClass: 'Capesize',
      dwtCapacity: 180000,
      feasible: false,
      failureReasons: ['Draft 18.5m exceeds Paradip Port max draft 14.5m by 4.0m.', 'LOA 292m exceeds Paradip max LOA 250m by 42m.'],
      portChecks: {
        draft: { metric: 'Maximum Draft', vesselValue: 18.5, portLimit: 14.5, unit: 'm', passed: false, marginText: '4.0m severe draft violation' },
        loa: { metric: 'Length Overall', vesselValue: 292, portLimit: 250, unit: 'm', passed: false, marginText: '42m length exceedance' },
        beam: { metric: 'Vessel Beam', vesselValue: 45.0, portLimit: 40, unit: 'm', passed: false, marginText: '5.0m beam exceedance' },
        dwt: { metric: 'Parcel Fit', vesselValue: 180000, portLimit: 120000, unit: 'MT', passed: true, marginText: 'Single shipment capable' }
      },
      costs: {
        forecastFreightRatePerTonne: 14.35,
        bunkerFuelSurchargePerTonne: 3.65,
        portOperationalDuesPerTonne: 1.65,
        congestionDelaySurchargePerTonne: 1.45,
        totalCostPerTonne: 21.10,
        totalVoyageCostUsd: 2532000
      },
      recommended: false,
      rank: 99,
      recommendationReason: 'Physically infeasible for direct berthing. Requires double-handling via transshipment/lighterage or rerouting to Dhamra/Vizag Outer.'
    }
  ],
  recommendedVessel: {
    vesselClass: 'Supramax',
    dwtCapacity: 64000,
    feasible: true,
    failureReasons: [],
    portChecks: {
      draft: { metric: 'Maximum Draft', vesselValue: 13.0, portLimit: 14.5, unit: 'm', passed: true, marginText: '1.5m safe draft clearance' },
      loa: { metric: 'Length Overall', vesselValue: 200, portLimit: 250, unit: 'm', passed: true, marginText: '50m safe berth margin' },
      beam: { metric: 'Vessel Beam', vesselValue: 32.3, portLimit: 40, unit: 'm', passed: true, marginText: '7.7m channel clearance' },
      dwt: { metric: 'Parcel Fit', vesselValue: 64000, portLimit: 120000, unit: 'MT', passed: true, marginText: 'Requires 2 shipments (60k MT parcel)' }
    },
    costs: {
      forecastFreightRatePerTonne: 18.40,
      bunkerFuelSurchargePerTonne: 4.82,
      portOperationalDuesPerTonne: 1.25,
      congestionDelaySurchargePerTonne: 0.95,
      totalCostPerTonne: 25.42,
      totalVoyageCostUsd: 3050400
    },
    recommended: true,
    rank: 1,
    recommendationReason: 'Optimal verified choice. 100% compliant with Paradip 14.5m draft cap. Lowest total voyage cost ($25.42/MT).'
  },
  risks: [
    {
      id: 'risk-1',
      title: 'Paradip Mechanized Coal Berth Congestion',
      severity: 'medium',
      category: 'congestion',
      portName: 'Paradip Port',
      description: 'Average anchorage waiting queue currently 2.5 to 3.5 days for bulk thermal coal vessels.',
      mitigationAdvice: 'Incorporate 3-day laytime buffer in charter party agreement and specify notice of readiness terms.',
      estimatedDelayDays: '2.5–3.5 Days',
      costImpactUsdPerTonne: 0.95,
      createdAt: '2026-08-27T08:00:00Z',
      reviewed: false
    },
    {
      id: 'risk-2',
      title: 'Bay of Bengal Post-Monsoon Cyclone Watch',
      severity: 'medium',
      category: 'weather',
      portName: 'Odisha Coastal Corridors',
      description: 'Seasonal depression activity in northern Bay of Bengal during October may cause 24-48 hr pilotage suspension.',
      mitigationAdvice: 'Monitor IMD marine weather bulletins; consider southern passage routing via Sri Lanka coast.',
      estimatedDelayDays: '1.0–2.0 Days',
      costImpactUsdPerTonne: 0.50,
      createdAt: '2026-08-27T08:00:00Z',
      reviewed: false
    },
    {
      id: 'risk-3',
      title: 'VLSFO Fuel Index Sensitivity',
      severity: 'low',
      category: 'volatility',
      description: 'Bunker fuel prices in Singapore hub have stabilized around $580/MT (+/- 2.1% volatility).',
      mitigationAdvice: 'Lock bunker adjustment factor (BAF) clause with 5% risk-sharing band.',
      costImpactUsdPerTonne: 0.20,
      createdAt: '2026-08-27T08:00:00Z',
      reviewed: true
    }
  ]
};

export const INITIAL_RISK_ALERTS: RiskAlert[] = [
  ...INITIAL_BENCHMARK_FORECAST.risks,
  {
    id: 'risk-4',
    title: 'Haldia Riverine Draft Restriction',
    severity: 'high',
    category: 'congestion',
    portName: 'Haldia Dock Complex',
    description: 'Siltation in Hooghly shipping channel restricts draft to 8.2m for deep draught bulk vessels.',
    mitigationAdvice: 'Mandatory transshipment/lighterage at Sandheads anchorage before upstream transit.',
    estimatedDelayDays: '4.0–6.0 Days',
    costImpactUsdPerTonne: 2.80,
    createdAt: '2026-08-27T08:00:00Z',
    reviewed: false
  },
  {
    id: 'risk-5',
    title: 'Visakhapatnam Outer Harbor High Efficiency',
    severity: 'low',
    category: 'idle_time',
    portName: 'Visakhapatnam Port',
    description: 'Zero berth queue at VGCB terminal; daily discharge rate exceeding 55,000 MT/day.',
    mitigationAdvice: 'Favorable alternate discharge port for Capesize parcel division.',
    estimatedDelayDays: '0 Days',
    costImpactUsdPerTonne: 0.00,
    createdAt: '2026-08-27T08:00:00Z',
    reviewed: true
  }
];

export const INITIAL_COMPARISONS: ComparisonScenario[] = [
  {
    id: 'cmp-1',
    name: 'Australia (Hay Point) ➔ Paradip (Supramax)',
    originName: 'Hay Point, Australia',
    destinationName: 'Paradip Port',
    cargoType: 'Coal – Thermal',
    cargoVolumeMt: 120000,
    selectedVessel: 'Supramax',
    isFeasible: true,
    forecastRatePerTonne: 18.40,
    fuelCostPerTonne: 4.82,
    totalCostPerTonne: 25.42,
    optimalWindow: 'Oct 12 – Oct 26',
    riskLevel: 'medium'
  },
  {
    id: 'cmp-2',
    name: 'Australia (Hay Point) ➔ Dhamra (Capesize)',
    originName: 'Hay Point, Australia',
    destinationName: 'Dhamra Port',
    cargoType: 'Coal – Thermal',
    cargoVolumeMt: 120000,
    selectedVessel: 'Capesize',
    isFeasible: true,
    forecastRatePerTonne: 14.35,
    fuelCostPerTonne: 3.65,
    totalCostPerTonne: 20.45,
    optimalWindow: 'Oct 08 – Oct 22',
    riskLevel: 'low'
  },
  {
    id: 'cmp-3',
    name: 'Australia (Hay Point) ➔ Paradip (Capesize)',
    originName: 'Hay Point, Australia',
    destinationName: 'Paradip Port',
    cargoType: 'Coal – Thermal',
    cargoVolumeMt: 120000,
    selectedVessel: 'Capesize',
    isFeasible: false,
    forecastRatePerTonne: 14.35,
    fuelCostPerTonne: 3.65,
    totalCostPerTonne: 21.10,
    optimalWindow: 'Infeasible (Draft Failure)',
    riskLevel: 'high'
  }
];

// ==========================================
// GROWW / STOCK TRADING APP DATA STRUCTURES
// ==========================================

export const MARKET_INDICES: MarketIndexItem[] = [
  {
    symbol: 'BDI',
    name: 'Baltic Dry Index',
    currentValue: 1842.0,
    changeValue: 43.5,
    changePct: 2.42,
    unit: 'pts',
    sparkline: [1780, 1795, 1810, 1798, 1825, 1830, 1842],
    high24h: 1855.0,
    low24h: 1785.0,
    category: 'index'
  },
  {
    symbol: 'BSI (Supramax)',
    name: 'Baltic Supramax Index',
    currentValue: 18.40,
    changeValue: -0.25,
    changePct: -1.34,
    unit: '$/MT',
    sparkline: [19.2, 19.0, 18.8, 18.65, 18.5, 18.45, 18.40],
    high24h: 18.75,
    low24h: 18.35,
    category: 'index'
  },
  {
    symbol: 'BPI (Panamax)',
    name: 'Baltic Panamax Index',
    currentValue: 16.90,
    changeValue: 0.15,
    changePct: 0.90,
    unit: '$/MT',
    sparkline: [16.5, 16.6, 16.7, 16.65, 16.8, 16.85, 16.90],
    high24h: 17.10,
    low24h: 16.45,
    category: 'index'
  },
  {
    symbol: 'BCI (Capesize)',
    name: 'Baltic Capesize Index',
    currentValue: 24.10,
    changeValue: 0.72,
    changePct: 3.08,
    unit: '$/MT',
    sparkline: [22.8, 23.1, 23.4, 23.2, 23.7, 23.9, 24.1],
    high24h: 24.40,
    low24h: 22.90,
    category: 'index'
  },
  {
    symbol: 'VLSFO (SG)',
    name: 'Singapore Bunker 0.5%',
    currentValue: 582.50,
    changeValue: -2.30,
    changePct: -0.39,
    unit: '$/MT',
    sparkline: [592, 589, 587, 586, 584, 583, 582.5],
    high24h: 588.0,
    low24h: 580.5,
    category: 'bunker'
  },
  {
    symbol: 'GFCI (East Coast)',
    name: 'Port Congestion Index',
    currentValue: 2.8,
    changeValue: 0.3,
    changePct: 12.0,
    unit: 'Days Avg',
    sparkline: [2.2, 2.3, 2.4, 2.6, 2.7, 2.75, 2.8],
    high24h: 3.5,
    low24h: 2.1,
    category: 'congestion'
  }
];

export const CORRIDOR_MARKET_TICKERS: CorridorMarketTicker[] = [
  {
    id: 'corridor-au-pdp',
    symbol: 'AU-PDP',
    route: 'Hay Point ➔ Paradip Port',
    cargo: 'Coal – Thermal',
    primaryVessel: 'Supramax',
    spotRate: 19.72,
    forecastRate: 18.40,
    change24h: -1.32,
    change24hPct: -6.70,
    volumeMt24h: 185000,
    high52w: 27.80,
    low52w: 16.20,
    signal: 'STRONG BUY',
    optimalWindow: 'Oct 12 – Oct 26',
    portFeasible: true,
    savingsPotentialPct: 6.8,
    sparkline: [21.5, 20.8, 20.2, 19.8, 19.2, 18.7, 18.4]
  },
  {
    id: 'corridor-au-dhm',
    symbol: 'AU-DHM',
    route: 'Hay Point ➔ Dhamra Port',
    cargo: 'Coal – Thermal',
    primaryVessel: 'Capesize',
    spotRate: 15.60,
    forecastRate: 14.35,
    change24h: -1.25,
    change24hPct: -8.01,
    volumeMt24h: 240000,
    high52w: 22.40,
    low52w: 13.50,
    signal: 'STRONG BUY',
    optimalWindow: 'Oct 08 – Oct 22',
    portFeasible: true,
    savingsPotentialPct: 8.0,
    sparkline: [17.2, 16.8, 16.1, 15.6, 15.0, 14.6, 14.35]
  },
  {
    id: 'corridor-za-vtz',
    symbol: 'ZA-VTZ',
    route: 'Richards Bay ➔ Visakhapatnam',
    cargo: 'Coal – Thermal',
    primaryVessel: 'Capesize',
    spotRate: 20.45,
    forecastRate: 19.10,
    change24h: -1.35,
    change24hPct: -6.60,
    volumeMt24h: 160000,
    high52w: 29.50,
    low52w: 17.80,
    signal: 'ACCUMULATE',
    optimalWindow: 'Oct 15 – Nov 05',
    portFeasible: true,
    savingsPotentialPct: 6.6,
    sparkline: [22.0, 21.4, 20.8, 20.1, 19.7, 19.3, 19.1]
  },
  {
    id: 'corridor-id-hld',
    symbol: 'ID-HLD',
    route: 'Taboneo ➔ Haldia Dock',
    cargo: 'Coal – Thermal',
    primaryVessel: 'Handysize',
    spotRate: 12.85,
    forecastRate: 12.10,
    change24h: -0.75,
    change24hPct: -5.84,
    volumeMt24h: 95000,
    high52w: 16.50,
    low52w: 10.80,
    signal: 'ACCUMULATE',
    optimalWindow: 'Oct 20 – Nov 10',
    portFeasible: true,
    savingsPotentialPct: 5.8,
    sparkline: [13.4, 13.1, 12.8, 12.5, 12.3, 12.2, 12.1]
  },
  {
    id: 'corridor-br-gvr',
    symbol: 'BR-GVR',
    route: 'Tubarao ➔ Gangavaram',
    cargo: 'Iron Ore',
    primaryVessel: 'Capesize',
    spotRate: 23.50,
    forecastRate: 22.10,
    change24h: -1.40,
    change24hPct: -5.96,
    volumeMt24h: 320000,
    high52w: 33.00,
    low52w: 19.50,
    signal: 'STRONG BUY',
    optimalWindow: 'Oct 05 – Oct 20',
    portFeasible: true,
    savingsPotentialPct: 6.0,
    sparkline: [25.1, 24.6, 23.9, 23.2, 22.7, 22.4, 22.1]
  },
  {
    id: 'corridor-us-pdp',
    symbol: 'US-PDP',
    route: 'Hampton Roads ➔ Paradip',
    cargo: 'Coal – Coking',
    primaryVessel: 'Panamax',
    spotRate: 31.20,
    forecastRate: 30.50,
    change24h: 0.45,
    change24hPct: 1.46,
    volumeMt24h: 80000,
    high52w: 42.00,
    low52w: 28.00,
    signal: 'HOLD',
    optimalWindow: 'Nov 10 – Nov 25',
    portFeasible: false, // 14.8m draft exceeds Paradip
    savingsPotentialPct: 2.2,
    sparkline: [30.2, 30.5, 30.8, 31.0, 31.2, 31.0, 30.5]
  }
];

export const SAMPLE_MARKET_DEPTH = {
  bids: [
    { priceUsd: 18.35, quantityMt: 65000, totalVolumeMt: 65000, chartererOrOwner: 'JSW Steel Energy' },
    { priceUsd: 18.30, quantityMt: 120000, totalVolumeMt: 185000, chartererOrOwner: 'Tata Power Logistics' },
    { priceUsd: 18.25, quantityMt: 60000, totalVolumeMt: 245000, chartererOrOwner: 'NTPC Coastal Fleet' },
    { priceUsd: 18.15, quantityMt: 180000, totalVolumeMt: 425000, chartererOrOwner: 'Steel Authority India (SAIL)' },
    { priceUsd: 18.00, quantityMt: 120000, totalVolumeMt: 545000, chartererOrOwner: 'Adani Resource Charter' }
  ],
  asks: [
    { priceUsd: 18.45, quantityMt: 64000, totalVolumeMt: 64000, chartererOrOwner: 'Oldendorff Carriers (Supramax)' },
    { priceUsd: 18.50, quantityMt: 128000, totalVolumeMt: 192000, chartererOrOwner: 'Pacific Basin Bulk (2x Supra)' },
    { priceUsd: 18.60, quantityMt: 82000, totalVolumeMt: 274000, chartererOrOwner: 'Star Bulk Dry (Panamax Spec)' },
    { priceUsd: 18.75, quantityMt: 180000, totalVolumeMt: 454000, chartererOrOwner: 'Berge Bulk Line (Capesize)' },
    { priceUsd: 19.00, quantityMt: 130000, totalVolumeMt: 584000, chartererOrOwner: 'Golden Ocean Group' }
  ]
};

export const SAMPLE_TRADE_ORDERS: TradeOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'FIQ-2026-8821',
    symbol: 'AU-PDP',
    route: 'Hay Point ➔ Paradip Port',
    originName: 'Hay Point, Australia',
    destinationName: 'Paradip Port',
    cargoType: 'Coal – Thermal',
    vesselClass: 'Supramax',
    orderType: 'OPTIMAL_SEASONAL',
    action: 'BUY_CHARTER',
    volumeMt: 120000,
    strikeRatePerTonne: 18.40,
    totalConsiderationUsd: 2208000,
    status: 'ACTIVE_VOYAGE',
    savingsRealizedUsd: 158400,
    savingsPct: 6.8,
    laytimeDays: 3.5,
    createdAt: '2026-08-26T14:30:00Z',
    executionDate: '2026-10-14',
    vesselName: 'MV Odisha Pioneer (64k DWT)'
  },
  {
    id: 'ord-102',
    orderNumber: 'FIQ-2026-8804',
    symbol: 'AU-DHM',
    route: 'Hay Point ➔ Dhamra Port',
    originName: 'Hay Point, Australia',
    destinationName: 'Dhamra Port',
    cargoType: 'Coal – Thermal',
    vesselClass: 'Capesize',
    orderType: 'SPOT_MARKET',
    action: 'BUY_CHARTER',
    volumeMt: 180000,
    strikeRatePerTonne: 14.35,
    totalConsiderationUsd: 2583000,
    status: 'EXECUTED',
    savingsRealizedUsd: 225000,
    savingsPct: 8.0,
    laytimeDays: 2.8,
    createdAt: '2026-08-25T09:15:00Z',
    executionDate: '2026-10-09',
    vesselName: 'MV Dhamra Express (180k DWT)'
  },
  {
    id: 'ord-103',
    orderNumber: 'FIQ-2026-8790',
    symbol: 'ID-HLD',
    route: 'Taboneo ➔ Haldia Dock',
    originName: 'Taboneo Anchorage, Indonesia',
    destinationName: 'Haldia Dock Complex',
    cargoType: 'Coal – Thermal',
    vesselClass: 'Handysize',
    orderType: 'LIMIT_STRIKE',
    action: 'BUY_CHARTER',
    volumeMt: 40000,
    strikeRatePerTonne: 12.10,
    totalConsiderationUsd: 484000,
    status: 'PENDING_TRIGGER',
    savingsRealizedUsd: 30000,
    savingsPct: 5.8,
    laytimeDays: 4.5,
    createdAt: '2026-08-27T11:00:00Z'
  },
  {
    id: 'ord-104',
    orderNumber: 'FIQ-2026-8752',
    symbol: 'ZA-VTZ',
    route: 'Richards Bay ➔ Visakhapatnam',
    originName: 'Richards Bay, South Africa',
    destinationName: 'Visakhapatnam Port',
    cargoType: 'Coal – Thermal',
    vesselClass: 'Capesize',
    orderType: 'BAF_HEDGED',
    action: 'HEDGE_FORWARD',
    volumeMt: 160000,
    strikeRatePerTonne: 19.10,
    totalConsiderationUsd: 3056000,
    status: 'COMPLETED',
    savingsRealizedUsd: 216000,
    savingsPct: 6.6,
    laytimeDays: 2.2,
    createdAt: '2026-08-10T16:20:00Z',
    executionDate: '2026-08-22',
    vesselName: 'MV Vizag Star (175k DWT)'
  }
];

export const SAMPLE_PORTFOLIO_POSITIONS: PortfolioPosition[] = [
  {
    id: 'pos-1',
    orderId: 'ord-101',
    vesselName: 'MV Odisha Pioneer',
    vesselClass: 'Supramax (64,000 DWT)',
    route: 'Hay Point ➔ Paradip Port',
    cargo: 'Coal – Thermal (60k MT Parcel #1)',
    volumeMt: 60000,
    contractRatePerTonne: 18.40,
    currentMarketRatePerTonne: 19.72,
    unrealizedPnlUsd: 79200,
    unrealizedPnlPct: 7.17,
    voyageStatus: 'In Transit – Bay of Bengal',
    progressPct: 68,
    eta: 'Oct 16, 2026',
    demurrageRisk: 'Low'
  },
  {
    id: 'pos-2',
    orderId: 'ord-102',
    vesselName: 'MV Dhamra Express',
    vesselClass: 'Capesize (180,000 DWT)',
    route: 'Hay Point ➔ Dhamra Port',
    cargo: 'Coal – Thermal (180k MT Full Cargo)',
    volumeMt: 180000,
    contractRatePerTonne: 14.35,
    currentMarketRatePerTonne: 15.60,
    unrealizedPnlUsd: 225000,
    unrealizedPnlPct: 8.71,
    voyageStatus: 'At Loading Port',
    progressPct: 24,
    eta: 'Oct 21, 2026',
    demurrageRisk: 'Low'
  },
  {
    id: 'pos-3',
    orderId: 'ord-103',
    vesselName: 'MV Bengal Trader',
    vesselClass: 'Handysize (38,000 DWT)',
    route: 'Taboneo ➔ Haldia Dock',
    cargo: 'Coal – Thermal (38k MT)',
    volumeMt: 38000,
    contractRatePerTonne: 12.10,
    currentMarketRatePerTonne: 12.85,
    unrealizedPnlUsd: 28500,
    unrealizedPnlPct: 6.20,
    voyageStatus: 'Approaching Anchorage',
    progressPct: 92,
    eta: 'Sep 02, 2026',
    demurrageRisk: 'Medium'
  }
];

export const LIVE_STREAM_TRADES = [
  { time: 'Just now', symbol: 'AU-PDP', text: 'JSW Steel booked 60,000 MT Supramax @ $18.35/T (Paradip)', type: 'buy' },
  { time: '4m ago', symbol: 'AU-DHM', text: 'Tata Power fixed 180,000 MT Capesize @ $14.30/T (Dhamra)', type: 'buy' },
  { time: '11m ago', symbol: 'BDI', text: 'Baltic Dry Index ticked +8.2 pts to 1,842.00', type: 'neutral' },
  { time: '19m ago', symbol: 'ZA-VTZ', text: 'NTPC executed Forward Bunker hedge on Richards Bay ➔ Vizag', type: 'hedge' },
  { time: '28m ago', symbol: 'ID-HLD', text: 'Sandheads lighterage fixture confirmed for 38k MT @ $12.15/T', type: 'buy' }
];

