/* =============================================================
   DESIGN: Nocturne Green — O mnie

   Dwie kolumny: po lewej wąska karta z metryką, po prawej trzy akapity.
   Karta jest tą samą powierzchnią, co kafelki w „Dla kogo" i w cenniku.

   ── Co stąd wypadło i dlaczego ──
   Był tu wcześniej blok „W skrócie": trzy wiersze klucz–wartość pod tekstem.
   Mówił dokładnie to, co akapity obok i co tagi w karcie po lewej, tylko
   trzeci raz i w trzeciej formie. Sekcja rosła przez to do półtora ekranu,
   a nie przybywało w niej ani jednej informacji. Wypadł w całości; wszystko,
   co niósł, stoi dziś albo w akapicie, albo w tagu.

   Akapity też są krótsze. „O mnie" ma dać się przeczytać jednym spojrzeniem
   i przepuścić dalej — kto chce więcej, dostaje całą historię sekcję niżej.

   ── Fonetyka schodzi z pierwszego planu ──
   Wcześniej wymowa była tu przedstawiona jako oś całej pracy: własny akapit,
   drugi tag od góry, osobny wiersz w „W skrócie". To fałszowało proporcje.
   Metoda stoi na pełnym zanurzeniu — mówieniu od pierwszej minuty — a wymowa
   jest specjalizacją, którą się przy okazji dostaje. Dlatego „Full Immersion"
   otwiera listę tagów, a „Pronunciation Coach" ją zamyka, i tak samo jest
   w tekście: zanurzenie w zdaniu głównym, fonetyka w podrzędnym.

   ── Kolejność wejścia ──
   Najpierw wjeżdżają bloki tekstu, jeden po drugim, potem karta, a na końcu
   jej tło rozbłyska. Kolejność bierze się z drzewa: wspólna animacja z Home
   idzie po DOM-ie, więc kolumna tekstu stoi w kodzie PRZED kartą, a na
   miejsca rozstawia je dopiero siatka (`col-start`). Rozbłysk jest osobny,
   bo jest komentarzem do wejścia karty, a nie samym wejściem.
   ============================================================= */

import { useRef } from "react";
import ScrollHint from "@/components/ScrollHint";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { prefersReducedMotion } from "@/lib/scrollTo";

gsap.registerPlugin(ScrollTrigger);

/* Metryka: wykształcenie, praktyka, prowadzenie szkoły — w formie do
   przeczytania jednym spojrzeniem. Rozwinięcie stoi w akapitach obok. */
const stats = [
  {
    pl: { big: "Filologia angielska", small: "wykształcenie kierunkowe" },
    en: { big: "English philology", small: "degree in the field" },
  },
  {
    pl: { big: "10+ lat", small: "praktyki — od A1 do C1, w trzech szkołach" },
    en: { big: "10+ years", small: "of practice — A1 to C1, across three schools" },
  },
  {
    pl: { big: "Własna szkoła", small: "współwłaściciel i manager zespołu lektorów" },
    en: { big: "My own school", small: "co-owner and manager of a team of tutors" },
  },
];

/* Kolejność tagów jest hierarchią, nie alfabetem: zaczyna to, na czym stoi
   metoda, kończy to, co jest dodatkiem. */
const tags = [
  "Full Immersion", "Business English", "Cambridge Exams",
  "CEFR A1–C1", "ADHD-Friendly", "EdTech", "Pronunciation Coach",
];

const bodyText = { lineHeight: "var(--lh-body)", margin: "0 0 14px" };

export default function AboutSection() {
  const { lang, t } = useLanguage();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const glow = scope.current?.querySelector("[data-glow]");
    if (!glow) return;

    /* Rozbłysk tła karty. Ten sam trigger, co u wspólnej animacji wejścia
       („top 75%"), tylko z opóźnieniem: karta jest ostatnia w kolejce, więc
       zanim się pojawi, mija ~1 s. Poświata wchodzi mocno i zostaje
       przygaszona — karta ma po tym być cieplejsza od reszty, a nie wrócić
       do punktu wyjścia. */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(glow, { opacity: 0 }, { opacity: 0.85, duration: 0.5, ease: "power2.out" }, 1.0);
    tl.to(glow, { opacity: 0.32, duration: 1.2, ease: "power2.inOut" }, 1.5);
  }, { scope, dependencies: [lang] });

  return (
    <section id="about" className="relative section-band section-screen overflow-hidden">
      <div className="container" ref={scope}>
        {/* Kolumna tekstu stoi w drzewie PRZED kartą — patrz „Kolejność
            wejścia" w nagłówku pliku. Na telefonie karta i tak wychodzi na
            górę (`order-1`), bo to w niej siedzi nagłówek sekcji. */}
        {/* Obie kolumny mają górną miarę, a para jest wyśrodkowana w
            kontenerze (`justify-center`). Wcześniej kolumna tekstu brała całą
            resztę szerokości, a tekst siedział w niej przy lewej krawędzi ze
            swoją miarą 56ch — im szersze okno, tym większa pustka po prawej
            i tym bardziej całość wyglądała na zsuniętą w lewo. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(240px,300px)_minmax(0,620px)] justify-center gap-8 lg:gap-12 items-stretch">

          {/* Prawa: bio */}
          <div
            lang={lang}
            className="order-2 lg:order-none lg:col-start-2 lg:row-start-1"
          >
            <div className="prose-justify" style={{ color: "var(--text-2)" }}>
              <p data-anim="right" style={{ ...bodyText, color: "var(--text)" }}>
                {t(
                  "Jestem lektorem języka angielskiego i absolwentem filologii angielskiej. Od ponad dziesięciu lat pracuję z młodzieżą, studentami i dorosłymi — od A1 po C1. Przez lata współprowadziłem szkołę językową i odpowiadałem za pracę zespołu lektorów.",
                  "I am an English tutor and a graduate of English philology. For over ten years I have worked with teenagers, students and adults — from A1 to C1. For years I co-ran a language school and was responsible for a team of tutors."
                )}
              </p>
              <p data-anim="right" style={bodyText}>
                {t(
                  "Na moich zajęciach obowiązuje jedna zasada: mówisz po angielsku od pierwszej minuty. Pełne zanurzenie, nie tłumaczenie w głowie. Wymowę szlifujemy po drodze — to moja specjalizacja, ale nie punkt wyjścia.",
                  "One rule runs my lessons: you speak English from minute one. Full immersion, not translating in your head. Pronunciation gets polished along the way — it is my specialisation, but not the starting point."
                )}
              </p>
              <p data-anim="right" style={bodyText}>
                {t(
                  "Mam ADHD. Wiem, jak uczy się mózg, który nie znosi nudy, chaosu i przeciążenia informacją — bo sam taki mam. Stąd krótkie bloki, jasna struktura i zero wypełniacza. Uczę tak, jak sam chciałbym być uczony.",
                  "I have ADHD. I know how a brain learns when it can't stand boredom, chaos or information overload — because mine is one of them. Hence short blocks, clear structure and no filler. I teach the way I'd want to be taught."
                )}
              </p>
              <p data-anim="right" style={{ ...bodyText, marginBottom: "20px" }}>
                {t(
                  "Poza lekcjami buduję narzędzia do nauki pod marką Cribro — te same zasady, tylko w kodzie. Pracuję online z całej Polski i z zagranicy, a stacjonarnie w Bielsku-Białej. Pierwsza rozmowa jest bezpłatna i niczego po niej nie trzeba decydować.",
                  "Beyond lessons I build learning tools under the Cribro brand — the same principles, only in code. I work online across Poland and abroad, and in person in Bielsko-Biała. The first conversation is free, and nothing has to be decided after it."
                )}
              </p>
            </div>

            {/* Cytat */}
            <div data-anim="right" style={{ borderLeft: "2px solid var(--accent-30)", paddingLeft: "18px" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 1.4vw, 18px)",
                  color: "var(--text-hi)",
                  lineHeight: "var(--lh-body)",
                  margin: 0,
                }}
              >
                {t(
                  "\"Nie wierzę w trzygodzinne sesje. Wierzę w dwie godziny z lektorem w tygodniu i dziesięć minut każdego innego dnia — to przynosi niesamowite efekty.\"",
                  "\"I don't believe in three-hour sessions. I believe in two hours a week with a tutor plus ten minutes every other day — that brings remarkable results.\""
                )}
              </p>
              <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-2)", marginTop: "6px" }}>
                {t(
                  "Nauka języka to nie sprint. To nawyk.",
                  "Language learning is not a sprint. It's a habit."
                )}
              </p>
            </div>
          </div>

          {/* Lewa: karta z metryką */}
          <div data-anim="left" className="about-frame order-1 lg:order-none lg:col-start-1 lg:row-start-1">
            {/* Poświata pod treścią — rozbłyska po wjeździe karty i zostaje
                przygaszona. Leży pod tekstem, bo to tło, a nie warstwa. */}
            <span data-glow className="about-frame__glow" aria-hidden="true" />

            <div className="about-frame__body">
              <span className="label">{t("O mnie", "About Me")}</span>
              <h2 style={{ fontSize: "var(--fs-section-h2)", margin: "10px 0 0" }}>
                {t("Lektor. Trener. Człowiek.", "Tutor. Trainer. Human.")}
              </h2>
            </div>

            {/* Trzy układy, bo trzy różne szerokości karty:
                • telefon  — kolumna. W rzędzie na 390 px każda pozycja ma
                  ~110 px, a „praktyki — od A1 do C1, w trzech szkołach"
                  łamie się wtedy na trzy wiersze i trzy pozycje mają trzy
                  różne wysokości;
                • tablet   — rząd. Karta jest na całą szerokość, więc trzy
                  pozycje obok siebie czyta się jednym spojrzeniem;
                • desktop  — kolumna, bo karta wraca do 300 px. */}
            <div className="about-frame__body flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-5 lg:gap-3">
              {stats.map((stat) => {
                const data = lang === "pl" ? stat.pl : stat.en;
                return (
                  <div
                    key={stat.pl.big}
                    className="sm:flex-1 lg:flex-none"
                    style={{ borderLeft: "2px solid var(--accent-base)", paddingLeft: "11px" }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(14px, 3.2vw, 18px)",
                        fontWeight: 700,
                        color: "var(--text-hi)",
                        lineHeight: 1.15,
                        margin: 0,
                      }}
                    >
                      {data.big}
                    </p>
                    <p style={{ fontSize: "clamp(10px, 2.6vw, 11.5px)", color: "var(--text-mute)", lineHeight: 1.35, margin: "3px 0 0" }}>
                      {data.small}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Tagi wyśrodkowane — to podpis pod całą kartą, nie akapit, więc
                nie ma się równać do jej lewej krawędzi. */}
            <div className="about-frame__body about-frame__tags">
              {tags.map((tag) => (
                <span key={tag} className="tag-green">{tag}</span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* „Przewiń niżej” — patrz components/ScrollHint. */}
      <ScrollHint to="#story" />
    </section>
  );
}
