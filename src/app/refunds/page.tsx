import type { Metadata } from "next";
import { OWNER_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "C.H.A.T. refund policy — when and how to request a refund.",
};

export default function RefundsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Legal</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Refund Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: June 2026</p>

      <div className="mt-10 space-y-8 text-muted">
        <section>
          <h2 className="text-lg font-bold text-foreground">When you can get a refund</h2>
          <p className="mt-2">
            C.H.A.T. is licensed as a one-time purchase. If the app does not
            work correctly on your device, you can request a refund within{" "}
            <strong className="text-foreground">7 days</strong> of your
            purchase date. To qualify:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Your purchase must be 7 days old or less.</li>
            <li>
              You need to show that the app isn&apos;t working as intended on
              your device — for example, a screenshot or short screen
              recording of the issue, along with basic details about your
              Windows version.
            </li>
            <li>
              We&apos;ll try to help you fix the issue first. If we can&apos;t
              get it working, we&apos;ll issue a full refund.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">How to request one</h2>
          <p className="mt-2">
            Email us at{" "}
            <a href={`mailto:${OWNER_EMAIL || "support@chathelper.app"}`} className="text-accent-soft underline">
              {OWNER_EMAIL || "support@chathelper.app"}
            </a>{" "}
            with your purchase email, a description of the problem, and proof
            (screenshot or recording). We&apos;ll respond within a few business
            days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">What isn&apos;t covered</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Requests made more than 7 days after purchase.</li>
            <li>
              Change-of-mind refunds where the app is working as described.
            </li>
            <li>
              Issues caused by running the app on an unsupported operating
              system, or by modifying/tampering with the application files.
            </li>
            <li>
              A license key that has already been activated and is later
              found to be shared or resold in violation of the license terms.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">After a refund</h2>
          <p className="mt-2">
            Once a refund is issued, your license key is deactivated and can
            no longer be used to activate the app on any machine.
          </p>
        </section>
      </div>
    </div>
  );
}
