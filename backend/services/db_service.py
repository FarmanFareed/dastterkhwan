import os
import uuid

import asyncpg

DATABASE_URL = os.environ["DATABASE_URL"]  # Neon connection string

_pool: asyncpg.Pool | None = None


async def get_pool() -> asyncpg.Pool:
    global _pool
    if _pool is None:
        _pool = await asyncpg.create_pool(DATABASE_URL)
        await _init_schema(_pool)
    return _pool


async def _init_schema(pool: asyncpg.Pool):
    async with pool.acquire() as conn:
        await conn.execute(
            """
            CREATE TABLE IF NOT EXISTS sessions (
                id UUID PRIMARY KEY,
                created_at TIMESTAMPTZ DEFAULT now()
            );

            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                session_id UUID REFERENCES sessions(id),
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT now()
            );
            """
        )


async def get_or_create_session(session_id: str | None) -> str:
    pool = await get_pool()
    if session_id:
        return session_id
    new_id = str(uuid.uuid4())
    async with pool.acquire() as conn:
        await conn.execute("INSERT INTO sessions (id) VALUES ($1)", uuid.UUID(new_id))
    return new_id


async def save_message(session_id: str, role: str, content: str) -> None:
    pool = await get_pool()
    async with pool.acquire() as conn:
        await conn.execute(
            "INSERT INTO messages (session_id, role, content) VALUES ($1, $2, $3)",
            uuid.UUID(session_id),
            role,
            content,
        )
