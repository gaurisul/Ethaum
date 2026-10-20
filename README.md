# EthAum — New Repository (v2)

A separate, clean starter repository for the EthAum medical-tourism marketplace. This repository is independent of any previous EthAum codebase.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express (JavaScript ES modules)
- Database: PostgreSQL + Prisma
- Tests: Node.js built-in test runner (backend starter)

## Current status
This is a starter scaffold, not a finished application. It includes project documentation, a minimal Express health endpoint, and a placeholder Prisma schema. Authentication, medical-record uploads, provider matching, quotes, bookings, and AI features must be implemented and tested incrementally.

## Structure
```text
ethaum-v2/
├── frontend/                 # React + Vite app (to be created)
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── routes/health.routes.js
│   │   └── middleware/error.middleware.js
│   ├── prisma/schema.prisma
│   ├── tests/health.test.js
│   ├── package.json
│   └── .env.example
├── docs/
├── .clinerules/
├── AGENTS.md
├── .env.example
└── .gitignore
```

## Start the backend
Requires a supported Node.js LTS version.

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Then open `http://localhost:5000/api/health`.

The database is not required for the health endpoint. Configure `DATABASE_URL` before adding database-backed features.

## Create the frontend
From the repository root, create the React/Vite frontend when ready:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

## Safety
- Never commit `.env` files, API keys, credentials, or real patient data.
- Use synthetic data for development and demos.
- Do not send medical records to an external AI service without explicit consent and an approved data-handling plan.
- AI features are for administrative coordination only, not diagnosis, prescribing, or clinical decision-making.
- Review database migrations before running them; do not reset a database containing data.
