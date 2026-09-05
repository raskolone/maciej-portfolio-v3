/* =============================================================
   Podpis — prawdziwy, odręczny, pisany na oczach czytelnika.

   ── Dlaczego nie stroke-dashoffset ──
   Cała reszta rysunków na tej stronie odsłania się przez skracanie kreski
   przerywanej. Tamto działa, bo ścieżki są liniami: mają początek, koniec
   i długość. Podpis przychodzi jako obrazek rastrowy — plama pikseli, która
   długości nie ma. Obrysowanie go zamieniłoby litery w kontury i zamiast
   pisma dostalibyśmy obwódkę pisma.

   ── Co robimy zamiast ──
   Kształt bierzemy z pliku, a ruch dokładamy maską:

   1. `sig-ink` — podpis jako maska. Plik jest czarnym tuszem na białym tle,
      więc trzeba go odwrócić: po inwersji tusz jest biały (widoczny),
      a tło czarne (ukryte). Odwracamy w sRGB, bo w linearRGB inwersja
      wychodzi wyprana.
   2. `sig-reveal` — druga maska, a w niej jedna gruba kreska prowadzona po
      linii pisma. To ona się skraca. Ile z niej jest narysowane, tyle
      podpisu widać.
   3. Kolor daje zwykły prostokąt pod obiema maskami — dzięki temu podpis
      jest w akcencie strony, a nie czarny.

   Efekt: pióro przesuwa się po literach od lewej do prawej, tak jak przy
   pisaniu, a kształt jest co do piksela ten, który przysłał autor.

   ── Skąd wymiary ──
   Nie są wpisane na sztywno. Obrazek jest wczytywany, żeby odczytać jego
   naturalne proporcje, i dopiero one ustawiają viewBox. Trasa pióra jest
   opisana w ułamkach (0–1) i skalowana do tych wymiarów, więc plik można
   podmienić na inny kadr bez dotykania kodu.

   Gdy pliku nie ma, komponent nie renderuje nic — hero nie może się wywalić
   przez brakującą ozdobę.
   ============================================================= */

import { CSSProperties, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/scrollTo";
import { Point, smooth } from "@/lib/cord";

/* Trasa pióra w ułamkach szerokości i wysokości podpisu: od „M", przez
   brzuch „aciej", przerwę przed „W", aż po końcowe „ki". Kreska maski jest
   grubsza od samego podpisu, więc trasa nie musi trafiać w litery co do
   milimetra — ma trzymać się linii pisma, żeby wznoszące się „W" odsłaniało
   się chwilę przed tym, co pod nim. */
const PEN: Point[] = [
  [-0.02, 0.52], [0.06, 0.44], [0.14, 0.46], [0.22, 0.50],
  [0.30, 0.52], [0.38, 0.44], [0.46, 0.48], [0.54, 0.50],
  [0.62, 0.48], [0.70, 0.47], [0.78, 0.45], [0.86, 0.42],
  [0.94, 0.38], [1.02, 0.34],
];

interface Props {
  /** Plik z podpisem. Czarny tusz na białym albo przezroczystym tle. */
  src?: string;
  className?: string;
  style?: CSSProperties;
  /** Opóźnienie startu — hero wprowadza swoje elementy po kolei. */
  delay?: number;
}

export default function Signature({
  src = "/images/signature.png",
  className = "",
  style,
  delay = 1.3,
}: Props) {
  const scope = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setBox({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => setFailed(true);
    img.src = src;
  }, [src]);

  useGSAP(() => {
    const pen = scope.current?.querySelector<SVGPathElement>("[data-pen]");
    if (!pen) return;

    if (prefersReducedMotion()) {
      gsap.set(pen, { strokeDashoffset: 0 });
      return;
    }

    const len = pen.getTotalLength();
    gsap.set(pen, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(pen, {
      strokeDashoffset: 0,
      duration: 1.9,
      delay,
      // Ręka rusza wolno, rozpędza się w środku i zwalnia na końcu — tak
      // wychodzi podpis. Liniowe tempo od razu zdradza maszynę.
      ease: "power1.inOut",
    });
  }, { scope, dependencies: [box] });

  if (failed || !box) return null;

  const { w, h } = box;
  const path = smooth(PEN.map(([x, y]): Point => [x * w, y * h]));

  return (
    <svg
      ref={scope}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      role="img"
      aria-label="Podpis: Maciej Wyrozumski"
      style={{ display: "block", overflow: "visible", height: "auto", ...style }}
    >
      <defs>
        {/* Czarny tusz na białym tle → biały tusz na czarnym. Kanał alfa
            zostaje nietknięty, więc plik z przezroczystym tłem też zadziała. */}
        <filter id="sig-invert" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="-1  0  0  0  1
                     0 -1  0  0  1
                     0  0 -1  0  1
                     0  0  0  1  0"
          />
        </filter>

        <mask id="sig-ink">
          <image href={src} x="0" y="0" width={w} height={h} filter="url(#sig-invert)" />
        </mask>

        {/* Kreska grubsza od samego podpisu: przy każdym położeniu pióra
            odsłania całą wysokość pisma, łącznie z pętlą „j" pod linią
            i wznoszącym się „W". */}
        <mask id="sig-reveal">
          <path
            data-pen
            d={path}
            stroke="#fff"
            strokeWidth={h * 1.5}
            strokeLinecap="round"
            fill="none"
          />
        </mask>
      </defs>

      <g mask="url(#sig-ink)">
        <g mask="url(#sig-reveal)">
          <rect x="0" y="0" width={w} height={h} fill="var(--accent-text)" />
        </g>
      </g>
    </svg>
  );
}
