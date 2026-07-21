import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimalResult } from "@/components/animal/AnimalResult";
import { getAllAnimals, getAnimalBySlug } from "@/lib/data";
import { formatOccupancy } from "@/lib/score";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllAnimals().map((animal) => ({ slug: animal.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const animal = getAnimalBySlug(slug);
  if (!animal) return { title: "Animal not found" };

  const residents = animal.residents
    .slice(0, 3)
    .map((use) => use.organization)
    .join(", ");

  const title = residents
    ? `${animal.name} in tech: ${residents} — ${formatOccupancy(animal.occupancyScore)} occupied`
    : `${animal.name} in tech — ${formatOccupancy(animal.occupancyScore)} occupied`;

  return {
    title: animal.name,
    description: title,
    openGraph: {
      title,
      description: animal.verdict,
      url: `/animal/${animal.slug}`,
    },
  };
}

export default async function AnimalPage({ params }: Props) {
  const { slug } = await params;
  const animal = getAnimalBySlug(slug);
  if (!animal) notFound();

  return (
    <>
      <div className="shell animal-page">
        <SiteHeader />
        <main className="page-hero">
          <Link href="/zoo" className="pill">
            ← Back to the zoo
          </Link>
          <AnimalResult animal={animal} showShare showOpenPage={false} />
          <div className="disclaimer-box">
            “Taken” means someone in tech already uses it. We’re not lawyers.
            We’re barely zoologists.
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
