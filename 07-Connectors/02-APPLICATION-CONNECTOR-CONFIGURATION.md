# Application Connector Configuration Handbook

This chapter expands the application/SaaS connector side of the connector track. The goal is to teach the **configuration reasoning** that transfers from one connector to another. Exact operation names and authentication fields must be verified against the connector version selected in Anypoint Exchange.

## 1. Universal application-connector configuration

Most SaaS connectors can be understood as:

```text
Global Config
 ├── endpoint / environment / tenant
 ├── authentication
 ├── TLS/proxy/network
 ├── timeout
 ├── reconnection
 └── client/session settings

Operation
 ├── object/resource
 ├── action
 ├── filter/query
 ├── input
 ├── pagination/batch
 └── response handling
```

## 2. Salesforce

### Configuration checklist

- Salesforce environment/instance
- authentication method supported by connector version
- client/application registration where required
- username/identity information where applicable
- security token or OAuth-related values where applicable
- TLS/network requirements
- timeout
- reconnection

### Operations to master

Query, create, update, delete, upsert, bulk processing and event-driven patterns where supported.

### Example design

```text
HTTP Listener
    |
    v
Validate customer
    |
    v
DataWeave -> Salesforce object
    |
    v
Salesforce Upsert
    |
    v
Map Salesforce response
```

### Production

Track API limits, pagination, bulk size, object permissions, field permissions, duplicate rules and partial failures.

## 3. SAP

### Configuration checklist

- SAP environment
- host/network route
- client/system identifiers where applicable
- user/credential or supported authentication
- protocol/interface type
- TLS/security
- timeout
- connection/reconnection

### First design question

Do not begin with "Which SAP operation?" Begin with "Which SAP interface does the business expose?" It may be an RFC/BAPI, IDoc or another supported interface.

### Production

Separate Mule errors from SAP authorization, connectivity, RFC/interface, business validation and SAP availability errors.

## 4. Workday

### Configuration checklist

- Workday tenant/environment
- endpoint
- authentication credentials/certificates as required
- security permissions
- timeout
- pagination
- throttling/rate limits

### Design

```text
Source HR event
    |
    v
DataWeave mapping
    |
    v
Workday operation
    |
    v
Validate response
    |
    v
Audit / downstream
```

## 5. ServiceNow

### Configuration checklist

- instance URL
- authentication
- user/service account permissions
- TLS
- timeout
- reconnection

### Common operations

Incident, change/request-related operations, record lookup, update and query patterns depending on connector capabilities.

### Duplicate prevention

Use a stable business/correlation key when the same monitoring event could be retried. Do not create a new incident every time a network timeout occurs.

## 6. Microsoft Dynamics / CRM

Configuration normally includes:

- organization/tenant environment
- base URL
- authentication/identity
- permissions/scopes
- TLS
- timeout
- pagination
- retry/throttling strategy

Study entity/object mapping and API limits.

## 7. NetSuite

Study:

- account/environment
- authentication supported by the connector version
- endpoint
- record/object type
- permissions
- pagination
- governance/API limits
- retry/idempotency

Production integrations should avoid unbounded retries because an ERP mutation may have succeeded even when the response was lost.

## 8. Anaplan

Study:

- workspace/model identification
- authentication
- import/export process
- file/data staging where applicable
- timeout
- process status polling
- error file handling

A robust design does not assume that submitting an asynchronous process means the business operation has completed.

## 9. Box

Study:

- enterprise/application identity
- OAuth/client credentials as supported
- folder IDs
- file metadata
- upload/download behavior
- large-file handling
- permissions

## 10. SharePoint

Study:

- tenant/site configuration
- authentication/scopes
- site/list/library identifiers
- item/file operations
- pagination
- permissions
- throttling

## 11. Slack / Teams / collaboration integrations

Study:

- workspace/tenant
- application registration
- OAuth/token model
- channel/team identifiers
- message formatting
- rate limits
- webhook vs API invocation
- secret rotation

Never log bot tokens.

## 12. Twilio / communication APIs

Study:

- account/project identity
- authentication
- sender identity
- destination
- message/body mapping
- delivery status
- rate limits
- duplicate-send prevention

For payment/security notifications, use a stable notification ID to prevent duplicate sends after retry.

## 13. MongoDB

### Configuration

- connection URI or supported connection fields
- database
- authentication
- TLS
- connection pool
- timeout

### Operations

Find, insert, update, delete, aggregation and other version-supported operations.

### Production

Indexes, query shape, connection pool limits, document size, aggregation cost, retry behavior and consistency expectations.

## 14. AWS S3

### Configuration

- region
- bucket
- authentication/role strategy
- endpoint when required
- TLS
- timeout

### Operations

Get/read object, put/write object, list, delete and metadata operations as supported.

### Production

Use least-privilege IAM, avoid hard-coded access keys, design object keys carefully, and handle large objects and transient failures deliberately.

## 15. AWS SQS

### Configuration

- region
- queue URL/name
- identity/role
- polling/batch settings
- visibility timeout
- acknowledgement/delete behavior

### Production

Visibility timeout must account for processing time. Use DLQ and idempotency. Duplicate delivery is a design concern.

## 16. AWS SNS

Configure region, identity/role, topic and publish payload/attributes. Design downstream consumers independently because fan-out means one published event can create multiple processing paths.

## 17. Azure service integrations

For each Azure connector, document:

- tenant/subscription/resource identifiers
- endpoint
- identity/authentication
- role assignment
- TLS/network
- throttling
- timeout
- retry policy

Prefer managed/workload identity patterns where supported.

## 18. Google service integrations

Document:

- Google Cloud project
- API/service enabled
- credential/service identity
- scopes
- resource identifiers
- quota
- pagination
- token lifecycle

## 19. Kafka

### Configuration

- bootstrap servers
- security protocol
- TLS/SASL where required
- topic
- consumer group
- client identity
- serializers/deserializers as applicable
- polling/consumer behavior

### Production

Understand partitioning, offset commits, replay, consumer lag, ordering and duplicate processing.

## 20. EDI X12 / EDIFACT / TRADACOMS

### Configuration checklist

- partner identity
- agreement/contract
- inbound/outbound transport
- envelope rules
- document type
- validation
- acknowledgement
- error/reject path
- document tracking

### Architecture

```text
Partner
  |
  v
Transport
  |
  v
EDI parser
  |
  v
Validation
  |
  v
Canonical model
  |
  +--> ERP
  +--> CRM
  +--> DB
  +--> acknowledgement
```

## 21. LDAP / Active Directory

Configuration:

- LDAP/LDAPS URL
- bind identity
- password/credential
- base DN
- search filter
- TLS certificate trust
- timeout

Production concerns: least privilege, secure bind, connection reuse, directory availability and search performance.

## 22. Web Service Consumer

Configuration:

- WSDL or service metadata
- endpoint
- operation
- SOAP headers
- authentication
- TLS
- timeout

Test both successful SOAP responses and SOAP Fault responses.

## 23. Sockets

Configuration:

- host
- port
- protocol
- encoding
- message framing
- connection timeout
- read timeout
- TLS if required

The message-framing contract is critical. A socket has no universal concept of where one business message ends and the next begins.

## 24. Object Store

Object Store is used for key/value state such as idempotency keys or short-lived application state where appropriate.

Document:

- object store type/scope
- key format
- TTL/expiration
- persistence behavior
- deployment topology
- concurrency assumptions

Example idempotency key:

```text
payment:{customerId}:{businessTransactionId}
```

Store only what is necessary and protect sensitive data.

## 25. Java Module

Use Java Module for controlled Java interoperability when Mule/DataWeave components are not suitable.

Configuration considerations:

- class/method
- Java dependencies
- input types
- output type
- exception handling
- Java/runtime compatibility
- thread blocking

## 26. Modern AI / Agent / MCP connectors

For each modern AI connector, record:

- provider/model/agent endpoint
- authentication
- tool permissions
- context/data boundaries
- timeout
- retry
- response validation
- safety/policy checks
- audit logging
- cost controls
- fallback behavior

Never let an AI response directly execute a sensitive business mutation without the authorization and validation required by the business process.

## 27. Application connector interview template

For every connector, be ready to answer:

**Q: How did you configure it?**

Answer with:

> I created a reusable global configuration, externalized environment-specific values, secured credentials, configured TLS where required, set connection/operation timeouts and a controlled reconnection strategy, then configured the specific operation. I tested both successful and failure paths with MUnit and validated the real integration separately in an appropriate environment.

Then give one real business example and explain the error/retry/idempotency decision.
