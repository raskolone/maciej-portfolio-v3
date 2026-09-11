/* =============================================================
   Kłębek → nitka → spirala. Narysowane kredą, jak na tablicy.

   Wcześniej był tu sznurek: każde pasmo szło trzema przebiegami po tej samej
   ścieżce — ciemny obrys, korpus, wąski połysk — i czytało się jak walec
   leżący na innych walcach. Wyglądało dobrze, ale mówiło coś innego, niż
   powinno: gładki, oświetlony rendering to nie jest bałagan, w którym ktoś
   siedzi. Bałagan rysuje się kredą, byle jak, ręką dziecka.

   Stąd trzy zmiany:

   1. Technika jest ta sama, co przy strzałkach obiegu — wosk, nie walec
      (patrz components/Crayon). Filtr rozchwiewa trasę i wygryza krycie.

   2. Filtry siedzą na dwóch grupach, nie na stu kreskach. Kłębek to
      kilkadziesiąt ścieżek; gdyby każda niosła własny filtr, przeglądarka
      liczyłaby szum tyle samo razy. Tu liczy go dwa razy na całą grafikę,
      a pojedyncze pasma i tak dają się animować, bo są osobnymi <path>.

   3. Kreski są dziecinne, nie techniczne. Pasma nie domykają się, przelatują
      poza swój okrąg i krzyżują same ze sobą; strzałka ma grot z dwóch
      osobnych pociągnięć, nie z domkniętego wielokąta; koło po prawej jest
      objechane kilka razy i za każdym razem trochę inaczej. Nic tu nie jest
      z cyrkla.

   ── Dlaczego koło, a nie spirala ──
   Wcześniej po prawej stronie była spirala. Spirala opowiada o zwijaniu —
   o procesie, który trwa i wciąż się zacieśnia. A zdanie tej sekcji jest
   inne: z wielu rzeczy zostaje JEDNA. To jest koło: zamknięty kształt,
   objechany czterema zamachami ręki, bez środka, do którego trzeba dojść.
   Kontrast z kłębkiem robi się wtedy czytelny na pierwszy rzut oka — po
   lewej dziesiątki kresek prowadzących donikąd, po prawej jedna, obrysowana
   kilka razy dla pewności.

   ── Kreda, nie neon ──
   Ślad jest w zieleni marki (paleta `chalk` w components/Crayon), ale ledwie
   się tli: pod kłębkiem i spiralą nie leży już świecąca aureola, a poświata
   samej kreski jest o połowę słabsza. Neon ciągnął uwagę na siebie — a to nie
   on jest tu treścią. Tablicą jest tło strony; rysunek leży wprost na nim,
   bez ramki i bez płyty pod spodem.

   ── Trzy takty, w tej kolejności ──
   1. Kłębek jest od pierwszej klatki — cały, gotowy, bez rysowania się na
      oczach. To nie jest wydarzenie, tylko stan wyjściowy: to, z czym ktoś
      przychodzi. Splątywanie go na żywo mówiło coś odwrotnego — że bałagan
      dopiero powstaje.
   2. Kadr się odsuwa. Kłębek zjeżdża do 88% swojej wielkości, jakby ktoś
      zrobił krok w tył i zobaczył, że obok jest miejsce na coś jeszcze.
      Ten ruch robi dwie rzeczy naraz: odbiera kłębkowi dominację i otwiera
      pas, w którym za chwilę pojawi się strzałka.
   3. Dopiero wtedy rysuje się strzałka, a po niej koło.

   ── Strzałka nie dotyka kłębka ──
   Trzon zaczyna się na x=300, czyli za prawą krawędzią kłębka (156 + 124),
   a po jego zmniejszeniu z zapasem. Kreska wchodząca w splątanie gubiła się
   w nim i strzałka przestawała być strzałką — czytała się jak kolejne pasmo.
   Ma biec obok, w wolnym pasie między jednym rysunkiem a drugim.
   ============================================================= */

import { CSSProperties, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { prefersReducedMotion } from "@/lib/scrollTo";
import { Point, handDrawnLoop, mulberry32, smooth } from "@/lib/cord";
import CrayonInk from "@/components/Crayon";

gsap.registerPlugin(ScrollTrigger);

const VIEW = { w: 660, h: 340 };
const TANGLE = { x: 156, y: 170, r: 124 };
/* Koło stoi na tyle daleko, żeby grot strzałki go nie dotykał. Przy x=500
   obrys wchodził w czubek i strzałka przestawała być osobnym gestem —
   czytała się jak styczna do koła. Teraz między jednym a drugim zostaje
   ~25 jednostek pustego pola, tyle samo, co między kłębkiem a trzonem. */
const LOOP = { x: 516, y: 170, r: 112 };

/** Do ilu kadr się odsuwa. Poniżej ~0,85 kłębek zaczyna wyglądać na mały. */
const PULLBACK = 0.88;

const rnd = mulberry32(7);

interface Stroke { d: string; w: number }

/* ── Jedno pasmo kłębka ──
   Nie jest to pętla wokół środka. Ręka wychodzi z przypadkowego miejsca,
   objeżdża kawałek koła, po drodze raz podchodzi blisko środka, raz wylatuje
   poza obrys — i kończy tam, gdzie akurat skończy. Promień skacze między
   ćwiartką a pełnym zasięgiem, bo dziecko nie prowadzi kredki po okręgu.
   Zamach bywa większy niż pełen obrót, więc pasmo przecina samo siebie. */
const strand = (scale: number, spread: number): string => {
  const steps = 5 + Math.floor(rnd() * 4);
  const start = rnd() * Math.PI * 2;
  const sweep = Math.PI * 2 * (0.9 + rnd() * 0.8);
  const squash = 0.5 + rnd() * 0.7;
  const rot = rnd() * Math.PI;
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  /* Zbicie z osi. Same koncentryczne pętle układają się w rozetę, a kłębek ma
     być kupką, w której nie widać żadnego środka. Mniejsze pasma rozjeżdżają
     się mocniej (większy `spread`): przy wspólnym rozrzucie wszystkie krótkie
     pętle siadały na środku i kłębek zbijał się tam w jednolitą plamę. */
  const driftX = (rnd() - 0.5) * TANGLE.r * spread;
  const driftY = (rnd() - 0.5) * TANGLE.r * spread;

  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = start + (i / steps) * sweep;
    const r = TANGLE.r * scale * (0.34 + rnd() * 0.74);
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r * squash;
    pts.push([
      TANGLE.x + driftX + x * cos - y * sin + (rnd() - 0.5) * 5,
      TANGLE.y + driftY + x * sin + y * cos + (rnd() - 0.5) * 5,
    ]);
  }
  return smooth(pts);
};

/* Trzy wielkości pasm — duże obejmują całość, mniejsze zagęszczają środek.
   Kolejność w tablicy jest kolejnością rysowania. Grubość skacze z pasma na
   pasmo, bo nacisk kredy nie jest stały. */
const tangle: Stroke[] = [
  ...Array.from({ length: 12 }, () => ({ d: strand(1, 0.5), w: 4.4 + rnd() * 1.5 })),
  ...Array.from({ length: 7 }, () => ({ d: strand(0.7, 0.9), w: 4.0 + rnd() * 1.4 })),
  ...Array.from({ length: 3 }, () => ({ d: strand(0.46, 1.1), w: 3.7 + rnd() * 1.2 })),
];

/* ── Nitka i grot ──
   Trzon lekko faluje, a grot to dwie osobne kreski schodzące się w czubku —
   tak rysuje się strzałkę ręką. Domknięty wielokąt od razu zdradza wektor.

   Cała strzałka mieści się w pasie między kłębkiem a spiralą (x od 300 do
   374). Groty są długie i rozwarte: przy krótszych ramionach łącznik czytał
   się jako przypadkowa kreska między dwoma rysunkami, a nie jako strzałka —
   a to on niesie tu całe zdanie: z tego robi się tamto. */
const TIP: Point = [374, 172];

const shaft = smooth([[300, 178], [322, 168], [344, 180], [364, 170], TIP]);
const barbUp = smooth([[350, 150], [365, 161], TIP]);
const barbDown = smooth([[348, 194], [363, 183], TIP]);

/* ── Koło ──
   Cztery zamachy po tym samym kształcie, każdy własnym promieniem, własnym
   przechyleniem i od innego miejsca na obwodzie. Jedno kółko wyszłoby zbyt
   czysto — a to ma być kształt postawiony ręką, nie wycięty z szablonu.
   Cztery to minimum, przy którym widać, że ktoś się poprawiał, i maksimum,
   po którym zaczyna z tego robić się drugi kłębek.

   Promienie chodzą raz w poziomie, raz w pionie (112×104, potem 104×112),
   więc obrysy przecinają się na skos, zamiast leżeć jeden w drugim jak
   słoje. Zamach ponad pełen obrót zostawia w każdym z nich zakładkę —
   miejsce, gdzie koniec przechodzi przez początek. */
const loopPasses = [
  { rx: 112, ry: 104, seed: 3, start: -2.2, tilt: -0.08, tremor: 2.4, w: 5.4 },
  { rx: 104, ry: 112, seed: 9, start: -1.1, tilt: 0.12, tremor: 2.6, w: 4.9 },
  { rx: 117, ry: 99, seed: 15, start: -3.5, tilt: -0.19, tremor: 2.2, w: 5.1 },
  { rx: 99, ry: 109, seed: 21, start: -0.3, tilt: 0.06, tremor: 2.8, w: 4.6 },
].map((p) => ({
  d: handDrawnLoop(LOOP.x, LOOP.y, p.rx, p.ry, mulberry32(p.seed), {
    start: p.start,
    sweep: Math.PI * 2 + 0.45 + (p.seed % 5) * 0.09,
    open: 0.05,
    wave: 0.05,
    tremor: p.tremor,
    tilt: p.tilt,
    steps: 96,
  }),
  w: p.w,
}));

/* Dwie grupy, bo tylko jedna z nich się animuje. Kłębek jest jednym obiektem,
   który się odsuwa; strzałka i spirala rysują się kreska po kresce. Numeracja
   `data-s` startuje w każdej grupie od zera — stąd zapytania poniżej są
   zawężone do grupy, a nie do całego SVG. */
const flow: Stroke[] = [
  { d: shaft, w: 5.4 },
  { d: barbUp, w: 5.0 },
  { d: barbDown, w: 5.0 },
  ...loopPasses,
];

/** Pierwszy indeks obrysu koła w tablicy `flow`. */
const LOOP_FROM = 3;

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default function ThreadGraphic({ className = "", style }: Props) {
  const scope = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const svg = scope.current;
    if (!svg) return;
    if (prefersReducedMotion()) return;

    /** Wszystkie trzy przebiegi jednej kreski — poświata, korpus, grzbiet. */
    const pass = (i: number) => svg.querySelectorAll(`[data-flow] [data-s="${i}"]`);

    flow.forEach((_, i) => {
      pass(i).forEach((path) => {
        const len = (path as SVGPathElement).getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    });

    /* 1. Kadr się odsuwa. `svgOrigin` liczy środek skalowania we
          współrzędnych viewBoksu — inaczej trzeba by go zgadywać z pudełka
          elementu, które zmienia się razem z oknem. */
    tl.fromTo("[data-tangle]",
      { scale: 1, svgOrigin: `${TANGLE.x} ${TANGLE.y}` },
      { scale: PULLBACK, duration: 1.0, ease: "power2.inOut", svgOrigin: `${TANGLE.x} ${TANGLE.y}` }, 0);

    /* 2. W zwolnionym pasie rysuje się nitka, a po niej grot. */
    tl.to(pass(0), { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, 0.7);
    tl.to(pass(1), { strokeDashoffset: 0, duration: 0.16, ease: "none" }, 1.14);
    tl.to(pass(2), { strokeDashoffset: 0, duration: 0.16, ease: "none" }, 1.26);

    /* 3. …i nitka układa się w jedno koło. Cztery zamachy po kolei, każdy
          krótszy od poprzedniego: pierwszy jest szukaniem kształtu, kolejne
          już tylko poprawką. Zachodzą na siebie w czasie, więc czyta się to
          jako jeden gest powtórzony, a nie cztery osobne okrążenia. */
    loopPasses.forEach((_, i) => {
      tl.to(pass(LOOP_FROM + i), {
        strokeDashoffset: 0,
        duration: 1.15 - i * 0.16,
        ease: i === 0 ? "power1.inOut" : "power2.out",
      }, 1.4 + i * 0.42);
    });
  }, { scope });

  return (
    <svg
      ref={scope}
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className={className}
      role="img"
      aria-label="Splątany kłębek narysowany kredą, obok strzałka i jedno równe koło"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      /* Zamach ręki wychodzi poza viewBox — pasma kłębka przelatują poza swój
         okrąg, a domyślnie `svg` przycięłoby je pionową kreską dokładnie na
         krawędzi elementu. Przesuwanie granic viewBoksu nie pomaga: rysunek
         zmalałby o tyle, o ile urósłby zapas. */
      style={{ overflow: "visible", ...style }}
    >
      <g data-tangle>
        <CrayonInk tone="chalk" strokes={tangle.map((s) => ({ d: s.d, width: s.w }))} />
      </g>
      <g data-flow>
        <CrayonInk tone="chalk" strokes={flow.map((s) => ({ d: s.d, width: s.w }))} />
      </g>
    </svg>
  );
}
