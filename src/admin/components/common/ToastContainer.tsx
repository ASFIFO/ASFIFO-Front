import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useData();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed! bottom-5! right-5! z-50! flex! flex-col! gap-2! max-w-md! w-full! pointer-events-none! px-4! sm:px-0!">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto! flex! items-start! gap-3! p-4! rounded-xl! shadow-lg! border! transition-all! duration-300! animate-in! fade-in! slide-in-from-bottom-3! ${
              isSuccess
                ? 'bg-emerald-50! border-emerald-200! text-emerald-900!'
                : isError
                ? 'bg-rose-50! border-rose-200! text-rose-900!'
                : isWarning
                ? 'bg-amber-50! border-amber-200! text-amber-900!'
                : 'bg-slate-900! border-slate-800! text-white!'
            }`}
          >
            <div className="mt-0.5! shrink-0!">
              {isSuccess && <CheckCircle2 className="w-5! h-5! text-emerald-600!" />}
              {isError && <AlertCircle className="w-5! h-5! text-rose-600!" />}
              {isWarning && <AlertTriangle className="w-5! h-5! text-amber-600!" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5! h-5! text-teal-400!" />}
            </div>

            <div className="flex-1! text-sm!">
              <h4 className="font-semibold! leading-tight!">{toast.title}</h4>
              {toast.message && <p className="mt-1! opacity-90! text-xs! sm:text-sm!">{toast.message}</p>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-70! hover:opacity-100! p-1! rounded-md! transition-opacity!"
              aria-label="Fermer la notification"
            >
              <X className="w-4! h-4!" />
            </button>
          </div>
        );
      })}
    </div>
  );
};