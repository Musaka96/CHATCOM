import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

const DAYS = 30;

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export async function GET(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  const since = new Date();
  since.setDate(since.getDate() - (DAYS - 1));
  since.setHours(0, 0, 0, 0);

  const [recentFulfilled, totalOrders, totalFulfilled, allFulfilled] = await Promise.all([
    prisma.order.findMany({
      where: { status: "FULFILLED", createdAt: { gte: since } },
      select: { createdAt: true, amountCents: true },
    }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "FULFILLED" } }),
    prisma.order.aggregate({
      where: { status: "FULFILLED" },
      _sum: { amountCents: true },
    }),
  ]);

  // Build a zero-filled series for the last 30 days so the chart has no gaps.
  const series: { date: string; revenueCents: number; sales: number }[] = [];
  const byDay = new Map<string, { revenueCents: number; sales: number }>();
  for (const o of recentFulfilled) {
    const key = dayKey(o.createdAt);
    const entry = byDay.get(key) ?? { revenueCents: 0, sales: 0 };
    entry.revenueCents += o.amountCents ?? 0;
    entry.sales += 1;
    byDay.set(key, entry);
  }
  for (let i = 0; i < DAYS; i++) {
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    const key = dayKey(d);
    const entry = byDay.get(key) ?? { revenueCents: 0, sales: 0 };
    series.push({ date: key, ...entry });
  }

  return NextResponse.json({
    series,
    totalOrders,
    totalFulfilled,
    totalRevenueCents: allFulfilled._sum.amountCents ?? 0,
  });
}
