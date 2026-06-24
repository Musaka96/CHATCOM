import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanks for your purchase",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-bold">You're in.</h1>
      <p className="mt-4 text-muted">
        Your payment went through. Your license key is on its way to your
        inbox — it usually arrives within a minute or two. Check spam if you
        don&apos;t see it shortly.
      </p>
      <p className="mt-4 text-muted">
        Next step:{" "}
        <Link href="/setup" className="text-accent-soft underline">
          follow the setup guide
        </Link>{" "}
        to install and activate.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full border border-white/10 px-6 py-3 text-sm font-semibold hover:bg-white/5"
      >
        Back to home
      </Link>
    </div>
  );
}
