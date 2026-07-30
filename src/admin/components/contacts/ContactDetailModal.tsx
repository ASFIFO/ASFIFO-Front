import React, { useState } from "react";
import type { ContactMessage, ContactMessageStatus } from "../../types";
import { useData } from "../../hooks/useData";
import {
  X,
  Send,
  CheckCircle2,
  Archive,
  Trash2,
  Calendar,
  CornerUpLeft,
  MessageSquare,
} from "lucide-react";

interface ContactDetailModalProps {
  message: ContactMessage | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDetailModal: React.FC<ContactDetailModalProps> = ({
  message,
  isOpen,
  onClose,
}) => {
  const {
    updateMessageStatus,
    replyToMessage,
    deleteContactMessage,
    archiveContactMessage,
  } = useData();
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  if (!isOpen || !message) return null;

  const formattedDate = new Date(message.created_at).toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    replyToMessage(message.id, replyText);
    setReplyText("");
    setShowReplyForm(false);
  };

  const statusBadge = (status: ContactMessageStatus) => {
    switch (status) {
      case "new":
        return (
          <span className="px-3! py-1! bg-blue-100! text-blue-800! rounded-full! text-xs! font-semibold!">
            Nouveau
          </span>
        );
      case "read":
        return (
          <span className="px-3! py-1! bg-slate-200! text-slate-700! rounded-full! text-xs! font-semibold!">
            Lu
          </span>
        );
      case "replied":
        return (
          <span className="px-3! py-1! bg-emerald-100! text-emerald-800! rounded-full! text-xs! font-semibold!">
            Répondu
          </span>
        );
      case "archived":
        return (
          <span className="px-3! py-1! bg-[#745568]! text-white! rounded-full! text-xs! font-semibold!">
            Archivé
          </span>
        );
    }
  };

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! p-4! bg-slate-900/50! backdrop-blur-xs! animate-in! fade-in! duration-200!">
      <div className="bg-white! rounded-2xl! shadow-2xl! max-w-2xl! w-full! p-6! sm:p-8! border! border-slate-100! relative! max-h-[90vh]! flex! flex-col!">
        {/* Header */}
        <div className="flex! items-center! justify-between! pb-4! border-b! border-slate-100! shrink-0!">
          <div className="flex! items-center! gap-3!">
            <div className="w-10! h-10! rounded-full! bg-teal-50! text-[#004851]! flex! items-center! justify-center! font-bold! text-lg!">
              {message.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold! text-[#1E2626]! text-base!">
                {message.name}
              </h3>
              <a
                href={`mailto:${message.email}`}
                className="text-xs! text-[#004851]! hover:underline!"
              >
                {message.email}
              </a>
              {message.phone && (
                <a
                  href={`tel:${message.phone}`}
                  className="text-xs! text-slate-500! hover:underline! block!"
                >
                  {message.phone}
                </a>
              )}
            </div>
          </div>

          <div className="flex! items-center! gap-2!">
            {statusBadge(message.status)}
            <button
              onClick={onClose}
              className="text-slate-400! hover:text-slate-600! p-1.5! rounded-lg! hover:bg-slate-100! transition-colors! cursor-pointer!"
            >
              <X className="w-5! h-5!" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1! overflow-y-auto! py-6! space-y-6! pr-1!">
          {/* Sujet & Date */}
          <div className="bg-slate-50! p-4! rounded-xl! border! border-slate-200/80! space-y-2!">
            <div className="flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-2!">
              <span className="text-xs! font-bold! text-[#745568]! uppercase! tracking-wider!">
                Sujet du message
              </span>
              <span className="text-xs! text-slate-500! flex! items-center! gap-1!">
                <Calendar className="w-3.5! h-3.5! text-slate-400!" />
                {formattedDate}
              </span>
            </div>
            <h2 className="text-lg! font-bold! text-[#1E2626]!">
              {message.subject}
            </h2>
          </div>

          {/* Message Content */}
          <div className="space-y-2!">
            <span className="text-xs! font-bold! text-slate-500! uppercase! tracking-wider! flex! items-center! gap-1.5!">
              <MessageSquare className="w-4! h-4! text-[#004851]!" />
              Contenu du message
            </span>
            <div className="p-4! bg-white! border! border-slate-200! rounded-xl! text-sm! leading-relaxed! text-[#1E2626]! whitespace-pre-wrap!">
              {message.message}
            </div>
          </div>

          {/* Previous Reply notes if replied */}
          {message.status === "replied" && message.reply_notes && (
            <div className="p-4! bg-emerald-50! border! border-emerald-200! rounded-xl! text-sm! space-y-1!">
              <div className="flex! items-center! gap-1.5! text-emerald-800! font-semibold! text-xs!">
                <CheckCircle2 className="w-4! h-4! text-emerald-600!" />
                Réponse enregistrée le{" "}
                {message.replied_at
                  ? new Date(message.replied_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
              <p className="text-emerald-900! text-xs! sm:text-sm! whitespace-pre-wrap! pl-5!">
                {message.reply_notes}
              </p>
            </div>
          )}

          {/* Quick Reply Form */}
          {showReplyForm ? (
            <form
              onSubmit={handleSendReply}
              className="space-y-3! p-4! bg-slate-50! rounded-xl! border! border-slate-200!"
            >
              <div className="flex! items-center! justify-between!">
                <label className="text-xs! font-bold! text-[#004851]! flex! items-center! gap-1.5!">
                  <CornerUpLeft className="w-4! h-4!" /> Répondre à{" "}
                  {message.name} ({message.email})
                </label>
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="text-xs! text-slate-500! hover:text-slate-800!"
                >
                  Annuler
                </button>
              </div>

              {/* Template quick fills */}
              <div className="flex! flex-wrap! items-center! gap-1.5! text-xs! text-slate-600!">
                <span className="text-[11px]! font-medium! text-slate-400!">
                  Modèles rapides :
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setReplyText(
                      `Bonjour ${message.name},\n\nMerci pour votre message concernant "${message.subject}". Nous avons bien pris en compte votre demande et revenons vers vous rapidement.\n\nBien cordialement,\nL'équipe administrative`,
                    )
                  }
                  className="px-2! py-1! bg-white! border! border-slate-200! rounded-md! hover:bg-slate-100! text-[11px]!"
                >
                  Accusé de réception
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setReplyText(
                      `Bonjour ${message.name},\n\nMerci de votre intérêt. Pouvons-nous convenir d'un rendez-vous téléphonique cette semaine ?\n\nCordialement,\nSophie Martin`,
                    )
                  }
                  className="px-2! py-1! bg-white! border! border-slate-200! rounded-md! hover:bg-slate-100! text-[11px]!"
                >
                  Demande de RDV
                </button>
              </div>

              <textarea
                rows={4}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Rédigez votre réponse..."
                className="w-full! p-3! text-xs! sm:text-sm! bg-white! border! border-slate-200! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#004851]/20! focus:border-[#004851]!"
              />

              <div className="flex! justify-end! gap-2!">
                <button
                  type="submit"
                  className="px-4! py-2! text-xs! font-semibold! text-white! bg-[#004851]! hover:bg-[#00363d]! rounded-xl! flex! items-center! gap-2! cursor-pointer! shadow-2xs!"
                >
                  <Send className="w-3.5! h-3.5!" />
                  Envoyer et marquer "Répondu"
                </button>
              </div>
            </form>
          ) : (
            <div className="flex! flex-wrap! items-center! gap-2!">
              <button
                type="button"
                onClick={() => setShowReplyForm(true)}
                className="px-4! py-2! text-xs! font-semibold! text-white! bg-[#004851]! hover:bg-[#00363d]! rounded-xl! flex! items-center! gap-2! cursor-pointer! shadow-2xs!"
              >
                <CornerUpLeft className="w-3.5! h-3.5!" />
                Répondre au message
              </button>

              {message.status !== "read" && message.status !== "replied" && (
                <button
                  type="button"
                  onClick={() => updateMessageStatus(message.id, "read")}
                  className="px-3! py-2! text-xs! font-medium! text-slate-700! bg-slate-100! hover:bg-slate-200! rounded-xl! cursor-pointer!"
                >
                  Marquer comme lu
                </button>
              )}

              {message.status !== "archived" && (
                <button
                  type="button"
                  onClick={() => {
                    archiveContactMessage(message.id);
                    onClose();
                  }}
                  className="px-3! py-2! text-xs! font-medium! text-[#745568]! bg-[#745568]/10! hover:bg-[#745568]/20! rounded-xl! flex! items-center! gap-1.5! cursor-pointer!"
                >
                  <Archive className="w-3.5! h-3.5!" />
                  Archiver
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex! items-center! justify-between! pt-4! border-t! border-slate-100! shrink-0!">
          <button
            onClick={() => {
              deleteContactMessage(message.id);
              onClose();
            }}
            className="text-xs! font-medium! text-rose-600! hover:text-rose-700! flex! items-center! gap-1! cursor-pointer!"
          >
            <Trash2 className="w-4! h-4!" />
            Supprimer ce message
          </button>

          <button
            onClick={onClose}
            className="px-4! py-2! text-xs! font-medium! text-slate-700! bg-slate-100! hover:bg-slate-200! rounded-xl! cursor-pointer!"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
