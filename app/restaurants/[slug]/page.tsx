import { notFound } from "next/navigation";
import Link from "next/link";
import DishArt from "@/components/DishArt";
import SaveButton from "@/components/SaveButton";
import { restaurants } from "@/lib/data";

export function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const r = restaurants.find((x) => x.slug === params.slug);
  if (!r) return {};
  return {
    title: `${r.name} — Dastarkhwan`,
    description: r.description,
  };
}

export default function RestaurantPage({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = restaurants.find((r) => r.slug === params.slug);
  if (!restaurant) notFound();

  const related = restaurants
    .filter((r) => r.region === restaurant.region && r.slug !== restaurant.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/restaurants" className="text-sm text-ink/60 hover:text-maroon">
        ← Back to the list
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <DishArt
          name={restaurant.name}
          region={restaurant.region}
          className="aspect-[4/3] w-full rounded-sm"
        />

        <div>
          <p className="font-display text-sm italic text-maroon">
            {restaurant.region} · {restaurant.city}
          </p>
          <h1 className="mt-2 font-display text-4xl">{restaurant.name}</h1>
          <p className="mt-4 text-ink/75">{restaurant.longDescription}</p>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between border-b border-ink/10 py-2">
              <dt className="text-ink/50">Cuisine</dt>
              <dd>{restaurant.cuisine}</dd>
            </div>
            <div className="flex justify-between border-b border-ink/10 py-2">
              <dt className="text-ink/50">Signature dish</dt>
              <dd>{restaurant.signatureDish}</dd>
            </div>
            <div className="flex justify-between border-b border-ink/10 py-2">
              <dt className="text-ink/50">Price range</dt>
              <dd>{restaurant.priceRange}</dd>
            </div>
            <div className="flex justify-between border-b border-ink/10 py-2">
              <dt className="text-ink/50">Hours</dt>
              <dd>{restaurant.hours}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            {restaurant.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink/20 px-3 py-1 text-xs text-ink/70"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <SaveButton slug={restaurant.slug} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <div className="rule mb-8" />
          <h2 className="font-display text-2xl">
            Also in {restaurant.region}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/restaurants/${r.slug}`} className="group">
                <DishArt
                  name={r.name}
                  region={r.region}
                  className="aspect-[4/3] w-full rounded-sm"
                />
                <h3 className="mt-3 font-display text-lg group-hover:text-maroon">
                  {r.name}
                </h3>
                <p className="text-sm text-ink/60">{r.city}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
