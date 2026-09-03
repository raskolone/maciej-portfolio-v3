/* =============================================================
   DESIGN: Nocturne Green — For Whom Section
   Tabs: Dla firm | Dla osób indywidualnych
   6 kafelków w każdej zakładce, siatka auto-fit — 3×2 na desktopie.
   Treść kafla wyśrodkowana w poziomie (referencja miała ją do lewej).
   Kafle wchodzą kaskadą przy wejściu w sekcję (patrz Home.tsx).
   ============================================================= */

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Presentation, Mail, Phone, UserPlus, Mic2, MessageSquare,
  RotateCcw, MessageCircle, Mic, Brain, Plane, Headphones,
  type LucideIcon,
} from "lucide-react";

interface Group {
  icon: LucideIcon;
  pl: { title: string; desc: string };
  en: { title: string; desc: string };
}

const businessGroups: Group[] = [
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

/* Ta zakładka mówi do jednej osoby, nie do działu HR — stąd inny ton
   niż w wariancie B2B: bezpośredni, bez raportów i faktur. */
const individualGroups: Group[] = [
  {
    icon: RotateCcw,
    pl: { title: "Powrót do nauki po latach", desc: "Uczyłeś się angielskiego w szkole i od tamtej pory cisza? Zaczynamy od tego, co zostało w głowie — a zostało więcej, niż myślisz." },
    en: { title: "Coming back after years", desc: "You learned English at school and it has been quiet ever since? We start from what stayed in your head — and more stayed there than you think." },
  },
  {
    icon: MessageCircle,
    pl: { title: "Pewność siebie w mówieniu", desc: "Rozumiesz wszystko, ale gdy trzeba się odezwać, gardło się zaciska. Pracujemy nad tym, żebyś mówił, zanim zdążysz się rozmyślić." },
    en: { title: "Confidence in speaking", desc: "You understand everything, but the moment you have to speak, your throat tightens. We work so that you speak before you can talk yourself out of it." },
  },
  {
    icon: Mic,
    pl: { title: "Wymowa i akcent", desc: "Chcesz brzmieć naturalnie, nie tylko poprawnie. Fonetyka to moja specjalizacja — pokażę Ci, gdzie leży różnica." },
    en: { title: "Pronunciation & accent", desc: "You want to sound natural, not just correct. Phonetics is my specialisation — I'll show you where the difference lies." },
  },
  {
    icon: Brain,
    pl: { title: "Rozproszony umysł i ADHD", desc: "Mam zdiagnozowane ADHD. Wiem, jak uczy się mózg, który nie znosi nudy i chaosu: krótkie bloki, jeden cel na lekcję, zero zbędnego szumu." },
    en: { title: "A scattered mind & ADHD", desc: "I have diagnosed ADHD. I know how a brain learns when it can't stand boredom and chaos: short blocks, one goal per lesson, zero unnecessary noise." },
  },
  {
    icon: Plane,
    pl: { title: "Przygotowanie do wyjazdu", desc: "Praca, studia, przeprowadzka. Ćwiczymy angielski, którego naprawdę użyjesz w pierwszym miesiącu — nie ten z podręcznika." },
    en: { title: "Getting ready to leave", desc: "Work, studies, moving abroad. We practise the English you'll actually use in your first month — not the textbook kind." },
  },
  {
    icon: Headphones,
    pl: { title: "Angielski online, gdziekolwiek jesteś", desc: "Zoom, Teams, Meet. Uczę też Polaków mieszkających za granicą — strefa czasowa to detal do ustalenia." },
    en: { title: "English online, wherever you are", desc: "Zoom, Teams, Meet. I also teach Poles living abroad — the time zone is a detail we'll sort out." },
  },
];

export default function ForWhomSection() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"business" | "individual">("business");

  const groups = activeTab === "business" ? businessGroups : individualGroups;

  const tabStyle = (active: boolean) => ({
    padding: "9px 20px",
    borderRadius: "var(--r-pill)",
    font: "600 13px var(--font-body)",
    border: active ? "1px solid var(--accent-base)" : "1px solid var(--line-strong)",
    background: active ? "var(--accent-base)" : "rgba(255,255,255,0.03)",
    color: active ? "var(--accent-ink)" : "var(--text-2)",
    transition: "background var(--t), color var(--t), border-color var(--t)",
  });

  return (
    <section id="for-whom" className="section-band" style={{ padding: "80px 0" }}>
      <div className="container">
        {/* Header */}
        <span className="label" data-anim>{t("Dla kogo", "For Whom")}</span>
        <h2
          data-anim
          style={{
            fontSize: "clamp(30px, 4vw, 44px)",
            margin: "12px 0 16px",
            maxWidth: "560px",
          }}
        >
          {t("Kto skorzysta na moich zajęciach?", "Who benefits from my lessons?")}
        </h2>
        <p
          data-anim
          style={{
            color: "var(--text-2)",
            fontSize: "var(--fs-body)",
            maxWidth: "600px",
            margin: "0 0 32px",
          }}
        >
          {t(
            "Nie uczę wszystkich jednakowo. Każda osoba i każdy zespół dostaje system dopasowany do swojego celu.",
            "I don't teach everyone the same way. Each person and team gets a system tailored to their goal."
          )}
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8" data-anim="left">
          <button onClick={() => setActiveTab("business")} style={tabStyle(activeTab === "business")}>
            {t("Dla firm", "For Companies")}
          </button>
          <button onClick={() => setActiveTab("individual")} style={tabStyle(activeTab === "individual")}>
            {t("Dla osób indywidualnych", "For Individuals")}
          </button>
        </div>

        {/* Cards grid */}
        {/* Stałe 1/2/3 kolumny zamiast auto-fit: sześć kart dzieli się wtedy
            równo na każdej szerokości (6×1, 3×2, 2×3), a nie w poszarpane
            4+2, gdy do rzędu zmieści się czwarta kolumna. */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, idx) => {
            const data = lang === "pl" ? group.pl : group.en;
            const Icon = group.icon;
            return (
              <div key={`${activeTab}-${idx}`} data-anim>
                <div className="card-surface text-center h-full">
                  <div className="icon-tile mb-4 mx-auto" style={{ width: "40px", height: "40px" }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: "var(--fs-h4)", margin: "0 0 8px" }}>{data.title}</h3>
                  <p
                    style={{
                      fontSize: "var(--fs-sm)",
                      color: "var(--text-3)",
                      lineHeight: "var(--lh-body)",
                      margin: 0,
                    }}
                  >
                    {data.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
