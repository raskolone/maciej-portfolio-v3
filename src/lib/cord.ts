/* =============================================================
   Geometria rysowana ręką — wspólna dla całej strony.

   Kłębek w „Metodzie Cribro", kółka filarów i ramka w „O mnie" są tym samym
   gestem, więc jedna definicja: jak wygładzić łamaną, jak ją rozchwiać i jak
   objechać coś kredką tak, żeby nie wyszedł kształt z szablonu. Technikę
   rysowania (wosk, ziarno, poświata) dokłada components/Crayon.
   ============================================================= */

export type Point = [number, number];

/** Deterministyczny szum — rysunek ma być zawsze ten sam, nie losowany co render. */
export const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Catmull-Rom → krzywe Béziera: łamana zamienia się w gładką nitkę.
    `closed` domyka pętlę, biorąc sąsiadów zza końca tablicy — inaczej na
    styku początku z końcem robi się kant zamiast łagodnego łuku. */
export const smooth = (pts: Point[], closed = false) => {
  if (pts.length < 2) return "";
  const at = (i: number) =>
    closed ? pts[(i + pts.length) % pts.length] : pts[Math.min(Math.max(i, 0), pts.length - 1)];
  const last = closed ? pts.length : pts.length - 1;
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < last; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return closed ? `${d} Z` : d;
};

/** Rozchwianie punktów — ta sama trasa, ale poprowadzona ręką, nie linijką. */
export const jitter = (pts: Point[], amp: number, rnd: () => number): Point[] =>
  pts.map(([x, y], i) =>
    // Końce zostają na miejscu: nitka ma trafiać dokładnie w piastę i w węzeł.
    i === 0 || i === pts.length - 1
      ? [x, y]
      : [x + (rnd() - 0.5) * amp, y + (rnd() - 0.5) * amp]
  );

/** Odręczne kółko — obwódka rysowana kredką, nie ramka z szablonu.

    Elipsa z cyrkla zdradza się natychmiast, więc nakładają się tu cztery
    rzeczy, które robi ręka i nie robi maszyna:

    1. Trasa nie zaczyna się tam, gdzie kończy. Zamach idzie ponad pełen
       obrót (`sweep` > 2π), więc koniec przecina początek i wybiega poza —
       tak wygląda każde kółko postawione jednym gestem.
    2. Promień faluje kilkoma składowymi o niskiej częstotliwości. Sama
       elipsa jest zbyt równa nawet po rozchwianiu punktów.
    3. Kółko rozkręca się: drugie okrążenie idzie odrobinę szerzej niż
       pierwsze, bo ręka nie trafia we własny ślad.
    4. Na to wszystko drobne drżenie punktów, już bez żadnego rytmu.

    Zwracana ścieżka jest otwarta — domknięcie zjadłoby cały efekt zamachu. */
export const handDrawnLoop = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rnd: () => number,
  {
    /** Kąt startu; domyślnie lewy górny róg, jak przy pisaniu od lewej. */
    start = -2.45,
    /** Zamach. Ponad 2π daje zakładkę końca na początku. */
    sweep = Math.PI * 2 + 0.5,
    /** Rozkręcanie: o ile promień rośnie przez cały zamach. */
    open = 0.06,
    /** Amplituda falowania promienia, ułamek promienia. */
    wave = 0.045,
    /** Drżenie ręki w jednostkach rysunku. */
    tremor = 1.7,
    /** Przechylenie owalu — nikt nie rysuje kółka idealnie poziomo. */
    tilt = -0.06,
    steps = 84,
  } = {}
) => {
  const waves = [
    { amp: wave, freq: 2, phase: rnd() * Math.PI * 2 },
    { amp: wave * 0.62, freq: 3, phase: rnd() * Math.PI * 2 },
    { amp: wave * 0.34, freq: 5, phase: rnd() * Math.PI * 2 },
  ];
  const cos = Math.cos(tilt);
  const sin = Math.sin(tilt);

  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = start + sweep * t;

    let k = 1 + open * t;
    for (const w of waves) k += Math.sin(a * w.freq + w.phase) * w.amp;

    const x = Math.cos(a) * rx * k + (rnd() - 0.5) * tremor;
    const y = Math.sin(a) * ry * k + (rnd() - 0.5) * tremor;
    pts.push([cx + x * cos - y * sin, cy + x * sin + y * cos]);
  }
  return smooth(pts);
};

/** Punkt na obwodzie zaokrąglonego prostokąta, t ∈ [0,1), zgodnie z ruchem
    wskazówek zegara od lewego górnego narożnika. Potrzebny, żeby ramkę dało
    się objechać jednym ciągłym gestem — z zakładką na starcie włącznie. */
const onRoundedRect = (
  x: number, y: number, w: number, h: number, r: number, t: number
): Point => {
  const sx = Math.max(0, w - 2 * r);
  const sy = Math.max(0, h - 2 * r);
  const arc = (Math.PI / 2) * r;
  let d = (((t % 1) + 1) % 1) * (2 * sx + 2 * sy + 4 * arc);

  const corner = (cx: number, cy: number, from: number, k: number): Point => {
    const a = from + (Math.PI / 2) * k;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };

  if (d < sx) return [x + r + d, y];
  d -= sx;
  if (d < arc) return corner(x + w - r, y + r, -Math.PI / 2, d / arc);
  d -= arc;
  if (d < sy) return [x + w, y + r + d];
  d -= sy;
  if (d < arc) return corner(x + w - r, y + h - r, 0, d / arc);
  d -= arc;
  if (d < sx) return [x + w - r - d, y + h];
  d -= sx;
  if (d < arc) return corner(x + r, y + h - r, Math.PI / 2, d / arc);
  d -= arc;
  if (d < sy) return [x, y + h - r - d];
  d -= sy;
  return corner(x + r, y + r, Math.PI, d / arc);
};

/** Odręczna ramka — prostokąt objechany kredką, nie border z arkusza.

    Ta sama zasada, co przy kółku (patrz handDrawnLoop): zamach idzie ponad
    pełen obwód, więc koniec przecina początek; boki się wybrzuszają, bo ręka
    prowadzona wzdłuż linijki i tak jej nie trzyma; a na to wszystko drobne
    drżenie punktów. Ścieżka wraca otwarta — domknięcie zjadłoby zakładkę. */
export const handDrawnBox = (
  x: number, y: number, w: number, h: number, r: number, rnd: () => number,
  {
    /** Miejsce startu na obwodzie — domyślnie górna krawędź, jak przy pisaniu. */
    start = 0.12,
    /** Zakładka: ile obwodu ręka przejeżdża ponad jeden pełen obrót. */
    overshoot = 0.06,
    /** Wybrzuszenie boków, w jednostkach rysunku. */
    bow = 2.2,
    /** Drżenie ręki. */
    tremor = 1.6,
    steps = 72,
  } = {}
) => {
  const phase = rnd() * Math.PI * 2;
  const pts: Point[] = [];

  for (let i = 0; i <= steps; i++) {
    const k = i / steps;
    const t = start + k * (1 + overshoot);
    const [px, py] = onRoundedRect(x, y, w, h, r, t);

    // Wybrzuszenie na zewnątrz środka ramki — proporcjonalne do odległości
    // od najbliższego narożnika, więc rogi zostają na miejscu, a boki puchną.
    const nx = px - (x + w / 2);
    const ny = py - (y + h / 2);
    const len = Math.hypot(nx, ny) || 1;
    const swell = Math.sin(t * Math.PI * 4 + phase) * bow;

    pts.push([
      px + (nx / len) * swell + (rnd() - 0.5) * tremor,
      py + (ny / len) * swell + (rnd() - 0.5) * tremor,
    ]);
  }
  return smooth(pts);
};
