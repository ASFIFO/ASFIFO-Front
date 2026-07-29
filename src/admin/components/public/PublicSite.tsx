import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import type { Article } from '../../types';
import { Link } from 'react-router-dom';
import {
  Globe,
  Send,
  Sparkles,
  Calendar,
  User,
  ArrowLeft,
  Mail,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const PublicSite: React.FC = () => {
  const { articles, addContactMessage, addToast } = useData();

  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Selected Article to read
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Only published articles are visible on public site
  const publishedArticles = articles.filter((a) => a.is_published);
  const featuredArticles = publishedArticles.filter((a) => a.featured);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    addContactMessage({
      name,
      email,
      subject: subject || 'Message sans sujet',
      message,
    });

    setSubmitted(true);
    addToast('success', 'Message envoyé', 'Votre message a bien été transmis à l\'équipe du site !');
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border border-slate-800">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-teal-400 shrink-0" />
          <span>
            <strong>Aperçu du Site Public :</strong> Testez ici l'envoi de messages de contact ou la lecture des articles publiés.
          </span>
        </div>
        <Link
          to="/"
          className="px-3 py-1.5 bg-[#004851] hover:bg-[#00363d] text-white font-semibold rounded-lg inline-flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Retour au Backoffice
        </Link>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-3 py-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E2626]">
          Blog & Espace d’Information
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Découvrez nos derniers articles, nos tutoriels et contactez directement notre équipe éditoriale.
        </p>
      </div>

      {/* Reading Article View OR Main Grid */}
      {selectedArticle ? (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#004851] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à la liste du blog
          </button>

          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-black text-[#1E2626]">{selectedArticle.title}</h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#745568]" /> {selectedArticle.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#745568]" />
                {new Date(selectedArticle.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            {selectedArticle.image_url && (
              <div className="rounded-2xl overflow-hidden max-h-96 w-full shadow-xs">
                <img src={selectedArticle.image_url} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-[#1E2626] space-y-4 pt-4">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl font-bold text-[#004851] pt-3 pb-1">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-lg font-semibold text-[#745568] pt-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={index} className="pl-4 border-l-4 border-[#745568] italic bg-slate-50 py-2 pr-3 rounded-r-lg text-slate-700">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Featured Articles Section */}
          {featuredArticles.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1E2626] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                Articles mis en avant
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={article.image_url}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#745568] text-white text-xs font-semibold rounded-full shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-current" /> Vedette
                      </span>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-[#1E2626] group-hover:text-[#004851] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{article.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#004851] font-semibold pt-2 border-t border-slate-100">
                        <span>Lire l'article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Published Articles */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#1E2626]">Tous les articles publiés ({publishedArticles.length})</h2>
            {publishedArticles.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-sm text-slate-500">
                Aucun article publié pour le moment. Publiez des articles depuis le Backoffice pour les voir apparaître ici.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {publishedArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
                  >
                    <div className="h-40 overflow-hidden bg-slate-100">
                      <img
                        src={article.image_url}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm text-[#1E2626] group-hover:text-[#004851] line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{article.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                        <span>
                          {new Date(article.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                        <span className="text-[#004851] font-medium flex items-center gap-1">
                          Lire <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 bg-teal-50 text-[#004851] rounded-2xl flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#1E2626]">Formulaire de Contact Public</h2>
              <p className="text-xs text-slate-500">
                Envoyez un message d’essai. Il apparaîtra instantanément dans l’onglet <strong>Contacts</strong> du Backoffice avec le statut <strong>"Nouveau"</strong>.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 text-emerald-900 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-base">Message transmis avec succès !</h3>
                <p className="text-xs text-emerald-800">
                  Rendez-vous sur le Backoffice pour consulter et répondre à ce message.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">Votre Nom *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Antoine Dupont"
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004851]/20 focus:border-[#004851]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">Votre Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="antoine@example.com"
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004851]/20 focus:border-[#004851]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Sujet du message</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ex: Demande de devis / Information"
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004851]/20 focus:border-[#004851]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Expliquez votre projet ou posez votre question..."
                    className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004851]/20 focus:border-[#004851]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-bold text-white bg-[#004851] hover:bg-[#00363d] rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Envoyer le message public
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
};
