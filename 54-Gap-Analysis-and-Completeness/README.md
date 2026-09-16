# 54 — Gap Analysis & Completeness

This is the maintenance checklist for keeping the guide genuinely end-to-end.

## Coverage matrix

| Area | Required coverage |
|---|---|
| Fundamentals | HTTP, Mule event, flows, scopes, variables, components |
| DataWeave | Beginner → advanced, formats, modules, performance, debugging |
| APIs | RAML/OAS, APIkit, REST, versioning, error contracts |
| API-led | Experience, Process, System APIs, reuse and boundaries |
| Integration | DB, HTTP, SFTP, File, MQ/JMS, SaaS/enterprise connectors |
| Error handling | Error types, scopes, retries, timeout, fallback, DLQ |
| Security | TLS/mTLS, OAuth/JWT, policies, secrets, certificates, PII |
| Testing | MUnit, mocking, verification, coverage, CI execution |
| Deployment | CloudHub, CloudHub 2.0, Runtime Fabric, Hybrid, PCE/on-prem |
| Platform | Control/runtime plane, Access Management, Exchange, Runtime Manager |
| API management | Policies, instances, analytics, governance, lifecycle |
| DevOps | Git, Maven, CI/CD, promotion, rollback, release evidence |
| Observability | Logs, metrics, alerts, correlation, dashboards, RCA |
| Performance | Streaming, memory, concurrency, DB tuning, load testing |
| Messaging | Delivery semantics, ordering, duplicate handling, DLQ, replay |
| Architecture | HA, DR, resiliency, sync/async, event-driven, ADRs |
| Production support | Incident, change, maintenance, runbooks, rotations |
| Labs | Hands-on implementation + failure injection + validation |
| Projects | Portfolio/capstone applications with tests and deployment |
| Career | Role paths, scenarios, interviews, portfolio, certification prep |

## Every topic must answer
1. What is it?
2. Why is it used?
3. When should it be used?
4. When should it not be used?
5. How do you implement it?
6. What can fail?
7. How do you test it?
8. How do you monitor it?
9. How do you secure it?
10. How does it behave in production?
11. What are the common interview questions?
12. What version/runtime assumptions apply?

## Anti-duplication rule
Keep one canonical explanation for each topic. Other sections should link to that explanation instead of copying it. Scenario, interview and lab folders should reference the canonical technical topic.

## Content quality gate
A new topic is complete only when it has explanatory content, examples, practical exercises, failure cases and production considerations. Version-sensitive content must name its tested Mule runtime, Java, DataWeave/connector version and deployment target.
