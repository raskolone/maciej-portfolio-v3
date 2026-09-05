/* =============================================================
   DESIGN: Nocturne Green — Home Page
   Składa sekcje w kolejności, prowadzi ich animacje wejścia
   i zamienia przewijanie w skoki między sekcjami.
   ============================================================= */

import Navbar from "@/components/Navbar";
import { CrayonSprite } from "@/components/Crayon";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ForWhomSection from "@/components/sections/ForWhomSection";
import MethodSection from "@/components/sections/MethodSection";
import PillarsSection from "@/components/sections/PillarsSection";
import AboutSection from "@/components/sections/AboutSection";
import StorySection from "@/components/sections/StorySection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import { prefersReducedMotion } from "@/lib/scrollTo";

gsap.registerPlugin(ScrollTrigger);

/* Kolejność przystanków dla skoków między sekcjami. */
const SECTION_IDS = [
  "hero", "for-whom", "method", "pillars", "about", "story", "pricing", "faq", "contact",
];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useSectionSnap({ sectionIds: SECTION_IDS });

  useGSAP(() => {
    // Bez animacji nic nie ukrywamy — treść ma być po prostu na miejscu.
    if (prefersReducedMotion()) return;

    const SLIDE = 90;   // dystans wjazdu z boku
    const RISE = 34;    // dla elementów stojących na osi sekcji

    /**
     * Element wjeżdża z tej strony, po której leży. Lewa kolumna nadlatuje
     * z lewej, prawa z prawej, a to co stoi na osi — z dołu. Dzięki temu
     * sekcja składa się do środka jako jedna całość, zamiast alternować
     * kierunki po indeksie, co przy siatce 3-kolumnowej wyglądało losowo.
     * Atrybut data-anim="left|right|up" nadpisuje ten wybór ręcznie.
     */
    const entryOffset = (el: HTMLElement, sectionCenter: number, sectionWidth: number) => {
      const explicit = el.dataset.anim;
      if (explicit === "left") return { x: -SLIDE, y: 0 };
      if (explicit === "right") return { x: SLIDE, y: 0 };
      if (explicit === "up") return { x: 0, y: RISE };

      const box = el.getBoundingClientRect();
      const offset = (box.left + box.width / 2 - sectionCenter) / sectionWidth;
      if (offset < -0.12) return { x: -SLIDE, y: 0 };
      if (offset > 0.12) return { x: SLIDE, y: 0 };
      return { x: 0, y: RISE };
    };

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section || id === "hero") return; // hero ma własne wejście na starcie

      const targets = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-anim]"));
      if (targets.length === 0) return;

      const rect = section.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      // Jeden timeline na sekcję: wjeżdża przy wejściu w nią i odjeżdża tą
      // samą drogą przy powrocie do poprzedniej (toggleActions ... reverse).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      targets.forEach((el, i) => {
        const { x, y } = entryOffset(el, center, rect.width);
        // fromTo, nie from: tween from() zapisuje wartość końcową dopiero przy
        // renderze, a ScrollTrigger.refresh() (po dociągnięciu obrazów i fontów)
        // trafiał w moment, gdy element miał już przesunięcie startowe — i to
        // ono lądowało jako punkt docelowy. Efekt: przenikanie bez ruchu.
        tl.fromTo(
          el,
          { opacity: 0, x, y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            immediateRender: true,
          },
          i * 0.07
        );
      });
    });

    // Obrazy i fonty osiadają po pierwszym malowaniu i przesuwają wszystkie
    // progi poniżej. Trasa jest lazy, więc "load" zwykle już padło.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh);

    return () => window.removeEventListener("load", refresh);
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen text-foreground">
      {/* Filtry kredki są wspólne dla „Metody”, „Filarów” i „O mnie”.
          Identyfikatory SVG są globalne w dokumencie, więc definicja może być
          tylko jedna — i musi wisieć w drzewie, zanim ktokolwiek się na nią
          powoła. */}
      <CrayonSprite />
      <Navbar />
      <main>
        <HeroSection />
        <ForWhomSection />
        <MethodSection />
        <PillarsSection />
        <AboutSection />
        <StorySection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
