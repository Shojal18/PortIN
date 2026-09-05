import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight, Menu, X, LogIn, LogOut, Ship, Anchor, Package, Compass } from 'lucide-react';
import { NavTab } from '../../types';

/**
 * CONTAINER SHIP / LOGISTICS BACKGROUND VIDEO
 * Video source: https://pixabay.com/videos/container-ship-transport-logistics-23215/
 * Configured as a full-bleed, edge-to-edge full-screen hero background.
 */
export const HERO_VIDEO_URL = "/videos/container-ship-23215.mp4";
export const HERO_VIDEO_FALLBACK_URL = "https://poseidonnavigation.com/wp-content/uploads/2021/07/Container-Ship-23215.mp4";

interface HeroSectionProps {
  onNavigate?: (tab: NavTab) => void;
  onOpenLogin?: () => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenLogin,
  onLogout,
  isAuthenticated = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab: NavTab) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(tab);
    } else if (!isAuthenticated && onOpenLogin) {
      onOpenLogin();
    }
  };

  return (
    <section
      id="hero-overview"
      className="relative w-full min-h-screen min-h-[100svh] min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#060D1E] text-white"
    >
      {/* ================================================== */}
      {/* FULL-BLEED VIDEO BACKGROUND                        */}
      {/* ================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
          <source src={HERO_VIDEO_FALLBACK_URL} type="video/mp4" />
        </video>

        {/* Subtle Dark Contrast Overlay */}
        <div className="absolute inset-0 bg-[#060D1E]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D1E]/80 via-[#060D1E]/35 to-transparent pointer-events-none" />
      </div>

      {/* ================================================== */}
      {/* TOP NAVIGATION (Over Video)                         */}
      {/* ================================================== */}
      <header className="relative z-30 w-full h-[72px] lg:h-[80px] px-6 sm:px-10 lg:px-[76px] flex items-center justify-between border-b border-white/10 backdrop-blur-xs">
        {/* Left: PortIN Brand */}
        <a href="#hero-overview" className="flex items-center gap-2 group cursor-pointer">
          <span className="text-white text-[22px] font-bold tracking-tight font-sans">
            PortIN
          </span>
        </a>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-[28px] lg:gap-[34px] text-[14px] font-medium text-white font-sans">
          <a href="#hero-overview" className="text-white hover:text-white/80 transition-opacity">
            Home
          </a>

          {/* Services Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="flex items-center gap-1 text-white hover:text-white/80 transition-opacity cursor-pointer font-medium text-[14px]"
              aria-expanded={servicesDropdownOpen}
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white/80 transition-transform duration-150 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#0A1428] border border-white/15 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 text-left">
                <button
                  onClick={() => handleNavClick('vessels')}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Ship className="w-4 h-4 text-[#F59E0B]" />
                  <div>
                    <div className="font-medium text-[13px]">Container Transportation</div>
                    <div className="text-[11px] text-slate-400">Vessel fleet & cargo specs</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('ports')}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Anchor className="w-4 h-4 text-[#F59E0B]" />
                  <div>
                    <div className="font-medium text-[13px]">Unloading Services</div>
                    <div className="text-[11px] text-slate-400">Port discharge & berth limits</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('portfolio')}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Package className="w-4 h-4 text-[#F59E0B]" />
                  <div>
                    <div className="font-medium text-[13px]">Shipment Management</div>
                    <div className="text-[11px] text-slate-400">Active voyages & demurrage</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#F59E0B]" />
                  <div>
                    <div className="font-medium text-[13px]">Logistics Services</div>
                    <div className="text-[11px] text-slate-400">Operations & trade matrix</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Track Your Shipment */}
          <button
            onClick={() => handleNavClick('portfolio')}
            className="text-white hover:text-white/80 transition-opacity cursor-pointer font-medium text-[14px]"
          >
            Track Your Shipment
          </button>

          {/* Forecast */}
          <button
            onClick={() => handleNavClick('new-forecast')}
            className="text-white hover:text-white/80 transition-opacity cursor-pointer font-medium text-[14px]"
          >
            Forecast
          </button>
        </nav>

        {/* Right: Login or Log out Button */}
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="px-4 h-[38px] rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[13px] font-medium flex items-center gap-1.5 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer backdrop-blur-xs"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-300" />
              <span>Log out</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="w-[88px] h-[38px] rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[13px] font-medium flex items-center justify-center gap-1.5 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer backdrop-blur-xs"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-300" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-medium flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Log out</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3 py-1.5 rounded-full bg-[#F59E0B] text-[#070E1E] text-xs font-semibold"
            >
              Login
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#F59E0B] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="relative z-40 md:hidden bg-[#0A1224]/95 border-b border-white/10 px-6 py-4 space-y-3 text-white text-sm font-medium backdrop-blur-md text-left">
          <a
            href="#hero-overview"
            className="block py-1.5 hover:text-[#F59E0B]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </a>

          <div className="py-1 border-t border-b border-white/10 space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block">Services</span>
            <button
              onClick={() => handleNavClick('vessels')}
              className="block w-full text-left py-1 text-sm text-slate-200 hover:text-white"
            >
              • Container Transportation
            </button>
            <button
              onClick={() => handleNavClick('ports')}
              className="block w-full text-left py-1 text-sm text-slate-200 hover:text-white"
            >
              • Unloading Services
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="block w-full text-left py-1 text-sm text-slate-200 hover:text-white"
            >
              • Shipment Management
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className="block w-full text-left py-1 text-sm text-slate-200 hover:text-white"
            >
              • Logistics Services
            </button>
          </div>

          <button
            onClick={() => handleNavClick('portfolio')}
            className="block w-full text-left py-1.5 hover:text-[#F59E0B]"
          >
            Track Your Shipment
          </button>
          <button
            onClick={() => handleNavClick('new-forecast')}
            className="block w-full text-left py-1.5 hover:text-[#F59E0B]"
          >
            Forecast
          </button>

          <div className="pt-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout?.();
                }}
                className="w-full py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out of PortIN</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin?.();
                }}
                className="w-full py-2.5 rounded-full bg-[#F59E0B] text-[#070E1E] text-xs font-semibold"
              >
                Login to PortIN
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* MAIN HERO CONTENT (Clean, No Fake Reviews)         */}
      {/* ================================================== */}
      <div className="relative z-20 flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[76px] pt-8 lg:pt-[60px] pb-8 lg:pb-[50px] flex flex-col justify-between">
        
        <div className="w-full max-w-[650px] text-left">
          
          {/* MAIN HEADING: Three Lines */}
          <h1 className="text-[52px] sm:text-[68px] lg:text-[86px] font-extrabold text-white leading-[0.98] tracking-[-2.5px] font-sans">
            <span className="block">Global</span>
            <span className="block">Freight</span>
            <span className="block">Solutions</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-[32px] text-[14px] leading-[1.55] font-normal text-white/85 max-w-[420px] font-sans">
            Global Freight Solutions is a trusted provider of fast, reliable, and cost-effective container transportation services across international markets.
          </p>

          {/* CTA BUTTONS: Book Now & Track Shipment */}
          <div className="mt-[32px] flex items-center gap-[10px]">
            <button
              onClick={() => handleNavClick('trading')}
              className="w-[136px] h-[48px] rounded-full bg-[#F59E0B] text-[#070E1E] text-[14px] font-semibold flex items-center justify-center hover:brightness-105 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer shadow-md"
            >
              Book Now
            </button>

            <button
              onClick={() => handleNavClick('portfolio')}
              className="w-[155px] h-[48px] rounded-full bg-[#0A1224]/75 border border-white/20 text-white text-[14px] font-medium flex items-center justify-center hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer backdrop-blur-xs"
            >
              Track Shipment
            </button>
          </div>

        </div>

        {/* ================================================== */}
        {/* BOTTOM ROW: FLOATING CARDS (Bottom Left & Right)   */}
        {/* ================================================== */}
        <div className="w-full flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4 mt-8 lg:mt-6">
          
          {/* BOTTOM LEFT FLOATING CARD (~280px x 145px) */}
          <div className="relative w-full max-w-[280px] h-[145px] bg-[#0A1224]/85 border border-white/10 backdrop-blur-md rounded-[12px] p-4 flex flex-col justify-between text-left shadow-lg">
            {/* Unloading Label */}
            <div>
              <span className="text-[10px] uppercase font-semibold text-white/50 tracking-wider block">
                UNLOADING
              </span>
              <h4 className="text-[15px] font-bold text-white leading-snug mt-1">
                Book Container<br />Unloading Today
              </h4>
            </div>

            {/* Bottom Link */}
            <button
              onClick={() => handleNavClick('ports')}
              className="text-[12px] font-medium text-[#F59E0B] underline hover:text-amber-400 transition-colors inline-block text-left cursor-pointer"
            >
              Book Now
            </button>

            {/* Single Yellow Shipping Container Visual Integrated in corner */}
            <div className="absolute right-3.5 bottom-3.5 w-12 h-10 pointer-events-none opacity-90">
              <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                <polygon points="4,12 28,4 50,12 26,20" fill="#F59E0B" />
                <polygon points="4,12 26,20 26,40 4,32" fill="#D97706" />
                <polygon points="26,20 50,12 50,32 26,40" fill="#B45309" />
                <line x1="32" y1="18" x2="32" y2="38" stroke="#78350F" strokeWidth="1" />
                <line x1="38" y1="16" x2="38" y2="36" stroke="#78350F" strokeWidth="1" />
                <line x1="44" y1="14" x2="44" y2="34" stroke="#78350F" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* BOTTOM RIGHT SHIPMENT TRACKING CARD (~360px x 145px) */}
          <div className="w-full max-w-[360px] h-[145px] bg-[#0A1224]/85 border border-white/10 backdrop-blur-md rounded-[12px] p-4 flex flex-col justify-between text-left shadow-lg">
            
            {/* TOP: CN SHG -> US OAK */}
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-bold text-white font-mono">
                CN SHG
              </span>
              <span className="text-[16px] font-bold text-white font-mono">
                US OAK
              </span>
            </div>

            {/* CENTER: Shipment Progress Line */}
            <div className="relative py-2">
              <div className="w-full h-[2px] bg-white/20 rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[65%] h-[2px] bg-[#F59E0B]" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-xs" />
              <div className="absolute left-[65%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#F59E0B] text-[#070E1E] flex items-center justify-center shadow-md">
                <ArrowRight className="w-3 h-3" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-500" />
            </div>

            {/* BOTTOM: ETD & ETA */}
            <div className="flex items-center justify-between font-sans">
              <div>
                <span className="text-[10px] text-white/50 block">ETD</span>
                <span className="text-[12px] font-medium text-white font-mono">May 3 22:57</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/50 block">ETA</span>
                <span className="text-[12px] font-medium text-white font-mono">09:00 May 5</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
