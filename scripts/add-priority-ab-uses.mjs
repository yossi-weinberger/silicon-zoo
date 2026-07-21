/**
 * Priority A+B catalog expansion from discovery research.
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

fs.mkdirSync(outDir, { recursive: true });

/** @type {Array<Record<string, unknown>>} */
const newUses = [
  // Priority A — fill empty animals
  {
    id: "bat-sharkdp-bat",
    animalId: "bat",
    organization: "bat",
    product: "bat",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "tools"],
    sourceUrl: "https://github.com/sharkdp/bat",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "bat",
    file: null,
    imageUrl: null,
    alt: "bat CLI",
    attribution: "bat project name (cat clone with wings).",
  },
  {
    id: "frog-jfrog",
    animalId: "frog",
    organization: "JFrog",
    product: "JFrog",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["tools", "apps"],
    sourceUrl: "https://jfrog.com/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "JFrog",
    file: "jfrog.svg",
    imageUrl: "https://cdn.simpleicons.org/jfrog",
    alt: "JFrog brand mark",
    attribution: "JFrog brand mark via Simple Icons (brand color).",
  },
  {
    id: "wolf-arctic-wolf",
    animalId: "wolf",
    organization: "Arctic Wolf",
    product: "Arctic Wolf",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools"],
    sourceUrl: "https://arcticwolf.com/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Arctic Wolf",
    file: "arctic-wolf.svg",
    imageUrl: null,
    alt: "Arctic Wolf",
    attribution: "Arctic Wolf company name (animal in brand).",
  },
  {
    id: "raven-ravendb",
    animalId: "raven",
    organization: "RavenDB",
    product: "RavenDB",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["data", "open_source"],
    sourceUrl: "https://ravendb.net/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "RavenDB",
    file: "ravendb.svg",
    imageUrl: "https://cdn.simpleicons.org/ravendb",
    alt: "RavenDB brand mark",
    attribution: "RavenDB brand mark via Simple Icons (brand color).",
  },
  {
    id: "ferret-ferretdb",
    animalId: "ferret",
    organization: "FerretDB",
    product: "FerretDB",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["data", "open_source"],
    sourceUrl: "https://www.ferretdb.com/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "FerretDB",
    file: "ferretdb.svg",
    imageUrl: null,
    alt: "FerretDB",
    attribution: "FerretDB project name (animal in brand).",
  },
  {
    id: "bison-gnu-bison",
    animalId: "bison",
    organization: "GNU Project",
    product: "GNU Bison",
    characterName: "Bison",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source"],
    sourceUrl: "https://www.gnu.org/software/bison/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "GNU · Bison",
    file: "gnu.svg",
    imageUrl: "https://cdn.simpleicons.org/gnu",
    reuseExisting: true,
    alt: "GNU brand mark for Bison",
    attribution: "GNU brand mark via Simple Icons (brand color).",
  },
  {
    id: "gazelle-bazel-gazelle",
    animalId: "gazelle",
    organization: "Bazel Gazelle",
    product: "Gazelle",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "niche",
    techHabitats: ["code", "open_source", "tools"],
    sourceUrl: "https://github.com/bazelbuild/bazel-gazelle",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Bazel · Gazelle",
    file: "bazel.svg",
    imageUrl: "https://cdn.simpleicons.org/bazel",
    alt: "Bazel brand mark for Gazelle",
    attribution: "Bazel brand mark via Simple Icons (brand color).",
  },
  {
    id: "ibex-lowrisc-ibex",
    animalId: "ibex",
    organization: "lowRISC",
    product: "Ibex",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "niche",
    techHabitats: ["code", "open_source"],
    sourceUrl: "https://lowrisc.org/ibex/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "lowRISC · Ibex",
    file: null,
    imageUrl: null,
    alt: "Ibex RISC-V core",
    attribution: "Ibex CPU core name (animal in product name).",
  },
  {
    id: "mantis-mantisbt",
    animalId: "mantis",
    organization: "MantisBT",
    product: "Mantis Bug Tracker",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools", "open_source"],
    sourceUrl: "https://mantisbt.org/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "MantisBT",
    file: "mantisbt.png",
    imageUrl: "https://mantisbt.org/bugs/images/mantis_logo.png",
    alt: "MantisBT logo",
    attribution: "MantisBT logo from mantisbt.org.",
  },
  {
    id: "lynx-lynx-browser",
    animalId: "lynx",
    organization: "Lynx",
    product: "Lynx",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools", "open_source", "web"],
    sourceUrl: "https://lynx.invisible-island.net/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Lynx",
    file: null,
    imageUrl: null,
    alt: "Lynx text web browser",
    attribution: "Lynx browser name (animal in product name).",
  },
  {
    id: "eagle-eagle-eye-networks",
    animalId: "eagle",
    organization: "Eagle Eye Networks",
    product: "Eagle Eye Networks",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools", "apps"],
    sourceUrl: "https://www.een.com/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Eagle Eye Networks",
    file: null,
    imageUrl: null,
    alt: "Eagle Eye Networks",
    attribution: "Eagle Eye Networks company name (animal in brand).",
  },
  {
    id: "walrus-walrus",
    animalId: "walrus",
    organization: "Walrus",
    product: "Walrus",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "niche",
    techHabitats: ["data", "open_source"],
    sourceUrl: "https://www.walrus.xyz/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Walrus",
    file: null,
    imageUrl: null,
    alt: "Walrus protocol",
    attribution: "Walrus protocol name (animal in brand).",
  },

  // Priority B — add to existing animals
  {
    id: "rabbit-rabbitmq",
    animalId: "rabbit",
    organization: "RabbitMQ",
    product: "RabbitMQ",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["data", "open_source", "tools"],
    sourceUrl: "https://www.rabbitmq.com/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "RabbitMQ",
    file: "rabbitmq.svg",
    imageUrl: "https://cdn.simpleicons.org/rabbitmq",
    alt: "RabbitMQ brand mark",
    attribution: "RabbitMQ brand mark via Simple Icons (brand color).",
  },
  {
    id: "elephant-gradle-gradlephant",
    animalId: "elephant",
    organization: "Gradle",
    product: "Gradle Build Tool",
    characterName: "Gradlephant",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["code", "tools", "open_source"],
    sourceUrl: "https://gradle.com/brand/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Gradle · Gradlephant",
    file: "gradle.svg",
    imageUrl: "https://cdn.simpleicons.org/gradle",
    alt: "Gradle brand mark for Gradlephant",
    attribution: "Gradle brand mark via Simple Icons (brand color).",
  },
  {
    id: "shark-wireshark",
    animalId: "shark",
    organization: "Wireshark",
    product: "Wireshark",
    relationshipType: "animal_logo",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["tools", "open_source"],
    sourceUrl: "https://www.wireshark.org/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Wireshark",
    file: "wireshark.svg",
    imageUrl: "https://cdn.simpleicons.org/wireshark",
    alt: "Wireshark fin logo",
    attribution: "Wireshark brand mark via Simple Icons (brand color).",
  },
  {
    id: "cat-apache-tomcat",
    animalId: "cat",
    organization: "Apache Tomcat",
    product: "Apache Tomcat",
    relationshipType: "animal_logo",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["code", "open_source", "web"],
    sourceUrl: "https://tomcat.apache.org/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Apache Tomcat",
    file: "tomcat.svg",
    imageUrl: "https://cdn.simpleicons.org/apachetomcat",
    alt: "Apache Tomcat logo",
    attribution: "Apache Tomcat brand mark via Simple Icons (brand color).",
  },
  {
    id: "cat-yarn-kitten",
    animalId: "cat",
    organization: "Yarn",
    product: "Yarn",
    characterName: "Yarn kitten",
    relationshipType: "animal_logo",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source"],
    sourceUrl: "https://github.com/yarnpkg/assets",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Yarn · kitten",
    file: "yarn-kitten.svg",
    imageUrl:
      "https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten.svg",
    alt: "Yarn kitten logo",
    attribution: "Official Yarn kitten artwork from yarnpkg/assets.",
  },
  {
    id: "cat-kitty-terminal",
    animalId: "cat",
    organization: "kitty",
    product: "kitty",
    relationshipType: "animal_logo",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools", "open_source"],
    sourceUrl: "https://sw.kovidgoyal.net/kitty/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "kitty",
    file: "kitty.svg",
    imageUrl: "https://cdn.simpleicons.org/kitty",
    alt: "kitty terminal logo",
    attribution: "kitty brand mark via Simple Icons (brand color).",
  },
  {
    id: "fish-fish-shell",
    animalId: "fish",
    organization: "fish",
    product: "fish shell",
    relationshipType: "animal_logo",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools", "open_source", "code"],
    sourceUrl: "https://fishshell.com/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "fish shell",
    file: "fishshell.svg",
    imageUrl: "https://cdn.simpleicons.org/fishshell",
    alt: "fish shell logo",
    attribution: "fish shell brand mark via Simple Icons (brand color).",
  },
  {
    id: "camel-apache-camel",
    animalId: "camel",
    organization: "Apache Camel",
    product: "Apache Camel",
    relationshipType: "animal_logo",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "data", "open_source"],
    sourceUrl: "https://camel.apache.org/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Apache Camel",
    file: "apachecamel.svg",
    imageUrl: "https://cdn.simpleicons.org/apachecamel",
    alt: "Apache Camel logo",
    attribution: "Apache Camel brand mark via Simple Icons (brand color).",
  },
  {
    id: "octopus-ceph",
    animalId: "octopus",
    organization: "Ceph",
    product: "Ceph",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["data", "open_source"],
    sourceUrl: "https://ceph.io/en/news/blog/2011/cephalopods/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Ceph",
    file: "ceph.svg",
    imageUrl: "https://cdn.simpleicons.org/ceph",
    alt: "Ceph brand mark",
    attribution: "Ceph brand mark via Simple Icons (brand color).",
  },
];

const animalMeta = {
  bat: {
    status: "CLI with wings",
    verdict:
      "sharkdp/bat claims the night shift: a cat clone with wings, and the name to match.",
    reviewStatus: "verified",
  },
  frog: {
    status: "DevOps pond claimed",
    verdict:
      "JFrog hopped into this enclosure with an animal brand name and a large software supply-chain footprint.",
    reviewStatus: "verified",
  },
  wolf: {
    status: "Security pack present",
    verdict:
      "Arctic Wolf runs security operations under a clear animal brand name.",
    reviewStatus: "verified",
  },
  raven: {
    status: "Database roost occupied",
    verdict: "RavenDB nested here with an animal-named document database.",
    reviewStatus: "verified",
  },
  ferret: {
    status: "Investigating Mongo wires",
    verdict: "FerretDB took the name and the open-source MongoDB-compatible niche.",
    reviewStatus: "verified",
  },
  bison: {
    status: "Parser prairie claimed",
    verdict: "GNU Bison has been chewing through grammars since before npm existed.",
    reviewStatus: "verified",
  },
  gazelle: {
    status: "Build files, fast",
    verdict: "Bazel Gazelle generates BUILD files and owns this antelope-adjacent lane.",
    reviewStatus: "verified",
  },
  ibex: {
    status: "RISC-V summit taken",
    verdict: "lowRISC Ibex is a small RISC-V core with a sure-footed animal name.",
    reviewStatus: "verified",
  },
  mantis: {
    status: "Bug tracker present",
    verdict: "MantisBT has been patiently waiting in code review since the early web.",
    reviewStatus: "verified",
  },
  lynx: {
    status: "Text-mode browser claimed",
    verdict: "Lynx still prowls terminals as the classic text web browser.",
    reviewStatus: "verified",
  },
  eagle: {
    status: "Surveillance nest occupied",
    verdict: "Eagle Eye Networks took the aerial brand for cloud video security.",
    reviewStatus: "verified",
  },
  walrus: {
    status: "Storage floe claimed",
    verdict: "Walrus parked decentralized storage under a distinguished animal name.",
    reviewStatus: "verified",
  },
  rabbit: {
    status: "Messaging warren busy",
    verdict:
      "Plan 9's Glenda shares the warren with RabbitMQ — still no invented runtime rabbits.",
    reviewStatus: "verified",
  },
  cat: {
    status: "The internet chose this one",
    verdict:
      "Scratch, Octocat, Tomcat, Yarn's official kitten, and kitty terminal keep this enclosure loud.",
    reviewStatus: "verified",
  },
};

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 40) return true;
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
}

const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));
const animals = JSON.parse(fs.readFileSync(animalsPath, "utf8"));
const existingIds = new Set(uses.map((u) => u.id));

let added = 0;
for (const raw of newUses) {
  if (existingIds.has(raw.id)) {
    console.warn(`skip existing ${raw.id}`);
    continue;
  }

  let image = null;
  if (raw.file && raw.imageUrl && !raw.skipBadIcon) {
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
    } else {
      image = {
        src: null,
        remoteSrc: raw.imageUrl,
        alt: raw.alt,
        attribution: raw.attribution,
      };
    }
  } else if (raw.file && raw.reuseExisting && fs.existsSync(path.join(outDir, raw.file))) {
    image = {
      src: `/mascots/${raw.file}`,
      remoteSrc: raw.imageUrl,
      alt: raw.alt,
      attribution: raw.attribution,
    };
  } else {
    image = {
      src: null,
      remoteSrc: null,
      alt: raw.alt,
      attribution: raw.attribution,
    };
  }

  // bat: try a better icon from GitHub social or simple-icons bat if exists
  if (raw.id === "bat-sharkdp-bat") {
    const candidates = [
      "https://cdn.simpleicons.org/gnometerminal",
      "https://raw.githubusercontent.com/sharkdp/bat/master/assets/logo.png",
      "https://avatars.githubusercontent.com/u/20293046?s=200&v=4",
    ];
    for (const url of candidates) {
      const dest = path.join(outDir, "bat.png");
      if (await download(url, dest)) {
        image = {
          src: "/mascots/bat.png",
          remoteSrc: url,
          alt: "bat CLI",
          attribution: "bat project visual from GitHub/assets.",
        };
        break;
      }
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
    verifiedAt: "2026-07-21",
    displayLabel: raw.displayLabel,
    image,
  });
  existingIds.add(raw.id);
  added++;

  const animal = animals.find((a) => a.id === raw.animalId);
  if (animal && !animal.uses.includes(raw.id)) {
    animal.uses.push(raw.id);
    animal.lastReviewedAt = "2026-07-21";
    const meta = animalMeta[raw.animalId];
    if (meta) {
      animal.status = meta.status;
      animal.verdict = meta.verdict;
      animal.reviewStatus = meta.reviewStatus;
    }
  }
}

// yarn kitten alt URL if first failed
const yarn = uses.find((u) => u.id === "cat-yarn-kitten");
if (yarn && !yarn.image?.src) {
  const alts = [
    "https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-full.svg",
    "https://cdn.simpleicons.org/yarn",
  ];
  for (const url of alts) {
    const file = url.includes("simpleicons") ? "yarn.svg" : "yarn-kitten.svg";
    if (await download(url, path.join(outDir, file))) {
      yarn.image = {
        src: `/mascots/${file}`,
        remoteSrc: url,
        alt: "Yarn kitten / brand mark",
        attribution: "Yarn artwork from yarnpkg/assets or Simple Icons.",
      };
      break;
    }
  }
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
      added,
      totalUses: uses.length,
      withLocal: uses.filter((u) => u.image?.src).length,
    },
    null,
    2,
  ),
);
