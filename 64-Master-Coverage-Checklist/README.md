# 64 — Master MuleSoft Coverage Checklist

This checklist is the repository's **coverage contract**. The goal is not to collect links; it is to make the repository teach the complete journey from zero knowledge to production engineering.

## How to use it

For every topic, the learner should be able to:

1. Explain it in simple words.
2. Explain why it exists.
3. Build a small example.
4. Test the happy path and negative path.
5. Break it intentionally.
6. Troubleshoot the failure.
7. Explain security and production concerns.
8. Describe when to use it and when not to use it.
9. Explain one realistic interview scenario.

## Coverage inventory

### Foundations

- [ ] Integration and API concepts
- [ ] HTTP request/response lifecycle
- [ ] HTTP methods, status codes, headers and content types
- [ ] URI, query parameter and path parameter
- [ ] JSON, XML, CSV and form-style payloads
- [ ] Mule Runtime and application lifecycle
- [ ] Mule event, message, payload and attributes
- [ ] Variables and scopes
- [ ] Flow, subflow and private flow
- [ ] Message processors and execution order
- [ ] Connectors and operations
- [ ] Anypoint Studio project structure
- [ ] Maven project structure
- [ ] `pom.xml` and dependency management
- [ ] `mule-artifact.json`
- [ ] Resources and configuration files
- [ ] Logging and correlation IDs

### DataWeave

- [ ] DataWeave syntax and expressions
- [ ] Selectors
- [ ] Objects and arrays
- [ ] `map`, `mapObject`, `filter`, `filterObject`
- [ ] `reduce`
- [ ] `groupBy`, `orderBy`, `distinctBy`, `pluck`
- [ ] `flatten`, `flatMap`, `joinBy`
- [ ] String, number, date and time handling
- [ ] Null handling and defaults
- [ ] Type coercion
- [ ] Variables and functions
- [ ] Reusable modules
- [ ] Pattern matching and conditional logic
- [ ] JSON/XML/CSV transformations
- [ ] MIME types and metadata
- [ ] Schemas and validation
- [ ] Performance and streaming considerations
- [ ] DataWeave testing/debugging
- [ ] Production-safe transformations

### API development

- [ ] REST concepts
- [ ] RAML fundamentals
- [ ] OAS fundamentals
- [ ] API-first vs implementation-first
- [ ] APIkit routing
- [ ] APIkit validation
- [ ] Resource and method flows
- [ ] Request/response examples
- [ ] Headers and content negotiation
- [ ] Pagination
- [ ] Filtering, sorting and searching
- [ ] Validation and business errors
- [ ] Error response contract
- [ ] API versioning
- [ ] Backward compatibility
- [ ] Deprecation
- [ ] CORS and browser preflight
- [ ] 400/401/403/404/405/406/409/415/429 handling
- [ ] REST vs SOAP vs messaging trade-offs

### API-led connectivity

- [ ] System APIs
- [ ] Process APIs
- [ ] Experience APIs
- [ ] Layer responsibilities
- [ ] Consumer-specific orchestration
- [ ] Canonical data models
- [ ] Reuse vs duplication decisions
- [ ] API governance
- [ ] Contract ownership
- [ ] Dependency boundaries
- [ ] Avoiding over-layering

### Integration patterns

- [ ] Request-response
- [ ] One-way/asynchronous processing
- [ ] Fire-and-forget concepts
- [ ] Choice/content-based routing
- [ ] For Each
- [ ] Parallel For Each
- [ ] Scatter-Gather
- [ ] Aggregation
- [ ] Batch
- [ ] Retry
- [ ] Timeout
- [ ] Circuit-breaker concepts
- [ ] Idempotency
- [ ] Deduplication
- [ ] Queue-based load leveling
- [ ] Dead-letter queues
- [ ] Poison-message handling
- [ ] Transactional processing
- [ ] Compensating actions
- [ ] Graceful degradation

### Connectors and enterprise integration

- [ ] HTTP
- [ ] Database
- [ ] File
- [ ] SFTP
- [ ] JMS
- [ ] IBM MQ concepts
- [ ] Anypoint MQ concepts
- [ ] SOAP/WSDL
- [ ] SMTP/email
- [ ] Scheduler
- [ ] Object Store
- [ ] SaaS connector concepts
- [ ] Connection pools
- [ ] Timeouts
- [ ] Retry policies
- [ ] Acknowledgement behavior
- [ ] Ordering and duplicate delivery

### Database integration

- [ ] Parameterized SQL
- [ ] SQL injection prevention
- [ ] Select/insert/update/delete
- [ ] Transactions
- [ ] Commit/rollback
- [ ] Connection pools
- [ ] Pool exhaustion diagnosis
- [ ] Slow query diagnosis
- [ ] Pagination
- [ ] Optimistic/concurrency considerations
- [ ] Safe update/delete practices
- [ ] Mapping DB rows to API contracts
- [ ] Secret management
- [ ] Migration/schema discipline

### Error handling and reliability

- [ ] Mule error model
- [ ] Error types
- [ ] On Error Continue
- [ ] On Error Propagate
- [ ] Try scope
- [ ] Global error handlers
- [ ] Error mapping
- [ ] Error payload design
- [ ] Retry vs propagate decisions
- [ ] Timeouts
- [ ] Partial failure handling
- [ ] Safe logging
- [ ] Correlation IDs
- [ ] Incident evidence
- [ ] Recovery and replay
- [ ] RCA and prevention

### Security

- [ ] Authentication vs authorization
- [ ] TLS
- [ ] Keystore
- [ ] Truststore
- [ ] Certificate lifecycle
- [ ] mTLS
- [ ] OAuth 2.0 concepts
- [ ] JWT concepts
- [ ] API policies
- [ ] Client credentials concepts
- [ ] Secure configuration
- [ ] Secret rotation
- [ ] Least privilege
- [ ] PII/credential masking
- [ ] Secure error responses
- [ ] Dependency vulnerability checks
- [ ] Security testing

### Testing

- [ ] Unit-level thinking
- [ ] MUnit structure
- [ ] Assertions
- [ ] Mocks
- [ ] Spies
- [ ] Verify calls
- [ ] Happy-path tests
- [ ] Negative tests
- [ ] Error-handler tests
- [ ] Connector failure tests
- [ ] Contract tests
- [ ] Integration tests
- [ ] Load/stress testing concepts
- [ ] Security testing concepts
- [ ] Coverage as evidence, not the only quality signal
- [ ] CI quality gates

### Deployment and DevOps

- [ ] Maven build lifecycle
- [ ] Packaging a Mule application
- [ ] Environment separation
- [ ] Property files
- [ ] Secure properties
- [ ] Deployment configuration
- [ ] Runtime compatibility
- [ ] CloudHub concepts
- [ ] CloudHub 2.0 concepts
- [ ] Runtime Fabric concepts
- [ ] Hybrid/standalone concepts
- [ ] Private networking concepts
- [ ] CI/CD pipeline stages
- [ ] Artifact promotion
- [ ] Change records
- [ ] Rollback strategy
- [ ] Smoke testing
- [ ] Blue/green concepts
- [ ] Canary concepts

### Operations

- [ ] Logs
- [ ] Metrics
- [ ] Distributed correlation
- [ ] Dashboards
- [ ] Alerts
- [ ] SLO/SLA concepts
- [ ] Latency
- [ ] Throughput
- [ ] Concurrency
- [ ] Memory pressure
- [ ] Thread/concurrency bottlenecks
- [ ] Dependency latency
- [ ] DB pool monitoring
- [ ] Queue backlog
- [ ] Certificate expiry monitoring
- [ ] Incident triage
- [ ] L1/L2/L3/L4 support boundaries
- [ ] RCA
- [ ] Shift handover
- [ ] Disaster recovery
- [ ] RPO/RTO
- [ ] High availability

### Architecture

- [ ] Synchronous vs asynchronous architecture
- [ ] API-led architecture
- [ ] Event-driven architecture
- [ ] Canonical model
- [ ] Decoupling
- [ ] Scalability
- [ ] Availability
- [ ] Resilience
- [ ] Failure domains
- [ ] Backpressure
- [ ] Data consistency
- [ ] Distributed transactions and their limits
- [ ] Governance
- [ ] API lifecycle
- [ ] Architecture decision records
- [ ] Cost/complexity trade-offs

### Production scenarios

- [ ] 404 incident
- [ ] 405 caused by method/preflight mismatch
- [ ] 415 caused by content type/body mismatch
- [ ] 401/403 authentication/authorization issue
- [ ] 429 traffic limit issue
- [ ] 500 application error
- [ ] 502 gateway/upstream issue
- [ ] 503 unavailable dependency/runtime
- [ ] 504 timeout
- [ ] TLS handshake/certificate failure
- [ ] Database pool exhaustion
- [ ] Slow database query
- [ ] MQ backlog
- [ ] Duplicate message/payment/order
- [ ] Memory pressure
- [ ] Slow external dependency
- [ ] Failed deployment
- [ ] Bad configuration promotion
- [ ] Certificate expiry
- [ ] Partial Scatter-Gather failure

### Interview readiness

- [ ] Fundamentals questions
- [ ] DataWeave coding
- [ ] APIkit troubleshooting
- [ ] Error-handling scenarios
- [ ] DB scenarios
- [ ] Messaging scenarios
- [ ] Security scenarios
- [ ] MUnit scenarios
- [ ] Deployment questions
- [ ] Production support questions
- [ ] Architecture questions
- [ ] Project explanation
- [ ] Trade-off explanation
- [ ] Incident explanation
- [ ] Root-cause explanation

## Missing-topic rule

A topic is **not complete** merely because a heading exists. A production-ready lesson should contain:

> Definition → mental model → prerequisites → syntax/configuration → complete example → expected result → common mistakes → troubleshooting → security → performance → testing → production considerations → lab → interview questions.

If one of these is absent, treat the lesson as an improvement candidate rather than claiming the topic is fully covered.

## Repository quality gate

Before calling the guide complete, verify:

- [ ] A beginner can start without prior MuleSoft knowledge.
- [ ] The main path does not require external documentation.
- [ ] Examples use consistent terminology.
- [ ] XML and DataWeave examples explain their inputs and outputs.
- [ ] Every major integration pattern has a failure case.
- [ ] Security lessons do not teach unsafe secret handling.
- [ ] Tests include negative/error paths.
- [ ] Production lessons include observability and recovery.
- [ ] Interview questions are practice material, not claimed leaked proprietary questions.
- [ ] External links are optional references only.
- [ ] The GitHub Pages UI requires a successful local login before opening the learning portal.
- [ ] The login limitation is clearly documented: static GitHub Pages cannot provide trusted server-side authentication.
