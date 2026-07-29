import React from 'react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  Mail,
  Plus,
  ArrowRight,
  Eye,
  Globe,
  ChevronRight,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { articles, messages, stats } = useData();

  const recentArticles = articles.slice(0, 4);
  const recentMessages = messages.slice(0, 4);

  return (
    <div className="space-y-8!">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r! from-[#004851]! to-[#00363d]! text-white! p-6! sm:p-8! rounded-3xl! shadow-md! relative! overflow-hidden! flex! flex-col! md:flex-row! md:items-center! justify-between! gap-6!">
        <div className="space-y-2! max-w-xl! z-10!">
          <div className="inline-flex! items-center! gap-2! px-3! py-1! bg-white/10! text-teal-100! rounded-full! text-xs! font-semibold! backdrop-blur-xs!">
            <Sparkles className="w-3.5! h-3.5! text-amber-300!" />
            Tableau de Bord Backoffice
          </div>
          <h1 className="text-2xl! sm:text-3xl! font-extrabold! tracking-tight!">
            Bienvenue dans votre espace d'administration
          </h1>
          <p className="text-sm! text-teal-100/90! leading-relaxed!">
            Gérez facilement le contenu de votre blog, surveillez la publication de vos articles et répondez aux messages de vos visiteurs.
          </p>
        </div>

        <div className="flex! flex-wrap! items-center! gap-3! z-10! shrink-0!">
          <Link
            to="/admin/articles"
            className="px-4! py-2.5! text-xs! font-semibold! bg-white! text-[#004851]! hover:bg-teal-50! rounded-xl! flex! items-center! gap-2! transition-colors! shadow-xs!"
          >
            <Plus className="w-4! h-4!" />
            Nouvel Article
          </Link>
          <Link
            to="/admin/public-site"
            className="px-4! py-2.5! text-xs! font-semibold! bg-[#745568]! hover:bg-[#5d4353]! text-white! rounded-xl! flex! items-center! gap-2! transition-colors! shadow-xs!"
          >
            <Globe className="w-4! h-4!" />
            Aperçu Site Public
          </Link>
        </div>

        <div className="absolute! -right-12! -bottom-12! w-64! h-64! bg-teal-400/10! rounded-full! blur-2xl! pointer-events-none!" />
      </div>

      {/* Stats Grid */}
      <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-5!">
        <div className="bg-white! p-5! rounded-2xl! border! border-slate-200! shadow-2xs! hover:border-[#004851]/30! transition-all! flex! items-center! justify-between!">
          <div className="space-y-1!">
            <span className="text-xs! font-semibold! text-slate-500! uppercase! tracking-wider! block!">Total Articles</span>
            <span className="text-2xl! font-black! text-[#1E2626]!">{stats.totalArticles}</span>
            <span className="text-[11px]! text-slate-400! block!">
              {stats.draftArticles} en brouillon
            </span>
          </div>
          <div className="w-12! h-12! bg-teal-50! text-[#004851]! rounded-2xl! flex! items-center! justify-center! shrink-0!">
            <FileText className="w-6! h-6!" />
          </div>
        </div>

        <div className="bg-white! p-5! rounded-2xl! border! border-slate-200! shadow-2xs! hover:border-[#004851]/30! transition-all! flex! items-center! justify-between!">
          <div className="space-y-1!">
            <span className="text-xs! font-semibold! text-slate-500! uppercase! tracking-wider! block!">Articles Publiés</span>
            <span className="text-2xl! font-black! text-emerald-600!">{stats.publishedArticles}</span>
            <span className="text-[11px]! text-emerald-600/80! font-medium! block!">
              {Math.round((stats.publishedArticles / (stats.totalArticles || 1)) * 100)}% du total
            </span>
          </div>
          <div className="w-12! h-12! bg-emerald-50! text-emerald-600! rounded-2xl! flex! items-center! justify-center! shrink-0!">
            <CheckCircle2 className="w-6! h-6!" />
          </div>
        </div>

        <div className="bg-white! p-5! rounded-2xl! border! border-slate-200! shadow-2xs! hover:border-[#745568]/30! transition-all! flex! items-center! justify-between!">
          <div className="space-y-1!">
            <span className="text-xs! font-semibold! text-slate-500! uppercase! tracking-wider! block!">Articles en Vedette</span>
            <span className="text-2xl! font-black! text-[#745568]!">{stats.featuredArticles}</span>
            <span className="text-[11px]! text-[#745568]/80! font-medium! block!">
              Mis en avant à l'accueil
            </span>
          </div>
          <div className="w-12! h-12! bg-[#745568]/10! text-[#745568]! rounded-2xl! flex! items-center! justify-center! shrink-0!">
            <Sparkles className="w-6! h-6! fill-current!" />
          </div>
        </div>

        <div
          className={`p-5! rounded-2xl! border! transition-all! flex! items-center! justify-between! ${
            stats.unreadMessages > 0
              ? 'bg-blue-50/70! border-blue-200! shadow-xs!'
              : 'bg-white! border-slate-200! shadow-2xs!'
          }`}
        >
          <div className="space-y-1!">
            <span className="text-xs! font-semibold! text-slate-500! uppercase! tracking-wider! block!">Messages Non Lus</span>
            <div className="flex! items-center! gap-2!">
              <span className={`text-2xl! font-black! ${stats.unreadMessages > 0 ? 'text-blue-700!' : 'text-slate-700!'}`}>
                {stats.unreadMessages}
              </span>
              {stats.unreadMessages > 0 && (
                <span className="px-2! py-0.5! bg-blue-600! text-white! text-[10px]! font-bold! rounded-full! animate-pulse!">
                  Nouveau
                </span>
              )}
            </div>
            <span className="text-[11px]! text-slate-500! block!">
              Sur {stats.totalMessages} message(s) au total
            </span>
          </div>
          <div
            className={`w-12! h-12! rounded-2xl! flex! items-center! justify-center! shrink-0! ${
              stats.unreadMessages > 0 ? 'bg-blue-600! text-white!' : 'bg-slate-100! text-slate-600!'
            }`}
          >
            <Mail className="w-6! h-6!" />
          </div>
        </div>
      </div>

      {/* Main Grid: Articles Récents & Derniers Messages */}
      <div className="grid! grid-cols-1! lg:grid-cols-2! gap-8!">
        {/* Articles Récents */}
        <div className="bg-white! rounded-2xl! border! border-slate-200! p-6! shadow-2xs! space-y-4! flex! flex-col! justify-between!">
          <div>
            <div className="flex! items-center! justify-between! pb-4! border-b! border-slate-100!">
              <div className="flex! items-center! gap-2!">
                <FileText className="w-5! h-5! text-[#004851]!" />
                <h2 className="text-base! font-bold! text-[#1E2626]!">Articles récents</h2>
              </div>
              <Link
                to="/admin/articles"
                className="text-xs! font-semibold! text-[#004851]! hover:underline! flex! items-center! gap-1!"
              >
                Tout voir ({articles.length})
                <ChevronRight className="w-3.5! h-3.5!" />
              </Link>
            </div>

            <div className="divide-y! divide-slate-100! mt-2!">
              {recentArticles.map((article) => (
                <div key={article.id} className="py-3.5! flex! items-center! justify-between! gap-4! group!">
                  <div className="flex! items-center! gap-3! min-w-0!">
                    <img
                      src={article.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'}
                      alt=""
                      className="w-10! h-10! rounded-lg! object-cover! shrink-0! border! border-slate-200!"
                    />
                    <div className="min-w-0!">
                      <h4 className="text-sm! font-semibold! text-[#1E2626]! group-hover:text-[#004851]! truncate! transition-colors!">
                        {article.title}
                      </h4>
                      <div className="flex! items-center! gap-2! text-xs! text-slate-400! mt-0.5!">
                        <span>
                          {new Date(article.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex! items-center! gap-1!">
                          <Eye className="w-3! h-3!" /> {article.views}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex! items-center! gap-2! shrink-0!">
                    <span
                      className={`px-2.5! py-1! rounded-full! text-[11px]! font-semibold! ${
                        article.is_published
                          ? 'bg-emerald-100! text-emerald-800!'
                          : 'bg-slate-100! text-slate-600!'
                      }`}
                    >
                      {article.is_published ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3! border-t! border-slate-100! text-center!">
            <Link
              to="/admin/articles"
              className="px-4! py-2! text-xs! font-semibold! text-[#004851]! bg-teal-50! hover:bg-teal-100! rounded-xl! inline-flex! items-center! gap-2! transition-colors!"
            >
              Gérer tous les articles
              <ArrowRight className="w-3.5! h-3.5!" />
            </Link>
          </div>
        </div>

        {/* Derniers Messages Reçus */}
        <div className="bg-white! rounded-2xl! border! border-slate-200! p-6! shadow-2xs! space-y-4! flex! flex-col! justify-between!">
          <div>
            <div className="flex! items-center! justify-between! pb-4! border-b! border-slate-100!">
              <div className="flex! items-center! gap-2!">
                <Mail className="w-5! h-5! text-[#745568]!" />
                <h2 className="text-base! font-bold! text-[#1E2626]!">Derniers messages reçus</h2>
              </div>
              <Link
                to="/admin/contacts"
                className="text-xs! font-semibold! text-[#745568]! hover:underline! flex! items-center! gap-1!"
              >
                Voir la boîte ({messages.length})
                <ChevronRight className="w-3.5! h-3.5!" />
              </Link>
            </div>

            <div className="divide-y! divide-slate-100! mt-2!">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="py-3.5! flex! items-center! justify-between! gap-4! group!">
                  <div className="flex! items-center! gap-3! min-w-0!">
                    <div className="w-9! h-9! rounded-full! bg-slate-100! text-[#004851]! font-bold! text-xs! flex! items-center! justify-center! shrink-0! border! border-slate-200!">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0!">
                      <div className="flex! items-center! gap-2!">
                        <h4 className="text-sm! font-semibold! text-[#1E2626]! group-hover:text-[#004851]! truncate! transition-colors!">
                          {msg.name}
                        </h4>
                        {msg.status === 'new' && (
                          <span className="w-2! h-2! rounded-full! bg-blue-600! shrink-0!"></span>
                        )}
                      </div>
                      <p className="text-xs! text-slate-500! truncate! mt-0.5!">{msg.subject}</p>
                    </div>
                  </div>

                  <div className="shrink-0! text-right!">
                    <span
                      className={`px-2! py-0.5! rounded-full! text-[11px]! font-semibold! ${
                        msg.status === 'new'
                          ? 'bg-blue-100! text-blue-800!'
                          : msg.status === 'replied'
                          ? 'bg-emerald-100! text-emerald-800!'
                          : msg.status === 'archived'
                          ? 'bg-[#745568]! text-white!'
                          : 'bg-slate-100! text-slate-700!'
                      }`}
                    >
                      {msg.status === 'new'
                        ? 'Nouveau'
                        : msg.status === 'replied'
                        ? 'Répondu'
                        : msg.status === 'archived'
                        ? 'Archivé'
                        : 'Lu'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3! border-t! border-slate-100! text-center!">
            <Link
              to="/admin/contacts"
              className="px-4! py-2! text-xs! font-semibold! text-[#745568]! bg-[#745568]/10! hover:bg-[#745568]/20! rounded-xl! inline-flex! items-center! gap-2! transition-colors!"
            >
              Consulter les messages non lus ({stats.unreadMessages})
              <ArrowRight className="w-3.5! h-3.5!" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};