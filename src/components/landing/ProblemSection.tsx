import React from 'react';
import { TrendingDown, AlertTriangle, Ship, HelpCircle, ArrowDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="chartering-problem" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12A6A6] mb-2.5">
            THE CHARTERING CHALLENGE
          </div>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#F2F6F8] tracking-tight leading-[1.18] uppercase font-sans">
            THE CHARTERING DECISION
            <br />
            <span className="text-[#9BAFBE]">IS MORE THAN A FREIGHT RATE.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#9BAFBE] leading-[1.65] font-sans">
            A vessel may look economical on paper but fail a port constraint. A favorable freight rate may disappear before the charter is fixed. Congestion and idle time can change the economics of a voyage.
          </p>
        </div>

        {/* Editorial Layout: 3 Distinct Problems */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Rate Uncertainty (5 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] flex flex-col justify-between hover:border-[#12A6A6]/60 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[28px] font-mono font-bold text-[#12A6A6]">01</span>
                <span className="p-2 rounded bg-[#071522] border border-[#20384C] text-[#12A6A6]">
                  <TrendingDown className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-[19px] font-bold text-[#F2F6F8] uppercase tracking-tight mb-2 font-sans">
                RATE UNCERTAINTY
              </h3>
              <p className="text-[14px] text-[#12A6A6] font-mono font-medium mb-3">
                Where could freight rates move?
              </p>
              <p className="text-[14px] text-[#9BAFBE] leading-[1.6]">
                Spot markets fluctuate on fuel surcharges, seasonal grain/coal runs, and tonnage imbalances. Fixing too early or late directly destroys voyage margins.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#20384C] flex items-center justify-between text-xs font-mono text-[#9BAFBE]">
              <span>VOLATILITY EXPOSURE</span>
              <span className="text-[#D8891A] font-bold">±12% to ±25%</span>
            </div>
          </div>

          {/* Card 2: Vessel-Port Constraints (4 cols - Highlighted Accent) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-[8px] bg-[#0B1F33] border border-[#12A6A6]/60 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[28px] font-mono font-bold text-[#12A6A6]">02</span>
                <span className="p-2 rounded bg-[#0D1B2A] border border-[#12A6A6] text-[#12A6A6]">
                  <Ship className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-[19px] font-bold text-[#F2F6F8] uppercase tracking-tight mb-2 font-sans">
                VESSEL-PORT CONSTRAINTS
              </h3>
              <p className="text-[14px] text-[#12A6A6] font-mono font-medium mb-3">
                Can the selected vessel actually enter the destination port?
              </p>
              <p className="text-[14px] text-[#9BAFBE] leading-[1.6]">
                Booking a Capesize for Haldia (max draft 8.5m) or Paradip (max draft 14.5m) leads to rejection, severe lighterage fees, or catastrophic demurrage claims.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#20384C] flex items-center justify-between text-xs font-mono text-[#9BAFBE]">
              <span>PHYSICAL VIOLATION RISK</span>
              <span className="text-[#E05252] font-bold">CRITICAL DRAFT/LOA</span>
            </div>
          </div>

          {/* Card 3: Operational Risk (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] flex flex-col justify-between hover:border-[#12A6A6]/60 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[28px] font-mono font-bold text-[#12A6A6]">03</span>
                <span className="p-2 rounded bg-[#071522] border border-[#20384C] text-[#D8891A]">
                  <AlertTriangle className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-[19px] font-bold text-[#F2F6F8] uppercase tracking-tight mb-2 font-sans">
                OPERATIONAL RISK
              </h3>
              <p className="text-[14px] text-[#12A6A6] font-mono font-medium mb-3">
                Could congestion, volatility or idle time change the economics?
              </p>
              <p className="text-[14px] text-[#9BAFBE] leading-[1.6]">
                Berthing delays of 3–6 days at congested Indian East Coast discharge points can erode an entire freight discount via daily charter hire charges.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#20384C] flex items-center justify-between text-xs font-mono text-[#9BAFBE]">
              <span>DEMURRAGE COST</span>
              <span className="text-[#D8891A] font-bold">$18,000–$25,000 / day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
