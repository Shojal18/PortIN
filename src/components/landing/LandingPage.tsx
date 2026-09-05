import React from 'react';
import { HeroSection } from './HeroSection';
import { SectionTwo } from './SectionTwo';
import { SectionThree } from './SectionThree';
import { LandingFooter } from './LandingFooter';
import { NavTab } from '../../types';

interface LandingPageProps {
  onNavigate?: (tab: NavTab) => void;
  onOpenLogin?: () => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenLogin,
  onLogout,
  isAuthenticated = false,
}) => {
  return (
    <div id="landing-page-root" className="w-full min-h-screen bg-[#060D1E] flex flex-col selection:bg-[#F59E0B]/30 selection:text-white">
      {/* 1. HERO SECTION — FULL SCREEN */}
      <HeroSection
        onNavigate={onNavigate}
        onOpenLogin={onOpenLogin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />

      {/* 2. OPERATIONAL SHIPMENT SHOWCASE SECTION */}
      <SectionTwo
        onNavigate={onNavigate}
        onOpenLogin={onOpenLogin}
        isAuthenticated={isAuthenticated}
      />

      {/* 3. EMPTY SECTION 3 */}
      <SectionThree />

      {/* 4. EXISTING FOOTER */}
      <LandingFooter
        onEnterApp={() => onNavigate?.('dashboard')}
        onOpenLogin={onOpenLogin}
      />
    </div>
  );
};
