/* =============================================================
   DESIGN: Nocturne Green — Footer
   Trzy kolumny: marka / nawigacja / kontakt, nad paskiem dolnym.
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";
import { activeSocials } from "@/lib/socials";

const NAV_LINKS = [
  { href: "#about", pl: "O mnie", en: "About" },
  { href: "#for-whom", pl: "Dla firm", en: "For Business" },
  { href: "#method", pl: "Metoda", en: "Method" },
  { href: "#pricing", pl: "Cennik", en: "Pricing" },
  { href: "#faq", pl: "FAQ", en: "FAQ" },
  { href: "#contact", pl: "Kontakt", en: "Contact" },
];

export default function Footer() {
  const { t } = useLanguage();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const linkClass =
    "flex items-center gap-2 text-[var(--text-2)] hover:text-[var(--accent-text)] transition-colors";
  const linkStyle = { fontSize: "var(--fs-sm)" };

  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "64px 0 32px" }}>
      <div className="px-[clamp(20px,6vw,48px)] max-w-[1320px] mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <p
              className="font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", color: "var(--text-hi)" }}
            >
              Maciej Wyrozumski
            </p>
            <p className="label mb-4" style={{ color: "var(--accent-text)", opacity: 0.7 }}>
              {t("Lektor Języka Angielskiego", "English Language Tutor")}
            </p>
            <p
              className="max-w-xs"
              style={{ fontSize: "var(--fs-sm)", color: "var(--text-2)", lineHeight: "var(--lh-body)" }}
            >
              {t(
                "Angielski w pełnym zanurzeniu — online i w Bielsku-Białej.",
                "English in full immersion — online and in Bielsko-Biała."
              )}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label mb-4">{t("Nawigacja", "Navigation")}</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-[var(--text-2)] hover:text-[var(--accent-text)] transition-colors"
                    style={linkStyle}
                  >
                    {t(link.pl, link.en)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label mb-4">{t("Kontakt", "Contact")}</p>
            <div className="space-y-3">
              <a href="mailto:wyrozumski@maciej.pro" className={linkClass} style={linkStyle}>
                <Mail size={13} />
                wyrozumski@maciej.pro
              </a>
              <a href="tel:+48698250507" className={linkClass} style={linkStyle}>
                <Phone size={13} />
                +48 698 250 507
              </a>
              <p className="flex items-center gap-2" style={{ ...linkStyle, color: "var(--text-2)" }}>
                <MapPin size={13} />
                {t("Bielsko-Biała · Online", "Bielsko-Biała · Online")}
              </p>
              {activeSocials().map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  style={linkStyle}
                >
                  <Icon size={13} />
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--line-soft)", paddingTop: "24px" }}
        >
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-mute)" }}>
            © {new Date().getFullYear()} Maciej Wyrozumski.{" "}
            {t("Wszelkie prawa zastrzeżone.", "All rights reserved.")}
          </p>
          <p className="label">CribroEnglish · {t("Bielsko-Biała, Polska", "Bielsko-Biała, Poland")}</p>
        </div>
      </div>
    </footer>
  );
}
