import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface RouteCorridorCardProps {
  originName: string;
  originHub: string;
  originFlag: string;
  destName: string;
  destRegion: string;
  destFlag: string;
  cargo: string;
  volume: string;
  vessel: string;
  currentRate: number;
  forecastLowest: number;
  savingsPct: number;
  feasibilityStatus: 'PASS' | 'FAIL';
  onExploreClick: () => void;
}

export const RouteCorridorCard: React.FC<RouteCorridorCardProps> = ({
  originName,
  originHub,
  destName,
  destRegion,
  cargo,
  volume,
  vessel,
  currentRate,
  forecastLowest,
  savingsPct,
  onExploreClick
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const cardBorder = isLight ? 'border-[#E4E4E7]' : 'border-[#D0D0D0]';
  const innerBg = isLight ? 'bg-[#F8F8F9]' : 'bg-[#F9FAFB]';
  const textTitle = isLight ? 'text-[#18181B]' : 'text-gray-900';
  const textMuted = isLight ? 'text-[#71717A]' : 'text-gray-500';

  return (
    <div
      id="dashboard-route-corridor-card"
      className={`bg-white border ${cardBorder} rounded-[6px] p-5 sm:p-6 flex flex-col justify-between font-sans transition-colors`}
    >
      <div>
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${cardBorder}`}>
          <div>
            <h4 className={`font-semibold text-[14px] uppercase tracking-wider ${textTitle}`}>
              Monitored Corridor
            </h4>
            <p className={`text-[12px] ${textMuted} mt-0.5 font-normal`}>
              High-volume dry bulk route
            </p>
          </div>
          <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-medium border ${
            isLight
              ? 'text-[#52525B] border-[#E4E4E7] bg-[#F4F4F5]'
              : 'text-gray-700 border-[#D0D0D0] bg-[#F9FAFB]'
          }`}>
            Favorable Entry
          </span>
        </div>

        {/* Route Details Box */}
        <div className={`my-3.5 p-3.5 rounded-[4px] border ${cardBorder} ${innerBg}`}>
          <div className="flex items-center justify-between gap-3 text-xs">
            {/* Origin */}
            <div className="text-left flex-1 min-w-0">
              <span className={`text-[10.5px] uppercase tracking-wider block ${textMuted} font-medium`}>
                Origin Port
              </span>
              <p className={`font-semibold text-[13.5px] ${textTitle} leading-snug mt-0.5 truncate`}>
                {originName}
              </p>
              <p className={`text-[11.5px] ${textMuted} truncate font-normal`}>
                {originHub}
              </p>
            </div>

            {/* Nautical Route Indicator */}
            <div className="flex flex-col items-center px-2 shrink-0">
              <span className={`text-[11px] ${textMuted} font-normal`}>
                4,850 NM
              </span>
              <div className={`flex items-center my-0.5 ${isLight ? 'text-[#71717A]' : 'text-gray-600'}`}>
                <div className={`h-px w-8 ${isLight ? 'bg-[#E4E4E7]' : 'bg-[#D0D0D0]'}`} />
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
              <span className={`text-[10.5px] ${textMuted} font-normal`}>
                Transit ~14d
              </span>
            </div>

            {/* Destination */}
            <div className="text-right flex-1 min-w-0">
              <span className={`text-[10.5px] uppercase tracking-wider block ${textMuted} font-medium`}>
                Discharge Port
              </span>
              <p className={`font-semibold text-[13.5px] ${textTitle} leading-snug mt-0.5 truncate`}>
                {destName}
              </p>
              <p className={`text-[11.5px] ${textMuted} truncate font-normal`}>
                {destRegion}
              </p>
            </div>
          </div>
        </div>

        {/* Cargo & Vessel Specs */}
        <div className="grid grid-cols-2 gap-2.5 text-[12px] mb-3.5">
          <div className={`p-2.5 rounded-[4px] border ${cardBorder} ${innerBg}`}>
            <span className={`block text-[10.5px] uppercase tracking-wider ${textMuted} font-medium`}>
              Cargo & Volume
            </span>
            <span className={`font-semibold ${textTitle} mt-0.5 block`}>
              {cargo} • {volume}
            </span>
          </div>

          <div className={`p-2.5 rounded-[4px] border ${cardBorder} ${innerBg}`}>
            <span className={`block text-[10.5px] uppercase tracking-wider ${textMuted} font-medium`}>
              Recommended Class
            </span>
            <span className={`font-semibold ${textTitle} mt-0.5 block`}>
              {vessel}
            </span>
          </div>
        </div>

        {/* Rate Comparison Box */}
        <div className={`p-3 rounded-[4px] border ${cardBorder} ${innerBg} flex items-center justify-between`}>
          <div>
            <span className={`text-[10.5px] block uppercase tracking-wider ${textMuted} font-medium`}>
              Spot vs Recommended Window
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className={`line-through text-[12.5px] ${textMuted}`}>
                ${currentRate.toFixed(2)}
              </span>
              <span className="text-[17px] font-semibold text-[#2E7D32]">
                ${forecastLowest.toFixed(2)}
                <span className={`text-[11.5px] font-normal ${textMuted} font-sans`}>
                  {' '}/ MT
                </span>
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className={`text-[12px] font-medium ${isLight ? 'text-[#18181B]' : 'text-gray-900'}`}>
              Save {savingsPct}%
            </span>
            <span className={`text-[11px] block ${textMuted} mt-0.5 font-normal`}>
              Oct 12–26 Window
            </span>
          </div>
        </div>
      </div>

      {/* Action Button: Charcoal / Black */}
      <button
        id="explore-corridor-btn"
        onClick={onExploreClick}
        className={`w-full mt-4 py-2 px-4 rounded-[4px] text-[13px] font-medium transition flex items-center justify-center gap-1.5 cursor-pointer ${
          isLight
            ? 'bg-[#18181B] text-white hover:bg-[#27272A]'
            : 'bg-black text-white hover:bg-[#262626]'
        }`}
      >
        <span>Open Decision Matrix</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
