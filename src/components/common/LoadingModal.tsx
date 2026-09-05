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
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 font-sans"
    >
      <div
        id="loading-modal-card"
        className="bg-white rounded-[6px] p-5 max-w-md w-full shadow-lg border border-[#D0D0D0] text-gray-900"
      >
        <div className="flex items-center gap-3 pb-3 border-b border-[#D0D0D0]">
          <div className="w-8 h-8 rounded-[4px] bg-[#F3F4F6] text-black border border-[#D0D0D0] flex items-center justify-center shrink-0">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <h3 className="font-semibold text-black text-[14px] uppercase tracking-wider">
              Econometric Solver Active
            </h3>
            <p className="text-[11.5px] text-gray-500 font-mono">Executing multi-factor SARIMA simulation</p>
          </div>
        </div>

        {/* Steps List */}
        <div className="py-4 space-y-3">
          {STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const StepIcon = step.icon;

            return (
              <div
                key={step.text}
                className={`flex items-center gap-2.5 transition-opacity duration-300 ${
                  isDone || isCurrent ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-mono font-bold ${
                    isDone
                      ? 'bg-black text-white'
                      : isCurrent
                      ? 'bg-gray-200 text-black border border-black animate-pulse'
                      : 'bg-white text-gray-400 border border-[#D0D0D0]'
                  }`}
                >
                  {isDone ? (
                    '✓'
                  ) : isCurrent ? (
                    <StepIcon className="w-3 h-3 text-black" />
                  ) : (
                    idx + 1
                  )}
                </div>

                <span
                  className={`text-[12px] ${
                    isCurrent
                      ? 'font-semibold text-black'
                      : isDone
                      ? 'text-gray-800'
                      : 'text-gray-400'
                  }`}
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-black h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
