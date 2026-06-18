/**
 * BlogPost — widok pojedynczego artykułu
 * Design: ciemne tło, zielony akcent, typografia Cormorant + DM Sans
 * Szeroka kolumna treści z lewym paskiem akcentowym
 */
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/lib/blogData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/40 font-mono text-sm mb-4">404</p>
            <h1 className="font-display text-4xl font-bold mb-6">
              {t("Artykuł nie istnieje", "Article not found")}
            </h1>
            <Link href="/blog">
              <span className="text-[#39ff14] font-mono text-sm tracking-wide cursor-pointer hover:underline">
                ← {t("Wróć do bloga", "Back to blog")}
              </span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Nagłówek artykułu */}
      <header className="pt-32 pb-16 border-b border-white/10">
        <div className="container">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 mb-8">
              <Link href="/blog">
                <span className="text-white/40 text-sm font-mono hover:text-[#39ff14] transition-colors cursor-pointer">
                  {t("Blog", "Blog")}
                </span>
              </Link>
              <span className="text-white/20 text-sm">/</span>
              <span className="text-[#39ff14] text-sm font-mono">{post.category}</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              {post.title}
            </h1>
            <p className="mt-6 text-xl text-white/60 leading-relaxed font-light italic">
              {post.subtitle}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#39ff14]/20 border border-[#39ff14]/40 flex items-center justify-center">
                  <span className="text-[#39ff14] text-xs font-bold">MW</span>
                </div>
                <span className="text-white/60 text-sm">Maciej Wyrozumski</span>
              </div>
              <span className="text-white/20">·</span>
              <span className="text-white/40 text-sm">{post.date}</span>
              <span className="text-white/20">·</span>
              <span className="text-white/40 text-sm">{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Treść artykułu */}
      <article className="py-20">
        <div className="container">
          <div className="max-w-3xl">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* CTA na dole */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-3xl">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12">
              <span className="text-[#39ff14] font-mono text-xs tracking-widest uppercase">
                {t("Cribro English", "Cribro English")}
              </span>
              <h3 className="font-display text-3xl font-bold mt-3 mb-4">
                {t(
                  "Chcesz, żeby Twój zespół brzmiał jak liderzy?",
                  "Want your team to sound like leaders?"
                )}
              </h3>
              <p className="text-white/50 mb-8 leading-relaxed">
                {t(
                  "Szkolenia Business English dla firm i managerów. Bezpłatna konsultacja — bez zobowiązań.",
                  "Business English training for companies and managers. Free consultation — no commitment."
                )}
              </p>
              <Link href="/#contact">
                <span className="inline-flex items-center gap-2 bg-[#39ff14] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#39ff14]/90 transition-colors cursor-pointer text-sm">
                  {t("Umów bezpłatną konsultację", "Book a free consultation")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Powrót do bloga */}
      <div className="pb-16">
        <div className="container">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-white/40 hover:text-[#39ff14] transition-colors cursor-pointer font-mono text-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t("Wszystkie artykuły", "All articles")}
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
