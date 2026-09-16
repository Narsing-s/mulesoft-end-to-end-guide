# Canonical Deep Lesson Template

Use this structure when adding or expanding **any technical topic in the repository**. This is intentionally deeper than a checklist: every important concept/configuration must be explained, demonstrated, tested and operationalized.

> Repo-wide standard: `53-End-to-End-Study-Path/REPO-WIDE-DEEP-EXPLANATION-STANDARD.md`

## 1. Topic identity

**Name:**

**Level:** Beginner / Intermediate / Advanced

**Audience:**

**Prerequisites:**

**Version tested:** Mule Runtime / Java / DataWeave / connector / deployment target

**Last verified:**

## 2. What is it?

Explain it in plain English first. Assume the reader has never seen the concept.

## 3. Why does it exist?

Explain the real engineering/business problem it solves. Explain what would happen without it.

## 4. Key terminology

Define every important term before using it.

## 5. When should I use it?

Give practical situations and explain why it fits.

## 6. When should I NOT use it?

Give alternatives, trade-offs and anti-patterns.

## 7. Architecture / visual model

```text
Source
  │
  ▼
Mule Event
  │
  ├── Payload
  ├── Attributes
  └── Variables
  │
  ▼
Processor / Connector
  │
  ▼
Target
```

Add Mermaid/sequence/decision diagrams when they clarify runtime behavior.

## 8. How it works at runtime

Explain the event lifecycle step by step:

1. What starts it?
2. What enters the flow?
3. What does Mule create/change?
4. Which processor executes?
5. What leaves the processor?
6. What happens on success?
7. What happens on failure?

## 9. Configuration depth

For **every important configuration field**, use:

### `<Field>`

**What is it?**  
**Why is it needed?**  
**Where is it configured?**  
**Typical example:**  
**Runtime effect:**  
**If wrong:**  
**How to verify:**  
**Production note:**

Never list a field without explaining it.

## 10. Smallest working example

Show the minimum implementation required to understand the concept.

## 11. Input → Code → Output

Always provide concrete input and expected output.

```json
{
  "id": 101,
  "name": "Alice"
}
```

```dataweave
%dw 2.0
output application/json
---
{
  customerId: payload.id,
  customerName: payload.name
}
```

```json
{
  "customerId": 101,
  "customerName": "Alice"
}
```

Explain why the transformation produces that result.

## 12. Complete Mule configuration

Show relevant XML/configuration and explain the important lines. Do not dump unexplained XML.

## 13. DataWeave boundary

Show:

```text
Incoming payload
      ↓
DataWeave
      ↓
Connector/component input
      ↓
External system / processor
      ↓
Result
      ↓
DataWeave response mapping
```

Explain payload, attributes, variables and metadata.

## 14. Realistic production example

Use synthetic customer/order/payment/shipment/notification data. Explain the business reason for every major step.

## 15. Success path

Show the normal request/message lifecycle from source to final response/state.

## 16. Failure paths

At minimum consider:

- invalid input
- missing field
- invalid type
- authentication failure
- authorization failure
- dependency unavailable
- timeout
- malformed response
- rate limit
- duplicate request/message
- partial success
- uncertain remote outcome

For each, explain **symptom → evidence → cause → safe action → prevention**.

## 17. Error handling

Explain the exact error strategy:

- propagate or continue?
- retry or not?
- fallback?
- DLQ?
- compensation?
- reconciliation?

Explain why.

## 18. Retry vs reconnection

Explicitly distinguish:

```text
Reconnection = restore a connector connection/session
Retry       = repeat an operation
```

Explain bounded attempts, backoff, timeout interaction and duplicate risk.

## 19. Idempotency

Explain how duplicate work can occur and how the implementation prevents or reconciles it.

## 20. Transactions

Explain the real transaction boundary, commit/rollback behavior and any external side effects that are outside the transaction.

## 21. Pagination / batching / streaming / concurrency

Explain which apply and why:

- pagination
- batching
- streaming
- parallelism
- back-pressure

Include memory and downstream-load trade-offs.

## 22. Security

Cover applicable:

- authentication
- authorization
- TLS/mTLS
- certificates
- secure properties/secrets
- least privilege
- PII masking
- safe logging
- secret rotation

## 23. Performance

Explain relevant:

- connection pools
- concurrency
- page/batch size
- payload size
- streaming
- downstream latency
- rate limits
- CPU/memory

Do not provide unexplained tuning numbers.

## 24. Testing strategy

Explain what to test and why:

| Case | Input/condition | Expected behavior | Evidence |
|---|---|---|---|
| Happy path | valid data | success | assertion |
| Validation | invalid data | controlled error | error assertion |
| Dependency failure | dependency unavailable | safe recovery | mock/verify |
| Timeout | delayed dependency | bounded failure | assertion |
| Duplicate | same business key | one business effect | state assertion |

## 25. MUnit strategy

Explain:

- what to mock
- what to spy
- what to verify
- what to assert
- negative-path coverage
- regression test for every production fix

## 26. Failure injection lab

Intentionally break the implementation:

1. bad property
2. invalid credentials
3. unavailable dependency
4. timeout
5. malformed response
6. duplicate message
7. certificate problem where relevant

Then diagnose and fix each failure.

## 27. Troubleshooting

Use evidence first:

```text
Symptom
  ↓
Timestamp / correlation ID
  ↓
Application log
  ↓
Exact error
  ↓
Connector/processor
  ↓
Network/auth/TLS/dependency evidence
  ↓
Controlled reproduction
  ↓
Fix
  ↓
Regression test
```

## 28. Observability

Explain:

- correlation IDs
- business IDs
- elapsed time
- operation
- safe endpoint/resource information
- retry count
- provider correlation ID
- queue/file/object state where relevant
- dashboards
- alerts

Identify values that must never be logged.

## 29. Production runbook

Explain:

- alert meaning
- evidence collection
- safe restart/retry rules
- duplicate/unknown-success handling
- reconciliation
- rollback
- recovery verification
- preventive action

## 30. Beginner exercise

15–30 minute task with an explicit expected result.

## 31. Intermediate exercise

Multi-step integration with a dependency, validation and error handling.

## 32. Advanced challenge

Add scale, failure, security, asynchronous processing, observability or deployment constraints.

## 33. Interview questions

Include:

- definition
- why
- implementation
- configuration
- comparison
- failure scenario
- production scenario
- performance scenario
- security scenario
- architecture trade-off

**Answer immediately underneath every question.**

## 34. Common mistakes

For each mistake explain:

**Why it happens → Why it is wrong → Correct approach → How to detect it.**

## 35. Version/compatibility notes

Record the tested versions and clearly mark version-sensitive behavior. Never invent a connector field or operation; verify the current official reference guide.

## 36. Official documentation

Link the relevant current MuleSoft User Guide, Reference Guide and Release Notes.

## 37. Related chapters

Link to canonical internal chapters. Avoid copying the same explanation into multiple locations.

## 38. Completion evidence

The learner must demonstrate:

```text
Explain
  ↓
Implement
  ↓
Test
  ↓
Break
  ↓
Debug
  ↓
Secure
  ↓
Scale
  ↓
Deploy
  ↓
Operate
  ↓
Recover
  ↓
Teach
```
