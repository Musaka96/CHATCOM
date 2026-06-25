# Swapping out placeholder images

Every image used on the site lives in this folder under a fixed filename.
To replace a placeholder, just **overwrite the file with the same name**
(keep it named exactly the same, `.svg`/`.png`/`.jpg` extension can differ
as long as you also update the one line in the code noted below — or easiest,
just export your replacement as the same extension).

| File | Used for | Code reference |
|---|---|---|
| `hero-app.gif` | Big hero shot at the top of the landing page — real app screen recording | `src/app/page.tsx` (Hero section) |
| `feature-snippets.gif` | "Instant snippet paste" feature card — real app screen recording | `src/app/page.tsx` (Features section) |
| `scripts-popout.gif` | "Custom scripts & pages" feature card on landing page, and the pop-out section on `/scripts` — real app screen recording (multiple pop-out windows) | `src/app/page.tsx`, `src/app/scripts/page.tsx` |
| `scripts-edit-card.mp4` | Second clip next to the above, showing card editing (rename/recolor/rewrite) — real app screen recording | `src/app/page.tsx` (Features section) |
| `feature-sales.gif` | "Live PPV & tip tracking" feature card — real app screen recording | `src/app/page.tsx` (Features section) |
| `feature-report.png` | "One-click shift report" feature card — real app screenshot | `src/app/page.tsx` (Features section) |
| `mascot.png` | Mascot icon shown in a couple of spots | `src/app/page.tsx`, `src/components/NavBar.tsx` |

All placeholders are simple abstract SVG mockups with a "PLACEHOLDER" watermark
baked in so nothing accidentally ships looking like a real screenshot. Real
screenshots of the actual app are the intended replacement.

If you swap in a `.png` or `.jpg` instead of `.svg`, just rename your file to
match the table above (e.g. save your screenshot as `feature-sales.svg` →
actually just change the extension in code, it's one string per `<img>`/`Image`
tag) — or tell me the filenames you want to use and I'll wire them up.
