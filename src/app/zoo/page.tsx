import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ZooExplorer } from "@/components/zoo/ZooExplorer";
import { getAllAnimals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Wander through the enclosures",
  description:
    "Browse every Silicon Zoo animal by biology or tech habitat, filter available mascots, and sort by occupancy.",
};

export default function ZooPage() {
  const animals = getAllAnimals();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Silicon Zoo animals",
    numberOfItems: animals.length,
    itemListElement: animals.map((animal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: animal.name,
      url: `/animal/${animal.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="shell">
        <SiteHeader showBrowse={false} />
        <main className="section zoo-map">
          <div className="section-head">
            <div>
              <div className="eyebrow">THE FULL ZOO</div>
              <h3 style={{ marginTop: 18 }}>Wander through the enclosures</h3>
              <p className="section-sub">
                All our animals, organized by biology—or by the tech that adopted
                them.
              </p>
            </div>
          </div>
          <ZooExplorer animals={animals} />
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
