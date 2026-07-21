import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const usesPath = path.join(root, "src", "data", "uses.json");
const noticePath = path.join(root, "THIRD_PARTY_ASSETS.md");
const outDir = path.join(root, "public", "mascots");
const UA =
  "SiliconZooAssetBot/1.0 (https://github.com/yossi-weinberger/silicon-zoo)";

const patches = [
  {
    file: "salesforce.svg",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Salesforce.com_logo.svg",
    useIds: null, // all uses pointing at this file
    attribution: "Salesforce logo via Wikimedia Commons.",
    alt: "Salesforce brand mark",
  },
  {
    file: "tencent-qq.svg",
    url: "https://cdn.simpleicons.org/qq",
    useIds: ["penguin-tencent-qq"],
    attribution: "QQ brand mark via Simple Icons (brand color).",
    alt: "Tencent QQ brand mark",
  },
  {
    file: "posthog.svg",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/PostHog_logo.svg",
    useIds: ["hedgehog-posthog"],
    attribution: "PostHog logo via Wikimedia Commons.",
    alt: "PostHog brand mark",
    fallback: "https://cdn.simpleicons.org/posthog/F54E00",
  },
];

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    redirect: "follow",
  });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 40) return null;
  return buf;
}

const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));

for (const patch of patches) {
  let buf = await download(patch.url);
  let source = patch.url;
  if (!buf && patch.fallback) {
    buf = await download(patch.fallback);
    source = patch.fallback;
  }
  if (!buf) {
    console.warn(`FAIL ${patch.file}`);
    continue;
  }
  // Prefer SVG text; ensure salesforce has visible fills
  const dest = path.join(outDir, patch.file);
  fs.writeFileSync(dest, buf);
  console.log(`OK ${patch.file} ${buf.length} from ${source}`);

  const targets = uses.filter((u) => {
    if (patch.useIds) return patch.useIds.includes(u.id);
    return u.image?.src === `/mascots/${patch.file}`;
  });
  for (const use of targets) {
    use.image = {
      src: `/mascots/${patch.file}`,
      remoteSrc: source,
      alt: patch.alt,
      attribution: patch.attribution,
    };
  }
}

// Tint remaining local Simple Icons that are still black/missing fill
for (const use of uses) {
  const src = use.image?.src;
  if (!src?.endsWith(".svg")) continue;
  const file = path.join(outDir, path.basename(src));
  if (!fs.existsSync(file)) continue;
  let svg = fs.readFileSync(file, "utf8");
  if (svg.includes('fill="#')) continue;
  // Inject a mid brand-ish accent if path-only mono
  if (svg.includes("<svg") && !/fill="/i.test(svg)) {
    svg = svg.replace("<svg", '<svg fill="#333333"');
    fs.writeFileSync(file, svg);
    console.log(`tinted mono ${path.basename(file)}`);
  }
}

fs.writeFileSync(usesPath, JSON.stringify(uses, null, 2) + "\n");

// refresh notice table
const notice = [
  "# Third-party assets",
  "",
  "These files are used for identification and commentary. They remain owned by their respective trademark holders and are **not** covered by the MIT or CC BY licenses of this repository.",
  "",
  "| File | Used by | Source | Notes |",
  "| --- | --- | --- | --- |",
];
const seen = new Set();
for (const use of uses) {
  const src = use.image?.src;
  if (!src) continue;
  const file = path.basename(src);
  if (seen.has(file)) continue;
  seen.add(file);
  const usedBy = uses
    .filter((u) => u.image?.src === src)
    .map((u) => `\`${u.id}\``)
    .join(", ");
  notice.push(
    `| \`${file}\` | ${usedBy} | ${use.image.remoteSrc || "local"} | ${use.image.attribution || "Brand asset"} |`,
  );
}
fs.writeFileSync(noticePath, notice.join("\n") + "\n");
console.log("done");
