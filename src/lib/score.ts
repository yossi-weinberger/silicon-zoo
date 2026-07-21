import type { AnimalUse, RelationshipType } from "./schemas";

const RELATIONSHIP_POINTS: Record<RelationshipType, number> = {
  official_mascot: 4,
  animal_logo: 3,
  community_mascot: 2.5,
  animal_name: 2,
  hybrid_or_mythical: 2.5,
  historical: 0.5,
};

const RECOGNITION_BONUS = {
  strong: 1,
  strong_niche: 0.5,
  niche: 0.2,
  minor: 0,
} as const;

export function scoreUse(use: AnimalUse): number {
  const base = RELATIONSHIP_POINTS[use.relationshipType];
  if (use.relationshipType === "historical") {
    return Math.min(0.8, base + RECOGNITION_BONUS[use.recognition] * 0.3);
  }
  return base;
}

/** Derived occupancy on the 0–10 display scale. */
export function deriveOccupancyScore(uses: AnimalUse[]): number {
  if (!uses.length) return 0;
  const ranked = [...uses].sort((a, b) => scoreUse(b) - scoreUse(a));
  let total = scoreUse(ranked[0]);
  for (const use of ranked.slice(1)) {
    const extra =
      use.relationshipType === "historical"
        ? Math.min(0.8, 0.2 + RECOGNITION_BONUS[use.recognition] * 0.3)
        : Math.min(1, 0.3 + RECOGNITION_BONUS[use.recognition] * 0.4);
    total += extra;
  }
  return Math.min(10, Number(total.toFixed(1)));
}

export function resolveOccupancyScore(
  uses: AnimalUse[],
  override?: number,
): { score: number; derived: number; overridden: boolean } {
  const derived = deriveOccupancyScore(uses);
  if (typeof override === "number") {
    return { score: Number(override.toFixed(1)), derived, overridden: true };
  }
  return { score: derived, derived, overridden: false };
}

export function formatOccupancy(score: number): string {
  const text = score.toFixed(1).replace(/\.0$/, ".0");
  return `${text}/10`;
}

export function occupancyBand(score: number): string {
  if (score >= 9.5) return "Step away";
  if (score >= 8.0) return "Very crowded";
  if (score >= 6.0) return "Crowded";
  if (score >= 4.0) return "Getting busy";
  if (score >= 2.0) return "A few sightings";
  return "Wide open";
}

export function occupancyMeterColor(score: number): string {
  if (score > 8) return "#f28c52";
  if (score > 4.5) return "#f4cc5d";
  return "#cbea77";
}
