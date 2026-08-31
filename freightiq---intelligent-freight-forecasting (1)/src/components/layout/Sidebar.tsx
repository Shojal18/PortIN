import React from 'react';
import {
  LayoutDashboard,
  Compass,
  GitCompare,
  Anchor,
  Ship,
  AlertTriangle,
  History,
  Settings,
  LogOut,
  Briefcase,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from './Toast';
import { useTheme } from '../../context/ThemeContext';
import { NavTab } from '../../types';

export interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadAlertsCount?: number;
  activeOrdersCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unreadAlertsCount = 0,
  activeOrdersCount = 4,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const { theme } = useTheme();

  const isLight = theme === 'light';

  const handleLogout = () => {
    logout();
    showToast('info', 'Logged Out', 'You have been safely signed out of FreightIQ.');
  };

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <aside
      id="freightiq-sidebar"
      className={`w-[260px] flex flex-col shrink-0 select-none h-full transition-colors duration-200 ${
        isLight
          ? 'bg-[#DCEAF4] text-[#12304A] border-r border-[#BFD3E0]'
          : 'bg-gradient-to-b from-[#071A2B] to-[#0B2940] text-slate-100 border-r border-[#183A52]'
      }`}
    >
      {/* Brand Header */}
      <div
        id="sidebar-header"
        className={`px-5 py-4 flex items-center justify-between shrink-0 border-b ${
          isLight ? 'border-[#BFD3E0] bg-[#DCEAF4]' : 'border-[#183A52] bg-[#071A2B]'
        }`}
      >
        <div
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-sm transition ${
              isLight
                ? 'bg-white border border-[#BFD3E0] text-[#087F8C]'
                : 'bg-[#0E314D] border border-[#087F8C]/50 text-[#12A6A6]'
            }`}
          >
            <Anchor className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1
                className={`font-bold text-[17px] tracking-tight leading-none font-sans ${
                  isLight ? 'text-[#12304A]' : 'text-white'
                }`}
              >
                FreightIQ
              </h1>
            </div>
            <p
              className={`text-[12px] font-normal mt-1 leading-tight ${
                isLight ? 'text-[#526477]' : 'text-slate-400'
              }`}
            >
              Intelligent Freight Forecasting
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            id="sidebar-mobile-close-btn"
            onClick={onCloseMobile}
            className={`md:hidden p-1.5 rounded transition ${
              isLight
                ? 'text-[#526477] hover:text-[#12304A] hover:bg-[#C9DFEC]'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Close Sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Navigation - Grouped */}
      <div className="flex-1 py-3 px-3 space-y-4 overflow-y-auto">
        {/* MARKET GROUP */}
        <div>
          <div
            className={`px-3 pb-1 text-[11px] font-semibold tracking-wider uppercase font-sans ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            Market
          </div>
          <div className="space-y-1">
            {[
              { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
              { id: 'new-forecast' as NavTab, label: 'New Forecast', icon: Compass },
              {
                id: 'portfolio' as NavTab,
                label: 'Charter Operations',
                icon: Briefcase,
                badge: activeOrdersCount > 0 ? activeOrdersCount : undefined
              }
            ].map(item => {
              const Icon = item.icon;
              const isActive =
                currentTab === item.id ||
                (item.id === 'new-forecast' && currentTab === 'forecast-result') ||
                (item.id === 'portfolio' && currentTab === 'trading');

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-[14px] transition-colors duration-150 group cursor-pointer ${
                    isLight
                      ? isActive
                        ? 'bg-[#FFFFFF] text-[#12304A] font-semibold border-l-[3px] border-[#087F8C] shadow-xs'
                        : 'text-[#12304A] hover:bg-[#C9DFEC] font-normal'
                      : isActive
                        ? 'bg-[#087F8C]/20 text-white font-medium border-l-[3px] border-[#087F8C]'
                        : 'text-slate-300 hover:text-white hover:bg-[#102A43]/60 font-normal'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors ${
                        isActive
                          ? isLight
                            ? 'text-[#087F8C]'
                            : 'text-[#12A6A6]'
                          : isLight
                            ? 'text-[#526477] group-hover:text-[#12304A]'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold border ${
                        isLight
                          ? 'bg-[#FFFFFF] text-[#087F8C] border-[#BFD3E0]'
                          : 'bg-[#0E314D] text-teal-300 border-[#183A52]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ANALYSIS GROUP */}
        <div>
          <div
            className={`px-3 pb-1 text-[11px] font-semibold tracking-wider uppercase font-sans ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            Analysis
          </div>
          <div className="space-y-1">
            {[
              { id: 'comparisons' as NavTab, label: 'Comparisons', icon: GitCompare },
              { id: 'ports' as NavTab, label: 'Port Directory', icon: Anchor },
              { id: 'vessels' as NavTab, label: 'Vessel Directory', icon: Ship }
            ].map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-[14px] transition-colors duration-150 group cursor-pointer ${
                    isLight
                      ? isActive
                        ? 'bg-[#FFFFFF] text-[#12304A] font-semibold border-l-[3px] border-[#087F8C] shadow-xs'
                        : 'text-[#12304A] hover:bg-[#C9DFEC] font-normal'
                      : isActive
                        ? 'bg-[#087F8C]/20 text-white font-medium border-l-[3px] border-[#087F8C]'
                        : 'text-slate-300 hover:text-white hover:bg-[#102A43]/60 font-normal'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors ${
                        isActive
                          ? isLight
                            ? 'text-[#087F8C]'
                            : 'text-[#12A6A6]'
                          : isLight
                            ? 'text-[#526477] group-hover:text-[#12304A]'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MONITORING GROUP */}
        <div>
          <div
            className={`px-3 pb-1 text-[11px] font-semibold tracking-wider uppercase font-sans ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            Monitoring
          </div>
          <div className="space-y-1">
            {[
              {
                id: 'alerts' as NavTab,
                label: 'Alerts & Risks',
                icon: AlertTriangle,
                badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined
              },
              { id: 'history' as NavTab, label: 'History', icon: History }
            ].map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-[14px] transition-colors duration-150 group cursor-pointer ${
                    isLight
                      ? isActive
                        ? 'bg-[#FFFFFF] text-[#12304A] font-semibold border-l-[3px] border-[#087F8C] shadow-xs'
                        : 'text-[#12304A] hover:bg-[#C9DFEC] font-normal'
                      : isActive
                        ? 'bg-[#087F8C]/20 text-white font-medium border-l-[3px] border-[#087F8C]'
                        : 'text-slate-300 hover:text-white hover:bg-[#102A43]/60 font-normal'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors ${
                        isActive
                          ? isLight
                            ? 'text-[#087F8C]'
                            : 'text-[#12A6A6]'
                          : isLight
                            ? 'text-[#526477] group-hover:text-[#12304A]'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold border ${
                        isLight
                          ? 'bg-[#FFFFFF] text-[#D8891A] border-[#BFD3E0]'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SYSTEM GROUP */}
        <div>
          <div
            className={`px-3 pb-1 text-[11px] font-semibold tracking-wider uppercase font-sans ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            System
          </div>
          <div className="space-y-1">
            {[
              { id: 'settings' as NavTab, label: 'Settings', icon: Settings }
            ].map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-[14px] transition-colors duration-150 group cursor-pointer ${
                    isLight
                      ? isActive
                        ? 'bg-[#FFFFFF] text-[#12304A] font-semibold border-l-[3px] border-[#087F8C] shadow-xs'
                        : 'text-[#12304A] hover:bg-[#C9DFEC] font-normal'
                      : isActive
                        ? 'bg-[#087F8C]/20 text-white font-medium border-l-[3px] border-[#087F8C]'
                        : 'text-slate-300 hover:text-white hover:bg-[#102A43]/60 font-normal'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors ${
                        isActive
                          ? isLight
                            ? 'text-[#087F8C]'
                            : 'text-[#12A6A6]'
                          : isLight
                            ? 'text-[#526477] group-hover:text-[#12304A]'
                            : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ML Engine Active Status Module */}
      <div
        className={`px-3 py-2.5 mx-3 mb-3 rounded-[6px] border text-[12px] leading-tight shrink-0 ${
          isLight
            ? 'bg-white border-[#BFD3E0] text-[#12304A]'
            : 'bg-[#081827]/80 border-[#183A52] text-slate-300'
        }`}
      >
        <div className="font-medium flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#16805C] dark:bg-[#20B26B] animate-pulse" />
          <span
            className={`tracking-wide uppercase text-[11px] font-semibold ${
              isLight ? 'text-[#12304A]' : 'text-slate-200'
            }`}
          >
            ML ENGINE ACTIVE
          </span>
        </div>
        <div
          className={`flex justify-between items-center text-[11.5px] font-mono mt-1 ${
            isLight ? 'text-[#526477]' : 'text-slate-400'
          }`}
        >
          <span>140 corridors</span>
          <span className={isLight ? 'text-[#12304A] font-medium' : 'text-slate-300'}>
            SARIMA / Prophet
          </span>
        </div>
      </div>

      {/* User Profile Footer */}
      <div
        id="sidebar-user-profile"
        className={`px-4 py-3 border-t shrink-0 ${
          isLight ? 'border-[#BFD3E0] bg-[#DCEAF4]' : 'border-[#183A52] bg-[#061523]'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div
            onClick={() => handleNavClick('settings')}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer group flex-1"
          >
            <div
              className={`w-8 h-8 rounded-[6px] flex items-center justify-center font-bold text-xs shrink-0 border ${
                isLight
                  ? 'bg-white text-[#087F8C] border-[#BFD3E0]'
                  : 'bg-[#0E314D] text-[#12A6A6] border-[#183A52]'
              }`}
            >
              {user?.name ? user.name.charAt(0) : 'S'}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={`text-[13.5px] font-medium truncate leading-tight transition ${
                  isLight
                    ? 'text-[#12304A] group-hover:text-[#087F8C]'
                    : 'text-white group-hover:text-[#12A6A6]'
                }`}
              >
                {user?.name || 'Capt. Samarth R.'}
              </p>
              <p
                className={`text-[11px] truncate leading-tight mt-0.5 ${
                  isLight ? 'text-[#526477]' : 'text-slate-400'
                }`}
              >
                Logistics & Chartering Manager
              </p>
            </div>
          </div>

          <button
            id="sidebar-logout-btn"
            onClick={handleLogout}
            title="Log Out"
            className={`p-1.5 rounded transition cursor-pointer ${
              isLight
                ? 'text-[#526477] hover:text-rose-600 hover:bg-[#C9DFEC]'
                : 'text-slate-400 hover:text-rose-400 hover:bg-white/5'
            }`}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex md:h-full md:flex-col shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 transition-opacity"
            onClick={onCloseMobile}
          />
          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full z-10 shadow-xl ${
              isLight ? 'bg-[#DCEAF4]' : 'bg-[#0B1F33]'
            }`}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
