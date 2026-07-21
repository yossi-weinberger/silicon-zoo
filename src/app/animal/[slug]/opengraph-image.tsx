import { ImageResponse } from "next/og";
import { getAnimalBySlug, getAllAnimals } from "@/lib/data";
import { formatOccupancy } from "@/lib/score";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllAnimals().map((animal) => ({ slug: animal.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const animal = getAnimalBySlug(slug);
  if (!animal) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "#F6F0DF",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Silicon Zoo
        </div>
      ),
      { ...size },
    );
  }

  const residents = animal.residents
    .slice(0, 3)
    .map((use) => use.organization)
    .join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F0DF",
          color: "#17251D",
          padding: 56,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
          Silicon Zoo
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <div
            style={{
              width: 180,
              height: 180,
              border: "4px solid #20362A",
              borderRadius: 28,
              background: animal.accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 110,
            }}
          >
            {animal.emoji}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: -3,
              }}
            >
              {animal.name}
            </div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
              {formatOccupancy(animal.occupancyScore)} occupied
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "#667068",
                maxWidth: 700,
              }}
            >
              {residents || "No dominant tech resident found"}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#667068" }}>
          Every tech company wants a cute animal.
        </div>
      </div>
    ),
    { ...size },
  );
}
