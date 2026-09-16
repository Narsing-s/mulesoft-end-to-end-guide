# 57 — API Contracts & Protocol Engineering

This track fills the gap between basic REST/API design and enterprise contract engineering.

## 1. Contract-first thinking

```text
Business requirement
        ↓
Consumer use cases
        ↓
API contract
        ↓
Examples + schemas
        ↓
Validation
        ↓
Implementation
        ↓
Contract tests
        ↓
Publish / govern / evolve
```

A contract should describe the consumer-visible behavior before implementation details.

## 2. REST + RAML + OAS

Learn:

- resources and nouns
- methods
- path/query/header parameters
- request/response schemas
- reusable types/components
- examples
- security schemes
- pagination/filtering/sorting
- idempotency
- error models
- content negotiation
- versioning
- deprecation
- backward compatibility
- APIkit implementation

## 3. Event contracts

Study event schemas and message contracts for asynchronous systems.

```text
Producer
   │
   │ Event contract
   ▼
Broker / Queue
   │
   ▼
Consumer

Schema evolution → compatibility → validation → replay
```

Cover:

- event names
- event envelope
- event ID
- correlation ID
- timestamp
- producer/source
- payload schema
- versioning
- ordering assumptions
- duplicate handling
- replay behavior
- compatibility
- dead-letter strategy

## 4. Protocol selection

Compare REST, SOAP, JMS/MQ, asynchronous event APIs, GraphQL and gRPC at a conceptual level.

For each choice document:

- consumer need
- payload model
- synchronous/asynchronous behavior
- contract model
- observability
- security
- failure behavior
- operational complexity
- Mule implementation approach

Do not choose a protocol merely because it is newer.

## 5. Contract quality checklist

```text
Correct?
Complete?
Consistent?
Backward compatible?
Secure?
Observable?
Testable?
Documented?
Versioned?
Governed?
```

## 6. Practical exercises

### Exercise A
Design a customer REST API from requirements.

### Exercise B
Convert a business process into an event contract.

### Exercise C
Design an idempotent payment request contract.

### Exercise D
Review a deliberately broken API contract and identify compatibility problems.

### Exercise E
Design a version/deprecation plan without breaking existing consumers.

## Completion gate

Given a business requirement, create a contract with examples, schemas, error behavior, security expectations, compatibility rules and tests before implementing the Mule flows.
