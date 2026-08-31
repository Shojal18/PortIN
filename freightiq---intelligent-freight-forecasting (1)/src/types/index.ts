export type CargoType =
  | 'Coal – Thermal'
  | 'Coal – Coking'
  | 'Iron Ore'
  | 'Grain'
  | 'Fertilizer'
  | 'Bauxite'
  | 'Other Bulk Cargo';

export type NavTab =
  | 'dashboard'
  | 'trading'
  | 'portfolio'
  | 'new-forecast'
  | 'forecast-result'
  | 'comparisons'
  | 'ports'
  | 'vessels'
  | 'alerts'
  | 'history'
  | 'settings';

export type DurationType = 'short' | 'medium'; // short: 1-3 months (90 days max), medium: 3-12 months

export interface PortSpecification {
  id: string;
  name: string;
  code: string;
  country: string;
  region: string;
  isOrigin: boolean;
  isDestination: boolean;
  maxDraftM: number;
  maxLoaM: number;
  maxBeamM: number;
  handlingRateMtPerDay: number;
  berthsCount: number;
  tideRestriction: boolean;
  notes: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface VesselClassSpecification {
  id: string;
  name: 'Handysize' | 'Supramax' | 'Panamax' | 'Capesize';
  dwtMin: number;
  dwtMax: number;
  draftMinM: number;
  draftMaxM: number;
  loaMinM: number;
  loaMaxM: number;
  beamMinM: number;
  beamMaxM: number;
  typicalSpeedKnots: number;
  fuelConsumptionTonnesDay: number;
  dailyHireBaseUsd: number;
  typicalCargo: string[];
  description: string;
}

export interface ForecastRequestInput {
  cargoType: CargoType;
  cargoVolumeMt: number;
  originId: string;
  destinationId: string;
  durationType: DurationType;
  startDate: string;
  endDate: string;
  forecastHorizonDays?: number;
}

export interface ForecastDataPoint {
  date: string;
  predictedRate: number;
  lowerBound: number;
  upperBound: number;
  historicalSpot?: number;
  bunkerPriceIndex?: number;
  congestionFactor?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volumeMt?: number;
  ema20?: number;
}

export interface MarketIndexItem {
  symbol: string;
  name: string;
  currentValue: number;
  changeValue: number;
  changePct: number;
  unit: string;
  sparkline: number[];
  high24h: number;
  low24h: number;
  category: 'index' | 'bunker' | 'congestion';
}

export interface CorridorMarketTicker {
  id: string;
  symbol: string; // e.g. 'AU-PDP'
  route: string;  // e.g. 'Hay Point ➔ Paradip'
  cargo: CargoType;
  primaryVessel: 'Supramax' | 'Panamax' | 'Capesize' | 'Handysize';
  spotRate: number; // $/MT
  forecastRate: number; // $/MT
  change24h: number;
  change24hPct: number;
  volumeMt24h: number;
  high52w: number;
  low52w: number;
  signal: 'STRONG BUY' | 'ACCUMULATE' | 'HOLD' | 'AVOID' | 'HEDGE';
  optimalWindow: string;
  portFeasible: boolean;
  savingsPotentialPct: number;
  sparkline: number[];
}

export interface MarketDepthEntry {
  priceUsd: number;
  quantityMt: number;
  totalVolumeMt: number;
  chartererOrOwner: string;
}

export interface TradeOrder {
  id: string;
  orderNumber: string;
  symbol: string;
  route: string;
  originName: string;
  destinationName: string;
  cargoType: CargoType;
  vesselClass: string;
  orderType: 'SPOT_MARKET' | 'LIMIT_STRIKE' | 'OPTIMAL_SEASONAL' | 'BAF_HEDGED';
  action: 'BUY_CHARTER' | 'HEDGE_FORWARD';
  volumeMt: number;
  strikeRatePerTonne: number;
  totalConsiderationUsd: number;
  status: 'EXECUTED' | 'ACTIVE_VOYAGE' | 'PENDING_TRIGGER' | 'COMPLETED';
  savingsRealizedUsd: number;
  savingsPct: number;
  laytimeDays: number;
  createdAt: string;
  executionDate?: string;
  vesselName?: string;
}

export interface PortfolioPosition {
  id: string;
  orderId: string;
  vesselName: string;
  vesselClass: string;
  route: string;
  cargo: string;
  volumeMt: number;
  contractRatePerTonne: number;
  currentMarketRatePerTonne: number;
  unrealizedPnlUsd: number;
  unrealizedPnlPct: number;
  voyageStatus: 'At Loading Port' | 'In Transit – Bay of Bengal' | 'Approaching Anchorage' | 'Discharging';
  progressPct: number;
  eta: string;
  demurrageRisk: 'Low' | 'Medium' | 'High';
}

export interface PortFitCheck {
  metric: string;
  vesselValue: number;
  portLimit: number;
  unit: string;
  passed: boolean;
  marginText: string;
}

export interface VesselFeasibilityAnalysis {
  vesselClass: 'Handysize' | 'Supramax' | 'Panamax' | 'Capesize';
  dwtCapacity: number;
  feasible: boolean;
  failureReasons: string[];
  portChecks: {
    draft: PortFitCheck;
    loa: PortFitCheck;
    beam: PortFitCheck;
    dwt: PortFitCheck;
  };
  costs: {
    forecastFreightRatePerTonne: number;
    bunkerFuelSurchargePerTonne: number;
    portOperationalDuesPerTonne: number;
    congestionDelaySurchargePerTonne: number;
    totalCostPerTonne: number;
    totalVoyageCostUsd: number;
  };
  recommended: boolean;
  rank: number;
  recommendationReason: string;
}

export interface RiskAlert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  category: 'congestion' | 'volatility' | 'idle_time' | 'weather' | 'geopolitical';
  description: string;
  estimatedDelayDays?: string;
  costImpactUsdPerTonne?: number;
  mitigationAdvice: string;
  reviewed?: boolean;
  portName?: string;
  createdAt: string;
}

export interface OptimalEntryWindow {
  startDate: string;
  endDate: string;
  lowestPredictedRate: number;
  savingsVsCurrentSpotPct: number;
  recommendedVesselClass: string;
  summaryText: string;
}

export interface ForecastResultData {
  id: string;
  request: ForecastRequestInput;
  origin: PortSpecification;
  destination: PortSpecification;
  currentSpotRate: number;
  average90DayRate: number;
  lowestPredictedRate: number;
  highestPredictedRate: number;
  forecastSeries: ForecastDataPoint[];
  optimalWindow: OptimalEntryWindow;
  vessels: VesselFeasibilityAnalysis[];
  recommendedVessel: VesselFeasibilityAnalysis;
  risks: RiskAlert[];
  createdAt: string;
  summaryDecisionKey: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  avatarUrl?: string;
}

export interface ComparisonScenario {
  id: string;
  name: string;
  cargoType: CargoType;
  cargoVolumeMt: number;
  originName: string;
  destinationName: string;
  selectedVessel: string;
  isFeasible: boolean;
  forecastRatePerTonne: number;
  fuelCostPerTonne: number;
  totalCostPerTonne: number;
  riskLevel: 'low' | 'medium' | 'high';
  optimalWindow: string;
}
