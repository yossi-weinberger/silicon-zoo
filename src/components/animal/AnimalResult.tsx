"use client";

import Link from "next/link";
import type { EnrichedAnimal } from "@/lib/data";
import { formatOccupancy } from "@/lib/score";
import { ResidentCard } from "@/components/ResidentCard";
import { track } from "@/lib/analytics";

type Props = {
  animal: EnrichedAnimal;
  onSelect?: (slug: string) => void;
  showShare?: boolean;
};

export function AnimalResult({ animal, onSelect, showShare = true }: Props) {
  const percent = Math.min(100, Math.round(animal.occupancyScore * 10));

  async function share() {
    const url = `${window.location.origin}/animal/${animal.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      track("share_clicked", { animal: animal.slug, method: "clipboard" });
      alert("Link copied. Share the enclosure.");
    } catch {
      track("share_clicked", { animal: animal.slug, method: "failed" });
    }
  }

  return (
    <section className="result show" aria-live="polite">
      <div className="animal-panel" style={{ background: animal.accentColor }}>
        <div className="animal-emoji" aria-hidden>
          {animal.emoji}
        </div>
        <div>
          <div className="score-label">Zoo occupancy</div>
          <div className="meter">
            <div className="meter-fill" style={{ width: `${percent}%` }} />
          </div>
          <div className="score-number">
            {formatOccupancy(animal.occupancyScore)} occupied
          </div>
        </div>
      </div>
      <div className="result-copy">
        <span className="status">{animal.status}</span>
        <h2>
          <Link href={`/animal/${animal.slug}`}>{animal.name}</Link>
        </h2>
        <p className="verdict">{animal.verdict}</p>
        {animal.residents.length ? (
          <>
            <div className="used-title">Spotted at</div>
            <div className="brands">
              {animal.residents.map((use) => (
                <ResidentCard
                  key={use.id}
                  use={use}
                  emoji={animal.emoji}
                  onNavigate={() =>
                    track("brand_source_clicked", {
                      animal: animal.slug,
                      use: use.id,
                    })
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <p className="verdict">
            No dominant tech resident found. That might mean the enclosure is
            still roomy — not that it is legally free.
          </p>
        )}
        {animal.alternatives.length ? (
          <div className="alternatives">
            Try a nearby enclosure:{" "}
            {animal.alternatives.map((slug, index) => (
              <span key={slug}>
                {index > 0 ? " · " : null}
                {onSelect ? (
                  <button type="button" onClick={() => onSelect(slug)}>
                    {slug}
                  </button>
                ) : (
                  <Link href={`/animal/${slug}`}>{slug}</Link>
                )}
              </span>
            ))}
          </div>
        ) : null}
        {showShare ? (
          <div className="result-actions">
            <button className="pill" type="button" onClick={share}>
              Copy share link
            </button>
            <Link className="pill" href={`/animal/${animal.slug}`}>
              Open animal page
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
