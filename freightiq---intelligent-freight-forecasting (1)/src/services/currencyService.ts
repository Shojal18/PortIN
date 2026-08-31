export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '🇦🇪' },
  SGD: { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
};

// Benchmark base indicative exchange rates (1 USD = X Currency)
export const BASE_INDICATIVE_RATES: Record<string, number> = {
  USD: 1.0000,
  INR: 86.8500,
  EUR: 0.9240,
  GBP: 0.7890,
  AED: 3.6725,
  SGD: 1.3450,
  AUD: 1.5420,
  CAD: 1.3850,
  JPY: 153.4000,
};

export interface ExchangeRateResult {
  rates: Record<string, number>;
  base: string;
  timestamp: string;
  isLive: boolean;
  status: 'loading' | 'success' | 'stale' | 'error';
  errorMessage?: string;
}

let cachedRates: Record<string, number> = { ...BASE_INDICATIVE_RATES };
let lastFetchedTime: string = new Date().toISOString();
let isCachedLive: boolean = false;

export const currencyService = {
  /**
   * Fetches current exchange rates from public API with graceful fallback to cached/indicative rates
   */
  async getExchangeRates(): Promise<ExchangeRateResult> {
    try {
      // Attempt to fetch from free open exchange rate API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('https://open.er-api.com/v6/latest/USD', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.rates) {
          cachedRates = {
            ...BASE_INDICATIVE_RATES,
            ...data.rates
          };
          lastFetchedTime = new Date().toISOString();
          isCachedLive = true;
          return {
            rates: cachedRates,
            base: 'USD',
            timestamp: lastFetchedTime,
            isLive: true,
            status: 'success'
          };
        }
      }
      throw new Error('API returned invalid payload');
    } catch (e: any) {
      // Graceful fallback to indicative reference rates
      return {
        rates: cachedRates,
        base: 'USD',
        timestamp: lastFetchedTime,
        isLive: isCachedLive,
        status: isCachedLive ? 'stale' : 'success',
        errorMessage: 'Indicative / Demo Rate'
      };
    }
  },

  /**
   * Synchronous conversion using cached rates
   */
  convert(amount: number, fromCurrency: string, toCurrency: string, customRates?: Record<string, number>): number {
    const rates = customRates || cachedRates;
    const fromRate = rates[fromCurrency] || BASE_INDICATIVE_RATES[fromCurrency] || 1;
    const toRate = rates[toCurrency] || BASE_INDICATIVE_RATES[toCurrency] || 1;

    // Convert from source currency to USD, then from USD to target currency
    const amountInUsd = amount / fromRate;
    const result = amountInUsd * toRate;
    return result;
  },

  /**
   * Get single cross rate (e.g. 1 USD = X INR or 1 EUR = X INR)
   */
  getCrossRate(fromCurrency: string, toCurrency: string, customRates?: Record<string, number>): number {
    const rates = customRates || cachedRates;
    const fromRate = rates[fromCurrency] || BASE_INDICATIVE_RATES[fromCurrency] || 1;
    const toRate = rates[toCurrency] || BASE_INDICATIVE_RATES[toCurrency] || 1;
    return toRate / fromRate;
  },

  /**
   * Format currency values with clean financial conventions and symbols
   */
  format(amount: number, currencyCode: string, options?: { showCode?: boolean; decimals?: number }): string {
    const info = SUPPORTED_CURRENCIES[currencyCode] || { symbol: currencyCode, code: currencyCode };
    const decimals = options?.decimals !== undefined ? options.decimals : (currencyCode === 'JPY' ? 0 : 2);
    
    const formattedNum = amount.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

    if (options?.showCode) {
      return `${info.symbol}${formattedNum} ${currencyCode}`;
    }
    return `${info.symbol}${formattedNum}`;
  }
};
