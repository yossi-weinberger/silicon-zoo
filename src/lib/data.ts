import animalsJson from "@/data/animals.json";
import usesJson from "@/data/uses.json";
import {
  animalsSchema,
  usesSchema,
  type Animal,
  type AnimalClass,
  type AnimalUse,
} from "./schemas";
import { resolveOccupancyScore } from "./score";

export const BIOLOGY_GROUPS = [
  { id: "mammals", label: "Mammals" },
  { id: "birds", label: "Birds" },
  { id: "marine", label: "Marine life" },
  { id: "reptiles", label: "Reptiles & amphibians" },
  { id: "bugs", label: "Bugs & tiny beasts" },
] as const;

export const TECH_HABITAT_GROUPS = [
  { id: "code", label: "Code & open source" },
  { id: "data", label: "Data enclosure" },
  { id: "apps", label: "Apps & web" },
  { id: "tools", label: "Tech companies & tools" },
  { id: "available", label: "Available for adoption" },
] as const;

const animals = animalsSchema.parse(animalsJson);
const uses = usesSchema.parse(usesJson);

const usesById = new Map(uses.map((use) => [use.id, use]));
const animalsBySlug = new Map(animals.map((animal) => [animal.slug, animal]));

export type EnrichedAnimal = Animal & {
  residents: AnimalUse[];
  occupancyScore: number;
  derivedScore: number;
  scoreOverridden: boolean;
};

function enrich(animal: Animal): EnrichedAnimal {
  const residents = animal.uses
    .map((id) => usesById.get(id))
    .filter((use): use is AnimalUse => Boolean(use));
  const { score, derived, overridden } = resolveOccupancyScore(
    residents,
    animal.scoreOverride,
  );
  return {
    ...animal,
    residents,
    occupancyScore: score,
    derivedScore: derived,
    scoreOverridden: overridden,
  };
}

const enriched = animals.map(enrich);

export function getAllAnimals(): EnrichedAnimal[] {
  return enriched;
}

export function getAnimalBySlug(slug: string): EnrichedAnimal | undefined {
  const animal = animalsBySlug.get(slug);
  return animal ? enrich(animal) : undefined;
}

export function getCrowdedAnimals(limit = 8): EnrichedAnimal[] {
  return [...enriched]
    .sort((a, b) => b.occupancyScore - a.occupancyScore)
    .slice(0, limit);
}

export function getAvailableAnimals(): EnrichedAnimal[] {
  return enriched.filter((animal) => animal.residents.length === 0);
}

export function getAlternativeAnimals(animal: EnrichedAnimal): EnrichedAnimal[] {
  return animal.alternatives
    .map((slug) => getAnimalBySlug(slug))
    .filter((item): item is EnrichedAnimal => Boolean(item));
}

export function biologyLabel(animalClass: AnimalClass): string {
  return BIOLOGY_GROUPS.find((group) => group.id === animalClass)?.label ?? animalClass;
}

export function primaryTechHabitat(animal: EnrichedAnimal): string {
  if (!animal.residents.length) return "available";
  const counts = new Map<string, number>();
  for (const use of animal.residents) {
    for (const habitat of use.techHabitats) {
      const key =
        habitat === "open_source" || habitat === "code"
          ? "code"
          : habitat === "web"
            ? "apps"
            : habitat;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const top = ranked[0]?.[0];
  if (top === "data" || top === "apps" || top === "code") return top;
  return "tools";
}

export function groupAnimals(
  mode: "biology" | "tech",
  list: EnrichedAnimal[] = enriched,
): { id: string; label: string; animals: EnrichedAnimal[] }[] {
  const order =
    mode === "biology"
      ? BIOLOGY_GROUPS.map((group) => ({ id: group.id, label: group.label }))
      : TECH_HABITAT_GROUPS.map((group) => ({ id: group.id, label: group.label }));

  return order
    .map((group) => ({
      ...group,
      animals: list
        .filter((animal) =>
          mode === "biology"
            ? animal.animalClass === group.id
            : primaryTechHabitat(animal) === group.id,
        )
        .sort((a, b) => b.occupancyScore - a.occupancyScore),
    }))
    .filter((group) => group.animals.length > 0);
}

export function relationshipLabel(type: AnimalUse["relationshipType"]): string {
  switch (type) {
    case "official_mascot":
      return "Official mascot";
    case "animal_logo":
      return "Animal logo";
    case "community_mascot":
      return "Community mascot";
    case "animal_name":
      return "Animal name";
    case "historical":
      return "Historical";
    case "hybrid_or_mythical":
      return "Hybrid / mythical";
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}
