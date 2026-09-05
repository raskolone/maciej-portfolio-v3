import { useEffect } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASE } from "@/lib/scrollTo";

gsap.registerPlugin(Observer, ScrollTrigger);

/** Dwa przystanki bliżej siebie niż to są w praktyce tym samym miejscem. */
const MIN_GAP = 80;

/** Ile ekranu musi wystawać poza okno, żeby sekcja dostała własny przystanek.

    Próg jest podwójny — ułamek okna ORAZ liczba pikseli — i oba warunki muszą
    zajść naraz. Powód jest taki, że jeden próg zawsze psuje jedną z dwóch
    rzeczy. Za niski dzieli sekcję, której zabrakło dwóch wierszy: strona
    pokazuje ją w kawałkach, mimo że różnica to kilkadziesiąt pikseli. Za
    wysoki jest gorszy — skoro przystanek ustawia GÓRĘ sekcji na górze okna,
    a scroll poza przystanki jest przechwycony, to wszystko, co wystaje i nie
    dostało własnego przystanku, staje się po prostu nieosiągalne.

    Osiemdziesiąt pikseli to mniej więcej wiersz nagłówka albo dwa wiersze
    przypisu — tyle wolno stracić. Wszystko powyżej dostaje przystanek.
    Sekcje są przy tym ściskane w arkuszu tak, żeby na typowych laptopach
    nie wystawały wcale (patrz bloki `max-height` w index.css) — ten próg
    jest zabezpieczeniem, a nie sposobem na mieszczenie treści. */
const OVERFLOW_TOLERANCE = 0.18;
const OVERFLOW_MIN_PX = 80;

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

    /* Gładzik nie wysyła jednego zdarzenia na gest.
       Jedno machnięcie dwoma palcami to seria kilkudziesięciu zdarzeń `wheel`,
       a po oderwaniu palców macOS dosypuje jeszcze bezwładność — kolejne
       zdarzenia o malejącej sile, ciągnące się nawet ponad sekundę.
       Obserwator zgłaszał każde z nich osobno, więc jeden gest przerzucał
       stronę o kilka sekcji naraz. Kółko myszy zachowywało się poprawnie
       tylko dlatego, że faktycznie daje jedno zdarzenie na klik.

       Po skoku blokujemy więc kolejne, dopóki nie zajdą OBA warunki:
       animacja się skończyła (`settled`) i przez IDLE_MS nie przyszło żadne
       zdarzenie (`blockUntil`). Termin odblokowania przesuwają SUROWE
       zdarzenia `wheel`/`touchmove`, nie wywołania obserwatora: przy
       `tolerance` obserwator zgłasza się dopiero po nazbieraniu progu, więc
       w ogonie bezwładności — gdzie delty spadają do 1–2 px — jego
       wywołania dzieli więcej niż IDLE_MS i blokada zdejmowałaby się w
       środku wciąż trwającego gestu. */
    const IDLE_MS = 220;
    let settled = true;
    let blockUntil = 0;

    const blocked = () => !settled || performance.now() < blockUntil;
    const hold = () => { blockUntil = performance.now() + IDLE_MS; };

    // Tylko nasłuch: przewijaniem steruje obserwator niżej.
    const noteRawEvent = () => { if (blocked()) hold(); };
    window.addEventListener("wheel", noteRawEvent, { passive: true });
    window.addEventListener("touchmove", noteRawEvent, { passive: true });

    const buildStops = () => {
      const vh = window.innerHeight;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
      const raw: number[] = [];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const overflow = el.offsetHeight - vh;

        if (overflow > OVERFLOW_MIN_PX && overflow > vh * OVERFLOW_TOLERANCE) {
          // Sekcja naprawdę wyższa od okna: przystanek na jej górze plus tyle
          // kolejnych, żeby dolna część nie została pominięta przy skoku.
          raw.push(top);
          const steps = Math.ceil(overflow / (vh * 0.85));
          for (let i = 1; i <= steps; i++) {
            raw.push(top + (overflow * i) / steps);
          }
        } else if (overflow > 0) {
          /* Sekcja przekracza okno o mniej niż próg — drugiego przystanku nie
             dostanie, więc to, co wystaje, byłoby nieosiągalne. Przystanek
             wypada zatem nie na górze sekcji, tylko w połowie jej nadmiaru:
             brakujące piksele rozkładają się po równo na górę i na dół.

             To nie jest kompromis „trochę urwiemy z obu stron". `.section-screen`
             centruje treść w pionie i trzyma po bokach oddech rzędu 30–80 px,
             więc nadmiar mniejszy od progu mieści się w tym oddechu: przycięciu
             podlega padding, a nie treść. Ustawienie sekcji górą do góry okna
             zjadałoby ten sam nadmiar w całości z dołu, czyli z ostatniego
             wiersza. */
          raw.push(top + overflow / 2);
        } else {
          raw.push(top);
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
      if (stops.length === 0) return;
      const target = gsap.utils.clamp(0, stops.length - 1, nearestIndex() + direction);
      const y = stops[target];
      if (Math.abs(y - window.scrollY) < 2) return;

      settled = false;
      gsap.to(window, {
        scrollTo: { y, autoKill: false },
        duration,
        ease: EASE,
        overwrite: true,
        onComplete: () => { settled = true; },
        onInterrupt: () => { settled = true; },
      });
    };

    /* Każde zdarzenie odsuwa moment odblokowania — decyzja o skoku zapada
       na podstawie stanu sprzed jego zaksięgowania. */
    const onGesture = (direction: 1 | -1) => {
      const wasBlocked = blocked();
      hold();
      if (!wasBlocked) go(direction);
    };

    buildStops();

    // Bez "pointer": ten typ reaguje na przeciąganie myszą, więc zaznaczanie
    // tekstu w akapicie przerzucałoby stronę do następnej sekcji.
    const observer = Observer.create({
      type: "wheel,touch",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onUp: () => onGesture(1),
      onDown: () => onGesture(-1),
    });

    // Klawiatura musi trafiać w te same przystanki, inaczej PageDown zostawia
    // stronę w połowie drogi między nimi.
    const onKeyDown = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && el.closest("input, textarea, select, [contenteditable]")) return;

      const forward = ["PageDown", "ArrowDown", "Space", " "];
      const back = ["PageUp", "ArrowUp"];
      // Przez tę samą bramkę co kółko i gładzik — przytrzymana strzałka
      // powtarza się kilkanaście razy na sekundę.
      if (forward.includes(e.key)) { e.preventDefault(); onGesture(1); }
      else if (back.includes(e.key)) { e.preventDefault(); onGesture(-1); }
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
    // ScrollTrigger.refresh() samo potrafi zmienić wysokość dokumentu, więc
    // wołane wprost z obserwatora nakręcałoby się w kółko. Stąd odroczenie
    // do końca klatki i pamięć ostatnio widzianej wysokości.
    let lastHeight = document.body.offsetHeight;
    let heightTimer = 0;
    const heightWatcher = new ResizeObserver(() => {
      if (Math.abs(document.body.offsetHeight - lastHeight) < 2) return;
      lastHeight = document.body.offsetHeight;
      clearTimeout(heightTimer);
      heightTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        buildStops();
      }, 120);
    });
    heightWatcher.observe(document.body);

    return () => {
      observer.kill();
      heightWatcher.disconnect();
      clearTimeout(heightTimer);
      window.removeEventListener("wheel", noteRawEvent);
      window.removeEventListener("touchmove", noteRawEvent);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", rebuild);
      ScrollTrigger.removeEventListener("refresh", rebuild);
    };
  }, [sectionIds, duration]);
}
