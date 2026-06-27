import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { encryptKey } from "@/lib/crypto";
import { generateActivationCode } from "@/lib/activation";
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

  let code: string;
  try {
    code = await generateActivationCode();
  } catch (err) {
    console.error("manual fulfill: activation code generation failed", err);
    return NextResponse.json(
      { error: "Could not reach the activation server. Try again shortly." },
      { status: 502 }
    );
  }

  await sendLicenseKeyEmail(order.buyerEmail, code);
  await prisma.order.update({
    where: { id: order.id },
    data: { status: "FULFILLED", encryptedLicenseCode: encryptKey(code) },
  });

  return NextResponse.json({ ok: true });
}
