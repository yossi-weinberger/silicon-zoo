"use client";

import { useMemo, useState } from "react";

export type AuditRow = {
  animalId: string;
  animalName: string;
  emoji: string;
  useId: string;
  displayLabel: string;
  organization: string;
  product?: string;
  characterName?: string;
  relationshipType: string;
  officialStatus: string;
  activeStatus: string;
  verificationStatus: string;
  sourceUrl: string;
  imageSrc: string | null;
  remoteSrc: string | null;
  imageAlt: string;
  attribution?: string;
  flags: string[];
};

const PROBLEM_FLAGS = ["NO_IMAGE", "REMOTE_ONLY", "FAVICON"] as const;

type Props = {
  rows: AuditRow[];
  allFlags: string[];
  animals: { id: string; name: string; emoji: string }[];
  relationshipTypes: string[];
  verificationStatuses: string[];
};

export function AuditExplorer({
  rows,
  allFlags,
  animals,
  relationshipTypes,
  verificationStatuses,
}: Props) {
  const [query, setQuery] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [animalId, setAnimalId] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [imagePreset, setImagePreset] = useState<
    "all" | "problems" | "clean" | "favicon"
  >("all");
  const [flagMode, setFlagMode] = useState<"any" | "all">("any");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rows.filter((row) => {
      if (animalId && row.animalId !== animalId) return false;
      if (relationshipType && row.relationshipType !== relationshipType) {
        return false;
      }
      if (verificationStatus && row.verificationStatus !== verificationStatus) {
        return false;
      }
      if (activeStatus && row.activeStatus !== activeStatus) return false;

      if (imagePreset === "problems") {
        if (!row.flags.some((f) => (PROBLEM_FLAGS as readonly string[]).includes(f))) {
          return false;
        }
      } else if (imagePreset === "clean") {
        if (row.flags.length > 0) return false;
      } else if (imagePreset === "favicon") {
        if (!row.flags.includes("FAVICON")) return false;
      }

      if (selectedFlags.length) {
        const hit =
          flagMode === "all"
            ? selectedFlags.every((f) =>
                f === "CLEAN" ? row.flags.length === 0 : row.flags.includes(f),
              )
            : selectedFlags.some((f) =>
                f === "CLEAN" ? row.flags.length === 0 : row.flags.includes(f),
              );
        if (!hit) return false;
      }

      if (!q) return true;
      const haystack = [
        row.useId,
        row.displayLabel,
        row.organization,
        row.product,
        row.characterName,
        row.animalName,
        row.animalId,
        row.sourceUrl,
        row.imageSrc,
        row.remoteSrc,
        row.attribution,
        ...row.flags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [
    rows,
    query,
    selectedFlags,
    animalId,
    relationshipType,
    verificationStatus,
    activeStatus,
    imagePreset,
    flagMode,
  ]);

  function toggleFlag(flag: string) {
    setSelectedFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag],
    );
  }

  function clearFilters() {
    setQuery("");
    setSelectedFlags([]);
    setAnimalId("");
    setRelationshipType("");
    setVerificationStatus("");
    setActiveStatus("");
    setImagePreset("all");
    setFlagMode("any");
  }

  return (
    <>
      <section className="audit-filters">
        <div className="audit-filter-row">
          <label className="audit-field">
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="id, org, animal, url…"
            />
          </label>

          <label className="audit-field">
            <span>Animal</span>
            <select
              value={animalId}
              onChange={(e) => setAnimalId(e.target.value)}
            >
              <option value="">All animals</option>
              {animals.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.emoji} {a.name}
                </option>
              ))}
            </select>
          </label>

          <label className="audit-field">
            <span>Relationship</span>
            <select
              value={relationshipType}
              onChange={(e) => setRelationshipType(e.target.value)}
            >
              <option value="">All types</option>
              {relationshipTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="audit-field">
            <span>Verification</span>
            <select
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value)}
            >
              <option value="">All statuses</option>
              {verificationStatuses.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="audit-field">
            <span>Active</span>
            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </label>

          <label className="audit-field">
            <span>Image preset</span>
            <select
              value={imagePreset}
              onChange={(e) =>
                setImagePreset(
                  e.target.value as "all" | "problems" | "clean" | "favicon",
                )
              }
            >
              <option value="all">All images</option>
              <option value="problems">Problems only</option>
              <option value="favicon">Favicon-sourced</option>
              <option value="clean">Clean only</option>
            </select>
          </label>
        </div>

        <div className="audit-flag-toolbar">
          <div className="audit-flag-mode">
            <span>Flags match:</span>
            <button
              type="button"
              className={flagMode === "any" ? "on" : ""}
              onClick={() => setFlagMode("any")}
            >
              any
            </button>
            <button
              type="button"
              className={flagMode === "all" ? "on" : ""}
              onClick={() => setFlagMode("all")}
            >
              all
            </button>
          </div>
          <button type="button" className="audit-clear" onClick={clearFilters}>
            Clear filters
          </button>
        </div>

        <div className="legend">
          {["CLEAN", ...allFlags].map((flag) => {
            const selected = selectedFlags.includes(flag);
            const tone =
              flag === "NO_IMAGE"
                ? "bad"
                : ["REMOTE_ONLY", "FAVICON", "INACTIVE"].includes(flag)
                  ? "warn"
                  : flag === "CLEAN"
                    ? "ok"
                    : "";
            return (
              <button
                key={flag}
                type="button"
                className={`flag ${tone}${selected ? " selected" : ""}`}
                onClick={() => toggleFlag(flag)}
                aria-pressed={selected}
              >
                {flag}
              </button>
            );
          })}
        </div>

        <p className="meta audit-count">
          Showing {filtered.length} / {rows.length}
          {selectedFlags.length
            ? ` · flags (${flagMode}): ${selectedFlags.join(" + ")}`
            : ""}
        </p>
      </section>

      <div className="audit-grid">
        {filtered.map((row) => {
          const hasBad = row.flags.includes("NO_IMAGE");
          const hasWarn =
            !hasBad &&
            row.flags.some((f) =>
              ["REMOTE_ONLY", "FAVICON"].includes(f),
            );
          const img = row.imageSrc || row.remoteSrc;

          return (
            <article
              key={row.useId}
              id={row.useId}
              className={`audit-card${hasBad ? " has-bad" : hasWarn ? " has-warn" : ""}`}
            >
              {img ? (
                // Audit page: raw img so broken assets are obvious
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="audit-visual"
                  src={img}
                  alt={row.imageAlt}
                  loading="lazy"
                />
              ) : (
                <div className="audit-fallback" aria-hidden>
                  {row.emoji}
                </div>
              )}

              <div>
                <h2>
                  {row.emoji} {row.displayLabel}
                </h2>
                <p className="sub">
                  Animal: {row.animalName} ({row.animalId})
                </p>

                <dl>
                  <div>
                    <dt>id</dt>
                    <dd>{row.useId}</dd>
                  </div>
                  <div>
                    <dt>org</dt>
                    <dd>{row.organization}</dd>
                  </div>
                  {row.product ? (
                    <div>
                      <dt>product</dt>
                      <dd>{row.product}</dd>
                    </div>
                  ) : null}
                  {row.characterName ? (
                    <div>
                      <dt>character</dt>
                      <dd>{row.characterName}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>type</dt>
                    <dd>
                      {row.relationshipType} · {row.officialStatus} ·{" "}
                      {row.activeStatus}
                    </dd>
                  </div>
                  <div>
                    <dt>verify</dt>
                    <dd>{row.verificationStatus}</dd>
                  </div>
                  <div>
                    <dt>source</dt>
                    <dd>
                      <a
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.sourceUrl}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>img src</dt>
                    <dd>{row.imageSrc || "—"}</dd>
                  </div>
                  <div>
                    <dt>remote</dt>
                    <dd>
                      {row.remoteSrc ? (
                        <a
                          href={row.remoteSrc}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row.remoteSrc}
                        </a>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  {row.attribution ? (
                    <div>
                      <dt>attr</dt>
                      <dd>{row.attribution}</dd>
                    </div>
                  ) : null}
                </dl>

                <div className="audit-flags">
                  {row.flags.length ? (
                    row.flags.map((flag) => (
                      <button
                        key={flag}
                        type="button"
                        className={`flag${
                          flag === "NO_IMAGE"
                            ? " bad"
                            : ["REMOTE_ONLY", "FAVICON"].includes(flag)
                              ? " warn"
                              : ""
                        }`}
                        onClick={() => toggleFlag(flag)}
                      >
                        {flag}
                      </button>
                    ))
                  ) : (
                    <button
                      type="button"
                      className="flag ok"
                      onClick={() => toggleFlag("CLEAN")}
                    >
                      CLEAN
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="meta">No rows match these filters.</p>
      ) : null}
    </>
  );
}
