/* =============================================================
   DESIGN: Dark Constellation — Method Section
   Tagline: "Bez zbędnego szumu"
   Układ: opis metody (lewa) + obrazek (prawa) u góry,
          5 filarów jako kafelki wyśrodkowane na dole.
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

export default function MethodSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRevealAnimation(110);

  return (
    <section id="method" ref={sectionRef} className="py-24 bg-card/20">
      <div className="container">

        {/* ── GÓRNA CZĘŚĆ: opis metody (lewa) + obrazek (prawa) ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">

          {/* Lewa: opis metody */}
          <div
            className="reveal-left"
            style={{ opacity: 0, transform: "translateX(-120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
          >
            <div className="relative mb-6">
              <span className="deco-number">03</span>
              <p className="section-label mb-3">{t("Metoda Cribro", "Cribro Method")}</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Bez zbędnego szumu.", "Without unnecessary noise.")}
              </h2>
              <div className="rule-ink mt-5 max-w-xs" />
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {t(
                  "The Cribro Method to autorska metoda nauczania angielskiego zbudowana na ponad 10 latach doświadczenia pracy z ludźmi o różnych stylach uczenia się — w tym z osobami z ADHD, zapracowanymi menedżerami i zespołami korporacyjnymi.",
                  "The Cribro Method is a proprietary English teaching method built on over 10 years of experience working with people of different learning styles — including those with ADHD, busy managers, and corporate teams."
                )}
              </p>
              <p>
                {t(
                  "Jej fundament to redukcja szumu: zamiast zalewać Cię materiałem, wybieram to, co naprawdę działa. Każda lekcja ma jeden cel. Każde ćwiczenie ma sens. Żadnego wypełniacza.",
                  "Its foundation is noise reduction: instead of overwhelming you with material, I choose what truly works. Every lesson has one goal. Every exercise has a purpose. No filler."
                )}
              </p>
              <p>
                {t(
                  "Nie uczę języka. Uczę systemu — małych kroków, które budują nawyk i dają efekty, których inne metody nie dają.",
                  "I don't teach language. I teach a system — small steps that build a habit and deliver results other methods don't."
                )}
              </p>
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-3 mt-8">
              <div className="h-px w-8 bg-primary/40" />
              <span
                className="text-primary/80 text-sm tracking-[0.2em] uppercase font-semibold"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {t("bez zbędnego szumu", "without unnecessary noise")}
              </span>
              <div className="h-px w-8 bg-primary/40" />
            </div>
          </div>

          {/* Prawa: obrazek */}
          <div className="reveal-right flex justify-center items-center relative lg:pl-10">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <img
                src="/images/final_noise1.png"
                alt={t("Mniej szumu, więcej sensu", "Less noise, more sense")}
                className="w-full h-full object-cover"
                style={{
                  maskImage: "radial-gradient(circle at center, black 50%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 75%)"
                }}
              />
            </div>
          </div>
        </div>

        {/* ── DOLNA CZĘŚĆ: 5 filarów jako kafelki ── */}
        <div>
          <div
            className="reveal-left text-center mb-10"
            style={{ opacity: 0, transform: "translateX(-120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t("Sześć filarów mojej metody", "Six pillars of my method")}
            </h3>
            <div className="rule-ink mt-4 mx-auto max-w-xs" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((pillar, i) => {
              const data = lang === "pl" ? pillar.pl : pillar.en;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={pillar.num}
                  className={isLeft ? "reveal-left" : "reveal-right"}
                  style={{
                    opacity: 0,
                    transform: isLeft ? "translateX(-120px)" : "translateX(120px)",
                    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  <div
                    className="h-full p-6 border border-primary/15 rounded-sm bg-card/30 hover:bg-card/50 hover:border-primary/35 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                        <span
                          className="text-primary font-bold text-xs"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {pillar.num}
                        </span>
                      </div>
                      <h4
                        className="text-base font-bold text-foreground"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {data.title}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {data.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
