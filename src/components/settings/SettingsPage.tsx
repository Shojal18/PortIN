import React, { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Save,
  Info,
  RefreshCw,
  Cpu,
  Palette,
  DollarSign,
  Sparkles,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../layout/Toast';
import { useTheme, PORTIN_GRADIENT_PRESETS } from '../../context/ThemeContext';
import { api } from '../../services/api';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const {
    theme,
    setTheme,
    currencyPreference,
    setCurrencyPreference,
    gradientPreset,
    setGradientPreset,
  } = useTheme();
  const isLight = theme === 'light';

  const [, setModelStatus] = useState<any>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false);

  // Preference state
  const [autoAssessRisk, setAutoAssessRisk] = useState<boolean>(true);
  const [bunkerIndexAlerts, setBunkerIndexAlerts] = useState<boolean>(true);
  const [monsoonAlerts, setMonsoonAlerts] = useState<boolean>(true);

  const fetchStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const res = await api.getModelStatus();
      setModelStatus(res);
    } catch (e) {
      console.warn('Failed to fetch ML status:', e);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Settings Saved', 'System preferences and appearance configuration updated.');
  };

  const cardBorder = isLight ? 'border-[#E4E4E7]' : 'border-[#D0D0D0]';
  const innerBg = isLight ? 'bg-[#F8F8F9]' : 'bg-[#F9FAFB]';
  const innerBorder = isLight ? 'border-[#E4E4E7]' : 'border-[#D0D0D0]';
  const textTitle = isLight ? 'text-[#18181B]' : 'text-black';
  const textMuted = isLight ? 'text-[#71717A]' : 'text-gray-600';
  const textSub = isLight ? 'text-[#71717A]' : 'text-gray-500';

  return (
    <div
      id="settings-page-container"
      className="space-y-4 max-w-5xl mx-auto pb-10 font-sans"
    >
      {/* Header Banner */}
      <div className={`bg-white rounded-[6px] border ${cardBorder} p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3`}>
        <div>
          <h2 className={`text-[16px] sm:text-[17px] font-semibold ${textTitle} uppercase tracking-wider`}>
            System Settings & Preferences
          </h2>
          <p className={`text-[12.5px] ${textMuted} mt-0.5`}>
            Theme appearance, PortIN color gradient presets, default currency, and operational rules.
          </p>
        </div>

        <span className={`px-2.5 py-1 rounded-[4px] font-mono text-[11px] font-medium border self-start md:self-auto ${
          isLight
            ? 'bg-[#F0F0F2] text-[#18181B] border-[#E4E4E7]'
            : 'bg-[#F3F4F6] text-gray-800 border-[#D0D0D0]'
        }`}>
          Terminal Admin Mode
        </span>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-4">
        {/* Panel 1: Appearance & Color Gradient */}
        <div className={`bg-white rounded-[6px] border ${cardBorder} p-4 sm:p-5`}>
          <div className={`flex items-center justify-between pb-3 border-b ${cardBorder}`}>
            <div className="flex items-center gap-2">
              <Palette className={`w-4 h-4 ${textTitle}`} />
              <h3 className={`font-semibold text-[13.5px] uppercase tracking-wider ${textTitle}`}>
                Appearance & Color Gradient
              </h3>
            </div>
            <span className={`text-[11px] font-mono ${textSub}`}>
              Global Theme Tokens
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {/* Subsection: Color Gradient Presets */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#52796A]" />
                <h4 className={`font-semibold text-[13px] ${textTitle}`}>
                  PortIN Color Gradient
                </h4>
              </div>
              <p className={`text-xs ${textMuted} mb-3 leading-relaxed`}>
                Select the active PortIN color gradient preset. Updates brand highlights, buttons, indicators, and fleet operational panels globally.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {PORTIN_GRADIENT_PRESETS.map((preset) => {
                  const isSelected = gradientPreset === preset.id;
                  return (
                    <div
                      key={preset.id}
                      id={`gradient-preset-${preset.id}`}
                      onClick={() => setGradientPreset(preset.id)}
                      className={`p-3 rounded-[6px] border transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#52796A] bg-[#F4F6F4] ring-1 ring-[#52796A]'
                          : `bg-white ${cardBorder} hover:border-gray-400`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-semibold text-[12px] ${isSelected ? 'text-[#212528]' : textTitle}`}>
                          {preset.name}
                        </span>
                        {isSelected ? (
                          <span className="w-4 h-4 rounded-full bg-[#52796A] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-gray-400">Select</span>
                        )}
                      </div>

                      {/* Visual Gradient Bar Preview */}
                      <div
                        className="w-full h-5 rounded-[4px] border border-black/10 shadow-xs mb-2"
                        style={{ background: preset.gradientCss }}
                      />

                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                        <span>{preset.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subsection: Visual Theme Archetype */}
            <div className="pt-3 border-t border-gray-100">
              <h4 className={`font-semibold text-[13px] ${textTitle} mb-1`}>
                Base Workspace Contrast
              </h4>
              <p className={`text-xs ${textMuted} mb-3 leading-relaxed`}>
                Switch between the soft layered developer theme and the high-contrast structured workspace.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Standard B&W Prototype Option (Cursor-inspired soft grayscale) */}
                <div
                  id="theme-option-light"
                  onClick={() => setTheme('light')}
                  className={`p-3.5 rounded-[5px] border transition cursor-pointer flex flex-col justify-between ${
                    theme === 'light'
                      ? isLight
                        ? 'bg-[#F8F8F9] border-[#18181B] ring-1 ring-[#18181B]'
                        : 'bg-[#F9FAFB] border-black ring-1 ring-black'
                      : 'bg-white border-[#E4E4E7] hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isLight ? 'border-[#18181B]' : 'border-black'
                      }`}>
                        {theme === 'light' && (
                          <div className={`w-2 h-2 rounded-full ${isLight ? 'bg-[#18181B]' : 'bg-black'}`} />
                        )}
                      </div>
                      <div>
                        <h4 className={`font-semibold text-[13px] ${isLight ? 'text-[#18181B]' : 'text-black'}`}>
                          Monochrome Clean (Prototype)
                        </h4>
                        <p className={`text-[11px] ${textSub}`}>
                          Cursor-inspired soft grayscale, light-gray sidebar, layered off-white surfaces
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dark Prototype Option */}
                <div
                  id="theme-option-dark"
                  onClick={() => setTheme('dark')}
                  className={`p-3.5 rounded-[5px] border transition cursor-pointer flex flex-col justify-between ${
                    theme === 'dark'
                      ? 'bg-gray-100 border-black ring-1 ring-black'
                      : `bg-white ${cardBorder} hover:border-gray-400`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center">
                        {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-black" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-black text-[13px]">High-Contrast Workspace</h4>
                        <p className="text-gray-500 text-[11px]">Structured monochrome layout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Currency Preference */}
        <div className={`bg-white rounded-[6px] border ${cardBorder} p-4 sm:p-5`}>
          <div className={`flex items-center gap-2 pb-3 border-b ${cardBorder}`}>
            <DollarSign className={`w-4 h-4 ${textTitle}`} />
            <h3 className={`font-semibold text-[13.5px] uppercase tracking-wider ${textTitle}`}>
              Default Currency Display
            </h3>
          </div>

          <p className={`text-xs ${textMuted} mt-2.5 mb-3 leading-relaxed`}>
            Select the default currency format for voyage cost summaries and landed reports.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`p-3 rounded-[5px] border flex items-center justify-between transition cursor-pointer ${
                currencyPreference === 'USD'
                  ? `${innerBg} ${isLight ? 'border-[#18181B] ring-1 ring-[#18181B]' : 'border-black ring-1 ring-black'}`
                  : `bg-white ${cardBorder}`
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="currency-pref"
                  checked={currencyPreference === 'USD'}
                  onChange={() => setCurrencyPreference('USD')}
                  className="accent-[#18181B] w-3.5 h-3.5 cursor-pointer"
                />
                <div>
                  <strong className={`${textTitle} text-[12.5px]`}>USD ($) — US Dollar</strong>
                  <p className={`text-[11px] font-mono ${textSub}`}>
                    Maritime standard ($/MT & daily hire)
                  </p>
                </div>
              </div>
            </label>

            <label
              className={`p-3 rounded-[5px] border flex items-center justify-between transition cursor-pointer ${
                currencyPreference === 'INR'
                  ? `${innerBg} ${isLight ? 'border-[#18181B] ring-1 ring-[#18181B]' : 'border-black ring-1 ring-black'}`
                  : `bg-white ${cardBorder}`
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="currency-pref"
                  checked={currencyPreference === 'INR'}
                  onChange={() => setCurrencyPreference('INR')}
                  className="accent-[#18181B] w-3.5 h-3.5 cursor-pointer"
                />
                <div>
                  <strong className={`${textTitle} text-[12.5px]`}>INR (₹) — Indian Rupee</strong>
                  <p className={`text-[11px] font-mono ${textSub}`}>
                    Indian port procurement basis (₹/MT)
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Panel 3: Profile */}
        <div className={`bg-white rounded-[6px] border ${cardBorder} p-4 sm:p-5`}>
          <div className={`flex items-center gap-2 pb-3 border-b ${cardBorder}`}>
            <User className={`w-4 h-4 ${textTitle}`} />
            <h3 className={`font-semibold text-[13.5px] uppercase tracking-wider ${textTitle}`}>
              Chartering Officer Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5 text-xs">
            <div>
              <label className={`block text-[11px] font-medium mb-1 uppercase tracking-wide ${isLight ? 'text-[#52525B]' : 'text-gray-700'}`}>
                Full Name
              </label>
              <input
                type="text"
                disabled
                value={user?.name || 'Capt. Samarth R.'}
                className={`w-full px-3 py-1.5 rounded-[4px] border font-mono text-[12px] cursor-not-allowed ${
                  isLight
                    ? 'bg-[#F8F8F9] border-[#E4E4E7] text-[#18181B]'
                    : 'bg-[#F9FAFB] border-[#D0D0D0] text-black'
                }`}
              />
            </div>

            <div>
              <label className={`block text-[11px] font-medium mb-1 uppercase tracking-wide ${isLight ? 'text-[#52525B]' : 'text-gray-700'}`}>
                Official Email Address
              </label>
              <input
                type="text"
                disabled
                value={user?.email || 'manager@freightiq.demo'}
                className={`w-full px-3 py-1.5 rounded-[4px] border font-mono text-[12px] cursor-not-allowed ${
                  isLight
                    ? 'bg-[#F8F8F9] border-[#E4E4E7] text-[#18181B]'
                    : 'bg-[#F9FAFB] border-[#D0D0D0] text-black'
                }`}
              />
            </div>

            <div>
              <label className={`block text-[11px] font-medium mb-1 uppercase tracking-wide ${isLight ? 'text-[#52525B]' : 'text-gray-700'}`}>
                Designated Operational Role
              </label>
              <input
                type="text"
                disabled
                value={user?.role || 'Chief Commercial Logistics & Chartering Manager'}
                className={`w-full px-3 py-1.5 rounded-[4px] border font-mono text-[12px] cursor-not-allowed ${
                  isLight
                    ? 'bg-[#F8F8F9] border-[#E4E4E7] text-[#18181B]'
                    : 'bg-[#F9FAFB] border-[#D0D0D0] text-black'
                }`}
              />
            </div>

            <div>
              <label className={`block text-[11px] font-medium mb-1 uppercase tracking-wide ${isLight ? 'text-[#52525B]' : 'text-gray-700'}`}>
                Enterprise Logistics Desk
              </label>
              <input
                type="text"
                disabled
                value={user?.organization || 'Bharat East Coast Bulk Terminal Desk'}
                className={`w-full px-3 py-1.5 rounded-[4px] border font-mono text-[12px] cursor-not-allowed ${
                  isLight
                    ? 'bg-[#F8F8F9] border-[#E4E4E7] text-[#18181B]'
                    : 'bg-[#F9FAFB] border-[#D0D0D0] text-black'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Panel 4: ML Engine Diagnostics */}
        <div className={`bg-white rounded-[6px] border ${cardBorder} p-4 sm:p-5`}>
          <div className={`flex items-center justify-between pb-3 border-b ${cardBorder}`}>
            <div className="flex items-center gap-2">
              <Cpu className={`w-4 h-4 ${textTitle}`} />
              <h3 className={`font-semibold text-[13.5px] uppercase tracking-wider ${textTitle}`}>
                Econometric Engine Diagnostics
              </h3>
            </div>
            <button
              type="button"
              onClick={fetchStatus}
              className={`px-2.5 py-1 rounded-[4px] transition cursor-pointer flex items-center gap-1.5 text-[11.5px] font-mono border ${
                isLight
                  ? 'bg-white border-[#E4E4E7] text-[#18181B] hover:bg-[#F4F4F5]'
                  : 'bg-white border-[#D0D0D0] text-black hover:bg-gray-50'
              }`}
              title="Refresh status"
            >
              <RefreshCw className={`w-3 h-3 ${isLoadingStatus ? 'animate-spin' : ''}`} />
              <span>Poll Status</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3.5 text-xs">
            <div className={`p-3 rounded-[5px] border ${innerBorder} ${innerBg}`}>
              <span className={`text-[10.5px] font-medium uppercase tracking-wider ${textSub} block`}>
                Service Status
              </span>
              <strong className={`${textTitle} font-mono text-[13.5px] mt-0.5 block`}>ONLINE (Ready)</strong>
              <span className={`text-[11px] font-mono ${textSub} mt-0.5 block`}>
                140 Corridors Loaded
              </span>
            </div>

            <div className={`p-3 rounded-[5px] border ${innerBorder} ${innerBg}`}>
              <span className={`text-[10.5px] font-medium uppercase tracking-wider ${textSub} block`}>
                Econometric Architecture
              </span>
              <strong className={`font-mono text-[13px] ${textTitle} mt-0.5 block`}>
                Multi-Factor SARIMA + Prophet
              </strong>
              <span className={`text-[11px] ${textSub} mt-0.5 block`}>
                Time-Series Seasonal Decomposition
              </span>
            </div>

            <div className={`p-3 rounded-[5px] border ${innerBorder} ${innerBg}`}>
              <span className={`text-[10.5px] font-medium uppercase tracking-wider ${textSub} block`}>
                Confidence Interval
              </span>
              <strong className={`font-mono text-[13.5px] ${textTitle} mt-0.5 block`}>
                95.0% Empirical Band
              </strong>
              <span className={`text-[11px] ${textSub} mt-0.5 block`}>
                Residual Uncertainty Bounds
              </span>
            </div>
          </div>

          {/* SIH Data Disclosure Card */}
          <div className={`p-3.5 rounded-[5px] border ${innerBorder} ${innerBg} space-y-1.5 text-xs`}>
            <div className={`flex items-center gap-1.5 font-semibold text-[11.5px] uppercase tracking-wide ${textTitle}`}>
              <Info className={`w-3.5 h-3.5 ${textTitle} shrink-0`} />
              <span>Maritime Data Architecture Note</span>
            </div>
            <div className={`space-y-1 leading-relaxed text-[11.5px] ${isLight ? 'text-[#52525B]' : 'text-gray-700'}`}>
              <p>
                <strong className={textTitle}>Reference Specifications:</strong> Indian East Coast port constraints (Paradip, Visakhapatnam, Gangavaram, Gopalpur, Dhamra, Sagar–Sandheads, Haldia drafts, LOA, beam) and vessel profiles use standard commercial bulk guidelines.
              </p>
              <p>
                <strong className={textTitle}>Econometric Models:</strong> 3-year historical freight rates, bunker fuel trends, and port congestion indices model seasonal weather patterns, fuel sensitivity, and macroeconomic freight cycles.
              </p>
            </div>
          </div>
        </div>

        {/* Panel 5: Operational Decision Rules & Alerts */}
        <div className={`bg-white rounded-[6px] border ${cardBorder} p-4 sm:p-5`}>
          <div className={`flex items-center gap-2 pb-3 border-b ${cardBorder}`}>
            <Bell className={`w-4 h-4 ${textTitle}`} />
            <h3 className={`font-semibold text-[13.5px] uppercase tracking-wider ${textTitle}`}>
              Decision Thresholds & Risk Alerts
            </h3>
          </div>

          <div className="space-y-2.5 mt-3.5 text-xs">
            <label className={`flex items-center justify-between p-3 rounded-[5px] border ${innerBorder} ${innerBg} transition cursor-pointer ${
              isLight ? 'hover:bg-[#EAEAEB]' : 'hover:bg-gray-100'
            }`}>
              <div className="space-y-0.5">
                <strong className={`text-[12.5px] block ${textTitle}`}>
                  Automatic Port Feasibility Filter
                </strong>
                <span className={`text-[11.5px] ${textMuted}`}>
                  Strictly exclude vessels violating draft, beam, or LOA limits from recommendations.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoAssessRisk}
                onChange={(e) => setAutoAssessRisk(e.target.checked)}
                className={`w-4 h-4 cursor-pointer ${isLight ? 'accent-[#18181B]' : 'accent-black'}`}
              />
            </label>

            <label className={`flex items-center justify-between p-3 rounded-[5px] border ${innerBorder} ${innerBg} transition cursor-pointer ${
              isLight ? 'hover:bg-[#EAEAEB]' : 'hover:bg-gray-100'
            }`}>
              <div className="space-y-0.5">
                <strong className={`text-[12.5px] block ${textTitle}`}>
                  VLSFO Bunker Adjustment Surcharge Monitor
                </strong>
                <span className={`text-[11.5px] ${textMuted}`}>
                  Notify when bunker fuel prices shift beyond +/- 5%.
                </span>
              </div>
              <input
                type="checkbox"
                checked={bunkerIndexAlerts}
                onChange={(e) => setBunkerIndexAlerts(e.target.checked)}
                className={`w-4 h-4 cursor-pointer ${isLight ? 'accent-[#18181B]' : 'accent-black'}`}
              />
            </label>

            <label className={`flex items-center justify-between p-3 rounded-[5px] border ${innerBorder} ${innerBg} transition cursor-pointer ${
              isLight ? 'hover:bg-[#EAEAEB]' : 'hover:bg-gray-100'
            }`}>
              <div className="space-y-0.5">
                <strong className={`text-[12.5px] block ${textTitle}`}>
                  Monsoon Wave Height Warnings
                </strong>
                <span className={`text-[11.5px] ${textMuted}`}>
                  Flag Sagar anchorage & riverine lighterage disruptions during high swell periods.
                </span>
              </div>
              <input
                type="checkbox"
                checked={monsoonAlerts}
                onChange={(e) => setMonsoonAlerts(e.target.checked)}
                className={`w-4 h-4 cursor-pointer ${isLight ? 'accent-[#18181B]' : 'accent-black'}`}
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            id="btn-save-settings"
            className={`px-5 py-2 rounded-[5px] text-white text-[12.5px] font-medium transition flex items-center gap-1.5 cursor-pointer uppercase tracking-wider ${
              isLight
                ? 'bg-[#18181B] hover:bg-[#27272A]'
                : 'bg-black hover:bg-[#262626]'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
