import { NextRequest, NextResponse } from "next/server";
import { sendFeatureRequestEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();
    const request = String(body.request || "").trim().slice(0, 4000);

    if (!request) {
      return NextResponse.json({ error: "Write up what you'd like to see." }, { status: 400 });
    }
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
    }

    await sendFeatureRequestEmail({ email, request });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("feature request error", err);
    return NextResponse.json({ error: "Could not send your request. Try again shortly." }, { status: 500 });
  }
}
