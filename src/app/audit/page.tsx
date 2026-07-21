import type { Metadata } from "next";
import { getAllAnimals } from "@/lib/data";
import type { AnimalUse } from "@/lib/schemas";
import {
  AuditExplorer,
  type AuditRow,
} from "@/components/audit/AuditExplorer";

export const metadata: Metadata = {
  title: "Catalog audit (temporary)",
  robots: {
    index: false,
    follow: false,
  },
};

function flagsFor(use: AnimalUse): string[] {
  const flags: string[] = [];
  const src = use.image?.src;
  const remote = use.image?.remoteSrc;

  if (!src && !remote) flags.push("NO_IMAGE");
  else if (!src) flags.push("REMOTE_ONLY");

  if (remote) {
    if (/s2\/favicons|favicon\.ico/i.test(remote)) flags.push("FAVICON");
    if (/avatars\.githubusercontent\.com/i.test(remote)) flags.push("GH_AVATAR");
    if (/cdn\.simpleicons\.org/i.test(remote)) flags.push("SIMPLE_ICONS");
  }

  if (use.verificationStatus !== "verified") {
    flags.push(use.verificationStatus.toUpperCase());
  }

  if (use.activeStatus === "inactive") flags.push("INACTIVE");

  return flags;
}

export default function AuditPage() {
  const animals = getAllAnimals();
  const rows: AuditRow[] = animals
    .flatMap((animal) =>
      animal.residents.map((use) => ({
        animalId: animal.id,
        animalName: animal.name,
        emoji: animal.emoji,
        useId: use.id,
        displayLabel: use.displayLabel,
        organization: use.organization,
        product: use.product,
        characterName: use.characterName,
        relationshipType: use.relationshipType,
        officialStatus: use.officialStatus,
        activeStatus: use.activeStatus,
        verificationStatus: use.verificationStatus,
        sourceUrl: use.sourceUrl,
        imageSrc: use.image?.src ?? null,
        remoteSrc: use.image?.remoteSrc ?? null,
        imageAlt: use.image?.alt || use.displayLabel,
        attribution: use.image?.attribution,
        flags: flagsFor(use),
      })),
    )
    .sort((a, b) => {
      const byAnimal = a.animalName.localeCompare(b.animalName);
      if (byAnimal !== 0) return byAnimal;
      return a.displayLabel.localeCompare(b.displayLabel);
    });

  const allFlags = [...new Set(rows.flatMap((r) => r.flags))].sort();
  const animalOptions = [...animals]
    .filter((a) => a.residents.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((a) => ({ id: a.id, name: a.name, emoji: a.emoji }));
  const relationshipTypes = [
    ...new Set(rows.map((r) => r.relationshipType)),
  ].sort();
  const verificationStatuses = [
    ...new Set(rows.map((r) => r.verificationStatus)),
  ].sort();
  const problemCount = rows.filter((r) =>
    r.flags.some((f) => ["NO_IMAGE", "REMOTE_ONLY", "FAVICON"].includes(f)),
  ).length;

  return (
    <main className="audit-page">
      <style>{`
        .audit-page {
          max-width: 1280px;
          margin: 0 auto;
          padding: 24px 16px 80px;
          font-family: var(--font-sans), system-ui, sans-serif;
          color: var(--ink);
          background: var(--cream);
        }
        .audit-page h1 {
          font-size: 32px;
          margin: 0 0 8px;
        }
        .audit-page .meta {
          color: var(--muted);
          font-family: var(--font-mono), monospace;
          font-size: 13px;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .audit-filters {
          position: sticky;
          top: 0;
          z-index: 5;
          background: color-mix(in srgb, var(--cream) 92%, white);
          border: 2px solid var(--line);
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 22px;
          backdrop-filter: blur(6px);
        }
        .audit-filter-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 10px;
          margin-bottom: 12px;
        }
        .audit-field {
          display: grid;
          gap: 4px;
          font-size: 12px;
          font-family: var(--font-mono), monospace;
          color: var(--muted);
        }
        .audit-field input,
        .audit-field select {
          border: 2px solid var(--line);
          border-radius: 10px;
          padding: 8px 10px;
          font: inherit;
          color: var(--ink);
          background: #fff;
        }
        .audit-flag-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }
        .audit-flag-mode {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono), monospace;
          font-size: 12px;
        }
        .audit-flag-mode button,
        .audit-clear {
          border: 2px solid var(--line);
          border-radius: 999px;
          background: #fff;
          padding: 4px 10px;
          font: inherit;
          cursor: pointer;
        }
        .audit-flag-mode button.on {
          background: var(--lime);
          font-weight: 700;
        }
        .audit-page .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }
        .audit-page .flag {
          display: inline-block;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: white;
          cursor: pointer;
        }
        .audit-page button.flag {
          appearance: none;
        }
        .audit-page .flag.warn { background: #ffe8c8; }
        .audit-page .flag.bad { background: #ffd0d0; }
        .audit-page .flag.ok { background: #e4f5d4; }
        .audit-page .flag.selected {
          outline: 2px solid var(--line);
          box-shadow: 2px 2px 0 var(--line);
        }
        .audit-count { margin-bottom: 0 !important; }
        .audit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 14px;
        }
        .audit-card {
          border: 2px solid var(--line);
          border-radius: 14px;
          background: #fff;
          padding: 12px;
          display: grid;
          grid-template-columns: 96px 1fr;
          gap: 12px;
          align-items: start;
        }
        .audit-card.has-warn { border-color: #d0892a; }
        .audit-card.has-bad { border-color: #c04040; }
        .audit-visual {
          width: 96px;
          height: 96px;
          border: 1px solid #d6d6cc;
          border-radius: 12px;
          object-fit: contain;
          background: #faf8f1;
          padding: 6px;
        }
        .audit-fallback {
          width: 96px;
          height: 96px;
          border: 1px dashed #c04040;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-size: 40px;
          background: #fff1f1;
        }
        .audit-card h2 {
          font-size: 16px;
          margin: 0 0 4px;
          line-height: 1.25;
        }
        .audit-card .sub {
          font-size: 13px;
          color: var(--muted);
          margin: 0 0 8px;
        }
        .audit-card dl {
          margin: 0;
          display: grid;
          gap: 4px;
          font-size: 12px;
          font-family: var(--font-mono), monospace;
        }
        .audit-card dt {
          color: var(--muted);
          display: inline;
        }
        .audit-card dd {
          display: inline;
          margin: 0 0 0 6px;
          word-break: break-all;
        }
        .audit-card a {
          color: #1f5f3a;
          text-decoration: underline;
        }
        .audit-flags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 8px;
        }
      `}</style>

      <h1>Catalog audit</h1>
      <p className="meta">
        Temporary review page · noindex · {rows.length} uses · {problemCount}{" "}
        with image warnings
        <br />
        Filter by flags, animal, relationship, verification, or free text. Click
        a flag chip to toggle it.
      </p>

      <AuditExplorer
        rows={rows}
        allFlags={allFlags}
        animals={animalOptions}
        relationshipTypes={relationshipTypes}
        verificationStatuses={verificationStatuses}
      />
    </main>
  );
}
