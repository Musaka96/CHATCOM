const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Choose an admin password: ", (password) => {
  const hash = bcrypt.hashSync(password, 12);
  console.log("\nAdd this to your environment as ADMIN_PASSWORD_HASH:\n");
  console.log(hash);
  console.log("");
  rl.close();
});
