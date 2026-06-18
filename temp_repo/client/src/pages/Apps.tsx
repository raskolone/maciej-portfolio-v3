/* =============================================================
   DESIGN: Dark Constellation — Apps Page
   Podstrona /apps — lista aplikacji Macieja
   Zakładki: Cribro Journal (i kolejne w przyszłości)
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";

const apps = [
  {
    id: "cribro-journal",
    name: "Cribro Journal",
    tagPl: "Dziennik refleksji",
    tagEn: "Reflection Journal",
    descPl:
      "Aplikacja do codziennego pisania, refleksji i budowania nawyku myślenia. Zaprojektowana z myślą o prostocie — mniej szumu, więcej głębi.",
    descEn:
      "An app for daily writing, reflection, and building a thinking habit. Designed with simplicity in mind — less noise, more depth.",
    url: "https://journal.cribro.pro",
    label: "journal.cribro.pro",
    status: "live",
  },
];

export default function Apps() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left: heading */}
            <div>
              <p
                className="section-label mb-3"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {t("Moje aplikacje", "My Apps")}
              </p>
              <h1
                className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Aplikacje", "Applications")}
              </h1>
              <p className="mt-4 text-muted-foreground text-base max-w-xl">
                {t(
                  "Narzędzia, które buduję i których używam na co dzień. Każde z nich to odpowiedź na konkretny problem.",
                  "Tools I build and use every day. Each one is an answer to a specific problem."
                )}
              </p>
            </div>

            {/* Right: Cribro Labs logo — SVG inline, pulsating glow */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-end">
              <div
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  borderRadius: "4px",
                  animation: "cribroGlow 2.8s ease-in-out infinite",
                }}
              >
                <style>{`
                  @keyframes cribroGlow {
                    0%, 100% { box-shadow: 0 0 18px 4px oklch(0.65 0.2 145 / 0.25), 0 0 40px 8px oklch(0.65 0.2 145 / 0.10); }
                    50%       { box-shadow: 0 0 32px 10px oklch(0.65 0.2 145 / 0.50), 0 0 70px 20px oklch(0.65 0.2 145 / 0.20); }
                  }
                `}</style>
                {/* SVG Cribro Labs logo — no background */}
                <svg
                  width="220"
                  height="110"
                  viewBox="0 0 220 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Cribro Labs"
                >
                  {/* Double-C icon */}
                  <g transform="translate(8, 10)">
                    {/* Outer C */}
                    <path
                      d="M 58 45 A 38 38 0 1 0 58 65"
                      stroke="#4ade80"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Inner C */}
                    <path
                      d="M 50 45 A 26 26 0 1 0 50 65"
                      stroke="#4ade80"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Dot at end of inner C */}
                    <circle cx="50" cy="65" r="3.5" fill="#4ade80" />
                  </g>
                  {/* CRIBRO text */}
                  <text
                    x="88"
                    y="52"
                    fontFamily="'DM Sans', sans-serif"
                    fontWeight="700"
                    fontSize="26"
                    letterSpacing="3"
                    fill="white"
                  >CRIBRO</text>
                  {/* LABS text */}
                  <text
                    x="88"
                    y="80"
                    fontFamily="'DM Sans', sans-serif"
                    fontWeight="700"
                    fontSize="26"
                    letterSpacing="3"
                    fill="#4ade80"
                  >LABS</text>
                  {/* tagline */}
                  <text
                    x="88"
                    y="98"
                    fontFamily="'DM Sans', sans-serif"
                    fontWeight="400"
                    fontSize="9"
                    letterSpacing="1"
                    fill="#6b7280"
                  >less noise. more action.</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro article + Apps preview */}
      <section className="py-16 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: Text (justified) */}
            <div className="max-w-2xl">
              <div className="space-y-5 text-base leading-relaxed text-justify">
                <p className="text-foreground">
                  {t(
                    "Buduję aplikacje pod marką Cribro — i robię to celowo. Cribro to nie tylko nazwa. To filozofia: odsiać szum, zostawić to, co działa. Słowo pochodzi od łacińskiego cribrum — sito. Taki jest też mój sposób myślenia o produktach cyfrowych.",
                    "I build apps under the Cribro brand — and I do it deliberately. Cribro is not just a name. It's a philosophy: filter out the noise, keep what works. The word comes from the Latin cribrum — a sieve. That's also how I think about digital products."
                  )}
                </p>
                <p className="text-muted-foreground">
                  {t(
                    "Nie buduję aplikacji, żeby mieć aplikacje. Buduję je, bo brakuje mi narzędzi, które są proste, szybkie i nie rozpraszają. Każda z nich to odpowiedź na konkretny problem — mój własny lub moich użytkowników. Mniej funkcji, więcej sensu. Mniej ekranów, więcej skupienia.",
                    "I don't build apps to have apps. I build them because I'm missing tools that are simple, fast, and distraction-free. Each one is an answer to a specific problem — my own or my users'. Fewer features, more meaning. Fewer screens, more focus."
                  )}
                </p>
                <p className="text-muted-foreground">
                  {t(
                    "Cribro to mój nowy kierunek — obok CribroEnglish, gdzie uczę języka angielskiego. Niebawem powstaną osobne strony i profile dla każdego projektu. Na razie wszystko zaczyna się tutaj.",
                    "Cribro is my new direction — alongside CribroEnglish, where I teach English. Separate pages and profiles for each project are coming soon. For now, everything starts here."
                  )}
                </p>
                <div className="pt-2 border-l-2 border-primary/40 pl-5">
                  <p
                    className="text-foreground font-medium italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
                  >
                    {t(
                      "\"Mniej szumu. Więcej działania. Każda aplikacja musi zarabiać na swoje miejsce.\"",
                      "\"Less noise. More action. Every app must earn its place.\""
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: App card (Cribro Journal) */}
            <div className="flex flex-col gap-6">
              {apps.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-border hover:border-primary/50 transition-all duration-300 p-6"
                  style={{
                    borderRadius: "2px",
                    background: "oklch(0.13 0.015 240 / 0.6)",
                  }}
                >
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase text-primary/70"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {t(app.tagPl, app.tagEn)}
                    </span>
                    {app.status === "live" && (
                      <span className="flex items-center gap-1.5 text-[10px] text-primary/60" style={{ fontFamily: "'DM Mono', monospace" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        live
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h2
                    className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {app.name}
                  </h2>

                  {/* App image */}
                  {app.id === "cribro-journal" && (
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663489474725/R7k6sYKTkLq9Ymom2yutju/og_cribro_journal_45f128b3.png"
                      alt={app.name}
                      className="w-full rounded mb-5 group-hover:opacity-90 transition-opacity"
                      style={{ maxHeight: "180px", objectFit: "contain", padding: "8px" }}
                    />
                  )}

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {t(app.descPl, app.descEn)}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-xs text-primary/70 group-hover:text-primary transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
                    <ExternalLink size={12} />
                    {app.label}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}
