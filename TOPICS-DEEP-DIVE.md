# Deep-Dive Topic Map

This file is the master map for topics that commonly get missed in short MuleSoft tutorials.

## Integration foundations
HTTP, HTTPS, REST, SOAP, XML, JSON, CSV, synchronous integration, asynchronous integration, messaging, event-driven integration, request/response, one-way messaging, system of record, canonical data model, enterprise integration patterns.

## Mule runtime and application model
Mule runtime, Mule application, domain/shared configuration concepts, flows, subflows, private flows, Mule event, payload, attributes, variables, message processors, scopes, configuration properties, secure properties, connectors, error model, lifecycle and deployment packaging.

## DataWeave
Syntax, data types, literals, variables, functions, custom functions, modules, imports, selectors, arrays, objects, strings, numbers, dates, DateTime, LocalDateTime, time zones, null handling, default values, conditional expressions, match, map, mapObject, filter, filterObject, reduce, groupBy, orderBy, flatten, pluck, distinctBy, update operator, coercion, metadata, JSON/XML/CSV transformations, reusable modules, performance and streaming.

## API design
REST resource design, HTTP methods, URI parameters, query parameters, headers, media types, status codes, request validation, response examples, error contracts, pagination, filtering, sorting, versioning, backward compatibility, idempotency, API documentation, RAML, OpenAPI/OAS, APIkit.

## API-led architecture
System APIs, Process APIs, Experience APIs, reuse, ownership, orchestration, consumer-specific shaping, system-of-record boundaries, synchronous vs asynchronous boundaries.

## Routing and orchestration
Choice, For Each, Parallel For Each, Scatter-Gather, Async, Try, Until Successful, Flow Reference, subflows, batch, scheduler, transactions, streaming, caching and idempotency.

## Connectivity
HTTP, Database/JDBC, File, FTP, SFTP, JMS, IBM MQ, Salesforce, Email/SMTP, Object Store, Scheduler and external REST/SOAP services.

## Database
SQL fundamentals, parameterized queries, SELECT/INSERT/UPDATE/DELETE, stored procedures, transactions, connection pooling, timeouts, locking, deadlocks, pagination, database error handling and performance.

## Messaging
Queues, producers, consumers, acknowledgement, redelivery, poison messages, dead-letter queues, ordering, duplicate delivery, idempotent consumers, correlation IDs, retry and recovery.

## Security
HTTPS, TLS, certificates, keystores, truststores, Basic Auth, client ID/secret, OAuth 2.0, JWT, scopes, authentication vs authorization, secure properties, CORS, rate limiting, threat protection, least privilege and secret rotation.

## Error handling
Mule error hierarchy, error types, Try, On Error Continue, On Error Propagate, Raise Error, global handlers, custom errors, mapping technical errors to business/API errors, retryability and safe retries.

## Testing
MUnit, mocks, spies, assertions, error-path testing, coverage, integration testing, contract testing concepts, Postman collections, test data and CI execution.

## API management
API Manager, API policies, client applications, contracts, SLA concepts, analytics, lifecycle, versioning, promotion and retirement.

## Deployment
Maven packaging, CloudHub, CloudHub 2.0, Runtime Manager, on-premises runtime, Runtime Fabric, environments, properties, certificates, networking, scaling, rollback and release management.

## DevOps
Git, GitHub, branching, pull requests, Maven, CI/CD, Jenkins, GitHub Actions, automated tests, artifact promotion, secret storage, approvals and rollback.

## Observability
Logging, log levels, structured logs, correlation IDs, metrics, dashboards, alerts, tracing concepts, latency, throughput, error rate, dependency monitoring and production runbooks.

## Advanced engineering
Performance tuning, memory management, streaming, concurrency, back-pressure, retry/backoff, idempotency, resilience, caching, transactions, distributed systems trade-offs, dependency isolation and capacity planning.

## Support and troubleshooting
4xx/5xx analysis, APIkit routing issues, CORS, Content-Type/415, TLS failures, DNS/network failures, database failures, MQ failures, timeouts, slow transformations, memory problems, deployment failures and rollback.

## Documentation quality standard
For each topic, eventually add: plain-English definition, why it exists, architecture, tiny example, Studio steps, XML/configuration, DataWeave where applicable, sample input, expected output, failure cases, troubleshooting, production notes, interview questions and an exercise.

This map is intentionally broader than a beginner syllabus so that the repository can grow into a long-term MuleSoft reference.
