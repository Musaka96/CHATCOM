import type { Metadata } from "next";
import Link from "next/link";
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
        One-time purchase, locked to your machine. Enter your email, complete
        checkout, and your license key lands in your inbox automatically.
      </p>

      <div className="mt-10 rounded-2xl card-border bg-background-soft p-8 text-center">
        <p className="text-sm font-medium text-accent-soft">C.H.A.T. — Lifetime License</p>
        <p className="mt-2 text-5xl font-bold">${priceDisplay}</p>
        <p className="mt-1 text-sm text-muted">one-time payment, no subscription — one machine</p>
        <p className="mt-1 text-xs font-semibold text-muted">Windows only — no Mac or Linux support</p>
        <p className="mx-auto mt-6 max-w-sm text-sm text-muted">
          C.H.A.T. is a desktop app for Windows. Right after payment, we email
          you your <span className="font-semibold text-foreground">license key</span> and a{" "}
          <span className="font-semibold text-foreground">download link</span> for
          the installer — download the app, then paste your key on first launch
          to activate it.
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          Want the full breakdown of what's inside?{" "}
          <Link href="/features" className="font-semibold text-accent-soft underline hover:text-accent">
            See every feature
          </Link>
          .
        </p>
        <CheckoutForm />
        <p className="mt-4 text-xs text-muted">
          Taxes may apply and will be calculated at checkout.
        </p>
      </div>
    </div>
  );
}
