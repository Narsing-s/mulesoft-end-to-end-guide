# 19 — Hands-On Exercises

## Beginner
1. Build a `/hello` endpoint.
2. Accept a name query parameter.
3. Return a JSON object.
4. Add a Logger.
5. Create a DataWeave JSON-to-JSON transformation.
6. Read a list and filter records.

## Intermediate
1. Build customer CRUD.
2. Add database parameterized queries.
3. Add Choice routing.
4. Add standard error handling.
5. Build a RAML/OAS contract and APIkit implementation.
6. Call two downstream APIs with Scatter-Gather.
7. Add MUnit tests.

## Advanced
1. Build a batch reconciliation process.
2. Add idempotency to transfer requests.
3. Add bounded retry with a transient-failure strategy.
4. Add correlation IDs.
5. Add asynchronous messaging.
6. Design an API-led EAPI/PAPI/SAPI architecture.
7. Create a CI/CD pipeline.
8. Write a production incident runbook.

## Challenge project
Given customer, account and transaction datasets, create an API that:
- validates requests
- retrieves data from a database
- transforms the result
- applies business rules
- handles errors consistently
- records safe operational logs
- is protected by authentication
- has MUnit coverage
- is deployable through a repeatable pipeline

For every exercise, write the expected input, output, error cases and acceptance criteria before implementation.
