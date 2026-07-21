/**
 * CNCF Phippy & Friends + Priority C animals + extra verified uses.
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
const PHIPPY =
  "https://raw.githubusercontent.com/cncf/artwork/master/other/phippy-and-friends";

fs.mkdirSync(outDir, { recursive: true });

/** @type {Array<Record<string, unknown>>} */
const newAnimals = [
  {
    id: "lobster",
    name: "Lobster",
    nameHe: "לובסטר",
    aliases: ["lobster", "לובסטר"],
    emoji: "🦞",
    animalClass: "marine",
    accentColor: "#e7a6ac",
    status: "Cloud-native claws",
    verdict: "Linky the Linkerd lobster brought AUTH'N and AUTH'Z tattoos to the zoo.",
    alternatives: ["crab", "shrimp"],
  },
  {
    id: "macaw",
    name: "Macaw",
    nameHe: "מקאו",
    aliases: ["macaw", "macao", "מקאו"],
    emoji: "🦜",
    animalClass: "birds",
    accentColor: "#9fd5df",
    status: "Supply-chain perch",
    verdict: "Indigo the in-toto macaw guards the nuts — and the provenance tree.",
    alternatives: ["parrot", "toucan"],
  },
  {
    id: "warthog",
    name: "Warthog",
    nameHe: "חזיר יבלות",
    aliases: ["warthog", "חזיר יבלות", "grunt"],
    emoji: "🐗",
    animalClass: "mammals",
    accentColor: "#f28c52",
    status: "Task-runner wallow",
    verdict: "Grunt claimed the warthog logomark for JavaScript build chores.",
    alternatives: ["pig", "boar"],
  },
  {
    id: "squid",
    name: "Squid",
    nameHe: "דיונון",
    aliases: ["squid", "דיונון"],
    emoji: "🦑",
    animalClass: "marine",
    accentColor: "#9fd5df",
    status: "Caching tentacles",
    verdict: "Squid Cache has been proxying the web under cephalopod branding for decades.",
    alternatives: ["octopus", "cuttlefish"],
  },
  {
    id: "pelican",
    name: "Pelican",
    nameHe: "שקנאי",
    aliases: ["pelican", "שקנאי"],
    emoji: "🦢",
    animalClass: "birds",
    accentColor: "#cbea77",
    status: "Static-site bill",
    verdict: "Pelican the static site generator filled its pouch with Python pages.",
    alternatives: ["albatross", "heron"],
  },
  {
    id: "puma",
    name: "Puma",
    nameHe: "פומה",
    aliases: ["puma", "cougar", "פומה"],
    emoji: "🐆",
    animalClass: "mammals",
    accentColor: "#f4cc5d",
    status: "Ruby rack occupied",
    verdict: "The Puma web server sprinted away with this big-cat name.",
    alternatives: ["lynx", "ocelot"],
  },
  {
    id: "condor",
    name: "Condor",
    nameHe: "קונדור",
    aliases: ["condor", "קונדור"],
    emoji: "🦅",
    animalClass: "birds",
    accentColor: "#f4cc5d",
    status: "HPC thermal",
    verdict: "HTCondor soars over high-throughput computing clusters.",
    alternatives: ["eagle", "vulture"],
  },
  {
    id: "kudu",
    name: "Kudu",
    nameHe: "קודו",
    aliases: ["kudu", "קודו"],
    emoji: "🦌",
    animalClass: "mammals",
    accentColor: "#cbea77",
    status: "Columnar savanna",
    verdict: "Apache Kudu took the antelope for fast columnar storage.",
    alternatives: ["impala", "gazelle"],
  },
  {
    id: "impala",
    name: "Impala",
    nameHe: "אימפלה",
    aliases: ["impala", "אימפלה"],
    emoji: "🦌",
    animalClass: "mammals",
    accentColor: "#f28c52",
    status: "SQL grassland",
    verdict: "Apache Impala runs analytic SQL at antelope speed.",
    alternatives: ["kudu", "gazelle"],
  },
  {
    id: "canary",
    name: "Canary",
    nameHe: "קנרית",
    aliases: ["canary", "קנרית"],
    emoji: "🐤",
    animalClass: "birds",
    accentColor: "#f4cc5d",
    status: "Security mine shaft",
    verdict: "Thinkst Canary turned the coal-mine bird into a tripwire for attackers.",
    alternatives: ["finch", "sparrow"],
  },
  {
    id: "crane",
    name: "Crane",
    nameHe: "עגור",
    aliases: ["crane", "עגור"],
    emoji: "🦩",
    animalClass: "birds",
    accentColor: "#9fd5df",
    status: "Registry flight path",
    verdict: "Google's crane CLI moves container images with long-legged precision.",
    alternatives: ["heron", "stork"],
  },
  {
    id: "ocelot",
    name: "Ocelot",
    nameHe: "אוצלוט",
    aliases: ["ocelot", "אוצלוט"],
    emoji: "🐈",
    animalClass: "mammals",
    accentColor: "#e7a6ac",
    status: "Gateway spotted",
    verdict: "Ocelot the .NET API gateway prowls the reverse-proxy trail.",
    alternatives: ["lynx", "puma"],
  },
  {
    id: "chinchilla",
    name: "Chinchilla",
    nameHe: "צ׳ינצ׳ילה",
    aliases: ["chinchilla", "צ'ינצ'ילה", "צ׳ינצ׳ילה"],
    emoji: "🐭",
    animalClass: "mammals",
    accentColor: "#e7a6ac",
    status: "Compute-optimal burrow",
    verdict: "DeepMind named a scaling-law paper after this soft-furred rodent.",
    alternatives: ["mouse", "hamster"],
  },
  {
    id: "vicuna",
    name: "Vicuna",
    nameHe: "ויקוניה",
    aliases: ["vicuna", "vicuña", "ויקוניה"],
    emoji: "🦙",
    animalClass: "mammals",
    accentColor: "#cbea77",
    status: "Chat enclosure",
    verdict: "LMSYS Vicuna is the chatty camelid next to LLaMA in the AI barn.",
    alternatives: ["llama", "alpaca"],
  },
  {
    id: "falcon",
    name: "Falcon",
    nameHe: "בז",
    aliases: ["falcon", "בז"],
    emoji: "🦅",
    animalClass: "birds",
    accentColor: "#f28c52",
    status: "LLM aerie",
    verdict: "TII Falcon LLM stooped on the open-weight bird niche.",
    alternatives: ["eagle", "hawk"],
  },
  {
    id: "ant",
    name: "Ant",
    nameHe: "נמלה",
    aliases: ["ant", "נמלה"],
    emoji: "🐜",
    animalClass: "bugs",
    accentColor: "#f28c52",
    status: "Build colony",
    verdict: "Apache Ant has been hauling Java builds since before Maven was cool.",
    alternatives: ["bee", "termite"],
  },
  {
    id: "firebird",
    name: "Firebird",
    nameHe: "ציפור אש",
    aliases: ["firebird", "ציפור אש"],
    emoji: "🔥",
    animalClass: "birds",
    accentColor: "#f28c52",
    status: "SQL nest occupied",
    verdict: "Firebird SQL kept the mythical bird as a very real relational database.",
    alternatives: ["phoenix", "eagle"],
  },
  {
    id: "bowerbird",
    name: "Bowerbird",
    nameHe: "ציפור קן",
    aliases: ["bowerbird", "bower bird", "ציפור קן"],
    emoji: "🐦",
    animalClass: "birds",
    accentColor: "#cbea77",
    status: "Package nest (legacy)",
    verdict: "Bower named itself after birds that collect shiny front-end packages.",
    alternatives: ["bird", "magpie"],
  },
];

/** @type {Array<Record<string, unknown>>} */
const newUses = [
  // CNCF friends (existing animals)
  {
    id: "zebra-cncf-zee",
    animalId: "zebra",
    organization: "CNCF",
    product: "etcd",
    characterName: "Zee",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "data"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Zee (etcd)",
    file: "cncf-zee.svg",
    imageUrl: `${PHIPPY}/zee_full.svg`,
    alt: "Zee the etcd zebra",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "owl-cncf-captain-kube",
    animalId: "owl",
    organization: "CNCF",
    product: "Kubernetes",
    characterName: "Captain Kube",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["code", "open_source", "apps"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Captain Kube",
    file: "cncf-captain-kube.svg",
    imageUrl: `${PHIPPY}/captain_kube_full.svg`,
    alt: "Captain Kube the Kubernetes owl",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "owl-cncf-owlina",
    animalId: "owl",
    organization: "CNCF",
    product: "OPA",
    characterName: "Owlina",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "tools"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Owlina (OPA)",
    file: "cncf-owlina.svg",
    imageUrl: `${PHIPPY}/owlina_full.svg`,
    alt: "Owlina the OPA owl",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "hedgehog-cncf-hazel",
    animalId: "hedgehog",
    organization: "CNCF",
    product: "Helm",
    characterName: "Hazel",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "tools"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Hazel (Helm)",
    file: "cncf-hazel.svg",
    imageUrl: `${PHIPPY}/hazel_full.svg`,
    alt: "Hazel the Helm hedgehog",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "tiger-cncf-tiago",
    animalId: "tiger",
    organization: "CNCF",
    product: "TiKV",
    characterName: "Tiago",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["data", "open_source"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Tiago (TiKV)",
    file: "cncf-tiago.svg",
    imageUrl: `${PHIPPY}/tiago_full.svg`,
    alt: "Tiago the TiKV tiger",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "elephant-cncf-tai",
    animalId: "elephant",
    organization: "CNCF",
    product: "TUF",
    characterName: "Tai",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "tools"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Tai (TUF)",
    file: "cncf-tai.svg",
    imageUrl: `${PHIPPY}/tai_full.svg`,
    alt: "Tai the TUF elephant",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "bee-cncf-obee",
    animalId: "bee",
    organization: "CNCF",
    product: "Cilium",
    characterName: "Obee",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "apps"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Obee (Cilium)",
    file: "cncf-obee.svg",
    imageUrl: `${PHIPPY}/obee_full.svg`,
    alt: "Obee the Cilium bee",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "dolphin-cncf-izzy",
    animalId: "dolphin",
    organization: "CNCF",
    product: "Istio",
    characterName: "Izzy",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "apps"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Izzy (Istio)",
    file: "cncf-izzy.svg",
    imageUrl: `${PHIPPY}/izzy_full.svg`,
    alt: "Izzy the Istio dolphin",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "bear-cncf-keddy",
    animalId: "bear",
    organization: "CNCF",
    product: "KEDA",
    characterName: "Keddy",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "apps"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Keddy (KEDA)",
    file: "cncf-keddy.svg",
    imageUrl: `${PHIPPY}/keddy_full.svg`,
    alt: "Keddy the KEDA Kodiak bear",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "hummingbird-cncf-bitzy",
    animalId: "hummingbird",
    organization: "CNCF",
    product: "Fluent Bit",
    characterName: "Bitzy",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "data"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Bitzy (Fluent Bit)",
    file: "cncf-bitzy.svg",
    imageUrl: `${PHIPPY}/bitzy_full.svg`,
    alt: "Bitzy the Fluent Bit hummingbird",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "duck-cncf-kuack",
    animalId: "duck",
    organization: "CNCF",
    product: "Knative",
    characterName: "Kuack",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "apps"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Kuack (Knative)",
    file: "cncf-kuack.svg",
    imageUrl: `${PHIPPY}/kuack_full.svg`,
    alt: "Kuack the Knative duck",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "gopher-cncf-goldie",
    animalId: "gopher",
    organization: "CNCF",
    product: "Go",
    characterName: "Goldie",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Goldie (Go)",
    file: "cncf-goldie.svg",
    imageUrl: `${PHIPPY}/goldie_full.svg`,
    alt: "Goldie the Go gopher",
    attribution:
      "CNCF Phippy & Friends; Goldie based on the Go Gopher by Renee French (CC-BY). Attribution: phippy.io",
  },
  {
    id: "turtle-cncf-cappy",
    animalId: "turtle",
    organization: "CNCF",
    product: "Cluster API",
    characterName: "Cappy",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "apps"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Cappy (Cluster API)",
    file: "cncf-cappy.svg",
    imageUrl: `${PHIPPY}/cappy_full.svg`,
    alt: "Cappy the Cluster API turtle",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  // CNCF friends needing new animals
  {
    id: "lobster-cncf-linky",
    animalId: "lobster",
    organization: "CNCF",
    product: "Linkerd",
    characterName: "Linky",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "apps"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Linky (Linkerd)",
    file: "cncf-linky.svg",
    imageUrl: `${PHIPPY}/linky_full.svg`,
    alt: "Linky the Linkerd lobster",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  {
    id: "macaw-cncf-indigo",
    animalId: "macaw",
    organization: "CNCF",
    product: "in-toto",
    characterName: "Indigo",
    relationshipType: "official_mascot",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "open_source", "tools"],
    sourceUrl: "https://www.cncf.io/phippy/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "CNCF · Indigo (in-toto)",
    file: "cncf-indigo.svg",
    imageUrl: `${PHIPPY}/indigo_full.svg`,
    alt: "Indigo the in-toto macaw",
    attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
  },
  // Fill empty + Priority C brands
  {
    id: "jackal-clearpath",
    animalId: "jackal",
    organization: "Clearpath Robotics",
    product: "Jackal UGV",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools", "apps"],
    sourceUrl:
      "https://clearpathrobotics.com/jackal-small-unmanned-ground-vehicle/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Clearpath · Jackal",
    file: null,
    imageUrl: null,
    alt: "Clearpath Jackal UGV",
    attribution: "Clearpath Jackal product name (animal in brand).",
  },
  {
    id: "squirrel-squirrelmail",
    animalId: "squirrel",
    organization: "SquirrelMail",
    product: "SquirrelMail",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "niche",
    techHabitats: ["apps", "web", "open_source"],
    sourceUrl: "https://squirrelmail.org/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "SquirrelMail",
    file: null,
    imageUrl: null,
    alt: "SquirrelMail",
    attribution: "SquirrelMail project name (animal in brand).",
  },
  {
    id: "warthog-grunt",
    animalId: "warthog",
    organization: "Grunt",
    product: "Grunt",
    relationshipType: "animal_logo",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "tools", "open_source"],
    sourceUrl:
      "https://raw.githubusercontent.com/gruntjs/grunt-docs/main/Grunt-Brand-Guide.md",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Grunt",
    file: "grunt.svg",
    imageUrl: "https://cdn.simpleicons.org/grunt",
    alt: "Grunt warthog brand mark",
    attribution: "Grunt brand mark via Simple Icons (brand color).",
  },
  {
    id: "squid-squid-cache",
    animalId: "squid",
    organization: "Squid Cache",
    product: "Squid",
    relationshipType: "animal_logo",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["apps", "tools", "open_source"],
    sourceUrl: "https://www.squid-cache.org/Artwork/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Squid Cache",
    file: "squid-cache.png",
    imageUrl: "https://www.squid-cache.org/Artwork/SN.png",
    alt: "Squid Cache artwork",
    attribution: "Official Squid Cache artwork from squid-cache.org.",
  },
  {
    id: "pelican-pelican-ssg",
    animalId: "pelican",
    organization: "Pelican",
    product: "Pelican",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "web", "open_source"],
    sourceUrl: "https://docs.getpelican.com/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Pelican",
    file: "pelican.svg",
    imageUrl: "https://cdn.simpleicons.org/pelican",
    alt: "Pelican brand mark",
    attribution: "Pelican brand mark via Simple Icons (brand color).",
  },
  {
    id: "puma-puma-server",
    animalId: "puma",
    organization: "Puma",
    product: "Puma",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "apps", "open_source"],
    sourceUrl: "https://github.com/puma/puma",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Puma",
    file: "puma.png",
    imageUrl: "https://avatars.githubusercontent.com/u/2054809?s=200&v=4",
    alt: "Puma web server",
    attribution: "Puma organization avatar on GitHub.",
  },
  {
    id: "condor-htcondor",
    animalId: "condor",
    organization: "HTCondor",
    product: "HTCondor",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools", "open_source", "data"],
    sourceUrl: "https://htcondor.org/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "HTCondor",
    file: null,
    imageUrl: null,
    alt: "HTCondor",
    attribution: "HTCondor project name (animal in brand).",
  },
  {
    id: "kudu-apache-kudu",
    animalId: "kudu",
    organization: "Apache Software Foundation",
    product: "Apache Kudu",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["data", "open_source"],
    sourceUrl: "https://kudu.apache.org/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Apache Kudu",
    file: "apache-kudu.svg",
    imageUrl: "https://cdn.simpleicons.org/apache",
    alt: "Apache mark for Kudu",
    attribution: "Apache brand mark via Simple Icons (brand color).",
  },
  {
    id: "impala-apache-impala",
    animalId: "impala",
    organization: "Apache Software Foundation",
    product: "Apache Impala",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["data", "open_source"],
    sourceUrl: "https://impala.apache.org/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Apache Impala",
    file: "apache-impala.svg",
    imageUrl: "https://cdn.simpleicons.org/apache",
    alt: "Apache mark for Impala",
    attribution: "Apache brand mark via Simple Icons (brand color).",
  },
  {
    id: "canary-thinkst",
    animalId: "canary",
    organization: "Thinkst",
    product: "Canary",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools", "apps"],
    sourceUrl: "https://canary.tools/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Thinkst Canary",
    file: null,
    imageUrl: null,
    alt: "Thinkst Canary",
    attribution: "Thinkst Canary product name (animal in brand).",
  },
  {
    id: "crane-go-containerregistry",
    animalId: "crane",
    organization: "Google",
    product: "crane",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["tools", "code", "open_source"],
    sourceUrl: "https://github.com/google/go-containerregistry",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "crane",
    file: "crane.png",
    imageUrl: "https://avatars.githubusercontent.com/u/1342004?s=200&v=4",
    alt: "crane container tool",
    attribution: "Google organization avatar used for crane CLI.",
  },
  {
    id: "ocelot-threemammals",
    animalId: "ocelot",
    organization: "ThreeMammals",
    product: "Ocelot",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["apps", "code", "open_source"],
    sourceUrl: "https://github.com/ThreeMammals/Ocelot",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Ocelot",
    file: "ocelot.png",
    imageUrl: "https://avatars.githubusercontent.com/u/17142558?s=200&v=4",
    alt: "Ocelot API gateway",
    attribution: "ThreeMammals / Ocelot organization avatar on GitHub.",
  },
  {
    id: "chinchilla-deepmind",
    animalId: "chinchilla",
    organization: "Google DeepMind",
    product: "Chinchilla",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["code", "data"],
    sourceUrl:
      "https://deepmind.google/blog/an-empirical-analysis-of-compute-optimal-large-language-model-training/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "DeepMind · Chinchilla",
    file: "deepmind.svg",
    imageUrl: "https://cdn.simpleicons.org/google",
    alt: "Google mark for DeepMind Chinchilla",
    attribution: "Google brand mark via Simple Icons (brand color).",
  },
  {
    id: "vicuna-lmsys",
    animalId: "vicuna",
    organization: "LMSYS",
    product: "Vicuna",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["code", "open_source"],
    sourceUrl: "https://lmsys.org/blog/2023-03-30-vicuna/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "LMSYS · Vicuna",
    file: null,
    imageUrl: null,
    alt: "LMSYS Vicuna",
    attribution: "LMSYS Vicuna model name (animal in brand).",
  },
  {
    id: "falcon-tii",
    animalId: "falcon",
    organization: "Technology Innovation Institute",
    product: "Falcon LLM",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["code", "open_source"],
    sourceUrl: "https://falconllm.tii.ae/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "TII · Falcon",
    file: null,
    imageUrl: null,
    alt: "TII Falcon LLM",
    attribution: "TII Falcon LLM product name (animal in brand).",
  },
  {
    id: "ant-apache-ant",
    animalId: "ant",
    organization: "Apache Software Foundation",
    product: "Apache Ant",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["tools", "code", "open_source"],
    sourceUrl: "https://ant.apache.org/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Apache Ant",
    file: "apache-ant.svg",
    imageUrl: "https://cdn.simpleicons.org/apacheant",
    alt: "Apache Ant brand mark",
    attribution: "Apache Ant brand mark via Simple Icons (brand color).",
  },
  {
    id: "firebird-firebirdsql",
    animalId: "firebird",
    organization: "Firebird Project",
    product: "Firebird",
    relationshipType: "animal_logo",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong_niche",
    techHabitats: ["data", "open_source"],
    sourceUrl: "https://firebirdsql.org/en/logos/",
    sourceType: "official",
    verificationStatus: "verified",
    displayLabel: "Firebird SQL",
    file: "firebird.svg",
    imageUrl: "https://cdn.simpleicons.org/firebird",
    alt: "Firebird SQL brand mark",
    attribution: "Firebird brand mark via Simple Icons (brand color).",
  },
  {
    id: "bowerbird-bower",
    animalId: "bowerbird",
    organization: "Bower",
    product: "Bower",
    relationshipType: "animal_name",
    officialStatus: "official",
    activeStatus: "inactive",
    recognition: "niche",
    techHabitats: ["code", "tools", "open_source"],
    sourceUrl: "https://bower.io/docs/about/",
    sourceType: "official",
    verificationStatus: "historical_verified",
    displayLabel: "Bower",
    file: "bower.svg",
    imageUrl: "https://cdn.simpleicons.org/bower",
    alt: "Bower brand mark",
    attribution: "Bower brand mark via Simple Icons (brand color).",
  },
];

const animalMeta = {
  turtle: {
    status: "Cloud-native shell",
    verdict: "Cappy the Cluster API turtle moved into this previously empty pond.",
    reviewStatus: "verified",
  },
  jackal: {
    status: "UGV den occupied",
    verdict: "Clearpath Robotics named a rugged unmanned ground vehicle Jackal.",
    reviewStatus: "verified",
  },
  zebra: {
    status: "etcd stripes",
    verdict: "Zee the etcd zebra interned at the Kubernetes zoo and never left.",
    reviewStatus: "verified",
  },
  hedgehog: {
    status: "Helm burrow crowded",
    verdict: "Hazel the Helm hedgehog rolled into this enclosure with chart in paw.",
    reviewStatus: "verified",
  },
};

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
    console.warn(`FAIL ${url}: ${err.message}`);
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
    const ok = await download(raw.imageUrl, dest);
    if (ok) {
      image = {
        src: `/mascots/${raw.file}`,
        remoteSrc: raw.imageUrl,
        alt: raw.alt,
        attribution: raw.attribution,
      };
    }
  }

  // DeepMind icon fallback
  if (raw.id === "chinchilla-deepmind" && !image.src) {
    const alts = [
      ["deepmind.svg", "https://cdn.simpleicons.org/google"],
      ["deepmind.png", "https://avatars.githubusercontent.com/u/85945661?s=200&v=4"],
    ];
    for (const [file, url] of alts) {
      if (await download(url, path.join(outDir, file))) {
        image = {
          src: `/mascots/${file}`,
          remoteSrc: url,
          alt: raw.alt,
          attribution: "Google / DeepMind mark for Chinchilla paper naming.",
        };
        break;
      }
    }
  }

  // Pelican fallback
  if (raw.id === "pelican-pelican-ssg" && !image.src) {
    const url = "https://avatars.githubusercontent.com/u/3482183?s=200&v=4";
    if (await download(url, path.join(outDir, "pelican.png"))) {
      image = {
        src: "/mascots/pelican.png",
        remoteSrc: url,
        alt: raw.alt,
        attribution: "Pelican project avatar on GitHub.",
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
    const meta = animalMeta[raw.animalId];
    if (meta) {
      animal.status = meta.status;
      animal.verdict = meta.verdict;
      animal.reviewStatus = meta.reviewStatus;
    }
  }
}

// Upgrade Phippy art from CNCF wordmark to character
const phippy = uses.find((u) => u.id === "giraffe-cncf-phippy");
if (phippy) {
  const file = "cncf-phippy.svg";
  const url = `${PHIPPY}/phippy_full.svg`;
  if (await download(url, path.join(outDir, file))) {
    phippy.image = {
      src: `/mascots/${file}`,
      remoteSrc: url,
      alt: "Phippy the PHP giraffe",
      attribution: "CNCF Phippy & Friends (CC-BY). Attribution: phippy.io",
    };
  }
}

// Elephant verdict refresh
const elephant = animals.find((a) => a.id === "elephant");
if (elephant) {
  elephant.verdict =
    "PostgreSQL, PHP, Hadoop, Evernote, Salesforce Ruth, Gradlephant, and CNCF Tai share this enclosure.";
  elephant.lastReviewedAt = TODAY;
}

const owl = animals.find((a) => a.id === "owl");
if (owl) {
  owl.verdict =
    "Duolingo, Hootsuite, TripAdvisor, Captain Kube, and Owlina keep the wise branch overcrowded.";
  owl.lastReviewedAt = TODAY;
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

const empty = animals.filter((a) => a.uses.length === 0).length;
console.log(
  JSON.stringify(
    {
      animalsAdded,
      usesAdded,
      totalAnimals: animals.length,
      totalUses: uses.length,
      emptyAnimals: empty,
      withLocal: uses.filter((u) => u.image?.src).length,
    },
    null,
    2,
  ),
);
