/* =============================================================
   DESIGN: Warm Ink & Paper — Contact Section
   Simple contact form + contact info
   ============================================================= */

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, Linkedin, Send, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    teamSize: "",
    forWhom: "",
    goal: "",
    format: "",
    message: "",
    rodo: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rodo) {
      toast.error(t("Proszę zaakceptować zgodę RODO.", "Please accept the RODO consent."));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mbdqbjbk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          companyName: form.companyName,
          teamSize: form.teamSize,
          forWhom: form.forWhom,
          goal: form.goal,
          format: form.format,
          message: form.message,
        }),
      });
      if (res.ok) {
        toast.success(t("Wiadomość wysłana! Odpiszę w ciągu 24 godzin.", "Message sent! I'll reply within 24 hours."));
        setForm({ name: "", email: "", phone: "", companyName: "", teamSize: "", forWhom: "", goal: "", format: "", message: "", rodo: false });
      } else {
        throw new Error("send failed");
      }
    } catch {
      toast.error(t("Błąd wysyłki. Napisz bezpośrednio na wyrozumski@maciej.pro", "Send error. Write directly to wyrozumski@maciej.pro"));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 text-sm bg-background/60 border border-border/60 rounded-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors placeholder:text-muted-foreground/40 text-foreground";
  const labelClass = "block text-xs font-medium text-muted-foreground mb-1.5 tracking-wide uppercase";

  return (
    <section id="contact" className="py-24 bg-card/30">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left: heading + contact info */}
          <div className="lg:col-span-4">
            <div className="relative mb-8">
              <span className="deco-number">07</span>
              <p className="section-label mb-3">{t("Kontakt", "Contact")}</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Zacznijmy razem", "Let's start together")}
              </h2>
              <div className="rule-ink mt-6" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {t(
                "Wypełnij formularz, a odezwę się w ciągu 24 godzin. Pierwsza konsultacja (30 min) jest bezpłatna.",
                "Fill in the form and I'll get back to you within 24 hours. The first consultation (30 min) is free."
              )}
            </p>

            <div className="space-y-4">
              <a
                href="mailto:wyrozumski@maciej.pro"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={15} className="text-primary" />
                </div>
                wyrozumski@maciej.pro
              </a>
              <a
                href="tel:+48536524867"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={15} className="text-primary" />
                </div>
                +48 536 524 867
              </a>
              <a
                href="https://www.linkedin.com/in/maciej-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Linkedin size={15} className="text-primary" />
                </div>
                LinkedIn
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center">
                  <Clock size={15} className="text-primary" />
                </div>
                {t("Odpowiadam zwykle w ciągu 24h", "I usually reply within 24h")}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{t("Imię *", "Name *")}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("Twoje imię", "Your name")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t("E-mail *", "Email *")}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* B2B fields — shown when forWhom is company */}
              {form.forWhom === "company" && (
                <div className="grid sm:grid-cols-2 gap-5 p-4 border border-primary/20 bg-primary/5">
                  <div>
                    <label className={labelClass}>{t("Nazwa firmy", "Company name")}</label>
                    <input
                      type="text"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder={t("Nazwa Twojej firmy", "Your company name")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t("Liczba osób do przeszkolenia", "Number of people to train")}</label>
                    <input
                      type="text"
                      name="teamSize"
                      value={form.teamSize}
                      onChange={handleChange}
                      placeholder={t("np. 5 osób", "e.g. 5 people")}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{t("Telefon (opcjonalnie)", "Phone (optional)")}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+48 000 000 000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t("Dla kogo są zajęcia?", "Who are the lessons for?")}</label>
                  <select name="forWhom" value={form.forWhom} onChange={handleChange} className={inputClass}>
                    <option value="">{t("Wybierz...", "Choose...")}</option>
                    <option value="adult">{t("Dla mnie (dorosły)", "For me (adult)")}</option>
                    <option value="teen">{t("Dla nastolatka", "For a teenager")}</option>
                    <option value="company">{t("Dla firmy / zespołu", "For a company / team")}</option>
                    <option value="group">{t("Dla grupy", "For a group")}</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{t("Cel nauki", "Learning goal")}</label>
                  <select name="goal" value={form.goal} onChange={handleChange} className={inputClass}>
                    <option value="">{t("Wybierz...", "Choose...")}</option>
                    <option value="general">{t("Angielski ogólny / konwersacje", "General English / conversations")}</option>
                    <option value="business">{t("Business English", "Business English")}</option>
                    <option value="pronunciation">{t("Wymowa / fonetyka", "Pronunciation / phonetics")}</option>
                    <option value="exam">{t("Przygotowanie do egzaminu", "Exam preparation")}</option>
                    <option value="abroad">{t("Wyjazd za granicę", "Moving/travelling abroad")}</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{t("Preferowana forma", "Preferred format")}</label>
                  <select name="format" value={form.format} onChange={handleChange} className={inputClass}>
                    <option value="">{t("Wybierz...", "Choose...")}</option>
                    <option value="online">{t("Online", "Online")}</option>
                    <option value="inperson">{t("Stacjonarnie (Bielsko-Biała)", "In person (Bielsko-Biała)")}</option>
                    <option value="both">{t("Hybrydowo", "Hybrid")}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>{t("Krótka wiadomość", "Short message")}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t(
                    "Napisz kilka słów o sobie, swoim poziomie i oczekiwaniach...",
                    "Tell me a bit about yourself, your level, and expectations..."
                  )}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* RODO */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="rodo"
                  id="rodo"
                  checked={form.rodo}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 accent-primary"
                />
                <label htmlFor="rodo" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  {t(
                    "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie, zgodnie z RODO. Dane nie będą przekazywane osobom trzecim.",
                    "I consent to the processing of my personal data for the purpose of responding to my inquiry, in accordance with GDPR. Data will not be shared with third parties."
                  )}
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full justify-center gap-2"
              >
                {submitting ? (
                  <span>{t("Wysyłanie...", "Sending...")}</span>
                ) : (
                  <>
                    <Send size={15} />
                    {t("Wyślij wiadomość", "Send message")}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
