# Progressive Project Ladder

Do not jump directly to the banking capstone. Build progressively so every project introduces only a few new concepts.

## Project 0 — Hello Mule

**Learn:** HTTP Listener, response payload, Logger.

```text
Client → Listener → Transform → Response
```

**Done when:** you can explain the Mule event and return a predictable response.

## Project 1 — Customer Echo API

**Add:** JSON input, DataWeave, validation, variables.

```text
POST /customers
      │
      ▼
Validate → Transform → Response
```

## Project 2 — Customer CRUD API

**Add:** RAML/OAS, APIkit, database, parameterized SQL.

```text
Client → APIkit → Flow → DataWeave → DB
```

## Project 3 — Order + Inventory Integration

**Add:** HTTP Request, Scatter-Gather, Choice, error handling.

```text
             ┌→ Inventory API
Client → Mule┤
             └→ Order DB
                 │
                 ▼
             Aggregate
```

## Project 4 — Reliable Payment Flow

**Add:** idempotency, retry, timeout, transaction/compensation concepts.

```text
Request
  ↓
Idempotency Check
  ↓
Validate
  ↓
Payment
  ├─ success → response
  └─ transient → retry
       └─ exhausted → recovery/DLQ strategy
```

## Project 5 — Event-Driven Notification Platform

**Add:** MQ/JMS, producer/consumer, acknowledgement, redelivery, DLQ, correlation.

```text
API → Queue → Consumer → Notification Service
             │
             ├→ retry
             └→ DLQ
```

## Project 6 — Secure Partner API

**Add:** TLS/mTLS concepts, OAuth/JWT, API policies, secure properties, certificate rotation.

```text
Partner
  │ HTTPS + Identity
  ▼
Gateway / Policy
  ▼
Mule API
  ▼
Downstream
```

## Project 7 — Production-Ready Integration

**Add:** MUnit, CI/CD, environment configuration, deployment, dashboards, alerts, runbook and rollback.

**Done when:** another engineer can deploy and operate it using the repository documentation.

## Project 8 — Banking Capstone

Use `17-Real-World-Project`.

Required capabilities:

- API contract
- Experience / Process / System API boundaries
- DataWeave transformations
- database
- messaging
- authentication/authorization
- error strategy
- idempotency
- MUnit
- integration tests
- CI/CD
- deployment
- observability
- incident simulation
- RCA
- recovery
- architecture decision records

## Project completion standard

For every project produce:

```text
README
├── Problem
├── Requirements
├── Architecture diagram
├── Sequence/data-flow diagram
├── API contract
├── Configuration
├── Implementation
├── DataWeave examples
├── Input/output examples
├── Test plan
├── MUnit tests
├── Failure-injection plan
├── Troubleshooting guide
├── Security model
├── Performance notes
├── Deployment instructions
├── Smoke test
├── Monitoring/alerts
├── Rollback/recovery
├── Runbook
├── RCA example
└── Interview questions
```

## Never stop learning

After Project 8, create a harder variant instead of declaring the journey finished. Change one dimension at a time: volume, latency, availability, security, number of systems, asynchronous behavior, deployment topology, data size or failure rate.
