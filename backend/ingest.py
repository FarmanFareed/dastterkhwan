"""
Run once (and again whenever backend/data/restaurants.json changes) to
(re)build the Qdrant collection used by the /chat endpoint.

Usage:
    python ingest.py
"""

import asyncio
import json
import os
from pathlib import Path

from qdrant_client import AsyncQdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams

from services.qdrant_service import embed, COLLECTION_NAME

QDRANT_URL = os.environ["QDRANT_URL"]
QDRANT_API_KEY = os.environ["QDRANT_API_KEY"]
EMBEDDING_DIM = 1536  # text-embedding-3-small


async def main():
    data_path = Path(__file__).parent / "data" / "restaurants.json"
    restaurants = json.loads(data_path.read_text())

    client = AsyncQdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

    await client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=EMBEDDING_DIM, distance=Distance.COSINE),
    )

    points = []
    for i, r in enumerate(restaurants):
        vector = await embed(r["text"])
        points.append(
            PointStruct(id=i, vector=vector, payload={"text": r["text"], "slug": r["slug"]})
        )

    await client.upsert(collection_name=COLLECTION_NAME, points=points)
    print(f"Indexed {len(points)} restaurants into '{COLLECTION_NAME}'")


if __name__ == "__main__":
    asyncio.run(main())
