"use client";

import { useMemo, useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants, regions } from "@/lib/data";

export default function RestaurantsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("All");

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesRegion = region === "All" || r.region === region;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.signatureDish.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [query, region]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl">The list</h1>
      <p className="mt-3 max-w-prose text-ink/70">
        {restaurants.length} places, four regions, no sponsored placements.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, city, or dish…"
          className="flex-1 rounded-md border border-ink/20 bg-paper px-4 py-2.5 text-sm outline-none focus-visible:border-maroon"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-md border border-ink/20 bg-paper px-4 py-2.5 text-sm outline-none focus-visible:border-maroon"
        >
          <option value="All">All regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-ink/60">
            Nothing matches that search. Try a different city or dish.
          </p>
        ) : (
          filtered.map((r) => <RestaurantCard key={r.slug} r={r} />)
        )}
      </div>
    </div>
  );
}
