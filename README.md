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

## Login and admin setup

Authentication uses NextAuth and MongoDB Atlas via Prisma. Before using login,
copy `.env.example` to `.env.local` and set `DATABASE_URL`, `AUTH_SECRET`,
`ADMIN_EMAIL`, and a strong `ADMIN_PASSWORD`. Never commit `.env.local`.

After MongoDB Atlas is available and `DATABASE_URL` is set, run:

```bash
npx prisma generate
npm run db:push
npm run db:seed
```

Users register at `/register` and sign in at `/login`. They can only see their
own `/dashboard` appointments. The owner signs in with the seeded admin account
and uses `/admin`; the server checks the `ADMIN` role before rendering the
dashboard, users, appointments, or analytics pages.

The project uses MongoDB Atlas. Create a database user, allow your development
IP address in Atlas Network Access, and set the Atlas connection string in
`DATABASE_URL`. MongoDB must be reachable before `db:push` and `db:seed`.

## Razorpay payments

The booking flow uses Razorpay Standard Checkout. The server creates the order,
checks the payment signature, confirms the order amount and owner, and only then
creates the appointment in MongoDB Atlas.

1. Create a Razorpay account and complete KYC if required for live payments.
2. In Razorpay Dashboard, open **Account & Settings > API Keys** and generate
  Test Mode keys for development. Use Live Mode keys only in production.
3. Add these values to `.env.local` (never expose the secret key or commit it):

```env
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
```

4. Restart the development server after changing environment variables:

```bash
npm run dev
```

5. Sign in, choose a service, complete the form, and click the payment button.
Razorpay Test Mode accepts test payment details from its documentation; do not
use real cards while using `rzp_test_` keys.
6. Confirm the result in Razorpay Dashboard under **Transactions > Payments**
and in MongoDB Atlas under `soulmirror.Appointment`.

For production, replace both keys with `rzp_live_` credentials, configure a
Razorpay webhook for payment events, and verify webhook signatures before using
them for reconciliation. The success callback is already server-verified, but
webhooks are recommended for handling delayed or interrupted payment states.

## EmailJS booking notifications

The booking flow sends the submitted customer and session details to
`tarotjanvi@gmail.com` after the current demo payment step. Copy `.env.example`
to `.env.local` and replace `your_emailjs_public_key` with the Public Key from
EmailJS. The Service ID and Template ID are already configured.

In EmailJS, configure the template recipient as `{{to_email}}` and use this
template content:

**Subject**

```text
New session appointment request - {{session_name}}
```

**Message / HTML**

```html
<h2>New Session Appointment Request</h2>
<p><strong>Customer name:</strong> {{customer_name}}</p>
<p><strong>Customer email:</strong> {{customer_email}}</p>
<p><strong>Phone / WhatsApp:</strong> {{customer_phone}}</p>
<hr>
<p><strong>Session:</strong> {{session_name}}</p>
<p><strong>Duration:</strong> {{session_duration}}</p>
<p><strong>Session fee:</strong> {{session_fee}}</p>
<p><strong>Emergency consultation:</strong> {{emergency_consultation}}</p>
<p><strong>Total payment:</strong> {{total_payment}}</p>
<p><strong>Payment status:</strong> {{payment_status}}</p>
<hr>
<p><strong>Customer notes:</strong></p>
<p>{{customer_notes}}</p>
```

The current Razorpay button is still a demo checkout. Connect a real payment
gateway and verify its server-side webhook before treating the email status as
proof of a completed payment.

## Contact Us EmailJS template

The Contact Us form uses Service ID `service_rpo0iml` and Template ID
`template_43o3y7b`, sending messages to `tarotjanvi@gmail.com`. Configure the
EmailJS template recipient as `tarotjanvi@gmail.com`, the Reply To field as
`{{reply_to}}`, and the From Name field as `{{name}}`.

**Subject**

```text
Contact enquiry - {{title}}
```

**Message / HTML**

```html
<h2>New Contact Us Enquiry</h2>
<p><strong>Name:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone / WhatsApp:</strong> {{phone}}</p>
<p><strong>Interested in:</strong> {{title}}</p>
<hr>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
```

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
