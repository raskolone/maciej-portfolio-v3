/* =============================================================
   „Przewiń niżej" — strzałka dorysowana kredką przy dolnej krawędzi sekcji.

   Ten sam gest, co kółka w „Filarach" i kłębek w „Metodzie", sprowadzony do
   trzech kresek. Stoi na dole każdego ekranu i mówi jedno: to jeszcze nie
   koniec. Jest tania z założenia:

   • jeden komplet filtrów na całą strzałkę (CrayonInk grupuje przebiegi),
     a jej obszar to jakieś 40×64 px — koszt szumu jest funkcją powierzchni;
   • poświata wyłączona: przy kresce grubości 4 px nic nie wnosi, a rozmycie
     powiększyłoby obszar filtra kilkukrotnie;
   • kołysanie idzie po `transform`, więc nie wywołuje przeliczania układu;
   • kołysanie STOI, kiedy sekcja jest poza kadrem. Strzałek jest na stronie
     osiem i osiem wiecznych tweenów chodzących naraz kosztowałoby dokładnie
     tyle, ile oszczędziliśmy gdzie indziej.

   Rysunek jest ten sam dla wszystkich strzałek — liczy się raz, przy starcie
   modułu, a nie po razie na każdą sekcję.
   ============================================================= */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { prefersReducedMotion, scrollToSelector } from "@/lib/scrollTo";
import { mulberry32, smooth } from "@/lib/cord";
import CrayonInk from "@/components/Crayon";

gsap.registerPlugin(ScrollTrigger);

const VIEW = { w: 44, h: 64 };

/* Trzon i dwa ramiona grotu — osobne pociągnięcia, nie domknięty wielokąt.
   Ręką rysuje się strzałkę właśnie tak i właśnie po tym się to poznaje. */
const rnd = mulberry32(19);
const wob = (v: number) => v + (rnd() - 0.5) * 1.6;

const STROKES = [
  { d: smooth([[wob(22), wob(5)], [wob(20.5), wob(21)], [wob(23), wob(36)], [22, 48]]) },
  { d: smooth([[wob(11), wob(36)], [wob(17), wob(43)], [22, 48]]) },
  { d: smooth([[wob(33), wob(36)], [wob(27), wob(43)], [22, 48]]) },
];

interface Props {
  /** Selektor sekcji, do której prowadzi strzałka. */
  to: string;
  /**
   * Przypięcie do dolnej krawędzi rodzica zamiast miejsca w obiegu treści.
   *
   * Domyślnie strzałka JEST elementem obiegu i stoi za całą treścią sekcji —
   * to jedyny układ, w którym nigdy na nic nie wejdzie. Wersja przypięta
   * (pozycja absolutna) zostaje tylko dla hero, bo tam treść jest w kolumnie
   * po lewej, a dół kadru i tak jest pusty.
   */
  pinned?: boolean;
}

export default function ScrollHint({ to, pinned = false }: Props) {
  const scope = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;

    const paths = gsap.utils.toArray<SVGPathElement>("path", el);
    paths.forEach((path) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    });

    // Dorysowuje się, kiedy sekcja wchodzi w kadr.
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 96%", toggleActions: "play none none reverse" },
    });

    /* Kołysanie chodzi tylko wtedy, gdy strzałka jest widoczna. Bez tego osiem
       nieskończonych tweenów pracowałoby przez cały czas życia strony. */
    const bob = gsap.to(el, {
      y: 7,
      duration: 1.1,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      paused: true,
    });
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: ({ isActive }) => (isActive ? bob.play() : bob.pause()),
    });
  }, { scope });

  return (
    <button
      ref={scope}
      type="button"
      onClick={() => scrollToSelector(to)}
      aria-label={t("Przewiń do następnej sekcji", "Scroll to the next section")}
      className={pinned ? "scroll-hint scroll-hint--pinned" : "scroll-hint"}
    >
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        width={VIEW.w}
        height={VIEW.h}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <CrayonInk strokes={STROKES} width={3.6} bloom={false} />
      </svg>
    </button>
  );
}
