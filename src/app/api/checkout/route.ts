import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PRICE_CENTS } from "@/lib/config";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        buyerEmail: email,
        status: "PENDING",
        amountCents: PRICE_CENTS,
      },
    });

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json({ error: "Something went wrong starting checkout." }, { status: 500 });
  }
}
