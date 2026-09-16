# 64 — MuleSoft Question & Answer Bank

A real question-and-answer library for study and interviews. Questions are grouped by difficulty and each answer follows: **answer → why → example → production note**.

## Easy

### Q1. What is Mule runtime?
**Answer:** Mule runtime is the execution engine that runs Mule applications and processes Mule events through flows and processors.

**Why:** It provides the runtime behavior needed to receive, transform, route and deliver messages.

**Example:** An HTTP Listener receives a request, DataWeave transforms the payload, and an HTTP Request calls another API.

**Production note:** Runtime version, Java compatibility, memory, logs and deployment target must be known before troubleshooting.

### Q2. What is a Mule event?
**Answer:** A Mule event carries the data being processed, including payload, attributes and variables.

**Why:** Processors use the event to pass information through a flow.

### Q3. What is DataWeave?
**Answer:** DataWeave is MuleSoft's language for transforming, querying and generating data.

### Q4. What is a flow?
**Answer:** A flow is an executable sequence of Mule processors with an event source or invocation entry point.

### Q5. What is a subflow?
**Answer:** A subflow is reusable flow logic invoked synchronously from another flow and does not have its own event source.

### Q6. What is RAML?
**Answer:** RAML is an API modeling language used to describe REST API contracts.

### Q7. What is APIkit?
**Answer:** APIkit helps implement APIs from contracts such as RAML or OAS and provides routing and validation capabilities.

### Q8. What is MUnit?
**Answer:** MUnit is MuleSoft's testing framework for unit-level testing of Mule applications.

### Q9. What is Runtime Manager?
**Answer:** Runtime Manager is used to manage and operate Mule applications across supported deployment targets.

### Q10. What is a correlation ID?
**Answer:** A correlation ID is an identifier used to connect related log entries and processing steps for one transaction or request.

## Intermediate

### Q11. When should you use Choice?
**Answer:** Use Choice when processing must follow different branches based on conditions.

**Production note:** Keep conditions explicit and observable; avoid deeply nested routing that becomes difficult to test.

### Q12. What is Scatter-Gather?
**Answer:** Scatter-Gather executes multiple routes and combines their results.

**Production note:** Consider timeout, partial failure, downstream capacity and response aggregation before using it.

### Q13. What is Until Successful?
**Answer:** Until Successful retries a block until it succeeds or its configured retry limits are exhausted.

**Production note:** Retrying a non-idempotent operation can create duplicates.

### Q14. What is idempotency?
**Answer:** Idempotency means repeating the same operation produces the same intended business result rather than creating unintended duplicates.

### Q15. Difference between On Error Continue and On Error Propagate?
**Answer:** On Error Continue handles the error and lets the flow continue from the error handler with the handler's resulting event; On Error Propagate handles the error and propagates failure to the caller.

### Q16. Why use parameterized SQL?
**Answer:** Parameterized SQL separates SQL structure from values and helps prevent SQL injection while improving maintainability.

### Q17. Why use secure properties?
**Answer:** Secure properties protect sensitive configuration values from being stored as ordinary plaintext configuration.

### Q18. What is an API-led architecture?
**Answer:** API-led architecture separates reusable System APIs, orchestration-focused Process APIs and consumer-focused Experience APIs.

### Q19. What is a dead-letter queue?
**Answer:** A dead-letter queue stores messages that cannot be successfully processed after defined recovery attempts so they can be investigated or replayed safely.

### Q20. What should you check for a 502 from an integration API?
**Answer:** Check timestamps, correlation ID, application logs, upstream/downstream status, DNS/network/TLS connectivity, timeout settings and gateway/proxy behavior.

## Advanced

### Q21. How would you investigate intermittent API latency?
**Answer:** Establish the time window and correlation IDs, compare successful and slow transactions, measure application processing time and dependency latency, inspect thread/CPU/memory behavior, then isolate the slow component.

### Q22. How do you design a retry strategy?
**Answer:** Classify transient versus permanent failures, choose bounded retries, use appropriate backoff, enforce timeouts, prevent duplicate side effects and provide a terminal recovery path such as a DLQ or business exception.

### Q23. How do you prevent duplicate message processing?
**Answer:** Use a stable business/message identifier, persist or atomically record processing state where appropriate, make downstream operations idempotent and define replay behavior.

### Q24. How do you troubleshoot a TLS failure?
**Answer:** Check certificate validity and chain, hostname/SAN, truststore/keystore configuration, protocol/cipher compatibility, certificate rotation history and the exact handshake error.

### Q25. How do you approach a production incident?
**Answer:** Confirm impact and scope, identify the affected application and time window, collect correlation IDs and logs, classify the failure, check dependencies and recent changes, mitigate safely, validate recovery, then document RCA and prevention.

### Q26. What belongs in an RCA?
**Answer:** Timeline, customer/business impact, detection, technical root cause, contributing factors, mitigation, recovery validation and preventive actions with owners.

### Q27. How do you choose synchronous versus asynchronous integration?
**Answer:** Start from business response requirements, latency expectations, delivery semantics, coupling, failure tolerance and workload characteristics. Synchronous flows suit immediate responses; asynchronous patterns suit decoupling and independently processed work.

### Q28. How should an API error contract be designed?
**Answer:** Use predictable status codes, stable machine-readable error codes, safe human-readable messages, correlation identifiers and enough context for clients without exposing secrets or internal implementation details.

### Q29. What should a production deployment checklist contain?
**Answer:** Artifact/version verification, configuration and secrets, dependency readiness, contract compatibility, tests, approvals, deployment target, smoke tests, monitoring, rollback plan and evidence.

### Q30. What makes a MuleSoft integration production-ready?
**Answer:** Correct functional behavior plus tested failure handling, secure configuration, bounded resource use, observability, deployment repeatability, recovery procedures and documented operational ownership.

## Practice format

For every question, answer without looking first, then verify against the canonical topic. For senior interviews, add **trade-off + failure mode + production evidence** to the answer.

## Expansion roadmap

This bank is intentionally stored as real Markdown Q&A rather than generated placeholder records. New question sets should be added in numbered topic files under this folder: `01-fundamentals.md`, `02-dataweave.md`, `03-api.md`, `04-integration.md`, `05-errors.md`, `06-security.md`, `07-testing.md`, `08-devops.md`, `09-production.md`, `10-architecture.md`.
