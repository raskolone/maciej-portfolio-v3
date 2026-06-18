/* =============================================================
   DESIGN: Dark Editorial — Projects Section
   Cards with hover glow, project image, tags, links
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, Github } from "lucide-react";

const SELAVIE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663489474725/R7k6sYKTkLq9Ymom2yutju/selavie-project-card-TyxKqPBFcBnZhRA5rrNPkP.webp";

interface Project {
  id: string;
  titlePl: string;
  titleEn: string;
  descPl: string;
  descEn: string;
  tags: string[];
  tagType: "tech" | "lang" | "mixed";
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "live" | "wip" | "planned";
}

const projects: Project[] = [
  {
    id: "selavie",
    titlePl: "SelaVie — Nawyki & Czas",
    titleEn: "SelaVie — Habits & Time",
    descPl: "Aplikacja do zarządzania nawykami i czasem, zaprojektowana z myślą o osobach z ADHD. Minimalistyczny interfejs, jasne priorytety, zero chaosu.",
    descEn: "A habit and time management app designed for people with ADHD. Minimalist interface, clear priorities, zero chaos.",
    tags: ["React", "Python", "AI-assisted", "EdTech", "ADHD-friendly"],
    tagType: "mixed",
    image: SELAVIE_IMG,
    status: "wip",
  },
  {
    id: "english-platform",
    titlePl: "Platforma Angielskiego",
    titleEn: "English Learning Platform",
    descPl: "Platforma do nauki angielskiego łącząca AI z metodami coachingowymi. W planach: rejestracja użytkowników, lekcje online, śledzenie postępów.",
    descEn: "An English learning platform combining AI with coaching methods. Planned: user registration, online lessons, progress tracking.",
    tags: ["EdTech", "English", "AI", "Coming soon"],
    tagType: "lang",
    status: "planned",
  },
  {
    id: "portfolio",
    titlePl: "To portfolio",
    titleEn: "This portfolio",
    descPl: "Strona, którą właśnie oglądasz. Zbudowana z React, Tailwind CSS i AI. Dwujęzyczna, minimalistyczna, rozwijana iteracyjnie.",
    descEn: "The site you're looking at right now. Built with React, Tailwind CSS and AI. Bilingual, minimalist, iteratively developed.",
    tags: ["React", "Tailwind", "TypeScript", "AI-built"],
    tagType: "tech",
    status: "live",
  },
];

const statusConfig = {
  live: { pl: "Aktywny", en: "Live", color: "text-primary border-primary/40 bg-primary/10" },
  wip: { pl: "W budowie", en: "In progress", color: "text-accent border-accent/40 bg-accent/10" },
  planned: { pl: "Planowany", en: "Planned", color: "text-muted-foreground border-border bg-muted/20" },
};

export default function ProjectsSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container">
        {/* Section number background */}
        <span className="section-number">03</span>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span
            className="text-xs tracking-[0.3em] uppercase text-primary"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {t("Projekty", "Projects")}
          </span>
          <div className="flex-1 separator-gradient" />
        </div>

        <h2
          className="text-4xl md:text-5xl font-semibold text-foreground mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t("Co buduję", "What I'm building")}
        </h2>
        <p className="text-muted-foreground mb-16 max-w-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {t(
            "Projekty w różnych fazach — od aktywnych do planowanych. Lista będzie rosnąć.",
            "Projects at various stages — from active to planned. The list will grow."
          )}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const status = statusConfig[project.status];
            return (
              <div
                key={project.id}
                className="card-hover rounded-lg overflow-hidden bg-card flex flex-col"
              >
                {/* Image */}
                {project.image ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={lang === "pl" ? project.titlePl : project.titleEn}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-card to-secondary flex items-center justify-center">
                    <span className="text-4xl text-muted-foreground/20" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {(lang === "pl" ? project.titlePl : project.titleEn).charAt(0)}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded border ${status.color}`}
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {lang === "pl" ? status.pl : status.en}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-semibold text-foreground mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {lang === "pl" ? project.titlePl : project.titleEn}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {lang === "pl" ? project.descPl : project.descEn}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={project.tagType === "lang" ? "lang-tag" : "tech-tag"}
                        style={{ fontSize: "0.65rem" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          <Github size={14} />
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          <ExternalLink size={14} />
                          {t("Zobacz", "View")}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border border-border rounded text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <Github size={16} />
            {t("Zobacz wszystkie projekty na GitHub", "View all projects on GitHub")}
          </a>
        </div>
      </div>
    </section>
  );
}
