import React, { useState, useEffect } from 'react';
import { Anchor, CheckCircle2, Loader2, Ship, ShieldAlert, TrendingDown } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
}

const STEPS = [
  { text: 'Analyzing historical econometric freight curves...', icon: TrendingDown },
  { text: 'Checking vessel-port nautical compatibility (Draft, LOA, Beam)...', icon: Anchor },
  { text: 'Computing itemized bunker (VLSFO) & voyage cost stack...', icon: Ship },
  { text: 'Identifying optimal cost dip laycan entry window...', icon: CheckCircle2 },
  { text: 'Synthesizing Bay of Bengal congestion & weather risk parameters...', icon: ShieldAlert }
];

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="loading-modal-overlay"
      className="fixed inset-0 z-50 bg-[#071522]/85 backdrop-blur-xs flex items-center justify-center p-4 font-sans"
    >
      <div
        id="loading-modal-card"
        className="bg-[#0D1B2A] rounded-[8px] p-6 max-w-lg w-full shadow-2xl border border-[#20384C] text-white"
      >
        <div className="flex items-center gap-3.5 pb-4 border-b border-[#183A52]">
          <div className="w-10 h-10 rounded-[6px] bg-[#102A43] text-[#12A6A6] border border-[#183A52] flex items-center justify-center shrink-0">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="font-bold text-white text-[15px] uppercase tracking-wider">
              Econometric Solver Engine Active
            </h3>
            <p className="text-[12px] text-slate-400 font-mono">Executing multi-factor SARIMA forward curve simulation</p>
          </div>
        </div>

        {/* Steps List */}
        <div className="py-5 space-y-3.5">
          {STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const StepIcon = step.icon;

            return (
              <div
                key={step.text}
                className={`flex items-center gap-3 transition-opacity duration-300 ${
                  isDone || isCurrent ? 'opacity-100' : 'opacity-35'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-mono font-bold ${
                    isDone
                      ? 'bg-[#0A3D2E] text-[#20B26B] border border-[#14533D]'
                      : isCurrent
                      ? 'bg-[#12A6A6] text-[#071522] animate-pulse'
                      : 'bg-[#071522] text-slate-500 border border-[#183A52]'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[#20B26B]" />
                  ) : isCurrent ? (
                    <StepIcon className="w-3.5 h-3.5 text-[#071522]" />
                  ) : (
                    idx + 1
                  )}
                </div>

                <span
                  className={`text-[12.5px] ${
                    isCurrent
                      ? 'font-bold text-white'
                      : isDone
                      ? 'text-slate-300 font-medium'
                      : 'text-slate-500'
                  }`}
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#071522] rounded-full h-1.5 overflow-hidden border border-[#183A52]">
          <div
            className="bg-[#12A6A6] h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
