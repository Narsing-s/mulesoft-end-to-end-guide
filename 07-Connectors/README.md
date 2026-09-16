# 07 — Connectors

This section is a **complete connector learning track**, not a five-connector summary. A MuleSoft developer must understand how to choose, configure, secure, test, troubleshoot, and operate connectors across APIs, databases, files, messaging, SaaS applications, cloud services, SOAP, directories, B2B/EDI, streaming, and modern AI/agent integrations.

## Start here

1. **[Complete Connector Mastery](./00-CONNECTOR-MASTERY.md)** — deep explanations, configuration patterns, XML examples, authentication, errors, retry/reconnection, transactions, security, performance, MUnit, troubleshooting, production practices, and interview preparation.
2. **[Connector Catalog](./01-CONNECTOR-CATALOG.md)** — broad connector/family inventory and a study map so you do not stop at HTTP/DB/File/SFTP/JMS.

## Core connectors

### HTTP
Use HTTP Listener to expose an endpoint and HTTP Request to call another HTTP service.

Study:
- Listener vs Request
- methods, paths, query parameters, URI parameters and headers
- TLS and authentication
- timeouts and reconnection
- 4xx/5xx handling
- rate limiting
- retry and idempotency
- MUnit mocking
- production troubleshooting

### Database
Use Database Connector for JDBC relational databases.

Study:
- Select/Insert/Update/Delete
- parameterized SQL
- stored procedures
- bulk operations
- connection pools
- transactions
- query timeouts
- DB outages/deadlocks
- secure credentials

### File / FTP / SFTP / FTPS
Study each separately. They are not interchangeable.

- **File:** local/shared filesystem integration.
- **FTP:** legacy file transfer.
- **SFTP:** SSH-based secure file transfer.
- **FTPS:** FTP secured with TLS where supported.

For every file connector learn file readiness, duplicate detection, archive/reject design, permissions, large files, partial files, polling, retries and production recovery.

### JMS / IBM MQ / Anypoint MQ / Kafka
Messaging is its own engineering discipline.

Study:
- queue vs topic
- producer/consumer
- acknowledgement
- correlation ID
- redelivery
- dead-letter queues
- ordering
- transactions
- duplicate processing
- idempotency
- retry/backoff
- monitoring

### Salesforce and enterprise SaaS
Do not stop at authentication and Query. Study CRUD/upsert, pagination, bulk patterns, API limits, permissions, event patterns, error handling and MUnit.

### Email
Study SMTP configuration, TLS, authentication, sender/recipient handling, attachments, rate limits, failure recovery and secret protection.

### SOAP / Web Service Consumer
Study WSDL, endpoint, operation, XML namespaces, SOAP headers, TLS, authentication and SOAP faults.

## Enterprise and application connector coverage

The catalog also covers the study approach for:

- SAP / SAP S/4HANA
- Workday
- ServiceNow
- Salesforce Data Cloud / Marketing Cloud
- Microsoft Dynamics
- NetSuite
- Anaplan
- Box
- SharePoint
- Slack/Teams-style collaboration integrations where supported
- Twilio and communication integrations
- MongoDB
- LDAP/Active Directory
- AWS services such as S3/SQS/SNS
- Azure services
- Google services
- Kafka
- EDI/B2B connectors such as X12 and EDIFACT
- Sockets/WebSockets and specialized protocol integrations
- modern AI/agent/MCP-related connectivity
- additional MuleSoft, partner and community connectors available through Anypoint Exchange

## The standard connector lesson

Every connector should be learned using this sequence:

```text
What is it?
   ↓
Why do we need it?
   ↓
When should we use it?
   ↓
Architecture / flow
   ↓
Prerequisites
   ↓
Add dependency / connector
   ↓
Global configuration
   ↓
Authentication + TLS
   ↓
Source configuration
   ↓
Operation configuration
   ↓
DataWeave input/output
   ↓
Success path
   ↓
Error path
   ↓
Timeout / reconnection / retry
   ↓
Idempotency / transactions
   ↓
Security
   ↓
Performance / pooling / rate limits
   ↓
MUnit
   ↓
Production troubleshooting
   ↓
Interview questions
   ↓
Hands-on exercise
```

## Production checklist

Before calling a connector integration production-ready, verify:

- authentication is secure
- secrets are externalized
- TLS/certificates are correct
- least privilege is applied
- connection timeout is intentional
- response/operation timeout is intentional
- reconnection strategy is understood
- retries are safe and bounded
- idempotency is designed
- connection pools are sized from evidence
- API/database/broker rate limits are understood
- pagination/batching is handled
- sensitive fields are masked in logs
- correlation IDs are available
- MUnit tests cover success and failure
- downstream outage behavior is known
- alerts and dashboards exist
- operational runbook exists

## Official documentation workflow

Use Anypoint Exchange to find the applicable connector asset, then use that connector's current User Guide and Reference Guide for exact fields and operations. Connector versions and capabilities can change independently of the Mule runtime, so production implementations must record the tested connector version alongside the Mule runtime version.
