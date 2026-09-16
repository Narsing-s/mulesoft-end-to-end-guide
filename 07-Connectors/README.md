# 07 — Connectors

This section is a **self-contained connector and Studio engineering handbook**. The repository itself teaches the theory, configuration reasoning, examples, failure behavior, production patterns, labs and interview questions.

## Start here

1. **[Complete Connector Mastery](./00-CONNECTOR-MASTERY.md)** — core connector concepts and production patterns.
2. **[Connector Catalog](./01-CONNECTOR-CATALOG.md)** — connector/family inventory.
3. **[Application Connector Configuration](./02-APPLICATION-CONNECTOR-CONFIGURATION.md)** — application/SaaS configuration.
4. **[Connector Q&A](./03-CONNECTOR-QA-WITH-ANSWERS.md)** — questions with answers immediately underneath.
5. **[MuleSoft Documentation Style](./04-MULESOFT-DOCUMENTATION-STYLE.md)** — internal explanation and learning structure.
6. **[Connector Family Playbook](./05-CONNECTOR-FAMILY-PLAYBOOK.md)** — practical family coverage.
7. **[Implementation Standard](./06-CONNECTOR-IMPLEMENTATION-STANDARD.md)** — mandatory implementation checklist.
8. **[Hands-On Labs](./07-CONNECTOR-HANDS-ON-LABS.md)** — build, break, test and troubleshoot.
9. **[Production Troubleshooting](./08-CONNECTOR-TROUBLESHOOTING.md)** — incident diagnosis and recovery.
10. **[Deep Interview Q&A](./09-CONNECTOR-INTERVIEW-QA-DEEP.md)** — production-level questions and answers.
11. **[Studio Core Components, Routers & Processing](./10-STUDIO-CORE-COMPONENTS-AND-ROUTERS.md)** — routing, scopes, retry and processing patterns.
12. **[Connector + Studio Coverage Matrix](./11-CONNECTOR-STUDIO-COVERAGE-MATRIX.md)** — coverage checklist.
13. **[Mandatory Connector Depth — Explained](./12-MANDATORY-CONNECTOR-DEPTH-EXPLAINED.md)** — every important configuration item explained.
14. **[Complete Coverage Audit](./13-CONNECTOR-COMPLETE-COVERAGE-AUDIT.md)** — quality gate for completeness.

## Internal connector theory model

Every connector lesson follows the same learning sequence:

```text
Business requirement
        ↓
System / protocol selection
        ↓
Connector purpose and architecture
        ↓
Prerequisites and dependencies
        ↓
Global configuration
        ↓
Authentication + TLS + networking
        ↓
Source / trigger
        ↓
Operation + fields
        ↓
Input metadata + payload
        ↓
DataWeave transformation
        ↓
Success response
        ↓
Errors + error types
        ↓
Timeout + reconnection + bounded retry
        ↓
Idempotency + transaction behavior
        ↓
Pagination + batching + streaming
        ↓
Security + logging + correlation IDs
        ↓
MUnit + negative tests
        ↓
Monitoring + alerts
        ↓
Troubleshooting + recovery
        ↓
Production runbook
        ↓
Interview questions
```

## Connector families covered

### Core
HTTP, Database, File, FTP, SFTP, FTPS, Email, JMS, IBM MQ, Anypoint MQ, Web Service Consumer/SOAP, VM, Object Store, Sockets/WebSockets and LDAP.

### Enterprise and SaaS
Salesforce, Salesforce Data Cloud, Salesforce Marketing Cloud, SAP/S4HANA, Workday, ServiceNow, Microsoft Dynamics 365, NetSuite, Anaplan, Box, SharePoint, collaboration/communication integrations, Twilio and other application-specific integrations.

### Data and cloud
MongoDB, Snowflake, HDFS, AWS services, Azure services, Google services and other data/cloud integrations.

### Messaging and streaming
JMS, IBM MQ, Anypoint MQ, Kafka and other messaging/event technologies.

### B2B / industry
X12, EDIFACT, TRADACOMS, AS2/B2B patterns and industry-specific integrations.

### Modern connectivity
AI/LLM integrations, Agent-to-Agent, Agentforce, Einstein AI, MCP and API/agent/tool connectivity.

## Universal implementation flow

```text
Requirement
    ↓
Choose system/protocol
    ↓
Understand connector architecture
    ↓
Configure connection
    ↓
Authentication + TLS + network
    ↓
Source / trigger
    ↓
Operation + important fields
    ↓
DataWeave input/output
    ↓
Routing / scopes as required
    ↓
Success + error handling
    ↓
Timeout + reconnection + safe retry
    ↓
Idempotency + transaction decision
    ↓
Pagination / batching / streaming
    ↓
Security + observability
    ↓
MUnit + integration testing
    ↓
Deploy + operate
    ↓
Troubleshoot + recover
    ↓
Explain in interview
```

## Mandatory configuration depth

Every connector chapter must explain:

- purpose and architecture
- when to use it and alternatives
- prerequisites
- installation and dependency setup
- runtime/Java/dependency compatibility
- global configuration and connection provider
- endpoint/environment/tenant/region
- authentication
- TLS/mTLS/certificates
- proxy/networking
- connection and operation timeouts
- reconnection
- bounded retry/backoff
- source/trigger
- operations and important fields
- parameters, metadata, payload and attributes
- DataWeave input/output
- representative XML
- success and failure scenarios
- error types and error strategy
- idempotency
- transaction boundaries
- pagination
- batching
- streaming/large payloads
- pooling/concurrency
- quotas/rate limits
- MUnit success/failure/timeout tests
- logging/masking/correlation IDs
- monitoring/alerts
- troubleshooting
- security
- production runbook
- hands-on lab
- interview questions with answers
- compatibility/version notes

## Production definition of done

A connector implementation is not complete merely because a connection test succeeds. It must also have:

- versions recorded
- environment configuration externalized
- secrets protected
- TLS/certificates verified
- least privilege
- intentional timeouts
- safe bounded retry/reconnection
- idempotency strategy
- transaction decision
- pagination/batching/streaming strategy
- quota/rate-limit strategy
- MUnit coverage
- safe logs and correlation IDs
- dashboards/alerts
- outage/recovery procedure
- reconciliation strategy when remote success is uncertain
- runbook

## Learning rule

**The repository is the lesson.** A learner should be able to understand the concept, follow the diagram, study the example, reproduce the configuration, see input/output, run the lab, diagnose failures and answer interview questions without being redirected to a separate documentation hub.

**Understand → Configure → Build → Test → Break → Debug → Secure → Measure → Deploy → Operate → Explain.**