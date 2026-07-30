import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./PartnersCarousel.css";

const partners = [
  {
    name: "Camoi 3.0",
    logo: "https://www.asfifo.mg/wp-content/uploads/2024/07/Camoi_30.svg",
  },
  {
    name: "Experts Conseil",
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
  {
    name: "Fivmpama",
    logo: "https://www.asfifo.mg/wp-content/uploads/2023/10/fivmpama.png",
  },
];

export default function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const rotationIndexRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    rotationIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestIndex = index;
            bestRatio = entry.intersectionRatio;
          }
        });
        if (bestIndex >= 0) setActiveIndex(bestIndex);
      },
      {
        root: track,
        rootMargin: "0px -38% 0px -38%",
        threshold: [0.3, 0.5, 0.7, 0.9],
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Centre un élément dans le carrousel en ne faisant défiler que le
  // conteneur horizontal (.pc-track), jamais la page : on évite ainsi
  // scrollIntoView, qui peut aussi déplacer le scroll vertical de la page.
  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const item = itemRefs.current[index];
    if (!track || !item) return;
    const targetLeft = item.offsetLeft - track.clientWidth / 2 + item.offsetWidth / 2;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  // Rotation automatique du carrousel : avance sur un compteur indépendant
  // pour garantir un défilement réel à chaque tick, quel que soit l'élément
  // que l'IntersectionObserver considère actuellement comme centré.
  useEffect(() => {
    if (isPaused) return;

    const id = window.setInterval(() => {
      rotationIndexRef.current = (rotationIndexRef.current + 1) % partners.length;
      scrollToIndex(rotationIndexRef.current);
    }, 2800);

    return () => window.clearInterval(id);
  }, [isPaused]);

  const scrollByAmount = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const item = itemRefs.current[0];
    const step = item ? item.offsetWidth + 32 : 200;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div
      className="partners-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        type="button"
        className="pc-nav pc-nav-prev"
        aria-label="Partenaire précédent"
        onClick={() => scrollByAmount(-1)}
      >
        <ChevronLeft className="pc-nav-icon" />
      </button>

      <div className="pc-track" ref={trackRef}>
        {partners.map((partner, index) => (
          <div
            key={partner.name}
            className={`pc-item ${index === activeIndex ? "pc-item-active" : ""}`}
            data-index={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
          >
            <div className="pc-logo-wrap">
              <img src={partner.logo} alt={partner.name} className="pc-logo" />
            </div>
            <p className="pc-name">{partner.name}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="pc-nav pc-nav-next"
        aria-label="Partenaire suivant"
        onClick={() => scrollByAmount(1)}
      >
        <ChevronRight className="pc-nav-icon" />
      </button>
    </div>
  );
}
