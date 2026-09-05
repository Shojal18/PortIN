import React, { useState, useEffect } from 'react';
import { ArrowUpDown, RefreshCw, Calculator } from 'lucide-react';
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
      className={`bg-white border border-[#D0D0D0] rounded-[6px] font-sans ${
        compact ? 'p-4' : 'p-5'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#D0D0D0] mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[4px] bg-gray-100 text-gray-700 flex items-center justify-center border border-[#D0D0D0]">
            <Calculator className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-semibold text-[13px] uppercase tracking-wider text-gray-900">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-[4px] border border-[#D0D0D0] bg-[#F9FAFB] text-gray-600">
            {rateResult?.isLive ? 'Live Rates' : 'Indicative Rates'}
          </span>
          <button
            type="button"
            onClick={loadRates}
            title="Refresh rates"
            className="p-1 rounded-[4px] text-gray-500 hover:text-black hover:bg-gray-100 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-black' : ''}`} />
          </button>
        </div>
      </div>

      {/* Input Grid */}
      <div className="space-y-3">
        {/* Amount Field */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-gray-600 mb-1">
            Freight Amount / Value
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 font-mono text-[13.5px] text-gray-500">
              {fromInfo.symbol}
            </span>
            <input
              type="number"
              step="any"
              id="currency-amount-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="18.40"
              className="w-full pl-8 pr-3 py-1.5 rounded-[4px] font-mono text-[14px] font-medium bg-white text-gray-900 border border-[#D0D0D0] focus:outline-hidden focus:border-black transition"
            />
          </div>
        </div>

        {/* Currency From / Swap / To */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* From */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-gray-600 mb-1">
              From
            </label>
            <select
              id="currency-from-select"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-2 py-1.5 rounded-[4px] font-mono text-[12.5px] font-medium bg-white text-gray-900 border border-[#D0D0D0] focus:outline-hidden focus:border-black cursor-pointer"
            >
              {Object.values(SUPPORTED_CURRENCIES).map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} — {curr.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="pt-4">
            <button
              type="button"
              id="btn-currency-swap"
              onClick={handleSwap}
              title="Swap currencies"
              className="p-1.5 rounded-[4px] bg-white hover:bg-gray-100 text-gray-700 border border-[#D0D0D0] transition cursor-pointer flex items-center justify-center"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* To */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-gray-600 mb-1">
              To
            </label>
            <select
              id="currency-to-select"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-2 py-1.5 rounded-[4px] font-mono text-[12.5px] font-medium bg-white text-gray-900 border border-[#D0D0D0] focus:outline-hidden focus:border-black cursor-pointer"
            >
              {Object.values(SUPPORTED_CURRENCIES).map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} — {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Panel */}
        <div className="p-3 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0] space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-[10.5px] font-medium uppercase tracking-wider text-gray-500">
              Converted Value:
            </span>
            <span className="text-[11px] font-mono text-gray-500">
              {toCurrency} / MT equivalent
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-[22px] sm:text-[24px] font-bold font-mono text-[#2E7D32] tracking-tight leading-tight">
              {toInfo.symbol}
              {convertedValue.toLocaleString('en-US', {
                minimumFractionDigits: toCurrency === 'JPY' ? 0 : 2,
                maximumFractionDigits: toCurrency === 'JPY' ? 0 : 2
              })}
            </span>
            <span className="text-[12px] font-mono font-medium text-gray-700">
              {toCurrency}
            </span>
          </div>

          {/* Rate Breakdown */}
          <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-600">
            <div>
              Rate: 1 {fromCurrency} = <strong className="text-[#2E7D32]">{toInfo.symbol}{crossRate.toFixed(4)}</strong> {toCurrency}
            </div>
            <div className="text-[10.5px] text-gray-500">
              <span className="text-[#2E7D32]">{fromInfo.symbol}{numAmount.toFixed(2)}</span> {fromCurrency} ≈ <span className="text-[#2E7D32]">{toInfo.symbol}{convertedValue.toFixed(2)}</span> {toCurrency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
