/**
 * Download a small set of tier-1 mascot/logo assets for launch.
 * // ponytail: expand only when a resident becomes important enough to ship locally
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "mascots");
fs.mkdirSync(outDir, { recursive: true });

const assets = [
  {
    useId: "penguin-linux-tux",
    file: "linux-tux.png",
    url: "https://www.kernel.org/theme/images/logos/tux.png",
    owner: "Linux / kernel.org",
    note: "Official Tux artwork from kernel.org theme assets.",
  },
  {
    useId: "gopher-go-the-go-gopher",
    file: "go-gopher.png",
    url: "https://go.dev/blog/gopher/gopher.png",
    owner: "Go project",
    note: "Official Go gopher artwork. See https://go.dev/blog/gopher and https://go.dev/brand",
  },
  {
    useId: "whale-docker-moby-dock",
    file: "docker-moby.png",
    url: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
    owner: "Docker Inc.",
    note: "Official Moby Dock mark from Docker brand materials.",
  },
  {
    useId: "octopus-github-mona-the-octocat",
    file: "github-octocat.png",
    url: "https://octodex.github.com/images/original.png",
    owner: "GitHub",
    note: "Official Octocat from Octodex.",
  },
  {
    useId: "cat-github-octocat",
    file: "github-octocat.png",
    url: "https://octodex.github.com/images/original.png",
    owner: "GitHub",
    note: "Official Octocat from Octodex.",
  },
  {
    useId: "elephant-postgresql-slonik",
    file: "postgresql-elephant.png",
    url: "https://www.postgresql.org/media/img/about/press/elephant.png",
    owner: "PostgreSQL Global Development Group",
    note: "Official PostgreSQL elephant logo. See trademark policy.",
  },
  {
    useId: "elephant-php-elephpant",
    file: "php-logo.svg",
    url: "https://www.php.net/images/logos/php-logo.svg",
    owner: "PHP Group",
    note: "Official PHP logo from php.net (animal-branded product mark).",
  },
  {
    useId: "dolphin-mysql-sakila",
    file: "mysql-logo.svg",
    url: "https://labs.mysql.com/common/logos/mysql-logo.svg?v2",
    owner: "Oracle / MySQL",
    note: "Official MySQL logo asset.",
  },
  {
    useId: "hummingbird-dart-flutter-dash",
    file: "flutter-dash.png",
    url: "https://docs.flutter.dev/assets/images/dash/Dash.png",
    owner: "Flutter / Google",
    note: "Official Dash mascot from Flutter docs assets.",
  },
  {
    useId: "dinosaur-deno",
    file: "deno-logo.svg",
    url: "https://deno.land/logo.svg",
    owner: "Deno Land Inc.",
    note: "Official Deno logo.",
  },
];

const notice = [
  "# Third-party assets",
  "",
  "These files are used for identification and commentary. They remain owned by their respective trademark holders and are **not** covered by the MIT or CC BY licenses of this repository.",
  "",
  "| File | Used by | Owner | Source | Notes |",
  "| --- | --- | --- | --- | --- |",
];

const usesPath = path.join(root, "src", "data", "uses.json");
const uses = JSON.parse(fs.readFileSync(usesPath, "utf8"));
const byId = new Map(uses.map((use) => [use.id, use]));

for (const asset of assets) {
  const target = path.join(outDir, asset.file);
  if (!fs.existsSync(target)) {
    process.stdout.write(`Downloading ${asset.file}...\n`);
    const response = await fetch(asset.url);
    if (!response.ok) {
      console.warn(`Failed ${asset.url}: ${response.status}`);
      continue;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(target, buffer);
  }
  const use = byId.get(asset.useId);
  if (use) {
    use.image = {
      src: `/mascots/${asset.file}`,
      remoteSrc: asset.url,
      alt: use.image?.alt || `${use.characterName || use.organization}`,
      attribution: asset.note,
    };
    use.verificationStatus =
      use.verificationStatus === "candidate"
        ? "partially_verified"
        : use.verificationStatus;
  }
  notice.push(
    `| \`${asset.file}\` | \`${asset.useId}\` | ${asset.owner} | ${asset.url} | ${asset.note} |`,
  );
}

fs.writeFileSync(usesPath, JSON.stringify(uses, null, 2) + "\n");
fs.writeFileSync(path.join(root, "THIRD_PARTY_ASSETS.md"), notice.join("\n") + "\n");
console.log("Updated uses.json and THIRD_PARTY_ASSETS.md");
