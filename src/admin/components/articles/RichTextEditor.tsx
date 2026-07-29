import React, { useState } from 'react';
import { Bold, Italic, Heading2, Heading3, List, Quote, Code, Link as LinkIcon, Eye, Edit3, Image as ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label = 'Contenu complet',
  placeholder = 'Rédigez le contenu complet de votre article...',
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('rich-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = `${prefix}${selectedText || 'texte'}${suffix}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText.length || 5));
    }, 50);
  };

  return (
    <div className="space-y-1.5!">
      <div className="flex! items-center! justify-between!">
        <label className="block! text-sm! font-semibold! text-[#1E2626]!">
          {label} <span className="text-rose-500!">*</span>
        </label>
        <div className="flex! items-center! gap-1! bg-slate-100! p-0.5! rounded-lg! text-xs! font-medium!">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3! py-1! rounded-md! flex! items-center! gap-1.5! transition-colors! cursor-pointer! ${
              activeTab === 'write' ? 'bg-white! text-[#004851]! shadow-xs!' : 'text-slate-600! hover:text-slate-900!'
            }`}
          >
            <Edit3 className="w-3.5! h-3.5!" />
            Éditeur
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3! py-1! rounded-md! flex! items-center! gap-1.5! transition-colors! cursor-pointer! ${
              activeTab === 'preview' ? 'bg-white! text-[#004851]! shadow-xs!' : 'text-slate-600! hover:text-slate-900!'
            }`}
          >
            <Eye className="w-3.5! h-3.5!" />
            Aperçu rendu
          </button>
        </div>
      </div>

      <div className="border! border-slate-200! rounded-xl! overflow-hidden! bg-white! focus-within:ring-2! focus-within:ring-[#004851]/20! focus-within:border-[#004851]! transition-all!">
        {/* Formatting Toolbar */}
        {activeTab === 'write' && (
          <div className="flex! flex-wrap! items-center! gap-1! p-2! bg-slate-50! border-b! border-slate-200! text-slate-700! text-xs!">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              title="Gras (**texte**)"
              className="p-1.5! hover:bg-slate-200! rounded-md! text-slate-700!"
            >
              <Bold className="w-4! h-4!" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              title="Italique (*texte*)"
              className="p-1.5! hover:bg-slate-200! rounded-md! text-slate-700!"
            >
              <Italic className="w-4! h-4!" />
            </button>
            <div className="w-px! h-4! bg-slate-300! mx-1!" />
            <button
              type="button"
              onClick={() => insertFormatting('## ')}
              title="Titre H2 (## Titre)"
              className="p-1.5! hover:bg-slate-200! rounded-md! text-slate-700! font-bold!"
            >
              <Heading2 className="w-4! h-4!" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('### ')}
              title="Titre H3 (### Titre)"
              className="p-1.5! hover:bg-slate-200! rounded-md! text-slate-700!"
            >
              <Heading3 className="w-4! h-4!" />
            </button>
            <div className="w-px! h-4! bg-slate-300! mx-1!" />
            <button
              type="button"
              onClick={() => insertFormatting('* ')}
              title="Liste à puces (* Éléments)"
              className="p-1.5! hover:bg-slate-200! rounded-md! text-slate-700!"
            >
              <List className="w-4! h-4!" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ')}
              title="Citation (> Phrase)"
              className="p-1.5! hover:bg-slate-200! rounded-md! text-slate-700!"
            >
              <Quote className="w-4! h-4!" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('`', '`')}
              title="Code (`code`)"
              className="p-1.5! hover:bg-slate-200! rounded-md! text-slate-700!"
            >
              <Code className="w-4! h-4!" />
            </button>
            <div className="w-px! h-4! bg-slate-300! mx-1!" />
            <button
              type="button"
              onClick={() => insertFormatting('[', '](https://example.com)')}
              title="Ajouter un lien ([Titre](URL))"
              className="p-1.5! hover:bg-slate-200! rounded-md! text-slate-700!"
            >
              <LinkIcon className="w-4! h-4!" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('![Légende](', ')') }
              title="Insérer une image (![Légende](URL))"
              className="p-1.5! hover:bg-slate-200! rounded-md! text-slate-700!"
            >
              <ImageIcon className="w-4! h-4!" />
            </button>
          </div>
        )}

        {/* Write or Preview Body */}
        {activeTab === 'write' ? (
          <textarea
            id="rich-content-textarea"
            rows={12}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full! p-4! text-sm! font-sans! focus:outline-none! resize-y! text-[#1E2626]! leading-relaxed!"
          />
        ) : (
          <div className="p-6! prose! prose-slate! max-w-none! min-h-[300px]! text-sm! leading-relaxed! text-[#1E2626]!">
            {value.trim() ? (
              <div className="space-y-3! whitespace-pre-line!">
                {value.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-xl! font-bold! text-[#004851]! pt-2! pb-1! border-b! border-slate-100!">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-lg! font-semibold! text-[#745568]! pt-1!">
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
            ) : (
              <p className="text-slate-400! italic!">Aucun contenu à prévisualiser pour le moment.</p>
            )}
          </div>
        )}
      </div>
      <p className="text-xs! text-slate-500!">
        Prend en charge le formatage Markdown (titres, gras, italique, citations, listes).
      </p>
    </div>
  );
};