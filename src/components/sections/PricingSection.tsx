/* =============================================================
   DESIGN: Nocturne Green — Pricing Section
   Tabs: Dla firm | Dla osób indywidualnych
   Lista pakietów (2fr) + karta boczna "Co zawiera cena?" (1fr)
   ============================================================= */

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToSelector } from "@/lib/scrollTo";
import { Check } from "lucide-react";

const businessPricing = [
  {
    pl: { name: "Pakiet Indywidualny B2B", duration: "4 × 60 min/mies.", price: "560 zł/mies.", note: "1 pracownik — materiały + raport HR + faktura VAT" },
    en: { name: "B2B Individual Package", duration: "4 × 60 min/mo.", price: "PLN 560/mo.", note: "1 employee — materials + HR report + VAT invoice" },
    highlight: true,
  },
  {
    pl: { name: "Pakiet Zespołowy", duration: "4 × 60 min/mies.", price: "od 200 zł/os./mies.", note: "2–4 osoby — materiały branżowe + raport HR + faktura VAT" },
    en: { name: "Team Package", duration: "4 × 60 min/mo.", price: "from PLN 200/person/mo.", note: "2–4 people — industry materials + HR report + VAT invoice" },
    highlight: false,
  },
  {
    pl: { name: "Pakiet Korporacyjny", duration: "wycena indywidualna", price: "od 150 zł/os./mies.", note: "5+ osób — analiza potrzeb + raporty kwartalne + faktura VAT" },
    en: { name: "Corporate Package", duration: "custom quote", price: "from PLN 150/person/mo.", note: "5+ people — needs analysis + quarterly reports + VAT invoice" },
    highlight: false,
  },
];

const businessNotes = [
  { pl: "Faktura VAT — koszt firmowy, odliczenie od podatku", en: "VAT invoice — deductible business expense" },
  { pl: "Raport HR co miesiąc — mierzalne efekty", en: "Monthly HR report — measurable results" },
  { pl: "Materiały branżowe dopasowane do firmy", en: "Industry materials tailored to your company" },
  { pl: "Elastyczne terminy — online bez kosztów dojazdu", en: "Flexible schedule — online, no travel costs" },
];

const individualPricing = [
  {
    pl: { name: "Lekcja indywidualna online", duration: "60 min", price: "120 zł", note: "Najczęściej wybierana" },
    en: { name: "Individual lesson online", duration: "60 min", price: "PLN 120", note: "Most popular" },
    highlight: true,
  },
  {
    pl: { name: "Lekcja stacjonarna", duration: "60 min", price: "140 zł", note: "Bielsko-Biała i okolice" },
    en: { name: "In-person lesson", duration: "60 min", price: "PLN 140", note: "Bielsko-Biała area" },
    highlight: false,
  },
  {
    pl: { name: "Pakiet 4 lekcji online", duration: "4 × 60 min", price: "400 zł", note: "Oszczędzasz 80 zł" },
    en: { name: "4-lesson online package", duration: "4 × 60 min", price: "PLN 400", note: "Save PLN 80" },
    highlight: false,
  },
];

/* Ton po stronie indywidualnej mówi do jednej osoby — bez raportów i faktur. */
const individualNotes = [
  { pl: "Materiały w cenie — nie kupujesz podręcznika", en: "Materials included — no coursebook to buy" },
  { pl: "Online albo na żywo w Bielsku-Białej", en: "Online or in person in Bielsko-Biała" },
  { pl: "Terminy dopasowane do Twojego tygodnia", en: "Times arranged around your week" },
];

export default function PricingSection() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"business" | "individual">("business");

  const pricingItems = activeTab === "business" ? businessPricing : individualPricing;
  const notes = activeTab === "business" ? businessNotes : individualNotes;

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
    <section id="pricing" style={{ padding: "80px 0" }}>
      <div className="container">
        {/* Header */}
        <span className="label" data-anim>{t("Cennik", "Pricing")}</span>
        <h2 data-anim style={{ fontSize: "clamp(30px, 4vw, 44px)", margin: "12px 0 32px", maxWidth: "560px" }}>
          {t("Przejrzyste ceny, bez ukrytych opłat", "Transparent pricing, no hidden fees")}
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8" data-anim="left">
          <button onClick={() => setActiveTab("business")} style={tabStyle(activeTab === "business")}>
            {t("Dla firm", "For Companies")}
          </button>
          <button onClick={() => setActiveTab("individual")} style={tabStyle(activeTab === "individual")}>
            {t("Dla osób indywidualnych", "For Individuals")}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,2fr)_minmax(260px,1fr)] gap-8 items-start">

          {/* Pricing list */}
          <div className="flex flex-col gap-3">
            {pricingItems.map((item, i) => {
              const data = lang === "pl" ? item.pl : item.en;
              return (
                <div
                  key={`${activeTab}-${i}`}
                  data-anim
                  className="flex items-center justify-between"
                  style={{
                    padding: "18px 22px",
                    borderRadius: "var(--r-lg)",
                    border: item.highlight ? "1px solid var(--accent-30)" : "1px solid var(--line)",
                    background: item.highlight ? "var(--accent-08)" : "var(--surface-flat)",
                  }}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 600,
                          fontSize: "var(--fs-sm)",
                          color: "var(--text-hi)",
                          margin: 0,
                        }}
                      >
                        {data.name}
                      </h3>
                      {item.highlight && (
                        <span className="tag-green" style={{ fontSize: "10px", padding: "3px 10px", letterSpacing: "0.08em" }}>
                          {t("Popularne", "Popular")}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--text-mute)", margin: "4px 0 0" }}>
                      {data.note}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "var(--text-hi)",
                        margin: 0,
                      }}
                    >
                      {data.price}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-mute)", margin: 0 }}>
                      {data.duration}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side card: what's included + CTA */}
          <div
            data-anim
            style={{
              padding: "24px",
              borderRadius: "var(--r-xl)",
              background: "var(--surface-flat)",
              border: "1px solid var(--line-strong)",
            }}
          >
            <h3 style={{ fontSize: "17px", margin: "0 0 16px" }}>
              {t("Co zawiera cena?", "What's included?")}
            </h3>
            <ul className="flex flex-col gap-2.5 mb-5">
              {notes.map((note) => (
                <li key={note.pl} className="flex items-start gap-2.5">
                  <Check size={13} style={{ color: "var(--accent-base)", marginTop: "3px", flexShrink: 0 }} />
                  <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-3)" }}>
                    {t(note.pl, note.en)}
                  </span>
                </li>
              ))}
            </ul>
            <div style={{ height: "1px", background: "var(--line-strong)", marginBottom: "20px" }} />
            <p style={{ fontSize: "12px", color: "var(--text-mute)", lineHeight: "var(--lh-body)", margin: "0 0 16px" }}>
              {t(
                "Pierwsza konsultacja (30 min) jest bezpłatna — poznajemy się, ustalamy cele i plan nauki.",
                "The first consultation (30 min) is free — we get to know each other, set goals, and plan the learning path."
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
    </section>
  );
}
