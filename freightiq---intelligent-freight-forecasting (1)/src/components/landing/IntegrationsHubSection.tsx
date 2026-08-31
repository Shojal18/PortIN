import React, { useState } from 'react';
import {
  Code2,
  FileSpreadsheet,
  Database,
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Layers,
  Cpu
} from 'lucide-react';

interface IntegrationsHubSectionProps {
  onEnterApp: () => void;
  onOpenDemo: () => void;
}

export const IntegrationsHubSection: React.FC<IntegrationsHubSectionProps> = ({
  onEnterApp,
  onOpenDemo
}) => {
  const [activeTab, setActiveTab] = useState<'mcp' | 'api' | 'excel' | 'cloud'>('mcp');

  return (
    <section id="integrations" className="py-16 sm:py-24 border-b border-[#20384C]/60 bg-[#071522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono uppercase tracking-widest text-[#E05252]">
            <Cpu className="w-3.5 h-3.5 text-[#E05252]" />
            ENTERPRISE CONNECTIVITY
          </div>

          <h2 className="text-[30px] sm:text-[42px] lg:text-[46px] font-bold text-[#F2F6F8] tracking-tight uppercase leading-tight font-sans">
            FORECAST SMARTER.
            <br />
            <span className="text-[#E05252]">WITH PORTIN DATA INTEGRATIONS.</span>
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#9BAFBE] leading-relaxed max-w-2xl mx-auto font-sans">
            Seamlessly pipe PortIN's time-series forecasts, vessel draft specs, and port queue metrics into your spreadsheets, CTRM systems, and AI assistants.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-[8px] bg-[#0D1B2A] border border-[#20384C] gap-1 shadow-xl">
            <button
              onClick={() => setActiveTab('mcp')}
              className={`px-4 sm:px-6 py-2 rounded-[6px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'mcp'
                  ? 'bg-[#E05252] text-white shadow-md'
                  : 'text-[#9BAFBE] hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>MCP & AI AGENTS</span>
            </button>

            <button
              onClick={() => setActiveTab('api')}
              className={`px-4 sm:px-6 py-2 rounded-[6px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'api'
                  ? 'bg-[#E05252] text-white shadow-md'
                  : 'text-[#9BAFBE] hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>REST APIS</span>
            </button>

            <button
              onClick={() => setActiveTab('excel')}
              className={`px-4 sm:px-6 py-2 rounded-[6px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'excel'
                  ? 'bg-[#E05252] text-white shadow-md'
                  : 'text-[#9BAFBE] hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>EXCEL ADD-IN</span>
            </button>

            <button
              onClick={() => setActiveTab('cloud')}
              className={`px-4 sm:px-6 py-2 rounded-[6px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'cloud'
                  ? 'bg-[#E05252] text-white shadow-md'
                  : 'text-[#9BAFBE] hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>CLOUD WAREHOUSE</span>
            </button>
          </div>
        </div>

        {/* Dynamic Integration Showcase Box */}
        <div className="p-8 sm:p-10 rounded-[12px] bg-[#0D1B2A] border border-[#20384C] shadow-2xl">
          {activeTab === 'mcp' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column (6 cols): AI MCP Graphic */}
              <div className="lg:col-span-6 p-6 rounded-[8px] bg-[#071522] border border-[#20384C] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#20384C]">
                  <span className="text-xs font-mono font-bold text-[#E05252] uppercase">
                    PortIN MCP Protocol Connector
                  </span>
                  <span className="text-[10px] font-mono text-[#20B26B] bg-[#20B26B]/15 px-2 py-0.5 rounded">
                    LIVE PROTOCOL
                  </span>
                </div>

                {/* Visual AI Model Hub */}
                <div className="flex items-center justify-center py-6 gap-6 sm:gap-8">
                  <div className="w-16 h-16 rounded-full bg-[#102337] border-2 border-[#E05252] flex items-center justify-center text-white font-mono font-bold text-sm shadow-xl">
                    PortIN
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-mono text-[#12A6A6] font-bold">◄ MCP SERVER ►</span>
                    <span className="text-[10px] font-mono text-[#9BAFBE]">JSON-RPC</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="px-3 py-1 rounded bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono text-[#F2F6F8]">
                      ChatGPT
                    </span>
                    <span className="px-3 py-1 rounded bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono text-[#F2F6F8]">
                      Gemini
                    </span>
                    <span className="px-3 py-1 rounded bg-[#0D1B2A] border border-[#20384C] text-[11px] font-mono text-[#F2F6F8]">
                      Claude
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded bg-[#0D1B2A] border border-[#20384C] text-xs font-mono text-[#9BAFBE]">
                  <p className="text-[#12A6A6] font-semibold mb-1">Natural Language Query Example:</p>
                  <p className="italic text-white">
                    "Find the optimal charter window and draft-feasible Supramax vessel for 55,000 MT coking coal from Hay Point to Paradip in October."
                  </p>
                </div>
              </div>

              {/* Right Column (6 cols): MCP Narrative */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-xs font-mono text-[#E05252] uppercase font-bold tracking-wider">
                  PORTIN MCP BETA PROGRAM
                </span>
                <h3 className="text-2xl font-bold font-sans uppercase text-white">
                  Query Freight Markets Using Natural Language.
                </h3>
                <p className="text-sm text-[#9BAFBE] leading-relaxed font-sans">
                  Our Model Context Protocol (MCP) server allows Large Language Models (Gemini, Claude, and GPT-4) to translate natural language inquiries into real-time PortIN database queries, returning instant route feasibility verdicts, draft limits, and forward rate forecasts.
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={onOpenDemo}
                    className="px-6 py-3 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    JOIN MCP BETA
                  </button>
                  <button
                    onClick={onEnterApp}
                    className="px-5 py-3 rounded-[6px] bg-[#071522] hover:bg-[#102337] border border-[#20384C] text-[#F2F6F8] text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    TEST IN TERMINAL
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 p-6 rounded-[8px] bg-[#071522] border border-[#20384C] font-mono text-xs text-[#9BAFBE] space-y-2">
                <div className="text-[#20B26B] font-bold">GET /api/v1/forecast/corridor?origin=AU_HAY&dest=IN_PRT</div>
                <div className="p-3 bg-[#0D1B2A] rounded border border-[#20384C] text-[11px] text-white overflow-x-auto">
                  {`{
  "corridor": "Hay Point ➔ Paradip",
  "spot_rate": 19.72,
  "forecast_low": 18.40,
  "confidence_interval_95": [17.85, 19.95],
  "optimal_window": "2026-10-12 to 2026-10-26",
  "feasible_classes": ["SUPRAMAX", "PANAMAX"],
  "berth_draft_limit_meters": 14.5
}`}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-xs font-mono text-[#E05252] uppercase font-bold tracking-wider">
                  HIGH-THROUGHPUT REST & WEBSOCKETS
                </span>
                <h3 className="text-2xl font-bold font-sans uppercase text-white">
                  Direct Integration Into CTRM & ERP Systems.
                </h3>
                <p className="text-sm text-[#9BAFBE] leading-relaxed font-sans">
                  Automate freight benchmark ingestion, voyage cost calculation, and port draft limit checks with our low-latency JSON APIs.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onEnterApp}
                    className="px-6 py-3 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    EXPLORE API DOCS
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'excel' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 p-6 rounded-[8px] bg-[#071522] border border-[#20384C] font-mono text-xs space-y-3">
                <div className="text-white font-bold pb-2 border-b border-[#20384C]">
                  =PORTIN.FORECAST("AU_HAY", "IN_PRT", "OCT-2026")
                </div>
                <div className="space-y-1 text-[#9BAFBE] text-[11px]">
                  <p>• Live streaming Excel formulas for dynamic chartering models</p>
                  <p>• Auto-refreshing landed $/MT cost models for procurement managers</p>
                  <p>• Compatible with Microsoft Excel 365, Google Sheets, and Power BI</p>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-xs font-mono text-[#E05252] uppercase font-bold tracking-wider">
                  SPREADSHEET PRODUCTIVITY
                </span>
                <h3 className="text-2xl font-bold font-sans uppercase text-white">
                  Real-Time Maritime Data Directly in Your Sheets.
                </h3>
                <p className="text-sm text-[#9BAFBE] leading-relaxed font-sans">
                  Empower commercial desks to build complex voyage estimations with live-updating formulas without manual data entry.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenDemo}
                    className="px-6 py-3 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    DOWNLOAD ADD-IN
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cloud' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 p-6 rounded-[8px] bg-[#071522] border border-[#20384C] font-mono text-xs space-y-3">
                <div className="text-[#12A6A6] font-bold">Cloud Data Sharing: BigQuery / Snowflake</div>
                <p className="text-[#9BAFBE] text-[11px]">
                  Direct zero-ETL data shares delivering complete historical voyage series, AIS vessel arrivals, and draft logs straight to your enterprise data warehouse.
                </p>
              </div>

              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-xs font-mono text-[#E05252] uppercase font-bold tracking-wider">
                  ENTERPRISE DATA LAKE
                </span>
                <h3 className="text-2xl font-bold font-sans uppercase text-white">
                  Enterprise Data Warehousing at Scale.
                </h3>
                <p className="text-sm text-[#9BAFBE] leading-relaxed font-sans">
                  Query millions of seaborne dry-bulk telemetry records alongside your internal enterprise sales and supply chain datasets.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenDemo}
                    className="px-6 py-3 rounded-[6px] bg-[#E05252] hover:bg-[#C94C4C] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    REQUEST DATA SHARE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
