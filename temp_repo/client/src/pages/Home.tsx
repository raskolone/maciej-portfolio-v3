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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
