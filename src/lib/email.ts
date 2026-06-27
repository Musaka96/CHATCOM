import { Resend } from "resend";
import { EMAIL_FROM, APP_DOWNLOAD_URL, OWNER_EMAIL, SITE_URL } from "./config";
import { formatCodeForDisplay } from "./activation";

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

// Resend's SDK resolves with { data, error } instead of throwing on failure —
// without this check, a rejected send (bad "from" domain, invalid recipient,
// etc.) silently looks like success to the caller.
function assertSent(result: { data: unknown; error: { message?: string } | null }, context: string) {
  if (result.error) {
    throw new Error(`Resend failed to send ${context}: ${result.error.message ?? JSON.stringify(result.error)}`);
  }
}

export async function sendLicenseKeyEmail(toEmail: string, licenseCode: string) {
  const resend = getResend();
  const result = await resend.emails.send({
    from: EMAIL_FROM,
    to: toEmail,
    subject: "Your C.H.A.T. license key",
    text: [
      "Thanks for picking up C.H.A.T.!",
      "",
      `Your license key: ${formatCodeForDisplay(licenseCode)}`,
      "",
      APP_DOWNLOAD_URL ? `Download the app: ${APP_DOWNLOAD_URL}` : "",
      "",
      `Setup walkthrough: ${SITE_URL}/setup`,
      "",
      "On first launch, paste your key into the activation screen. It's locked to the",
      "first machine you activate it on, so install it on the PC you'll actually use for shifts.",
      "",
      "Questions? Just reply to this email.",
    ]
      .filter(Boolean)
      .join("\n"),
  });
  assertSent(result, "license key email");
}

export async function sendFulfillmentFailureAlert(orderId: string, buyerEmail: string) {
  if (!OWNER_EMAIL) return;
  const resend = getResend();
  const result = await resend.emails.send({
    from: EMAIL_FROM,
    to: OWNER_EMAIL,
    subject: "C.H.A.T. — order fulfillment failed",
    text: [
      `Order ${orderId} from ${buyerEmail} was paid but generating an activation code failed.`,
      "Check the activation server is reachable, then use \"Retry fulfill\" in /admin.",
    ].join("\n"),
  });
  assertSent(result, "fulfillment failure alert");
}

export async function sendTeamsContactEmail(fields: {
  name: string;
  email: string;
  seats: string;
  message: string;
}) {
  if (!OWNER_EMAIL) {
    throw new Error("OWNER_EMAIL is not set");
  }
  const resend = getResend();
  const result = await resend.emails.send({
    from: EMAIL_FROM,
    to: OWNER_EMAIL,
    replyTo: fields.email,
    subject: `C.H.A.T. team inquiry from ${fields.name}`,
    text: [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Seats: ${fields.seats || "(not specified)"}`,
      "",
      fields.message || "(no message)",
    ].join("\n"),
  });
  assertSent(result, "teams contact email");
}

export async function sendFeatureRequestEmail(fields: {
  email: string;
  request: string;
}) {
  if (!OWNER_EMAIL) {
    throw new Error("OWNER_EMAIL is not set");
  }
  const resend = getResend();
  const result = await resend.emails.send({
    from: EMAIL_FROM,
    to: OWNER_EMAIL,
    replyTo: fields.email || undefined,
    subject: "C.H.A.T. feature request",
    text: [
      `From: ${fields.email || "(no email provided)"}`,
      "",
      fields.request,
    ].join("\n"),
  });
  assertSent(result, "feature request email");
}
