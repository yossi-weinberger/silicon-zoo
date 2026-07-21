/**
 * Apply user-supplied logos from more/, Salesforce Trailhead art,
 * site favicon, and honest catalog cleanup (Kotlin/npm/empty scores).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const moreDir = path.join(root, "more");
const mascotsDir = path.join(root, "public", "mascots");
const usesPath = path.join(root, "src", "data", "uses.json");
const animalsPath = path.join(root, "src", "data", "animals.json");
const noticePath = path.join(root, "THIRD_PARTY_ASSETS.md");
const UA =
  "SiliconZooAssetBot/1.0 (https://github.com/yossi-weinberger/silicon-zoo; commentary)";

fs.mkdirSync(mascotsDir, { recursive: true });

/** Local files the user dropped in more/ */
const localCopies = [
  {
    from: "redpanda-cropped.svg",
    to: "redpanda.svg",
    useIds: ["red-panda-redpanda"],
    alt: "Redpanda logo",
    attribution: "Redpanda brand mark provided for Silicon Zoo identification.",
    remoteSrc: "https://www.redpanda.com/",
  },
  {
    from: "scratch cat.svg",
    to: "scratch.svg",
    useIds: ["cat-scratch-cat"],
    alt: "Scratch Cat",
    attribution: "Scratch Cat mascot artwork.",
    remoteSrc: "https://scratch.mit.edu/",
  },
  {
    from: "Firefox-Logo.wine.svg",
    to: "firefox.svg",
    useIds: ["fox-mozilla-firefox"],
    alt: "Firefox logo",
    attribution: "Firefox logo (Wine/community SVG packaging of Mozilla mark).",
    remoteSrc: "https://www.mozilla.org/firefox/",
  },
  {
    from: "gitlab-logo-500-rgb (1).svg",
    to: "gitlab.svg",
    useIds: ["fox-gitlab-ish", "tanuki-gitlab-origin-story"],
    alt: "GitLab logo",
    attribution: "Official GitLab logo (tanuki).",
    remoteSrc: "https://about.gitlab.com/press/press-kit/",
  },
  {
    from: "PHP_Elephpant.svg",
    to: "php-elephpant.svg",
    useIds: ["elephant-php-elephpant"],
    alt: "elePHPant",
    attribution: "PHP elePHPant artwork.",
    remoteSrc: "https://www.php.net/elephpant.php",
  },
  {
    from: "zebra-logo-horizontal (2).svg",
    to: "zebra-technologies.svg",
    useIds: ["zebra-zebra-technologies"],
    alt: "Zebra Technologies logo",
    attribution: "Zebra Technologies logo.",
    remoteSrc: "https://www.zebra.com/",
  },
  {
    from: "Edonkey2000_logo.gif",
    to: "edonkey.gif",
    useIds: ["donkey-edonkey-historical"],
    alt: "eDonkey2000 logo",
    attribution: "Historical eDonkey2000 logo.",
    remoteSrc: "https://en.wikipedia.org/wiki/EDonkey2000",
  },
  {
    from: "krita-kiki.jpg",
    to: "krita-kiki.jpg",
    useIds: ["squirrel-krita-kiki"],
    alt: "Kiki, the Krita squirrel",
    attribution: "Krita Kiki mascot artwork.",
    remoteSrc: "https://krita.org/",
  },
  {
    from: "liongard-icon-full-color-rgb.png",
    to: "liongard.png",
    useIds: ["lion-liongard"],
    alt: "Liongard logo",
    attribution: "Liongard brand mark.",
    remoteSrc: "https://www.liongard.com/",
  },
  {
    from: "Mailchimp-Icon.png",
    to: "mailchimp.png",
    useIds: ["monkey-mailchimp-freddie"],
    alt: "Mailchimp Freddie",
    attribution: "Mailchimp brand icon for Freddie the monkey.",
    remoteSrc: "https://mailchimp.com/",
  },
  {
    from: "veasel.png",
    to: "v-veasel.png",
    useIds: ["weasel-v-veasel"],
    alt: "V language Veasel mascot",
    attribution: "V language Veasel mascot.",
    remoteSrc: "https://vlang.io/",
  },
];

/** Official Trailhead illustrations from Salesforce blog assets. */
const salesforce = {
  "elephant-salesforce-ruth": {
    file: "salesforce-ruth.png",
    url: "https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/12/2021-12-360Blog-2D-IndividualIllustrations-Ruth.png",
    alt: "Ruth the Elephant, Salesforce Trailhead character",
  },
  "fox-salesforce-brandy": {
    file: "salesforce-brandy.png",
    url: "https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/12/2021-12-360Blog-2D-IndividualIllustrations-Brandy.png",
    alt: "Brandy the Fox, Salesforce Trailhead character",
  },
  "squirrel-salesforce-flo": {
    file: "salesforce-flo.png",
    url: "https://www.salesforce.com/blog/wp-content/uploads/sites/2/2023/03/2023-03-360Blog-Flo-567-844.png",
    alt: "Flo the Flying Squirrel, Salesforce Trailhead character",
  },
  "raccoon-salesforce-astro": {
    file: "salesforce-astro.png",
    url: "https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/12/2021-12-360Blog-2D-IndividualIllustrations-Astro.png",
    alt: "Astro, Salesforce Trailhead character",
  },
  "tanuki-salesforce-astro": {
    file: "salesforce-astro.png",
    url: "https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/12/2021-12-360Blog-2D-IndividualIllustrations-Astro.png",
    alt: "Astro, Salesforce Trailhead character",
  },
  "zebra-salesforce-zig": {
    file: "salesforce-zig.png",
    url: "https://www.salesforce.com/blog/wp-content/uploads/sites/2/2023/05/2023-05-360Blog-ContextualDriver-Zig-567x844-1.png",
    alt: "Zig the Zebra, Salesforce Trailhead character",
  },
  "bear-salesforce-codey": {
    file: "salesforce-codey.png",
    url: "https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/12/2021-12-360Blog-2D-IndividualIllustrations-Codey.png",
    alt: "Codey the Bear, Salesforce Trailhead character",
  },
  "goat-salesforce-cloudy": {
    file: "salesforce-cloudy.png",
    url: "https://www.salesforce.com/blog/wp-content/uploads/sites/2/2021/12/2021-12-360Blog-2D-IndividualIllustrationsCloudy.png",
    alt: "Cloudy the Goat, Salesforce Trailhead character",
  },
};

const BLOG =
  "https://www.salesforce.com/blog/meet-trailhead-characters-blog/";

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`skip ${path.basename(dest)}`);
    return true;
  }
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Referer: BLOG },
    redirect: "follow",
  });
  if (!res.ok) {
    console.warn(`FAIL ${res.status} ${url}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) {
    console.warn(`FAIL tiny ${url}`);
    return false;
  }
  fs.writeFileSync(dest, buf);
  console.log(`OK   ${path.basename(dest)} (${buf.length})`);
  return true;
}

function copyLocal(fromName, toName) {
  const from = path.join(moreDir, fromName);
  const to = path.join(mascotsDir, toName);
  if (!fs.existsSync(from)) {
    console.warn(`missing more/${fromName}`);
    return false;
  }
  fs.copyFileSync(from, to);
  console.log(`COPY ${fromName} -> ${toName}`);
  return true;
}

const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));
const animals = JSON.parse(fs.readFileSync(animalsPath, "utf8"));

const REMOVE_USE_IDS = new Set([
  "red-panda-kotlin-kodi", // Kodee is not an animal
  "wombat-npm-wombat", // no verifiable official mascot source
  "owl-salesforce-hootie", // not on current Trailhead character roster we can source
  "horse-salesforce-blaze", // not on current Trailhead character roster we can source
]);

let nextUses = uses.filter((u) => !REMOVE_USE_IDS.has(u.id));

for (const animal of animals) {
  animal.uses = animal.uses.filter((id) => !REMOVE_USE_IDS.has(id));
  // Empty enclosure = score 0 (no invented occupancy)
  if (animal.uses.length === 0) {
    delete animal.scoreOverride;
    delete animal.scoreOverrideRationale;
  }
}

const redPanda = animals.find((a) => a.id === "red-panda");
if (redPanda) {
  redPanda.verdict =
    "Redpanda the streaming company owns the name. Kotlin’s Kodee is a cute creature, not a red panda — so it does not count here.";
}

const wombat = animals.find((a) => a.id === "wombat");
if (wombat) {
  wombat.status = "Available for adoption";
  wombat.verdict =
    "We could not verify a current official npm wombat mascot with a primary source, so this enclosure is open.";
  wombat.reviewStatus = "candidate";
}

// Local more/ copies
for (const item of localCopies) {
  if (!copyLocal(item.from, item.to)) continue;
  for (const id of item.useIds) {
    const use = nextUses.find((u) => u.id === id);
    if (!use) continue;
    use.image = {
      src: `/mascots/${item.to}`,
      remoteSrc: item.remoteSrc,
      alt: item.alt,
      attribution: item.attribution,
    };
  }
}

// Salesforce Trailhead characters
for (const [id, asset] of Object.entries(salesforce)) {
  const dest = path.join(mascotsDir, asset.file);
  const ok = await download(asset.url, dest);
  if (!ok) continue;
  const use = nextUses.find((u) => u.id === id);
  if (!use) continue;
  use.image = {
    src: `/mascots/${asset.file}`,
    remoteSrc: asset.url,
    alt: asset.alt,
    attribution:
      "Salesforce Trailhead character artwork from salesforce.com blog / media library. Used for identification and commentary.",
  };
  use.sourceUrl = BLOG;
  use.sourceType = "official";
  use.verificationStatus = "verified";
  use.verifiedAt = "2026-07-21";
}

// Site logo + favicon
const logoSrc = path.join(moreDir, "logo.png");
if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, path.join(root, "public", "logo.png"));
  fs.copyFileSync(logoSrc, path.join(root, "src", "app", "icon.png"));
  fs.copyFileSync(logoSrc, path.join(root, "src", "app", "apple-icon.png"));
  console.log("OK logo.png -> public/ + app icons");
}

// Rebuild notice
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
notice.push(
  `| \`logo.png\` | Site brand / favicon | \`more/logo.png\` | Silicon Zoo site mark. |`,
);

fs.writeFileSync(usesPath, JSON.stringify(nextUses, null, 2) + "\n");
fs.writeFileSync(animalsPath, JSON.stringify(animals, null, 2) + "\n");
fs.writeFileSync(noticePath, notice.join("\n") + "\n");

const emptyOverride = animals.filter(
  (a) => a.uses.length === 0 && a.scoreOverride != null,
).length;
console.log(
  JSON.stringify(
    {
      uses: nextUses.length,
      removed: REMOVE_USE_IDS.size,
      emptyWithOverrideLeft: emptyOverride,
      withLocal: nextUses.filter((u) => u.image?.src).length,
    },
    null,
    2,
  ),
);
