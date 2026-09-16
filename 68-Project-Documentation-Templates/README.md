# 68 — Project Documentation Templates

Reusable documentation templates for every MuleSoft project.

## 1. Project brief

- Business problem
- Scope
- Non-goals
- Consumers
- Systems
- Functional requirements
- Non-functional requirements
- Constraints

## 2. API contract checklist

- Resource model
- HTTP methods
- URI design
- Headers
- Query/path parameters
- Request examples
- Response examples
- Error contract
- Authentication/authorization
- Pagination/filtering/sorting
- Versioning
- Compatibility expectations

## 3. Architecture document

```text
Consumer
   ↓
Experience/API boundary
   ↓
Process/orchestration
   ↓
System integrations
   ├── Database
   ├── Messaging
   ├── File/SFTP
   └── External service
```

Document ownership, dependencies, trust boundaries, failure paths and data movement.

## 4. Deployment record

- Application name
- Environment
- Runtime/version
- Java version
- Deployment target
- Replicas/worker configuration
- Properties/configuration source
- Secrets/certificates
- Network dependencies
- Smoke-test result
- Rollback procedure

## 5. Test evidence

- Unit/MUnit results
- Negative tests
- Contract tests
- Integration tests
- Smoke tests
- Security checks
- Performance evidence where required

## 6. Production handover

- Dashboard
- Alerts
- Logs
- Correlation strategy
- Runbook
- Known failure modes
- Dependency contacts
- Recovery procedure
- Escalation path
- Change record

## 7. RCA template

### Incident

What happened?

### Impact

Which systems/users were affected and for how long?

### Evidence

Timestamps, correlation IDs, logs, metrics and dependency responses.

### Timeline

Record events chronologically.

### Root cause

State the verified technical cause. Separate facts from hypotheses.

### Recovery

What restored service?

### Prevention

Tests, monitoring, code/configuration changes, documentation or process changes.

## 8. Architecture Decision Record

- Decision
- Context
- Options considered
- Constraints
- Consequences
- Security impact
- Reliability impact
- Performance impact
- Operational impact
- Revisit conditions

## 9. Release checklist

- [ ] Contract reviewed
- [ ] Code reviewed
- [ ] Tests passed
- [ ] Security checks passed
- [ ] Configuration verified
- [ ] Secrets/certificates verified
- [ ] Deployment plan approved
- [ ] Rollback tested/documented
- [ ] Monitoring ready
- [ ] Smoke test ready
- [ ] Handover completed
