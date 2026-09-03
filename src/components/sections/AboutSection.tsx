/* =============================================================
   DESIGN: Nocturne Green — About + My Story (merged)
   Górna część: "O mnie" — statystyki po lewej, bio po prawej
   Separator: włoswata linia gradientowa w akcencie
   Dolna część: "Moja historia" — tekst po lewej, zdjęcie Jenga po prawej
   Każda kolumna ujawnia się jako całość, nie akapit po akapicie.
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";

const JENGA = "/images/jenga.png";

const stats = [
  { num: "10+", pl: "lat doświadczenia", en: "years of experience" },
  { num: "A1–C1", pl: "wszystkie poziomy", en: "all levels" },
  { num: "3", pl: "szkoły językowe", en: "language schools" },
];

const tags = [
  "Business English", "Pronunciation Coach", "Cambridge Exams",
  "CEFR A1–C1", "Full Immersion", "ADHD-Friendly", "EdTech",
];

const storyStats = [
  { pl: { label: "Przetrwałem", desc: "Wiem, co znaczy zaczynać od zera." },
    en: { label: "I survived", desc: "I know what it means to start from scratch." } },
  { pl: { label: "Odbudowałem", desc: "Klocek po klocku. Dzień po dniu." },
    en: { label: "I rebuilt", desc: "Block by block. Day by day." } },
  { pl: { label: "Uczę innych", desc: "Jak budować lepiej niż poprzednio." },
    en: { label: "I teach others", desc: "How to build better than before." } },
];

/* Dystans musi się zgadzać z tym w Home.tsx — GSAP scrubuje stąd do zera. */
const reveal = (fromLeft: boolean) => ({
  opacity: 0,
  transform: `translateX(${fromLeft ? -64 : 64}px)`,
});

const bodyText = { lineHeight: "var(--lh-body)", margin: "0 0 16px" };
const sectionHeading = { fontSize: "clamp(28px, 3.5vw, 38px)", margin: "12px 0 24px" };

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="section-band overflow-hidden"
      style={{ padding: "80px 0" }}
    >
      <div className="container">

        {/* ── GÓRNA CZĘŚĆ: O MNIE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(220px,300px)_1fr] gap-10 lg:gap-14 items-start">

          {/* Left: label, heading, stats */}
          <div className="reveal-left" style={reveal(true)}>
            <span className="label">{t("O mnie", "About Me")}</span>
            <h2 style={sectionHeading}>{t("Lektor. Trener. Człowiek.", "Tutor. Trainer. Human.")}</h2>

            <div className="flex flex-col gap-3">
              {stats.map((stat) => (
                <div key={stat.num} style={{ borderLeft: "2px solid var(--accent-base)", paddingLeft: "16px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "var(--text-hi)",
                      margin: 0,
                    }}
                  >
                    {stat.num}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-mute)", margin: "2px 0 0" }}>
                    {t(stat.pl, stat.en)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bio */}
          <div className="reveal-right" style={reveal(false)}>
            <p style={{ ...bodyText, color: "var(--text)" }}>
              {t(
                "Jestem lektorem języka angielskiego i absolwentem filologii angielskiej. Od ponad 10 lat pracuję z młodzieżą, studentami i dorosłymi — od poziomu A1 aż po C1. Przez lata byłem współwłaścicielem i managerem szkoły językowej, gdzie nadzorowałem pracę zespołu lektorów i dbałem o jakość metodyczną zajęć.",
                "I am an English language tutor and graduate of English philology. For over 10 years I have worked with teenagers, students, and adults — from A1 all the way to C1. For years I co-owned and managed a language school, where I supervised a team of tutors and ensured the methodological quality of lessons."
              )}
            </p>
            <p style={{ ...bodyText, color: "var(--text-2)" }}>
              {t(
                "Na moich zajęciach stawiam na mówienie, osłuchanie z językiem i poprawną wymowę. Fonetyka to moja pasja — pracowałem jako Pronunciation Coach, pomagając klientom nie tylko mówić poprawnie, ale brzmieć naturalnie i pewnie. Zależy mi, żeby nauka była uporządkowana, praktyczna i bez zbędnego stresu.",
                "In my lessons, I focus on speaking, language exposure, and correct pronunciation. Phonetics is my passion — I have worked as a Pronunciation Coach, helping clients not only speak correctly but sound natural and confident. I care about learning being organized, practical, and free from unnecessary stress."
              )}
            </p>
            <p style={{ ...bodyText, color: "var(--text-2)", marginBottom: "24px" }}>
              {t(
                "Mam zdiagnozowane ADHD (test DIVA). Wiem, jak uczy się mózg, który nie znosi nudy, chaosu i przeciążenia informacją. Dlatego moje zajęcia są zbudowane inaczej — mniej materiału, więcej sensu. Krótkie bloki, jasna struktura, zero zbędnego szumu. Uczę tak, jak sam chciałbym być uczony.",
                "I have diagnosed ADHD (DIVA assessment). I know how a brain learns when it can't stand boredom, chaos, or information overload. That's why my lessons are built differently — less material, more meaning. Short blocks, clear structure, zero unnecessary noise. I teach the way I'd want to be taught."
              )}
            </p>

            {/* Pull-quote */}
            <div style={{ borderLeft: "2px solid var(--accent-30)", paddingLeft: "20px", marginBottom: "24px" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "19px",
                  color: "var(--text-hi)",
                  lineHeight: "var(--lh-body)",
                  margin: 0,
                }}
              >
                {t(
                  "\"Nie wierzę w 3-godzinne sesje. Wierzę w 30 minut dziennie, każdego dnia.\"",
                  "\"I don't believe in 3-hour sessions. I believe in 30 minutes a day, every single day.\""
                )}
              </p>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-2)", marginTop: "8px" }}>
                {t(
                  "Nauka języka to nie sprint. To nawyk. Małe kroki, powtarzane konsekwentnie, budują więcej niż intensywne maratony raz na miesiąc. Nauka potwierdzona naukowo — i sprawdzona na sobie.",
                  "Language learning is not a sprint. It's a habit. Small steps, repeated consistently, build more than intense marathons once a month. Science-backed — and personally tested."
                )}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="tag-green">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── SEPARATOR ── */}
        <div className="rule-accent" style={{ margin: "64px 0" }} />

        {/* ── DOLNA CZĘŚĆ: MOJA HISTORIA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,1fr)_minmax(240px,340px)] gap-10 lg:gap-14 items-center">

          {/* Left: narrative */}
          <div className="reveal-left" style={reveal(true)}>
            <span className="label">{t("Moja historia", "My Story")}</span>
            <h2 style={sectionHeading}>
              {t(
                "Klocki Jenga i sztuka układania ich od nowa.",
                "Jenga blocks and the art of putting them back together."
              )}
            </h2>

            <p style={{ ...bodyText, color: "var(--text)" }}>
              {t(
                "Znam to uczucie, kiedy wieża się wali. Kiedy wyciągasz jeden klocek za dużo i całość leci w dół — głośno, chaotycznie, bez ostrzeżenia. Przez lata mierzyłem się z trudnościami zdrowotnymi, psychicznymi i emocjonalnymi, które sprawiały, że musiałem uczyć się układać swoje życie od nowa. Nie raz. Kilka razy.",
                "I know that feeling — when the tower falls. When you pull one block too many and everything crashes down — loudly, chaotically, without warning. For years I faced health, mental, and emotional challenges that forced me to learn how to rebuild my life from scratch. Not once. Several times."
              )}
            </p>
            <p style={{ ...bodyText, color: "var(--text-2)" }}>
              {t(
                "ADHD to nie wymówka. To rzeczywistość, z którą żyję każdego dnia. Mózg, który myśli szybciej niż mówi, gubi wątki, skacze między pomysłami i nie znosi chaosu — a jednocześnie potrafi skupić się z laserową precyzją na tym, co go naprawdę pochłania. Nauczyłem się z tym pracować, nie walczyć.",
                "ADHD is not an excuse. It's a reality I live with every day. A brain that thinks faster than it speaks, loses threads, jumps between ideas, and can't stand chaos — yet can focus with laser precision on what truly absorbs it. I learned to work with it, not against it."
              )}
            </p>

            {/* Pull-quote */}
            <div style={{ borderLeft: "2px solid var(--accent-55)", paddingLeft: "20px", marginBottom: "16px" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "19px",
                  color: "var(--text-hi)",
                  lineHeight: "var(--lh-body)",
                  margin: 0,
                }}
              >
                {t(
                  "\"Klocki Jenga zawsze można poukładać od nowa. Pytanie nie brzmi: czy wieża upadnie? Pytanie brzmi: czy wiesz, jak ją zbudować lepiej niż poprzednio?\"",
                  "\"Jenga blocks can always be stacked again. The question isn't: will the tower fall? The question is: do you know how to build it better than before?\""
                )}
              </p>
            </div>

            <p style={{ ...bodyText, color: "var(--text-2)", marginBottom: "24px" }}>
              {t(
                "Dziś uczę angielskiego — i robię to z pełną świadomością, że po drugiej stronie ekranu często siedzi ktoś, kto też walczy. Z brakiem pewności siebie, z chaosem w głowie, z poczuciem, że jest za późno albo za trudno. Dlatego nie uczę tylko języka. Uczę systemu. Małych kroków. Konsekwencji, która daje efekty.",
                "Today I teach English — and I do it with full awareness that on the other side of the screen there's often someone who is also struggling. With lack of confidence, with chaos in their head, with the feeling that it's too late or too hard. That's why I don't just teach language. I teach a system. Small steps. Consistency that delivers results."
              )}
            </p>

            {/* Three-up stat strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {storyStats.map((item) => (
                <div
                  key={item.pl.label}
                  className="text-center"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-sm)",
                    padding: "16px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "var(--accent-text)",
                      margin: "0 0 4px",
                    }}
                  >
                    {t(item.pl.label, item.en.label)}
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--text-mute)", lineHeight: 1.4, margin: 0 }}>
                    {t(item.pl.desc, item.en.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Jenga photo */}
          <div className="reveal-right" style={reveal(false)}>
            <div
              style={{
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <img
                src={JENGA}
                alt={t("Wieża z klocków Jenga", "A tower of Jenga blocks")}
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
