/* =============================================================
   DESIGN: Nocturne Green — Sześć filarów jako mapa myśli

   Osobny ekran po „Metodzie Cribro". Układ jest ten sam, co wcześniej —
   sześć rzeczy po bokach, kreski zbiegające się do środka, a w środku nazwa,
   do której to wszystko prowadzi. Zmienił się materiał: węzły są klasycznymi
   kafelkami, tymi samymi co w „Dla kogo" czy w cenniku, a nie kółkami
   obrysowanymi kredką.

   Powód jest jeden i jest nim spójność. Rysunek odręczny był tu wyspą: sześć
   elips i ramka pisane inną konwencją niż każda inna sekcja strony. Mapa
   myśli nie potrzebuje kredki, żeby być mapą — wystarczą jej węzły i kreski
   między nimi. Została więc kompozycja (co prowadzi do czego), a odpadła
   technika, która się z resztą strony kłóciła.

   Kolejność wejścia nadal niesie treść: najpierw sześć osobnych kafelków,
   potem kreski dobijające do środka, na końcu sam środek. Gdyby środek
   pojawiał się pierwszy, sekcja mówiłaby „oto metoda i jej sześć części" —
   czyli podział. W tę stronę mówi coś odwrotnego: te sześć rzeczy okazuje się
   jedną. Dlatego kafelki stoją w drzewie PRZED piastą — wspólna animacja
   z Home idzie po kolejności DOM.

   ── Skąd biorą się końce kresek ──
   Szerokość węzła jest procentem mapy, więc w jednostkach viewBoksu jest
   STAŁA (33% z 1180 = 389) niezależnie od wielkości okna. Zmienia się tylko
   wysokość, bo zależy od łamania tekstu. Dlatego kreski dobijają do kafelków
   dokładnie na ich poziomej skrajnej, w połowie wysokości — jedynym punkcie,
   który nie ucieka.

   ── Dlaczego akurat 33% ──
   Wysokość mapy nie zależy od jej szerokości, tylko od okna: `.mindmap` liczy
   ją jako (100svh − oddech nagłówka). Na trzynastocalowym laptopie zostaje
   niecałe 400 px na trzy rzędy, czyli ~142 px na rząd — a w tym mieści się
   kafelek najwyżej ~110 px wysoki. Kredkowe kółka tolerowały ciasnotę, bo ich
   skrajne punkty są puste; prostokąty nie: stykają się rogami i od razu widać
   kolizję.

   Jedyny sposób na niższy kafelek to szerszy kafelek — opis łamie się wtedy na
   dwie linie zamiast trzech. Stąd 33% zamiast 30%, mniejszy oddech w środku
   i drobniejszy stopień pisma. Za te 3% płaci piasta: schodzi z 27% na 25%,
   żeby między nią a węzłami zostało ~47 jednostek na kreski.

   ── Pion ──
   Rzędy stoją na 12,9% / 50% / 87,1% wysokości, a nie na 13,9% / 50% / 86,1%,
   i każdy kafelek ma sztywne 24% wysokości mapy. To nie jest kosmetyka:
   piasta jest od kafelka dwa razy wyższa i musi się zmieścić między dolną
   krawędzią górnego rzędu a górną dolnego. Przy poprzednich wartościach
   zostawało jej 223 px na 226 px potrzeby — dotykała obu rzędów naraz
   i mapa czytała się jak trzy sklejone paski.
   ============================================================= */

import { useRef } from "react";
import ScrollHint from "@/components/ScrollHint";
import CardRail from "@/components/CardRail";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { useLanguage } from "@/contexts/LanguageContext";
import { prefersReducedMotion } from "@/lib/scrollTo";
import { Point, smooth } from "@/lib/cord";

gsap.registerPlugin(ScrollTrigger);

/* Płótno mapy. Wszystko poniżej jest w tych współrzędnych. */
const VIEW = { w: 1180, h: 620 };

/** Pozioma skrajna kafelka: środek węzła ± połowa jego stałej szerokości. */
const REACH = 195;

interface Pillar {
  num: string;
  /** Środek węzła na płótnie. */
  at: { x: number; y: number };
  /** Trasa kreski OD węzła DO piasty, bez pierwszego punktu — patrz `wires`.
      Kierunek jest istotny: kreska odsłania się od początku ścieżki, a ma
      biec od filaru do środka, nie odwrotnie. */
  via: Point[];
  pl: { title: string; desc: string };
  en: { title: string; desc: string };
}

const pillars: Pillar[] = [
  {
    num: "01", at: { x: 200, y: 80 },
    via: [[406, 105], [418, 170], [432, 240], [438, 278]],
    pl: { title: "Full Immersion", desc: "Cała lekcja po angielsku. Twój mózg przestaje tłumaczyć i zaczyna myśleć." },
    en: { title: "Full Immersion", desc: "The whole lesson in English. Your brain stops translating and starts thinking." },
  },
  {
    num: "02", at: { x: 200, y: 310 },
    via: [[412, 316], [428, 303], [438, 310]],
    pl: { title: "Mówisz od pierwszej minuty", desc: "Bez rozgrzewki na trzy lekcje. Reagujesz, mylisz się, poprawiasz — na żywo." },
    en: { title: "Speaking from minute one", desc: "No three-lesson warm-up. You react, slip up, correct yourself — live." },
  },
  {
    num: "03", at: { x: 200, y: 540 },
    via: [[406, 515], [418, 450], [432, 380], [438, 342]],
    pl: { title: "Wymowa i fonetyka", desc: "Moja specjalizacja. Uczę brzmieć naturalnie, nie tylko poprawnie." },
    en: { title: "Pronunciation & phonetics", desc: "My specialisation. I teach you to sound natural, not merely correct." },
  },
  {
    num: "04", at: { x: 980, y: 80 },
    via: [[774, 105], [762, 170], [748, 240], [742, 278]],
    pl: { title: "Konsekwencja, nie zryw", desc: "30 minut dziennie bije trzy godziny raz w tygodniu. Zawsze." },
    en: { title: "Consistency, not sprints", desc: "30 minutes a day beats three hours once a week. Every time." },
  },
  {
    num: "05", at: { x: 980, y: 310 },
    via: [[768, 316], [752, 303], [742, 310]],
    pl: { title: "Kontekst zamiast listy słówek", desc: "Słowo złapane w rozmowie zostaje. Słowo z kolumny w zeszycie — nie." },
    en: { title: "Context over word lists", desc: "A word caught in conversation stays. A word in a notebook column doesn't." },
  },
  {
    num: "06", at: { x: 980, y: 540 },
    via: [[774, 515], [762, 450], [748, 380], [742, 342]],
    pl: { title: "Jeden cel na lekcję", desc: "Nie zasypuję Cię materiałem. Co nie zarabia na swoje miejsce — wypada." },
    en: { title: "One goal per lesson", desc: "I don't bury you in material. What doesn't earn its place is cut." },
  },
];

/* Kreski policzone raz, przy starcie modułu.

   Pierwszego punktu nie ma w danych: wynika ze środka węzła i REACH, więc
   zmiana szerokości kafelka nie wymaga poprawiania sześciu tablic. `smooth`
   zamienia łamaną w krzywą, więc kreska schodzi do środka łagodnym łukiem,
   a nie łamie się na każdym punkcie trasy. */
const wires = pillars.map((p) => {
  const toward = p.at.x < VIEW.w / 2 ? 1 : -1;
  const start: Point = [p.at.x + toward * REACH, p.at.y];
  return { d: smooth([start, ...p.via]), knot: start };
});

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/* Kreski ruszają dopiero, gdy kafelki są na miejscu. Wspólna animacja
   wejścia z Home startuje przy „top 75%" i trwa z okładem sekundę — stąd to
   opóźnienie. Trzymam je tutaj, a nie w Home, bo to jedyna sekcja, w której
   coś dorysowuje się PO wjeździe treści. */
const WIRES_DELAY = 0.85;

export default function PillarsSection() {
  const { lang, t } = useLanguage();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const root = scope.current;
    const paths = gsap.utils.toArray<SVGPathElement>("[data-wires] path", root);
    const knots = gsap.utils.toArray<SVGCircleElement>("[data-wires] circle", root);
    if (!root || paths.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 72%",
        toggleActions: "play none none reverse",
      },
    });

    /* Wszystkie kreski naraz, bo to jeden ruch, a nie sześć osobnych.
       Startują razem, kończą różnie: dłuższa trasa zajmuje więcej czasu. */
    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(path, { strokeDashoffset: 0, duration: 0.6 + len / 900, ease: "power2.inOut" }, WIRES_DELAY);
      tl.fromTo(knots[i], { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.2)" }, WIRES_DELAY + 0.1);
    });
  }, { scope, dependencies: [lang] });

  const body = (p: Pillar) => (lang === "pl" ? p.pl : p.en);

  /* Środek mapy — treść piasty. Ta sama w mapie i w wariancie pionowym,
     więc jedno miejsce, w którym się ją zmienia. */
  const hub = (
    <>
      <p className="mindmap__hub-name">The Cribro Method</p>
      <p className="mindmap__gloss">{t("łac. cribrum — sito", "Latin cribrum — a sieve")}</p>
      <p className="mindmap__gloss">{t("cribro — przesiewam", "cribro — I sift")}</p>
      {/* Dewiza marki — w tym samym kroju i kolorze, w jakim pada w hero pod
          nazwiskiem. To ma być to samo zdanie, nie jego wariant. */}
      <p className="mindmap__motto">{t("Bez zbędnego szumu.", "No unnecessary noise.")}</p>
    </>
  );

  return (
    <section id="pillars" className="relative section-screen overflow-hidden">
      <div className="container" ref={scope}>

        <div className="text-center mb-8 lg:mb-4">
          <span className="label" data-anim="up">{t("Filary", "Pillars")}</span>
          <h2 data-anim="up" style={{ fontSize: "var(--fs-section-h2)", margin: "12px 0 10px" }}>
            {t("Sześć filarów mojej metody", "Six pillars of my method")}
          </h2>
          <p data-anim="up" style={{ color: "var(--text-2)", maxWidth: "560px", margin: "0 auto" }}>
            {t(
              "Wszystko wisi na jednej nitce — i każda z sześciu odnóg robi coś, czego nie robią pozostałe.",
              "It all hangs on a single thread — and each of the six branches does something the others don't."
            )}
          </p>
        </div>

        {/* ── Mapa: od 1024 px wzwyż ── */}
        <div className="mindmap">
          <svg
            className="mindmap__wires"
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <g data-wires>
              {wires.map((wire, i) => (
                <path key={i} d={wire.d} stroke="var(--accent-30)" strokeWidth={1.8} />
              ))}
              {/* Supeł na styku kreski z kafelkiem — ten sam znak, co przy
                  pionowym wariancie niżej. */}
              {wires.map((wire, i) => (
                <circle key={i} cx={wire.knot[0]} cy={wire.knot[1]} r={4} fill="var(--accent-base)" opacity={0} />
              ))}
            </g>
          </svg>

          {/* Sześć filarów. W drzewie PRZED piastą, bo wspólna animacja
              z Home idzie po kolejności DOM — a środek ma być puentą.

              Trzy poziomy, i każdy ma jedno zadanie, bo wszystkie trzy piszą
              po `transform` i weszłyby sobie w drogę:

              • slot   — pozycja na mapie (`translate: -50% -50%` wokół punktu);
              • wjazd  — `data-anim`, po którym jedzie GSAP;
              • kafelek — najechanie (`scale` z arkusza).

              Sklejenie któregokolwiek z nich kończy się tak samo. Pozycja
              z wjazdem: GSAP, przejmując `transform`, kasuje samodzielne
              `translate` i węzeł ucieka o pół swojej szerokości. Wjazd
              z najechaniem: GSAP zostawia po sobie `transform` w stylu inline,
              a styl inline wygrywa z każdą regułą arkusza — kafelek dostaje
              wtedy ramkę i poświatę, ale nie rośnie. */}
          {pillars.map((pillar) => {
            const data = body(pillar);
            return (
              <div
                key={pillar.num}
                className="mindmap__slot"
                style={{ left: pct(pillar.at.x, VIEW.w), top: pct(pillar.at.y, VIEW.h) }}
              >
                <div className="mindmap__slot-inner" data-anim={pillar.at.x < VIEW.w / 2 ? "left" : "right"}>
                  <div className="mindmap__node">
                    <span className="mindmap__num">{pillar.num}</span>
                    <h3 className="mindmap__title">{data.title}</h3>
                    <p className="mindmap__desc">{data.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Piasta — nazwa metody i skąd się wzięła. Kafelek wyróżniony tak
              samo jak polecany wariant w cenniku: miętowa ramka, poświata,
              tło w akcencie. To jest ta sama hierarchia, tylko w mapie. */}
          <div className="mindmap__slot mindmap__slot--hub">
            <div className="mindmap__slot-inner" data-anim="up">
              <div className="mindmap__hub">{hub}</div>
            </div>
          </div>
        </div>

        {/* ── Wariant pionowy — telefon, tablet i niski ekran laptopa ──
               Mapa myśli jest układem na szerokość: sześć węzłów wokół środka
               potrzebuje obu wymiarów naraz. Na telefonie nie ma ani jednego
               z nich, więc nie ma sensu jej ściskać — jest zamieniana na to,
               czym telefon operuje najlepiej: jedną kartę na ekran, przesuwaną
               kciukiem. Dokładnie tak, jak „Dla kogo" i cennik, więc trzy
               sekcje z kafelkami zachowują się na telefonie tak samo.

               Piasta stoi nad karuzelą: skoro nie da się jej postawić
               w środku, ma być pierwsza — to nadal ona jest puentą.

               Od 768 px wzwyż CardRail wraca do siatki, a siatka dostaje to,
               czego karuzeli dać się nie da: pionową nitkę spod piasty i
               odnogi do każdego kafelka. Bez nich sześć pudełek pod banerem
               to była lista, a nie mapa — nie było widać, że wszystko wisi
               na jednym. Rysuje je arkusz (.mindmap-grid), bo to czysta
               geometria siatki: nitka w rynnie między kolumnami, odnoga
               z krawędzi kafelka do nitki, supeł na styku. ── */}
        <div className="mindmap-fallback">
          {/* Piasta w opakowaniu, nie z `data-anim` na sobie: GSAP zostawia po
              wjeździe `transform` w stylu inline, a ten blokuje powiększenie
              przy najechaniu. Ta sama zasada, co przy węzłach mapy. */}
          <div data-anim="up" className="mindmap__hub-wrap">
            <div className="mindmap__hub mindmap__hub--flat">{hub}</div>
          </div>
          {/* Nitka z grotem — tylko telefon. Na tablecie tę samą rolę pełni
              pionowa nitka w rynnie siatki; tu, przy jednej kolumnie i
              karuzeli, nie ma rynny, więc zostaje sam odcinek pod piastą. */}
          <div className="mindmap__drop" aria-hidden="true" />

          <CardRail
            count={pillars.length}
            className="mindmap-grid"
            label={t("Sześć filarów metody", "Six pillars of the method")}
          >
            {pillars.map((pillar) => {
              const data = body(pillar);
              return (
                <div key={pillar.num} data-anim="up" className="h-full">
                  <div className="mindmap__node mindmap__node--flat">
                    {/* Numer w jednej linii z tytułem — osobny wiersz na
                        dwuznakową liczbę kosztował sześć razy po ~20 px. */}
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="mindmap__num">{pillar.num}</span>
                      <h3 className="mindmap__title" style={{ margin: 0 }}>{data.title}</h3>
                    </div>
                    <p className="mindmap__desc" style={{ marginTop: "5px" }}>{data.desc}</p>
                  </div>
                </div>
              );
            })}
          </CardRail>
        </div>

      </div>

      {/* „Przewiń niżej” — patrz components/ScrollHint. */}
      <ScrollHint to="#about" />
    </section>
  );
}
