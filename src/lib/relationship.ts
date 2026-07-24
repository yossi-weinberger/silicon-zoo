import type { AnimalUse } from "./schemas";

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
