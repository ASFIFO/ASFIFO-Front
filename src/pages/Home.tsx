import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaCertificate,
  FaUsers,
  FaClock,
  FaArrowRight,
} from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PartnersCarousel from "../components/PartnersCarousel";
import "./Home.css";
import { whatsappImages } from "../components/data/formations";

const trainings = [
  {
    id: "audit-interne",
    name: "Audit interne",
    description: "Maîtrisez les diligences et méthodes de l'audit interne.",
    img: whatsappImages[0],
  },
  {
    id: "audit-comptable",
    name: "Audit comptable et financier",
    description: "Analysez et fiabilisez l'information financière.",
    img: whatsappImages[1],
  },
  {
    id: "comptabilite",
    name: "Comptabilité",
    description: "Les diverses diligences du métier comptable.",
    img: whatsappImages[2],
  },
];

const features = [
  {
    title: "Formateurs experts",
    description: "Des professionnels de l'audit et de la comptabilité.",
    icon: FaGraduationCap,
  },
  {
    title: "Certification reconnue",
    description: "Des attestations valorisées par nos partenaires.",
    icon: FaCertificate,
  },
  {
    title: "Accompagnement personnalisé",
    description: "Un suivi individuel tout au long du parcours.",
    icon: FaUsers,
  },
  {
    title: "Sessions flexibles",
    description: "Formations en journée ou en soirée.",
    icon: FaClock,
  },
];

// On double la liste pour s'assurer qu'elle remplisse bien l'écran
const extendedFeatures = [...features, ...features];

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-glass-panel">
          <div className="hero-main-row">
            <div className="hero-content">
              <h1>Devenir professionnel dans votre métier</h1>

              <div>
                <div className="hero-cta-row">
                  <Link to="/contact">
                    <button className="btn btn-light">Nous contacter</button>
                  </Link>
                  <Link to="/contact" className="hero-arrow-btn" aria-label="Nous contacter">
                    <FaArrowRight />
                  </Link>
                </div>

                <p className="hero-shop-title">
                  Comptabilité, Audit et Entrepreneuriat
                </p>
                <p className="hero-subtitle">
                  Un apprentissage pratique porté par des formateurs experts,
                  pour vous accompagner jusqu'à la certification. L'avenir
                  c'est toi qui décide.
                </p>
              </div>
            </div>

            <div className="hero-right-content">
              <div className="hero-card clients-card">
                <div>
                  <h3>05</h3>
                  <p style={{ color: "white" }}>Domaines de formation</p>
                </div>
              </div>

              <div className="hero-card detail-card">
                <img
                  src={whatsappImages[5]}
                  alt="Parcours dirigeants en entrepreneuriat"
                />
                <div>
                  <h4>Parcours dirigeants en entrepreneuriat</h4>
                  <Link to="/contact">Voir la formation</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" aria-label="Nos atouts">
        <div className="features-carousel">
          <div className="features-track">

            {/* Premier groupe */}
            <div className="features-group">
              {extendedFeatures.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article key={`group1-${index}`} className="feature-item">
                    <div className="icon">
                      <Icon />
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>

            {/* Deuxième groupe identique pour une boucle parfaite */}
            <div className="features-group" aria-hidden="true">
              {extendedFeatures.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article key={`group2-${index}`} className="feature-item">
                    <div className="icon">
                      <Icon />
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      <section className="art-section">
        <img
          className="art-main-img"
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80"
          alt="Session de formation ASFIFO"
        />
        <div className="art-content">
          <h2>Notre mission</h2>
          <p>
            Former les futurs professionnels de la comptabilité, de l'audit
            et de l'entrepreneuriat à Madagascar, grâce à un apprentissage
            pratique et un accompagnement personnalisé.
          </p>
          <Link to="/contact">
            <button className="btn btn-outline">Nous contacter</button>
          </Link>
        </div>
        <img
          className="art-side-img"
          src={whatsappImages[3]}
          alt="Formation en comptabilité"
        />
      </section>

      <section className="collection">
        <div className="collection-left">
          <h2>Nos formations</h2>
          <p>
            Des programmes professionnalisants, adaptés à votre rythme et à
            vos objectifs de carrière.
          </p>
          <Link to="/formations">
            <button className="btn btn-outline">En savoir plus</button>
          </Link>
        </div>

        <div className="collection-grid">
          {trainings.map((training) => (
            <Link
              key={training.name}
              to={`/formations#${training.id}`}
              className="home-product-card"
            >
              <img src={training.img} alt={training.name} />
              <h4>{training.name}</h4>
              <p>{training.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="type-section type-section-partners">
        <div className="type-content type-content-centered">
          <h2>Nos partenaires</h2>
          <p>
            Des organisations professionnelles qui soutiennent et
            reconnaissent nos formations.
          </p>
        </div>
        <PartnersCarousel />
      </section>

      <Footer />
    </div>
  );
}
