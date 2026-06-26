import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatting Scripts & Snippet Library",
  description:
    "Organize your OnlyFans and Fansly chatting scripts into color-coded, pop-out pages with C.H.A.T. Bulk-build a whole page at once with Quick Page Maker, then share script sets with other chatters or import a full setup in seconds.",
};

export default function ScriptsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Sharing Scripts</span>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Your snippet library, organized your way
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Every line you've ever wished you could paste instantly lives in one
        place — organized, color-coded, and built to move with you.
      </p>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Pages & cards</h2>
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

      <div className="mt-16 rounded-2xl card-border bg-background-soft p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-soft">Quick Page Maker</span>
        <h2 className="mt-2 text-2xl font-bold">Build a whole page in one pass, not one card at a time</h2>
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
          <h2 className="text-2xl font-bold">Pop it out, drag it across</h2>
          <p className="mt-3 text-muted">
            Pop any page out into its own small floating, resizable,
            always-on-top window — perfect for keeping your most-used page
            visible at all times. Drag cards between separate app windows to
            copy them across without retyping a thing.
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-2xl card-border bg-background-soft p-8">
        <h2 className="text-2xl font-bold">Sharing a script set with someone else</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Built a great page of go-to lines? The <strong>Import Page</strong>{" "}
          tool accepts a single page's data pasted as text/JSON and adds just
          that one page — useful for sharing one snippet collection with a
          friend or coworker without handing over your entire setup. Moving to
          a new PC or upgrading from an old version? The <strong>Transfer</strong>{" "}
          tool imports a full old config and automatically upgrades it to the
          current format, backing up your existing local config first.
        </p>
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
