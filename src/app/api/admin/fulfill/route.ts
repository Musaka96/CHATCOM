import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { decryptKey } from "@/lib/crypto";
import { sendLicenseKeyEmail } from "@/lib/email";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  const body = await req.json().catch(() => ({}));
  const orderId = String(body.orderId || "");
  if (!orderId) {
    return NextResponse.json({ error: "orderId is required." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  if (order.status === "FULFILLED") {
    return NextResponse.json({ error: "Order already fulfilled." }, { status: 400 });
  }

  const claimedKey = await prisma.$transaction(async (tx) => {
    const key = await tx.licenseKey.findFirst({ where: { status: "UNUSED" } });
    if (!key) return null;
    await tx.licenseKey.update({
      where: { id: key.id },
      data: { status: "ASSIGNED", assignedAt: new Date() },
    });
    await tx.order.update({
      where: { id: order.id },
      data: { licenseKeyId: key.id, status: "PAID" },
    });
    return key;
  });

  if (!claimedKey) {
    return NextResponse.json({ error: "No unused keys available. Add more first." }, { status: 409 });
  }

  const plaintext = decryptKey(claimedKey.encryptedKey);
  await sendLicenseKeyEmail(order.buyerEmail, plaintext);
  await prisma.order.update({ where: { id: order.id }, data: { status: "FULFILLED" } });

  return NextResponse.json({ ok: true });
}
