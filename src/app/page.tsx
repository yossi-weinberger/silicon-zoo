import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimalSearch } from "@/components/search/AnimalSearch";
import { getAllAnimals, getCrowdedAnimals } from "@/lib/data";
import { formatOccupancy } from "@/lib/score";

export default function HomePage() {
  const animals = getAllAnimals();
  const crowded = getCrowdedAnimals(8);

  return (
    <>
      <div className="shell">
        <SiteHeader />
        <main>
          <section className="hero">
            <div className="eyebrow">● THE UNOFFICIAL TECH ANIMAL REGISTRY</div>
            <h1>
              Find your company&apos;s
              <br />
              <span className="accent">spirit animal.</span>
            </h1>
            <p className="tagline">
              Every tech company wants a cute animal.
              <br />
              <span>Most of the good ones are already taken.</span>
            </p>
            <AnimalSearch animals={animals} />
          </section>

          <section id="crowded" className="section">
            <div className="section-head">
              <div>
                <h3>The crowded enclosures</h3>
                <p className="section-sub">
                  The animals tech simply refuses to leave alone.
                </p>
              </div>
              <Link className="pill" href="/zoo">
                Wander the full zoo
              </Link>
            </div>
            <div className="grid">
              {crowded.map((animal) => (
                <Link
                  key={animal.slug}
                  className="card"
                  href={`/animal/${animal.slug}`}
                >
                  <div className="card-emoji">{animal.emoji}</div>
                  <div className="card-name">{animal.name}</div>
                  <div className="card-meta">
                    {formatOccupancy(animal.occupancyScore)} occupied ·{" "}
                    {animal.residents.length} sighting
                    {animal.residents.length === 1 ? "" : "s"}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      <section className="how">
        <div className="shell how-inner">
          <div>
            <div className="eyebrow">HOW IT WORKS</div>
            <h3>A highly scientific process.*</h3>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <div>
                <h4>Name your dream animal</h4>
                <p>
                  The one your brand strategist called “approachable, but
                  disruptive.”
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div>
                <h4>We check the enclosures</h4>
                <p>
                  Against our hand-fed list of mascots, logos and suspiciously
                  animal-shaped brands.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div>
                <h4>Ignore us and use it anyway</h4>
                <p>
                  We&apos;re not the mascot police. We are barely zoologists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
