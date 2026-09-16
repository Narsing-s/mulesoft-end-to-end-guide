# Connector Family Playbook — Deep Practical Guide

This is the main **connector-by-connector learning playbook**. It is intentionally structured like a professional MuleSoft documentation set: overview → prerequisites → configuration → sources → operations → mapping → errors → resilience → security → performance → testing → troubleshooting → use cases → interview questions.

> Exact fields and supported operations vary by connector version. Always verify the version-specific Reference Guide before production implementation.

---

## 1. HTTP Connector

### What it does
Provides HTTP Listener and HTTP Request capabilities for exposing and consuming HTTP APIs.

### Where to use it
- System/API integrations
- REST APIs
- calling SaaS/internal services
- webhook receivers
- synchronous request/response integrations

### Architecture

```text
Client
  |
  | HTTP
  v
[HTTP Listener]
  |
  v
[Validate / Transform]
  |
  v
[HTTP Request]
  |
  v
Downstream API
```

### Configuration areas
- listener host/port/path
- request method and URL
- headers/query/URI parameters
- response handling
- TLS
- authentication
- connection/request timeouts
- reconnection where applicable
- proxy/network configuration

### Example

Input:
```json
{"customerId":"C1001"}
```

DataWeave concept:
```dw
%dw 2.0
output application/json
---
{
  id: payload.customerId,
  source: "mule"
}
```

### Production concerns
- never log Authorization headers
- use TLS for sensitive traffic
- distinguish 4xx business/request errors from 5xx downstream failures
- define timeout intentionally
- retry only when safe
- use idempotency for repeatable business requests
- propagate or generate correlation IDs

### Common failures
`CONNECTIVITY`, `TIMEOUT`, `UNAUTHORIZED`, `FORBIDDEN`, downstream `4xx/5xx`, DNS failures, TLS handshake errors.

### Interview question
**Q: Why can retrying an HTTP POST be dangerous?**

**Answer:** A POST may create a new resource. If the server accepted the first request but Mule timed out before receiving the response, a retry can create a duplicate. Use an idempotency key or another deduplication strategy when the business operation requires it.

---

## 2. Database Connector

### What it does
Connects Mule applications to JDBC-compatible relational databases.

### Where to use it
- read/write business data
- stored procedures
- transactional integrations
- polling tables
- batch persistence

### Architecture

```text
Mule Flow
   |
   v
[DB Connector]
   |
   v
JDBC Driver
   |
   v
Database
```

### Configuration areas
- JDBC URL / host / port / database
- driver
- username/password or platform credential
- connection pool
- query timeout
- transaction settings
- validation/test query where applicable

### Parameterized query

Prefer parameters rather than concatenating user input:

```text
SELECT id, status
FROM orders
WHERE customer_id = :customerId
```

Conceptual input:
```json
{"customerId":"C1001"}
```

### Operations to master
- Select
- Insert
- Update
- Delete
- stored procedure
- bulk operations
- transaction-aware flows

### Production concerns
- pool exhaustion
- deadlocks
- slow queries
- connection leaks
- database failover
- transaction boundaries
- index/query-plan issues
- least-privilege database account

### Interview question
**Q: What happens if the DB connection pool is exhausted?**

**Answer:** New work waits for an available connection or fails after the relevant timeout. Diagnose active connections, pool sizing, long-running queries, transaction duration and connection leaks before simply increasing the pool.

---

## 3. File Connector

### What it does
Reads and writes files on a filesystem accessible to the Mule runtime.

### Typical use cases
- batch files
- partner file exchange on mounted/shared storage
- CSV/XML/JSON ingestion
- outbound file generation

### Flow

```text
Directory
   |
   v
[File Source]
   |
   v
Validate file
   |
   v
DataWeave
   |
   v
Business processing
   |
   +--> archive
   +--> reject/quarantine
```

### Configuration areas
- directory/path
- file matching/filtering
- polling/read behavior
- move/archive strategy
- streaming/large-file handling
- encoding
- permissions

### Production concerns
A file can be visible before another process has finished writing it. Design a readiness convention such as temporary extension → final rename, producer marker file, or stable-size check.

### Interview question
**Q: How do you prevent processing a partial file?**

**Answer:** Do not assume file visibility means writing is complete. Coordinate with the producer using a completion marker or atomic rename convention, or implement a carefully tested readiness check.

---

## 4. FTP / SFTP / FTPS

### FTP
Traditional FTP. Use only when the partner/network requirement calls for it and the security model is acceptable.

### SFTP
SSH-based file transfer. Common for secure partner exchanges.

### FTPS
FTP secured using TLS. It is different from SFTP because SFTP is based on SSH rather than FTP/TLS.

### Configuration categories
- host
- port
- username
- password or SSH key where supported
- remote directory
- file pattern
- timeout
- host key / certificate handling as applicable
- proxy/network
- reconnection

### Production design

```text
Partner SFTP
    |
    v
Inbound folder
    |
    v
Read + validate
    |
    +---- invalid --> quarantine + alert
    |
    v
Business processing
    |
    v
Archive / success
```

### Duplicate protection
Use a business/file identity such as filename + size + checksum or partner message ID, depending on the contract. Keep an idempotency record where duplicate delivery is possible.

### Interview question
**Q: How do you troubleshoot an SFTP authentication failure?**

**Answer:** Check host/port reachability, credential type, key format/permissions, server-side account access, host-key requirements, TLS/SSH negotiation where relevant, and the connector error details. Compare a controlled manual connection with the same endpoint while avoiding secrets in logs.

---

## 5. JMS / IBM MQ / Anypoint MQ

### Why messaging matters
Messaging decouples producers and consumers and provides buffering when downstream systems cannot process traffic at the producer's rate.

### Core model

```text
Producer --> Queue --> Consumer
               |
               +--> retry/redelivery
               +--> DLQ
```

### Configuration concepts
- broker/connection details
- queue/topic/destination
- authentication
- acknowledgement mode
- transactions where supported
- redelivery
- retry
- DLQ
- correlation/message IDs
- concurrency

### IBM MQ
Master:
- queue manager
- channel
- connection mode
- queue
- credentials/security
- message headers
- transactions/acknowledgement
- reconnect behavior

### Anypoint MQ
Master:
- destination
- client/application credentials
- publish/consume
- acknowledgement
- retries/DLQ strategy
- visibility/lock semantics as applicable

### Kafka
Master:
- bootstrap servers
- topic
- consumer group
- partitions
- offsets
- ordering
- acknowledgement/commit strategy
- authentication/TLS
- consumer concurrency

### Interview question
**Q: Why can a message be processed twice?**

**Answer:** If processing succeeds but acknowledgement/offset commit is not completed, the broker can redeliver the message. Consumers therefore need idempotent business processing when duplicate delivery is possible.

---

## 6. Salesforce Connector

### What it integrates
Salesforce APIs and Salesforce platform capabilities exposed by the connector version.

### Typical use cases
- Account/contact/customer synchronization
- CRM CRUD/upsert
- bulk synchronization
- query/report-driven integrations
- event-based integrations where supported

### Configuration categories
- Salesforce endpoint/environment
- authentication method
- client/application details for OAuth flows
- connection timeout/reconnection
- operation-specific settings

### Operations to master
- Query
- Create
- Update
- Delete
- Upsert
- bulk patterns
- event/query patterns supported by the selected version

### Production concerns
- API limits
- pagination
- bulk versus synchronous APIs
- permission sets
- duplicate external IDs
- partial failures
- retry safety
- field-level/security permissions

### Interview question
**Q: When would you use upsert instead of create?**

**Answer:** When the integration has a stable external identifier and must create the record if absent or update the existing record if present. It is often safer for synchronization than blindly creating records.

---

## 7. SOAP / Web Service Consumer

### What it integrates
SOAP web services described by WSDLs.

### Master these concepts
- WSDL
- service/port
- operation
- XML namespaces
- SOAP headers
- endpoint
- TLS
- authentication
- SOAP faults

### Flow

```text
Mule
 |
 | XML request
 v
SOAP endpoint
 |
 | SOAP response/fault
 v
Mule
```

### Production concerns
- WSDL version changes
- namespace mismatches
- certificate expiry
- SOAP faults versus transport errors
- large XML payloads
- timeouts

### Interview question
**Q: What is the difference between a SOAP fault and a network error?**

**Answer:** A SOAP fault is a response generated by the SOAP service describing an application/protocol-level failure. A network error occurs before a usable SOAP response is received, such as DNS failure, connection refusal or timeout.

---

## 8. Email Connector

### Use cases
- alerts
- notifications
- business documents
- inbound mailbox processing where supported

### Configuration categories
- SMTP/IMAP/POP3 server as applicable
- port
- TLS/security
- authentication
- sender/recipient
- subject/body
- attachments

### Production concerns
- credentials and secret rotation
- TLS
- recipient validation
- attachment size
- provider throttling
- retry/deduplication

### Interview question
**Q: Why should email sending not be treated as a guaranteed business transaction?**

**Answer:** SMTP acceptance does not guarantee final mailbox delivery. For business-critical workflows, persist the business event and track delivery/processing status separately.

---

## 9. SAP / S/4HANA

### Where it fits
ERP integration: customers, suppliers, orders, products, finance and other SAP business processes.

### Configuration thinking
First identify the SAP interface style required by the target system/version: API/OData, SOAP, IDoc, RFC or another supported integration mechanism. Then select the appropriate connector and configure its connection/authentication according to that interface.

### Production concerns
- SAP landscape and tenant/environment
- authorization objects/roles
- transaction semantics
- large document volumes
- synchronous versus asynchronous processing
- retries and duplicate business documents
- SAP-side monitoring

### Interview question
**Q: Why should you not choose a generic HTTP integration blindly for SAP?**

**Answer:** SAP interfaces can have domain-specific semantics, metadata, authentication and transaction behavior. A purpose-built connector or supported SAP interface can reduce custom protocol work and expose more appropriate operations/metadata.

---

## 10. Workday

### Use cases
HR, worker, organization, finance and business-process integrations.

### Master
- tenant/environment
- authentication
- Workday API/interface type
- operation-specific request structures
- pagination and large result handling
- rate/throughput constraints

### Interview question
**Q: What should you check before implementing a Workday integration?**

**Answer:** Confirm the exact Workday interface and business operation, tenant/environment, authentication, required permissions, response shape, pagination behavior, and the expected volume/error contract.

---

## 11. ServiceNow

### Use cases
ITSM automation: incidents, requests, changes, users, CMDB-related integrations and other supported resources.

### Configuration
- instance URL
- authentication
- resource/table/API choice
- query/filter
- pagination
- timeout/retry

### Production concerns
- avoid excessive polling
- respect instance/API limits
- use stable business identifiers
- distinguish transient platform errors from validation errors

### Interview question
**Q: How would you prevent duplicate ServiceNow incidents?**

**Answer:** Define a stable external/business correlation key and check or use a supported idempotent/upsert-like pattern rather than blindly creating a new incident for every retry.

---

## 12. Microsoft Dynamics 365

### Use cases
CRM and business application integration.

### Master
- environment/tenant
- OAuth/application registration
- resource/entity selection
- query/filter
- pagination
- throttling
- permissions

### Interview question
**Q: What is a common reason a Dynamics integration works locally but fails in another environment?**

**Answer:** Environment-specific tenant, application registration, endpoint, permissions or secret/certificate configuration can differ. Externalize these values and validate the deployment environment independently.

---

## 13. NetSuite

### Use cases
ERP/business management integrations.

### Master
- account/environment
- authentication model supported by the connector version
- records/operations
- search/filtering
- pagination
- rate limits
- retries and duplicate prevention

### Interview question
**Q: What should you document for a NetSuite production integration?**

**Answer:** Account/environment, authentication, permissions, connector version, operations, record identifiers, pagination/limits, retry/idempotency behavior, monitoring and known NetSuite-side constraints.

---

## 14. Anaplan

### Use cases
Planning and financial/business data exchange.

### Master
- workspace/model identifiers
- authentication
- import/export operations
- file/data handling
- job status and asynchronous processing where applicable
- failure recovery

### Interview question
**Q: Why do asynchronous operations require additional design?**

**Answer:** Starting a job is not the same as completing it. The integration needs a strategy to track status, handle failure and avoid starting duplicate jobs.

---

## 15. Box / SharePoint / cloud file collaboration

### Use cases
Enterprise document storage and collaboration.

### Master
- tenant/site/folder/drive context
- OAuth/application permissions
- file metadata
- upload/download
- large-file strategy
- duplicate detection
- sharing/security controls

### Interview question
**Q: What is the key difference between a file transfer and a document collaboration integration?**

**Answer:** Collaboration systems often have richer object metadata, versioning, permissions and sharing semantics. Treating them like a simple filesystem can cause incorrect overwrite, permission or version behavior.

---

## 16. MongoDB

### Use cases
Document-oriented data integration.

### Master
- URI/cluster
- authentication
- database/collection
- query/filter
- insert/update/delete
- indexing
- connection pooling
- large-result handling

### Interview question
**Q: Why should indexes be considered part of connector troubleshooting?**

**Answer:** A connector can be configured correctly while the database operation remains slow because of a poor query plan or missing index. End-to-end performance includes the target database design.

---

## 17. AWS S3 / SQS / SNS

### S3
Object storage: upload, download, list and object lifecycle operations supported by the connector.

### SQS
Queue-based asynchronous integration.

### SNS
Publish/notification fan-out.

### Architecture

```text
Mule
 |
 +--> S3   (objects)
 |
 +--> SQS  (queue)
 |
 +--> SNS  (fan-out notifications)
```

### Master
- region
- credentials/role strategy
- bucket/queue/topic
- encryption
- visibility/acknowledgement semantics
- retries
- DLQ
- large object handling

### Interview question
**Q: Why is SQS different from SNS?**

**Answer:** SQS is a queue where consumers retrieve messages. SNS is primarily a publish/subscribe notification service that can fan out a publication to multiple subscribers.

---

## 18. Azure services

Depending on the integration requirement, investigate Azure-specific connectors such as storage, service bus, eventing or other supported services.

### Master
- tenant/subscription/resource identifiers
- OAuth/service principal or supported auth
- queue/topic semantics
- storage/object semantics
- retry and throttling
- monitoring

### Interview question
**Q: What should be environment-specific?**

**Answer:** Tenant, subscription/resource identifiers, endpoints, credentials/certificates, queue/topic names and other deployment-specific configuration should be externalized rather than embedded in application logic.

---

## 19. Google services

For supported Google connectors, master project/account context, OAuth/service-account authentication, resource identifiers, quotas, pagination and provider-specific retry semantics.

### Interview question
**Q: Why should cloud quotas be part of integration design?**

**Answer:** A functionally correct integration can still fail under real traffic when provider quotas or rate limits are exceeded. Throughput, batching, backoff and monitoring should be designed before production.

---

## 20. LDAP / Active Directory

### Use cases
- directory lookup
- user attributes
- identity-related automation
- account operations where permitted

### Master
- LDAP URL
- bind identity
- bind/search permissions
- base DN
- filters
- TLS/LDAPS
- timeout

### Security
Use least privilege. Never log directory passwords or sensitive identity attributes unnecessarily.

### Interview question
**Q: What is an LDAP filter?**

**Answer:** It is an expression used to select directory entries matching conditions, such as a user with a particular attribute value. The exact syntax and server behavior should be validated against the directory implementation.

---

## 21. EDI / X12 / EDIFACT / B2B

### What it solves
Structured business document exchange between organizations.

### Architecture

```text
Partner
  |
  v
EDI document
  |
  v
Transport / B2B boundary
  |
  v
EDI parser/validator
  |
  v
DataWeave / business logic
  |
  v
ERP / CRM / DB
```

### Master
- trading partner agreement
- document type/version
- envelopes
- validation
- acknowledgements
- rejection handling
- control numbers
- duplicate detection
- partner-specific mapping

### Interview question
**Q: Why are EDI control numbers important?**

**Answer:** They provide document/interchange identity and support validation, duplicate detection, acknowledgement correlation and operational traceability.

---

## 22. WebSockets / Sockets

### WebSockets
Bidirectional, long-lived communication between client and server.

### Sockets
Lower-level network communication when a supported protocol requires it.

### Master
- connection lifecycle
- framing/protocol
- authentication
- heartbeat/keepalive
- reconnect
- backpressure
- message ordering
- resource cleanup

### Interview question
**Q: Why is a long-lived connection different from an HTTP request?**

**Answer:** It introduces connection lifecycle, heartbeat, reconnect, resource management and potentially backpressure concerns that do not exist in the same way for short-lived request/response calls.

---

## 23. Object Store

### Use cases
- idempotency keys
- short-lived state
- checkpoints
- cached integration metadata
- correlation state where appropriate

### Production rule
Do not treat Object Store as a universal relational database. Define TTL/retention, key design, concurrency behavior and recovery expectations.

### Interview question
**Q: Give one practical Object Store use case.**

**Answer:** Store a processed-message identifier so a retried message can be recognized and skipped when the business process requires idempotent consumption.

---

## 24. Java Module

Use when a reusable Java library/function is genuinely needed and cannot reasonably be implemented using standard Mule components/DataWeave.

### Production concerns
- dependency management
- classloader compatibility
- security review
- thread safety
- exception mapping
- upgrade compatibility

### Interview question
**Q: Should Java replace DataWeave for normal transformations?**

**Answer:** No. Use DataWeave for normal Mule payload transformation and use Java selectively for capabilities that genuinely require Java code or an approved library.

---

## 25. AI / Agent / MCP-related connectivity

Modern MuleSoft projects may connect AI systems, tools and agent-oriented services through supported connectors or APIs.

### Master
- authentication and authorization
- tool allowlists
- input validation
- output/schema validation
- prompt/data privacy
- timeouts
- token/cost limits
- audit logging
- deterministic fallbacks
- human approval for high-impact actions

### Interview question
**Q: Why must an AI tool call be treated differently from an ordinary read-only API call?**

**Answer:** A tool may cause an external side effect. Validate the requested action, authorize the tool, constrain inputs, log the decision context and apply idempotency/approval controls appropriate to the business risk.

---

# Cross-connector troubleshooting lab

## Scenario 1 — Timeout

```text
Mule -> connector -> downstream
                    |
                    +--> slow
```

Check:
1. connection establishment time
2. DNS/network
3. connector timeout
4. downstream processing time
5. payload size
6. server-side logs
7. whether the downstream actually processed the request
8. retry safety

## Scenario 2 — Authentication failure

Check:
1. credential type
2. secret/certificate expiry
3. endpoint/tenant
4. scopes/roles
5. TLS trust
6. deployment property resolution
7. connector version compatibility

## Scenario 3 — Duplicate business record

Check:
1. source duplicate delivery
2. retry policy
3. acknowledgement timing
4. timeout-after-success possibility
5. missing idempotency key
6. target unique constraint/external ID

## Scenario 4 — Production latency

Measure rather than guess:

```text
Total latency
 = network
 + connector overhead
 + target processing
 + transformation
 + queue wait
 + downstream dependencies
```

Capture metrics before changing pool sizes, concurrency or timeouts.

# Final rule

For every connector in this repository, learn **configuration + operation + DataWeave + error handling + resilience + security + performance + testing + production troubleshooting + interview explanation**. That is the difference between knowing a connector exists and being able to use it professionally.
