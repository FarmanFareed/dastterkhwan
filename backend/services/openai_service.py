import os

from openai import AsyncOpenAI

CHAT_MODEL = os.environ.get("OPENAI_CHAT_MODEL", "gpt-4o-mini")

client = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])

SYSTEM_PROMPT = (
    "You are the Dastarkhwan guide, a concise, friendly assistant for a "
    "Pakistani food and restaurant website. Answer only using the provided "
    "restaurant context. If the context doesn't cover the question, say so "
    "and suggest browsing the full list instead of guessing. Keep answers "
    "to 2-4 sentences."
)


async def generate_answer(
    query: str, context_chunks: list[str], history: list[dict]
) -> str:
    context_text = "\n\n".join(context_chunks) or "No matching restaurants found."

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for turn in history[-6:]:
        messages.append({"role": turn["role"], "content": turn["content"]})

    messages.append(
        {
            "role": "user",
            "content": f"Context:\n{context_text}\n\nQuestion: {query}",
        }
    )

    response = await client.chat.completions.create(
        model=CHAT_MODEL,
        messages=messages,
        temperature=0.4,
        max_tokens=300,
    )
    return response.choices[0].message.content or ""
