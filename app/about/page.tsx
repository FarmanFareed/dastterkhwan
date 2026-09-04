export const metadata = { title: "About — Dastarkhwan" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl">About this list</h1>
      <div className="mt-6 max-w-prose space-y-5 text-ink/80">
        <p>
          Dastarkhwan — literally the cloth a meal is spread on — started as a
          shared notes file between two people who kept arguing about where
          to eat. It's now a small website, built as a university project on
          AI-assisted development, but the rule hasn't changed: nothing goes
          on the list unless someone on the team has actually eaten there.
        </p>
        <p>
          Every entry lists what it costs, what to order, and what the room
          feels like, so you can decide in thirty seconds whether it's worth
          the drive. Regions are grouped by where the food actually comes
          from, not by where a delivery app happens to draw its boundaries.
        </p>
        <p>
          The chat assistant in the corner of every page is built on the same
          list — it can answer questions about cuisine, budget, or city
          without you having to scroll.
        </p>
        <h2 className="pt-4 font-display text-2xl text-ink">
          How this site was built
        </h2>
        <p>
          This project was built with Next.js, TypeScript and Tailwind CSS on
          the frontend, and a FastAPI backend that uses Qdrant for retrieval,
          OpenAI for generation, and Neon Postgres for chat history — planned
          and tracked using Spec-Kit Plus and built with Claude Code, as part
          of an Artificial Intelligence coursework project.
        </p>
      </div>
    </div>
  );
}
