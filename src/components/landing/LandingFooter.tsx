import React from 'react';
import { Anchor, ArrowRight, ShieldCheck, Globe2, FileText, Sparkles } from 'lucide-react';

interface LandingFooterProps {
  onEnterApp: () => void;
  onOpenDemo: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onEnterApp,
  onOpenDemo
}) => {
  return (
    <footer id="landing-footer" className="bg-[#050E17] border-t border-[#20384C] text-[#9BAFBE] font-sans">
      {/* 1. High-Conversion Pre-Footer Call to Action Banner (Kpler Style) */}
      <div className="border-b border-[#20384C]/60 py-16 sm:py-20 bg-gradient-to-b from-[#071522] to-[#050E17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono uppercase tracking-widest text-[#E05252]">
            <Sparkles className="w-3.5 h-3.5 text-[#E05252]" />
            TAKE COMMAND OF DRY-BULK FREIGHT
          </div>

          <h2 className="text-[32px] sm:text-[46px] lg:text-[54px] font-extrabold text-white tracking-tight uppercase leading-tight font-sans">
            READY TO TRANSFORM YOUR
            <br />
            <span className="text-[#E05252]">CHARTERING DECISIONS?</span>
          </h2>

          <p className="text-[15px] sm:text-[17px] text-[#9BAFBE] max-w-xl mx-auto font-sans leading-relaxed">
            Gain immediate forward clarity across Indian East Coast freight corridors, berth draft limits, and voyage calculations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenDemo}
              className="px-8 py-4 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#E05252]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>REQUEST A DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEnterApp}
              className="px-8 py-4 rounded-[6px] bg-[#0D1B2A] hover:bg-[#102337] border border-[#20384C] text-white font-bold text-sm uppercase tracking-wider transition cursor-pointer"
            >
              LAUNCH LIVE TERMINAL
            </button>
          </div>
        </div>
      </div>

      {/* 2. Mega-Footer Multi-Column Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#solutions" className="hover:text-white transition">Fundamental Cargo Flows</a></li>
              <li><a href="#forecasting" className="hover:text-white transition">SARIMA Rate Forecasts</a></li>
              <li><a href="#voyage-analytics" className="hover:text-white transition">Voyage Cost Estimator</a></li>
              <li><a href="#vessel-intelligence" className="hover:text-white transition">Vessel-Port Feasibility</a></li>
              <li><a href="#backtest-analytics" className="hover:text-white transition">Backtested Precision</a></li>
            </ul>
          </div>

          {/* Col 2: East Coast Ports */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">East Coast Ports</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#port-intelligence" className="hover:text-white transition">Paradip Port (Odisha)</a></li>
              <li><a href="#port-intelligence" className="hover:text-white transition">Visakhapatnam Port (A.P.)</a></li>
              <li><a href="#port-intelligence" className="hover:text-white transition">Dhamra Port (Adani)</a></li>
              <li><a href="#port-intelligence" className="hover:text-white transition">Haldia Dock Complex</a></li>
              <li><a href="#port-intelligence" className="hover:text-white transition">Kolkata Dock System</a></li>
              <li><a href="#port-intelligence" className="hover:text-white transition">Gopalpur Deepwater</a></li>
            </ul>
          </div>

          {/* Col 3: Commodities */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Commodities</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#backtest-analytics" className="hover:text-white transition">Prime Hard Coking Coal</a></li>
              <li><a href="#backtest-analytics" className="hover:text-white transition">Thermal & Steam Coal</a></li>
              <li><a href="#backtest-analytics" className="hover:text-white transition">62% Fe Iron Ore Fines</a></li>
              <li><a href="#backtest-analytics" className="hover:text-white transition">DAP & Rock Phosphate</a></li>
              <li><a href="#backtest-analytics" className="hover:text-white transition">Limestone & Dolomite</a></li>
            </ul>
          </div>

          {/* Col 4: Integrations & API */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Data & Developers</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#integrations" className="hover:text-white transition">PortIN MCP (AI Agent Protocol)</a></li>
              <li><a href="#integrations" className="hover:text-white transition">REST APIs & Webhooks</a></li>
              <li><a href="#integrations" className="hover:text-white transition">Excel 365 / Sheets Add-In</a></li>
              <li><a href="#integrations" className="hover:text-white transition">Snowflake / BigQuery Shares</a></li>
              <li><a href="#integrations" className="hover:text-white transition">Developer Documentation</a></li>
            </ul>
          </div>

          {/* Col 5: Company & Prototype */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Platform Info</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#testimonials" className="hover:text-white transition">Customer Perspectives</a></li>
              <li><a href="#technology" className="hover:text-white transition">Data Governance & Ethics</a></li>
              <li><a href="#technology" className="hover:text-white transition">Model Confidence Bounds</a></li>
              <li><span className="text-[#E05252] font-bold">Smart India Hackathon 2026</span></li>
              <li><span className="text-[#12A6A6]">Ministry of Ports & Shipping</span></li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Bar with Prototype Notice */}
        <div className="pt-8 border-t border-[#20384C] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#0D1B2A] border border-[#E05252] text-[#E05252] flex items-center justify-center font-bold">
              P
            </div>
            <span>
              PortIN Maritime Intelligence © 2026. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#9BAFBE]">SIH 2026 National Innovation Prototype</span>
            <span className="text-[#20B26B]">ISO/IEC 27001 Maritime Telemetry Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
