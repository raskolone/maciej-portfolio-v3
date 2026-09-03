/* =============================================================
   DESIGN: Nocturne Green — Home Page
   Składa sekcje w kolejności, prowadzi ich animacje wejścia
   i zamienia przewijanie w skoki między sekcjami.
   ============================================================= */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ForWhomSection from "@/components/sections/ForWhomSection";
import MethodSection from "@/components/sections/MethodSection";
import AboutSection from "@/components/sections/AboutSection";
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
const SECTION_IDS = ["hero", "for-whom", "method", "about", "pricing", "faq", "contact"];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useSectionSnap({ sectionIds: SECTION_IDS });

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-anim]");

    // Bez animacji nic nie ukrywamy — treść ma być po prostu na miejscu.
    if (prefersReducedMotion()) return;

    // Każda sekcja prowadzi własną choreografię, dzięki czemu kafle wchodzą
    // kaskadą względem siebie, a nie względem całej strony.
    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const targets = section.querySelectorAll<HTMLElement>("[data-anim]");
      if (targets.length === 0) return;

      // gsap.from ustawia stan początkowy od razu (immediateRender), więc nie
      // ma przebłysku widocznej treści — a gdyby GSAP się nie wczytał, treść
      // po prostu zostaje widoczna, zamiast utknąć na opacity: 0.
      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 0.55,
        ease: "power3.out",
        stagger: { each: 0.055, from: "start" },
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Hero prowadzi własne wejście na starcie (keyframes w CSS), więc nie
    // odbieramy mu go tutaj.
    gsap.set(items.filter((el) => el.closest("#hero")), { clearProps: "all" });

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
      <Navbar />
      <main>
        <HeroSection />
        <ForWhomSection />
        <MethodSection />
        <AboutSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
