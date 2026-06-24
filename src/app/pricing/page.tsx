import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Get C.H.A.T., the chat helper tool for OnlyFans and Fansly chatters. One-time purchase, lifetime license, instant key delivery by email.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Pricing</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Get C.H.A.T.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        One-time purchase, locked to your machine. Checkout, license key
        delivery, and email verification are being wired up in the next build
        phase — this is a layout preview.
      </p>

      <div className="mt-10 rounded-2xl card-border bg-background-soft p-8 text-center">
        <p className="text-sm font-medium text-accent-soft">Lifetime license</p>
        <p className="mt-2 text-5xl font-bold">$XX</p>
        <p className="mt-1 text-sm text-muted">one-time, one machine</p>
        <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left text-sm text-muted">
          <li>• Full snippet library, unlimited pages & cards</li>
          <li>• Live PPV & tip tracking for 2 models</li>
          <li>• One-click shift reports</li>
          <li>• CLS Notifier, clock & interval alarm</li>
          <li>• All 4 themes, sound packs, mascot</li>
        </ul>
        <button
          disabled
          className="mt-8 w-full cursor-not-allowed rounded-full bg-accent/50 px-6 py-3 text-sm font-semibold text-white"
        >
          Checkout coming online soon
        </button>
      </div>
    </div>
  );
}
