import React from 'react';
import type { Article } from '../../types';
import { X, Calendar, User, Eye, Sparkles, Tag, CheckCircle2, Clock } from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (article: Article) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !article) return null;

  const formattedDate = new Date(article.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! p-4! bg-slate-900/50! backdrop-blur-xs! animate-in! fade-in! duration-200!">
      <div className="bg-white! rounded-2xl! shadow-2xl! max-w-3xl! w-full! p-6! sm:p-8! border! border-slate-100! relative! max-h-[90vh]! flex! flex-col!">
        {/* Header toolbar */}
        <div className="flex! items-center! justify-between! pb-4! border-b! border-slate-100! shrink-0!">
          <div className="flex! items-center! gap-2!">
            <span
              className={`inline-flex! items-center! gap-1! px-3! py-1! rounded-full! text-xs! font-semibold! ${
                article.is_published ? 'bg-emerald-100! text-emerald-800!' : 'bg-slate-100! text-slate-700!'
              }`}
            >
              {article.is_published ? (
                <>
                  <CheckCircle2 className="w-3.5! h-3.5!" /> Publié
                </>
              ) : (
                <>
                  <Clock className="w-3.5! h-3.5!" /> Brouillon
                </>
              )}
            </span>

            {article.featured && (
              <span className="inline-flex! items-center! gap-1! px-3! py-1! bg-[#745568]! text-white! rounded-full! text-xs! font-semibold!">
                <Sparkles className="w-3.5! h-3.5! fill-current!" /> Mis en avant
              </span>
            )}
          </div>

          <div className="flex! items-center! gap-2!">
            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(article);
                }}
                className="px-3! py-1.5! text-xs! font-medium! text-[#004851]! bg-teal-50! hover:bg-teal-100! rounded-lg! transition-colors! cursor-pointer!"
              >
                Modifier
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400! hover:text-slate-600! p-1.5! rounded-lg! hover:bg-slate-100! transition-colors! cursor-pointer!"
            >
              <X className="w-5! h-5!" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1! overflow-y-auto! py-6! space-y-6! pr-1!">
          {/* Article Header & Image */}
          <div className="space-y-4!">
            <h1 className="text-2xl! sm:text-3xl! font-extrabold! text-[#1E2626]! leading-tight!">
              {article.title}
            </h1>

            <div className="flex! flex-wrap! items-center! gap-4! text-xs! text-slate-500! pb-2! border-b! border-slate-100!">
              <span className="flex! items-center! gap-1.5!">
                <User className="w-4! h-4! text-[#745568]!" /> {article.author}
              </span>
              <span className="flex! items-center! gap-1.5!">
                <Calendar className="w-4! h-4! text-[#745568]!" /> {formattedDate}
              </span>
              <span className="flex! items-center! gap-1.5!">
                <Eye className="w-4! h-4! text-[#745568]!" /> {article.views} vues
              </span>
            </div>

            {article.excerpt && (
              <p className="text-base! font-medium! text-slate-700! italic! bg-slate-50! p-4! rounded-xl! border-l-4! border-[#004851]!">
                {article.excerpt}
              </p>
            )}

            {article.image_url && (
              <div className="rounded-2xl! overflow-hidden! max-h-72! border! border-slate-200! shadow-sm!">
                <img src={article.image_url} alt={article.title} className="w-full! h-full! object-cover!" />
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex! flex-wrap! items-center! gap-2!">
              <span className="text-xs! font-semibold! text-slate-500! mr-1! flex! items-center! gap-1!">
                <Tag className="w-3.5! h-3.5! text-[#745568]!" /> Tags :
              </span>
              {article.tags.map((tag, idx) => (
                <span key={idx} className="px-3! py-1! bg-slate-100! text-[#745568]! text-xs! font-medium! rounded-full!">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Article Full Body */}
          <div className="prose! prose-slate! max-w-none! text-sm! sm:text-base! leading-relaxed! text-[#1E2626]! space-y-4! pt-4! border-t! border-slate-100!">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-xl! font-bold! text-[#004851]! pt-3! pb-1!">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg! font-semibold! text-[#745568]! pt-2!">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={index} className="pl-4! border-l-4! border-[#745568]! italic! bg-slate-50! py-2! pr-3! rounded-r-lg! text-slate-700!">
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex! justify-end! pt-4! border-t! border-slate-100! shrink-0!">
          <button
            onClick={onClose}
            className="px-5! py-2! text-sm! font-medium! text-slate-700! bg-slate-100! hover:bg-slate-200! rounded-xl! cursor-pointer!"
          >
            Fermer l'aperçu
          </button>
        </div>
      </div>
    </div>
  );
};