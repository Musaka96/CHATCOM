import crypto from "crypto";

const ALGO = "aes-256-gcm";

function getKey(): Buffer {
  const secret = process.env.KEY_ENCRYPTION_SECRET;
  if (!secret) {
    throw new Error("KEY_ENCRYPTION_SECRET is not set");
  }
  const key = Buffer.from(secret, "base64");
  if (key.length !== 32) {
    throw new Error("KEY_ENCRYPTION_SECRET must decode to exactly 32 bytes (base64)");
  }
  return key;
}

// Output format: base64(iv).base64(authTag).base64(ciphertext)
export function encryptKey(plaintext: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv.toString("base64"), authTag.toString("base64"), ciphertext.toString("base64")].join(".");
}

export function decryptKey(encrypted: string): string {
  const key = getKey();
  const [ivB64, authTagB64, ciphertextB64] = encrypted.split(".");
  const iv = Buffer.from(ivB64, "base64");
  const authTag = Buffer.from(authTagB64, "base64");
  const ciphertext = Buffer.from(ciphertextB64, "base64");
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(authTag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plaintext.toString("utf8");
}

export function maskKey(plaintext: string): string {
  if (plaintext.length <= 4) return "****";
  return `${"*".repeat(Math.max(plaintext.length - 4, 0))}${plaintext.slice(-4)}`;
}
