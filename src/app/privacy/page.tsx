import type { Metadata } from "next";
import { OWNER_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for C.H.A.T.",
};

export default function PrivacyPage() {
  const contact = OWNER_EMAIL || "support@chathelper.app";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Legal</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: June 2026</p>

      <div className="mt-10 space-y-8 text-muted">
        <section>
          <h2 className="text-lg font-bold text-foreground">What we collect</h2>
          <p className="mt-2">When you buy C.H.A.T., we collect:</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>The email address you provide at checkout, used to send your license key and order updates.</li>
            <li>Basic payment metadata from our payment provider (e.g. that a payment succeeded) — we never see or store your card number.</li>
            <li>If you use the Teams contact form: your name, email, and whatever you write in the message.</li>
          </ul>
          <p className="mt-3">
            The C.H.A.T. desktop app itself does not send your chat
            conversations, snippets, or sales data anywhere — that information
            stays stored locally on your machine, next to the app.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">How we use it</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>To deliver your license key and process your order.</li>
            <li>To respond to support or sales inquiries.</li>
            <li>To detect and prevent fraud or abuse of the license system.</li>
          </ul>
          <p className="mt-3">We don&apos;t sell your data, and we don&apos;t use it for advertising.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Third parties we use</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>A payment processor, to handle checkout securely.</li>
            <li>An email delivery provider, to send your license key and order emails.</li>
            <li>A hosting provider and database, to run this website and store order records.</li>
          </ul>
          <p className="mt-3">
            Each of these providers only receives the minimum information
            needed to do its job (e.g. your email and order amount).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Cookies</h2>
          <p className="mt-2">
            This site uses a single functional cookie for the admin login
            session. We don&apos;t use tracking or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Data retention</h2>
          <p className="mt-2">
            We keep order records (email, order status, which key was issued)
            for as long as needed to support license activation, refunds, and
            basic accounting. You can ask us to delete your data, subject to
            what we&apos;re legally required to retain for accounting purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Your rights</h2>
          <p className="mt-2">
            You can ask us what data we hold about you, request a correction,
            or request deletion at any time by emailing us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about this policy? Email{" "}
            <a href={`mailto:${contact}`} className="text-accent-soft underline">
              {contact}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
