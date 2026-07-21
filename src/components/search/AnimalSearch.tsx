"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import type { EnrichedAnimal } from "@/lib/data";
import { searchAnimals, suggestAnimals } from "@/lib/search";
import { formatOccupancy } from "@/lib/score";
import { AnimalResult } from "@/components/animal/AnimalResult";
import { track } from "@/lib/analytics";
import { suggestResidentUrl } from "@/lib/github";

const POPULAR = ["penguin", "elephant", "capybara", "crab", "owl"];

type Props = {
  animals: EnrichedAnimal[];
  initialSlug?: string;
};

export function AnimalSearch({ animals, initialSlug }: Props) {
  const bySlug = useMemo(
    () => new Map(animals.map((animal) => [animal.slug, animal])),
    [animals],
  );
  const [query, setQuery] = useState(
    initialSlug ? bySlug.get(initialSlug)?.name || "" : "",
  );
  const [selected, setSelected] = useState<EnrichedAnimal | null>(
    initialSlug ? bySlug.get(initialSlug) || null : null,
  );
  const [ambiguous, setAmbiguous] = useState<EnrichedAnimal[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions = useMemo(() => {
    if (query.trim().length < 1) return [] as EnrichedAnimal[];
    return suggestAnimals(animals, query, 6)
      .map((animal) => bySlug.get(animal.slug))
      .filter((animal): animal is EnrichedAnimal => Boolean(animal));
  }, [animals, bySlug, query]);

  function choose(slug: string) {
    const animal = bySlug.get(slug);
    if (!animal) return;
    setQuery(animal.name);
    setSelected(animal);
    setAmbiguous([]);
    setNotFound(false);
    setActiveIndex(-1);
    track("animal_found", { animal: animal.slug, score: animal.occupancyScore });
  }

  function asEnriched(list: { slug: string }[]): EnrichedAnimal[] {
    return list
      .map((item) => bySlug.get(item.slug))
      .filter((animal): animal is EnrichedAnimal => Boolean(animal));
  }

  function runSearch(raw: string) {
    const hit = searchAnimals(animals, raw);
    track("animal_search", {
      query_kind: hit.kind,
      normalized: Boolean(raw.trim()),
    });

    switch (hit.kind) {
      case "empty":
        return;
      case "exact":
        choose(hit.animal.slug);
        return;
      case "ambiguous":
        setSelected(null);
        setAmbiguous(asEnriched(hit.animals));
        setNotFound(false);
        return;
      case "fuzzy":
        if (hit.animals.length === 1) {
          choose(hit.animals[0].slug);
          return;
        }
        setSelected(null);
        setAmbiguous(asEnriched(hit.animals));
        setNotFound(false);
        return;
      case "not_found":
        setSelected(null);
        setAmbiguous([]);
        setNotFound(true);
        track("animal_not_found");
        return;
      default: {
        const _exhaustive: never = hit;
        return _exhaustive;
      }
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      choose(suggestions[activeIndex].slug);
      return;
    }
    runSearch(query);
  }

  function surprise() {
    const animal = animals[Math.floor(Math.random() * animals.length)];
    track("random_clicked", { animal: animal.slug });
    choose(animal.slug);
  }

  return (
    <>
      <form className="search-wrap" id="search" onSubmit={onSubmit}>
        <span className="search-icon" aria-hidden>
          ⌕
        </span>
        <input
          className="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
            setNotFound(false);
          }}
          onKeyDown={(event) => {
            if (!suggestions.length) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((index) =>
                Math.min(index + 1, suggestions.length - 1),
              );
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((index) => Math.max(index - 1, 0));
            }
          }}
          autoComplete="off"
          placeholder="Try penguin, elephant, owl…"
          aria-label="Search for an animal"
          aria-autocomplete="list"
          aria-controls="animal-suggestions"
        />
        <button className="search-btn" type="submit">
          Check the zoo
        </button>
      </form>

      {suggestions.length && !selected ? (
        <ul className="suggestions" id="animal-suggestions" role="listbox">
          {suggestions.map((animal, index) => (
            <li key={animal.slug} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                data-active={index === activeIndex}
                onClick={() => choose(animal.slug)}
              >
                <span aria-hidden>{animal.emoji}</span>
                <span>{animal.name}</span>
                <span className="meta">
                  {formatOccupancy(animal.occupancyScore)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="quick">
        Popular searches:{" "}
        {POPULAR.map((slug) => (
          <button key={slug} type="button" onClick={() => choose(slug)}>
            {slug}
          </button>
        ))}
        <button type="button" onClick={surprise}>
          surprise me
        </button>
      </div>

      {ambiguous.length ? (
        <section className="empty show" aria-live="polite">
          <div className="big">🧭</div>
          <h2>A few animals match that name</h2>
          <p>Pick the enclosure you meant:</p>
          <div className="grid" style={{ marginTop: 20 }}>
            {ambiguous.map((animal) => (
              <button
                key={animal.slug}
                className="card"
                type="button"
                onClick={() => choose(animal.slug)}
              >
                <div className="card-emoji">{animal.emoji}</div>
                <div className="card-name">{animal.name}</div>
                <div className="card-meta">
                  {formatOccupancy(animal.occupancyScore)} occupied
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {notFound ? (
        <section className="empty show" aria-live="polite">
          <div className="big">🔭</div>
          <h2>Not in our zoo. Yet.</h2>
          <p>
            We couldn&apos;t spot that animal among the server racks. That might
            mean it&apos;s gloriously available — or our zookeeper needs a coffee.
          </p>
          <p style={{ marginTop: 16 }}>
            <a
              href={suggestResidentUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("suggestion_clicked", { source: "not_found" })}
            >
              Suggest a resident
            </a>
            {" · "}
            <Link href="/zoo">Browse the full zoo</Link>
          </p>
        </section>
      ) : null}

      {selected ? (
        <AnimalResult animal={selected} onSelect={choose} />
      ) : null}
    </>
  );
}
