import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { decryptKey } from "@/lib/crypto";
import { sendLicenseKeyEmail, sendKeyShortageAlert } from "@/lib/email";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

async function fulfillOrder(session: Stripe.Checkout.Session) {
  const existing = await prisma.order.findUnique({ where: { stripeSessionId: session.id } });
  if (!existing) {
    console.error("webhook: no matching order for session", session.id);
    return;
  }
  if (existing.status === "FULFILLED") {
    return; // already handled, webhook retry
  }

  const buyerEmail = existing.buyerEmail;

  // Claim one unused key atomically.
  const claimedKey = await prisma.$transaction(async (tx) => {
    const key = await tx.licenseKey.findFirst({ where: { status: "UNUSED" } });
    if (!key) return null;

    await tx.licenseKey.update({
      where: { id: key.id },
      data: { status: "ASSIGNED", assignedAt: new Date() },
    });

    await tx.order.update({
      where: { id: existing.id },
      data: {
        status: "PAID",
        licenseKeyId: key.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string" ? session.payment_intent : undefined,
      },
    });

    return key;
  });

  if (!claimedKey) {
    await prisma.order.update({
      where: { id: existing.id },
      data: { status: "FAILED" },
    });
    await sendKeyShortageAlert(existing.id, buyerEmail).catch((e) =>
      console.error("failed to send shortage alert", e)
    );
    return;
  }

  const plaintextKey = decryptKey(claimedKey.encryptedKey);

  await sendLicenseKeyEmail(buyerEmail, plaintextKey);

  await prisma.order.update({
    where: { id: existing.id },
    data: { status: "FULFILLED" },
  });
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook signature/secret" }, { status: 400 });
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await fulfillOrder(session);
    } catch (err) {
      console.error("fulfillment error", err);
      return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
