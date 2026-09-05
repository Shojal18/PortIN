import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is the PortIN platform?',
      a: 'PortIN is an enterprise financial operations and dry bulk freight intelligence platform. It brings together time-series freight rate forecasting (SARIMA), multi-currency landed cost decomposition, automated charter settlement, and continuous GL ledger reconciliation into a unified cloud workspace.'
    },
    {
      q: 'Who is it built for?',
      a: 'PortIN is engineered for commodity trading houses, shipowners, charterers, cargo receivers, freight forwarders, and corporate treasury teams operating dry bulk routes into Indian East Coast ports and global maritime corridors.'
    },
    {
      q: 'How secure is my financial data?',
      a: 'All data is encrypted with AES-256-GCM at rest and TLS 1.3 in transit. We maintain strict SOC2 Type II compliance, role-based dual-signatory quorums for high-value fund movements, automated tamper-evident audit logs, and zero third-party data sharing.'
    },
    {
      q: 'Can I connect my existing accounts and ERP?',
      a: 'Yes. PortIN offers certified pre-built connectors for SAP S/4HANA, Oracle NetSuite, QuickBooks, Xero, and direct SWIFT MT103/MT940 banking feeds. You can also utilize our comprehensive REST API and webhooks for custom internal systems.'
    },
    {
      q: 'Can I automate financial workflows and laytime calculations?',
      a: 'Absolutely. PortIN includes an autonomous rules engine that automatically matches incoming invoices to charter parties, computes laytime and despatch/demurrage credits, and generates validated journal entries for your general ledger.'
    },
    {
      q: 'Does it support multiple users, roles, and entities?',
      a: 'Yes. Enterprise plans support unlimited team members across granular role tiers (e.g., Commercial Desks, Port Operations, Treasury Approver, External Auditor) and multi-subsidiary entity structures with distinct currency ledgers.'
    },
    {
      q: 'Is there a free plan or live interactive demo?',
      a: 'You can explore our fully functional live workspace directly by clicking "Launch Platform" or "Explore Workspace" anywhere on this page—no credit card or sales call required.'
    },
    {
      q: 'How does pricing work?',
      a: 'We offer transparent tiered monthly subscriptions for growing trading desks, alongside custom volume-based enterprise licensing for high-throughput global commodity operators with dedicated VPC deployments and 24/7 SLA support.'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 lg:py-28 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Everything you need to know.
          </h2>
          <p className="text-base text-gray-500 font-normal leading-relaxed">
            Have questions about implementation, security, forecasting models, or ledger automation? Find clear answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200 text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="py-5">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between gap-4 text-left font-semibold text-gray-900 text-base sm:text-[17px] hover:text-emerald-800 transition focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <div className="p-1 rounded-full bg-gray-100 text-gray-600 shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 text-sm text-gray-600 leading-relaxed pr-8 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
