import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { animalsSchema, usesSchema } from "../src/lib/schemas";
import { getAllAnimals } from "../src/lib/data";

const root = path.resolve(__dirname, "..");

describe("dataset integrity", () => {
  const animals = animalsSchema.parse(
    JSON.parse(fs.readFileSync(path.join(root, "src/data/animals.json"), "utf8")),
  );
  const uses = usesSchema.parse(
    JSON.parse(fs.readFileSync(path.join(root, "src/data/uses.json"), "utf8")),
  );

  it("has at least 100 unique animals", () => {
    expect(animals.length).toBeGreaterThanOrEqual(100);
    const ids = animals.map((animal) => animal.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(animals.map((animal) => animal.slug)).size).toBe(animals.length);
  });

  it("keeps use references valid", () => {
    const animalIds = new Set(animals.map((animal) => animal.id));
    const useIds = new Set(uses.map((use) => use.id));
    for (const use of uses) {
      expect(animalIds.has(use.animalId)).toBe(true);
      expect(use.sourceUrl.startsWith("http")).toBe(true);
    }
    for (const animal of animals) {
      for (const useId of animal.uses) {
        expect(useIds.has(useId)).toBe(true);
      }
      for (const alt of animal.alternatives) {
        expect(animalIds.has(alt)).toBe(true);
      }
    }
  });

  it("has no ambiguous exact aliases", () => {
    const aliasMap = new Map<string, string[]>();
    for (const animal of animals) {
      for (const alias of animal.aliases) {
        const key = alias.toLowerCase();
        const list = aliasMap.get(key) || [];
        list.push(animal.id);
        aliasMap.set(key, list);
      }
    }
    const ambiguous = [...aliasMap.entries()].filter(([, ids]) => ids.length > 1);
    expect(ambiguous).toEqual([]);
  });

  it("keeps local asset paths real when present", () => {
    for (const use of uses) {
      const src = use.image?.src;
      if (!src) continue;
      const file = path.join(root, "public", src.replace(/^\//, ""));
      expect(fs.existsSync(file), `missing ${src}`).toBe(true);
    }
  });

  it("exposes enriched scores in range", () => {
    for (const animal of getAllAnimals()) {
      expect(animal.occupancyScore).toBeGreaterThanOrEqual(0);
      expect(animal.occupancyScore).toBeLessThanOrEqual(10);
    }
  });
});
