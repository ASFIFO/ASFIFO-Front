import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import type { Article, ArticleStatusFilter } from '../../types';
import { ArticleFormModal } from './ArticleFormModal';
import { ArticleDetailModal } from './ArticleDetailModal';
import { ConfirmModal } from '../common/ConfirmModal';
import {
  Plus,
  Search,
  Filter,
  Sparkles,
  Edit2,
  Trash2,
  Eye,
  Tag as TagIcon,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List as ListIcon,
  Globe,
  FileEdit,
  Star
} from 'lucide-react';

export const ArticleList: React.FC = () => {
  const { articles, deleteArticle, togglePublishArticle, toggleFeaturedArticle } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ArticleStatusFilter>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState<Article | null>(null);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [articleToPreview, setArticleToPreview] = useState<Article | null>(null);

  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Status filter
      if (statusFilter === 'published' && !art.is_published) return false;
      if (statusFilter === 'draft' && art.is_published) return false;
      if (statusFilter === 'featured' && !art.featured) return false;

      // Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = art.title.toLowerCase().includes(query);
        const matchesExcerpt = art.excerpt?.toLowerCase().includes(query);
        const matchesTags = art.tags?.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesExcerpt || matchesTags;
      }

      return true;
    });
  }, [articles, statusFilter, searchTerm]);

  const handleOpenCreate = () => {
    setArticleToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (article: Article) => {
    setArticleToEdit(article);
    setIsFormOpen(true);
  };

  const handleOpenPreview = (article: Article) => {
    setArticleToPreview(article);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6!">
      {/* Top Header Controls */}
      <div className="flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4! bg-white! p-5! rounded-2xl! border! border-slate-200! shadow-2xs!">
        <div>
          <h1 className="text-xl! font-bold! text-[#1E2626]!">Gestion des Articles</h1>
          <p className="text-xs! text-slate-500! mt-0.5!">
            {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''} sur un total de {articles.length}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4! py-2.5! text-sm! font-semibold! text-white! bg-[#004851]! hover:bg-[#00363d]! rounded-xl! flex! items-center! justify-center! gap-2! shadow-sm! transition-all! cursor-pointer!"
        >
          <Plus className="w-4! h-4!" />
          Ajouter un article
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex! flex-col! md:flex-row! items-stretch! md:items-center! justify-between! gap-4! bg-white! p-4! rounded-2xl! border! border-slate-200! shadow-2xs!">
        {/* Search Input */}
        <div className="relative! flex-1!">
          <Search className="w-4! h-4! text-slate-400! absolute! left-3.5! top-1/2! -translate-y-1/2!" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par titre, résumé ou mot-clé..."
            className="w-full! pl-10! pr-4! py-2! text-sm! bg-slate-50! border! border-slate-200! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#004851]/20! focus:border-[#004851]! text-[#1E2626]!"
          />
        </div>

        {/* Status Filters */}
        <div className="flex! items-center! gap-1! overflow-x-auto! pb-1! md:pb-0!">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3! py-1.5! text-xs! font-medium! rounded-xl! transition-colors! shrink-0! cursor-pointer! ${
              statusFilter === 'all'
                ? 'bg-[#004851]! text-white! shadow-2xs!'
                : 'bg-slate-100! text-slate-600! hover:bg-slate-200!'
            }`}
          >
            Tous ({articles.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-3! py-1.5! text-xs! font-medium! rounded-xl! transition-colors! shrink-0! cursor-pointer! ${
              statusFilter === 'published'
                ? 'bg-[#004851]! text-white! shadow-2xs!'
                : 'bg-slate-100! text-slate-600! hover:bg-slate-200!'
            }`}
          >
            Publiés ({articles.filter((a) => a.is_published).length})
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-3! py-1.5! text-xs! font-medium! rounded-xl! transition-colors! shrink-0! cursor-pointer! ${
              statusFilter === 'draft'
                ? 'bg-[#004851]! text-white! shadow-2xs!'
                : 'bg-slate-100! text-slate-600! hover:bg-slate-200!'
            }`}
          >
            Brouillons ({articles.filter((a) => !a.is_published).length})
          </button>
          <button
            onClick={() => setStatusFilter('featured')}
            className={`px-3! py-1.5! text-xs! font-medium! rounded-xl! transition-colors! shrink-0! flex! items-center! gap-1! cursor-pointer! ${
              statusFilter === 'featured'
                ? 'bg-[#745568]! text-white! shadow-2xs!'
                : 'bg-[#745568]/10! text-[#745568]! hover:bg-[#745568]/20!'
            }`}
          >
            <Sparkles className="w-3! h-3! fill-current!" />
            Mis en avant ({articles.filter((a) => a.featured).length})
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex! items-center! gap-1! bg-slate-100! p-1! rounded-xl! shrink-0! self-end! md:self-auto!">
          <button
            onClick={() => setViewMode('table')}
            title="Vue tableau"
            className={`p-1.5! rounded-lg! transition-colors! cursor-pointer! ${
              viewMode === 'table' ? 'bg-white! text-[#004851]! shadow-2xs!' : 'text-slate-500! hover:text-slate-800!'
            }`}
          >
            <ListIcon className="w-4! h-4!" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            title="Vue cartes"
            className={`p-1.5! rounded-lg! transition-colors! cursor-pointer! ${
              viewMode === 'grid' ? 'bg-white! text-[#004851]! shadow-2xs!' : 'text-slate-500! hover:text-slate-800!'
            }`}
          >
            <LayoutGrid className="w-4! h-4!" />
          </button>
        </div>
      </div>

      {/* Main Content View */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white! rounded-2xl! border! border-slate-200! p-12! text-center! space-y-3!">
          <div className="w-12! h-12! bg-slate-100! rounded-full! flex! items-center! justify-center! mx-auto! text-slate-400!">
            <FileEdit className="w-6! h-6!" />
          </div>
          <h3 className="text-base! font-bold! text-[#1E2626]!">Aucun article trouvé</h3>
          <p className="text-xs! text-slate-500! max-w-sm! mx-auto!">
            {searchTerm
              ? `Aucun résultat pour "${searchTerm}". Essayez de modifier vos mots-clés.`
              : 'Aucun article ne correspond au filtre sélectionné.'}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4! py-2! text-xs! font-semibold! text-white! bg-[#004851]! hover:bg-[#00363d]! rounded-xl! inline-flex! items-center! gap-2! cursor-pointer! mt-2!"
          >
            <Plus className="w-4! h-4!" />
            Créer un article
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white! rounded-2xl! border! border-slate-200! shadow-2xs! overflow-hidden!">
          <div className="overflow-x-auto!">
            <table className="w-full! text-left! border-collapse!">
              <thead>
                <tr className="bg-slate-50/80! border-b! border-slate-200! text-xs! font-bold! text-slate-600! uppercase! tracking-wider!">
                  <th className="py-3.5! px-4!">Article</th>
                  <th className="py-3.5! px-4!">Statut</th>
                  <th className="py-3.5! px-4!">Mots-clés (Tags)</th>
                  <th className="py-3.5! px-4! text-center!">En vedette</th>
                  <th className="py-3.5! px-4!">Date</th>
                  <th className="py-3.5! px-4! text-right!">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y! divide-slate-100! text-sm!">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/60! transition-colors!">
                    {/* Title & Thumbnail */}
                    <td className="py-3.5! px-4!">
                      <div className="flex! items-center! gap-3!">
                        <img
                          src={article.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'}
                          alt=""
                          className="w-12! h-12! rounded-xl! object-cover! shrink-0! border! border-slate-200!"
                        />
                        <div className="max-w-xs! sm:max-w-md!">
                          <button
                            onClick={() => handleOpenPreview(article)}
                            className="font-semibold! text-[#1E2626]! hover:text-[#004851]! text-left! line-clamp-1! transition-colors! cursor-pointer!"
                          >
                            {article.title}
                          </button>
                          <p className="text-xs! text-slate-500! line-clamp-1! mt-0.5!">{article.excerpt}</p>
                        </div>
                      </div>
                    </td>

                    {/* Statut Toggle */}
                    <td className="py-3.5! px-4!">
                      <button
                        onClick={() => togglePublishArticle(article.id)}
                        className={`inline-flex! items-center! gap-1.5! px-2.5! py-1! rounded-full! text-xs! font-semibold! transition-all! cursor-pointer! ${
                          article.is_published
                            ? 'bg-emerald-100! text-emerald-800! hover:bg-emerald-200!'
                            : 'bg-slate-100! text-slate-700! hover:bg-slate-200!'
                        }`}
                        title="Cliquer pour changer le statut"
                      >
                        {article.is_published ? (
                          <>
                            <CheckCircle2 className="w-3.5! h-3.5! text-emerald-600!" />
                            Publié
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5! h-3.5! text-slate-500!" />
                            Brouillon
                          </>
                        )}
                      </button>
                    </td>

                    {/* Tags */}
                    <td className="py-3.5! px-4!">
                      <div className="flex! flex-wrap! gap-1! max-w-xs!">
                        {article.tags && article.tags.length > 0 ? (
                          article.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2! py-0.5! bg-[#745568]/10! text-[#745568]! text-[11px]! font-medium! rounded-md!"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs! text-slate-400! font-italic!">Aucun</span>
                        )}
                        {article.tags && article.tags.length > 3 && (
                          <span className="text-[10px]! text-slate-400! self-center!">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Featured toggle */}
                    <td className="py-3.5! px-4! text-center!">
                      <button
                        onClick={() => toggleFeaturedArticle(article.id)}
                        className={`p-1.5! rounded-lg! transition-colors! inline-flex! items-center! justify-center! cursor-pointer! ${
                          article.featured
                            ? 'bg-amber-100! text-amber-600! hover:bg-amber-200!'
                            : 'text-slate-300! hover:text-slate-500! hover:bg-slate-100!'
                        }`}
                        title={article.featured ? 'Retirer des articles mis en avant' : 'Mettre en avant'}
                      >
                        <Star className={`w-4! h-4! ${article.featured ? 'fill-amber-500! text-amber-500!' : ''}`} />
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-3.5! px-4! text-xs! text-slate-500! whitespace-nowrap!">
                      {new Date(article.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5! px-4! text-right! whitespace-nowrap!">
                      <div className="flex! items-center! justify-end! gap-1!">
                        <button
                          onClick={() => handleOpenPreview(article)}
                          title="Aperçu rapide"
                          className="p-1.5! text-slate-500! hover:text-[#004851]! hover:bg-teal-50! rounded-lg! transition-colors! cursor-pointer!"
                        >
                          <Eye className="w-4! h-4!" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(article)}
                          title="Modifier"
                          className="p-1.5! text-slate-500! hover:text-[#004851]! hover:bg-teal-50! rounded-lg! transition-colors! cursor-pointer!"
                        >
                          <Edit2 className="w-4! h-4!" />
                        </button>

                        <button
                          onClick={() => setArticleToDelete(article)}
                          title="Supprimer"
                          className="p-1.5! text-slate-500! hover:text-rose-600! hover:bg-rose-50! rounded-lg! transition-colors! cursor-pointer!"
                        >
                          <Trash2 className="w-4! h-4!" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-6!">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white! rounded-2xl! border! border-slate-200! overflow-hidden! shadow-2xs! hover:shadow-md! transition-all! flex! flex-col! group!"
            >
              {/* Image & Badges */}
              <div className="relative! h-44! overflow-hidden! bg-slate-100!">
                <img
                  src={article.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'}
                  alt=""
                  className="w-full! h-full! object-cover! group-hover:scale-105! transition-transform! duration-300!"
                />
                <div className="absolute! top-3! left-3! flex! items-center! gap-2!">
                  <button
                    onClick={() => togglePublishArticle(article.id)}
                    className={`px-2.5! py-1! rounded-full! text-xs! font-semibold! shadow-xs! transition-colors! cursor-pointer! ${
                      article.is_published ? 'bg-emerald-500! text-white!' : 'bg-slate-700/90! text-white!'
                    }`}
                  >
                    {article.is_published ? 'Publié' : 'Brouillon'}
                  </button>
                  {article.featured && (
                    <span className="px-2.5! py-1! bg-[#745568]! text-white! rounded-full! text-xs! font-semibold! shadow-xs! flex! items-center! gap-1!">
                      <Sparkles className="w-3! h-3! fill-current!" /> En vedette
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5! flex-1! flex! flex-col! justify-between! space-y-4!">
                <div className="space-y-2!">
                  <div className="flex! flex-wrap! gap-1!">
                    {article.tags?.map((tag, idx) => (
                      <span key={idx} className="text-[11px]! font-semibold! text-[#745568]! bg-[#745568]/10! px-2! py-0.5! rounded-md!">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-bold! text-[#1E2626]! text-base! group-hover:text-[#004851]! transition-colors! line-clamp-2!">
                    {article.title}
                  </h3>

                  <p className="text-xs! text-slate-500! line-clamp-2! leading-relaxed!">{article.excerpt}</p>
                </div>

                <div className="pt-3! border-t! border-slate-100! flex! items-center! justify-between! text-xs! text-slate-400!">
                  <span>
                    {new Date(article.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>

                  <div className="flex! items-center! gap-1!">
                    <button
                      onClick={() => handleOpenPreview(article)}
                      className="p-1.5! text-slate-600! hover:text-[#004851]! hover:bg-teal-50! rounded-lg! transition-colors! cursor-pointer!"
                      title="Aperçu"
                    >
                      <Eye className="w-4! h-4!" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(article)}
                      className="p-1.5! text-slate-600! hover:text-[#004851]! hover:bg-teal-50! rounded-lg! transition-colors! cursor-pointer!"
                      title="Modifier"
                    >
                      <Edit2 className="w-4! h-4!" />
                    </button>
                    <button
                      onClick={() => setArticleToDelete(article)}
                      className="p-1.5! text-slate-600! hover:text-rose-600! hover:bg-rose-50! rounded-lg! transition-colors! cursor-pointer!"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4! h-4!" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal (Create & Edit) */}
      <ArticleFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        articleToEdit={articleToEdit}
      />

      {/* Detail / Preview Modal */}
      <ArticleDetailModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        article={articleToPreview}
        onEdit={(article) => handleOpenEdit(article)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!articleToDelete}
        title="Supprimer cet article ?"
        message={`Êtes-vous sûr de vouloir supprimer définitivement l'article "${articleToDelete?.title}" ? Cette action est irréversible.`}
        confirmText="Oui, supprimer"
        cancelText="Annuler"
        variant="danger"
        onClose={() => setArticleToDelete(null)}
        onConfirm={() => {
          if (articleToDelete) {
            deleteArticle(articleToDelete.id);
            setArticleToDelete(null);
          }
        }}
      />
    </div>
  );
};