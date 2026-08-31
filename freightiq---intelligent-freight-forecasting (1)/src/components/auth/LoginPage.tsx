import React, { useState } from 'react';
import { Anchor, Lock, Mail, ArrowRight, Sparkles, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../layout/Toast';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState<string>('manager@freightiq.demo');
  const [password, setPassword] = useState<string>('admin123');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both official email and password.');
      return;
    }

    try {
      await login(email, password);
      showToast('success', 'Welcome back, Capt. Samarth', 'Authenticated to FreightIQ Decision Platform.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid credentials. Use demo account.');
      showToast('error', 'Login Failed', err.message);
    }
  };

  const handleFillDemo = () => {
    setEmail('manager@freightiq.demo');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div
      id="login-page-container"
      className="min-h-screen bg-[#071522] flex items-center justify-center p-4 relative overflow-hidden font-sans"
    >
      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Brand Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] shadow-lg text-[#12A6A6]">
            <Anchor className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold tracking-wider text-white uppercase">FreightIQ</h1>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-[#102A43] text-[#12A6A6] border border-[#183A52]">
              TERMINAL
            </span>
          </div>
          <p className="text-[12.5px] text-slate-400 max-w-xs mx-auto font-mono">
            Econometric Freight Forecasting & Maritime Charter Decision System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0D1B2A] rounded-[8px] p-7 shadow-2xl border border-[#20384C] space-y-5 text-white">
          <div className="border-b border-[#183A52] pb-3">
            <h2 className="text-[15px] font-bold text-white uppercase tracking-wider">Terminal Access Authentication</h2>
            <p className="text-[12px] text-slate-400 mt-0.5 font-mono">Sign in with authorized logistics officer credentials</p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-[6px] bg-[#3E1A24] border border-[#5C2332] text-[#E05252] text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 text-[#E05252] shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[11.5px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                Logistics Officer Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  id="login-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="manager@freightiq.demo"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-white font-mono text-[13px] focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11.5px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                Security Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  id="login-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-white font-mono text-[13px] focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="login-submit-btn"
              disabled={isLoading}
              className="w-full py-3 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white text-[13px] font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Shortcut */}
          <div className="pt-3 border-t border-[#183A52]">
            <button
              type="button"
              id="btn-quick-fill-demo"
              onClick={handleFillDemo}
              className="w-full py-2.5 px-3 rounded-[6px] bg-[#102337] hover:bg-[#183A52] border border-[#183A52] text-[#E0A33A] text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E0A33A]" />
              <span>One-Click Officer Demo Credentials</span>
            </button>
          </div>
        </div>

        {/* SIH 2026 Disclosure Footer */}
        <p className="text-[11px] text-slate-500 text-center font-mono">
          Smart India Hackathon 2026 • Port & Vessel Feasibility Econometric Engine
        </p>
      </div>
    </div>
  );
};
