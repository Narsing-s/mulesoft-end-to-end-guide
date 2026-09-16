# 36 — Hands-On Challenge Lab

These challenges are designed to prove that you can build Mule applications rather than only answer theory questions.

## Rules

For every challenge:

1. Write the requirement in your own words.
2. Draw the flow.
3. Define input/output.
4. Implement it.
5. Test the happy path.
6. Test at least two failures.
7. Add an MUnit test.
8. Add safe logging/correlation.
9. Explain production concerns.
10. Write one interview answer about your solution.

---

## Challenge 01 — Hello API
**Level:** Beginner

Build `GET /hello`.

Expected response:

```json
{"message":"Hello from MuleSoft","status":"SUCCESS"}
```

Learn: listener, flow, payload, response.

## Challenge 02 — Echo API
**Level:** Beginner

Build `POST /echo` that accepts JSON and adds:

```json
{"received":true}
```

Failure: invalid JSON or missing body.

## Challenge 03 — Customer Search
**Level:** Beginner

Input a customer list and query `name`. Return the matching customer using DataWeave.

Required skills: query parameters, filter, null handling.

## Challenge 04 — Customer Transformation
**Level:** Beginner

Convert:

```json
{"fullName":"Ravi Kumar","mobile":"9999999999","active":true}
```

to:

```json
{"name":"Ravi Kumar","phone":"9999999999","status":"ACTIVE"}
```

## Challenge 05 — API Contract
**Level:** Intermediate

Create an API contract for:

```text
POST /customers
GET /customers/{id}
PATCH /customers/{id}
DELETE /customers/{id}
```

Document request types, response types, examples and errors.

## Challenge 06 — APIkit Failure Lab
**Level:** Intermediate

Build the contract and intentionally produce:

- 404
- 405
- 415
- 406
- validation failure

For each one document:

```text
Symptom
→ Evidence
→ Root cause
→ Fix
→ Prevention
```

## Challenge 07 — Database CRUD
**Level:** Intermediate

Create a synthetic customer table and implement CRUD.

Requirements:

- parameterized SQL
- duplicate validation
- not-found handling
- safe update
- transaction where required
- stable response contract

## Challenge 08 — Database Performance
**Level:** Advanced

Start with a deliberately inefficient query pattern. Measure it, identify the bottleneck, improve the query/access pattern and explain why the new design is safer.

## Challenge 09 — External API Aggregation
**Level:** Intermediate

Create an API that combines customer and account information.

Use parallel execution where calls are independent. Define behavior when one dependency fails.

## Challenge 10 — Retry and Timeout
**Level:** Advanced

Call a simulated unreliable downstream service.

Implement:

- timeout
- bounded retry
- backoff reasoning
- non-retryable classification
- correlation ID
- useful logs

## Challenge 11 — Idempotent Payment
**Level:** Advanced

Build a payment endpoint that accepts an idempotency key.

Two identical requests must not create two payment records.

Document the state machine and concurrency assumptions.

## Challenge 12 — Messaging
**Level:** Advanced

Accept an order/payment request, publish a command and process it asynchronously.

Document:

- acknowledgement
- retry
- duplicate delivery
- DLQ
- poison message
- correlation ID

## Challenge 13 — Secure API
**Level:** Advanced

Design an API with:

- HTTPS/TLS
- authentication
- authorization
- safe logging
- secure properties
- CORS consideration
- sensitive-field masking

## Challenge 14 — MUnit Quality Gate
**Level:** Intermediate

Write tests for:

- success
- validation failure
- not found
- downstream failure
- transformation failure
- database failure

Mock external dependencies.

## Challenge 15 — Production Incident
**Level:** Advanced

Given:

```text
Users report intermittent 502 responses.
Latency has increased from 600 ms to 7 seconds.
Database CPU is normal.
One downstream service shows increased latency.
```

Write an incident investigation without guessing. Identify evidence you would collect and the safest mitigation.

## Challenge 16 — Memory Incident
**Level:** Advanced

A large file causes memory pressure.

Explain how you would investigate:

- payload size
- streaming
- repeated transformations
- large collections
- concurrency
- GC
- connector behavior

Do not simply increase heap size as the first action.

## Challenge 17 — CI/CD
**Level:** Advanced

Design a pipeline:

```text
commit
→ build
→ MUnit
→ quality/security checks
→ package
→ deploy test
→ smoke test
→ approval
→ production
→ verification
→ rollback
```

Define what should fail the pipeline.

## Challenge 18 — Banking Capstone
**Level:** Advanced

Implement:

```text
Experience API
   ↓
Process API
   ↓
System APIs
   ├── Customer DB
   ├── Account DB
   ├── Payment/MQ
   └── Notification
```

Required features:

- account creation
- account lookup
- balance lookup
- update customer information
- transfer/payment
- transaction history
- idempotency
- validation
- authentication/authorization design
- MUnit
- environment configuration
- deployment plan
- observability
- production runbook

## Final challenge — Explain it like a senior engineer

Take your completed solution and answer:

1. Why this architecture?
2. Why these API boundaries?
3. Why synchronous/asynchronous?
4. What happens if the database fails?
5. What happens if the downstream service is slow?
6. Can the operation be retried?
7. How do you prevent duplicates?
8. How do you secure it?
9. How do you test it?
10. How do you deploy it?
11. How do you monitor it?
12. How do you troubleshoot it?
13. What is the largest performance risk?
14. What is the rollback strategy?
15. What would you change at 10x traffic?

If you can answer these from your implementation, you are practicing production-level MuleSoft engineering rather than memorizing interview definitions.
