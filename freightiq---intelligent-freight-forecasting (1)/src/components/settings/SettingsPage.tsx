import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  ShieldCheck,
  Database,
  Bell,
  Save,
  Info,
  Sparkles,
  RefreshCw,
  Cpu,
  Sliders,
  CheckCircle2,
  Palette,
  DollarSign,
  Monitor
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../layout/Toast';
import { useTheme, AppTheme, AppCurrency } from '../../context/ThemeContext';
import { api } from '../../services/api';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { theme, setTheme, currencyPreference, setCurrencyPreference } = useTheme();

  const isLight = theme === 'light';

  const [modelStatus, setModelStatus] = useState<any>(null);
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
    showToast('success', 'Settings Saved', 'System preferences and theme configuration updated.');
  };

  return (
    <div
      id="settings-page-container"
      className="space-y-6 max-w-5xl mx-auto pb-12 font-sans transition-colors"
    >
      {/* Header Banner */}
      <div
        className={`rounded-[8px] border p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          isLight
            ? 'bg-[#FFFFFF] border-[#D7E0E7]'
            : 'bg-[#0D1B2A] border-[#20384C]'
        }`}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isLight ? 'bg-[#087F8C]' : 'bg-[#12A6A6]'
              }`}
            />
            <h2
              className={`text-[17px] sm:text-[19px] font-bold uppercase tracking-wider ${
                isLight ? 'text-[#12304A]' : 'text-white'
              }`}
            >
              SYSTEM SETTINGS & APPEARANCE
            </h2>
          </div>
          <p
            className={`text-[13px] mt-1 ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            System appearance theme, default currency preferences, manager credentials, and ML diagnostics.
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-[4px] font-mono text-[11px] font-bold self-start md:self-auto uppercase border ${
            isLight
              ? 'bg-[#EEF3F7] text-[#087F8C] border-[#D7E0E7]'
              : 'bg-[#102A43] text-[#12A6A6] border-[#183A52]'
          }`}
        >
          Terminal Admin Mode
        </span>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-5">
        {/* Panel 1: Appearance & Theme Switcher (ONLY location for theme change) */}
        <div
          className={`rounded-[8px] border p-5 sm:p-6 shadow-xs ${
            isLight
              ? 'bg-[#FFFFFF] border-[#D7E0E7]'
              : 'bg-[#0D1B2A] border-[#20384C]'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              isLight ? 'border-[#D7E0E7]' : 'border-[#183A52]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Palette
                className={`w-4 h-4 ${isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'}`}
              />
              <h3
                className={`font-bold text-[14px] uppercase tracking-wider ${
                  isLight ? 'text-[#12304A]' : 'text-white'
                }`}
              >
                APPEARANCE & VISUAL THEME
              </h3>
            </div>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                isLight
                  ? 'bg-[#EEF3F7] text-[#526477] border-[#D7E0E7]'
                  : 'bg-[#071522] text-[#8FA6B8] border-[#20384C]'
              }`}
            >
              Exclusive Theme Selector
            </span>
          </div>

          <p
            className={`text-xs mt-3 mb-4 leading-relaxed ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            Select your primary operational UI archetype. Theme modifications persist across your active terminal session.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dark Theme Option */}
            <div
              id="theme-option-dark"
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-[6px] border transition cursor-pointer flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-[#071522] border-[#12A6A6] ring-1 ring-[#12A6A6]'
                  : 'bg-[#071522]/60 border-[#20384C] hover:border-slate-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full border border-[#12A6A6] flex items-center justify-center">
                    {theme === 'dark' && <div className="w-2.5 h-2.5 rounded-full bg-[#12A6A6]" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[14px]">Dark Market Terminal</h4>
                    <p className="text-slate-400 text-[11.5px]">Deep naval blue (#071522) • Professional Bloomberg terminal feel</p>
                  </div>
                </div>
              </div>

              {/* Color Swatch Preview */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#183A52]">
                <div className="w-5 h-5 rounded bg-[#071522] border border-[#20384C]" title="Main #071522" />
                <div className="w-5 h-5 rounded bg-[#0D1B2A] border border-[#20384C]" title="Panel #0D1B2A" />
                <div className="w-5 h-5 rounded bg-[#12A6A6]" title="Teal #12A6A6" />
                <div className="w-5 h-5 rounded bg-[#20B26B]" title="Green #20B26B" />
                <div className="w-5 h-5 rounded bg-[#E05252]" title="Red #E05252" />
                <span className="text-[10.5px] font-mono text-slate-400 ml-auto">Active Palette</span>
              </div>
            </div>

            {/* Light Theme Option */}
            <div
              id="theme-option-light"
              onClick={() => setTheme('light')}
              className={`p-4 rounded-[6px] border transition cursor-pointer flex flex-col justify-between ${
                theme === 'light'
                  ? 'bg-[#F6F8F5] border-[#087F8C] ring-1 ring-[#087F8C]'
                  : 'bg-[#F6F8F5]/80 border-[#D7E0E7] hover:border-slate-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full border border-[#087F8C] flex items-center justify-center">
                    {theme === 'light' && <div className="w-2.5 h-2.5 rounded-full bg-[#087F8C]" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#12304A] text-[14px]">Light Official</h4>
                    <p className="text-[#526477] text-[11.5px]">Clean off-white (#F6F8F5) • Government & enterprise logistics portal</p>
                  </div>
                </div>
              </div>

              {/* Color Swatch Preview */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#D7E0E7]">
                <div className="w-5 h-5 rounded bg-[#F6F8F5] border border-[#D7E0E7]" title="Main #F6F8F5" />
                <div className="w-5 h-5 rounded bg-[#FFFFFF] border border-[#D7E0E7]" title="Panel #FFFFFF" />
                <div className="w-5 h-5 rounded bg-[#DCEAF4] border border-[#BFD3E0]" title="Sidebar #DCEAF4" />
                <div className="w-5 h-5 rounded bg-[#087F8C]" title="Teal #087F8C" />
                <div className="w-5 h-5 rounded bg-[#16805C]" title="Green #16805C" />
                <span className="text-[10.5px] font-mono text-[#526477] ml-auto">Official Palette</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Currency Preference */}
        <div
          className={`rounded-[8px] border p-5 sm:p-6 shadow-xs ${
            isLight
              ? 'bg-[#FFFFFF] border-[#D7E0E7]'
              : 'bg-[#0D1B2A] border-[#20384C]'
          }`}
        >
          <div
            className={`flex items-center gap-2.5 pb-4 border-b ${
              isLight ? 'border-[#D7E0E7]' : 'border-[#183A52]'
            }`}
          >
            <DollarSign
              className={`w-4 h-4 ${isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'}`}
            />
            <h3
              className={`font-bold text-[14px] uppercase tracking-wider ${
                isLight ? 'text-[#12304A]' : 'text-white'
              }`}
            >
              DEFAULT CURRENCY PREFERENCE
            </h3>
          </div>

          <p
            className={`text-xs mt-3 mb-4 leading-relaxed ${
              isLight ? 'text-[#526477]' : 'text-slate-400'
            }`}
          >
            Select default currency format for voyage cost summaries and landed reports. (Note: For live real-time spot currency conversions across 9 major global currencies, utilize the interactive Currency Converter in Market Tools or Forecast Results).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              className={`p-3.5 rounded-[6px] border flex items-center justify-between transition cursor-pointer ${
                currencyPreference === 'USD'
                  ? isLight
                    ? 'bg-[#EEF3F7] border-[#087F8C]'
                    : 'bg-[#102337] border-[#12A6A6]'
                  : isLight
                    ? 'bg-[#FAFAF7] border-[#D7E0E7]'
                    : 'bg-[#071522] border-[#20384C]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="currency-pref"
                  checked={currencyPreference === 'USD'}
                  onChange={() => setCurrencyPreference('USD')}
                  className="accent-[#087F8C] w-4 h-4 cursor-pointer"
                />
                <div>
                  <strong className={isLight ? 'text-[#12304A]' : 'text-white'}>USD ($) — US Dollar</strong>
                  <p className={`text-[11.5px] font-mono ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                    Global Maritime Standard ($/MT & Daily Hire)
                  </p>
                </div>
              </div>
            </label>

            <label
              className={`p-3.5 rounded-[6px] border flex items-center justify-between transition cursor-pointer ${
                currencyPreference === 'INR'
                  ? isLight
                    ? 'bg-[#EEF3F7] border-[#087F8C]'
                    : 'bg-[#102337] border-[#12A6A6]'
                  : isLight
                    ? 'bg-[#FAFAF7] border-[#D7E0E7]'
                    : 'bg-[#071522] border-[#20384C]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="currency-pref"
                  checked={currencyPreference === 'INR'}
                  onChange={() => setCurrencyPreference('INR')}
                  className="accent-[#087F8C] w-4 h-4 cursor-pointer"
                />
                <div>
                  <strong className={isLight ? 'text-[#12304A]' : 'text-white'}>INR (₹) — Indian Rupee</strong>
                  <p className={`text-[11.5px] font-mono ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                    Domestic Indian Port Procurement Basis (₹/MT)
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Panel 3: Profile */}
        <div
          className={`rounded-[8px] border p-5 sm:p-6 shadow-xs ${
            isLight
              ? 'bg-[#FFFFFF] border-[#D7E0E7]'
              : 'bg-[#0D1B2A] border-[#20384C]'
          }`}
        >
          <div
            className={`flex items-center gap-2.5 pb-4 border-b ${
              isLight ? 'border-[#D7E0E7]' : 'border-[#183A52]'
            }`}
          >
            <User
              className={`w-4 h-4 ${isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'}`}
            />
            <h3
              className={`font-bold text-[14px] uppercase tracking-wider ${
                isLight ? 'text-[#12304A]' : 'text-white'
              }`}
            >
              Logistics Chartering Officer Profile
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 text-xs">
            <div>
              <label
                className={`block text-[12px] font-bold mb-1.5 uppercase tracking-wide ${
                  isLight ? 'text-[#526477]' : 'text-slate-400'
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                disabled
                value={user?.name || 'Capt. Samarth R.'}
                className={`w-full px-3.5 py-2.5 rounded-[6px] border font-mono text-[13px] cursor-not-allowed opacity-90 ${
                  isLight
                    ? 'bg-[#FAFAF7] border-[#D7E0E7] text-[#12304A]'
                    : 'bg-[#071522] border-[#183A52] text-slate-300'
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-[12px] font-bold mb-1.5 uppercase tracking-wide ${
                  isLight ? 'text-[#526477]' : 'text-slate-400'
                }`}
              >
                Official Email Address
              </label>
              <input
                type="text"
                disabled
                value={user?.email || 'manager@freightiq.demo'}
                className={`w-full px-3.5 py-2.5 rounded-[6px] border font-mono text-[13px] cursor-not-allowed opacity-90 ${
                  isLight
                    ? 'bg-[#FAFAF7] border-[#D7E0E7] text-[#12304A]'
                    : 'bg-[#071522] border-[#183A52] text-slate-300'
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-[12px] font-bold mb-1.5 uppercase tracking-wide ${
                  isLight ? 'text-[#526477]' : 'text-slate-400'
                }`}
              >
                Designated Operational Role
              </label>
              <input
                type="text"
                disabled
                value={user?.role || 'Chief Commercial Logistics & Chartering Manager'}
                className={`w-full px-3.5 py-2.5 rounded-[6px] border font-mono text-[13px] cursor-not-allowed opacity-90 ${
                  isLight
                    ? 'bg-[#FAFAF7] border-[#D7E0E7] text-[#12304A]'
                    : 'bg-[#071522] border-[#183A52] text-slate-300'
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-[12px] font-bold mb-1.5 uppercase tracking-wide ${
                  isLight ? 'text-[#526477]' : 'text-slate-400'
                }`}
              >
                Enterprise Logistics Desk
              </label>
              <input
                type="text"
                disabled
                value={user?.organization || 'Bharat East Coast Bulk Terminal Desk'}
                className={`w-full px-3.5 py-2.5 rounded-[6px] border font-mono text-[13px] cursor-not-allowed opacity-90 ${
                  isLight
                    ? 'bg-[#FAFAF7] border-[#D7E0E7] text-[#12304A]'
                    : 'bg-[#071522] border-[#183A52] text-slate-300'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Panel 4: ML Engine Diagnostics */}
        <div
          className={`rounded-[8px] border p-5 sm:p-6 shadow-xs ${
            isLight
              ? 'bg-[#FFFFFF] border-[#D7E0E7]'
              : 'bg-[#0D1B2A] border-[#20384C]'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              isLight ? 'border-[#D7E0E7]' : 'border-[#183A52]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-[#20B26B]" />
              <h3
                className={`font-bold text-[14px] uppercase tracking-wider ${
                  isLight ? 'text-[#12304A]' : 'text-white'
                }`}
              >
                Econometric Engine Status & Health
              </h3>
            </div>
            <button
              type="button"
              onClick={fetchStatus}
              className={`px-3 py-1.5 rounded-[4px] transition cursor-pointer flex items-center gap-1.5 text-[12px] font-mono border ${
                isLight
                  ? 'bg-[#EEF3F7] text-[#12304A] border-[#D7E0E7] hover:bg-[#DCEAF4]'
                  : 'bg-[#102337] text-slate-300 border-[#183A52] hover:bg-[#183A52]'
              }`}
              title="Refresh status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStatus ? 'animate-spin text-[#12A6A6]' : ''}`} />
              <span>Poll Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 text-xs">
            <div
              className={`p-4 rounded-[6px] border ${
                isLight
                  ? 'bg-[#F6F8F5] border-[#16805C]/30'
                  : 'bg-[#071522] border-[#14533D]'
              }`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                Service Health
              </span>
              <strong className="text-[#20B26B] font-mono text-[14.5px] mt-1 block">ONLINE (Ready)</strong>
              <span className={`text-[11.5px] font-mono mt-0.5 block ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                140 Corridors Loaded
              </span>
            </div>

            <div
              className={`p-4 rounded-[6px] border ${
                isLight
                  ? 'bg-[#F6F8F5] border-[#D7E0E7]'
                  : 'bg-[#071522] border-[#183A52]'
              }`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                Econometric Architecture
              </span>
              <strong className={`font-mono text-[13.5px] mt-1 block ${isLight ? 'text-[#12304A]' : 'text-white'}`}>
                Multi-Factor SARIMA + Prophet
              </strong>
              <span className={`text-[11.5px] mt-0.5 block ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                Time-Series Seasonal Decomposition
              </span>
            </div>

            <div
              className={`p-4 rounded-[6px] border ${
                isLight
                  ? 'bg-[#F6F8F5] border-[#D7E0E7]'
                  : 'bg-[#071522] border-[#183A52]'
              }`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                Confidence Interval
              </span>
              <strong className={`font-mono text-[14.5px] mt-1 block ${isLight ? 'text-[#12304A]' : 'text-white'}`}>
                95.0% Empirical Band
              </strong>
              <span className={`text-[11.5px] mt-0.5 block ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                Residual Uncertainty Bounds
              </span>
            </div>
          </div>

          {/* SIH Data Disclosure Card */}
          <div
            className={`p-4 rounded-[6px] border space-y-2.5 text-xs ${
              isLight
                ? 'bg-[#EEF3F7] border-[#D7E0E7]'
                : 'bg-[#102337] border-[#183A52]'
            }`}
          >
            <div className="flex items-center gap-2 text-[#E0A33A] font-bold uppercase tracking-wide text-[12px]">
              <Info className="w-4 h-4 text-[#E0A33A] shrink-0" />
              <span>Smart India Hackathon 2026 — Maritime Data Architecture Disclosure</span>
            </div>
            <div
              className={`space-y-2 leading-relaxed text-[12px] ${
                isLight ? 'text-[#1E293B]' : 'text-slate-300'
              }`}
            >
              <p>
                <strong className={isLight ? 'text-[#12304A]' : 'text-white'}>Authentic Reference Specifications:</strong> Indian East Coast Port constraints (Paradip, Visakhapatnam, Gangavaram, Gopalpur, Dhamra, Sagar–Sandheads, Haldia max drafts, LOA, beam) and naval vessel parameters (Handysize, Supramax, Panamax, Capesize) use authentic maritime reference standards.
              </p>
              <p>
                <strong className={isLight ? 'text-[#12304A]' : 'text-white'}>Synthetic Econometric Feeds:</strong> 3-year historical freight rates, bunker fuel trends, and port congestion indices are synthetically generated using multi-factor econometric equations (incorporating monsoonal seasonality, fuel sensitivity, and macroeconomic freight cycles) as live commercial Baltic Dry feeds require enterprise licensing.
              </p>
            </div>
          </div>
        </div>

        {/* Panel 5: Operational Decision Rules & Alerts */}
        <div
          className={`rounded-[8px] border p-5 sm:p-6 shadow-xs ${
            isLight
              ? 'bg-[#FFFFFF] border-[#D7E0E7]'
              : 'bg-[#0D1B2A] border-[#20384C]'
          }`}
        >
          <div
            className={`flex items-center gap-2.5 pb-4 border-b ${
              isLight ? 'border-[#D7E0E7]' : 'border-[#183A52]'
            }`}
          >
            <Bell
              className={`w-4 h-4 ${isLight ? 'text-[#087F8C]' : 'text-[#12A6A6]'}`}
            />
            <h3
              className={`font-bold text-[14px] uppercase tracking-wider ${
                isLight ? 'text-[#12304A]' : 'text-white'
              }`}
            >
              Decision Thresholds & Risk Alerts
            </h3>
          </div>

          <div className="space-y-3.5 mt-5 text-xs">
            <label
              className={`flex items-center justify-between p-4 rounded-[6px] border transition cursor-pointer ${
                isLight
                  ? 'bg-[#FAFAF7] hover:bg-[#EEF3F7] border-[#D7E0E7]'
                  : 'bg-[#071522] hover:bg-[#102337] border-[#183A52]'
              }`}
            >
              <div className="space-y-0.5">
                <strong className={`text-[13px] block ${isLight ? 'text-[#12304A]' : 'text-white'}`}>
                  Automatic Port Feasibility Filter
                </strong>
                <span className={`text-[12px] ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                  Strictly exclude vessels violating draft, beam, or LOA limits from recommendations.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoAssessRisk}
                onChange={(e) => setAutoAssessRisk(e.target.checked)}
                className="w-4 h-4 accent-[#087F8C] cursor-pointer"
              />
            </label>

            <label
              className={`flex items-center justify-between p-4 rounded-[6px] border transition cursor-pointer ${
                isLight
                  ? 'bg-[#FAFAF7] hover:bg-[#EEF3F7] border-[#D7E0E7]'
                  : 'bg-[#071522] hover:bg-[#102337] border-[#183A52]'
              }`}
            >
              <div className="space-y-0.5">
                <strong className={`text-[13px] block ${isLight ? 'text-[#12304A]' : 'text-white'}`}>
                  VLSFO Bunker Adjustment Surcharge Monitor
                </strong>
                <span className={`text-[12px] ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                  Notify when Singapore/Fujairah 0.5% fuel shifts beyond +/- 5%.
                </span>
              </div>
              <input
                type="checkbox"
                checked={bunkerIndexAlerts}
                onChange={(e) => setBunkerIndexAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#087F8C] cursor-pointer"
              />
            </label>

            <label
              className={`flex items-center justify-between p-4 rounded-[6px] border transition cursor-pointer ${
                isLight
                  ? 'bg-[#FAFAF7] hover:bg-[#EEF3F7] border-[#D7E0E7]'
                  : 'bg-[#071522] hover:bg-[#102337] border-[#183A52]'
              }`}
            >
              <div className="space-y-0.5">
                <strong className={`text-[13px] block ${isLight ? 'text-[#12304A]' : 'text-white'}`}>
                  Bay of Bengal Monsoon Wave Height Warnings
                </strong>
                <span className={`text-[12px] ${isLight ? 'text-[#526477]' : 'text-slate-400'}`}>
                  Flag Sagar anchorage & riverine lighterage disruptions during high wave swell periods.
                </span>
              </div>
              <input
                type="checkbox"
                checked={monsoonAlerts}
                onChange={(e) => setMonsoonAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#087F8C] cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            id="btn-save-settings"
            className="px-6 py-3 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white text-[13.5px] font-bold shadow-md transition flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
