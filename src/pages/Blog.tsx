import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Blog.css";
import { ChevronRight, CalendarDays, Clock } from "lucide-react";
import dirigeantsTpePme from "../assets/realisations/dirigeants-tpe-pme.png";
import comptableAlternance from "../assets/realisations/comptable-alternance.png";
import cffammaConference from "../assets/realisations/cffamma-conference.png";
import cffammaAtelier from "../assets/realisations/cffamma-atelier.png";
import imgamConference from "../assets/realisations/imgam-conference.jpg";
import ambatolampyConference from "../assets/realisations/ambatolampy-conference.jpg";
import itasyConference from "../assets/realisations/itasy-conference.jpg";
import itasyMontageProjet from "../assets/realisations/itasy-montage-projet.jpg";

const articles = [
  {
    id: "montage-projet-itasy",
    title: "Formation sur le montage de projet et Business Plan",
    description: "Nos formateurs ont accompagné les étudiants de l'Université d'ITASY dans l'élaboration de leur Business Plan, de l'idée au montage financier.",
    image: itasyMontageProjet,
    date: "Décembre 2020",
    time: "09:00",
    tags: ["Formation", "Entrepreneuriat"],
  },
  {
    id: "sensibilisation-ambatolampy",
    title: "Sensibilisation à l'entrepreneuriat des jeunes à Ambatolampy",
    description: "Une conférence de sensibilisation en plein air pour encourager les jeunes à se tourner vers l'entrepreneuriat responsable.",
    image: ambatolampyConference,
    date: "Mars 2020",
    time: "14:00",
    tags: ["Conférence", "Jeunesse"],
  },
  {
    id: "conference-imgam",
    title: "Conférence sur l'entrepreneuriat à l'Université IMGAM",
    description: "Notre fondatrice a partagé son expérience de dirigeante avec les étudiants de l'Université IMGAM, en partenariat avec Camoi Expertise.",
    image: imgamConference,
    date: "Février 2020",
    time: "10:30",
    tags: ["Conférence", "Entrepreneuriat"],
  },
  {
    id: "conference-itasy",
    title: "Conférence sur l'entrepreneuriat à l'Université d'ITASY",
    description: "Une rencontre avec les étudiants de l'Université d'ITASY autour des enjeux de l'entrepreneuriat à Madagascar.",
    image: itasyConference,
    date: "Décembre 2019",
    time: "09:30",
    tags: ["Conférence", "Entrepreneuriat"],
  },
  {
    id: "atelier-cffamma",
    title: "Atelier pratique sur l'entrepreneuriat — CFFAMMA Antsirabe",
    description: "Un atelier en petits groupes pour mettre en pratique les bases de la création et de la structuration d'un projet.",
    image: cffammaAtelier,
    date: "Juin 2019",
    time: "15:00",
    tags: ["Atelier", "Entrepreneuriat"],
  },
  {
    id: "conference-cffamma",
    title: "Conférence sur l'entrepreneuriat au CFFAMMA Antsirabe",
    description: "Une conférence de sensibilisation à l'entrepreneuriat auprès des jeunes du CFFAMMA d'Antsirabe.",
    image: cffammaConference,
    date: "Juin 2019",
    time: "09:00",
    tags: ["Conférence", "Jeunesse"],
  },
  {
    id: "formation-comptable-alternance",
    title: "Formation comptable en alternance — Session 2018",
    description: "La première session de notre formation professionnelle métier comptable en alternance, pour des collaborateurs opérationnels dès la sortie.",
    image: comptableAlternance,
    date: "2018",
    time: "08:30",
    tags: ["Formation", "Comptabilité"],
  },
  {
    id: "formation-dirigeants",
    title: "Formation de dirigeants TPE/PME",
    description: "Une session dédiée à l'accompagnement des dirigeants de TPE/PME dans la structuration de leur activité et de leur stratégie.",
    image: dirigeantsTpePme,
    date: "Décembre 2018",
    time: "09:00",
    tags: ["Formation", "Dirigeants"],
  },
];

const allTags = ["Tous", ...Array.from(new Set(articles.flatMap((a) => a.tags)))];

export default function Blog() {
  const [activeTag, setActiveTag] = useState("Tous");

  const filtered = useMemo(
    () => (activeTag === "Tous" ? articles : articles.filter((a) => a.tags.includes(activeTag))),
    [activeTag]
  );

  const [featured, ...rest] = filtered;

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
          {/* Filtres */}
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

          {featured && (
            <article id={featured.id} className="blog-featured">
              <div className="blog-featured-image">
                <img src={featured.image} alt={featured.title} />
                <div className="blog-tag-pills">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="blog-tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="blog-featured-body">
                <h2>{featured.title}</h2>
                <p>{featured.description}</p>
                <div className="blog-meta">
                  <span className="blog-meta-item">
                    <CalendarDays className="blog-meta-icon" />
                    {featured.date}
                  </span>
                  <span className="blog-meta-item">
                    <Clock className="blog-meta-icon" />
                    {featured.time}
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Grille d'articles */}
          <div className="blog-grid">
            {rest.map((article) => (
              <article key={article.id} id={article.id} className="blog-card">
                <div className="blog-card-image">
                  <img src={article.image} alt={article.title} />
                  <div className="blog-tag-pills">
                    {article.tags.map((tag) => (
                      <span key={tag} className="blog-tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="blog-card-body">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="blog-meta">
                    <span className="blog-meta-item">
                      <CalendarDays className="blog-meta-icon" />
                      {article.date}
                    </span>
                    <span className="blog-meta-item">
                      <Clock className="blog-meta-icon" />
                      {article.time}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="blog-empty">Aucune actualité pour ce mot-clé.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
