import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { suggestResidentUrl } from "@/lib/github";

export const metadata: Metadata = {
  title: "About the zoo",
  description:
    "How Silicon Zoo scores occupancy, sources mascot relationships, and why this is not legal advice.",
};

export default function AboutPage() {
  return (
    <>
      <div className="shell">
        <SiteHeader />
        <main className="page-hero prose">
          <div className="eyebrow">METHOD NOTES</div>
          <h1>About the zoo</h1>
          <p>
            Silicon Zoo is a playful, research-minded registry of animals already
            living in tech logos, mascots, product names, and community lore.
          </p>

          <div className="disclaimer-box">
            “Taken” means someone in tech already uses it. We’re not lawyers.
            We’re barely zoologists.
          </div>

          <h2>What this is</h2>
          <p>
            A discovery site for founders, designers, developers, and curious
            builders. Search an animal, see who got there first, and wander the
            enclosures for inspiration.
          </p>

          <h2>What this is not</h2>
          <ul>
            <li>Not trademark clearance or legal advice</li>
            <li>Not a complete index of every animal-branded company</li>
            <li>Not a scientific zoology project</li>
            <li>Not a SaaS product, CRM, or subscription service</li>
          </ul>

          <h2>Zoo Occupancy</h2>
          <p>
            Scores are shown on a 0–10 cultural scale. They estimate how strongly
            an animal already feels claimed by technology — not whether you may
            use it.
          </p>
          <ul>
            <li>0.0–1.9 Wide open</li>
            <li>2.0–3.9 A few sightings</li>
            <li>4.0–5.9 Getting busy</li>
            <li>6.0–7.9 Crowded</li>
            <li>8.0–9.4 Very crowded</li>
            <li>9.5–10 Step away</li>
          </ul>
          <p>
            Baseline scores are derived from relationship types such as official
            mascots, animal logos, community mascots, animal names, historical
            uses, and hybrids. Editorial overrides keep famous cases honest when
            the math alone understates the vibe.
          </p>

          <h2>Sources</h2>
          <p>
            We prefer official brand pages, trademark policies, project
            repositories, and primary community sources for unofficial mascots.
            Wikipedia can seed research, but it is not enough on its own for a
            verified relationship.
          </p>

          <h2>Suggest a resident</h2>
          <p>
            Spot a missing animal or brand?{" "}
            <a href={suggestResidentUrl()} target="_blank" rel="noopener noreferrer">
              Open a GitHub issue
            </a>
            . Please include a source URL. We do not invent companies or mascot
            relationships.
          </p>

          <p>
            <Link href="/">Back to search</Link> · <Link href="/zoo">Browse the zoo</Link>
          </p>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
