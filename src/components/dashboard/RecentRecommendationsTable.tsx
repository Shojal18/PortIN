import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
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

  const cardBorder = isLight ? 'border-[#E4E4E7]' : 'border-[#D0D0D0]';
  const tableHeaderBg = isLight ? 'bg-[#F8F8F9]' : 'bg-[#F9FAFB]';
  const textTitle = isLight ? 'text-[#18181B]' : 'text-gray-900';
  const textMuted = isLight ? 'text-[#71717A]' : 'text-gray-500';
  const rowHover = isLight ? 'hover:bg-[#F8F8F9]' : 'hover:bg-[#F9FAFB]';

  return (
    <div
      id="dashboard-recent-recommendations-card"
      className={`bg-white border ${cardBorder} rounded-[6px] p-5 sm:p-6 font-sans transition-colors`}
    >
      <div className={`flex items-center justify-between pb-3.5 border-b ${cardBorder}`}>
        <div>
          <h3 className={`font-semibold text-[14px] uppercase tracking-wider ${textTitle}`}>
            Recent Forecast Runs & Decision Log
          </h3>
          <p className={`text-[12px] ${textMuted} mt-0.5 font-normal`}>
            Audit log of cargo movements with verified port feasibility and optimal entry windows
          </p>
        </div>
        <button
          id="btn-view-all-history"
          onClick={onViewAllClick}
          className={`text-[12.5px] font-medium hover:underline flex items-center gap-1 cursor-pointer ${
            isLight ? 'text-[#18181B]' : 'text-black'
          }`}
        >
          <span>View All History</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-[13px] border-collapse">
          <thead>
            <tr className={`border-b ${cardBorder} ${tableHeaderBg} font-medium uppercase tracking-wider text-[11px] ${
              isLight ? 'text-[#71717A]' : 'text-gray-600'
            }`}>
              <th className="py-2.5 px-3.5">TRADE ROUTE</th>
              <th className="py-2.5 px-3.5">CARGO & VOLUME</th>
              <th className="py-2.5 px-3.5">RECOMMENDED CLASS</th>
              <th className="py-2.5 px-3.5">OPTIMAL WINDOW</th>
              <th className="py-2.5 px-3.5">LOWEST RATE</th>
              <th className="py-2.5 px-3.5">RISK PROFILE</th>
              <th className="py-2.5 px-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${cardBorder}`}>
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
                  className={`${rowHover} transition-colors cursor-pointer group`}
                >
                  {/* Route */}
                  <td className="py-3 px-3.5">
                    <div className={`font-medium flex items-center gap-1.5 ${textTitle}`}>
                      <span className={isLight ? 'text-[#52525B]' : 'text-gray-600'}>{originLabel}</span>
                      <span className={isLight ? 'text-[#A1A1AA]' : 'text-gray-400'}>➔</span>
                      <span>{destLabel}</span>
                    </div>
                  </td>

                  {/* Cargo & Volume */}
                  <td className="py-3 px-3.5">
                    <div className={`font-medium ${textTitle}`}>
                      {item.request.cargoType}
                    </div>
                    <div className={`text-[11.5px] ${textMuted} font-normal`}>
                      {item.request.cargoVolumeMt.toLocaleString()} MT
                    </div>
                  </td>

                  {/* Vessel */}
                  <td className="py-3 px-3.5">
                    <span className={`inline-block text-[11.5px] px-2 py-0.5 rounded-[3px] border ${
                      isLight
                        ? 'border-[#E4E4E7] bg-[#F4F4F5] text-[#3F3F46]'
                        : 'border-[#D0D0D0] bg-[#F9FAFB] text-gray-800'
                    }`}>
                      {item.recommendedVessel.vesselClass}
                    </span>
                  </td>

                  {/* Entry Window */}
                  <td className="py-3 px-3.5 text-[12px]">
                    <div className={`font-medium ${textTitle}`}>
                      {item.optimalWindow.startDate} – {item.optimalWindow.endDate}
                    </div>
                    <div className={`text-[11px] ${textMuted} font-normal`}>
                      Save {item.optimalWindow.savingsVsCurrentSpotPct}% vs spot
                    </div>
                  </td>

                  {/* Rate */}
                  <td className="py-3 px-3.5">
                    <span className="text-[13.5px] font-semibold text-[#2E7D32]">
                      ${item.lowestPredictedRate.toFixed(2)}
                    </span>
                    <span className={`text-[11px] font-normal ${textMuted} font-sans`}>
                      {' '}/ MT
                    </span>
                  </td>

                  {/* Risk Profile */}
                  <td className="py-3 px-3.5">
                    {highRisk ? (
                      <span className="inline-block px-1.5 py-0.5 rounded-[3px] text-[10.5px] font-medium border bg-[#FEE2E2] text-[#D32F2F] border-[#FECACA]">
                        High Risk
                      </span>
                    ) : medRisk ? (
                      <span className="inline-block px-1.5 py-0.5 rounded-[3px] text-[10.5px] font-medium border bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]">
                        Moderate
                      </span>
                    ) : (
                      <span className="inline-block px-1.5 py-0.5 rounded-[3px] text-[10.5px] font-medium border bg-[#DCFCE7] text-[#2E7D32] border-[#BBF7D0]">
                        Low Risk
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-3.5 text-right">
                    <span className={`text-[12px] font-medium inline-flex items-center gap-0.5 ${
                      isLight ? 'text-[#71717A] group-hover:text-[#18181B]' : 'text-gray-600 group-hover:text-black'
                    }`}>
                      Details <ChevronRight className="w-3.5 h-3.5" />
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
