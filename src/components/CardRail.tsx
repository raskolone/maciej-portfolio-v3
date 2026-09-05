/* =============================================================
   Karuzela kafelków na telefonie, siatka od tabletu wzwyż.

   Sam układ robi CSS (`.cards-rail` w index.css) — tutaj jest tylko to,
   czego CSS nie policzy: która karta jest na wierzchu, żeby kropki pod
   spodem mówiły, ile ich jeszcze zostało. Powyżej 768 px kontener wraca
   do klas siatki podanych w `className`, a kropki chowa media query.
   ============================================================= */

import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  /** Liczba kart — tyle będzie kropek. */
  count: number;
  /** Zmiana tej wartości przewija karuzelę na początek (przełączona zakładka). */
  resetKey?: string;
  /** Klasy siatki dla szerszych ekranów. */
  className?: string;
  children: ReactNode;
}

export default function CardRail({ count, resetKey, className = "", children }: Props) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    rail.current?.scrollTo({ left: 0, behavior: "auto" });
    setActive(0);
  }, [resetKey]);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;

    const onScroll = () => {
      // Skok liczony z odległości między dwiema pierwszymi kartami, a nie
      // z scrollWidth/count: ten drugi wlicza marginesy boczne toru i indeks
      // rozjeżdża się przy ostatnich kartach.
      const kids = el.children;
      if (kids.length < 2) return;
      const step = (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft;
      if (step <= 0) return;
      const i = Math.round(el.scrollLeft / step);
      setActive(Math.min(count - 1, Math.max(0, i)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  return (
    <>
      <div ref={rail} className={`cards-rail ${className}`}>
        {children}
      </div>
      <div className="rail-dots" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="rail-dot" data-active={i === active} />
        ))}
      </div>
    </>
  );
}
