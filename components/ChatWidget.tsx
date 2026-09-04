"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:8000";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Salaam! Ask me about any restaurant on the list — dishes, cities, price range, or what to order.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, open]);

  async function sendMessage() {
    const query = input.trim();
    if (!query || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          history: nextMessages.slice(0, -1),
        }),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.response as string },
      ]);
    } catch (err) {
      setError(
        "Couldn't reach the chat backend. Is the FastAPI server running?"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-lg border border-ink/15 bg-paper shadow-xl">
          <div className="flex items-center justify-between border-b border-ink/15 bg-maroon px-4 py-3">
            <span className="font-display text-lg italic text-paper">
              Ask about a place
            </span>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="text-paper/80 hover:text-paper"
            >
              <X size={18} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-8 rounded-lg bg-teal/10 px-3 py-2 text-sm"
                    : "mr-8 rounded-lg bg-ink/5 px-3 py-2 text-sm"
                }
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-8 flex gap-1 rounded-lg bg-ink/5 px-3 py-2 text-sm text-ink/50">
                <span className="animate-pulse">Typing…</span>
              </div>
            )}
            {error && (
              <div className="rounded-lg bg-maroon/10 px-3 py-2 text-sm text-maroon">
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 border-t border-ink/15 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Where's good for biryani?"
              className="flex-1 rounded-md border border-ink/20 bg-paper px-3 py-2 text-sm outline-none focus-visible:border-maroon"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Send message"
              className="flex-none rounded-md bg-maroon p-2 text-paper disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-paper shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
