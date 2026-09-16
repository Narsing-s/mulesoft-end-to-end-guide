# MuleSoft End-to-End Learning Map

This map is the recommended order. Do not skip the foundations.

## Stage 0 — Before MuleSoft
Learn HTTP, REST, JSON, XML, XML namespaces, HTTP methods, status codes, headers, query parameters, path parameters, authentication basics, Git, Maven, Java/JVM basics, and SQL basics.

## Stage 1 — Mule 4 Foundations
- Mule runtime engine
- Mule application, flow, subflow and private flow
- Mule event, message, payload, attributes and variables
- Event sources and event processors
- Connectors and operations
- Global configurations
- XML configuration
- Properties and secure properties
- Application lifecycle
- Logging
- Schedulers
- Studio project structure

## Stage 2 — DataWeave
- `%dw` header and output directives
- payload, attributes, vars
- selectors
- arrays and objects
- map, filter, reduce, distinctBy, groupBy, orderBy
- mapObject and pluck
- if/else and match
- variables and functions
- types and coercion
- dates and times
- strings
- numbers
- null handling
- flatten and recursive structures
- XML, JSON, CSV, Java and binary data
- modules and imports
- reusable functions
- streaming and performance
- testing DataWeave

## Stage 3 — API Development
- HTTP Listener
- HTTP Request
- RAML
- OpenAPI/OAS
- APIkit
- API Console
- validation
- URI parameters
- query parameters
- headers
- request/response examples
- API versioning
- pagination/filtering/sorting
- CORS
- TLS
- API documentation

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

## Stage 5 — Enterprise Connectors
HTTP, Database, File, SFTP, FTP, JMS, IBM MQ, Anypoint MQ, Email/SMTP, SOAP Web Service Consumer, Salesforce and other commonly used connectors.

## Stage 6 — API-Led Connectivity
System API -> Process API -> Experience API. Learn ownership boundaries, orchestration, canonical models, reusability, anti-patterns and when API-led architecture is not appropriate.

## Stage 7 — Errors and Reliability
- Mule error model
- error types
- on-error-continue
- on-error-propagate
- Try scope error handling
- global error handler
- custom errors
- Raise Error
- retries
- timeouts
- dead-letter queues
- idempotency
- transaction boundaries

## Stage 8 — Security and API Management
- client ID enforcement
- OAuth 2.0
- JWT
- Basic authentication
- TLS/mTLS
- secure properties
- CORS
- rate limiting
- SLA-based policies
- threat protection
- API Manager
- Exchange
- client applications
- contracts and policies
- API analytics

## Stage 9 — Testing
- MUnit
- mocks
- spies
- verify calls
- error-path tests
- parameterized tests
- coverage
- integration testing
- Postman
- contract testing
- performance testing concepts

## Stage 10 — Deployment and DevOps
- Maven
- Mule Maven Plugin
- Runtime Manager
- CloudHub
- CloudHub 2.0
- Runtime Fabric
- Hybrid/standalone on-prem runtime
- properties by environment
- Git branching
- GitHub Actions/Jenkins concepts
- artifact promotion
- rollback
- secrets

## Stage 11 — Production Engineering
- logs and correlation IDs
- monitoring
- alerts
- metrics
- dashboards
- performance troubleshooting
- memory/CPU/thread issues
- connection pools
- API 4xx/5xx troubleshooting
- 502/503/504
- TLS failures
- DB failures
- MQ failures
- deployment failures
- incident response
- RCA and prevention

## Stage 12 — Architecture
- integration architecture
- resiliency
- scalability
- availability
- security boundaries
- data ownership
- synchronous/asynchronous trade-offs
- event-driven integration
- canonical data models
- reusable assets
- governance

## Stage 13 — Capstone
Build the banking platform in `17-Real-World-Project` from RAML through System, Process and Experience APIs, database, messaging, security, testing, deployment and operations.
