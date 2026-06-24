import { Resend } from "resend";
import { EMAIL_FROM, APP_DOWNLOAD_URL, OWNER_EMAIL, SITE_URL } from "./config";

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

export async function sendLicenseKeyEmail(toEmail: string, licenseKey: string) {
  const resend = getResend();
  await resend.emails.send({
    from: EMAIL_FROM,
    to: toEmail,
    subject: "Your C.H.A.T. license key",
    text: [
      "Thanks for picking up C.H.A.T.!",
      "",
      `Your license key: ${licenseKey}`,
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
}

export async function sendKeyShortageAlert(orderId: string, buyerEmail: string) {
  if (!OWNER_EMAIL) return;
  const resend = getResend();
  await resend.emails.send({
    from: EMAIL_FROM,
    to: OWNER_EMAIL,
    subject: "C.H.A.T. — out of license keys",
    text: [
      `Order ${orderId} from ${buyerEmail} was paid but no unused license keys are left.`,
      "Add more keys in /admin, then manually fulfill this order.",
    ].join("\n"),
  });
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
  await resend.emails.send({
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
}
