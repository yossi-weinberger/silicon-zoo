"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { EnrichedAnimal } from "@/lib/data";
import { formatOccupancy } from "@/lib/score";
import { ResidentCard } from "@/components/ResidentCard";
import { track } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site";

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

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function showToast(message: string) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function shareText() {
    const name = animal.name.toLowerCase();
    const joke = taken
      ? `I was going to build a startup that sells for millions, but the ${name} ${animal.emoji} is already taken (thanks, ${animal.residents[0].organization}). Calling the whole thing off.`
      : `Friends, I'm officially claiming the ${name} ${animal.emoji} for my startup. Nobody touch it.`;
    return `${joke}\n\nWant to check if your animal is still available — or already claimed by a tech company? Check here →`;
  }

  function shareOnX() {
    const intent = `https://x.com/intent/post?text=${encodeURIComponent(shareText())}&url=${encodeURIComponent(SITE_URL)}`;
    track("share_clicked", { animal: animal.slug, method: "x" });
    window.open(intent, "_blank", "noopener");
  }

  async function shareOnLinkedIn() {
    track("share_clicked", { animal: animal.slug, method: "linkedin" });
    // LinkedIn dropped prefilled post text (anti-spam), so hand it over via clipboard
    try {
      await navigator.clipboard.writeText(shareText());
      showToast("📋 Post text copied — opening LinkedIn, just paste it in…");
      // ponytail: 1.1s pause so the toast lands before the new tab steals focus;
      // longer risks the popup blocker (transient activation expires)
      await new Promise((resolve) => setTimeout(resolve, 1100));
    } catch {
      // clipboard unavailable — the dialog still opens with the link preview
    }
    const intent = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`;
    window.open(intent, "_blank", "noopener");
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText(), url: SITE_URL });
        track("share_clicked", { animal: animal.slug, method: "native" });
        return;
      } catch {
        // user closed the sheet — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/animal/${animal.slug}`,
      );
      track("share_clicked", { animal: animal.slug, method: "clipboard" });
      showToast("🔗 Link copied — share the enclosure");
    } catch {
      track("share_clicked", { animal: animal.slug, method: "failed" });
    }
  }

  return (
    <section className="result show" aria-live="polite">
      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}
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
                  <svg
                    aria-hidden
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ marginInlineEnd: 6 }}
                  >
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  LinkedIn
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
