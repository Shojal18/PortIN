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
import { GitCompare, CheckCircle2, XCircle } from 'lucide-react';
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
        <div className="bg-[#071522] p-3 rounded-[6px] border border-[#20384C] shadow-xl text-xs space-y-1.5 min-w-[200px] font-sans">
          <p className="font-bold text-white border-b border-[#183A52] pb-1">{data.scenarioName}</p>
          <div className="text-slate-300 flex justify-between gap-4 font-mono">
            <span>Base Freight:</span>
            <span className="font-bold text-white">${data.freight.toFixed(2)} / MT</span>
          </div>
          <div className="text-slate-300 flex justify-between gap-4 font-mono">
            <span>Bunker Fuel:</span>
            <span className="font-bold text-white">${data.fuel.toFixed(2)} / MT</span>
          </div>
          <div className="text-white font-bold pt-1.5 border-t border-[#183A52] flex justify-between gap-4 font-mono text-[13px]">
            <span>Total Landed:</span>
            <span className="text-[#12A6A6]">${data.total.toFixed(2)} / MT</span>
          </div>
          {!data.isFeasible && (
            <p className="text-[#E05252] font-bold text-[11px] mt-1 font-mono uppercase">
              Draft Constraint Exceeded
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="comparison-view-container" className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#12A6A6]" />
            <h2 className="text-[17px] sm:text-[19px] font-bold text-white uppercase tracking-wider">
              Corridor & Vessel Multi-Scenario Comparison
            </h2>
          </div>
          <p className="text-[13px] text-slate-400 mt-1">
            Compare total landed cost, physical port constraints, and charter windows across alternative routes.
          </p>
        </div>

        <button
          id="btn-comparison-new-forecast"
          onClick={onNewForecastClick}
          className="px-4 py-2.5 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white text-[12.5px] font-bold transition flex items-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <GitCompare className="w-4 h-4" />
          <span>New Corridor Forecast</span>
        </button>
      </div>

      {/* Best Feasible Recommendation Highlight */}
      {bestFeasible && (
        <div className="bg-[#0D1B2A] rounded-[8px] border border-[#14533D] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] font-bold font-mono text-[#20B26B] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Optimal Procurement Option
            </span>
            <div className="text-[16px] font-bold text-white mt-0.5">
              {bestFeasible.name} • <span className="text-[#12A6A6]">{bestFeasible.selectedVessel}</span>
            </div>
            <span className="text-[12.5px] text-slate-400 font-mono">
              Optimal charter window: <strong className="text-white">{bestFeasible.optimalWindow}</strong>
            </span>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#183A52]">
            <span className="text-[11.5px] text-slate-400 uppercase font-mono block">Lowest Feasible Cost</span>
            <span className="text-2xl font-bold font-mono text-[#20B26B]">
              ${bestFeasible.totalCostPerTonne.toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ MT</span>
            </span>
          </div>
        </div>
      )}

      {/* Comparison Chart */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm">
        <div className="pb-4 border-b border-[#183A52] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-[14px] text-white uppercase tracking-wider">
              Total Landed Cost Stack (USD / MT)
            </h3>
            <p className="text-[12px] text-slate-400 mt-0.5 font-mono">Stacked base ocean freight and bunker fuel adjustment</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#12A6A6]" /> Feasible Port Call
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#E05252]" /> Draft Infeasible
            </span>
          </div>
        </div>

        <div className="h-[280px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#183A52" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={{ stroke: '#183A52' }} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={{ stroke: '#183A52' }} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }} />
              <Bar dataKey="freight" name="Freight Rate ($/MT)" stackId="a" fill="#12A6A6">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-f-${index}`} fill={entry.isFeasible ? '#087F8C' : '#E05252'} />
                ))}
              </Bar>
              <Bar dataKey="fuel" name="Bunker Fuel ($/MT)" stackId="a" fill="#183A52">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-b-${index}`} fill={entry.isFeasible ? '#12A6A6' : '#991B1B'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Cards / Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((scenario, idx) => (
          <div
            key={scenario.id}
            id={`cmp-card-${scenario.id}`}
            className={`bg-[#0D1B2A] rounded-[8px] border p-5 flex flex-col justify-between shadow-sm ${
              scenario.isFeasible ? 'border-[#20384C]' : 'border-[#5C2332] bg-[#101726]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#183A52]">
                <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-400">
                  Scenario #{idx + 1}
                </span>
                {scenario.isFeasible ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold font-mono text-[#20B26B] bg-[#0A3D2E] px-2 py-0.5 rounded border border-[#14533D]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Feasible
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold font-mono text-[#E05252] bg-[#3E1A24] px-2 py-0.5 rounded border border-[#5C2332]">
                    <XCircle className="w-3.5 h-3.5" />
                    Draft Infeasible
                  </span>
                )}
              </div>

              <h4 className="font-bold text-[14px] text-white mt-3">{scenario.name}</h4>
              <p className="text-[12px] text-slate-400 font-mono mt-0.5">
                {scenario.cargoVolumeMt.toLocaleString()} MT {scenario.cargoType}
              </p>

              <div className="my-4 p-3.5 rounded-[6px] bg-[#071522] border border-[#183A52] space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Vessel Class:</span>
                  <strong className="text-white font-bold">{scenario.selectedVessel}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Freight Rate:</span>
                  <span className="text-white">${scenario.forecastRatePerTonne.toFixed(2)}/MT</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Bunker Fuel:</span>
                  <span className="text-white">${scenario.fuelCostPerTonne.toFixed(2)}/MT</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-[#183A52] text-[13px]">
                  <span>Total Landed:</span>
                  <span className={scenario.isFeasible ? 'text-[#12A6A6]' : 'text-[#E05252]'}>
                    ${scenario.totalCostPerTonne.toFixed(2)} / MT
                  </span>
                </div>
              </div>

              <div className="text-xs">
                <span className="text-[10.5px] text-slate-400 uppercase font-mono block">Optimal Window</span>
                <span className="font-mono text-white text-[12.5px]">{scenario.optimalWindow}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#183A52] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Risk: <strong className="capitalize text-white">{scenario.riskLevel}</strong></span>
              <span className="text-[#12A6A6] text-[11px]">Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
