from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import chat

app = FastAPI(title="Dastarkhwan Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your deployed frontend URL before shipping
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "dastarkhwan-chat-api"}
