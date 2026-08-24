import "./PartnersCarousel.css";

const partners = [
  {
    name: "Camoi 3.0",
    logo: "https://www.asfifo.mg/wp-content/uploads/2024/07/Camoi_30.svg",
  },
  {
    name: "Expert Conseils",
    logo: "https://www.asfifo.mg/wp-content/uploads/2023/10/exco-1.png",
  },
  {
    name: "CGA",
    logo: "https://www.asfifo.mg/wp-content/uploads/2023/10/CGA.jpg",
  },
  {
    name: "Fedem",
    logo: "https://www.asfifo.mg/wp-content/uploads/2023/10/Logo-1-768x768.png",
  },
  // TODO [À CONFIRMER] : logos officiels de Rekany, Agri Export et Agri
  // Connect à récupérer auprès de la cliente. En attendant, `logo: null`
  // affiche un placeholder (initiales) via `.pc-logo-placeholder`.
  {
    name: "Rekany",
    logo: null,
  },
  {
    name: "Agri Export",
    logo: null,
  },
  {
    name: "Agri Connect",
    logo: null,
  },
];

// On double la liste pour garantir qu'elle remplit bien l'écran (même
// logique que la bande des atouts de l'accueil, cf. Home.tsx).
const extendedPartners = [...partners, ...partners];

// Initiales utilisées par le placeholder tant qu'un logo n'est pas fourni.
function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

interface Partner {
  name: string;
  logo: string | null;
}

function PartnerItem({ partner }: { partner: Partner }) {
  return (
    <div className="pc-item">
      <div className="pc-logo-wrap">
        {partner.logo ? (
          <img src={partner.logo} alt={partner.name} className="pc-logo" />
        ) : (
          <span className="pc-logo-placeholder" aria-hidden="true">
            {getInitials(partner.name)}
          </span>
        )}
      </div>
      <p className="pc-name">{partner.name}</p>
    </div>
  );
}

// Défilement continu (marquee), comme la bande des atouts de l'accueil,
// plutôt qu'un carrousel par étapes : plus de saut d'un partenaire à
// l'autre, la bande glisse en boucle et se met en pause au survol.
export default function PartnersCarousel() {
  return (
    <div className="partners-carousel" aria-label="Nos partenaires">
      <div className="pc-track">
        {/* Premier groupe */}
        <div className="pc-group">
          {extendedPartners.map((partner, index) => (
            <PartnerItem key={`group1-${partner.name}-${index}`} partner={partner} />
          ))}
        </div>

        {/* Deuxième groupe identique pour une boucle parfaite */}
        <div className="pc-group" aria-hidden="true">
          {extendedPartners.map((partner, index) => (
            <PartnerItem key={`group2-${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
}
