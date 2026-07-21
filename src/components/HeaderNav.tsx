"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { EnrichedAnimal } from "@/lib/data";
import { track } from "@/lib/analytics";

type Props = {
  animals: EnrichedAnimal[];
  showBrowse?: boolean;
};

export function HeaderNav({ animals, showBrowse = true }: Props) {
  const router = useRouter();

  return (
    <nav className="nav" aria-label="Primary">
      {showBrowse ? (
        <Link className="pill pill-optional" href="/zoo">
          Browse the zoo
        </Link>
      ) : null}
      <Link className="pill pill-optional" href="/about">
        About the zoo
      </Link>
      <button
        className="random"
        type="button"
        onClick={() => {
          const animal = animals[Math.floor(Math.random() * animals.length)];
          track("random_clicked", { animal: animal.slug });
          router.push(`/animal/${animal.slug}`);
        }}
      >
        Surprise me
      </button>
    </nav>
  );
}
