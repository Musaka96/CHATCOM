"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Order = {
  id: string;
  buyerEmail: string;
  status: "PENDING" | "PAID" | "FULFILLED" | "FAILED";
  createdAt: string;
  amountCents: number | null;
  maskedCode: string | null;
};

type StatsPoint = { date: string; revenueCents: number; sales: number };

type Stats = {
  series: StatsPoint[];
  totalOrders: number;
  totalFulfilled: number;
  totalRevenueCents: number;
};

function formatUsd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const [statsRes, ordersRes] = await Promise.all([
      fetch("/api/admin/stats"),
      fetch("/api/admin/orders"),
    ]);
    if (statsRes.ok) {
      setStats(await statsRes.json());
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

      {!loading && stats && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl card-border bg-background-soft p-4">
            <p className="text-xs text-muted">Total revenue</p>
            <p className="mt-1 text-3xl font-bold">{formatUsd(stats.totalRevenueCents)}</p>
          </div>
          <div className="rounded-xl card-border bg-background-soft p-4">
            <p className="text-xs text-muted">Licenses issued</p>
            <p className="mt-1 text-3xl font-bold">{stats.totalFulfilled}</p>
          </div>
          <div className="rounded-xl card-border bg-background-soft p-4">
            <p className="text-xs text-muted">Total orders</p>
            <p className="mt-1 text-3xl font-bold">{stats.totalOrders}</p>
          </div>
        </div>
      )}

      {!loading && stats && (
        <div className="mt-6 rounded-2xl card-border bg-background-soft p-6">
          <h2 className="text-lg font-bold">Sales — last 30 days</h2>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.series} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d: string) => d.slice(5)}
                  stroke="#ab9fcb"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={20}
                />
                <YAxis
                  tickFormatter={(v: number) => `$${(v / 100).toFixed(0)}`}
                  stroke="#ab9fcb"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={48}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1c1530",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#f1edfb" }}
                  formatter={(value) => [formatUsd(Number(value)), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenueCents"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#revenueFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="mt-10 rounded-2xl card-border bg-background-soft p-6">
        <h2 className="text-lg font-bold">Orders</h2>
        <p className="mt-1 text-xs text-muted">
          Each fulfilled order generates a fresh activation code on the real
          activation server — there&apos;s no pool to manage.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-muted">
                <th className="py-2 pr-4">Buyer email</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Code</th>
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
                  <td className="py-2 pr-4 text-xs text-muted">
                    {o.amountCents != null ? formatUsd(o.amountCents) : "—"}
                  </td>
                  <td className="py-2 pr-4 font-mono text-xs">{o.maskedCode || "—"}</td>
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
                  <td colSpan={6} className="py-6 text-center text-muted">
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
