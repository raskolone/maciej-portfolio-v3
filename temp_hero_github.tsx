/* =============================================================
   DESIGN: Dark Constellation — Hero Section v2
   Mockup-faithful: photo absolute right full-height, text left
   Typewriter: "Język angielski dla firm" ↔ "Bez zbędnego szumu"
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import TypewriterText from "@/components/TypewriterText";

const PHOTO = "/manus-storage/maciej-hero-transparent_87b0b741.webp";

export default function HeroSection() {
  const { t } = useLanguage();

  const phrases = [
    t("Język angielski dla firm", "English for Business"),
    t("Bez zbędnego szumu", "No Unnecessary Noise"),
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Animated constellation */}
      <ConstellationCanvas />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, oklch(0.11 0.015 240 / 60%) 100%)",
          zIndex: 1,
        }}
      />

      {/* Photo — absolute right, full height, no background */}
      <div
        className="absolute right-0 top-0 h-full hidden lg:block"
        style={{ zIndex: 2, width: "48%", background: "transparent", overflow: "hidden" }}
      >
        <img
          src={PHOTO}
          alt="Maciej Wyrozumski"
          className="h-full w-auto max-w-none"
          style={{
            objectFit: "contain",
            objectPosition: "center top",
            filter: "brightness(0.95) contrast(1.05)",
          }}
        />
      </div>

      {/* Left content — text */}
      <div
        className="relative flex items-center min-h-screen"
        style={{ zIndex: 3 }}
      >
        <div className="w-full lg:w-[52%] px-6 lg:px-16 xl:px-24 pt-24 pb-16 flex flex-col items-start">

          {/* Label */}
          <div
            className="animate-fade-in mb-5"
            style={{ opacity: 0, animationFillMode: "forwards" }}
          >
            <span
              className="text-muted-foreground text-[11px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {t("Lektor języka angielskiego", "English Language Instructor")}
            </span>
          </div>

          {/* Name */}
          <div
            className="animate-fade-in-up mb-3"
            style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <h1
              className="text-7xl md:text-8xl xl:text-9xl font-bold text-foreground leading-none tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Maciej
            </h1>
            <p
              className="text-sm md:text-base text-muted-foreground tracking-[0.4em] uppercase mt-1"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Wyrozumski
            </p>
          </div>

          {/* Green divider */}
          <div
            className="animate-fade-in-up mb-4"
            style={{ opacity: 0, animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <div className="h-px w-16 bg-primary" />
          </div>

          {/* Typewriter */}
          <div
            className="animate-fade-in-up mb-5 h-9"
            style={{ opacity: 0, animationDelay: "0.45s", animationFillMode: "forwards" }}
          >
            <TypewriterText
              phrases={phrases}
              className="text-xl md:text-2xl font-semibold text-primary"
            />
          </div>

          {/* Description */}
          <p
            className="animate-fade-in-up text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-md"
            style={{
              opacity: 0,
              animationDelay: "0.6s",
              animationFillMode: "forwards",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {t(
              "Pomagam firmom i osobom indywidualnym przełamywać bariery komunikacyjne — przez autorską The Cribro Method opartą na Full Immersion.",
              "I help companies and individuals break communication barriers — through The Cribro Method, a Full Immersion approach."
            )}
          </p>

          {/* CTA */}
          <div
            className="animate-fade-in-up mb-10"
            style={{ opacity: 0, animationDelay: "0.75s", animationFillMode: "forwards" }}
          >
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary animate-cta-pulse"
            >
              {t("Umów bezpłatną konsultację", "Book Free Consultation")}
            </button>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-in flex flex-wrap gap-x-8 gap-y-3"
            style={{ opacity: 0, animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            {[
              { num: "10+", label: t("lat doświadczenia", "years experience") },
              { num: "A1–C1", label: t("wszystkie poziomy", "all levels") },
              { num: "100%", label: t("zajęcia po angielsku", "lessons in English") },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="text-primary font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
                >
                  {item.num}
                </span>
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile photo — shown below text on small screens */}
      <div className="lg:hidden w-full px-6 pb-12" style={{ zIndex: 3, position: "relative" }}>
        <img
          src={PHOTO}
          alt="Maciej Wyrozumski"
          className="w-64 mx-auto object-cover"
          style={{
            maskImage: "radial-gradient(ellipse 80% 85% at 50% 50%, black 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 85% at 50% 50%, black 50%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}

