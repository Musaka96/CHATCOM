"use client";

import { useState } from "react";

export default function FeatureRequestForm() {
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/feature-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, request }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not send your request.");
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
        <p className="mt-2 text-sm text-muted">
          Your idea just landed straight in the inbox. No promises on timing,
          but every request gets read.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4 rounded-2xl card-border bg-background-soft p-6 sm:p-8">
      <div>
        <label className="block text-sm font-medium text-muted" htmlFor="request">
          What do you want to see?
        </label>
        <textarea
          id="request"
          name="request"
          required
          rows={6}
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="A feature, a tweak, a bug you ran into — whatever it is, write it here."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted" htmlFor="email">
          Your email <span className="text-xs">(optional, in case there's a follow-up question)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="you@email.com"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}
