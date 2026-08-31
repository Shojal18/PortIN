import React, { useState } from 'react';
import { Clock, DollarSign, Check } from 'lucide-react';
import { RiskAlert } from '../../types';
import { useToast } from '../layout/Toast';

interface AlertsPageProps {
  alerts: RiskAlert[];
  onReviewAlert: (id: string) => Promise<void>;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({ alerts, onReviewAlert }) => {
  const { showToast } = useToast();
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredAlerts = alerts.filter(a => {
    if (severityFilter === 'all') return true;
    return a.severity === severityFilter;
  });

  const handleReview = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await onReviewAlert(id);
      showToast('success', 'Alert Acknowledged', 'Risk mitigation status updated.');
    } catch (err: any) {
      showToast('error', 'Update Failed', err.message);
    }
  };

  return (
    <div id="alerts-page-container" className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0A33A]" />
            <h2 className="text-[17px] sm:text-[19px] font-bold text-white uppercase tracking-wider">
              Maritime Risk Signals & Port Advisories
            </h2>
          </div>
          <p className="text-[13px] text-slate-400 mt-1">
            Port congestion indices, Bay of Bengal monsoon wave warnings, and fuel price volatility triggers.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex bg-[#071522] p-1 rounded-[6px] border border-[#183A52] gap-1 text-xs font-mono">
          {(['all', 'high', 'medium', 'low'] as const).map(sev => (
            <button
              key={sev}
              id={`filter-alert-${sev}`}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-[4px] uppercase font-bold transition cursor-pointer ${
                severityFilter === sev
                  ? 'bg-[#102337] text-[#12A6A6] shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev} ({sev === 'all' ? alerts.length : alerts.filter(a => a.severity === sev).length})
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.map(alert => {
          const isHigh = alert.severity === 'high';
          const isMedium = alert.severity === 'medium';

          return (
            <div
              key={alert.id}
              id={`alert-card-${alert.id}`}
              className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Alert Top */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#183A52]">
                  <div>
                    <h3 className="font-bold text-[14px] text-white">{alert.title}</h3>
                    <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                      {alert.portName ? `Port: ${alert.portName}` : 'Macro Freight Signal'}
                    </span>
                  </div>

                  <span
                    className={`text-[10.5px] font-bold font-mono px-2 py-0.5 rounded uppercase ${
                      isHigh
                        ? 'bg-[#3E1A24] text-[#E05252] border border-[#5C2332]'
                        : isMedium
                        ? 'bg-[#3D2C10] text-[#E0A33A] border border-[#593E15]'
                        : 'bg-[#0A3D2E] text-[#20B26B] border border-[#14533D]'
                    }`}
                  >
                    {alert.severity} Risk
                  </span>
                </div>

                <p className="text-[12.5px] text-slate-300 my-3 leading-relaxed">
                  {alert.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs my-3 font-mono">
                  <div className="p-2.5 rounded-[4px] bg-[#071522] border border-[#183A52] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-[10.5px] text-slate-400 uppercase block">Est. Congestion</span>
                      <strong className="text-white text-[12px]">{alert.estimatedDelayDays || 'Negligible'}</strong>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-[4px] bg-[#071522] border border-[#183A52] flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-[10.5px] text-slate-400 uppercase block">Cost Exposure</span>
                      <strong className="text-white text-[12px]">
                        {alert.costImpactUsdPerTonne ? `+$${alert.costImpactUsdPerTonne.toFixed(2)}/MT` : 'Nominal'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Mitigation */}
                <div className="p-3 rounded-[6px] bg-[#102337] border border-[#183A52] text-xs text-slate-300 space-y-1">
                  <span className="text-[#12A6A6] font-bold block text-[11px] uppercase tracking-wider font-mono">
                    Charterer Mitigation Advisory
                  </span>
                  <p className="text-[12px] leading-relaxed font-sans">{alert.mitigationAdvice}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-[#183A52] flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Updated: {alert.updatedAt}</span>

                <button
                  onClick={(e) => handleReview(alert.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#102A43] hover:bg-[#153655] border border-[#183A52] text-[#12A6A6] text-[11.5px] font-bold transition cursor-pointer uppercase"
                >
                  <Check className="w-3.5 h-3.5 text-[#20B26B]" />
                  <span>Acknowledge</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
