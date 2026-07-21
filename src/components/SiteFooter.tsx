"use client";

import Link from "next/link";
import { suggestResidentUrl } from "@/lib/github";
import { track } from "@/lib/analytics";

export function SiteFooter() {
  return (
    <div className="shell">
      <footer>
        <div>
          © 2026 Silicon Zoo. Made for curious builders.{" "}
          <Link href="/about">About / Method</Link>
          {" · "}
          <a
            href={suggestResidentUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("suggestion_clicked", { source: "footer" })}
          >
            Suggest a resident
          </a>
        </div>
        <div className="footer-joke">
          * No animals were benchmarked in the making of this website.
        </div>
      </footer>
    </div>
  );
}
