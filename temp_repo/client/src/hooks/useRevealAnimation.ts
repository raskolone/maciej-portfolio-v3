import { useEffect, useRef } from "react";

/**
 * useRevealAnimation
 * Animuje elementy z klasami reveal-left / reveal-right / reveal-up
 * przy scrollowaniu.
 *
 * NAPRAWKA MOBILE: każdy element obserwowany osobno (threshold 0.1),
 * więc nawet bardzo długa sekcja działa poprawnie na małych ekranach.
 */
export function useRevealAnimation(staggerMs = 130) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const elements = Array.from(
      section.querySelectorAll(".reveal-left, .reveal-right, .reveal-up")
    ) as HTMLElement[];

    // Fallback: jeśli IntersectionObserver nie jest dostępny — pokaż od razu
    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateX(0) translateY(0)";
      });
      return;
    }

    const observers: IntersectionObserver[] = [];

    elements.forEach((el, i) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform =
                "translateX(0) translateY(0)";
            }, i * staggerMs);
            obs.unobserve(entry.target);
          });
        },
        // threshold 0.1 = wystarczy że 10% elementu jest widoczne
        // rootMargin 0px = bez dodatkowego marginesu — działa na mobile
        { threshold: 0.1, rootMargin: "0px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [staggerMs]);

  return ref;
}
