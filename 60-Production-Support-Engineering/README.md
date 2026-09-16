# 60 — Production Support Engineering

A practical track for engineers who operate MuleSoft integrations in production.

## 1. Incident lifecycle

```text
Alert / Ticket
     ↓
Understand impact
     ↓
Identify affected API / flow
     ↓
Collect correlation ID + timestamp
     ↓
Inspect Runtime Manager logs
     ↓
Check downstream dependencies
     ↓
Contain / recover
     ↓
Validate service health
     ↓
Root-cause analysis
     ↓
Permanent corrective action
     ↓
Evidence + closure
```

## 2. First-response checklist

Capture:

- incident number
- application name
- environment
- API / flow
- first observed timestamp
- last known successful transaction
- correlation ID
- request/response status
- error type
- affected dependency
- number of impacted transactions
- business impact
- recent deployments or configuration changes

## 3. Common failures

### HTTP

Investigate 400, 401, 403, 404, 405, 408, 409, 415, 429 and 5xx responses by separating client, policy, routing, application and downstream causes.

### Database

Check connectivity, credentials, pool exhaustion, SQL errors, locks, timeouts and transaction behavior.

### MQ / messaging

Check queue depth, consumer health, acknowledgements, retries, poison messages, DLQ behavior and duplicate processing.

### SFTP / file transfer

Check remote availability, authentication, directory permissions, filename patterns, file locks, duplicate files and transfer completeness.

### TLS / certificates

Check certificate validity, truststore/keystore configuration, hostname verification, protocol compatibility and recent certificate rotation.

### Deployment

Check artifact version, environment properties, secrets, startup errors, replica state, resource pressure and recent changes.

## 4. Log investigation

Use a narrow time window first. Search by correlation ID where available, then expand to application, flow, error type and dependency.

Do not copy credentials, tokens, customer data or sensitive payloads into tickets or chat.

## 5. RCA template

```text
Incident:
Impact:
Start time:
Recovery time:
Detection:
Affected component:
Immediate cause:
Root cause:
Contributing factors:
Why monitoring did/did not detect it:
Recovery action:
Permanent fix:
Prevention:
Evidence:
```

## 6. Change correlation

Compare the incident timestamp against:

- application deployments
- configuration changes
- certificate rotation
- password rotation
- dependency releases
- database changes
- network changes
- infrastructure changes

Correlation is evidence to investigate, not proof of causation by itself.

## 7. Recovery patterns

Understand when to:

- restart an application
- retry a transaction
- replay a safe message
- drain a queue
- move a poison message to DLQ
- roll back a deployment
- rotate a credential
- fail over a dependency
- escalate to the owning team

Always consider duplicate processing and data consistency before replaying production transactions.

## 8. Shift handover

A useful handover contains current incident status, affected services, evidence collected, actions completed, pending actions, owners, next checkpoint and known risks.

## Completion gate

Given a production incident, identify impact, gather evidence, isolate the failing layer, recover safely, document RCA and propose a measurable prevention step without guessing from a single error message.