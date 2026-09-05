import React from 'react';
import { Bell, ChevronRight, Compass, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { NavTab } from '../../types';

interface TopBarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadAlertsCount?: number;
  onOpenMobileSidebar?: () => void;
  title?: string;
  subtitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  unreadAlertsCount = 0,
  onOpenMobileSidebar,
  title: customTitle,
  subtitle: customSubtitle
}) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const getPageInfo = () => {
    switch (currentTab) {
      case 'dashboard':
        return {
          title: customTitle || 'Operations Dashboard',
          subtitle: customSubtitle || 'Dry bulk freight forecasting and vessel-port feasibility analysis.',
          breadcrumb: ['PortIN', 'Dashboard']
        };
      case 'trading':
        return {
          title: customTitle || 'Market Terminal',
          subtitle: customSubtitle || 'Corridor orderbook liquidity, forward curves, and execution.',
          breadcrumb: ['PortIN', 'Market Terminal']
        };
      case 'portfolio':
        return {
          title: customTitle || 'Charter Operations & Voyage Tracker',
          subtitle: customSubtitle || 'Active contracts, demurrage monitoring, and port turnaround tracking.',
          breadcrumb: ['PortIN', 'Charter Operations']
        };
      case 'new-forecast':
        return {
          title: customTitle || 'Create Freight Forecast',
          subtitle: customSubtitle || 'Configure cargo specification, trade corridor, and charter period.',
          breadcrumb: ['PortIN', 'New Forecast']
        };
      case 'forecast-result':
        return {
          title: customTitle || 'Forecast Analysis & Recommendation',
          subtitle: customSubtitle || 'Optimal charter window, rate confidence bands, and vessel compatibility.',
          breadcrumb: ['PortIN', 'Forecast Result']
        };
      case 'comparisons':
        return {
          title: customTitle || 'Corridor Comparison',
          subtitle: customSubtitle || 'Multi-route freight benchmarking and landed cost sensitivity matrix.',
          breadcrumb: ['PortIN', 'Comparisons']
        };
      case 'ports':
        return {
          title: customTitle || 'Port Directory',
          subtitle: customSubtitle || 'Indian East Coast & Global discharge port drafts, LOA, and beam limits.',
          breadcrumb: ['PortIN', 'Port Directory']
        };
      case 'vessels':
        return {
          title: customTitle || 'Vessel Directory',
          subtitle: customSubtitle || 'Dry bulk naval specifications, DWT ratings, and daily fuel consumption.',
          breadcrumb: ['PortIN', 'Vessel Directory']
        };
      case 'alerts':
        return {
          title: customTitle || 'Operational Risks & Alerts',
          subtitle: customSubtitle || 'Monsoon swells, port congestion delays, and bunker price shifts.',
          breadcrumb: ['PortIN', 'Alerts & Risks']
        };
      case 'history':
        return {
          title: customTitle || 'Forecast History & Audit',
          subtitle: customSubtitle || 'Historical econometric model runs and recommendation accuracy log.',
          breadcrumb: ['PortIN', 'History']
        };
      case 'settings':
        return {
          title: customTitle || 'System Settings',
          subtitle: customSubtitle || 'Manager profile, currency preference, and model disclosures.',
          breadcrumb: ['PortIN', 'Settings']
        };
      default:
        return {
          title: customTitle || 'PortIN',
          subtitle: customSubtitle || 'Intelligent Freight Forecasting',
          breadcrumb: ['PortIN', 'Overview']
        };
    }
  };

  const { title, subtitle, breadcrumb } = getPageInfo();

  return (
    <header
      id="freightiq-topbar"
      className={`px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 sticky top-0 z-30 font-sans transition-colors ${
        isLight
          ? 'bg-[#F7F7F8] border-b border-[#E4E4E7] text-[#18181B]'
          : 'bg-white border-b border-[#D0D0D0] text-gray-900'
      }`}
    >
      {/* Left: Mobile Toggle, Breadcrumb & Title */}
      <div className="flex items-center gap-3 min-w-0">
        {onOpenMobileSidebar && (
          <button
            id="topbar-mobile-menu-btn"
            onClick={onOpenMobileSidebar}
            className={`md:hidden p-1.5 rounded-[4px] transition cursor-pointer ${
              isLight
                ? 'text-[#52525B] hover:text-[#18181B] hover:bg-[#EAEAEB]'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={crumb}>
                {idx > 0 && (
                  <ChevronRight className={`w-3 h-3 ${
                    isLight ? 'text-[#A1A1AA]' : 'text-gray-400'
                  }`} />
                )}
                <span
                  className={
                    idx === breadcrumb.length - 1
                      ? isLight
                        ? 'text-[#18181B] font-semibold'
                        : 'text-black font-semibold'
                      : isLight
                      ? 'text-[#71717A]'
                      : 'text-gray-500'
                  }
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-baseline gap-3 mt-0.5">
            <h2 className={`text-[17px] sm:text-[18px] font-semibold tracking-tight leading-tight truncate ${
              isLight ? 'text-[#18181B]' : 'text-gray-900'
            }`}>
              {title}
            </h2>
          </div>
        </div>
      </div>

      {/* Right: Primary Action, Alerts & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Quick New Forecast Action */}
        {currentTab !== 'new-forecast' && currentTab !== 'forecast-result' && (
          <button
            id="topbar-new-forecast-btn"
            onClick={() => onSelectTab('new-forecast')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-[13px] font-medium transition cursor-pointer ${
              isLight
                ? 'bg-[#18181B] text-white hover:bg-[#27272A]'
                : 'bg-black text-white hover:bg-[#262626]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">New Forecast</span>
          </button>
        )}

        {/* Operational Alerts Icon */}
        <button
          id="topbar-alerts-btn"
          onClick={() => onSelectTab('alerts')}
          className={`relative p-1.5 rounded-[5px] transition cursor-pointer border ${
            isLight
              ? 'text-[#3F3F46] hover:text-[#18181B] hover:bg-[#EAEAEB] bg-white border-[#E4E4E7]'
              : 'text-gray-800 hover:text-black hover:bg-gray-100 bg-white border-[#D0D0D0]'
          }`}
          title="Operational Alerts"
        >
          <Bell className={`w-4 h-4 ${isLight ? 'text-[#3F3F46]' : 'text-gray-800'}`} />
          {unreadAlertsCount > 0 && (
            <span
              id="topbar-alert-badge"
              className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D32F2F] text-white text-[10px] flex items-center justify-center font-medium leading-none"
            >
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Subtle Separator */}
        <div className={`h-5 w-px ${isLight ? 'bg-[#E4E4E7]' : 'bg-[#D0D0D0]'}`} />

        {/* Manager User Profile Snippet */}
        <div
          onClick={() => onSelectTab('settings')}
          className={`flex items-center gap-2 cursor-pointer group px-1 py-0.5 rounded-[5px] transition ${
            isLight ? 'hover:bg-[#EAEAEB]' : 'hover:bg-gray-100'
          }`}
          title="Account Settings"
        >
          <div className={`w-7 h-7 rounded-[4px] flex items-center justify-center font-bold text-xs border ${
            isLight
              ? 'bg-white text-[#18181B] border-[#E4E4E7]'
              : 'bg-gray-100 text-gray-800 border-[#D0D0D0]'
          }`}>
            {user?.name ? user.name.charAt(0) : 'S'}
          </div>
          <div className="hidden xl:block text-left">
            <p className={`text-[12.5px] font-medium leading-tight group-hover:underline ${
              isLight ? 'text-[#18181B]' : 'text-gray-900'
            }`}>
              {user?.name || 'Capt. Samarth R.'}
            </p>
            <p className={`text-[10.5px] leading-tight ${
              isLight ? 'text-[#71717A]' : 'text-gray-500'
            }`}>
              Logistics Officer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
