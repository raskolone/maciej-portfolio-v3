import { useEffect } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASE } from "@/lib/scrollTo";

gsap.registerPlugin(Observer, ScrollTrigger);

/** Dwa przystanki bliżej siebie niż to są w praktyce tym samym miejscem. */
const MIN_GAP = 80;

/** Ile ekranu musi wystawać poza okno, żeby sekcja dostała własny przystanek. */
const OVERFLOW_TOLERANCE = 0.12;

interface Options {
  /** Kolejność sekcji do zatrzymywania się na nich. */
  sectionIds: string[];
  /** Czas skoku między przystankami. */
  duration?: number;
}

/**
 * Zamienia przewijanie w skoki między przystankami: jeden ruch kółka lub jedno
 * przesunięcie palcem przenosi do następnej sekcji, zamiast płynnie sunąć.
 *
 * Przystanki to nie są po prostu początki sekcji. "Metoda" i "O mnie" są
 * wyższe niż okno (ok. 1,3–1,4 ekranu), więc skok z ich początku prosto do
 * następnej sekcji przeskakiwałby wszystko poniżej zagięcia. Każda sekcja
 * wyższa od okna dostaje więc dodatkowe przystanki, tak by dało się ją
 * obejrzeć w całości.
 *
 * Wyłączone przy prefers-reduced-motion (przechwytywanie scrolla to ruch,
 * którego użytkownik nie kontroluje) i na ekranach dotykowych, gdzie sekcje
 * układają się w jedną kolumnę i bywają kilkakrotnie wyższe od okna.
 */
export function useSectionSnap({ sectionIds, duration = 0.7 }: Options) {
  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion() || coarsePointer) return;

    let stops: number[] = [];
    let animating = false;

    const buildStops = () => {
      const vh = window.innerHeight;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
      const raw: number[] = [];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        raw.push(top);

        // Sekcja wyższa niż okno: dokładamy tyle przystanków, żeby jej dolna
        // część nie została pominięta przy jednym skoku.
        const overflow = el.offsetHeight - vh;
        if (overflow > vh * OVERFLOW_TOLERANCE) {
          const steps = Math.ceil(overflow / (vh * 0.85));
          for (let i = 1; i <= steps; i++) {
            raw.push(top + (overflow * i) / steps);
          }
        }
      }
      raw.push(maxScroll); // stopka

      stops = raw
        .map((y) => Math.round(gsap.utils.clamp(0, maxScroll, y)))
        .sort((a, b) => a - b)
        .filter((y, i, all) => i === 0 || y - all[i - 1] >= MIN_GAP);
    };

    /** Indeks przystanku najbliższego bieżącej pozycji. */
    const nearestIndex = () => {
      const y = window.scrollY;
      let best = 0;
      let bestDistance = Infinity;
      stops.forEach((stop, i) => {
        const distance = Math.abs(stop - y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      return best;
    };

    const go = (direction: 1 | -1) => {
      if (animating || stops.length === 0) return;
      const target = gsap.utils.clamp(0, stops.length - 1, nearestIndex() + direction);
      const y = stops[target];
      if (Math.abs(y - window.scrollY) < 2) return;

      animating = true;
      gsap.to(window, {
        scrollTo: { y, autoKill: false },
        duration,
        ease: EASE,
        overwrite: true,
        onComplete: () => { animating = false; },
        onInterrupt: () => { animating = false; },
      });
    };

    buildStops();

    // Bez "pointer": ten typ reaguje na przeciąganie myszą, więc zaznaczanie
    // tekstu w akapicie przerzucałoby stronę do następnej sekcji.
    const observer = Observer.create({
      type: "wheel,touch",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onUp: () => go(1),
      onDown: () => go(-1),
    });

    // Klawiatura musi trafiać w te same przystanki, inaczej PageDown zostawia
    // stronę w połowie drogi między nimi.
    const onKeyDown = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && el.closest("input, textarea, select, [contenteditable]")) return;

      const forward = ["PageDown", "ArrowDown", "Space", " "];
      const back = ["PageUp", "ArrowUp"];
      if (forward.includes(e.key)) { e.preventDefault(); go(1); }
      else if (back.includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === "Home") { e.preventDefault(); gsap.to(window, { scrollTo: 0, duration, ease: EASE }); }
      else if (e.key === "End") { e.preventDefault(); gsap.to(window, { scrollTo: stops[stops.length - 1], duration, ease: EASE }); }
    };
    window.addEventListener("keydown", onKeyDown);

    // Layout zmienia się przy zmianie rozmiaru okna i po dociągnięciu obrazów;
    // ScrollTrigger przelicza się wtedy sam, więc podpinamy się pod to samo.
    const rebuild = () => buildStops();
    window.addEventListener("resize", rebuild);
    ScrollTrigger.addEventListener("refresh", rebuild);

    // Rozwinięcie odpowiedzi w FAQ albo przełączenie zakładki zmienia wysokość
    // dokumentu bez zmiany rozmiaru okna — bez tego przystanki zostają
    // wyliczone dla poprzedniego układu i skoki lądują obok sekcji.
    const heightWatcher = new ResizeObserver(() => {
      ScrollTrigger.refresh();
      buildStops();
    });
    heightWatcher.observe(document.body);

    return () => {
      observer.kill();
      heightWatcher.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", rebuild);
      ScrollTrigger.removeEventListener("refresh", rebuild);
    };
  }, [sectionIds, duration]);
}
