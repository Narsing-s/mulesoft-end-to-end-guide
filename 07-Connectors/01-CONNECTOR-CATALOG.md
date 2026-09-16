# MuleSoft Connector Catalog — Complete Study Map

This catalog is the navigation layer for connector learning. It deliberately separates **core connector families**, **application/SaaS connectors**, **cloud/service connectors**, **messaging**, **B2B/EDI**, and **platform/modern connectors** so a learner does not mistake five common connectors for the complete MuleSoft connectivity landscape.

> Connector availability, names, operations, support tier, and exact configuration fields can change by product/version. Record the tested connector/runtime version in the internal lesson before implementing production code.

## A. Core connectivity connectors

| Connector/family | What to learn | Configuration topics | Typical operations/use |
|---|---|---|---|
| HTTP | REST/HTTP communication | listener, request, host, port, TLS, auth, timeout | Listener, Request |
| Database | JDBC relational DB | driver, URL, pool, credentials, transactions | Select, Insert, Update, Delete, Stored Procedure |
| File | local/shared filesystem | directory, patterns, move/archive, locking/readiness | Read, Write, List, Move, Copy, Delete |
| FTP | legacy file transfer | host, port, credentials, working dir, timeout | Read/Write/List/Move |
| SFTP | SSH file transfer | host, port, user, password/key, working dir, host security | Read/Write/List/Move |
| FTPS | FTP over TLS where applicable | TLS/certificates, host, port, credentials | file transfer |
| Email | SMTP/mailbox integration | SMTP host, port, TLS, auth, sender/recipient | Send/mail operations |
| JMS | standard Java messaging | broker connection, queue/topic, ack, correlation, transactions | Listener, Consume, Publish |
| IBM MQ | IBM enterprise messaging | queue manager, channel, queue, TLS, credentials | Get/Put/listener patterns |
| Anypoint MQ | managed messaging | client credentials, destination, ack/retry semantics | Publish/Consume |
| Web Service Consumer | SOAP/WSDL services | WSDL, endpoint, TLS, SOAP headers, auth | invoke SOAP operation |
| Sockets | TCP/UDP communication | host, port, framing, timeout, TLS | send/receive |
| LDAP | directory services | URL, bind user, base DN, filters, TLS | search/read/update |
| Object Store | key/value state | store type, key, TTL, persistence/scope | retrieve/store/remove |

## B. Database/document/data connectors

| Family | Study |
|---|---|
| Database | JDBC, SQL, parameters, pooling, transactions |
| MongoDB | documents, filters, indexes, aggregation, pooling |
| Redis/cache integrations where applicable | keys, TTL, atomicity, connection management |
| Hadoop/HDFS | distributed file/data access |
| Snowflake | warehouse connection, query, bulk/data movement, authentication |

## C. Major enterprise/SaaS application connectors

Study each connector with the same pattern: authentication → global configuration → source → operation → payload mapping → pagination/bulk → limits → error handling → retry/idempotency → MUnit → production troubleshooting.

- Salesforce
- Salesforce Data Cloud
- Salesforce Marketing Cloud
- SAP
- SAP S/4HANA Cloud
- Workday
- ServiceNow
- Microsoft Dynamics 365 / CRM-related connectors
- NetSuite
- Anaplan
- Box
- SharePoint
- Microsoft Teams where supported
- Slack where supported
- Twilio
- Stripe/payment-related connectors where supported
- DocuSign where supported
- Shopify where supported
- Zendesk where supported
- Google services/connectors
- Microsoft Azure services/connectors
- AWS services/connectors

## D. Cloud/service connector families

### AWS

Study service-specific configuration rather than treating AWS as one connector:

- S3: buckets, object keys, read/write/list, multipart/large objects, IAM
- SQS: queues, receive/delete, visibility timeout, DLQ, idempotency
- SNS: publish/notification fan-out
- Secrets/identity patterns: prefer supported workload identity/role mechanisms over long-lived static keys where possible

### Azure

Study service-specific identity, endpoint, resource, role assignment, retry, quota, and networking configuration.

### Google

Study project, API enablement, credentials/scopes, quota, pagination, and token lifecycle.

## E. Messaging/event streaming

- JMS
- IBM MQ
- Anypoint MQ
- Kafka
- AMQP-compatible integrations where supported
- MQTT/IoT-style integrations where supported
- VM connector for Mule application-internal messaging patterns

For every messaging technology learn:

```text
producer
   |
   v
broker
   |
   +--> destination
   |
   v
consumer
   |
   +--> acknowledgement
   +--> retry/redelivery
   +--> DLQ
   +--> idempotency
```

## F. B2B / EDI

- X12
- EDIFACT
- TRADACOMS
- AS2/B2B patterns where supported
- Partner Manager / B2B lifecycle concepts

Study envelopes, transaction sets/messages, partner contracts, validation, acknowledgements, functional/business errors, tracking, and replay.

## G. Modern MuleSoft / AI-related connectivity

Depending on the current MuleSoft product release, study the applicable:

- Agent2Agent (A2A)
- Agentforce
- Einstein AI
- MCP
- AI/LLM integration assets
- modern API/agent tool integrations

For AI-related integrations add: prompt/data governance, authorization, tool allowlists, input/output validation, privacy, audit, timeout, fallback, cost controls, and deterministic business validation.

## H. Protocol and specialized connectors

Also maintain awareness of:

- AS2
- HL7
- X12
- EDIFACT
- EDI-related partner connectors
- WebSockets
- Sockets
- TCP/UDP protocol integrations
- LDAP
- FTPS
- HDFS
- SAP-specific protocols
- application-specific partner/community connectors available through Exchange

## I. Built-in vs Exchange connectors

The connector catalog is a living inventory. Connector assets can be added, renamed, versioned or retired, so each internal lesson records the exact asset/version used by its examples instead of relying on a fixed static list.

## J. Configuration template every connector chapter must contain

Every detailed connector chapter in this repository should contain these headings:

1. What it is
2. Why it is needed
3. When to use it
4. When not to use it
5. Architecture diagram
6. Prerequisites
7. Add connector to Studio/Code Builder
8. Maven/dependency considerations
9. Global configuration
10. Every important connection field
11. Authentication
12. TLS/certificates
13. Source configuration
14. Operation configuration
15. Complete XML example
16. DataWeave input
17. DataWeave output
18. Success scenario
19. Failure scenario
20. Error types
21. Timeout
22. Reconnection
23. Retry
24. Idempotency
25. Transactions
26. Pooling/concurrency
27. Pagination/batching
28. Rate limits
29. Security
30. Observability
31. MUnit mocking
32. Integration testing
33. Troubleshooting
34. Production checklist
35. Interview questions
36. Scenario questions
37. Hands-on exercise
38. Version notes

## K. Connector selection decision tree

```text
What system are you integrating?
            |
   +--------+---------+
   |                  |
 HTTP/API          File transfer
   |                  |
 HTTP            +----+----+
                 |         |
               SFTP      FTP/FTPS

Database?
   |
Database Connector

Asynchronous messaging?
   |
 +---------+-----------+---------+
 JMS      IBM MQ    Anypoint MQ  Kafka

SaaS/enterprise app?
   |
Find the application-specific connector in Exchange

SOAP?
   |
Web Service Consumer

Directory?
   |
LDAP

EDI/B2B?
   |
X12 / EDIFACT / TRADACOMS / B2B tooling

Low-level protocol?
   |
Sockets / specialized connector
```

## L. Connector interview master questions

1. What is a Mule connector?
2. What is the difference between a source and an operation?
3. How do you configure a global connector configuration?
4. How do you externalize connector properties?
5. How do you secure connector credentials?
6. How do you configure TLS?
7. What is reconnection?
8. What is retry?
9. When is retry dangerous?
10. How do you make an integration idempotent?
11. How do you test connector calls with MUnit?
12. How do you troubleshoot connector connectivity?
13. How do you distinguish Mule configuration failure from downstream failure?
14. How do connection pools affect performance?
15. How do you handle API rate limits?
16. How do you handle duplicate messages?
17. How do you handle partial file processing?
18. How do you handle a database outage?
19. How do you handle MQ redelivery?
20. How do you secure SFTP private keys?
21. How do you handle a Salesforce API limit?
22. How do you diagnose an HTTP 401 vs 429 vs 500?
23. How do you test timeout and connectivity errors?
24. How do you avoid logging secrets?
25. How do you decide between HTTP, MQ, SFTP, and DB?

## M. Production incident drill

For each connector, practice this scenario:

> "The connector worked yesterday but is failing in production today."

Answer methodically:

```text
1. Identify exact timestamp/correlation ID
2. Identify flow and operation
3. Read connector error type/message
4. Check configuration change/deployment
5. Check credentials/certificate expiry
6. Check DNS/network/TLS
7. Check downstream availability
8. Check quotas/rate limits
9. Check connection pool/thread saturation
10. Check payload/business validation
11. Determine whether retry is safe
12. Recover safely
13. Verify successful processing
14. Document root cause and prevention
```
