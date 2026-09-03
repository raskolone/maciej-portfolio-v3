# Handoff: maciej.pro redesign — "Nocturne Green" theme

## Overview
A full visual restyle of maciej.pro (Maciej Wyrozumski — CribroEnglish, English lessons/Business English) into the "Nocturne Green" dark theme: near-black ground, mint-green accent used as glow/line, serif display headings, mono labels. Single long-scroll page, same content and structure as the live site, new look and a few new interaction touches (typewriter hero line, animated constellation canvas, scroll-reveal on two sections).

## About the Design Files
The bundled `design-reference.dc.html` is a **design reference built in this tool's own component format** (custom template tags like `<sc-for>`, `<x-dc>`, a small JS logic class) — it is a prototype for visual/behavioral reference, not code to copy into the target codebase. **Recreate this design in the site's existing stack** (currently a React/TypeScript site, repo `raskolone/maciej-portfolio-v3`) using its existing components, routing and build setup. Do not attempt to run the `.dc.html` file inside the React app or port its custom tags directly — reimplement each section as ordinary React/TSX using the values documented below.

## Fidelity
**High-fidelity.** Colors, type, spacing, radii and copy are final. Implement pixel-for-pixel from the values in this document and from `tokens.css` (drop this file into the repo as-is, or map its variables onto the existing CSS variable/theme system if one exists — check `src/index.css`).

## Screens / Views
One page, single long scroll. Sections in order: Nav → Hero → Dla kogo (For Whom) → The Cribro Method → About + My Story → Pricing → FAQ → Contact → Footer.

### Nav (sticky header)
- Sticky top, `z-index: 50`, `background: var(--glass)` (semi-transparent dark) + `backdrop-filter: blur(24px)`, bottom border `1px solid var(--line)`.
- Padding: `var(--s-4)` vertical, `clamp(20px, 6vw, 48px)` horizontal.
- Left: logo lockup — "MW." in `--font-display` (Cormorant Garamond) 700 22px, the period in accent color; under it "CRIBROENGLISH" in `--font-mono` 9px, uppercase, letter-spacing 0.18em, accent color at 70% opacity.
- Center: nav links (O mnie, Dla firm, Metoda Cribro, Cennik, FAQ, Kontakt) — 13px DM Sans, secondary text color; "Dla firm" is bold accent color to mark current focus item.
- Right: pill button "Bezpłatna konsultacja" — accent fill, dark ink text, no border, `--r-sm` radius, `--glow-btn` shadow.

### Hero
- `min-height: 88vh`, split layout: left 52% text column (max-width 600px) vertically centered, right 48% is Maciej's cutout photo pinned absolute to the right edge, full height, `object-fit: contain` anchored to bottom (preserves original photo proportions, doesn't crop/stretch).
- Behind everything: full-bleed `<canvas>` animated star field with connecting lines in mint (see Interactions).
- Text column, top to bottom: label "Lektor języka angielskiego" (mono, uppercase) → H1 "Maciej" at `clamp(56px,9vw,104px)` in Cormorant Garamond 700 → "WYROZUMSKI" mono 14px letter-spacing 0.3em → animated typed line (see Interactions) → 64px accent underline rule → lead paragraph 17px → primary CTA button "Umów bezpłatną konsultację" with arrow icon → stat row (10+ lat doświadczenia / A1–C1 wszystkie poziomy / 100% zajęcia po angielsku) each a big serif number over a mono label, separated from the CTA by a top border.

### Dla kogo (For Whom)
- Background `var(--surface-2)` band. Label + H2 "Kto skorzysta na moich zajęciach?" + intro paragraph.
- Two-way pill toggle: "Dla firm" / "Dla osób indywidualnych" — active pill is accent-filled, inactive is outlined `--line-strong` on transparent.
- Below: responsive grid (`auto-fit, minmax(280px,1fr)`) of 6 cards, content swaps with the toggle. Card: `--r-xl` radius, `--surface-gradient` background, `--line` border, `--shadow-md`; 40px icon tile (accent-tinted) top-left, title (17-ish px), 14.5px muted description.
- Business-tab cards: Spotkania i meeting-i, Korespondencja biznesowa, Rozmowy z klientami zagranicznymi, Onboarding pracowników, Prezentacje i pitche, Codzienna komunikacja w zespole.
- Individual-tab cards: Dorośli — angielski ogólny, Pronunciation Coaching, Polacy za granicą, Osoby wyjeżdżające, ADHD i neuroróżnorodność, Angielski online.
- Full card copy is in `design-reference.dc.html` (`businessCards` / `individualCards` arrays).

### The Cribro Method
- Intro block (scroll-reveal, enters from the left): label "Metoda Cribro", H2 "Bez zbędnego szumu.", three paragraphs explaining the method's philosophy (noise reduction, one goal per lesson, teaching a system not just a language), closed by a small centered rule + "bez zbędnego szumu" label.
- Sub-heading "Sześć filarów mojej metody", centered.
- 6-card grid (`auto-fit, minmax(300px,1fr)`), each card scroll-reveals sliding in from alternating sides (even index from left, odd from right), staggered 0.08s per card. Card: numbered mono tile (01–06) + title + description. Titles: Full Immersion, Speaking First, Pronunciation & Phonetics, Konsekwencja nie intensywność, Kontekst nie słówka, Mniej znaczy więcej. Full copy in the `pillars` array.

### About + My Story
- Background `var(--surface-2)` band, two sub-sections separated by a full-width gradient hairline (`transparent → accent 55% → transparent`).
- **O mnie**: left column (scroll-reveals from left) — label, H2 "Lektor. Trener. Człowiek.", three stat blocks with a 2px accent left-border (10+ lat doświadczenia / A1–C1 wszystkie poziomy / 3 szkoły językowe). Right column (scroll-reveals from right) — 3 bio paragraphs, a pull-quote with accent left-border ("Nie wierzę w 3-godzinne sesje...") + supporting line, then a wrapped row of 7 mono pill tags (Business English, Pronunciation Coach, Cambridge Exams, CEFR A1–C1, Full Immersion, ADHD-Friendly, EdTech).
- **Moja historia**: left column (scroll-reveals from left, wider) — label "Moja historia", H2 "Klocki Jenga i sztuka układania ich od nowa.", narrative paragraphs about resilience/ADHD, a pull-quote, closing paragraph, then a 3-up stat strip (Przetrwałem / Odbudowałem / Uczę innych) each a small flat card. Right column (scroll-reveals from right) — the Jenga photo, full height, `object-fit: cover`, `--r-xl` rounded, `--shadow-lg`.
- Full paragraph copy is in `design-reference.dc.html` — copy verbatim, do not rewrite.

### Pricing
- Label + H2 "Przejrzyste ceny, bez ukrytych opłat" + same two-way pill toggle (Dla firm / Dla osób indywidualnych).
- Two-column layout: left (2fr) is a stacked list of pricing rows; right (1fr) is a sidebar card "Co zawiera cena?" with a checklist, a divider, a free-consult note, and a CTA button.
- Pricing row: flex row, name + optional "Popularne" accent pill badge on the left, price (large serif, bold) + duration (small muted) right-aligned. Highlighted row (the recommended plan) gets an accent-tinted background and border; other rows are flat.
- Business pricing: Pakiet Indywidualny B2B (560 zł/mies., 4×60min, highlighted), Pakiet Zespołowy (od 200 zł/os./mies.), Pakiet Korporacyjny (od 150 zł/os./mies., wycena indywidualna).
- Individual pricing: Lekcja indywidualna online (120 zł/60min, highlighted), Lekcja stacjonarna (140 zł/60min), Pakiet 4 lekcji online (400 zł).
- Sidebar checklist and note copy differs per tab — see `businessNotes`/`individualNotes` in the reference file.

### FAQ
- Background `var(--surface-2)`. Left column: label, H2, short paragraph, "Napisz do mnie" pill link (gradient accent tint background, accent border).
- Right column: accordion, one row per question, flat card (`--surface-flat`, `--r-md`, `--line-strong` border). Header row is a button: question (600 weight) + chevron icon that rotates 180° when open. Answer expands below with a top divider. 9 Q&A pairs — copy verbatim from the `faqs` array (covers: is it 100% in English, starting from zero, pronunciation coaching, Business English, in-person lessons, what the first lesson looks like, invoicing, pair/small-group lessons, HR progress reporting).

### Contact
- Two columns. Left: label, H2 "Zacznijmy razem", intro paragraph, then 4 contact rows each with a small accent-tinted icon tile: email (wyrozumski@maciej.pro), phone (+48 698 250 507), LinkedIn, and a "responds within 24h" note.
- Right: the contact form (or, after submit, a success state — accent-tinted card with a checkmark and confirmation text). Form fields, in order: Imię* / E-mail* (two-up), Telefon (opcjonalnie) / Dla kogo są zajęcia? (select: dorosły/nastolatek/firma/grupa) (two-up), a conditional two-up block (Nazwa firmy / Liczba osób) that only appears when "Dla firmy / zespołu" is selected, Cel nauki (select) / Preferowana forma (select: online/stacjonarnie/hybrydowo) (two-up), Krótka wiadomość (textarea), an RODO consent checkbox (required to submit), and a submit button that shows a "Wysyłanie..." loading state before flipping the panel to the success state.
- All inputs share one style: `var(--ink)` background, `1px solid var(--line-strong)` border, `--r-md` radius, `15px` DM Sans text.

### Footer
- Top border `1px solid var(--line)`. Three-column grid: brand block (name, "Lektor Języka Angielskiego" label, one-line tagline) / nav links (repeats the header nav) / contact block (email, phone, "Bielsko-Biała · Online" location line, each with a small icon).
- Bottom bar below a soft divider: copyright line (with current year) left, "CribroEnglish · Bielsko-Biała, Polska" right.

## Interactions & Behavior
- **Hero typewriter**: a two-phrase loop ("Angielski dla Twojej firmy" / "Bez zbędnego szumu") typed at ~75ms/char, held 1.8s, deleted at ~40ms/char, then advances to the next phrase. A blinking `|` cursor (0.8s step-end) sits after the text at all times.
- **Hero star field**: full-bleed `<canvas>` behind the hero, 90 particles (45 on narrow viewports) drifting slowly, each rendered as a soft white glow dot; particles within 150px of each other are connected by a thin mint line whose opacity falls off with distance. Redraws every frame via `requestAnimationFrame`; resizes to its container via `ResizeObserver`. Respect `prefers-reduced-motion` by freezing/removing this (tokens.css already sets a global reduced-motion override).
- **Scroll reveals** (Method intro block, both About/Story columns, both grid card sets): each tracked element is invisible + offset (110–120px horizontal slide) until it crosses into the viewport (`IntersectionObserver`, threshold 0.15), then fades and slides to `opacity:1 / translate(0,0)` over 0.7s with an ease-out cubic-bezier (`cubic-bezier(0.22,1,0.36,1)`). The effect is **reversible** — scrolling the element back out of view resets it to hidden/offset, so scrolling back down replays the reveal. The 6-card method grid staggers each card by `index * 0.08s`. Cards in the "Dla kogo" grid intentionally do NOT scroll-reveal (only Method + About/Story sections do).
- **Two-way toggles** (For Whom, Pricing): plain state swap, no transition animation — instant content change, only the pill's own selected/unselected style changes.
- **FAQ accordion**: single-answer-open-at-a-time is NOT enforced in the reference (each row toggles independently); confirm with the client whether they want accordion-exclusive behavior. Chevron rotation transitions on the existing token's default (fast ease).
- **Contact form**: client-side only in the reference (no real submission wired up — placeholder `setTimeout` fakes a network delay). Real implementation needs an actual submit endpoint/email service. Submit button disables and its label changes to "Wysyłanie..." while pending; on success the whole form is replaced by a confirmation panel (no error state exists yet in the reference — add one).
- **Responsive**: this reference is a desktop-first design; multi-column grids collapse via CSS `auto-fit`/`minmax` down to single column on narrow widths, but the hero's side-by-side photo layout has not been mobile-tuned — verify/rebuild that split for mobile.

## State Management
- `forWhomTab`: `"business" | "individual"` — which For Whom card set is shown.
- `pricingTab`: `"business" | "individual"` — which pricing list is shown.
- `openFaq`: index of the open FAQ row, or `null`.
- `typed`: current substring of the typewriter phrase (derived from a timer-driven index, not user input).
- `revealed`: map of section-id → boolean, driven by IntersectionObserver entries, one entry per scroll-reveal target.
- `form`: `{ name, email, phone, forWhom, companyName, teamSize, goal, format, message, rodo }`.
- `submitting`, `sent`: booleans controlling the contact form's pending/success states.
- No external data fetching in the reference — all copy (cards, pricing, FAQ) is static content in the file. Wire pricing/FAQ to a CMS only if the client wants that; otherwise hardcode.

## Design Tokens
Full source of truth is `tokens.css` (bundled) — import it once, use its CSS variables everywhere; do not hardcode hex values. Key values:

**Ground colors**: `--bg #09101c`, `--bg-lift #172a46` (used only in a radial gradient behind the page), `--ink #05070d` (form inputs), `--surface-flat #141b2a` (opaque cards). Page background is `radial-gradient(circle at 50% -20%, #172a46 0%, #09101c 70%) fixed, #09101c`.

**Accent (mint green, the only saturated hue)**: `--accent #72f0b4`, `--accent-soft #a5f7d0` (link hover), `--accent-ink #06120c` (text on accent fill). Tinted fills/borders as alpha steps of the same hue: `--accent-04` through `--accent-55` (rgba(114,240,180, 0.04–0.55)).

**Text**: `--text #eae8e3` (body), `--text-hi #ffffff` (headings), `--text-2 #9aa9bd`, `--text-3 #8a99ad`, `--text-mute #7a8da6` (labels/meta), `--text-faint #39445a`.

**Lines**: `--line rgba(255,255,255,.07)`, `--line-strong rgba(255,255,255,.12)`, `--line-soft rgba(255,255,255,.04)`.

**Shadows/glow**: `--shadow-sm/md/lg` (black, 8–16px blur, negative spread), `--glow-btn 0 8px 24px -8px rgba(114,240,180,.6)` on primary buttons.

**Type**: `--font-display 'Cormorant Garamond'` (serif, headings + numerals + pull-quotes), `--font-body 'DM Sans'` (everything else), `--font-mono 'DM Mono'` (labels, tags, numbered badges). Sizes: `--fs-display 104px` (hero only, actually rendered at `clamp(56px,9vw,104px)`), `--fs-h1 48px`, `--fs-h2 34px`, `--fs-h3 22px`, `--fs-h4 19px`, `--fs-lead 17px`, `--fs-body 15px`, `--fs-sm 14.5px`, `--fs-xs 13px`, `--fs-label 11px` (mono, uppercase, 0.14em tracking — the recurring ".label" kicker style). Line-height: `--lh-body 1.6`, `--lh-tight 1.15`.

**Radius**: `--r-sm 11px`, `--r-md 14px`, `--r-lg 16px`, `--r-xl 20px`, `--r-pill 999px`.

**Spacing** (4px base): `--s-1 4px` … `--s-28 110px` — section vertical padding uses `--s-20` (80px), card padding `--s-6` (24px).

**Motion**: `--ease cubic-bezier(0.4,0,0.2,1)`, `--t-fast 0.15s`, `--t 0.2s`, `--t-slow 0.4s`.

`tokens.css` also ships a light-theme variant (`html[data-theme="light"]`) with the same variable names remapped — not currently wired into the reference (no toggle UI was built), included in case the client wants a light mode later.

## Assets
- `assets/maciej-hero-transparent.png` — cutout photo of Maciej used in the hero, transparent background, sourced from the existing site's `public/images/maciej-hero-transparent.png`.
- `assets/jenga.png` — Jenga tower photo used in the "Moja historia" section, sourced from the existing site's `public/images/jenga.png`.
- Icons: Phosphor Icons (regular weight), loaded via `https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css` in the reference — swap for the icon set/package already used in the codebase if different (Phosphor is not currently a dependency of the site; check `package.json` before adding it).
- Fonts: Google Fonts — Cormorant Garamond (600, 700), DM Sans (400, 500, 700), DM Mono (400, 500).

## Files
- `design-reference.dc.html` — the full page markup + a JS class holding all state/content (open in any browser to view the live reference; view-source for exact markup/styles).
- `tokens.css` — the design tokens stylesheet referenced above.
- `assets/` — the two photos used in the design.

Content in this reference was pulled from the live site's own copy (repo `raskolone/maciej-portfolio-v3`, sections: HeroSection, ForWhomSection, MethodSection, AboutSection, MyStorySection, PricingSection, FAQSection, ContactSection) restyled into Nocturne Green — no copy was invented; carry all text over verbatim.
