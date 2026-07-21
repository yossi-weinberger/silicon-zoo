import { describe, expect, it } from "vitest";
import { findExactMatches, normalizeQuery, searchAnimals } from "../src/lib/search";
import type { Animal } from "../src/lib/schemas";

const animals: Animal[] = [
  {
    id: "gazelle",
    slug: "gazelle",
    name: "Gazelle",
    aliases: ["gazelle", "צבי"],
    emoji: "🦌",
    animalClass: "mammals",
    accentColor: "#f4cc5d",
    status: "Fast",
    verdict: "Fast",
    alternatives: [],
    uses: [],
    reviewStatus: "candidate",
    lastReviewedAt: "2026-07-20",
  },
  {
    id: "antelope",
    slug: "antelope",
    name: "Antelope",
    aliases: ["antelope", "אנטילופה"],
    emoji: "🦌",
    animalClass: "mammals",
    accentColor: "#f4cc5d",
    status: "Leaping",
    verdict: "Leaping",
    alternatives: [],
    uses: [],
    reviewStatus: "candidate",
    lastReviewedAt: "2026-07-20",
  },
  {
    id: "penguin",
    slug: "penguin",
    name: "Penguin",
    aliases: ["penguin", "פינגווין"],
    emoji: "🐧",
    animalClass: "birds",
    accentColor: "#cbea77",
    status: "Taken",
    verdict: "Linux",
    alternatives: [],
    uses: [],
    reviewStatus: "verified",
    lastReviewedAt: "2026-07-20",
  },
];

describe("search", () => {
  it("normalizes punctuation", () => {
    expect(normalizeQuery(" Penguin! ")).toBe("penguin");
  });

  it("matches English and Hebrew exact aliases", () => {
    expect(findExactMatches(animals, "penguin")[0]?.id).toBe("penguin");
    expect(findExactMatches(animals, "פינגווין")[0]?.id).toBe("penguin");
  });

  it("keeps צבי unique after antelope cleanup", () => {
    const hit = searchAnimals(animals, "צבי");
    expect(hit.kind).toBe("exact");
    if (hit.kind === "exact") expect(hit.animal.id).toBe("gazelle");
  });

  it("returns not_found for unknown animals", () => {
    expect(searchAnimals(animals, "unicorn-dragon-xyz").kind).toBe("not_found");
  });

  it("returns empty for blank queries", () => {
    expect(searchAnimals(animals, "   ").kind).toBe("empty");
  });
});
