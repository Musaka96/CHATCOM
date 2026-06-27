import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { encryptKey } from "@/lib/crypto";
import { generateActivationCode } from "@/lib/activation";
import { sendLicenseKeyEmail, sendFulfillmentFailureAlert } from "@/lib/email";
import { verifyPaddleSignature } from "@/lib/paddle";

export const dynamic = "force-dynamic";

async function fulfillOrder(orderId: string, paddleTransactionId: string) {
  const existing = await prisma.order.findUnique({ where: { id: orderId } });
  if (!existing) {
    console.error("paddle webhook: no matching order for id", orderId);
    return;
  }
  if (existing.status === "FULFILLED") {
    return; // already handled, webhook retry
  }

  const buyerEmail = existing.buyerEmail;

  await prisma.order.update({
    where: { id: existing.id },
    data: { status: "PAID", paddleTransactionId },
  });

  let code: string;
  try {
    code = await generateActivationCode();
  } catch (err) {
    console.error("activation code generation failed", err);
    await prisma.order.update({
      where: { id: existing.id },
      data: { status: "FAILED" },
    });
    await sendFulfillmentFailureAlert(existing.id, buyerEmail).catch((e) =>
      console.error("failed to send fulfillment failure alert", e)
    );
    return;
  }

  await sendLicenseKeyEmail(buyerEmail, code);

  await prisma.order.update({
    where: { id: existing.id },
    data: { status: "FULFILLED", encryptedLicenseCode: encryptKey(code) },
  });
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("paddle-signature");
  const rawBody = await req.text();

  if (!verifyPaddleSignature(rawBody, signature)) {
    console.error("paddle webhook: invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { event_type?: string; data?: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (event.event_type === "transaction.completed") {
    const data = event.data || {};
    const customData = (data.custom_data as Record<string, unknown> | null) || {};
    const orderId = String(customData.orderId || "");
    const transactionId = String(data.id || "");

    if (!orderId) {
      console.error("paddle webhook: missing custom_data.orderId");
      return NextResponse.json({ received: true });
    }

    try {
      await fulfillOrder(orderId, transactionId);
    } catch (err) {
      console.error("paddle fulfillment error", err);
      return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
