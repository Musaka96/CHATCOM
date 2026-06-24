import type { Metadata } from "next";
import TeamsContactForm from "@/components/TeamsContactForm";

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

      <TeamsContactForm />
    </div>
  );
}
