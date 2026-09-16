# 55 — Learning Assessment & Project Ladder

This section answers a question the repository must make explicit: **How do I know I am ready to move forward?**

The learner should not measure progress by the number of pages read. Measure progress by what can be built, tested, broken, diagnosed, secured and explained.

## 1. The learning loop

```text
LEARN
  ↓
EXPLAIN
  ↓
BUILD
  ↓
TEST
  ↓
BREAK
  ↓
DEBUG
  ↓
SECURE
  ↓
DEPLOY
  ↓
OBSERVE
  ↓
RECOVER
  ↓
TEACH
  ↺
```

A learner advances when the current loop becomes repeatable without blindly copying code.

## 2. Beginner readiness

Before moving from fundamentals to Mule development, the learner should be able to:

- explain client → HTTP → server
- identify method, URL, headers, query/path parameters and body
- read JSON and basic XML
- explain HTTP 2xx, 4xx and 5xx categories
- describe basic SQL SELECT/INSERT/UPDATE/DELETE
- use Git for clone, branch, commit and pull
- understand what Maven is used for

### Practical gate

Draw and explain:

```text
Client
  ↓ HTTP
Mule application
  ↓ SQL
Database
```

Then explain what happens when the database is unavailable.

## 3. Mule beginner readiness

You should be able to:

- explain a Mule event
- distinguish payload, attributes and variables
- explain source vs processor
- create a flow, subflow and private flow
- configure an HTTP Listener
- use Logger and Transform Message
- read application properties
- debug a request locally

### Gate

Build a small `/hello` API and explain the event after every processor.

## 4. DataWeave readiness

### Beginner

Can you transform:

```json
{"firstName":"Ravi","age":25}
```

into:

```json
{"name":"Ravi","adult":true}
```

### Intermediate

Can you handle:

- arrays
- nested objects
- nulls
- filtering
- grouping
- sorting
- reusable functions
- dates
- XML
- CSV

### Advanced

Can you explain and solve:

- recursive transformations
- dynamic selectors
- type constraints
- modules/imports
- XML namespaces
- binary data
- large payloads and streaming
- performance trade-offs

### Gate

Given only input and expected output, produce the transformation and explain why it works.

## 5. API developer readiness

```text
Requirement
    ↓
API contract
    ↓
Mock/test contract
    ↓
APIkit implementation
    ↓
Validation
    ↓
Business logic
    ↓
Tests
    ↓
Documentation
```

You should be able to design:

- resources
- methods
- request/response schemas
- errors
- pagination
- filtering
- versioning
- idempotency expectations

## 6. Integration developer readiness

A developer is ready when they can combine at least two systems and answer:

- What happens if system A succeeds and system B fails?
- What happens if the request is retried?
- What happens if the message arrives twice?
- What happens if the dependency is slow?
- Where is the correlation ID?
- Which failures are retryable?
- What is the recovery path?

## 7. Production readiness gate

A production-ready sample must contain:

| Area | Evidence |
|---|---|
| API | contract + validation |
| Data | input/output examples |
| Error handling | controlled error paths |
| Security | credentials/secrets not hard-coded |
| Tests | happy + negative paths |
| Deployment | reproducible package/deployment instructions |
| Observability | useful logs + correlation identifier |
| Operations | health/monitoring/runbook |
| Recovery | rollback or recovery procedure |
| Documentation | another engineer can operate it |

## 8. Project ladder

| Project | New skills | Exit evidence |
|---|---|---|
| 0 Hello Mule | Listener, Logger | working endpoint |
| 1 Customer Echo | JSON, DataWeave | input/output transformation |
| 2 Customer CRUD | RAML/OAS, APIkit, DB | CRUD + MUnit |
| 3 Order/Inventory | HTTP, Scatter-Gather | aggregation + failure handling |
| 4 Reliable Payment | idempotency, retry, timeout | duplicate-safe behavior |
| 5 Notifications | MQ/JMS, ACK, redelivery, DLQ | replay/recovery design |
| 6 Partner API | TLS/mTLS, OAuth/JWT, policies | secure API |
| 7 Production Service | CI/CD, deployment, monitoring | deploy + operate + rollback |
| 8 Banking Capstone | all major disciplines | end-to-end evidence |

## 9. Assessment levels

### Level A — Explain
You can describe the concept using simple language and draw it.

### Level B — Implement
You can create a minimal working implementation.

### Level C — Test
You can test happy and negative paths.

### Level D — Diagnose
You can locate the failure using evidence rather than guessing.

### Level E — Operate
You can deploy, monitor, recover and document it.

### Level F — Architect
You can choose boundaries and explain trade-offs for scale, security, availability and cost.

Do not mark a topic “complete” until the required level for the learner's target role is demonstrated.

## 10. Scenario assessment format

Every scenario should contain:

```text
SYMPTOMS
  ↓
KNOWN FACTS
  ↓
EVIDENCE TO COLLECT
  ↓
HYPOTHESES
  ↓
SAFE TEST
  ↓
ROOT CAUSE
  ↓
FIX
  ↓
REGRESSION TEST
  ↓
PREVENTION
```

Example:

**Symptom:** API returns 504.

**Do not immediately:** increase every timeout.

**Investigate:** correlation ID, Mule logs, dependency latency, DNS/network evidence, connection pool behavior and gateway/runtime timeout boundaries.

**Finish:** reproduce, fix the actual bottleneck, add a regression test or operational control, and document the runbook.

## 11. Portfolio evidence

Each completed project should leave behind:

- README
- architecture diagram
- sequence/data-flow diagram
- API contract
- configuration explanation
- source implementation
- DataWeave examples
- sample input/output
- MUnit tests
- negative tests
- failure-injection notes
- security model
- performance notes
- deployment procedure
- smoke test
- monitoring plan
- runbook
- rollback/recovery plan
- RCA example
- interview questions

## 12. Continuous progression

After Project 8, change one engineering dimension at a time:

```text
More traffic
   ↓
Larger payloads
   ↓
More downstream systems
   ↓
Higher availability requirement
   ↓
Stronger security
   ↓
Asynchronous processing
   ↓
Regional / DR requirements
   ↓
Governance
   ↓
Architecture leadership
```

There is deliberately no final score or final chapter. The goal is increasing engineering capability.
