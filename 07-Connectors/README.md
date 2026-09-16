# 07 — Connectors

This section is a **deep MuleSoft connector and Studio processing handbook**. It covers connector configuration plus the core routers/scopes that make real integrations work: Choice, Scatter-Gather, For Each, Parallel For Each, Batch, Until Successful, Try, Async, First Successful, Round Robin, Flow Reference, Subflow, Error Handler, Transform Message, Scheduler, Cache, Idempotency and Transactions.

## Start here

1. **[Complete Connector Mastery](./00-CONNECTOR-MASTERY.md)** — core connector concepts and production patterns.
2. **[Connector Catalog](./01-CONNECTOR-CATALOG.md)** — broad connector/family inventory.
3. **[Application Connector Configuration](./02-APPLICATION-CONNECTOR-CONFIGURATION.md)** — SaaS/application configuration.
4. **[Connector Q&A](./03-CONNECTOR-QA-WITH-ANSWERS.md)** — questions with answers immediately underneath.
5. **[MuleSoft Documentation Standard](./04-MULESOFT-DOCUMENTATION-STYLE.md)** — how to read and use connector documentation.
6. **[Connector Family Playbook](./05-CONNECTOR-FAMILY-PLAYBOOK.md)** — deep connector-family practical coverage.
7. **[Implementation Standard](./06-CONNECTOR-IMPLEMENTATION-STANDARD.md)** — mandatory checklist for implementing any connector.
8. **[Hands-On Labs](./07-CONNECTOR-HANDS-ON-LABS.md)** — build, break, test and troubleshoot real scenarios.
9. **[Production Troubleshooting](./08-CONNECTOR-TROUBLESHOOTING.md)** — incident diagnosis and recovery.
10. **[Deep Interview Q&A](./09-CONNECTOR-INTERVIEW-QA-DEEP.md)** — production-level connector questions and answers.
11. **[Studio Core Components, Routers & Processing](./10-STUDIO-CORE-COMPONENTS-AND-ROUTERS.md)** — Choice, Scatter-Gather, For Each, Parallel For Each, Batch, retry, Try, Async, fallback, transactions and production patterns.
12. **[Connector + Studio Coverage Matrix](./11-CONNECTOR-STUDIO-COVERAGE-MATRIX.md)** — coverage checklist and definition of done.

## MuleSoft-style documentation model

```text
Connector / Exchange asset
          |
          +--> User Guide
          |      install + configure + examples
          |
          +--> Reference Guide
          |      sources + operations + fields
          |
          +--> Release Notes
                 compatibility + changes + fixes
```

MuleSoft's Studio guidance follows a practical sequence: authenticate to Anypoint Platform, install the connector, configure a source, configure the connector/global element, test connectivity and use the connector operation. Reusable global configuration, externalized properties and appropriate reconnection strategies are important production practices.

## Core Studio processing layer

```text
                         Mule Event
                             |
                      +------+------+
                      | Transform   |
                      | DataWeave   |
                      +------+------+
                             |
       +---------------------+----------------------+
       |                     |                      |
    Choice             Scatter-Gather          Collection
       |                /    |    \                 |
 one matching         A      B      C        +------+------+
 route                |      |      |        |             |
                      +------+------+
                             |             For Each / Parallel
                          aggregate              |
                                              Batch for large data
       |
  Error Handler / Try / Retry
       |
  Continue or Propagate
```

The dedicated core-components chapter explains configuration and examples for these patterns. Current MuleSoft documentation lists these as core components/flow-control capabilities, including Choice, First Successful, Round Robin, Scatter-Gather, For Each, Parallel For Each, Batch Job, Try, Async and Until Successful.

## Connector families covered

### Core
HTTP, Database, File, FTP, SFTP, FTPS, Email, JMS, IBM MQ, Anypoint MQ, Web Service Consumer/SOAP, VM, Object Store, Sockets/WebSockets and LDAP.

### Enterprise and SaaS
Salesforce, Salesforce Data Cloud, Salesforce Marketing Cloud, SAP/S4HANA, Workday, ServiceNow, Microsoft Dynamics 365, NetSuite, Anaplan, Box, SharePoint, collaboration/communication integrations, Twilio and other application-specific Exchange assets.

### Data and cloud
MongoDB, Snowflake, HDFS, AWS services, Azure services, Google services and other supported data/cloud integrations.

### Messaging and streaming
JMS, IBM MQ, Anypoint MQ, Kafka and other supported messaging/event technologies.

### B2B / industry
X12, EDIFACT, TRADACOMS, AS2/B2B patterns and industry-specific integrations where supported.

### Modern connectivity
AI/LLM integrations, Agent2Agent, Agentforce, Einstein AI, MCP and other current API/agent/tool connectivity where supported by the relevant MuleSoft release and Exchange assets.

### Exchange ecosystem
MuleSoft-provided, MuleSoft Certified, partner and community assets. The live Exchange inventory is dynamic; this repository is a learning system rather than a claim that a static Markdown list permanently represents every Exchange asset.

## Universal implementation flow

```text
Requirement
    ↓
Choose protocol/system connector
    ↓
Check Mule Runtime + Java + connector compatibility
    ↓
Discover/install from Exchange or Studio
    ↓
Create global configuration
    ↓
Authentication + TLS + network
    ↓
Source / trigger (if applicable)
    ↓
Operation
    ↓
DataWeave input/output
    ↓
Choice / For Each / Scatter-Gather / Batch as required
    ↓
Success + error handling
    ↓
Timeout + reconnection + safe retry
    ↓
Idempotency + transaction semantics
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

## Configuration depth required for every connector

Every connector chapter must explain:

- purpose and alternatives
- where/when to use it
- prerequisites
- Studio/Code Builder installation
- dependency/Maven considerations
- global configuration
- important connection fields
- authentication
- TLS/certificates
- proxy/networking
- source/trigger
- operations
- input/output and metadata
- DataWeave mapping
- error types
- timeout behavior
- reconnection
- retry/backoff
- idempotency
- transaction boundaries
- pagination/batching/streaming
- connection pooling/concurrency
- quotas/rate limits
- logging/masking/correlation IDs
- MUnit mocking and integration testing
- production troubleshooting
- use cases
- hands-on exercise
- interview questions and answers
- version/compatibility notes
- official documentation links

## Production definition of done

A connector implementation is not complete merely because **Test Connection** succeeds. It must also have:

- exact connector/runtime/Java versions recorded
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

## Official MuleSoft references

- Anypoint Connectors overview: https://docs.mulesoft.com/connectors/introduction/introduction-to-anypoint-connectors
- Configure a connector in Studio: https://docs.mulesoft.com/connectors/introduction/intro-config-use-studio
- Connector configuration and best practices: https://docs.mulesoft.com/connectors/introduction/intro-connector-configuration-overview
- Discover connectors in Exchange: https://docs.mulesoft.com/connectors/introduction/intro-use-exchange
- XML/Maven connector configuration: https://docs.mulesoft.com/connectors/introduction/intro-config-xml-maven
- Anypoint Code Builder connector configuration: https://docs.mulesoft.com/connectors/introduction/intro-config-use-acb

## Important rule

Use this repository to learn concepts, patterns and production reasoning. For an actual implementation, always open the **current connector asset in Anypoint Exchange**, then verify its **User Guide, Reference Guide and Release Notes** because connector fields, operations, compatibility and support status are version-specific.

The goal is:

**Understand → Configure → Build → Test → Break → Debug → Secure → Measure → Deploy → Operate → Explain.**
