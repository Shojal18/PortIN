import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  GitCompare,
  Anchor,
  Ship,
  AlertTriangle,
  History,
  Settings,
  TrendingUp,
  X,
  LogOut
} from 'lucide-react';
import { NavTab } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadAlertsCount?: number;
  activeOrdersCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onReturnToLanding?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unreadAlertsCount = 0,
  activeOrdersCount = 0,
  isOpenMobile = false,
  onCloseMobile,
  onReturnToLanding
}) => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleLogout = () => {
    logout();
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const navGroups = [
    {
      groupTitle: 'Market',
      items: [
        { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'new-forecast' as NavTab, label: 'New Forecast', icon: Compass },
        {
          id: 'portfolio' as NavTab,
          label: 'Charter Operations',
          icon: Briefcase,
          badge: activeOrdersCount > 0 ? activeOrdersCount : undefined,
          isAlertBadge: false
        },
        { id: 'trading' as NavTab, label: 'Market Terminal', icon: TrendingUp }
      ]
    },
    {
      groupTitle: 'Analysis',
      items: [
        { id: 'comparisons' as NavTab, label: 'Comparisons', icon: GitCompare },
        { id: 'ports' as NavTab, label: 'Port Directory', icon: Anchor },
        { id: 'vessels' as NavTab, label: 'Vessel Directory', icon: Ship }
      ]
    },
    {
      groupTitle: 'Monitoring',
      items: [
        {
          id: 'alerts' as NavTab,
          label: 'Alerts & Risks',
          icon: AlertTriangle,
          badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined,
          isAlertBadge: true
        },
        { id: 'history' as NavTab, label: 'History', icon: History }
      ]
    },
    {
      groupTitle: 'System',
      items: [
        { id: 'settings' as NavTab, label: 'Settings', icon: Settings }
      ]
    }
  ];

  const sidebarContent = (
    <aside
      id="freightiq-sidebar"
      className={`w-[260px] flex flex-col shrink-0 select-none h-full transition-colors ${
        isLight
          ? 'bg-[#EAEAEB] text-[#18181B] border-r border-[#E4E4E7]'
          : 'bg-white text-gray-900 border-r border-[#D0D0D0]'
      }`}
    >
      {/* Brand Header */}
      <div
        id="sidebar-header"
        className={`px-4 py-4 flex items-center justify-between shrink-0 border-b ${
          isLight
            ? 'bg-[#EAEAEB] border-[#E4E4E7]'
            : 'bg-white border-[#D0D0D0]'
        }`}
      >
        <div
          onClick={() => {
            if (onReturnToLanding) {
              onReturnToLanding();
            } else {
              handleNavClick('dashboard');
            }
          }}
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Public Overview / Landing Page"
        >
          <div className={`w-8.5 h-8.5 rounded-[5px] flex items-center justify-center shrink-0 ${
            isLight ? 'bg-[#18181B] text-white' : 'bg-black text-white'
          }`}>
            <Anchor className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className={`font-bold text-[17px] tracking-tight leading-none ${
                isLight ? 'text-[#18181B]' : 'text-black'
              }`}>
                PortIN
              </h1>
            </div>
            <p className={`text-[11px] font-normal mt-1 leading-tight ${
              isLight ? 'text-[#71717A]' : 'text-gray-500'
            }`}>
              Freight Forecasting Prototype
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            id="sidebar-mobile-close-btn"
            onClick={onCloseMobile}
            className={`md:hidden p-1.5 rounded-[4px] transition cursor-pointer ${
              isLight
                ? 'text-[#52525B] hover:text-[#18181B] hover:bg-[#E4E4E7]'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
            aria-label="Close Sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-3 px-3 space-y-4 overflow-y-auto">
        {navGroups.map(group => (
          <div key={group.groupTitle}>
            <div className={`px-2.5 pb-1 text-[11px] font-medium tracking-wider uppercase ${
              isLight ? 'text-[#71717A]' : 'text-gray-500'
            }`}>
              {group.groupTitle}
            </div>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                let btnClasses = '';
                if (isLight) {
                  btnClasses = isActive
                    ? 'bg-[#DCDCE0] text-[#18181B] font-medium border border-[#D4D4D8]/60 shadow-2xs'
                    : 'text-[#52525B] hover:bg-[#E0E0E4] hover:text-[#18181B] font-normal';
                } else {
                  btnClasses = isActive
                    ? 'bg-black text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-black font-normal';
                }

                let iconColor = '';
                if (isLight) {
                  iconColor = isActive ? 'text-[#18181B]' : 'text-[#71717A]';
                } else {
                  iconColor = isActive ? 'text-white' : 'text-gray-700';
                }

                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[5px] text-[13px] transition-colors cursor-pointer ${btnClasses}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      item.isAlertBadge ? (
                        <span
                          id="sidebar-alert-badge"
                          className="w-5 h-5 min-w-[20px] rounded-full bg-[#D32F2F] text-white text-[11px] font-medium flex items-center justify-center shrink-0 leading-none"
                        >
                          {item.badge}
                        </span>
                      ) : (
                        <span
                          className={`text-[11px] font-mono px-1.5 py-0.2 rounded-[3px] font-semibold border ${
                            isLight
                              ? isActive
                                ? 'bg-white text-[#18181B] border-[#D4D4D8]'
                                : 'bg-[#E4E4E7] text-[#52525B] border-[#D4D4D8]'
                              : isActive
                              ? 'bg-white text-black border-white'
                              : 'bg-gray-100 text-gray-800 border-gray-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ML Engine Status Box */}
      <div className={`px-3 py-2.5 mx-3 mb-3 rounded-[6px] border text-[12px] shrink-0 ${
        isLight
          ? 'bg-[#F0F0F2] border-[#E4E4E7] text-[#18181B]'
          : 'bg-[#F9FAFB] border-[#D0D0D0] text-gray-900'
      }`}>
        <div className="flex items-center justify-between font-medium">
          <span className={`text-[11px] uppercase tracking-wide ${
            isLight ? 'text-[#71717A]' : 'text-gray-600'
          }`}>
            ML Engine Status
          </span>
          <span className={`text-[11px] font-semibold ${
            isLight ? 'text-[#18181B]' : 'text-gray-800'
          }`}>Active</span>
        </div>
        <div className={`flex justify-between items-center text-[11px] font-mono mt-1 ${
          isLight ? 'text-[#71717A]' : 'text-gray-500'
        }`}>
          <span>140 Corridors</span>
          <span>SARIMA / Prophet</span>
        </div>
      </div>

      {/* User Profile Footer */}
      <div
        id="sidebar-user-profile"
        className={`px-3.5 py-2.5 border-t shrink-0 ${
          isLight
            ? 'bg-[#EAEAEB] border-[#E4E4E7]'
            : 'bg-white border-[#D0D0D0]'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div
            onClick={() => handleNavClick('settings')}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer group flex-1"
          >
            <div className={`w-7 h-7 rounded-[4px] flex items-center justify-center font-bold text-xs shrink-0 border ${
              isLight
                ? 'bg-white text-[#18181B] border-[#E4E4E7]'
                : 'bg-gray-100 text-gray-800 border-[#D0D0D0]'
            }`}>
              {user?.name ? user.name.charAt(0) : 'S'}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-[12.5px] font-medium truncate leading-tight group-hover:underline ${
                isLight ? 'text-[#18181B]' : 'text-gray-900'
              }`}>
                {user?.name || 'Capt. Samarth R.'}
              </p>
              <p className={`text-[10.5px] truncate leading-tight mt-0.5 ${
                isLight ? 'text-[#71717A]' : 'text-gray-500'
              }`}>
                Logistics Manager
              </p>
            </div>
          </div>

          <button
            id="sidebar-logout-btn"
            onClick={handleLogout}
            title="Log Out"
            className={`p-1 rounded-[4px] transition cursor-pointer ${
              isLight
                ? 'text-[#71717A] hover:text-[#18181B] hover:bg-[#E4E4E7]'
                : 'text-gray-500 hover:text-black hover:bg-gray-100'
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
            className="fixed inset-0 bg-black/40 transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full z-10 shadow-lg bg-white">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
