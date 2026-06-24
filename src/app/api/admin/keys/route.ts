import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { encryptKey } from "@/lib/crypto";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  const [unusedCount, assignedCount] = await Promise.all([
    prisma.licenseKey.count({ where: { status: "UNUSED" } }),
    prisma.licenseKey.count({ where: { status: "ASSIGNED" } }),
  ]);

  return NextResponse.json({ unusedCount, assignedCount });
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  const body = await req.json().catch(() => ({}));
  const raw = String(body.keys || "");
  const keys = raw
    .split("\n")
    .map((k) => k.trim())
    .filter(Boolean);

  if (keys.length === 0) {
    return NextResponse.json({ error: "No keys provided." }, { status: 400 });
  }

  const data = keys.map((k) => ({ encryptedKey: encryptKey(k) }));
  await prisma.licenseKey.createMany({ data });

  return NextResponse.json({ added: keys.length });
}
