import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  CreditCard,
  BarChart3,
  Zap,
  Shield,
  Layers,
  FileText,
  HelpCircle,
  BookOpen,
  Building2,
  Users,
  Briefcase
} from 'lucide-react';

interface LandingNavigationProps {
  onEnterApp?: () => void;
  onOpenLogin?: () => void;
}

export const LandingNavigation: React.FC<LandingNavigationProps> = ({
  onEnterApp,
  onOpenLogin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (menuName: string) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const handleAction = (action?: () => void) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (action) action();
  };

  return (
    <header
      id="landing-navbar"
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-8">
          <button
            id="nav-brand-logo"
            onClick={() => handleAction(onEnterApp)}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-base tracking-tight shadow-xs group-hover:bg-neutral-800 transition">
              <span className="font-mono text-emerald-400">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-[17px] tracking-tight leading-tight flex items-center gap-1.5">
                PortIN
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/60">
                  Fintech
                </span>
              </span>
              <span className="text-[11px] text-gray-400 font-medium leading-none">
                Financial Operations OS
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-[14px] font-medium text-gray-600">
            {/* Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('product')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-btn-product"
                onClick={() => handleDropdownToggle('product')}
                className={`px-3.5 py-2 rounded-md hover:text-gray-900 transition flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'product' ? 'text-gray-900 bg-gray-50' : ''
                }`}
              >
                Product
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'product' ? 'rotate-180 text-gray-900' : 'text-gray-400'}`} />
              </button>

              {activeDropdown === 'product' && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2.5 space-y-1">
                    <a
                      href="#product-overview"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Overview</div>
                        <div className="text-[12px] text-gray-500 font-normal">Unified liquidity & operations console</div>
                      </div>
                    </a>

                    <a
                      href="#feature-grid"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Payments & Settlement</div>
                        <div className="text-[12px] text-gray-500 font-normal">Cross-border freight & treasury wires</div>
                      </div>
                    </a>

                    <a
                      href="#analytics-section"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Analytics & P&L</div>
                        <div className="text-[12px] text-gray-500 font-normal">Real-time margin and cost attribution</div>
                      </div>
                    </a>

                    <a
                      href="#automation-section"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Automation Engine</div>
                        <div className="text-[12px] text-gray-500 font-normal">Zero-touch invoice & ledger matching</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-btn-solutions"
                onClick={() => handleDropdownToggle('solutions')}
                className={`px-3.5 py-2 rounded-md hover:text-gray-900 transition flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'solutions' ? 'text-gray-900 bg-gray-50' : ''
                }`}
              >
                Solutions
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180 text-gray-900' : 'text-gray-400'}`} />
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-0 w-76 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2.5 space-y-1">
                    <a
                      href="#feature-grid"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Trading & Chartering Houses</div>
                        <div className="text-[12px] text-gray-500 font-normal">High-volume dry bulk & freight desks</div>
                      </div>
                    </a>

                    <a
                      href="#forecast-section"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Corporate Finance Teams</div>
                        <div className="text-[12px] text-gray-500 font-normal">Automated treasury & multi-currency P&L</div>
                      </div>
                    </a>

                    <a
                      href="#security-section"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Global Enterprises</div>
                        <div className="text-[12px] text-gray-500 font-normal">Dual-quorum security & ERP sync</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-btn-resources"
                onClick={() => handleDropdownToggle('resources')}
                className={`px-3.5 py-2 rounded-md hover:text-gray-900 transition flex items-center gap-1 cursor-pointer ${
                  activeDropdown === 'resources' ? 'text-gray-900 bg-gray-50' : ''
                }`}
              >
                Resources
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180 text-gray-900' : 'text-gray-400'}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 w-72 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2.5 space-y-1">
                    <a
                      href="#faq-section"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Documentation & API</div>
                        <div className="text-[12px] text-gray-500 font-normal">REST endpoints & webhook specs</div>
                      </div>
                    </a>

                    <a
                      href="#faq-section"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Methodology & SARIMA Guides</div>
                        <div className="text-[12px] text-gray-500 font-normal">Quantitative forecasting algorithms</div>
                      </div>
                    </a>

                    <a
                      href="#faq-section"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="p-2 rounded-md bg-gray-50 text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">Help & Support</div>
                        <div className="text-[12px] text-gray-500 font-normal">24/7 dedicated finance desk support</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Pricing Link */}
            <a
              id="nav-link-pricing"
              href="#faq-section"
              className="px-3.5 py-2 rounded-md hover:text-gray-900 transition"
            >
              Pricing
            </a>
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-btn-login"
            onClick={() => handleAction(onOpenLogin)}
            className="px-4 py-2 text-[14px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition cursor-pointer"
          >
            Log in
          </button>
          <button
            id="nav-btn-cta-primary"
            onClick={() => handleAction(onEnterApp)}
            className="px-4.5 py-2 text-[14px] font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs hover:shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            Launch Platform
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="nav-btn-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <a
              href="#product-overview"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-lg hover:bg-gray-50"
            >
              Product Overview
            </a>
            <a
              href="#feature-grid"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-lg hover:bg-gray-50"
            >
              Features & Settlement
            </a>
            <a
              href="#analytics-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-lg hover:bg-gray-50"
            >
              Analytics Dashboard
            </a>
            <a
              href="#forecast-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-lg hover:bg-gray-50"
            >
              Cash Flow Forecasting
            </a>
            <a
              href="#transactions-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-lg hover:bg-gray-50"
            >
              Transaction Ledger
            </a>
            <a
              href="#security-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-lg hover:bg-gray-50"
            >
              Security & Compliance
            </a>
            <a
              href="#faq-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-800 rounded-lg hover:bg-gray-50"
            >
              FAQ & Pricing
            </a>
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
            <button
              onClick={() => handleAction(onOpenLogin)}
              className="w-full py-2.5 px-4 text-center font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
            >
              Log in
            </button>
            <button
              onClick={() => handleAction(onEnterApp)}
              className="w-full py-2.5 px-4 text-center font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition flex items-center justify-center gap-2"
            >
              Launch Platform
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
