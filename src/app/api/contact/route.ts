import { NextRequest, NextResponse } from "next/server";
import { sendTeamsContactEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "").trim().slice(0, 200);
    const email = String(body.email || "").trim().toLowerCase();
    const seats = String(body.seats || "").trim().slice(0, 50);
    const message = String(body.message || "").trim().slice(0, 4000);

    if (!name || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a name and a valid email." }, { status: 400 });
    }

    await sendTeamsContactEmail({ name, email, seats, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact form error", err);
    return NextResponse.json({ error: "Could not send your message. Try again shortly." }, { status: 500 });
  }
}
