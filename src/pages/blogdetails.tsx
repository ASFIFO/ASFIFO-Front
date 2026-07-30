import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";
import { CalendarDays, Eye, User, ChevronRight, ArrowLeft, Tag } from "lucide-react";

type ApiArticle = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  tags: string[] | null;
  featured: boolean;
  is_published: boolean;
  views: number;
  author: string | null;
  published_at: string | null;
  created_at: string;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Rend le contenu markdown-léger (## titres, > citations, paragraphes) en JSX
function renderContent(content: string) {
  return content.split("\n\n").map((paragraph, index) => {
    if (paragraph.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl! font-serif! font-bold! text-[#1E2626]! mt-8! mb-3!">
          {paragraph.replace("## ", "")}
        </h2>
      );
    }
    if (paragraph.startsWith("### ")) {
      return (
        <h3 key={index} className="text-xl! font-serif! font-semibold! text-[#004851]! mt-6! mb-2!">
          {paragraph.replace("### ", "")}
        </h3>
      );
    }
    if (paragraph.startsWith("> ")) {
      return (
        <blockquote
          key={index}
          className="border-l-4! border-[#004851]! bg-[#004851]/5! italic! text-slate-700! py-3! px-4! rounded-r-lg! my-4!"
        >
          {paragraph.replace("> ", "")}
        </blockquote>
      );
    }
    return (
      <p key={index} className="text-slate-700! leading-relaxed! mb-4!">
        {paragraph}
      </p>
    );
  });
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ApiArticle | null>(null);
  const [related, setRelated] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

useEffect(() => {
  if (!slug) return;
  
  const fetchArticle = async () => {
    setLoading(true);
    setNotFound(false);

    try {
      const res = await api.get(`/articles/${slug}`);
      setArticle(res.data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  fetchArticle();
}, [slug]);

  useEffect(() => {
    api
      .get("/articles", { params: { per_page: 3 } })
      .then((res) => {
        const list = res.data.data ?? res.data;
        setRelated(list.filter((a: ApiArticle) => a.slug !== slug).slice(0, 3));
      })
      .catch(() => setRelated([]));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen! bg-[#f5f6f5]! flex! flex-col!">
        <Navbar />
        <div className="flex-1! flex! items-center! justify-center!">
          <p className="text-slate-500!">Chargement de l'article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen! bg-[#f5f6f5]! flex! flex-col!">
        <Navbar />
        <div className="flex-1! flex! flex-col! items-center! justify-center! gap-4! py-24!">
          <p className="text-slate-500!">Cet article est introuvable ou n'est plus disponible.</p>
          <Link
            to="/actualites"
            className="inline-flex! items-center! gap-2! px-6! py-3! rounded-full! border! border-[#004851]! text-[#004851]! font-semibold! hover:bg-[#004851]! hover:text-white! transition-colors!"
          >
            <ArrowLeft className="w-4! h-4!" />
            Retour aux actualités
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen! bg-[#f5f6f5]!">
      <Navbar />

      {/* Fil d'ariane */}
      <div className=" max-w-4xl! mx-auto! px-6! pt-16!">
        <p className="flex! items-center! gap-2! text-sm! text-slate-500!">
          <Link to="/" className="hover:text-[#004851]! transition-colors!">
            Accueil
          </Link>
          <ChevronRight className="w-3.5! h-3.5!" />
          <Link to="/actualites" className="hover:text-[#004851]! transition-colors!">
            Actualités
          </Link>
          <ChevronRight className="w-3.5! h-3.5!" />
          <span className="text-slate-700! truncate! max-w-50!">{article.title}</span>
        </p>
      </div>

      {/* En-tête article */}
      <header className="max-w-4xl! mx-auto! px-6! pt-6! pb-8!">
        {article.tags && article.tags.length > 0 && (
          <div className="flex! flex-wrap! gap-2! mb-4!">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex! items-center! gap-1! px-3! py-1! rounded-full! bg-[#004851]/10! text-[#004851]! text-xs! font-semibold!"
              >
                <Tag className="w-3! h-3!" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-serif! text-3xl! sm:text-4xl! font-bold! text-[#1E2626]! leading-tight! mb-4!">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-lg! text-slate-600! leading-relaxed! mb-6!">{article.excerpt}</p>
        )}

        <div className="flex! flex-wrap! items-center! gap-5! text-sm! text-slate-500! pb-6! border-b! border-slate-200!">
          {article.author && (
            <span className="flex! items-center! gap-1.5!">
              <User className="w-4! h-4! text-[#004851]!" />
              {article.author}
            </span>
          )}
          <span className="flex! items-center! gap-1.5!">
            <CalendarDays className="w-4! h-4! text-[#004851]!" />
            {formatDate(article.published_at ?? article.created_at)}
          </span>
          <span className="flex! items-center! gap-1.5!">
            <Eye className="w-4! h-4! text-[#004851]!" />
            {article.views} vues
          </span>
        </div>
      </header>

      {/* Image principale */}
      <div className="max-w-4xl! mx-auto! px-6! mb-10!">
        <div className="rounded-3xl! overflow-hidden! shadow-sm!">
          <img
            src={article.image_url || FALLBACK_IMAGE}
            alt={article.title}
            className="w-full! h-80! sm:h-105! object-cover!"
          />
        </div>
      </div>

      {/* Contenu */}
      <article className="max-w-3xl! mx-auto! px-6! pb-16!">
        <div className="prose-content!">{renderContent(article.content)}</div>

        {/* CTA contact */}
        <div className="mt-12! bg-white! rounded-3xl! border! border-slate-200! p-8! text-center!">
          <h3 className="font-serif! text-2xl! font-bold! text-[#1E2626]! mb-2!">
            Une question sur nos formations ?
          </h3>
          <p className="text-slate-600! mb-6!">
            Notre équipe est à votre disposition pour vous accompagner dans votre parcours.
          </p>
          <Link
            to="/contact"
            className="inline-flex! items-center! gap-2! px-6! py-3! rounded-full! bg-[#004851]! text-white! font-semibold! hover:bg-[#00363d]! transition-colors!"
          >
            Nous contacter
          </Link>
        </div>
      </article>

      {/* Articles similaires */}
      {related.length > 0 && (
        <section className="bg-white! border-t! border-slate-200! py-16!">
          <div className="max-w-5xl! mx-auto! px-6!">
            <h2 className="font-serif! text-2xl! font-bold! text-[#1E2626]! mb-8!">
              À lire aussi
            </h2>
            <div className="grid! grid-cols-1! sm:grid-cols-3! gap-6!">
              {related.map((a) => (
                <Link
                  key={a.id}
                  to={`/actualites/${a.slug}`}
                  className="group! rounded-2xl! overflow-hidden! border! border-slate-200! hover:shadow-md! transition-shadow! bg-white!"
                >
                  <div className="h-40! overflow-hidden!">
                    <img
                      src={a.image_url || FALLBACK_IMAGE}
                      alt={a.title}
                      className="w-full! h-full! object-cover! group-hover:scale-105! transition-transform! duration-300!"
                    />
                  </div>
                  <div className="p-4!">
                    <h3 className="font-semibold! text-[#1E2626]! line-clamp-2! group-hover:text-[#004851]! transition-colors!">
                      {a.title}
                    </h3>
                    <p className="text-xs! text-slate-500! mt-2!">
                      {formatDate(a.published_at ?? a.created_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}