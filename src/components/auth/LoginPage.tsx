import React, { useState } from 'react';
import { Anchor, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../layout/Toast';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState<string>('manager@freightiq.demo');
  const [password, setPassword] = useState<string>('admin123');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      showToast('success', 'Welcome, Capt. Samarth', 'Signed in to PortIN Prototype.');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
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
      className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4 font-sans text-gray-900"
    >
      <div className="max-w-sm w-full space-y-5">
        {/* Brand Banner */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] bg-black text-white">
            <Anchor className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <h1 className="text-xl font-bold tracking-tight text-black">PortIN</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-[2px] bg-gray-100 text-gray-700 border border-gray-300">
              Prototype
            </span>
          </div>
          <p className="text-[12px] text-gray-600 font-mono">
            Freight Forecasting & Vessel Feasibility System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[6px] p-6 border border-[#D0D0D0] space-y-4">
          <div className="border-b border-[#D0D0D0] pb-2.5">
            <h2 className="text-[14px] font-semibold text-black uppercase tracking-wider">Sign In</h2>
            <p className="text-[12px] text-gray-500 mt-0.5">Use default demo credentials to continue</p>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-[4px] bg-gray-100 border border-gray-400 text-black text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            {/* Email */}
            <div>
              <label className="block text-[11.5px] font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  id="login-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="manager@freightiq.demo"
                  className="w-full pl-9 pr-3 py-1.5 rounded-[4px] border border-[#D0D0D0] bg-white text-gray-900 font-mono text-[13px] focus:outline-hidden focus:border-black"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11.5px] font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  id="login-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-1.5 rounded-[4px] border border-[#D0D0D0] bg-white text-gray-900 font-mono text-[13px] focus:outline-hidden focus:border-black"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="login-submit-btn"
              disabled={isLoading}
              className="w-full py-2 rounded-[4px] bg-black hover:bg-[#262626] text-white text-[13px] font-medium transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill */}
          <div className="pt-2 border-t border-[#D0D0D0]">
            <button
              type="button"
              id="btn-quick-fill-demo"
              onClick={handleFillDemo}
              className="w-full py-1.5 px-3 rounded-[4px] bg-white hover:bg-gray-50 border border-[#D0D0D0] text-gray-800 text-xs font-mono font-medium transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Load Demo Credentials</span>
            </button>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-[11px] text-gray-500 text-center font-mono">
          Dry Bulk Freight Forecasting & Feasibility Engine
        </p>
      </div>
    </div>
  );
};
