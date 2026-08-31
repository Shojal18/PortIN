import React, { useState } from 'react';
import { History, Search, ArrowRight, CheckCircle2, Compass } from 'lucide-react';
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
    <div id="history-page-container" className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#12A6A6]" />
            <h2 className="text-[17px] sm:text-[19px] font-bold text-white uppercase tracking-wider">
              Econometric Forecast Audit Archive
            </h2>
          </div>
          <p className="text-[13px] text-slate-400 mt-1">
            Historical freight projections, nautical constraint checks, and optimal laycan recommendations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              id="history-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audit runs..."
              className="w-full pl-9 pr-3 py-2 rounded-[6px] border border-[#183A52] bg-[#071522] text-white text-[13px] font-medium focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6]"
            />
          </div>

          <button
            id="btn-history-new-forecast"
            onClick={onNewForecastClick}
            className="px-4 py-2 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white text-[12.5px] font-bold transition flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <Compass className="w-4 h-4" />
            <span>New Forecast</span>
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 shadow-sm">
        {filteredHistory.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-[6px] bg-[#071522] border border-[#183A52] text-slate-400 flex items-center justify-center mx-auto">
              <History className="w-6 h-6 text-[#12A6A6]" />
            </div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wide">No Archived Forecasts Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Generate a forecast to calculate empirical chartering windows and vessel physical feasibility.
            </p>
            <button
              onClick={onNewForecastClick}
              className="mt-2 px-4 py-2 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Create Freight Forecast</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#183A52] text-slate-400 font-bold uppercase tracking-wider text-[10.5px]">
                  <th className="py-3 px-3.5">Execution Date</th>
                  <th className="py-3 px-3.5">Route Corridor</th>
                  <th className="py-3 px-3.5">Cargo & Parcel Size</th>
                  <th className="py-3 px-3.5">Assigned Vessel</th>
                  <th className="py-3 px-3.5">Optimal Laycan</th>
                  <th className="py-3 px-3.5 text-right">Predicted Rate</th>
                  <th className="py-3 px-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#183A52]">
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
                      className="hover:bg-[#102337] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-3.5 text-slate-400 font-mono text-[11.5px]">
                        {createdDate}
                      </td>

                      <td className="py-3.5 px-3.5">
                        <div className="font-bold text-white text-[13px] flex items-center gap-1.5">
                          <span>{item.origin.name.split('(')[0]}</span>
                          <ArrowRight className="w-3 h-3 text-[#12A6A6]" />
                          <span>{item.destination.name}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3.5 text-slate-300">
                        <div className="font-semibold text-white">{item.request.cargoType}</div>
                        <div className="text-[11.5px] text-slate-400 font-mono">
                          {item.request.cargoVolumeMt.toLocaleString()} MT
                        </div>
                      </td>

                      <td className="py-3.5 px-3.5">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] font-bold text-[#20B26B] bg-[#0A3D2E] px-2 py-0.5 rounded border border-[#14533D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#20B26B]" />
                          {item.recommendedVessel.vesselClass}
                        </span>
                      </td>

                      <td className="py-3.5 px-3.5 text-white font-mono text-[12px]">
                        {item.optimalWindow.startDate} → {item.optimalWindow.endDate}
                      </td>

                      <td className="py-3.5 px-3.5 text-right font-mono font-bold text-white text-[13.5px]">
                        ${item.lowestPredictedRate.toFixed(2)}
                        <span className="text-[10.5px] text-slate-400 font-normal"> / MT</span>
                      </td>

                      <td className="py-3.5 px-3.5 text-center">
                        <button
                          className="px-3 py-1 rounded-[4px] bg-[#102A43] hover:bg-[#153655] border border-[#183A52] text-[#12A6A6] text-[11.5px] font-bold transition font-mono uppercase"
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
