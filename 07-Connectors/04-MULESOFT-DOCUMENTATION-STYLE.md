# MuleSoft Connector Learning Standard

This guide defines the **internal learning structure** for connector chapters in this repository, with practical configuration, production-support, architecture, hands-on and interview depth.

> The repository teaches the concepts in its own words. Connector lessons must contain the theory, configuration reasoning, examples, failure behavior, production patterns, labs and interview questions needed to understand the topic.

## 1. How to learn a connector

Use the repository's internal layers:

```text
Connector family overview
        |
        +--> Concept lesson       -> what it is and why it exists
        +--> Configuration lesson -> fields, authentication, TLS, networking
        +--> Implementation       -> XML, DataWeave, input/output
        +--> Failure guide        -> errors, timeout, retry, idempotency
        +--> Testing              -> MUnit and integration scenarios
        +--> Operations           -> monitoring, troubleshooting, recovery
        +--> Lab                  -> build, break, diagnose and fix
        +--> Interview Q&A        -> explain the design clearly
```

Do not assume that a field shown for one connector or version exists in another. Record the tested version inside the lesson.

## 2. Standard connector lifecycle

```text
Requirement
   |
   v
Choose protocol/system connector
   |
   v
Check Mule Runtime + Java compatibility
   |
   v
Add connector from Exchange / Studio
   |
   v
Create global configuration
   |
   +--> credentials / OAuth
   +--> endpoint / host / tenant
   +--> TLS / proxy
   +--> timeout
   +--> reconnection
   |
   v
Choose source (if the connector provides one)
   |
   v
Choose operation
   |
   v
Map payload with DataWeave
   |
   v
Handle connector errors
   |
   v
Test connection + MUnit
   |
   v
Deploy
   |
   v
Observe / operate / troubleshoot
```

## 3. What belongs in a global configuration?

A global configuration should hold connection-level information that can be reused by operations. Typical categories are:

| Category | Typical examples | Production rule |
|---|---|---|
| Endpoint | host, URL, region, tenant | externalize it |
| Authentication | username/password, client ID/secret, OAuth | never hard-code secrets |
| TLS | truststore, keystore, certificates | manage expiry |
| Network | proxy, socket settings | document the route |
| Timeout | connection/request/read | choose from SLA and evidence |
| Reconnection | fixed/frequency or exponential strategy where supported | bound attempts |
| Pooling | max connections, idle settings | size from load testing |
| Client behavior | API version, transport options | pin and test versions |

## 4. Source versus operation

A source starts a flow. An operation performs work.

```text
[Source]
 HTTP Listener / Scheduler / MQ consumer / SQS receive / File poll
       |
       v
[Transform]
 DataWeave
       |
       v
[Connector Operation]
 Query / Insert / Publish / Send / Upsert / Get
       |
       v
[Response / Error handling]
```

Not every connector provides a source. If it does not, use another Mule source such as HTTP Listener or Scheduler and call the connector operation inside the flow.

## 5. Configuration properties

Keep environment-specific values outside the flow logic.

Example `config-dev.yaml` concept:

```yaml
http:
  port: "8081"
  host: "0.0.0.0"
backend:
  host: "api-dev.example.com"
  timeoutMs: "10000"
```

Then reference properties from the Mule configuration rather than embedding environment values in every operation.

For secrets, use secure configuration appropriate to the deployment platform rather than committing passwords or tokens to Git.

## 6. Reconnection is not the same as retry

**Reconnection** normally concerns restoring a connector's connection/session when connectivity is unavailable.

**Retry** concerns repeating an operation after a failure.

```text
Connection lost
     |
     +--> Reconnection strategy
             |
             +--> connection restored

Operation failed
     |
     +--> Retry policy
             |
             +--> operation repeated
```

Never blindly retry a non-idempotent operation. If the remote system accepted the request but the response was lost, a retry can create a duplicate.

## 7. Idempotency decision

Ask:

1. Can the same business event arrive twice?
2. Can the connector operation be repeated safely?
3. Does the target provide an idempotency key or natural unique key?
4. Can we store a processed-event ID?
5. What happens if the request succeeds but Mule times out before receiving the response?

Example:

```text
messageId = ORD-12345
        |
        v
check idempotency store
   |             |
 already done   new
   |             |
 skip            process
                 |
                 v
            mark complete
```

## 8. Error handling model

Classify connector failures before selecting a recovery action:

| Failure | Example | Typical response |
|---|---|---|
| Authentication | expired credential | fix credential / alert |
| Authorization | insufficient permission | correct role/scope |
| Connectivity | DNS, refused connection | reconnection / incident |
| Timeout | downstream slow | investigate SLA; bounded retry if safe |
| Rate limit | HTTP 429 | backoff according to provider rules |
| Validation | invalid request | fix mapping / reject |
| Duplicate | same event twice | idempotency |
| Data integrity | partial/invalid file | quarantine and investigate |
| Target outage | 5xx / broker unavailable | bounded retry, queue, or DLQ |

## 9. Connector selection matrix

| Requirement | Connector family to investigate | Key decision |
|---|---|---|
| REST API | HTTP | API contract, auth, timeout, retry |
| Relational DB | Database | JDBC driver, transactions, pool |
| Local/shared files | File | filesystem semantics |
| Secure remote files | SFTP | SSH keys, host key, readiness |
| Queue messaging | JMS / IBM MQ / Anypoint MQ | acknowledgement and redelivery |
| Streaming | Kafka | partitions, offsets, ordering |
| CRM | Salesforce / Dynamics | limits, pagination, bulk/event APIs |
| ERP | SAP | API/protocol and transaction model |
| HR | Workday | tenant/auth and operation model |
| ITSM | ServiceNow | tables/API, pagination, rate limits |
| Object storage | S3/Azure Blob/Google Cloud Storage | object semantics, eventing |
| SOAP | Web Service Consumer | WSDL, SOAP headers, faults |
| Directory | LDAP | bind, search, permissions |
| B2B | X12/EDIFACT/EDI | agreement, validation, acknowledgements |

## 10. What to record for every production connector

```text
Application
Connector name + exact version
Mule runtime version
Java version
Environment
Endpoint / tenant / region
Authentication method
TLS/certificate details
Source
Operations
Timeouts
Reconnection
Retry policy
Idempotency strategy
Transaction semantics
Pagination/batching
Rate limits
MUnit coverage
Dashboard/alerts
Runbook
Known failure modes
Last tested date
```

## 11. Learner checklist

A learner has mastered a connector only when they can:

- explain what system/protocol it integrates with
- explain why it is selected instead of another connector
- install it from Exchange/Studio
- create and reuse its configuration
- configure authentication and TLS
- explain source and operations
- transform input/output with DataWeave
- identify connector-specific errors
- explain timeout, reconnection, retry and idempotency
- write MUnit tests
- troubleshoot a production failure
- explain security and performance concerns
- describe the implementation in an interview

## Repository rule

**The repository is the lesson.** A learner should be able to understand the concept, follow the diagram, study the example, reproduce the configuration, see input/output, run the lab, diagnose failures and answer interview questions without being redirected to a separate documentation hub.
