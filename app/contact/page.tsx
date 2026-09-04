"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend endpoint wired up yet — replace with a real submit handler
    // (e.g. POST to your FastAPI backend or a form service) before deploying.
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl">Suggest a place</h1>
      <p className="mt-3 max-w-prose text-ink/70">
        Know somewhere that should be on this list? Tell us what to order.
      </p>

      {sent ? (
        <p className="mt-8 max-w-prose rounded-md bg-teal/10 px-4 py-3 text-teal">
          Thanks — we read every suggestion before it goes on the list.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm text-ink/70">
              Your name
            </label>
            <input
              id="name"
              required
              className="mt-1 w-full rounded-md border border-ink/20 bg-paper px-3 py-2 text-sm outline-none focus-visible:border-maroon"
            />
          </div>
          <div>
            <label htmlFor="place" className="block text-sm text-ink/70">
              Restaurant name and city
            </label>
            <input
              id="place"
              required
              className="mt-1 w-full rounded-md border border-ink/20 bg-paper px-3 py-2 text-sm outline-none focus-visible:border-maroon"
            />
          </div>
          <div>
            <label htmlFor="note" className="block text-sm text-ink/70">
              What should we order there?
            </label>
            <textarea
              id="note"
              rows={4}
              className="mt-1 w-full rounded-md border border-ink/20 bg-paper px-3 py-2 text-sm outline-none focus-visible:border-maroon"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-maroon px-5 py-2.5 text-sm text-paper hover:bg-maroonDark"
          >
            Send suggestion
          </button>
        </form>
      )}
    </div>
  );
}
