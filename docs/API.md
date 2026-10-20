# API Conventions

- Prefix application endpoints with `/api`.
- Use consistent JSON request and response shapes.
- Validate all untrusted input on the server.
- Use appropriate HTTP status codes.
- Never rely on frontend-only authorization.
- Do not return passwords, secrets, internal stack traces, or private storage credentials.

Current endpoint:
- `GET /api/health` — returns a basic service health response.
