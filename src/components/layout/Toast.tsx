import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div id="toast-container" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none font-sans">
        {toasts.map(toast => {
          let Icon = Info;
          if (toast.type === 'success') {
            Icon = CheckCircle2;
          } else if (toast.type === 'warning') {
            Icon = AlertTriangle;
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
          }

          return (
            <div
              key={toast.id}
              id={toast.id}
              className="pointer-events-auto p-3.5 rounded-[4px] border border-[#D0D0D0] shadow-md bg-white text-gray-900 flex items-start gap-2.5 transition-all"
            >
              <Icon className="w-4 h-4 mt-0.5 shrink-0 text-black" />
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold text-black">{toast.title}</p>
                {toast.message && <p className="text-[11.5px] text-gray-600 mt-0.5">{toast.message}</p>}
              </div>
              <button
                id={`close-${toast.id}`}
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-black p-0.5 rounded transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
