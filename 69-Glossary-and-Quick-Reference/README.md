# 69 — Glossary & Quick Reference

## Mule fundamentals

- **Mule event** — the execution context flowing through a Mule application.
- **Payload** — the primary data carried by the event.
- **Attributes** — metadata associated with the message.
- **Variable** — event-scoped data used during processing.
- **Flow** — a sequence of event processors.
- **Subflow** — reusable processing sequence without its own error handler.
- **Private flow** — reusable flow that can have its own processing behavior.

## APIs

- **RAML** — REST API Modeling Language.
- **OAS/OpenAPI** — API description standard.
- **APIkit** — Mule tooling for contract-driven API implementation.
- **System API** — exposes system-level access to data/capabilities.
- **Process API** — orchestrates business processes and systems.
- **Experience API** — shapes capabilities for a particular consumer experience.

## DataWeave

- **map** — transforms array elements.
- **filter** — keeps array elements matching a condition.
- **reduce** — accumulates array values into a result.
- **mapObject** — transforms object key/value pairs.
- **filterObject** — filters object entries.
- **flatten** — reduces nested arrays by one level.
- **flatMap** — maps and flattens results.

## Operations

- **Correlation ID** — identifier used to connect related processing/log events.
- **RCA** — root-cause analysis.
- **RTO** — recovery time objective.
- **RPO** — recovery point objective.
- **DLQ** — dead-letter queue for messages requiring separate handling.
- **Idempotency** — repeated processing produces the intended same logical result.

## Deployment

- **CloudHub** — managed Mule application deployment platform.
- **CloudHub 2.0** — newer cloud application deployment architecture.
- **Runtime Fabric** — deployment/runtime architecture for Mule applications on supported infrastructure.
- **Runtime Manager** — application and runtime management capability.
- **Anypoint Exchange** — asset discovery and sharing capability.

## Security

- TLS, mTLS, OAuth 2.0, JWT, RBAC, least privilege, secure properties, certificate rotation, secret management, PII masking and audit logging.

## HTTP status quick reference

| Status | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 202 | Accepted for processing |
| 204 | Successful request with no response body |
| 400 | Invalid request |
| 401 | Authentication required/failed |
| 403 | Request not authorized |
| 404 | Resource/route not found |
| 409 | Conflict |
| 415 | Unsupported media type |
| 429 | Rate limited |
| 500 | Server-side failure |
| 502 | Bad gateway/upstream response |
| 503 | Service unavailable |
| 504 | Gateway timeout |

Use the exact API contract and platform documentation for implementation-specific behavior.
