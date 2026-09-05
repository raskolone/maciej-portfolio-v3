/* =============================================================
   Kredka — wspólna technika rysunku dla całej strony.

   Sznurek (components/Cord) był walcem: ciemny obrys, korpus, połysk.
   Kredka jest jego przeciwieństwem — miękkim woskiem, który zostawia ślad
   nierówny na całej długości. Stąd trzy rzeczy, których Cord nie robił:

   1. Trasa drży w drobnej skali. Geometria (lib/cord → handDrawnLoop,
      handDrawnBox) daje duży gest ręki; filtr dokłada to, czego nie da się
      opisać punktami — mikroskopijne szarpnięcia na przestrzeni kilku pikseli.

   2. Krycie jest dziurawe. Drugi szum wchodzi jako maska: wosk chwyta się
      ziarna papieru i omija zagłębienia, więc kreska raz jest pełna, raz
      przetarta. To jest ta różnica między kredką a mazakiem — i to ona
      decyduje, czy rysunek wygląda na postawiony ręką.

   3. Ślad świeci. Pod kreską leży rozmyta poświata w kolorze akcentu, a na
      niej przetarty jaśniejszy grzbiet — tam, gdzie kredka nacisnęła mocniej.
      Na czarnym tle wosk nie odbija światła, więc musi mieć własne.

   Filtry mają identyfikatory globalne w dokumencie, więc CrayonSprite
   renderuje się dokładnie raz na stronę (patrz pages/Home). Są nastrojone na
   układ, w którym jedna jednostka rysunku to mniej więcej jeden piksel —
   wszystkie miejsca użycia trzymają się tej skali z dokładnością do 20%.
   ============================================================= */

import gsap from "gsap";

export interface InkStroke {
  d: string;
  /** Grubość rdzenia śladu. */
  width?: number;
  /** Siła śladu — drugi przejazd kredki jest słabszy niż pierwszy. */
  opacity?: number;
}

/* Dwie palety, jedna technika.

   `crayon` — wosk w kolorze akcentu, jaśniejszy i bardziej mleczny niż czysty
   pigment, ze świecącą poświatą pod śladem. Na czarnym tle wosk nie odbija
   światła, więc musi mieć własne. Tym rysowane są strzałki obiegu i przycisk
   powrotu na górę.

   `chalk` — kreda na tablicy, w tym samym zielonym, co reszta marki. Różnica
   wobec `crayon` nie leży w barwie, tylko w tym, ile ślad świeci: pigment jest
   przygaszony i bardziej mleczny, poświata pod kreską schodzi z 0,13 do 0,07,
   a grzbiet przestaje błyszczeć. Zostaje ślad, który ledwie się tli — a nie
   neon rysujący po tle. Biała kreda byłaby tu obca: tablicą jest tło strony,
   a strona jest zielona.

   Grzbiet zostaje w obu wariantach: to miejsce, gdzie ręka nacisnęła mocniej,
   i jest tak samo prawdziwe dla kredy, co dla kredki. */
const TONES = {
  crayon: { bloom: "#72f0b4", body: "#8ff5c8", ridge: "#e8fff4", haze: 0.13, ink: 0.92, ridgeInk: 0.7 },
  chalk: { bloom: "#72f0b4", body: "#a9e5c8", ridge: "#e6fff2", haze: 0.07, ink: 0.86, ridgeInk: 0.5 },
} as const;

export type InkTone = keyof typeof TONES;

/**
 * Ślady kredki — wszystkie pod jednym kompletem filtrów.
 *
 * To jest jedyny sposób, w jaki wolno tu rysować kredką, i powód jest
 * wydajnościowy. Filtr z `feTurbulence` liczy się raz na element, który go
 * niesie. Wcześniej każdy ślad nosił własne trzy filtry, więc sama sekcja
 * filarów miała ich około sześćdziesięciu — przy każdej klatce animacji
 * przeglądarka liczyła szum sześćdziesiąt razy i przewijanie stawało się
 * ciężkie. Tutaj filtr niesie GRUPA: trzy przebiegi na cały komplet śladów,
 * niezależnie od tego, czy jest ich dwa, czy trzydzieści.
 *
 * Pojedynczy ślad nadal daje się animować, bo w każdej grupie jest osobnym
 * <path> oznaczonym `data-s` swoim numerem. Wszystkie trzy przebiegi jednego
 * śladu mają ten sam numer — po nim wyszukuje je drawCrayon.
 */
export default function CrayonInk({
  strokes,
  bloom = true,
  width = 5,
  tone = "crayon",
}: {
  strokes: InkStroke[];
  /** Poświata pod śladem. Przy cienkich kreskach niewiele wnosi, a rozmycie
      na dużym obszarze kosztuje — wtedy warto ją wyłączyć. */
  bloom?: boolean;
  /** Domyślna grubość, gdy ślad nie podaje własnej. */
  width?: number;
  /** Świecący wosk czy matowa kreda — patrz TONES. */
  tone?: InkTone;
}) {
  const ink = TONES[tone];

  const pass = (
    stroke: string, scale: number, opacity: number,
    filter: string, transform?: string, mark?: string
  ) => (
    <g stroke={stroke} opacity={opacity} filter={filter} transform={transform} {...(mark ? { [mark]: "" } : {})}>
      {strokes.map((s, i) => (
        <path
          key={i}
          data-s={i}
          d={s.d}
          strokeWidth={(s.width ?? width) * scale}
          opacity={s.opacity ?? 1}
        />
      ))}
    </g>
  );

  return (
    <>
      {/* `data-bloom`: uchwyt do rozjaśnienia całego śladu. */}
      {bloom && pass(ink.bloom, 3.6, ink.haze, "url(#crayon-bloom)", undefined, "data-bloom")}
      {/* Korpus niesie `data-guide`: to po nim jedzie czubek kredki.
          Poświata jest rozmyta, a grzbiet przesunięty — przy obu czubek
          biegłby obok własnego śladu. */}
      <g stroke={ink.body} opacity={ink.ink} filter="url(#crayon-wax)">
        {strokes.map((s, i) => (
          <path
            key={i}
            data-s={i}
            data-guide=""
            d={s.d}
            strokeWidth={s.width ?? width}
            opacity={s.opacity ?? 1}
          />
        ))}
      </g>
      {pass(ink.ridge, 0.36, ink.ridgeInk, "url(#crayon-grit)", "translate(-0.7,-1.1)")}
    </>
  );
}

/** Czubek kredki — rozbłysk i twardy punkt nacisku. Przesuwa go GSAP. */
export const CrayonTip = ({ scale = 1 }: { scale?: number }) => (
  <g data-tip opacity="0">
    <circle r={10 * scale} fill="var(--accent-base)" opacity="0.4" filter="url(#crayon-spark)" />
    <circle r={2.4 * scale} fill="#f2fffa" />
  </g>
);

/**
 * Dokłada do osi czasu narysowanie kredką wszystkich śladów w `host`.
 *
 * Ślady idą po kolei, nie równolegle: kółko rysuje się jednym zamachem, potem
 * ręka wraca po części łuku. Kolejność jest tu całą treścią gestu.
 *
 * Zwraca czas, w którym rysowanie się kończy.
 */
export const drawCrayon = (
  tl: gsap.core.Timeline,
  host: ParentNode,
  at: number,
  {
    duration = 0.72,
    gap = 0.06,
    /* Wyprofilowanie ruchu ręki. Nie tylko czas trwania różni jeden gest od
       drugiego — jedna ręka rusza ostro i zwalnia na końcu, inna rozpędza się
       dopiero w połowie. Przy sześciu kółkach rysowanych naraz to ta różnica
       decyduje, czy widać sześć rąk, czy jedną maszynę. */
    ease = "power1.inOut",
  }: { duration?: number; gap?: number; ease?: string } = {}
): number => {
  /* Trzy przebiegi jednego śladu leżą w trzech różnych grupach (patrz
     CrayonInk), więc zbiera się je po numerze, a nie po wspólnym rodzicu. */
  const byStroke = new Map<number, SVGPathElement[]>();
  host.querySelectorAll<SVGPathElement>("[data-s]").forEach((el) => {
    const i = Number(el.dataset.s);
    const bucket = byStroke.get(i);
    if (bucket) bucket.push(el);
    else byStroke.set(i, [el]);
  });
  if (byStroke.size === 0) return at;

  const tip = host.querySelector<SVGGElement>("[data-tip]");
  let cursor = at;

  [...byStroke.keys()].sort((a, b) => a - b).forEach((key, i) => {
    // Drugi zamach jest krótszy — to poprawka, nie pełne okrążenie.
    const dur = i === 0 ? duration : duration * 0.55;
    const paths = byStroke.get(key)!;
    const guide = paths.find((p) => p.hasAttribute("data-guide")) ?? paths[0];

    paths.forEach((path) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(path, { strokeDashoffset: 0, duration: dur, ease }, cursor);
    });

    if (tip) {
      const len = guide.getTotalLength();
      const head = { t: 0 };
      tl.to(head, {
        t: 1,
        duration: dur,
        ease,
        onUpdate: () => {
          const { x, y } = guide.getPointAtLength(head.t * len);
          gsap.set(tip, { x, y });
        },
      }, cursor);
    }

    cursor += dur + gap;
  });

  /* Zapalenie i zgaszenie czubka są przystankami osi czasu, nie skutkiem
     ubocznym callbacków: dzięki temu przewinięcie w tył cofa je tak samo jak
     resztę, bez tweenów żyjących poza timeline'em. */
  if (tip) {
    tl.set(tip, { opacity: 1 }, at);
    tl.to(tip, { opacity: 0, duration: 0.28 }, cursor - gap - 0.05);
  }

  return cursor - gap;
};

/** Filtry kredki. W dokumencie ma istnieć dokładnie jeden taki węzeł. */
export const CrayonSprite = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    /* Nie `display:none` — w części przeglądarek filtr z ukrytego drzewa
       przestaje być widoczny dla odwołań przez url(#…). Zerowy prostokąt
       poza układem robi to samo, a odwołania działają. */
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
  >
    <defs>
      {/* Rozmycie poświaty. */}
      <filter id="crayon-bloom" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6.5" />
      </filter>

      {/* Korpus: najpierw rozchwianie trasy, potem wygryzienie krycia.
          `feComposite in` mnoży krycie kreski przez krycie szumu — tam, gdzie
          szum jest ciemny, wosk nie chwycił papieru. */}
      <filter id="crayon-wax" x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="2" seed="21" result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale="7.5" xChannelSelector="R" yChannelSelector="G" result="wobbly" />
        <feTurbulence type="fractalNoise" baseFrequency="0.42" numOctaves="3" seed="8" result="grain" />
        <feColorMatrix
          in="grain"
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  1.7 0 0 0 0.12"
          result="bite"
        />
        <feComposite in="wobbly" in2="bite" operator="in" />
      </filter>

      {/* Grzbiet: to samo, tylko wygryzione znacznie mocniej — ma być
          przetarty na połowie długości, nie ciągły. */}
      <filter id="crayon-grit" x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="2" seed="5" result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="wobbly" />
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="13" result="grain" />
        <feColorMatrix
          in="grain"
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  2.6 0 0 0 -0.62"
          result="bite"
        />
        <feComposite in="wobbly" in2="bite" operator="in" />
      </filter>

      {/* Rozbłysk czubka kredki. */}
      <filter id="crayon-spark" x="-300%" y="-300%" width="700%" height="700%">
        <feGaussianBlur stdDeviation="4.5" />
      </filter>
    </defs>
  </svg>
);
