# EthAum v2 — Agent Instructions

Read this file and the relevant files in `docs/` before making changes.

## Repository separation
- This is the new EthAum repository.
- Do not import, edit, or overwrite files from any other EthAum project unless the user explicitly requests it.
- Do not assume an existing database or copy credentials from another project.

## Working method
- Inspect before editing.
- Implement one small feature per task.
- Explain files to be changed and acceptance criteria before substantial work.
- Run relevant tests and report what passed and failed.
- Do not claim a feature is complete without testing it.

## Technical rules
- Frontend target: React + Vite.
- Backend target: Node.js + Express using ES modules.
- Database target: PostgreSQL with Prisma.
- Keep routes, services, middleware, and database access separated.
- Validate inputs on the server and enforce authorization on every protected resource.
- Keep secrets in environment variables.
- Never commit `.env` files or real patient data.
- No destructive database operations or migrations without explicit approval.

## Healthcare boundaries
- AI may assist with administrative document organization, summaries, and preference-based provider discovery.
- AI must not diagnose, prescribe, determine treatment, or make clinical eligibility decisions.
- Use synthetic data for development and demos.
