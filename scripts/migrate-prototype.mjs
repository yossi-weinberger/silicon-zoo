/**
 * One-shot migration from silicon-zoo.html seed data into normalized JSON.
 * // ponytail: re-run only when the prototype HTML changes
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "silicon-zoo.html"), "utf8");

function extractArray(source, name) {
  const start = source.indexOf(`const ${name} =`);
  if (start < 0) throw new Error(`Missing ${name}`);
  const after = source.slice(start);
  const bracket = after.indexOf("[");
  let depth = 0;
  let end = -1;
  for (let i = bracket; i < after.length; i++) {
    if (after[i] === "[") depth++;
    if (after[i] === "]") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return vm.runInNewContext(after.slice(bracket, end));
}

function extractObject(source, name) {
  const start = source.indexOf(`const ${name}=`);
  if (start < 0) throw new Error(`Missing ${name}`);
  const after = source.slice(start);
  const brace = after.indexOf("{");
  let depth = 0;
  let end = -1;
  for (let i = brace; i < after.length; i++) {
    if (after[i] === "{") depth++;
    if (after[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return vm.runInNewContext(`(${after.slice(brace, end)})`);
}

const birds = new Set([
  "penguin", "owl", "duck", "puffin", "pigeon", "parrot", "hummingbird",
  "flamingo", "kiwi", "woodpecker", "thunderbird", "eagle", "raven",
]);
const marine = new Set([
  "whale", "dolphin", "crab", "pufferfish", "seal", "shark", "octopus",
  "orca", "narwhal", "fish", "cuttlefish", "walrus",
]);
const reptiles = new Set([
  "chameleon", "dinosaur", "axolotl", "frog", "turtle", "dragon", "iguana",
]);
const bugs = new Set([
  "cockroach", "bee", "mantis", "beetle", "butterfly", "firefly", "ladybug",
]);

function animalClass(id) {
  if (birds.has(id)) return "birds";
  if (marine.has(id)) return "marine";
  if (reptiles.has(id)) return "reptiles";
  if (bugs.has(id)) return "bugs";
  return "mammals";
}

function techHabitats(brandLine) {
  const s = brandLine.toLowerCase();
  if (/postgres|mysql|database|hadoop|dbeaver|cockroach|mariadb|terminus/.test(s)) {
    return ["data"];
  }
  if (/linux|rust|go ·|php|python|kotlin|deno|suse|gnu|v ·|zig|raku|perl|pony|kde|xfce|kate|gentoo|freedos|parrot os|libreboot|npm|bun|plan 9|darwin|flutter|dart/.test(s)) {
    return ["code", "open_source"];
  }
  if (/duolingo|hootsuite|tripadvisor|evernote|duckduckgo|firefox|brave|mailchimp|survey|otter|pandadoc|mastodon|thunderbird|prestashop|adium|scratch/.test(s)) {
    return ["apps", "web"];
  }
  return ["tools"];
}

const RELATIONSHIP_HINTS = {
  "Linux · Tux": "official_mascot",
  "Go · The Go Gopher": "official_mascot",
  "Docker · Moby Dock": "official_mascot",
  "GitHub · Mona the Octocat": "hybrid_or_mythical",
  "GitHub · Octocat": "hybrid_or_mythical",
  "PostgreSQL · Slonik": "animal_logo",
  "PHP · elePHPant": "official_mascot",
  "MySQL · Sakila": "official_mascot",
  "Rust · Ferris": "community_mascot",
  "Duolingo · Duo": "official_mascot",
  "Mozilla Firefox": "animal_logo",
  "Python": "animal_logo",
  "CockroachDB": "animal_name",
  "Redpanda": "animal_name",
  "Otter.ai": "animal_name",
  "PostHog": "animal_name",
  "Deno": "animal_name",
  "Mastodon": "animal_name",
  "Meta · Llama": "animal_name",
  "GNU Project": "animal_logo",
  "Mozilla Thunderbird": "hybrid_or_mythical",
  "KDE · Konqi": "hybrid_or_mythical",
  "macOS Tiger · historical": "historical",
  "Mozilla · historical": "historical",
  "eMule": "historical",
  "eDonkey · historical": "historical",
  "SurveyMonkey": "animal_name",
  "Mailchimp · Freddie": "official_mascot",
  "Datadog · Bits": "official_mascot",
  "DigitalOcean · Sammy": "official_mascot",
  "Brave Browser": "animal_logo",
  "SUSE · Geeko": "official_mascot",
  "Dart / Flutter · Dash": "official_mascot",
  "Apache Hadoop": "animal_name",
  "Apache Hive": "animal_name",
  "Apache Pig": "animal_name",
  "Apache Beam · Firefly": "official_mascot",
  "PandaDoc": "animal_name",
  "Parrot OS": "animal_name",
  "MariaDB": "animal_logo",
  "Rhinoceros 3D": "animal_name",
  "Gorilla Logic": "animal_name",
  "npm · Wombat": "community_mascot",
  "V · Veasel": "official_mascot",
  "Raku · Camelia": "official_mascot",
  "PeerTube · Sepia": "official_mascot",
  "CNCF · Phippy": "official_mascot",
  "Salesforce · Astro": "official_mascot",
  "Salesforce · Ruth": "official_mascot",
  "Salesforce · Hootie": "official_mascot",
  "Salesforce · Brandy": "official_mascot",
  "Salesforce · Flo": "official_mascot",
  "Salesforce · Zig": "official_mascot",
  "Salesforce · Codey": "official_mascot",
  "Salesforce · Cloudy": "official_mascot",
  "Salesforce · Blaze": "official_mascot",
  "Hootsuite · Owly": "official_mascot",
  "PrestaShop · Preston": "official_mascot",
  "OpenBSD · Puffy": "official_mascot",
  "Plan 9 · Glenda": "official_mascot",
  "Blender · Suzanne": "community_mascot",
  "Kotlin · Kodi": "official_mascot",
  "Libreboot · Canteloupe": "animal_logo",
  "SerenityOS · Buggie": "official_mascot",
  "Bugzilla · Buggie": "official_mascot",
  "FreeDOS · Blinky": "official_mascot",
  "Darwin · Hexley": "official_mascot",
  "Pony programming language": "animal_name",
  "Kate · Cyber Woodpecker": "official_mascot",
  "Gentoo · Larry the Cow": "community_mascot",
  "TerminusDB · CowDuck": "hybrid_or_mythical",
  "Xfce Mouse": "animal_logo",
  "Zig · Ziguanas": "community_mascot",
  "Pidgin · Purple Pidgin": "official_mascot",
  "Adium · Adiumy": "official_mascot",
  "Krita · Kiki": "official_mascot",
  "Apache Flink": "animal_logo",
  "DBeaver": "animal_name",
  "Bun": "animal_name",
  "Perl": "animal_logo",
  "DuckDuckGo": "animal_name",
  "Scratch Cat": "official_mascot",
  "GitLab-ish": "animal_logo",
  "Tripadvisor": "animal_logo",
  "Evernote": "animal_logo",
  "Tencent QQ": "official_mascot",
  "Liongard": "animal_name",
  "Zebra Technologies": "animal_name",
};

function slugifyBrand(brand) {
  return brand
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseBrand(brand) {
  const [orgPart, characterPart] = brand.split(" · ").map((s) => s.trim());
  return {
    organization: orgPart,
    characterName: characterPart || undefined,
    product: characterPart ? undefined : orgPart,
  };
}

function guessRelationship(brand) {
  if (RELATIONSHIP_HINTS[brand]) return RELATIONSHIP_HINTS[brand];
  if (/historical/i.test(brand)) return "historical";
  if (brand.includes(" · ")) return "official_mascot";
  return "animal_name";
}

function statusFromScore(score10) {
  if (score10 >= 9.5) return "Step away";
  if (score10 >= 8.0) return "Very crowded";
  if (score10 >= 6.0) return "Crowded";
  if (score10 >= 4.0) return "Getting busy";
  if (score10 >= 2.0) return "A few sightings";
  return "Wide open";
}

const animalsRaw = extractArray(html, "animals");
const brandVisuals = extractObject(html, "brandVisuals");
const logoMarks = extractObject(html, "logoMarks");

for (const [name, [icon, url]] of Object.entries(logoMarks)) {
  if (!brandVisuals[name]) {
    brandVisuals[name] = {
      img: `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${icon}.svg`,
      url,
      label: "Brand mark",
    };
  }
}

const animals = [];
const uses = [];
const seenAliases = new Map();
const knownIds = new Set(animalsRaw.map((a) => a.id));

for (const a of animalsRaw) {
  const aliases = [...new Set(a.names.map((n) => n.trim()).filter(Boolean))];
  // Disambiguate Hebrew צבי: keep on gazelle, drop from antelope
  const cleanedAliases =
    a.id === "antelope" ? aliases.filter((x) => x !== "צבי") : aliases;

  for (const alias of cleanedAliases) {
    const key = alias.toLowerCase();
    if (!seenAliases.has(key)) seenAliases.set(key, []);
    seenAliases.get(key).push(a.id);
  }

  const score10 = Number((a.score / 10).toFixed(1));
  const useIds = [];

  for (const brand of a.brands) {
    const id = `${a.id}-${slugifyBrand(brand)}`;
    const parsed = parseBrand(brand);
    const visual = brandVisuals[brand];
    const relationshipType = guessRelationship(brand);
    const use = {
      id,
      animalId: a.id,
      organization: parsed.organization,
      product: parsed.product,
      characterName: parsed.characterName,
      relationshipType,
      officialStatus:
        relationshipType === "community_mascot" || relationshipType === "historical"
          ? "unofficial"
          : relationshipType === "official_mascot"
            ? "official"
            : "unknown",
      activeStatus: relationshipType === "historical" ? "inactive" : "active",
      recognition: score10 >= 8 ? "strong" : score10 >= 5 ? "strong_niche" : "niche",
      techHabitats: techHabitats(brand),
      sourceUrl: visual?.url || "https://example.com/pending-source",
      sourceType: visual?.label?.includes("Official")
        ? "official"
        : visual
          ? "community_primary"
          : "secondary",
      verificationStatus: visual?.url ? "partially_verified" : "candidate",
      verifiedAt: "2026-07-20",
      displayLabel: brand,
      image: visual?.img
        ? {
            src: null,
            remoteSrc: visual.img,
            alt: `${parsed.characterName || parsed.organization} ${a.name}`,
            attribution: visual.label || "Brand mark",
          }
        : null,
    };
    uses.push(use);
    useIds.push(id);
  }

  const heAlias = cleanedAliases.find((x) => /[\u0590-\u05FF]/.test(x));

  animals.push({
    id: a.id,
    slug: a.id,
    name: a.name,
    nameHe: heAlias || undefined,
    aliases: cleanedAliases,
    emoji: a.emoji,
    animalClass: animalClass(a.id),
    accentColor: a.color,
    status: a.status || statusFromScore(score10),
    verdict: a.verdict,
    alternatives: a.alts.filter((alt) => knownIds.has(alt)),
    uses: useIds,
    scoreOverride: score10,
    scoreOverrideRationale: "Preserved from prototype editorial score during migration.",
    reviewStatus: useIds.length ? "partially_verified" : "candidate",
    lastReviewedAt: "2026-07-20",
  });
}

const ambiguous = [...seenAliases.entries()].filter(([, ids]) => ids.length > 1);
console.log("animals", animals.length);
console.log("uses", uses.length);
console.log("ambiguous aliases", ambiguous);

const dataDir = path.join(root, "src", "data");
fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(path.join(dataDir, "animals.json"), JSON.stringify(animals, null, 2) + "\n");
fs.writeFileSync(path.join(dataDir, "uses.json"), JSON.stringify(uses, null, 2) + "\n");
console.log("Wrote src/data/animals.json and src/data/uses.json");
