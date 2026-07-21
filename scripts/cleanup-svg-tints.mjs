import fs from "node:fs";
import path from "node:path";

const dir = "public/mascots";
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".svg"))) {
  const file = path.join(dir, f);
  let svg = fs.readFileSync(file, "utf8");
  if (!svg.includes('fill="#333333"')) continue;
  const hasOwnColor =
    /fill:\s*rgb|fill="#(?!333333)[0-9A-Fa-f]{3,8}"|style="[^"]*fill:/i.test(
      svg,
    );
  if (hasOwnColor) {
    svg = svg.replace(' fill="#333333"', "");
    fs.writeFileSync(file, svg);
    console.log("cleaned", f);
  } else {
    console.log("kept tint", f);
  }
}
