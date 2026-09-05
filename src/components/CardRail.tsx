/* =============================================================
   Karuzela kafelków na telefonie, siatka od tabletu wzwyż.

   Układ robi CSS (`.cards-rail` w index.css) — tutaj jest to, czego CSS nie
   policzy: która karta jest na wierzchu i jak przesunąć tor o dokładnie jedną
   kartę. Powyżej 768 px kontener wraca do klas siatki podanych w `className`,
   a cały pasek sterowania chowa media query.

   ── Dlaczego strzałki, skoro tor i tak da się przesunąć palcem ──
   Bo nie widać, że jest co przesuwać. Przy karcie na całą szerokość ekranu
   nie ma zajawki następnej, a same kropki mówią „jest ich sześć", nie „przesuń
   w bok". Strzałka jest jedynym elementem, który nazywa gest wprost — i przy
   okazji daje sposób na przejście dalej komuś, kto obsługuje stronę
   klawiaturą albo czytnikiem ekranu.

   Karta zajmuje pełną szerokość, nie 78%. Zajawka sąsiada miała sugerować
   ciąg dalszy, ale kosztowała jedną piątą i tak wąskiego ekranu, a treść
   kafelka robiła się przez to wyższa od niego samego.
   ============================================================= */

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  /** Liczba kart — tyle będzie kropek. */
  count: number;
  /** Zmiana tej wartości przewija karuzelę na początek (przełączona zakładka). */
  resetKey?: string;
  /** Klasy siatki dla szerszych ekranów. */
  className?: string;
  /** Etykieta dla czytnika ekranu, np. „kafelki cennika”. */
  label?: string;
  children: ReactNode;
}

export default function CardRail({ count, resetKey, className = "", label, children }: Props) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    rail.current?.scrollTo({ left: 0, behavior: "auto" });
    setActive(0);
  }, [resetKey]);

  /** Odległość między kartami. Liczona z dwóch pierwszych, a nie ze
      scrollWidth/count: ten drugi wlicza marginesy boczne toru i indeks
      rozjeżdża się przy ostatnich kartach. */
  const step = () => {
    const el = rail.current;
    if (!el || el.children.length < 2) return 0;
    return (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
  };

  useEffect(() => {
    const el = rail.current;
    if (!el) return;

    const onScroll = () => {
      const s = step();
      if (s <= 0) return;
      setActive(Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / s))));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  const go = useCallback((direction: -1 | 1) => {
    const el = rail.current;
    const s = step();
    if (!el || s <= 0) return;
    // Liczone od indeksu, nie od bieżącego scrollLeft: przy szybkim stukaniu
    // w strzałkę pozycja jest jeszcze w trakcie animacji i skok po niej
    // gubiłby karty.
    const next = Math.min(count - 1, Math.max(0, active + direction));
    el.scrollTo({ left: next * s, behavior: "smooth" });
  }, [active, count]);

  const arrow = (direction: -1 | 1, disabled: boolean) => (
    <button
      type="button"
      className="rail-arrow"
      onClick={() => go(direction)}
      disabled={disabled}
      aria-label={direction === -1 ? "Poprzedni kafelek" : "Następny kafelek"}
    >
      {direction === -1 ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
    </button>
  );

  return (
    <>
      <div ref={rail} className={`cards-rail ${className}`} aria-label={label}>
        {children}
      </div>

      {/* Pasek sterowania: strzałka, kropki, strzałka. Kropki są opisem stanu,
          nie kontrolką — stąd `aria-hidden`; nawigację niosą przyciski. */}
      <div className="rail-nav">
        {arrow(-1, active === 0)}
        <div className="rail-dots" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <span key={i} className="rail-dot" data-active={i === active} />
          ))}
        </div>
        {arrow(1, active === count - 1)}
      </div>
    </>
  );
}
