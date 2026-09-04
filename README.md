# Dastarkhwan

A food & restaurant discovery site covering Pakistan, with a RAG chatbot that answers questions about the listed restaurants. Built with Next.js, TypeScript, Tailwind CSS, and a FastAPI + Qdrant + OpenAI + Neon backend, planned with Spec-Kit Plus.

## Project overview

Dastarkhwan lists restaurants across four regions of Pakistan (Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan) with a searchable/filterable list, individual detail pages, and a floating chat assistant that can answer questions like "where's good for biryani under Rs. 600" using retrieval-augmented generation over the same restaurant data.

## Features

- Homepage with hero, featured restaurants, and CTA
- Searchable, filterable restaurant list (`/restaurants`)
- Individual restaurant detail pages with related content (`/restaurants/[slug]`)
- About and Contact pages
- Floating RAG chatbot grounded in the site's restaurant data
- Fully responsive, mobile-first layout
- `.spec/` Spec-Kit Plus documentation (constitution, plan, tasks)

## Technology stack

**Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React
**Backend:** FastAPI, OpenAI API, Qdrant Cloud, Neon Serverless Postgres
**Deployment:** Vercel (frontend), Render/Railway/Fly.io (backend)

## Project structure

```
dastarkhwan/
├── .spec/                 # Spec-Kit Plus docs (constitution, plan, tasks)
├── app/                    # Next.js App Router pages
│   ├── page.tsx             # Home
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── restaurants/
│       ├── page.tsx         # Listing
│       └── [slug]/page.tsx  # Detail
├── components/             # Navbar, Footer, ChatWidget, RestaurantCard, DishArt, SaveButton
├── lib/                     # Static data + utils
├── backend/                 # FastAPI RAG service
│   ├── main.py
│   ├── routers/chat.py
│   ├── services/            # qdrant, openai, db
│   ├── data/restaurants.json
│   └── ingest.py            # populates Qdrant
└── public/
```

## Running locally

### Frontend

```bash
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_CHAT_API_URL if backend isn't on localhost:8000
npm run dev
```

Visit http://localhost:3000.

### Backend (chatbot API)

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env               # fill in your keys, see below
python ingest.py                   # one-time: embeds restaurants.json into Qdrant
uvicorn main:app --reload --port 8000
```

## Environment variables

**Frontend (`.env.local`)**
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CHAT_API_URL` | Base URL of the FastAPI backend |

**Backend (`backend/.env`)**
| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | OpenAI API key |
| `OPENAI_CHAT_MODEL` | Chat model, defaults to `gpt-4o-mini` |
| `QDRANT_URL` | Qdrant Cloud cluster URL |
| `QDRANT_API_KEY` | Qdrant Cloud API key |
| `QDRANT_COLLECTION` | Collection name, defaults to `dastarkhwan_restaurants` |
| `DATABASE_URL` | Neon Postgres connection string |

## API setup instructions

1. **OpenAI** — create a key at platform.openai.com, used for both embeddings and chat completion.
2. **Qdrant Cloud** — create a free-tier cluster at cloud.qdrant.io, copy the URL and API key, then run `python backend/ingest.py` once to create and populate the collection.
3. **Neon** — create a free Postgres project at neon.tech, copy the pooled connection string into `DATABASE_URL`. Tables are created automatically on first request.

## Deployment process

1. Push this repository to GitHub (public).
2. **Frontend:** import the repo into Vercel, set `NEXT_PUBLIC_CHAT_API_URL` to your backend's deployed URL, deploy.
3. **Backend:** deploy `backend/` to Render, Railway, or Fly.io as a Python service (`uvicorn main:app --host 0.0.0.0 --port $PORT`), set the environment variables listed above.
4. Update the backend's CORS `allow_origins` in `main.py` to your Vercel domain before going live.
5. Re-run `python ingest.py` any time `backend/data/restaurants.json` changes.

## How to run locally (quick reference)

```bash
# terminal 1
npm install && npm run dev

# terminal 2
cd backend && pip install -r requirements.txt && uvicorn main:app --reload --port 8000
```

## Screenshots

_Add screenshots of the homepage, listing page, detail page, and chatbot here before submission._

## Deployment link

_Add your live Vercel URL here after deploying._
