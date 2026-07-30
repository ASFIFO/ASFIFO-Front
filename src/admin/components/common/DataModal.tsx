import React, { useState } from 'react';
import { useData } from '../../hooks/useData';
import { Download, Upload, RefreshCw, X, Copy, Check, Database } from 'lucide-react';

interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataModal: React.FC<DataModalProps> = ({ isOpen, onClose }) => {
  const { exportJSON, importJSON, resetToDefaults, addToast } = useData();
  const [jsonInput, setJsonInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'reset'>('export');

  if (!isOpen) return null;

  const exportedData = exportJSON();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportedData);
    setCopied(true);
    addToast('info', 'Copié dans le presse-papier');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backoffice-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('success', 'Fichier téléchargé', 'Le fichier JSON a été généré.');
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonInput.trim()) return;
    const success = importJSON(jsonInput);
    if (success) {
      setJsonInput('');
      onClose();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setJsonInput(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! p-4! bg-slate-900/50! backdrop-blur-xs! animate-in! fade-in! duration-200!">
      <div className="bg-white! rounded-2xl! shadow-xl! max-w-2xl! w-full! p-6! border! border-slate-100! relative! max-h-[90vh]! flex! flex-col!">
        <div className="flex! items-center! justify-between! pb-4! border-b! border-slate-100!">
          <div className="flex! items-center! gap-2!">
            <Database className="w-5! h-5! text-[#004851]!" />
            <h3 className="text-lg! font-bold! text-[#1E2626]!">Gestion des données (JSON)</h3>
          </div>
          <button onClick={onClose} className="text-slate-400! hover:text-slate-600! p-1! rounded-lg!">
            <X className="w-5! h-5!" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex! border-b! border-slate-200! mt-4!">
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4! py-2! text-sm! font-medium! flex! items-center! gap-2! border-b-2! transition-colors! cursor-pointer! ${
              activeTab === 'export'
                ? 'border-[#004851]! text-[#004851]!'
                : 'border-transparent! text-slate-500! hover:text-slate-700!'
            }`}
          >
            <Download className="w-4! h-4!" />
            Exporter
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-4! py-2! text-sm! font-medium! flex! items-center! gap-2! border-b-2! transition-colors! cursor-pointer! ${
              activeTab === 'import'
                ? 'border-[#004851]! text-[#004851]!'
                : 'border-transparent! text-slate-500! hover:text-slate-700!'
            }`}
          >
            <Upload className="w-4! h-4!" />
            Importer
          </button>
          <button
            onClick={() => setActiveTab('reset')}
            className={`px-4! py-2! text-sm! font-medium! flex! items-center! gap-2! border-b-2! transition-colors! cursor-pointer! ${
              activeTab === 'reset'
                ? 'border-[#004851]! text-[#004851]!'
                : 'border-transparent! text-slate-500! hover:text-slate-700!'
            }`}
          >
            <RefreshCw className="w-4! h-4!" />
            Réinitialiser
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1! overflow-y-auto! py-4!">
          {activeTab === 'export' && (
            <div className="space-y-4!">
              <p className="text-sm! text-slate-600!">
                Vous pouvez exporter l'ensemble de vos articles et de vos messages au format JSON pour sauvegarde ou intégration externe.
              </p>
              <div className="relative!">
                <textarea
                  readOnly
                  value={exportedData}
                  className="w-full! h-56! p-3! text-xs! font-mono! bg-slate-900! text-slate-200! rounded-xl! border! border-slate-800! focus:outline-none! resize-none!"
                />
              </div>
              <div className="flex! flex-wrap! items-center! justify-end! gap-3! pt-2!">
                <button
                  onClick={handleCopy}
                  className="px-4! py-2! text-sm! font-medium! text-slate-700! bg-slate-100! hover:bg-slate-200! rounded-xl! flex! items-center! gap-2! transition-colors! cursor-pointer!"
                >
                  {copied ? <Check className="w-4! h-4! text-emerald-600!" /> : <Copy className="w-4! h-4!" />}
                  {copied ? 'Copié !' : 'Copier le JSON'}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4! py-2! text-sm! font-medium! text-white! bg-[#004851]! hover:bg-[#00363d]! rounded-xl! flex! items-center! gap-2! shadow-xs! transition-colors! cursor-pointer!"
                >
                  <Download className="w-4! h-4!" />
                  Télécharger le fichier .json
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <form onSubmit={handleImportSubmit} className="space-y-4!">
              <p className="text-sm! text-slate-600!">
                Collez du contenu JSON ou importez un fichier pour remplacer vos articles et messages actuels.
              </p>

              <div>
                <label className="block! text-xs! font-semibold! text-slate-700! mb-1!">Fichier JSON</label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="block! w-full! text-sm! text-slate-500! file:mr-4! file:py-2! file:px-4! file:rounded-xl! file:border-0! file:text-sm! file:font-semibold! file:bg-teal-50! file:text-[#004851]! hover:file:bg-teal-100! cursor-pointer!"
                />
              </div>

              <div>
                <label className="block! text-xs! font-semibold! text-slate-700! mb-1!">Ou collez le code JSON ici</label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"articles": [...], "messages": [...]}'
                  className="w-full! h-44! p-3! text-xs! font-mono! bg-slate-50! border! border-slate-200! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#004851]/20! focus:border-[#004851]! resize-none!"
                />
              </div>

              <div className="flex! justify-end! gap-3! pt-2!">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4! py-2! text-sm! font-medium! text-slate-700! bg-slate-100! hover:bg-slate-200! rounded-xl! cursor-pointer!"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!jsonInput.trim()}
                  className="px-4! py-2! text-sm! font-medium! text-white! bg-[#004851]! hover:bg-[#00363d]! disabled:opacity-50! rounded-xl! flex! items-center! gap-2! shadow-xs! transition-colors! cursor-pointer!"
                >
                  <Upload className="w-4! h-4!" />
                  Valider l'importation
                </button>
              </div>
            </form>
          )}

          {activeTab === 'reset' && (
            <div className="space-y-4!">
              <div className="p-4! bg-amber-50! rounded-xl! border! border-amber-200! text-amber-900! text-sm!">
                <h4 className="font-semibold! flex! items-center! gap-2! text-amber-900! mb-1!">
                  <RefreshCw className="w-4! h-4! text-amber-600!" />
                  Attention : Réinitialisation complète
                </h4>
                <p>
                  Cette action remplacera toutes vos modifications actuelles par les données de démonstration initiales (4 articles et 5 messages).
                </p>
              </div>

              <div className="flex! justify-end! gap-3! pt-4!">
                <button
                  onClick={onClose}
                  className="px-4! py-2! text-sm! font-medium! text-slate-700! bg-slate-100! hover:bg-slate-200! rounded-xl! cursor-pointer!"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    resetToDefaults();
                    onClose();
                  }}
                  className="px-4! py-2! text-sm! font-medium! text-white! bg-amber-600! hover:bg-amber-700! rounded-xl! flex! items-center! gap-2! shadow-xs! transition-colors! cursor-pointer!"
                >
                  <RefreshCw className="w-4! h-4!" />
                  Restaurer les données par défaut
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};