/* =============================================================
   DESIGN: Nocturne Green — FAQ Section
   Lewa kolumna: nagłówek + odnośnik "Napisz do mnie"
   Prawa: akordeon, jedna odpowiedź otwarta naraz
   ============================================================= */

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToSelector } from "@/lib/scrollTo";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    pl: {
      q: "Czy zajęcia są całe po angielsku?",
      a: "Tak — prowadzę zajęcia w 100% po angielsku. To celowy wybór: full immersion to najskuteczniejsza metoda nauki. Jeśli coś jest niejasne, pomagam innymi słowami, przykładami lub kontekstem — zawsze po angielsku.",
    },
    en: {
      q: "Are lessons conducted entirely in English?",
      a: "Yes — I teach 100% in English. This is a deliberate choice: full immersion is the most effective learning method. If something is unclear, I help with different words, examples, or context — always in English.",
    },
  },
  {
    pl: {
      q: "Czy uczysz od podstaw (poziom A0/A1)?",
      a: "Tak, pracuję ze wszystkimi poziomami od A0 do C1. Mam doświadczenie z osobami, które nigdy wcześniej nie uczyły się angielskiego, jak i z zaawansowanymi profesjonalistami.",
    },
    en: {
      q: "Do you teach complete beginners (A0/A1)?",
      a: "Yes, I work with all levels from A0 to C1. I have experience with people who have never studied English before, as well as with advanced professionals.",
    },
  },
  {
    pl: {
      q: "Czy pomagasz w poprawie wymowy?",
      a: "Fonetyka i wymowa to moja specjalizacja. Pracowałem jako Pronunciation Coach — pomagam poprawić akcent, rytm wypowiedzi i naturalność brzmienia. To jeden z moich głównych wyróżników.",
    },
    en: {
      q: "Do you help with pronunciation?",
      a: "Phonetics and pronunciation are my specialization. I have worked as a Pronunciation Coach — I help improve accent, speech rhythm, and natural sound. This is one of my main differentiators.",
    },
  },
  {
    pl: {
      q: "Czy prowadzisz Business English?",
      a: "Tak, Business English to jedna z moich specjalizacji. Pracowałem z grupami korporacyjnymi, pomagałem w przygotowaniu do prezentacji, negocjacji i codziennej komunikacji zawodowej.",
    },
    en: {
      q: "Do you teach Business English?",
      a: "Yes, Business English is one of my specializations. I have worked with corporate groups, helping with presentations, negotiations, and everyday professional communication.",
    },
  },
  {
    pl: {
      q: "Czy uczysz stacjonarnie?",
      a: "Tak — stacjonarnie w Bielsku-Białej i okolicach. Możliwy jest też dojazd do centrum woj. śląskiego (np. Katowice) przy odpowiednim kontrakcie. Większość moich zajęć odbywa się online.",
    },
    en: {
      q: "Do you teach in person?",
      a: "Yes — in person in Bielsko-Biała and the surrounding area. Travel to central Silesia (e.g., Katowice) is also possible with the right contract. Most of my lessons take place online.",
    },
  },
  {
    pl: {
      q: "Jak wygląda pierwsza lekcja?",
      a: "Pierwsza konsultacja (30 min) jest bezpłatna. Poznajemy się, rozmawiam z Tobą po angielsku, oceniam poziom, ustalamy cele i plan nauki. Dopiero potem decydujemy o regularnych zajęciach.",
    },
    en: {
      q: "What does the first lesson look like?",
      a: "The first consultation (30 min) is free. We get to know each other, I speak with you in English, assess your level, and set goals and a learning plan. Only then do we decide on regular lessons.",
    },
  },
  {
    pl: {
      q: "Czy wystawiasz faktury?",
      a: "Tak, wystawiam faktury. Prowadzę działalność gospodarczą, więc zajęcia mogą być rozliczone jako koszt firmowy.",
    },
    en: {
      q: "Do you issue invoices?",
      a: "Yes, I issue invoices. I run a registered business, so lessons can be treated as a business expense.",
    },
  },
  {
    pl: {
      q: "Czy można uczyć się w parze lub małej grupie?",
      a: "Tak, prowadzę zajęcia w parach i małych grupach (2–4 osoby). Cena jest ustalana indywidualnie w zależności od liczby uczestników i formy zajęć.",
    },
    en: {
      q: "Can I learn in a pair or small group?",
      a: "Yes, I run lessons in pairs and small groups (2–4 people). The price is set individually depending on the number of participants and the format.",
    },
  },
  {
    pl: {
      q: "Jak wygląda raportowanie postępów dla działu HR?",
      a: "Po każdym miesiącu przygotowuję krótkie podsumowanie dla firmy: poziom uczestnika, zrealizowane tematy, obszary do pracy i rekomendacje na kolejny miesiąc. Raport jest dostosowany do potrzeb działu HR lub managera — bez zbędnej biurokracji, tylko konkrety.",
    },
    en: {
      q: "How does progress reporting work for HR departments?",
      a: "After each month, I prepare a short summary for the company: participant level, topics covered, areas to work on, and recommendations for the next month. The report is tailored to the needs of the HR department or manager — no unnecessary bureaucracy, just the essentials.",
    },
  },
];

export default function FAQSection() {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-band" style={{ padding: "80px 0" }}>
      <div className="container grid grid-cols-1 lg:grid-cols-[minmax(240px,340px)_1fr] gap-10 lg:gap-14">

        {/* Left: heading + contact link */}
        <div data-anim>
          <span className="label">{t("Pytania", "Questions")}</span>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 38px)", margin: "12px 0 20px" }}>
            {t("Najczęściej zadawane pytania", "Frequently asked questions")}
          </h2>
          <p
            style={{
              fontSize: "var(--fs-sm)",
              color: "var(--text-2)",
              lineHeight: "var(--lh-body)",
              margin: "0 0 16px",
            }}
          >
            {t(
              "Nie znalazłeś odpowiedzi? Napisz do mnie — chętnie odpowiem na każde pytanie.",
              "Didn't find an answer? Write to me — I'm happy to answer any question."
            )}
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSelector("#contact"); }}
            className="inline-flex items-center gap-2"
            style={{
              padding: "9px 20px",
              borderRadius: "var(--r-pill)",
              border: "1px solid var(--accent-25)",
              background: "linear-gradient(135deg, var(--accent-15), var(--accent-04))",
              color: "var(--accent-text)",
              font: "500 13px var(--font-body)",
            }}
          >
            {t("Napisz do mnie", "Contact me")}
          </a>
        </div>

        {/* Right: accordion */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const data = lang === "pl" ? faq.pl : faq.en;
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                data-anim
                style={{
                  border: "1px solid var(--line-strong)",
                  borderRadius: "var(--r-md)",
                  overflow: "hidden",
                  background: "var(--surface-flat)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left"
                  style={{ padding: "18px 20px", background: "none", border: "none" }}
                >
                  <span
                    style={{
                      font: "600 var(--fs-sm) var(--font-body)",
                      color: "var(--text-hi)",
                    }}
                  >
                    {data.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: "var(--accent-text)" }}
                  />
                </button>
                {isOpen && (
                  <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--line)" }}>
                    <p
                      style={{
                        fontSize: "var(--fs-sm)",
                        color: "var(--text-3)",
                        lineHeight: "var(--lh-body)",
                        margin: "16px 0 0",
                      }}
                    >
                      {data.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
