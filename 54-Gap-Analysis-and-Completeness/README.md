# 54 — Gap Analysis & Completeness

This is the maintenance gate for keeping the guide genuinely **deep, end-to-end and explainable**.

## The new repo-wide rule

A topic is not complete because it has a title, checklist or short definition. It is complete when a learner can understand it, configure/build it, observe its runtime behavior, deliberately break it, diagnose it, secure it, test it and operate it.

See the canonical contracts:

- `53-End-to-End-Study-Path/REPO-WIDE-DEEP-EXPLANATION-STANDARD.md`
- `53-End-to-End-Study-Path/LESSON-TEMPLATE.md`

## Coverage matrix

| Area | Required coverage | Deep explanation evidence |
|---|---|---|
| Fundamentals | HTTP, Mule event, flows, scopes, variables, components | plain English + runtime lifecycle + smallest example + failure behavior |
| DataWeave | Beginner → advanced, formats, modules, performance, debugging | syntax + input + code + output + edge cases + production use case |
| APIs | RAML/OAS, APIkit, REST, versioning, error contracts | contract + request/response + validation + implementation + security |
| API-led | Experience, Process, System APIs, reuse and boundaries | architecture + responsibility + data flow + trade-offs |
| Integration | DB, HTTP, SFTP, File, MQ/JMS, SaaS/enterprise connectors | configuration field-by-field + operation + errors + retry/idempotency |
| Error handling | Error types, scopes, retries, timeout, fallback, DLQ | event/error flow + propagate/continue + retry safety + recovery |
| Security | TLS/mTLS, OAuth/JWT, policies, secrets, certificates, PII | threat → control → config → verification → failure → monitoring |
| Testing | MUnit, mocking, verification, coverage, CI execution | what to mock + what to assert + failure injection + regression |
| Deployment | CloudHub, CloudHub 2.0, Runtime Fabric, Hybrid, PCE/on-prem | build → package → configure → deploy → verify → rollback |
| Platform | Control/runtime plane, Access Management, Exchange, Runtime Manager | purpose + lifecycle + permissions + operational evidence |
| API management | Policies, instances, analytics, governance, lifecycle | request path + policy behavior + failure + verification |
| DevOps | Git, Maven, CI/CD, promotion, rollback, release evidence | pipeline stages + artifact/version + failure recovery |
| Observability | Logs, metrics, alerts, correlation, dashboards, RCA | evidence model + safe logging + alert → diagnosis flow |
| Performance | Streaming, memory, concurrency, DB tuning, load testing | bottleneck model + trade-offs + measurement + safe tuning |
| Messaging | Delivery semantics, ordering, duplicate handling, DLQ, replay | producer → broker → consumer + ACK/offset + duplicate/replay behavior |
| Architecture | HA, DR, resiliency, sync/async, event-driven, ADRs | decision context + alternatives + trade-offs + failure domains |
| Production support | Incident, change, maintenance, runbooks, rotations | symptom → evidence → diagnosis → fix → verification → prevention |
| Labs | Hands-on implementation + failure injection + validation | build → break → diagnose → fix → test |
| Projects | Portfolio/capstone applications with tests and deployment | end-to-end architecture + security + operations + recovery |
| Career | Role paths, scenarios, interviews, portfolio, certification prep | reasoning-based Q&A and scenario answers |

## Mandatory questions for every topic

1. What is it?
2. What problem does it solve?
3. How does it work at runtime?
4. What are the important terms?
5. When should it be used?
6. When should it not be used?
7. What are the alternatives and trade-offs?
8. How is it configured?
9. What does every important configuration field mean?
10. What are the inputs and outputs?
11. What does the XML/configuration look like?
12. What happens on the happy path?
13. What can fail?
14. What exact evidence identifies the failure?
15. Should the failure be retried, reconnected, propagated, continued, compensated or reconciled?
16. What is the duplicate/idempotency risk?
17. What is the transaction boundary?
18. What are the performance/scaling implications?
19. What security controls apply?
20. How do you test it with MUnit/integration tests?
21. How do you intentionally break it?
22. How do you troubleshoot it?
23. How do you monitor it?
24. What is the production runbook?
25. What version/runtime assumptions apply?
26. What are the common interview questions, with answers immediately underneath?

## Configuration-field quality gate

For every meaningful configuration field, require:

```text
Field
 ↓
What it means
 ↓
Why it exists
 ↓
Where configured
 ↓
Example value
 ↓
Runtime effect
 ↓
Wrong-value symptom
 ↓
Verification method
 ↓
Production/security/performance note
```

This rule is especially important for connectors because a connector can have many configuration fields whose behavior is not obvious from the field name.

## Connector-specific completeness gate

Every connector chapter must additionally cover, when applicable:

- Exchange installation and dependency
- runtime/Java compatibility
- global configuration
- connection provider
- endpoint/host/port/tenant/region
- authentication
- TLS/mTLS/certificates
- proxy/networking
- timeout
- reconnection
- bounded retry/backoff
- source/trigger
- important operations and fields
- DataWeave input/output
- metadata
- XML
- connector error types
- error strategy
- idempotency
- transactions
- pagination
- batching
- streaming
- pooling/concurrency
- quotas/rate limits
- MUnit success/failure/timeout tests
- logging/masking/correlation IDs
- monitoring/alerts
- troubleshooting
- security
- production runbook
- hands-on lab
- interview Q&A
- version notes
- current official docs

## Anti-duplication rule

Keep one canonical explanation for each topic. Other sections should link to that explanation instead of copying it. Scenario, interview and lab folders should reference the canonical technical topic.

The exception is a short contextual explanation required to make a page understandable; link back to the canonical deep explanation for the full treatment.

## Shallow-content detection

Flag a page for expansion when it contains any of these patterns:

- a list of configuration fields without explanations
- XML without line-by-line purpose
- code without input/output
- an operation name without explaining the external side effect
- “handle errors” without specifying error behavior
- “add retry” without idempotency discussion
- “configure TLS” without certificate/truststore explanation
- “use MUnit” without mock/assert/verify strategy
- “check logs” without evidence and diagnosis steps
- “production ready” without monitoring/recovery/runbook
- interview questions without answers

## Content quality gate

A new or expanded topic is complete only when it has:

```text
Explanation
 +
Configuration
 +
Working example
 +
Input / Output
 +
Runtime behavior
 +
Failure scenarios
 +
Testing
 +
Security
 +
Performance
 +
Observability
 +
Troubleshooting
 +
Production operation
 +
Exercises
 +
Interview Q&A
 +
Version evidence
```

## Final acceptance test

Ask a learner to explain the topic without opening the source code. Then ask them to build it, break it, diagnose the failure and explain how they would operate it in production.

If they cannot do those steps, the topic still needs deeper explanation.
