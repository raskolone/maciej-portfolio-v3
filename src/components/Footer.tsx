/* =============================================================
   DESIGN: Warm Ink & Paper — Footer
   Minimal footer with links and copyright
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { href: "#about", pl: "O mnie", en: "About" },
    { href: "#for-whom", pl: "Dla firm", en: "For Business" },
    { href: "#method", pl: "Metoda", en: "Method" },
    { href: "#pricing", pl: "Cennik", en: "Pricing" },
    { href: "#faq", pl: "FAQ", en: "FAQ" },
    { href: "#contact", pl: "Kontakt", en: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card/80 border-t border-border/40 py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p
              className="text-xl font-bold text-foreground mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Maciej Wyrozumski
            </p>
            <p className="text-xs text-primary/70 mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
              {t("Lektor Języka Angielskiego", "English Language Tutor")}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t(
                "Angielski w pełnym zanurzeniu — online i w Bielsku-Białej.",
                "English in full immersion — online and in Bielsko-Biała."
              )}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground/50 tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
              {t("Nawigacja", "Navigation")}
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.pl, link.en)}
                  </button>
                </li>
              ))}

            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground/50 tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
              {t("Kontakt", "Contact")}
            </p>
            <div className="space-y-3">
              <a href="mailto:wyrozumski@maciej.pro" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={13} />
                wyrozumski@maciej.pro
              </a>
              <a href="tel:+48536524867" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={13} />
                +48 536 524 867
              </a>
              <a href="https://www.linkedin.com/in/maciej-pro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={13} />
                LinkedIn
              </a>
              <a href="https://github.com/raskolone?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Github size={13} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/50">
            © 2025 Maciej Wyrozumski. {t("Wszelkie prawa zastrzeżone.", "All rights reserved.")}
          </p>
          <p className="text-xs text-muted-foreground/30" style={{ fontFamily: "'DM Mono', monospace" }}>
            {t("Zbudowane z React + AI", "Built with React + AI")}
          </p>
        </div>
      </div>
    </footer>
  );
}
