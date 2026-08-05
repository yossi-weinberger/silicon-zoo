import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { suggestResidentUrl } from "@/lib/github";

export default function NotFound() {
  return (
    <>
      <div className="shell">
        <SiteHeader />
        <main className="page-hero notfound">
          <div className="eyebrow">ENCLOSURE 404</div>
          <h1>This cage is empty.</h1>
          <p className="notfound-lede">
            The animal you were looking for has escaped, been acquired, or
            pivoted to stealth mode. Our chameleon insists it has been here the
            whole time.
          </p>

          <div className="notfound-cage" aria-hidden="true">
            <div className="notfound-cage-bars">
              <span className="notfound-tumbleweed">🐾 🐾 🐾</span>
            </div>
            <div className="notfound-plaque">
              <strong>INVISIBLE CHAMELEON</strong>
              <span>
                Definitely in there. Probably. 404 visitors have failed to spot
                it so far — please do not tap the glass, it hates that.
              </span>
            </div>
          </div>

          <div className="notfound-actions">
            <Link className="pill" href="/">
              🔍 Back to search
            </Link>
            <Link className="pill" href="/zoo">
              🗺️ Wander the zoo
            </Link>
            <a
              className="pill"
              href={suggestResidentUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              📋 Report a missing animal
            </a>
          </div>

          <p className="notfound-sightings">
            Recent escapees spotted nearby:{" "}
            <Link href="/animal/chameleon">the chameleon</Link> (unconfirmed),{" "}
            <Link href="/animal/dodo">the dodo</Link> (unlikely), and{" "}
            <Link href="/animal/daemon">the daemon</Link> (it never left).
          </p>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
