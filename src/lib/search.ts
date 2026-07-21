import Fuse from "fuse.js";
import type { Animal } from "./schemas";

export function normalizeQuery(value: string): string {
  return value.toLowerCase().trim().replace(/[?!.,]/g, "");
}

export type SearchHit =
  | { kind: "exact"; animal: Animal }
  | { kind: "ambiguous"; animals: Animal[] }
  | { kind: "fuzzy"; animals: Animal[] }
  | { kind: "empty" }
  | { kind: "not_found" };

export function findExactMatches(animals: Animal[], query: string): Animal[] {
  const n = normalizeQuery(query);
  if (!n) return [];
  return animals.filter((animal) =>
    animal.aliases.some((alias) => normalizeQuery(alias) === n),
  );
}

export function suggestAnimals(
  animals: Animal[],
  query: string,
  limit = 8,
): Animal[] {
  const n = normalizeQuery(query);
  if (!n) return [];

  const prefix = animals.filter((animal) =>
    animal.aliases.some(
      (alias) =>
        normalizeQuery(alias).startsWith(n) ||
        normalizeQuery(alias).includes(n),
    ),
  );

  if (prefix.length) {
    return prefix.slice(0, limit);
  }

  const fuse = new Fuse(animals, {
    keys: [
      { name: "name", weight: 0.5 },
      { name: "aliases", weight: 0.4 },
      { name: "nameHe", weight: 0.3 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  });

  return fuse.search(n, { limit }).map((result) => result.item);
}

export function searchAnimals(animals: Animal[], query: string): SearchHit {
  const trimmed = query.trim();
  if (!trimmed) return { kind: "empty" };

  const exact = findExactMatches(animals, trimmed);
  if (exact.length === 1) return { kind: "exact", animal: exact[0] };
  if (exact.length > 1) return { kind: "ambiguous", animals: exact };

  const fuzzy = suggestAnimals(animals, trimmed, 5);
  if (!fuzzy.length) return { kind: "not_found" };
  if (fuzzy.length === 1) return { kind: "fuzzy", animals: fuzzy };
  return { kind: "fuzzy", animals: fuzzy };
}
