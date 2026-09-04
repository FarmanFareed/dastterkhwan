import os

from openai import AsyncOpenAI
from qdrant_client import AsyncQdrantClient

QDRANT_URL = os.environ["QDRANT_URL"]
QDRANT_API_KEY = os.environ["QDRANT_API_KEY"]
COLLECTION_NAME = os.environ.get("QDRANT_COLLECTION", "dastarkhwan_restaurants")
EMBEDDING_MODEL = "text-embedding-3-small"

client = AsyncQdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
openai_client = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])


async def embed(text: str) -> list[float]:
    result = await openai_client.embeddings.create(
        model=EMBEDDING_MODEL, input=text
    )
    return result.data[0].embedding


async def search_restaurants(query: str, top_k: int = 4) -> list[str]:
    """Return the top-k most relevant restaurant descriptions for the query."""
    vector = await embed(query)
    results = await client.search(
        collection_name=COLLECTION_NAME,
        query_vector=vector,
        limit=top_k,
    )
    return [hit.payload["text"] for hit in results if hit.payload]
