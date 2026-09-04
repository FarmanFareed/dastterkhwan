from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.qdrant_service import search_restaurants
from services.openai_service import generate_answer
from services.db_service import save_message, get_or_create_session

router = APIRouter()


class Turn(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    query: str
    session_id: str | None = None
    history: list[Turn] = []


class ChatResponse(BaseModel):
    response: str
    session_id: str


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest):
    if not payload.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    try:
        session_id = await get_or_create_session(payload.session_id)

        # 1. Retrieve relevant restaurant content from Qdrant
        context_chunks = await search_restaurants(payload.query, top_k=4)

        # 2. Generate a grounded response with OpenAI
        answer = await generate_answer(
            query=payload.query,
            context_chunks=context_chunks,
            history=[t.dict() for t in payload.history],
        )

        # 3. Persist both turns to Neon Postgres
        await save_message(session_id, "user", payload.query)
        await save_message(session_id, "assistant", answer)

        # 4. Return the response
        return ChatResponse(response=answer, session_id=session_id)

    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=502, detail=f"Chat pipeline failed: {exc}"
        ) from exc
