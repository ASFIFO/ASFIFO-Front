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
  Clock,
  GraduationCap,
  FileCheck2,
  Briefcase,
  Monitor,
} from "lucide-react";

const formations = [
  {
    id: "metier-comptable",
    icon: Calculator,
    title: "Formation Métier Comptable (Simple ou Alternance)",
    summary: "Formation complète de 420 heures sur 3 mois pour maîtriser les techniques comptables, fiscales, le français professionnel et les logiciels de gestion.",
    image: "https://i.pinimg.com/736x/e0/57/69/e05769481ae916a8e3c7d192893af1cc.jpg",
    context: [
      "Le comptable a la responsabilité de la gestion des comptes de l'entreprise et de l'élaboration des documents fiscaux et sociaux. En cabinet d'expertise ou en entreprise, rigueur et méthode sont des qualités indispensables pour ce métier à responsabilité.",
      "Conformément aux exigences de la réglementation malgache et du PCG 2005, cette formation en 5 modules permet aux bacheliers et étudiants Bacc+2/3 d'être rapidement opérationnels et certifiés à l'issue de 420 heures d'apprentissage pratique.",
    ],
    modules: [
      {
        name: "Module 1 : Principes de base & SI Comptable",
        details: "Rôle de la comptabilité, principes de régularité, sincérité, prudence et permanence des méthodes, plan comptable, comptabilité en double partie (débit/crédit, actif/passif, charges/produits), documents comptables (journal, grand livre, balance, bilan, compte de résultat, annexe) et étude de cas d'analyse détaillée.",
      },
      {
        name: "Module 2 : Enregistrement des opérations & Clôture",
        details: "Enregistrement des opérations courantes (ventes, achats, salaires, impôts, règlements, dette) et opérations de fin d'année (amortissements, provisions, TVA, inventaire et révision).",
      },
      {
        name: "Module 3 : Français professionnel",
        details: "Rédaction de rapports comptables et financiers, rédaction de comptes rendus d'activité et correspondance professionnelle.",
      },
      {
        name: "Module 4 : Outils informatiques de gestion",
        details: "Maîtrise du logiciel de comptabilité générale (Sage), du logiciel de paie et du tableur Excel appliqué au calcul comptable et financier.",
      },
      {
        name: "Module 5 : Cas pratiques & Immersion",
        details: "Entraînement intensif à la tenue réelle des livres comptables d'une entreprise et préparation à la période de stage.",
      },
    ],
    results: [
      "Maîtriser le processus de classement, de saisie et de lettrage des comptes",
      "Établir les déclarations fiscales et sociales dans le respect de la loi malgache",
      "Effectuer les travaux d'inventaire et déterminer le résultat comptable et fiscal",
      "Dresser les états financiers complets (Bilan, Compte de résultat, Annexe)",
      "Utiliser avec aisance les logiciels spécialisés Sage, Paie et Excel",
    ],
  },
  {
    id: "parcours-dirigeants",
    icon: TrendingUp,
    title: "Programme Dirigeants et Cadres d'Entreprise",
    summary: "Formation sur-mesure et coaching à la carte pour piloter l'entreprise, comprendre son compte de résultat et optimiser sa gestion.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80",
    context: [
      "À Madagascar, la tenue d'une comptabilité est obligatoire pour toutes les entreprises. Dès le départ, le dirigeant doit prendre conscience qu'il devra rendre compte de ses résultats économiques auprès des administrations fiscales et des partenaires financiers.",
      "Le parcours proposé par le groupe CAMOI vise à augmenter la « valeur ajoutée » du dirigeant en lui apportant des outils d'analyse stratégique et de gouvernance.",
    ],
    prerequisites: ["Être dirigeant d'entreprise", "Cadre de direction ou projet en démarrage"],
    objectives: [
      "Piloter la performance globale et l'organisation de l'entreprise.",
      "Maîtriser les tableaux de bord et comprendre les choix fiscaux stratégiques.",
      "Construire des liens solides entre dirigeants du secteur privé et public.",
    ],
    modules: [
      {
        name: "Accompagnement à la carte",
        details: "Coaching professionnel ou individuel, management stratégique et leadership.",
      },
      {
        name: "Gestion financière & Communication",
        details: "Lecture rapide du bilan et compte de résultat, gestion des risques et communication auprès des banques et partenaires.",
      },
    ],
    results: [
      "Définir la mission, les valeurs et la vision de son entreprise",
      "Ajuster son modèle économique adapté à sa personnalité et à son activité",
      "Identifier les axes d'amélioration dans son organisation et sa gestion financière",
    ],
  },
  {
    id: "audit-interne",
    icon: ShieldCheck,
    title: "Audit interne et Contrôle de Gestion",
    summary: "Maîtrisez la démarche et les outils de l'auditeur interne pour évaluer le dispositif de contrôle interne.",
    image: "https://i.pinimg.com/1200x/04/6d/a7/046da75f7ccc468073da4bfec3b58f06.jpg",
    context: [
      "La fonction d'auditeur interne est fréquemment exercée par des cadres expérimentés nécessitant une méthodologie rigoureuse. La réussite d'une mission d'audit repose sur la maîtrise des outils de diagnostic et de contrôle interne.",
    ],
    results: [
      "Savoir conduire une mission d'audit interne de A à Z",
      "Être capable d'évaluer le dispositif de contrôle interne",
      "Établir des questionnaires d'audit adaptés aux enjeux",
      "Rédiger des rapports d'audit percutants et des comptes rendus de révision",
    ],
  },
  {
    id: "audit-comptable",
    icon: BarChart3,
    title: "Audit comptable et financier",
    summary: "Contrôle des risques et garantie de la fiabilité des états financiers pour les décideurs et directions financières.",
    image: "https://i.pinimg.com/736x/be/fd/dd/befddd6f1a22fc176dd3060309240a2d.jpg",
    context: [
      "Dans un environnement exigeant la fiabilité absolue des comptes, cette formation transmet les démarches de révision et les techniques d'audit financier conforme aux normes de la profession.",
    ],
    results: [
      "Acquérir l'essentiel de la démarche d'audit financier",
      "Effectuer les contrôles et validations de comptes",
      "Formuler des conclusions constructives pour la direction générale",
    ],
  },
  {
    id: "entrepreneuriat",
    icon: Lightbulb,
    title: "Initiation à l'entrepreneuriat & Montage de Projet",
    summary: "De l'idée de projet jusqu'à la création d'entreprise et l'élaboration du Business Plan.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
    context: [
      "Pour révéler le potentiel des jeunes bacheliers et diplômés de l'enseignement supérieur, ce volet accompagne chaque porteur de projet de l'idée initiale jusqu'au financement et au lancement opérationnel.",
    ],
    results: [
      "Acquérir une solide culture entrepreneuriale",
      "Disposer d'un Business Plan pertinent et crédible",
      "Savoir présenter son projet à des partenaires financiers et investisseurs",
    ],
  },
];

const admissionDetails = [
  {
    icon: Clock,
    title: "Durée & Pédagogie (1/3 Théorie, 2/3 Pratique)",
    desc: "3 mois (420 heures intensives). 1/3 de théorie et 2/3 de cas pratiques pour garantir des apprenants immédiatement opérationnels.",
  },
  {
    icon: GraduationCap,
    title: "Alternance & Certificat Métier",
    desc: "Parcours en alternance validé par un certificat attestant des compétences techniques acquises auprès des entreprises partenaires.",
  },
  {
    icon: FileCheck2,
    title: "Recrutements de Qualité",
    desc: "Sélection sur dossier, test et entretien fondés sur 3 critères fondamentaux : la confiance, l'éthique et l'évaluation des compétences.",
  },
  {
    icon: Briefcase,
    title: "Période de Stage & Placement",
    desc: "Accompagnement individualisé par les responsables de formation jusqu'à l'obtention d'une entreprise d'accueil et le placement en emploi.",
  },
];

const softwareTools = [
  { name: "Logiciel de Comptabilité Générale (Sage)", desc: "Saisie des journaux, lettrage, révision des comptes et génération des bilans." },
  { name: "Logiciel de Paie", desc: "Établissement des bulletins de paie, calcul des cotisations sociales et déclarations." },
  { name: "Tableur Excel Avancé", desc: "Modélisation de tableaux de bord, formules financières, états de rapprochement." },
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
      {formations.map(({ id, icon: Icon, title, image, context, prerequisites, objectives, modules, results }, index) => (
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

              {modules && (
                <div className="formations-modules-box">
                  <h3>Programme détaillé & Modules</h3>
                  <div className="formations-modules-list">
                    {modules.map((m) => (
                      <div key={m.name} className="formations-module-item">
                        <h4>{m.name}</h4>
                        <p>{m.details}</p>
                      </div>
                    ))}
                  </div>
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
                S'inscrire / En savoir plus
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Modalités d'admission & d'organisation */}
      <section className="formations-section formations-section-alt">
        <div className="formations-container">
          <div className="text-center mb-12">
            <span className="formations-eyebrow">Modalités & Admission</span>
            <h2 className="formations-section-title">Comment rejoindre nos formations</h2>
            <p className="formations-text" style={{ maxWidth: "680px", margin: "0 auto" }}>
              Un processus d'admission rigoureux et un encadrement personnalisé pour garantir la réussite de chaque apprenant.
            </p>
          </div>

          <div className="formations-admission-grid">
            {admissionDetails.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="formations-admission-card">
                <div className="formations-admission-icon">
                  <Icon className="icon-md" />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          {/* Outils informatiques enseignés */}
          <div className="formations-tools-box">
            <div className="formations-tools-title-row">
              <Monitor className="icon-md text-accent" />
              <h3>Outils informatiques enseignés</h3>
            </div>
            <div className="formations-tools-grid">
              {softwareTools.map((tool) => (
                <div key={tool.name} className="formations-tool-item">
                  <h4>{tool.name}</h4>
                  <p>{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires & Débouchés */}
      <section className="formations-section">
        <div className="formations-container formations-partners">
          <span className="formations-eyebrow">Partenaires & Réseau</span>
          <h2 className="formations-section-title formations-partners-title">
            Ils soutiennent nos apprenants et nos diplômés
          </h2>
          <p className="formations-text" style={{ maxWidth: "600px", margin: "0 auto 32px" }}>
            Nos formations s'appuient sur un réseau de cabinets d'expertise comptable et de recrutement de premier plan : <strong>Cabinet CAMOI</strong>, <strong>Cabinet EXPERT CONSEILS</strong> et <strong>Cabinet MRH</strong>.
          </p>
          <PartnersCarousel />
        </div>
      </section>

      <Footer />
    </div>
  );
}

