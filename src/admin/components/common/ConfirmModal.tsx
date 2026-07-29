import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'danger',
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! p-4! bg-slate-900/50! backdrop-blur-xs! animate-in! fade-in! duration-200!">
      <div className="bg-white! rounded-2xl! shadow-xl! max-w-md! w-full! p-6! border! border-slate-100! relative!">
        <button
          onClick={onClose}
          className="absolute! top-4! right-4! text-slate-400! hover:text-slate-600! p-1! rounded-lg! transition-colors!"
        >
          <X className="w-5! h-5!" />
        </button>

        <div className="flex! items-center! gap-4!">
          <div
            className={`w-12! h-12! rounded-full! flex! items-center! justify-center! shrink-0! ${
              variant === 'danger'
                ? 'bg-rose-100! text-rose-600!'
                : variant === 'warning'
                ? 'bg-amber-100! text-amber-600!'
                : 'bg-teal-100! text-[#004851]!'
            }`}
          >
            <AlertTriangle className="w-6! h-6!" />
          </div>

          <div>
            <h3 className="text-lg! font-bold! text-[#1E2626]!">{title}</h3>
            <p className="text-sm! text-slate-600! mt-1!">{message}</p>
          </div>
        </div>

        <div className="flex! items-center! justify-end! gap-3! mt-6! pt-4! border-t! border-slate-100!">
          <button
            type="button"
            onClick={onClose}
            className="px-4! py-2! text-sm! font-medium! text-slate-700! bg-slate-100! hover:bg-slate-200! rounded-xl! transition-colors! cursor-pointer!"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4! py-2! text-sm! font-medium! text-white! rounded-xl! shadow-xs! transition-colors! cursor-pointer! ${
              variant === 'danger'
                ? 'bg-rose-600! hover:bg-rose-700!'
                : variant === 'warning'
                ? 'bg-amber-600! hover:bg-amber-700!'
                : 'bg-[#004851]! hover:bg-[#00363d]!'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};