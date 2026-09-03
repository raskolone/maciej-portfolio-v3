/* =============================================================
   DESIGN: Warm Ink & Paper — Home Page
   Assembles all sections in order
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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Strip CSS transitions from GSAP-driven elements so the two don't
    // fight over the same inline styles.
    const elementsToAnimate = gsap.utils.toArray<HTMLElement>(".reveal-left, .reveal-right, .reveal-up");
    elementsToAnimate.forEach((el) => {
      el.style.transition = 'none';
    });

    // Slide each tracked element in from its own side. The reveal is
    // reversible: scrolling back out resets it so it replays on the way down.
    // data-reveal-delay carries the per-card stagger (the method grid uses it).
    const reveal = (selector: string, from: gsap.TweenVars) => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.fromTo(el, from, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: {
            trigger: el, start: "top 85%", toggleActions: "play none none reverse",
          },
        });
      });
    };

    reveal(".reveal-left", { opacity: 0, x: -120 });
    reveal(".reveal-right", { opacity: 0, x: 120 });
    reveal(".reveal-up", { opacity: 0, y: 50 });

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
