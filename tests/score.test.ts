import { describe, expect, it } from "vitest";
import {
  deriveOccupancyScore,
  formatOccupancy,
  resolveOccupancyScore,
} from "../src/lib/score";
import type { AnimalUse } from "../src/lib/schemas";

function use(partial: Partial<AnimalUse> & Pick<AnimalUse, "relationshipType">): AnimalUse {
  return {
    id: "x",
    animalId: "a",
    organization: "Org",
    officialStatus: "official",
    activeStatus: "active",
    recognition: "strong",
    techHabitats: ["code"],
    sourceUrl: "https://example.com",
    sourceType: "official",
    verificationStatus: "verified",
    verifiedAt: "2026-07-20",
    displayLabel: "Org",
    image: null,
    ...partial,
  };
}

describe("occupancy scoring", () => {
  it("returns 0 with no uses", () => {
    expect(deriveOccupancyScore([])).toBe(0);
  });

  it("scores an iconic official mascot highly", () => {
    const score = deriveOccupancyScore([
      use({ relationshipType: "official_mascot", recognition: "strong" }),
    ]);
    expect(score).toBeGreaterThanOrEqual(4);
    expect(score).toBeLessThanOrEqual(10);
  });

  it("caps at 10", () => {
    const score = deriveOccupancyScore([
      use({ id: "1", relationshipType: "official_mascot" }),
      use({ id: "2", relationshipType: "animal_logo" }),
      use({ id: "3", relationshipType: "animal_name" }),
      use({ id: "4", relationshipType: "community_mascot" }),
      use({ id: "5", relationshipType: "hybrid_or_mythical" }),
    ]);
    expect(score).toBeLessThanOrEqual(10);
  });

  it("honors editorial overrides", () => {
    const result = resolveOccupancyScore(
      [use({ relationshipType: "animal_name" })],
      9.7,
    );
    expect(result.score).toBe(9.7);
    expect(result.overridden).toBe(true);
  });

  it("formats with one decimal", () => {
    expect(formatOccupancy(9.7)).toBe("9.7/10");
    expect(formatOccupancy(8)).toBe("8.0/10");
  });
});
