import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  Building2,
  Anchor,
  Zap
} from 'lucide-react';

export const TransactionsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'settled' | 'pending'>('all');

  const transactions = [
    {
      id: 'TX-9021',
      counterparty: 'BHP Billiton Iron Ore',
      sub: 'Capesize Charter #CP-8840',
      category: 'Ocean Freight',
      date: 'Aug 24, 2026',
      status: 'Completed',
      statusType: 'success',
      amount: '+$842,500.00',
      isPositive: true
    },
    {
      id: 'TX-9022',
      counterparty: 'Shell Marine Fuels (VLSFO)',
      sub: 'Bunker Delivery #BDN-1102',
      category: 'Fuel Hedge',
      date: 'Aug 23, 2026',
      status: 'Completed',
      statusType: 'success',
      amount: '-$124,000.00',
      isPositive: false
    },
    {
      id: 'TX-9023',
      counterparty: 'Paradip Port Authority',
      sub: 'Berth Hire & Pilotage Tariffs',
      category: 'Port Dues',
      date: 'Aug 22, 2026',
      status: 'Reconciled',
      statusType: 'info',
      amount: '-$18,450.00',
      isPositive: false
    },
    {
      id: 'TX-9024',
      counterparty: 'Glencore Coal Cargo Laytime',
      sub: 'Quick Despatch Bonus Credit',
      category: 'Demurrage Credit',
      date: 'Aug 20, 2026',
      status: 'Completed',
      statusType: 'success',
      amount: '+$34,200.00',
      isPositive: true
    },
    {
      id: 'TX-9025',
      counterparty: 'Standard Chartered FX Treasury',
      sub: 'USD/INR Hedging Swap Contract',
      category: 'FX Forward',
      date: 'Aug 19, 2026',
      status: 'Pending',
      statusType: 'warning',
      amount: '-$500,000.00',
      isPositive: false
    },
    {
      id: 'TX-9026',
      counterparty: 'Anglo American Coking Coal',
      sub: 'Supramax Freight Wire #8912',
      category: 'Ocean Freight',
      date: 'Aug 18, 2026',
      status: 'Completed',
      statusType: 'success',
      amount: '+$390,000.00',
      isPositive: true
    }
  ];

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'settled') return matchesSearch && t.status === 'Completed';
    if (activeFilter === 'pending') return matchesSearch && t.status === 'Pending';
    return matchesSearch;
  });

  return (
    <section id="transactions-section" className="py-20 lg:py-28 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Transaction Ledger Card */}
          <div className="lg:col-span-7 text-left order-2 lg:order-1">
            <div className="w-full bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              
              {/* Ledger Filter & Search Header */}
              <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search counterparty, category, or TX ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-sans placeholder:text-gray-400 focus:outline-none focus:border-gray-900"
                  />
                </div>

                <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                  {(['all', 'settled', 'pending'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-2.5 py-1 rounded-md capitalize transition ${
                        activeFilter === f
                          ? 'bg-neutral-900 text-white font-semibold'
                          : 'hover:bg-gray-200/60'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transactions Table */}
              <div className="divide-y divide-gray-100 text-xs font-mono">
                {filtered.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 hover:bg-gray-50/80 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        {tx.isPositive ? (
                          <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-gray-700" />
                        )}
                      </div>
                      <div className="space-y-0.5 font-sans">
                        <div className="font-semibold text-gray-900 text-[13px] flex items-center gap-2">
                          {tx.counterparty}
                          <span className="text-[10px] font-mono text-gray-400">
                            {tx.id}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono">
                          {tx.sub} • <span className="text-gray-700 font-semibold">{tx.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 pl-11 sm:pl-0">
                      <div
                        className={`font-bold text-[13px] ${
                          tx.isPositive ? 'text-[#2E7D32]' : 'text-gray-900'
                        }`}
                      >
                        {tx.amount}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[9.5px] px-1.5 py-0.2 rounded font-semibold font-mono ${
                            tx.statusType === 'success'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : tx.statusType === 'warning'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {tx.status}
                        </span>
                        <span className="text-[10.5px] text-gray-400 font-sans">
                          {tx.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>Showing 6 verified ledger settlements</span>
                <span className="text-emerald-700 font-semibold">● Live Sync</span>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Key Highlights */}
          <div className="lg:col-span-5 text-left space-y-7 order-1 lg:order-2">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                Continuous Ledger Control
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight leading-tight">
                Every transaction, organized in real time.
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-normal">
                Never chase a missing charter invoice, bunker receipt, or port tariff voucher again. Every payment is automatically ingested, parsed, and mapped to its respective voyage ledger.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-5 pt-1 divide-y divide-gray-200/80">
              
              <div className="pt-4 first:pt-0 space-y-1">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Automatic Multi-Entity Categorization
                </h3>
                <p className="text-sm text-gray-500 pl-6 leading-relaxed">
                  Deep machine parsing identifies vessel IMO numbers, charter party reference codes, and billing jurisdictions automatically.
                </p>
              </div>

              <div className="pt-4 space-y-1">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Smart Bank Reconciliation
                </h3>
                <p className="text-sm text-gray-500 pl-6 leading-relaxed">
                  Real-time matching against MT940 statements, virtual IBANs, and ERP accounts with zero manual spreadsheet copying.
                </p>
              </div>

              <div className="pt-4 space-y-1">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Sub-Second Audit Verification
                </h3>
                <p className="text-sm text-gray-500 pl-6 leading-relaxed">
                  Immutable cryptographic timestamps on every transaction provide instant auditability for financial controllers and maritime insurers.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
