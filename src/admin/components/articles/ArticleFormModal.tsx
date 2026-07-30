import React, { useState } from 'react';
import type { Article } from '../../types';
import { useData } from '../../hooks/useData';
import { RichTextEditor } from './RichTextEditor';
import { sampleImagePresets } from '../../data/initialData';
import { X, Sparkles, Image as ImageIcon, Plus, Tag as TagIcon, Upload, Check } from 'lucide-react';

interface ArticleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleToEdit?: Article | null;
}

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';

export const ArticleFormModal: React.FC<ArticleFormModalProps> = ({
  isOpen,
  onClose,
  articleToEdit,
}) => {
  const { addArticle, updateArticle, uploadArticleImage } = useData();

  // Initialisation directe depuis articleToEdit — plus de useEffect + setState en cascade.
  // Le composant doit être remonté via une prop `key` (voir ArticleList.tsx) à chaque
  // changement d'article édité ou passage création/édition pour que ces valeurs se réinitialisent.
  const [title, setTitle] = useState(articleToEdit?.title ?? '');
  const [excerpt, setExcerpt] = useState(articleToEdit?.excerpt ?? '');
  const [content, setContent] = useState(articleToEdit?.content ?? '');
  const [imageUrl, setImageUrl] = useState(articleToEdit?.image_url ?? DEFAULT_IMAGE);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(articleToEdit?.tags ?? ['Technologie', 'Web']);
  const [featured, setFeatured] = useState(articleToEdit?.featured ?? false);
  const [isPublished, setIsPublished] = useState(articleToEdit?.is_published ?? true);
  const [author, setAuthor] = useState(articleToEdit?.author || 'Sophie Martin');
  const [showPresets, setShowPresets] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleAddTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file)); // aperçu local immédiat, sans base64
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const payload = {
      title,
      excerpt,
      content,
      ...(!imageFile && {
        image_url: imageUrl || DEFAULT_IMAGE,
      }),
      tags,
      featured,
      is_published: isPublished,
      author,
    };

    let savedArticle: Article | undefined;

    if (articleToEdit) {
      await updateArticle(articleToEdit.id, payload);
      savedArticle = { ...articleToEdit, ...payload };
    } else {
      savedArticle = await addArticle(payload as Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views'>);
    }

    if (imageFile && savedArticle) {
      await uploadArticleImage(savedArticle.id, imageFile);
    }

    onClose();
  };

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! p-4! bg-slate-900/50! backdrop-blur-xs! animate-in! fade-in! duration-200! overflow-y-auto!">
      <div className="bg-white! rounded-2xl! shadow-xl! max-w-3xl! w-full! p-6! sm:p-8! border! border-slate-100! relative! my-8! max-h-[90vh]! flex! flex-col!">
        {/* Header */}
        <div className="flex! items-center! justify-between! pb-4! border-b! border-slate-100! shrink-0!">
          <div>
            <h2 className="text-xl! font-bold! text-[#1E2626]!">
              {articleToEdit ? "Modifier l'article" : 'Ajouter un article'}
            </h2>
            <p className="text-xs! text-slate-500! mt-0.5!">
              Remplissez les informations ci-dessous pour {articleToEdit ? 'mettre à jour' : 'créer'} un article de blog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400! hover:text-slate-600! p-2! rounded-xl! hover:bg-slate-100! transition-colors! cursor-pointer!"
          >
            <X className="w-5! h-5!" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1! overflow-y-auto! py-6! space-y-6! pr-1!">
          {/* Titre */}
          <div className="space-y-1!">
            <label className="block! text-sm! font-semibold! text-[#1E2626]!">
              Titre <span className="text-rose-500!">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Les tendances du design éco-responsable..."
              className="w-full! px-4! py-2.5! text-sm! rounded-xl! border! border-slate-200! focus:outline-none! focus:ring-2! focus:ring-[#004851]/20! focus:border-[#004851]! text-[#1E2626]!"
            />
          </div>

          {/* Grid for Auteur & Featured / Published toggles */}
          <div className="grid! grid-cols-1! sm:grid-cols-2! gap-4! bg-slate-50! p-4! rounded-xl! border! border-slate-200/80!">
            {/* Toggle Is Published */}
            <div className="flex! items-center! justify-between! bg-white! p-3! rounded-xl! border! border-slate-200! shadow-2xs!">
              <div>
                <span className="text-sm! font-semibold! text-[#1E2626]! block!">Publié</span>
                <span className="text-xs! text-slate-500!">Visible sur le site public</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                className={`relative! inline-flex! h-6! w-11! items-center! rounded-full! transition-colors! cursor-pointer! ${
                  isPublished ? 'bg-[#004851]!' : 'bg-slate-300!'
                }`}
              >
                <span
                  className={`inline-block! h-4! w-4! transform! rounded-full! bg-white! transition-transform! ${
                    isPublished ? 'translate-x-6!' : 'translate-x-1!'
                  }`}
                />
              </button>
            </div>

            {/* Toggle Featured */}
            <div className="flex! items-center! justify-between! bg-white! p-3! rounded-xl! border! border-slate-200! shadow-2xs!">
              <div>
                <span className="text-sm! font-semibold! text-[#1E2626]! flex! items-center! gap-1.5!">
                  <Sparkles className="w-4! h-4! text-amber-500! fill-amber-500!" />
                  Article mis en avant
                </span>
                <span className="text-xs! text-slate-500!">Affiché en vedette</span>
              </div>
              <button
                type="button"
                onClick={() => setFeatured(!featured)}
                className={`relative! inline-flex! h-6! w-11! items-center! rounded-full! transition-colors! cursor-pointer! ${
                  featured ? 'bg-[#745568]!' : 'bg-slate-300!'
                }`}
              >
                <span
                  className={`inline-block! h-4! w-4! transform! rounded-full! bg-white! transition-transform! ${
                    featured ? 'translate-x-6!' : 'translate-x-1!'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Résumé */}
          <div className="space-y-1!">
            <label className="block! text-sm! font-semibold! text-[#1E2626]!">Résumé (Excerpt)</label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Courte description d'accroche pour la liste d'articles..."
              className="w-full! px-4! py-2.5! text-sm! rounded-xl! border! border-slate-200! focus:outline-none! focus:ring-2! focus:ring-[#004851]/20! focus:border-[#004851]! text-[#1E2626]!"
            />
          </div>

          {/* Image de l'article */}
          <div className="space-y-2!">
            <label className="block! text-sm! font-semibold! text-[#1E2626]!">Image de l'article (URL ou Upload)</label>

            <div className="flex! flex-col! sm:flex-row! items-stretch! sm:items-center! gap-3!">
              <div className="relative! flex-1!">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full! px-4! py-2.5! text-sm! rounded-xl! border! border-slate-200! focus:outline-none! focus:ring-2! focus:ring-[#004851]/20! focus:border-[#004851]! text-[#1E2626]!"
                />
              </div>

              <label className="px-4! py-2.5! text-sm! font-medium! text-slate-700! bg-slate-100! hover:bg-slate-200! rounded-xl! flex! items-center! justify-center! gap-2! cursor-pointer! transition-colors! shrink-0!">
                <Upload className="w-4! h-4! text-slate-600!" />
                Charger image
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden!" />
              </label>

              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="px-4! py-2.5! text-sm! font-medium! text-[#745568]! bg-[#745568]/10! hover:bg-[#745568]/20! rounded-xl! flex! items-center! justify-center! gap-2! transition-colors! shrink-0! cursor-pointer!"
              >
                <ImageIcon className="w-4! h-4!" />
                Bibliothèque
              </button>
            </div>

            {/* Presets Gallery dropdown */}
            {showPresets && (
              <div className="p-3! bg-slate-50! border! border-slate-200! rounded-xl! space-y-2!">
                <span className="text-xs! font-semibold! text-slate-600! block!">Choisissez parmi nos images recommandées :</span>
                <div className="grid! grid-cols-2! sm:grid-cols-3! gap-2!">
                  {sampleImagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setImageUrl(preset.url);
                        setShowPresets(false);
                      }}
                      className="group! relative! h-20! rounded-lg! overflow-hidden! border! border-slate-200! text-left! cursor-pointer!"
                    >
                      <img src={preset.url} alt={preset.label} className="w-full! h-full! object-cover! group-hover:scale-105! transition-transform!" />
                      <div className="absolute! inset-0! bg-slate-900/60! flex! items-end! p-1.5! opacity-90!">
                        <span className="text-[10px]! font-medium! text-white! truncate!">{preset.label}</span>
                      </div>
                      {imageUrl === preset.url && (
                        <div className="absolute! top-1! right-1! bg-emerald-500! text-white! rounded-full! p-0.5!">
                          <Check className="w-3! h-3!" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Preview */}
            {imageUrl && (
              <div className="relative! h-40! w-full! rounded-xl! overflow-hidden! border! border-slate-200! bg-slate-100! mt-2!">
                <img src={imageUrl} alt="Aperçu" className="w-full! h-full! object-cover!" />
                <div className="absolute! top-2! right-2! bg-slate-900/70! text-white! text-xs! px-2! py-1! rounded-md!">
                  Aperçu de l'image
                </div>
              </div>
            )}
          </div>

          {/* Tags (Pastilles) */}
          <div className="space-y-2!">
            <label className="block! text-sm! font-semibold! text-[#1E2626]!">Mots-clés (Tags)</label>
            <div className="flex! flex-wrap! items-center! gap-2! p-3! bg-slate-50! border! border-slate-200! rounded-xl!">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex! items-center! gap-1.5! px-3! py-1! bg-[#745568]! text-white! text-xs! font-medium! rounded-full! shadow-2xs!"
                >
                  <TagIcon className="w-3! h-3! opacity-70!" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-white/20! p-0.5! rounded-full! transition-colors!"
                  >
                    <X className="w-3! h-3!" />
                  </button>
                </span>
              ))}

              <div className="flex! items-center! gap-1! flex-1! min-w-[140px]!">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Tapez un mot-clé + Entrée..."
                  className="text-xs! bg-transparent! border-none! focus:outline-none! w-full! text-[#1E2626]!"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="p-1! text-[#004851]! hover:bg-teal-100! rounded-md! transition-colors! cursor-pointer!"
                >
                  <Plus className="w-4! h-4!" />
                </button>
              </div>
            </div>
            <p className="text-xs! text-slate-500!">Appuyez sur Entrée ou sur le bouton + pour ajouter chaque mot-clé.</p>
          </div>

          {/* Contenu complet (Rich Text Editor) */}
          <RichTextEditor value={content} onChange={setContent} label="Contenu complet" />

          {/* Auteur */}
          <div className="space-y-1!">
            <label className="block! text-sm! font-semibold! text-[#1E2626]!">Auteur</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full! px-4! py-2.5! text-sm! rounded-xl! border! border-slate-200! focus:outline-none! focus:ring-2! focus:ring-[#004851]/20! focus:border-[#004851]! text-[#1E2626]!"
            />
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex! items-center! justify-end! gap-3! pt-4! border-t! border-slate-100! shrink-0!">
          <button
            type="button"
            onClick={onClose}
            className="px-5! py-2.5! text-sm! font-medium! text-slate-700! bg-slate-100! hover:bg-slate-200! rounded-xl! transition-colors! cursor-pointer!"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5! py-2.5! text-sm! font-medium! text-white! bg-[#004851]! hover:bg-[#00363d]! rounded-xl! shadow-xs! transition-colors! cursor-pointer! flex! items-center! gap-2!"
          >
            {articleToEdit ? 'Enregistrer les modifications' : 'Créer l’article'}
          </button>
        </div>
      </div>
    </div>
  );
};