import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alerts & Reminders for Chatters",
  description:
    "Stackable PPV reminders and a repeating mass-message alarm built into C.H.A.T., the chat helper tool for OnlyFans and Fansly chatters.",
};

export default function AlertsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Alerts</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Never lose track of a timer mid-conversation
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Shifts are full of small timed obligations — a follow-up you promised
        in five minutes, a check-in you need to remember. C.H.A.T. bundles two
        lightweight tools so you never have to keep that in your head.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl card-border bg-background-soft p-6">
          <Image
            src="/images/alerts-clsnotifier.png"
            alt="CLS Notifier window"
            width={237}
            height={225}
            className="mx-auto mb-4 max-w-[200px] rounded-xl card-border"
          />
          <h2 className="text-xl font-bold">Never forget to send that &quot;live&quot; PPV</h2>
          <p className="mt-3 text-sm text-muted">
            Pick a duration anywhere from 1 to 10 minutes, give it an optional label,
            and a popup reminds you the instant it's done. Start as many as
            you want — a new one never cancels or disturbs ones already
            counting down. Run five at once if you need to.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• Fully stackable, independent timers</li>
            <li>• Optional name/label per notifier</li>
            <li>• Pops up exactly when it elapses, no checking required</li>
          </ul>
        </div>
        <div className="rounded-2xl card-border bg-background-soft p-6">
          <Image
            src="/images/alerts-mmclock.png"
            alt="MM clock window"
            width={236}
            height={225}
            className="mx-auto mb-4 max-w-[200px] rounded-xl card-border"
          />
          <h2 className="text-xl font-bold">Never miss an MM again</h2>
          <p className="mt-3 text-sm text-muted">
            A small persistent digital clock window, plus a repeating alarm —
            set a start time and a repeat interval in minutes, and it rings on
            that schedule with a silence/snooze control.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• Always-visible digital clock</li>
            <li>• Repeats on your own interval, not just once</li>
            <li>• Keeps ringing on schedule even if you close the clock window</li>
          </ul>
        </div>
      </div>

      <div className="mt-14 rounded-2xl card-border bg-background-soft/60 p-6 text-center">
        <p className="text-muted">Ready to stop relying on memory for your timers?</p>
        <Link
          href="/pricing"
          className="mt-4 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft"
        >
          Get C.H.A.T.
        </Link>
      </div>
    </div>
  );
}
