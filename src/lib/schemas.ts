import { z } from "zod";

export const relationshipTypeSchema = z.enum([
  "official_mascot",
  "animal_logo",
  "community_mascot",
  "animal_name",
  "historical",
  "hybrid_or_mythical",
]);

export const verificationStatusSchema = z.enum([
  "candidate",
  "partially_verified",
  "verified",
  "historical_verified",
  "disputed",
]);

export const animalClassSchema = z.enum([
  "mammals",
  "birds",
  "marine",
  "reptiles",
  "bugs",
]);

export const imageSchema = z
  .object({
    src: z.string().nullable(),
    remoteSrc: z.string().url().nullable().optional(),
    alt: z.string().min(1),
    attribution: z.string().optional(),
  })
  .nullable();

export const animalUseSchema = z.object({
  id: z.string().min(1),
  animalId: z.string().min(1),
  organization: z.string().min(1),
  product: z.string().optional(),
  characterName: z.string().optional(),
  relationshipType: relationshipTypeSchema,
  officialStatus: z.enum(["official", "unofficial", "unknown"]),
  activeStatus: z.enum(["active", "inactive"]),
  recognition: z.enum(["strong", "strong_niche", "niche", "minor"]),
  techHabitats: z.array(z.string()).min(1),
  sourceUrl: z.string().url(),
  sourceType: z.enum(["official", "community_primary", "secondary"]),
  verificationStatus: verificationStatusSchema,
  verifiedAt: z.string(),
  displayLabel: z.string().min(1),
  image: imageSchema,
});

export const animalSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  nameHe: z.string().optional(),
  aliases: z.array(z.string()).min(1),
  emoji: z.string().min(1),
  animalClass: animalClassSchema,
  accentColor: z.string().min(1),
  status: z.string().min(1),
  verdict: z.string().min(1),
  alternatives: z.array(z.string()),
  uses: z.array(z.string()),
  scoreOverride: z.number().min(0).max(10).optional(),
  scoreOverrideRationale: z.string().optional(),
  reviewStatus: verificationStatusSchema,
  lastReviewedAt: z.string(),
});

export const animalsSchema = z.array(animalSchema);
export const usesSchema = z.array(animalUseSchema);

export type RelationshipType = z.infer<typeof relationshipTypeSchema>;
export type VerificationStatus = z.infer<typeof verificationStatusSchema>;
export type AnimalClass = z.infer<typeof animalClassSchema>;
export type AnimalUse = z.infer<typeof animalUseSchema>;
export type Animal = z.infer<typeof animalSchema>;
