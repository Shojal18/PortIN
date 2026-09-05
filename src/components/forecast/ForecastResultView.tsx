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
  Download,
  Check,
  RotateCcw
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
    link.setAttribute('download', `PortIN_Forecast_${data.origin.code}_to_${data.destination.code}_${data.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('success', 'Export Complete', 'Forecast time-series CSV downloaded.');
  };

  const CustomForecastTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pt = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-[4px] border border-[#D0D0D0] shadow-sm text-xs space-y-1.5 min-w-[200px] font-sans">
          <p className="font-semibold text-gray-900 border-b border-gray-200 pb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-600" />
            <span className="font-mono text-[12px]">{label}</span>
          </p>
          <div className="flex justify-between items-center text-gray-900 font-mono">
            <span className="font-sans text-gray-500">Forecast Rate:</span>
            <span className="font-bold text-[#2E7D32] text-[13px]">${pt.predictedRate?.toFixed(2)} <span className="text-gray-500 font-normal font-sans text-xs">/ MT</span></span>
          </div>
          <div className="flex justify-between items-center text-gray-600 text-[11.5px] font-mono">
            <span className="font-sans text-gray-500">Lower 95% CI:</span>
            <span className="text-[#2E7D32]">${pt.lowerBound?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600 text-[11.5px] font-mono">
            <span className="font-sans text-gray-500">Upper 95% CI:</span>
            <span className="text-[#2E7D32]">${pt.upperBound?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600 text-[11.5px] pt-1.5 border-t border-gray-200 font-mono">
            <span className="font-sans text-gray-500">Spot Baseline:</span>
            <span className="text-[#2E7D32]">${data.currentSpotRate?.toFixed(2)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="forecast-result-screen" className="space-y-5 max-w-6xl mx-auto pb-10 font-sans">
      {/* 1. TOP ROUTE SUMMARY HEADER */}
      <div
        id="route-summary-header"
        className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
            Econometric Forecast Analysis
          </span>
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-black mt-0.5 flex items-center gap-2">
            <span>{data.origin.name}</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span>{data.destination.name}</span>
          </h2>
          <p className="text-[12.5px] text-gray-600 mt-0.5 font-mono">
            {data.request.cargoType} • {data.request.cargoVolumeMt.toLocaleString()} MT • {data.request.durationType.toUpperCase()}-TERM CHARTER
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={onBackToNewForecast}
            className="px-3 py-1.5 rounded-[4px] bg-white hover:bg-gray-50 border border-[#D0D0D0] text-gray-700 text-[12.5px] font-medium transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            <span>Reconfigure</span>
          </button>
          <button
            id="btn-download-forecast-csv"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white hover:bg-gray-50 border border-[#D0D0D0] text-black text-[12.5px] font-medium transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. RECOMMENDED DECISION BLOCK */}
      <div
        id="recommendation-decision-block"
        className="bg-white rounded-[6px] border border-[#D0D0D0] p-5 sm:p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Main Decision */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                Commercial Recommendation
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-[2px] bg-[#F3F4F6] text-gray-800 border border-[#D0D0D0] font-mono font-semibold">
                FEASIBILITY: PASS
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-black font-sans tracking-tight">
                {data.recommendedVessel.vesselClass.toUpperCase()}
              </h3>
              <p className="text-[13px] text-gray-600 mt-1">
                Optimized landed-cost vessel class complying with draft, beam, and LOA berthing parameters at {data.destination.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                <span className="text-gray-500 block text-[11px] uppercase tracking-wider font-medium">
                  Estimated Landed Cost
                </span>
                <span className="text-xl font-bold text-[#2E7D32] font-mono mt-0.5 block">
                  ${data.recommendedVessel.costs.totalCostPerTonne.toFixed(2)}{' '}
                  <span className="text-[11.5px] font-normal text-gray-500 font-sans">
                    / MT
                  </span>
                </span>
              </div>
              <div className="p-3 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                <span className="text-gray-500 block text-[11px] uppercase tracking-wider font-medium">
                  Optimal Charter Window
                </span>
                <span className="text-[14px] font-semibold text-black font-mono mt-1 block">
                  {data.optimalWindow.startDate} → {data.optimalWindow.endDate}
                </span>
              </div>
            </div>
          </div>

          {/* Feasibility Rationale Checklist */}
          <div className="bg-[#F9FAFB] p-4 rounded-[4px] border border-[#D0D0D0] text-xs w-full lg:w-80 shrink-0">
            <span className="font-semibold text-black block mb-2 uppercase text-[11px] tracking-wider border-b border-gray-200 pb-1.5">
              Berthing Limits Validation
            </span>
            <ul className="space-y-2 text-gray-700 text-[12px]">
              <li className="flex items-center gap-2 font-mono">
                <Check className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Draft: {data.recommendedVessel.portChecks.draft.vesselValue}m / max {data.destination.maxDraftM}m</span>
              </li>
              <li className="flex items-center gap-2 font-mono">
                <Check className="w-3.5 h-3.5 text-black shrink-0" />
                <span>LOA: {data.recommendedVessel.portChecks.loa.vesselValue}m / max {data.destination.maxLoaM}m</span>
              </li>
              <li className="flex items-center gap-2 font-mono">
                <Check className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Beam: {data.recommendedVessel.portChecks.beam.vesselValue}m / max {data.destination.maxBeamM}m</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Lowest landed cost per metric ton</span>
              </li>
            </ul>

            {onOpenTradingTicket && (
              <button
                onClick={onOpenTradingTicket}
                className="w-full mt-4 py-2 px-3 rounded-[4px] bg-black hover:bg-[#262626] text-white text-[12.5px] font-medium transition cursor-pointer"
              >
                Proceed to Charter Desk
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. SUMMARY STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-[4px] border border-[#D0D0D0]">
          <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider block">
            Current Spot
          </span>
          <div className="text-[18px] sm:text-[20px] font-bold text-[#2E7D32] font-mono mt-0.5">
            ${data.currentSpotRate.toFixed(2)}
            <span className="text-[11.5px] text-gray-500 font-normal ml-1 font-sans">/ MT</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-[4px] border border-[#D0D0D0]">
          <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider block">
            Lowest Forecast
          </span>
          <div className="text-[18px] sm:text-[20px] font-bold text-[#2E7D32] font-mono mt-0.5">
            ${data.lowestPredictedRate.toFixed(2)}
            <span className="text-[11.5px] text-gray-500 font-normal ml-1 font-sans">/ MT</span>
          </div>
          <span className="text-[11px] text-gray-700 font-mono block mt-0.5">
            Save {data.optimalWindow.savingsVsCurrentSpotPct}% vs spot
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-[4px] border border-[#D0D0D0]">
          <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider block">
            90-Day Average
          </span>
          <div className="text-[18px] sm:text-[20px] font-bold text-[#2E7D32] font-mono mt-0.5">
            ${data.average90DayRate.toFixed(2)}
            <span className="text-[11.5px] text-gray-500 font-normal ml-1 font-sans">/ MT</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-[4px] border border-[#D0D0D0]">
          <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider block">
            Highest Forecast
          </span>
          <div className="text-[18px] sm:text-[20px] font-bold text-[#2E7D32] font-mono mt-0.5">
            ${data.highestPredictedRate.toFixed(2)}
            <span className="text-[11.5px] text-gray-500 font-normal ml-1 font-sans">/ MT</span>
          </div>
        </div>
      </div>

      {/* 4. FREIGHT RATE OUTLOOK CHART */}
      <div id="forecast-chart-container" className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D0D0D0]">
          <div>
            <h3 className="font-semibold text-[14px] text-black uppercase tracking-wider">
              Freight Rate Forecast Curve
            </h3>
            <p className="text-[12px] text-gray-500 mt-0.5 font-mono">
              {horizonFilterDays}-day horizon • USD per metric ton • 95% confidence interval
            </p>
          </div>

          {/* Horizon Selector */}
          <div className="flex gap-1 text-[12px]">
            {[30, 60, 90].map(days => (
              <button
                key={days}
                id={`btn-horizon-${days}`}
                onClick={() => setHorizonFilterDays(days)}
                className={`px-3 py-1 rounded-[4px] font-mono font-medium transition cursor-pointer ${
                  horizonFilterDays === days
                    ? 'bg-black text-white'
                    : 'bg-white border border-[#D0D0D0] text-gray-700 hover:bg-gray-50'
                }`}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Canvas */}
        <div className="h-[320px] w-full pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displaySeries} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#D0D0D0' }}
                tick={{ fill: '#4B5563' }}
                tickFormatter={(str) => {
                  const d = new Date(str);
                  return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis
                stroke="#9CA3AF"
                fontSize={11}
                domain={['auto', 'auto']}
                tickLine={false}
                axisLine={{ stroke: '#D0D0D0' }}
                tick={{ fill: '#4B5563', fontFamily: 'IBM Plex Mono' }}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip content={<CustomForecastTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="plainline"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '11px', color: '#111827' }}
              />

              {/* Recommended Entry Window Highlight: Clean Gray */}
              {React.createElement(ReferenceArea as any, {
                x1: data.optimalWindow.startDate,
                x2: data.optimalWindow.endDate,
                fill: '#E5E7EB',
                fillOpacity: 0.6,
                stroke: '#9CA3AF',
                strokeDasharray: '3 3',
                label: {
                  value: 'Target Laycan Window',
                  position: 'insideTop',
                  fill: '#111827',
                  fontSize: 10.5,
                  fontWeight: 600
                }
              })}

              {/* Current Spot Baseline Line */}
              <ReferenceLine
                y={data.currentSpotRate}
                stroke="#6B7280"
                strokeDasharray="4 4"
                label={{ value: `Spot: $${data.currentSpotRate.toFixed(2)}`, fill: '#4B5563', fontSize: 11, position: 'right' }}
              />

              {/* 95% Confidence Upper Band */}
              <Line
                type="monotone"
                dataKey="upperBound"
                name="Upper 95% CI"
                stroke="#9CA3AF"
                strokeDasharray="3 3"
                dot={false}
                strokeWidth={1}
              />

              {/* Predicted Rate Main Line - Solid Black */}
              <Line
                type="monotone"
                dataKey="predictedRate"
                name="Forecast Rate"
                stroke="#000000"
                strokeWidth={2}
                dot={{ r: 2.5, fill: '#000000' }}
                activeDot={{ r: 5, fill: '#000000', stroke: '#FFFFFF', strokeWidth: 1.5 }}
              />

              {/* 95% Confidence Lower Band */}
              <Line
                type="monotone"
                dataKey="lowerBound"
                name="Lower 95% CI"
                stroke="#9CA3AF"
                strokeDasharray="3 3"
                dot={false}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. VESSEL FEASIBILITY & COST ANALYSIS TABLE */}
      <div id="vessel-feasibility-section" className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
        <div className="pb-3 border-b border-[#D0D0D0]">
          <h3 className="font-semibold text-[14px] text-black uppercase tracking-wider">
            Vessel Feasibility & Cost Breakdown
          </h3>
          <p className="text-[12px] text-gray-500 mt-0.5">
            Physical fit validation against {data.destination.name} limits (Max Draft: {data.destination.maxDraftM}m, Max LOA: {data.destination.maxLoaM}m, Max Beam: {data.destination.maxBeamM}m).
          </p>
        </div>

        {/* Vessel Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#D0D0D0] bg-[#F9FAFB] text-gray-600 font-medium uppercase tracking-wider text-[10.5px]">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Vessel Class</th>
                <th className="py-2.5 px-3">DWT</th>
                <th className="py-2.5 px-3">Port Fit</th>
                <th className="py-2.5 px-3">Draft Limit</th>
                <th className="py-2.5 px-3">LOA Limit</th>
                <th className="py-2.5 px-3">Beam Limit</th>
                <th className="py-2.5 px-3 text-right">Freight Rate</th>
                <th className="py-2.5 px-3 text-right">Bunker Surcharge</th>
                <th className="py-2.5 px-3 text-right">Total Landed</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0D0D0]">
              {data.vessels.map(vessel => {
                const isRecommended = vessel.recommended;
                const isFeasible = vessel.feasible;

                return (
                  <tr
                    key={vessel.vesselClass}
                    id={`vessel-row-${vessel.vesselClass}`}
                    className={`transition-colors ${
                      isRecommended
                        ? 'bg-[#F9FAFB] font-medium'
                        : !isFeasible
                        ? 'text-gray-400 bg-gray-50/50'
                        : 'hover:bg-[#F9FAFB] text-gray-800'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-2.5 px-3 font-mono">
                      <span className="font-semibold text-[11.5px] text-gray-700">
                        {isFeasible ? `#${vessel.rank}` : '—'}
                      </span>
                    </td>

                    {/* Vessel Class */}
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-black text-[12.5px]">{vessel.vesselClass}</div>
                      {isRecommended && (
                        <span className="text-[10px] text-gray-600 font-medium block uppercase tracking-wider">
                          Recommended
                        </span>
                      )}
                    </td>

                    {/* DWT */}
                    <td className="py-2.5 px-3 text-gray-600 font-mono">
                      {(vessel.dwtCapacity / 1000).toFixed(0)}k MT
                    </td>

                    {/* Port Fit: Simple Text (Monochrome Tag) */}
                    <td className="py-2.5 px-3">
                      {isFeasible ? (
                        <span className="inline-block px-1.5 py-0.2 rounded-[2px] text-[10.5px] font-semibold border border-gray-400 bg-[#F3F4F6] text-gray-900 font-mono">
                          PASS
                        </span>
                      ) : (
                        <span className="inline-block px-1.5 py-0.2 rounded-[2px] text-[10.5px] font-semibold border border-black bg-black text-white font-mono">
                          FAIL
                        </span>
                      )}
                    </td>

                    {/* Draft */}
                    <td className="py-2.5 px-3 font-mono">
                      <span className={vessel.portChecks.draft.passed ? 'text-gray-700' : 'text-black font-bold'}>
                        {vessel.portChecks.draft.vesselValue}m / {vessel.portChecks.draft.portLimit}m
                      </span>
                    </td>

                    {/* LOA */}
                    <td className="py-2.5 px-3 text-gray-700 font-mono">
                      {vessel.portChecks.loa.vesselValue}m / {vessel.portChecks.loa.portLimit}m
                    </td>

                    {/* Beam */}
                    <td className="py-2.5 px-3 text-gray-700 font-mono">
                      {vessel.portChecks.beam.vesselValue}m / {vessel.portChecks.beam.portLimit}m
                    </td>

                    {/* Freight */}
                    <td className="py-2.5 px-3 text-right font-mono text-[#2E7D32]">
                      ${vessel.costs.forecastFreightRatePerTonne.toFixed(2)}
                    </td>

                    {/* Fuel */}
                    <td className="py-2.5 px-3 text-right font-mono text-[#2E7D32]">
                      ${vessel.costs.bunkerFuelSurchargePerTonne.toFixed(2)}
                    </td>

                    {/* Total Cost */}
                    <td className="py-2.5 px-3 text-right font-bold text-[#2E7D32] font-mono text-[12.5px]">
                      ${vessel.costs.totalCostPerTonne.toFixed(2)}
                      <span className="text-[10px] text-gray-500 font-normal"> / MT</span>
                    </td>

                    {/* Inspect Fit */}
                    <td className="py-2.5 px-3 text-center">
                      <button
                        id={`btn-view-vessel-details-${vessel.vesselClass}`}
                        onClick={() => setSelectedVesselDetail(vessel)}
                        className="text-black hover:underline font-medium text-[11.5px] cursor-pointer"
                      >
                        Inspect
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
      <div id="operational-risks-section" className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
        <div className="pb-3 border-b border-[#D0D0D0]">
          <h3 className="font-semibold text-[14px] text-black uppercase tracking-wider">
            Operational Risk Matrix
          </h3>
          <p className="text-[12px] text-gray-500 mt-0.5">
            Key factors impacting voyage turnaround, port congestion, and laycan adherence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3.5">
          {data.risks.map(risk => {
            const isHigh = risk.severity === 'high';
            const isMedium = risk.severity === 'medium';

            return (
              <div
                key={risk.id}
                className="p-3.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0] space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded-[3px] uppercase border ${
                      isHigh
                        ? 'bg-[#FEE2E2] text-[#D32F2F] border-[#FECACA]'
                        : isMedium
                        ? 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]'
                        : 'bg-[#DCFCE7] text-[#2E7D32] border-[#BBF7D0]'
                    }`}
                  >
                    {risk.severity} Risk
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">RISK AUDIT</span>
                </div>
                <h5 className="font-semibold text-black text-[13px] mt-1">{risk.title}</h5>
                <p className="text-gray-600 text-[11.5px] leading-relaxed">{risk.description}</p>
                {risk.mitigationAdvice && (
                  <p className="text-[11.5px] text-gray-800 pt-1.5 border-t border-gray-200">
                    <strong className="text-black">Mitigation: </strong>{risk.mitigationAdvice}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: Detailed Vessel Inspection */}
      {selectedVesselDetail && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[6px] p-5 max-w-md w-full shadow-lg border border-[#D0D0D0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#D0D0D0]">
              <div>
                <h3 className="font-semibold text-[14px] text-black uppercase tracking-wider">
                  {selectedVesselDetail.vesselClass} Naval Specification
                </h3>
                <p className="text-[11.5px] text-gray-500 font-mono mt-0.5">Discharge Port: {data.destination.name}</p>
              </div>
              <button
                onClick={() => setSelectedVesselDetail(null)}
                className="text-gray-500 hover:text-black p-1 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-3.5 space-y-3 text-xs">
              <div className="p-3 rounded-[4px] border border-[#D0D0D0] bg-[#F9FAFB]">
                <span className="font-semibold block text-[12.5px] text-black">
                  Feasibility Status: {selectedVesselDetail.feasible ? 'PASS' : 'FAIL'}
                </span>
                <p className="text-[11.5px] text-gray-600 mt-1">
                  {selectedVesselDetail.recommendationReason}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10.5px] uppercase font-medium">Draft Limit Check</span>
                  <div className="font-semibold text-black font-mono text-[12.5px] mt-0.5">
                    {selectedVesselDetail.portChecks.draft.vesselValue}m / {selectedVesselDetail.portChecks.draft.portLimit}m
                  </div>
                  <span className="text-[11px] font-mono text-gray-600">
                    {selectedVesselDetail.portChecks.draft.marginText}
                  </span>
                </div>

                <div className="p-2.5 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0]">
                  <span className="text-gray-500 block text-[10.5px] uppercase font-medium">LOA Clearance</span>
                  <div className="font-semibold text-black font-mono text-[12.5px] mt-0.5">
                    {selectedVesselDetail.portChecks.loa.vesselValue}m / {selectedVesselDetail.portChecks.loa.portLimit}m
                  </div>
                  <span className="text-[11px] font-mono text-gray-600">
                    {selectedVesselDetail.portChecks.loa.marginText}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0] space-y-1.5">
                <span className="font-semibold text-black block pb-1 border-b border-gray-200 uppercase text-[10.5px] tracking-wider">
                  Voyage Economics Breakdown (USD / MT)
                </span>
                <div className="flex justify-between text-gray-700 font-mono text-[11.5px]">
                  <span>Base Freight Forecast:</span>
                  <span className="font-semibold text-[#2E7D32]">${selectedVesselDetail.costs.forecastFreightRatePerTonne.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-mono text-[11.5px]">
                  <span>Bunker Fuel (VLSFO):</span>
                  <span className="font-semibold text-[#2E7D32]">${selectedVesselDetail.costs.bunkerFuelSurchargePerTonne.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-mono text-[11.5px]">
                  <span>Port Dues & Pilotage:</span>
                  <span className="font-semibold text-[#2E7D32]">${selectedVesselDetail.costs.portOperationalDuesPerTonne.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black font-bold pt-1.5 border-t border-gray-200 font-mono text-[12.5px]">
                  <span>Total Landed Cost:</span>
                  <span className="text-[#2E7D32]">${selectedVesselDetail.costs.totalCostPerTonne.toFixed(2)} <span className="text-gray-500 font-normal font-sans text-xs">/ MT</span></span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedVesselDetail(null)}
                className="px-3.5 py-1.5 rounded-[4px] bg-black text-white text-[12px] font-medium cursor-pointer"
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
