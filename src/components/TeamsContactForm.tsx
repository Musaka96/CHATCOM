"use client";

import { useState } from "react";

export default function TeamsContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, seats, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not send your message.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-10 rounded-2xl card-border bg-background-soft p-6 text-center sm:p-8">
        <p className="text-lg font-semibold">Got it — thanks!</p>
        <p className="mt-2 text-sm text-muted">We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4 rounded-2xl card-border bg-background-soft p-6 sm:p-8">
      <div>
        <label className="block text-sm font-medium text-muted" htmlFor="name">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="jane@agency.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted" htmlFor="seats">
          How many chatters / seats?
        </label>
        <input
          id="seats"
          name="seats"
          type="text"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="e.g. 8"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted" htmlFor="message">
          What do you need?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="Tell us a bit about your team..."
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
