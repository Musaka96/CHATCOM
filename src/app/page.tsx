import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Paste it before they notice you paused",
    body:
      "A library of your best responses, organized into pages and color-coded cards so every line is exactly where you expect it — no digging through notes under pressure. Click to paste instantly into whatever you're typing in. Ctrl+click and it sends itself. No more re-typing the same line for the hundredth time tonight.",
    image: "/images/feature-snippets.gif",
    imgClassName: "max-w-sm mx-auto",
    tag: "Instant snippet paste",
  },
  {
    title: "Your scripts, your way, everywhere you need them",
    body:
      "Build out as many pages as you want, drag cards to reorder, pop a page out into its own resizable floating window so your go-to line is always one click away — even across multiple monitors. Cards support full rich text too, so a line copied with custom colors, sizes, or formatting pastes exactly as styled, not as flat plain text. Collapse down to just your favorites whenever you want a cleaner, less cluttered view.",
    image: "/images/scripts-popout.gif",
    imgClassName: "max-w-md mx-auto",
    tag: "Custom scripts & pages",
  },
  {
    title: "Log the PPV the second it sells",
    body:
      "Two independent running totals, one-click preset amounts for PPV unlocks and tips, a goal bar that fills up as you go, and a confetti pop every $1,000. Watching the number grow is half the motivation. Every sale, tip, and goal number is editable after the fact too — nothing is locked in just because you clicked it.",
    image: "/images/feature-sales.gif",
    imgClassName: "max-w-xs mx-auto",
    tag: "Live PPV & tip tracking",
  },
  {
    title: "Set it up once, run it your way every shift",
    body:
      "Rename each model, set your own session goal, and build out your own preset amounts for both PPVs and tips — so the one-click buttons match the prices you actually charge, not someone else's defaults. Change any of it mid-shift without losing your running totals.",
    image: "/images/feature-sales-edit.png",
    imgClassName: "max-w-xs mx-auto",
    tag: "Fully customizable presets",
  },
  {
    title: "Hand off a clean report without typing a thing",
    body:
      "One click formats both models' totals, every PPV sold, every tip, and your notes into a single block of text — ready to paste into whatever you use to report your shift. Fully editable before you send it, so a misclicked amount is a quick fix, not a redo. There's even a dedicated field for sales to other chatters, so nothing falls through the cracks.",
    image: "/images/feature-report.png",
    imgClassName: "max-w-xs mx-auto",
    tag: "One-click shift reports",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-soft">
              Built for solo chatters, not call centers
            </span>
            <span className="ml-2 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted">
              Windows only
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Stop alt-tabbing.
              <br />
              <span className="text-accent-soft">Start selling PPVs.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
              C.H.A.T. floats over any chat platform and never steals your keyboard
              focus. Send your best lines in one click, log every PPV the second
              it sells, and walk away from your shift with a report already done.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent-soft"
              >
                Get C.H.A.T. now
              </Link>
              <Link
                href="#features"
                className="rounded-full border border-white/10 px-6 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-white/5"
              >
                See what it does
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted">
              One-time purchase. Locked to your machine. Windows only — no
              Mac or Linux support. No subscriptions, no API access to your
              chat platform, no middleman reading your messages.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/images/hero-app.gif"
              alt="C.H.A.T. overlay panel preview"
              width={765}
              height={529}
              className="w-full rounded-2xl card-border"
              unoptimized
              priority
            />
          </div>
        </div>
      </section>

      {/* Pain section */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Every second alt-tabbed is a second someone else is faster than you.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Hunting through notes for the right line. Typing the same price out
            for the fifth time tonight. Losing track of which tip you already
            logged. It's not that you don't know what to say — it's that getting
            it onto the screen fast enough is its own job. C.H.A.T. is the part
            of the job you shouldn't have to think about.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Everything you need on shift</h2>
          <p className="mt-3 text-muted">
            A handful of things it does extremely well, instead of fifty things it does badly.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-16">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">
                  {f.tag}
                </span>
                <h3 className="mt-2 text-2xl font-bold">{f.title}</h3>
                <p className="mt-3 text-muted">{f.body}</p>
              </div>
              <Image
                src={f.image}
                alt={f.title}
                width={800}
                height={600}
                unoptimized={f.image.endsWith(".gif")}
                className={`w-full rounded-2xl card-border ${f.imgClassName ?? ""}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Built for chatters */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Built for the person typing, not the company watching</h2>
              <p className="mt-4 text-muted">
                C.H.A.T. doesn't connect to any platform's API, doesn't log your
                conversations, and doesn't report anything to anyone. It works at
                the OS level — clipboard and keystrokes — purely to make you
                faster. It's your tool, on your machine, for your shift.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                ["No connection to your chat platform", "Works on top of any app — zero API access"],
                ["Never steals focus", "Click a card without ever leaving the chat box"],
                ["Four themes + a mascot", "Including a fully restyled retro 90s mode"],
                ["Double-Ctrl to vanish", "Instantly hide everything for a screen share"],
              ].map(([t, s]) => (
                <div key={t} className="rounded-xl card-border bg-background-soft p-4">
                  <p className="text-sm font-semibold">{t}</p>
                  <p className="mt-1 text-xs text-muted">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personality / themes */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="sm:max-w-md">
            <h2 className="text-3xl font-bold">Make it feel like yours</h2>
            <p className="mt-3 text-muted">
              Deep-space purple, steel blue, dark forest green, or go full
              mid-90s retro chrome. Pick a sound set, mute it entirely, or let
              the mascot react every time you sell a PPV.
            </p>
          </div>
          <Image
            src="/images/mascot.png"
            alt="C.H.A.T. mascot"
            width={140}
            height={140}
            className="h-28 w-28 rounded-xl object-cover sm:h-36 sm:w-36"
          />
        </div>
      </section>

      {/* Testimonials (placeholder) */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-center text-3xl font-bold">Chatters are already faster with it</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-xs text-muted">
            (Placeholder quotes — swap these for real ones whenever you're ready)
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["\"I stopped losing track of PPVs and tips the first night I used it.\"", "— Chatter, 2 models"],
              ["\"Ctrl+click to send is the single best feature on this thing.\"", "— Night shift chatter"],
              ["\"The report alone saves me 15 minutes at the end of every shift.\"", "— Solo chatter"],
            ].map(([quote, name]) => (
              <div key={name} className="rounded-xl card-border bg-background p-5">
                <p className="text-sm text-foreground/90">{quote}</p>
                <p className="mt-3 text-xs text-muted">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More to explore */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">There's more under the hood</h2>
            <p className="mt-3 text-muted">
              The snippets and PPV tracking are just the start — two more
              built-in tools keep the rest of your shift running smoothly.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Link
              href="/alerts"
              className="group rounded-2xl card-border bg-background-soft p-6 transition hover:border-accent/40"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Alerts</span>
              <h3 className="mt-2 text-xl font-bold">
                Never forget to send that &quot;live&quot; PPV
              </h3>
              <p className="mt-2 text-sm text-muted">
                Stackable countdown reminders plus a repeating mass-message
                alarm, so timed follow-ups never slip through.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent-soft transition group-hover:translate-x-1">
                See how it works →
              </span>
            </Link>
            <Link
              href="/scripts"
              className="group rounded-2xl card-border bg-background-soft p-6 transition hover:border-accent/40"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Sharing Scripts</span>
              <h3 className="mt-2 text-xl font-bold">Organize, pop out, and share your snippet library</h3>
              <p className="mt-2 text-sm text-muted">
                Drag cards between pages and windows, then export a single
                page to share with another chatter without handing over your
                whole setup.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent-soft transition group-hover:translate-x-1">
                See how it works →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Your shift starts faster tonight.</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          One purchase. Locked to your PC. A key sent straight to your inbox.
          Up and running before your next chat comes in.
        </p>
        <Link
          href="/pricing"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent-soft"
        >
          Get C.H.A.T. now
        </Link>
      </section>
    </div>
  );
}
