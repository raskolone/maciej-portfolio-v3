/*
 * CRIBRO.PRO — Navbar
 * Dark Premium Agency — sticky, minimal, green accent on CTA
 */
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "O mnie", href: "#o-mnie" },
  { label: "Cennik", href: "#cennik" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group"
          style={{ textDecoration: "none" }}
        >
          <span
            className="w-2 h-2 rounded-full bg-[#4ade80] animate-glow-pulse"
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.85rem",
              letterSpacing: "0.12em",
              fontWeight: 500,
              color: "#f5f5f0",
              textTransform: "uppercase",
            }}
          >
            CRIBRO
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 400,
                color: "rgba(245,245,240,0.65)",
                letterSpacing: "0.02em",
                cursor: "pointer",
                transition: "color 0.2s ease",
                padding: "0.25rem 0",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#4ade80")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.65)")
              }
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#kontakt");
            }}
            className="btn-primary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
          >
            Zapytaj o wycenę
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(245,245,240,0.8)",
                textAlign: "left",
                cursor: "pointer",
                padding: "0.25rem 0",
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#kontakt");
            }}
            className="btn-primary"
            style={{ textAlign: "center", marginTop: "0.5rem" }}
          >
            Zapytaj o wycenę
          </a>
        </div>
      )}
    </header>
  );
}
