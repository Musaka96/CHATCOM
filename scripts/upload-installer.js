// Uploads the C.H.A.T. installer to Vercel Blob as a PUBLIC file and prints the
// permanent public URL to use for APP_DOWNLOAD_URL.
//
// A public blob URL (https://<id>.public.blob.vercel-storage.com/<name>) never
// expires and needs no token, so it's safe to email to customers. Do NOT use a
// "private" blob URL for APP_DOWNLOAD_URL — those are temporary signed links that
// expire after a few hours and then return "Forbidden".
//
// Usage (PowerShell):
//   $env:BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxx"; npm run upload-installer -- "./CHAT-Setup.zip"
//
// Usage (bash):
//   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx npm run upload-installer -- "./CHAT-Setup.zip"
//
// Grab BLOB_READ_WRITE_TOKEN from Vercel > Storage > your Blob store > .env tab.

const fs = require("fs");
const path = require("path");
const { put } = require("@vercel/blob");

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: npm run upload-installer -- "<path-to-installer>"');
    process.exit(1);
  }
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("BLOB_READ_WRITE_TOKEN is not set. Copy it from Vercel > Storage > your Blob store.");
    process.exit(1);
  }

  const name = path.basename(filePath);
  console.log(`Uploading "${name}" as a public blob...`);

  const blob = await put(name, fs.createReadStream(filePath), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    multipart: true,
    token,
  });

  console.log("\n✅ Uploaded. Set this as APP_DOWNLOAD_URL (and redeploy):\n");
  console.log(blob.url);
  console.log("");
}

main().catch((err) => {
  console.error("\nUpload failed:", err.message || err);
  process.exit(1);
});
