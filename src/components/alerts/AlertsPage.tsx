import React, { useState } from 'react';
import { Clock, DollarSign, Check } from 'lucide-react';
import { RiskAlert } from '../../types';
import { useToast } from '../layout/Toast';
import { useTheme } from '../../context/ThemeContext';

interface AlertsPageProps {
  alerts: RiskAlert[];
  onReviewAlert: (id: string) => Promise<void>;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({ alerts, onReviewAlert }) => {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isLight = theme === 'light';
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

  const cardBorder = isLight ? 'border-[#E4E4E7]' : 'border-[#D0D0D0]';
  const innerBg = isLight ? 'bg-[#F8F8F9]' : 'bg-[#F9FAFB]';
  const textTitle = isLight ? 'text-[#18181B]' : 'text-black';
  const textSecondary = isLight ? 'text-[#71717A]' : 'text-gray-600';

  return (
    <div id="alerts-page-container" className="space-y-4 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className={`bg-white rounded-[6px] border ${cardBorder} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
        <div>
          <h2 className={`text-[16px] sm:text-[17px] font-semibold ${textTitle} uppercase tracking-wider`}>
            Maritime Risk Signals & Port Advisories
          </h2>
          <p className={`text-[12.5px] ${textSecondary} mt-0.5 font-normal`}>
            Port congestion indices, Bay of Bengal monsoon wave warnings, and fuel price volatility triggers.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex gap-1 text-xs">
          {(['all', 'high', 'medium', 'low'] as const).map(sev => {
            const isSel = severityFilter === sev;
            let btnClasses = '';
            if (isLight) {
              btnClasses = isSel
                ? 'bg-[#18181B] text-white font-medium shadow-2xs'
                : 'bg-white text-[#52525B] border border-[#E4E4E7] hover:bg-[#F4F4F5] hover:text-[#18181B] font-medium';
            } else {
              btnClasses = isSel
                ? 'bg-black text-white font-medium'
                : 'bg-white text-gray-700 border border-[#D0D0D0] hover:bg-gray-50 font-medium';
            }

            return (
              <button
                key={sev}
                id={`filter-alert-${sev}`}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1.5 rounded-[4px] uppercase transition cursor-pointer ${btnClasses}`}
              >
                {sev} ({sev === 'all' ? alerts.length : alerts.filter(a => a.severity === sev).length})
              </button>
            );
          })}
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
              className={`bg-white rounded-[6px] border ${cardBorder} p-4 sm:p-5 flex flex-col justify-between`}
            >
              <div>
                {/* Alert Top */}
                <div className={`flex items-start justify-between gap-2 pb-3 border-b ${cardBorder}`}>
                  <div>
                    <h3 className={`font-semibold text-[13.5px] ${textTitle}`}>{alert.title}</h3>
                    <span className={`text-[11px] ${textSecondary} mt-0.5 block font-normal`}>
                      {alert.portName ? `Port: ${alert.portName}` : 'Macro Freight Signal'}
                    </span>
                  </div>

                  <span
                    className={`text-[10.5px] font-medium px-2 py-0.5 rounded-[4px] uppercase tracking-wider border ${
                      isHigh
                        ? 'bg-[#FEE2E2] text-[#D32F2F] border-[#FECACA]'
                        : isMedium
                        ? 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]'
                        : 'bg-[#DCFCE7] text-[#2E7D32] border-[#BBF7D0]'
                    }`}
                  >
                    {alert.severity} Risk
                  </span>
                </div>

                <p className={`text-[12.5px] ${isLight ? 'text-[#3F3F46]' : 'text-gray-700'} my-3 leading-relaxed font-normal`}>
                  {alert.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2.5 text-xs my-3">
                  <div className={`p-2.5 rounded-[4px] ${innerBg} border ${cardBorder} flex items-center gap-2`}>
                    <Clock className={`w-3.5 h-3.5 ${isLight ? 'text-[#71717A]' : 'text-gray-500'}`} />
                    <div>
                      <span className={`text-[10px] ${textSecondary} uppercase block font-normal`}>Est. Congestion</span>
                      <strong className={`${textTitle} text-[11.5px] font-medium`}>{alert.estimatedDelayDays || 'Negligible'}</strong>
                    </div>
                  </div>

                  <div className={`p-2.5 rounded-[4px] ${innerBg} border ${cardBorder} flex items-center gap-2`}>
                    <DollarSign className={`w-3.5 h-3.5 ${isLight ? 'text-[#71717A]' : 'text-gray-500'}`} />
                    <div>
                      <span className={`text-[10px] ${textSecondary} uppercase block font-normal`}>Cost Exposure</span>
                      <strong className={`${textTitle} text-[11.5px] font-medium`}>
                        {alert.costImpactUsdPerTonne ? (
                          <>
                            <span className="text-[#2E7D32]">+${alert.costImpactUsdPerTonne.toFixed(2)}</span>
                            <span className="text-gray-500 font-normal">/MT</span>
                          </>
                        ) : (
                          'Nominal'
                        )}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Mitigation */}
                <div className={`p-3 rounded-[4px] ${innerBg} border ${cardBorder} text-xs space-y-0.5`}>
                  <span className={`${textTitle} font-medium block text-[11px] uppercase tracking-wider`}>
                    Charterer Mitigation Advisory
                  </span>
                  <p className={`text-[11.5px] leading-relaxed ${isLight ? 'text-[#52525B]' : 'text-gray-700'} font-normal`}>{alert.mitigationAdvice}</p>
                </div>
              </div>

              {/* Footer */}
              <div className={`mt-3.5 pt-3 border-t ${cardBorder} flex items-center justify-between text-xs ${textSecondary}`}>
                <span className="font-normal">Updated: {alert.updatedAt}</span>

                <button
                  onClick={(e) => handleReview(alert.id, e)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-[4px] border text-[11.5px] font-medium transition cursor-pointer ${
                    isLight
                      ? 'bg-white hover:bg-[#F4F4F5] border-[#E4E4E7] text-[#18181B]'
                      : 'bg-white hover:bg-gray-50 border-[#D0D0D0] text-black'
                  }`}
                >
                  <Check className={`w-3 h-3 ${isLight ? 'text-[#18181B]' : 'text-black'}`} />
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
