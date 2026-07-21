/**
 * Linux distro / BSD animal layer: Gentoo naming, Freedo, Anaconda, FreeBSD Beastie.
 * OpenBSD Puffy already in catalog.
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
const TODAY = "2026-07-21";

fs.mkdirSync(outDir, { recursive: true });

const newAnimals = [
  {
    id: "anaconda",
    name: "Anaconda",
    nameHe: "אנקונדה",
    aliases: ["anaconda", "אנקונדה"],
    emoji: "🐍",
    animalClass: "reptiles",
    accentColor: "#cbea77",
    status: "Installer coils occupied",
    verdict:
      "Fedora and RHEL install through Anaconda — a snake that wraps the whole disk.",
    alternatives: ["snake"],
  },
  {
    id: "daemon",
    name: "Daemon",
    nameHe: "דימון",
    aliases: ["daemon", "beastie", "bsd daemon", "דימון", "ביסטי"],
    emoji: "😈",
    animalClass: "mammals",
    accentColor: "#e7a6ac",
    status: "Pitchfork enclosure",
    verdict:
      "Beastie the BSD daemon is not a zoo animal, but FreeBSD keeps him on the grounds anyway.",
    alternatives: ["dragon"],
  },
];

const newUses = [
  {
    id: "penguin-gentoo-name",
    animalId: "penguin",
    organization: "Gentoo",
    product: "Gentoo Linux",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source"],
    sourceUrl: "https://wiki.gentoo.org/wiki/FAQ",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Gentoo Linux",
    file: "gentoo.svg",
    imageUrl: "https://cdn.simpleicons.org/gentoo",
    reuseExisting: true,
    alt: "Gentoo brand mark",
    attribution:
      "Gentoo brand mark via Simple Icons. Distro named after the gentoo penguin.",
  },
  {
    id: "penguin-linux-libre-freedo",
    animalId: "penguin",
    organization: "Linux-libre",
    product: "Linux-libre",
    characterName: "Freedo",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source"],
    sourceUrl: "https://www.fsfla.org/ikiwiki/selibre/linux-libre/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Linux-libre · Freedo",
    file: "linux-libre-freedo.svg",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Freedo.svg",
    alt: "Freedo, the Linux-libre penguin mascot",
    attribution:
      "Freedo by Rubén Rodríguez Pérez, via Wikimedia Commons (Linux-libre).",
  },
  {
    id: "anaconda-rhinstaller",
    animalId: "anaconda",
    organization: "Red Hat / Fedora",
    product: "Anaconda",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["tools", "code", "open_source"],
    sourceUrl: "https://github.com/rhinstaller/anaconda",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Anaconda installer",
    file: "fedora.svg",
    imageUrl: "https://cdn.simpleicons.org/fedora",
    alt: "Fedora brand mark for Anaconda installer",
    attribution: "Fedora brand mark via Simple Icons (brand color).",
  },
  {
    id: "daemon-freebsd-beastie",
    animalId: "daemon",
    organization: "FreeBSD",
    product: "FreeBSD",
    characterName: "Beastie",
    relationshipType: "hybrid_or_mythical",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["code", "open_source"],
    sourceUrl: "https://www.freebsd.org/logo/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "FreeBSD · Beastie",
    file: "freebsd.svg",
    imageUrl: "https://cdn.simpleicons.org/freebsd",
    alt: "FreeBSD brand mark for Beastie",
    attribution: "FreeBSD brand mark via Simple Icons (brand color).",
  },
];

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 40) return true;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      redirect: "follow",
    });
    if (!res.ok) {
      console.warn(`FAIL ${res.status} ${url}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 40) {
      console.warn(`FAIL tiny ${url}`);
      return false;
    }
    fs.writeFileSync(dest, buf);
    console.log(`OK   ${path.basename(dest)} (${buf.length})`);
    return true;
  } catch (err) {
    console.warn(`FAIL ${err.message} ${url}`);
    return false;
  }
}

const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));
const animals = JSON.parse(fs.readFileSync(animalsPath, "utf8"));
const existingUseIds = new Set(uses.map((u) => u.id));
const existingAnimalIds = new Set(animals.map((a) => a.id));

let animalsAdded = 0;
for (const raw of newAnimals) {
  if (existingAnimalIds.has(raw.id)) continue;
  animals.push({
    id: raw.id,
    slug: raw.id,
    name: raw.name,
    nameHe: raw.nameHe,
    aliases: raw.aliases,
    emoji: raw.emoji,
    animalClass: raw.animalClass,
    accentColor: raw.accentColor,
    status: raw.status,
    verdict: raw.verdict,
    alternatives: raw.alternatives,
    uses: [],
    reviewStatus: "verified",
    lastReviewedAt: TODAY,
  });
  existingAnimalIds.add(raw.id);
  animalsAdded++;
}

let usesAdded = 0;
for (const raw of newUses) {
  if (existingUseIds.has(raw.id)) {
    console.warn(`skip existing ${raw.id}`);
    continue;
  }

  let image = {
    src: null,
    remoteSrc: raw.imageUrl,
    alt: raw.alt,
    attribution: raw.attribution,
  };

  if (raw.file && raw.imageUrl) {
    const dest = path.join(outDir, raw.file);
    const ok =
      raw.reuseExisting && fs.existsSync(dest)
        ? true
        : await download(raw.imageUrl, dest);
    if (ok) {
      image = {
        src: `/mascots/${raw.file}`,
        remoteSrc: raw.imageUrl,
        alt: raw.alt,
        attribution: raw.attribution,
      };
    }
  }

  uses.push({
    id: raw.id,
    animalId: raw.animalId,
    organization: raw.organization,
    ...(raw.product ? { product: raw.product } : {}),
    ...(raw.characterName ? { characterName: raw.characterName } : {}),
    relationshipType: raw.relationshipType,
    officialStatus: raw.officialStatus,
    activeStatus: raw.activeStatus,
    recognition: raw.recognition,
    techHabitats: raw.techHabitats,
    sourceUrl: raw.sourceUrl,
    sourceType: raw.sourceType,
    verificationStatus: raw.verificationStatus,
    verifiedAt: TODAY,
    displayLabel: raw.displayLabel,
    image,
  });
  existingUseIds.add(raw.id);
  usesAdded++;

  const animal = animals.find((a) => a.id === raw.animalId);
  if (animal && !animal.uses.includes(raw.id)) {
    animal.uses.push(raw.id);
    animal.lastReviewedAt = TODAY;
  }
}

const penguin = animals.find((a) => a.id === "penguin");
if (penguin) {
  penguin.verdict =
    "Tux, Tencent QQ, Gentoo’s namesake, and Freedo (Linux-libre) keep this ice crowded.";
  penguin.lastReviewedAt = TODAY;
}

fs.writeFileSync(usesPath, JSON.stringify(uses, null, 2) + "\n");
fs.writeFileSync(animalsPath, JSON.stringify(animals, null, 2) + "\n");

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

console.log(
  JSON.stringify(
    {
      animalsAdded,
      usesAdded,
      totalAnimals: animals.length,
      totalUses: uses.length,
    },
    null,
    2,
  ),
);
