/**
 * 1) Remove invented stretch uses (Bun→rabbit, Yarn→cat).
 * 2) Replace monochrome Simple Icons locals with brand-colored SVGs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const usesPath = path.join(root, "src", "data", "uses.json");
const animalsPath = path.join(root, "src", "data", "animals.json");
const noticePath = path.join(root, "THIRD_PARTY_ASSETS.md");
const outDir = path.join(root, "public", "mascots");
const UA =
  "SiliconZooAssetBot/1.0 (https://github.com/yossi-weinberger/silicon-zoo)";

const REMOVE_USE_IDS = new Set(["rabbit-bun", "cat-yarn"]);

/** Map use id → simpleicons.org slug (colored CDN). */
const coloredSlugs = {
  "penguin-tencent-qq": "tencentqq",
  "elephant-apache-hadoop": "apachehadoop",
  "elephant-evernote": "evernote",
  "elephant-salesforce-ruth": "salesforce",
  "owl-duolingo-duo": "duolingo",
  "owl-hootsuite-owly": "hootsuite",
  "owl-tripadvisor": "tripadvisor",
  "owl-salesforce-hootie": "salesforce",
  "fox-mozilla-firefox": "firefoxbrowser",
  "fox-gitlab-ish": "gitlab",
  "fox-salesforce-brandy": "salesforce",
  "cat-scratch-cat": "scratch",
  "monkey-mailchimp-freddie": "mailchimp",
  "monkey-surveymonkey": "surveymonkey",
  "monkey-blender-suzanne": "blender",
  "duck-duckduckgo": "duckduckgo",
  "chameleon-suse-geeko": "suse",
  "hedgehog-posthog": "posthog",
  "beaver-dbeaver": "dbeaver",
  "cockroach-cockroachdb": "cockroachlabs",
  "lion-brave-browser": "brave",
  "camel-perl": "perl",
  "puffin-prestashop-preston": "prestashop",
  "pufferfish-openbsd-puffy": "openbsd",
  "squirrel-apache-flink": "apacheflink",
  "squirrel-krita-kiki": "krita",
  "squirrel-salesforce-flo": "salesforce",
  "parrot-parrot-os": "parrotsecurity",
  "raccoon-salesforce-astro": "salesforce",
  "shark-digitalocean-sammy": "digitalocean",
  "dog-datadog-bits": "datadog",
  "seal-mariadb": "mariadb",
  "snake-python": "python",
  "mastodon-mastodon": "mastodon",
  "zebra-salesforce-zig": "salesforce",
  "bee-apache-hive": "apache",
  "pig-apache-pig": "apache",
  "wombat-npm-wombat": "npm",
  "gnu-gnu-project": "gnu",
  "weasel-v-veasel": "v",
  "firefly-apache-beam-firefly": "apache",
  "dragon-kde-konqi": "kde",
  "cow-gentoo-larry-the-cow": "gentoo",
  "mouse-xfce-mouse": "xfce",
  "bear-salesforce-codey": "salesforce",
  "goat-salesforce-cloudy": "salesforce",
  "horse-salesforce-blaze": "salesforce",
  "tanuki-salesforce-astro": "salesforce",
  "tanuki-gitlab-origin-story": "gitlab",
  "thunderbird-mozilla-thunderbird": "thunderbird",
  "cuttlefish-peertube-sepia": "peertube",
  "iguana-zig-ziguanas": "zig",
  "llama-meta-llama": "meta",
  "giraffe-cncf-phippy": "cncf",
  "rhino-rhinoceros-3d": "rhinoceros",
};

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    redirect: "follow",
  });
  if (!res.ok) {
    console.warn(`FAIL ${res.status} ${url}`);
    return false;
  }
  const text = await res.text();
  if (!text.includes("<svg") || text.length < 40) {
    console.warn(`FAIL bad svg ${url}`);
    return false;
  }
  fs.writeFileSync(dest, text);
  const fill = text.match(/fill="([^"]+)"/)?.[1] || "?";
  console.log(`OK   ${path.basename(dest)} fill=${fill}`);
  return true;
}

const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));
const animals = JSON.parse(fs.readFileSync(animalsPath, "utf8"));

const nextUses = uses.filter((u) => !REMOVE_USE_IDS.has(u.id));
console.log(`Removed ${uses.length - nextUses.length} stretch uses`);

for (const animal of animals) {
  animal.uses = animal.uses.filter((id) => !REMOVE_USE_IDS.has(id));
}

const rabbit = animals.find((a) => a.id === "rabbit");
if (rabbit) {
  rabbit.verdict =
    "Plan 9's Glenda still owns the warren. No invented runtime rabbits allowed.";
  rabbit.status = "Historical hopper";
  delete rabbit.scoreOverride;
  delete rabbit.scoreOverrideRationale;
}

const cat = animals.find((a) => a.id === "cat");
if (cat) {
  cat.verdict =
    "Cats own the internet. Scratch and Octocat pay the rent; yarn puns do not.";
}

let recolored = 0;
for (const use of nextUses) {
  const slug = coloredSlugs[use.id];
  if (!slug) continue;
  const file = path.basename(use.image?.src || `${slug}.svg`);
  if (!file.endsWith(".svg")) continue;
  const dest = path.join(outDir, file);
  const url = `https://cdn.simpleicons.org/${slug}`;
  const ok = await download(url, dest);
  if (!ok) continue;
  use.image = {
    src: `/mascots/${file}`,
    remoteSrc: url,
    alt: use.image?.alt || `${use.organization} brand mark`,
    attribution: `${use.organization} brand mark via Simple Icons (brand color).`,
  };
  recolored++;
  await new Promise((r) => setTimeout(r, 80));
}

// Drop unused stretch asset files
for (const file of ["bun.svg", "yarn.svg"]) {
  const p = path.join(outDir, file);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// Rebuild THIRD_PARTY_ASSETS from remaining local images
const notice = [
  "# Third-party assets",
  "",
  "These files are used for identification and commentary. They remain owned by their respective trademark holders and are **not** covered by the MIT or CC BY licenses of this repository.",
  "",
  "| File | Used by | Source | Notes |",
  "| --- | --- | --- | --- |",
];
const seen = new Set();
for (const use of nextUses) {
  const src = use.image?.src;
  if (!src) continue;
  const file = path.basename(src);
  if (seen.has(file)) continue;
  seen.add(file);
  const usedBy = nextUses
    .filter((u) => u.image?.src === src)
    .map((u) => `\`${u.id}\``)
    .join(", ");
  notice.push(
    `| \`${file}\` | ${usedBy} | ${use.image.remoteSrc || "local"} | ${use.image.attribution || "Brand asset"} |`,
  );
}

fs.writeFileSync(usesPath, JSON.stringify(nextUses, null, 2) + "\n");
fs.writeFileSync(animalsPath, JSON.stringify(animals, null, 2) + "\n");
fs.writeFileSync(noticePath, notice.join("\n") + "\n");

console.log(
  JSON.stringify(
    {
      uses: nextUses.length,
      recolored,
      withLocal: nextUses.filter((u) => u.image?.src).length,
    },
    null,
    2,
  ),
);
