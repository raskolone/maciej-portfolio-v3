import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "pl" | "en";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (pl: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("pl");

  const toggleLang = () => setLang((prev) => (prev === "pl" ? "en" : "pl"));

  const t = (pl: string, en: string) => (lang === "pl" ? pl : en);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
