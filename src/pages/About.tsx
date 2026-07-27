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

const contextStats = [
  { value: "200 000+", label: "Sociétés recensées à Madagascar" },
  { value: "75%", label: "Des TPE/PME dans le secteur agricole" },
  { value: "93%", label: "De l'économie dans l'informel" },
  { value: "40%", label: "Des TPE/PME disparaissent en 3 à 4 ans" },
];

const parcours = [
  {
    title: "Formation Professionnelle Métier Comptable",
    duration: "6 mois",
    text: "Formation en alternance pour des comptables opérationnels en entreprise.",
  },
  {
    title: "Parcours dirigeants",
    duration: "12 mois",
    text: "Destiné aux dirigeants de TPE/PME, pour atteindre la performance globale du dirigeant et de son entreprise, au service de la croissance et de la pérennisation de son activité.",
  },
  {
    title: "Formation en entrepreneuriat Jeunesse",
    duration: "10 mois",
    text: "Pour les étudiants (niveau licence minimum), afin de révéler leur potentiel entrepreneurial et les accompagner dans la réalisation de leur projet.",
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
    text: "Un suivi post-formation pour aider chaque participant à mettre en pratique ce qu'il a appris.",
  },
];

const realisations = [
  { title: "Formation de dirigeants TPE/PME", date: "Décembre 2018", image: dirigeantsTpePme },
  { title: "Formation comptable en alternance", date: "Session 2018", image: comptableAlternance },
  { title: "Conférence sur l'entrepreneuriat — CFFAMMA Antsirabe", date: "Juin 2019", image: cffammaConference },
  { title: "Atelier pratique sur l'entrepreneuriat — CFFAMMA Antsirabe", date: "Juin 2019", image: cffammaAtelier },
  { title: "Conférence sur l'entrepreneuriat — Université IMGAM", date: "Février 2020", image: imgamConference },
  { title: "Sensibilisation à l'entrepreneuriat des jeunes — Ambatolampy", date: "Mars 2020", image: ambatolampyConference },
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

      {/* Qui sommes-nous */}
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
            <span className="about-eyebrow">Qui sommes-nous</span>
            <h2 className="about-section-title">
              La formation est une question de passion, pas seulement de compétences
            </h2>
            <p className="about-text">
              ASFIFO — Asa Fiofanana Foibe — est un Centre de Formation
              Professionnelle Métier spécialisé dans l'apprentissage en
              alternance. Sa vocation : mettre l'expérience et la compétence
              de son équipe au service des jeunes issus de filières en
              comptabilité, ainsi que des dirigeants de TPE/PME, en
              particulier du secteur agricole.
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

      {/* Contexte */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <span className="about-eyebrow">Contexte</span>
          <h2 className="about-section-title about-context-title">
            Un besoin croissant de fiabilité et d'accompagnement
          </h2>
          <p className="about-text about-context-text">
            Notre concept de formation professionnelle métier en alternance
            de « Comptable » répond à une demande croissante des entreprises,
            due à un besoin de fiabilité de leurs données financières. Sur le
            terrain des TPE/PME malgaches, le constat est sans appel :
          </p>

          <div className="about-stats-grid">
            {contextStats.map((stat) => (
              <div key={stat.label} className="about-stat">
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fondatrice */}
      <section className="about-section">
        <div className="about-container about-team">
          <span className="about-eyebrow">Notre fondatrice</span>
          <h2 className="about-section-title about-team-title">
            Une expertise au service de votre réussite
          </h2>

          <div className="about-team-card">
            <img
              src={founderPhoto}
              alt="Tantely Rahoeliarivahy Rajobson, fondatrice d'ASFIFO"
              className="about-team-avatar-photo"
            />
            <h3>Tantely Rahoeliarivahy Rajobson</h3>
            <p className="about-team-role">Fondatrice — Expert-comptable et Commissaire aux comptes</p>
            <p className="about-team-bio">
              Diplômée de Paris, également enseignante et formatrice depuis
              plus de 15 ans, elle a fondé ASFIFO après avoir constaté que le
              manque d'accompagnement des dirigeants de TPE/PME limite trop
              souvent leur pérennité et leur croissance — alors que le
              potentiel de production et de services reste important sur le
              marché local et international.
            </p>
            <p className="about-team-bio">
              Membre d'un mouvement de dirigeants d'entreprises composé en
              majorité de dirigeants étrangers, elle a choisi de partager ses
              compétences avec ses compatriotes malgaches. En tant que femme
              chef d'entreprise, encourager l'entrepreneuriat responsable fait
              partie de ses engagements.
            </p>
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

          <div className="about-realisations-grid">
            {realisations.map((item) => (
              <div key={item.title} className="about-realisation-item">
                <img src={item.image} alt={item.title} className="about-realisation-image" />
                <div className="about-realisation-body">
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
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
