import React from 'react';
import { ArrowRight, CheckCircle2, Navigation, Ship } from 'lucide-react';
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

  return (
    <div
      id="dashboard-route-corridor-card"
      className={`rounded-[8px] border p-5 sm:p-6 flex flex-col justify-between shadow-xs font-sans transition-colors duration-200 ${
        isLight
          ? 'bg-[#FFFFFF] border-[#D7E0E7]'
          : 'bg-[#0D1B2A] border-[#20384C]'
      }`}
    >
      <div>
        {/* Top Header */}
        <div
          className={`flex items-center justify-between pb-3.5 border-b ${
            isLight ? 'border-[#D7E0E7]' : 'border-[#183A52]'
          }`}
        >
          <div>
            <h4
              className={`font-bold text-[14px] uppercase tracking-wider ${
                isLight ? 'text-[#12304A]' : 'text-white'
              }`}
            >
              MONITORED CORRIDOR
            </h4>
            <p className={`text-[12px] mt-0.5 ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
              High-volume dry bulk route
            </p>
          </div>
          <span
            className={`px-2.5 py-1 rounded-[4px] text-[11px] font-semibold uppercase tracking-wide border ${
              isLight
                ? 'bg-emerald-50 text-[#16805C] border-emerald-200'
                : 'bg-[#20B26B]/15 text-[#20B26B] border-[#20B26B]/30'
            }`}
          >
            FAVORABLE ENTRY
          </span>
        </div>

        {/* Operational Route Display */}
        <div
          className={`my-4 p-4 rounded-[6px] border ${
            isLight
              ? 'bg-[#F6F8F5] border-[#D7E0E7]'
              : 'bg-[#102337] border-[#183A52]'
          }`}
        >
          <div className="flex items-center justify-between gap-3 text-xs">
            {/* Origin */}
            <div className="text-left flex-1 min-w-0">
              <span
                className={`text-[10.5px] uppercase tracking-wider block font-medium ${
                  isLight ? 'text-[#526477]' : 'text-slate-400'
                }`}
              >
                ORIGIN PORT
              </span>
              <p
                className={`font-bold text-[14px] leading-snug mt-1 truncate ${
                  isLight ? 'text-[#12304A]' : 'text-white'
                }`}
              >
                {originName}
              </p>
              <p className={`text-[11.5px] truncate ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                {originHub}
              </p>
            </div>

            {/* Nautical Route Indicator */}
            <div className="flex flex-col items-center px-1 shrink-0">
              <span className={`text-[11px] font-mono ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                4,850 NM
              </span>
              <div
                className={`flex items-center my-1 ${
                  isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'
                }`}
              >
                <div
                  className={`h-px w-6 sm:w-10 ${
                    isLight ? 'bg-[#087F8C]' : 'bg-[#12A6A6]'
                  }`}
                />
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
              <span className={`text-[10.5px] ${isLight ? 'text-[#7E91A4]' : 'text-slate-400'}`}>
                Transit ~14d
              </span>
            </div>

            {/* Destination */}
            <div className="text-right flex-1 min-w-0">
              <span
                className={`text-[10.5px] uppercase tracking-wider block font-medium ${
                  isLight ? 'text-[#526477]' : 'text-slate-400'
                }`}
              >
                DISCHARGE
              </span>
              <p
                className={`font-bold text-[14px] leading-snug mt-1 truncate ${
                  isLight ? 'text-[#12304A]' : 'text-white'
                }`}
              >
                {destName}
              </p>
              <p className={`text-[11.5px] truncate ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                {destRegion}
              </p>
            </div>
          </div>
        </div>

        {/* Cargo & Vessel Specs */}
        <div className="grid grid-cols-2 gap-2.5 text-[13px] mb-4">
          <div
            className={`p-3 rounded-[6px] border ${
              isLight
                ? 'bg-[#FAFAF7] border-[#D7E0E7]'
                : 'bg-[#071522] border-[#183A52]'
            }`}
          >
            <span
              className={`block text-[10.5px] uppercase tracking-wider font-medium ${
                isLight ? 'text-[#526477]' : 'text-slate-400'
              }`}
            >
              Cargo & Volume
            </span>
            <span
              className={`font-bold mt-1 block ${
                isLight ? 'text-[#12304A]' : 'text-slate-200'
              }`}
            >
              {cargo} • {volume}
            </span>
          </div>

          <div
            className={`p-3 rounded-[6px] border ${
              isLight
                ? 'bg-[#FAFAF7] border-[#D7E0E7]'
                : 'bg-[#071522] border-[#183A52]'
            }`}
          >
            <span
              className={`block text-[10.5px] uppercase tracking-wider font-medium ${
                isLight ? 'text-[#526477]' : 'text-slate-400'
              }`}
            >
              Recommended Class
            </span>
            <span
              className={`font-bold flex items-center gap-1.5 mt-1 ${
                isLight ? 'text-[#12304A]' : 'text-white'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 shrink-0 ${
                  isLight ? 'text-[#16805C]' : 'text-[#20B26B]'
                }`}
              />
              <span>{vessel}</span>
            </span>
          </div>
        </div>

        {/* Rate Comparison Box */}
        <div
          className={`p-3.5 rounded-[6px] border flex items-center justify-between ${
            isLight
              ? 'bg-[#EEF3F7] border-[#D7E0E7]'
              : 'bg-[#102A43]/50 border-[#183A52]'
          }`}
        >
          <div>
            <span
              className={`text-[10.5px] block uppercase tracking-wider font-medium ${
                isLight ? 'text-[#526477]' : 'text-slate-400'
              }`}
            >
              Spot vs Recommended Window
            </span>
            <div className="flex items-baseline gap-2.5 mt-1 font-mono">
              <span className={`line-through text-[13px] ${isLight ? 'text-[#7E91A4]' : 'text-slate-500'}`}>
                ${currentRate.toFixed(2)}
              </span>
              <span
                className={`text-[18px] font-bold ${
                  isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'
                }`}
              >
                ${forecastLowest.toFixed(2)}
                <span className={`text-[12px] font-normal font-sans ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                  {' '}/ MT
                </span>
              </span>
            </div>
          </div>

          <div className="text-right">
            <span
              className={`text-[12px] font-bold px-2 py-0.5 rounded-[4px] font-mono border ${
                isLight
                  ? 'bg-emerald-100 text-[#16805C] border-emerald-300'
                  : 'bg-[#20B26B]/15 text-[#20B26B] border-[#20B26B]/30'
              }`}
            >
              Save {savingsPct}%
            </span>
            <span className={`text-[11px] block mt-1 ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
              Oct 12–26 Window
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        id="explore-corridor-btn"
        onClick={onExploreClick}
        className={`w-full mt-4 py-2.5 px-4 rounded-[6px] text-white text-[13.5px] font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
          isLight
            ? 'bg-[#087F8C] hover:bg-[#066670]'
            : 'bg-[#087F8C] hover:bg-[#12A6A6]'
        }`}
      >
        <span>Open Decision Matrix</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
