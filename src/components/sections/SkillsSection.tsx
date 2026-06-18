/* =============================================================
   DESIGN: Dark Editorial — Skills Section
   Two columns: IT/AI skills (green) + Language skills (amber)
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";

const itSkills = [
  { name: "Python", level: 55, note: { pl: "Rozumiem składnię, buduję z AI", en: "Understand syntax, build with AI" } },
  { name: "JavaScript / React", level: 45, note: { pl: "Ogólne rozumienie", en: "General understanding" } },
  { name: "SQL / Supabase", level: 50, note: { pl: "Budowanie baz danych z AI, obsługa Supabase", en: "Building databases with AI, Supabase management" } },
  { name: "AI-assisted coding", level: 85, note: { pl: "Cursor, Claude, GPT-4", en: "Cursor, Claude, GPT-4" } },
  { name: "Prompt Engineering", level: 80, note: { pl: "Projektowanie promptów", en: "Prompt design & optimization" } },
  { name: "No-code / Low-code", level: 75, note: { pl: "Manus, Bolt, Lovable", en: "Manus, Bolt, Lovable" } },
];

const langSkills = [
  { name: "English Teaching", level: 95, note: { pl: "10 lat, C2", en: "10 years, C2 level" } },
  { name: "Curriculum Design", level: 80, note: { pl: "Tworzenie programów nauczania", en: "Course & program design" } },
  { name: "Business English", level: 90, note: { pl: "Korporacje i startupy", en: "Corporations & startups" } },
  { name: "ADHD-friendly Teaching", level: 85, note: { pl: "Metodyki dla ADHD", en: "ADHD-adapted methodologies" } },
  { name: "Online Tutoring", level: 90, note: { pl: "Zoom, Teams, platformy", en: "Zoom, Teams, platforms" } },
];

interface SkillBarProps {
  name: string;
  level: number;
  note: string;
  color: "green" | "amber";
}

function SkillBar({ name, level, note, color }: SkillBarProps) {
  const barColor = color === "green"
    ? "bg-primary"
    : "bg-accent";
  const textColor = color === "green"
    ? "text-primary"
    : "text-accent";

  return (
    <div className="group">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-medium text-foreground/90" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {name}
        </span>
        <span className={`text-xs font-mono ${textColor}`} style={{ fontFamily: "'Fira Code', monospace" }}>
          {level}%
        </span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-1000`}
          style={{ width: `${level}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {note}
      </p>
    </div>
  );
}

export default function SkillsSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />

      <div className="container relative">
        {/* Section number background */}
        <span className="section-number">02</span>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span
            className="text-xs tracking-[0.3em] uppercase text-primary"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {t("Umiejętności", "Skills")}
          </span>
          <div className="flex-1 separator-gradient" />
        </div>

        <h2
          className="text-4xl md:text-5xl font-semibold text-foreground mb-16"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t("Co potrafię", "What I do")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* IT & AI column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h3
                className="text-xl font-semibold text-foreground"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Technologia & AI", "Technology & AI")}
              </h3>
            </div>
            <div className="space-y-6">
              {itSkills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  note={lang === "pl" ? skill.note.pl : skill.note.en}
                  color="green"
                />
              ))}
            </div>

            {/* Note */}
            <p className="mt-6 text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t(
                "Nie jestem klasycznym programistą. Rozumiem kod, buduję z pomocą AI i wiem, jak zadawać właściwe pytania.",
                "I'm not a classic developer. I understand code, build with AI assistance, and know how to ask the right questions."
              )}
            </p>
          </div>

          {/* Language column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <h3
                className="text-xl font-semibold text-foreground"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Nauczanie języka angielskiego", "English Language Teaching")}
              </h3>
            </div>
            <div className="space-y-6">
              {langSkills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  note={lang === "pl" ? skill.note.pl : skill.note.en}
                  color="amber"
                />
              ))}
            </div>

            {/* Note */}
            <p className="mt-6 text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t(
                "Pracowałem z uczniami na każdym poziomie — od A1 do C2. Specjalizuję się w Business English i metodykach przyjaznych ADHD.",
                "I've worked with students at every level — from A1 to C2. I specialize in Business English and ADHD-friendly methodologies."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
