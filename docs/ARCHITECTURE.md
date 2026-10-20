# Architecture

- React + Vite frontend communicates with the Express API over HTTPS in production.
- Express routes validate requests and delegate business logic to services.
- Prisma provides database access to PostgreSQL.
- Private object storage is the intended destination for uploaded documents.
- AI provider integrations, if added, must be server-side and consent-aware.

Keep the frontend, API, business logic, persistence, and external integrations separate.
