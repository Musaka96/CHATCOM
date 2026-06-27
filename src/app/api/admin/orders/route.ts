import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { decryptKey, maskKey } from "@/lib/crypto";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const result = orders.map((o) => ({
    id: o.id,
    buyerEmail: o.buyerEmail,
    status: o.status,
    createdAt: o.createdAt,
    amountCents: o.amountCents,
    maskedCode: o.encryptedLicenseCode ? maskKey(decryptKey(o.encryptedLicenseCode)) : null,
  }));

  return NextResponse.json({ orders: result });
}
