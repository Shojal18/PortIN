import React from 'react';
import { Quote, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'PortIN reduced our post-fixture reconciliation turnaround from four business days to under six minutes. The predictive landed cost engine is now mandatory for every chartering decision we make.',
      name: 'Capt. Samarth R.',
      role: 'Chief Commercial Officer',
      company: 'Apex Dry Bulk Global',
      initials: 'SR',
      bgColor: 'bg-slate-900',
      metric: 'Saved $1.4M in landed dues in Q2'
    },
    {
      quote:
        'Managing cash flow across seven East Coast discharge ports used to require three separate spreadsheets and constant banking delays. PortIN unified everything into one auditable ledger.',
      name: 'Elena Rostova',
      role: 'VP Treasury & Trade Finance',
      company: 'Meridian Capital Partners',
      initials: 'ER',
      bgColor: 'bg-emerald-900',
      metric: '40% faster monthly close'
    },
    {
      quote:
        'The SARIMA freight rate forecasting model is remarkably accurate. Being able to anticipate monsoon premiums 60 days ahead gives our trading desk an undeniable competitive edge.',
      name: 'David Chen',
      role: 'Head of Commodity Chartering',
      company: 'Pacific Freightline Pte Ltd',
      initials: 'DC',
      bgColor: 'bg-blue-900',
      metric: '94% forecast precision score'
    }
  ];

  return (
    <section id="testimonials-section" className="py-20 lg:py-28 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">
            Executive Perspectives
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Built for teams that move fast.
          </h2>
          <p className="text-base text-gray-500 font-normal leading-relaxed">
            See how global treasury leaders, commercial directors, and chartering operators run their entire freight operations on PortIN.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 text-left">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-200 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-6"
            >
              {/* Quote Body */}
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-[14.5px] text-gray-700 leading-relaxed font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${t.bgColor} text-white font-bold text-xs flex items-center justify-center shrink-0 font-mono`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-[13.5px]">
                      {t.name}
                    </div>
                    <div className="text-[11.5px] text-gray-500">
                      {t.role} • <span className="text-gray-700 font-medium">{t.company}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-emerald-700 font-semibold pl-12">
                  ✦ {t.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
