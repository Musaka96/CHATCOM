const crypto = require("crypto");

console.log("\nKEY_ENCRYPTION_SECRET (32 random bytes, base64):");
console.log(crypto.randomBytes(32).toString("base64"));

console.log("\nSESSION_SECRET (32 random bytes, base64):");
console.log(crypto.randomBytes(32).toString("base64"));
console.log("");
