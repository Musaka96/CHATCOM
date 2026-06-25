import type { Metadata } from "next";
import { PRICE_CENTS } from "@/lib/config";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Get C.H.A.T., the chat helper tool for OnlyFans and Fansly chatters. One-time purchase, lifetime license, instant key delivery by email.",
};

export default function PricingPage() {
  const priceDisplay = (PRICE_CENTS / 100).toFixed(2).replace(/\.00$/, "");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Pricing</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Get C.H.A.T.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        One-time purchase, locked to your machine. Enter your email, pay
        through Stripe, and your license key lands in your inbox automatically.
      </p>

      <div className="mt-10 rounded-2xl card-border bg-background-soft p-8 text-center">
        <p className="text-sm font-medium text-accent-soft">Lifetime license</p>
        <p className="mt-2 text-5xl font-bold">${priceDisplay}</p>
        <p className="mt-1 text-sm text-muted">one-time, one machine</p>
        <p className="mt-1 text-xs font-semibold text-muted">Windows only — no Mac or Linux support</p>
        <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left text-sm text-muted">
          <li>• Full snippet library, unlimited pages & cards</li>
          <li>• Live PPV & tip tracking for 2 models</li>
          <li>• One-click shift reports</li>
          <li>• CLS Notifier, clock & interval alarm</li>
          <li>• All 4 themes, sound packs, mascot</li>
        </ul>
        <CheckoutForm />
      </div>
    </div>
  );
}
