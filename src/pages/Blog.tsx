/**
 * Blog — lista artykułów
 * Design: ciemne tło #0a0a0a, zielony akcent #39ff14, Cormorant Garamond + DM Sans
 * Asymetryczny układ: nagłówek po lewej, karty po prawej
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blogData";
import { useLanguage } from "@/contexts/LanguageContext";
import ConstellationCanvas from "@/components/ConstellationCanvas";

export default function Blog() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero nagłówek na wzór HeroSection */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-background border-b border-border/10 pt-24 pb-16">
        {/* Animated constellation */}
        <ConstellationCanvas />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, oklch(0.11 0.015 240 / 60%) 100%)",
            zIndex: 1,
          }}
        />

        {/* Photo — absolute right */}
        <div
          className="absolute right-[5%] bottom-0 h-[80%] hidden lg:block"
          style={{ zIndex: 2, width: "40%", background: "transparent", overflow: "hidden" }}
        >
          <img
            src="/images/glasses_thinker.png"
            alt="Cribro Journal Thinker"
            className="h-full w-auto max-w-none absolute bottom-0 right-1/2 translate-x-1/2"
            style={{
              objectFit: "contain",
              objectPosition: "center bottom",
              filter: "brightness(0.9) contrast(1.1) grayscale(0.2)",
            }}
          />
        </div>

        {/* Left content — text */}
        <div
          className="relative flex flex-col justify-center z-10 w-full lg:w-[60%] px-6 lg:px-16 xl:px-24"
        >
          {/* Label */}
          <div
            className="animate-fade-in mb-5"
            style={{ opacity: 0, animationFillMode: "forwards" }}
          >
            <span
              className="text-muted-foreground text-[11px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {t("Cribro Journal", "Cribro Journal")}
            </span>
          </div>

          {/* Title */}
          <div
            className="animate-fade-in-up mb-5"
            style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <h1
              className="text-5xl md:text-7xl xl:text-8xl font-bold text-foreground leading-none tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t("Bez zbędnego", "Without")} <br/>
              <span className="text-primary italic">{t("szumu.", "noise.")}</span>
            </h1>
          </div>

          {/* Green divider */}
          <div
            className="animate-fade-in-up mb-6 delay-150"
            style={{ opacity: 0, animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <div className="h-px w-16 bg-primary" />
          </div>

          {/* Description */}
          <p
            className="animate-fade-in-up text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg delay-300"
            style={{
              opacity: 0,
              animationDelay: "0.45s",
              animationFillMode: "forwards",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {t(
              "O języku w biznesie, radzeniu sobie z nadmiarem informacji i budowaniu systemów efektywnej pracy. Wyłącznie sprawdzone metody i konkretna wiedza.",
              "On language in business, dealing with information overload, and building effective work systems. Only proven methods and concrete knowledge."
            )}
          </p>
        </div>

        {/* Mobile photo — shown below text on small screens */}
        <div className="lg:hidden w-full px-6 pt-12 z-10 relative">
          <img
            src="/images/glasses_thinker.png"
            alt="Cribro Journal Thinker"
            className="w-48 sm:w-64 mx-auto object-cover opacity-80"
            style={{
              maskImage: "radial-gradient(ellipse 80% 85% at 50% 50%, black 50%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 85% at 50% 50%, black 50%, transparent 100%)",
            }}
          />
        </div>
      </section>

      {/* Lista artykułów */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-0 divide-y divide-white/10">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group py-10 grid md:grid-cols-12 gap-6 cursor-pointer hover:bg-white/[0.02] transition-colors duration-300 px-2 -mx-2 rounded-lg">
                  {/* Meta */}
                  <div className="md:col-span-3 flex flex-col gap-2">
                    <span className="text-[#39ff14] text-xs font-mono tracking-widest uppercase">
                      {post.category}
                    </span>
                    <span className="text-white/40 text-sm">{post.date}</span>
                    <span className="text-white/30 text-sm">{post.readTime}</span>
                  </div>

                  {/* Treść */}
                  <div className="md:col-span-8">
                    <h2 className="font-display text-2xl md:text-3xl font-semibold leading-snug group-hover:text-[#39ff14] transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-white/50 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-6 text-sm text-[#39ff14] font-mono tracking-wide">
                      {t("Czytaj dalej", "Read more")}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>

                  {/* Strzałka */}
                  <div className="md:col-span-1 hidden md:flex items-center justify-end">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/20 group-hover:text-[#39ff14] group-hover:translate-x-1 transition-all duration-300">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Placeholder — więcej artykułów wkrótce */}
          {blogPosts.length < 3 && (
            <div className="mt-16 border border-dashed border-white/10 rounded-xl p-12 text-center">
              <p className="text-white/30 font-mono text-sm tracking-widest uppercase">
                {t("Więcej artykułów wkrótce", "More articles coming soon")}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
