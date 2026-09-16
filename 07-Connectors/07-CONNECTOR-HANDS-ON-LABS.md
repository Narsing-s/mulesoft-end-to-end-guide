# Connector Hands-On Lab Pack

These labs turn documentation into working developer skills. Each lab follows: requirement → design → configure → input → output → failure → test → production hardening.

## Lab 1 — HTTP API to HTTP API

**Requirement:** expose `GET /customers/{id}`, call a downstream customer API, transform the response.

**Flow:**
```text
HTTP Listener -> Validate -> HTTP Request -> DataWeave -> Response
                         |
                         +-> error handler
```

**Practice:** headers, URI parameters, query parameters, TLS, timeout, 4xx/5xx, correlation ID, idempotency discussion, MUnit mocking.

**Question:** What if the downstream accepts the request but Mule times out?

**Answer:** Treat the outcome as unknown. Do not blindly retry a non-idempotent operation. Use an idempotency key or query/reconciliation mechanism where supported.

## Lab 2 — Database CRUD

Build customer create/read/update/delete using parameterized SQL.

**Input:** `{"customerId":"C1001","name":"Ravi"}`

**Practice:** connection configuration, driver, credentials, pool, query timeout, transaction boundary, SQL parameters, error mapping.

**Question:** Why should SQL not be assembled by string concatenation?

**Answer:** Parameter binding reduces injection risk and separates SQL structure from input values.

## Lab 3 — File ingestion

Read CSV from an inbound directory, validate required columns, transform to JSON, archive successful files and quarantine invalid files.

**Failure drills:** partial file, duplicate filename, permission failure, malformed CSV, large file.

**Question:** How do you avoid processing a file while it is still being written?

**Answer:** Establish a producer contract such as temporary extension plus atomic rename or a completion marker, or use a carefully tested readiness mechanism.

## Lab 4 — SFTP partner exchange

Download partner files, validate them, process them, archive success and quarantine failures.

**Practice:** host/port, credentials/key, host verification, remote directory, file patterns, timeouts, reconnection, duplicate detection.

**Question:** What should you check first when SFTP authentication fails?

**Answer:** Confirm endpoint reachability, authentication method, account access, key/credential validity, host-key requirements and connector error details. Never expose credentials in logs.

## Lab 5 — IBM MQ / JMS / Anypoint MQ

Build producer → queue → consumer with acknowledgement and failure recovery.

**Practice:** correlation ID, redelivery, DLQ, acknowledgement, transactions where supported, concurrency and idempotency.

**Question:** Why can the same message be processed twice?

**Answer:** Processing can succeed while acknowledgement/commit fails or is not completed, allowing redelivery. Business processing must therefore tolerate duplicates when the delivery model permits them.

## Lab 6 — Kafka event processing

Consume a topic, transform events, persist the business result and handle failures.

**Practice:** topic, partition, consumer group, offset/commit behavior, ordering, concurrency, retry and replay.

**Question:** Why is a consumer group important?

**Answer:** It defines how consumers coordinate consumption of partitions so multiple instances can share work while maintaining the broker's delivery model.

## Lab 7 — Salesforce synchronization

Synchronize customer records using a stable external identifier.

**Practice:** authentication, Query, Create, Update, Upsert, pagination, API limits, bulk strategy, permission errors and MUnit.

**Question:** Why can Upsert be safer than Create for synchronization?

**Answer:** A stable external identifier allows the integration to update an existing record or create it when absent, reducing duplicate creation.

## Lab 8 — SOAP service integration

Consume a WSDL-based operation and map XML response to JSON.

**Practice:** WSDL, operation, namespace, SOAP headers, TLS, SOAP fault versus transport failure.

**Question:** Is a SOAP fault the same as a network timeout?

**Answer:** No. A SOAP fault is an application/protocol response from the service; a network timeout occurs when a usable response is not received.

## Lab 9 — AWS S3 + SQS

Store an object in S3, publish its business identifier to SQS, consume the message and process the object.

**Practice:** IAM, region, bucket/key, queue, visibility/acknowledgement semantics, DLQ, duplicate processing and large-object handling.

## Lab 10 — ServiceNow incident automation

Create/update an incident from an inbound event while preventing duplicates.

**Practice:** authentication, table/resource API, filtering, correlation key, pagination, rate limits, retries and audit.

## Lab 11 — SAP business document integration

Implement a controlled integration using the SAP interface required by the target landscape.

**Practice:** interface selection, authentication, authorization, document identity, synchronous/asynchronous behavior, retries, reconciliation and SAP-side monitoring.

## Lab 12 — Workday employee synchronization

Retrieve workers, transform to a canonical employee model and load a target system.

**Practice:** tenant, authentication, pagination, volume, error handling, checkpoint/restart and reconciliation.

## Lab 13 — MongoDB document integration

Read customer documents, transform and update them.

**Practice:** URI, database/collection, filters, indexes, update semantics, pooling and large results.

## Lab 14 — LDAP directory lookup

Receive a username, search the directory and return selected attributes.

**Practice:** bind identity, base DN, filter, permissions, TLS, result limits and safe logging.

## Lab 15 — EDI validation pipeline

Process an inbound X12/EDIFACT document through validation, business mapping and acknowledgement/error handling.

**Practice:** envelope/message structure, partner agreement, validation, functional acknowledgement, rejection, tracking and replay.

## Lab 16 — Connector outage simulation

Pick any connector and intentionally break one dependency.

Break one at a time:
- wrong hostname
- expired/invalid credential
- invalid certificate
- refused port
- timeout
- permission failure
- malformed payload
- provider rate limit
- duplicate event
- target outage

**Required evidence:** error type, correlation ID, root cause, recovery action, prevention, MUnit test.

## Lab completion checklist

- [ ] configuration externalized
- [ ] no secrets committed
- [ ] successful request tested
- [ ] invalid input tested
- [ ] connectivity failure tested
- [ ] timeout tested
- [ ] retry/reconnection decision documented
- [ ] idempotency decision documented
- [ ] MUnit tests added
- [ ] logs masked
- [ ] correlation ID available
- [ ] operational runbook written
- [ ] interview explanation prepared
