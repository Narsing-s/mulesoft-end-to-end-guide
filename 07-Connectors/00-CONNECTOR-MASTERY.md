# MuleSoft Connectors — Complete Connector Mastery

> **Goal:** This chapter is a deep, job-oriented connector handbook. It is intentionally much broader than a five-connector introduction. A MuleSoft developer should be able to choose a connector, explain why it is used, configure it, authenticate securely, implement common operations, handle failures, test it, troubleshoot it, and explain the design in an interview.

## 1. What is a connector?

A MuleSoft connector is a reusable extension that lets a Mule application communicate with an external application, database, protocol, messaging system, file system, or service. A connector normally exposes one or more **sources** and **operations**.

Think of the connector as an adapter between Mule's event model and a target system:

```text
Client / Scheduler / Message
          |
          v
   Mule Flow / Event
          |
          +---- DataWeave ----+
          |                   |
          v                   v
      Connector --------> Target System
          |
          v
     Response / Error
```

A connector does not replace DataWeave. DataWeave prepares the data; the connector performs the interaction.

## 2. Source vs operation

### Source
A source starts a flow. Examples include HTTP Listener, Scheduler, File Listener, SFTP Listener, JMS Listener, and connector-specific listeners.

### Operation
An operation executes work in the middle of a flow. Examples include HTTP Request, Database Select, SFTP Read, Salesforce Query, JMS Publish, Email Send, and SAP operations.

```text
SOURCE
  |
  v
Transform / Validate
  |
  v
CONNECTOR OPERATION
  |
  v
Transform / Log / Respond
```

## 3. The connector configuration model

For production applications, avoid scattering credentials and endpoints through every operation. Prefer a reusable global configuration and environment properties.

```xml
<http:request-config name="HTTP_Request_Config">
    <http:request-connection protocol="HTTPS" host="${customer.api.host}" port="443"/>
</http:request-config>
```

Conceptually:

```text
Configuration
 ├── endpoint / host / port
 ├── authentication
 ├── TLS
 ├── timeout
 ├── reconnection
 ├── pooling (where applicable)
 └── proxy / advanced settings

Operation
 ├── path / destination
 ├── method / action
 ├── headers / parameters
 ├── query / body
 └── operation-specific options
```

## 4. Environment configuration

Never hard-code production passwords, tokens, private keys, database passwords, or customer endpoints.

Example:

```properties
customer.api.host=api.example.internal
customer.api.port=443
customer.api.clientId=${secure::customer.clientId}
customer.api.clientSecret=${secure::customer.clientSecret}
```

Recommended deployment model:

```text
Source control
   |
   | non-secret configuration
   v
Mule application
   |
   +--> environment properties
   |
   +--> secure properties / secret manager
   |
   +--> platform-provided credentials
   v
Connector configuration
```

## 5. Connector decision guide

| Requirement | Primary connector/family | Typical choice |
|---|---|---|
| REST/HTTP API | HTTP | Listener + Request |
| Relational DB | Database | Select/Insert/Update/Stored Procedure |
| Local/shared files | File | Read/Write/List/Move |
| Secure file transfer | SFTP | Read/Write/List/Move |
| Legacy FTP | FTP | Read/Write/List/Move |
| Generic secure shell file transfer | SFTP | Prefer SFTP where supported |
| Enterprise JMS broker | JMS | Listener/Consume/Publish |
| MuleSoft managed messaging | Anypoint MQ | Consume/Publish |
| IBM MQ | IBM MQ | Get/Put/Listener |
| Email | Email | Send/SMTP/IMAP/POP3 use cases |
| Salesforce | Salesforce | Query/Create/Update/Delete |
| SAP | SAP | RFC/BAPI/IDoc depending on connector capability |
| Workday | Workday | HR/business operations |
| ServiceNow | ServiceNow | ITSM operations |
| SOAP service | Web Service Consumer | WSDL/SOAP invocation |
| SOAP service exposure | Web Service Consumer/HTTP + API design | Depends on architecture |
| Generic TCP/UDP | Sockets | Socket communication |
| LDAP/AD | LDAP | Directory operations |
| MongoDB | MongoDB | Document operations |
| Microsoft Dynamics | Dynamics family | CRM/ERP operations |
| NetSuite | NetSuite | ERP operations |
| AWS services | AWS connector family | Service-specific operations |
| Azure services | Azure connector family | Service-specific operations |
| Google services | Google connector family | Service-specific operations |
| Kafka | Kafka | Produce/Consume |
| Anypoint Partner Manager/EDI | B2B/EDI family | Partner transaction processing |
| X12 | X12 | EDI transaction sets |
| EDIFACT | EDIFACT | EDI messages |
| SAP S/4HANA | SAP family | ERP integration |
| AI/agent integrations | AI/agent connector family | Model/agent/tool integration |

**Important:** the exact connector catalog, support status, operations, and versions are version-sensitive. Use Anypoint Exchange and the connector's current User Guide/Reference Guide when implementing a real project.

## 6. Universal configuration checklist

For every connector, answer these questions before implementation:

1. What system am I connecting to?
2. Is the connector a source, operation, or both?
3. What authentication mechanism is required?
4. Does it require TLS/mTLS?
5. Where are host, port, credentials, certificates, and keys stored?
6. What is the timeout?
7. What happens on connection failure?
8. Is reconnection enabled?
9. Is connection pooling available and correctly sized?
10. Does the operation participate in a transaction?
11. Is the operation idempotent?
12. Can the operation duplicate work after a retry?
13. What payload and metadata does it return?
14. What connector-specific error types can be raised?
15. How will MUnit mock the connector?
16. How will production logs identify the transaction?
17. What metrics indicate degradation?
18. What downstream rate limits exist?
19. What happens when the downstream system is unavailable?
20. How are secrets rotated?

---

# 7. HTTP Connector

## Purpose

Use HTTP Listener to expose an HTTP endpoint and HTTP Request to call another HTTP service.

## Architecture

```text
Client --> HTTP Listener --> Validate --> DW --> HTTP Request --> External API
                                      \--> Error Handler
```

## Listener example

```xml
<http:listener-config name="HTTP_Listener_Config">
    <http:listener-connection host="0.0.0.0" port="${http.port}"/>
</http:listener-config>

<flow name="customer-api-flow">
    <http:listener config-ref="HTTP_Listener_Config" path="/customers/{id}"/>
    <http:request config-ref="HTTP_Request_Config" method="GET" path="/customers/{id}"/>
</flow>
```

## Request configuration

```xml
<http:request-config name="HTTP_Request_Config">
    <http:request-connection protocol="HTTPS" host="${customer.api.host}" port="443"/>
</http:request-config>
```

Authentication may be implemented with headers, Basic authentication, OAuth, client credentials, or another supported mechanism depending on the target API.

## Production considerations

- Configure connect, response, and idle timeouts deliberately.
- Use TLS for sensitive traffic.
- Do not log Authorization headers or secrets.
- Use correlation IDs.
- Retry only when the operation is safe to retry.
- Handle 4xx and 5xx responses intentionally.
- Respect downstream rate limits.
- Validate response status and schema.

## Interview questions

- HTTP Listener vs HTTP Request?
- What is the difference between query parameters, URI parameters, and headers?
- How do you configure TLS?
- How do you handle HTTP 401/403/404/429/500?
- How do you retry an HTTP call without creating duplicates?

---

# 8. Database Connector

## Purpose

Connect Mule applications to relational databases through JDBC.

## Common operations

- Select
- Insert
- Update
- Delete
- Bulk Insert/Update where supported
- Stored Procedure
- Execute DDL
- Execute Script
- Database polling/source patterns

## Configuration example

```xml
<db:config name="Database_Config">
    <db:my-sql-connection
        host="${db.host}"
        port="${db.port}"
        user="${db.user}"
        password="${secure::db.password}"
        database="${db.name}"/>
</db:config>
```

For Oracle, SQL Server, PostgreSQL or another JDBC database, use the connection type and driver supported by the selected connector/runtime combination.

## Parameterized query

```xml
<db:select config-ref="Database_Config">
    <db:sql><![CDATA[
        SELECT customer_id, name, balance
        FROM customer
        WHERE customer_id = :customerId
    ]]></db:sql>
    <db:input-parameters><![CDATA[#[{ customerId: vars.customerId }]]]></db:input-parameters>
</db:select>
```

Never build SQL by concatenating untrusted request strings.

## Connection pool thinking

```text
Mule threads
   |
   +--> connection pool --> DB
   |          |
   |          +--> active
   |          +--> idle
   |          +--> max
   |
   +--> wait when pool exhausted
```

Tune pool size from measured workload and DB capacity; more connections do not automatically mean better performance.

## Transactions

Database operations can participate in transactions depending on the connector operation and flow design. Explain transaction boundaries explicitly in interviews.

## Production failure examples

- DB unavailable
- authentication failure
- connection pool exhaustion
- deadlock
- query timeout
- slow query
- invalid SQL
- duplicate key
- transaction rollback

## Interview questions

- Why use parameterized queries?
- Difference between Select and Stored Procedure?
- How do you prevent connection leaks?
- How do you troubleshoot connection pool exhaustion?
- How do transactions interact with error handling?

---

# 9. File Connector

## Purpose

Read and write files on the Mule runtime host or an accessible mounted file system.

## Common operations

Read, Write, List, Copy, Move, Delete, and file-based listening/polling patterns.

## Example

```xml
<file:config name="File_Config"/>
<file:read path="${file.inputDir}/customer.json" config-ref="File_Config"/>
```

For a file listener, define the directory and file-matching strategy appropriate to the application.

## Production concerns

- Prevent partial-file reads.
- Use atomic producer patterns where possible.
- Archive successfully processed files.
- Quarantine rejected files.
- Avoid processing the same file twice.
- Monitor disk space.
- Consider distributed deployment implications: local filesystem state may not be shared between replicas.

---

# 10. FTP Connector

FTP is useful for legacy partner integrations. Configure host, port, credentials, working directory, file pattern, timeout, and reconnection according to the partner contract.

Typical pattern:

```text
FTP Listener/Poll
      |
      v
Validate file
      |
      v
Parse --> Transform --> Business validation
      |
      +--> archive
      |
      +--> reject/quarantine
```

For security-sensitive integrations, evaluate whether SFTP is the appropriate protocol instead of plain FTP.

---

# 11. SFTP Connector

## Purpose

Secure file transfer over SSH.

## Configuration example

```xml
<sftp:config name="SFTP_Config">
    <sftp:connection
        host="${sftp.host}"
        port="${sftp.port}"
        username="${sftp.user}"
        password="${secure::sftp.password}"
        workingDir="${sftp.workingDir}"/>
</sftp:config>
```

For key-based authentication, configure the supported identity/key settings and keep the private key outside source control.

## Operations to know

- Read
- Write
- List
- Move
- Copy
- Delete
- Create Directory
- Rename
- Listener/polling patterns

## File readiness

A common production problem is reading a file while another system is still writing it. Use a safe producer convention such as writing to a temporary name and renaming after completion, or use the connector's file-readiness settings where applicable.

## Production checklist

- host/port verified
- working directory correct
- host key/security policy understood
- password/key stored securely
- file naming pattern defined
- duplicate handling defined
- archive/reject directory defined
- timeout and reconnection defined
- large-file behavior tested
- partner availability monitored

---

# 12. JMS Connector

JMS provides asynchronous messaging through queues and topics.

```text
Producer --> Queue --> Consumer

Publisher --> Topic --> Subscriber A
                    --> Subscriber B
```

## Configuration concepts

- broker connection
- destination
- queue vs topic
- acknowledgement mode
- correlation ID
- client ID where relevant
- transaction behavior
- reconnection

## Typical operations

- Listener
- Consume
- Publish
- Publish and Consume patterns
- Reply/listen patterns

## Production concerns

Explain message acknowledgment, redelivery, duplicate processing, dead-letter handling, correlation IDs, and idempotency. A retry is not automatically safe if the business operation is not idempotent.

---

# 13. IBM MQ Connector

Use IBM MQ for enterprise queue-based integrations where IBM MQ is the messaging backbone.

Core concepts:

```text
Mule --> Queue Manager --> Local/Remote Queue --> Consumer
```

Know these terms for interviews:

- Queue Manager
- Queue
- Channel
- Listener
- Message ID
- Correlation ID
- Put/Get
- persistent vs non-persistent messages
- syncpoint/transaction concepts
- TLS/certificates
- reconnection

Production troubleshooting should separate Mule application errors from MQ infrastructure errors such as channel, queue, authorization, network, or queue-manager availability problems.

---

# 14. Anypoint MQ Connector

Anypoint MQ provides managed messaging on Anypoint Platform.

Typical pattern:

```text
API --> Publish --> Anypoint MQ Queue --> Consume --> Worker --> DB/API
```

Learn:

- client application credentials
- queues
- exchanges where applicable
- acknowledgement
- visibility/lock behavior where applicable
- dead-letter strategy
- retries
- ordering requirements
- idempotency
- monitoring

Use environment-specific credentials and never commit client secrets.

---

# 15. Email Connector

Email integrations commonly cover outbound SMTP and mailbox-oriented use cases supported by the connector.

Typical outbound flow:

```text
Business event --> DataWeave --> Email --> SMTP server --> Recipient
```

Configure:

- SMTP host/port
- TLS/security mode
- username/password or supported authentication
- sender
- recipients
- subject
- body
- attachments

Production concerns include credential protection, attachment size, mail-server rate limits, transient failures, duplicate email prevention, and avoiding sensitive data in email logs.

---

# 16. Salesforce Connector

Salesforce Connector integrates Mule applications with Salesforce objects and APIs.

Common use cases:

- Query records
- Create records
- Update records
- Delete records
- Upsert records
- Bulk processing
- Subscribe to Salesforce events where supported

Example conceptual flow:

```text
CRM Request --> Mule --> Salesforce Query
                         |
                         v
                    DataWeave
                         |
                         v
                      API response
```

Authentication may use OAuth or another supported Salesforce authentication model. Store credentials securely.

Production topics:

- API limits
- bulk operations
- pagination
- partial failures
- duplicate detection
- field-level permissions
- object permissions
- retry safety

Interview questions:

- Query vs bulk processing?
- How do you handle Salesforce API limits?
- How do you implement upsert?
- How do you test Salesforce calls with MUnit?

---

# 17. SAP Connector

SAP integrations can involve ERP operations such as RFC/BAPI, IDoc, or other supported SAP interfaces depending on the connector and SAP landscape.

Before implementation identify:

- SAP system type/version
- integration interface
- connection protocol
- authentication
- network route/VPN/private network requirements
- transaction requirements
- IDoc/BAPI/business object semantics

Do not treat "SAP integration" as one operation. The interface contract determines the connector configuration and message model.

Production troubleshooting should distinguish Mule errors from SAP-side authorization, RFC, business validation, connectivity, and system availability issues.

---

# 18. Workday Connector

Use for integrations with Workday business objects and operations exposed by the connector.

Typical flow:

```text
HR event/API --> Mule --> Workday operation --> Transform --> downstream
```

Focus on authentication, tenant/environment, business-object permissions, pagination, rate limits, schema evolution, and error mapping.

---

# 19. ServiceNow Connector

ServiceNow integrations commonly automate incidents, requests, changes, configuration data, and other ITSM workflows.

Example:

```text
Monitoring alert
      |
      v
Mule validation
      |
      v
ServiceNow Create Incident
      |
      v
Incident number --> notification
```

Production design should prevent duplicate incident creation by using a stable correlation/business key.

---

# 20. Web Service Consumer / SOAP

SOAP integrations are contract-driven and commonly use WSDL definitions.

Understand:

- WSDL
- service/port
- SOAP envelope
- headers
- operation
- XML namespaces
- SOAP faults
- TLS
- WS-Security where required by the target

Flow:

```text
REST/API request
      |
      v
DataWeave/XML mapping
      |
      v
SOAP Consumer
      |
      v
SOAP response/fault
```

Always distinguish transport errors from SOAP faults and business faults.

---

# 21. LDAP Connector

LDAP is used for directory access, including Active Directory environments where supported.

Typical operations include searching directory entries and reading/updating directory attributes according to permissions.

Configuration concerns:

- LDAP URL
- bind user
- password
- base DN
- search filter
- TLS/LDAPS
- connection timeout
- reconnection

Never expose directory passwords in logs.

---

# 22. MongoDB Connector

MongoDB integrations operate on document-oriented data rather than relational tables.

Know:

- database
- collection
- document
- filter
- projection
- insert/update/delete
- indexes
- aggregation
- pagination
- connection pool

Production concerns include index design, query cost, document size, connection saturation, and retry semantics.

---

# 23. Kafka Connector

Kafka is an event streaming platform. A Mule integration normally acts as producer, consumer, or both.

```text
Producer --> Kafka Topic --> Partition --> Consumer Group
                             |
                             +--> Consumer A
                             +--> Consumer B
```

Key concepts:

- topic
- partition
- offset
- consumer group
- key
- ordering
- retention
- acknowledgment/commit strategy
- replay
- idempotency

Do not promise global ordering when the topic has multiple partitions; ordering is generally partition-scoped.

---

# 24. Amazon Web Services connector family

AWS integrations are service-specific. Examples include S3, SNS, SQS, and other AWS services supported by the applicable connector.

### S3 pattern

```text
Mule --> S3 PutObject
Mule <-- S3 GetObject
```

Configure region, credentials/role strategy, bucket, object key, and timeouts according to the service and deployment model.

### SQS pattern

```text
Producer --> SQS --> Mule Consumer
```

Design for visibility timeout, duplicate delivery, dead-letter queues, idempotency, and batch processing.

### SNS pattern

Use for publish/notification fan-out patterns where appropriate.

Production rule: prefer workload identity/role-based authentication where the deployment environment supports it rather than embedding long-lived access keys.

---

# 25. Microsoft Azure connector family

Azure integrations are service-specific. Typical integration areas include storage, messaging, and other Azure services supported by the relevant connector.

Always document:

- tenant/subscription/resource identity where applicable
- endpoint
- authentication mechanism
- role assignments
- network path
- retry behavior
- throttling

---

# 26. Google connector family

Google integrations are also service-specific. Configure the appropriate Google API/service credentials and scopes, then design for quota, pagination, rate limits, and token lifecycle.

---

# 27. Microsoft Dynamics / CRM connectors

CRM integrations usually require authentication, organization/tenant configuration, entity/object selection, filtering, pagination, and careful handling of API limits.

Common enterprise pattern:

```text
System A --> Mule --> CRM
                    |
                    +--> error mapping
                    +--> retry
                    +--> audit
```

---

# 28. NetSuite Connector

NetSuite integrations typically involve ERP records and business operations. Study authentication, account/environment identifiers, record types, pagination, API governance/limits, and retry safety.

---

# 29. EDI connectors: X12 / EDIFACT / related B2B

EDI connectors translate structured partner transactions into a format the integration can process.

```text
Partner EDI
    |
    v
EDI parser
    |
    v
Canonical business model
    |
    +--> ERP
    +--> CRM
    +--> DB
    +--> acknowledgement
```

Learn envelopes, transaction sets/messages, partner agreements, validation, acknowledgements, error handling, and document tracking.

---

# 30. Sockets Connector

Sockets enable low-level TCP/UDP communication for systems that do not expose a higher-level protocol.

Understand:

- host/port
- TCP vs UDP
- connection lifecycle
- framing
- encoding
- timeouts
- TLS where supported/required
- reconnection

Socket integrations require a precise message-framing contract; "read until connection closes" is not always a valid production protocol.

---

# 31. Java Module

Java Module is not a remote-system connector, but it is a common Mule extension for invoking Java methods/classes when a supported Java implementation is genuinely needed.

Use it carefully. Prefer Mule components and DataWeave for integration logic when they are clearer and easier to maintain.

Production concerns:

- classpath/dependencies
- thread blocking
- exception mapping
- object serialization
- Java version compatibility
- testability

---

# 32. AI / Agent / MCP-related connectors

Modern MuleSoft environments can include connectors/modules for AI, Agentforce, MCP and agent-oriented integrations depending on the current platform/product release.

Use these for controlled interaction with AI models, agents, tools, or enterprise systems.

Production requirements:

- authentication
- prompt/data privacy
- authorization boundaries
- tool allowlists
- input/output validation
- timeout
- retry policy
- auditability
- cost controls
- deterministic fallbacks
- protection of confidential enterprise data

Treat AI output as untrusted data until it has passed the validation required by the business operation.

---

# 33. Connector error handling — universal pattern

Never use a generic catch-all without understanding the connector's error types.

```text
Connector operation
       |
       +-- validation error --> 4xx/business response
       |
       +-- authentication --> alert / configuration fix
       |
       +-- connectivity --> retry/reconnect where safe
       |
       +-- timeout --> retry only when safe
       |
       +-- rate limit --> backoff/throttle
       |
       +-- downstream 5xx --> controlled retry/circuit strategy
       |
       +-- business error --> map and record
```

For Mule errors, distinguish connector-specific error types from generic `CONNECTIVITY`, `TIMEOUT`, `EXPRESSION`, `VALIDATION`, and application/business errors. Always consult the connector reference for the exact current error taxonomy.

# 34. Retry and reconnection

### Reconnection
Reconnection generally addresses the ability to re-establish a connector connection after a connection-level failure.

### Retry
Retry repeats an operation after a failure.

They are not interchangeable.

Example:

```text
DB connection unavailable
        |
        v
Reconnect
        |
   connection restored
        |
        v
operation continues
```

But:

```text
POST /payment
     |
     v
request timed out
     |
     v
Was payment committed?
     |
   unknown
     |
Retrying blindly may create a duplicate payment.
```

This is why idempotency and business keys matter.

# 35. Timeout strategy

Define separate thinking for:

- connection timeout
- response/read timeout
- idle timeout
- operation timeout
- polling timeout

Do not solve a slow downstream system by setting every timeout to an extremely large number. Measure and establish an SLA.

# 36. MUnit strategy for connectors

Connector calls should normally be isolated in unit tests.

Test:

1. success response
2. empty response
3. invalid response
4. timeout
5. connectivity failure
6. authentication failure
7. rate limit
8. downstream 5xx
9. duplicate/partial result
10. transformation of connector response

Conceptual test:

```text
Mock connector
     |
     v
Flow under test
     |
     v
Assert transformed output
```

Integration tests should be added separately when real infrastructure behavior is important.

# 37. Security checklist

- Never commit secrets.
- Use secure properties/secret management.
- Use TLS for sensitive traffic.
- Validate server certificates.
- Use least-privilege accounts.
- Rotate credentials/certificates.
- Do not log passwords, tokens, private keys, or sensitive payloads.
- Mask sensitive fields in logs.
- Review connector permissions.
- Review outbound destinations.
- Restrict network access.

# 38. Performance checklist

For each connector ask:

```text
Throughput
   |
   +--> connection pool
   +--> concurrency
   +--> batching
   +--> pagination
   +--> payload size
   +--> downstream limits
   +--> timeout
   +--> retries
   +--> memory usage
```

Do not increase Mule concurrency without considering the downstream system's capacity.

# 39. Production troubleshooting method

When a connector fails, collect:

- application name/version
- environment
- timestamp/time zone
- correlation ID
- flow name
- connector operation
- endpoint/destination (without secrets)
- error type
- error description
- response status where applicable
- downstream availability
- recent deployment/configuration change
- retry/reconnection history

Then classify the incident:

```text
Mule configuration
      OR
Network/TLS
      OR
Authentication/authorization
      OR
Connector/library/version
      OR
Downstream application
      OR
Data/business validation
      OR
Capacity/performance
```

This prevents blindly restarting the application when the actual problem is a partner outage or bad credential.

# 40. Interview answer framework

For any connector question, answer in this order:

1. **Definition** — what the connector does.
2. **Use case** — when you would choose it.
3. **Configuration** — global config and operation fields.
4. **Authentication** — how credentials are supplied securely.
5. **Example** — one realistic flow.
6. **DataWeave** — input/output mapping.
7. **Errors** — common failure types.
8. **Resilience** — timeout/retry/reconnection.
9. **Security** — secrets/TLS/least privilege.
10. **Performance** — pooling/batching/concurrency/rate limits.
11. **Testing** — MUnit mocking and integration testing.
12. **Production story** — a realistic incident and diagnosis.

# 41. Connector comparison interview matrix

| Connector | Main problem solved | Typical source | Typical operation | Main production risk |
|---|---|---|---|---|
| HTTP | APIs/web traffic | Listener | Request | timeout/rate limit |
| DB | relational data | Table polling | Select/Insert/Update | pool/query/transaction |
| File | filesystem | File listener | Read/Write/Move | duplicate/partial file |
| SFTP | secure file exchange | SFTP listener | Read/Write | partner/key/connectivity |
| FTP | legacy file exchange | FTP listener | Read/Write | security/legacy dependency |
| JMS | broker messaging | JMS listener | Publish/Consume | redelivery/ack |
| IBM MQ | enterprise messaging | MQ listener | Put/Get | queue/channel/authorization |
| Anypoint MQ | managed messaging | consumer | Publish/Consume | duplicate/visibility |
| Email | mail integration | mailbox trigger where supported | Send | SMTP/rate limits |
| Salesforce | CRM | event/source where supported | Query/Create/Update | API limits |
| SAP | ERP | connector-specific | RFC/BAPI/IDoc etc. | SAP/network/business errors |
| ServiceNow | ITSM | connector-specific | incident/change/etc. | duplicates/permissions |
| SOAP | SOAP services | HTTP-based trigger | SOAP operation | WSDL/fault/TLS |
| LDAP | directories | connector-specific | Search/update | auth/TLS |
| MongoDB | documents | connector-specific | query/write | indexes/pool |
| Kafka | event streaming | consumer | publish/consume | offsets/order |
| AWS | cloud services | service-specific | service-specific | IAM/quota |
| Azure | cloud services | service-specific | service-specific | identity/quota |
| Google | cloud services | service-specific | service-specific | scopes/quota |
| EDI | B2B transactions | partner file/message | parse/transform | validation/partner contract |
| Sockets | low-level protocols | socket source | send/receive | framing/network |

# 42. What "connector mastery" means for a 4-year MuleSoft interview

You should not memorize only XML tags. Be able to explain a complete production integration:

```text
API / Scheduler / Message
          |
          v
      Validation
          |
          v
      DataWeave
          |
          +------> DB
          |
          +------> REST API
          |
          +------> SFTP
          |
          +------> MQ
          |
          +------> Salesforce/SAP/etc.
          |
          v
      Response / Audit
          |
          v
   Error + Retry + Alerting
```

A strong answer explains the business reason, connector choice, configuration, authentication, transformation, failure mode, retry/idempotency, testing, observability, and deployment configuration.

## Official documentation rule

Connector capabilities and exact configuration fields change independently of the Mule runtime. Use Anypoint Exchange to discover the applicable connector asset and then use that connector's User Guide and Reference Guide for exact current configuration. MuleSoft documents connectors as independently released extensions, and current Code Builder documentation lists a broad built-in set plus additional Exchange assets. citeturn0search0turn0search1turn0search5
