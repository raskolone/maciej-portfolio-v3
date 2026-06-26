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
    // 1. Remove CSS transitions from elements that will be animated by GSAP
    // to prevent CSS transition fighting with GSAP's inline style updates.
    const elementsToAnimate = gsap.utils.toArray<HTMLElement>(".reveal-left, .reveal-right, .reveal-up, .card-glow, .faq-item");
    elementsToAnimate.forEach((el) => {
      el.style.transition = 'none';
    });

    // 2. Animate .card-glow and .faq-item alternately from left/right
    const cards = gsap.utils.toArray<HTMLElement>(".card-glow, .faq-item");
    cards.forEach((card, index) => {
      // For grid layouts, usually index % 2 or index % 3 determines column.
      // We will just alternate -100 and 100 for simplicity to come from both sides.
      const direction = index % 2 === 0 ? -100 : 100;
      gsap.fromTo(card,
        { opacity: 0, x: direction, y: 0 },
        {
          opacity: 1, 
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // 3. Animate .reveal-left
    const revealLeft = gsap.utils.toArray<HTMLElement>(".reveal-left");
    revealLeft.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -120 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: el, start: "top 85%", toggleActions: "play none none reverse",
          }
        }
      );
    });

    // 4. Animate .reveal-right
    const revealRight = gsap.utils.toArray<HTMLElement>(".reveal-right");
    revealRight.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: 120 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: el, start: "top 85%", toggleActions: "play none none reverse",
          }
        }
      );
    });

    // 5. Animate .reveal-up
    const revealUp = gsap.utils.toArray<HTMLElement>(".reveal-up");
    revealUp.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: el, start: "top 85%", toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-background text-foreground">
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
