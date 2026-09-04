import Link from "next/link";
import DishArt from "./DishArt";
import type { Restaurant } from "@/lib/data";

export default function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Link
      href={`/restaurants/${r.slug}`}
      className="ledger-row group flex items-center gap-5 py-5 first:pt-0"
    >
      <DishArt
        name={r.name}
        region={r.region}
        className="h-16 w-16 flex-none rounded-sm"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="truncate font-display text-xl group-hover:text-maroon">
            {r.name}
          </h3>
          <span className="flex-none text-sm text-ink/50">{r.city}</span>
        </div>
        <p className="mt-1 truncate text-sm text-ink/70">
          {r.cuisine} · {r.signatureDish}
        </p>
      </div>
      <span className="flex-none text-sm text-turmeric">{r.priceRange}</span>
    </Link>
  );
}
