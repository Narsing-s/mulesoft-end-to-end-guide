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
10. Operate it after deployment.

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
- [ ] Java/JVM basics needed to support Mule applications
- [ ] XML namespaces and schema validation
- [ ] Application startup/shutdown behavior

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
- [ ] Binary/base64 handling
- [ ] Java value handling
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
- [ ] Consumer onboarding and documentation
- [ ] API lifecycle and change management

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
- [ ] API composition and aggregation

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
- [ ] Back-pressure
- [ ] Concurrency limits

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
- [ ] Reconnection strategies
- [ ] Connector-specific error handling

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
- [ ] Index and query-plan concepts
- [ ] Data masking and least privilege

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
- [ ] Idempotent recovery

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
- [ ] Audit logging
- [ ] Threat modeling basics

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
- [ ] Test data management
- [ ] Regression testing

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
- [ ] Configuration drift prevention
- [ ] Release verification

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
- [ ] Capacity planning
- [ ] Runbooks
- [ ] Post-incident prevention

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
- [ ] Capacity planning
- [ ] Disaster recovery design

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
- [ ] Object Store failure/key design issue
- [ ] Scheduler overlap
- [ ] Batch job failure/restart

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
- [ ] Performance questions
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
- [ ] GitHub Pages first opens the login screen.
- [ ] The learning UI cannot be reached through a normal navigation bypass without a valid local session.
- [ ] Logout invalidates the local session and returns to login.
- [ ] Login limitations are clearly documented: static GitHub Pages cannot provide trusted server-side authentication.
- [ ] All important UI actions work on desktop and mobile.
- [ ] Local progress survives a page refresh.
- [ ] No real customer or production banking data is committed.

## Final learner gate

Before calling the journey complete, demonstrate at least one project where you can:

1. Explain the architecture.
2. Explain the Mule event.
3. Build the API.
4. Transform data with DataWeave.
5. Connect to a test dependency.
6. Handle expected and unexpected failures.
7. Write automated tests.
8. Secure the integration.
9. Configure environments safely.
10. Deploy it.
11. Observe it.
12. Investigate a deliberately injected failure.
13. Recover safely.
14. Write an RCA.
15. Explain the design trade-offs to another engineer.

If any of these are missing, the learner should continue the relevant track rather than treating the repository as finished.
