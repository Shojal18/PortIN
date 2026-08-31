import React, { useState } from 'react';
import { LandingNavigation } from './LandingNavigation';
import { HeroSection } from './HeroSection';
import { KplerSolutionsSection } from './KplerSolutionsSection';
import { BacktestedAnalyticsSection } from './BacktestedAnalyticsSection';
import { VoyageAnalyticsPreviewSection } from './VoyageAnalyticsPreviewSection';
import { ThreePillarsSection } from './ThreePillarsSection';
import { ForecastingSection } from './ForecastingSection';
import { VesselIntelligenceSection } from './VesselIntelligenceSection';
import { PortIntelligenceSection } from './PortIntelligenceSection';
import { IndustriesGridSection } from './IndustriesGridSection';
import { IntegrationsHubSection } from './IntegrationsHubSection';
import { TestimonialsSection } from './TestimonialsSection';
import { CostAndRiskSection } from './CostAndRiskSection';
import { TechnologyAndTransparencySection } from './TechnologyAndTransparencySection';
import { LandingFooter } from './LandingFooter';
import { DemoRequestModal } from './DemoRequestModal';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onOpenLogin
}) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  const handleOpenDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#071522] text-[#F2F6F8] selection:bg-[#E05252] selection:text-white font-sans">
      {/* Top sticky navigation */}
      <LandingNavigation
        onEnterApp={onEnterApp}
        onOpenLogin={onOpenLogin}
        onOpenDemo={handleOpenDemo}
      />

      <main>
        {/* 1. Kpler-Grade Hero Section with Live Route Schematic */}
        <HeroSection onEnterApp={onEnterApp} onOpenDemo={handleOpenDemo} />

        {/* 2. Kpler-Style Tabbed Solutions Showcase */}
        <KplerSolutionsSection onEnterApp={onEnterApp} onOpenDemo={handleOpenDemo} />

        {/* 3. Backtested Analytics & Granular Commodity Grades Section */}
        <BacktestedAnalyticsSection onEnterApp={onEnterApp} onOpenDemo={handleOpenDemo} />

        {/* 4. Real-Time Cargo Flows & Voyage Analytics Calculator Preview */}
        <VoyageAnalyticsPreviewSection onEnterApp={onEnterApp} onOpenDemo={handleOpenDemo} />

        {/* 5. 3 Strategic Action Pillars (Monitor, Understand, Act) */}
        <ThreePillarsSection onEnterApp={onEnterApp} onOpenDemo={handleOpenDemo} />

        {/* 6. SARIMA Time-Series Forecasting Engine */}
        <ForecastingSection onEnterApp={onEnterApp} />

        {/* 7. Interactive Vessel-Port Feasibility Validator */}
        <VesselIntelligenceSection onEnterApp={onEnterApp} />

        {/* 8. 7 East Coast Indian Ports Directory */}
        <PortIntelligenceSection onEnterApp={onEnterApp} />

        {/* 9. Industries & Stakeholders We Serve */}
        <IndustriesGridSection onEnterApp={onEnterApp} onOpenDemo={handleOpenDemo} />

        {/* 10. Integrations Hub: MCP, APIs, Excel Add-in, Cloud Warehouse */}
        <IntegrationsHubSection onEnterApp={onEnterApp} onOpenDemo={handleOpenDemo} />

        {/* 11. Customer Perspectives & Social Proof */}
        <TestimonialsSection onEnterApp={onEnterApp} onOpenDemo={handleOpenDemo} />

        {/* 12. Landed Cost & Monsoon Risk Framework */}
        <CostAndRiskSection onEnterApp={onEnterApp} />

        {/* 13. Data Governance & SIH 2026 Disclosure */}
        <TechnologyAndTransparencySection onEnterApp={onEnterApp} />
      </main>

      {/* 14. Mega-Footer with Pre-Footer CTA */}
      <LandingFooter onEnterApp={onEnterApp} onOpenDemo={handleOpenDemo} />

      {/* Demo Request Modal */}
      <DemoRequestModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemo}
        onEnterApp={onEnterApp}
      />
    </div>
  );
};
