# 61 — Architecture Decision Playbook

A practical decision system for designing MuleSoft integrations instead of memorizing components.

## 1. Start With the Contract

Define:
- consumers and providers
- request/response or event contract
- ownership
- SLA/SLO
- security classification
- expected volume and peak volume
- failure and recovery requirements

## 2. Choose the API Boundary

### System API
Use when exposing a stable view of a system of record.

### Process API
Use when combining or orchestrating business capabilities.

### Experience API
Use when shaping data for a specific channel or consumer experience.

Avoid creating API layers only because a diagram looks cleaner. Every layer should have a responsibility.

## 3. Synchronous vs Asynchronous

Choose synchronous when the caller needs an immediate response and the operation can complete within the agreed timeout.

Choose asynchronous messaging when work can continue independently, traffic is bursty, downstream systems are slow, or durable retry/recovery is required.

## 4. Reliability Decisions

For every integration answer:
1. What can fail?
2. How is failure detected?
3. Is retry safe?
4. How is duplicate processing prevented?
5. Where does an unrecoverable message go?
6. How can an operator replay or recover it?

## 5. Data Ownership

Do not casually copy a system of record into another database. Document source-of-truth ownership, synchronization direction, freshness expectations and reconciliation.

## 6. Performance

Measure before optimizing. Record:
- throughput
- p50/p95/p99 latency
- payload size
- concurrency
- connector latency
- CPU/memory behavior
- downstream limits

## 7. Security

Decide explicitly:
- TLS/mTLS
- authentication
- authorization
- secret storage
- encryption
- PII handling
- logging redaction
- least-privilege access
- certificate/secret rotation

## 8. Deployment Decision Matrix

Document why a workload uses CloudHub, CloudHub 2.0, Runtime Fabric, or another supported target. Consider networking, isolation, operational ownership, scaling, compliance, latency and platform capabilities.

## 9. ADR Template

```text
Title:
Context:
Problem:
Constraints:
Options considered:
Decision:
Why:
Consequences:
Risks:
Rollback/exit strategy:
Owner:
Review date:
```

## 10. Architecture Review Checklist

- [ ] Contract defined
- [ ] API ownership defined
- [ ] Error model defined
- [ ] Retry/idempotency strategy defined
- [ ] Timeout strategy defined
- [ ] Security controls defined
- [ ] Observability defined
- [ ] Capacity assumptions recorded
- [ ] Deployment target justified
- [ ] Recovery/replay procedure documented
- [ ] Test strategy defined
- [ ] ADR recorded

## Exercises

1. Convert a synchronous payment integration into an asynchronous design and explain the trade-offs.
2. Design System/Process/Experience API boundaries for a banking use case.
3. Review an integration with no timeout, retry or idempotency strategy and produce an ADR.
4. Create a failure matrix for HTTP, DB, MQ and SFTP dependencies.
