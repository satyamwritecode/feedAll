import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast({ notification, onClose }) {
  if (!notification) return null;

  const { message, type = 'info' } = notification;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-slideUp">
      <div className={`p-4 rounded-2xl shadow-2xl border flex items-center justify-between gap-3 text-white ${
        type === 'success' ? 'bg-forest-900 border-forest-700' :
        type === 'error' ? 'bg-rose-900 border-rose-700' :
        'bg-slate-900 border-slate-700'
      }`}>
        <div className="flex items-center gap-3">
          {type === 'success' ? (
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-brand-orange">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : type === 'error' ? (
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300">
              <AlertCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-1.5 rounded-lg bg-brand-orange/20 text-brand-orange">
              <Info className="w-5 h-5" />
            </div>
          )}
          <p className="text-xs font-semibold">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
