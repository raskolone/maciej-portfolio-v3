/* =============================================================
   DESIGN: Nocturne Green — Hero Section
   Split 52/48: kolumna tekstu po lewej, wycinanka zdjęcia przyklejona
   do prawej krawędzi na pełną wysokość. Pod spodem animowany canvas.
   Typewriter: "Angielski dla firm i dla osób indywidualnych" ↔ "Bez zbędnego szumu"
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import TypewriterText from "@/components/TypewriterText";
import { ArrowRight } from "lucide-react";
import { activeSocials } from "@/lib/socials";
import { scrollToSelector } from "@/lib/scrollTo";
import ScrollHint from "@/components/ScrollHint";
import Signature from "@/components/Signature";

/* WebP z kanałem alfa zamiast PNG: ten sam kadr waży 107 kB zamiast 1,48 MB,
   a to zdjęcie jest największym elementem pierwszego ekranu. Oryginalny PNG
   został jako master w docs/design_handoff_maciej_pro_redesign/assets/. */
const PHOTO = "/images/maciej-hero.webp";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  /* Dwa zdania na zmianę: pierwsze mówi, do kogo to jest, drugie — jak to
     wygląda. Razem wyczerpują ofertę i nic ponad nią nie obiecują.

     Wcześniej stało tu „Angielski dla ludzi, którym trudno usiedzieć" —
     zdanie opisujące wąską grupę, przez które połowa odwiedzających czytała
     stronę jako nie do siebie. Dwie ścieżki, firmowa i indywidualna, są tu
     wymienione wprost, bo taki jest podział w „Dla kogo" i w cenniku.
     „Bez zbędnego szumu" zostaje jako motyw przewodni — ten sam, co
     w nagłówku „Metody" i w piaście „Filarów". */
  const phrases = lang === "pl"
    ? ["Angielski dla firm\ni dla osób indywidualnych", "Bez zbędnego szumu"]
    : ["English for companies\nand for individuals", "No unnecessary noise"];

  const stats = [
    { num: "10+", label: t("lat doświadczenia", "years experience") },
    { num: "A1–C1", label: t("wszystkie poziomy", "all levels") },
    { num: "100%", label: t("zajęcia po angielsku", "lessons in English") },
  ];

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden">
      {/* Animated star field */}
      <ConstellationCanvas />

      {/* Photo — absolute right, full height, transparent cutout */}
      <div
        className="absolute right-0 top-0 h-full hidden lg:block pointer-events-none"
        style={{ zIndex: 1, width: "50%", overflow: "hidden" }}
      >
        <img
          src={PHOTO}
          alt="Maciej Wyrozumski"
          fetchPriority="high"
          decoding="async"
          className="h-full w-auto max-w-none"
          style={{
            objectFit: "contain",
            objectPosition: "right bottom",
            transform: "scale(1.08) translateX(4%)",
            transformOrigin: "bottom right",
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
      <div className="relative flex items-center min-h-[100svh]" style={{ zIndex: 3 }}>
        <div className="hero-column w-full lg:w-[52%] max-w-[600px] px-[clamp(20px,6vw,48px)] pt-[72px] pb-8 lg:pt-24 lg:pb-16 flex flex-col items-start">

          {/* Telefon: portret jako pas nad nazwiskiem.
              Wycinanka wciśnięta obok imienia kończyła się twardo uciętym
              prostokątem w połowie tułowia i wchodziła na napis — na 390 px
              nie ma miejsca na dwie kolumny obok siebie. Tutaj zdjęcie
              dostaje całą szerokość i rozpływa się w tło u dołu. */}
          <div
            className="lg:hidden w-full mb-3 animate-fade-in"
            style={{ opacity: 0, animationFillMode: "forwards", height: "clamp(150px, 20svh, 220px)" }}
            aria-hidden="true"
          >
            {/* Kadr zaczyna się niżej (22% zamiast 14%) i wygasza dopiero od
                68% wysokości. Przy poprzednich wartościach maska ścinała pas
                w połowie twarzy, a nad nim zostawał zapas tła — z sylwetki
                zostawała sama głowa zawieszona w powietrzu. Teraz w kadrze
                jest twarz z ramionami, a rozpłynięcie zaczyna się tam, gdzie
                sylwetka i tak przechodzi w tło. */}
            <img
              src={PHOTO}
              alt=""
              className="w-full h-full object-cover"
              style={{
                objectPosition: "50% 22%",
                filter: "brightness(0.95) contrast(1.05)",
                maskImage: "linear-gradient(to bottom, black 68%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 68%, transparent 100%)",
              }}
            />
          </div>

          {/* Kicker */}
          <div className="animate-fade-in mb-5" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <span className="label">
              {t("Lektor języka angielskiego", "English Language Instructor")}
            </span>
          </div>

          {/* Name */}
          <div className="w-full lg:w-auto relative mb-2 lg:mb-0">
            <div
              className="animate-fade-in-up z-10 relative"
              style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <h1
                className="font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-hero-name)",
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
                  margin: "0 0 10px",
                }}
              >
                Wyrozumski
              </p>

              {/* Typewriter pod Maciej Wyrozumski — pomniejszony, wrapped, bez przeskoków */}
              <div
                className="flex items-start"
                style={{ minHeight: "clamp(46px, 5.5vw, 54px)" }}
              >
                <TypewriterText
                  phrases={phrases}
                  className="inline-block"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(13.5px, 1.4vw, 15.5px)",
                    lineHeight: 1.5,
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    color: "var(--accent-text)",
                  }}
                />
              </div>
            </div>

          </div>

          {/* Accent rule */}
          <div
            className="animate-fade-in-up z-10 relative mt-4 mb-4 lg:mt-5 lg:mb-5"
            style={{ opacity: 0, animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <div style={{ height: "1px", width: "64px", background: "var(--accent-base)" }} />
          </div>

          {/* Lead */}
          <p
            className="animate-fade-in-up mb-6 lg:mb-8"
            style={{
              opacity: 0,
              animationDelay: "0.6s",
              animationFillMode: "forwards",
              fontSize: "clamp(15.5px, 4vw, 17px)",
              lineHeight: "var(--lh-body)",
              color: "var(--text-2)",
              maxWidth: "480px",
            }}
          >
            {t(
              "Uczę angielskiego tak, jak działa rozproszony umysł — krótkie bloki, jasna struktura, nic na zapas. Mam ADHD, więc znam to od środka. Ta sama metoda — The Cribro Method — działa też w firmach: pełne zanurzenie w języku zamiast przerabiania podręcznika.",
              "I teach English the way a scattered mind actually works — short blocks, clear structure, nothing spare. I have ADHD, so I know it from the inside. The same method — The Cribro Method — works in companies too: full immersion in the language instead of working through a coursebook."
            )}
          </p>

          {/* CTA + drugorzędne ikonki social */}
          <div
            className="animate-fade-in-up mb-7 lg:mb-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ opacity: 0, animationDelay: "0.75s", animationFillMode: "forwards" }}
          >
            <button
              onClick={() => scrollToSelector("#contact")}
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
            className="animate-fade-in grid grid-cols-3 gap-x-3 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-4 w-full"
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
                    fontSize: "clamp(20px, 5.6vw, 28px)",
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

          {/* Podpis — pisze się sam, po tym jak wejdą liczby. Stoi pod nimi,
              a nie przy nazwisku u góry: tam byłby powtórzeniem tego samego
              słowa dwa razy, tutaj domyka kolumnę jak podpis pod listem. */}
          <Signature
            className="hero-signature animate-fade-in mt-7 w-full"
            style={{ maxWidth: "clamp(170px, 21vw, 250px)" }}
          />
        </div>
      </div>

      {/* Strzałka „przewiń niżej" — patrz components/ScrollHint. */}
      <ScrollHint to="#for-whom" pinned />
    </section>
  );
}
