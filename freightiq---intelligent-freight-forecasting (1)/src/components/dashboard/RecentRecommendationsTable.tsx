import React from 'react';
import { ChevronRight, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ForecastResultData } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface RecentRecommendationsTableProps {
  forecasts: ForecastResultData[];
  onSelectForecast: (forecast: ForecastResultData) => void;
  onViewAllClick: () => void;
}

export const RecentRecommendationsTable: React.FC<RecentRecommendationsTableProps> = ({
  forecasts,
  onSelectForecast,
  onViewAllClick
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      id="dashboard-recent-recommendations-card"
      className={`rounded-[8px] border p-5 sm:p-6 shadow-xs font-sans transition-colors duration-200 ${
        isLight
          ? 'bg-[#FFFFFF] border-[#D7E0E7]'
          : 'bg-[#0D1B2A] border-[#20384C]'
      }`}
    >
      <div
        className={`flex items-center justify-between pb-4 border-b ${
          isLight ? 'border-[#D7E0E7]' : 'border-[#183A52]'
        }`}
      >
        <div>
          <h3
            className={`font-bold text-[14px] uppercase tracking-wider ${
              isLight ? 'text-[#12304A]' : 'text-white'
            }`}
          >
            RECENT FORECAST RUNS & DECISION LOG
          </h3>
          <p className={`text-[12px] mt-0.5 ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
            Audit log of cargo movements with verified port feasibility and optimal entry windows
          </p>
        </div>
        <button
          id="btn-view-all-history"
          onClick={onViewAllClick}
          className={`text-[13px] font-medium flex items-center gap-1.5 cursor-pointer transition ${
            isLight
              ? 'text-[#087F8C] hover:text-[#066670]'
              : 'text-[#12A6A6] hover:text-[#0aa2b2]'
          }`}
        >
          <span>View All History</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-[13px] border-collapse">
          <thead>
            <tr
              className={`border-b font-semibold uppercase tracking-wider text-[11px] ${
                isLight
                  ? 'border-[#D7E0E7] bg-[#F6F8F5] text-[#526477]'
                  : 'border-[#183A52] bg-[#102337]/80 text-slate-400'
              }`}
            >
              <th className="py-3 px-4">TRADE ROUTE</th>
              <th className="py-3 px-4">CARGO & VOLUME</th>
              <th className="py-3 px-4">RECOMMENDED CLASS</th>
              <th className="py-3 px-4">OPTIMAL WINDOW</th>
              <th className="py-3 px-4">LOWEST RATE</th>
              <th className="py-3 px-4">RISK PROFILE</th>
              <th className="py-3 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className={isLight ? 'divide-y divide-[#D7E0E7]' : 'divide-y divide-[#183A52]'}>
            {forecasts.slice(0, 5).map(item => {
              const originLabel = item.origin.name.split('(')[0].trim();
              const destLabel = item.destination.name;
              const highRisk = item.risks.some(r => r.severity === 'high');
              const medRisk = item.risks.some(r => r.severity === 'medium');

              return (
                <tr
                  key={item.id}
                  id={`rec-row-${item.id}`}
                  onClick={() => onSelectForecast(item)}
                  className={`transition-colors cursor-pointer group ${
                    isLight
                      ? 'hover:bg-[#F6F8F5]'
                      : 'hover:bg-[#102A43]/60'
                  }`}
                >
                  {/* Route */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold flex items-center gap-2">
                      <span className={isLight ? 'text-[#526477]' : 'text-slate-200'}>
                        {originLabel}
                      </span>
                      <span className={isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'}>
                        ➔
                      </span>
                      <span className={isLight ? 'text-[#12304A]' : 'text-white'}>
                        {destLabel}
                      </span>
                    </div>
                  </td>

                  {/* Cargo & Volume */}
                  <td className="py-3.5 px-4">
                    <div className={`font-medium ${isLight ? 'text-[#12304A]' : 'text-white'}`}>
                      {item.request.cargoType}
                    </div>
                    <div className={`text-[12px] font-mono ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                      {item.request.cargoVolumeMt.toLocaleString()} MT
                    </div>
                  </td>

                  {/* Vessel */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 font-medium text-[12.5px] px-2.5 py-0.5 rounded-[4px] border ${
                        isLight
                          ? 'bg-[#EEF3F7] text-[#087F8C] border-[#D7E0E7]'
                          : 'bg-[#12A6A6]/10 text-[#12A6A6] border-[#12A6A6]/25'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          isLight ? 'text-[#16805C]' : 'text-[#20B26B]'
                        }`}
                      />
                      {item.recommendedVessel.vesselClass}
                    </span>
                  </td>

                  {/* Entry Window */}
                  <td className="py-3.5 px-4 font-mono text-[12.5px]">
                    <div className={`font-medium ${isLight ? 'text-[#12304A]' : 'text-white'}`}>
                      {item.optimalWindow.startDate} – {item.optimalWindow.endDate}
                    </div>
                    <div
                      className={`text-[11.5px] font-mono font-medium ${
                        isLight ? 'text-[#16805C]' : 'text-[#20B26B]'
                      }`}
                    >
                      Save {item.optimalWindow.savingsVsCurrentSpotPct}% vs spot
                    </div>
                  </td>

                  {/* Rate */}
                  <td className="py-3.5 px-4 font-mono">
                    <span className={`text-[15px] font-bold ${isLight ? 'text-[#12304A]' : 'text-white'}`}>
                      ${item.lowestPredictedRate.toFixed(2)}
                    </span>
                    <span className={`text-[11px] font-normal font-sans ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                      {' '}/ MT
                    </span>
                  </td>

                  {/* Risk */}
                  <td className="py-3.5 px-4">
                    {highRisk ? (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-semibold border ${
                          isLight
                            ? 'bg-rose-50 text-[#C94C4C] border-rose-200'
                            : 'bg-[#E05252]/15 text-[#E05252] border-[#E05252]/30'
                        }`}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        High Risk
                      </span>
                    ) : medRisk ? (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-semibold border ${
                          isLight
                            ? 'bg-amber-50 text-[#D8891A] border-amber-200'
                            : 'bg-[#E0A33A]/15 text-[#E0A33A] border-[#E0A33A]/30'
                        }`}
                      >
                        Moderate
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-semibold border ${
                          isLight
                            ? 'bg-emerald-50 text-[#16805C] border-emerald-200'
                            : 'bg-[#20B26B]/15 text-[#20B26B] border-[#20B26B]/30'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Low Risk
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`font-medium text-[13px] inline-flex items-center gap-1 transition ${
                        isLight
                          ? 'text-[#087F8C] group-hover:text-[#12304A]'
                          : 'text-[#12A6A6] group-hover:text-white'
                      }`}
                    >
                      Details <ChevronRight className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
