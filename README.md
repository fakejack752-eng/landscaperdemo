# Evergreen Landscape & Outdoor Living — Demo Website Concept

A luxury, mobile-first **demo website** for a landscaping company, created by
**AI Automation NY** to show potential clients what their business website
could look and feel like.

> **Evergreen is a fictional company.** Every name, phone number, email,
> address, neighborhood list, review placeholder, and image on this site is
> sample content. The site deliberately ships without fabricated licenses,
> awards, experience claims, or customer reviews.

---

## What's Included

| Area | Details |
| --- | --- |
| **Pages** | Home (13 sections), Services overview, 10 Service detail pages, Project Inspiration gallery, About, Service Areas, Request an Estimate, Contact, Privacy, Terms |
| **Conversion features** | 5-step guided estimate form (with validation + progress bar + auto-saved in-browser draft that survives refresh), sticky mobile action bar (Call / Get an Estimate), demo chat widget, prominent CTA buttons |
| **AI automation demo** | Interactive 6-step "See How a Smart Inquiry Works" walkthrough showing lead flow: inquiry → pipeline → notification → response → booking → follow-up (all static examples) |
| **Compliance features** | "Demo Website Concept" badge in footer + near forms, honest testimonial placeholders, "Design inspiration" labels on imagery, AI Automation NY credit linking to https://aiautomationny.com |
| **Tech** | Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion (reduced-motion aware) · Lucide icons |

---

## Quick Start

```bash
bun install
bun run dev      # starts on port 3000
bun run lint     # code quality check
```

Open the preview panel in the UI (or the deployed URL) to browse the site.
Navigation uses hash routes (`/#/services/lawn-care-maintenance`) so the whole
site works from a single deploy.

---

## Customization Guide (8 Steps)

All customization starts in **one file**: `src/config/site.ts`. It contains
every piece of text, every image URL, and every list shown on the website.

### 1. Rename the business & replace contact details

Edit the `business` section in `src/config/site.ts`:

- `name`, `shortName`, `tagline`
- `phoneDisplay` + `phoneHref` (currently a **placeholder** `(555) 013-9200`)
- `email`, `website`, `address`
- `hours`

Also update the site title/description defaults in `src/app/layout.tsx`
(metadata template) and the `BASE` constant in `src/app/page.tsx` (per-page
SEO titles).

### 2. Change images

Every image is a URL string in `src/config/site.ts`:

- `images` — hero, intro, final CTA, about
- `services[].cardImage` — one per service page
- `gallery[]` — the inspiration grid

For local photos, drop files into `public/` and use paths like `/patio-1.jpg`.
Alt text lives alongside each image and should describe the *actual* photo.

### 3. Update colors & fonts

Brand colors are CSS variables in `src/app/globals.css` under `:root`
(`--forest`, `--gold`, `--ivory`, etc.). Change the hex values once and the
whole site follows. Fonts are loaded in `src/app/layout.tsx`
(`Cormorant Garamond` for headings, `Manrope` for body) and mapped in
`globals.css` via `--font-serif` / `--font-sans`.

### 4. Update services

Edit the `services` array in `src/config/site.ts` — add, remove, or rewrite
entries. Each service has a `slug` (used in its URL), icon name (from
`src/lib/icons.tsx`), card image, intro, project types, benefits, FAQs, and a
`galleryCategory` linking it to related gallery images. The header mega-menu,
footer links, and services page update automatically.

### 5. Update service areas

Edit the `areas` array (`borough` + `neighborhoods`). The home preview, areas
page, footer strip, and FAQ copy reference it. Set real coverage after
confirming with the business — the demo currently shows a disclaimer note.

### 6. Connect the form to a real inbox or CRM

- `integrations.estimateFormEndpoint` — put a webhook URL here (GoHighLevel,
  Zapier, Make, Formspree, or your own API). While it stays `""`, the form is
  a pure front-end demo and shows the demo confirmation message.
- To wire it up: in `src/components/forms/EstimateForm.tsx`, replace the
  `setTimeout` in `submit()` with a `fetch(estimateFormEndpoint, { method:
  "POST", body: JSON.stringify(data) })`, and remove the demo notice near the
  submit button once a real destination exists.
- The contact page form (`src/components/pages/ContactPage.tsx`) works the
  same way.

### 7. Connect a booking calendar

Set `integrations.bookingUrl` to a Calendly / GoHighLevel calendar / sched.ly
link. Then surface it wherever booking CTAs are wanted — e.g. add a "Book a
consultation" button that opens that URL (the config key is already prepared;
the demo currently keeps booking inside the simulated lead-flow panel).

### 8. Connect GoHighLevel (or another CRM) & replace simulated features

The interactive walkthrough in `src/components/home/LeadFlowDemo.tsx` is a
static simulation with **no real integrations**. When moving to production:

| Demo feature | Real replacement |
| --- | --- |
| Lead card in pipeline | Create contact/opportunity via CRM API or webhook |
| Phone notification | CRM mobile app push / SMS via Twilio |
| Auto-response message | CRM conversation / SMS automation |
| Calendar card | Calendly / GHL calendar booking link |
| Follow-up status | CRM pipeline stage automation |

Other simulated features to make real (or remove): the chat widget
(`src/components/layout/ChatWidget.tsx` — prewritten replies; swap in a live
chat/AI assistant) and the two demo forms (see step 6).

---

## Simulated vs. Connected Features

| Feature | Status |
| --- | --- |
| Estimate form (5 steps) | **Simulated** — validates + confirms, sends nothing. Progress auto-saves to this browser's localStorage only; "Start over" or a successful (demo) submit clears it |
| Contact form | **Simulated** — sends nothing |
| Chat widget | **Simulated** — prewritten replies only |
| Lead-flow automation panel | **Simulated** — static example cards |
| Phone / email / address | **Placeholders** — not real, not monitored |
| Reviews | **Placeholders** — empty by design |
| Booking calendar | **Not connected** — config key ready |
| CRM / notifications | **Not connected** — README step 8 |

---

## Deployment

The project is a standard Next.js (App Router) application:

```bash
bun run build   # production build (standalone output)
bun run start   # serve the production build
```

Any Node host works (Vercel, Netlify, Railway, a VPS with Node 20+). No
database, no paid services, no API keys — the demo runs entirely front-end.

---

## Go-live Checklist (Demo → Real Business Site)

When a client signs off, work through these items before launch:

1. **Set the real domain** in `src/config/site.ts` → `siteUrl` (drives
   `metadataBase` so Open Graph/Twitter image URLs resolve, and powers
   `/sitemap.xml` — generated by `src/app/sitemap.ts`).
2. **Allow crawling**: replace `public/robots.txt` (`Disallow: /` → allow)
   and add a `Sitemap:` line pointing at the live `/sitemap.xml`.
3. **Replace placeholder contact details** (phone, email, address, hours) in
   `siteConfig.business`.
4. **Connect the forms** to a real inbox/CRM — README step 6 — and remove the
   demo disclosure text near each form.
5. **Replace simulated features** (chat widget, lead-flow walkthrough, review
   placeholders) — README step 8 — or remove them.
6. **Swap sample imagery** for real project photos the client owns the rights
   to, and update each image's alt text to describe the actual photo. The
   1200×630 social share card lives at `public/images/og-banner.jpg`
   (`siteConfig.images.ogBanner`) — regenerate it from a real project photo.
7. **Trust signals**: only after the client provides verifiable proof, add
   license numbers, real reviews, and award/association mentions.
8. **Social profiles**: fill `siteConfig.socialLinks` once real accounts
   exist.

---

## Accessibility & Compliance Notes

- Skip-to-content link, semantic landmarks, labeled forms, keyboard-operable
  menus / accordion / filters / lightbox, focus-visible rings.
- Animations respect the user's `prefers-reduced-motion` setting.
- No fabricated trust signals: no star ratings, award badges, license
  claims, or invented reviews anywhere.
- Demo disclosure appears in the footer, near every form, in the chat widget,
  and on the lead-flow panel.
- Footer credit: *"Website concept by AI Automation NY"* → aiautomationny.com.
