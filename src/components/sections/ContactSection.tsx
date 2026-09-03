/* =============================================================
   DESIGN: Nocturne Green — Contact Section
   Lewa: nagłówek + dane kontaktowe. Prawa: formularz, po wysłaniu
   podmieniany na panel potwierdzenia. Błąd zostaje przy formularzu,
   żeby nie zgubić wpisanych danych.
   ============================================================= */

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, Send, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { activeSocials } from "@/lib/socials";
import { toast } from "sonner";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdqbjbk";

const EMPTY_FORM = {
  name: "", email: "", phone: "", companyName: "", teamSize: "",
  forWhom: "", goal: "", format: "", message: "", rodo: false,
};

export default function ContactSection() {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
    setError(null);
    try {
      const { rodo: _rodo, ...payload } = form;
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      setSent(true);
      setForm(EMPTY_FORM);
    } catch {
      const msg = t(
        "Nie udało się wysłać wiadomości. Napisz bezpośrednio na wyrozumski@maciej.pro",
        "The message could not be sent. Write directly to wyrozumski@maciej.pro"
      );
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px",
    background: "var(--ink)",
    border: "1px solid var(--line-strong)",
    borderRadius: "var(--r-md)",
    color: "var(--text)",
    font: "400 var(--fs-body) var(--font-body)",
  };

  const contactRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "var(--text-2)",
    fontSize: "var(--fs-sm)",
  };

  return (
    <section id="contact" style={{ padding: "80px 0" }}>
      <div className="container grid grid-cols-1 lg:grid-cols-[minmax(260px,380px)_1fr] gap-10 lg:gap-14 items-start">

        {/* Left: heading + contact details */}
        <div>
          <span className="label">{t("Kontakt", "Contact")}</span>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 38px)", margin: "12px 0 20px" }}>
            {t("Zacznijmy razem", "Let's start together")}
          </h2>
          <p
            style={{
              fontSize: "var(--fs-body)",
              color: "var(--text-2)",
              lineHeight: "var(--lh-body)",
              margin: "0 0 32px",
            }}
          >
            {t(
              "Wypełnij formularz, a odezwę się w ciągu 24 godzin. Pierwsza konsultacja (30 min) jest bezpłatna.",
              "Fill in the form and I'll get back to you within 24 hours. The first consultation (30 min) is free."
            )}
          </p>

          <div className="flex flex-col gap-4">
            <a href="mailto:wyrozumski@maciej.pro" style={contactRowStyle}>
              <span className="icon-tile" style={{ width: "34px", height: "34px" }}>
                <Mail size={15} />
              </span>
              wyrozumski@maciej.pro
            </a>
            <a href="tel:+48698250507" style={contactRowStyle}>
              <span className="icon-tile" style={{ width: "34px", height: "34px" }}>
                <Phone size={15} />
              </span>
              +48 698 250 507
            </a>
            {activeSocials().map(({ name, icon: Icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={contactRowStyle}>
                <span className="icon-tile" style={{ width: "34px", height: "34px" }}>
                  <Icon size={15} />
                </span>
                {name}
              </a>
            ))}
            <div style={{ ...contactRowStyle, color: "var(--text-mute)" }}>
              <span className="icon-tile" style={{ width: "34px", height: "34px" }}>
                <Clock size={15} />
              </span>
              {t("Odpowiadam zwykle w ciągu 24h", "I usually reply within 24h")}
            </div>
          </div>
        </div>

        {/* Right: form, or the confirmation panel once it's away */}
        <div>
          {sent ? (
            <div
              className="text-center"
              style={{
                padding: "48px",
                borderRadius: "var(--r-xl)",
                background: "var(--accent-08)",
                border: "1px solid var(--accent-30)",
              }}
            >
              <CheckCircle2
                size={32}
                style={{ color: "var(--accent-base)", marginBottom: "16px", display: "inline-block" }}
              />
              <h3 style={{ fontSize: "22px", margin: "0 0 8px" }}>
                {t("Wiadomość wysłana!", "Message sent!")}
              </h3>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-3)", margin: 0 }}>
                {t("Odezwę się w ciągu 24 godzin.", "I'll be in touch within 24 hours.")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}>
                <div>
                  <label className="label block mb-2" htmlFor="name">{t("Imię *", "Name *")}</label>
                  <input
                    id="name" type="text" name="name" required
                    value={form.name} onChange={handleChange}
                    placeholder={t("Twoje imię", "Your name")}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="label block mb-2" htmlFor="email">{t("E-mail *", "Email *")}</label>
                  <input
                    id="email" type="email" name="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="email@example.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}>
                <div>
                  <label className="label block mb-2" htmlFor="phone">{t("Telefon (opcjonalnie)", "Phone (optional)")}</label>
                  <input
                    id="phone" type="tel" name="phone"
                    value={form.phone} onChange={handleChange}
                    placeholder="+48 000 000 000"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="label block mb-2" htmlFor="forWhom">{t("Dla kogo są zajęcia?", "Who are the lessons for?")}</label>
                  <select id="forWhom" name="forWhom" value={form.forWhom} onChange={handleChange} style={inputStyle}>
                    <option value="">{t("Wybierz...", "Choose...")}</option>
                    <option value="adult">{t("Dla mnie (dorosły)", "For me (adult)")}</option>
                    <option value="teen">{t("Dla nastolatka", "For a teenager")}</option>
                    <option value="company">{t("Dla firmy / zespołu", "For a company / team")}</option>
                    <option value="group">{t("Dla grupy", "For a group")}</option>
                  </select>
                </div>
              </div>

              {/* B2B fields — only once "for a company" is picked above */}
              {form.forWhom === "company" && (
                <div
                  className="grid gap-5"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                    padding: "20px",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--accent-25)",
                    background: "var(--accent-04)",
                  }}
                >
                  <div>
                    <label className="label block mb-2" htmlFor="companyName">{t("Nazwa firmy", "Company name")}</label>
                    <input
                      id="companyName" type="text" name="companyName"
                      value={form.companyName} onChange={handleChange}
                      placeholder={t("Nazwa Twojej firmy", "Your company name")}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="label block mb-2" htmlFor="teamSize">{t("Liczba osób do przeszkolenia", "Number of people to train")}</label>
                    <input
                      id="teamSize" type="text" name="teamSize"
                      value={form.teamSize} onChange={handleChange}
                      placeholder={t("np. 5 osób", "e.g. 5 people")}
                      style={inputStyle}
                    />
                  </div>
                </div>
              )}

              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}>
                <div>
                  <label className="label block mb-2" htmlFor="goal">{t("Cel nauki", "Learning goal")}</label>
                  <select id="goal" name="goal" value={form.goal} onChange={handleChange} style={inputStyle}>
                    <option value="">{t("Wybierz...", "Choose...")}</option>
                    <option value="general">{t("Angielski ogólny / konwersacje", "General English / conversations")}</option>
                    <option value="business">Business English</option>
                    <option value="pronunciation">{t("Wymowa / fonetyka", "Pronunciation / phonetics")}</option>
                    <option value="exam">{t("Przygotowanie do egzaminu", "Exam preparation")}</option>
                    <option value="abroad">{t("Wyjazd za granicę", "Moving/travelling abroad")}</option>
                  </select>
                </div>
                <div>
                  <label className="label block mb-2" htmlFor="format">{t("Preferowana forma", "Preferred format")}</label>
                  <select id="format" name="format" value={form.format} onChange={handleChange} style={inputStyle}>
                    <option value="">{t("Wybierz...", "Choose...")}</option>
                    <option value="online">Online</option>
                    <option value="inperson">{t("Stacjonarnie (Bielsko-Biała)", "In person (Bielsko-Biała)")}</option>
                    <option value="both">{t("Hybrydowo", "Hybrid")}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label block mb-2" htmlFor="message">{t("Krótka wiadomość", "Short message")}</label>
                <textarea
                  id="message" name="message" rows={4}
                  value={form.message} onChange={handleChange}
                  placeholder={t(
                    "Napisz kilka słów o sobie, swoim poziomie i oczekiwaniach...",
                    "Tell me a bit about yourself, your level, and expectations..."
                  )}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              {/* RODO */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox" name="rodo" id="rodo"
                  checked={form.rodo} onChange={handleChange}
                  className="mt-0.5 w-4 h-4"
                  style={{ accentColor: "var(--accent-base)" }}
                />
                <label
                  htmlFor="rodo"
                  style={{ fontSize: "var(--fs-xs)", color: "var(--text-mute)", lineHeight: "var(--lh-body)" }}
                >
                  {t(
                    "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie, zgodnie z RODO. Dane nie będą przekazywane osobom trzecim.",
                    "I consent to the processing of my personal data for the purpose of responding to my inquiry, in accordance with GDPR. Data will not be shared with third parties."
                  )}
                </label>
              </div>

              {error && (
                <p
                  role="alert"
                  className="flex items-start gap-2"
                  style={{
                    fontSize: "var(--fs-sm)",
                    color: "var(--destructive)",
                    padding: "12px 16px",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--destructive)",
                    background: "rgba(240, 114, 111, 0.08)",
                  }}
                >
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  {error}
                </p>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
                {submitting ? (
                  t("Wysyłanie...", "Sending...")
                ) : (
                  <>
                    <Send size={15} />
                    {t("Wyślij wiadomość", "Send message")}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
