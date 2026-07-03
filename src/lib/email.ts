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
  const contact = OWNER_EMAIL ? ` or email ${OWNER_EMAIL}` : "";
  // APP_DOWNLOAD_URL should always be set in production; if it isn't, we still
  // deliver the key the customer paid for and tell them how to reach us for the
  // download (and separately alert the owner — see sendMissingDownloadUrlAlert).
  const downloadLine = APP_DOWNLOAD_URL
    ? `Download the app: ${APP_DOWNLOAD_URL}`
    : `Your download link isn't showing up here — sorry about that! Just reply to this email${contact} and we'll send you the installer right away.`;
  const result = await resend.emails.send({
    from: EMAIL_FROM,
    to: toEmail,
    subject: "Your C.H.A.T. license key",
    text: [
      "Thanks for picking up C.H.A.T.!",
      "",
      `Your license key: ${formatCodeForDisplay(licenseCode)}`,
      "",
      downloadLine,
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

// Fires when an order is fulfilled but APP_DOWNLOAD_URL is not configured, so the
// customer got their key without a download link. Lets the owner send the link
// manually and fix the config before the next sale.
export async function sendMissingDownloadUrlAlert(orderId: string, buyerEmail: string) {
  if (!OWNER_EMAIL) return;
  const resend = getResend();
  const result = await resend.emails.send({
    from: EMAIL_FROM,
    to: OWNER_EMAIL,
    subject: "C.H.A.T. — ACTION NEEDED: paid order sent without a download link",
    text: [
      `Order ${orderId} (${buyerEmail}) was paid and the license key was emailed,`,
      "but APP_DOWNLOAD_URL is not set, so the email went out WITHOUT a download link.",
      "",
      "Do this now:",
      `1. Email ${buyerEmail} the installer download link manually.`,
      "2. Set APP_DOWNLOAD_URL in the environment so future orders include it automatically.",
    ].join("\n"),
  });
  assertSent(result, "missing download url alert");
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
