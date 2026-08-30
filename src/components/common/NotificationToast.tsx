import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-red-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-600 shrink-0" />
        };

        const bgColors = {
          success: 'bg-white border-l-4 border-l-emerald-600',
          warning: 'bg-white border-l-4 border-l-amber-600',
          error: 'bg-white border-l-4 border-l-red-600',
          info: 'bg-white border-l-4 border-l-blue-600'
        };

        return (
          <div
            key={n.id}
            className={`${bgColors[n.type]} rounded-xl shadow-civic-float border border-[#ddece3] p-4 pointer-events-auto flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200`}
          >
            <div className="flex items-start gap-2.5 min-w-0">
              {icons[n.type]}
              <div>
                <h4 className="text-xs font-bold text-primary leading-tight">{n.title}</h4>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-normal">{n.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-outline hover:text-on-surface p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
