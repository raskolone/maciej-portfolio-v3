/* =============================================================
   DESIGN: Nocturne Green — Cennik
   Zakładki: Dla firm | Dla osób indywidualnych.

   Karty zamiast listy wierszy: wariantów jest teraz kilka, jeden z nich
   jest wyraźnie rekomendowany, a każdy niesie dwie liczby — miesięczną
   i godzinową. W wierszu obie walczyłyby o to samo miejsce po prawej.
   Na karcie kwota miesięczna jest dominantą, stawka godzinowa siedzi pod
   nią drobnym drukiem, więc warianty da się porównać jednym spojrzeniem.

   Nazwy „Rytm” i „Rozpęd” niosą różnicę intensywności bez tłumaczenia:
   pierwsza utrzymuje kontakt z językiem, druga buduje tempo.
   ============================================================= */

import { useState } from "react";
import ScrollHint from "@/components/ScrollHint";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToSelector } from "@/lib/scrollTo";
import CardRail from "@/components/CardRail";
import { Check } from "lucide-react";

interface Plan {
  /** Wyróżniona karta — miętowa ramka i poświata. */
  featured?: boolean;
  pl: Copy;
  en: Copy;
}

interface Copy {
  name: string;
  /** Częstotliwość albo zakres — jedna linijka pod nazwą. */
  cadence: string;
  /** Dominanta karty. */
  price: string;
  /** Jednostka przy dominancie, np. „/mies.”. */
  unit?: string;
  /** Drobny druk pod ceną. */
  rate: string;
  bullets: string[];
}

const businessPlans: Plan[] = [
  {
    pl: {
      name: "Rytm", cadence: "1 × w tygodniu", price: "516 zł", unit: "/mies.",
      rate: "129 zł za 60 minut",
      bullets: ["4 lekcje w miesiącu", "umowa na 3 miesiące", "materiały w cenie"],
    },
    en: {
      name: "Rhythm", cadence: "once a week", price: "PLN 516", unit: "/mo.",
      rate: "PLN 129 per 60 minutes",
      bullets: ["4 lessons a month", "3-month agreement", "materials included"],
    },
  },
  {
    featured: true,
    pl: {
      name: "Rozpęd", cadence: "2 × w tygodniu", price: "952 zł", unit: "/mies.",
      rate: "119 zł za 60 minut",
      bullets: ["8 lekcji w miesiącu", "umowa na 3 miesiące", "materiały w cenie"],
    },
    en: {
      name: "Momentum", cadence: "twice a week", price: "PLN 952", unit: "/mo.",
      rate: "PLN 119 per 60 minutes",
      bullets: ["8 lessons a month", "3-month agreement", "materials included"],
    },
  },
  {
    pl: {
      name: "Grupa", cadence: "2–4 osoby", price: "75–60 zł", unit: "/os.",
      rate: "za osobę, za 60 minut",
      bullets: ["2 osoby — 75 zł za osobę", "3 osoby — 65 zł za osobę", "4 osoby — 60 zł za osobę"],
    },
    en: {
      name: "Group", cadence: "2–4 people", price: "PLN 75–60", unit: "/person",
      rate: "per person, per 60 minutes",
      bullets: ["2 people — PLN 75 each", "3 people — PLN 65 each", "4 people — PLN 60 each"],
    },
  },
];

const individualPlans: Plan[] = [
  {
    pl: {
      name: "Pojedyncza lekcja", cadence: "bez zobowiązania", price: "119 zł",
      rate: "online, 60 minut",
      bullets: ["139 zł stacjonarnie", "bez umowy", "dobra na pierwszy raz"],
    },
    en: {
      name: "Single lesson", cadence: "no commitment", price: "PLN 119",
      rate: "online, 60 minutes",
      bullets: ["PLN 139 in person", "no agreement", "good for a first try"],
    },
  },
  {
    pl: {
      name: "Rytm", cadence: "1 × w tygodniu", price: "436 zł", unit: "/mies.",
      rate: "109 zł za 60 minut",
      bullets: ["4 lekcje w miesiącu", "pakiet na 3 miesiące", "równe raty miesięczne"],
    },
    en: {
      name: "Rhythm", cadence: "once a week", price: "PLN 436", unit: "/mo.",
      rate: "PLN 109 per 60 minutes",
      bullets: ["4 lessons a month", "3-month package", "equal monthly instalments"],
    },
  },
  {
    featured: true,
    pl: {
      name: "Rozpęd", cadence: "2 × w tygodniu", price: "792 zł", unit: "/mies.",
      rate: "99 zł za 60 minut",
      bullets: ["8 lekcji w miesiącu", "pakiet na 3 miesiące", "równe raty miesięczne"],
    },
    en: {
      name: "Momentum", cadence: "twice a week", price: "PLN 792", unit: "/mo.",
      rate: "PLN 99 per 60 minutes",
      bullets: ["8 lessons a month", "3-month package", "equal monthly instalments"],
    },
  },
  {
    pl: {
      name: "Grupa", cadence: "2–4 osoby", price: "75–60 zł", unit: "/os.",
      rate: "za osobę, za 60 minut",
      bullets: ["2 osoby — 75 zł za osobę", "3 osoby — 65 zł za osobę", "4 osoby — 60 zł za osobę"],
    },
    en: {
      name: "Group", cadence: "2–4 people", price: "PLN 75–60", unit: "/person",
      rate: "per person, per 60 minutes",
      bullets: ["2 people — PLN 75 each", "3 people — PLN 65 each", "4 people — PLN 60 each"],
    },
  },
];

/* Przypisy pod kartami. Sześćdziesiąt minut podpieram tą samą zasadą, co
   resztę strony — to nie jest arbitralny format, tylko konsekwencja metody. */
const businessNotes = [
  { pl: "Lekcja trwa 60 minut — tyle uwagi mózg utrzymuje bez przeciążenia. 90 minut po indywidualnej wycenie.",
    en: "A lesson runs 60 minutes — as long as attention holds without overload. 90 minutes on request, priced individually." },
  { pl: "Zwolnienie podmiotowe z VAT — faktura bez VAT.",
    en: "Exempt from VAT under the small-business threshold — invoice issued without VAT." },
  { pl: "Zajęcia stacjonarne w Bielsku-Białej — 139 zł.",
    en: "In-person lessons in Bielsko-Biała — PLN 139." },
  { pl: "Ceny orientacyjne. Zakres i warunki ustalamy po rozmowie.",
    en: "Indicative prices. Scope and terms are agreed after we talk." },
];

const individualNotes = [
  { pl: "Lekcja trwa 60 minut — tyle uwagi mózg utrzymuje bez przeciążenia. 90 minut po indywidualnej wycenie.",
    en: "A lesson runs 60 minutes — as long as attention holds without overload. 90 minutes on request, priced individually." },
  { pl: "Zajęcia stacjonarne w Bielsku-Białej — 139 zł.",
    en: "In-person lessons in Bielsko-Biała — PLN 139." },
  { pl: "Materiały w cenie — nie kupujesz podręcznika.",
    en: "Materials included — no coursebook to buy." },
  { pl: "Ceny orientacyjne. Plan ustalamy po rozmowie, pod Twój cel.",
    en: "Indicative prices. We set the plan after we talk, around your goal." },
];

export default function PricingSection() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"business" | "individual">("business");

  const plans = activeTab === "business" ? businessPlans : individualPlans;
  const notes = activeTab === "business" ? businessNotes : individualNotes;

  const tabStyle = (active: boolean) => ({
    // 44 px to najmniejszy cel, w który palec trafia bez celowania.
    display: "inline-flex",
    alignItems: "center",
    minHeight: "44px",
    padding: "9px 20px",
    borderRadius: "var(--r-pill)",
    font: "600 13px var(--font-body)",
    border: active ? "1px solid var(--accent-base)" : "1px solid var(--line-strong)",
    background: active ? "var(--accent-base)" : "rgba(255,255,255,0.03)",
    color: active ? "var(--accent-ink)" : "var(--text-2)",
    transition: "background var(--t), color var(--t), border-color var(--t)",
  });

  return (
    <section id="pricing" className="relative section-screen overflow-hidden">
      <div className="container">

        <span className="label" data-anim>{t("Cennik", "Pricing")}</span>
        <h2 data-anim style={{ fontSize: "var(--fs-section-h2)", margin: "12px 0 24px", maxWidth: "620px" }}>
          {t("Przejrzyste ceny, bez ukrytych opłat", "Transparent pricing, no hidden fees")}
        </h2>

        <div className="flex flex-wrap gap-3 mb-7" data-anim="left">
          <button onClick={() => setActiveTab("business")} style={tabStyle(activeTab === "business")}>
            {t("Dla firm", "For Companies")}
          </button>
          <button onClick={() => setActiveTab("individual")} style={tabStyle(activeTab === "individual")}>
            {t("Dla osób indywidualnych", "For Individuals")}
          </button>
        </div>

        {/* Karty. Zakładka firmowa ma trzy warianty, indywidualna cztery —
            stąd liczba kolumn idzie za danymi, a nie jest wpisana na sztywno.
            Na telefonie CardRail zamienia siatkę w karuzelę.
            Cztery kolumny wchodzą już od 1024 px, nie od 1280: przy siatce
            2×2 sekcja rosła do 1090 px i snap dokładał jej drugi przystanek. */}
        <CardRail
          count={plans.length}
          resetKey={activeTab}
          className={`grid gap-4 sm:grid-cols-2 ${plans.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"} mb-7`}
        >
          {plans.map((plan, i) => {
            const c = lang === "pl" ? plan.pl : plan.en;
            return (
              <div key={`${activeTab}-${i}`} data-anim className="h-full">
                {/* Powierzchnia karty siedzi w arkuszu (.plan-card), nie w stylu
                    inline: wspólny hover całej strony podmienia ramkę i cień,
                    a styl inline wygrywa z każdą regułą arkusza i blokowałby to. */}
                <div className={`plan-card${plan.featured ? " plan-card--featured" : ""}`}>
                  {/* Plakietka trzyma wysokość także tam, gdzie jej nie ma,
                      inaczej wyróżniona karta byłaby przesunięta o 24 px. */}
                  <div style={{ minHeight: "24px", marginBottom: "6px" }}>
                    {plan.featured && (
                      <span className="tag-green" style={{ fontSize: "10px", padding: "3px 10px", letterSpacing: "0.08em" }}>
                        {t("Najczęściej wybierane", "Most popular")}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: "var(--fs-h3)", margin: 0 }}>{c.name}</h3>
                  <p className="label" style={{ margin: "6px 0 16px" }}>{c.cadence}</p>

                  <p style={{ margin: 0, lineHeight: 1 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(28px, 3vw, 34px)",
                        fontWeight: 700,
                        color: plan.featured ? "var(--accent-text)" : "var(--text-hi)",
                      }}
                    >
                      {c.price}
                    </span>
                    {c.unit && (
                      <span style={{ fontSize: "14px", color: "var(--text-2)", marginLeft: "4px" }}>{c.unit}</span>
                    )}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-mute)", margin: "7px 0 16px" }}>{c.rate}</p>

                  <div style={{ height: "1px", background: "var(--line)", marginBottom: "14px" }} />

                  <ul className="flex flex-col gap-2">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check size={13} style={{ color: "var(--accent-base)", marginTop: "3px", flexShrink: 0 }} />
                        <span style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.45 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </CardRail>

        {/* Przypisy i CTA — jedno pasmo pod kartami zamiast karty bocznej,
            która przy czterech wariantach nie miałaby gdzie stanąć. */}
        <div
          data-anim
          className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8"
          style={{
            padding: "20px 22px",
            borderRadius: "var(--r-xl)",
            background: "var(--surface-2)",
            border: "1px solid var(--line)",
          }}
        >
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 flex-1">
            {notes.map((note) => (
              <li key={note.pl} className="flex items-start gap-2.5">
                <Check size={13} style={{ color: "var(--accent-base)", marginTop: "3px", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.45 }}>
                  {t(note.pl, note.en)}
                </span>
              </li>
            ))}
          </ul>

          <div className="lg:shrink-0 lg:max-w-[240px]">
            <p style={{ fontSize: "12px", color: "var(--text-mute)", lineHeight: 1.5, margin: "0 0 12px" }}>
              {t(
                "Pierwsza konsultacja (30 min) jest bezpłatna — poznajemy się i ustalamy plan.",
                "The first consultation (30 min) is free — we get to know each other and set a plan."
              )}
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSelector("#contact"); }}
              className="btn-primary w-full justify-center"
              style={{ padding: "11px 22px" }}
            >
              {t("Umów bezpłatną konsultację", "Book a free consultation")}
            </a>
          </div>
        </div>

      </div>

      {/* „Przewiń niżej” — patrz components/ScrollHint. */}
      <ScrollHint to="#faq" />
    </section>
  );
}
