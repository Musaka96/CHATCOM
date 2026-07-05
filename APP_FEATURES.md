# C.H.A.T. — Feature Set (for the website)

> Source of truth for site copy. Reflects the app as of **v2.4.4**. Written for the website
> team — grouped by area, benefit-first, light on jargon. Update the site against this.

---

## One-liner

**C.H.A.T. (Chews Hot Awesome Texting)** is a lightweight, always-on-top Windows overlay for
professional chat operators — paste pre-written replies instantly and track sales/tips in
real time, all without ever clicking away from the chat window.

## What it is (short pitch)

A small frameless panel that floats on top of whatever app you're typing in. It **never steals
keyboard focus**, so a click on one of its buttons pastes text (or logs a sale) straight into
your active chat without breaking your flow. It's not a chat client and connects to no
platform's API — it works purely at the OS level (clipboard, simulated keystrokes, global
hotkeys), so it works **on top of any chat tool**, including Electron/web apps.

## Who it's for

Professional chat operators managing conversations for one or more "models"/creators/accounts,
paid on the sales and tips they generate during a shift. Built around: replying fast from a big
organized snippet library, logging every sale/tip the instant it happens across multiple
accounts, hitting a session goal, and producing a clean end-of-shift report — without ever
alt-tabbing away.

---

## Core features

### 1. Text snippet library
- Messages live on **cards**, organized into **pages** (tabs).
- Click a card → its text is pasted into whatever window you were typing in (no need to click
  into the target app first).
- **Ctrl+click** → paste **and** press Enter (sends instantly).
- **Auto-Send mode** (optional): flips the default so a plain click sends immediately, and
  holding Ctrl pastes without sending — for firing off replies at speed.
- **Rich text preserved**: paste formatted (bold/italic/colored) content into a card and it
  replays that formatting on paste, not just plain text. Emoji fully supported.
- Cards can be **dragged** to reorder, dropped on another tab to move, or dragged between
  separate app windows to copy across.
- **Right-click a card** to edit its name, color, or text — or duplicate/delete it.
- **48-color palette** with live hex preview for color-coding cards.
- Any page can be **popped out** into its own floating, resizable, always-on-top window — keep
  a frequently-used page visible next to the main panel at all times.
- **Favorite pages** + a one-tap collapse arrow to hide all non-favorite tabs once you have many.

### 2. Quick Page Maker (bulk builder)
- Build an entire page of cards in one pass instead of one at a time.
- Set a page name and a starting card count, then fill in the rows; add/remove slots freely.
- Leave a card's name blank and it auto-uses its own text as the name.
- **Bulk color** selected rows: one flat color, or an automatic **gradient** stepping evenly
  from one color to another across the group.
- Also works as a **bulk editor** for an existing page.

### 3. Live sales / earnings tracker
- **1 to 10 independent models**, each with its own running total (add, rename, or remove
  models anytime).
- One-click logging: click a model → pick a preset **sale** amount; hold Ctrl → pick a preset
  **tip** amount. Preset amount and tip lists are user-editable.
- **Custom amount** entry: log any one-off value (sale or tip) that isn't a preset.
- A per-model free-text "sales to other chatters" note for the report.
- **Session goal (wager)**: set a target and a progress bar fills toward the combined total of
  all models — turning gold as you approach and cyan once you pass it.
- **Celebrations**: confetti every $1,000 milestone; a bigger celebration on hitting the goal;
  sound cues on each sale/tip/goal.
- **Shift report**: one click generates a clean, paste-ready text report. On copy, a picker
  lets you choose exactly which models to include. A built-in report editor lets you add/remove
  individual sale/tip line items before finalizing.
- **Reset** (with an animated "are you sure" confirmation) clears everything for a fresh shift.

### 4. System-wide price quick-paste
- A configurable global hotkey (default: Left Alt) pops a row of preset price buttons **right at
  your mouse cursor, in any app**.
- Clicking a price **types** that number at the cursor via real keystrokes — so it works even in
  apps that block programmatic paste (built specifically for Electron-based chat platforms).
- Click anywhere outside to dismiss. Fully rebindable. Opt-in (off by default).

### 5. Reminders & time
- **CLS Notifier**: pick **1–10 minutes** and an optional label; a toast pops when time's up.
  Stack as many as you want — they run independently. (The toast never steals focus from your
  work.)
- **Clock & interval alarm**: a small digital clock, plus a repeating alarm (start time +
  interval) that keeps ringing on schedule even if the clock window is closed.

### 6. Per-card global keyboard shortcuts
- Assign any card its own **system-wide shortcut** (a single key, or Ctrl+key) — paste it from
  anywhere, no mouse, regardless of which page is showing.
- Optional **instant-send** per shortcut (paste + Enter).
- Duplicate shortcuts are rejected on the spot, naming which card already owns the combo.
- Only Ctrl (or no modifier) is allowed — deliberately, so shortcuts fire reliably every time.
- Optional **"Shortcut Info"** toggle shows each card's shortcut right on the card.

### 7. Themes & look
- **Four visual themes**, switchable instantly across every window: deep-space purple, steel
  blue, forest green, and a full **Retro** theme (authentic mid-90s Windows chrome — square
  corners, beveled buttons, gray panels).
- Each theme has its own subtle ambient background particle palette (togglable).
- **Four independent sound themes** — Off, Classic, Calm, Crazy — controlling the cues on sale,
  tip, goal, and reminder. Completely separate from the visual theme.
- **Transparent background** mode: make the main and floating windows fully see-through (no
  background, border, or shadow) so only the buttons float on screen.

### 8. Window behavior / overlay mechanics
- Frameless, rounded, semi-transparent, always-on-top panel.
- **Never steals keyboard focus** — the core mechanic that lets pasting and logging work without
  disrupting your chat. No taskbar entry, not in Alt-Tab.
- Fully resizable and movable; scroll works anywhere on the window.
- **Double-tap Ctrl** to instantly hide/re-show the whole app (and its floating windows) — great
  before a screen-share or screenshot.
- **Auto Collapse** (right-click a window): taskbar-style ducking — the window shrinks to a thin
  strip and pops back out on hover. The main window collapses to its sales/wager bar; floating
  windows collapse to their header. Remembered per window.

### 9. Guided onboarding
- **First-run tour**: on first launch, new users get a friendly spotlight walkthrough that points
  to each key action one at a time (send a message, instant-send, edit a card, log a sale, log a
  tip, open settings) — and lets them actually try each one as it's shown.
- **Welcome config**: a ready-made starter setup can be handed to a new buyer (imported in one
  click) — preloaded with example models, sales and a goal, a normal snippet page, an emoji &
  rich-text page, and a full in-app tutorial page (one card per topic).

### 10. Animated mascot
- A small custom animated duck in the corner (also the button that opens Settings/About).
- Reacts to activity: a shake on card clicks and $1,000 milestones; a spin on each sale/tip; a
  dramatic triple-spin on hitting the session goal.

### 11. Config transfer / import
- **Transfer Config**: import an entire config from another PC or an older version; missing
  settings are backfilled with sensible defaults and the previous config is auto-backed-up.
- **Import Page**: add just a single shared page (pasted as text/JSON) without replacing your
  setup — for sharing one snippet collection with someone else.
- All data is stored locally, next to the app.

---

## Licensing / distribution

- Sold under a **license-key activation** model (not free).
- On first launch (or if unlicensed), the user enters a purchased activation code.
- Each code is validated against a remote activation server and **cryptographically locked to
  that machine** — it can't be copied and reused on a second computer.
- After activation, the license is verified locally (cryptographically signed), so the app
  doesn't need to phone home on every launch.
- Implies a one-time-purchase-per-seat, machine-bound model with the server as source of truth.

---

## Technical character (context, not selling points)

- Native Windows desktop app (.NET 6 / WPF) — not a web app, not cross-platform.
- Lightweight; the only background pieces are the small input hooks its own hotkey/focus
  features need.
- All settings and snippet/sales data stored locally.
- No dependency on any chat platform's API or a browser extension — works at the OS
  input/clipboard layer, so it's agnostic to whatever chat tool is on screen.

---

## Quick feature checklist (for cards / bullet grids on the site)

- Instant snippet paste (no focus loss)
- Ctrl+click or Auto-Send to send immediately
- Rich text + emoji snippets
- Pages, tabs, favorites, floating page windows
- Drag-and-drop cards (within, across pages, across windows)
- Bulk page builder with flat/gradient auto-coloring
- Per-card global hotkeys
- 1–10 sales models with live totals
- One-click sale/tip logging + custom amounts
- Session goal with progress bar + celebrations
- One-click shift report with model picker
- System-wide price quick-paste (types anywhere)
- Stackable 1–10 min reminders + clock/interval alarm
- 4 visual themes (incl. Retro) + 4 sound themes
- Transparent overlay + taskbar-style auto-collapse
- Global double-Ctrl hide/show
- First-run guided tour + ready-made welcome setup
- Animated mascot
- Config transfer & single-page import
- Machine-bound license activation
