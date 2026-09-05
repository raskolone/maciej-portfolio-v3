/* =============================================================
   Powrót na górę — kółko i strzałka postawione kredką.

   Wcześniej była tu zielona pigułka z ikoną z zestawu. Na stronie, na której
   wszystko inne jest rysowane ręką, taki przycisk czytał się jak wklejka
   z innego projektu — i to on jako jedyny element interfejsu towarzyszył
   czytelnikowi przez całą stronę.

   Rysunek jest tani: dwa komplety filtrów (kółko i strzałka są w jednym
   CrayonInk), obszar rzędu 52×52 px, bez poświaty. Geometria liczy się raz,
   przy starcie modułu.

   Pod spodem zostaje ciemne, półprzezroczyste tło — przycisk wędruje nad
   sekcjami o różnej jasności i sam kontur bywałby na nich nieczytelny.
   ============================================================= */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToTop as scrollPageToTop } from "@/lib/scrollTo";
import { handDrawnLoop, mulberry32, smooth } from "@/lib/cord";
import CrayonInk from "@/components/Crayon";

const VIEW = 52;

const rnd = mulberry32(31);
const wob = (v: number) => v + (rnd() - 0.5) * 1.4;

/* Kółko obwiedzione jednym zamachem i strzałka w górę z dwóch ramion grotu —
   ta sama technika, co obrysy filarów, tylko w miniaturze. */
const STROKES = [
  { d: handDrawnLoop(26, 26, 21, 20.5, mulberry32(31), { wave: 0.03, tremor: 1.1, steps: 60 }), width: 2.6 },
  { d: smooth([[wob(26), wob(37)], [wob(25.5), wob(27)], [26, 16]]), width: 2.9 },
  { d: smooth([[wob(19), wob(23)], [wob(23), wob(18)], [26, 16]]), width: 2.9 },
  { d: smooth([[wob(33), wob(23)], [wob(29), wob(18)], [26, 16]]), width: 2.9 },
];

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when user scrolls past the hero section (approx 100vh)
    const toggleVisibility = () => setIsVisible(window.scrollY > window.innerHeight * 0.8);
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Przez wspólny helper, bo CSS nie ma już scroll-behavior: smooth —
  // window.scrollTo skoczyłoby tu natychmiast.
  const scrollToTop = () => scrollPageToTop();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top"
        >
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            width={VIEW}
            height={VIEW}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <CrayonInk strokes={STROKES} bloom={false} />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
