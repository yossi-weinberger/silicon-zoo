import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const usesPath = path.join(root, "src", "data", "uses.json");
const noticePath = path.join(root, "THIRD_PARTY_ASSETS.md");
const outDir = path.join(root, "public", "mascots");
const UA =
  "SiliconZooAssetBot/1.0 (https://github.com/yossi-weinberger/silicon-zoo)";

const patches = {
  "tiger-macos-tiger-historical": {
    file: "macos-tiger.svg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mac%20OS%20X%20Tiger%20icon.svg",
    alt: "Mac OS X Tiger icon",
    attribution: "Mac OS X Tiger icon via Wikimedia Commons.",
  },
  "zebra-zebra-technologies": {
    file: "zebra-technologies.jpg",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Brand-3op-wikipedia-image.jpg/330px-Brand-3op-wikipedia-image.jpg",
    alt: "Zebra Technologies brand imagery",
    attribution: "Zebra Technologies brand image via Wikimedia Commons.",
  },
};

const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));
const notice = fs.readFileSync(noticePath, "utf8").trimEnd().split("\n");

for (const [id, patch] of Object.entries(patches)) {
  const dest = path.join(outDir, patch.file);
  const res = await fetch(patch.imageUrl, {
    headers: { "User-Agent": UA },
    redirect: "follow",
  });
  if (!res.ok) {
    console.warn(`FAIL ${id} ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > 500_000) {
    console.warn(`FAIL oversized ${id} ${buf.length}`);
    continue;
  }
  fs.writeFileSync(dest, buf);
  const use = uses.find((u) => u.id === id);
  use.image = {
    src: `/mascots/${patch.file}`,
    remoteSrc: patch.imageUrl,
    alt: patch.alt,
    attribution: patch.attribution,
  };
  const row = `| \`${patch.file}\` | \`${id}\` | ${patch.imageUrl} | ${patch.attribution} |`;
  if (!notice.some((line) => line.includes(`\`${patch.file}\``))) {
    notice.push(row);
  }
  console.log(`OK ${patch.file} ${buf.length}`);
}

fs.writeFileSync(usesPath, JSON.stringify(uses, null, 2) + "\n");
fs.writeFileSync(noticePath, notice.join("\n") + "\n");
console.log(
  JSON.stringify(
    {
      withLocal: uses.filter((u) => u.image?.src).length,
      noImage: uses.filter((u) => !u.image?.src).length,
    },
    null,
    2,
  ),
);
