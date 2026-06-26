/* =============================================================
   DESIGN: Dark Constellation — Navbar
   Transparent on top, blurs on scroll
   Logo: MW. | Nav links | PL/EN toggle | CTA
   ============================================================= */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation, Link } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get("scroll");
    if (scrollTo && location === "/") {
      setTimeout(() => {
        const el = document.querySelector(`#${scrollTo}`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 100);
    }
  }, [location]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (location === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/?scroll=${href.substring(1)}`;
    }
  };

  const navBg = scrolled
    ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
    : "bg-transparent";

  const linkClass = "text-sm text-muted-foreground hover:text-primary transition-colors";
  const linkStyle = { fontFamily: "'DM Sans', sans-serif", fontWeight: 400 };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container flex items-center justify-between h-16">

        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex flex-col items-start hover:opacity-80 transition-opacity shrink-0"
        >
          <span
            className="text-foreground font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", letterSpacing: "-0.01em" }}
          >
            MW<span className="text-primary">.</span>
          </span>
          <span
            className="text-primary/60 leading-none mt-0.5"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.18em" }}
          >
            CRIBROENGLISH
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          <li>
            <button onClick={() => scrollTo("#about")} className={linkClass} style={linkStyle}>
              {lang === "pl" ? "O mnie" : "About"}
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollTo("#for-whom")}
              className="text-sm transition-colors hover:opacity-80"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "oklch(0.65 0.2 145)" }}
            >
              {lang === "pl" ? "Dla firm" : "For Business"}
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo("#method")} className={linkClass} style={linkStyle}>
              {lang === "pl" ? "Metoda Cribro" : "Cribro Method"}
            </button>
          </li>

          <li>
            <button onClick={() => scrollTo("#pricing")} className={linkClass} style={linkStyle}>
              {lang === "pl" ? "Cennik" : "Pricing"}
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo("#faq")} className={linkClass} style={linkStyle}>
              FAQ
            </button>
          </li>
          <li>
            <Link href="/blog">
              <span className={linkClass} style={linkStyle} onClick={() => setMenuOpen(false)}>
                Blog
              </span>
            </Link>
          </li>
          <li>
            <button onClick={() => scrollTo("#contact")} className={linkClass} style={linkStyle}>
              {lang === "pl" ? "Kontakt" : "Contact"}
            </button>
          </li>
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className={lang === "pl" ? "text-primary font-semibold" : ""}>PL</span>
            <span className="mx-1 opacity-30">|</span>
            <span className={lang === "en" ? "text-primary font-semibold" : ""}>EN</span>
          </button>
          <button onClick={() => scrollTo("#contact")} className="btn-primary text-xs py-2 px-4">
            {t("Bezpłatna konsultacja", "Free Consultation")}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 py-5 flex flex-col gap-3">
          <button onClick={() => scrollTo("#about")} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1">
            {lang === "pl" ? "O mnie" : "About"}
          </button>
          <button
            onClick={() => scrollTo("#for-whom")}
            className="text-left text-sm py-1 font-semibold"
            style={{ color: "oklch(0.65 0.2 145)" }}
          >
            {lang === "pl" ? "Dla firm" : "For Business"}
          </button>
          <button onClick={() => scrollTo("#method")} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1">
            {lang === "pl" ? "Metoda Cribro" : "Cribro Method"}
          </button>

          <button onClick={() => scrollTo("#pricing")} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1">
            {lang === "pl" ? "Cennik" : "Pricing"}
          </button>
          <button onClick={() => scrollTo("#faq")} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1">
            FAQ
          </button>
          <Link href="/blog">
            <span className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1 block" onClick={() => setMenuOpen(false)}>
              Blog
            </span>
          </Link>
          <button onClick={() => scrollTo("#contact")} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1">
            {lang === "pl" ? "Kontakt" : "Contact"}
          </button>
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={toggleLang}
              className="text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span className={lang === "pl" ? "text-primary" : ""}>PL</span>
              <span className="mx-1 opacity-30">|</span>
              <span className={lang === "en" ? "text-primary" : ""}>EN</span>
            </button>
          </div>
          <button onClick={() => scrollTo("#contact")} className="btn-primary text-center mt-2">
            {t("Bezpłatna konsultacja", "Free Consultation")}
          </button>
        </div>
      )}
    </nav>
  );
}
