import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Blog.css";
import { ChevronRight, CalendarDays, Eye } from "lucide-react";
import api from "../lib/api";

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
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTag, setActiveTag] = useState("Tous");

  useEffect(() => {
    api
      .get("/articles", { params: { per_page: 50 } })
      .then((res) => {
        const list = res.data.data ?? res.data;
        setArticles(list);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des articles", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const allTags = useMemo(
    () => ["Tous", ...Array.from(new Set(articles.flatMap((a) => a.tags ?? [])))],
    [articles]
  );

  const filtered = useMemo(
    () =>
      activeTag === "Tous"
        ? articles
        : articles.filter((a) => (a.tags ?? []).includes(activeTag)),
    [articles, activeTag]
  );

  // Le premier article featured (ou le plus récent) devient la mise en avant
  const featured = useMemo(
    () => filtered.find((a) => a.featured) ?? filtered[0],
    [filtered]
  );
  const rest = useMemo(
    () => filtered.filter((a) => a.id !== featured?.id),
    [filtered, featured]
  );

  return (
    <div className="blog-page">
      <Navbar />

      {/* Bannière de titre */}
      <header
        className="blog-banner"
        style={{
          backgroundImage:
            "linear-gradient(160deg, rgba(0,40,45,0.88), rgba(0,72,81,0.72)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80')",
        }}
      >
        <div className="blog-banner-text">
          <h1>Actualités</h1>
          <p className="blog-breadcrumb">
            <Link to="/">Accueil</Link>
            <ChevronRight className="blog-breadcrumb-icon" />
            <span>Actualités</span>
          </p>
        </div>
      </header>

      <section className="blog-section">
        <div className="blog-container">
          {loading && <p className="blog-empty">Chargement des actualités...</p>}

          {error && (
            <p className="blog-empty">
              Impossible de charger les actualités pour le moment. Réessayez plus tard.
            </p>
          )}

          {!loading && !error && (
            <>
              {/* Filtres */}
              {allTags.length > 1 && (
                <div className="blog-tags">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`blog-tag-btn ${activeTag === tag ? "blog-tag-btn-active" : ""}`}
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {featured && (
                <Link to={`/actualites/${featured.slug}`} className="blog-featured">
                  <div className="blog-featured-image">
                    <img src={featured.image_url || FALLBACK_IMAGE} alt={featured.title} />
                    <div className="blog-tag-pills">
                      {(featured.tags ?? []).map((tag) => (
                        <span key={tag} className="blog-tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="blog-featured-body">
                    <h2>{featured.title}</h2>
                    <p>{featured.excerpt}</p>
                    <div className="blog-meta">
                      <span className="blog-meta-item">
                        <CalendarDays className="blog-meta-icon" />
                        {formatDate(featured.published_at ?? featured.created_at)}
                      </span>
                      <span className="blog-meta-item">
                        <Eye className="blog-meta-icon" />
                        {featured.views}
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grille d'articles */}
              <div className="blog-grid">
                {rest.map((article) => (
                  <Link
                    to={`/actualites/${article.slug}`}
                    key={article.id}
                    className="blog-card"
                  >
                    <div className="blog-card-image">
                      <img src={article.image_url || FALLBACK_IMAGE} alt={article.title} />
                      <div className="blog-tag-pills">
                        {(article.tags ?? []).map((tag) => (
                          <span key={tag} className="blog-tag-pill">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="blog-card-body">
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <div className="blog-meta">
                        <span className="blog-meta-item">
                          <CalendarDays className="blog-meta-icon" />
                          {formatDate(article.published_at ?? article.created_at)}
                        </span>
                        <span className="blog-meta-item">
                          <Eye className="blog-meta-icon" />
                          {article.views}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="blog-empty">Aucune actualité pour ce mot-clé.</p>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}