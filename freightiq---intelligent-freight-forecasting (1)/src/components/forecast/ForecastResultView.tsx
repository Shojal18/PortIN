import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  XCircle,
  Download,
  ShieldAlert,
  AlertTriangle,
  Ship,
  Info,
  Check,
  RotateCcw,
  TrendingDown,
  FileSpreadsheet
} from 'lucide-react';
import { ForecastResultData, VesselFeasibilityAnalysis } from '../../types';
import { useToast } from '../layout/Toast';

interface ForecastResultViewProps {
  data: ForecastResultData;
  onBackToNewForecast: () => void;
  onAddToComparison?: (vessel: VesselFeasibilityAnalysis) => void;
  onOpenTradingTicket?: () => void;
}

export const ForecastResultView: React.FC<ForecastResultViewProps> = ({
  data,
  onBackToNewForecast,
  onOpenTradingTicket
}) => {
  const { showToast } = useToast();
  const [horizonFilterDays, setHorizonFilterDays] = useState<number>(90);
  const [selectedVesselDetail, setSelectedVesselDetail] = useState<VesselFeasibilityAnalysis | null>(null);

  const displaySeries = (data.forecastSeries || []).slice(0, horizonFilterDays);

  const handleExportCsv = () => {
    if (!data.forecastSeries || data.forecastSeries.length === 0) return;

    const headers = ['Date', 'Predicted_Freight_USD_per_MT', 'Lower_Bound_95_CI', 'Upper_Bound_95_CI', 'Current_Spot_Baseline'];
    const rows = data.forecastSeries.map(p => [
      p.date,
      p.predictedRate.toFixed(2),
      p.lowerBound.toFixed(2),
      p.upperBound.toFixed(2),
      (p.historicalSpot || data.currentSpotRate).toFixed(2)
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FreightIQ_Forecast_${data.origin.code}_to_${data.destination.code}_${data.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('success', 'Export Complete', 'Forecast time-series CSV downloaded.');
  };

  const CustomForecastTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pt = payload[0].payload;
      return (
        <div className="bg-[#071522] p-3 rounded-[6px] border border-[#20384C] shadow-xl text-xs space-y-1.5 min-w-[210px] font-sans">
          <p className="font-bold text-white border-b border-[#183A52] pb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#12A6A6]" />
            <span className="font-mono text-[12px]">{label}</span>
          </p>
          <div className="flex justify-between items-center text-slate-300">
            <span>Forecast Rate:</span>
            <span className="font-bold text-[#12A6A6] font-mono text-[13px]">${pt.predictedRate?.toFixed(2)} / MT</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 text-[11.5px] font-mono">
            <span>Lower 95% CI:</span>
            <span className="text-slate-300">${pt.lowerBound?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 text-[11.5px] font-mono">
            <span>Upper 95% CI:</span>
            <span className="text-slate-300">${pt.upperBound?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 text-[11.5px] pt-1.5 border-t border-[#183A52] font-mono">
            <span>Spot Baseline:</span>
            <span className="text-slate-300">${data.currentSpotRate?.toFixed(2)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="forecast-result-screen" className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* 1. TOP HEADER */}
      <div
        id="route-summary-header"
        className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#12A6A6]" />
            <span className="text-[11px] font-bold text-[#12A6A6] uppercase tracking-wider">
              ECONOMETRIC FORECAST RESULT
            </span>
          </div>
          <h2 className="text-[18px] sm:text-[22px] font-bold text-white mt-1 flex items-center gap-2.5">
            <span>{data.origin.name}</span>
            <ArrowRight className="w-5 h-5 text-[#12A6A6]" />
            <span>{data.destination.name}</span>
          </h2>
          <p className="text-[13px] text-slate-400 mt-1 font-mono">
            {data.request.cargoType} • {data.request.cargoVolumeMt.toLocaleString()} MT • {data.request.durationType.toUpperCase()}-TERM CHARTER
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={onBackToNewForecast}
            className="px-3.5 py-2 rounded-[6px] bg-[#102337] hover:bg-[#183A52] border border-[#183A52] text-slate-300 text-[13px] font-semibold transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reconfigure</span>
          </button>
          <button
            id="btn-download-forecast-csv"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-[#102A43] hover:bg-[#153655] border border-[#183A52] text-[#12A6A6] text-[13px] font-bold transition cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#12A6A6]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. RECOMMENDED ACTION DECISION BLOCK (Analyst / Terminal Style) */}
      <div
        id="recommendation-decision-block"
        className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] border-l-4 border-l-[#12A6A6] p-5 sm:p-6 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Main Decision */}
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold text-[#12A6A6] uppercase tracking-wider">
                COMMERCIAL DECISION RECOMMENDATION
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#0A3D2E] text-[#20B26B] border border-[#14533D] font-mono font-bold">
                FEASIBILITY VALIDATED
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                {data.recommendedVessel.vesselClass.toUpperCase()}
              </h3>
              <p className="text-[13.5px] text-slate-300 mt-1">
                Optimized landed-cost vessel class complying with draft, beam, and LOA berthing parameters at {data.destination.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Estimated Landed Cost</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#12A6A6] font-mono mt-0.5 block">
                  ${data.recommendedVessel.costs.totalCostPerTonne.toFixed(2)} <span className="text-[12px] font-normal text-slate-400">/ MT</span>
                </span>
              </div>
              <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Optimal Charter Laycan Window</span>
                <span className="text-[14.5px] font-bold text-white font-mono mt-1 block">
                  {data.optimalWindow.startDate} → {data.optimalWindow.endDate}
                </span>
              </div>
            </div>
          </div>

          {/* Rationale Checklist (WHY?) */}
          <div className="bg-[#071522] p-4 rounded-[6px] border border-[#183A52] text-xs min-w-[300px]">
            <span className="font-bold text-slate-200 block mb-2.5 uppercase text-[11px] tracking-wider border-b border-[#183A52] pb-1.5">
              Feasibility Rationale Checklist
            </span>
            <ul className="space-y-2 text-slate-300 text-[12.5px]">
              <li className="flex items-center gap-2 font-mono">
                <Check className="w-4 h-4 text-[#20B26B] shrink-0" />
                <span>Draft: {data.recommendedVessel.portChecks.draft.vesselValue}m / max {data.destination.maxDraftM}m</span>
              </li>
              <li className="flex items-center gap-2 font-mono">
                <Check className="w-4 h-4 text-[#20B26B] shrink-0" />
                <span>LOA: {data.recommendedVessel.portChecks.loa.vesselValue}m / max {data.destination.maxLoaM}m</span>
              </li>
              <li className="flex items-center gap-2 font-mono">
                <Check className="w-4 h-4 text-[#20B26B] shrink-0" />
                <span>Beam: {data.recommendedVessel.portChecks.beam.vesselValue}m / max {data.destination.maxBeamM}m</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#20B26B] shrink-0" />
                <span>Lowest landed cost per MT</span>
              </li>
            </ul>

            {onOpenTradingTicket && (
              <button
                onClick={onOpenTradingTicket}
                className="w-full mt-4 py-2.5 px-3 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white text-[13px] font-bold transition cursor-pointer uppercase tracking-wider shadow-sm"
              >
                Proceed to Charter Ticket
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. COMPACT SUMMARY METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0D1B2A] p-4 rounded-[8px] border border-[#20384C]">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
            Current Spot
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
            ${data.currentSpotRate.toFixed(2)}
            <span className="text-[12px] text-slate-400 font-normal ml-1">/ MT</span>
          </div>
        </div>

        <div className="bg-[#0D1B2A] p-4 rounded-[8px] border border-[#20384C]">
          <span className="text-[11px] text-[#12A6A6] font-bold uppercase tracking-wider block">
            Lowest Forecast
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-[#12A6A6] font-mono mt-1">
            ${data.lowestPredictedRate.toFixed(2)}
            <span className="text-[12px] text-slate-400 font-normal ml-1">/ MT</span>
          </div>
          <span className="text-[11.5px] text-[#20B26B] font-mono font-bold block mt-1">
            ↓ Save {data.optimalWindow.savingsVsCurrentSpotPct}% vs spot
          </span>
        </div>

        <div className="bg-[#0D1B2A] p-4 rounded-[8px] border border-[#20384C]">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
            90-Day Average
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
            ${data.average90DayRate.toFixed(2)}
            <span className="text-[12px] text-slate-400 font-normal ml-1">/ MT</span>
          </div>
        </div>

        <div className="bg-[#0D1B2A] p-4 rounded-[8px] border border-[#20384C]">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
            Highest Forecast
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
            ${data.highestPredictedRate.toFixed(2)}
            <span className="text-[12px] text-slate-400 font-normal ml-1">/ MT</span>
          </div>
        </div>
      </div>

      {/* 4. FREIGHT RATE OUTLOOK CHART */}
      <div id="forecast-chart-container" className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#183A52]">
          <div>
            <h3 className="font-bold text-[14px] text-white uppercase tracking-wider">
              Freight Rate Econometric Outlook
            </h3>
            <p className="text-[12px] text-slate-400 mt-0.5 font-mono">
              {horizonFilterDays}-day horizon • USD per metric ton • Confidence Interval 95%
            </p>
          </div>

          {/* Horizon Selector */}
          <div className="flex bg-[#071522] p-1 rounded-[6px] border border-[#183A52] gap-1 text-[12px]">
            {[30, 60, 90].map(days => (
              <button
                key={days}
                id={`btn-horizon-${days}`}
                onClick={() => setHorizonFilterDays(days)}
                className={`px-3 py-1 rounded-[4px] font-mono font-bold transition cursor-pointer ${
                  horizonFilterDays === days
                    ? 'bg-[#102337] text-[#12A6A6] shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Canvas */}
        <div className="h-[360px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displaySeries} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#183A52" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#183A52' }}
                tickFormatter={(str) => {
                  const d = new Date(str);
                  return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                domain={['auto', 'auto']}
                tickLine={false}
                axisLine={{ stroke: '#183A52' }}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip content={<CustomForecastTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="plainline"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', color: '#94A3B8' }}
              />

              {/* Recommended Entry Window Highlight */}
              {React.createElement(ReferenceArea as any, {
                x1: data.optimalWindow.startDate,
                x2: data.optimalWindow.endDate,
                fill: '#12A6A6',
                fillOpacity: 0.12,
                stroke: '#12A6A6',
                strokeDasharray: '3 3',
                label: {
                  value: 'Target Laycan Window',
                  position: 'insideTop',
                  fill: '#12A6A6',
                  fontSize: 10,
                  fontWeight: 'bold'
                }
              })}

              {/* Current Spot Baseline Line */}
              <ReferenceLine
                y={data.currentSpotRate}
                stroke="#E0A33A"
                strokeDasharray="4 4"
                label={{ value: `Spot: $${data.currentSpotRate.toFixed(2)}`, fill: '#E0A33A', fontSize: 11, position: 'right' }}
              />

              {/* 95% Confidence Upper Band */}
              <Line
                type="monotone"
                dataKey="upperBound"
                name="Upper 95% CI"
                stroke="#334E68"
                strokeDasharray="3 3"
                dot={false}
                strokeWidth={1}
              />

              {/* Predicted Rate Main Line */}
              <Line
                type="monotone"
                dataKey="predictedRate"
                name="Forecast Rate"
                stroke="#12A6A6"
                strokeWidth={2.5}
                dot={{ r: 2, fill: '#12A6A6' }}
                activeDot={{ r: 5, fill: '#12A6A6' }}
              />

              {/* 95% Confidence Lower Band */}
              <Line
                type="monotone"
                dataKey="lowerBound"
                name="Lower 95% CI"
                stroke="#334E68"
                strokeDasharray="3 3"
                dot={false}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. VESSEL FEASIBILITY & COST ANALYSIS TABLE */}
      <div id="vessel-feasibility-section" className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm">
        <div className="pb-4 border-b border-[#183A52]">
          <h3 className="font-bold text-[14px] text-white uppercase tracking-wider">
            Vessel Feasibility & Cost Breakdown
          </h3>
          <p className="text-[12.5px] text-slate-400 mt-0.5">
            Physical fit validation against {data.destination.name} limits (Max Draft: {data.destination.maxDraftM}m, Max LOA: {data.destination.maxLoaM}m, Max Beam: {data.destination.maxBeamM}m).
          </p>
        </div>

        {/* Vessel Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#183A52] text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
                <th className="py-3 px-3.5">Rank</th>
                <th className="py-3 px-3.5">Vessel Class</th>
                <th className="py-3 px-3.5">DWT</th>
                <th className="py-3 px-3.5">Port Fit</th>
                <th className="py-3 px-3.5">Draft Limit</th>
                <th className="py-3 px-3.5">LOA Limit</th>
                <th className="py-3 px-3.5">Beam Limit</th>
                <th className="py-3 px-3.5 text-right">Freight Rate</th>
                <th className="py-3 px-3.5 text-right">Bunker Surcharge</th>
                <th className="py-3 px-3.5 text-right">Total Landed</th>
                <th className="py-3 px-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#183A52]">
              {data.vessels.map(vessel => {
                const isRecommended = vessel.recommended;
                const isFeasible = vessel.feasible;

                return (
                  <tr
                    key={vessel.vesselClass}
                    id={`vessel-row-${vessel.vesselClass}`}
                    className={`transition-colors ${
                      isRecommended
                        ? 'bg-[#102A43]/50 font-medium'
                        : !isFeasible
                        ? 'bg-[#071522]/60 text-slate-500 opacity-60'
                        : 'hover:bg-[#102337] text-slate-200'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3 px-3.5 font-mono">
                      <span className="font-bold text-[12px] text-slate-300">
                        {isFeasible ? `#${vessel.rank}` : '—'}
                      </span>
                    </td>

                    {/* Vessel Class */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-white text-[13px]">{vessel.vesselClass}</div>
                      {isRecommended && (
                        <span className="text-[10px] text-[#12A6A6] font-bold block uppercase tracking-wider">
                          Recommended
                        </span>
                      )}
                    </td>

                    {/* DWT */}
                    <td className="py-3 px-3.5 text-slate-300 font-mono">
                      {(vessel.dwtCapacity / 1000).toFixed(0)}k MT
                    </td>

                    {/* Port Fit */}
                    <td className="py-3 px-3.5">
                      {isFeasible ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#20B26B] font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          PASS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E05252] font-mono">
                          <XCircle className="w-3.5 h-3.5" />
                          FAIL
                        </span>
                      )}
                    </td>

                    {/* Draft */}
                    <td className="py-3 px-3.5 font-mono">
                      <span className={vessel.portChecks.draft.passed ? 'text-slate-300' : 'text-[#E05252] font-bold'}>
                        {vessel.portChecks.draft.vesselValue}m / {vessel.portChecks.draft.portLimit}m
                      </span>
                    </td>

                    {/* LOA */}
                    <td className="py-3 px-3.5 text-slate-300 font-mono">
                      {vessel.portChecks.loa.vesselValue}m / {vessel.portChecks.loa.portLimit}m
                    </td>

                    {/* Beam */}
                    <td className="py-3 px-3.5 text-slate-300 font-mono">
                      {vessel.portChecks.beam.vesselValue}m / {vessel.portChecks.beam.portLimit}m
                    </td>

                    {/* Freight */}
                    <td className="py-3 px-3.5 text-right font-mono text-slate-300">
                      ${vessel.costs.forecastFreightRatePerTonne.toFixed(2)}
                    </td>

                    {/* Fuel */}
                    <td className="py-3 px-3.5 text-right font-mono text-slate-400">
                      ${vessel.costs.bunkerFuelSurchargePerTonne.toFixed(2)}
                    </td>

                    {/* Total Cost */}
                    <td className="py-3 px-3.5 text-right font-bold text-white font-mono text-[13px]">
                      ${vessel.costs.totalCostPerTonne.toFixed(2)}
                      <span className="text-[10px] text-slate-400 font-normal"> / MT</span>
                    </td>

                    {/* Decision */}
                    <td className="py-3 px-3.5 text-center">
                      <button
                        id={`btn-view-vessel-details-${vessel.vesselClass}`}
                        onClick={() => setSelectedVesselDetail(vessel)}
                        className="text-[#12A6A6] hover:text-[#18c4c4] font-semibold text-[12px] hover:underline cursor-pointer"
                      >
                        Inspect Fit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. OPERATIONAL RISKS */}
      <div id="operational-risks-section" className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm">
        <div className="pb-4 border-b border-[#183A52]">
          <h3 className="font-bold text-[14px] text-white uppercase tracking-wider">
            Operational Risk Matrix
          </h3>
          <p className="text-[12.5px] text-slate-400 mt-0.5">
            Key factors impacting voyage turnaround, port congestion, and laycan adherence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {data.risks.map(risk => {
            const isHigh = risk.severity === 'high';
            const isMedium = risk.severity === 'medium';

            return (
              <div
                key={risk.id}
                className="p-4 rounded-[6px] bg-[#071522] border border-[#183A52] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase ${
                      isHigh
                        ? 'bg-[#3E1A24] text-[#E05252] border border-[#5C2332]'
                        : isMedium
                        ? 'bg-[#3A2E1A] text-[#E0A33A] border border-[#5A4522]'
                        : 'bg-[#0A3D2E] text-[#20B26B] border border-[#14533D]'
                    }`}
                  >
                    {risk.severity}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">RISK ENGINE</span>
                </div>
                <h5 className="font-bold text-white text-[13px] mt-1">{risk.title}</h5>
                <p className="text-slate-400 text-[12px] leading-relaxed">{risk.description}</p>
                {risk.mitigationAdvice && (
                  <p className="text-[12px] text-[#12A6A6] pt-1.5 border-t border-[#183A52]">
                    <strong className="text-white">Mitigation: </strong>{risk.mitigationAdvice}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: Detailed Vessel Inspection */}
      {selectedVesselDetail && (
        <div className="fixed inset-0 z-50 bg-[#071522]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D1B2A] rounded-[8px] p-6 max-w-lg w-full shadow-2xl border border-[#20384C]">
            <div className="flex items-center justify-between pb-4 border-b border-[#183A52]">
              <div>
                <h3 className="font-bold text-[15px] text-white uppercase tracking-wider">
                  {selectedVesselDetail.vesselClass} Naval Inspection
                </h3>
                <p className="text-[12px] text-slate-400 font-mono mt-0.5">Destination Port: {data.destination.name}</p>
              </div>
              <button
                onClick={() => setSelectedVesselDetail(null)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className={`p-3 rounded-[6px] border ${
                selectedVesselDetail.feasible
                  ? 'bg-[#0A3D2E] border-[#14533D] text-[#20B26B]'
                  : 'bg-[#3E1A24] border-[#5C2332] text-[#E05252]'
              }`}>
                <span className="font-bold block text-[13px]">
                  Port Compatibility: {selectedVesselDetail.feasible ? 'PASS' : 'FAIL'}
                </span>
                <p className="text-[12px] text-slate-200 mt-1">
                  {selectedVesselDetail.recommendationReason}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase font-semibold">Draft Limit Check</span>
                  <div className="font-bold text-white font-mono text-[13px] mt-1">
                    {selectedVesselDetail.portChecks.draft.vesselValue}m / {selectedVesselDetail.portChecks.draft.portLimit}m
                  </div>
                  <span className={`text-[11px] font-mono ${selectedVesselDetail.portChecks.draft.passed ? 'text-[#20B26B]' : 'text-[#E05252] font-bold'}`}>
                    {selectedVesselDetail.portChecks.draft.marginText}
                  </span>
                </div>

                <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52]">
                  <span className="text-slate-400 block text-[10.5px] uppercase font-semibold">LOA Clearance</span>
                  <div className="font-bold text-white font-mono text-[13px] mt-1">
                    {selectedVesselDetail.portChecks.loa.vesselValue}m / {selectedVesselDetail.portChecks.loa.portLimit}m
                  </div>
                  <span className="text-[11px] font-mono text-[#20B26B]">
                    {selectedVesselDetail.portChecks.loa.marginText}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-[6px] bg-[#071522] border border-[#183A52] space-y-2">
                <span className="font-bold text-white block pb-1.5 border-b border-[#183A52] uppercase text-[11px] tracking-wider">
                  Voyage Economics Breakdown (USD / MT)
                </span>
                <div className="flex justify-between text-slate-300 font-mono text-[12px]">
                  <span>Base Freight Forecast:</span>
                  <span className="font-bold text-white">${selectedVesselDetail.costs.forecastFreightRatePerTonne.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300 font-mono text-[12px]">
                  <span>Bunker Fuel (VLSFO):</span>
                  <span className="font-bold text-white">${selectedVesselDetail.costs.bunkerFuelSurchargePerTonne.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300 font-mono text-[12px]">
                  <span>Port Dues & Pilotage:</span>
                  <span className="font-bold text-white">${selectedVesselDetail.costs.portOperationalDuesPerTonne.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-[#183A52] font-mono text-[13px]">
                  <span>Total Landed Cost:</span>
                  <span className="text-[#12A6A6]">${selectedVesselDetail.costs.totalCostPerTonne.toFixed(2)} / MT</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedVesselDetail(null)}
                className="px-4 py-2 rounded-[6px] bg-[#102337] hover:bg-[#183A52] text-white font-bold text-[13px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
