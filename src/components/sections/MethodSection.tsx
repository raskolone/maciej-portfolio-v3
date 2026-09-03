/* =============================================================
   DESIGN: Nocturne Green — Method Section
   Tagline: "Bez zbędnego szumu"
   Układ: opis metody (lewa) + obrazek (prawa) u góry,
          6 filarów jako kafelki wjeżdżające naprzemiennie z boków.
   ============================================================= */

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const pillars = [
  {
    num: "01",
    pl: { title: "Full Immersion", desc: "Zajęcia prowadzę w całości po angielsku — kontakt z językiem jest naturalny i regularny. Twój mózg uczy się myśleć po angielsku, nie tłumaczyć." },
    en: { title: "Full Immersion", desc: "Lessons are conducted entirely in English — contact with the language is natural and regular. Your brain learns to think in English, not translate." },
  },
  {
    num: "02",
    pl: { title: "Speaking First", desc: "Lekcje są nastawione na mówienie, reagowanie i realne użycie języka. Mówisz od pierwszej minuty — bez biernego przerabiania materiałów." },
    en: { title: "Speaking First", desc: "Lessons focus on speaking, reacting, and real language use. You speak from the very first minute — no passive material review." },
  },
  {
    num: "03",
    pl: { title: "Pronunciation & Phonetics", desc: "Pomagam poprawiać wymowę, rytm wypowiedzi i pewność mówienia. Fonetyka to moja specjalizacja — uczę, jak naprawdę brzmieć po angielsku." },
    en: { title: "Pronunciation & Phonetics", desc: "I help improve pronunciation, speech rhythm, and speaking confidence. Phonetics is my specialization — I teach you how to actually sound English." },
  },
  {
    num: "04",
    pl: { title: "Konsekwencja, nie intensywność", desc: "30 minut dziennie bije 3 godziny raz w tygodniu. Nauka języka to nawyk, nie maraton. Budujemy system, który działa długofalowo — bez wypalenia." },
    en: { title: "Consistency over intensity", desc: "30 minutes daily beats 3 hours once a week. Language learning is a habit, not a marathon. We build a system that works long-term — without burnout." },
  },
  {
    num: "05",
    pl: { title: "Kontekst, nie słówka", desc: "Nie uczę słówek z listy. Uczę języka w kontekście realnych sytuacji — spotkań, maili, rozmów telefonicznych. Słowo zapamiętane w kontekście zostaje na zawsze." },
    en: { title: "Context, not vocabulary lists", desc: "I don't teach words from lists. I teach language in the context of real situations — meetings, emails, phone calls. A word learned in context stays forever." },
  },
  {
    num: "06",
    pl: { title: "Mniej znaczy więcej", desc: "Nie zasypuję Cię materiałem. Każda lekcja ma jeden główny cel. Skupiamy się na tym, co daje 80% efektu — reszta to szum. Esencja, nie encyklopedia." },
    en: { title: "Less is more", desc: "I don't bury you in material. Every lesson has one main goal. We focus on what gives 80% of the result — the rest is noise. Essence, not encyclopedia." },
  },
];

/* Wspólna baza dla elementów ujawnianych przy scrollu — GSAP w Home.tsx
   przejmuje je po klasie i zdejmuje tę transformację. */
const revealStyle = (fromLeft: boolean) => ({
  opacity: 0,
  transform: `translateX(${fromLeft ? -120 : 120}px)`,
  transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
});

export default function MethodSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRevealAnimation(110);

  return (
    <section id="method" ref={sectionRef} style={{ padding: "80px 0" }}>
      <div className="container">

        {/* ── GÓRNA CZĘŚĆ: opis metody (lewa) + obrazek (prawa) ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">

          {/* Lewa: opis metody */}
          <div className="reveal-left" style={revealStyle(true)}>
            <span className="label">{t("Metoda Cribro", "Cribro Method")}</span>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", margin: "12px 0 20px" }}>
              {t("Bez zbędnego szumu.", "Without unnecessary noise.")}
            </h2>

            <div style={{ color: "var(--text-2)", lineHeight: "var(--lh-body)" }}>
              <p style={{ margin: "0 0 16px" }}>
                {t(
                  "The Cribro Method to autorska metoda nauczania angielskiego zbudowana na ponad 10 latach doświadczenia pracy z ludźmi o różnych stylach uczenia się — w tym z osobami z ADHD, zapracowanymi menedżerami i zespołami korporacyjnymi.",
                  "The Cribro Method is a proprietary English teaching method built on over 10 years of experience working with people of different learning styles — including those with ADHD, busy managers, and corporate teams."
                )}
              </p>
              <p style={{ margin: "0 0 16px" }}>
                {t(
                  "Jej fundament to redukcja szumu: zamiast zalewać Cię materiałem, wybieram to, co naprawdę działa. Każda lekcja ma jeden cel. Każde ćwiczenie ma sens. Żadnego wypełniacza.",
                  "Its foundation is noise reduction: instead of overwhelming you with material, I choose what truly works. Every lesson has one goal. Every exercise has a purpose. No filler."
                )}
              </p>
              <p style={{ margin: "0 0 24px" }}>
                {t(
                  "Nie uczę języka. Uczę systemu — małych kroków, które budują nawyk i dają efekty, których inne metody nie dają.",
                  "I don't teach language. I teach a system — small steps that build a habit and deliver results other methods don't."
                )}
              </p>
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-3">
              <div style={{ height: "1px", width: "32px", background: "var(--accent-55)" }} />
              <span className="label" style={{ color: "var(--accent-text)" }}>
                {t("bez zbędnego szumu", "without unnecessary noise")}
              </span>
              <div style={{ height: "1px", width: "32px", background: "var(--accent-55)" }} />
            </div>
          </div>

          {/* Prawa: obrazek */}
          <div className="reveal-right flex justify-center items-center relative lg:pl-10" style={revealStyle(false)}>
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <img
                src="/images/final_noise1.png"
                alt={t("Mniej szumu, więcej sensu", "Less noise, more sense")}
                className="w-full h-full object-cover"
                style={{
                  maskImage: "radial-gradient(circle at center, black 50%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 75%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── DOLNA CZĘŚĆ: 6 filarów jako kafelki ── */}
        <h3
          className="text-center"
          style={{ fontSize: "clamp(24px, 3vw, 32px)", margin: "0 0 32px" }}
        >
          {t("Sześć filarów mojej metody", "Six pillars of my method")}
        </h3>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}
        >
          {pillars.map((pillar, i) => {
            const data = lang === "pl" ? pillar.pl : pillar.en;
            const fromLeft = i % 2 === 0;
            return (
              <div
                key={pillar.num}
                className={fromLeft ? "reveal-left" : "reveal-right"}
                style={revealStyle(fromLeft)}
                data-reveal-delay={i * 0.08}
              >
                <div className="card-surface h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="icon-tile" style={{ width: "32px", height: "32px" }}>
                      <span
                        style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500 }}
                      >
                        {pillar.num}
                      </span>
                    </div>
                    <h4 style={{ fontSize: "17px", margin: 0 }}>{data.title}</h4>
                  </div>
                  <p
                    style={{
                      fontSize: "var(--fs-sm)",
                      color: "var(--text-3)",
                      lineHeight: "var(--lh-body)",
                      margin: 0,
                    }}
                  >
                    {data.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
