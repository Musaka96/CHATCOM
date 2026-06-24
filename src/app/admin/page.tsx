"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  buyerEmail: string;
  status: "PENDING" | "PAID" | "FULFILLED" | "FAILED";
  createdAt: string;
  maskedKey: string | null;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [unusedCount, setUnusedCount] = useState<number | null>(null);
  const [assignedCount, setAssignedCount] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [keysInput, setKeysInput] = useState("");
  const [addMessage, setAddMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const [keysRes, ordersRes] = await Promise.all([
      fetch("/api/admin/keys"),
      fetch("/api/admin/orders"),
    ]);
    if (keysRes.ok) {
      const data = await keysRes.json();
      setUnusedCount(data.unusedCount);
      setAssignedCount(data.assignedCount);
    }
    if (ordersRes.ok) {
      const data = await ordersRes.json();
      setOrders(data.orders);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleAddKeys(e: React.FormEvent) {
    e.preventDefault();
    setAddMessage(null);
    const res = await fetch("/api/admin/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keys: keysInput }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setAddMessage(data.error || "Failed to add keys.");
      return;
    }
    setAddMessage(`Added ${data.added} key(s).`);
    setKeysInput("");
    loadData();
  }

  async function handleFulfill(orderId: string) {
    const res = await fetch("/api/admin/fulfill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.error || "Failed to fulfill order.");
      return;
    }
    loadData();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin</h1>
        <button
          onClick={handleLogout}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-muted hover:bg-white/5"
        >
          Log out
        </button>
      </div>

      {!loading && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl card-border bg-background-soft p-4">
            <p className="text-xs text-muted">Unused keys in stock</p>
            <p className="mt-1 text-3xl font-bold">{unusedCount}</p>
          </div>
          <div className="rounded-xl card-border bg-background-soft p-4">
            <p className="text-xs text-muted">Keys assigned so far</p>
            <p className="mt-1 text-3xl font-bold">{assignedCount}</p>
          </div>
        </div>
      )}

      <div className="mt-10 rounded-2xl card-border bg-background-soft p-6">
        <h2 className="text-lg font-bold">Add license keys</h2>
        <p className="mt-1 text-xs text-muted">One key per line. Encrypted before they're stored.</p>
        <form onSubmit={handleAddKeys} className="mt-4 space-y-3">
          <textarea
            value={keysInput}
            onChange={(e) => setKeysInput(e.target.value)}
            rows={6}
            placeholder={"KEY-1111-2222\nKEY-3333-4444"}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 font-mono text-sm outline-none focus:border-accent"
          />
          {addMessage && <p className="text-sm text-accent-soft">{addMessage}</p>}
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white transition hover:bg-accent-soft"
          >
            Add keys
          </button>
        </form>
      </div>

      <div className="mt-10 rounded-2xl card-border bg-background-soft p-6">
        <h2 className="text-lg font-bold">Orders</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-muted">
                <th className="py-2 pr-4">Buyer email</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Key</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-white/5">
                  <td className="py-2 pr-4">{o.buyerEmail}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        o.status === "FULFILLED"
                          ? "bg-accent-green/20 text-accent-green"
                          : o.status === "FAILED"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-white/10 text-muted"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-2 pr-4 font-mono text-xs">{o.maskedKey || "—"}</td>
                  <td className="py-2 pr-4 text-xs text-muted">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 pr-4">
                    {o.status === "FAILED" && (
                      <button
                        onClick={() => handleFulfill(o.id)}
                        className="rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-accent-soft hover:bg-accent/10"
                      >
                        Retry fulfill
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
