import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import type { ContactMessage, MessageStatusFilter, ContactMessageStatus } from '../../types';
import { ContactDetailModal } from './ContactDetailModal';
import { ConfirmModal } from '../common/ConfirmModal';
import {
  Mail,
  Search,
  CheckCircle2,
  Archive,
  Trash2,
  Eye,
  CornerUpLeft,
  MailOpen,
  Inbox,
  Sparkles,
  User,
  AlertCircle
} from 'lucide-react';

export const ContactList: React.FC = () => {
  const {
    messages,
    updateMessageStatus,
    deleteContactMessage,
    archiveContactMessage,
    stats,
  } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<MessageStatusFilter>('all');

  // Selected message for detail modal
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Message to delete confirmation
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);

  // Filtered messages
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      // Status tab filter
      if (statusFilter !== 'all' && msg.status !== statusFilter) {
        return false;
      }

      // Search filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          msg.name.toLowerCase().includes(q) ||
          msg.email.toLowerCase().includes(q) ||
          msg.subject.toLowerCase().includes(q) ||
          msg.message.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [messages, statusFilter, searchTerm]);

  const handleOpenDetail = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setIsDetailOpen(true);

    // Automatically mark new message as read upon opening detail
    if (msg.status === 'new') {
      updateMessageStatus(msg.id, 'read');
    }
  };

  const renderStatusBadge = (status: ContactMessageStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2.5! py-1! bg-blue-100! text-blue-800! text-xs! font-semibold! rounded-full! inline-flex! items-center! gap-1!">
            <span className="w-1.5! h-1.5! rounded-full! bg-blue-600! animate-pulse!"></span>
            Nouveau
          </span>
        );
      case 'read':
        return <span className="px-2.5! py-1! bg-slate-200! text-slate-700! text-xs! font-semibold! rounded-full!">Lu</span>;
      case 'replied':
        return (
          <span className="px-2.5! py-1! bg-emerald-100! text-emerald-800! text-xs! font-semibold! rounded-full! inline-flex! items-center! gap-1!">
            <CheckCircle2 className="w-3! h-3! text-emerald-600!" />
            Répondu
          </span>
        );
      case 'archived':
        return (
          <span className="px-2.5! py-1! bg-[#745568]! text-white! text-xs! font-semibold! rounded-full! inline-flex! items-center! gap-1!">
            <Archive className="w-3! h-3!" />
            Archivé
          </span>
        );
    }
  };

  return (
    <div className="space-y-6!">
      {/* Header Banner with Prominent Counter */}
      <div className="flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4! bg-white! p-5! rounded-2xl! border! border-slate-200! shadow-2xs!">
        <div className="flex! items-center! gap-3!">
          <div className="w-12! h-12! bg-teal-50! text-[#004851]! rounded-2xl! flex! items-center! justify-center! shrink-0!">
            <Mail className="w-6! h-6!" />
          </div>
          <div>
            <h1 className="text-xl! font-bold! text-[#1E2626]!">Gestion des Contacts</h1>
            <p className="text-xs! text-slate-500! mt-0.5!">
              Messages reçus depuis le formulaire de contact du site.
            </p>
          </div>
        </div>

        {/* Unread Counter Badge */}
        <div className="flex! items-center! gap-3! bg-slate-50! p-3! rounded-xl! border! border-slate-200/80!">
          <div className="text-right!">
            <span className="text-xs! text-slate-500! block!">Nouveaux messages</span>
            <span className="text-lg! font-extrabold! text-[#004851]!">{stats.unreadMessages} non lu(s)</span>
          </div>
          {stats.unreadMessages > 0 && (
            <span className="w-3! h-3! rounded-full! bg-blue-600! animate-ping!"></span>
          )}
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex! flex-col! md:flex-row! items-stretch! md:items-center! justify-between! gap-4! bg-white! p-4! rounded-2xl! border! border-slate-200! shadow-2xs!">
        {/* Status Filter Tabs */}
        <div className="flex! items-center! gap-1! overflow-x-auto! pb-1! md:pb-0!">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5! py-2! text-xs! font-semibold! rounded-xl! transition-colors! shrink-0! cursor-pointer! ${
              statusFilter === 'all'
                ? 'bg-[#004851]! text-white! shadow-2xs!'
                : 'bg-slate-100! text-slate-600! hover:bg-slate-200!'
            }`}
          >
            Tous ({messages.length})
          </button>
          <button
            onClick={() => setStatusFilter('new')}
            className={`px-3.5! py-2! text-xs! font-semibold! rounded-xl! transition-colors! shrink-0! flex! items-center! gap-1.5! cursor-pointer! ${
              statusFilter === 'new'
                ? 'bg-blue-600! text-white! shadow-2xs!'
                : 'bg-blue-50! text-blue-700! hover:bg-blue-100!'
            }`}
          >
            Nouveaux
            <span className="px-1.5! py-0.5! bg-white/20! text-current! text-[10px]! rounded-full!">
              {stats.unreadMessages}
            </span>
          </button>
          <button
            onClick={() => setStatusFilter('read')}
            className={`px-3.5! py-2! text-xs! font-semibold! rounded-xl! transition-colors! shrink-0! cursor-pointer! ${
              statusFilter === 'read'
                ? 'bg-slate-700! text-white! shadow-2xs!'
                : 'bg-slate-100! text-slate-600! hover:bg-slate-200!'
            }`}
          >
            Lus ({messages.filter((m) => m.status === 'read').length})
          </button>
          <button
            onClick={() => setStatusFilter('replied')}
            className={`px-3.5! py-2! text-xs! font-semibold! rounded-xl! transition-colors! shrink-0! cursor-pointer! ${
              statusFilter === 'replied'
                ? 'bg-emerald-600! text-white! shadow-2xs!'
                : 'bg-emerald-50! text-emerald-800! hover:bg-emerald-100!'
            }`}
          >
            Répondus ({stats.repliedMessages})
          </button>
          <button
            onClick={() => setStatusFilter('archived')}
            className={`px-3.5! py-2! text-xs! font-semibold! rounded-xl! transition-colors! shrink-0! cursor-pointer! ${
              statusFilter === 'archived'
                ? 'bg-[#745568]! text-white! shadow-2xs!'
                : 'bg-[#745568]/10! text-[#745568]! hover:bg-[#745568]/20!'
            }`}
          >
            Archivés ({stats.archivedMessages})
          </button>
        </div>

        {/* Search */}
        <div className="relative! flex-1! md:max-w-xs!">
          <Search className="w-4! h-4! text-slate-400! absolute! left-3.5! top-1/2! -translate-y-1/2!" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nom, email ou sujet..."
            className="w-full! pl-10! pr-4! py-2! text-sm! bg-slate-50! border! border-slate-200! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#004851]/20! focus:border-[#004851]! text-[#1E2626]!"
          />
        </div>
      </div>

      {/* Messages Table */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white! rounded-2xl! border! border-slate-200! p-12! text-center! space-y-3!">
          <div className="w-12! h-12! bg-slate-100! rounded-full! flex! items-center! justify-center! mx-auto! text-slate-400!">
            <Inbox className="w-6! h-6!" />
          </div>
          <h3 className="text-base! font-bold! text-[#1E2626]!">Aucun message trouvé</h3>
          <p className="text-xs! text-slate-500! max-w-sm! mx-auto!">
            {searchTerm
              ? `Aucun message ne correspond à la recherche "${searchTerm}".`
              : 'Aucun message dans cette catégorie pour le moment.'}
          </p>
        </div>
      ) : (
        <div className="bg-white! rounded-2xl! border! border-slate-200! shadow-2xs! overflow-hidden!">
          <div className="overflow-x-auto!">
            <table className="w-full! text-left! border-collapse!">
              <thead>
                <tr className="bg-slate-50/80! border-b! border-slate-200! text-xs! font-bold! text-slate-600! uppercase! tracking-wider!">
                  <th className="py-3.5! px-4!">Expéditeur</th>
                  <th className="py-3.5! px-4!">Sujet & Aperçu</th>
                  <th className="py-3.5! px-4!">Date</th>
                  <th className="py-3.5! px-4!">Statut</th>
                  <th className="py-3.5! px-4! text-right!">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y! divide-slate-100! text-sm!">
                {filteredMessages.map((msg) => {
                  const isNew = msg.status === 'new';
                  return (
                    <tr
                      key={msg.id}
                      className={`hover:bg-slate-50/80! transition-colors! ${
                        isNew ? 'bg-blue-50/30! font-medium!' : ''
                      }`}
                    >
                      {/* Expéditeur (Nom + Email) */}
                      <td className="py-3.5! px-4!">
                        <div className="flex! items-center! gap-3!">
                          <div className="w-9! h-9! rounded-full! bg-slate-100! text-[#004851]! font-bold! text-xs! flex! items-center! justify-center! shrink-0! border! border-slate-200!">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold! text-[#1E2626]! block! leading-tight!">{msg.name}</span>
                            <span className="text-xs! text-slate-500! block! mt-0.5!">{msg.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Sujet & Message */}
                      <td className="py-3.5! px-4! max-w-xs! sm:max-w-md!">
                        <button
                          onClick={() => handleOpenDetail(msg)}
                          className="text-left! group! cursor-pointer!"
                        >
                          <span className={`block! text-[#1E2626]! group-hover:text-[#004851]! transition-colors! line-clamp-1! ${isNew ? 'font-bold! text-[#004851]!' : 'font-medium!'}`}>
                            {msg.subject}
                          </span>
                          <span className="text-xs! text-slate-500! line-clamp-1! mt-0.5!">{msg.message}</span>
                        </button>
                      </td>

                      {/* Date */}
                      <td className="py-3.5! px-4! text-xs! text-slate-500! whitespace-nowrap!">
                        {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {/* Statut Badge */}
                      <td className="py-3.5! px-4! whitespace-nowrap!">{renderStatusBadge(msg.status)}</td>

                      {/* Actions */}
                      <td className="py-3.5! px-4! text-right! whitespace-nowrap!">
                        <div className="flex! items-center! justify-end! gap-1!">
                          {/* Voir détail */}
                          <button
                            onClick={() => handleOpenDetail(msg)}
                            title="Consulter le message"
                            className="p-1.5! text-slate-500! hover:text-[#004851]! hover:bg-teal-50! rounded-lg! transition-colors! cursor-pointer!"
                          >
                            <Eye className="w-4! h-4!" />
                          </button>

                          {/* Quick Mark Read or Replied */}
                          {msg.status === 'new' && (
                            <button
                              onClick={() => updateMessageStatus(msg.id, 'read')}
                              title="Marquer comme lu"
                              className="p-1.5! text-slate-500! hover:text-slate-800! hover:bg-slate-100! rounded-lg! transition-colors! cursor-pointer!"
                            >
                              <MailOpen className="w-4! h-4!" />
                            </button>
                          )}

                          {msg.status !== 'replied' && (
                            <button
                              onClick={() => handleOpenDetail(msg)}
                              title="Répondre"
                              className="p-1.5! text-slate-500! hover:text-[#004851]! hover:bg-teal-50! rounded-lg! transition-colors! cursor-pointer!"
                            >
                              <CornerUpLeft className="w-4! h-4!" />
                            </button>
                          )}

                          {/* Archive */}
                          {msg.status !== 'archived' && (
                            <button
                              onClick={() => archiveContactMessage(msg.id)}
                              title="Archiver"
                              className="p-1.5! text-slate-500! hover:text-[#745568]! hover:bg-[#745568]/10! rounded-lg! transition-colors! cursor-pointer!"
                            >
                              <Archive className="w-4! h-4!" />
                            </button>
                          )}

                          {/* Supprimer */}
                          <button
                            onClick={() => setMessageToDelete(msg)}
                            title="Supprimer"
                            className="p-1.5! text-slate-500! hover:text-rose-600! hover:bg-rose-50! rounded-lg! transition-colors! cursor-pointer!"
                          >
                            <Trash2 className="w-4! h-4!" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail & Reply Modal */}
      <ContactDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        message={selectedMessage}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!messageToDelete}
        title="Supprimer ce message ?"
        message={`Êtes-vous sûr de vouloir supprimer définitivement le message de ${messageToDelete?.name} ("${messageToDelete?.subject}") ?`}
        confirmText="Oui, supprimer"
        cancelText="Annuler"
        variant="danger"
        onClose={() => setMessageToDelete(null)}
        onConfirm={() => {
          if (messageToDelete) {
            deleteContactMessage(messageToDelete.id);
            setMessageToDelete(null);
          }
        }}
      />
    </div>
  );
};