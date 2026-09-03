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
    const targets = gsap.utils.toArray<HTMLElement>(".reveal-left, .reveal-right, .reveal-up");

    // Anyone who asked for less motion gets the finished state, not a tween.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { opacity: 1, x: 0, y: 0, clearProps: "transition" });
      return;
    }

    // Strip CSS transitions from GSAP-driven elements so the two don't
    // fight over the same inline styles.
    targets.forEach((el) => {
      el.style.transition = "none";
    });

    // Progress is scrubbed against scroll position rather than played as a
    // fixed-length tween, so the reveal tracks the wheel in both directions:
    // scrolling up rewinds it in step instead of running a separate 0.8s
    // reverse that lags behind the pointer. The whole travel happens across
    // ~26vh of scroll, which keeps it quick without feeling clipped.
    const REVEAL_START = 94;
    const REVEAL_END = 68;

    const reveal = (selector: string, from: gsap.TweenVars) => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        // A scrubbed tween has no timeline to delay against, so the method
        // grid's stagger becomes a small head start on the trigger point.
        const lead = Number(el.dataset.revealDelay ?? 0) * 25;
        gsap.fromTo(el, from, {
          opacity: 1,
          x: 0,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: `top ${REVEAL_START - lead}%`,
            end: `top ${REVEAL_END - lead}%`,
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });
      });
    };

    // Shorter travel than before — 120px of slide read as sluggish once the
    // movement is tied to the scroll rather than to a timer.
    reveal(".reveal-left", { opacity: 0, x: -64 });
    reveal(".reveal-right", { opacity: 0, x: 64 });
    reveal(".reveal-up", { opacity: 0, y: 40 });

    // Section images and web fonts settle after first paint and shift every
    // trigger below them, which drags the measured start/end points out of
    // place. The route chunk is lazy, so `load` has usually already fired by
    // the time this runs — waiting on the event alone would never recompute.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }
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
