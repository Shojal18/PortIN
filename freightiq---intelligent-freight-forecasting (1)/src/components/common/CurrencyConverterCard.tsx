import React, { useState, useEffect } from 'react';
import {
  ArrowUpDown,
  RefreshCw,
  Calculator,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import {
  SUPPORTED_CURRENCIES,
  currencyService,
  ExchangeRateResult
} from '../../services/currencyService';

interface CurrencyConverterCardProps {
  initialAmount?: number;
  initialFrom?: string;
  initialTo?: string;
  compact?: boolean;
  onConvertedValueChange?: (result: number, toCurrency: string) => void;
  title?: string;
}

export const CurrencyConverterCard: React.FC<CurrencyConverterCardProps> = ({
  initialAmount = 18.40,
  initialFrom = 'USD',
  initialTo = 'INR',
  compact = false,
  onConvertedValueChange,
  title = 'CURRENCY CONVERTER'
}) => {
  const [amount, setAmount] = useState<string>(initialAmount.toString());
  const [fromCurrency, setFromCurrency] = useState<string>(initialFrom);
  const [toCurrency, setToCurrency] = useState<string>(initialTo);
  const [rateResult, setRateResult] = useState<ExchangeRateResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync if initialAmount changes (e.g. from forecast result)
  useEffect(() => {
    if (initialAmount && !isNaN(initialAmount)) {
      setAmount(initialAmount.toString());
    }
  }, [initialAmount]);

  const loadRates = async () => {
    setIsLoading(true);
    try {
      const res = await currencyService.getExchangeRates();
      setRateResult(res);
    } catch (e) {
      console.warn('Currency rates load failed:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);

  const numAmount = parseFloat(amount) || 0;
  const rates = rateResult?.rates;
  const convertedValue = currencyService.convert(numAmount, fromCurrency, toCurrency, rates);
  const crossRate = currencyService.getCrossRate(fromCurrency, toCurrency, rates);

  useEffect(() => {
    if (onConvertedValueChange) {
      onConvertedValueChange(convertedValue, toCurrency);
    }
  }, [convertedValue, toCurrency, onConvertedValueChange]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const fromInfo = SUPPORTED_CURRENCIES[fromCurrency] || { symbol: fromCurrency, name: fromCurrency, flag: '🌐' };
  const toInfo = SUPPORTED_CURRENCIES[toCurrency] || { symbol: toCurrency, name: toCurrency, flag: '🌐' };

  return (
    <div
      id="currency-converter-widget"
      className={`rounded-[8px] border transition-colors shadow-sm ${
        compact
          ? 'p-4 bg-[#0D1B2A] dark:bg-[#0D1B2A] light:bg-[#FFFFFF] border-[#20384C] dark:border-[#20384C] light:border-[#D7E0E7]'
          : 'p-5 bg-[#0D1B2A] dark:bg-[#0D1B2A] light:bg-[#FFFFFF] border-[#20384C] dark:border-[#20384C] light:border-[#D7E0E7]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#20384C] dark:border-[#20384C] light:border-[#D7E0E7] mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[4px] bg-[#12A6A6]/20 dark:bg-[#12A6A6]/20 light:bg-[#087F8C]/10 text-[#12A6A6] dark:text-[#12A6A6] light:text-[#087F8C] flex items-center justify-center">
            <Calculator className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-bold text-[13px] sm:text-[14px] uppercase tracking-wider text-slate-100 dark:text-slate-100 light:text-[#12304A]">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10.5px] font-mono px-2 py-0.5 rounded-[4px] border ${
              rateResult?.isLive
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                : 'bg-[#102337] dark:bg-[#102337] light:bg-[#EEF3F7] text-[#8FA6B8] dark:text-[#8FA6B8] light:text-[#526477] border-[#20384C] dark:border-[#20384C] light:border-[#D7E0E7]'
            }`}
          >
            {rateResult?.isLive ? 'Live Exchange Rate' : 'Indicative / Demo Rate'}
          </span>
          <button
            type="button"
            onClick={loadRates}
            title="Refresh rates"
            className="p-1 rounded text-slate-400 hover:text-slate-200 dark:hover:text-white light:hover:text-[#12304A] transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#12A6A6]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Input Grid */}
      <div className="space-y-3.5">
        {/* Amount Field */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-[#526477] mb-1">
            Freight Amount / Value
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 font-mono text-[14px] text-slate-400 dark:text-slate-400 light:text-[#526477]">
              {fromInfo.symbol}
            </span>
            <input
              type="number"
              step="any"
              id="currency-amount-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="18.40"
              className="w-full pl-8 pr-3 py-2 rounded-[6px] font-mono text-[15px] font-semibold bg-[#071522] dark:bg-[#071522] light:bg-[#FAFAF7] text-white dark:text-white light:text-[#12304A] border border-[#20384C] dark:border-[#20384C] light:border-[#D7E0E7] focus:outline-hidden focus:border-[#12A6A6] transition"
            />
          </div>
        </div>

        {/* Currency From / Swap / To Selectors */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* From */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-[#526477] mb-1">
              From
            </label>
            <select
              id="currency-from-select"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-2.5 py-2 rounded-[6px] font-mono text-[13px] font-medium bg-[#071522] dark:bg-[#071522] light:bg-[#FAFAF7] text-white dark:text-white light:text-[#12304A] border border-[#20384C] dark:border-[#20384C] light:border-[#D7E0E7] focus:outline-hidden focus:border-[#12A6A6] cursor-pointer"
            >
              {Object.values(SUPPORTED_CURRENCIES).map((curr) => (
                <option key={curr.code} value={curr.code} className="bg-[#0D1B2A] text-white">
                  {curr.flag} {curr.code} — {curr.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="pt-5">
            <button
              type="button"
              id="btn-currency-swap"
              onClick={handleSwap}
              title="Swap currencies"
              className="p-2 rounded-[6px] bg-[#102337] dark:bg-[#102337] light:bg-[#EEF3F7] hover:bg-[#183A52] dark:hover:bg-[#183A52] light:hover:bg-[#DCEAF4] text-[#12A6A6] dark:text-[#12A6A6] light:text-[#087F8C] border border-[#20384C] dark:border-[#20384C] light:border-[#BFD3E0] transition cursor-pointer flex items-center justify-center"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* To */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-[#526477] mb-1">
              To
            </label>
            <select
              id="currency-to-select"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-2.5 py-2 rounded-[6px] font-mono text-[13px] font-medium bg-[#071522] dark:bg-[#071522] light:bg-[#FAFAF7] text-white dark:text-white light:text-[#12304A] border border-[#20384C] dark:border-[#20384C] light:border-[#D7E0E7] focus:outline-hidden focus:border-[#12A6A6] cursor-pointer"
            >
              {Object.values(SUPPORTED_CURRENCIES).map((curr) => (
                <option key={curr.code} value={curr.code} className="bg-[#0D1B2A] text-white">
                  {curr.flag} {curr.code} — {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Panel */}
        <div className="p-3.5 rounded-[6px] bg-[#071522] dark:bg-[#071522] light:bg-[#F6F8F5] border border-[#20384C] dark:border-[#20384C] light:border-[#D7E0E7] space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-[#526477]">
              Converted Value:
            </span>
            <span className="text-[11.5px] font-mono text-slate-400 dark:text-slate-400 light:text-[#526477]">
              {toCurrency} / MT equivalent
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-[24px] sm:text-[28px] font-bold font-mono text-[#12A6A6] dark:text-[#12A6A6] light:text-[#087F8C] tracking-tight leading-none">
              {toInfo.symbol}
              {convertedValue.toLocaleString('en-US', {
                minimumFractionDigits: toCurrency === 'JPY' ? 0 : 2,
                maximumFractionDigits: toCurrency === 'JPY' ? 0 : 2
              })}
            </span>
            <span className="text-[13px] font-mono font-semibold text-slate-300 dark:text-slate-300 light:text-[#12304A]">
              {toCurrency}
            </span>
          </div>

          {/* Rate Breakdown */}
          <div className="pt-2 border-t border-[#183A52]/60 dark:border-[#183A52]/60 light:border-[#D7E0E7] flex flex-wrap items-center justify-between text-[11.5px] font-mono text-slate-400 dark:text-slate-400 light:text-[#526477]">
            <div>
              Rate: 1 {fromCurrency} = <strong className="text-slate-200 dark:text-slate-200 light:text-[#12304A]">{toInfo.symbol}{crossRate.toFixed(4)}</strong> {toCurrency}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-500 light:text-[#7E91A4]">
              {fromInfo.symbol}{numAmount.toFixed(2)} {fromCurrency} ≈ {toInfo.symbol}{convertedValue.toFixed(2)} {toCurrency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
