import React, { useState } from 'react';
import { History, Search, ArrowRight, Compass } from 'lucide-react';
import { ForecastResultData } from '../../types';

interface HistoryPageProps {
  history: ForecastResultData[];
  onSelectForecast: (forecast: ForecastResultData) => void;
  onNewForecastClick: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onSelectForecast,
  onNewForecastClick
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredHistory = history.filter(item => {
    return (
      item.origin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.request.cargoType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recommendedVessel.vesselClass.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div id="history-page-container" className="space-y-4 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-[16px] sm:text-[17px] font-semibold text-black uppercase tracking-wider">
            Forecast History & Logs
          </h2>
          <p className="text-[12.5px] text-gray-600 mt-0.5">
            Archived freight projections, nautical constraint checks, and optimal laycan recommendations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              id="history-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search historical runs..."
              className="w-full pl-8 pr-3 py-1.5 rounded-[4px] border border-[#D0D0D0] bg-white text-gray-900 text-[12.5px] focus:outline-hidden focus:border-black"
            />
          </div>

          <button
            id="btn-history-new-forecast"
            onClick={onNewForecastClick}
            className="px-3 py-1.5 rounded-[4px] bg-black hover:bg-[#262626] text-white text-[12.5px] font-medium transition flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>New Forecast</span>
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
        {filteredHistory.length === 0 ? (
          <div className="py-12 text-center space-y-2.5">
            <div className="w-10 h-10 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0] text-gray-600 flex items-center justify-center mx-auto">
              <History className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-black text-sm uppercase tracking-wide">No Archived Forecasts Found</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Generate a forecast to calculate empirical chartering windows and vessel physical feasibility.
            </p>
            <button
              onClick={onNewForecastClick}
              className="mt-2 px-3.5 py-1.5 rounded-[4px] bg-black hover:bg-[#262626] text-white font-medium text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Create Freight Forecast</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D0D0D0] bg-[#F9FAFB] text-gray-600 font-medium uppercase tracking-wider text-[10.5px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Route Corridor</th>
                  <th className="py-2.5 px-3">Cargo & Parcel Size</th>
                  <th className="py-2.5 px-3">Assigned Vessel</th>
                  <th className="py-2.5 px-3">Optimal Laycan</th>
                  <th className="py-2.5 px-3 text-right">Predicted Rate</th>
                  <th className="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0D0D0]">
                {filteredHistory.map(item => {
                  const createdDate = new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <tr
                      key={item.id}
                      id={`history-row-${item.id}`}
                      onClick={() => onSelectForecast(item)}
                      className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 px-3 text-gray-500 font-mono text-[11.5px]">
                        {createdDate}
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-black text-[12.5px] flex items-center gap-1.5">
                          <span>{item.origin.name.split('(')[0]}</span>
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                          <span>{item.destination.name}</span>
                        </div>
                      </td>

                      <td className="py-2.5 px-3 text-gray-800">
                        <div className="font-medium text-black">{item.request.cargoType}</div>
                        <div className="text-[11px] text-gray-500 font-mono">
                          {item.request.cargoVolumeMt.toLocaleString()} MT
                        </div>
                      </td>

                      <td className="py-2.5 px-3">
                        <span className="inline-block px-1.5 py-0.2 rounded-[2px] font-mono text-[11px] font-medium text-gray-900 bg-[#F3F4F6] border border-[#D0D0D0]">
                          {item.recommendedVessel.vesselClass}
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-gray-700 font-mono text-[11.5px]">
                        {item.optimalWindow.startDate} → {item.optimalWindow.endDate}
                      </td>

                      <td className="py-2.5 px-3 text-right font-mono font-bold text-[#2E7D32] text-[12.5px]">
                        ${item.lowestPredictedRate.toFixed(2)}
                        <span className="text-[10px] text-gray-500 font-normal font-sans"> / MT</span>
                      </td>

                      <td className="py-2.5 px-3 text-center">
                        <button
                          className="px-2.5 py-1 rounded-[4px] bg-white hover:bg-gray-50 border border-[#D0D0D0] text-black text-[11px] font-medium transition cursor-pointer"
                        >
                          View Result
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
