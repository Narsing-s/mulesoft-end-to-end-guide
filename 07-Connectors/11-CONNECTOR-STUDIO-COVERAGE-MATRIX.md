# Connector + Studio Coverage Matrix

This matrix makes the learning path explicit. It is designed so a learner can move from concept → Studio configuration → implementation → testing → troubleshooting → interview.

## Core Studio components

| Component | Concept | Configuration | Example | Errors | Production | Interview |
|---|---:|---:|---:|---:|---:|---:|
| Choice | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Scatter-Gather | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| For Each | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Parallel For Each | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Batch | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Until Successful | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Try | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Async | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| First Successful | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Round Robin | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Flow Reference | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Subflow | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Error Handler | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Transform Message | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Set Payload/Variable | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Raise Error | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Scheduler | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cache Scope | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Idempotent Validator | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Transaction | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Connector families to master

### HTTP and APIs
- HTTP Listener
- HTTP Request
- OAuth/security-related HTTP configuration
- APIkit/router integration
- REST/JSON APIs
- SOAP/Web Service Consumer

### Files and partner exchange
- File
- FTP
- FTPS
- SFTP
- Email/SMTP/IMAP/POP3 where applicable

### Databases and data platforms
- Database/JDBC
- Salesforce
- MongoDB
- Snowflake
- Other Exchange database/data connectors as required

### Messaging and streaming
- JMS
- IBM MQ
- Anypoint MQ
- Kafka
- VM

### Enterprise/SaaS
- Salesforce
- SAP/S4HANA
- Workday
- ServiceNow
- Microsoft Dynamics 365
- NetSuite
- Anaplan
- Box
- SharePoint
- Collaboration connectors
- Twilio

### Cloud
- AWS S3
- AWS SQS
- AWS SNS
- Azure services/connectors
- Google services/connectors

### Identity and specialized integration
- LDAP/Active Directory
- EDI X12
- EDIFACT
- AS2/B2B where required
- Sockets/WebSockets
- Object Store
- Java Module

### Modern integration
- AI/LLM integrations
- MCP/tool connectivity
- Agent-to-agent integration patterns
- AI response validation and authorization

## Mandatory configuration depth for each connector

Every connector chapter should include:

1. Purpose and architecture
2. When to use / when not to use
3. Anypoint Exchange installation
4. Dependency and runtime compatibility
5. Global configuration
6. Connection provider
7. Endpoint/environment/tenant
8. Authentication
9. TLS/mTLS and certificates
10. Proxy/network settings
11. Timeout
12. Reconnection
13. Retry strategy
14. Source configuration
15. Operation configuration
16. Parameters and metadata
17. DataWeave input
18. DataWeave output
19. XML configuration example
20. Success scenario
21. Failure scenarios
22. Error types
23. Idempotency
24. Transactions
25. Pagination
26. Batching
27. Streaming/large payloads
28. Rate limits
29. Pooling/concurrency
30. MUnit tests
31. Logging/correlation IDs
32. Monitoring and alerts
33. Troubleshooting
34. Security checklist
35. Production runbook
36. Interview questions with answers immediately underneath
37. Hands-on lab

## Important distinction

Anypoint Exchange is a living catalog. The exact set of connectors and exact configuration fields can change by connector version, runtime compatibility, and provider. This repository therefore documents the major MuleSoft connector families and the reusable implementation method rather than claiming that a static Markdown list can permanently enumerate every Exchange asset.

## Recommended learning sequence

```text
Core components
     |
     +--> DataWeave
     |
     +--> Error handling
     |
     +--> Choice / For Each
     |
     +--> Scatter-Gather / Parallel For Each
     |
     +--> Batch / Until Successful
     |
     +--> Transactions / Idempotency
     |
     v
HTTP + DB + File + SFTP
     |
     v
JMS + IBM MQ + Anypoint MQ + Kafka
     |
     v
Salesforce + SAP + Workday + ServiceNow
     |
     v
Cloud + B2B/EDI + specialized connectors
     |
     v
Production troubleshooting + MUnit + interview
```

## Definition of done

A connector is considered learned only when the learner can:

- Explain it without documentation.
- Configure it in Studio.
- Explain each important configuration field.
- Build a working flow.
- Map input/output with DataWeave.
- Handle expected errors.
- Explain retry/reconnection behavior.
- Prevent duplicate side effects.
- Test it with MUnit.
- Troubleshoot a production failure.
- Explain the implementation clearly in an interview.
