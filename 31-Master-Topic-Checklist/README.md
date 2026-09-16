# 31 — Master MuleSoft Topic Checklist

Use this as the final completeness checklist. A topic is considered covered only when you can **explain it, implement it, test it, troubleshoot it, and describe its production considerations**.

## A. Foundations

- [ ] What is integration?
- [ ] What is an API?
- [ ] HTTP request/response lifecycle
- [ ] HTTP methods
- [ ] Status codes
- [ ] Headers
- [ ] Query parameters
- [ ] Path parameters
- [ ] Request/response body
- [ ] Content types
- [ ] JSON/XML/CSV basics
- [ ] REST principles
- [ ] Authentication vs authorization
- [ ] Synchronous vs asynchronous processing

## B. Mule Runtime and Development

- [ ] Mule Runtime Engine
- [ ] Mule application
- [ ] Flow
- [ ] Subflow
- [ ] Private flow
- [ ] Mule event
- [ ] Message
- [ ] Payload
- [ ] Attributes
- [ ] Variables
- [ ] Event immutability
- [ ] Event processors
- [ ] Sources
- [ ] Connectors
- [ ] Modules
- [ ] Scopes
- [ ] Scheduler
- [ ] Logger
- [ ] Studio debugging
- [ ] Project structure
- [ ] Maven lifecycle
- [ ] `pom.xml`
- [ ] Dependency management

## C. DataWeave

- [ ] Syntax and headers
- [ ] Objects
- [ ] Arrays
- [ ] Strings
- [ ] Numbers
- [ ] Booleans
- [ ] Null
- [ ] Binary
- [ ] Selectors
- [ ] Index selectors
- [ ] Key/value selectors
- [ ] `map`
- [ ] `mapObject`
- [ ] `filter`
- [ ] `filterObject`
- [ ] `flatMap`
- [ ] `groupBy`
- [ ] `orderBy`
- [ ] `distinctBy`
- [ ] `reduce`
- [ ] `pluck`
- [ ] `some`
- [ ] `every`
- [ ] `contains`
- [ ] Conditional logic
- [ ] `default`
- [ ] `isEmpty`
- [ ] Pattern matching
- [ ] Variables
- [ ] Functions
- [ ] Lambdas
- [ ] Type coercion
- [ ] Types
- [ ] Type aliases
- [ ] Modules
- [ ] Imports
- [ ] Reusable transformations
- [ ] JSON → JSON
- [ ] XML → JSON
- [ ] JSON → XML
- [ ] CSV → JSON
- [ ] Java object handling
- [ ] Date/time handling
- [ ] Binary/base64 handling
- [ ] MIME types
- [ ] Error-safe transformations
- [ ] Performance and streaming
- [ ] DataWeave testing

## D. API Design

- [ ] RAML
- [ ] OpenAPI
- [ ] Resources
- [ ] Methods
- [ ] URI parameters
- [ ] Query parameters
- [ ] Headers
- [ ] Request schemas
- [ ] Response schemas
- [ ] Examples
- [ ] Traits/components
- [ ] Reusable types
- [ ] Versioning
- [ ] Pagination
- [ ] Filtering
- [ ] Sorting
- [ ] Validation
- [ ] Error contract
- [ ] Idempotency contract
- [ ] API documentation
- [ ] APIkit scaffolding
- [ ] APIkit routing
- [ ] APIkit validation
- [ ] API console
- [ ] APIkit/MUnit integration

## E. API-Led Connectivity

- [ ] System API
- [ ] Process API
- [ ] Experience API
- [ ] Responsibility boundaries
- [ ] Reusability
- [ ] Canonical data model
- [ ] Consumer-specific representation
- [ ] Avoiding unnecessary layers
- [ ] API discovery
- [ ] API lifecycle
- [ ] Governance

## F. Integration Patterns

- [ ] Request-response
- [ ] One-way
- [ ] Fire-and-forget
- [ ] Content-based routing
- [ ] Choice
- [ ] For Each
- [ ] Parallel For Each
- [ ] Scatter-Gather
- [ ] Aggregation
- [ ] Batch processing
- [ ] Polling
- [ ] Retry
- [ ] Backoff
- [ ] Timeout
- [ ] Circuit breaker concept
- [ ] Bulkhead concept
- [ ] Idempotent consumer
- [ ] Deduplication
- [ ] Transactional processing
- [ ] Compensation
- [ ] Dead-letter queue
- [ ] Poison message
- [ ] Event-driven integration
- [ ] Correlation IDs

## G. Connectors and Enterprise Integration

- [ ] HTTP Request
- [ ] HTTP Listener
- [ ] Database
- [ ] File
- [ ] FTP/SFTP
- [ ] JMS
- [ ] IBM MQ
- [ ] Anypoint MQ
- [ ] VM
- [ ] Object Store
- [ ] SOAP Web Service Consumer
- [ ] Web Service Consumer
- [ ] Email/SMTP
- [ ] Scheduler
- [ ] Salesforce/SaaS concepts
- [ ] Connector authentication
- [ ] Connection pooling
- [ ] Reconnection strategies
- [ ] Connector timeouts
- [ ] Connector error mapping

## H. Error Handling and Reliability

- [ ] Error type
- [ ] Error description
- [ ] Error cause
- [ ] Error handler
- [ ] On Error Continue
- [ ] On Error Propagate
- [ ] Try scope
- [ ] Raise Error
- [ ] Choice routing for errors
- [ ] Global error handler
- [ ] Custom error types
- [ ] HTTP status mapping
- [ ] Retryable vs non-retryable errors
- [ ] Timeout errors
- [ ] Connectivity errors
- [ ] Validation errors
- [ ] Duplicate/idempotency errors
- [ ] Safe client error messages
- [ ] Operational logging
- [ ] Recovery strategy

## I. Security

- [ ] TLS
- [ ] HTTPS
- [ ] Keystores
- [ ] Truststores
- [ ] Certificates
- [ ] Certificate rotation
- [ ] mTLS
- [ ] Basic authentication
- [ ] Client ID enforcement
- [ ] OAuth 2.0
- [ ] JWT
- [ ] Authorization
- [ ] API policies
- [ ] Rate limiting concepts
- [ ] Threat protection concepts
- [ ] Secure properties
- [ ] Secrets management
- [ ] PII handling
- [ ] Masking
- [ ] Safe logging
- [ ] Least privilege
- [ ] Dependency/security scanning

## J. Database Integration

- [ ] Connection configuration
- [ ] Connection pooling
- [ ] Parameterized SELECT
- [ ] INSERT
- [ ] UPDATE
- [ ] DELETE
- [ ] Stored procedures
- [ ] Transactions
- [ ] Rollback
- [ ] Commit
- [ ] Batch operations
- [ ] Pagination
- [ ] Mapping DB rows
- [ ] Null handling
- [ ] SQL injection prevention
- [ ] Safe-update considerations
- [ ] Duplicate detection
- [ ] Optimistic/concurrency concepts
- [ ] DB timeout troubleshooting

## K. Messaging

- [ ] Queue
- [ ] Producer
- [ ] Consumer
- [ ] Acknowledgement
- [ ] Negative acknowledgement concept
- [ ] Redelivery
- [ ] Retry
- [ ] DLQ
- [ ] Ordering
- [ ] Duplicate delivery
- [ ] Idempotency
- [ ] Message correlation
- [ ] Poison messages
- [ ] Back-pressure concept
- [ ] JMS transactions
- [ ] IBM MQ troubleshooting

## L. Testing

- [ ] Unit testing concepts
- [ ] MUnit
- [ ] Test suites
- [ ] Test setup
- [ ] Test execution
- [ ] Assertions
- [ ] Mocks
- [ ] Spies
- [ ] Verify calls
- [ ] Error-path tests
- [ ] Parameterized tests concepts
- [ ] Coverage
- [ ] Contract tests
- [ ] Integration tests
- [ ] Postman testing
- [ ] CI test execution
- [ ] Quality gates

## M. Deployment and DevOps

- [ ] Maven build
- [ ] Package application
- [ ] Environment properties
- [ ] Secure deployment properties
- [ ] Runtime Manager
- [ ] CloudHub
- [ ] CloudHub 2.0
- [ ] Runtime Fabric
- [ ] Hybrid Standalone
- [ ] On-premises runtime
- [ ] Runtime Manager agent
- [ ] Anypoint CLI
- [ ] Mule Maven Plugin
- [ ] Deployment automation
- [ ] CI/CD
- [ ] Versioning
- [ ] Rollback
- [ ] Blue/green concepts
- [ ] Promotion between environments
- [ ] Logs after deployment
- [ ] Health checks

## N. API Management and Governance

- [ ] API Manager
- [ ] API instance
- [ ] API proxy
- [ ] Policies
- [ ] Client applications
- [ ] Contracts
- [ ] API portal
- [ ] API analytics
- [ ] API Governance
- [ ] Conformance
- [ ] Lifecycle management
- [ ] Version/deprecation strategy

## O. Observability and Production Support

- [ ] Structured logging
- [ ] Correlation ID
- [ ] Request ID
- [ ] Metrics
- [ ] Latency
- [ ] Throughput
- [ ] Error rate
- [ ] Availability
- [ ] Alerts
- [ ] Dashboards
- [ ] Distributed tracing concepts
- [ ] Incident triage
- [ ] Impact assessment
- [ ] Mitigation
- [ ] Root cause analysis
- [ ] Corrective action
- [ ] Post-incident review
- [ ] Runbooks
- [ ] Change management

## P. Performance

- [ ] Measure before optimizing
- [ ] Latency breakdown
- [ ] Throughput
- [ ] Concurrency
- [ ] Threading concepts
- [ ] Streaming
- [ ] Memory pressure
- [ ] Large payloads
- [ ] DataWeave optimization
- [ ] Connector optimization
- [ ] DB query optimization
- [ ] Connection pools
- [ ] Caching concepts
- [ ] Batch sizing
- [ ] Back-pressure
- [ ] Load testing

## Q. Architecture

- [ ] Separation of concerns
- [ ] API boundaries
- [ ] Reusable flows
- [ ] Canonical models
- [ ] Coupling
- [ ] Cohesion
- [ ] Resilience
- [ ] Scalability
- [ ] Availability
- [ ] Disaster recovery concepts
- [ ] Multi-environment architecture
- [ ] Event-driven architecture
- [ ] Synchronous architecture
- [ ] Trade-off analysis
- [ ] Anti-patterns
- [ ] Architecture decision records

## R. Troubleshooting scenarios

Practice diagnosing these without guessing:

- [ ] 400 Bad Request
- [ ] 401 Unauthorized
- [ ] 403 Forbidden
- [ ] 404 Not Found
- [ ] 405 Method Not Allowed
- [ ] 406 Not Acceptable
- [ ] 415 Unsupported Media Type
- [ ] 429 Too Many Requests
- [ ] 500 Internal Server Error
- [ ] 502 Bad Gateway
- [ ] 503 Service Unavailable
- [ ] 504 Gateway Timeout
- [ ] CORS preflight/OPTIONS issue
- [ ] TLS handshake failure
- [ ] Certificate expiration
- [ ] Database connection failure
- [ ] SQL syntax/data error
- [ ] MQ/JMS acknowledgement issue
- [ ] Object Store key/value issue
- [ ] Null-to-string/DataWeave coercion issue
- [ ] Memory/performance issue
- [ ] Deployment failure
- [ ] Incorrect environment property
- [ ] Wrong endpoint/path
- [ ] Wrong `Content-Type`

## S. Career and interview readiness

- [ ] Explain a project end to end
- [ ] Explain a production incident end to end
- [ ] Explain API-led architecture
- [ ] Explain DataWeave transformation decisions
- [ ] Explain error-handling strategy
- [ ] Explain retry/idempotency
- [ ] Explain security architecture
- [ ] Explain MUnit strategy
- [ ] Explain deployment strategy
- [ ] Explain monitoring/alerts
- [ ] Debug an API from logs and symptoms
- [ ] Design an integration from requirements

## Definition of done

You do not need to memorize every syntax detail. A production-ready MuleSoft engineer should be able to find documentation quickly, reason about the event and integration boundary, implement safely, test the behavior, diagnose failures, and explain operational trade-offs.
