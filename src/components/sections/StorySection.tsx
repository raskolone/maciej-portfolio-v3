/* =============================================================
   DESIGN: Nocturne Green — Moja historia
   Jeden ekran: narracja po lewej, składająca się wieża Jenga po prawej.
   Wieża jest rysowana, nie fotografowana — klocki wjeżdżają wzdłuż
   własnej długości, warstwa po warstwie od dołu (patrz JengaTower).
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import ScrollHint from "@/components/ScrollHint";
import JengaTower from "@/components/JengaTower";

/* Trzy takty tezy: nawyk powstaje przed kryzysem, kryzys go tylko odsłania,
   więc uczę systemu, nie zrywu. Poprzednia wersja („przetrwałem /
   odbudowałem / uczę innych") opowiadała kolejność zdarzeń — ta mówi, co z
   nich wynika. */
const storyStats = [
  { pl: { label: "Najpierw nawyk", desc: "Buduje się, kiedy jeszcze nic się nie pali." },
    en: { label: "Habit first", desc: "It's built while nothing is on fire yet." } },
  { pl: { label: "Potem kryzys", desc: "Nie tworzy dyscypliny. Tylko ją odsłania." },
    en: { label: "Then the crisis", desc: "It doesn't create discipline. It reveals it." } },
  { pl: { label: "Dlatego system", desc: "Uczę tego, co zostaje, gdy opada kurz." },
    en: { label: "Hence the system", desc: "I teach what's left once the dust settles." } },
];

const bodyText = { lineHeight: "var(--lh-body)", margin: "0 0 16px" };

export default function StorySection() {
  const { t } = useLanguage();

  return (
    <section id="story" className="relative section-band section-screen overflow-hidden">
      <div className="container">
        {/* Nagłówek jest osobnym elementem siatki, żeby na telefonie wieża
            mogła wejść pomiędzy niego a tekst. Inaczej czytelnik przewija
            cztery akapity, zanim w ogóle zobaczy, o jakich klockach mowa. */}
        <div className="story-grid grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_minmax(260px,390px)] lg:grid-rows-[auto_1fr] gap-x-14 gap-y-8 items-center">

          <header data-anim className="order-1 lg:col-start-1 lg:row-start-1 self-end">
            <span className="label">{t("Moja historia", "My Story")}</span>
            {/* `balance` rozkłada nagłówek na dwie równe linie zamiast zostawiać
                samo „nowa." w drugiej — kolumna zwęziła się pod większą wieżę. */}
            <h2 style={{ fontSize: "var(--fs-section-h2)", margin: "12px 0 0", textWrap: "balance" }}>
              {t(
                "Klocki Jenga i sztuka układania ich od nowa.",
                "Jenga blocks and the art of putting them back together."
              )}
            </h2>
          </header>

          {/* Wieża.
              Bez data-anim — ma własną choreografię i wspólne przesunięcie
              całej kolumny zjadałoby wjazdy pojedynczych klocków. */}
          <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 self-center flex justify-center items-center">
            {/* Kadr rysunku jest szerszy niż sama wieża, bo mieści rozrzucone
                klocki — na telefonie trzeba więc dać mu więcej miejsca, żeby
                wieża nie zrobiła się znaczkiem. */}
            {/* Na telefonie wieża schodzi z 270 do 210 px. Kadr rysunku jest
                szerszy niż sama wieża (mieści rozrzucone klocki), więc przy
                270 px zajmowała 340 px wysokości — czyli 40% ekranu, zanim
                padło pierwsze zdanie narracji. */}
            <JengaTower className="w-full h-auto max-w-[210px] sm:max-w-[300px] lg:max-w-none" />
          </div>

          {/* Narracja */}
          <div data-anim className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 self-start">
            <p style={{ ...bodyText, color: "var(--text)" }}>
              {t(
                "Znam to uczucie, kiedy wieża się wali. Kiedy wyciągasz jeden klocek za dużo i całość leci w dół — głośno, chaotycznie, bez ostrzeżenia. Przez lata mierzyłem się z trudnościami zdrowotnymi, psychicznymi i emocjonalnymi, przez które musiałem uczyć się układać swoje życie od nowa. Nie raz. Kilka razy.",
                "I know that feeling — when the tower falls. When you pull one block too many and everything crashes down — loudly, chaotically, without warning. For years I faced health, mental, and emotional challenges that forced me to learn how to rebuild my life from scratch. Not once. Several times."
              )}
            </p>
            <p style={{ ...bodyText, color: "var(--text-2)" }}>
              {t(
                "Długo myślałem, że dyscypliny uczy dopiero katastrofa. Nie uczy. Katastrofa tylko pokazuje, ile jej zdążyłeś zbudować wcześniej — wtedy, kiedy było spokojnie i nic nie zmuszało Cię do wstawania. Wszystko, co mnie potem pozbierało, ćwiczyłem, zanim jeszcze wiedziałem, że będę tego potrzebował.",
                "For a long time I thought discipline was something a catastrophe teaches you. It isn't. A catastrophe only shows how much of it you had already built — back when things were calm and nothing forced you to get up. Everything that later put me back together, I had been practising before I knew I would need it."
              )}
            </p>
            <p style={{ ...bodyText, color: "var(--text-2)" }}>
              {t(
                "ADHD to nie wymówka. To rzeczywistość, z którą żyję każdego dnia. Mózg, który myśli szybciej niż mówi, gubi wątki i skacze między pomysłami — a jednocześnie potrafi skupić się z laserową precyzją na tym, co go naprawdę pochłania. Nauczyłem się z tym pracować, nie walczyć.",
                "ADHD is not an excuse. It's a reality I live with every day. A brain that thinks faster than it speaks, loses threads, jumps between ideas — yet can focus with laser precision on what truly absorbs it. I learned to work with it, not against it."
              )}
            </p>

            {/* Cytat */}
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
                  "\"Dyscyplina nie rodzi się w kryzysie. W kryzysie tylko widać, ile jej było.\"",
                  "\"Discipline isn't born in a crisis. A crisis only shows how much of it was there.\""
                )}
              </p>
            </div>

            <p style={{ ...bodyText, color: "var(--text-2)", marginBottom: "24px" }}>
              {t(
                "Dziś uczę angielskiego ze świadomością, że po drugiej stronie ekranu często siedzi ktoś, kto też walczy — z brakiem pewności siebie, z chaosem w głowie, z poczuciem, że jest za późno. Dlatego nie uczę tylko języka. Uczę tych trzydziestu minut dziennie, które robisz wtedy, kiedy nic Cię do tego nie zmusza. To one zostają, kiedy zabraknie motywacji.",
                "Today I teach English knowing that on the other side of the screen there is often someone who is also struggling — with confidence, with the noise in their head, with the feeling that it is too late. So I don't just teach the language. I teach the thirty minutes a day you do when nothing is forcing you to. Those are what remain once motivation runs out."
              )}
            </p>

            {/* Trzy przystanki historii */}
            {/* Trzy w rzędzie także na telefonie: hasła są jednowyrazowe, a
                jeden pod drugim zajmowały 240 px na nic. */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {storyStats.map((item) => (
                <div key={item.pl.label} className="story-stat">
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(14px, 3.7vw, 19px)",
                      fontWeight: 700,
                      color: "var(--accent-text)",
                      margin: "0 0 4px",
                    }}
                  >
                    {t(item.pl.label, item.en.label)}
                  </p>
                  <p style={{ fontSize: "clamp(9.5px, 2.5vw, 11px)", color: "var(--text-mute)", lineHeight: 1.35, margin: 0 }}>
                    {t(item.pl.desc, item.en.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* „Przewiń niżej” — patrz components/ScrollHint. */}
      <ScrollHint to="#pricing" />
    </section>
  );
}
