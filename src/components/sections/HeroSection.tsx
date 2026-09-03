/* =============================================================
   DESIGN: Nocturne Green — Hero Section
   Split 52/48: kolumna tekstu po lewej, wycinanka zdjęcia przyklejona
   do prawej krawędzi na pełną wysokość. Pod spodem animowany canvas.
   Typewriter: "Angielski dla ludzi, którym trudno usiedzieć" ↔ "Bez zbędnego szumu"
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import TypewriterText from "@/components/TypewriterText";
import { ArrowRight } from "lucide-react";
import { activeSocials } from "@/lib/socials";

const PHOTO = "/images/maciej-hero-transparent.png";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  const phrases = lang === "pl"
    ? ["Angielski dla ludzi, którym trudno usiedzieć", "Bez zbędnego szumu"]
    : ["English for people who can't sit still", "No unnecessary noise"];

  const stats = [
    { num: "10+", label: t("lat doświadczenia", "years experience") },
    { num: "A1–C1", label: t("wszystkie poziomy", "all levels") },
    { num: "100%", label: t("zajęcia po angielsku", "lessons in English") },
  ];

  return (
    <section id="hero" className="relative min-h-[88vh] overflow-hidden">
      {/* Animated star field */}
      <ConstellationCanvas />

      {/* Photo — absolute right, full height, transparent cutout */}
      <div
        className="absolute right-0 top-0 h-full hidden lg:block"
        style={{ zIndex: 1, width: "48%", overflow: "hidden" }}
      >
        <img
          src={PHOTO}
          alt="Maciej Wyrozumski"
          className="h-full w-auto max-w-none"
          style={{
            objectFit: "contain",
            objectPosition: "center bottom",
            filter: "brightness(0.95) contrast(1.05)",
            // Sylwetka sięga dolnej krawędzi sekcji i bez tego urywa się
            // płaskim cięciem w połowie tułowia.
            maskImage: "linear-gradient(to top, transparent 0%, black 15%)",
            WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 15%)",
          }}
        />
      </div>

      {/* Dolne wykończenie: konstelacja i zdjęcie kończą się na krawędzi
          sekcji, więc wygaszamy je w tło strony i domykamy hero tą samą
          miętową listwą, która rozdziela "O mnie" od "Mojej historii". */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "clamp(120px, 18vh, 220px)",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          zIndex: 2,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none container"
        style={{ zIndex: 4 }}
      >
        {/* Zawężona do miary kontenera, nie na całą szerokość — rozciągnięta
            na 1600 px ten sam gradient rozmywa się do niewidoczności. */}
        <div className="rule-accent" />
      </div>

      {/* Left content — text */}
      <div className="relative flex items-center min-h-[88vh]" style={{ zIndex: 3 }}>
        <div className="w-full lg:w-[52%] max-w-[600px] px-[clamp(20px,6vw,48px)] pt-24 pb-16 flex flex-col items-start">

          {/* Kicker */}
          <div className="animate-fade-in mb-5" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <span className="label">
              {t("Lektor języka angielskiego", "English Language Instructor")}
            </span>
          </div>

          {/* Name and mobile photo */}
          <div className="flex flex-row items-end justify-between w-full lg:w-auto relative mb-8 lg:mb-0">
            <div
              className="animate-fade-in-up z-10 relative"
              style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <h1
                className="font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(56px, 9vw, 104px)",
                  lineHeight: 1,
                  margin: "0 0 4px",
                }}
              >
                Maciej
              </h1>
              <p
                className="uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(11px, 1.4vw, 14px)",
                  letterSpacing: "0.3em",
                  color: "var(--text-mute)",
                  margin: "0 0 16px",
                }}
              >
                Wyrozumski
              </p>

              {/* Typewriter */}
              <div style={{ minHeight: "32px" }}>
                <TypewriterText
                  phrases={phrases}
                  className="inline-block"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(16px, 2.2vw, 20px)",
                    fontWeight: 500,
                    color: "var(--accent-text)",
                  }}
                />
              </div>
            </div>

            {/* Mobile photo — sits next to the name on small screens */}
            <div
              className="lg:hidden absolute right-[-5%] top-[-5%] opacity-0 animate-fade-in-up flex items-start justify-end pointer-events-none"
              style={{
                animationDelay: "0.3s",
                animationFillMode: "forwards",
                bottom: "-60px",
                transform: "scale(1.15) translateX(8%)",
                transformOrigin: "bottom right",
              }}
            >
              <img
                src={PHOTO}
                alt=""
                aria-hidden="true"
                className="h-full w-auto object-contain object-right-top"
                style={{
                  filter: "brightness(0.95) contrast(1.05)",
                  maskImage: "linear-gradient(to top, rgba(0,0,0,1) 50%, transparent 95%)",
                  WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 50%, transparent 95%)",
                }}
              />
            </div>
          </div>

          {/* Accent rule */}
          <div
            className="animate-fade-in-up z-10 relative mt-5 mb-5"
            style={{ opacity: 0, animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <div style={{ height: "1px", width: "64px", background: "var(--accent-base)" }} />
          </div>

          {/* Lead */}
          <p
            className="animate-fade-in-up mb-8"
            style={{
              opacity: 0,
              animationDelay: "0.6s",
              animationFillMode: "forwards",
              fontSize: "var(--fs-lead)",
              lineHeight: "var(--lh-body)",
              color: "var(--text-2)",
              maxWidth: "480px",
            }}
          >
            {t(
              "Uczę angielskiego tak, jak działa rozproszony umysł — krótkie bloki, jasna struktura, zero szumu. Mam ADHD, więc znam to od środka. Ta sama metoda — The Cribro Method — działa też w firmach: pełne zanurzenie w języku zamiast przerabiania podręcznika.",
              "I teach English the way a scattered mind actually works — short blocks, clear structure, zero noise. I have ADHD, so I know it from the inside. The same method — The Cribro Method — works in companies too: full immersion in the language instead of working through a coursebook."
            )}
          </p>

          {/* CTA + drugorzędne ikonki social */}
          <div
            className="animate-fade-in-up mb-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ opacity: 0, animationDelay: "0.75s", animationFillMode: "forwards" }}
          >
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary animate-cta-pulse"
            >
              {t("Umów bezpłatną konsultację", "Book Free Consultation")}
              <ArrowRight size={15} />
            </button>

            <div className="flex items-center gap-3">
              {activeSocials().map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className="text-[var(--text-mute)] hover:text-[var(--accent-text)] transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Stats — serif numeral over a mono label, above a hairline */}
          <div
            className="animate-fade-in flex flex-wrap gap-x-8 gap-y-4 w-full"
            style={{
              opacity: 0,
              animationDelay: "0.9s",
              animationFillMode: "forwards",
              paddingTop: "20px",
              borderTop: "1px solid var(--line)",
            }}
          >
            {stats.map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "28px",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "var(--accent-text)",
                  }}
                >
                  {item.num}
                </div>
                <div className="label" style={{ marginTop: "4px" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
