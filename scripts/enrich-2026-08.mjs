/**
 * August 2026 enrichment: new uses for existing animals, new animals with uses,
 * and free-agent animals (no tech tenant yet).
 * // ponytail: one-shot data migration, delete after it lands
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const animalsPath = path.join(root, "src/data/animals.json");
const usesPath = path.join(root, "src/data/uses.json");
const animals = JSON.parse(fs.readFileSync(animalsPath, "utf8"));
const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));

const TODAY = "2026-08-05";

function img(src, remoteSrc, alt, attribution) {
  return { src, remoteSrc, alt, attribution };
}
const si = (slug, alt, extra) =>
  img(`/mascots/${slug}.svg`, `https://cdn.simpleicons.org/${slug.replace(/-/g, "")}`, alt, extra ?? `${alt} via Simple Icons (brand color).`);

// ---------------------------------------------------------------------------
// New uses
// ---------------------------------------------------------------------------
const newUses = [
  // --- existing animals, new tenants ---
  {
    id: "butterfly-bluesky", animalId: "butterfly", organization: "Bluesky",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["apps", "web"],
    sourceUrl: "https://bsky.app/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Bluesky",
    image: img("/mascots/bluesky.svg", "https://cdn.simpleicons.org/bluesky", "Bluesky butterfly logo", "Bluesky brand mark via Simple Icons (brand color)."),
  },
  {
    id: "firefly-adobe-firefly", animalId: "firefly", organization: "Adobe", product: "Firefly",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["tools", "apps"],
    sourceUrl: "https://www.adobe.com/products/firefly.html", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Adobe · Firefly",
    image: null,
  },
  {
    id: "camel-ocaml", animalId: "camel", organization: "OCaml",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["code", "open_source"],
    sourceUrl: "https://ocaml.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "OCaml",
    image: img("/mascots/ocaml.svg", "https://cdn.simpleicons.org/ocaml", "OCaml camel logo", "OCaml brand mark via Simple Icons (brand color)."),
  },
  {
    id: "turtle-tortoisesvn", animalId: "turtle", organization: "TortoiseSVN",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "open_source"],
    sourceUrl: "https://tortoisesvn.net/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "TortoiseSVN",
    image: img("/mascots/tortoisesvn.svg", "https://commons.wikimedia.org/wiki/Special:FilePath/TortoiseSVN%20logo.svg", "TortoiseSVN tortoise logo", "TortoiseSVN logo via Wikimedia Commons."),
  },
  {
    id: "orca-gnome-orca", animalId: "orca", organization: "GNOME", product: "Orca screen reader",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "open_source"],
    sourceUrl: "https://orca.gnome.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "GNOME · Orca",
    image: img("/mascots/gnome.svg", "https://cdn.simpleicons.org/gnome", "GNOME brand mark", "GNOME brand mark via Simple Icons (brand color)."),
  },
  {
    id: "seahorse-gnome-seahorse", animalId: "seahorse", organization: "GNOME", product: "Seahorse",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["tools", "open_source"],
    sourceUrl: "https://apps.gnome.org/Seahorse/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "GNOME · Seahorse",
    image: img("/mascots/gnome.svg", "https://cdn.simpleicons.org/gnome", "GNOME brand mark", "GNOME brand mark via Simple Icons (brand color)."),
  },
  {
    id: "falcon-crowdstrike", animalId: "falcon", organization: "CrowdStrike", product: "Falcon platform",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["tools", "web"],
    sourceUrl: "https://www.crowdstrike.com/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "CrowdStrike · Falcon",
    image: img("/mascots/crowdstrike-falcon.png", "https://github.com/CrowdStrike.png?size=512", "CrowdStrike falcon logo", "CrowdStrike logo via GitHub organization avatar."),
  },
  {
    id: "seal-podman", animalId: "seal", organization: "Podman",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "open_source"],
    sourceUrl: "https://podman.io/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Podman",
    image: img("/mascots/podman.svg", "https://cdn.simpleicons.org/podman", "Podman selkie logo", "Podman brand mark via Simple Icons (brand color)."),
  },
  {
    id: "bear-polars", animalId: "bear", organization: "Polars",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["data", "open_source"],
    sourceUrl: "https://pola.rs/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Polars",
    image: img("/mascots/polars.svg", "https://cdn.simpleicons.org/polars", "Polars polar bear logo", "Polars brand mark via Simple Icons (brand color)."),
  },
  {
    id: "octopus-octopus-deploy", animalId: "octopus", organization: "Octopus Deploy",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "web"],
    sourceUrl: "https://octopus.com/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Octopus Deploy",
    image: img("/mascots/octopus-deploy.svg", "https://cdn.simpleicons.org/octopusdeploy", "Octopus Deploy logo", "Octopus Deploy brand mark via Simple Icons (brand color)."),
  },
  {
    id: "duck-cyberduck", animalId: "duck", organization: "Cyberduck",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "open_source"],
    sourceUrl: "https://cyberduck.io/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Cyberduck",
    image: img("/mascots/cyberduck.png", "https://cyberduck.io/img/cyberduck-icon-rect-512.png", "Cyberduck duck icon", "Official Cyberduck app icon."),
  },
  {
    id: "spider-spyder-ide", animalId: "spider", organization: "Spyder",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "data", "open_source"],
    sourceUrl: "https://www.spyder-ide.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Spyder IDE",
    image: img("/mascots/spyder.svg", "https://cdn.simpleicons.org/spyderide", "Spyder IDE logo", "Spyder IDE brand mark via Simple Icons (brand color)."),
  },
  {
    id: "panda-pandas", animalId: "panda", organization: "pandas",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["data", "code", "open_source"],
    sourceUrl: "https://pandas.pydata.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "pandas",
    image: img("/mascots/pandas.svg", "https://cdn.simpleicons.org/pandas", "pandas library logo", "pandas brand mark via Simple Icons (brand color). Name actually derives from 'panel data'."),
  },
  {
    id: "llama-ollama", animalId: "llama", organization: "Ollama",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["tools", "data"],
    sourceUrl: "https://ollama.com/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Ollama",
    image: img("/mascots/ollama.svg", "https://cdn.simpleicons.org/ollama", "Ollama llama logo", "Ollama brand mark via Simple Icons."),
  },
  {
    id: "firebird-phoenix-framework", animalId: "firebird", organization: "Phoenix Framework",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["code", "web", "open_source"],
    sourceUrl: "https://www.phoenixframework.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Phoenix Framework",
    image: img("/mascots/phoenix-framework.svg", "https://cdn.simpleicons.org/phoenixframework", "Phoenix Framework firebird logo", "Phoenix Framework brand mark via Simple Icons (brand color)."),
  },
  {
    id: "snake-spf13-cobra", animalId: "snake", organization: "Cobra",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["code", "open_source"],
    sourceUrl: "https://cobra.dev/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Cobra (spf13)",
    image: null,
  },
  {
    id: "lion-macos-lion", animalId: "lion", organization: "Apple", product: "Mac OS X Lion",
    relationshipType: "historical", officialStatus: "official", activeStatus: "inactive",
    recognition: "strong", techHabitats: ["tools"],
    sourceUrl: "https://en.wikipedia.org/wiki/OS_X_Lion", sourceType: "secondary",
    verificationStatus: "historical_verified", verifiedAt: TODAY, displayLabel: "macOS Lion · historical",
    image: img("/mascots/apple.svg", "https://cdn.simpleicons.org/apple", "Apple logo", "Apple brand mark via Simple Icons."),
  },
  {
    id: "toad-quest-toad", animalId: "toad", organization: "Quest Software", product: "Toad",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "data"],
    sourceUrl: "https://www.quest.com/toad/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Quest · Toad",
    image: null,
  },
  {
    id: "ladybug-ladybird-browser", animalId: "ladybug", organization: "Ladybird Browser Initiative", product: "Ladybird",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["apps", "open_source"],
    sourceUrl: "https://ladybird.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Ladybird Browser",
    image: img("/mascots/ladybird.png", "https://github.com/LadybirdBrowser.png?size=512", "Ladybird browser logo", "Ladybird logo via GitHub organization avatar."),
  },
  {
    id: "gecko-mozilla-gecko", animalId: "gecko", organization: "Mozilla", product: "Gecko engine",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["code", "web", "open_source"],
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Glossary/Gecko", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Mozilla · Gecko",
    image: null,
  },
  {
    id: "goose-block-goose", animalId: "goose", organization: "Block", product: "goose",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "code", "open_source"],
    sourceUrl: "https://block.github.io/goose/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Block · goose",
    image: null,
  },
  {
    id: "capybara-capybara-gem", animalId: "capybara", organization: "Capybara", product: "Capybara (Ruby)",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["code", "open_source"],
    sourceUrl: "https://teamcapybara.github.io/capybara/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Capybara (Ruby testing)",
    image: null,
  },
  {
    id: "quokka-quokkajs", animalId: "quokka", organization: "Wallaby.js", product: "Quokka.js",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["tools", "code"],
    sourceUrl: "https://quokkajs.com/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Quokka.js",
    image: null,
  },
  {
    id: "badger-badgerdb", animalId: "badger", organization: "Hypermode", product: "BadgerDB",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["data", "open_source"],
    sourceUrl: "https://github.com/hypermodeinc/badger", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "BadgerDB",
    image: null,
  },
  {
    id: "alpaca-stanford-alpaca", animalId: "alpaca", organization: "Stanford CRFM", product: "Alpaca",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["data", "code"],
    sourceUrl: "https://crfm.stanford.edu/2023/03/13/alpaca.html", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Stanford · Alpaca",
    image: null,
  },
  {
    id: "koala-bair-koala", animalId: "koala", organization: "Berkeley BAIR", product: "Koala",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["data", "code"],
    sourceUrl: "https://bair.berkeley.edu/blog/2023/04/03/koala/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "BAIR · Koala",
    image: null,
  },
  {
    id: "flamingo-deepmind-flamingo", animalId: "flamingo", organization: "DeepMind", product: "Flamingo",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["data", "code"],
    sourceUrl: "https://deepmind.google/discover/blog/tackling-multiple-tasks-with-a-single-visual-language-model/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "DeepMind · Flamingo",
    image: null,
  },
  {
    id: "lemur-netflix-lemur", animalId: "lemur", organization: "Netflix", product: "Lemur",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["tools", "open_source"],
    sourceUrl: "https://github.com/Netflix/lemur", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Netflix · Lemur",
    image: null,
  },
  {
    id: "armadillo-armadillo-cpp", animalId: "armadillo", organization: "Armadillo", product: "Armadillo C++",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["code", "open_source"],
    sourceUrl: "https://arma.sourceforge.net/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Armadillo (C++)",
    image: null,
  },
  {
    id: "tapir-softwaremill-tapir", animalId: "tapir", organization: "SoftwareMill", product: "tapir",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["code", "open_source"],
    sourceUrl: "https://tapir.softwaremill.com/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "SoftwareMill · tapir",
    image: null,
  },
  {
    id: "pangolin-fosrl", animalId: "pangolin", organization: "Fossorial", product: "Pangolin",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["tools", "open_source"],
    sourceUrl: "https://github.com/fosrl/pangolin", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Pangolin",
    image: img("/mascots/pangolin-fosrl.png", "https://github.com/fosrl.png?size=512", "Pangolin project logo", "Pangolin logo via GitHub organization avatar."),
  },
  {
    id: "axolotl-axolotl-finetuning", animalId: "axolotl", organization: "Axolotl AI", product: "Axolotl",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["data", "code", "open_source"],
    sourceUrl: "https://github.com/axolotl-ai-cloud/axolotl", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Axolotl (LLM fine-tuning)",
    image: null,
  },
  {
    id: "aardvark-openai-aardvark", animalId: "aardvark", organization: "OpenAI", product: "Aardvark",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["tools", "code"],
    sourceUrl: "https://openai.com/index/introducing-aardvark/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "OpenAI · Aardvark",
    image: null,
  },
  {
    id: "meerkat-meerkat-app", animalId: "meerkat", organization: "Meerkat",
    relationshipType: "historical", officialStatus: "official", activeStatus: "inactive",
    recognition: "niche", techHabitats: ["apps"],
    sourceUrl: "https://en.wikipedia.org/wiki/Meerkat_(app)", sourceType: "secondary",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Meerkat · historical",
    image: null,
  },
  {
    id: "moose-perl-moose", animalId: "moose", organization: "Perl community", product: "Moose",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["code", "open_source"],
    sourceUrl: "https://metacpan.org/pod/Moose", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Perl · Moose",
    image: null,
  },
  {
    id: "hippo-hippo-cms", animalId: "hippo", organization: "Hippo CMS (Bloomreach)",
    relationshipType: "historical", officialStatus: "official", activeStatus: "inactive",
    recognition: "niche", techHabitats: ["web"],
    sourceUrl: "https://en.wikipedia.org/wiki/Hippo_CMS", sourceType: "secondary",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Hippo CMS · historical",
    image: null,
  },
  {
    id: "eagle-autodesk-eagle", animalId: "eagle", organization: "Autodesk", product: "EAGLE",
    relationshipType: "historical", officialStatus: "official", activeStatus: "inactive",
    recognition: "strong_niche", techHabitats: ["tools"],
    sourceUrl: "https://en.wikipedia.org/wiki/EAGLE_(program)", sourceType: "secondary",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Autodesk EAGLE · historical",
    image: null,
  },
  {
    id: "kiwi-kiwicom", animalId: "kiwi", organization: "Kiwi.com",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["web", "apps"],
    sourceUrl: "https://www.kiwi.com/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Kiwi.com",
    image: null,
  },
  {
    id: "orca-lobsters-placeholder-unused", skip: true,
  },
  // --- new animals, first tenants ---
  {
    id: "bluebird-twitter-larry", animalId: "bluebird", organization: "Twitter", characterName: "Larry the Bird",
    relationshipType: "historical", officialStatus: "official", activeStatus: "inactive",
    recognition: "strong", techHabitats: ["apps", "web"],
    sourceUrl: "https://en.wikipedia.org/wiki/Twitter", sourceType: "secondary",
    verificationStatus: "historical_verified", verifiedAt: TODAY, displayLabel: "Twitter · Larry the Bird · historical",
    image: img("/mascots/twitter-larry.svg", "https://commons.wikimedia.org/wiki/Special:FilePath/Twitter-logo.svg", "Twitter bird logo (Larry)", "Historical Twitter bird logo via Wikimedia Commons."),
  },
  {
    id: "swift-apple-swift", animalId: "swift", organization: "Apple", product: "Swift",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["code"],
    sourceUrl: "https://www.swift.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Apple · Swift",
    image: img("/mascots/swift.svg", "https://cdn.simpleicons.org/swift", "Swift bird logo", "Swift brand mark via Simple Icons (brand color)."),
  },
  {
    id: "kraken-gitkraken", animalId: "kraken", organization: "GitKraken",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools"],
    sourceUrl: "https://www.gitkraken.com/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "GitKraken",
    image: img("/mascots/gitkraken.svg", "https://cdn.simpleicons.org/gitkraken", "GitKraken kraken logo", "GitKraken brand mark via Simple Icons (brand color)."),
  },
  {
    id: "dragonfly-dragonflydb", animalId: "dragonfly", organization: "DragonflyDB",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["data"],
    sourceUrl: "https://www.dragonflydb.io/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "DragonflyDB",
    image: img("/mascots/dragonflydb.png", "https://github.com/dragonflydb.png?size=512", "DragonflyDB dragonfly logo", "DragonflyDB logo via GitHub organization avatar."),
  },
  {
    id: "dragonfly-dragonfly-bsd", animalId: "dragonfly", organization: "DragonFly BSD",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["code", "open_source"],
    sourceUrl: "https://www.dragonflybsd.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "DragonFly BSD",
    image: null,
  },
  {
    id: "elk-elastic-stack", animalId: "elk", organization: "Elastic", product: "ELK Stack",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["data", "tools"],
    sourceUrl: "https://www.elastic.co/elastic-stack", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Elastic · ELK Stack",
    image: img("/mascots/elastic.svg", "https://cdn.simpleicons.org/elastic", "Elastic logo", "Elastic brand mark via Simple Icons (brand color). ELK = Elasticsearch, Logstash, Kibana."),
  },
  {
    id: "mongoose-mongoosejs", animalId: "mongoose", organization: "Mongoose", product: "Mongoose ODM",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["code", "data", "open_source"],
    sourceUrl: "https://mongoosejs.com/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Mongoose (Node ODM)",
    image: img("/mascots/mongoose.svg", "https://cdn.simpleicons.org/mongoose", "Mongoose ODM logo", "Mongoose brand mark via Simple Icons (brand color)."),
  },
  {
    id: "unicorn-gunicorn", animalId: "unicorn", organization: "Gunicorn",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong", techHabitats: ["code", "web", "open_source"],
    sourceUrl: "https://gunicorn.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Gunicorn (Green Unicorn)",
    image: img("/mascots/gunicorn.svg", "https://cdn.simpleicons.org/gunicorn", "Gunicorn logo", "Gunicorn brand mark via Simple Icons (brand color)."),
  },
  {
    id: "spider-placeholder-unused", skip: true,
  },
  {
    id: "wasp-wasp-lang", animalId: "wasp", organization: "Wasp",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["code", "web", "open_source"],
    sourceUrl: "https://wasp.sh/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Wasp",
    image: img("/mascots/wasp-lang.png", "https://github.com/wasp-lang.png?size=512", "Wasp language logo", "Wasp logo via GitHub organization avatar."),
  },
  {
    id: "locust-locust-io", animalId: "locust", organization: "Locust",
    relationshipType: "animal_logo", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "open_source"],
    sourceUrl: "https://locust.io/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Locust load testing",
    image: img("/mascots/locust.png", "https://github.com/locustio.png?size=512", "Locust project logo", "Locust logo via GitHub organization avatar."),
  },
  {
    id: "lobster-lobsters", animalId: "lobster", organization: "Lobsters", product: "lobste.rs",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["web", "open_source"],
    sourceUrl: "https://lobste.rs/about", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Lobsters (lobste.rs)",
    image: img("/mascots/lobsters.png", "https://github.com/lobsters.png?size=512", "Lobsters community logo", "Lobsters logo via GitHub organization avatar."),
  },
  {
    id: "seahorse-placeholder-unused", skip: true,
  },
  {
    id: "heron-apache-heron", animalId: "heron", organization: "Apache Heron",
    relationshipType: "historical", officialStatus: "official", activeStatus: "inactive",
    recognition: "niche", techHabitats: ["data", "open_source"],
    sourceUrl: "https://attic.apache.org/projects/heron.html", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Apache Heron · historical",
    image: null,
  },
  {
    id: "barracuda-barracuda-networks", animalId: "barracuda", organization: "Barracuda Networks",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "strong_niche", techHabitats: ["tools", "web"],
    sourceUrl: "https://www.barracuda.com/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Barracuda Networks",
    image: null,
  },
  {
    id: "sparrow-sparrow-mail", animalId: "sparrow", organization: "Sparrow",
    relationshipType: "historical", officialStatus: "official", activeStatus: "inactive",
    recognition: "niche", techHabitats: ["apps"],
    sourceUrl: "https://en.wikipedia.org/wiki/Sparrow_(email_client)", sourceType: "secondary",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Sparrow mail · historical",
    image: null,
  },
  {
    id: "hare-harelang", animalId: "hare", organization: "Hare",
    relationshipType: "animal_name", officialStatus: "official", activeStatus: "active",
    recognition: "niche", techHabitats: ["code", "open_source"],
    sourceUrl: "https://harelang.org/", sourceType: "official",
    verificationStatus: "partially_verified", verifiedAt: TODAY, displayLabel: "Hare language",
    image: null,
  },
].filter((u) => !u.skip);

// ---------------------------------------------------------------------------
// New animals
// ---------------------------------------------------------------------------
function animal(id, name, nameHe, aliases, emoji, animalClass, accentColor, status, verdict, alternatives, animalUses) {
  return {
    id, slug: id, name, nameHe, aliases, emoji, animalClass, accentColor,
    status, verdict, alternatives, uses: animalUses,
    reviewStatus: animalUses.length ? "partially_verified" : "candidate",
    lastReviewedAt: TODAY,
  };
}

const newAnimals = [
  // with tenants
  animal("bluebird", "Bluebird", "ציפור כחולה", ["bluebird", "ציפור כחולה"], "🐦", "birds", "#9ad6f5",
    "Flew away in the rebrand", "Larry the Bird carried Twitter for 17 years before X swallowed him whole. A cautionary tale.",
    ["sparrow", "robin"], ["bluebird-twitter-larry"]),
  animal("swift", "Swift", "סיס", ["swift", "סיס"], "🐦", "birds", "#f8b076",
    "Fastest bird in Cupertino", "Apple picked the fastest bird in level flight for its language logo. On brand.",
    ["swallow-none-use-hummingbird", "hummingbird"].filter(a => a === "hummingbird"), ["swift-apple-swift"]),
  animal("kraken", "Kraken", "קרקן", ["kraken", "קרקן"], "🦑", "marine", "#b9a7e8",
    "Released regularly", "GitKraken proves mythical sea monsters make great git clients. Squid but bigger claims.",
    ["squid", "octopus"], ["kraken-gitkraken"]),
  animal("dragonfly", "Dragonfly", "שפירית", ["dragonfly", "שפירית"], "🪰", "bugs", "#8fd8c9",
    "Two OSes and a database deep", "DragonflyDB and DragonFly BSD both claimed the fastest insect on Earth. Speed sells.",
    ["butterfly", "firefly"], ["dragonfly-dragonflydb", "dragonfly-dragonfly-bsd"]),
  animal("spider", "Spider", "עכביש", ["spider", "עכביש"], "🕷️", "bugs", "#c9c2b8",
    "Spinning webs and IDEs", "Spyder IDE crawls Python data science, and every web crawler ever borrowed the metaphor.",
    ["ant", "beetle"], ["spider-spyder-ide"]),
  animal("wasp", "Wasp", "צרעה", ["wasp", "צרעה"], "🐝", "bugs", "#f5d76e",
    "Full-stack sting", "Wasp the web framework took the name. The bee's angrier cousin finally has a job in tech.",
    ["bee", "ant"], ["wasp-wasp-lang"]),
  animal("gecko", "Gecko", "שממית", ["gecko", "שממית"], "🦎", "reptiles", "#a8de8e",
    "Rendering since 1998", "Mozilla's Gecko engine renders a big chunk of the open web. Sticky feet, sticky market share.",
    ["chameleon", "iguana"], ["gecko-mozilla-gecko"]),
  animal("goose", "Goose", "אווז", ["goose", "אווז"], "🪿", "birds", "#d7e3f0",
    "Honking at your codebase", "Block's goose AI agent wanders repos and honks until the task is done.",
    ["duck", "swan"], ["goose-block-goose"]),
  animal("toad", "Toad", "קרפדה", ["toad", "קרפדה"], "🐸", "reptiles", "#b3c98a",
    "Croaking at databases", "Quest's Toad has been the DBA's warty companion since the Oracle 7 days.",
    ["frog"], ["toad-quest-toad"]),
  animal("unicorn", "Unicorn", "חד-קרן", ["unicorn", "חד-קרן", "חד קרן"], "🦄", "mammals", "#f3c3e0",
    "Pre-forked and magical", "Gunicorn serves half the Python web. Also what every startup calls itself at $1B.",
    ["horse", "pony"], ["unicorn-gunicorn"]),
  animal("mongoose", "Mongoose", "נמייה", ["mongoose", "נמייה"], "🦦", "mammals", "#d9b98a",
    "Snake-killer, schema-keeper", "Mongoose wraps MongoDB schemas the way the real animal wraps cobras. Decisively.",
    ["weasel", "ferret"], ["mongoose-mongoosejs"]),
  animal("elk", "Elk", "אייל", ["elk", "אייל"], "🦌", "mammals", "#c7ad91",
    "An acronym with antlers", "Elasticsearch + Logstash + Kibana = ELK. The rare mascot assembled from initials.",
    ["moose", "gnu"], ["elk-elastic-stack"]),
  animal("locust", "Locust", "ארבה", ["locust", "ארבה"], "🦗", "bugs", "#cbe07d",
    "Swarming your endpoints", "Locust load-tests by unleashing a plague of simulated users. Name checks out.",
    ["grasshopper", "mantis"], ["locust-locust-io"]),
  animal("seahorse", "Seahorse", "סוסון ים", ["seahorse", "סוסון ים"], "🐴", "marine", "#a5d8d0",
    "Guarding GNOME's keys", "GNOME Seahorse keeps your GPG keys safe in the most elegant tail in the ocean.",
    ["fish", "starfish"], ["seahorse-gnome-seahorse"]),
  animal("heron", "Heron", "אנפה", ["heron", "אנפה"], "🐦", "birds", "#9fb8c9",
    "Retired to the Attic", "Twitter's stream processor went to Apache, then to the Attic. Elegant while it lasted.",
    ["crane", "stork"], ["heron-apache-heron"]),
  animal("barracuda", "Barracuda", "ברקודה", ["barracuda", "ברקודה"], "🐟", "marine", "#8fb8e0",
    "Patrolling email perimeters", "Barracuda Networks built a security empire on the ocean's most aggressive fish.",
    ["shark", "fish"], ["barracuda-barracuda-networks"]),
  animal("sparrow", "Sparrow", "דרור", ["sparrow", "דרור"], "🐦", "birds", "#cbb49a",
    "Acquired and sunset", "The beloved mail client Google bought and quietly retired. Pour one out.",
    ["bluebird", "robin"], ["sparrow-sparrow-mail"]),
  animal("hare", "Hare", "ארנב בר", ["hare", "ארנב בר"], "🐰", "mammals", "#d8c9b4",
    "Systems programming at speed", "Drew DeVault's Hare language races where C plods. The tortoise is unimpressed.",
    ["rabbit"], ["hare-harelang"]),
  // free agents
  animal("cheetah", "Cheetah", "ברדלס", ["cheetah", "ברדלס"], "🐆", "mammals", "#f0c987",
    "Fastest cat, still free", "Mac OS X 10.0's codename is ancient history — the fastest land animal is up for grabs.",
    ["leopard", "jaguar"], []),
  animal("leopard", "Leopard", "לאופרד", ["leopard", "לאופרד"], "🐆", "mammals", "#e0b96a",
    "Spots available", "Another retired macOS codename. Stealthy, spotted, and surprisingly unclaimed.",
    ["cheetah", "jaguar", "panther"], []),
  animal("panther", "Panther", "פנתר", ["panther", "פנתר", "black panther"], "🐈‍⬛", "mammals", "#8a8a9e",
    "Sleek and unbooked", "macOS 10.3 let it go two decades ago. All that black-on-black branding potential, wasted.",
    ["leopard", "puma", "lynx"], []),
  animal("jaguar", "Jaguar", "יגואר", ["jaguar", "יגואר"], "🐆", "mammals", "#d9a05b",
    "Big cat, small tenancy", "Atari consoles and macOS 10.2 both moved out. The apex predator of the Amazon awaits.",
    ["cheetah", "leopard", "puma"], []),
  animal("hawk", "Hawk", "נץ", ["hawk", "נץ"], "🦅", "birds", "#c98f6a",
    "Circling the namespace", "Sharp eyes, sharper dive. Security companies keep circling but none committed.",
    ["eagle", "falcon"], []),
  animal("toucan", "Toucan", "טוקן", ["toucan", "טוקן"], "🦜", "birds", "#f5a25d",
    "Big bill, no tenants", "That beak is a walking billboard. Somehow no API company noticed.",
    ["parrot", "macaw"], []),
  animal("peacock", "Peacock", "טווס", ["peacock", "טווס"], "🦚", "birds", "#7fc9b8",
    "Showing off to nobody", "NBC streams under this name but tech proper never claimed the flashiest bird alive.",
    ["swan", "flamingo"], []),
  animal("swan", "Swan", "ברבור", ["swan", "ברבור"], "🦢", "birds", "#e8e4dc",
    "Gracefully unclaimed", "Elegant, monogamous, occasionally vicious. The perfect fintech mascot nobody hired.",
    ["goose", "duck", "peacock"], []),
  animal("stork", "Stork", "חסידה", ["stork", "חסידה"], "🕊️", "birds", "#d4ccc0",
    "Delivering... nothing yet", "The original delivery service. Logistics startups, this one writes itself.",
    ["crane", "heron", "pelican"], []),
  animal("ostrich", "Ostrich", "יען", ["ostrich", "יען"], "🪶", "birds", "#c4ab8e",
    "Head firmly above ground", "Biggest bird, fastest runner, zero tech tenants. Stop burying the opportunity.",
    ["emu-none", "kiwi"].filter(a => a === "kiwi"), []),
  animal("crow", "Crow", "עורב אפור", ["crow", "עורב אפור"], "🐦‍⬛", "birds", "#5e6068",
    "Too clever to settle", "Solves puzzles, holds grudges, remembers faces. Basically a senior engineer with wings.",
    ["raven", "blackbird-none"].filter(a => a === "raven"), []),
  animal("robin", "Robin", "אדום החזה", ["robin", "אדום החזה"], "🐦", "birds", "#e07a5f",
    "First bird of spring, last to brand", "Friendly, recognizable, and still on the market. Batman's sidekick needs a side gig.",
    ["bluebird", "sparrow"], []),
  animal("jellyfish", "Jellyfish", "מדוזה", ["jellyfish", "מדוזה"], "🪼", "marine", "#c9b8f0",
    "Drifting through the backlog", "No brain, no heart, immortal. The ideal legacy system metaphor is still available.",
    ["octopus", "starfish"], []),
  animal("stingray", "Stingray", "טריגון", ["stingray", "טריגון"], "🐟", "marine", "#8ea8c4",
    "Gliding under the radar", "Sleek, flat, and quietly dangerous. Security tooling keeps missing this one.",
    ["shark", "manatee"], []),
  animal("starfish", "Starfish", "כוכב ים", ["starfish", "כוכב ים"], "⭐", "marine", "#f0a8a0",
    "Five arms, zero contracts", "Regrows limbs like a resilient distributed system. The metaphor sells itself.",
    ["seahorse", "jellyfish"], []),
  animal("manatee", "Manatee", "פרת ים", ["manatee", "פרת ים"], "🦭", "marine", "#a8bcc9",
    "Slow and steady and free", "The sea cow moves at 8 km/h and has never shipped a breaking change.",
    ["walrus", "seal", "dolphin"], []),
  animal("porcupine", "Porcupine", "דורבן", ["porcupine", "דורבן"], "🦔", "mammals", "#b8a48a",
    "Prickly and unclaimed", "Picovoice named a wake-word engine after it, but the animal itself still has room.",
    ["hedgehog", "armadillo"], []),
  animal("chipmunk", "Chipmunk", "סנאי פסים", ["chipmunk", "סנאי פסים"], "🐿️", "mammals", "#d9a878",
    "Cheeks full of potential", "Stripes, speed, and hoarding instincts. A caching layer waiting to happen.",
    ["squirrel", "hamster"], []),
  animal("hamster", "Hamster", "אוגר", ["hamster", "אוגר"], "🐹", "mammals", "#e8c9a0",
    "Wheel spinning since forever", "Runs all night and gets nowhere — the CI/CD spirit animal remains available.",
    ["chipmunk", "mouse"], []),
  animal("salamander", "Salamander", "סלמנדרה", ["salamander", "סלמנדרה"], "🦎", "reptiles", "#e8935f",
    "Fireproof and free", "Mythically walks through fire and regenerates limbs. Incident response teams, hello?",
    ["axolotl", "gecko"], []),
  animal("grasshopper", "Grasshopper", "חגב", ["grasshopper", "חגב"], "🦗", "bugs", "#a8d878",
    "Leaping past the offers", "Google's coding app came and went. The champion jumper is back on the market.",
    ["locust", "mantis"], []),
  animal("mammoth", "Mammoth", "ממותה", ["mammoth", "ממותה"], "🦣", "mammals", "#a89078",
    "Thawing out nicely", "Mastodon took the cousin. The woolly one with bigger tusks is still frozen in wait.",
    ["mastodon", "elephant"], []),
  animal("dodo", "Dodo", "דודו", ["dodo", "דודו"], "🦤", "birds", "#b8a8c9",
    "Extinct but employable", "The universal mascot of obsolescence. Perfect for a legacy-migration service.",
    ["kiwi", "ostrich"], []),
  animal("skunk", "Skunk", "בואש", ["skunk", "בואש"], "🦨", "mammals", "#6e6e78",
    "Skunkworks, anyone?", "Lockheed coined the term; tech uses it daily. The actual animal remains unsigned.",
    ["badger", "raccoon"], []),
];

// ---------------------------------------------------------------------------
// Refresh previously-free animals that just got tenants
// ---------------------------------------------------------------------------
const refreshed = {
  capybara: ["Chilling in the test suite", "Ruby's Capybara drives browsers for integration tests. The calmest animal handles the flakiest job."],
  pangolin: ["Rolled into networking", "Fossorial's Pangolin tunnels through NATs the way the real one digs through termite mounds."],
  tapir: ["Snouting out API specs", "SoftwareMill's tapir describes Scala endpoints. The odd nose finally found its niche."],
  quokka: ["Smiling in your editor", "Quokka.js runs JavaScript inline as you type. Still the happiest animal in the repo."],
  axolotl: ["Regenerating fine-tunes", "The Axolotl framework fine-tunes LLMs. Fitting for the animal that regrows everything."],
  koala: ["Drowsy but published", "Berkeley's Koala chatbot naps in the LLM canon between Alpaca and Vicuna."],
  lemur: ["Managing certs at Netflix", "Netflix's Lemur wrangles TLS certificates. Big eyes for spotting expiry dates."],
  armadillo: ["Armored linear algebra", "The Armadillo C++ library has crunched matrices since 2008. Well protected, obviously."],
  flamingo: ["Standing on one GPU", "DeepMind's Flamingo did vision-language before it was cool. Pink stays on brand."],
  moose: ["Perl's postmodern beast", "Moose gave Perl 5 a real object system. Large, sturdy, occasionally intimidating."],
  badger: ["Digging through key-values", "BadgerDB stores Dgraph's data on disk. Tenacious digging, appropriately."],
  alpaca: ["Instruction-tuned and fluffy", "Stanford's Alpaca kicked off the open LLM fine-tuning stampede in 2023."],
  kiwi: ["Booking flights, flightless", "Kiwi.com built a travel-tech brand on the bird that never flies. Irony included."],
  orca: ["Reading screens aloud", "GNOME's Orca screen reader is the apex predator of Linux accessibility."],
  aardvark: ["First in the alphabet, first to audit", "OpenAI's Aardvark sniffs out security bugs the way the real one sniffs out termites."],
  hippo: ["Left the CMS waters", "Hippo CMS merged into Bloomreach and the brand sank. The river horse is semi-available."],
  meerkat: ["Stood tall, streamed briefly", "The Meerkat app livestreamed its way to fame in 2015 and vanished by 2016. Always alert, briefly loved."],
};

// ---------------------------------------------------------------------------
// Apply
// ---------------------------------------------------------------------------
const animalIds = new Set(animals.map((a) => a.id));
for (const a of newAnimals) {
  if (animalIds.has(a.id)) throw new Error(`duplicate animal ${a.id}`);
  animals.push(a);
}

const useIds = new Set(uses.map((u) => u.id));
for (const u of newUses) {
  if (useIds.has(u.id)) throw new Error(`duplicate use ${u.id}`);
  uses.push(u);
  const owner = animals.find((a) => a.id === u.animalId);
  if (!owner) throw new Error(`missing animal ${u.animalId} for ${u.id}`);
  if (!owner.uses.includes(u.id)) owner.uses.push(u.id);
}

for (const [id, [status, verdict]] of Object.entries(refreshed)) {
  const a = animals.find((x) => x.id === id);
  a.status = status;
  a.verdict = verdict;
  a.reviewStatus = "partially_verified";
  a.lastReviewedAt = TODAY;
}

fs.writeFileSync(animalsPath, JSON.stringify(animals, null, 2) + "\n");
fs.writeFileSync(usesPath, JSON.stringify(uses, null, 2) + "\n");
console.log(`animals: ${animals.length}, uses: ${uses.length}`);
