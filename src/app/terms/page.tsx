import type { Metadata } from "next";
import Link from "next/link";
import { OWNER_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for C.H.A.T.",
};

export default function TermsPage() {
  const contact = OWNER_EMAIL || "support@chathelper.app";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Legal</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted">Last updated: June 2026</p>

      <div className="mt-10 space-y-8 text-muted">
        <section>
          <h2 className="text-lg font-bold text-foreground">1. Agreement</h2>
          <p className="mt-2">
            These Terms govern your purchase and use of C.H.A.T. (the
            &quot;App&quot;) and this website. By purchasing or using the App,
            you agree to these Terms. If you don&apos;t agree, don&apos;t use
            the App.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">2. License</h2>
          <p className="mt-2">
            When you purchase C.H.A.T., you&apos;re granted a non-exclusive,
            non-transferable license to install and use the App on a single
            machine, tied to the license key issued to you. You may not
            resell, sublicense, share, or distribute your license key, or
            attempt to circumvent the activation system.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">3. Payment</h2>
          <p className="mt-2">
            C.H.A.T. is sold as a one-time purchase per license. Prices are
            shown at checkout in the listed currency. Payment is processed by
            our third-party payment provider; we never see or store your card
            details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">4. Refunds</h2>
          <p className="mt-2">
            Refunds are handled under our{" "}
            <Link href="/refunds" className="text-accent-soft underline">
              Refund Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">5. Acceptable use</h2>
          <p className="mt-2">
            The App works at the operating-system level (clipboard and
            simulated keystrokes) to help you paste text and track your own
            sales data. You&apos;re responsible for how you use it, including
            compliance with the terms of any chat platform you use it
            alongside.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">6. No warranty</h2>
          <p className="mt-2">
            The App is provided &quot;as is,&quot; without warranties of any
            kind, express or implied. We don&apos;t guarantee the App will be
            error-free or uninterrupted, though we&apos;ll do our best to fix
            real issues — see our Refund Policy for what happens if the App
            doesn&apos;t work on your device.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">7. Limitation of liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, we are not liable for any
            indirect, incidental, or consequential damages arising from your
            use of the App, including lost income or lost sales during a
            shift.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">8. Termination</h2>
          <p className="mt-2">
            We may revoke a license key if these Terms are violated — for
            example, sharing or reselling a key. Refunded license keys are
            deactivated immediately.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">9. Changes</h2>
          <p className="mt-2">
            We may update these Terms from time to time. Continued use of the
            App after an update means you accept the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">10. Contact</h2>
          <p className="mt-2">
            Questions about these Terms? Email{" "}
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
