/* =============================================================
   Wieża Jenga, która sama się układa.

   Na starcie stoi tylko podstawa, a wszystkie pozostałe klocki leżą
   rozrzucone wokół niej — obrócone byle jak, płasko na ziemi. Potem, jeden
   po drugim, podnoszą się, obracają do pionu i wchodzą na swoje miejsce.

   Dwie rzeczy, które robią tu robotę:

   1. Kadr jedzie razem z animacją. Stos jest dużo szerszy od wieży, więc
      jeden kadr mieszczący oba zostawiał wieżę jako znaczek na środku pustej
      ramki. Zamiast tego kamera zaczyna szeroko (widać cały rozrzut) i
      dojeżdża do wieży, która na końcu wypełnia kadr na całą wysokość.
      Proporcje ramki są stałe, więc układ strony ani drgnie.

   2. Klocki są bryłami, nie ikonami. Mają własny obrót wokół pionu, więc
      w każdej klatce liczy się od nowa, KTÓRE dwie ściany boczne są zwrócone
      do patrzącego i jak mocno oświetlone. Światło jest w palecie strony:
      ciepłe na wierzchu, chłodny granat w cieniu, miętowy refleks na tylnych
      krawędziach — to samo światło, które pada na resztę sekcji.
   ============================================================= */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { prefersReducedMotion } from "@/lib/scrollTo";

gsap.registerPlugin(ScrollTrigger);

/* ── Rzut izometryczny ──
   Jednostka to szerokość jednego klocka. Klocek Jenga ma proporcje 3:1,
   a warstwa to trzy klocki obok siebie — stąd kwadratowa podstawa 3×3. */
const S = 44;              // jednostki rysunku na szerokość klocka
const A = S * 0.866;       // przesunięcie poziome na jednostkę x/y
const B = S * 0.5;         // przesunięcie pionowe na jednostkę x/y
const C = S * 0.95;        // przesunięcie pionowe na jednostkę wysokości
const CX = 315;
const CY = 412;

const LAYERS = 12;
/** Ile warstw stoi już na starcie — to jest „tylko podstawa”. */
const BASE_LAYERS = 2;
const H = 0.6;                                  // wysokość gniazda warstwy

/* ── Szczeliny ──
   Klocek jest odrobinę mniejszy od swojego gniazda, więc między sąsiadami
   zostaje realna szpara. Wcześniej klocki stykały się co do jednostki i cała
   wieża czytała się jak jedna gładka bryła w kratkę — seria kresek na płycie,
   nie stos oddzielnych kawałków drewna. Pionowa szczelina jest szersza od
   poziomej, bo ta druga i tak dostaje wsparcie od fazki i cienia kontaktowego. */
const GAP = 0.06;    // wzdłuż warstwy
const GAP_Z = 0.08;  // między warstwami

const HALF = { x: 1.5 - GAP, y: 0.5 - GAP, z: (H - GAP_Z) / 2 };

/* ── Kadry ──
   Oba mają te same proporcje, więc przejazd nie zmienia wysokości elementu.
   FINAL jest ciasny na wieży: 12 warstw wypełnia go niemal na całą wysokość. */
const FINAL = { x: 137, y: 99.5, w: 356, h: 456 };
const START = { x: -15, y: -37, w: 660, h: 845.4 };
const box = (f: typeof FINAL) => `${f.x} ${f.y} ${f.w} ${f.h}`;

const project = (x: number, y: number, z: number): [number, number] => [
  CX + (x - y) * A,
  CY + (x + y) * B - z * C,
];

/** Ekran → świat na poziomie ziemi. Rozrzut wygodniej opisać w pikselach. */
const unproject = (sx: number, sy: number) => {
  const u = (sx - CX) / A;
  const v = (sy - CY) / B;
  return { x: (v + u) / 2, y: (v - u) / 2 };
};

/** Położenie klocka: środek bryły i obrót wokół osi pionowej. */
interface Pose { x: number; y: number; z: number; rot: number }

const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* ── Oświetlenie w palecie strony ──
   Rampa, nie odcinek. Mieszanie po prostej między granatem cienia a ciepłym
   światłem prowadzi przez szarość: w połowie zakresu — czyli tam, gdzie leży
   większość ścianek — drewno traciło nasycenie i cała wieża wychodziła
   wyblakła, jak wycinanka doklejona do granatowej strony. Rampa ma po drodze
   przystanek na nasyconym brązie, więc półcień jest drewnem, a nie mgłą.

   Skrajne dolne wartości (poniżej 0,15) to nie drewno, tylko wnętrze stosu —
   stąd chłodny granat na samym dole zakresu. */
const RAMP: [number, [number, number, number]][] = [
  [0.00, [10, 16, 27]],     // szczelina w głębi wieży
  [0.18, [34, 32, 40]],     // ścianka odwrócona od światła
  [0.40, [108, 62, 32]],    // brąz w cieniu
  [0.62, [172, 110, 56]],   // drewno w półcieniu
  [0.82, [224, 165, 101]],  // oświetlona ścianka
  [1.00, [255, 224, 179]],  // fazka pod światło
];

const RIM = "rgba(114, 240, 180, 0.22)";
/** Cień kontaktowy w szczelinie — pod klockiem, który leży wyżej.
    Wąski i miękki: przy szerokim pasie każdy klocek dostawał ciemną połowę
    i wieża czytała się jak stos dwukolorowych płytek. */
const CREVICE = "rgba(3, 7, 15, 0.4)";

const tone = (t: number) => {
  const k = Math.min(1, Math.max(0, t));
  let i = 1;
  while (i < RAMP.length - 1 && k > RAMP[i][0]) i++;
  const [t0, c0] = RAMP[i - 1];
  const [t1, c1] = RAMP[i];
  const f = (k - t0) / (t1 - t0);
  return `rgb(${c0.map((v, j) => Math.round(v + (c1[j] - v) * f)).join(",")})`;
};

/* ── Ścianki bryły ──
   Wierzchołki opisane jako ułamki półwymiarów; obrót i przesunięcie
   dokładane są dopiero przy rzutowaniu. */
type LocalFace = [number, number, number][];

const FACE_TOP: LocalFace = [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
const FACE_PX: LocalFace = [[1, -1, 1], [1, 1, 1], [1, 1, -1], [1, -1, -1]];
const FACE_NX: LocalFace = [[-1, 1, 1], [-1, -1, 1], [-1, -1, -1], [-1, 1, -1]];
const FACE_PY: LocalFace = [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1]];
const FACE_NY: LocalFace = [[1, -1, 1], [-1, -1, 1], [-1, -1, -1], [1, -1, -1]];
const FACE_BOTTOM: LocalFace = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]];

/* Trzy słoje wzdłuż deski. Drobiazg, ale bez nich wierzch klocka jest
   jednolitą plamą i cała bryła wygląda na wyciętą z kartonu. */
const GRAIN: LocalFace[] = [
  [[-0.82, -0.44, 1], [0.84, -0.38, 1]],
  [[-0.78, 0.06, 1], [0.8, 0.1, 1]],
  [[-0.8, 0.5, 1], [0.82, 0.46, 1]],
];

const points = (face: LocalFace, p: Pose, shrink = 0) => {
  const cos = Math.cos(p.rot);
  const sin = Math.sin(p.rot);
  const hx = HALF.x - shrink;
  const hy = HALF.y - shrink / 3;
  return face
    .map(([sx, sy, sz]) => {
      const lx = sx * hx;
      const ly = sy * hy;
      const [px, py] = project(
        p.x + lx * cos - ly * sin,
        p.y + lx * sin + ly * cos,
        p.z + sz * HALF.z
      );
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");
};

/** Ściany zwrócone do patrzącego: ich wielokąty, normalne i znaki narożnika. */
const visibleSides = (rot: number) => {
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  // lokalne +x po obrocie → (cos, sin); lokalne +y → (-sin, cos)
  const sx = cos + sin > 0 ? 1 : -1;
  const sy = cos - sin > 0 ? 1 : -1;
  return {
    sx, sy,
    faces: [
      { face: sx > 0 ? FACE_PX : FACE_NX, nx: sx * cos, ny: sx * sin },
      { face: sy > 0 ? FACE_PY : FACE_NY, nx: -sy * sin, ny: sy * cos },
    ],
  };
};

/* Jasność ścianki bocznej z jej normalnej: im bardziej ku +x, tym więcej
   światła. Zakres jest szerszy niż wcześniej (0,34–0,78), bo przy wąskim obie
   widoczne ścianki miały niemal ten sam odcień i pionowa krawędź między nimi
   znikała — a to ona mówi oku, że klocek jest bryłą. */
const sideLevel = (nx: number, ny: number) => 0.37 + 0.44 * ((nx - ny + 1) / 2);

/* Wycinek ścianki wzdłuż jej krawędzi — te same rogi, tylko ścięte na
   zadanej wysokości. Wszystkie cztery ścianki mają rogi w kolejności
   góra-góra-dół-dół, więc wystarczy podmienić znak wysokości.

   Pas nie może być poziomym prostokątem: krawędzie ścianek biegną skośnie
   i w rzucie izometrycznym schodzą o tyle, ile wynosi cała wysokość klocka.
   Cień musi więc iść po skosie razem z nimi. */
const band = (face: LocalFace, top: number, bottom: number): LocalFace =>
  face.map(([x, y, z]) => [x, y, z > 0 ? top : bottom]);

/** Miętowy refleks na dwóch tylnych krawędziach wierzchu — światło sekcji. */
const rimFace = (sx: number, sy: number): LocalFace =>
  [[-sx, sy, 1], [-sx, -sy, 1], [sx, -sy, 1]];

/* ── Wnętrze pustego gniazda ──
   Wyrwa nie jest czarną bryłą doklejoną do wieży, tylko wnęką — a wnęka ma
   ściany. Są to dokładnie te ścianki, które w pełnym klocku są odwrócone od
   patrzącego: w pustym gnieździe to one zostają zwrócone do środka i to je
   widać. Do tego dno, czyli wierzch klocka z warstwy niżej, na który spada
   resztka światła z góry.

   Wcześniej rysowaliśmy tu dwie ścianki w kolorze bliskim czerni i wyrwa
   czytała się jak naklejka: płaski czarny pas w poprzek wieży, bez głębi. */
const recessFaces = (rot: number) => {
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  const sx = cos + sin > 0 ? 1 : -1;
  const sy = cos - sin > 0 ? 1 : -1;
  return [
    { face: sx > 0 ? FACE_NX : FACE_PX, level: 0.1 },   // ściana w głębi
    { face: sy > 0 ? FACE_NY : FACE_PY, level: 0.15 },  // ściana boczna
    { face: FACE_BOTTOM, level: 0.29 },                 // dno wnęki
  ];
};

/** Rozjaśniona krawędź pionowa, na której schodzą się obie widoczne ściany. */
const cornerFace = (sx: number, sy: number): LocalFace =>
  [[sx, sy, 1], [sx, sy, -1]];

/* ── Ciemny rdzeń ──
   Szczeliny muszą coś pokazywać. Bez rdzenia świeci przez nie tło strony i
   wieża robi się ażurowa — jakby prześwitywała na wylot. Rdzeń to pełna bryła
   bez szczelin, malowana pod klockami: w szparach widać wtedy cień w głębi
   stosu, czyli dokładnie to, co widać w prawdziwej Jendze.

   Rośnie razem z wieżą, żeby nad ostatnią ułożoną warstwą nic nie wystawało. */
const corner = (x: number, y: number, z: number) => {
  const [px, py] = project(x, y, z);
  return `${px.toFixed(1)},${py.toFixed(1)}`;
};

const coreFaces = (topZ: number) => {
  // Lico rdzenia chowa się tuż za licem klocków: gdyby wystawało, obrysowałoby
  // całą wieżę ciemną obwódką, której nikt tam nie zamawiał.
  const a = GAP / 2;
  const b = 3 - GAP / 2;
  return {
    // Ścianka y=b (w lewo od patrzącego) i x=b (w prawo) — te są zwrócone do nas.
    left: [corner(a, b, topZ), corner(b, b, topZ), corner(b, b, 0), corner(a, b, 0)].join(" "),
    right: [corner(b, a, topZ), corner(b, b, topZ), corner(b, b, 0), corner(b, a, 0)].join(" "),
    top: [corner(a, a, topZ), corner(b, a, topZ), corner(b, b, topZ), corner(a, b, topZ)].join(" "),
  };
};

/* Trzy puste miejsca w wieży — bez nich rysunek czyta się jak mur z cegieł,
   a nie jak Jenga. */
const GAPS = new Set(["3:2", "6:2", "9:2"]);

interface Block {
  /** Numer w kolejce wzywania; wiąże element w DOM z opisem lotu. */
  idx: number;
  to: Pose;
  from: Pose;
  layer: number;
  /** Wyrwa: nie leci, tylko wchodzi w cień razem ze swoją warstwą. */
  hole: boolean;
  /** Przyciemnienie w głębi wieży + drobna różnica odcienia deski. */
  ao: number;
  tint: number;
}

const rnd = mulberry32(11);

/** Docelowa pozycja klocka j w warstwie: co druga warstwa obrócona o 90°. */
const slot = (layer: number, j: number): Pose => {
  const z = layer * H + H / 2;
  return layer % 2 === 0
    ? { x: 1.5, y: j + 0.5, z, rot: 0 }
    : { x: j + 0.5, y: 1.5, z, rot: Math.PI / 2 };
};

/* Rozrzut: klocki leżą płasko wokół podstawy, obrócone byle jak.

   Pierścień jest pusty w środku — inaczej stos zasłania podstawę, a to ona
   ma być widoczna na starcie jako jedyny ślad wieży. Kąty są rozłożone równo
   i dopiero mocno rozchwiane: same losowe zbijają się w kupki i zostawiają
   puste łuki. Co czwarty klocek leży na innym, żeby to był stos, nie wianek. */
const SCATTER = { cx: CX, cy: 500, inner: 195, outer: 250, squash: 0.40 };

const scatter = (i: number, total: number, placed: Pose[]): Pose => {
  // Klocek na klocku — ale nigdy nad podstawą, bo to ona ma być widoczna.
  const outer = placed.filter((p) => Math.hypot(p.x - 1.5, p.y - 1.5) > 4.2);
  if (outer.length > 2 && rnd() < 0.28) {
    const under = outer[Math.floor(rnd() * outer.length)];
    return {
      x: under.x + (rnd() - 0.5) * 0.9,
      y: under.y + (rnd() - 0.5) * 0.9,
      z: under.z + H,
      rot: rnd() * Math.PI,
    };
  }
  const angle = (i / total) * Math.PI * 2 + (rnd() - 0.5) * 0.9;
  const r = SCATTER.inner + Math.pow(rnd(), 0.6) * (SCATTER.outer - SCATTER.inner);
  const { x, y } = unproject(
    SCATTER.cx + Math.cos(angle) * r,
    SCATTER.cy + Math.sin(angle) * r * SCATTER.squash
  );
  return { x, y, z: H / 2, rot: rnd() * Math.PI };
};

const base: Block[] = [];
const queue: Block[] = [];

for (let layer = 0; layer < LAYERS; layer++) {
  for (let j = 0; j < 3; j++) {
    const to = slot(layer, j);
    const hole = GAPS.has(`${layer}:${j}`);
    /* Dół wieży dostaje mniej światła niż góra. Wcześniej różnica wynosiła
       10% i cała bryła była równomiernie jasna — czyli płaska. */
    const ao = 0.82 + 0.18 * (layer / LAYERS);
    const tint = (rnd() - 0.5) * 0.08;   // naturalna różnica desek
    if (layer < BASE_LAYERS) base.push({ idx: -1, to, from: to, layer, hole, ao, tint });
    else queue.push({ idx: -1, to, from: to, layer, hole, ao, tint });
  }
}

/* Kolejność wzywania: od dołu, a w warstwie od tyłu — czyli dokładnie ta
   sama, w której maluje się gotowa wieża. Dzięki temu klocek dostawiony
   później zawsze ląduje w DOM po tym, który już stoi, i przesłania go
   poprawnie bez sortowania w każdej klatce. */
queue.sort((a, b) => a.to.z - b.to.z || a.to.x + a.to.y - (b.to.x + b.to.y));

const flying = queue.filter((b) => !b.hole);
const placed: Pose[] = [];
flying.forEach((b, i) => {
  b.idx = i;
  b.from = scatter(i, flying.length, placed);
  placed.push(b.from);
});

/* Klocki leżące za wieżą maluje się przed nią, resztę po niej — a w obu
   grupach od najdalszego, bo na stosie jeden leży na drugim. */
const depth = (a: Block, b: Block) =>
  a.from.z - b.from.z || a.from.x + a.from.y - (b.from.x + b.from.y);
const behind = flying.filter((b) => b.from.x + b.from.y < 3).sort(depth);
const front = flying.filter((b) => b.from.x + b.from.y >= 3).sort(depth);

const HOP = 1.3;      // o ile klocek podnosi się po drodze
const FLIGHT = 0.62;  // czas jednego lotu
const STEP = 0.13;    // odstęp między wezwaniami
const RUN = queue.length * STEP + FLIGHT;

/** Obrót po najkrótszej drodze — klocek jest symetryczny co 180°. */
const shortestTurn = (from: number, to: number) => {
  let d = (to - from) % Math.PI;
  if (d > Math.PI / 2) d -= Math.PI;
  if (d < -Math.PI / 2) d += Math.PI;
  return d;
};

export default function JengaTower({ className = "" }: { className?: string }) {
  const scope = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const svg = scope.current;
    if (!svg) return;
    const tower = svg.querySelector("[data-tower]");
    if (!tower) return;

    const groups: SVGGElement[] = [];
    gsap.utils.toArray<SVGGElement>("[data-fly]", svg)
      .forEach((g) => { groups[Number(g.dataset.fly)] = g; });
    const holes = gsap.utils.toArray<SVGGElement>("[data-hole]", svg);

    /** Przerysowuje klocek w zadanym położeniu. Indeksy — patrz renderBlock. */
    const draw = (g: SVGGElement, block: Block, pose: Pose) => {
      const { sx, sy, faces } = visibleSides(pose.rot);
      const poly = g.querySelectorAll("polygon");
      const line = g.querySelectorAll("polyline");

      faces.forEach((f, i) => {
        poly[i].setAttribute("points", points(f.face, pose));
        poly[i].setAttribute("fill", tone(sideLevel(f.nx, f.ny) * block.ao + block.tint));
        poly[i + 2].setAttribute("points", points(band(f.face, -0.62, -1), pose));
      });
      poly[4].setAttribute("points", points(FACE_TOP, pose));
      poly[4].setAttribute("fill", tone(0.70 * block.ao + block.tint));
      poly[5].setAttribute("points", points(FACE_TOP, pose, 0.13));
      poly[5].setAttribute("fill", tone(0.87 * block.ao + block.tint));

      GRAIN.forEach((face, i) => line[i].setAttribute("points", points(face, pose)));
      line[3].setAttribute("points", points(rimFace(sx, sy), pose));
      line[4].setAttribute("points", points(cornerFace(sx, sy), pose));
    };

    /* Rdzeń dorasta do ostatniej ułożonej warstwy. Wywoływany z lotów
       klocków, więc na przewijaniu w tył kurczy się tą samą drogą. */
    const corePolys = svg.querySelectorAll("[data-core] polygon");
    const setCore = (layers: number) => {
      const f = coreFaces(Math.max(BASE_LAYERS, layers) * H);
      corePolys[0].setAttribute("points", f.left);
      corePolys[1].setAttribute("points", f.right);
      corePolys[2].setAttribute("points", f.top);
    };

    /* Kolejność malowania jest tu kolejnością wzywania — także bez animacji.
       Dosypanie wyrw na koniec wystawiało je przed klocki, które w rzucie
       stoją bliżej patrzącego, i ciemne prostokąty przecinały wieżę w poprzek. */
    const settle = () => {
      let h = 0;
      queue.forEach((b) => {
        if (b.hole) {
          const el = holes[h++];
          el.style.opacity = "1";
          tower.appendChild(el);
          return;
        }
        draw(groups[b.idx], b, b.to);
        tower.appendChild(groups[b.idx]);
      });
      setCore(LAYERS);
      svg.setAttribute("viewBox", box(FINAL));
    };

    if (prefersReducedMotion()) { settle(); return; }

    gsap.set(holes, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    /* Kamera dojeżdża do wieży przez cały czas trwania układania. Bez tego
       gotowa wieża zostaje małą bryłką pośrodku ramki wyliczonej na stos. */
    const camera = { t: 0 };
    tl.to(camera, {
      t: 1,
      duration: RUN,
      ease: "power1.inOut",
      onUpdate: () => {
        const k = camera.t;
        svg.setAttribute("viewBox", box({
          x: START.x + (FINAL.x - START.x) * k,
          y: START.y + (FINAL.y - START.y) * k,
          w: START.w + (FINAL.w - START.w) * k,
          h: START.h + (FINAL.h - START.h) * k,
        }));
      },
    }, 0);

    /* Wyrwy i klocki dzielą jedną kolejkę, żeby ciemna dziura pojawiła się
       dokładnie wtedy, kiedy dochodzi jej warstwa. */
    let holeIndex = 0;

    queue.forEach((block, order) => {
      const at = order * STEP;

      if (block.hole) {
        const el = holes[holeIndex++];
        tl.to(el, {
          opacity: 1, duration: 0.3, ease: "none",
          onStart: () => { setCore(block.layer + 1); tower.appendChild(el); },
          onReverseComplete: () => { el.style.opacity = "0"; setCore(block.layer); },
        }, at);
        return;
      }

      const b = block;
      const g = groups[b.idx];
      const turn = shortestTurn(b.from.rot, b.to.rot);
      const proxy = { t: 0 };

      tl.to(proxy, {
        t: 1,
        duration: FLIGHT,
        ease: "power2.inOut",
        // Klocek wzbija się nad wieżę, obraca do pionu i opada w szczelinę.
        onStart: () => { setCore(b.layer + 1); tower.appendChild(g); },
        onUpdate: () => {
          const t = proxy.t;
          draw(g, b, {
            x: b.from.x + (b.to.x - b.from.x) * t,
            y: b.from.y + (b.to.y - b.from.y) * t,
            z: b.from.z + (b.to.z - b.from.z) * t + HOP * Math.sin(Math.PI * t),
            rot: b.from.rot + turn * t,
          });
        },
        onReverseComplete: () => { draw(g, b, b.from); setCore(b.layer); },
      }, at);
    });
  }, { scope });

  /* Kolejność elementów w grupie jest kontraktem z draw(): ta funkcja
     odczytuje je po indeksie, więc zmiana układu tutaj musi iść w parze
     z tamtą. Wielokąty: dwie ścianki, dwa cienie kontaktowe, wierzch, fazka. */
  const renderBlock = (b: Block, pose: Pose, key: string, attrs: Record<string, string | number> = {}) => {
    const { sx, sy, faces } = visibleSides(pose.rot);
    return (
      <g key={key} {...attrs}>
        {faces.map((f, i) => (
          <polygon key={i} points={points(f.face, pose)}
                   fill={tone(sideLevel(f.nx, f.ny) * b.ao + b.tint)}
                   stroke="rgba(3,7,15,0.62)" strokeWidth="0.7" />
        ))}
        {/* Cień kontaktowy: dolny skraj ścianki wchodzi w szczelinę pod
            klockiem. To on robi „wcięcie” — sama szpara jest za wąska. */}
        {faces.map((f, i) => (
          <polygon key={`c${i}`} points={points(band(f.face, -0.62, -1), pose)} fill={CREVICE} />
        ))}
        <polygon points={points(FACE_TOP, pose)} fill={tone(0.70 * b.ao + b.tint)}
                 stroke="rgba(3,7,15,0.62)" strokeWidth="0.7" />
        {/* Wąska fazka na górnej krawędzi — bez niej klocek jest płaską płytką. */}
        <polygon points={points(FACE_TOP, pose, 0.13)} fill={tone(0.87 * b.ao + b.tint)} />
        {GRAIN.map((g, i) => (
          <polyline key={`g${i}`} points={points(g, pose)} fill="none"
                    stroke="rgba(52,28,10,0.34)" strokeWidth="0.9" />
        ))}
        {/* Miętowy refleks z tyłu i rozjaśniony narożnik z przodu. */}
        <polyline points={points(rimFace(sx, sy), pose)} fill="none"
                  stroke={RIM} strokeWidth="1.1" strokeLinejoin="round" />
        <polyline points={points(cornerFace(sx, sy), pose)} fill="none"
                  stroke="rgba(255,226,186,0.38)" strokeWidth="1.2" />
      </g>
    );
  };

  /* Wyrwa to otwór w ścianie wieży, a nie ciemna bryła.
     Rysujemy wyłącznie te dwie ścianki boczne, które w pełnym klocku byłyby
     zwrócone do patrzącego — czyli dokładnie prostokąty, przez które widać
     wnętrze. Wersja z wierzchem czytała się jak czarny klocek WYSTAJĄCY z
     wieży: to górna ścianka podpowiadała oku bryłę zamiast dziury. */
  /* Wnęka startuje niewidoczna: w kadrze startowym wieży jeszcze nie ma, więc
     bez tego trzy ciemne bryły wisiałyby w powietrzu do czasu, aż JavaScript
     zdąży je schować. Styl inline dopisywany później i tak wygra z atrybutem. */
  const renderHole = (b: Block, key: string) => (
    <g key={key} data-hole opacity={0}>
      {recessFaces(b.to.rot).map((f, i) => (
        <polygon key={i} points={points(f.face, b.to)} fill={tone(f.level * b.ao)} />
      ))}
      {/* Cień pod górną krawędzią wnęki — klocek z warstwy wyżej zasłania
          światło i to on rysuje najciemniejsze miejsce w całej wieży. */}
      {recessFaces(b.to.rot).slice(0, 2).map((f, i) => (
        <polygon key={`s${i}`} points={points(band(f.face, 1, 0.3), b.to)}
                 fill="rgba(2,5,12,0.55)" />
      ))}
    </g>
  );

  return (
    <svg
      ref={scope}
      viewBox={box(START)}
      preserveAspectRatio="xMidYMid meet"
      // Proporcje bierzemy z kadru docelowego, nie z viewBoksu: kadr jedzie
      // w trakcie animacji i bez tego element zmieniałby wysokość.
      style={{ aspectRatio: `${FINAL.w} / ${FINAL.h}` }}
      className={className}
      role="img"
      aria-label="Rozrzucone klocki Jenga wracające na swoje miejsca w wieży"
    >
      <defs>
        <radialGradient id="jenga-ground">
          <stop offset="0%" stopColor="rgba(114,240,180,0.30)" />
          <stop offset="60%" stopColor="rgba(114,240,180,0.08)" />
          <stop offset="100%" stopColor="rgba(114,240,180,0)" />
        </radialGradient>
        <radialGradient id="jenga-shadow">
          <stop offset="0%" stopColor="rgba(1,3,9,0.92)" />
          <stop offset="55%" stopColor="rgba(1,3,9,0.55)" />
          <stop offset="100%" stopColor="rgba(1,3,9,0)" />
        </radialGradient>
      </defs>

      {/* Cień pod podstawą osadza wieżę na ziemi, poświata wiąże ją z sekcją. */}
      <ellipse cx={CX} cy={CY + 3 * B} rx={3 * A + 62} ry={84} fill="url(#jenga-ground)" />
      {/* Dwa cienie: rozlany i wąski tuż pod podstawą. Sam rozlany nie osadza
          wieży na ziemi — dopiero ciemny styk mówi, gdzie ona stoi. */}
      <ellipse cx={CX} cy={CY + 3 * B + 6} rx={3 * A} ry={46} fill="url(#jenga-shadow)" />
      <ellipse cx={CX} cy={CY + 3 * B + 1} rx={3 * A * 0.62} ry={22} fill="url(#jenga-shadow)" />

      {behind.map((b) => renderBlock(b, b.from, `fly-${b.idx}`, { "data-fly": b.idx }))}

      <g data-tower>
        {/* Rdzeń musi zostać pierwszym dzieckiem grupy — klocki dostawiają się
            na jej koniec, więc sam zostaje na spodzie. */}
        {(() => {
          const f = coreFaces(BASE_LAYERS * H);
          return (
            <g data-core>
              <polygon points={f.left} fill={tone(0.04)} />
              <polygon points={f.right} fill={tone(0.09)} />
              <polygon points={f.top} fill={tone(0.02)} />
            </g>
          );
        })()}
        {base.map((b, i) => renderBlock(b, b.to, `base-${i}`))}
        {queue.filter((b) => b.hole).map((b, i) => renderHole(b, `hole-${i}`))}
      </g>

      {front.map((b) => renderBlock(b, b.from, `fly-${b.idx}`, { "data-fly": b.idx }))}
    </svg>
  );
}
