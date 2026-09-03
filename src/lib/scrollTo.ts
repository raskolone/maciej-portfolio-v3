import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/**
 * Jedno przewijanie dla całej strony.
 *
 * Nawigacja używała `scrollIntoView({ behavior: "smooth" })`, a to opiera się
 * na `scroll-behavior: smooth` w CSS — ta sama własność wchodzi w drogę
 * ScrollToPlugin, który ustawia `scrollTop` w każdej klatce. Przeglądarka
 * próbowałaby wtedy animować każdą z tych klatek osobno. Dlatego wszystkie
 * przewinięcia idą tędy i mają wspólne wyczucie czasu.
 */
export const EASE = "power2.inOut";

export function scrollToY(y: number, duration = 0.7) {
  gsap.to(window, {
    scrollTo: { y, autoKill: false },
    duration: prefersReducedMotion() ? 0 : duration,
    ease: EASE,
    overwrite: true,
  });
}

export function scrollToSelector(selector: string, duration = 0.7) {
  const el = document.querySelector(selector);
  if (!el) return;
  scrollToY(el.getBoundingClientRect().top + window.scrollY, duration);
}

export function scrollToTop(duration = 0.7) {
  scrollToY(0, duration);
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
