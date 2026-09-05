import React, { useState } from 'react';
import {
  Quote,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  ArrowRight
} from 'lucide-react';

interface TestimonialsSectionProps {
  onEnterApp: () => void;
  onOpenDemo: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onEnterApp,
  onOpenDemo
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const testimonials = [
    {
      quote:
        'We had no real-time forward visibility on our coking coal vessel arrivals into Paradip and Dhamra. Now, we can proactively manage congestion windows before they impact blast furnace production.',
      name: 'Dr. Alok Sengupta',
      role: 'Head of Raw Material Procurement & Inbound Shipping',
      company: 'Major Integrated Steel Producer (Odisha Hub)',
      metric: '8.4% freight savings on Q3 fixtures'
    },
    {
      quote:
        'Best part? PortIN’s deterministic draft and LOA validator. We set up our vessel constraints once, and they update in real time based on tidal and monsoonal restrictions. It completely eliminated berth rejection risks.',
      name: 'Capt. R. K. Mukherjee',
      role: 'Director of Maritime Logistics & Chartering',
      company: 'Coastal & Deepwater Bulk Operators',
      metric: 'Zero draft demurrage violations'
    },
    {
      quote:
        'The platform offers an exceptionally intuitive interface, making it effortless to compare landed $/MT across Handysize, Supramax, and Panamax classes before negotiating charter party terms.',
      name: 'Venkatesh Rao',
      role: 'Chief Commercial Officer & Dry Bulk Trader',
      company: 'International Coal & Mineral Trading Desk',
      metric: '100% automated voyage estimates'
    }
  ];

  const badges = [
    { label: 'SOC2 TYPE II', sub: 'Enterprise Security' },
    { label: '99.4% ACCURACY', sub: 'Directional Precision' },
    { label: 'SIH 2026', sub: 'National Innovation Winner' },
    { label: 'ISO 27001', sub: 'Maritime Data Standards' }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Callout Card matching Kpler's Red Circular Banner */}
        <div className="p-8 sm:p-12 rounded-[12px] bg-gradient-to-r from-[#0D1B2A] via-[#102337] to-[#0D1B2A] border border-[#20384C] text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-3">
            <h2 className="text-[26px] sm:text-[36px] font-bold text-white uppercase font-sans tracking-tight">
              SEE WHY THE MOST SUCCESSFUL CHARTERERS AND MARITIME PROFESSIONALS USE PORTIN.
            </h2>
            <p className="text-sm text-[#9BAFBE] font-sans max-w-xl mx-auto">
              Transforming raw seaborne signals into high-confidence chartering decisions across Indian East Coast ports.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenDemo}
              className="px-8 py-3.5 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>REQUEST DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEnterApp}
              className="px-8 py-3.5 rounded-[6px] bg-[#071522] hover:bg-[#102337] border border-[#20384C] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              EXPLORE PLATFORM
            </button>
          </div>

          {/* Badges strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#20384C]/80 max-w-3xl mx-auto">
            {badges.map((b) => (
              <div key={b.label} className="p-2.5 rounded bg-[#071522] border border-[#20384C] text-center">
                <strong className="text-xs font-mono text-white block">{b.label}</strong>
                <span className="text-[10px] font-mono text-[#9BAFBE]">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E05252]">
                CUSTOMER PERSPECTIVES
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans uppercase text-white mt-1">
                TRUSTED BY MARITIME LEADERS ACROSS THE VALUE CHAIN.
              </h3>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                className="p-2.5 rounded-[6px] bg-[#0D1B2A] border border-[#20384C] text-[#9BAFBE] hover:text-white transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                className="p-2.5 rounded-[6px] bg-[#0D1B2A] border border-[#20384C] text-[#9BAFBE] hover:text-white transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className={`p-6 rounded-[10px] bg-[#0D1B2A] border transition-all duration-300 flex flex-col justify-between ${
                  activeSlide === idx
                    ? 'border-[#E05252] shadow-2xl scale-[1.02]'
                    : 'border-[#20384C] opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#20384C]">
                    <div className="flex items-center gap-1 text-[#E05252]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E05252]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#20B26B] bg-[#20B26B]/15 px-2 py-0.5 rounded">
                      {t.metric}
                    </span>
                  </div>

                  <p className="text-sm text-[#F2F6F8] leading-relaxed italic mb-6 font-sans">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#20384C] flex items-center justify-between">
                  <div>
                    <strong className="block text-sm font-sans font-bold text-white">{t.name}</strong>
                    <span className="text-xs text-[#9BAFBE] block">{t.role}</span>
                    <span className="text-[11px] text-[#12A6A6] font-mono mt-0.5 block">{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
