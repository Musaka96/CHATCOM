import type { Metadata } from "next";
import FeatureRequestForm from "@/components/FeatureRequestForm";

export const metadata: Metadata = {
  title: "Request a Feature",
  description: "Got an idea for C.H.A.T.? Send it straight over — every request gets read.",
};

export default function FeatureRequestPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Feature Requests</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Tell us what you want C.H.A.T. to do next
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        This app gets built around what actually helps chatters during a
        shift. If there&apos;s something missing, something that bugs you, or
        an idea you want to see added, write it up below and it goes straight
        to the inbox.
      </p>

      <FeatureRequestForm />
    </div>
  );
}
