# 18 — Interview Preparation

## Beginner
1. What is MuleSoft?
2. What is an API?
3. What is a Mule event?
4. Payload vs attributes vs variables?
5. Flow vs subflow?
6. What is DataWeave?
7. What is an HTTP Listener?
8. What is an HTTP Request?

## Intermediate
1. Choice vs Scatter-Gather?
2. For Each vs Parallel For Each?
3. On Error Continue vs On Error Propagate?
4. How does APIkit route a request?
5. How do you parameterize database queries?
6. How do you handle downstream failures?
7. How do you secure properties?
8. How do you test a Mule flow?

## Advanced scenario questions
### Scenario: downstream API is slow
Explain timeout, retry safety, correlation ID, logs, metrics and fallback/asynchronous options.

### Scenario: duplicate payment request
Explain idempotency, durable state, transaction state and safe response replay.

### Scenario: production returns 502
Explain how you would establish scope, inspect gateway/application/dependency evidence, correlate logs and verify recovery.

### Scenario: database pool exhausted
Investigate connection leaks, pool limits, query latency, concurrency and database capacity before changing limits.

## DataWeave interview exercises
- transform nested JSON
- filter active customers
- group transactions by account
- calculate totals with reduce
- handle null/missing fields
- convert JSON to XML
- write a reusable function

## Interview answer framework
For scenario questions use:

```text
Understand requirement
-> identify assumptions
-> propose design
-> explain Mule components
-> explain error handling
-> explain security
-> explain testing
-> explain monitoring
-> discuss trade-offs
```
