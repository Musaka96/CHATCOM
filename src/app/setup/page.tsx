import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup & Activation Guide",
  description:
    "How to install and activate C.H.A.T., the chat helper tool for OnlyFans and Fansly chatters, from purchase to your first paste in under 5 minutes.",
};

const steps = [
  {
    title: "Buy & receive your key",
    body:
      "After checkout, you'll get an email at the address you entered with your license key and a link to download the installer. Keys are single-use and tied to your purchase.",
  },
  {
    title: "Install C.H.A.T.",
    body:
      "Run the installer like any other Windows app. No special permissions, no background services beyond the small input hooks needed for its own hotkey/focus features.",
  },
  {
    title: "Activate on first launch",
    body:
      "On first launch you'll see an activation screen. Enter your license key — it's validated against the activation server and cryptographically locked to that specific machine.",
  },
  {
    title: "You're set — no repeated checks",
    body:
      "Once activated, the license check is verified locally afterward using a signed certificate, so the app doesn't need to phone home every time you open it.",
  },
];

export default function SetupPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Setup</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        From purchase to your first paste in under 5 minutes
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        No accounts to create, no platform to connect. Here's exactly what
        happens after you buy.
      </p>

      <ol className="mt-12 space-y-8">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent-soft">
              {i + 1}
            </div>
            <div>
              <h2 className="text-lg font-bold">{s.title}</h2>
              <p className="mt-1 text-sm text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-2xl card-border bg-background-soft p-6">
        <h2 className="text-lg font-bold">A few things worth knowing</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>• One license key = one machine. A code can't be reused on a second computer.</li>
          <li>• Moving to a new PC? Reach out and we'll sort out re-binding your key.</li>
          <li>• All your snippets and sales data are stored locally on your machine, next to the app — never uploaded anywhere.</li>
          <li>• Upgrading from an old config? Use the in-app Transfer tool to bring everything over automatically.</li>
        </ul>
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/pricing"
          className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft"
        >
          Get C.H.A.T.
        </Link>
      </div>
    </div>
  );
}
