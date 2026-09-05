import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onEnterApp?: () => void;
  onOpenLogin?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onEnterApp, onOpenLogin }) => {
  return (
    <section id="final-cta" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-neutral-950 text-white overflow-hidden p-8 sm:p-12 lg:p-16 border border-neutral-800 shadow-2xl text-left">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-emerald-950/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Next-Gen Operating System</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12] text-white">
                Take full control of your global freight finances.
              </h2>

              <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-xl">
                Join over 10,000 chartering desks and finance teams using PortIN to forecast rates, automate settlements, and safeguard landed margins.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  id="final-cta-btn-primary"
                  onClick={onEnterApp}
                  className="px-6 py-3.5 rounded-xl bg-white text-gray-950 font-semibold text-sm hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
                >
                  Launch Live Platform
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="final-cta-btn-secondary"
                  onClick={onOpenLogin}
                  className="px-6 py-3.5 rounded-xl bg-transparent border border-gray-700 text-white font-semibold text-sm hover:bg-white/10 hover:border-gray-500 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Log In to Existing Vault
                </button>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> No credit card required
                </span>
                <span>•</span>
                <span>Instant sandbox access</span>
              </div>
            </div>

            {/* Right Column: Subtle Micro-UI Card Decoration */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-gray-400 font-sans font-medium">Consolidated Settlement Active</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                    REAL-TIME
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="font-sans">Spot vs Optimal Strike:</span>
                    <strong className="text-emerald-400">$17.80 / MT</strong>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="font-sans">Voyage Margin Gain:</span>
                    <strong className="text-white">+$411,900 USD</strong>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="font-sans">Landed Port Dues Auto-Paid:</span>
                    <strong className="text-gray-400">$18,450.00</strong>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400 flex items-center gap-1.5 font-sans">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    SOC2 Certified & Audited
                  </span>
                  <span className="text-emerald-400 font-bold">100% SECURE</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
