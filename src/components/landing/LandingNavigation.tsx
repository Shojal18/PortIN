import React, { useState, useEffect } from 'react';
import {
  Anchor,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Layers,
  Ship,
  TrendingUp,
  Cpu,
  Building,
  Zap,
  Globe2,
  FileSpreadsheet,
  Code2
} from 'lucide-react';

interface LandingNavigationProps {
  onEnterApp: () => void;
  onOpenLogin: () => void;
  onOpenDemo: () => void;
}

export const LandingNavigation: React.FC<LandingNavigationProps> = ({
  onEnterApp,
  onOpenLogin,
  onOpenDemo
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="landing-navbar"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071522]/95 backdrop-blur-md border-b border-[#20384C] shadow-xl'
          : 'bg-[#071522]/85 backdrop-blur-xs border-b border-[#20384C]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: PortIN Brand */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-[8px] bg-[#0D1B2A] border border-[#E05252] text-[#E05252] flex items-center justify-center transition-all group-hover:scale-105 shadow-md">
              <Anchor className="w-5 h-5 text-[#E05252]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[22px] text-white tracking-tight font-sans">
                  port<span className="text-[#E05252]">in</span>
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#102337] text-[#12A6A6] border border-[#20384C]">
                  MARITIME
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links with Dropdowns (Kpler Style) */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-[#9BAFBE]">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-white py-2 transition-colors cursor-pointer">
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-0 w-80 p-3 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] shadow-2xl space-y-1 animate-fade-in">
                  <a
                    href="#solutions"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-[6px] hover:bg-[#071522] flex items-start gap-2.5 transition"
                  >
                    <Layers className="w-4 h-4 text-[#E05252] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white block">Fundamental Intelligence</strong>
                      <span className="text-[11px] text-[#9BAFBE]">Cargo flows, draft telemetry & ports</span>
                    </div>
                  </a>
                  <a
                    href="#forecasting"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-[6px] hover:bg-[#071522] flex items-start gap-2.5 transition"
                  >
                    <TrendingUp className="w-4 h-4 text-[#12A6A6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white block">Derived Insights</strong>
                      <span className="text-[11px] text-[#9BAFBE]">SARIMA rate forecast & optimal windows</span>
                    </div>
                  </a>
                  <a
                    href="#voyage-analytics"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-[6px] hover:bg-[#071522] flex items-start gap-2.5 transition"
                  >
                    <Ship className="w-4 h-4 text-[#20B26B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white block">Decision Tools</strong>
                      <span className="text-[11px] text-[#9BAFBE]">Voyage calculator & port draft validator</span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('industries')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-white py-2 transition-colors cursor-pointer">
                <span>Industries</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'industries' && (
                <div className="absolute top-full left-0 w-72 p-3 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] shadow-2xl space-y-1 animate-fade-in">
                  <a
                    href="#industries"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2 rounded-[6px] hover:bg-[#071522] block text-xs text-white"
                  >
                    Steel & Metal Producers
                  </a>
                  <a
                    href="#industries"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2 rounded-[6px] hover:bg-[#071522] block text-xs text-white"
                  >
                    Power Utilities & Gencos
                  </a>
                  <a
                    href="#industries"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2 rounded-[6px] hover:bg-[#071522] block text-xs text-white"
                  >
                    Dry Bulk Charterers & Traders
                  </a>
                  <a
                    href="#industries"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2 rounded-[6px] hover:bg-[#071522] block text-xs text-white"
                  >
                    Port Authorities & Terminals
                  </a>
                </div>
              )}
            </div>

            <a href="#backtest-analytics" className="hover:text-white transition-colors">
              Analytics
            </a>
            <a href="#port-intelligence" className="hover:text-white transition-colors">
              East Coast Ports
            </a>
            <a href="#integrations" className="hover:text-white transition-colors">
              Developers & MCP
            </a>
          </nav>
        </div>

        {/* Right Actions: Login & Red "Request a demo" (Kpler Style) */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenLogin}
            className="text-[13.5px] text-[#9BAFBE] hover:text-white font-medium px-3 py-1.5 transition-colors cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={onOpenDemo}
            className="px-5 py-2.5 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white text-[13px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#E05252]/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Request a demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenDemo}
            className="px-3 py-1.5 rounded bg-[#E05252] text-white text-xs font-bold uppercase"
          >
            Demo
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded bg-[#0D1B2A] border border-[#20384C] text-[#9BAFBE]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1B2A] border-b border-[#20384C] px-5 py-4 space-y-3 shadow-2xl">
          <a
            href="#solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#9BAFBE] hover:text-white py-1.5"
          >
            Solutions & Intelligence
          </a>
          <a
            href="#backtest-analytics"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#9BAFBE] hover:text-white py-1.5"
          >
            Backtested Models
          </a>
          <a
            href="#voyage-analytics"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#9BAFBE] hover:text-white py-1.5"
          >
            Voyage Calculator
          </a>
          <a
            href="#port-intelligence"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#9BAFBE] hover:text-white py-1.5"
          >
            7 East Coast Ports
          </a>
          <a
            href="#integrations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#9BAFBE] hover:text-white py-1.5"
          >
            API & MCP Integrations
          </a>

          <div className="pt-3 border-t border-[#20384C] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 rounded bg-[#071522] border border-[#20384C] text-sm text-white font-medium"
            >
              Login to Terminal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 rounded bg-[#E05252] text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
