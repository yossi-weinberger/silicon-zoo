"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EnrichedAnimal } from "@/lib/data";
import { groupAnimals } from "@/lib/data";
import { formatOccupancy, occupancyMeterColor } from "@/lib/score";
import { suggestAnimals } from "@/lib/search";
import { track } from "@/lib/analytics";

type Props = {
  animals: EnrichedAnimal[];
};

type SortKey = "score" | "name" | "brands";

export function ZooExplorer({ animals }: Props) {
  const [mode, setMode] = useState<"biology" | "tech">("biology");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("score");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = availableOnly
      ? animals.filter((animal) => animal.residents.length === 0)
      : animals;

    if (query.trim()) {
      const hits = new Set(suggestAnimals(animals, query, 100).map((a) => a.slug));
      list = list.filter((animal) => hits.has(animal.slug));
    }

    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "brands") return b.residents.length - a.residents.length;
      return b.occupancyScore - a.occupancyScore;
    });
    return sorted;
  }, [animals, availableOnly, query, sort]);

  const groups = useMemo(() => groupAnimals(mode, filtered), [mode, filtered]);

  return (
    <div>
      <div className="map-toolbar">
        <div className="switcher" role="group" aria-label="Zoo grouping">
          <button
            type="button"
            className={mode === "biology" ? "active" : undefined}
            onClick={() => {
              setMode("biology");
              track("filter_changed", { filter: "mode", value: "biology" });
            }}
          >
            By animal class
          </button>
          <button
            type="button"
            className={mode === "tech" ? "active" : undefined}
            onClick={() => {
              setMode("tech");
              track("filter_changed", { filter: "mode", value: "tech" });
            }}
          >
            By tech habitat
          </button>
        </div>

        <div className="filters">
          <button
            type="button"
            className={availableOnly ? "active" : undefined}
            onClick={() => {
              setAvailableOnly((value) => !value);
              track("filter_changed", {
                filter: "available_only",
                value: (!availableOnly).toString(),
              });
            }}
          >
            Available only
          </button>
          <label className="visually-hidden" htmlFor="zoo-sort">
            Sort animals
          </label>
          <select
            id="zoo-sort"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as SortKey);
              track("filter_changed", {
                filter: "sort",
                value: event.target.value,
              });
            }}
          >
            <option value="score">Sort by score</option>
            <option value="name">Sort by name</option>
            <option value="brands">Sort by residents</option>
          </select>
          <label className="visually-hidden" htmlFor="zoo-query">
            Search the zoo
          </label>
          <input
            id="zoo-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search in zoo"
            style={{
              border: 0,
              background: "transparent",
              padding: "10px 12px",
              minWidth: 140,
              fontWeight: 700,
            }}
          />
        </div>

        <div className="legend">
          <span>
            <i style={{ background: "#cbea77" }} />
            roomy
          </span>
          <span>
            <i style={{ background: "#f4cc5d" }} />
            getting busy
          </span>
          <span>
            <i style={{ background: "#f28c52" }} />
            crowded
          </span>
        </div>
      </div>

      {!groups.length ? (
        <p>No animals match those filters.</p>
      ) : (
        groups.map((group) => (
          <div className="zoo-group" key={group.id}>
            <div className="group-sign">
              <h4>{group.label}</h4>
              <span>{group.animals.length} residents</span>
            </div>
            <div className="zoo-grid">
              {group.animals.map((animal) => (
                <Link
                  key={animal.slug}
                  className="zoo-card"
                  href={`/animal/${animal.slug}`}
                >
                  <span className="tiny-score">
                    {formatOccupancy(animal.occupancyScore)}
                  </span>
                  <div className="card-emoji">{animal.emoji}</div>
                  <div className="card-name">{animal.name}</div>
                  <div className="brand-preview">
                    {animal.residents.length
                      ? animal.residents
                          .slice(0, 2)
                          .map((use) => use.displayLabel)
                          .join(" · ")
                      : "No major tech sightings"}
                  </div>
                  <div
                    className="occupancy"
                    style={{
                      width: `${Math.min(100, animal.occupancyScore * 10)}%`,
                      background: occupancyMeterColor(animal.occupancyScore),
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
