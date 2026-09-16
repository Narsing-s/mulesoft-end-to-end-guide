# MuleSoft End-to-End Learning Map

This is the recommended order for a beginner. The canonical detailed route is `53-End-to-End-Study-Path/README.md`.

## Master route

```text
0. ZERO KNOWLEDGE
   ↓
1. Foundations
   ↓
2. Mule Applications / Runtime
   ↓
3. DataWeave
   ↓
4. API Development
   ↓
5. API-Led Connectivity
   ↓
6. Error Handling + Reliability
   ↓
7. Connectors + Database + Messaging
   ↓
8. Security + API Management
   ↓
9. MUnit + Integration Testing
   ↓
10. Deployment + Maven + CI/CD
   ↓
11. Observability + Production Support
   ↓
12. Performance + Advanced Engineering
   ↓
13. Platform Architecture + Governance
   ↓
14. Hands-On Labs + Pattern Cookbook
   ↓
15. Banking Capstone
   ↓
16. Senior Architecture / Production Engineering
   ↓
17. Continuous learning — there is no final end
```

## Stage 0 — Before MuleSoft

Learn HTTP, REST, JSON, XML, XML namespaces, HTTP methods, status codes, headers, query parameters, path parameters, authentication basics, Git, Maven, Java/JVM basics, SQL basics and basic command-line usage.

**Gate:** draw a simple client → Mule → database integration and explain every arrow.

## Stage 1 — Mule 4 Foundations

- Mule Runtime Engine
- Mule application/project structure
- flow, subflow and private flow
- Mule event, message, payload, attributes and variables
- event sources and event processors
- connectors and operations
- global configurations
- XML configuration
- properties and secure properties
- application lifecycle
- logging
- Scheduler
- debugging

**Gate:** build a local HTTP flow and explain what changes after every processor.

## Stage 2 — DataWeave

### Beginner
- `%dw` header and output directives
- objects and arrays
- selectors
- variables
- strings, numbers and booleans
- `if/else`
- `default`

### Intermediate
- `map`
- `filter`
- `reduce`
- `distinctBy`
- `groupBy`
- `orderBy`
- `mapObject`
- `filterObject`
- `pluck`
- `flatMap`
- functions and lambdas
- type coercion
- dates and times
- null handling

### Advanced
- types/type aliases
- pattern matching
- recursive transformations
- modules/imports
- reusable libraries
- XML namespaces/attributes
- Java/binary data
- MIME types
- streaming
- performance
- testing and debugging

**Gate:** receive a realistic input and produce the expected output without copying a solution.

## Stage 3 — API Development

- HTTP Listener and HTTP Request
- RAML
- OpenAPI/OAS
- APIkit
- API Console
- validation
- URI/query parameters
- headers
- request/response examples
- status codes
- error contracts
- pagination/filtering/sorting
- versioning
- CORS
- TLS
- API documentation

**Gate:** contract-first API → implementation → tests → documented error responses.

## Stage 4 — Integration Patterns

- Choice
- Try
- For Each
- Parallel For Each
- Scatter-Gather
- Async
- Until Successful
- Batch
- Scheduler
- VM
- Object Store
- idempotency
- retry and redelivery
- synchronous vs asynchronous processing
- timeout/fallback
- aggregation
- compensation
- DLQ/poison-message handling

**Gate:** deliberately break a downstream dependency and demonstrate a controlled recovery strategy.

## Stage 5 — Enterprise Connectors

HTTP, Database, File, SFTP, FTP, JMS, IBM MQ, Anypoint MQ, Email/SMTP, SOAP Web Service Consumer, Salesforce/SaaS and other project-relevant connectors.

For each connector learn authentication, connection configuration, timeout, reconnection, error types, pooling where applicable, test strategy and operational troubleshooting.

## Stage 6 — API-Led Connectivity

```text
Experience API
      ↓
Process API
      ↓
System API
      ↓
System of Record
```

Learn ownership boundaries, orchestration, canonical models, reusability, consumer-specific representations, anti-patterns and when an API-led layer is unnecessary.

## Stage 7 — Errors and Reliability

- Mule error model
- error types/description/cause
- `on-error-continue`
- `on-error-propagate`
- Try scope
- global error handling
- custom errors
- Raise Error
- retryable/non-retryable classification
- timeouts
- fallback
- idempotency
- transaction boundaries
- DLQ/recovery
- safe client responses

## Stage 8 — Security and API Management

- client identity
- OAuth 2.0
- JWT
- Basic authentication
- TLS/mTLS
- secure properties
- secret management
- CORS
- rate limiting
- SLA concepts
- threat protection concepts
- API Manager
- Exchange
- client applications
- contracts/policies
- analytics
- governance
- lifecycle/version/deprecation

## Stage 9 — Testing

- MUnit
- mocks
- spies
- verify calls
- assertions
- error-path tests
- parameterized testing concepts
- coverage
- integration testing
- contract testing
- Postman
- CI quality gates
- test-data strategy

## Stage 10 — Deployment and DevOps

- Maven lifecycle
- Mule Maven Plugin
- Runtime Manager
- CloudHub
- CloudHub 2.0
- Runtime Fabric
- Hybrid/standalone on-prem runtime
- environment properties
- Git branching
- CI/CD
- artifact promotion
- release versioning
- rollback
- smoke tests
- deployment evidence
- secrets

Current MuleSoft documentation describes Runtime Manager as the unified management interface across supported runtime planes and documents CloudHub 2.0 application/infrastructure APIs. citeturn0search0turn0search1

## Stage 11 — Production Engineering

- logs and correlation IDs
- monitoring
- alerts
- metrics
- dashboards
- latency/throughput/error rate
- CPU/memory/GC investigation
- connection pools
- dependency latency
- HTTP 4xx/5xx troubleshooting
- TLS failures
- DB failures
- MQ failures
- deployment failures
- incident response
- mitigation
- RCA
- corrective/preventive actions
- runbooks
- change management

## Stage 12 — Advanced Engineering

- concurrency
- streaming
- memory pressure
- back-pressure
- resiliency patterns
- scalability
- availability
- disaster recovery
- event-driven architecture
- synchronous/asynchronous trade-offs
- canonical data models
- governance
- ADRs
- architecture anti-patterns

## Stage 13 — Platform Architecture

Study `45-Platform-Architecture` for:

- control plane vs runtime plane
- organizations/business groups/environments
- Access Management
- Exchange/API Manager/Runtime Manager
- CloudHub/CloudHub 2.0
- Runtime Fabric
- Hybrid/On-Prem/PCE concepts
- networking and private connectivity
- deployment topology
- platform responsibility boundaries

CloudHub 2.0 architecture includes platform services, Runtime Manager and elastic runtime replicas; exact topology and capabilities are version/deployment dependent. citeturn0search6

## Stage 14 — Hands-On Labs

Use `40-Hands-On-Labs` and `41-Integration-Patterns-Cookbook`.

Every lab follows:

```text
Build → Test → Break → Observe → Diagnose → Fix → Secure → Deploy → Recover
```

## Stage 15 — Capstone

Build `17-Real-World-Project` from requirement through production operation.

```text
Requirement
 ↓
RAML/OAS
 ↓
Experience API
 ↓
Process API
 ↓
System APIs
 ├── DB
 ├── MQ/JMS
 └── SaaS/External
 ↓
DataWeave + Validation
 ↓
Errors + Retry + Idempotency
 ↓
Security + Policies
 ↓
MUnit + Integration Tests
 ↓
Maven + CI/CD
 ↓
Deployment
 ↓
Observe + Alert
 ↓
Incident + RCA + Recovery
```

## Stage 16 — Senior / Architect

Use `45`, `46`, `47`, `48`, `49`, `50`, `51`, `52`, `35` and `44` to deepen architecture, runtime, security, messaging, release, operations, governance and career skills.

## Stage 17 — No final end

The goal is not to finish reading folders. The goal is to repeatedly increase engineering difficulty:

```text
Understand
   ↓
Build
   ↓
Test
   ↓
Break
   ↓
Debug
   ↓
Secure
   ↓
Deploy
   ↓
Observe
   ↓
Recover
   ↓
Architect
   ↓
Teach
   ↺
```

When one loop becomes easy, increase payload size, traffic, number of systems, security requirements, failure rate, latency, availability requirements or deployment complexity.
