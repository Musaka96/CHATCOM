# C.H.A.T. Marketing & Sales Website — Build Plan

Status: **NOT STARTED — waiting for go-ahead.**

This is the step-by-step plan for building the public website that sells C.H.A.T.
(Chews Hot Awesome Texting), reads from [PRODUCT_OVERVIEW.md](../ChatHelper/ChatHelper/PRODUCT_OVERVIEW.md).
Nothing gets built until you say "start." Phases are ordered so each one
produces something runnable/testable before moving to the next — we can also
stop after any phase and ship what exists.

---

## 0. Stack decision

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript | Best Vercel fit, file-based routing for the labeled top-nav sections, server actions for the purchase backend, no separate API server needed |
| Styling | Tailwind CSS | Fast to theme, easy for you to restyle later |
| Database | Vercel Postgres (Neon under the hood) via Prisma | Needed to store license keys + which buyer got which key + order audit log. Free tier is enough to start |
| Payments | Stripe Checkout (hosted page) | You never touch card data, PCI compliance is Stripe's problem, has a clean webhook to confirm a real paid order before a key is ever issued |
| Email delivery | Resend | Cheap, simple API, good deliverability, easy "send license key" transactional email |
| Admin auth | A single hashed admin password in an env var + signed cookie session (no third-party auth needed for one admin user) | You're the only admin; no need for a full user system |
| Key storage encryption | AES-256-GCM, encryption key in an env var (`KEY_ENCRYPTION_SECRET`), never logged, never sent to the client | Keys stay unreadable even if the DB leaks; only the running server process can decrypt |
| Hosting | Vercel | Matches your ask, Next.js native |

---

## 1. Project scaffold

- `npx create-next-app` with TypeScript + Tailwind + App Router in `G:\Chewdlaka\Dev\Projects\ChatHelperWebsite`.
- Base layout, fonts, color tokens (theme: modern, clean, a little dark/moody to match the app's "deep-space purple" identity, but restrained — no glassmorphism overload, no excessive animation).
- `/public/images/` folder with placeholder images and a `public/images/README.md` explaining exactly which file maps to which spot on the site (hero shot, feature screenshots x4, mascot, og-image) so you can swap files 1:1 without touching code.
- Placeholder images generated as clean SVG/abstract mockups (not real screenshots, since the real app isn't being captured here) — clearly labeled "placeholder" in a corner watermark so nothing ships looking like a fake screenshot by accident.

## 2. Top navigation & site structure

Persistent top nav with labeled jump-links/pages:
- **Home** (landing/scrolling page)
- **Features** (in-page anchor on landing)
- **Alerts** (CLS Notifier + Clock/Interval alarm — own page)
- **Sharing Scripts** (snippet library / page import-export story — own page)
- **Setup** (install, activation, machine-binding explainer — own page)
- **Pricing / Buy** (own page, the actual checkout)
- **For Teams** (the "companies" contact section — own page with a contact form)

## 3. Landing page (scrollable, single page)

Sections, top to bottom:
1. Hero — bold hook aimed at an individual chatter ("you're losing money every second you're not typing"), primary CTA "Get C.H.A.T." scrolling/linking to Pricing.
2. Pain/agitation section — the cost of alt-tabbing, slow replies, missed sales, forgetting to log a tip.
3. Feature showcase (the big four, each with a placeholder visual):
   - Instant snippet paste (incl. Ctrl+click to send)
   - Custom scripts / pages / organization
   - Instant sale & tip logging with quick-amount buttons
   - Live shift report generation
4. "Built for chatters, not companies" trust section — speaks directly to a solo operator, casual/confident copy, not corporate.
5. Themes/personality showcase (the 4 themes + mascot) — fun, low-stakes section to humanize the product.
6. Social-proof style section (placeholder testimonials, clearly marked as placeholder copy for you to replace).
7. Final CTA banner → Pricing.
8. Footer with nav links + the "For Teams" contact link.

Copy tone: direct, casual, a little hype, written to one person doing a shift — not "streamline your enterprise workflow."

## 4. Secondary pages

- **/alerts** — explains CLS Notifier stacking + clock/interval alarm, why it matters during a shift.
- **/scripts** — explains the page/card snippet system, drag-to-reorder, pop-out windows, page import/export for sharing snippet sets with other chatters.
- **/setup** — plain-language walkthrough: download → activation code → machine-bound license → done. Sets expectations before purchase.
- **/teams** — short page acknowledging agencies/companies managing multiple chatters, with a contact form (sends you an email via Resend; no live chat widget needed) — explicitly separate funnel from the individual sales page so the main pitch stays personal.

## 5. Purchase & licensing backend (the core system)

**Data model (Prisma/Postgres):**
- `LicenseKey`: id, `encryptedKey`, status (`unused` / `assigned`), assignedAt, createdAt
- `Order`: id, buyerEmail, stripeSessionId, stripePaymentIntentId, licenseKeyId (nullable until fulfilled), status (`pending`/`paid`/`fulfilled`/`failed`), createdAt
- Index/unique constraint on `stripeSessionId` so a webhook retry can never double-issue a key for the same order.

**Flow:**
1. Buyer lands on `/buy`, enters email, clicks purchase → server action creates a Stripe Checkout Session (amount fixed server-side, not trusted from client) and an `Order` row (`pending`), redirects to Stripe.
2. Stripe handles the actual card entry — your site and DB never see card numbers.
3. Stripe sends a `checkout.session.completed` webhook to `/api/webhooks/stripe`. Handler:
   - Verifies the Stripe signature (rejects anything not actually from Stripe).
   - Looks up the `Order` by session id, confirms it's not already `fulfilled` (idempotency).
   - Atomically claims one `unused` `LicenseKey` row (DB transaction with `SELECT ... FOR UPDATE`-style locking) and flips it to `assigned`, linking it to the order and the buyer's email.
   - Decrypts that one key in memory only long enough to put it in the outgoing email body, then discards it from memory.
   - Sends the buyer an email via Resend: the decrypted key, a download link for the installer, and the activation instructions pulled from `/setup`.
   - Marks `Order` as `fulfilled`.
4. Buyer gets the email, downloads the app, runs the activation flow already built into the WPF app (your existing activation server handles the actual machine-binding — this website only needs to hand over a valid, never-reused key).
5. If no `unused` keys remain, the webhook instead emails *you* an alert and marks the order `failed` so you can top up keys and manually fulfill — buyer is shown a "we'll email you shortly" success page rather than a silent failure.

**Admin side (`/admin`, password-gated):**
- Login screen (admin password from env, compared via constant-time hash check, sets a signed session cookie).
- "Add keys" form/textarea: paste one key per line → server encrypts each with AES-256-GCM before insert → never displayed again in plaintext anywhere in the UI after that.
- Orders table: buyer email, order status, which key (masked, e.g. `XXXX-XXXX-1234`) was assigned, timestamp — so you always know which key went to which buyer.
- Manual "resend key email" / "manually fulfill" action for the no-keys-left edge case.
- Stock counter: how many unused keys remain, so you know when to upload more.

**Security notes baked into the plan:**
- Raw keys are encrypted at rest; only decrypted transiently during fulfillment or by you viewing a single masked/unmasked key on demand in admin (your choice — default to masked).
- Stripe webhook signature verification is mandatory, not optional.
- Admin route fully separate from buyer-facing auth; rate-limited login attempts.
- No card data, no PII beyond "email + which key" ever touches your DB.

## 6. Deployment

- `vercel.json` / project settings for env vars: `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `KEY_ENCRYPTION_SECRET`, `ADMIN_PASSWORD_HASH`, `APP_DOWNLOAD_URL`.
- Stripe webhook endpoint registered to the deployed `/api/webhooks/stripe` URL once live.
- README with: how to run locally, how to add your first batch of keys, how to test a purchase end-to-end with Stripe test mode before going live.

## 7. Stuff you'll need to provide before going live (not before development starts)

- A Stripe account (test mode is fine to develop against).
- A Resend account + a sending domain (or use their test domain initially).
- The price you want to charge.
- The real download URL/file for the installer once it's hosted somewhere (Vercel can serve it, or you can point to wherever you already host the .exe).
- Your batch of license keys, pasted into the admin panel once it's live.

---

## Execution order (what I'll actually do, in sequence, once you say go)

1. Scaffold Next.js + Tailwind project, base layout, color theme, placeholder image set.
2. Build the landing page (all scroll sections) with real copy, no backend yet.
3. Build the secondary pages: Alerts, Scripts, Setup, Teams (contact form, can start as a mailto/no-op and get wired to Resend in step 5).
4. Add Prisma schema + Postgres connection, local dev DB.
5. Build Stripe Checkout flow + webhook + Resend email fulfillment + admin panel (keys, orders, login).
6. Wire up Teams contact form to Resend.
7. Deployment pass: env vars, Vercel project, Stripe webhook URL, smoke test full purchase in Stripe test mode.
8. Handoff notes: how to swap placeholder images, how to add keys, how to flip Stripe to live mode.

Say "start" (or tell me which phase to jump to) whenever you're ready.
