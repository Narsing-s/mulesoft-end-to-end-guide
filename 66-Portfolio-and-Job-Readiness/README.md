# 66 — Portfolio & Job Readiness

Turn repository learning into evidence that can be demonstrated in interviews and technical discussions.

## Portfolio evidence

### 1. API project
Include contract, implementation, DataWeave mappings, error contract, MUnit tests and deployment instructions.

### 2. Integration project
Include DB/SFTP/MQ integration, retry/idempotency strategy, operational logging and failure scenarios.

### 3. Production-support case study
Include sanitized incident timeline, evidence, diagnosis, mitigation, RCA and preventive action. Never publish credentials, customer data, internal URLs or confidential logs.

### 4. Architecture case study
Include context, constraints, alternatives considered, decision, trade-offs and operational consequences.

### 5. DataWeave portfolio
For each transformation show input, expected output, implementation, edge cases, tests and performance considerations.

## Interview evidence checklist

- Explain the Mule event clearly.
- Build a simple API without copying a template.
- Write and explain DataWeave transformations.
- Explain APIkit routing and validation.
- Explain error propagation and recovery.
- Design retry without creating duplicates.
- Explain DB transactions and connection pools.
- Explain MQ delivery and replay behavior.
- Write useful MUnit tests.
- Explain deployment and rollback.
- Investigate logs using correlation identifiers.
- Produce an RCA from evidence.
- Explain security boundaries and secret handling.
- Discuss architecture trade-offs.

## Professional repository checklist

- Clear README
- Architecture diagram
- Setup instructions
- Sample requests/responses
- Test instructions
- Failure scenarios
- Security notes
- Deployment notes
- Troubleshooting guide
- Changelog/version notes
- No secrets or customer information

## Evidence over claims

Prefer statements such as:

> Implemented an API with contract validation, negative MUnit tests and a documented rollback procedure.

Instead of:

> Expert in MuleSoft.

The repository should make the capability demonstrable.
