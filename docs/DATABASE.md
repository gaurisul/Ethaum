# Database Planning

Design models only after reviewing the MVP workflow. Likely entities include User, PatientCase, ProviderProfile, MedicalDocument metadata, Quote, Consultation, Booking, ConsentRecord, and AuditEvent.

Rules:
- Store passwords only as secure hashes.
- Keep document contents in private object storage; store metadata and private object references in PostgreSQL.
- Use ownership and authorization checks for every record.
- Do not store unnecessary medical information.
- Review migrations and back up data before applying them.
- Never run destructive resets against a database containing user data.
