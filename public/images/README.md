# Swapping out placeholder images

Every image used on the site lives in this folder under a fixed filename.
To replace a placeholder, just **overwrite the file with the same name**
(keep it named exactly the same, `.svg`/`.png`/`.jpg` extension can differ
as long as you also update the one line in the code noted below — or easiest,
just export your replacement as the same extension).

| File | Used for | Code reference |
|---|---|---|
| `hero-in-context.png` | Big hero shot at the top of the landing page — real screenshot of the app overlaying a chat platform | `src/app/page.tsx` (Hero section) |
| `hero-app.gif` | "Works with any CRM, any model" feature card — real app screen recording | `src/app/page.tsx` (Features section) |
| `feature-snippets.gif` | "Instant snippet paste" feature card — real app screen recording | `src/app/page.tsx` (Features section) |
| `scripts-edit-card.mp4` | "Make any card yours" feature card (editing: rename/recolor/rewrite) — real app screen recording | `src/app/page.tsx` (Features section) |
| `scripts-popout.gif` | "Your scripts, your way" feature card (resize/reposition/multiple pop-out windows), and the pop-out section on `/scripts` — real app screen recording | `src/app/page.tsx`, `src/app/scripts/page.tsx` |
| `feature-sales.gif` | "Live PPV & tip tracking" feature card — real app screen recording | `src/app/page.tsx` (Features section) |
| `feature-report.png` | "One-click shift report" feature card — real app screenshot | `src/app/page.tsx` (Features section) |
| `shortcut.png` | "Not into clicking?" keyboard shortcut section — real app screenshot of the shortcut assignment UI | `src/app/page.tsx` |
| `scripts-quick-page-maker.png` | "Quick Page Maker" section on `/scripts` — real app screenshot of the bulk slot creator | `src/app/scripts/page.tsx` |
| `mascot.png` | Mascot icon shown in a couple of spots | `src/app/page.tsx`, `src/components/NavBar.tsx` |

All placeholders are simple abstract SVG mockups with a "PLACEHOLDER" watermark
baked in so nothing accidentally ships looking like a real screenshot. Real
screenshots of the actual app are the intended replacement.

If you swap in a `.png` or `.jpg` instead of `.svg`, just rename your file to
match the table above (e.g. save your screenshot as `feature-sales.svg` →
actually just change the extension in code, it's one string per `<img>`/`Image`
tag) — or tell me the filenames you want to use and I'll wire them up.
