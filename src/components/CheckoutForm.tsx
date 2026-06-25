"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

type PaddleCheckoutEvent = {
  name?: string;
};

declare global {
  interface Window {
    Paddle?: {
      Environment: { set: (env: string) => void };
      Initialize: (opts: {
        token: string;
        eventCallback?: (event: PaddleCheckoutEvent) => void;
      }) => void;
      Checkout: {
        open: (opts: {
          items: { priceId: string; quantity: number }[];
          customer?: { email: string };
          customData?: Record<string, string>;
        }) => void;
      };
    };
  }
}

export default function CheckoutForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paddleReady, setPaddleReady] = useState(false);

  const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;
  const environment = process.env.NEXT_PUBLIC_PADDLE_ENV || "production";

  useEffect(() => {
    if (paddleReady && window.Paddle && clientToken) {
      if (environment === "sandbox") {
        window.Paddle.Environment.set("sandbox");
      }
      window.Paddle.Initialize({
        token: clientToken,
        eventCallback: (event) => {
          if (event?.name === "checkout.completed") {
            router.push("/pricing/success");
          }
        },
      });
    }
  }, [paddleReady, clientToken, environment, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!clientToken || !priceId) {
      setError("Checkout isn't configured yet. Try again shortly.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.orderId) {
        setError(data.error || "Could not start checkout.");
        setLoading(false);
        return;
      }

      if (!window.Paddle) {
        setError("Checkout is still loading. Try again in a moment.");
        setLoading(false);
        return;
      }

      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: { email },
        customData: { orderId: data.orderId },
      });
      setLoading(false);
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={() => setPaddleReady(true)}
      />
      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-lg border border-white/10 bg-background px-3 py-3 text-sm text-center outline-none focus:border-accent"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft disabled:opacity-50"
        >
          {loading ? "Starting checkout..." : "Continue to checkout"}
        </button>
        <p className="text-xs text-muted">
          Your license key is sent to this email right after payment. Use an address you actually check.
        </p>
      </form>
    </>
  );
}
