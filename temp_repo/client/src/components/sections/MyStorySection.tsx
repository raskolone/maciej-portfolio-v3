/* =============================================================
   DESIGN: Dark Constellation — My Story Section
   Personal narrative: Jenga metaphor, resilience, ADHD journey
   Positioned between About and Method sections
   ============================================================= */

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MyStorySection() {
  const { t } = useLanguage();
  const sectionRef = useRevealAnimation(110);

  return (
    <section id="my-story" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">

      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, oklch(0.72 0.22 145 / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Section label */}
          <div
            className="reveal-left mb-10"
            style={{ opacity: 0, transform: "translateX(-120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
          >
            <p className="section-label mb-3">{t("Moja historia", "My Story")}</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t(
                "Klocki Jenga i sztuka układania ich od nowa.",
                "Jenga blocks and the art of putting them back together."
              )}
            </h2>
            <div className="rule-ink mt-6 max-w-xs" />
          </div>

          {/* Story paragraphs */}
          <div className="space-y-7">

            <div
              className="reveal-right"
              style={{ opacity: 0, transform: "translateX(120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
            >
              <p className="text-base text-foreground leading-relaxed">
                {t(
                  "Znam to uczucie, kiedy wieża się wali. Kiedy wyciągasz jeden klocek za dużo i całość leci w dół — głośno, chaotycznie, bez ostrzeżenia. Przez lata mierzyłem się z trudnościami zdrowotnymi, psychicznymi i emocjonalnymi, które sprawiały, że musiałem uczyć się układać swoje życie od nowa. Nie raz. Kilka razy.",
                  "I know that feeling — when the tower falls. When you pull one block too many and everything crashes down — loudly, chaotically, without warning. For years I faced health, mental, and emotional challenges that forced me to learn how to rebuild my life from scratch. Not once. Several times."
                )}
              </p>
            </div>

            <div
              className="reveal-left"
              style={{ opacity: 0, transform: "translateX(-120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
            >
              <p className="text-base text-muted-foreground leading-relaxed">
                {t(
                  "ADHD to nie wymówka. To rzeczywistość, z którą żyję każdego dnia. Mózg, który myśli szybciej niż mówi, gubi wątki, skacze między pomysłami i nie znosi chaosu — a jednocześnie potrafi skupić się z laserową precyzją na tym, co go naprawdę pochłania. Nauczyłem się z tym pracować, nie walczyć.",
                  "ADHD is not an excuse. It's a reality I live with every day. A brain that thinks faster than it speaks, loses threads, jumps between ideas, and can't stand chaos — yet can focus with laser precision on what truly absorbs it. I learned to work with it, not against it."
                )}
              </p>
            </div>

            {/* Jenga quote block */}
            <div
              className="reveal-right"
              style={{ opacity: 0, transform: "translateX(120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
            >
              <div className="relative pl-6 py-4 border-l-2 border-primary/50">
                <div className="absolute -left-1 top-4 w-2 h-2 rounded-full bg-primary/60" />
                <p
                  className="text-lg md:text-xl text-foreground font-medium leading-relaxed italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {t(
                    "\"Klocki Jenga zawsze można poukładać od nowa. Pytanie nie brzmi: czy wieża upadnie? Pytanie brzmi: czy wiesz, jak ją zbudować lepiej niż poprzednio?\"",
                    "\"Jenga blocks can always be stacked again. The question isn't: will the tower fall? The question is: do you know how to build it better than before?\""
                  )}
                </p>
              </div>
            </div>

            <div
              className="reveal-left"
              style={{ opacity: 0, transform: "translateX(-120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
            >
              <p className="text-base text-muted-foreground leading-relaxed">
                {t(
                  "Dziś uczę angielskiego — i robię to z pełną świadomością, że po drugiej stronie ekranu często siedzi ktoś, kto też walczy. Z brakiem pewności siebie, z chaosem w głowie, z poczuciem, że jest za późno albo za trudno. Dlatego nie uczę tylko języka. Uczę systemu. Małych kroków. Konsekwencji, która daje efekty.",
                  "Today I teach English — and I do it with full awareness that on the other side of the screen there's often someone who is also struggling. With lack of confidence, with chaos in their head, with the feeling that it's too late or too hard. That's why I don't just teach language. I teach a system. Small steps. Consistency that delivers results."
                )}
              </p>
            </div>

            {/* Three pillars */}
            <div
              className="reveal-right grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
              style={{ opacity: 0, transform: "translateX(120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
            >
              {[
                {
                  pl: { label: "Przetrwałem", desc: "Wiem, co znaczy zaczynać od zera." },
                  en: { label: "I survived", desc: "I know what it means to start from scratch." },
                },
                {
                  pl: { label: "Odbudowałem", desc: "Klocek po klocku. Dzień po dniu." },
                  en: { label: "I rebuilt", desc: "Block by block. Day by day." },
                },
                {
                  pl: { label: "Uczę innych", desc: "Jak budować lepiej niż poprzednio." },
                  en: { label: "I teach others", desc: "How to build better than before." },
                },
              ].map((item) => {
                const data = t(item.pl.label, item.en.label) === item.pl.label ? item.pl : item.en;
                return (
                  <div
                    key={item.pl.label}
                    className="bg-card/40 border border-border/50 rounded-sm p-5 text-center"
                  >
                    <p
                      className="text-xl font-bold text-primary mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {t(item.pl.label, item.en.label)}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t(item.pl.desc, item.en.desc)}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
