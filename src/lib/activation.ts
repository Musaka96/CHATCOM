// Talks to the C.H.A.T. activation server (Scripts/vercel-api in the app repo)
// to mint a real, usable activation code at the moment a sale is fulfilled —
// instead of pulling from a pre-uploaded pool. Same code shape as
// Scripts/GenerateCodes.ps1: "CHAT" + 12 chars from an unambiguous charset.

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode(): string {
  let code = "CHAT";
  for (let i = 0; i < 12; i++) {
    code += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return code;
}

function getConfig() {
  const url = process.env.CHAT_ACTIVATION_URL;
  const adminKey = process.env.CHAT_ACTIVATION_ADMIN_KEY;
  if (!url || !adminKey) {
    throw new Error("CHAT_ACTIVATION_URL / CHAT_ACTIVATION_ADMIN_KEY is not set");
  }
  return { url: url.replace(/\/+$/, ""), adminKey };
}

type GenerateResult = { code: string; status: "created" | "exists" };

// Mints one brand-new, unique code on the real activation server. Retries on
// the rare chance of a random collision with an existing code.
export async function generateActivationCode(): Promise<string> {
  const { url, adminKey } = getConfig();

  for (let attempt = 0; attempt < 5; attempt++) {
    const code = randomCode();

    const res = await fetch(`${url}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codes: [code], admin_key: adminKey }),
    });

    if (!res.ok) {
      throw new Error(`activation server responded ${res.status}`);
    }

    const data = (await res.json()) as { success: boolean; results?: GenerateResult[] };
    if (!data.success || !data.results?.length) {
      throw new Error("activation server returned an unexpected response");
    }

    if (data.results[0].status === "created") {
      return code;
    }
    // "exists" — extremely unlikely collision, try again with a fresh code.
  }

  throw new Error("could not generate a unique activation code after 5 attempts");
}

// Format a raw "CHATXXXXXXXXXXXX" code as "CHAT-XXXX-XXXX-XXXX" for display/email.
export function formatCodeForDisplay(code: string): string {
  if (code.length !== 16) return code;
  return `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}-${code.slice(12, 16)}`;
}
