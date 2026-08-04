import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PartnersCarousel from "../components/PartnersCarousel";
import FormationsFilter from "../components/formations";
import "./Formations.css";
import {
  ChevronRight,
  ShieldCheck,
  BarChart3,
  Calculator,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const formations = [
  {
    id: "audit-interne",
    icon: ShieldCheck,
    title: "Audit interne",
    summary: "La maîtrise de la démarche et des outils de l'auditeur est l'objet de cette formation.",
    image: "https://i.pinimg.com/1200x/04/6d/a7/046da75f7ccc468073da4bfec3b58f06.jpg",
    context: [
      "La fonction d'auditeur interne est très fréquemment exercée par des cadres expérimentés qui, dans certains cas, n'ont pas été préparés à exercer cette activité nouvelle par leur parcours professionnel ni par leurs études. Or, l'audit est une technique qui connaît ses propres règles et fait appel à des compétences précises qu'il est indispensable d'acquérir. La réussite d'une mission d'audit interne nécessite la maîtrise de la démarche et des outils de l'auditeur.",
      "Cette formation ne s'adresse pas aux personnes en charge des audits qualité, sécurité, environnement.",
    ],
    results: [
      "Savoir conduire un audit interne",
      "Être capable d'évaluer le dispositif de contrôle interne",
      "Savoir établir des questionnaires d'audit relatifs au type de mission",
      "Acquérir la capacité rédactionnelle pour le compte rendu et les rapports",
    ],
  },
  {
    id: "audit-comptable",
    icon: BarChart3,
    title: "Audit comptable et financier",
    summary: "Allié des décideurs financiers, l'audit comptable et financier permet le contrôle des risques et est garant de la fiabilité des états financiers.",
    image: "https://i.pinimg.com/736x/be/fd/dd/befddd6f1a22fc176dd3060309240a2d.jpg",
    context: [
      "Dans un environnement où le contrôle des risques et la fiabilité des états financiers sont au premier plan des préoccupations des décideurs financiers, la maîtrise des outils et des techniques d'audit s'impose pour assurer les missions d'audit.",
      "À l'issue de cette formation, vous serez en mesure de mettre en œuvre la démarche de l'audit comptable et financier.",
    ],
    results: [
      "Acquérir l'essentiel de la démarche d'audit",
      "Être capable d'effectuer les contrôles des comptes",
      "Savoir rédiger des comptes rendus",
      "Formuler des conclusions pertinentes et constructives",
    ],
  },
  {
    id: "comptabilite",
    icon: Calculator,
    title: "Comptabilité",
    summary: "De la saisie à l'établissement des états financiers, les diverses diligences du métier comptable seront vues dans toutes ses facettes.",
    image: "https://i.pinimg.com/736x/e0/57/69/e05769481ae916a8e3c7d192893af1cc.jpg",
    context: [
      "Depuis toujours, penser comptabilité c'est penser chiffres. Cependant, le besoin des dirigeants d'entreprises actuels est de disposer de données fiables reflétant la situation de leur entité. La comptabilité n'est plus un simple état chiffré, elle est devenue « un outil de gestion et de décision ».",
      "Ce parcours de formation répond à une demande et une nécessité de collaborateurs comptables opérationnels, compétents et éthiques, capables de tenir une comptabilité à jour et exhaustive. Une formation axée dans sa grande partie sur la pratique et l'apprentissage de toutes les diligences comptables.",
    ],
    results: [
      "Maîtriser le processus de classement et de saisie comptable",
      "Acquérir les techniques de rapprochement bancaire et le lettrage des comptes",
      "Savoir rédiger les rapports d'anomalies",
      "Préparer les travaux d'inventaire",
      "Déterminer le résultat comptable et fiscal",
      "Établir les états financiers",
    ],
  },
  {
    id: "entrepreneuriat",
    icon: Lightbulb,
    title: "Initiation à l'entrepreneuriat",
    summary: "De l'idée de projet, en passant par le montage jusqu'à la mise en œuvre, c'est le parcours à suivre dans ce volet.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
    context: [
      "De l'idée de projet, en passant par le montage jusqu'à la mise en œuvre, c'est le parcours à suivre dans ce volet.",
    ],
    results: [
      "Acquérir la culture entrepreneuriale",
      "Disposer d'un document de Business Plan pertinent et cohérent avec le projet et le marché actuel",
      "Démarrer son projet",
      "Savoir présenter son projet à des partenaires financiers ou investisseurs",
    ],
  },
  {
    id: "parcours-dirigeants",
    icon: TrendingUp,
    title: "Parcours dirigeants en entrepreneuriat",
    summary: "Rechercher la performance globale du leader pour valoriser son activité et faire grandir son entreprise est le but de la formation.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80",
    context: [
      "Rechercher la performance globale du leader pour valoriser son activité et faire grandir son entreprise est le but de la formation.",
    ],
    prerequisites: ["Avoir son entreprise", "Projet en démarrage"],
    objectives: [
      "Augmenter la « valeur ajoutée » de son cœur de métier en approfondissant l'ensemble des compétences propres au métier de dirigeant.",
      "Acquérir des méthodes de travail et des outils d'analyse adaptés aux entrepreneurs.",
      "Construire des liens entre dirigeants du secteur privé et public.",
    ],
    results: [
      "Définir la mission, les valeurs et la vision",
      "Ajuster son modèle économique adapté à la personnalité du dirigeant et de son activité",
      "Identifier les améliorations à entreprendre dans son organisation et sa gestion",
      "Développer sa capacité à fructifier ses actifs",
    ],
  },
];

export default function Formations() {
  return (
    <div className="formations-page">
      <Navbar />

      {/* Bannière de titre */}
      <header
        className="formations-banner"
        style={{
          backgroundImage:
            "linear-gradient(160deg, rgba(0,40,45,0.88), rgba(0,72,81,0.72)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80')",
        }}
      >
        <div className="formations-banner-text">
          <h1>Nos formations</h1>
          <p className="formations-breadcrumb">
            <Link to="/">Accueil</Link>
            <ChevronRight className="formations-breadcrumb-icon" />
            <span>Formations</span>
          </p>
        </div>
      </header>
      {/* Vue d'ensemble */}
      <div className="md:mx-20!">
      <FormationsFilter />
      </div>
      <section className="formations-section">
        <div className="formations-container">
          <span className="formations-eyebrow">Nos programmes</span>
          <h2 className="formations-section-title">
            Cinq parcours professionnalisants
          </h2>
          <div className="formations-overview-grid">
            {formations.map(({ id, icon: Icon, title, summary }) => (
              <a key={id} href={`#${id}`} className="formations-overview-card">
                <span className="formations-overview-icon">
                  <Icon className="icon-md" />
                </span>
                <h3>{title}</h3>
                <p>{summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Détail de chaque formation */}
      {formations.map(({ id, icon: Icon, title, image, context, prerequisites, objectives, results }, index) => (
        <section
          key={id}
          id={id}
          className={`formations-section formations-detail ${index % 2 === 1 ? "formations-section-alt" : ""}`}
        >
          <div className={`formations-container formations-detail-grid ${index % 2 === 1 ? "formations-detail-reverse" : ""}`}>
            <div className="formations-detail-image">
              <img src={image} alt={title} />
            </div>

            <div className="formations-detail-content">
              <span className="formations-detail-icon">
                <Icon className="icon-md" />
              </span>
              <h2 className="formations-section-title">{title}</h2>

              {context.map((paragraph) => (
                <p key={paragraph} className="formations-text">
                  {paragraph}
                </p>
              ))}

              {prerequisites && (
                <div className="formations-sublist">
                  <h3>Prérequis</h3>
                  <ul>
                    {prerequisites.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {objectives && (
                <div className="formations-sublist">
                  <h3>Nos objectifs</h3>
                  <ul>
                    {objectives.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="formations-results">
                <h3>Résultats attendus</h3>
                <ul>
                  {results.map((item) => (
                    <li key={item}>
                      <CheckCircle2 className="formations-results-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/contact" className="formations-btn">
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Partenaires */}
      <section className="formations-section formations-section-alt">
        <div className="formations-container formations-partners">
          <span className="formations-eyebrow">Nos partenaires</span>
          <h2 className="formations-section-title formations-partners-title">
            Ils soutiennent et reconnaissent nos formations
          </h2>
          <PartnersCarousel />
        </div>
      </section>

      <Footer />
    </div>
  );
}
