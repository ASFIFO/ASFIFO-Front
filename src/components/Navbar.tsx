import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from '../assets/LOGO_ASFIFO_DEF.png'

type NavbarProps = {
  showAfterScroll?: boolean;
};

export default function Navbar({ showAfterScroll = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (!showAfterScroll) {
      document.body.classList.remove("scrolled");
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    const onScroll = () => {
      const isScrolled = window.scrollY > 80;
      setScrolled(isScrolled);
      document.body.classList.toggle("scrolled", isScrolled);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.body.classList.remove("scrolled");
    };
  }, [showAfterScroll]);

  // Valeur dérivée : pas besoin de state ni de setState synchrone dans l'effet
  const showSticky = showAfterScroll ? scrolled : true;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`top-navbar ${showSticky ? "visible" : ""} ${showAfterScroll ? "" : "always-visible"}`}>
      <div className="top-navbar-inner">
        <Link to="/" className="jewel-brand">
          <img
            src={logo}
            alt="ASFIFO Formation"
            className="jewel-brand-logo"
          />
        </Link>

        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`jewel-menu ${isMenuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
          <li><Link to="/a-propos" onClick={closeMenu}>À propos</Link></li>
          <li><Link to="/formations" onClick={closeMenu}>Formations</Link></li>
          <li><Link to="/blog" onClick={closeMenu}>Actualités</Link></li>
          <li><Link to="/contact" className="contact-btn" onClick={closeMenu}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}