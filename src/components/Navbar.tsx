import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

type NavbarProps = {
  showAfterScroll?: boolean;
};

export default function Navbar({ showAfterScroll = false }: NavbarProps) {
  const [showSticky, setShowSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    const onScroll = () => {
      const scrolled = window.scrollY > 80;
      setShowSticky(scrolled);
      document.body.classList.toggle("scrolled", scrolled);
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (!showAfterScroll) {
      setShowSticky(true);
      document.body.classList.remove("scrolled");
      return () => {
        window.removeEventListener("resize", onResize);
        document.body.classList.remove("scrolled");
      };
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.body.classList.remove("scrolled");
    };
  }, [showAfterScroll]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`top-navbar ${showSticky ? "visible" : ""} ${showAfterScroll ? "" : "always-visible"}`}>
      <div className="top-navbar-inner">
        <Link to="/" className="jewel-brand">
          <img
            src="https://www.asfifo.mg/wp-content/uploads/2023/08/Logo-1.png"
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
          <li><Link to="/formations" onClick={closeMenu}>Formations</Link></li>
          <li><Link to="/blog" onClick={closeMenu}>Actualités</Link></li>
          <li><Link to="/a-propos" onClick={closeMenu}>À propos</Link></li>
          <li><Link to="/contact" className="contact-btn" onClick={closeMenu}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}