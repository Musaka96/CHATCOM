import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Every feature in C.H.A.T., the Windows chat helper tool for OnlyFans and Fansly chatters — snippets, live earnings tracking, shift reports, reminders, themes, and more.",
};

type Section = { title: string; items: string[] };

const sections: Section[] = [
  {
    title: "Text snippets",
    items: [
      "Pages (tabs) → cards; unlimited of each",
      "Card = name + custom color + text body",
      "Click card → paste into focused app; Ctrl+click → paste + Enter",
      "Auto-Send toggle: inverts it (plain click sends, Ctrl = paste only)",
      "Rich-text (CF_HTML) preserved on paste, plain-text fallback",
      "Drag cards to reorder, onto another tab to move, across separate windows to copy",
      "Right-click card → edit name/color/text, duplicate, delete",
      "48-swatch color palette + live hex preview",
      "Pop any page out into its own floating, resizable, always-on-top window",
      "Favorite pages + collapse arrow to show only favorites",
      "Per-card system-wide shortcut (bare key or Ctrl+key), optional instant-send, duplicate-combo rejection, \"Shortcut Info\" label toggle",
    ],
  },
  {
    title: "Quick Page Maker",
    items: [
      "Bulk-create a whole page of card slots at once (set count, add/remove slots after)",
      "Optional name (falls back to text)",
      "Per-row color picker; multi-select rows → flat color or evenly-stepped gradient",
      "Doubles as a bulk card editor for an existing page (⚡ Edit Cards)",
    ],
  },
  {
    title: "Sales / earnings tracker",
    items: [
      "1–10 independent models (add/remove/rename in Edit Sales)",
      "Per-model sale + tip lists, running total",
      "Shared preset amount buttons + shared preset tip buttons (Ctrl = tip mode)",
      "✎ Custom Amount / Custom Tip entry (any one-off value)",
      "Per-model \"sales to other chatters\" note",
      "Session goal (wager) with proportional progress bar across all models",
      "Milestone confetti every $1,000; bigger celebration on hitting the goal",
      "Sound cue per sale/tip/goal",
      "Report editor: add/remove individual sale/tip line items per model",
      "Copy Report → pick which models to include → plain-text shift report",
      "Reset (animated flame \"are you sure\" confirmation)",
    ],
  },
  {
    title: "System-wide price quick-paste",
    items: [
      "Global hotkey (default Left Alt, rebindable) → price buttons above cursor anywhere",
      "Types the number via keystrokes (works in clipboard-blocking Electron apps)",
      "Click-outside dismiss; opt-in (off by default)",
    ],
  },
  {
    title: "Reminders / time",
    items: [
      "CLS Notifier: 1–10 min reminders, optional label, stackable/independent",
      "Digital clock window",
      "Repeating interval alarm (start time + interval, silence control, runs in background)",
    ],
  },
  {
    title: "Themes & look",
    items: [
      "4 visual themes: purple (chew), steel-blue (nemanja), forest-green (golub), Retro (Win95 chrome) — instant, all windows",
      "Per-theme ambient background particle palette (togglable)",
      "Independent sound themes: Off / Classic / Calm / Crazy",
      "👻 Transparent BG: main + float windows fully transparent (no bg/border/shadow)",
      "Theme-aware sales popup",
    ],
  },
  {
    title: "Window behavior / overlay",
    items: [
      "Frameless, rounded, semi-transparent, always-on-top",
      "Never steals keyboard focus; no taskbar entry",
      "Resizable + drag to move; native edge-resize on frameless window",
      "Ctrl double-press → hide/show everything instantly",
      "Auto Collapse (right-click): taskbar-style ducking — main → wager/sales bar, float → header; pops out on hover; per-window, persisted",
      "Wheel-scroll works anywhere on the window",
    ],
  },
  {
    title: "Mascot",
    items: [
      "Animated duck in corner (also opens About/Settings)",
      "Shake on card click / $1k milestone; spin on sale/tip; triple-spin on goal",
    ],
  },
  {
    title: "Config / data",
    items: [
      "Config Transfer (import + upgrade old config, auto-backup)",
      "Import Page (single page via text/JSON)",
      "All data stored locally next to the exe",
      "Backward-compatible config migration (incl. old 2-model → Models list)",
    ],
  },
  {
    title: "Licensing",
    items: [
      "Activation-code screen on first launch",
      "Remote server validation, machine-bound (cryptographically locked), local signed re-check afterward",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Features</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Everything inside C.H.A.T.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        C.H.A.T. is a desktop app for Windows, built for chatters who live in
        their inbox. Here&apos;s the full breakdown of what you get with your
        one-time, lifetime license.
      </p>

      <div className="mt-12 columns-1 gap-6 lg:columns-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="mb-6 break-inside-avoid rounded-2xl card-border bg-background-soft p-6"
          >
            <h2 className="text-lg font-bold">{section.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {section.items.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl card-border bg-background-soft/60 p-6 text-center">
        <p className="text-muted">One-time payment, no subscription. Windows only.</p>
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
