/* =============================================================
   DESIGN: Nocturne Green — Navbar
   Sticky glass bar: --glass tło + backdrop-blur(24px), dolna linia.
   Logo: MW. (kropka w akcencie) nad CRIBROENGLISH | linki | PL/EN | CTA
   ============================================================= */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation, Link } from "wouter";
import { Menu, X } from "lucide-react";

/* Jedno źródło prawdy dla obu wariantów menu (desktop i mobile). */
const NAV_ITEMS = [
  { href: "#about", pl: "O mnie", en: "About" },
  { href: "#for-whom", pl: "Dla firm", en: "For Business", accent: true },
  { href: "#method", pl: "Metoda Cribro", en: "Cribro Method" },
  { href: "#pricing", pl: "Cennik", en: "Pricing" },
  { href: "#faq", pl: "FAQ", en: "FAQ" },
  { href: "#contact", pl: "Kontakt", en: "Contact" },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

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

  const linkStyle = { fontFamily: "var(--font-body)", fontSize: "var(--fs-xs)" };

  const navLinkClass = (accent?: boolean) =>
    accent
      ? "font-semibold transition-colors hover:opacity-80"
      : "text-[var(--text-2)] hover:text-[var(--accent-text)] transition-colors";

  const navLinkStyle = (accent?: boolean) =>
    accent ? { ...linkStyle, color: "var(--accent-text)" } : linkStyle;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[24px]"
      style={{
        background: "var(--glass)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="flex items-center justify-between gap-6 px-[clamp(20px,6vw,48px)] py-4">

        {/* Logo lockup */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex flex-col items-start leading-none hover:opacity-80 transition-opacity shrink-0"
        >
          <span
            className="font-bold"
            style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--text-hi)" }}
          >
            MW<span style={{ color: "var(--accent-text)" }}>.</span>
          </span>
          <span
            className="mt-0.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.18em",
              color: "var(--accent-text)",
              opacity: 0.7,
            }}
          >
            CRIBROENGLISH
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => scrollTo(item.href)}
                className={navLinkClass(item.accent)}
                style={navLinkStyle(item.accent)}
              >
                {t(item.pl, item.en)}
              </button>
            </li>
          ))}
          <li>
            <Link href="/blog">
              <span className={navLinkClass()} style={linkStyle}>
                Blog
              </span>
            </Link>
          </li>
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={toggleLang}
            className="transition-colors hover:opacity-80"
            style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-mute)" }}
          >
            <span style={lang === "pl" ? { color: "var(--accent-text)", fontWeight: 500 } : undefined}>PL</span>
            <span className="mx-1 opacity-30">|</span>
            <span style={lang === "en" ? { color: "var(--accent-text)", fontWeight: 500 } : undefined}>EN</span>
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-primary whitespace-nowrap"
            style={{ padding: "9px 20px", fontSize: "12px" }}
          >
            {t("Bezpłatna konsultacja", "Free Consultation")}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          style={{ color: "var(--text-hi)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden backdrop-blur-[24px] px-[clamp(20px,6vw,48px)] py-5 flex flex-col gap-3"
          style={{ background: "var(--glass)", borderBottom: "1px solid var(--line)" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`text-left py-1 ${navLinkClass(item.accent)}`}
              style={navLinkStyle(item.accent)}
            >
              {t(item.pl, item.en)}
            </button>
          ))}
          <Link href="/blog">
            <span
              className={`block text-left py-1 ${navLinkClass()}`}
              style={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </span>
          </Link>
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={toggleLang}
              className="transition-colors hover:opacity-80"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-mute)" }}
            >
              <span style={lang === "pl" ? { color: "var(--accent-text)", fontWeight: 500 } : undefined}>PL</span>
              <span className="mx-1 opacity-30">|</span>
              <span style={lang === "en" ? { color: "var(--accent-text)", fontWeight: 500 } : undefined}>EN</span>
            </button>
          </div>
          <button onClick={() => scrollTo("#contact")} className="btn-primary justify-center mt-2">
            {t("Bezpłatna konsultacja", "Free Consultation")}
          </button>
        </div>
      )}
    </nav>
  );
}
