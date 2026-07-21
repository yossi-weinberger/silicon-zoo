import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uses = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/uses.json"), "utf8"),
);

let missing = 0;
for (const use of uses) {
  const src = use.image?.src;
  if (!src) continue;
  const file = path.join(root, "public", src.replace(/^\//, ""));
  if (!fs.existsSync(file)) {
    console.error(`Missing asset for ${use.id}: ${src}`);
    missing++;
  }
}

if (missing) {
  process.exit(1);
}
console.log(`Validated local assets for ${uses.length} uses.`);
