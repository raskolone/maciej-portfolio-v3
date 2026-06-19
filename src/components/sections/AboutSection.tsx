/* =============================================================
   DESIGN: Warm Ink & Paper — About + My Story (merged)
   Upper: "O mnie" — photo inline, titles, bio
   Separator: green gradient line
   Lower: "Moja Historia" — text left (7 cols), Jenga image right (5 cols)
   ============================================================= */

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import JENGA from "@/assets/images/jenga-rebuild-dark.webp";

const PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663489474725/R7k6sYKTkLq9Ymom2yutju/maciej-photo-editorial_4c075e9b.png";

const stats = [
  { num: "10+", pl: "lat doświadczenia", en: "years of experience" },
  { num: "A1–C1", pl: "wszystkie poziomy", en: "all levels" },
  { num: "3", pl: "szkoły językowe", en: "language schools" },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRevealAnimation(110);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container">

        {/* ── GÓRNA CZĘŚĆ: O MNIE ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left column: label + heading + stats */}
          <div className="lg:col-span-4">
            <div className="relative mb-8">
              <span className="deco-number">04</span>
              <p className="section-label mb-3">{t("O mnie", "About Me")}</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Lektor. Trener. Człowiek.", "Tutor. Trainer. Human.")}
              </h2>
              <div className="rule-ink mt-6" />
            </div>

            {/* Stats */}
            <div
              className="reveal-left grid grid-cols-3 lg:grid-cols-1 gap-3 mt-6"
              style={{ opacity: 0, transform: "translateX(-120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
            >
              {stats.map((stat) => (
                <div key={stat.num} className="border-l-2 border-primary pl-4 py-1">
                  <p
                    className="text-2xl font-bold text-foreground"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {stat.num}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t(stat.pl, stat.en)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: bio text */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {/* Photo inline — float right, prostokątne, wcięte w tekst */}
              <div
                className="reveal-right float-right ml-6 mb-4 hidden sm:block"
                style={{
                  opacity: 0,
                  transform: "translateY(16px)",
                  transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                  width: "160px",
                  flexShrink: 0,
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    borderRadius: "2px",
                    boxShadow: "0 0 24px oklch(0.65 0.2 145 / 0.18), 0 4px 16px rgba(0,0,0,0.5)",
                    border: "1px solid oklch(0.65 0.2 145 / 0.25)",
                  }}
                >
                  <img
                    src={PHOTO}
                    alt="Maciej Wyrozumski"
                    className="w-full object-cover"
                    style={{ display: "block" }}
                  />
                </div>
              </div>

              <div
                className="reveal-left"
                style={{ opacity: 0, transform: "translateX(120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
              >
                <p className="text-base text-foreground leading-relaxed">
                  {t(
                    "Jestem lektorem języka angielskiego i absolwentem filologii angielskiej. Od ponad 10 lat pracuję z młodzieżą, studentami i dorosłymi — od poziomu A1 aż po C1. Przez lata byłem współwłaścicielem i managerem szkoły językowej, gdzie nadzorowałem pracę zespołu lektorów i dbałem o jakość metodyczną zajęć.",
                    "I am an English language tutor and graduate of English philology. For over 10 years I have worked with teenagers, students, and adults — from A1 all the way to C1. For years I co-owned and managed a language school, where I supervised a team of tutors and ensured the methodological quality of lessons."
                  )}
                </p>
              </div>

              <div
                className="reveal-right"
                style={{ opacity: 0, transform: "translateX(-120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
              >
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t(
                    "Na moich zajęciach stawiam na mówienie, osłuchanie z językiem i poprawną wymowę. Fonetyka to moja pasja — pracowałem jako Pronunciation Coach, pomagając klientom nie tylko mówić poprawnie, ale brzmieć naturalnie i pewnie. Zależy mi, żeby nauka była uporządkowana, praktyczna i bez zbędnego stresu.",
                    "In my lessons, I focus on speaking, language exposure, and correct pronunciation. Phonetics is my passion — I have worked as a Pronunciation Coach, helping clients not only speak correctly but sound natural and confident. I care about learning being organized, practical, and free from unnecessary stress."
                  )}
                </p>
              </div>

              <div
                className="reveal-left"
                style={{ opacity: 0, transform: "translateX(120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
              >
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t(
                    "Jestem ADHD. Wiem, jak uczy się mózg, który nie znosi nudy, chaosu i przeciążenia informacją. Dlatego moje zajęcia są zbudowane inaczej — mniej materiału, więcej sensu. Krótkie bloki, jasna struktura, zero zbędnego szumu. Uczę tak, jak sam chciałbym być uczony.",
                    "I have ADHD. I know how a brain learns when it can't stand boredom, chaos, or information overload. That's why my lessons are built differently — less material, more meaning. Short blocks, clear structure, zero unnecessary noise. I teach the way I'd want to be taught."
                  )}
                </p>
              </div>

              {/* Philosophy block */}
              <div
                className="reveal-right border-l-2 border-primary/40 pl-5 py-2"
                style={{ opacity: 0, transform: "translateX(-120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
              >
                <p
                  className="text-base text-foreground font-medium leading-relaxed italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
                >
                  {t(
                    "\"Nie wierzę w 3-godzinne sesje. Wierzę w 30 minut dziennie, każdego dnia.\" ",
                    "\"I don't believe in 3-hour sessions. I believe in 30 minutes a day, every single day.\""
                  )}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t(
                    "Nauka języka to nie sprint. To nawyk. Małe kroki, powtarzane konsekwentnie, budują więcej niż intensywne maratony raz na miesiąc. Nauka potwierdzona naukowo — i sprawdzona na sobie.",
                    "Language learning is not a sprint. It's a habit. Small steps, repeated consistently, build more than intense marathons once a month. Science-backed — and personally tested."
                  )}
                </p>
              </div>

              {/* Tags */}
              <div
                className="reveal-left flex flex-wrap gap-2 pt-2"
                style={{ opacity: 0, transform: "translateX(120px)", transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
              >
                {["Business English", "Pronunciation Coach", "Cambridge Exams", "CEFR A1–C1", "Full Immersion", "ADHD-Friendly", "EdTech"].map((tag) => (
                  <span key={tag} className="tag-green">{tag}</span>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── SEPARATOR: zielona linia gradientowa ── */}
        <div
          className="reveal-right my-16"
          style={{
            opacity: 0,
            transform: "translateY(8px)",
            transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, oklch(0.65 0.2 145 / 0.6) 20%, oklch(0.65 0.2 145 / 0.8) 50%, oklch(0.65 0.2 145 / 0.6) 80%, transparent 100%)",
              boxShadow: "0 0 8px oklch(0.65 0.2 145 / 0.4)",
            }}
          />
        </div>

        {/* ── DOLNA CZĘŚĆ: MOJA HISTORIA ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-stretch">

          {/* Left: text (7 cols) */}
          <div className="lg:col-span-7 space-y-7 pr-0 lg:pr-10">

            {/* Heading */}
            <div
              className="reveal-left"
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
              ].map((item) => (
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
              ))}
            </div>

          </div>

          {/* Right: Jenga image (5 cols) — element tła, bez ramki, mix-blend-mode lighten */}
          <div
            className="reveal-right hidden lg:flex lg:col-span-5 items-stretch relative" aria-hidden="true"
            style={{
              opacity: 0,
              transform: "translateX(120px)",
              transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
              minHeight: "100%",
            }}
          >
            <img
              src={JENGA}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center"
              style={{
                opacity: 0.92,
                userSelect: "none",
                pointerEvents: "none",
                maskImage: "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%, black 65%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                WebkitMaskComposite: "source-in",
              }}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
