# 37 — Complete MuleSoft Coverage Map

Use this page to check topics that are often missed after the normal beginner/intermediate curriculum.

## Runtime and development

- [ ] Mule event lifecycle
- [ ] event source vs processor
- [ ] flow/subflow/private flow
- [ ] scopes
- [ ] XML DSL and namespaces
- [ ] global configuration
- [ ] property resolution
- [ ] secure properties
- [ ] application lifecycle
- [ ] JVM/Java compatibility
- [ ] classloading/dependency conflicts
- [ ] Maven dependency management
- [ ] custom Java integration
- [ ] custom extensions/connectors concepts

## DataWeave advanced

- [ ] types
- [ ] type aliases
- [ ] coercion
- [ ] modules/imports
- [ ] reusable functions
- [ ] lambdas
- [ ] pattern matching
- [ ] update operator
- [ ] recursive structures
- [ ] XML namespaces
- [ ] CSV reader/writer behavior
- [ ] MIME types
- [ ] binary/base64
- [ ] Date/DateTime/LocalDate/Time
- [ ] timezone correctness
- [ ] streaming
- [ ] large-payload strategy
- [ ] transformation performance
- [ ] DataWeave error handling

## API implementation

- [ ] HTTP Listener
- [ ] HTTP Request
- [ ] headers
- [ ] query/path parameters
- [ ] content negotiation
- [ ] RAML
- [ ] OpenAPI
- [ ] APIkit routing
- [ ] APIkit validation
- [ ] API Console
- [ ] reusable API types
- [ ] traits/components
- [ ] pagination
- [ ] filtering/sorting
- [ ] idempotency
- [ ] CORS
- [ ] OPTIONS/preflight
- [ ] API versioning
- [ ] backward compatibility
- [ ] deprecation
- [ ] SOAP/Web Service Consumer
- [ ] OData/GraphQL awareness where used

## API-led architecture

- [ ] System API
- [ ] Process API
- [ ] Experience API
- [ ] ownership boundaries
- [ ] canonical models
- [ ] orchestration
- [ ] reusability
- [ ] avoiding unnecessary layers
- [ ] synchronous/asynchronous trade-offs
- [ ] event-driven architecture
- [ ] API governance
- [ ] API lifecycle

## Resilience

- [ ] timeout
- [ ] retry
- [ ] exponential/backoff strategy
- [ ] retry classification
- [ ] idempotency
- [ ] deduplication
- [ ] redelivery
- [ ] DLQ
- [ ] poison message
- [ ] circuit-breaker concept
- [ ] bulkhead concept
- [ ] fallback/degraded response
- [ ] compensation
- [ ] reconciliation
- [ ] partial failure strategy

## Connectors

- [ ] HTTP
- [ ] Database
- [ ] File
- [ ] FTP/SFTP
- [ ] JMS
- [ ] IBM MQ
- [ ] Anypoint MQ
- [ ] VM
- [ ] Object Store
- [ ] Email/SMTP
- [ ] SOAP
- [ ] Salesforce/SaaS
- [ ] connection pools
- [ ] reconnection
- [ ] connector timeouts
- [ ] connector error types
- [ ] transaction behavior

## Database

- [ ] parameterized SQL
- [ ] CRUD
- [ ] stored procedures
- [ ] transactions
- [ ] rollback/commit
- [ ] connection pool
- [ ] indexes
- [ ] query performance
- [ ] pagination
- [ ] batch operations
- [ ] deadlocks
- [ ] isolation/concurrency concepts
- [ ] optimistic concurrency
- [ ] safe update/delete behavior
- [ ] DB timeout diagnosis

## Messaging

- [ ] producer
- [ ] consumer
- [ ] queue/topic concepts
- [ ] acknowledgement
- [ ] redelivery
- [ ] ordering
- [ ] duplicate delivery
- [ ] idempotent consumer
- [ ] DLQ
- [ ] poison message
- [ ] message correlation
- [ ] back-pressure
- [ ] JMS transaction behavior
- [ ] IBM MQ troubleshooting

## Security

- [ ] TLS
- [ ] certificates
- [ ] keystore
- [ ] truststore
- [ ] certificate rotation
- [ ] mTLS
- [ ] Basic authentication
- [ ] OAuth 2.0
- [ ] JWT
- [ ] claims/scopes
- [ ] authorization
- [ ] client identity
- [ ] API policies
- [ ] rate limiting
- [ ] threat protection
- [ ] CORS
- [ ] secure properties
- [ ] secret rotation
- [ ] PII masking
- [ ] safe logs
- [ ] least privilege
- [ ] dependency scanning

## Testing

- [ ] MUnit
- [ ] mocks
- [ ] spies
- [ ] verify
- [ ] assertions
- [ ] error-path tests
- [ ] transformation tests
- [ ] connector isolation
- [ ] integration tests
- [ ] contract tests
- [ ] API tests
- [ ] Postman
- [ ] performance/load testing concepts
- [ ] CI quality gates
- [ ] coverage interpretation

## Deployment

- [ ] Maven build
- [ ] Mule Maven Plugin
- [ ] environment properties
- [ ] secure deployment values
- [ ] Runtime Manager
- [ ] CloudHub
- [ ] CloudHub 2.0
- [ ] Runtime Fabric
- [ ] hybrid/on-prem
- [ ] Runtime Manager agent concepts
- [ ] artifact promotion
- [ ] CI/CD
- [ ] rollback
- [ ] smoke testing
- [ ] health verification
- [ ] version tracking

## Observability

- [ ] structured logging
- [ ] correlation ID
- [ ] request ID
- [ ] metrics
- [ ] latency
- [ ] throughput
- [ ] error rate
- [ ] availability
- [ ] dashboards
- [ ] actionable alerts
- [ ] distributed tracing
- [ ] OpenTelemetry awareness
- [ ] JVM/GC diagnostics
- [ ] dependency metrics

## Production support

- [ ] incident triage
- [ ] impact assessment
- [ ] evidence collection
- [ ] mitigation
- [ ] rollback
- [ ] root cause analysis
- [ ] contributing factors
- [ ] corrective action
- [ ] preventive action
- [ ] runbook
- [ ] change management
- [ ] post-incident review

## Performance

- [ ] measure before optimize
- [ ] latency decomposition
- [ ] throughput
- [ ] concurrency
- [ ] streaming
- [ ] memory pressure
- [ ] GC
- [ ] large payloads
- [ ] DataWeave performance
- [ ] DB query performance
- [ ] connection pools
- [ ] downstream latency
- [ ] batch sizing
- [ ] load testing
- [ ] capacity planning

## Architecture

- [ ] coupling
- [ ] cohesion
- [ ] boundaries
- [ ] authoritative data source
- [ ] consistency model
- [ ] availability
- [ ] scalability
- [ ] disaster recovery
- [ ] RTO/RPO concepts
- [ ] multi-environment design
- [ ] event-driven vs synchronous trade-offs
- [ ] ADRs
- [ ] anti-patterns

## Interview readiness

- [ ] explain project end to end
- [ ] explain one production incident
- [ ] write DataWeave without copying
- [ ] troubleshoot 405/415/502/504
- [ ] design idempotent payment
- [ ] design asynchronous workflow
- [ ] explain DB pool exhaustion
- [ ] explain MQ redelivery
- [ ] explain TLS/mTLS
- [ ] explain OAuth/JWT
- [ ] explain MUnit mocking
- [ ] explain CI/CD
- [ ] explain API-led trade-offs
- [ ] explain performance diagnosis
- [ ] explain rollback

## Final standard

A topic is **covered** only when you can:

> **Explain it clearly → implement it → test it → break it → troubleshoot it → secure it → measure it → deploy it → operate it → answer an interview question about it.**
