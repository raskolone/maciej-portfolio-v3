/* =============================================================
   DESIGN: Dark Constellation — Hero Section
   Full-height hero with animated constellation canvas
   Centered layout: avatar → name → typewriter → desc → CTAs
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import TypewriterText from "@/components/TypewriterText";
import AVATAR from "@/assets/images/maciej-hero-new.webp";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  const phrases = lang === "pl"
    ? ["Business English dla firm", "The Cribro Method", "Full Immersion Trainer", "ADHD-Friendly Educator"]
    : ["Business English for Companies", "The Cribro Method", "Full Immersion Trainer", "ADHD-Friendly Educator"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated constellation */}
      <ConstellationCanvas />
      {/* Radial gradient overlay for depth — original from ZIP */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, oklch(0.11 0.015 240 / 60%) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-16">

        {/* Avatar */}
        <div
          className="animate-fade-in mb-6"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="relative inline-block">
            {/* Outer pulse ring */}
            <div
              className="absolute rounded-full animate-glow-pulse pointer-events-none"
              style={{
                inset: "-10px",
                border: "1px solid rgba(74,222,128,0.25)",
                animationDelay: "0s",
              }}
            />
            {/* Inner pulse ring */}
            <div
              className="absolute rounded-full animate-glow-pulse pointer-events-none"
              style={{
                inset: "-4px",
                border: "1.5px solid rgba(74,222,128,0.45)",
                animationDelay: "0.5s",
              }}
            />
            {/* Photo */}
            <div
              className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-2 border-primary/60"
              style={{ boxShadow: "0 0 28px rgba(74,222,128,0.15)" }}
            >
              <img
                src={AVATAR}
                alt="Maciej Wyrozumski"
                className="w-full h-full object-cover" style={{ objectPosition: "50% 15%" }}
              />
            </div>
            {/* Status dot */}
            <div className="absolute bottom-2 right-2 glow-dot" />
          </div>
        </div>

        {/* Name */}
        <div
          className="animate-fade-in-up mb-2"
          style={{ opacity: 0, animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <h1
            className="text-5xl md:text-7xl font-bold text-foreground leading-none tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Maciej
          </h1>
          <p
            className="text-base md:text-lg text-muted-foreground tracking-[0.35em] uppercase mt-1"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Wyrozumski
          </p>
        </div>

        {/* Typewriter subtitle */}
        <div
          className="animate-fade-in-up mb-5 h-8"
          style={{ opacity: 0, animationDelay: "0.45s", animationFillMode: "forwards" }}
        >
          <TypewriterText
            phrases={phrases}
            className="text-lg md:text-xl font-semibold text-primary"
          />
        </div>

        {/* Description */}
        <p
          className="animate-fade-in-up text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg"
          style={{ opacity: 0, animationDelay: "0.6s", animationFillMode: "forwards", fontFamily: "'DM Sans', sans-serif" }}
        >
          {t(
            "Pomagam firmom i osobom indywidualnym przełamywać bariery komunikacyjne — przez autorską The Cribro Method opartą na Full Immersion, dopasowaną do wyzwań dzisiejszego świata.",
            "I help companies and individuals break communication barriers — through The Cribro Method, a Full Immersion approach tailored to the challenges of today's world."
          )}
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up flex justify-center mb-12"
          style={{ opacity: 0, animationDelay: "0.75s", animationFillMode: "forwards" }}
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary animate-cta-pulse"
          >
            {t("Umów bezpłatną konsultację", "Book Free Consultation")}
          </button>
        </div>

        {/* Proof stats */}
        <div
          className="animate-fade-in flex flex-wrap justify-center gap-x-8 gap-y-3"
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
              <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tagline + CribroEnglish brand */}
        <div
          className="animate-fade-in mt-10 mb-6 flex flex-col items-center gap-2"
          style={{ opacity: 0, animationDelay: "1.1s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/50" />
            <span
              className="text-primary text-[13px] tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              bez zbędnego szumu
            </span>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <span
            className="text-primary/70 text-[10px] tracking-[0.3em] uppercase font-bold"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            CribroEnglish
          </span>
        </div>
      </div>
    </section>
  );
}
