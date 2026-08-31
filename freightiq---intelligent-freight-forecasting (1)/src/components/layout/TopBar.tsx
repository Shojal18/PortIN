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

  const getPageTitleAndBreadcrumbs = () => {
    switch (currentTab) {
      case 'dashboard':
        return {
          title: customTitle || 'Operations Dashboard',
          subtitle: customSubtitle || 'Real-time dry bulk freight forecasting and vessel-port feasibility analysis.',
          breadcrumb: ['FreightIQ', 'Dashboard']
        };
      case 'trading':
        return {
          title: customTitle || 'Charter Market Terminal',
          subtitle: customSubtitle || 'Orderbook liquidity, spot/forward spread curve, and quick execution.',
          breadcrumb: ['Market', 'Charter Operations']
        };
      case 'portfolio':
        return {
          title: customTitle || 'Charter Operations & Voyage Tracker',
          subtitle: customSubtitle || 'Active contracts, demurrage monitoring, and port turnaround tracking.',
          breadcrumb: ['Market', 'Charter Operations']
        };
      case 'new-forecast':
        return {
          title: customTitle || 'Create Freight Forecast',
          subtitle: customSubtitle || 'Configure cargo specification, trade corridor, and charter period.',
          breadcrumb: ['Market', 'New Forecast']
        };
      case 'forecast-result':
        return {
          title: customTitle || 'Forecast Analysis & Recommendation',
          subtitle: customSubtitle || 'Optimal charter window, rate confidence bands, and vessel compatibility.',
          breadcrumb: ['Market', 'Forecast Result']
        };
      case 'comparisons':
        return {
          title: customTitle || 'Corridor Comparison',
          subtitle: customSubtitle || 'Multi-route freight benchmarking and landed cost sensitivity matrix.',
          breadcrumb: ['Analysis', 'Comparisons']
        };
      case 'ports':
        return {
          title: customTitle || 'Port Directory',
          subtitle: customSubtitle || 'Indian East Coast & Global discharge port drafts, LOA, and beam limits.',
          breadcrumb: ['Analysis', 'Port Directory']
        };
      case 'vessels':
        return {
          title: customTitle || 'Vessel Directory',
          subtitle: customSubtitle || 'Dry bulk naval specifications, DWT ratings, and daily fuel consumption.',
          breadcrumb: ['Analysis', 'Vessel Directory']
        };
      case 'alerts':
        return {
          title: customTitle || 'Operational Risks & Alerts',
          subtitle: customSubtitle || 'Monsoon swells, port congestion delays, and bunker price spikes.',
          breadcrumb: ['Monitoring', 'Alerts & Risks']
        };
      case 'history':
        return {
          title: customTitle || 'Forecast History & Audit',
          subtitle: customSubtitle || 'Historical econometric model runs and recommendation accuracy log.',
          breadcrumb: ['Monitoring', 'History']
        };
      case 'settings':
        return {
          title: customTitle || 'System Settings',
          subtitle: customSubtitle || 'Manager profile, appearance theme, currency preference, and model disclosures.',
          breadcrumb: ['System', 'Settings']
        };
      default:
        return {
          title: customTitle || 'FreightIQ',
          subtitle: customSubtitle || 'Maritime Freight Intelligence',
          breadcrumb: ['FreightIQ', 'Dashboard']
        };
    }
  };

  const { title, subtitle, breadcrumb } = getPageTitleAndBreadcrumbs();

  return (
    <header
      id="freightiq-topbar"
      className={`min-h-[64px] border-b px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0 sticky top-0 z-30 font-sans transition-colors duration-200 ${
        isLight
          ? 'bg-[#FFFFFF] border-[#D7E0E7] text-[#12304A]'
          : 'bg-[#071522] border-[#183A52] text-white'
      }`}
    >
      {/* Left: Mobile Menu Toggle & Title / Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        {onOpenMobileSidebar && (
          <button
            id="topbar-mobile-menu-btn"
            onClick={onOpenMobileSidebar}
            className={`md:hidden p-1.5 rounded transition cursor-pointer ${
              isLight
                ? 'text-[#526477] hover:text-[#12304A] hover:bg-[#EEF3F7]'
                : 'text-slate-400 hover:text-white hover:bg-[#102A43]'
            }`}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <div
            className={`flex items-center gap-1.5 text-[11px] font-medium ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={crumb}>
                {idx > 0 && (
                  <ChevronRight
                    className={`w-3 h-3 ${isLight ? 'text-[#7E91A4]' : 'text-slate-500'}`}
                  />
                )}
                <span
                  className={
                    idx === breadcrumb.length - 1
                      ? isLight
                        ? 'text-[#087F8C] font-semibold'
                        : 'text-[#12A6A6] font-semibold'
                      : isLight
                        ? 'text-[#526477]'
                        : 'text-slate-400'
                  }
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-baseline gap-3">
            <h2
              className={`text-[20px] sm:text-[22px] font-bold tracking-tight leading-tight truncate ${
                isLight ? 'text-[#12304A]' : 'text-white'
              }`}
            >
              {title}
            </h2>
            {subtitle && (
              <span
                className={`hidden lg:inline text-[13px] font-normal truncate border-l pl-3 ${
                  isLight
                    ? 'text-[#526477] border-[#D7E0E7]'
                    : 'text-slate-400 border-[#183A52]'
                }`}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Operational Snapshot & Action */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Quick New Forecast Action */}
        {currentTab !== 'new-forecast' && currentTab !== 'forecast-result' && (
          <button
            id="topbar-new-forecast-btn"
            onClick={() => onSelectTab('new-forecast')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] text-white text-[13.5px] font-medium transition cursor-pointer shadow-xs ${
              isLight
                ? 'bg-[#087F8C] hover:bg-[#066670]'
                : 'bg-[#087F8C] hover:bg-[#12A6A6]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">New Forecast</span>
          </button>
        )}

        {/* Notifications Icon */}
        <button
          id="topbar-alerts-btn"
          onClick={() => onSelectTab('alerts')}
          className={`relative p-2 rounded-[6px] transition cursor-pointer border ${
            isLight
              ? 'text-[#526477] hover:text-[#12304A] hover:bg-[#EEF3F7] border-transparent hover:border-[#D7E0E7]'
              : 'text-slate-400 hover:text-white hover:bg-[#102A43] border-transparent hover:border-[#183A52]'
          }`}
          title="Operational Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E0A33A]" />
          )}
        </button>

        {/* Subtle Separator */}
        <div
          className={`h-6 w-px ${isLight ? 'bg-[#D7E0E7]' : 'bg-[#183A52]'}`}
        />

        {/* Manager User Snippet */}
        <div
          onClick={() => onSelectTab('settings')}
          className={`flex items-center gap-2.5 cursor-pointer group px-1 py-1 rounded-[6px] transition ${
            isLight ? 'hover:bg-[#EEF3F7]' : 'hover:bg-[#102A43]'
          }`}
          title="Account Settings"
        >
          <div
            className={`w-8 h-8 rounded-[6px] flex items-center justify-center font-bold text-xs border ${
              isLight
                ? 'bg-[#EEF3F7] text-[#087F8C] border-[#D7E0E7]'
                : 'bg-[#0E314D] text-[#12A6A6] border-[#183A52]'
            }`}
          >
            {user?.name ? user.name.charAt(0) : 'S'}
          </div>
          <div className="hidden xl:block text-left">
            <p
              className={`text-[13px] font-medium leading-tight transition ${
                isLight
                  ? 'text-[#12304A] group-hover:text-[#087F8C]'
                  : 'text-white group-hover:text-[#12A6A6]'
              }`}
            >
              {user?.name || 'Samarth R.'}
            </p>
            <p
              className={`text-[11px] leading-tight ${
                isLight ? 'text-[#526477]' : 'text-slate-400'
              }`}
            >
              Logistics Manager
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
