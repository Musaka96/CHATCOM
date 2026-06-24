export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chathelper.app";

// Price in whole US cents. Override with PRICE_CENTS in the environment.
export const PRICE_CENTS = Number(process.env.PRICE_CENTS || process.env.NEXT_PUBLIC_PRICE_CENTS || 4999);

export const PRODUCT_NAME = "C.H.A.T. — Lifetime License";

export const APP_DOWNLOAD_URL = process.env.APP_DOWNLOAD_URL || "";

export const OWNER_EMAIL = process.env.OWNER_EMAIL || "";

export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL || "C.H.A.T. <onboarding@resend.dev>";
