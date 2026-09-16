# 12 — Mandatory Connector Configuration Depth — Explained

This document explains **what every item in the mandatory connector checklist actually means**, why it matters, what a MuleSoft developer should configure, and what to verify in production.

> **Important:** Connector field names and available operations vary by connector version, Mule Runtime, Java version, and provider. Use the current Exchange asset's User Guide, Reference Guide, and Release Notes for exact fields. This document teaches the reusable engineering method and uses representative examples rather than pretending version-specific fields are universal.

## 1. Purpose and architecture

### What
Explain what system the connector connects to, what protocol/API it uses, and where it sits in the integration.

```text
Source System
     |
     v
Mule Flow
     |
     +--> Connector
     |      |
     |      +--> Authentication
     |      +--> Network/TLS
     |      +--> Operation
     |
     v
Target System
```

### Example
HTTP Request connects Mule to a REST API. SFTP connects Mule to a remote file server. Database Connector connects Mule to a relational database.

### Must explain
- system being integrated
- protocol
- direction
- synchronous/asynchronous behavior
- alternatives
- business reason for choosing the connector

---

## 2. When to use / when not to use

Do not document only what a connector does. Explain selection criteria.

| Requirement | Typical choice | Reason |
|---|---|---|
| REST API call | HTTP Request | HTTP/REST communication |
| Relational SQL | Database | JDBC-based database access |
| Local/shared filesystem | File | File-system integration |
| Secure partner file transfer | SFTP | SSH-based secure transfer |
| Durable asynchronous messaging | MQ/Anypoint MQ/JMS | Decoupling and delivery semantics |
| Large record collection | Batch/streaming strategy | Controlled processing |

Also document when the connector is a poor fit.

---

## 3. Exchange installation

Explain:
1. Open Anypoint Studio.
2. Add the connector/module through the Mule Palette or Exchange integration.
3. Select a compatible version.
4. Allow Maven dependencies to resolve.
5. Restart/reload Studio if required.
6. Confirm the module appears in the palette.

Also record:
- connector version
- Mule Runtime version
- Java version
- Maven/plugin compatibility
- whether the asset is MuleSoft-provided, certified, partner, or community

---

## 4. Dependency and compatibility

A connector is not production-ready until its compatibility is known.

Record:

```text
Application
  |
  +-- Mule Runtime
  +-- Java
  +-- Connector version
  +-- mule-maven-plugin
  +-- CloudHub/RTF/runtime target
```

Explain upgrade risks and verify Release Notes before upgrading.

---

## 5. Global configuration

Explain the reusable global element and why it exists.

A global configuration should normally contain environment-independent connection structure while secrets and environment values remain externalized.

Example pattern:

```xml
<configuration-properties file="${env}.yaml"/>
```

Avoid hard-coded passwords, tokens, private keys, or customer endpoints.

---

## 6. Connection provider

Explain the provider implementation used to establish the connection.

Cover:
- connection creation
- connection validation
- authentication
- connection lifecycle
- reconnection behavior
- pooling where supported

Do not assume every connector exposes identical provider settings.

---

## 7. Endpoint / host / port / tenant / region

Document the destination precisely.

Examples:
- HTTP base URL
- DB host and port
- SFTP host and port
- Salesforce environment/instance
- SAP host/system/client
- AWS region
- SaaS tenant

Separate dev/test/prod values using properties or secure configuration.

---

## 8. Authentication

Explain the exact authentication model supported by the connector.

Common models:
- Basic authentication
- OAuth 2.0
- Client credentials
- Username/password
- API key
- JWT/certificate-based authentication
- SSH key authentication
- cloud IAM/role-based authentication

Explain token expiration and credential rotation where applicable.

---

## 9. TLS / mTLS / certificates

Cover:
- truststore
- keystore
- certificate chain
- hostname verification
- TLS version where configurable
- mutual TLS
- certificate expiry
- certificate rotation

Failure examples:
- certificate expired
- unknown CA
- hostname mismatch
- incomplete certificate chain
- private key mismatch

Never disable certificate verification as a production shortcut.

---

## 10. Proxy / networking

Explain:
- outbound proxy
- proxy host/port
- proxy authentication
- allowlists
- firewall/security groups
- private networking
- DNS
- VPC/VNet connectivity where relevant

A connector can be correctly configured and still fail because network access is unavailable.

---

## 11. Timeout

Separate:
- connection timeout
- read/response timeout
- operation timeout
- idle timeout
- provider-side timeout

Do not solve slow downstream systems by blindly increasing every timeout.

---

## 12. Reconnection

Explain what happens when an established connection fails.

Cover:
- reconnect strategy
- frequency/delay
- maximum attempts where supported
- startup vs runtime reconnection
- what happens after exhaustion

**Reconnection is about restoring connectivity; it is not automatically a safe business-operation retry.**

---

## 13. Retry / backoff

Explain retry separately from reconnection.

```text
Operation fails
     |
     +--> transient?
           |
          yes
           |
     bounded retry
           |
     exponential/backoff if appropriate
           |
       success / exhausted
```

Always ask:
- Is the operation idempotent?
- Could the provider have already processed it?
- Can duplicate side effects occur?
- Should a DLQ/manual reconciliation be used instead?

---

## 14. Source / trigger

If the connector can start a flow, explain its source.

Examples:
- HTTP Listener
- File Listener
- SFTP polling
- Scheduler
- MQ listener
- JMS listener
- Kafka consumer
- connector-specific polling/event source

Document frequency, watermarking, acknowledgement, duplicate behavior, and startup semantics where applicable.

---

## 15. Operation

Document the actual business action.

Examples:
- HTTP Request
- Select/Insert/Update/Delete
- Put/Get/Delete object
- Publish/Consume
- Query/Create/Update/Upsert
- SOAP operation

For each important operation, explain required and optional inputs.

---

## 16. Parameters and metadata

Explain:
- path parameters
- query parameters
- headers
- body
- operation parameters
- metadata
- output attributes
- connector-specific metadata

Metadata should be explained as part of the Mule event, not ignored as hidden magic.

---

## 17. DataWeave input

Every connector chapter should show the data entering the operation.

Example:

```dw
%dw 2.0
output application/json
---
{
  customerId: vars.customerId,
  amount: payload.amount
}
```

Explain how the connector expects the data type and structure.

---

## 18. DataWeave output

Show the resulting payload and attributes.

```text
Connector
   |
   +--> payload
   +--> attributes
   +--> variables remain available
```

Explain whether the connector returns records, a response body, metadata, acknowledgement, generated ID, or connector-specific result.

---

## 19. XML configuration

Every major connector chapter should contain at least one representative Mule XML example.

```xml
<flow name="example-flow">
    <http:listener config-ref="HTTP_Listener_config" path="/example"/>
    <http:request config-ref="HTTP_Request_config" method="GET" url="${target.url}"/>
</flow>
```

Exact namespaces and fields must be verified against the connector version.

---

## 20. Success scenario

Show the complete happy path:

```text
Input
  ↓
Validation
  ↓
Transform
  ↓
Connector
  ↓
Provider success
  ↓
Response mapping
  ↓
Business response
```

Include realistic input and expected output.

---

## 21. Failure scenarios

At minimum explain:
- invalid credentials
- forbidden access
- endpoint unavailable
- timeout
- malformed request
- malformed response
- provider error
- throttling
- duplicate/replay
- partial failure

---

## 22. Error types

Explain Mule error structure:

```text
Mule Error
  |
  +-- type
  +-- description
  +-- cause
  +-- errorMessage
  +-- child errors/details where applicable
```

Show which errors should be propagated, continued, retried, transformed, or sent to a recovery path.

---

## 23. Idempotency

This is mandatory whenever a connector can create/update/send a business side effect.

Example:

```text
Same business request arrives twice
          |
          v
business key / idempotency key
          |
     already processed?
       /       \
     yes        no
      |          |
   skip       process
```

Examples of useful keys:
- order ID
- payment ID
- message ID
- file name + checksum
- provider idempotency key

---

## 24. Transactions

Explain whether the connector supports Mule transactions and what commit/rollback means.

Do not assume that a transaction across unrelated external systems provides distributed atomicity.

Example:

```text
DB transaction
  ├── insert A
  ├── update B
  └── commit

External HTTP call
  └── usually NOT automatically rolled back by DB rollback
```

Document transaction boundaries explicitly.

---

## 25. Pagination

For APIs returning multiple pages, explain:
- page size
- page token/cursor
- offset
- continuation condition
- termination
- rate limits
- checkpointing

```text
Request page 1
   ↓
next token?
 ├─ yes → request page 2
 └─ no  → finish
```

---

## 26. Batching

Explain when batching improves throughput and when it increases failure complexity.

Cover:
- batch size
- partial failures
- retry granularity
- memory
- provider limits
- reconciliation

Batch is not automatically better than one-by-one processing.

---

## 27. Streaming / large payloads

Explain how large payloads move through the flow.

Cover:
- repeatable vs non-repeatable streams where relevant
- memory usage
- streaming boundaries
- disk usage
- payload size limits
- downstream limitations

Avoid converting huge streams into large in-memory arrays without a reason.

---

## 28. Rate limits / quotas

Document provider limits when known for the connector/version.

Explain:
- requests per second/minute
- daily limits
- concurrency limits
- response headers indicating throttling
- backoff
- queueing
- batch APIs

Never invent a quota; verify the provider's current documentation.

---

## 29. Pooling / concurrency

Explain:
- maximum connections
- minimum/initial connections where supported
- concurrent requests
- thread/resource usage
- downstream capacity
- connection leaks

Example:

```text
Mule concurrency = 100
Downstream safe concurrency = 20

100 concurrent calls ≠ 100 good calls
```

Concurrency must respect the slowest dependency.

---

## 30. MUnit tests

Every major connector chapter should include at least:

1. success
2. authentication/configuration failure
3. downstream error
4. timeout/retry behavior where practical
5. malformed input
6. duplicate/idempotency behavior where applicable

Mock external systems in unit tests; reserve live-provider testing for integration environments.

---

## 31. Logging / masking / correlation IDs

Log enough to troubleshoot without exposing secrets or sensitive payloads.

Recommended evidence:
- correlation ID
- business ID
- connector operation
- target system
- elapsed time
- outcome
- error type

Never log:
- passwords
- access tokens
- private keys
- full sensitive customer payloads

---

## 32. Monitoring and alerts

Define useful signals:
- request count
- success/failure rate
- latency
- timeout count
- retry count
- reconnection count
- queue depth
- DLQ count
- throttling
- authentication failures
- certificate expiry

Alerts should indicate actionable failures, not merely generate noise.

---

## 33. Troubleshooting

Use evidence before changing configuration.

```text
Incident
  ↓
Correlation ID / timestamp
  ↓
Mule logs
  ↓
Connector error type
  ↓
Network/auth/provider evidence
  ↓
Reproduce safely
  ↓
Root cause
  ↓
Recovery
  ↓
Permanent fix
```

Never blindly restart, retry, increase timeout, or increase connection pools.

---

## 34. Security checklist

- secrets externalized
- secure properties
- least privilege
- TLS enabled
- certificates managed
- no credentials in Git
- no secrets in logs
- sensitive fields masked
- inbound validation
- outbound destination controlled
- credential/certificate rotation procedure

---

## 35. Production runbook

Every important connector should have a short operational procedure:

```text
Symptom
→ Check
→ Expected evidence
→ Immediate safe action
→ Recovery
→ Validation
→ Escalation
→ Permanent fix
```

Example SFTP outage:
1. Check connector error.
2. Verify DNS/network.
3. Verify server reachability.
4. Verify credential/key validity.
5. Check remote directory permissions.
6. Check whether files accumulated.
7. Recover safely without duplicating already-processed files.
8. Reconcile counts.

---

## 36. Interview Q&A

Every connector chapter should finish with questions whose answers appear immediately underneath.

### Q: Why is Test Connection not enough for production readiness?

**Answer:** Test Connection only establishes that the configured connection can be tested successfully. Production readiness also requires timeout, retry/reconnection, idempotency, security, error handling, observability, performance, testing, recovery and operational controls.

### Q: What is the difference between retry and reconnection?

**Answer:** Reconnection concerns restoring a connector connection after connectivity loss. Retry concerns repeating an operation after a failure. Retrying a non-idempotent operation can create duplicate side effects, so the business operation must be evaluated before retrying.

### Q: Why must connector versions be documented?

**Answer:** Connector fields, operations, dependencies, supported runtime/Java versions and behavior can change. Recording versions makes builds reproducible and makes upgrades testable.

### Q: What should you do when an HTTP request times out?

**Answer:** Determine whether the remote system may have received the request before retrying. Check provider logs/correlation IDs, network evidence and operation idempotency. Then apply a bounded retry or reconciliation strategy appropriate to the operation.

---

## 37. Hands-on lab

Each connector chapter must contain a practical exercise:

```text
Build
 ↓
Configure
 ↓
Test success
 ↓
Break authentication
 ↓
Break endpoint
 ↓
Cause timeout
 ↓
Trigger error handling
 ↓
Test duplicate/replay
 ↓
Observe logs
 ↓
Recover
 ↓
Document runbook
```

The learner should be able to reproduce both the happy path and important failure paths.

---

# What “complete connector coverage” means

A connector chapter is complete only when the learner can:

**Understand → Install → Configure → Authenticate → Connect → Transform → Execute → Handle errors → Retry safely → Prevent duplicates → Scale → Test → Observe → Troubleshoot → Recover → Explain in an interview.**

The existing repository's checklist is therefore expanded here from a list of configuration topics into an **explainable implementation contract**.
