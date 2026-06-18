/*
 * CRIBRO.PRO — Home.tsx
 * Dark Premium Agency
 * Sections: Hero, Services, Portfolio, About, Pricing, Contact
 * Photos: /manus-storage/maciej-cribro-fullbody_0132c519.png
 *         /manus-storage/maciej-cribro-portrait_90442823.png
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor, Smartphone, Zap, Database, ShoppingCart, Bot,
  ArrowRight, Mail, Phone, MapPin, Check, ExternalLink, Code2
} from "lucide-react";
import Navbar from "@/components/CribroNavbar";
import Footer from "@/components/CribroFooter";

// ─── Fade-in on scroll hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────
function HeroSection() {
  const [typed, setTyped] = useState("");
  const phrases = ["Strony internetowe", "Aplikacje webowe", "Sklepy online", "Systemy SaaS"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const phrase = phrases[phraseIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(phrase.slice(0, charIdx.current));
        if (charIdx.current === phrase.length) {
          deleting.current = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        charIdx.current--;
        setTyped(phrase.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      timeout = setTimeout(tick, deleting.current ? 45 : 80);
    };
    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "5rem",
        paddingBottom: "4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Green glow top-right */}
      <div
        style={{
          position: "absolute",
          top: "-10rem",
          right: "-10rem",
          width: "40rem",
          height: "40rem",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="flex flex-col-reverse md:grid"
        >
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginBottom: "1.5rem" }}
            >
              <span className="section-label">cribro.pro</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "#f5f5f0",
                marginBottom: "1rem",
              }}
            >
              Buduję rzeczy,
              <br />
              <span style={{ color: "#4ade80" }}>które działają.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(245,245,240,0.55)",
                marginBottom: "2rem",
                minHeight: "2.5rem",
              }}
            >
              {typed}
              <span
                style={{
                  color: "#4ade80",
                  animation: "blink 0.8s step-end infinite",
                }}
              >
                |
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "rgba(245,245,240,0.6)",
                maxWidth: "480px",
                marginBottom: "2.5rem",
              }}
            >
              Projektuję i programuję strony internetowe oraz aplikacje webowe.
              Małe firmy, startupy, blogi — od prostego landing page po
              rozbudowany system z backendem. Szybko, czysto, bez kompromisów.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <a href="#kontakt" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}>
                Zapytaj o wycenę <ArrowRight size={16} />
              </a>
              <a href="#portfolio" className="btn-secondary" onClick={(e) => { e.preventDefault(); document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" }); }}>
                Zobacz projekty
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{
                display: "flex",
                gap: "2.5rem",
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {[
                { val: "10+", label: "lat w branży" },
                { val: "100%", label: "własny kod" },
                { val: "∞", label: "możliwości" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "#4ade80",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(245,245,240,0.4)",
                      marginTop: "0.3rem",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Green accent border */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                right: "-1.5rem",
                bottom: "-1.5rem",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: "2px",
                zIndex: 0,
              }}
            />
            <img
              src="/manus-storage/maciej-cribro-fullbody_0132c519.png"
              alt="Maciej Wyrozumski — Cribro"
              style={{
                width: "100%",
                maxWidth: "420px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "2px",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              }}
            />
            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "-1rem",
                background: "#111",
                border: "1px solid rgba(74,222,128,0.3)",
                borderRadius: "4px",
                padding: "0.75rem 1.25rem",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  color: "#4ade80",
                  textTransform: "uppercase",
                  marginBottom: "0.2rem",
                }}
              >
                Stack
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(245,245,240,0.7)",
                }}
              >
                React · Node.js · TypeScript
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Monitor,
    title: "Strony internetowe",
    desc: "Landing pages, strony firmowe, blogi — zaprojektowane i zakodowane od zera. Responsywne, szybkie, gotowe na SEO.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    icon: ShoppingCart,
    title: "Sklepy online",
    desc: "E-commerce z pełnym panelem zarządzania, płatnościami i integracjami. WooCommerce lub custom stack.",
    tags: ["Stripe", "WooCommerce", "Custom"],
  },
  {
    icon: Database,
    title: "Aplikacje webowe",
    desc: "Systemy z backendem, bazą danych, logowaniem użytkowników i panelem admina. Pełny stack.",
    tags: ["Node.js", "PostgreSQL", "Auth"],
  },
  {
    icon: Bot,
    title: "Integracje AI",
    desc: "Chatboty, automatyzacje, narzędzia oparte na LLM. Wdrażam AI tam, gdzie naprawdę pomaga.",
    tags: ["OpenAI", "Automation", "API"],
  },
  {
    icon: Smartphone,
    title: "PWA & Mobile-first",
    desc: "Aplikacje działające jak natywne na telefonie. Offline support, push notifications, szybki czas ładowania.",
    tags: ["PWA", "Mobile", "Performance"],
  },
  {
    icon: Zap,
    title: "Optymalizacja & migracja",
    desc: "Przyspieszam istniejące strony, migrowuję stare systemy na nowoczesny stack. Audyt + wdrożenie.",
    tags: ["Performance", "Migration", "Audit"],
  },
];

function ServicesSection() {
  return (
    <section id="uslugi" style={{ padding: "7rem 0" }}>
      <div className="container">
        <FadeIn>
          <div style={{ marginBottom: "4rem" }}>
            <span className="section-label">01 — Usługi</span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#f5f5f0",
                marginTop: "0.75rem",
                letterSpacing: "-0.02em",
              }}
            >
              Co mogę dla Ciebie zbudować?
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(245,245,240,0.5)",
                marginTop: "0.75rem",
                maxWidth: "480px",
              }}
            >
              Tylko wyobraźnia jest ograniczeniem. Jeśli masz pomysł — porozmawiajmy.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div
                className="project-card"
                style={{
                  padding: "2rem",
                  borderRadius: "2px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "4px",
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    color: "#4ade80",
                  }}
                >
                  <s.icon size={18} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#f5f5f0",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: "rgba(245,245,240,0.55)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {s.desc}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {s.tags.map((t) => (
                    <span key={t} className="tag-green">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01",
    title: "Cribro Journal",
    category: "Aplikacja webowa",
    desc: "Narzędzie do refleksji i śledzenia nawyków. React + Node.js + PostgreSQL. System użytkowników, dashboard, eksport danych.",
    tags: ["React", "Node.js", "PostgreSQL"],
    status: "live",
    url: "#",
  },
  {
    num: "02",
    title: "Projekt w przygotowaniu",
    category: "Landing page",
    desc: "Strona dla lokalnej firmy usługowej. Responsywna, zoptymalizowana pod SEO, z formularzem kontaktowym.",
    tags: ["React", "Tailwind", "SEO"],
    status: "soon",
    url: "#",
  },
  {
    num: "03",
    title: "Projekt w przygotowaniu",
    category: "Sklep online",
    desc: "E-commerce z integracją płatności Stripe, panelem zarządzania zamówieniami i systemem rabatów.",
    tags: ["Next.js", "Stripe", "Prisma"],
    status: "soon",
    url: "#",
  },
  {
    num: "04",
    title: "Projekt w przygotowaniu",
    category: "Aplikacja SaaS",
    desc: "Narzędzie B2B z subskrypcją, onboardingiem i integracją z zewnętrznymi API.",
    tags: ["TypeScript", "Auth", "API"],
    status: "soon",
    url: "#",
  },
];

function PortfolioSection() {
  return (
    <section
      id="portfolio"
      style={{
        padding: "7rem 0",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container">
        <FadeIn>
          <div style={{ marginBottom: "4rem" }}>
            <span className="section-label">02 — Portfolio</span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#f5f5f0",
                marginTop: "0.75rem",
                letterSpacing: "-0.02em",
              }}
            >
              Wybrane projekty
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(245,245,240,0.5)",
                marginTop: "0.75rem",
              }}
            >
              Portfolio w rozbudowie — więcej projektów pojawi się wkrótce.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.1}>
              <div
                className="project-card"
                style={{
                  padding: "2rem 2.5rem",
                  borderRadius: "2px",
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr auto",
                  gap: "2rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "rgba(74,222,128,0.25)",
                    lineHeight: 1,
                  }}
                >
                  {p.num}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "#f5f5f0",
                      }}
                    >
                      {p.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: p.status === "live" ? "#4ade80" : "rgba(245,245,240,0.3)",
                        border: `1px solid ${p.status === "live" ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)"}`,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "2px",
                      }}
                    >
                      {p.status === "live" ? "Live" : "Wkrótce"}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#4ade80",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {p.category}
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(245,245,240,0.5)",
                      lineHeight: 1.6,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {p.tags.map((t) => (
                      <span key={t} className="tag-green">{t}</span>
                    ))}
                  </div>
                </div>
                {p.status === "live" && (
                  <a
                    href={p.url}
                    style={{
                      color: "rgba(245,245,240,0.3)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ade80")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(245,245,240,0.3)")}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="o-mnie" style={{ padding: "7rem 0" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="flex flex-col md:grid"
        >
          {/* Photo */}
          <FadeIn>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "-1.5rem",
                  right: "1.5rem",
                  bottom: "1.5rem",
                  border: "1px solid rgba(74,222,128,0.15)",
                  borderRadius: "2px",
                }}
              />
              <img
                src="/manus-storage/maciej-cribro-portrait_90442823.png"
                alt="Maciej Wyrozumski"
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "2px",
                  position: "relative",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </FadeIn>

          {/* Text */}
          <div>
            <FadeIn delay={0.1}>
              <span className="section-label">03 — O mnie</span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 700,
                  color: "#f5f5f0",
                  marginTop: "0.75rem",
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Maciej Wyrozumski.
                <br />
                <span style={{ color: "#4ade80" }}>Builder.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "rgba(245,245,240,0.65)",
                  marginBottom: "1.25rem",
                }}
              >
                Jestem programistą i projektantem stron internetowych z Bielska-Białej.
                Buduję strony i aplikacje webowe, które łączą estetykę z funkcjonalnością.
                Pracuję zdalnie z klientami z całej Polski.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "rgba(245,245,240,0.65)",
                  marginBottom: "2rem",
                }}
              >
                Nie produkuję szablonowych stron. Każdy projekt traktuję indywidualnie —
                od rozmowy o celach, przez projekt, po wdrożenie i wsparcie po starcie.
                Mój stack to React, TypeScript, Node.js i PostgreSQL, ale dobór technologii
                zawsze zależy od potrzeb projektu.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div
                style={{
                  borderLeft: "2px solid #4ade80",
                  paddingLeft: "1.25rem",
                  marginBottom: "2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                    color: "rgba(245,245,240,0.7)",
                    lineHeight: 1.6,
                  }}
                >
                  "Buduję strony tak, jak sam chciałbym je mieć — szybkie, czyste
                  i bez zbędnego szumu."
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  "React, TypeScript, Next.js",
                  "Node.js, Express, PostgreSQL",
                  "Tailwind CSS, Framer Motion",
                  "Stripe, Auth, REST & GraphQL API",
                  "Integracje AI (OpenAI, Anthropic)",
                ].map((skill) => (
                  <div
                    key={skill}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                  >
                    <Check size={14} color="#4ade80" />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.9rem",
                        color: "rgba(245,245,240,0.65)",
                      }}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Starter",
    subtitle: "Dla małych firm i blogów",
    price: "od 1 200 zł",
    period: "jednorazowo",
    features: [
      "Landing page lub strona firmowa",
      "Do 5 podstron",
      "Responsywny design",
      "Formularz kontaktowy",
      "Podstawowe SEO",
      "Hosting setup",
    ],
    cta: "Zapytaj o wycenę",
    highlight: false,
  },
  {
    name: "Professional",
    subtitle: "Dla rosnących biznesów",
    price: "od 3 500 zł",
    period: "jednorazowo",
    features: [
      "Strona z CMS lub aplikacja webowa",
      "Backend + baza danych",
      "System logowania użytkowników",
      "Panel administracyjny",
      "Integracje (płatności, API)",
      "3 miesiące wsparcia",
    ],
    cta: "Zapytaj o wycenę",
    highlight: true,
  },
  {
    name: "Custom",
    subtitle: "Projekty niestandardowe",
    price: "Wycena indywidualna",
    period: "zależnie od zakresu",
    features: [
      "Systemy SaaS",
      "Aplikacje z AI",
      "Migracje i optymalizacje",
      "Sklepy e-commerce",
      "Dedykowany stack",
      "Długoterminowa współpraca",
    ],
    cta: "Porozmawiajmy",
    highlight: false,
  },
];

function PricingSection() {
  return (
    <section
      id="cennik"
      style={{
        padding: "7rem 0",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container">
        <FadeIn>
          <div style={{ marginBottom: "4rem" }}>
            <span className="section-label">04 — Cennik</span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#f5f5f0",
                marginTop: "0.75rem",
                letterSpacing: "-0.02em",
              }}
            >
              Przejrzyste pakiety
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(245,245,240,0.5)",
                marginTop: "0.75rem",
              }}
            >
              Pierwsza konsultacja (30 min) jest bezpłatna — ustalamy zakres i wycenę.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          {PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                style={{
                  background: plan.highlight ? "rgba(74,222,128,0.05)" : "#111",
                  border: `1px solid ${plan.highlight ? "rgba(74,222,128,0.35)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: "2px",
                  padding: "2.5rem 2rem",
                  position: "relative",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-0.75rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#4ade80",
                      color: "#0a0a0a",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.2rem 0.75rem",
                      borderRadius: "2px",
                      fontWeight: 600,
                    }}
                  >
                    Popularny
                  </div>
                )}

                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#4ade80",
                    marginBottom: "0.5rem",
                  }}
                >
                  {plan.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(245,245,240,0.45)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {plan.subtitle}
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#f5f5f0",
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      color: "rgba(245,245,240,0.35)",
                      marginTop: "0.3rem",
                    }}
                  >
                    {plan.period}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.65rem",
                    marginBottom: "2rem",
                  }}
                >
                  {plan.features.map((f) => (
                    <div
                      key={f}
                      style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}
                    >
                      <Check size={13} color="#4ade80" style={{ marginTop: "0.2rem", flexShrink: 0 }} />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.875rem",
                          color: "rgba(245,245,240,0.6)",
                          lineHeight: 1.5,
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#kontakt"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
                  className={plan.highlight ? "btn-primary" : "btn-secondary"}
                  style={{ width: "100%", justifyContent: "center", textAlign: "center" }}
                >
                  {plan.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "", service: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — in production connect to backend/email service
    setSent(true);
  };

  return (
    <section id="kontakt" style={{ padding: "7rem 0" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="flex flex-col md:grid"
        >
          {/* Left */}
          <FadeIn>
            <span className="section-label">05 — Kontakt</span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 700,
                color: "#f5f5f0",
                marginTop: "0.75rem",
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Zacznijmy razem
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "rgba(245,245,240,0.55)",
                marginBottom: "2.5rem",
              }}
            >
              Opisz swój projekt — odezwę się w ciągu 24 godzin.
              Pierwsza konsultacja (30 min) jest bezpłatna.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { icon: Mail, label: "maciej@cribro.pro", href: "mailto:maciej@cribro.pro" },
                { icon: Phone, label: "+48 536 524 867", href: "tel:+48536524867" },
                { icon: MapPin, label: "Bielsko-Biała · Online", href: "#" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    color: "rgba(245,245,240,0.55)",
                    transition: "color 0.2s ease",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ade80")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(245,245,240,0.55)")}
                >
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "4px",
                      background: "rgba(74,222,128,0.08)",
                      border: "1px solid rgba(74,222,128,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4ade80",
                      flexShrink: 0,
                    }}
                  >
                    <c.icon size={14} />
                  </div>
                  {c.label}
                </a>
              ))}
            </div>

            <div
              style={{
                marginTop: "3rem",
                padding: "1.5rem",
                background: "rgba(74,222,128,0.04)",
                border: "1px solid rgba(74,222,128,0.15)",
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <Code2 size={14} color="#4ade80" />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#4ade80",
                  }}
                >
                  Dostępność
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(245,245,240,0.55)",
                  lineHeight: 1.6,
                }}
              >
                Odpowiadam zwykle w ciągu 24h. Pracuję zdalnie z klientami z całej Polski.
              </p>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.15}>
            {sent ? (
              <div
                style={{
                  padding: "3rem",
                  background: "rgba(74,222,128,0.05)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: "2px",
                  textAlign: "center",
                }}
              >
                <Check size={32} color="#4ade80" style={{ margin: "0 auto 1rem" }} />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    color: "#f5f5f0",
                    marginBottom: "0.75rem",
                  }}
                >
                  Wiadomość wysłana!
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(245,245,240,0.55)",
                  }}
                >
                  Odezwę się w ciągu 24 godzin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { id: "name", label: "Imię i nazwisko *", type: "text", placeholder: "Jan Kowalski" },
                  { id: "email", label: "E-mail *", type: "email", placeholder: "jan@firma.pl" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      style={{
                        display: "block",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(245,245,240,0.45)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={(form as any)[field.id]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "2px",
                        padding: "0.75rem 1rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.9rem",
                        color: "#f5f5f0",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(74,222,128,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="service"
                    style={{
                      display: "block",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(245,245,240,0.45)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Rodzaj projektu
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#111",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2px",
                      padding: "0.75rem 1rem",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(245,245,240,0.7)",
                      outline: "none",
                    }}
                  >
                    <option value="">Wybierz...</option>
                    <option value="landing">Strona / Landing page</option>
                    <option value="app">Aplikacja webowa</option>
                    <option value="shop">Sklep online</option>
                    <option value="other">Inne</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(245,245,240,0.45)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Opisz projekt *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Czego potrzebujesz? Im więcej szczegółów, tym lepsza wycena."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2px",
                      padding: "0.75rem 1rem",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "#f5f5f0",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(74,222,128,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
                  Wyślij zapytanie <ArrowRight size={16} />
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
