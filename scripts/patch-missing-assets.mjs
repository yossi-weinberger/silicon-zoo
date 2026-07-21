/**
 * Download remaining mascot/logo assets and patch uses.json image fields.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const usesPath = path.join(root, "src", "data", "uses.json");
const outDir = path.join(root, "public", "mascots");
const noticePath = path.join(root, "THIRD_PARTY_ASSETS.md");
fs.mkdirSync(outDir, { recursive: true });

const UA =
  "SiliconZooAssetBot/1.0 (https://github.com/yossi-weinberger/silicon-zoo)";

/** @type {Record<string, { file: string; imageUrl: string; attribution: string; alt: string }>} */
const patches = {
  "red-panda-kotlin-kodi": {
    file: "kotlin-kodee.svg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kodee-mascot-regular.svg",
    attribution: "Kotlin Kodee mascot via Wikimedia Commons.",
    alt: "Kotlin Kodee mascot",
  },
  "otter-otter-ai": {
    file: "otter-ai.ico",
    imageUrl: "https://otter.ai/favicon.ico",
    attribution: "Otter.ai favicon from otter.ai.",
    alt: "Otter.ai brand mark",
  },
  "pigeon-pidgin-purple-pidgin": {
    file: "pidgin.svg",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Pidgin.svg",
    attribution: "Pidgin logo via Wikimedia Commons.",
    alt: "Pidgin logo",
  },
  "panda-pandadoc": {
    file: "pandadoc.png",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/PandaDoc%20Logo%20PNG.png",
    attribution: "PandaDoc logo via Wikimedia Commons.",
    alt: "PandaDoc logo",
  },
  "antelope-libreboot-canteloupe": {
    file: "libreboot.svg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Libreboot_logo.svg",
    attribution: "Libreboot logo via Wikimedia Commons.",
    alt: "Libreboot logo",
  },
  "butterfly-raku-camelia": {
    file: "raku-camelia.svg",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Camelia.svg",
    attribution: "Raku Camelia mascot via Wikimedia Commons.",
    alt: "Raku Camelia butterfly mascot",
  },
  "fish-freedos-blinky": {
    file: "freedos.svg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/FreeDOS%20logo4%202010.svg",
    attribution: "FreeDOS logo via Wikimedia Commons.",
    alt: "FreeDOS logo",
  },
  "woodpecker-kate-cyber-woodpecker": {
    file: "kate.svg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sc-apps-kate-editor.svg",
    attribution: "Kate editor icon via Wikimedia Commons.",
    alt: "Kate text editor icon",
  },
  "duck-adium-adiumy": {
    file: "adium.png",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Adium.png",
    attribution: "Adium duck icon via Wikimedia Commons.",
    alt: "Adium duck mascot",
  },
  "mule-emule": {
    file: "emule.svg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/EMule_mascot.svg",
    attribution: "eMule mascot via Wikimedia Commons.",
    alt: "eMule mascot",
  },
  "rabbit-plan-9-glenda": {
    file: "plan9-glenda.jpg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Glenda%20bunny%20mascot%20of%20plan%209%20from%20bell%20white.jpg",
    attribution: "Plan 9 Glenda bunny via Wikimedia Commons.",
    alt: "Glenda, the Plan 9 bunny mascot",
  },
  "platypus-darwin-hexley": {
    file: "hexley.png",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hexley%20STK.png",
    attribution: "Hexley the platypus via Wikimedia Commons.",
    alt: "Hexley the Darwin platypus mascot",
  },
  "pony-pony-programming-language": {
    file: "pony.svg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Main_galloping.svg",
    attribution: "Pony language mascot via Wikimedia Commons.",
    alt: "Pony programming language mascot",
  },
  "ladybug-bugzilla-buggie": {
    file: "bugzilla.svg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bugzilla_logo_%282022%29.svg",
    attribution: "Bugzilla logo via Wikimedia Commons.",
    alt: "Bugzilla logo",
  },
  "cow-terminusdb-cowduck": {
    file: "terminusdb.png",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/TerminusDB%20Color%20Mascot.png",
    attribution: "TerminusDB CowDuck mascot via Wikimedia Commons.",
    alt: "TerminusDB CowDuck mascot",
  },
  "dinosaur-mozilla-historical": {
    file: "mozilla-dinosaur.svg",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mozilla%20dinosaur%20head%20logo.svg",
    attribution: "Historical Mozilla dinosaur logo via Wikimedia Commons.",
    alt: "Historical Mozilla dinosaur logo",
  },
};

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return true;
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    redirect: "follow",
  });
  if (!res.ok) {
    console.warn(`FAIL ${res.status} ${url}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 32) {
    console.warn(`FAIL tiny ${url}`);
    return false;
  }
  fs.writeFileSync(dest, buf);
  console.log(`OK   ${path.basename(dest)} (${buf.length} bytes)`);
  return true;
}

const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));
const noticeLines = fs.existsSync(noticePath)
  ? fs.readFileSync(noticePath, "utf8").trimEnd().split("\n")
  : [
      "# Third-party assets",
      "",
      "These files are used for identification and commentary. They remain owned by their respective trademark holders and are **not** covered by the MIT or CC BY licenses of this repository.",
      "",
      "| File | Used by | Source | Notes |",
      "| --- | --- | --- | --- |",
    ];

let okCount = 0;
for (const [id, patch] of Object.entries(patches)) {
  // Skip the intentional redpanda placeholder — handled below.
  if (id === "red-panda-redpanda") continue;

  const use = uses.find((u) => u.id === id);
  if (!use) {
    console.warn(`Missing use ${id}`);
    continue;
  }
  const dest = path.join(outDir, patch.file);
  const ok = await download(patch.imageUrl, dest);
  if (!ok) continue;
  okCount++;
  use.image = {
    src: `/mascots/${patch.file}`,
    remoteSrc: patch.imageUrl,
    alt: patch.alt,
    attribution: patch.attribution,
  };
  const row = `| \`${patch.file}\` | \`${id}\` | ${patch.imageUrl} | ${patch.attribution} |`;
  if (!noticeLines.some((line) => line.includes(`\`${patch.file}\``))) {
    noticeLines.push(row);
  }
  await new Promise((r) => setTimeout(r, 250));
}

// Redpanda: clear broken Simple Icons remote; keep honest null local until a redistributable mark is available.
const redpanda = uses.find((u) => u.id === "red-panda-redpanda");
if (redpanda) {
  redpanda.image = {
    src: null,
    remoteSrc: null,
    alt: "Redpanda",
    attribution: "No redistributable Redpanda mark packaged yet; see sourceUrl.",
  };
}

// Clear other broken remote-only Simple Icons leftovers without local files.
for (const use of uses) {
  const remote = use.image?.remoteSrc || "";
  if (
    !use.image?.src &&
    remote.includes("simple-icons") &&
    (remote.includes("redpanda") ||
      remote.includes("otterdotai") ||
      remote.includes("pidgin") ||
      remote.includes("pandadoc") ||
      remote.includes("libreboot") ||
      remote.includes("raku") ||
      remote.includes("freedos") ||
      remote.includes("kate") ||
      remote.includes("gorillastack"))
  ) {
    use.image = {
      src: null,
      remoteSrc: null,
      alt: use.image?.alt || use.organization,
      attribution: use.image?.attribution,
    };
  }
}

fs.writeFileSync(usesPath, JSON.stringify(uses, null, 2) + "\n");
fs.writeFileSync(noticePath, noticeLines.join("\n") + "\n");

const withLocal = uses.filter((u) => u.image?.src).length;
const noImage = uses.filter((u) => !u.image?.src && !u.image?.remoteSrc).length;
console.log(JSON.stringify({ okCount, withLocal, noImage }, null, 2));
