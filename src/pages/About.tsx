import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PartnersCarousel from "../components/PartnersCarousel";
import "./About.css";
import {
  ChevronRight,
  BookOpenCheck,
  Building2,
  GraduationCap,
  Wrench,
  Handshake,
  ShieldCheck,
  Award,
  Compass,
  Users,
  CheckCircle2,
  UserCheck,
  Layers,
} from "lucide-react";
import founderPhoto from "../assets/founder-tantely.png";
import dirigeantsTpePme from "../assets/realisations/dirigeants-tpe-pme.png";
import comptableAlternance from "../assets/realisations/comptable-alternance.png";
import cffammaConference from "../assets/realisations/cffamma-conference.png";
import cffammaAtelier from "../assets/realisations/cffamma-atelier.png";
import imgamConference from "../assets/realisations/imgam-conference.jpg";
import ambatolampyConference from "../assets/realisations/ambatolampy-conference.jpg";
import itasyConference from "../assets/realisations/itasy-conference.jpg";
import itasyMontageProjet from "../assets/realisations/itasy-montage-projet.jpg";

const observations = [
  {
    icon: BookOpenCheck,
    title: "Théorie vs pratique",
    text: "Il existe une inadéquation évidente entre l'apprentissage théorique académique et les réalités du monde du travail.",
  },
  {
    icon: Building2,
    title: "Accompagnement des PME",
    text: "Le manque d'accompagnement des dirigeants de TPE/PME est l'une des raisons majeures de la courte durée de vie ou du développement limité de ces entreprises.",
  },
];

const valuesList = [
  {
    icon: ShieldCheck,
    title: "Éthique",
    text: "Maintenir l'Indépendance, l'Intégrité et l'Impartialité en toutes circonstances.",
  },
  {
    icon: Award,
    title: "Compétence",
    text: "Assurer continuellement la qualité de nos services et enseignements.",
  },
  {
    icon: Compass,
    title: "Vision",
    text: "Construire sa stratégie pour planifier et décider avec efficacité.",
  },
  {
    icon: Users,
    title: "Partage",
    text: "Travailler avec l'ensemble des parties prenantes pour atteindre une performance globale.",
  },
];

const visionPillars = [
  "Les principes fondamentaux de la comptabilité",
  "Les travaux de base comptable (saisie, journaux, lettrage)",
  "Les travaux d'analyse et de révision des comptes",
  "Les travaux de clôture (amortissements, provisions, états financiers)",
  "Les obligations de déclarations fiscales et sociales",
];

const contextStats = [
  { value: "200 000+", label: "Sociétés recensées à Madagascar" },
  { value: "75%", label: "Des TPE/PME dans le secteur agricole" },
  { value: "93%", label: "De l'économie dans l'informel" },
  { value: "40%", label: "Des TPE/PME disparaissent en 3 à 4 ans" },
];

const teamMembers = [
  {
    name: "Tantely RAHOELIARIVAHY RAJOBSON",
    role: "Fondatrice & Expert-Comptable",
    desc: "Diplômée de France, inscrite au Tableau A de l'OECFM. Présidente de la Commission Éthique & Déontologie de l'OECFM, Présidente de la FEDEM. 15+ ans d'expériences en expertise comptable, audit et enseignement Master II.",
    badge: "Expert-comptable",
  },
  {
    name: "Philippe RICOUL",
    role: "Formateur Parcours Dirigeants",
    desc: "Expert en accompagnement stratégique des chefs d'entreprises, coaching professionnel, management et leadership.",
    badge: "Management & Coaching",
  },
  {
    name: "Niaina RANDRIAMALALA",
    role: "Expert-Comptable & Formateur",
    desc: "Expert-comptable diplômé, spécialisé en audit financier, révision comptable et ingénierie de formation.",
    badge: "Audit & Comptabilité",
  },
  {
    name: "Liva RAKOTONANAHARY",
    role: "Formateur Comptable Expérimenté",
    desc: "Comptable praticien fort d'une longue expérience en cabinet d'expertise comptable et en entreprise.",
    badge: "Comptabilité praticienne",
  },
  {
    name: "Victoire RANDRIAMORASATA",
    role: "Formatrice Comptable Expérimentée",
    desc: "Spécialiste de la gestion comptable, paie et déclarations sociales auprès des TPE/PME et cabinets.",
    badge: "Paie & Gestion",
  },
  {
    name: "Noromalala ANDRIAMANALINARIVO",
    role: "Responsable Corps Administratif",
    desc: "Coordination pédagogique, gestion des dossiers des apprenants et suivi des parcours de formation.",
    badge: "Administration",
  },
];

const parcours = [
  {
    title: "Formation Professionnelle Métier Comptable",
    duration: "3 mois (420h)",
    text: "Formation en alternance ou initiale pour former des comptables immédiatement opérationnels en entreprise.",
  },
  {
    title: "Parcours Dirigeants et Cadres",
    duration: "À la carte (3 à 12 mois)",
    text: "Destiné aux dirigeants de TPE/PME, pour atteindre la performance globale du dirigeant et de son entreprise.",
  },
  {
    title: "Formation en Entrepreneuriat Jeunesse",
    duration: "6 à 10 mois",
    text: "Pour les étudiants (niveau Licence minimum), afin de révéler leur potentiel entrepreneurial et concrétiser leur Business Plan.",
  },
];

const approach = [
  {
    icon: GraduationCap,
    title: "Apprentissage pratique",
    text: "Des études de cas réels et des mises en situation pour rendre chaque participant opérationnel dès la fin de sa formation.",
  },
  {
    icon: Wrench,
    title: "Outils opérationnels",
    text: "Chaque session se conclut par la remise d'outils de travail concrets, directement applicables sur le terrain.",
  },
  {
    icon: Handshake,
    title: "Accompagnement après formation",
    text: "Un suivi post-formation et un accompagnement jusqu'à l'obtention d'une entreprise d'accueil pour la période de stage.",
  },
];

// TODO [À CONFIRMER] : la cliente souhaite mettre en avant des réalisations
// dédiées à la formation des femmes en milieu rural. Aucune réalisation
// existante ne correspond précisément à cette thématique — ajouter l'entrée
// (titre / date / photo) dès qu'elle sera communiquée, plutôt que d'étiqueter
// une réalisation existante par erreur.
const realisations = [
  { title: "Formation de dirigeants TPE/PME", date: "Décembre 2018", image: dirigeantsTpePme },
  { title: "Formation comptable en alternance", date: "Session 2018", image: comptableAlternance },
  { title: "Conférence sur l'entrepreneuriat — CFFAMMA Antsirabe", date: "Juin 2019", image: cffammaConference },
  { title: "Atelier pratique sur l'entrepreneuriat — CFFAMMA Antsirabe", date: "Juin 2019", image: cffammaAtelier },
  { title: "Conférence sur l'entrepreneuriat — Université IMGAM", date: "Février 2020", image: imgamConference },
  { title: "Sensibilisation à l'entrepreneuriat des jeunes — Ambatolampy", date: "Mars 2020", image: ambatolampyConference, tags: ["Jeunesse"] },
  { title: "Conférence sur l'entrepreneuriat — Université d'ITASY", date: "Décembre 2019", image: itasyConference },
  { title: "Montage de projet et Business Plan — Université d'ITASY", date: "Décembre 2020", image: itasyMontageProjet },
];

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      {/* Bannière de titre */}
      <header
        className="about-banner"
        style={{
          backgroundImage:
            "linear-gradient(160deg, rgba(0,40,45,0.88), rgba(0,72,81,0.72)), url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80')",
        }}
      >
        <div className="about-banner-text">
          <h1>À propos</h1>
          <p className="about-breadcrumb">
            <Link to="/">Accueil</Link>
            <ChevronRight className="about-breadcrumb-icon" />
            <span>À propos</span>
          </p>
        </div>
      </header>

      {/* Citation d'ouverture */}
      <section className="about-quote-banner">
        <p>
          « Ne demandez pas ce que votre pays peut faire pour vous. Demandez
          ce que vous pouvez faire pour votre pays »
        </p>
        <span>JF Kennedy</span>
      </section>

      {/* Qui sommes-nous & Historique CAMOI */}
      <section className="about-section">
        <div className="about-container about-who-grid">
          <div className="about-who-photo">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
              alt="Accompagnement ASFIFO Formation"
            />
            <div className="about-quote-card">
              <p>"L'avenir c'est toi qui décide."</p>
              <span>ASFIFO Formation</span>
            </div>
          </div>

          <div className="about-who-content">
            <span className="about-eyebrow">Qui sommes-nous & Historique</span>
            <h2 className="about-section-title">
              Près de 10 ans d'existence au service de la formation professionnelle métier
            </h2>
            <p className="about-text">
              Le cabinet CAMOI a été créé début 2008 par un Expert-Comptable - Commissaire aux Comptes diplomé en France et inscrit à l'Ordre des Experts Comptables et Financiers Malgaches (OECFM). Forte de cette expertise terrain, l'entité <strong>ASFIFO (Asa Fiofanana Foibe)</strong> a été intégrée au groupe en septembre 2016 comme Centre de Formation Professionnelle Métier.
            </p>
            <p className="about-text">
              Notre vocation : répondre à la demande croissante des entreprises en matière de fiabilité des données financières en préparant les jeunes diplômés (Bacc+2/3) et les collaborateurs d'entreprises à devenir immédiatement opérationnels.
            </p>

            <div className="about-who-points">
              {observations.map(({ icon: Icon, title, text }) => (
                <div key={title} className="about-who-point">
                  <span className="about-who-point-icon">
                    <Icon className="icon-sm" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/contact" className="about-btn">
              Nous contacter
            </Link>

            <p className="about-legal-note">
              Centre agréé par le Ministère de l'Emploi, de l'Enseignement
              Technique et de la Formation Professionnelle — arrêtés
              n°4157/2017/MEETFP (création) et n°4156/2017/MEETFP
              (agrément), ouvert en mars 2017.
            </p>
          </div>
        </div>
      </section>

      {/* Nos 4 Valeurs & Vision */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="about-values-header">
            <span className="about-eyebrow">Nos engagements</span>
            <h2 className="about-section-title">Nos 4 Valeurs Fondamentales & Notre Vision</h2>
            <p className="about-text" style={{ maxWidth: "700px" }}>
              Le groupe CAMOI et le centre ASFIFO s'attachent à mettre en pratique 4 grandes valeurs pour réunir l'excellence technique et le développement éthique.
            </p>
          </div>

          <div className="about-values-grid">
            {valuesList.map(({ icon: Icon, title, text }) => (
              <div key={title} className="about-value-card">
                <div className="about-value-icon">
                  <Icon className="icon-md" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="about-vision-box">
            <div className="about-vision-title-row">
              <Layers className="icon-md text-accent" />
              <h3>Notre Vision Pédagogique</h3>
            </div>
            <p className="about-text">
              Notre ambition est qu'à l'issue de leur session de formation de 3 mois (420h), nos apprenants maîtrisent parfaitement les 5 axes essentiels :
            </p>
            <ul className="about-vision-list">
              {visionPillars.map((pillar) => (
                <li key={pillar}>
                  <CheckCircle2 className="icon-sm text-accent" />
                  <span>{pillar}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contexte économique */}
      <section className="about-section">
        <div className="about-container">
          <span className="about-eyebrow">Contexte économique</span>
          <h2 className="about-section-title about-context-title">
            Un besoin croissant de fiabilité et d'accompagnement
          </h2>
          <p className="about-text about-context-text">
            Les études du Doing Business soulignent les défis majeurs des entreprises malgaches concernant l'accès au crédit, l'emploi et la création d'entreprises. Notre concept de formation métier répond directement à cette exigence du marché :
          </p>

          <div className="about-stats-grid">
            {contextStats.map((stat) => (
              <div key={stat.label} className="about-stat">
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* TODO [À CONFIRMER] : source exacte de ces statistiques à obtenir
              auprès de la cliente (étude Doing Business ? INSTAT ? autre ?). */}
          <p className="about-stats-source">Source : à confirmer</p>
        </div>
      </section>

      {/* Fondatrice */}
      <section className="about-section about-section-alt">
        <div className="about-container about-team">
          <span className="about-eyebrow">Notre fondatrice</span>
          <h2 className="about-section-title about-team-title">
            Une expertise certifiée au service de votre réussite
          </h2>

          <div className="about-team-card">
            <img
              src={founderPhoto}
              alt="Tantely Rahoeliarivahy Rajobson, fondatrice d'ASFIFO"
              className="about-team-avatar-photo"
            />
            <h3>Tantely RAHOELIARIVAHY RAJOBSON</h3>
            <p className="about-team-role">Fondatrice — Expert-Comptable & Commissaire aux Comptes (OECFM)</p>
            <p className="about-team-bio">
              Diplômée d'Expertise Comptable en France (mai 2004) et habilitée à exercer à Madagascar (Tableau A de l'OECFM depuis 2009). Présidente de la Commission Éthique et Déontologie de l'OECFM et Présidente de la FEDEM, qui regroupe des dirigeants du secteur public et privé. Elle possède 10 ans d'expérience en ingénierie de formation et 15 ans d'expérience en comptabilité, audit et conseil.
            </p>
            <p className="about-team-bio">
              Enseignante vacataire en Master II Audit & Contrôle à l'Université d'Ankatso (DEGS) et ancienne intervenante à l'ISCAM et à l'École Internationale de Comptabilité (EIC en partenariat avec l'INTEC France). Elle anime également des jeux d'entreprises pour dirigeants (I Nove You, Alliance Pursuit) et a formé les contrôleurs des impôts (DGI) sur la comptabilité PCG et les enjeux fiscaux.
            </p>
          </div>
        </div>
      </section>

      {/* Équipe Pédagogique & Intervenants */}
      <section className="about-section">
        <div className="about-container">
          <div className="text-center mb-12">
            <span className="about-eyebrow">Équipe & Formateurs</span>
            <h2 className="about-section-title">Formateurs et Corps d'Encadrement</h2>
            <p className="about-text" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Des professionnels en activité (experts-comptables, contrôleurs, dirigeants) engagés pour transmettre un savoir-faire opérationnel.
            </p>
          </div>

          <div className="about-instructors-grid">
            {teamMembers.map((member) => (
              <div key={member.name} className="about-instructor-card">
                <div className="about-instructor-header">
                  <div className="about-instructor-avatar">
                    <UserCheck className="icon-md" />
                  </div>
                  <div>
                    <h3>{member.name}</h3>
                    <span className="about-instructor-role">{member.role}</span>
                  </div>
                </div>
                <p className="about-instructor-desc">{member.desc}</p>
                <span className="about-instructor-badge">{member.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos parcours de formation */}
      <section className="about-section about-section-alt">
        <div className="about-container about-parcours-grid">
          <div className="about-parcours-intro">
            <span className="about-eyebrow">Nos parcours</span>
            <h2 className="about-pull-quote">
              Les limites de l'Entreprise sont les limites du dirigeant
            </h2>
            <p className="about-text">
              Pour convaincre les instituts financiers, le dirigeant doit
              mettre en place une stratégie globale et une organisation
              fiable. La culture entrepreneuriale est un défi prioritaire
              pour les dirigeants malgaches, et surtout pour les jeunes,
              afin de contribuer au développement durable du pays.
            </p>
            <p className="about-mandela-quote">
              « Je ne perds jamais. Soit je gagne, soit j'apprends »
              <span>Nelson Mandela</span>
            </p>
          </div>

          <div className="about-parcours-list">
            {parcours.map((item) => (
              <div key={item.title} className="about-parcours-item">
                <div className="about-parcours-header">
                  <h3>{item.title}</h3>
                  <span className="about-parcours-duration">{item.duration}</span>
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approche - bannière + cartes */}
      <section className="about-approach">
        <div
          className="about-approach-banner"
          style={{
            backgroundImage:
              "linear-gradient(160deg, rgba(0,40,45,0.88), rgba(0,72,81,0.72)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80')",
          }}
        >
          <span className="about-eyebrow about-eyebrow-light">Notre approche</span>
          <h2>
            Développez votre expertise avec des formations sur-mesure
          </h2>
          <p>
            De l'initiation à l'entrepreneuriat à la certification en audit et
            en comptabilité, notre équipe s'engage à faire de chaque étape de
            votre formation une expérience professionnalisante.
          </p>
          <Link to="/contact" className="about-btn about-btn-light">
            Nous contacter
          </Link>
        </div>

        <div className="about-container about-approach-cards">
          {approach.map(({ icon: Icon, title, text }) => (
            <div key={title} className="about-card">
              <span className="about-card-icon">
                <Icon className="icon-md" />
              </span>
              <h3 className="about-card-title">{title}</h3>
              <p className="about-card-text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quelques réalisations */}
      <section className="about-section">
        <div className="about-container">
          <span className="about-eyebrow">Nos réalisations</span>
          <h2 className="about-section-title about-team-title">
            Quelques réalisations
          </h2>
          <p className="about-text" style={{ maxWidth: "760px" }}>
            Nos actions couvrent la formation des jeunes, la formation des
            femmes en milieu rural et l'entrepreneuriat rural, à travers des
            sessions de formation, des conférences et des ateliers organisés
            dans plusieurs régions de Madagascar.
          </p>

          <div className="about-realisations-grid">
            {realisations.map((item) => (
              <div key={item.title} className="about-realisation-item">
                <img src={item.image} alt={item.title} className="about-realisation-image" />
                <div className="about-realisation-body">
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                  {item.tags && (
                    <div className="about-realisation-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="about-realisation-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section id="partenaires" className="about-section about-section-alt">
        <div className="about-container about-partners">
          <span className="about-eyebrow">Nos partenaires</span>
          <h2 className="about-section-title about-team-title">
            Ils soutiennent et reconnaissent nos formations
          </h2>
          <PartnersCarousel />
        </div>
      </section>

      <Footer />
    </div>
  );
}

