# 40 — MuleSoft Project Templates

Use these templates when converting theory into a real application.

## Standard application checklist

```text
API contract
├── RAML/OAS
├── examples
├── schemas/types
└── error contract

Mule application
├── listener/source
├── routing
├── validation
├── business logic
├── transformation
├── external calls
├── error handling
└── logging

Testing
├── happy path
├── validation
├── not found
├── dependency failure
├── timeout
├── transformation failure
└── security behavior

Operations
├── configuration
├── secrets
├── health checks
├── metrics/logging
├── deployment
└── rollback
```

## API template

```text
POST /resources
GET /resources
GET /resources/{id}
PATCH /resources/{id}
DELETE /resources/{id}
```

Define before implementation:

- ownership
- authentication
- authorization
- request/response types
- validation
- pagination
- status codes
- error contract
- idempotency behavior
- correlation ID behavior
- versioning

## Flow naming

Prefer names that describe responsibility:

```text
get-customer-flow
create-account-flow
validate-payment-flow
publish-payment-command-flow
handle-payment-error-flow
```

Avoid meaningless names such as `flow1`, `testFlow`, `newFlow2` in production applications.

## Reusable error response

A consistent application error can contain:

```json
{
  "code": "DOWNSTREAM_TIMEOUT",
  "message": "The requested operation could not be completed at this time.",
  "correlationId": "abc-123"
}
```

The client message should be safe and useful. Detailed technical evidence belongs in controlled logs.

## Definition of done

An application is not complete when the happy-path request returns 200. Complete it only after testing failure paths, securing configuration, adding observability, documenting deployment and defining recovery behavior.
