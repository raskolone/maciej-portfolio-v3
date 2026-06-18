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

export default function Blog() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero nagłówek */}
      <section className="pt-32 pb-16 border-b border-white/10">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-[#39ff14] font-mono text-sm tracking-widest uppercase">
              {t("Cribro Journal", "Cribro Journal")}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold mt-4 leading-tight">
              {t("Artykuły o Business English", "Business English Articles")}
            </h1>
            <p className="mt-6 text-white/60 text-lg max-w-xl leading-relaxed">
              {t(
                "Praktyczna wiedza dla managerów i firm, które chcą używać angielskiego jako narzędzia wpływu — nie obowiązku.",
                "Practical knowledge for managers and companies who want to use English as a tool of influence — not an obligation."
              )}
            </p>
          </div>
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
