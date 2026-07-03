import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatting Scripts & Snippet Library",
  description:
    "Share a single page or move your whole C.H.A.T. setup between PCs. Export a page with a right-click and import it as text/JSON, or transfer a full config that upgrades and backs up automatically — plus color-coded pages, Quick Page Maker, and pop-out windows.",
};

const shareSteps = [
  {
    title: "Export the page",
    body:
      "Right-click the page's tab at the top and choose Export. That copies the whole page — every card, its name, color, and text — as a block of text/JSON you can send to anyone (paste it into a message, note, or file).",
  },
  {
    title: "They import it",
    body:
      "On the other end, they open the Import Page tool, paste in that text/JSON, and it adds just that one page to their library. Nothing else in their setup is touched — no cards overwritten, no colors changed.",
  },
];

const transferSteps = [
  {
    title: "Grab the config file",
    body:
      "Your entire setup — every page, card, model, and setting — lives in a config file stored locally right next to the app's .exe. Moving to a new PC or handing off a full setup is just a matter of copying that one file.",
  },
  {
    title: "Import with the Transfer tool",
    body:
      "On the target machine, open the Transfer tool and point it at that config file. It imports everything and automatically upgrades an older config to the current format — and it backs up the existing local config first, so nothing already on that PC is lost.",
  },
];

export default function ScriptsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Sharing Scripts</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Share a page, or move your whole setup
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Your snippet library is built to move with you. Hand a single page to a
        coworker, or carry your entire setup to a new PC — both take under a
        minute.
      </p>

      {/* 1 — Export & import a single page */}
      <div className="mt-14 rounded-2xl card-border bg-background-soft p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Share one page</span>
        <h2 className="mt-2 text-2xl font-bold">Export and import a single page</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Built a great page of go-to lines? Send just that one page to a friend
          or coworker without handing over your whole setup.
        </p>
        <ol className="mt-8 space-y-6">
          {shareSteps.map((s, i) => (
            <li key={s.title} className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent-soft">
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* 2 — Transfer a whole setup */}
      <div className="mt-8 rounded-2xl card-border bg-background-soft p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Move everything</span>
        <h2 className="mt-2 text-2xl font-bold">Transfer a whole setup to another PC</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Upgrading your machine, or setting up C.H.A.T. somewhere new? Bring
          every page, card, and setting with you in two steps.
        </p>
        <ol className="mt-8 space-y-6">
          {transferSteps.map((s, i) => (
            <li key={s.title} className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent-soft">
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-sm text-muted">
          Since your data is stored locally next to the app and never uploaded
          anywhere, that config file is the single source of truth for your
          whole setup.
        </p>
      </div>

      {/* 3 — The rest: how the library itself works */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight">The library that makes it worth sharing</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Everything you can move around is organized, color-coded, and built to
          keep your most-used lines a click away.
        </p>
      </div>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold">Pages &amp; cards</h3>
          <p className="mt-3 text-muted">
            Snippets live on pages (tabs across the top), each holding any
            number of cards. Each card has a name, a custom color from a
            48-swatch palette, and a body of text — including rich formatting
            if that's how you originally copied it.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• Drag cards to reorder within a page</li>
            <li>• Drag a card onto another tab to move it there</li>
            <li>• Right-click to edit, recolor, or duplicate a card</li>
            <li>• Mark pages as favorites and collapse the rest down to one row</li>
          </ul>
        </div>
        <Image
          src="/images/scripts-edit-card.png"
          alt="Edit card window with color palette"
          width={381}
          height={543}
          className="w-full max-w-xs mx-auto rounded-2xl card-border"
        />
      </div>

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Quick Page Maker</span>
          <h3 className="mt-2 text-2xl font-bold">Build a whole page in one pass, not one card at a time</h3>
          <p className="mt-3 max-w-2xl text-muted">
            Loading in a list of 10, 20, or more scripts by clicking{" "}
            <strong className="font-semibold text-foreground">+Card</strong>{" "}
            over and over, opening each one to fill it in, is exactly the kind
            of busywork C.H.A.T. is supposed to save you from. Quick Page Maker
            fixes it: give it a page name and roughly how many cards you want,
            and it hands you that many ready-to-fill slots at once — each with
            a Name field, a Text field, and a color swatch, all on screen
            together instead of one editor window at a time.
          </p>
          <ul className="mt-4 max-w-2xl space-y-2 text-sm text-muted">
            <li>• Find it as a <strong className="font-semibold text-foreground">+Quick</strong> button right next to the regular page/card buttons, or under &quot;Quick Page Maker&quot; in Settings</li>
            <li>• The starting count is just a starting point — add more slots on the fly, or remove one you don&apos;t need. Nothing&apos;s locked in once they&apos;re generated</li>
            <li>• Name is optional — most scripts don&apos;t need a separate label. Leave it blank and the card&apos;s name automatically becomes its own text</li>
            <li>• Select a group of slots and hit <strong className="font-semibold text-foreground">Auto Color</strong> to bulk-color the whole batch in one action — one flat color, or two colors blended into an automatic gradient that steps evenly across the group in order</li>
          </ul>
          <p className="mt-4 max-w-2xl text-muted">
            What used to be a tedious one-by-one chore turns into something you
            can do in a couple of minutes — fully color-coded from the start.
          </p>
        </div>
        <Image
          src="/images/scripts-quick-page-maker.png"
          alt="Quick Page Maker generating a batch of card slots"
          width={610}
          height={425}
          className="w-full max-w-md mx-auto rounded-2xl card-border"
        />
      </div>

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
        <Image
          src="/images/scripts-popout.gif"
          alt="Pop-out page window"
          width={795}
          height={553}
          unoptimized
          className="w-full max-w-md mx-auto rounded-2xl card-border lg:order-2"
        />
        <div>
          <h3 className="text-2xl font-bold">Pop it out, drag it across</h3>
          <p className="mt-3 text-muted">
            Pop any page out into its own small floating, resizable,
            always-on-top window — perfect for keeping your most-used page
            visible at all times. Drag cards between separate app windows to
            copy them across without retyping a thing.
          </p>
        </div>
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
