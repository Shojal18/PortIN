import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'dark' | 'light';
export type AppCurrency = 'USD' | 'INR';

export type PortINGradientPreset =
  | 'portin-primary'
  | 'portin-dark'
  | 'portin-soft'
  | 'portin-neutral'
  | 'portin-full';

export interface GradientPresetConfig {
  id: PortINGradientPreset;
  name: string;
  description: string;
  stops: string[];
  gradientCss: string;
  primary: string;
  secondary: string;
}

export const PORTIN_GRADIENT_PRESETS: GradientPresetConfig[] = [
  {
    id: 'portin-primary',
    name: 'PortIN Quad-Tone (Default)',
    description: 'Complete 4-color blend: #52796A → #BAC5AC → #212528 → #E5E5E5',
    stops: ['#52796A', '#BAC5AC', '#212528', '#E5E5E5'],
    gradientCss: 'linear-gradient(135deg, #52796A 0%, #BAC5AC 35%, #212528 70%, #E5E5E5 100%)',
    primary: '#52796A',
    secondary: '#BAC5AC',
  },
  {
    id: 'portin-soft',
    name: 'PortIN Horizontal Accent',
    description: 'Horizontal 4-color flow for compact bars and selection badges',
    stops: ['#52796A', '#BAC5AC', '#212528', '#E5E5E5'],
    gradientCss: 'linear-gradient(90deg, #52796A 0%, #BAC5AC 35%, #212528 70%, #E5E5E5 100%)',
    primary: '#52796A',
    secondary: '#BAC5AC',
  },
  {
    id: 'portin-dark',
    name: 'PortIN Dark Marine',
    description: 'Deep maritime contrast: #52796A → #BAC5AC → #212528 → #E5E5E5',
    stops: ['#52796A', '#BAC5AC', '#212528', '#E5E5E5'],
    gradientCss: 'linear-gradient(135deg, #52796A 0%, #BAC5AC 35%, #212528 70%, #E5E5E5 100%)',
    primary: '#52796A',
    secondary: '#212528',
  },
  {
    id: 'portin-neutral',
    name: 'PortIN Soft Sage',
    description: 'Soft sage and neutral highlight: #52796A → #BAC5AC → #212528 → #E5E5E5',
    stops: ['#52796A', '#BAC5AC', '#212528', '#E5E5E5'],
    gradientCss: 'linear-gradient(135deg, #52796A 0%, #BAC5AC 35%, #212528 70%, #E5E5E5 100%)',
    primary: '#52796A',
    secondary: '#E5E5E5',
  },
  {
    id: 'portin-full',
    name: 'PortIN Full Precision',
    description: 'Full 4-tone palette balanced linear gradient',
    stops: ['#52796A', '#BAC5AC', '#212528', '#E5E5E5'],
    gradientCss: 'linear-gradient(135deg, #52796A 0%, #BAC5AC 35%, #212528 70%, #E5E5E5 100%)',
    primary: '#52796A',
    secondary: '#BAC5AC',
  },
];

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  currencyPreference: AppCurrency;
  setCurrencyPreference: (currency: AppCurrency) => void;
  toggleTheme: () => void;
  gradientPreset: PortINGradientPreset;
  setGradientPreset: (preset: PortINGradientPreset) => void;
  activeGradientConfig: GradientPresetConfig;
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

  const [gradientPreset, setGradientPresetState] = useState<PortINGradientPreset>(() => {
    const saved = localStorage.getItem('portin_active_gradient');
    const valid = PORTIN_GRADIENT_PRESETS.some(p => p.id === saved);
    return valid ? (saved as PortINGradientPreset) : 'portin-primary';
  });

  const activeGradientConfig =
    PORTIN_GRADIENT_PRESETS.find(p => p.id === gradientPreset) || PORTIN_GRADIENT_PRESETS[0];

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

  useEffect(() => {
    localStorage.setItem('portin_active_gradient', gradientPreset);
    const root = document.documentElement;
    root.setAttribute('data-gradient', gradientPreset);
    root.style.setProperty('--portin-primary', activeGradientConfig.primary);
    root.style.setProperty('--portin-secondary', activeGradientConfig.secondary);
    root.style.setProperty('--portin-dark', '#212528');
    root.style.setProperty('--portin-surface', '#E5E5E5');
    root.style.setProperty('--portin-border', '#DFDFDF');
    root.style.setProperty('--portin-gradient', activeGradientConfig.gradientCss);
  }, [gradientPreset, activeGradientConfig]);

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setCurrencyPreference = (currency: AppCurrency) => {
    setCurrencyPreferenceState(currency);
  };

  const setGradientPreset = (preset: PortINGradientPreset) => {
    setGradientPresetState(preset);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        currencyPreference,
        setCurrencyPreference,
        toggleTheme,
        gradientPreset,
        setGradientPreset,
        activeGradientConfig,
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

