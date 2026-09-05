import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'dark' | 'light';
export type AppCurrency = 'USD' | 'INR';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  currencyPreference: AppCurrency;
  setCurrencyPreference: (currency: AppCurrency) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('freightiq_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [currencyPreference, setCurrencyPreferenceState] = useState<AppCurrency>(() => {
    const saved = localStorage.getItem('freightiq_currency');
    return (saved === 'INR' || saved === 'USD') ? saved : 'USD';
  });

  useEffect(() => {
    localStorage.setItem('freightiq_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('freightiq_currency', currencyPreference);
  }, [currencyPreference]);

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setCurrencyPreference = (currency: AppCurrency) => {
    setCurrencyPreferenceState(currency);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        currencyPreference,
        setCurrencyPreference,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
