import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Agencies & Teams",
  description:
    "Running multiple OnlyFans or Fansly chatters? Get in touch about multi-seat licensing for C.H.A.T., the chat helper tool built for chatters.",
};

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">For Teams</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Running an agency with multiple chatters?
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        C.H.A.T. is built and priced around a single chatter on a single
        machine. If you manage a roster of chatters and want to talk about
        multiple seats, onboarding, or anything custom, reach out directly —
        this is handled separately from the individual purchase flow.
      </p>

      <form className="mt-10 space-y-4 rounded-2xl card-border bg-background-soft p-6 sm:p-8">
        <div>
          <label className="block text-sm font-medium text-muted" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted" htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="jane@agency.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted" htmlFor="seats">
            How many chatters / seats?
          </label>
          <input
            id="seats"
            name="seats"
            type="text"
            className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="e.g. 8"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted" htmlFor="message">
            What do you need?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="Tell us a bit about your team..."
          />
        </div>
        <button
          type="submit"
          disabled
          className="w-full cursor-not-allowed rounded-full bg-accent/50 px-6 py-3 text-sm font-semibold text-white"
        >
          Send (wiring up email delivery next)
        </button>
        <p className="text-xs text-muted">
          This form isn&apos;t connected yet — it&apos;ll be wired up to email
          delivery in the next build phase.
        </p>
      </form>
    </div>
  );
}
