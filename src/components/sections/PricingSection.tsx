/* =============================================================
   DESIGN: Dark Constellation — Pricing Section
   Tabs: Dla firm | Dla osób indywidualnych
   ============================================================= */

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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

const individualNotes = [
  { pl: "Materiały dydaktyczne w cenie", en: "Teaching materials included" },
  { pl: "Zajęcia online i stacjonarnie", en: "Online and in-person available" },
  { pl: "Terminy ustalane indywidualnie", en: "Schedule arranged individually" },
];

export default function PricingSection() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"business" | "individual">("business");

  const pricingItems = activeTab === "business" ? businessPricing : individualPricing;
  const notes = activeTab === "business" ? businessNotes : individualNotes;

  return (
    <section id="pricing" className="py-24 bg-card/30">
      <div className="container">
        {/* Header */}
        <div className="relative mb-10">
          <span className="deco-number">05</span>
          <p className="section-label mb-3">{t("Cennik", "Pricing")}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground max-w-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("Przejrzyste ceny, bez ukrytych opłat", "Transparent pricing, no hidden fees")}
          </h2>
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

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Pricing list */}
          <div className="lg:col-span-2 space-y-3">
            {pricingItems.map((item, i) => {
              const data = lang === "pl" ? item.pl : item.en;
              return (
                <div
                  key={`${activeTab}-${i}`}
                  className={`flex items-center justify-between p-5 rounded-md border transition-all ${
                    item.highlight
                      ? "border-primary/40 bg-primary/8 shadow-sm"
                      : "border-border/60 bg-card card-glow"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className="text-sm font-semibold text-foreground"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {data.name}
                      </h3>
                      {item.highlight && (
                        <span className="tag-green text-xs">{t("Popularne", "Popular")}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{data.note}</p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p
                      className="text-lg font-bold text-foreground"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {data.price}
                    </p>
                    <p className="text-xs text-muted-foreground">{data.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side notes + CTA */}
          <div>
            <div className="bg-card rounded-sm p-6 border border-border/60">
              <h3
                className="text-base font-bold text-foreground mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Co zawiera cena?", "What's included?")}
              </h3>
              <ul className="space-y-3 mb-6">
                {notes.map((note) => (
                  <li key={note.pl} className="flex items-start gap-2.5">
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t(note.pl, note.en)}</span>
                  </li>
                ))}
              </ul>
              <div className="rule-ink mb-6" />
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {t(
                  "Pierwsza konsultacja (30 min) jest bezpłatna — poznajemy się, ustalamy cele i plan nauki.",
                  "The first consultation (30 min) is free — we get to know each other, set goals, and plan the learning path."
                )}
              </p>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary w-full justify-center text-sm"
              >
                {t("Umów bezpłatną konsultację", "Book a free consultation")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
