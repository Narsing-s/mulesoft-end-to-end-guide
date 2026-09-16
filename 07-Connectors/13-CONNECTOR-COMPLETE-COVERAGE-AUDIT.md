# 13 — Connector Complete Coverage Audit

This audit defines the minimum evidence required before a connector chapter is called complete.

## A. Universal connector evidence

Every connector chapter must have all of these sections:

- [ ] Purpose
- [ ] Architecture diagram
- [ ] When to use
- [ ] When not to use
- [ ] Alternatives
- [ ] Prerequisites
- [ ] Studio installation
- [ ] Exchange discovery
- [ ] Runtime compatibility
- [ ] Java compatibility
- [ ] Maven dependency/version
- [ ] Global configuration
- [ ] Connection provider
- [ ] Endpoint/host/port/tenant/region
- [ ] Authentication
- [ ] TLS/mTLS
- [ ] Proxy/networking
- [ ] Connection timeout
- [ ] Operation/read timeout
- [ ] Reconnection
- [ ] Retry/backoff
- [ ] Source/trigger
- [ ] Operation(s)
- [ ] Important fields explained
- [ ] Metadata/attributes
- [ ] DataWeave input
- [ ] DataWeave output
- [ ] XML example
- [ ] Success flow
- [ ] Failure flows
- [ ] Error types
- [ ] Error-handler strategy
- [ ] Idempotency
- [ ] Transaction semantics
- [ ] Pagination
- [ ] Batching
- [ ] Streaming/large payloads
- [ ] Pooling/concurrency
- [ ] Provider quota/rate limits
- [ ] MUnit success test
- [ ] MUnit failure test
- [ ] Timeout/retry test
- [ ] Security checklist
- [ ] Logging/correlation ID
- [ ] Monitoring/alerts
- [ ] Troubleshooting tree
- [ ] Production runbook
- [ ] Hands-on lab
- [ ] Interview Q&A with answer immediately below each question
- [ ] Version/compatibility notes
- [ ] Current official documentation links

## B. Additional connector-family checks

### HTTP/API
- [ ] Methods
- [ ] Path/query parameters
- [ ] Headers
- [ ] Request body
- [ ] Status codes
- [ ] OAuth/token lifecycle
- [ ] 401/403/404/409/429/5xx handling
- [ ] Idempotency keys
- [ ] API pagination
- [ ] API versioning
- [ ] Provider correlation IDs

### Database
- [ ] Driver/configuration
- [ ] Connection pool
- [ ] Parameterized SQL
- [ ] Select/insert/update/delete
- [ ] Stored procedure where applicable
- [ ] Transactions
- [ ] Isolation
- [ ] Commit/rollback
- [ ] Deadlocks
- [ ] Slow-query diagnosis
- [ ] Bulk operations
- [ ] Large result streaming

### File
- [ ] Directory/path
- [ ] File matching
- [ ] Read/write behavior
- [ ] Archive/quarantine
- [ ] Duplicate detection
- [ ] File readiness/partial-write handling
- [ ] Naming convention
- [ ] Large-file handling
- [ ] Permissions

### FTP/SFTP/FTPS
- [ ] Host/port
- [ ] Authentication/key handling
- [ ] Remote path
- [ ] File matching
- [ ] Transfer mode where relevant
- [ ] Connection/reconnection
- [ ] Partial transfer
- [ ] Archive/delete strategy
- [ ] Duplicate protection
- [ ] Partner outage recovery

### JMS/IBM MQ/Anypoint MQ
- [ ] Queue/topic
- [ ] Producer/consumer
- [ ] Acknowledgement
- [ ] Redelivery
- [ ] Ordering
- [ ] Correlation/message ID
- [ ] Transactions
- [ ] DLQ
- [ ] Poison-message handling
- [ ] Duplicate handling
- [ ] Back-pressure

### Kafka
- [ ] Bootstrap servers
- [ ] Topic
- [ ] Consumer group
- [ ] Partitioning
- [ ] Offset semantics
- [ ] Commit behavior
- [ ] Ordering
- [ ] Rebalance behavior
- [ ] Retry/DLQ strategy
- [ ] Idempotent consumer
- [ ] Producer delivery semantics

### Salesforce/SaaS
- [ ] Authentication model
- [ ] Tenant/environment
- [ ] Object/resource model
- [ ] Query/create/update/upsert/delete
- [ ] Bulk strategy
- [ ] Pagination
- [ ] Provider limits
- [ ] Throttling
- [ ] Partial success
- [ ] External/business keys

### SOAP
- [ ] WSDL
- [ ] Service/port
- [ ] Operation
- [ ] SOAP headers
- [ ] WS-Security where applicable
- [ ] TLS
- [ ] SOAP fault handling
- [ ] XML namespaces
- [ ] Request/response mapping

### Cloud object/queue services
- [ ] Region
- [ ] Credentials/role
- [ ] Bucket/queue/topic/resource
- [ ] IAM permissions
- [ ] Retry
- [ ] Eventual consistency considerations where relevant
- [ ] Object size
- [ ] Multipart/batch behavior where applicable

### EDI/B2B
- [ ] Trading partner
- [ ] Agreement
- [ ] Document type
- [ ] Envelope
- [ ] Validation
- [ ] Acknowledgement
- [ ] Reject/error path
- [ ] Tracking/control numbers
- [ ] Duplicate document handling
- [ ] Partner reconciliation

## C. Router/scope integration evidence

Connector chapters should show appropriate use of:

- Choice
- Scatter-Gather
- For Each
- Parallel For Each
- Batch
- Until Successful
- Try
- Async
- First Successful
- Round Robin
- Flow Reference
- Subflow
- Error Handler
- Transform Message
- Scheduler
- Cache
- Idempotent Message Validator
- Transactions

The chapter must explain **why** a pattern is selected rather than simply inserting every component into an example.

## D. Failure matrix

Each major connector should have a table like:

| Failure | Evidence | Safe response | Duplicate risk |
|---|---|---|---|
| Authentication | 401/auth error | Fix credentials/token | Low/operation-dependent |
| Authorization | 403/permission error | Correct privilege | Usually low |
| Timeout | timeout/network evidence | Investigate remote state before retry | High for writes |
| Throttle | 429/provider limit | Backoff/queue | Medium |
| Remote 5xx | provider error | Bounded retry if safe | Operation-dependent |
| Duplicate message | repeated business key | Idempotency check | High |
| Certificate failure | TLS exception | Validate chain/expiry | Low |
| Network outage | connection exception | Reconnect/recover | Operation-dependent |

## E. Production evidence

A complete chapter must tell the learner what evidence to collect during an incident:

- timestamp
- correlation ID
- business ID
- Mule application/version
- connector version
- runtime/Java version
- operation
- endpoint/resource
- error type
- elapsed time
- retry count
- provider response/correlation ID
- queue/file/object state
- whether the remote system may have processed the request

## F. Definition of complete

Do not mark a connector `complete` because a README exists.

Mark it complete only when:

```text
Concept
  ↓
Configuration
  ↓
Working example
  ↓
DataWeave
  ↓
Error handling
  ↓
Retry/reconnection
  ↓
Idempotency
  ↓
Scale/performance
  ↓
MUnit
  ↓
Troubleshooting
  ↓
Production runbook
  ↓
Hands-on lab
  ↓
Interview Q&A
```

This audit is intentionally stricter than a connector catalog. It is the quality gate for future individual connector chapters.
