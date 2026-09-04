import Link from "next/link";
import DishArt from "@/components/DishArt";
import { restaurants } from "@/lib/data";

const featured = restaurants.slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pt-24">
        <p className="font-display text-sm italic text-maroon">
          A running list, updated as we eat our way through it
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-5xl leading-[1.05] md:text-6xl">
          The tables worth crossing town for.
        </h1>
        <p className="mt-6 max-w-prose text-lg text-ink/75">
          Dastarkhwan tracks the restaurants, roadside karahi joints and
          rooftop grills across Pakistan that are actually worth the drive —
          organised by city, dish, and how much you'll spend getting there.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/restaurants"
            className="rounded-md bg-maroon px-5 py-3 text-sm text-paper hover:bg-maroonDark"
          >
            See the full list
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-ink/20 px-5 py-3 text-sm hover:border-ink/40"
          >
            Why this exists
          </Link>
        </div>
      </section>

      <div className="rule mx-6" />

      {/* Featured */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl">Where to start</h2>
          <Link href="/restaurants" className="text-sm text-maroon">
            View all {restaurants.length}
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {featured.map((r) => (
            <Link key={r.slug} href={`/restaurants/${r.slug}`} className="group">
              <DishArt
                name={r.name}
                region={r.region}
                className="aspect-[4/3] w-full rounded-sm"
              />
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="font-display text-xl group-hover:text-maroon">
                  {r.name}
                </h3>
                <span className="text-sm text-ink/50">{r.city}</span>
              </div>
              <p className="mt-1 text-sm text-ink/70">{r.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="rule mx-6" />

      {/* About teaser */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-prose">
          <h2 className="font-display text-3xl">
            Not a directory. A running opinion.
          </h2>
          <p className="mt-4 text-ink/75">
            Every entry here has been visited, not scraped from a listings
            site. We note what's actually good, what to order, and what to
            skip — and we take things off the list when they stop being worth
            it.
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block text-sm text-maroon"
          >
            Read more about how this list is kept
          </Link>
        </div>
      </section>

      <div className="rule mx-6" />

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="font-display text-3xl">
          Not sure where to start? Ask the guide.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          The chat in the bottom corner knows every entry on this list —
          ask it for a city, a dish, or a budget.
        </p>
      </section>
    </div>
  );
}
