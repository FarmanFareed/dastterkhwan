"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function SaveButton({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const list: string[] = JSON.parse(
      localStorage.getItem("dastarkhwan:saved") || "[]"
    );
    setSaved(list.includes(slug));
  }, [slug]);

  function toggle() {
    const list: string[] = JSON.parse(
      localStorage.getItem("dastarkhwan:saved") || "[]"
    );
    const next = saved ? list.filter((s) => s !== slug) : [...list, slug];
    localStorage.setItem("dastarkhwan:saved", JSON.stringify(next));
    setSaved(!saved);
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 rounded-md border border-ink/20 px-4 py-2 text-sm hover:border-maroon hover:text-maroon"
    >
      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {saved ? "Saved to your list" : "Save for later"}
    </button>
  );
}
