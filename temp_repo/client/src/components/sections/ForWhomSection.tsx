/* =============================================================
   DESIGN: Dark Constellation — For Whom Section
   Tabs: Dla firm | Dla osób indywidualnych
   6 kafelków w każdej zakładce, siatka 3×2
   ============================================================= */

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Presentation, Mail, Phone, UserPlus, Mic2, MessageSquare,
  Users, Globe, BookOpen, Brain, Mic, Headphones
} from "lucide-react";

const businessGroups = [
  {
    icon: Presentation,
    pl: { title: "Spotkania i meeting-i", desc: "Prowadzenie i udział w spotkaniach po angielsku — bez stresu, z pewnością siebie i jasnym przekazem." },
    en: { title: "Meetings & Conferences", desc: "Leading and participating in meetings in English — without stress, with confidence and a clear message." },
  },
  {
    icon: Mail,
    pl: { title: "Korespondencja biznesowa", desc: "Maile, raporty, prezentacje — angielski pisany, który brzmi profesjonalnie i nie wymaga tłumacza." },
    en: { title: "Business Correspondence", desc: "Emails, reports, presentations — written English that sounds professional and doesn't need a translator." },
  },
  {
    icon: Phone,
    pl: { title: "Rozmowy z klientami zagranicznymi", desc: "Negocjacje, ofertowanie, obsługa klienta — angielski, który buduje zaufanie i zamyka deale." },
    en: { title: "International Client Calls", desc: "Negotiations, proposals, client service — English that builds trust and closes deals." },
  },
  {
    icon: UserPlus,
    pl: { title: "Onboarding pracowników", desc: "Angielski dla nowych osób wchodzących w międzynarodowe środowisko — szybki start, pewna komunikacja." },
    en: { title: "Employee Onboarding", desc: "English for new hires entering an international environment — fast start, confident communication." },
  },
  {
    icon: Mic2,
    pl: { title: "Prezentacje i pitche", desc: "Pewność siebie przy wystąpieniach po angielsku — struktura, wymowa, kontakt z publicznością." },
    en: { title: "Presentations & Pitches", desc: "Confidence when presenting in English — structure, pronunciation, audience connection." },
  },
  {
    icon: MessageSquare,
    pl: { title: "Codzienna komunikacja w zespole", desc: "Slack, Teams, daily stand-upy po angielsku — płynna komunikacja w wielojęzycznym środowisku pracy." },
    en: { title: "Daily Team Communication", desc: "Slack, Teams, daily stand-ups in English — smooth communication in a multilingual work environment." },
  },
];

const individualGroups = [
  {
    icon: Users,
    pl: { title: "Dorośli — angielski ogólny", desc: "Wróć do angielskiego bez presji i chaosu. Konwersacje, gramatyka i pewność siebie w mówieniu. 30 minut dziennie wystarczy." },
    en: { title: "Adults — General English", desc: "Return to English without pressure or chaos. Conversations, grammar, and confidence in speaking. 30 minutes a day is enough." },
  },
  {
    icon: Mic,
    pl: { title: "Pronunciation Coaching", desc: "Popraw wymowę, rytm wypowiedzi i akcent. Specjalizuję się w fonetyce i naturalnym brzmieniu." },
    en: { title: "Pronunciation Coaching", desc: "Improve your pronunciation, speech rhythm, and accent. I specialize in phonetics and natural sound." },
  },
  {
    icon: Globe,
    pl: { title: "Polacy za granicą", desc: "Mieszkasz za granicą i chcesz podszlifować angielski? Pracujemy online — bez ograniczeń geograficznych." },
    en: { title: "Poles Living Abroad", desc: "Living abroad and want to polish your English? We work online — no geographic limits." },
  },
  {
    icon: BookOpen,
    pl: { title: "Osoby wyjeżdżające", desc: "Planujesz wyjazd do pracy, studiów lub emigrację? Przygotujemy Cię językowo na nowe środowisko." },
    en: { title: "Travellers & Expats", desc: "Planning to work, study, or emigrate abroad? I'll prepare you linguistically for your new environment." },
  },
  {
    icon: Brain,
    pl: { title: "ADHD i neuroróżnorodność", desc: "Mam ADHD. Wiem, jak uczy się mózg, który nie znosi nudy i chaosu. Jasna struktura, krótkie bloki, zero zbędnego szumu." },
    en: { title: "ADHD & Neurodiversity", desc: "I have ADHD. I know how a brain learns when it hates boredom and chaos. Clear structure, short blocks, zero unnecessary noise." },
  },
  {
    icon: Headphones,
    pl: { title: "Angielski online", desc: "Wszystkie zajęcia prowadzę zdalnie — Zoom, Teams, Google Meet. Uczysz się z dowolnego miejsca na świecie." },
    en: { title: "Online English", desc: "All lessons are conducted remotely — Zoom, Teams, Google Meet. Learn from anywhere in the world." },
  },
];

export default function ForWhomSection() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"business" | "individual">("business");

  const groups = activeTab === "business" ? businessGroups : individualGroups;

  return (
    <section id="for-whom" className="py-24 bg-card/30">
      <div className="container">
        {/* Header */}
        <div className="relative mb-10">
          <span className="deco-number">02</span>
          <p className="section-label mb-3">{t("Dla kogo", "For Whom")}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground max-w-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("Kto skorzysta na moich zajęciach?", "Who benefits from my lessons?")}
          </h2>
          <p className="text-sm text-muted-foreground mt-4 max-w-xl">
            {t(
              "Nie uczę wszystkich jednakowo. Każda osoba i każdy zespół dostaje system dopasowany do swojego celu.",
              "I don't teach everyone the same way. Each person and team gets a system tailored to their goal."
            )}
          </p>
          <div className="rule-ink mt-6 max-w-xs" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setActiveTab("business")}
            className={`px-5 py-2.5 text-sm font-semibold rounded-sm border transition-all duration-200 ${
              activeTab === "business"
                ? "bg-primary text-background border-primary"
                : "bg-transparent text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("Dla firm", "For Companies")}
          </button>
          <button
            onClick={() => setActiveTab("individual")}
            className={`px-5 py-2.5 text-sm font-semibold rounded-sm border transition-all duration-200 ${
              activeTab === "individual"
                ? "bg-primary text-background border-primary"
                : "bg-transparent text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("Dla osób indywidualnych", "For Individuals")}
          </button>
        </div>

        {/* Cards grid — bez reveal animation, karty zawsze widoczne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group, idx) => {
            const data = lang === "pl" ? group.pl : group.en;
            const Icon = group.icon;
            return (
              <div
                key={`${activeTab}-${idx}`}
                className="card-glow bg-card rounded-sm p-6 border border-border/60 hover:border-primary/35 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.45s cubic-bezier(0.22,1,0.36,1) both`,
                  animationDelay: `${idx * 70}ms`,
                }}
              >
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3
                  className="text-base font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
                >
                  {data.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
