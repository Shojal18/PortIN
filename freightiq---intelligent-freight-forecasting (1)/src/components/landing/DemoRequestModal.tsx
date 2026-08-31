import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Building, Mail, User, Phone, Globe } from 'lucide-react';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterApp: () => void;
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({
  isOpen,
  onClose,
  onEnterApp
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Procurement / Chartering Manager',
    interest: 'East Coast Freight Forecasting & Vessel Fit'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-[12px] bg-[#0D1B2A] border border-[#20384C] text-[#F2F6F8] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#9BAFBE] hover:text-white hover:bg-[#102337] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E05252] animate-ping" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E05252]">
                PORTIN ENTERPRISE DEMO
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-sans uppercase tracking-tight text-white mb-2">
              REQUEST LIVE MARITIME DEMO
            </h3>
            <p className="text-sm text-[#9BAFBE] leading-relaxed mb-6 font-sans">
              Schedule a personalized walkthrough of PortIN's predictive freight models, berth draft validation engine, and voyage cost calculators tailored to your cargo flows.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#9BAFBE] font-mono uppercase mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ramesh Chandra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#071522] border border-[#20384C] text-[#F2F6F8] focus:border-[#E05252] outline-hidden text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#9BAFBE] font-mono uppercase mb-1">Work Email</label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#071522] border border-[#20384C] text-[#F2F6F8] focus:border-[#E05252] outline-hidden text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#9BAFBE] font-mono uppercase mb-1">Organization / Mill</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Tata Steel / NTPC / JSW"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#071522] border border-[#20384C] text-[#F2F6F8] focus:border-[#E05252] outline-hidden text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#9BAFBE] font-mono uppercase mb-1">Primary Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#071522] border border-[#20384C] text-[#F2F6F8] focus:border-[#E05252] outline-hidden text-sm cursor-pointer"
                  >
                    <option value="Procurement / Chartering Manager">Procurement / Chartering Manager</option>
                    <option value="Raw Material Supply Chain Head">Raw Material Supply Chain Head</option>
                    <option value="Commodity Trader / Broker">Commodity Trader / Broker</option>
                    <option value="Port Terminal Operator">Port Terminal Operator</option>
                    <option value="Maritime Analyst / Researcher">Maritime Analyst / Researcher</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#9BAFBE] font-mono uppercase mb-1">Primary Interest Area</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#071522] border border-[#20384C] text-[#F2F6F8] focus:border-[#E05252] outline-hidden text-sm cursor-pointer"
                >
                  <option value="East Coast Freight Forecasting & Vessel Fit">East Coast Freight Forecasting & Vessel Fit</option>
                  <option value="Demurrage & Port Congestion Telemetry">Demurrage & Port Congestion Telemetry</option>
                  <option value="Landed Voyage Cost & Bunker Indexing">Landed Voyage Cost & Bunker Indexing</option>
                  <option value="API & ERP Data Integration">API & ERP Data Integration</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white font-bold text-sm tracking-wider uppercase transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>CONFIRM DEMO ACCESS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-[#9BAFBE] text-center font-mono pt-1">
                Zero commitment • Instant access to the interactive prototype sandbox
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#20B26B]/20 text-[#20B26B] border border-[#20B26B] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-sans uppercase text-white">
              DEMO REQUEST REGISTERED
            </h3>

            <p className="text-sm text-[#9BAFBE] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. An enterprise specialist has prioritized your evaluation for <strong className="text-white">{formData.company || 'your organization'}</strong>.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onEnterApp();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-[6px] bg-[#087F8C] hover:bg-[#12A6A6] text-white text-xs font-bold tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>OPEN LIVE TERMINAL NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-[6px] bg-[#071522] border border-[#20384C] text-[#9BAFBE] hover:text-white text-xs font-semibold uppercase transition cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
