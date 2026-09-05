/* =============================================================
   DESIGN: Nocturne Green — Metoda Cribro (sam wstęp)
   Jeden ekran: opis metody po lewej, kłębek → nitka po prawej — rysowane
   kredą wprost na tle strony, bo tłem jest tu tablica.
   Sześć filarów wyprowadzone do osobnej sekcji (PillarsSection),
   żeby ta nie rozlewała się na półtora ekranu.
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import ScrollHint from "@/components/ScrollHint";
import ThreadGraphic from "@/components/ThreadGraphic";

export default function MethodSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="method" className="relative section-screen overflow-hidden">
      <div className="container">
        {/* Nagłówek osobno, żeby na telefonie grafika weszła zaraz pod nim —
            to ona jest tezą tej sekcji, nie ozdobnikiem na końcu. */}
        {/* Rysunek dostaje więcej miejsca niż tekst (1,2 : 1). Przy równym
            podziale kłębek wychodził mniejszy od akapitu obok i sekcja czytała
            się jak ściana tekstu z winietką z boku. */}
        <div className="grid lg:grid-cols-[1fr_minmax(0,1.2fr)] lg:grid-rows-[auto_1fr] gap-x-14 gap-y-6 items-center">

          <header data-anim className="order-1 lg:col-start-1 lg:row-start-1 self-end">
            <span className="label">{t("Metoda Cribro", "Cribro Method")}</span>
            <h2 style={{ fontSize: "var(--fs-section-h2)", margin: "12px 0 0" }}>
              {t("Bez zbędnego szumu.", "Without unnecessary noise.")}
            </h2>
          </header>

          {/* Kłębek → nitka → spirala, narysowane kredą — patrz ThreadGraphic.

              Bez ramki i bez płyty pod spodem: tablicą jest samo tło strony,
              a rysunek ma na nim leżeć, nie stać w kafelku. Kafelki są dla
              treści, którą się czyta — to jest rysunek. */}
          <div data-anim className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 self-center flex justify-center items-center">
            <ThreadGraphic className="w-full h-auto" style={{ maxWidth: "min(100%, 720px)" }} />
          </div>

          <div data-anim className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 self-start">
            {/* Justowanie i dzielenie wyrazów — patrz .prose-justify. */}
            <div
              lang={lang}
              className="prose-justify"
              style={{ color: "var(--text-2)", lineHeight: "var(--lh-body)" }}
            >
              <p style={{ margin: "0 0 14px", color: "var(--text)" }}>
                {t(
                  "Cribro po łacinie znaczy „przesiewam”. I na tym polega cała metoda: nie dokładam Ci materiału, tylko odsiewam wszystko, co nie ma wpływu na to, jak mówisz.",
                  "Cribro is Latin for “I sift”. And that's the whole method: I don't pile more material on you, I sift out everything that has no effect on how you speak."
                )}
              </p>
              <p style={{ margin: "0 0 14px" }}>
                {t(
                  "Budowałem ją przez ponad dziesięć lat pracy z ludźmi, którzy uczą się zupełnie inaczej — z osobami z ADHD, z menedżerami między jednym spotkaniem a drugim, z zespołami, które potrzebują angielskiego na jutro, nie na egzamin.",
                  "I built it over more than ten years with people who learn in completely different ways — people with ADHD, managers between one meeting and the next, teams that need English for tomorrow, not for an exam."
                )}
              </p>
              <p style={{ margin: "0 0 14px" }}>
                {t(
                  "Przychodzili z tym samym problemem. Nie z brakiem zdolności — z nadmiarem. Aplikacje, listy słówek, podręcznik od rozdziału pierwszego, kurs, którego nikt nie skończył. Kłębek, w którym nie widać końca nitki.",
                  "They arrived with the same problem. Not a lack of ability — an excess. Apps, word lists, a coursebook from chapter one, a course nobody finished. A tangle with no visible end of the thread."
                )}
              </p>
              <p style={{ margin: "0 0 14px" }}>
                {t(
                  "Więc zaczynamy od cięcia. Jedna lekcja — jeden cel. Jedno ćwiczenie — jeden powód, żeby je robić. Reszta wypada, bo nie zarabia na swoje miejsce.",
                  "So we start by cutting. One lesson — one goal. One exercise — one reason to do it. The rest goes, because it doesn't earn its place."
                )}
              </p>
              <p style={{ margin: "0 0 24px", color: "var(--text)" }}>
                {t(
                  "Nie uczę języka. Uczę systemu, który działa dalej wtedy, kiedy mnie już nie ma w Twoim kalendarzu.",
                  "I don't teach a language. I teach a system that keeps working once I'm no longer in your calendar."
                )}
              </p>
            </div>

            {/* Podpis pod tekstem — inne hasło niż nagłówek, żeby „bez zbędnego
                szumu” nie padało dwa razy na tym samym ekranie. */}
            <div className="flex items-center gap-3">
              <div style={{ height: "1px", width: "32px", background: "var(--accent-55)" }} />
              <span className="label" style={{ color: "var(--accent-text)" }}>
                {t("z kłębka w jedną nitkę", "from a tangle to a single thread")}
              </span>
              <div style={{ height: "1px", width: "32px", background: "var(--accent-55)" }} />
            </div>
          </div>

        </div>
      </div>

      {/* „Przewiń niżej” — patrz components/ScrollHint. */}
      <ScrollHint to="#pillars" />
    </section>
  );
}
