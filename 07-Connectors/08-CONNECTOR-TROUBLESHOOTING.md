# Connector Production Troubleshooting Handbook

## Universal decision tree

```text
Connector failure
      |
      v
Read exact Mule error type/message
      |
      +--> Auth/Authorization?
      |       -> credentials/scopes/roles
      |
      +--> Connectivity?
      |       -> DNS/route/firewall/port/TLS
      |
      +--> Timeout?
      |       -> downstream latency/pool/thread/SLA
      |
      +--> Rate limit?
      |       -> quota/backoff/concurrency
      |
      +--> Validation?
      |       -> payload/schema/business rules
      |
      +--> Duplicate?
      |       -> idempotency/replay analysis
      |
      +--> Provider outage?
              -> retry/DLQ/queue/reconciliation
```

## HTTP

**401:** authentication/credential problem.

**403:** authenticated identity lacks required permission, or provider policy blocks the call.

**404:** wrong URL/path/resource or unavailable resource.

**429:** rate limiting; follow provider retry/backoff guidance.

**5xx:** downstream server-side failure; determine whether operation is safe to repeat.

**Timeout:** determine whether the remote system may have completed the operation before the response was lost.

## Database

Check:
1. database availability
2. DNS/network
3. credentials/permissions
4. connection pool exhaustion
5. query duration
6. locks/deadlocks
7. indexes/query plan
8. transaction duration
9. database-side resource saturation

Do not solve every DB problem by increasing the pool. A larger pool can increase database pressure.

## File

Check:
- directory exists
- runtime user has permissions
- producer completed writing
- filename/filter matches
- file encoding/content is valid
- duplicate/archive rules
- disk space
- shared filesystem/mount availability

## SFTP/FTP/FTPS

Check in order:
1. host/port
2. DNS/network
3. authentication method
4. username/account status
5. key/certificate validity
6. host verification requirements
7. remote directory permission
8. filename/pattern
9. timeout/reconnection
10. partner-side status

## JMS / IBM MQ / Anypoint MQ

Check:
- broker/queue manager availability
- destination name
- authentication/authorization
- acknowledgement state
- redelivery count
- DLQ
- message expiry
- transaction boundary
- consumer concurrency
- duplicate processing

For IBM MQ additionally identify queue manager/channel/connection mode and inspect the provider-side reason code.

## Kafka

Check:
- bootstrap connectivity
- TLS/authentication
- topic exists
- partitions
- consumer group membership
- offset/commit state
- consumer lag
- rebalance behavior
- serialization/schema
- provider throttling

## Salesforce / SaaS APIs

Check:
- token/session validity
- application/client configuration
- permissions
- API limits
- pagination
- provider-side object/field permissions
- external ID uniqueness
- partial/bulk results
- provider status

## SOAP

Separate:
- DNS/TCP/TLS failure
- HTTP transport failure
- SOAP fault
- XML/schema/namespace failure
- application validation failure

The recovery strategy differs for each class.

## Cloud connectors

For AWS/Azure/Google investigate:
- region/project/subscription
- identity and role assignment
- resource name
- endpoint
- network route/private endpoint
- provider quota
- provider status
- encryption permissions
- SDK/connector version compatibility

## Incident evidence template

```text
Incident:
Environment:
Application:
Flow:
Connector:
Operation:
First observed:
Correlation ID:
Error type:
Provider status/code:
Recent deployment/config change:
Credential/certificate status:
Network/TLS status:
Downstream health:
Rate limit/quota:
Pool/concurrency:
Payload validation:
Duplicate risk:
Recovery:
Business verification:
Root cause:
Corrective action:
Preventive action:
Test added:
Runbook updated:
```

## Golden rule

Do not restart blindly, retry blindly, increase timeouts blindly, or increase pools blindly. First identify the failure class and whether the business operation could already have succeeded.
