# The Soul Mirror by Janvi — Website (Next.js)

A proper multi-page website, not standalone HTML files. It's built with **Next.js (App Router)**, which means:

- One shared layout (`app/layout.jsx`) wraps every page — the navbar, footer, and **theme** live outside individual pages.
- Navigation between pages uses client-side routing (`next/link`), so the whole app behaves like a single application, not separate reloading files.
- The dark/light theme is saved to `localStorage` and re-applied via a tiny script that runs *before* the page paints — so it now stays consistent across every page instead of resetting to light on navigation (this was the exact bug in the old plain-HTML version).

## Running it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

To build the production version:
```bash
npm run build
npm run start
```

## Deploying

The easiest path is [Vercel](https://vercel.com) (made by the same team as Next.js):
1. Push this folder to a GitHub repo.
2. Import the repo in Vercel — it auto-detects Next.js, no config needed.
3. Deploy.

It also works on any Node.js host (Render, Railway, a VPS, etc.) via `npm run build && npm run start`.

## Project structure

```
app/
  layout.jsx          → root layout: fonts, theme script, navbar, footer, WhatsApp button
  globals.css          → all design tokens (colors, type, spacing) + component styles
  page.jsx              → Home
  about/page.jsx         → About / My Journey
  services/page.jsx       → Services listing
  services/[slug]/page.jsx → Individual service page (data-driven, one file for all 6 services)
  reviews/page.jsx        → Client reviews
  contact/page.jsx + ContactForm.jsx → Contact page
  booking/page.jsx + BookingFlow.jsx  → 4-step booking flow
components/
  ThemeProvider.jsx   → dark/light theme context + localStorage persistence
  Navbar.jsx           → nav bar, active link highlighting, mobile menu, theme toggle
  Footer.jsx
  WhatsAppFloat.jsx
  ServiceIcon.jsx      → shared icon set for each service type
  Faq.jsx               → accordion used on service detail pages
  Reveal.jsx            → scroll-reveal animation wrapper
lib/
  services-data.js     → single source of truth for all services, pricing, FAQs, testimonials
```

To add a 7th service, add one object to `lib/services-data.js` — a new page at
`/services/your-new-slug` is generated automatically, no new file needed.

## What's real vs. what's a front-end demo

This is the **client-facing website** — fully working navigation, theming, responsive layout,
and interactive flows. It is **not yet wired to a backend**, so a few things are demonstration-only:

| Feature | Status |
|---|---|
| Pages, navigation, theme, responsive layout | ✅ Fully working |
| FAQ accordions, mobile menu, scroll reveals | ✅ Fully working |
| Booking flow steps (service → date/time → details → confirmation) | ✅ Fully working UI |
| "Pay Securely with Razorpay" button | ⚠️ Front-end only — jumps straight to the confirmation screen. A real integration needs a server-side Razorpay Order creation call plus webhook signature verification before a booking is actually confirmed. |
| Calendar availability (dates/slots shown) | ⚠️ Static sample data in `BookingFlow.jsx` — needs a real backend to check actual availability and prevent double-booking. |
| Contact form | ⚠️ Shows a success message but doesn't send anywhere yet — needs an API route + email service (e.g. Resend/Postmark) or a form service. |
| Confirmation & reminder emails | ❌ Not built — needs a transactional email service. |
| Admin dashboard | ❌ Not built — a separate authenticated area for managing bookings, availability, services and testimonials. |

## Suggested next phase (backend)

1. Add a database (Postgres via Supabase/Neon, or MongoDB) for services, availability, and bookings.
2. Add Next.js **Route Handlers** (`app/api/.../route.js`) for: creating a Razorpay order, verifying the payment webhook, saving the booking, and sending confirmation/reminder emails.
3. Add an authenticated `/admin` section for Janvi to manage bookings, availability, services, and testimonials without touching code.
4. Swap the static arrays in `lib/services-data.js` for data fetched from the database.

Happy to build any of these next — the frontend is already structured so the data layer can be swapped in without touching the pages themselves.
