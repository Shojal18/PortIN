import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';
import { GitCompare } from 'lucide-react';
import { ComparisonScenario } from '../../types';

interface ComparisonViewProps {
  scenarios: ComparisonScenario[];
  onNewForecastClick: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  scenarios,
  onNewForecastClick
}) => {
  const chartData = scenarios.map(s => ({
    name: s.selectedVessel + ' (' + s.destinationName.split(' ')[0] + ')',
    freight: s.forecastRatePerTonne,
    fuel: s.fuelCostPerTonne,
    total: s.totalCostPerTonne,
    isFeasible: s.isFeasible,
    vessel: s.selectedVessel,
    scenarioName: s.name
  }));

  const bestFeasible = scenarios.filter(s => s.isFeasible).sort((a, b) => a.totalCostPerTonne - b.totalCostPerTonne)[0];

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-[4px] border border-[#D0D0D0] shadow-sm text-xs space-y-1.5 min-w-[190px] font-sans">
          <p className="font-semibold text-black border-b border-gray-200 pb-1">{data.scenarioName}</p>
          <div className="text-gray-700 flex justify-between gap-4 font-mono">
            <span>Base Freight:</span>
            <span className="font-semibold text-black">${data.freight.toFixed(2)} / MT</span>
          </div>
          <div className="text-gray-700 flex justify-between gap-4 font-mono">
            <span>Bunker Fuel:</span>
            <span className="font-semibold text-black">${data.fuel.toFixed(2)} / MT</span>
          </div>
          <div className="text-black font-bold pt-1 border-t border-gray-200 flex justify-between gap-4 font-mono text-[12.5px]">
            <span>Total Landed:</span>
            <span className="text-[#2E7D32]">${data.total.toFixed(2)} <span className="text-gray-500 font-normal font-sans text-xs">/ MT</span></span>
          </div>
          {!data.isFeasible && (
            <p className="text-black font-medium text-[11px] mt-1 font-mono uppercase">
              Draft Limit Exceeded
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="comparison-view-container" className="space-y-4 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-[16px] sm:text-[17px] font-semibold text-black uppercase tracking-wider">
            Corridor & Vessel Multi-Scenario Comparison
          </h2>
          <p className="text-[12.5px] text-gray-600 mt-0.5">
            Compare total landed cost, physical port constraints, and charter windows across alternative routes.
          </p>
        </div>

        <button
          id="btn-comparison-new-forecast"
          onClick={onNewForecastClick}
          className="px-3.5 py-1.5 rounded-[4px] bg-black hover:bg-[#262626] text-white text-[12.5px] font-medium transition flex items-center gap-1.5 cursor-pointer"
        >
          <GitCompare className="w-3.5 h-3.5" />
          <span>New Forecast Scenario</span>
        </button>
      </div>

      {/* Best Feasible Recommendation Highlight */}
      {bestFeasible && (
        <div className="bg-[#F9FAFB] rounded-[6px] border border-[#D0D0D0] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-medium font-mono text-gray-700 uppercase tracking-wider">
              Optimal Procurement Option (Lowest Landed Cost)
            </span>
            <div className="text-[15px] font-semibold text-black mt-0.5">
              {bestFeasible.name} • {bestFeasible.selectedVessel}
            </div>
            <span className="text-[12px] text-gray-600 font-mono">
              Optimal charter window: <strong className="text-black">{bestFeasible.optimalWindow}</strong>
            </span>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-200">
            <span className="text-[11px] text-gray-500 uppercase font-mono block">Lowest Landed Cost</span>
            <span className="text-xl font-bold font-mono text-black">
              ${bestFeasible.totalCostPerTonne.toFixed(2)} <span className="text-xs text-gray-500 font-normal">/ MT</span>
            </span>
          </div>
        </div>
      )}

      {/* Comparison Chart */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
        <div className="pb-3 border-b border-[#D0D0D0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[14px] text-black uppercase tracking-wider">
              Total Landed Cost Breakdown (USD / MT)
            </h3>
            <p className="text-[12px] text-gray-500 mt-0.5 font-mono">Base ocean freight and bunker fuel adjustment</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-gray-700">
              <span className="w-2.5 h-2.5 rounded-xs bg-black" /> Feasible
            </span>
            <span className="flex items-center gap-1.5 text-gray-700">
              <span className="w-2.5 h-2.5 rounded-xs bg-gray-400" /> Draft Infeasible
            </span>
          </div>
        </div>

        <div className="h-[260px] w-full pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={{ stroke: '#D0D0D0' }} tick={{ fill: '#4B5563' }} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={{ stroke: '#D0D0D0' }} tick={{ fill: '#4B5563', fontFamily: 'IBM Plex Mono' }} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '10px', fontSize: '11px', color: '#111827' }} />
              <Bar dataKey="freight" name="Base Freight ($/MT)" stackId="a" fill="#000000">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-f-${index}`} fill={entry.isFeasible ? '#000000' : '#6B7280'} />
                ))}
              </Bar>
              <Bar dataKey="fuel" name="Bunker Fuel ($/MT)" stackId="a" fill="#9CA3AF">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-b-${index}`} fill={entry.isFeasible ? '#9CA3AF' : '#D1D5DB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((scenario, idx) => (
          <div
            key={scenario.id}
            id={`cmp-card-${scenario.id}`}
            className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-[#D0D0D0]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
                  Scenario #{idx + 1}
                </span>
                {scenario.isFeasible ? (
                  <span className="px-1.5 py-0.2 rounded-[2px] text-[10.5px] font-mono font-medium bg-[#F3F4F6] text-gray-900 border border-[#D0D0D0]">
                    PASS
                  </span>
                ) : (
                  <span className="px-1.5 py-0.2 rounded-[2px] text-[10.5px] font-mono font-medium bg-black text-white border border-black">
                    FAIL (DRAFT)
                  </span>
                )}
              </div>

              <h4 className="font-semibold text-[13.5px] text-black mt-2.5">{scenario.name}</h4>
              <p className="text-[11.5px] text-gray-500 font-mono mt-0.5">
                {scenario.cargoVolumeMt.toLocaleString()} MT {scenario.cargoType}
              </p>

              <div className="my-3 p-3 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-500 font-sans">Vessel:</span>
                  <strong className="text-black font-semibold">{scenario.selectedVessel}</strong>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-500 font-sans">Freight:</span>
                  <span className="text-[#2E7D32] font-medium">${scenario.forecastRatePerTonne.toFixed(2)}<span className="text-gray-500 font-normal font-sans">/MT</span></span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-500 font-sans">Fuel:</span>
                  <span className="text-[#2E7D32] font-medium">${scenario.fuelCostPerTonne.toFixed(2)}<span className="text-gray-500 font-normal font-sans">/MT</span></span>
                </div>
                <div className="flex justify-between text-black font-bold pt-1.5 border-t border-gray-200 text-[12.5px]">
                  <span className="font-sans">Total Landed:</span>
                  <span className="text-[#2E7D32]">
                    ${scenario.totalCostPerTonne.toFixed(2)} <span className="text-gray-500 font-normal font-sans text-xs">/ MT</span>
                  </span>
                </div>
              </div>

              <div className="text-xs">
                <span className="text-[10px] text-gray-500 uppercase font-mono block">Optimal Window</span>
                <span className="font-mono text-gray-900 text-[12px]">{scenario.optimalWindow}</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#D0D0D0] flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>Risk: <strong className="capitalize text-black">{scenario.riskLevel}</strong></span>
              <span className="text-gray-700 text-[11px]">Validated</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
