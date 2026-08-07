import { Link } from "react-router-dom";
import "./Footer.css";
import { GraduationCap, ShieldCheck, Users, Clock } from "lucide-react";

const footerFeatures = [
  { icon: GraduationCap, title: "Formateurs experts", text: "Professionnels certifiés en audit et comptabilité" },
  { icon: ShieldCheck, title: "Certification reconnue", text: "Attestations valorisées par nos partenaires" },
  { icon: Users, title: "Accompagnement personnalisé", text: "Un suivi individuel tout au long du parcours" },
  { icon: Clock, title: "Sessions flexibles", text: "Formations en journée ou en soirée" },
];

const footerColumns = [
  {
    title: "Formations",
    links: [
      { label: "Formation Métier Comptable", to: "/formations#metier-comptable" },
      { label: "Parcours dirigeants", to: "/formations#parcours-dirigeants" },
      { label: "Audit interne", to: "/formations#audit-interne" },
      { label: "Audit comptable et financier", to: "/formations#audit-comptable" },
      { label: "Initiation à l'entrepreneuriat", to: "/formations#entrepreneuriat" },
    ],
  },
  {
    title: "Actualités",
    links: [
      { label: "Formation comptable en alternance", to: "/blog#formation-comptable-alternance" },
      { label: "Conférence à l'Université d'ITASY", to: "/blog#conference-itasy" },
      { label: "Sensibilisation à l'entrepreneuriat des jeunes", to: "/blog#sensibilisation-ambatolampy" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "Notre histoire", to: "/a-propos" },
      { label: "Nos partenaires", to: "/a-propos#partenaires" },
      { label: "Carrières", to: "#" },
      { label: "Contactez-nous", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <>
      {/* Feature strip */}
      <section className="site-features-strip">
        <div className="site-features-grid">
          {footerFeatures.map(({ icon: Icon, title, text }) => (
            <div key={title} className="site-feature-item">
              <Icon className="site-icon-md" strokeWidth={1.5} />
              <div>
                <p className="site-feature-title">{title}</p>
                <p className="site-feature-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="site-footer-grid">
          <div>
            <img
              src="https://www.asfifo.mg/wp-content/uploads/2023/08/Logo-1.png"
              alt="ASFIFO Formation"
              className="site-footer-logo"
            />
            <p className="site-footer-tagline">L'avenir c'est toi qui décide.</p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="site-footer-col-title">{col.title}</p>
              <ul className="site-footer-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="site-footer-col-title">Newsletter</p>
            <p className="site-footer-newsletter-text">
              Abonnez-vous pour recevoir nos actualités et les prochaines
              sessions de formation.
            </p>
            <div className="site-newsletter-form">
              <input type="email" placeholder="Votre adresse e-mail" />
              <button>S'ABONNER</button>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>© 2026 ASFIFO Formation. Tous droits réservés.</span>
          <div className="site-footer-bottom-links">
            <a href="#">Politique de confidentialité</a>
            <a href="#">Conditions d'utilisation</a>
          </div>
        </div>
      </footer>
    </>
  );
}
