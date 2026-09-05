import React from 'react';
import { Globe, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface LandingFooterProps {
  onEnterApp?: () => void;
  onOpenLogin?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onEnterApp,
  onOpenLogin
}) => {
  return (
    <footer id="landing-footer" className="bg-[#FAFAFA] border-t border-gray-200 text-left">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-gray-200">
          
          {/* Brand & Description Column (4 cols) */}
          <div className="col-span-2 md:col-span-6 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-sm tracking-tight">
                <span className="font-mono text-emerald-400">P</span>
              </div>
              <span className="font-bold text-gray-900 text-[18px] tracking-tight">
                PortIN
              </span>
            </div>

            <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal max-w-sm">
              The next-generation financial intelligence and dry bulk freight operations platform. Unified forecasting, landed cost decomposition, and automated ledger settlement for global trade.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational (99.99% Uptime)</span>
            </div>
          </div>

          {/* Column 1: PRODUCT */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-mono">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-gray-500 font-medium">
              <li>
                <a href="#product-overview" className="hover:text-gray-900 transition">
                  Overview
                </a>
              </li>
              <li>
                <a href="#feature-grid" className="hover:text-gray-900 transition">
                  Payments & Settlement
                </a>
              </li>
              <li>
                <a href="#analytics-section" className="hover:text-gray-900 transition">
                  Analytics & P&L
                </a>
              </li>
              <li>
                <a href="#automation-section" className="hover:text-gray-900 transition">
                  Automation Engine
                </a>
              </li>
              <li>
                <a href="#integrations-section" className="hover:text-gray-900 transition">
                  Integrations Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: SOLUTIONS */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-mono">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-gray-500 font-medium">
              <li>
                <a href="#feature-grid" className="hover:text-gray-900 transition">
                  Trading Houses
                </a>
              </li>
              <li>
                <a href="#forecast-section" className="hover:text-gray-900 transition">
                  Chartering Desks
                </a>
              </li>
              <li>
                <a href="#product-overview" className="hover:text-gray-900 transition">
                  Corporate Finance Teams
                </a>
              </li>
              <li>
                <a href="#security-section" className="hover:text-gray-900 transition">
                  Global Enterprises
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-mono">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-gray-500 font-medium">
              <li>
                <a href="#faq-section" className="hover:text-gray-900 transition">
                  Documentation & API
                </a>
              </li>
              <li>
                <a href="#forecast-section" className="hover:text-gray-900 transition">
                  SARIMA Guides
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-gray-900 transition">
                  East Coast Port Guide
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-gray-900 transition">
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: COMPANY & LEGAL */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-mono">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-gray-500 font-medium">
              <li>
                <button onClick={onEnterApp} className="hover:text-gray-900 transition cursor-pointer">
                  Platform Console
                </button>
              </li>
              <li>
                <button onClick={onOpenLogin} className="hover:text-gray-900 transition cursor-pointer">
                  Client Vault Login
                </button>
              </li>
              <li>
                <a href="#security-section" className="hover:text-gray-900 transition">
                  Security & Compliance
                </a>
              </li>
              <li>
                <span className="text-gray-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-gray-400">Terms of Service</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-mono">
          <div>
            © {new Date().getFullYear()} PortIN Financial Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-gray-500 font-sans">
            <span className="hover:text-gray-900 transition cursor-default">Privacy</span>
            <span>•</span>
            <span className="hover:text-gray-900 transition cursor-default">Terms</span>
            <span>•</span>
            <span className="hover:text-gray-900 transition cursor-default">Cookies</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold font-mono">
              <ShieldCheck className="w-3.5 h-3.5" /> SOC2 Type II
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
