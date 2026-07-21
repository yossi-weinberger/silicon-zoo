/**
 * Download logos for uses that currently show "Image coming soon".
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const usesPath = path.join(root, "src", "data", "uses.json");
const noticePath = path.join(root, "THIRD_PARTY_ASSETS.md");
const outDir = path.join(root, "public", "mascots");
const UA =
  "SiliconZooAssetBot/1.0 (https://github.com/yossi-weinberger/silicon-zoo)";

fs.mkdirSync(outDir, { recursive: true });

/** Prefer first URL that downloads successfully. */
const patches = {
  "ladybug-serenityos-buggie": {
    file: "serenityos.png",
    alt: "SerenityOS brand mark",
    attribution: "SerenityOS organization avatar on GitHub.",
    urls: [
      "https://avatars.githubusercontent.com/u/50811782?s=200&v=4",
    ],
  },
  "gorilla-gorilla-logic": {
    file: "gorilla-logic.png",
    alt: "Gorilla Logic brand mark",
    attribution: "Gorilla Logic favicon / brand mark.",
    urls: [
      "https://www.google.com/s2/favicons?domain=gorillalogic.com&sz=128",
    ],
  },
  "wolf-arctic-wolf": {
    file: "arctic-wolf.png",
    alt: "Arctic Wolf brand mark",
    attribution: "Arctic Wolf brand mark / favicon.",
    urls: [
      "https://www.google.com/s2/favicons?domain=arcticwolf.com&sz=128",
    ],
  },
  "ibex-lowrisc-ibex": {
    file: "lowrisc-ibex.png",
    alt: "lowRISC Ibex",
    attribution: "lowRISC organization avatar on GitHub.",
    urls: ["https://avatars.githubusercontent.com/u/13596407?s=200&v=4"],
  },
  "lynx-lynx-browser": {
    file: "lynx-browser.png",
    alt: "Lynx browser",
    attribution: "Lynx browser site favicon.",
    urls: [
      "https://www.google.com/s2/favicons?domain=lynx.invisible-island.net&sz=128",
    ],
  },
  "eagle-eagle-eye-networks": {
    file: "eagle-eye-networks.png",
    alt: "Eagle Eye Networks brand mark",
    attribution: "Eagle Eye Networks brand mark / favicon.",
    urls: [
      "https://www.google.com/s2/favicons?domain=een.com&sz=128",
    ],
  },
  "walrus-walrus": {
    file: "walrus.png",
    alt: "Walrus brand mark",
    attribution: "Walrus organization avatar on GitHub.",
    urls: ["https://avatars.githubusercontent.com/u/147906327?s=200&v=4"],
  },
  "jackal-clearpath": {
    file: "clearpath-jackal.png",
    alt: "Clearpath Robotics",
    attribution: "Clearpath Robotics organization avatar on GitHub.",
    urls: ["https://avatars.githubusercontent.com/u/159163?s=200&v=4"],
  },
  "squirrel-squirrelmail": {
    file: "squirrelmail.png",
    alt: "SquirrelMail",
    attribution: "SquirrelMail site favicon.",
    urls: [
      "https://www.google.com/s2/favicons?domain=squirrelmail.org&sz=128",
    ],
  },
  "condor-htcondor": {
    file: "htcondor.jpg",
    alt: "HTCondor",
    attribution: "HTCondor organization avatar on GitHub.",
    urls: ["https://avatars.githubusercontent.com/u/7559271?s=200&v=4"],
  },
  "canary-thinkst": {
    file: "thinkst-canary.png",
    alt: "Thinkst Canary brand mark",
    attribution: "Thinkst Canary brand mark / favicon.",
    urls: [
      "https://www.google.com/s2/favicons?domain=canary.tools&sz=128",
    ],
  },
  "vicuna-lmsys": {
    file: "lmsys-vicuna.png",
    alt: "LMSYS Vicuna",
    attribution: "LMSYS Org avatar on GitHub.",
    urls: ["https://avatars.githubusercontent.com/u/123214896?s=200&v=4"],
  },
  "falcon-tii": {
    file: "falcon-tii.svg",
    alt: "TII Falcon LLM logo",
    attribution: "Official Falcon logo from falconllm.tii.ae.",
    urls: [
      "https://falconllm.tii.ae/assets/images/falcon-logo.svg",
      "https://avatars.githubusercontent.com/u/114677605?s=200&v=4",
    ],
  },
};

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      redirect: "follow",
    });
    if (!res.ok) {
      console.warn(`FAIL ${res.status} ${url}`);
      return false;
    }
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("text/html")) {
      console.warn(`FAIL html ${url}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 40) {
      console.warn(`FAIL tiny ${url}`);
      return false;
    }
    fs.writeFileSync(dest, buf);
    console.log(`OK   ${path.basename(dest)} (${buf.length}) <- ${url}`);
    return true;
  } catch (err) {
    console.warn(`FAIL ${err.message} ${url}`);
    return false;
  }
}

const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));
let patched = 0;

for (const [id, spec] of Object.entries(patches)) {
  const use = uses.find((u) => u.id === id);
  if (!use) {
    console.warn(`missing use ${id}`);
    continue;
  }
  const dest = path.join(outDir, spec.file);
  if (use.image?.src && fs.existsSync(dest) && fs.statSync(dest).size > 40) {
    console.warn(`skip already has image ${id}`);
    continue;
  }

  let remote = null;
  for (const url of spec.urls) {
    if (await download(url, dest)) {
      remote = url;
      break;
    }
  }
  if (!remote) {
    console.warn(`NO IMAGE ${id}`);
    continue;
  }

  use.image = {
    src: `/mascots/${spec.file}`,
    remoteSrc: remote,
    alt: spec.alt,
    attribution: spec.attribution,
  };
  patched++;
}

fs.writeFileSync(usesPath, JSON.stringify(uses, null, 2) + "\n");

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

const stillMissing = uses.filter((u) => !u.image?.src && !u.image?.remoteSrc);
console.log(
  JSON.stringify(
    {
      patched,
      stillMissing: stillMissing.map((u) => u.id),
      withLocal: uses.filter((u) => u.image?.src).length,
      total: uses.length,
    },
    null,
    2,
  ),
);
