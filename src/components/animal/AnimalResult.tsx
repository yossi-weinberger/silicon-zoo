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
  /** Hide "Open animal page" when already on `/animal/[slug]`. */
  showOpenPage?: boolean;
};

export function AnimalResult({
  animal,
  onSelect,
  showShare = true,
  showOpenPage = true,
}: Props) {
  const percent = Math.min(100, Math.round(animal.occupancyScore * 10));

  const taken = animal.residents.length > 0;

  function shareText() {
    const name = animal.name.toLowerCase();
    if (taken) {
      const owner = animal.residents[0].organization;
      return `I was going to build a startup that sells for millions, but the ${name} ${animal.emoji} is already taken (thanks, ${owner}). Calling the whole thing off.`;
    }
    return `Friends, I'm officially claiming the ${name} ${animal.emoji} for my startup. Nobody touch it.`;
  }

  function pageUrl() {
    return `${window.location.origin}/animal/${animal.slug}`;
  }

  function shareOnX() {
    const intent = `https://x.com/intent/post?text=${encodeURIComponent(shareText())}&url=${encodeURIComponent(pageUrl())}`;
    track("share_clicked", { animal: animal.slug, method: "x" });
    window.open(intent, "_blank", "noopener");
  }

  function shareOnLinkedIn() {
    const intent = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl())}`;
    track("share_clicked", { animal: animal.slug, method: "linkedin" });
    window.open(intent, "_blank", "noopener");
  }

  async function share() {
    const url = pageUrl();
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText(), url });
        track("share_clicked", { animal: animal.slug, method: "native" });
        return;
      } catch {
        // user closed the sheet — fall through to clipboard
      }
    }
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
        {showShare || showOpenPage ? (
          <div className="result-actions">
            {showShare ? (
              <>
                <button
                  className="pill"
                  type="button"
                  onClick={shareOnX}
                  aria-label={`Post about the ${animal.name} on X`}
                >
                  Post on 𝕏
                </button>
                <button
                  className="pill"
                  type="button"
                  onClick={shareOnLinkedIn}
                  aria-label={`Share the ${animal.name} on LinkedIn`}
                >
                  Share on LinkedIn
                </button>
                <button className="pill" type="button" onClick={share}>
                  Copy share link
                </button>
              </>
            ) : null}
            {showOpenPage ? (
              <Link className="pill" href={`/animal/${animal.slug}`}>
                Open animal page
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
