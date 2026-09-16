# Connector Implementation Standard

This is the mandatory implementation template for every connector chapter in this repository. It follows the structure recommended by MuleSoft documentation: install/discover → global configuration → source/trigger → operation → test connection → resilience → deployment. Exact fields remain version-specific.

## 1. Requirement first

Document:
- source system
- target system
- protocol/API
- synchronous or asynchronous requirement
- expected volume and payload size
- latency/SLA
- security classification
- duplicate/replay expectations
- failure and recovery requirements

## 2. Choose the connector

```text
Business requirement
       |
       +--> REST/HTTP ----------> HTTP
       +--> relational DB ------> Database
       +--> local/shared files --> File
       +--> secure partner file -> SFTP
       +--> SOAP/WSDL -----------> Web Service Consumer
       +--> queue/broker --------> JMS / IBM MQ / Anypoint MQ / Kafka
       +--> CRM -----------------> Salesforce / Dynamics
       +--> ERP -----------------> SAP / NetSuite / other app connector
       +--> HR ------------------> Workday
       +--> ITSM ----------------> ServiceNow
       +--> object storage ------> S3 / Azure / Google
       +--> directory -----------> LDAP
       +--> EDI -----------------> X12 / EDIFACT / B2B tooling
       +--> specialized protocol -> applicable Exchange connector
```

Do not choose a connector only because it is familiar. Record why it fits the target protocol and business contract.

## 3. Discover and install

In Anypoint Studio, use Mule Palette → Search in Exchange → search for the connector → Add → Finish. In Code Builder, add the connector from the component/Exchange experience. Record the exact connector version.

Before implementation verify:
- Mule runtime compatibility
- Java compatibility
- connector support tier/licensing
- dependency coordinates from Exchange
- release notes and migration notes
- required target-system permissions

## 4. Global configuration

A global configuration should contain reusable connection-level settings.

| Area | Questions to answer |
|---|---|
| Endpoint | Which host/URL/region/tenant? |
| Authentication | Basic, OAuth/OAuth2, client credentials, key, role, certificate? |
| TLS | Truststore, keystore, hostname verification, certificate lifecycle? |
| Proxy | Is outbound traffic through a proxy? |
| Timeout | Connection, response/read, operation timeout? |
| Reconnection | What happens after connection loss? |
| Pooling | How many connections/concurrent sessions are appropriate? |
| Provider settings | API version, queue manager, workspace, bucket, database, etc.? |

Externalize environment-specific values.

```yaml
connector:
  host: "api-${env}.example.com"
  timeoutMs: "10000"
  clientId: "${secure::connector.clientId}"
```

Never commit real passwords, private keys, tokens, or production certificates.

## 5. Source versus operation

```text
SOURCE / TRIGGER
HTTP Listener | Scheduler | MQ consumer | SQS receive | File poll
                         |
                         v
                 VALIDATE / TRANSFORM
                         |
                         v
                    OPERATION
Query | Insert | Publish | Send | Upsert | Invoke
                         |
                         v
                 RESPONSE / ERROR
```

A connector does not necessarily provide a source. A scheduler, HTTP listener, or another source can invoke its operation.

## 6. Connection test

Before deployment:
1. validate credentials
2. validate endpoint/tenant/region
3. validate TLS/certificates
4. use Studio Test Connection when supported
5. test the actual business operation, not only connectivity

A successful TCP/TLS connection does not prove authorization or application-level correctness.

## 7. Operation design

For every operation document:
- input payload
- attributes/headers
- required fields
- optional fields/defaults
- output payload
- output attributes
- metadata
- side effects
- timeout behavior
- provider error mapping

## 8. DataWeave boundary

Keep transformations explicit at connector boundaries.

```dw
%dw 2.0
output application/json
---
{
  externalId: payload.customerId,
  name: payload.name,
  status: upper(payload.status default "UNKNOWN")
}
```

Document a real input and expected output for each major operation.

## 9. Error model

Classify failures before choosing recovery:

| Class | Example | Action |
|---|---|---|
| Auth | expired credential | fix credential/alert |
| Authorization | missing scope/role | correct permissions |
| Connectivity | DNS/refused | investigate network/reconnect |
| Timeout | downstream slow | inspect SLA; retry only if safe |
| Rate limit | HTTP 429/provider quota | provider-defined backoff |
| Validation | malformed request | correct mapping/reject |
| Duplicate | repeated business event | idempotency |
| Target outage | 5xx/broker unavailable | bounded retry/queue/DLQ |
| Data corruption | bad/partial file | quarantine/reject |

## 10. Retry versus reconnection

**Reconnection** restores a connection/session. **Retry** repeats an operation.

```text
connection lost -> reconnection strategy -> connection restored
operation failed -> retry policy ---------> operation repeated
```

Never blindly retry a non-idempotent write. A remote system may have accepted the first request even if Mule did not receive the response.

## 11. Idempotency

For every write or message consumer answer:
- What is the business key?
- Can the same event arrive twice?
- Can the target accept an idempotency key?
- Can a processed-event store be used?
- What happens after timeout after remote acceptance?

```text
messageId/businessKey
        |
        v
idempotency check
   |          |
 done        new
   |          |
 skip       process
              |
              v
        mark successful
```

## 12. Transactions

Document transaction boundaries explicitly:
- what resource participates
- what is committed together
- what cannot be rolled back
- what happens after a partial external success
- whether compensation is required

Never assume a connector operation is transactional simply because the target system supports transactions.

## 13. Pagination, batching and streaming

For large data sets document:
- page size
- continuation token/cursor
- batch size
- memory behavior
- streaming strategy
- checkpoint/restart strategy
- partial failure handling
- rate limits

## 14. Performance

Measure before tuning.

```text
throughput = successful records / time
latency    = request start -> usable response
concurrency = simultaneous work
```

Check connector pools, worker/thread capacity, downstream quotas, payload size, serialization, database query plans and back-pressure.

## 15. Security

Minimum checklist:
- TLS where appropriate
- secure properties/secret manager
- least privilege
- certificate/secret rotation
- no credentials in source control
- no Authorization headers/private keys in logs
- mask PII/PHI/payment data
- audit access and changes
- validate inbound payloads

## 16. MUnit

Every connector chapter must include tests for:
1. successful operation
2. validation failure
3. authentication/authorization failure
4. timeout/connectivity failure
5. retry path where applicable
6. duplicate/idempotency path
7. provider error response

Mock external connector calls in unit tests; use controlled integration tests for real endpoints.

## 17. Production observability

Capture safely:
- application/flow name
- correlation ID
- connector and operation
- environment
- duration
- result category
- retry count
- provider status/error type

Do not log secrets or sensitive payloads by default.

## 18. Production runbook

```text
1. Identify timestamp + correlation ID
2. Identify flow + connector operation
3. Read exact error type/message
4. Compare last deployment/config change
5. Check credentials/certificate expiry
6. Check DNS/network/TLS
7. Check downstream health/status
8. Check quotas/rate limits
9. Check pool/thread saturation
10. Check payload/data validation
11. Decide whether retry is safe
12. Recover without creating duplicates
13. Verify business completion
14. Record root cause and prevention
```

## 19. Version management

For every production connector record:

```text
Connector name
Connector version
Mule runtime
Java version
Application version
Environment
Dependency coordinates
Release notes reviewed?
Migration guide reviewed?
Last successful test
Known compatibility constraints
```

Major connector upgrades can introduce compatibility changes. Review release notes and migration guidance before upgrading.

## 20. Definition of done

A connector chapter is complete only when the learner can **Explain → Configure → Build → Test → Break → Debug → Secure → Measure → Deploy → Operate → Explain in an interview**.
