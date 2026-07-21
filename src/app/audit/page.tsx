import type { Metadata } from "next";
import { getAllAnimals } from "@/lib/data";
import type { AnimalUse } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Catalog audit (temporary)",
  robots: {
    index: false,
    follow: false,
  },
};

type Row = {
  animalId: string;
  animalName: string;
  emoji: string;
  use: AnimalUse;
  flags: string[];
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
  const rows: Row[] = animals
    .flatMap((animal) =>
      animal.residents.map((use) => ({
        animalId: animal.id,
        animalName: animal.name,
        emoji: animal.emoji,
        use,
        flags: flagsFor(use),
      })),
    )
    .sort((a, b) => {
      const byAnimal = a.animalName.localeCompare(b.animalName);
      if (byAnimal !== 0) return byAnimal;
      return a.use.displayLabel.localeCompare(b.use.displayLabel);
    });

  const flagged = rows.filter((r) =>
    r.flags.some((f) =>
      ["NO_IMAGE", "REMOTE_ONLY", "FAVICON"].includes(f),
    ),
  );

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
        .audit-page .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .audit-page .flag {
          display: inline-block;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: #fff;
        }
        .audit-page .flag.warn { background: #ffe8c8; }
        .audit-page .flag.bad { background: #ffd0d0; }
        .audit-page .flag.ok { background: #e4f5d4; }
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
        Temporary review page · noindex · {rows.length} uses across{" "}
        {animals.length} animals · {flagged.length} with image warnings
        <br />
        Open{" "}
        <a href="/audit">/audit</a> locally or on production. Links open in a
        new tab; nothing here redirects away from the grid.
      </p>

      <div className="legend">
        <span className="flag bad">NO_IMAGE</span>
        <span className="flag warn">REMOTE_ONLY</span>
        <span className="flag warn">FAVICON</span>
        <span className="flag">GH_AVATAR</span>
        <span className="flag">SIMPLE_ICONS</span>
        <span className="flag">PARTIAL / HISTORICAL / …</span>
      </div>

      <div className="audit-grid">
        {rows.map(({ animalId, animalName, emoji, use, flags }) => {
          const hasBad = flags.includes("NO_IMAGE");
          const hasWarn =
            !hasBad &&
            flags.some((f) => ["REMOTE_ONLY", "FAVICON"].includes(f));
          const img = use.image?.src || use.image?.remoteSrc || null;

          return (
            <article
              key={use.id}
              id={use.id}
              className={`audit-card${hasBad ? " has-bad" : hasWarn ? " has-warn" : ""}`}
            >
              {img ? (
                // Audit page: raw img so broken assets are obvious
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="audit-visual"
                  src={img}
                  alt={use.image?.alt || use.displayLabel}
                  loading="lazy"
                />
              ) : (
                <div className="audit-fallback" aria-hidden>
                  {emoji}
                </div>
              )}

              <div>
                <h2>
                  {emoji} {use.displayLabel}
                </h2>
                <p className="sub">
                  Animal: {animalName} ({animalId})
                </p>

                <dl>
                  <div>
                    <dt>id</dt>
                    <dd>{use.id}</dd>
                  </div>
                  <div>
                    <dt>org</dt>
                    <dd>{use.organization}</dd>
                  </div>
                  {use.product ? (
                    <div>
                      <dt>product</dt>
                      <dd>{use.product}</dd>
                    </div>
                  ) : null}
                  {use.characterName ? (
                    <div>
                      <dt>character</dt>
                      <dd>{use.characterName}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>type</dt>
                    <dd>
                      {use.relationshipType} · {use.officialStatus} ·{" "}
                      {use.activeStatus}
                    </dd>
                  </div>
                  <div>
                    <dt>verify</dt>
                    <dd>{use.verificationStatus}</dd>
                  </div>
                  <div>
                    <dt>source</dt>
                    <dd>
                      <a
                        href={use.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {use.sourceUrl}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>img src</dt>
                    <dd>{use.image?.src || "—"}</dd>
                  </div>
                  <div>
                    <dt>remote</dt>
                    <dd>
                      {use.image?.remoteSrc ? (
                        <a
                          href={use.image.remoteSrc}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {use.image.remoteSrc}
                        </a>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  {use.image?.attribution ? (
                    <div>
                      <dt>attr</dt>
                      <dd>{use.image.attribution}</dd>
                    </div>
                  ) : null}
                </dl>

                {flags.length ? (
                  <div className="audit-flags">
                    {flags.map((flag) => (
                      <span
                        key={flag}
                        className={`flag${
                          flag === "NO_IMAGE"
                            ? " bad"
                            : ["REMOTE_ONLY", "FAVICON"].includes(flag)
                              ? " warn"
                              : ""
                        }`}
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="audit-flags">
                    <span className="flag ok">CLEAN</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
